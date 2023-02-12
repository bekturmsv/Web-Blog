# Web Blog

### Demo: https://web-blog-by-beka.vercel.app/

## About 📓

The main idea was to create your own communication platform. The end result was a platform with minimal functionality, but the idea of writing, deleting and editing posts/articles was achieved🎯. The whole project was written by me (Back-end & Front-end). I used MongoDB as a database. Back-end development used Node.js & Express.js. And in Front-end development I used React.js & Redux/Toolkit.

### Note:

_The project has not yet been adapted for mobile versions_

## How it works ⚙️

### Back-end 🗄️

In the server folder, the index.js file runs a local server on port 5000. The same file prescribes routers for the type of requests, and depending on the request will trigger a certain function prescribed in the file PostController.js for posts/articles and UserController.js for users. The Models folder contains models of posts and users. The validations folder contains all validations for post creation, registration, and editing of posts. In the folder prloads are stored all the images that were uploaded to the server. 😎👌🔥

### Front-end 🖥️

All client part is in the client folder, all files are in the folder src. The main files are App.js, axios.js, redux and pages. In the App.js folder all the routers are prescribed, and depending on the router the component I specified will be rendered. In axios.js I wrote a function so that api server is always embedded, you can read a bit about it here **(https://axios-http.com/docs/instance)**. In the folder redux prescribed methods to change the state in the project. The pages folder contains all the pages that are present in the project. 💯🔥

<hr>

### How to start locally

### Note:

It is possible to run the project locally, but it will not work correctly because there is a mongodb uri in the project, and I can not cover this🥺. So you can use this as a template to your projects, in places where api for front and mongodb uri are inserted.

## How to start Front-end side :

1. You must enter the client folder

```bash
  cd client/
```

2. Next, you should install all the dependencies

```bash
  npm install
```

3. And at the end, start the server

```bash
  npm start
```

<br>

## How to start Back-end side :

1. You must enter the server folder

```bash
  cd server/
```

2. Next, you should install all the dependencies

```bash
  npm install
```

3. And at the end, start the server

```bash
  npm run dev
```

### Technologies used

- React.js
- Redux Toolkit
- Node.js
- Express.js
- JWT
- MongoDB / Mongoose
- Multer storage
- Mui
- SCSS
