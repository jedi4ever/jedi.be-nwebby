---
title: Behavioral testing with Vagrant - Take 2
created_at: 2011-12-15 12:35:34.199577 +02:00
tags:
- puppet
- cucumber
- testing
- vagrant
blog_post: true
related:
- desc: Puppet editing like a pro
  url: /blog/2011/12/05/puppet-editing-like-a-pro
- desc: Puppet versioning like a pro
  url: /blog/2011/12/05/puppet-versioning-like-a-pro/
- desc: Puppet unit testing like a pro
  url: https://www.jedi.be/blog/2011/12/05/puppet-unit-testing-like-a-pro/
- desc: Vagrant Testing One Two
  url: https://www.jedi.be/blog/2011/03/29/vagrant-testing-testing-one-two/
---
**A big thanks to [Atlassian](http://www.atlassian.com) for allowing me to post this series!!**

### Running tests from within the VM
After I covered [Puppet Unit Testing](http://jedi.be/blog/2011/12/05/puppet-unit-testing-like-a-pro), the logical step is writing about *Behavioral testing*.

While writing this , I can up with a good example of why BDD needs to complement your Unit tests:
I have installed the Apache Puppet Module, and all provision ran ok. I wasn't until I tested the webpage with `lynx http://localhost` that I understood I needed to create a default website. This is of course a trivial example, but I shows you that BDD can help you in testing logical errors.

When this topic arises, most people are familiar with [Cucumber Nagios](http://auxesis.github.com/cucumber-nagios/). It contains a series of Cucumber steps that allow you to test http request, amqp, dns, ssh, command.

From what I found, most people would execute these test on the VMs directly. This requires you to install cucumber and all of it's dependent gems in the VM. [Gareth RushGrove](http://twitter.com/garethr) wrote a great blogpost on packaging [cucumber-nagios with fpm](http://morethanseven.net/2011/04/29/Creating-a-cucumber-nagios-package-with-fpm.html)

## Running tests from outside the VM - Take 1

In some situations, the required gems, libraries might lead to conflicts or introduce dependencies you would rather not have on your production machine. And they would become another point to maintenance in your production machines.

So in a previous blogpost [Vagrant Testing,Testing One Two](https://www.jedi.be/blog/2011/03/29/vagrant-testing-testing-one-two/) , I already described using modified Cucumber-Nagios steps that interact with [Vagrant](http://vagrantup.com) over ssh.

## Running tests from outside the VM - Take 2
But I had a problem with the previous approach. Depending on the situation I would need to run the same tests via different connection methods: vagrant uses ssh, ec2 via fog, openvz via vzctl etc...

So I came up with a new flexible approach: use a configurable command to connect to a vm and have it execute the same steps.

### With a little Aruba help
While Cucumber-Nagios slowly moves into [Cuken](https://www.relishapp.com/hedgehog/cuken/), the SSH steps are getting converted [Aruba](https://github.com/cucumber/aruba) steps for local exection. And in combination to the [ssh-forever](https://github.com/mattwynne/ssh-forever) steps for ssh interaction.

The Aruba gem is a set of [CLI Steps for Cucumber](https://github.com/cucumber/aruba/blob/master/lib/aruba/cucumber.rb). You can use it to interactively interact with a process or just do a run. Example steps could look like:

    Given I run "ssh localhost -p 2222" interactively
    And I type "apache2ctl configtest"
    And the exit status should be 0


###  Making it connection neutral
As you can see in the previous step, there is still the connection in the Feature. Not great if we want to run it local. I rephrased it to:

    Feature: apache check

      Scenario: see if the apache header is served
        Given I execute `lynx http://localhost --dump` on a running system
        Then the output should match /It works/
        Then the exit status should be 0

      Scenario: check if the apache config is valid
        Given I execute `apache2ctl configtest` on a running system
        Then the exit status should be 0

###  Writing the logic

Here is the logic to make this work (put it in [features/support/step_definitions/remote_system_connect_steps.rb](https://github.com/jedi4ever/vagrant-guard-demo/blob/master/features/support/step_definitions/remote_system_connect_steps.rb) . It uses two environment variables:

    SYSTEM_EXECUTE: the command to execute just one command
    SYSTEM_CONNECT: the command to connect to the system

Example for vagrant would be:

    SYSTEM_EXECUTE: "vagrant ssh_config | ssh -q -F /dev/stdin default"
    SYSTEM_CONNECT: "vagrant ssh"

This can be also your favorite `knife ssh`, `vzctl 33 enter`, `mc-ssh somehost`

----

    When /^I execute `([^`]*)` on a running system$/ do |cmd|
      @execute_command=ENV['SYSTEM_EXECUTE']
      @connect_failed=false
      unless @execute_command.nil?
        steps %Q{ When I run `#{@execute_command} "#{cmd}"` }
      else
        @execute_failed=true
        raise "No SYSTEM_EXECUTE environment variable specified"
      end
    end

    When /^I connect to a running system interactively$/ do
      @connect_command=ENV['SYSTEM_CONNECT']
      @connect_failed=false
      unless @connect_command.nil?
        steps %Q{
            When I run `#{@connect_command}` interactively
        }
      else
        @connect_failed=true
        raise "No SYSTEM_COMMAND environment variable specified"
      end
    end

    When /^I disconnect$/ do
      steps %Q{ When I type "exit $?" }
    end

### Monkey Patching Aruba

By default, Aruba uses shellwords to parse the commandlines you pass, it seems to have an issue with "|" symbols. This is the patch I came up with: (in features/support/env.rb)

    require 'aruba/cucumber'
    require 'shellwords'

    # Here we monkey patch Aruba to work with pipe commands
    module Aruba
      class Process
        include Shellwords

        def initialize(cmd, exit_timeout, io_wait)
          @exit_timeout = exit_timeout
          @io_wait = io_wait

          @out = Tempfile.new("aruba-out")
          @err = Tempfile.new("aruba-err")
          @process = ChildProcess.build(cmd)
          @process.io.stdout = @out
          @process.io.stderr = @err
          @process.duplex = true
        end
      end
    end

After this a regular cucumber run, should work (Note: use a recent cucumber version 1.1.x)

### Automating it with Rake
The last part is automating this for Vagrant. For this we create a little rake task:

    require "cucumber/rake/task"
    task :default => ["validate"]

    # Usage rake validate
    # - single vm: rake validate
    # - multi vm: rake validate vm=logger
    Cucumber::Rake::Task.new(:validate) do |task|
        # VM needs to be running already
        vm_name=ENV['vm'] || ""
        ssh_name=ENV['vm'] || "default"
        ENV['SYSTEM_CONNECT']="vagrant ssh #{vm_name}"
        ENV['SYSTEM_EXECUTE']="vagrant ssh_config #{vm_name}| ssh -q -F /dev/stdin #{ssh_name}"
        task.cucumber_opts = ["-s","-c", "features" ]
    end

### Final words
The solution allows you to reuse the command execution steps, for running them locally, over ssh, or some other connection command.

- This only works for commands that run over ssh, but I think it is already powerfull to do this. If would require amqp testing, you could probably find a command check as well.
- Shell escaping is not 100% correct, this needs more work to work with the special characters or quotes inside quotes.
- When testing, I sometimes miss the context of how a server is created (f.i. the params passed to the puppet manifest or the facts), maybe I could this in a puppet manifests. Not sure on this
- If there is an interest, I could turn this into a vagrant plugin, to make it really easy.

All code can be found at the demo project:
<https://github.com/jedi4ever/vagrant-guard-demo>
