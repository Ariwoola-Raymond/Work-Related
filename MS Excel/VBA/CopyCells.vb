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

' This modified script uses a For loop to repeat the copy and transpose operation for each row in the range A2:E(lastRow) on Sheet1. The variable destRow is used to specify the row number in the destination range on Sheet2, which starts at row 2 and is incremented by 2 at the end of each iteration of the loop to leave an empty row between each paste operation. The Copy and PasteSpecial methods are called within the For loop for each row, using the i variable to specify the row number in the range being copied.