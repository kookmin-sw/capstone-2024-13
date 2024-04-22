#!/bin/bash

NC='\033[0m' # No Color
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

read -p "$(echo "${BLUE}Enter your domain name: ${NC}")" domain
if [ -z "$domain" ]; then
	echo "${RED}Error: Domain name cannot be empty${NC}"
	exit 1
fi

echo "${BLUE}SSL certificate will be generated at: ${NC} ${PWD}/ssl/certs/$domain.crt"
echo "${BLUE}SSL private key will be generated at: ${NC} ${PWD}/ssl/private/$domain.key"
read -p "$(echo Continue? [y/N] )" confirm
if [ "$confirm" != "y" -a "$confirm" != "Y" ]; then
	echo "${RED}Aborted${NC}"
	exit 1
fi

echo "${GREEN}Generating SSL certificate for '$domain' ...${NC}"

mkdir -p ${PWD}/ssl/certs
mkdir -p ${PWD}/ssl/private

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ${PWD}/ssl/private/$domain.key -out ${PWD}/ssl/certs/$domain.crt -subj "/C=MO/L=KH/O=1337/OU=student/CN=$domain" -addext "subjectAltName=DNS:$domain"

echo "${GREEN}SSL certificate for '$domain' has been generated${NC}"