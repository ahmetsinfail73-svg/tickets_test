FROM php:8.5-rc-fpm

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN echo "upload_max_filesize = 400M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size = 400M" >> /usr/local/etc/php/conf.d/custom.ini

WORKDIR /var/www/backend
