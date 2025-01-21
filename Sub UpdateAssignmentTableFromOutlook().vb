Sub UpdateAssignmentTableFromOutlook()
    Dim olApp As Object
    Dim olNamespace As Object
    Dim olFolder As Object
    Dim olItem As Object
    Dim xlWorksheet As Object
    Dim assignmentTable As ListObject
    Dim existingSubjects As Object
    Dim rowCounter As Integer
    
    ' Set Outlook application and namespace
    Set olApp = CreateObject("Outlook.Application")
    Set olNamespace = olApp.GetNamespace("MAPI")
    
    ' Specify Outlook folder path
    Set olFolder = olNamespace.Folders("RBWM (The Knowledge Office)").Folders("Inbox")
    
    ' Set Excel worksheet and assignment table
    Set xlWorksheet = ThisWorkbook.Sheets("Sheet1")
    Set assignmentTable = xlWorksheet.ListObjects("Sheet1")
    
    ' Create a dictionary to store existing subjects
    Set existingSubjects = CreateObject("Scripting.Dictionary")
    
    ' Populate existing subjects from the Assignment table
    For Each cell In assignmentTable.ListColumns("Title/subject").DataBodyRange
        existingSubjects(cell.Value) = True
    Next cell
    
    ' Initialize row counter for Assignment table
    rowCounter = assignmentTable.ListRows.Count + 1
    
    ' Loop through each email in the Outlook folder
    For Each olItem In olFolder.Items
        ' Check if the item is a mail item
        If TypeOf olItem Is Object  And olItem.Class = olMail Then
            ' Check if the subject doesn't exist in the Assignment table
            If Not existingSubjects.Exists(olItem.Subject) Then
                ' Paste data into the Assignment table
                xlWorksheet.Cells(rowCounter, 5).Value = olItem.ReceivedTime ' Date received
                xlWorksheet.Cells(rowCounter, 6).Value = olItem.Subject ' Title/subject
                xlWorksheet.Cells(rowCounter, 2).Value = "Email request for change or new"
                assignmentTable.ListRows.Add rowCounter
                
                ' Increment row counter
                rowCounter = rowCounter + 1
            End If
        End If
    Next olItem
    

End Sub