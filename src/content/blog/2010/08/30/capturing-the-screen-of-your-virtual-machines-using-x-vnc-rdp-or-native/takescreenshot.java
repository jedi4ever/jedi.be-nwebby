import java.net.URL;
import com.vmware.vim25.*;
import com.vmware.vim25.mo.*;

public class takescreenshot 
{
	public static void main(String[] args) throws Exception
	{
		String url="https://localhost/sdk"; 
		String username="root"; 
		String password="thepassword"
		long start = System.currentTimeMillis();
		ServiceInstance si = new ServiceInstance(new URL(url), username, password, true);
		long end = System.currentTimeMillis();
		System.out.println("time taken:" + (end-start));
		Folder rootFolder = si.getRootFolder();
		String name = rootFolder.getName();
		System.out.println("root:" + name);
		ManagedEntity[] mes = new InventoryNavigator(rootFolder).searchManagedEntities("VirtualMachine");
		if(mes==null || mes.length ==0)
		{
			return;
		}
		
		VirtualMachine vm = (VirtualMachine) mes[0]; 
		Task screentask=vm.CreateScreenshot_Task();
		si.getServerConnection().logout();
	}
}