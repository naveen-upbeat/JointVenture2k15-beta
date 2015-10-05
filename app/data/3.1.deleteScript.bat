set "cwd=%~dp0"
cd 3.delete
FOR %%c in (*.*) DO cmd /c 	..\..\..\..\..\0.DevEnv\mongodb\3\bin\mongo ds029824.mongolab.com:29824/jvdb -u techCompeers2k15 -p techCompeers2k15 --eval "db.getCollection('%%c').drop()" 
cd ..