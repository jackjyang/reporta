import sys as SYSTEM
import json
import requests

from config import AUTH, urlLogin, urlSys, urlTrace, urlReport

### SETUP ###
# start a session
s = requests.Session()
# login user
r = s.post(urlLogin, params=AUTH)

################################################################
# Input args and help

def printHelp():
  print "Default Usage: python generate_report.py baseline_system_name test_system_name test_trace_name [email]"

if len(SYSTEM.argv) > 1 and SYSTEM.argv[1] == "-h":
  printHelp()
  SYSTEM.exit(0)

if len(SYSTEM.argv) < 4:
  printHelp()
  SYSTEM.exit(1)

baseline = SYSTEM.argv[1]
testSystem = SYSTEM.argv[2]
testTraceName = SYSTEM.argv[3]

################################################################
# Check for system existence on server

# BASELINE
sysPayload = {'systemName': baseline}
r = s.get(urlSys, params=sysPayload)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

serverSys = r.json()

if not serverSys:
  print 'System ' + systemName + ' is NOT found'
  SYSTEM.exit(1)

baseline = serverSys

# TEST
sysPayload = {'systemName': testSystem}
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
# Check for test trace existence on server and retrieve its details

r = s.get(urlTrace, params=sysPayload)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

sysTraces = r.json()

testTrace = None
for trace in sysTraces:
  if trace['name'] == testTraceName: testTrace = trace

if not testTrace:
  print 'Test trace ' + testTraceName + ' is NOT found'
  SYSTEM.exit(1)

################################################################
# Generate a report

reportPayload = {
  'system': json.dumps(serverSys),
  'fileName': testTrace['fileName'],
  'traceName': testTraceName,
  'baseline': json.dumps(baseline)
}

if (len(SYSTEM.argv) == 5):
  reportPayload['email'] = SYSTEM.argv[4]

r = s.post(urlReport, data=reportPayload)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

print r
