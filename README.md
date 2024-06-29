# EmlakGPT

EmlakGPT makes searching new homes easy using ChatGTP API.

## Project Features

### Data Collection from Real Estate Listings:

Fetching property listings from a real estate website and storing the information in the database using Pscale and Prisma.

### User Interface for Property Search:

A web-based interface allowing users to input desired location and specifications of the house they are looking for.

### Keyword Extraction with ChatGPT:

Employing ChatGPT to extract keywords from user inputs to identify specific preferences related to the property.

### Matching Algorithm:

Utilizing extracted keywords to match user preferences with available properties stored in the database.

### Recommendation Engine:

Presenting the user with the most suitable properties based on the matched keywords and preferences.

### Database Integration and Management:

Integration of Pscale and Prisma for efficient handling and management of the property database.

### Scalability and Performance:

Designed to scale efficiently, ensuring optimal performance as the database grows.

### User Authentication and Security:

Implementing user authentication and ensuring data security measures to protect user information.

### Responsive Web Interface:

Providing a user-friendly and responsive web interface accessible across various devices.

### Continuous Improvement:

Regular updates and improvements based on user feedback and evolving requirements.

## Installation Steps

### 1. Node

Node installation on Windows Just go on [official Node.js website](https://nodejs.org/en/download) and download the installer. Also be sure to have `git` available in your PATH `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v22.1.0

    $ npm --version
    9.8.1

### 2.Prisma and MongoDB

#### [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)

Prisma is an open-source next-generation ORM. It consists of the following parts:

Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript

Prisma Migrate: Migration system

Prisma Studio: GUI to view and edit data in your database.

#### [MongoDb](https://www.mongodb.com/products/platform/atlas-database)

The most advanced cloud database service on the market, with unmatched data distribution and mobility across AWS, Azure, and Google Cloud, built-in automation for resource and workload optimization, and so much more.

(You can find needed information about how to quickstart Prisma with MongoDB [here](https://www.prisma.io/docs/orm/overview/databases/mongodb))

### 3. Clone Repository

```
$ git clone https://github.com/osmanyusufakkus/emlakgptnextjs.git
```

### 4. Required Packages

Install the dependencies in the local node_modules folder.

```
$ npm install (in package directory no arguments):
```

## Usage

**Firstly**, you need to create your **.env** file in the root of your project file and paste the necessary keys, and URL which you can get from the project owner.

**Secondly**, you need to connect Prisma in order to reach the database.

Prisma connection codes (write them in the terminal respectively. If a terminal is in use, create new terminal):

```
$ npx prisma generate
$ npx prisma db push
$ npx prisma studio
```

**Then**, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://emlakgptnextjs.vercel.app] with your browser to see the result.

You can start after signing up/on the site.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

No license right now.
