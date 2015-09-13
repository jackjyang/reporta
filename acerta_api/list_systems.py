import sys as SYSTEM
import requests

from config import AUTH, urlLogin, urlSys

### SETUP ###
# start a session
s = requests.Session()
# login user
r = s.post(urlLogin, params=AUTH)

################################################################
# Input args and help

def printHelp():
  print "Default Usage: python list_systems.py"

if len(SYSTEM.argv) > 1 and SYSTEM.argv[1] == "-h":
  printHelp()
  SYSTEM.exit(0)

################################################################
# List of available systems

r = s.get(urlSys)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

systems = r.json()

import json
print json.dumps(systems)


# for sys in systems:
#   print 'System ID: ' + str(sys['id']) + ' Name: ' + sys['name']
