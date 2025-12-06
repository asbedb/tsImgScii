# tsImgScii

tsImgScii is a browser-based ASCII Art Generator that transforms
a target image into character-based (text) output. The aim is to
expand with more image manipulation features in the future.

## Client side and browser based

The application is browser-based client side meaning no calls to a server with data being manipulated in the browser. At its core the application does the following.

1. Takes an image file.
2. Converts the image into a Base64 string
3. Stores the string in a browser based IndexedDB instance with one string for the original image and another for modified.
4. Allows for manipulation at a pixel level as we have stored an Array version of the image
5. Converts back the image via the array to ascii art or a manipulated image for the user to enjoy.

## Installation

### 1. Dependencies

Ensure you have NPM and [NodeJS](https://nodejs.org/en) to run and build the project.

### 2. (Optional) Fork the repository

[Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the repository as your own repo if you wish to build on top of the existing code.

### 3. Clone the repository to your local machine

First, navigate to the folder where you want to store the project on your local machine using the terminal. Then run this command to clone your fork:

```sh
git clone https://github.com/<YOUR_GITHUB_ACCOUNT_NAME>/tsImgScii.git
```

Ensure to Replace <YOUR_GITHUB_ACCOUNT_NAME> with your actual GitHub username or the repo link itself. This command creates a copy of the repository on your computer where you can make changes.

### 4. Navigate to the project directory

After cloning is complete, change your current directory to the newly created project folder:

```sh
cd tsImgScii
```

This command opens the project folder where you'll find all the source code and project files. Note that the directory name is case-sensitive, so make sure to use the exact same capitalization as shown in the previous step.

### 5. Install the required dependencies

Run the following command in your terminal to install all the necessary packages defined in the project's package.json file:

```sh
npm i
```

This command (shorthand for npm install) will automatically download and set up all required packages. The installation process may take several minutes depending on your internet connection speed.

Subsequently you can either build or run a local developer environment with the following commands

```sh
npm run dev
```

(this allows for you to view the application via localhost in your browser)

```sh
npm run build
```

(this will build the project in a /dist folder readily available to upload to a hosting service)
