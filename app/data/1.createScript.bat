cd 1.create
FOR %%c in (*.*) DO cmd /c 	..\..\..\..\..\0.DevEnv\mongodb\3\bin\mongo localhost:27017/jvdb --eval "db.createCollection('%%c')" 
cd ..