#!/bin/bash

body="{
\"request\": {
  \"stage\":\"staging\"
}}"
TOKEN=$1
PANNU=$2
curl -k -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: token ${TOKEN}" \
  -d "$body" \
  https://${PANNU}.cs.helsinki.fi/release/