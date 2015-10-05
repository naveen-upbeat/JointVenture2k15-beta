cmd /c npm install -g bower
cmd /c  npm install
cmd /c  bower install

start /min 1.startMongoDB.bat | app\data\0.setupStaticData.bat
start /min 2.startNodeServer.bat