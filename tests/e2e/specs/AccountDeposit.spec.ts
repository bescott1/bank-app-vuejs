import { interceptAccount, interceptAccountDeposit } from '../fixtures/AccountsIntercepts.fixture';
import { dataSelector } from '../utils/DataSelector';

describe('Deposit Amount', () => {
  beforeEach(() => {
    interceptAccountDeposit({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 1.23,
    }).as('deposit');
    cy.visit('/accounts/1/deposit');
  });
  it('Should show account deposit form with disabled submit', () => {
    cy.contains(dataSelector('account-deposit.title'), 'Deposit');
    cy.contains(dataSelector('account-deposit.form.amount.label'), 'Amount');
    cy.get(dataSelector('account-deposit.form.submit')).should('be.disabled');
  });

  it('Should see errors on bad amounts', () => {
    cy.get(dataSelector('account-deposit.form.amount.value')).type('0.009');
    cy.get(dataSelector('account-deposit.title')).click();
    cy.contains(dataSelector('account-deposit.form.amount.error'), 'Enter a valid amount such as 1.23');

    cy.get(dataSelector('account-deposit.form.amount.value')).clear();
    cy.get(dataSelector('account-deposit.form.amount.value')).type('-1.23');
    cy.get(dataSelector('account-deposit.title')).click();
    cy.contains(dataSelector('account-deposit.form.amount.error'), 'Amount must be greater than or equal to 0.01');

    cy.get(dataSelector('account-deposit.form.amount.value')).clear();
    cy.get(dataSelector('account-deposit.title')).click();
    cy.contains(dataSelector('account-deposit.form.amount.error'), 'Amount must be a number');
  });

  it('Should submit a valid amount and push to Account Details to display balance', () => {
    interceptAccount({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 1.23,
    });

    cy.get(dataSelector('account-deposit.form.amount.value')).type('1.23');
    cy.get(dataSelector('account-deposit.form.submit')).click();

    cy.wait('@deposit').then(interception => expect(interception.response.body.balance).to.eq(1.23));
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1'));
  });
});
