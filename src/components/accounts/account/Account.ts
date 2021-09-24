export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
}

export interface RestAccount {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
}

export const toAccount = (restAccount: RestAccount): Account => ({
  id: restAccount.id,
  firstName: restAccount.firstName,
  lastName: restAccount.lastName,
  balance: restAccount.balance,
});
