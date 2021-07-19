"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFolderEmpty = void 0;
/* eslint-disable import/no-extraneous-dependencies */
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function isFolderEmpty(root, name) {
    var validFiles = [
        ".DS_Store",
        ".git",
        ".gitattributes",
        ".gitignore",
        ".gitlab-ci.yml",
        ".hg",
        ".hgcheck",
        ".hgignore",
        ".idea",
        ".npmignore",
        ".travis.yml",
        "LICENSE",
        "Thumbs.db",
        "docs",
        "mkdocs.yml",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
    ];
    var conflicts = fs_1.default
        .readdirSync(root)
        .filter(function (file) { return !validFiles.includes(file); })
        // Support IntelliJ IDEA-based editors
        .filter(function (file) { return !/\.iml$/.test(file); });
    if (conflicts.length > 0) {
        console.log("The directory " + chalk_1.default.green(name) + " contains files that could conflict:");
        console.log();
        for (var _i = 0, conflicts_1 = conflicts; _i < conflicts_1.length; _i++) {
            var file = conflicts_1[_i];
            try {
                var stats = fs_1.default.lstatSync(path_1.default.join(root, file));
                if (stats.isDirectory()) {
                    console.log("  " + chalk_1.default.blue(file) + "/");
                }
                else {
                    console.log("  " + file);
                }
            }
            catch (_a) {
                console.log("  " + file);
            }
        }
        console.log();
        console.log("Either try using a new directory name, or remove the files listed above.");
        console.log();
        return false;
    }
    return true;
}
exports.isFolderEmpty = isFolderEmpty;
