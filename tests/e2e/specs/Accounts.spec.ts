import { dataSelector } from '../utils/DataSelector';

describe('Accounts', () => {
  it('Visits the accounts url', () => {
    cy.intercept('**/accounts', {
      body: [
        {
          id: 1,
          firstName: 'Ben',
          lastName: 'Scott',
          email: 'bscott@ipponusa.com',
          balance: 0.0,
        },
      ],
    });
    cy.visit('/accounts');
    cy.contains(dataSelector('accounts-table.header.action'), 'Action');
    cy.contains(dataSelector('accounts-table.header.id'), 'ID');
    cy.contains(dataSelector('accounts-table.header.first-name'), 'First Name');
    cy.contains(dataSelector('accounts-table.header.last-name'), 'Last Name');
    cy.contains(dataSelector('accounts-table.header.email'), 'Email');
    cy.contains(dataSelector('accounts-table.header.balance'), 'Balance');
  });
});
