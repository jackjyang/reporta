import sys as SYSTEM
import requests

from config import AUTH, urlLogin, urlAnalysis

### SETUP ###
# start a session
s = requests.Session()
# login user
r = s.post(urlLogin, params=AUTH)

################################################################
# Input args and help

def printHelp():
  print "Default Usage: python get_report_analyses.py"

if len(SYSTEM.argv) > 1 and SYSTEM.argv[1] == "-h":
  printHelp()
  SYSTEM.exit(0)

################################################################
# List of available analyses

r = s.get(urlAnalysis)

if r.status_code != 200:
  print r.text
  SYSTEM.exit(1)

analyses = r.json()

for analysis in analyses['result']:
  print 'Analysis Name: ' + str(analysis);
