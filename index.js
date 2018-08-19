#!/usr/bin/env node
const chalk     = require('chalk');
const inquirer  = require('inquirer');
const simpleGit = require('simple-git');
const files     = require('./lib/files');

// Exit if no git project is initialized
if (!files.directoryExists('.git')) {
  console.log(chalk.red('There is no git project initialized.'));
  process.exit();
}

simpleGit()
  .branchLocal(function (err, branchSummary) {
    const branches = Object.keys(branchSummary.branches);
    const numberOfBranches = branches.length
    if (numberOfBranches == 0) {
      console.log(chalk.red('There are no git branches defined.'));
      process.exit();
    }

    const questions = [
      {
        type: 'list',
        name: 'branch',
        message: 'Select the branch you want to switch to:',
        choices: branches,
        default: []
      }
    ];
    
    inquirer
      .prompt(questions)
      .then(answer => {
        simpleGit().checkout(answer.branch);
      });
  });
