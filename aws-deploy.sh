#!/bin/bash
set -v
aws s3 sync ./dist s3://pango-test-web/ --delete --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=chris.washington@capitalone.com
