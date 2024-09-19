#!/bin/sh

source .env

aws s3 sync --delete ./dist/ s3://$AWS_BUCKET && aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --paths "/*"