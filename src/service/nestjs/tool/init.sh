#!/bin/sh

set -e

if [ "${NODE_ENV}" = "development" ]; then
	yarn run start:dev
else
	yarn run start:prod
fi