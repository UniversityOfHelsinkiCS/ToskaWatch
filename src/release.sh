#!/bin/bash

body="{
\"request\": {
  \"stage\":\"staging\"
}}"
TOKEN=$1
PANNU=$2
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: token ${TOKEN}" \
  -d "$body" \
  https://${PANNU}.cs.helsinki.fi/release/ \
 | tee /tmp/release-request-output.$$.txt

cat /tmp/release-request-output.$$.txt