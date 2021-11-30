<br/>
<p align="center">
  <a href="https://github.com/spinshock/llama-bot-discord">
    <img src="./images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Llama bot for Discord</h3>

  <p align="center">
    Llamify your discord channel
    <br/>
    <br/>
    <a href="https://github.com/spinshock/llama-bot-discord">View Demo</a>
    .
    <a href="https://github.com/spinshock/llama-bot-discord/issues">Report Bug</a>
    .
    <a href="https://github.com/spinshock/llama-bot-discord/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/spinshock/llama-bot-discord?color=dark-green)
![Issues](https://img.shields.io/github/issues/spinshock/llama-bot-discord)

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

Discord bot made for Llamas. Express your emotions using a large emote database. Extend the collection of emotes by adding your own for your channel.

## Built With

### API
- node
- typescript
- express
- typeorm connection with postgresql

### BOT
- discord.js
- typescript

### CLIENT
- react w/ typescript

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* docker
* docker-compose
* node and nvm
* [Discord Bot Token](https://discord.com/developers/applications/)
* postgresql db

### Installation

1. Clone the repo

```sh
git clone https://github.com/spinshock/llama-bot-discord.git
```

1. NPM install in all three modules 
```bash
cd ./llama-bot && npm install
```
```bash
cd ./llama-bot-api && npm install
```
```bash
cd ./llama-bot-client && npm install
```

1. TODO

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

## Deployment with Dokku
1. Bot
    * Create the app for the bot **in dokku**
      ```bash
      dokku apps:create <bot-app-name>
      ```
    * Set builder to Dockerfile **in dokku**
      ```bash
      ## llama-bot is the subdir where the Dockerfile for the bot is located
      ## Keep in mind dockerfile-path should be default when changing build-dir
      dokku builder:set <bot-app-name> build-dir llama-bot
      ```
        * OPTIONAL: Set `dockerfile-path` to default ("Dockerfile") when changing the build-dir 
          ```bash
          dokku builder-dockerfile:set <bot-app-name> dockerfile-path
          ```
    * Set env variables for the bot
        * NODE_ENV
        ```bash
        ## NODE_ENV can be production or development
        dokku config:set <bot-app-name> NODE_ENV=<environment>
        ```
        * DISCORD_TOKEN
        ```bash
        dokku config:set <bot-app-name> DISCORD_TOKEN=<discord-token>
        ```
        * TTV_CLIENT_ID
        ```bash
        dokku config:set <bot-app-name> TTV_CLIENT_ID=<twitchtv-client-id>
        ```
        * TTV_CLIENT_SECRET
        ```bash
        dokku config:set <bot-app-name> TTV_CLIENT_SECRET=<twitchtv-client-secret>
        ```
        * DATABASE_URL **(You need to create postgres db service in dokku first!)**
        ```bash
        ## Do this once as the same db is shared between bot and api
        dokku postgres:create <postgres-name-in-dokku>
        ```
        ```bash
        dokku postgres:link <postgres-name-in-dokku> <bot-app-name>
        ```
    * Adjust dokku scaling to spin up worker only instead of web (no proxy expose for the container)
      ```bash
      dokku ps:scale <bot-app-name> web=0 worker=1
      ```
    * Adjust dokku zero downtime deployment to shutdown red(old green) container immedeately
      ```bash
      dokku config:set <bot-app-name> DOKKU_WAIT_TO_RETIRE=1
      ```
    * Push branch to dokku for deploy
      ```bash
      ## dokku-host=llama-bot-discord.com
      ## dokku-remote is the alias of the remote for dokku deployments / dokku or dokku-dev by default
      git remote add <dokku-remote> dokku@<dokku-host>:<bot-app-name>
      ```
      ```bash
      git push <dokku-remote> <local-branch-to-be-deployed>:master
      ```
1. API
    * Create the app for the API **in dokku**
      ```bash
      dokku apps:create <api-app-name>
      ```
    * Set builder to Dockerfile **in dokku**
      ```bash
      ## llama-bot-api is the subdir where the Dockerfile for the api is located
      ## Keep in mind dockerfile-path should be default when changing build-dir
      dokku builder:set <api-app-name> build-dir llama-bot-api
      ```
        * OPTIONAL: Set `dockerfile-path` to default ("Dockerfile") when changing the build-dir 
          ```bash
          dokku builder-dockerfile:set <api-app-name> dockerfile-path
          ```
    * Set env variables for the api
        * NODE_ENV
          ```bash
          ## NODE_ENV can be production or development
          dokku config:set <api-app-name> NODE_ENV=<environment>
          ```
        * DATABASE_URL **(You need to create postgres db service in dokku first!)**
          ```bash
          ## Do this once as the same db is shared between bot and api
          dokku postgres:create <postgres-name-in-dokku>
          ```
          ```bash
          dokku postgres:link <postgres-name-in-dokku> <api-app-name>
          ```
    * Adjust dokku zero downtime deployment to shutdown red(old green) container immediately
      ```bash
      dokku config:set <bot-app-name> DOKKU_WAIT_TO_RETIRE=1
      ```
    * Adjust dokku proxy ports (protocol:host_port:container_port) **container_port** or **8080** from the example below 
    should be the same as the port env from API dockerfile 
      ```bash
      dokku proxy:ports-set <bot-app-name> http:80:8080
      ```
    * Push branch to dokku for deploy
      ```bash
      ## dokku-host=llama-bot-discord.com
      ## dokku-remote is the alias of the remote for dokku deployments / dokku or dokku-dev by default
      git remote add <dokku-remote> dokku@<dokku-host>:<api-app-name>
      ```
      ```bash
      git push <dokku-remote> <local-branch-to-be-deployed>:master
      ```
1. Client
    * Create the app for the client **in dokku**
      ```bash
      dokku apps:create <client-app-name>
      ```
    * Set builder to Dockerfile **in dokku**
      ```bash
      ## llama-bot-client is the subdir where the Dockerfile for the client is located
      ## Keep in mind dockerfile-path should be default when changing build-dir
      dokku builder:set <client-app-name> build-dir llama-bot-client
      ```
        * OPTIONAL: Set `dockerfile-path` to default ("Dockerfile") when changing the build-dir 
          ```bash
          dokku builder-dockerfile:set <client-app-name> dockerfile-path
          ```
    * Set build arg variables for the client
        * PORT
          ```bash
          ## The port that the nginx will listen on. Defaults to 80
          dokku docker-options:add <client-app-name> build "--build-arg PORT=<port>
          ```
        * API_URL
          ```bash
          ## The domain where the api is deployed.
          ## 
          ## "llama-bot-discord-api-dev.llama-bot-discord.com" would resolve to the client's nginx server 
          ## proxying api requests to http://llama-bot-discord-api-dev.llama-bot-discord.com/api
          dokku docker-options:add <client-app-name> build "--build-arg API_URL=<domain-of-deployed-api>"
          ```
    * Adjust dokku zero downtime deployment to shutdown red(old green) container immediately
      ```bash
      dokku config:set <client-app-name> DOKKU_WAIT_TO_RETIRE=1
      ```
    * Adjust dokku proxy ports (protocol:host_port:container_port) **container_port** or **8080** from the example below 
    should be the same as the port env from API dockerfile 
      ```bash
      dokku proxy:ports-set <client-app-name> http:80:8080
      ```
    * Push branch to dokku for deploy
      ```bash
      ## dokku-host=llama-bot-discord.com
      ## dokku-remote is the alias of the remote for dokku deployments / dokku or dokku-dev by default
      git remote add <dokku-remote> dokku@<dokku-host>:<client-app-name>
      ```
      ```bash
      git push <dokku-remote> <local-branch-to-be-deployed>:master
      ```

## License

Distributed under the MIT License. See [LICENSE](https://github.com/spinshock/llama-bot-discord/blob/main/LICENSE.md) for more information.

## Authors

* **Yavor Filipov** - *Software Engineer* - [Yavor Filipov](https://github.com/spinshock/) - *Built Llama bot*

## Acknowledgements

* [ShaanCoding](https://github.com/ShaanCoding/) - readme template author
* [Othneil Drew](https://github.com/othneildrew/Best-README-Template) - readme template author
* [ImgShields](https://shields.io/)
