import { interceptAccount, interceptAccountWithdraw } from '../fixtures/AccountsIntercepts.fixture';
import { dataSelector } from '../utils/DataSelector';

describe('Withdraw Amount', () => {
  beforeEach(() => {
    interceptAccountWithdraw({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 2.5,
    }).as('withdraw');
    cy.visit('/accounts/1/withdraw');
  });
  it('Should show account withdraw form with disabled submit', () => {
    cy.contains(dataSelector('account-withdraw.title'), 'Withdraw');
    cy.contains(dataSelector('account-withdraw.form.amount.label'), 'Amount');
    cy.get(dataSelector('account-withdraw.form.submit')).should('be.disabled');
  });

  it('Should see errors on bad amounts', () => {
    cy.get(dataSelector('account-withdraw.form.amount.value')).type('0.009');
    cy.get(dataSelector('account-withdraw.title')).click();
    cy.contains(dataSelector('account-withdraw.form.amount.error'), 'Enter a valid amount such as 1.23');

    cy.get(dataSelector('account-withdraw.form.amount.value')).clear();
    cy.get(dataSelector('account-withdraw.form.amount.value')).type('-1.23');
    cy.get(dataSelector('account-withdraw.title')).click();
    cy.contains(dataSelector('account-withdraw.form.amount.error'), 'Amount must be greater than or equal to 0.01');

    cy.get(dataSelector('account-withdraw.form.amount.value')).clear();
    cy.get(dataSelector('account-withdraw.title')).click();
    cy.contains(dataSelector('account-withdraw.form.amount.error'), 'Amount must be a number');
  });

  it('Should submit a valid amount and push to Account Details to display balance', () => {
    interceptAccount({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 1.23,
    });

    cy.get(dataSelector('account-withdraw.form.amount.value')).type('2.50');
    cy.get(dataSelector('account-withdraw.form.submit')).click();

    cy.wait('@withdraw').then(interception => expect(interception.response.body.balance).to.eq(2.5));
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1'));
  });
});
