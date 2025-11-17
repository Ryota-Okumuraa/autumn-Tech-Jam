FROM php:8.4
WORKDIR /back
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME="/opt/composer"
ENV PATH="$PATH:/opt/composer/vendor/bin"

RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

COPY . .

RUN composer dump-autoload --optimize

RUN chmod -R 775 storage bootstrap/cache

CMD ["php", "artisan", "serve","--host", "0.0.0.0"]
EXPOSE 8000

