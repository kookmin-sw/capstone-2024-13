#!/bin/sh

set -e

if [ "${NODE_ENV}" = "development" ]; then
	yarn run dev
else
	yarn run start
fi