import inquirer from 'inquirer';
import { Response } from 'node-fetch';
// import chalk from 'chalk';
// import inquirer from 'inquirer';
// import gradient from 'gradient-string';
// import chalkAnimation from 'chalk-animation';
// import figlet from 'figlet';
// import { createSpinner } from 'nanospinner';

export const askName = async (): Promise<string> => {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter an account name: ',
  });

  return answer.name;
};

export const askPassword = async (): Promise<string> => {
  const answer = await inquirer.prompt({
    name: 'pwd',
    type: 'password',
    message: 'Provide a password:',
  });

  return answer.pwd;
};

export const askOverrideConfiguredUser = async (): Promise<boolean> => {
  const answer = await inquirer.prompt({
    name: 'choice',
    type: 'confirm',
    message: 'A user was already configured locally. Do you want to override the user?',
  });

  return answer.choice;
};

export const handleInvalidApiStatus = async (response: Response): Promise<void> => {
  console.warn(`The Server responded with a status code ${response.status} and the following error: \n ${await response.text()}`);
};
