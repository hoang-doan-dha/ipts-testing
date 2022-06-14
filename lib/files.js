
const path = require('path');
const fs = require('fs');
const url = require('url');

// ---
// Config here
// ----
const folderPath = 'D:/IPTS/web-tfm';
const coveragePath = 'coverage/lcov-report/';
const rootPath = path.resolve(folderPath);

// ---
// Methods
// ---

export const getFiles = (filePath) => {
  try {
    const finalPath = path.join(rootPath, filePath);
    const file = fs.existsSync(finalPath);
    if (file) {
      const pathUrl = url.pathToFileURL(finalPath);
      const fileUrl = pathUrl.href.replace(`file:///${folderPath}/`, '');
      const testFileUrl = `ng test --include ${fileUrl} --code-coverage`;
      const coverageUrl = coveragePath.concat(fileUrl).replace('spec.ts', 'ts.html');
      return {
        filePath: testFileUrl,
        coveragePath: coverageUrl,
      }
    }
    return new Error('Not Found');
  } catch (error) {
    console.error(error);
    return new Error(JSON.stringify(error));
  }
};

export const readFile = (filePath) => {
  try {
    const finalPath = path.join(rootPath, filePath);
    const file = fs.existsSync(finalPath);
    if (file) {
      const data = fs.readFileSync(finalPath, "utf-8");
      return data;
    }
    return new Error('Not Found');
  } catch (error) {
    console.error(error);
    return new Error(JSON.stringify(error));
  }
};