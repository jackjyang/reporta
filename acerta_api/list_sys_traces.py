import sys as SYSTEM
import json
import requests

from config import AUTH, urlLogin, urlSys, urlTrace

### SETUP ###
# start a session
s = requests.Session()
# login user
r = s.post(urlLogin, params=AUTH)

################################################################
# Input args and help

def printHelp():
  print "Default Usage: python list_sys_traces.py system_name"

if len(SYSTEM.argv) > 1 and SYSTEM.argv[1] == "-h":
  printHelp()
  SYSTEM.exit(0)

if len(SYSTEM.argv) < 2:
  printHelp()
  SYSTEM.exit(1)

systemName = SYSTEM.argv[1]
sysPayload = {'systemName': systemName}

################################################################
# Check for system existence on server

r = s.get(urlSys, params=sysPayload)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

serverSys = r.json()

if not serverSys:
  print 'System ' + systemName + ' is NOT found'
  SYSTEM.exit(1)

sysPayload = {'system': json.dumps(serverSys)}

################################################################
# List of available (uploaded) traces for a specified system

r = s.get(urlTrace, params=sysPayload)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

sysTraces = r.json()

import json
print json.dumps(sysTraces)

# print 'System ' + systemName
# print ""

# for trace in sysTraces:
#   print 'Trace ID: ' + str(trace['id']) + ' Name:  ' + trace['name'] + \
#         ' Type: ' + trace['type']
