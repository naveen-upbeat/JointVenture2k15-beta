set "cwd=%~dp0"
cd 3.delete
FOR %%c in (*.*) DO cmd /c 	..\..\..\..\..\0.DevEnv\mongodb\3\bin\mongo localhost:27017/jvdb --eval "db.getCollection('%%c').drop()" 
cd ..