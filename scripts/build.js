const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { deleteDir, copyDir } = require("./util.js");

const resolve = (p) => path.resolve(__dirname, p);

const rootConfig = {
  cwd: resolve(".."),
};
// execSync("rm -rf node_modules", rootConfig);
execSync("git pull", rootConfig);
deleteDir(resolve("../node_modules"));
execSync("npm install", rootConfig);
if(fs.existsSync(resolve("../tsconfig.tsbuildinfo"))) {
  fs.unlinkSync(resolve("../tsconfig.tsbuildinfo"));
}
if(fs.existsSync(resolve('../dist'))) {
  deleteDir(resolve('../dist'));
}
execSync("tsc", rootConfig);
fs.cpSync(
  resolve("../src/tenon-node-framework/utils/secret.json"),
  resolve("../dist/tenon-node-framework/utils/secret.json")
);
copyDir(resolve('../src/static'), resolve('../dist/static'));
