' This modified script uses a For loop to repeat the copy and transpose operation for each row in the range A2:E(lastRow) on Sheet1. The variable destRow is used to specify the row number in the destination range on Sheet2, which starts at row 2 and is incremented by 2 at the end of each iteration of the loop to leave an empty row between each paste operation. The Copy and PasteSpecial methods are called within the For loop for each row, using the i variable to specify the row number in the range being copied.
Sub CopyCells()
    Dim lastRow As Long
    lastRow = Sheets("Sheet1").Cells(Rows.Count, "A").End(xlUp).Row
    Dim destRow As Long
    destRow = 2
    
    For i = 2 To lastRow
        Sheets("Sheet1").Range("A" & i & ":E" & i).Copy
        Sheets("Sheet2").Range("A" & destRow).PasteSpecial Transpose:=True
        destRow = destRow + 2 ' Add 2 to destination row to leave an empty row
    Next i
End Sub


' updated version of the script
Sub CopyCells()
    Dim lastRow As Long
    lastRow = Sheets("Sheet1").Cells(Rows.Count, "A").End(xlUp).Row
    Dim destRow As Long
    destRow = 2
    
    For i = 2 To lastRow
        Dim pasteRange As Range
        Set pasteRange = Sheets("Sheet2").Range("A" & destRow)
        pasteRange.Value = Sheets("Sheet1").Range("A" & i).Value
        pasteRange.Offset(0, 1).Value = Sheets("Sheet1").Range("B" & i).Value
        pasteRange.Offset(0, 2).Value = Sheets("Sheet1").Range("C" & i).Value
        pasteRange.Offset(0, 3).Value = Sheets("Sheet1").Range("D" & i).Value
        pasteRange.Offset(0, 4).Value = Sheets("Sheet1").Range("E" & i).Value
        destRow = destRow + 2 ' Add 2 to destination row to leave an empty row
    Next i
End Sub




Sub copier()
'
' copier Macro
'
' Keyboard Shortcut: Ctrl+q
'
Dim i As Integer
For i = 2 To 10 ' Change the range as per your requirement
    Range("B" & i).Select
    Windows("FAQs_Content_English.xlsm").Activate
    Range("D" & i).Select
    Selection.End(xlToLeft).Select
    Selection.End(xlToLeft).Select
    Range(Selection, Selection.End(xlToRight)).Select
    Selection.Copy
    Windows("Book1").Activate
    Range("A" & i).Select ' Change the column as per your requirement
    Selection.PasteSpecial Paste:=xlPasteAll, Operation:=xlNone, SkipBlanks:= _
        False, Transpose:=True
    Columns("A:A").EntireColumn.AutoFit ' Change the column as per your requirement
    Range("B" & i + 6).Select ' Change the row offset as per your requirement
    Windows("FAQs_Content_English.xlsm").Activate
    Range("E" & i).Select
    Selection.End(xlToLeft).Select
    Range(Selection, Selection.End(xlToRight)).Select
    Application.CutCopyMode = False
    Selection.Copy
    Windows("Book1").Activate
    Range("A" & i + 6).Select ' Change the column and row offset as per your requirement
    Selection.PasteSpecial Paste:=xlPasteAll, Operation:=xlNone, SkipBlanks:= _
        False, Transpose:=True
Next i
End Sub



