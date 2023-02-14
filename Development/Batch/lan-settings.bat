@echo off
:loop
echo Setting LAN settings to automatically detect settings...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxySettingsPerUser /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Connections" /v DefaultConnectionSettings /t REG_BINARY /d 460000004f00000001000000000000002c000000 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Connections" /v SavedLegacySettings /t REG_BINARY /d 460000004f00000001000000000000002c000000 /f
echo LAN settings set to automatically detect settings.
timeout /t 1800 /nobreak > nul
goto loop


@REM Yes, you can use a loop in the batch script to make it run at certain intervals. Here's an example script that sets the LAN settings to automatically detect settings and then waits for 30 minutes before running again:
@REM Save this script with a .bat file extension (e.g. "lan-settings.bat") and run it as administrator. The script will set the "Automatically detect settings" option for LAN settings and then wait for 30 minutes (1800 seconds) before running again. The "timeout" command is used to wait for the specified amount of time, and the "nobreak" option prevents the user from interrupting the script with keyboard input. The "goto" command is used to loop back to the beginning of the script and start again.
