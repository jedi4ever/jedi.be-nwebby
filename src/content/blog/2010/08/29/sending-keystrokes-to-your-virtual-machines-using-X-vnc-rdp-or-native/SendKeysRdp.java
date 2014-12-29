package net.propero.rdp;

import java.net.InetAddress;
import net.propero.rdp.rdp5.Rdp5;
import net.propero.rdp.rdp5.VChannels;

public class SendKeysRdp {
	public static void main(String[] args) {
		int logonflags = Rdp.RDP_LOGON_NORMAL;
		Rdp5 RdpLayer = null;
	
		VChannels channels = new VChannels();
		RdpLayer = new Rdp5(channels);
		Common.rdp = RdpLayer;		
		try {
/*
 * 					RdpLayer.connect(Options.username, InetAddress
							.getByName(server), logonflags, Options.domain,
							Options.password, Options.command,
							Options.directory);			
 */
			RdpLayer.connect("Username", InetAddress.getByName("192.168.2.30") , logonflags, "Domain","Command", "","Directory");
			RdpLayer.sendInput(Input.getTime(), Input.RDP_INPUT_SCANCODE, Input.RDP_KEYPRESS, 0x1f, 0);

		} catch(Exception e){
			System.out.println(e.toString());
		}
	}
}