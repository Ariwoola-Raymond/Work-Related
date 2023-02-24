cmd.exe /c "start ms-settings:network-proxy?ismore=0&tab=proxy&proxtType=lan"

cmd.exe /c "start control.exe /name Microsoft.InternetOptions /page pageConnection /internet"


cmd.exe /c "start rundll32.exe shell32.dll,Control_RunDLL inetcpl.cpl,,4 && timeout /T 1 /NOBREAK && powershell.exe -Command \"Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('{TAB}{TAB}{SPACE}{TAB}{TAB}{TAB}{ENTER}');\""
