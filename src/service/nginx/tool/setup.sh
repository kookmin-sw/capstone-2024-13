#!/bin/sh
# vim:sw=4:ts=4:et

set -e

# Certificates
$LOCAL && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $NEXTJS_CERTS_KEY -out $NEXTJS_CERTS -subj "/C=MO/L=KH/O=1337/OU=student/CN=www.$DOMAIN_NAME"
$LOCAL && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $NESTJS_CERTS_KEY -out $NESTJS_CERTS -subj "/C=MO/L=KH/O=1337/OU=student/CN=dev.$DOMAIN_NAME"

# Server config
sed -i "s|nextjs_port|$NEXTJS_PORT|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|nextjs_certs_key|$NEXTJS_CERTS_KEY|g"	"/etc/nginx/conf.d/default.conf"
sed -i "s|nextjs_certs|$NEXTJS_CERTS|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|nestjs_port|$NESTJS_PORT|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|nestjs_certs_key|$NESTJS_CERTS_KEY|g"	"/etc/nginx/conf.d/default.conf"
sed -i "s|nestjs_certs|$NESTJS_CERTS|g"			"/etc/nginx/conf.d/default.conf"
sed -i "s|my_domain|$DOMAIN_NAME|g"				"/etc/nginx/conf.d/default.conf"

# Log config
sed -i '40s/.*/\tlog_format debug '\''$remote_addr - $remote_user [$time_local] '\'' '\''"$request" $status $body_bytes_sent '\'' '\''"$http_referer" "$http_user_agent"'\'';/' /etc/nginx/nginx.conf
sed -i '41s/.*/\taccess_log \/var\/log\/nginx\/access.log debug;/' /etc/nginx/nginx.conf
sed -i '42s/.*/\terror_log \/var\/log\/nginx\/error.log debug;/' /etc/nginx/nginx.conf