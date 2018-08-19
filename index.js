const chalk     = require('chalk');
const inquirer  = require('inquirer');
const simpleGit = require('simple-git');
const files     = require('./lib/files');

// Exit if no git project is initialized
if (!files.directoryExists('.git')) {
  console.log(chalk.red('There is no git project initialized.'));
  process.exit();
}

simpleGit().branchLocal()
  .exec((err, branches) => {
    if (!branches) {
      console.log(chalk.red('There are no git branches defined.'));
      process.exit();
    }
  });
