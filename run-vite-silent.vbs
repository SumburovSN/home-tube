Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c cd /d ""C:\Projects\React\home-tube"" && npx vite --host", 0, False