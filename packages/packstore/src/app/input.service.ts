import inquirer from 'inquirer';

export const askName = async () => {
  const answers = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter an account name: ',
  });

  return answers.name;
};

export const askPassword = async () => {
  const answers = await inquirer.prompt({
    name: 'pwd',
    type: 'password',
    message: 'Choose a password:',
  });

  return answers.pwd;
};
