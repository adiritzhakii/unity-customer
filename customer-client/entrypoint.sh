#This line for using ENV in nginx
envsubst '$$SERVER_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g 'daemon off;'