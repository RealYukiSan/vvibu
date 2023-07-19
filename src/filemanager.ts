import * as fs from "node:fs";
import readline from "node:readline";
import path from "node:path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Which folder would you like to flatten? ", (targetDir) => {
  const listDir = fs.readdirSync(path.resolve(targetDir));

  if (listDir.length) {
    // rename batch file for one dir
    listDir.map((file, index) => {
      const from = path.resolve(targetDir, file);
      if (file.endsWith("ass")) {
        const number = index + 3;
        fs.renameSync(from, path.resolve(targetDir, `${number < 10 ? "0" + number.toString() : number}.srt`));
      }
    });

    // rename batch file for multiple and nested dir
    // listDir.map((eachDir, index) => {
    //   const subDir = path.resolve(targetDir, eachDir);
    //   const files = fs.readdirSync(subDir);
    //   if (files.length) {
    //     files.map((file) => {
    //       if (file.endsWith("ass")) {
    //         const number = index + 1;
    //         fs.renameSync(path.resolve(subDir, file), path.resolve(targetDir, `${number < 10 ? "0" + number.toString() : number}.ass`));
    //       } else fs.renameSync(path.resolve(subDir, file), path.resolve(targetDir, file));
    //     });
    //   }
    // });
  }

  rl.close();
});
