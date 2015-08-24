SetLocal EnableDelayedExpansion
set _content=
for /f "delims=" %%i in (%1) do set _content=!_content! %%i
echo %_content%
cmd /c 	..\..\..\..\..\0.DevEnv\mongodb\3\bin\mongo localhost:27017/jvdb --eval "db.getCollection('%1').insert(%_content%)"
EndLocal