' Here is a VBA script that automatically opens a particular worksheet when the workbook is opened:

Private Sub Workbook_Open()
    Dim ws As Worksheet

    Set ws = ThisWorkbook.Sheets("Sheet1")
    ws.Activate
End Sub


' To show the current user's username in a cell in Microsoft Excel, you can use the following VBA code:

Sub ShowUserName()
    Dim strUserName As String
    strUserName = Environ("UserName")
    Range("A1").Value = "User Name: " & strUserName
End Sub
