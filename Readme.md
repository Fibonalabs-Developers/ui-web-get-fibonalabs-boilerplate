# Frontend boilerplate


Boilerplate is the library with set of pre-defined codes for Generating frontend templates




# Getting Started

## AWS Login

Use the following command in the terminal:


```bash
aws codeartifact login --tool npm --repository fibonalabs --domain dev-fibonalabs --domain-owner 650571980132
```


## Installation


Use the following to install frontend boilerplate:


```bash
npx @fibonalabs/create-fibonalabs-ui
```



## Steps to Creating an App:


Once you've given the npx command it prompts for asking ,

Project Name- Mention the name of your project.

Choose the framework- NExtJS, CRA

Choose the type of UI Kit- ANT Design, Material UI and Tailswind CSS.

Once all these steps are done, and you’re good to go.



## Output


It will create a directory with the project-name inside the current folder.

Inside that directory, it will generate the initial project structure and install the transitive dependencies.

Once the installation is done, you can open your project folder:


```bash
cd project-name
```



## Run the Frontend boilerplate



Inside the newly created project, you can run some built-in commands:



```bash
npm run dev (or) yarn dev
```


Runs the app in development mode.

Open [http://localhost:3000](http:// localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.

You will see the build errors and lint warnings in the console.



```bash
npm run build (or) yarn build
```


Builds the app for production to the build folder.

It correctly bundles React in production mod and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

Please make sure to update as appropriate.
