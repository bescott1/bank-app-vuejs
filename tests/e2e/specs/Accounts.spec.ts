import { interceptAccount, interceptGetAccounts, interceptPostAccounts } from '../fixtures/AccountsIntercepts.fixture';
import { dataSelector } from '../utils/DataSelector';

describe('Accounts', () => {
  beforeEach(() => {
    interceptGetAccounts([
      {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        balance: 0.0,
      },
    ]);
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
    cy.contains(dataSelector('accounts-table.header.balance'), 'Balance');
    cy.contains(dataSelector('accounts-table.row.0.action.view'), 'View Account');
    cy.contains(dataSelector('accounts-table.row.0.id'), '1');
    cy.contains(dataSelector('accounts-table.row.0.first-name'), 'Ben');
    cy.contains(dataSelector('accounts-table.row.0.last-name'), 'Scott');
    cy.contains(dataSelector('accounts-table.row.0.balance'), '$0.00');
  });

  it('Should push to view account page', () => {
    interceptAccount({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 0.0,
    });
    cy.get(dataSelector('accounts-table.row.0.action.view')).click();
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1'));
  });

  it('Should push to deposit page', () => {
    cy.get(dataSelector('accounts-table.row.0.action.deposit')).click();
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1/deposit'));
  });

  it('Should push to withdraw page', () => {
    cy.get(dataSelector('accounts-table.row.0.action.withdraw')).click();
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1/withdraw'));
  });

  it('Should push to transfer page', () => {
    cy.get(dataSelector('accounts-table.row.0.action.transfer')).click();
    cy.location().should(loc => expect(loc.pathname).to.eq('/accounts/1/transfer'));
  });

  describe('Add a new account', () => {
    it('Should show add account form with disabled submit', () => {
      cy.get(dataSelector('add-account.form')).should('not.exist');

      cy.get(dataSelector('add-account')).click();
      cy.contains(dataSelector('add-account.form.first-name.label'), 'First Name');
      cy.contains(dataSelector('add-account.form.last-name.label'), 'Last Name');
      cy.get(dataSelector('add-account.form.submit')).should('be.disabled');
    });

    it('Should not fill in add account form and see errors', () => {
      cy.get(dataSelector('add-account')).click();
      cy.get(dataSelector('add-account.form.first-name.value')).type('Given Name');
      cy.get(dataSelector('add-account.form.first-name.value')).clear();
      cy.get(dataSelector('add-account.form.last-name.value')).type('Surname');
      cy.get(dataSelector('add-account.form.last-name.value')).clear();

      cy.get(dataSelector('add-account.form.first-name.value')).click();

      cy.contains(dataSelector('add-account.form.first-name.error'), 'First Name is a required field');
      cy.contains(dataSelector('add-account.form.last-name.error'), 'Last Name is a required field');
    });

    it('Should fill in add account form to enable submit', () => {
      cy.get(dataSelector('add-account')).click();
      cy.get(dataSelector('add-account.form.first-name.value')).type('Given Name');
      cy.get(dataSelector('add-account.form.last-name.value')).type('Surname');
      cy.get(dataSelector('add-account.form.submit')).should('be.enabled');
    });

    it('Should submit new account and see it in the list then hide add account section', () => {
      cy.get(dataSelector('add-account')).click();
      cy.get(dataSelector('add-account.form.first-name.value')).type('Givenname');
      cy.get(dataSelector('add-account.form.last-name.value')).type('Surname');
      interceptPostAccounts({
        id: 2,
        firstName: 'Givenname',
        lastName: 'Surname',
        balance: 0.0,
      });

      cy.get(dataSelector('add-account.form.submit')).click();

      cy.contains(dataSelector('accounts-table.row.1.action.view'), 'View Account');
      cy.contains(dataSelector('accounts-table.row.1.id'), '2');
      cy.contains(dataSelector('accounts-table.row.1.first-name'), 'Givenname');
      cy.contains(dataSelector('accounts-table.row.1.last-name'), 'Surname');
      cy.contains(dataSelector('accounts-table.row.1.balance'), '$0.00');
      cy.get(dataSelector('add-account.form')).should('not.exist');
    });
  });
});
