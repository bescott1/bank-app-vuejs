import { dataSelector } from '../utils/DataSelector';

describe('Accounts', () => {
  beforeEach(() => {
    cy.intercept('**/api/accounts', {
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
    cy.visit('/');
  });
  it('Should visit the accounts url', () => {
    cy.contains(dataSelector('landing'), 'Landing');
  });

  it('Should list the accounts', () => {
    cy.contains(dataSelector('accounts-table.header.action'), 'Action');
    cy.contains(dataSelector('accounts-table.header.id'), 'ID');
    cy.contains(dataSelector('accounts-table.header.first-name'), 'First Name');
    cy.contains(dataSelector('accounts-table.header.last-name'), 'Last Name');
    cy.contains(dataSelector('accounts-table.header.email'), 'Email');
    cy.contains(dataSelector('accounts-table.header.balance'), 'Balance');
    cy.contains(dataSelector('accounts-table.row.0.action.view'), 'View Account');
    cy.contains(dataSelector('accounts-table.row.0.id'), '1');
    cy.contains(dataSelector('accounts-table.row.0.first-name'), 'Ben');
    cy.contains(dataSelector('accounts-table.row.0.last-name'), 'Scott');
    cy.contains(dataSelector('accounts-table.row.0.email'), 'bscott@ipponusa.com');
    cy.contains(dataSelector('accounts-table.row.0.balance'), '0');
  });

  it('Should push to view account page', () => {
    cy.intercept('**/api/accounts/1', {
      body: {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        email: 'bscott@ipponusa.com',
        balance: 0.0,
      },
    });
    cy.get(dataSelector('accounts-table.row.0.action.view')).click();
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1'));
  });

  it('Should show add account form', () => {
    cy.get(dataSelector('add-account.form')).should('not.exist');

    cy.get(dataSelector('add-account')).click();
    cy.contains(dataSelector('add-account.form'), 'Add Account Form');
  });
});
