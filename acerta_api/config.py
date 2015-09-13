HTTP = 'http://'
HTTPS = 'https://'
HOST = "test.acerta.ca"
PORT = ""

## LOGIN Credentials ##

AUTH = { 'username':'demo@acerta.ca', 'password':'demo' }

## API endpoints ##

urlLogin = HTTPS + HOST + ":" + PORT + "/login"
urlUpload = HTTPS + HOST + ":" + PORT + "/api/upload"

urlTrace = HTTPS + HOST + ":" + PORT + "/api/traces"
urlSys = HTTPS + HOST + ":" + PORT + "/api/systems"

urlFiles = HTTPS + HOST + ":" + PORT + "/api/files"
urlSysFiles = HTTPS + HOST + ":" + PORT + "/api/files/sys"

urlForms = HTTPS + HOST + ":" + PORT + "/api/reports/form"
urlAnalysis = HTTPS + HOST + ":" + PORT + "/api/reports/analytics"
