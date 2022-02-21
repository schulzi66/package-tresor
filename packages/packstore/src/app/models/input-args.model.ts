export interface AccountCreationArgs {
  name: string;
  password: string;
}

export interface InputArgs {
  createAccount: boolean | AccountCreationArgs;
}
