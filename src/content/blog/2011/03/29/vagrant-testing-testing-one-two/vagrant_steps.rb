require 'vagrant/cli'
require 'vagrant'

require 'uri'
module Webrat #:nodoc:
    class Session #:nodoc:
      def virtual_visit(url, data=nil, options = {})
          # Options = Headers in regular visit
          uri = URI.parse(url)
          
          # We default to the same port
          port=uri.port
             
          # Now we translate url port to vagrant port
          # These mappings of ports are global and not per machine
          if @vagrant_env.nil?
            throw "No vagrant environment got loaded"
          end
          @vagrant_env.config.vm.forwarded_ports.each do |name,mapping|
            if mapping[:guestport]==uri.port
              port=mapping[:hostport]
            end
          end

          # Override the hostname to the Headers 
          header=options
          headers=options.merge({ 'Host' => uri.host+":"+port.to_s})
                    
          # For the extended get method we need to wrap it
          # Traditional get method works 
          # => with an URL as first arg
          # => and second  = parameters (methods I guess)
          # But given some other arguments the get command behaves differently
          # See http://mechanize.rubyforge.org/mechanize/Mechanize.html for the source
          # https://github.com/brynary/webrat/blob/master/lib/webrat/adapters/mechanize.rb
          # https://github.com/brynary/webrat/blob/master/lib/webrat/core/session.rb
          
          # def get(options, parameters = [], referer = nil)
          @response = get({ 
                :headers => headers,
                :url => "#{uri.scheme}://localhost:#{port}#{uri.path}?#{uri.query}", 
                :verb => :get}, nil,options['Referer'])
      end
    end
end

When /^I ssh to vagrantbox "([^\"]*)" with the following credentials:$/ do |boxname,table|
  unless @vagrant_env.multivm?
    port=@vagrant_env.primary_vm.ssh.port
  else
    port=@vagrant_env.vms[boxname.to_sym].ssh.port
  end
  hostname="127.0.0.1"
    @keys = []
    @auth_methods ||= %w(password)
    session = table.hashes.first
    session_keys = Array.new(@keys)
    session_auth_methods = Array.new(@auth_methods) 
    if session["keyfile"]
      session_keys << session["keyfile"]
      session_auth_methods << "publickey"
    end
    session_port=port 


    lambda {
      @connection = Net::SSH.start(hostname, session["username"], :password => session["password"], 
                                                                  :auth_methods => session_auth_methods,
                                                                  :port => session_port,
                                                                  :keys => session_keys)
  #                                                                :keys => session_keys,:verbose => :debug)
    }.should_not raise_error
  end

Given /^I go to vagrant "([^\"]*)"$/ do |url|
    virtual_visit(url)
end
  
Given /^I have a vagrant project in "([^\"]*)"$/ do |path|
  @vagrant_env=Vagrant::Environment.new(:cwd => path)
  @vagrant_env.load!
end

And /^I do a vagrant provision$/ do 
  Vagrant::CLI.start(["provision"], :env => @vagrant_env)
end

