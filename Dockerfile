# Lightweight Nginx image to serve the static site
FROM nginx:alpine

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy site files into Nginx's web root
COPY index.html /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

# Custom Nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
