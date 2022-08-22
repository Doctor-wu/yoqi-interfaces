const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { deleteDir } = require("./util.js");

const resolve = (p) => path.resolve(__dirname, p);

const rootConfig = {
  cwd: resolve(".."),
};
// execSync("rm -rf node_modules", rootConfig);
execSync("git pull", rootConfig);
deleteDir(resolve("../node_modules"));
execSync("npm install", rootConfig);
fs.unlinkSync(resolve("../tsconfig.tsbuildinfo"));
execSync("tsc", rootConfig);
fs.cpSync(
  resolve("../src/tenon-node-framework/utils/secret.json"),
  resolve("../dist/tenon-node-framework/utils/secret.json")
);
