
const path = require('path');
const fs = require('fs');
const url = require('url');

// ---
// Config here
// ----
// const folderPath = 'D:/IPTS/web-tfm';
const coveragePath = 'coverage/lcov-report/';

// ---
// Methods
// ---

/**
 * Get a file based on their path
 * @param {string} folderPath 
 * @param {string} filePath 
 * @param {boolean} fastRun 
 */
export const getFiles = (folderPath, filePath, fastRun) => {
  try {
    const rootPath = path.resolve(folderPath);
    const finalPath = path.join(rootPath, filePath);
    const file = fs.existsSync(finalPath);
    if (file) {
      const pathUrl = url.pathToFileURL(finalPath);
      const fileUrl = pathUrl.href.replace(`file:///${folderPath}/`, '');
      let testFileUrl = `ng test --include ${fileUrl}`;
      if (fastRun) {
        testFileUrl += ' --source-map=false --browsers=ChromeHeadlessNoSandbox';
      } else {
        testFileUrl += ' --code-coverage';
      }
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
    const rootPath = path.resolve(folderPath);
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