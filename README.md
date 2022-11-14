# pf-trade

## QuickStart

see [midway docs][midway] for more detail.

### One Off Migration Script
Note: Will need to make sure the mysql driver exists, e.g. running `npm run start-database` first
```bash
$ npm i
$ npm run init-database
```

### Development
#### Node
1. Installing Mysql drive at https://www.mysql.com/downloads/
2. ```bash 
    $ npm run start-database
    $ npm run i
    $ npm run dev
    ```
#### WIP: Docker
```bash
$ docker-compose up
```
http://localhost:7001/ will be the server route

### Deploy
#### Node
```bash
$ npm run production
```

### npm scripts

- Use `npm run lint` to check code style.
- WIP: Use `npm test` to run unit test.


[midway]: https://midwayjs.org
