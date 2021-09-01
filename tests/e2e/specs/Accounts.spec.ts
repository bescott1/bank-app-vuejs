import { dataSelector } from '../utils/DataSelector';

describe('Accounts', () => {
  beforeEach(() => {
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
    cy.contains(dataSelector('accounts-table.row.0.action'), 'View Account');
    cy.contains(dataSelector('accounts-table.row.0.id'), '1');
    cy.contains(dataSelector('accounts-table.row.0.first-name'), 'Ben');
    cy.contains(dataSelector('accounts-table.row.0.last-name'), 'Scott');
    cy.contains(dataSelector('accounts-table.row.0.email'), 'bscott@ipponusa.com');
    cy.contains(dataSelector('accounts-table.row.0.balance'), '0');
  });

  it('Should push to account page', () => {
    cy.intercept('**/accounts/1', {
      body: {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        email: 'bscott@ipponusa.com',
        balance: 0.0,
      },
    });
    cy.get(dataSelector('account.1.link')).click();
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1'));
  });
});
