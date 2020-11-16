# Konventionen

## Board - VivifyScrum

### Sprint Kanban / Definitions of Done

#### To Do
Die Spalte "To Do" umfasst jegliche Storys die im Sprint eingeplant sind und noch nicht angegangen wurden. Dabei müssen
die Akzeptanzkrtierien vorhanden und abgenommen sein und die Story muss geschätzt sein (Storypoints). Sobald ein Entwickler
die Story bearbeitet und er zugewiesen wurde, wird die Story auf "in Progress" gestellt. Dabei muss beachtet werden,
dass nicht mehr als 2 Storys gleichzeitig im Status "in Progress" sind.

#### In Progress
Sobald die technische Implementation durch den Entwickler abgeschlossen und alle Akzeptanzkriterien der Story erfüllt sind, kann
die Story auf "To be Tested" gestellt werden. Die Entwicklung ist abgeschlossen, wenn die neuen Funktionen in den Master Branch überführt wurden
und vorgängig ein Code-Review stattgefunden hat.

#### To Be Tested
Sobald der UI-Tester die Story sich zugewisen hat und die Tests für die Story beginnen, wird sie auf "Testing" gestellt.

#### Testing
Während des UI-Testings (u.a. durch den Product Owner) befindet sich die Story in der Spalte "Testing". Treten beim Testing Fehler auf oder entspricht das Feature nicht den Akzeptanzkriterien, dann wird die Story dem entsprechenden Entwickler zugewiesen und in die Spalte "In Progress" zurück verschoben.
Ebenfalls involviert in diesen Prozess ist der Qualitätsverantwortliche, der die Umsetzung überprüft und die einzelnen Inkremente
überprüft. Sind die Tests abgeschlossen und dokumentiert kann die Story in die Spalte "Done" verschoben werden.
Alle Tests müssen im Chrome Browser durchgeführt werden.

#### Done
Die Spalte "Done" beinhaltet alle implementierten und erfolgreich getesteten Storys.

## Git Verwaltung

### Branches
Jede Person erstellt für jeden Sprint pro Story einen Branch. Dabei spielt es keine Rolle, ob die Person
mehrere Tasks der gleichen Storys abwickelt oder unterschiedliche. 

### Pull Requests
Am Schluss des Sprints (kurz vor Abschluss) wird pro Person für die erstellten Branches ein Pull Request erstellt. Dies muss dann von einer zweiten Person überprüft und freigegeben werden. Damit wird die entsprechende Story oder der Subtask in die Spalte "To be tested" verschoben.
