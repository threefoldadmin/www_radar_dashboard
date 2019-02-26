# ThreeFold Radar Dashboard
[logo]: https://threefold.me/svg/threefold-logo-white.svg
### Blockchain explorers and stats [radar.threefold.io](https://radar.threefold.io/)

This project is a ThreeFoldToken dashboard web client

## Install dependencies
`npm i`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run production` to build the project. The build artifacts will be stored in the `dist/` directory.

## Hosting client on web-server
Config web-server:
```
server {
 listen 80;
 root /var/www/html/tft/dist;
 index index.html;
 
 #ssl configurations
 
 location /api {
    proxy_pass http://localhost:7000;
    proxy_read_timeout 2000s;
    proxy_send_timeout 2000s;
    proxy_buffers 8 32k;
    proxy_buffer_size 64k;
    if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }
      }
 }
```
| WARNING: Please note that it is not complete config and does not support ssl connection |
| --- |

## Extra
Project owner [Nickolay Babenko](https://t.me/nbabenko)




