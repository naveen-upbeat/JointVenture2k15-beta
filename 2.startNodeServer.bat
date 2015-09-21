start /min cmd /c node server.js ^> server_log.log 2^> server_error_log.log
start chrome "http://localhost:8080/"
exit