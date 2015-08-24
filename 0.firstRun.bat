cmd /c  npm install
cmd /c  bower install

start /min 1.startMongoDB.bat
start /min app\data\0.setupStaticData.bat
start /min 2.startNodeServer.bat