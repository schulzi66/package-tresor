import inquirer from 'inquirer';
import { Response } from 'node-fetch';

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
    message: 'Choose a password:',
  });

  return answer.pwd;
};

export const askOverrideRegisteredUser = async (): Promise<boolean> => {
  const answer = await inquirer.prompt({
    name: 'choice',
    type: 'confirm',
    message: 'A user is already registered. Do you want to override the user?',
  });

  return answer.choice;
};

export const handleInvalidApiStatus = async (response: Response): Promise<void> => {
  console.warn(`The Server responded with a status code ${response.status} and the following error: \n ${await response.text()}`);
};
