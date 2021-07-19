#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = __importDefault(require("prompts"));
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var message_1 = __importDefault(require("./utils/message"));
var validate_pkg_1 = require("./utils/validate-pkg");
var create_app_1 = require("./create-app");
var template_config_1 = __importStar(require("./utils/template-config"));
// import packageJson from "./package.json";
// const program = new Commander.Command(packageJson.name);
var program = {
    name: function () { return "create-fibonalabs-ui"; },
};
var projectPath = "";
var uikit = "";
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var res, resolvedProjectPath, projectName, _a, valid, problems, templateName, template, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (typeof projectPath === "string") {
                        projectPath = projectPath.trim();
                    }
                    if (!!projectPath) return [3 /*break*/, 2];
                    return [4 /*yield*/, prompts_1.default([
                            {
                                type: "text",
                                name: "projectName",
                                message: message_1.default.projectNameQuestion,
                                initial: message_1.default.projectNameDefaultValue,
                                validate: function (name) {
                                    var validation = validate_pkg_1.validateNpmName(path_1.default.basename(path_1.default.resolve(name)));
                                    if (validation.valid) {
                                        return true;
                                    }
                                    return "Invalid project name: " + validation.problems[0];
                                },
                            },
                            {
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
                                ],
                                initial: 0,
                            },
                        ])];
                case 1:
                    res = _b.sent();
                    if (typeof res.projectName === "string") {
                        projectPath = res.projectName.trim();
                    }
                    if (typeof res.uikit === "string") {
                        uikit = res.uikit.trim();
                    }
                    _b.label = 2;
                case 2:
                    if (!projectPath) {
                        console.log();
                        console.log("Please specify the project directory:");
                        console.log("  " + chalk_1.default.cyan(program.name()) + " " + chalk_1.default.green("<project-directory>"));
                        console.log();
                        console.log("For example:");
                        console.log("  " + chalk_1.default.cyan(program.name()) + " " + chalk_1.default.green(message_1.default.projectNameDefaultValue));
                        console.log();
                        process.exit(1);
                    }
                    resolvedProjectPath = path_1.default.resolve(projectPath);
                    projectName = path_1.default.basename(resolvedProjectPath);
                    _a = validate_pkg_1.validateNpmName(projectName), valid = _a.valid, problems = _a.problems;
                    if (!valid) {
                        console.error("Could not create a project called " + chalk_1.default.red("\"" + projectName + "\"") + " because of npm naming restrictions:");
                        problems.forEach(function (p) { return console.error("    " + chalk_1.default.red.bold("*") + " " + p); });
                        process.exit(1);
                    }
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    templateName = template_config_1.getTemplateName("nextjs", uikit);
                    template = template_config_1.default(templateName);
                    return [4 /*yield*/, create_app_1.createApp({
                            appPath: resolvedProjectPath,
                            useNpm: true,
                            template: template,
                        })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.log(chalk_1.default.red(error_1.toString()));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
run()
    .then(function () { })
    .catch(function (reason) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log();
        console.log("Aborting installation.");
        if (reason.command) {
            console.log("  " + chalk_1.default.cyan(reason.command) + " has failed.");
        }
        else {
            console.log(chalk_1.default.red("Unexpected error. Please report it as a bug:"));
            console.log(reason);
        }
        console.log();
        // await notifyUpdate();
        process.exit(1);
        return [2 /*return*/];
    });
}); });
