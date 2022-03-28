# Blog-server
Blog Posts API service to return details about a post to a blog.
Using nodejs and nginx as proxy pass

## API
Post
- list all
- get one

Comments:
- list comments for specific post
- create a new comment (name is optional, text is required)
- update an existing comment

## Prerequisite
Docker and docker-compose installed, up and running

## Directories
- nodejs

node service containing the api 

- nginx

proxy to request directly from http://localhost/

## Build
just run build.sh

```./build.sh```

## Testing 

```
cd nodejs; npm run test
```