#!/usr/bin/env python

import httplib, urllib
params = urllib.urlencode({'userId': 'demo', 'name': 'dummySource1', 'url': 'asdf.com/fdsa1'})
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
conn = httplib.HTTPConnection("localhost:8080")
conn.request("POST", "/api/addDataSource", params, headers)

params = urllib.urlencode({'userId': 'demo', 'name': 'dummySource2', 'url': 'asdf.com/fdsa2'})
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
conn = httplib.HTTPConnection("localhost:8080")
conn.request("POST", "/api/addDataSource", params, headers)

params = urllib.urlencode({'userId': 'demo', 'name': 'dummySource3', 'url': 'asdf.com/fdsa3'})
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
conn = httplib.HTTPConnection("localhost:8080")
conn.request("POST", "/api/addDataSource", params, headers)
