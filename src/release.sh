#!/bin/bash

body="{
\"request\": {
  \"stage\":\"staging\"
}}"

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: token ${process.env.TRAVIS_ACCESS_TOKEN}" \
  -d "$body" \
  https://oodikone.cs.helsinki.fi/release/ \
 | tee /tmp/release-request-output.$$.txt

 cat /tmp/release-request-output.$$.txt
