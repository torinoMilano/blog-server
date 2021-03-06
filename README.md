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

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) >= 17
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Directories
- nodejs

node service containing the api 

- nginx

proxy to request directly from http://localhost/

## Build
From root of directory

```./build.sh```

Will use docker compose nginx and node js to expose the API to address http://localhost/blogpost/v1/api/blog  

## Testing 

```
cd nodejs; 
npm run test
```
Running newman test via docker
After sucessfully run the ./build.sh command

Just run 
```bash 
./run_newman.sh 
``` 