import { interceptAccount } from '../fixtures/AccountsIntercepts.fixture';
import { dataSelector } from '../utils/DataSelector';

describe('Account', () => {
  beforeEach(() => {
    interceptAccount({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 0.0,
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
    cy.contains(dataSelector('account.balance'), '$0.00');
  });

  it('Should not show account information if nonexistent', () => {
    cy.intercept(`**/api/accounts/404`, {
      statusCode: 404,
      body: 'Error: Request failed with status code 404',
    });

    cy.visit('/accounts/404');
    cy.contains(dataSelector('account.id'), '0');
    cy.get(dataSelector('account.first-name')).should('be.empty');
    cy.get(dataSelector('account.last-name')).should('be.empty');
    cy.contains(dataSelector('account.balance'), '$0.00');
  });

  it('Should not show account information if server error', () => {
    cy.intercept(`**/api/accounts/500`, {
      statusCode: 500,
      body: 'Error: Request failed with status code 500',
    });

    cy.visit('/accounts/500');
    cy.contains(dataSelector('account.id'), '0');
    cy.get(dataSelector('account.first-name')).should('be.empty');
    cy.get(dataSelector('account.last-name')).should('be.empty');
    cy.contains(dataSelector('account.balance'), '$0.00');
  });
});
