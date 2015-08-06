IF exist "..\..\0.DevEnv\mongodb\3\data" ( echo "..\..\0.DevEnv\mongodb\3\data" exists ) ELSE ( mkdir "..\..\0.DevEnv\mongodb\3\data" && echo "..\..\0.DevEnv\mongodb\3\data" created)
start /min ..\..\0.DevEnv\mongodb\3\bin\mongod --dbpath ..\..\0.DevEnv\mongodb\3\data
exit