import sys as SYSTEM
import json
import requests

from config import AUTH, urlLogin, urlForms

### SETUP ###
# start a session
s = requests.Session()
# login user
r = s.post(urlLogin, params=AUTH)

################################################################
# Input args and help

def printHelp():
  print "Default Usage: python get_report_form.py analysis_name system_name trace_name"

if len(SYSTEM.argv) > 1 and SYSTEM.argv[1] == "-h":
  printHelp()
  SYSTEM.exit(0)

if len(SYSTEM.argv) < 2:
  printHelp()
  SYSTEM.exit(1)

sysPayload = { 'analysis': SYSTEM.argv[1], 'system': SYSTEM.argv[2], 'trace': SYSTEM.argv[3] }

r = s.post(urlForms, data=json.dumps(sysPayload))

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)
formHtml = r.json()

print(formHtml['form']);
