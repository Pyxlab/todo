# ![logo] Task App (To-Do List)

![GitHub repo size](https://img.shields.io/github/repo-size/Pyxlab/todo?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Pyxlab/todo?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Pyxlab/todo?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/Pyxlab/todo?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/Pyxlab/todo?style=for-the-badge)

![preview]
> A simple task app (to-do list) developed with AdonisJS, tRPC, ReactJS, Vite, SWC, Typescript, TailwindCSS, and many others.

## 🚀 About the project

This project was developed to demonstrate the use of the @pyxlab/adonis-trpc package, react with Vite/SWC, structured as a monorepo using the yarn workspace and turborepo of Versel to deploy the project.

## 📱 Layout

The reference layout was designed by [Ariane Morelato](https://www.linkedin.com/in/ariane-morelato/), you can access it [here](https://github.com/aridsm/tasks-app).

## 📝 Features

The project is still under development, but the following features are already available:

- [x] Create a session, user authentication and logout
- [x] Create a task, edit and delete
- [x] Create a directory, edit and delete
- [x] Sort tasks, directories, filter and search tasks
- [x] Progress bar of tasks completed, overdue, today and total tasks

## 💻 Prerequisites

Before starting, you will need to have the following tools installed on your machine:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## 🎲 Running the project

```bash
# Clone this repository
$ git clone https://github.com/Pyxlab/todo.git

# Access the project folder in the / cmd terminal
$ cd todo

# Install the dependencies
$ yarn

# Run docker compose
$ docker-compose up -d

# Run the migrations
$ yarn workspace @acme/api migrate:run

# Run the project
$ yarn dev

# The server will start at port: 3000 - go to http://localhost:3000
```

## 🛠️ Technologies

The following tools were used in the construction of the project:

### Backend

- [Typescript](https://www.typescriptlang.org/)
- [AdonisJS](https://adonisjs.com/)
- [Adonis TRPC](https://www.github.com/pyxlab/adonis-trpc)
- [Lucid ORM](https://adonisjs.com/docs/4.1/lucid)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Frontend

- [Typescript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [SWC](https://swc.rs/)
- [TailwindCSS](https://tailwindcss.com/)
- [TRPC](https://trpc.io/)
- [HeadlessUI](https://headlessui.dev/)

## 📫 Contributing to the project

To contribute to the project, follow the steps below:

1. Fork the project.
2. Make the changes (feature, documentation, etc.).
3. Make a commit of your changes.
4. Send a pull request.

## 📝 License

This project is under the MIT license. See the [LICENSE](./LICENSE.md) file for more details.

## 📝 Author

Made with ❤️ by Walaff Fernandes 👋🏽 [Get in touch!](https://www.linkedin.com/in/lncitador/) or [See my projects](https://www.github.com/lncitador/)

[logo]: https://avatars.githubusercontent.com/u/60629982?s=30&u=87b71f1227797d533f85fd772c4de3aa42a35b48&v=4 "Logo"
[preview]: ./todo-list.jpeg "Preview"