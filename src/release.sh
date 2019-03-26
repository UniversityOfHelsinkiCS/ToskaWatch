#!/bin/bash

body="{
\"request\": {
  \"stage\":\"staging\"
}}"
TOKEN=$1
PANNU=$2
TOSKAWATCH=""
if [ "$PANNU" = "toska" ] ; then
  TOSKAWATCH="/toskawatch"
fi
curl -k -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: token ${TOKEN}" \
  -d "$body" \
  https://${PANNU}.cs.helsinki.fi${TOSKAWATCH}/release/