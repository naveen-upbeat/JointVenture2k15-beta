cd 2.insert
FOR %%c in (*.*) DO copy %%c %%c.json &  cmd /c ..\..\..\..\..\0.DevEnv\mongodb\3\bin\mongoimport --host ds029824.mongolab.com:29824 --username techCompeers2k15 --password techCompeers2k15 --db jvdb --collection %%c --file %%c.json --authenticationMechanism SCRAM-SHA-1

FOR %%c in (*.json) DO del %%c
cd ..