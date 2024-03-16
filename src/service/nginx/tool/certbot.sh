#!/bin/bash

NC='\033[0m' # No Color
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

echo "${BLUE}Choose an option: ${NC}"
echo "1. Create a new SSL certificate for a domain"
echo "2. Renew an existing SSL certificate"
echo "3. Exit"
read -p "$(echo "${BLUE}Enter your choice: ${NC}")" choice

case $choice in
	1)
		read -p "$(echo "${BLUE}Enter your domain name: ${NC}")" domain
		if [ -z "$domain" ]; then
			echo "${RED}Error: Domain name cannot be empty${NC}"
			exit 1
		fi

		read -p "$(echo "${BLUE}'$domain'${NC} will be used to generate SSL certificate. Continue? [y/N] ")" confirm
		if [ "$confirm" != "y" -a "$confirm" != "Y" ]; then
			echo "${RED}Aborted${NC}"
			exit 1
		fi

		echo "${GREEN}Generating SSL certificate for '$domain' ...${NC}"
		docker run -it --rm --name certbot \
			-v /etc/letsencrypt:/etc/letsencrypt \
			-v /var/lib/letsencrypt:/var/lib/letsencrypt \
			certbot/certbot certonly -d $domain \
			--manual --preferred-challenges dns \
			--server https://acme-v02.api.letsencrypt.org/directory
		;;
	2)
		if [ ! -d /etc/letsencrypt/renewal ]; then
			echo "${RED}Error: No certificates to renew${NC}"
			exit 1
		fi
		echo "${GREEN}Renewing SSL certificates ...${NC}"
		echo "${GREEN}The following domain certificates will be renewed: ${NC}"
		ls /etc/letsencrypt/renewal
		read -p "$(echo "${BLUE}Continue? [y/N] ${NC}")" confirm
		if [ "$confirm" != "y" -a "$confirm" != "Y" ]; then
			echo "${RED}Aborted${NC}"
			exit 1
		fi
		docker run -it --rm --name certbot \
			-v /etc/letsencrypt:/etc/letsencrypt \
			-v /var/lib/letsencrypt:/var/lib/letsencrypt \
			certbot/certbot renew --dry-run
		;;
	3)
		echo "${GREEN}Exiting ...${NC}"
		exit 0
		;;
	*)
		echo "${RED}Invalid choice. Exiting ...${NC}"
		exit 1
		;;
esac