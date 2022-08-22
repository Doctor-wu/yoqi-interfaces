const fs = require('fs');
const path = require('path');

const deleteDir = (p) => {
  console.log('deleting', p);
  const files = fs.readdirSync(p);
  files.forEach((file) => {
    const filePath = path.resolve(p, file);
    const stat = fs.statSync(filePath);
    if(stat.isDirectory()) {
      deleteDir(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

const copyDir = (s, d) => {
  console.log('copying', s);
  const files = fs.readdirSync(s);
  files.forEach((file) => {
    const sourcePath = path.resolve(s, file);
    const destinationPath = path.resolve(d, file);
    const stat = fs.statSync(filePath);
    if(stat.isDirectory()) {
      copyDir(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

module.exports = {
  deleteDir,
  copyDir,
}