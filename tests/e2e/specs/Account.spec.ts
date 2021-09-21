import { dataSelector } from '../utils/DataSelector';

describe('Accounts', () => {
  beforeEach(() => {
    cy.intercept('**/api/accounts/1', {
      body: {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        balance: 0.0,
      },
    });
    cy.visit('/accounts/1');
  });
  it('Should visit the account url', () => {
    cy.contains(dataSelector('account.title'), 'Account Information');
  });

  it('Should show the account information', () => {
    cy.contains(dataSelector('account.id'), '1');
    cy.contains(dataSelector('account.first-name'), 'Ben');
    cy.contains(dataSelector('account.last-name'), 'Scott');
    cy.contains(dataSelector('account.balance'), '0');
  });
});
