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



module.exports = {
  deleteDir,
}