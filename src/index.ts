#!/usr/bin/env node
import chalk from "chalk";
import path from "path";
import prompts, { PromptObject } from "prompts";
import message from "./utils/message";
import { validateNpmName } from "./utils/validate-pkg";
import { createApp } from "./create-app";
import parseTemplateURL, { getTemplateName } from "./utils/template-config";
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
// import packageJson from "./package.json";

// const program = new Commander.Command(packageJson.name);
const program = {
  name: () => "create-fibonalabs-ui",
};

let projectPath: string = "";
let uikit: string = "";
let name: string = "";
let framework: string = "";
let promptArr: PromptObject[] =[]
async function run(): Promise<void> {
  
  if (!("projectname" in argv)) {
    promptArr.push({
      type: "text",
      name: "projectName",
      message: message.projectNameQuestion,
      initial: message.projectNameDefaultValue,
      validate: (name: string) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return "Invalid project name: " + validation.problems![0];
      },
    })
  }
  if(!("framework" in argv)){
    promptArr.push({
      type: "select",
      name: "framework",
      message: "Which Framework would you like to use?",
      choices: [
        {
          title: "Nextjs",
          description: "Nextjs",
          value: "nextjs",
        },
        {
          title: "CRA",
          description: "CRA",
          value: "cra",
        },
      ],
      initial: 0,
    })
  }
  if(!("uikit" in argv)){
    promptArr.push({
      type: "select",
      name: "uikit",
      message: "Which UI Kit would you like to use?",
      choices: [
        {
          title: "Ant Design",
          description: "Ant Design",
          value: "antdesign",
        },
        {
          title: "Material UI",
          description: "Material UI",
          value: "materialui",
        },
        {
          title: "TailwindCSS",
          description: "Base Default Template",
          value: "tailwindcss",
        },
      ],
      initial: 0,
    })
  }
  const res = await prompts(promptArr)
  name= "projectname" in res?res.projectName:argv.projectname
  uikit= "uikit" in res? res.uikit: argv.uikit
  framework= "framework" in res?res.framework: argv.framework

  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {  

    if (typeof name === "string") {
      projectPath = name.trim();
    }

    if (typeof uikit === "string") {
      uikit = uikit.trim();
    }
    if (typeof framework === "string") {
      framework = framework.trim();
    }
  }

  
  if (!projectPath) {
    console.log();
    console.log("Please specify the project directory:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
    );
    console.log();
    console.log("For example:");
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green(
        message.projectNameDefaultValue
      )}`
    );
    console.log();
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);

  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    problems!.forEach((p) => console.error(`    ${chalk.red.bold("*")} ${p}`));
    process.exit(1);
  }

  try {
    const templateName = getTemplateName(framework, uikit);
    const template = parseTemplateURL(templateName);
    await createApp({
      appPath: resolvedProjectPath,
      useNpm: true,
      template: template,
    });
  } catch (error) {
    console.log(chalk.red((error as any).toString()));
  }
}

run()
  .then(() => {})
  .catch(async (reason) => {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(reason);
    }
    console.log();
    // await notifyUpdate();
    process.exit(1);
  });
