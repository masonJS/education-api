#!/bin/sh

set -euo pipefail

echo "Init localstack"

awslocal ses verify-email-identity --email-address test@gmail.com

echo "Localstack init done"
