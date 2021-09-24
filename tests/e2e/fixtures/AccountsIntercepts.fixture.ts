import * as Cypress from 'cypress';
import { RestAccount } from '../../../src/components/accounts/account/Account';

export const interceptGetAccounts = (body: [RestAccount]): Cypress.Chainable =>
  cy.intercept('GET', '**/api/accounts', {
    body,
  });

export const interceptPostAccounts = (body: RestAccount): Cypress.Chainable =>
  cy.intercept('POST', '**/api/accounts', {
    body,
  });

export const interceptAccount = (body: RestAccount): Cypress.Chainable =>
  cy.intercept(`**/api/accounts/${body.id}`, {
    body,
  });
