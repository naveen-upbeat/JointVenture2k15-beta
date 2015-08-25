cd 2.insert
FOR %%c in (*.*) DO copy %%c %%c.json &  cmd /c ..\..\..\..\..\0.DevEnv\mongodb\3\bin\mongoimport /h localhost:27017  /d jvdb /c %%c /file %%c.json
FOR %%c in (*.json) DO del %%c
cd ..