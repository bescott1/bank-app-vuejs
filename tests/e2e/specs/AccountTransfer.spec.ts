import { interceptAccount, interceptAccountTransfer } from '../fixtures/AccountsIntercepts.fixture';
import { dataSelector } from '../utils/DataSelector';

describe('Transfer Amount', () => {
  beforeEach(() => {
    interceptAccountTransfer({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 2.5,
    }).as('transfer');
    cy.visit('/accounts/1/transfer');
  });
  it('Should show account transfer form with disabled submit', () => {
    cy.contains(dataSelector('account-transfer.title'), 'Transfer');
    cy.contains(dataSelector('account-transfer.form.amount.label'), 'Amount');
    cy.contains(dataSelector('account-transfer.form.destination-id.label'), 'Destination Id');
    cy.get(dataSelector('account-transfer.form.submit')).should('be.disabled');
  });

  it('Should see errors on bad amounts', () => {
    cy.get(dataSelector('account-transfer.form.amount.value')).type('0.009');
    cy.get(dataSelector('account-transfer.title')).click();
    cy.contains(dataSelector('account-transfer.form.amount.error'), 'Enter a valid amount such as 1.23');

    cy.get(dataSelector('account-transfer.form.amount.value')).clear();
    cy.get(dataSelector('account-transfer.form.amount.value')).type('-1.23');
    cy.get(dataSelector('account-transfer.title')).click();
    cy.contains(dataSelector('account-transfer.form.amount.error'), 'Amount must be greater than or equal to 0.01');

    cy.get(dataSelector('account-transfer.form.amount.value')).clear();
    cy.get(dataSelector('account-transfer.title')).click();
    cy.contains(dataSelector('account-transfer.form.amount.error'), 'Amount must be a number');

    cy.get(dataSelector('account-transfer.form.destination-id.value')).type('0.009');
    cy.get(dataSelector('account-transfer.title')).click();
    cy.contains(dataSelector('account-transfer.form.destination-id.error'), 'Destination Id must be an integer');

    cy.get(dataSelector('account-transfer.form.destination-id.value')).clear();
    cy.get(dataSelector('account-transfer.form.destination-id.value')).type('-1.23');
    cy.get(dataSelector('account-transfer.title')).click();
    cy.contains(dataSelector('account-transfer.form.destination-id.error'), 'Destination Id must be a positive number');

    cy.get(dataSelector('account-transfer.form.destination-id.value')).clear();
    cy.get(dataSelector('account-transfer.title')).click();
    cy.contains(dataSelector('account-transfer.form.destination-id.error'), 'Destination Id must be a number');
  });

  it('Should submit a valid amount and destination id and push to Account Details to display balance', () => {
    interceptAccount({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 1.23,
    });

    cy.get(dataSelector('account-transfer.form.amount.value')).type('2.50');
    cy.get(dataSelector('account-transfer.form.destination-id.value')).type('2');
    cy.get(dataSelector('account-transfer.form.submit')).click();

    cy.wait('@transfer').then(interception => expect(interception.response.body.balance).to.eq(2.5));
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1'));
  });
});
