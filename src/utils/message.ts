import { validateNpmName } from "./validate-pkg";
import path from "path";

const message = {
  projectNameQuestion: "What is your project named?",
  projectNameDefaultValue: "my-app",
};

// export const questions = [
//   {
//     type: "text",
//     name: "path",
//     message: message.projectNameQuestion,
//     initial: message.projectNameDefaultValue,
//     validate: (name: string) => {
//       const validation = validateNpmName(path.basename(path.resolve(name)));
//       if (validation.valid) {
//         return true;
//       }
//       return "Invalid project name: " + validation.problems![0];
//     },
//   },
//   {
//     type: "number",
//     name: "age",
//     message: "How old are you?",
//   },
//   {
//     type: "text",
//     name: "about",
//     message: "Tell something about yourself",
//     initial: "Why should I?",
//   },
// ];

export default message;
