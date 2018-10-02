#!/usr/bin/env python

import json
import uniout
import requests

attendees = []
with open('attendees.json') as f:
    for line in f:
        attendees.append(json.loads(line))

headers = {'Content-Type': 'application/json', 'Accept':'application/json'}

for attendee in attendees:
    r = requests.post('http://localhost:8080/api/registrant', data = json.dumps(attendee), headers = headers)
    print r.status_code
