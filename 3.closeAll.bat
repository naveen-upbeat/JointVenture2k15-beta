taskkill /im node.exe
cd ..\..\0.DevEnv\mongodb\3\bin\
mongo admin --eval "db.shutdownServer()"
exit