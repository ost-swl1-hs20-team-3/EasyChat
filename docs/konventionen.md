# Konventionen

## Board - VivifyScrum

### Sprint Kanban / Definitions of Done

#### To Do
Die Spalte "To Do" umfasst jegliche Items die im Sprint eingeplant sind und noch nicht angegangen wurden.

#### In Progress
Sobald ein Item von einem Entwickler bearbeitet wird, wechselt der Status auf "In Progress".

#### To Be Tested
Nach der technischen Implementierung des Items wartet das Item in diesem Status auf das UI-Testing. 

#### Testing
Während des UI-Testings (u.a. durch den Product Owner) befindet sich das Item in der Spalte "Testing". Treten beim Testing Fehler auf oder entspricht das Feature nicht den Akzeptanzkriterien, dann wird das Item dem entsprechenden Entwickler zurückgegeben und in die Spalte "In Progress" verschoben.
Ebenfalls involviert in diesen Prozess ist der Qualitätsverantwortliche, der die Umsetzung überprüft und die einzelnen Inkremente
überprüft.

#### Done
Die Spalte "Done" beinhaltet alle implementierten und erfolgreich getesteten Items.

## Git Verwaltung

### Branches
Jede Person erstellt für jeden Sprint pro Userstory einen Branch. Dabei spielt es keine Rolle, ob die Person
mehrere Tasks der gleichen Userstory abwickelt oder unterschiedliche. 

### Pull Requests
Am Schluss des Sprints (kurz vor Abschluss) wird pro Person für die erstellten Branches ein Pull Request erstellt. Dies muss dann von einer zweiten Person überprüft und freigegeben werden. Damit wird die entsprechende Story oder der Subtask in die Spalte "To be tested" verschoben.