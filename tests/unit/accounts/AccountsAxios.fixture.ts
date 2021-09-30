import { AccountDepositFormEntry } from '@/components/accounts/account/account-deposit-form/AccountDepositFormEntry';
import { AccountTransferFormEntry } from '@/components/accounts/account/account-transfer-form/AccountTransferFormEntry';
import { AccountWithdrawalFormEntry } from '@/components/accounts/account/account-withdrawal-form/AccountWithdrawalFormEntry';
import { CreateAccountFormEntry } from '@/components/accounts/account/create-account-form/CreateAccountFormEntry';
import axios, { AxiosError } from 'axios';

const mockedAccountsAxios = axios as jest.Mocked<typeof axios>;
mockedAccountsAxios.get.mockImplementation(url => {
  switch (url) {
    case 'http://localhost:8080/api/accounts':
      return Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            firstName: 'Ben',
            lastName: 'Scott',
            balance: 0.0,
          },
        ],
      });
    case 'http://localhost:8080/api/accounts/1':
      return Promise.resolve({
        status: 200,
        data: {
          id: 1,
          firstName: 'Ben',
          lastName: 'Scott',
          balance: 0.0,
        },
      });
    case 'http://localhost:8080/api/accounts/404':
      return Promise.reject({
        response: {
          status: 404,
        },
        message: 'Error: Request failed with status code 404',
      } as AxiosError);
    case 'http://localhost:8080/api/accounts/500':
      return Promise.reject({
        response: {
          status: 500,
        },
        message: 'Error: Request failed with status code 500',
      } as AxiosError);
    default:
      return Promise.reject(new Error('invalid mock path'));
  }
});
mockedAccountsAxios.post.mockImplementation((url, postData: CreateAccountFormEntry | AccountDepositFormEntry) => {
  switch (url) {
    case 'http://localhost:8080/api/accounts':
      postData = postData as CreateAccountFormEntry;
      return Promise.resolve({
        status: 200,
        data: {
          id: 1234,
          firstName: postData.firstName,
          lastName: postData.lastName,
          balance: 0.0,
        },
      });
    case 'http://localhost:8080/api/accounts/1234/deposit':
      postData = postData as AccountDepositFormEntry;
      return Promise.resolve({
        status: 200,
        data: {
          id: 1234,
          firstName: 'Ben',
          lastName: 'Scott',
          balance: postData.amount,
        },
      });
    case 'http://localhost:8080/api/accounts/1234/withdrawal':
      postData = postData as AccountWithdrawalFormEntry;
      return Promise.resolve({
        status: 200,
        data: {
          id: 1234,
          firstName: 'Ben',
          lastName: 'Scott',
          balance: postData.amount,
        },
      });
    case 'http://localhost:8080/api/accounts/1234/transfer':
      postData = postData as AccountTransferFormEntry;
      return Promise.resolve({
        status: 200,
        data: {
          id: 1234,
          firstName: 'Ben',
          lastName: 'Scott',
          balance: postData.amount,
        },
      });
  }
  return Promise.reject(new Error('invalid mock path'));
});

export default mockedAccountsAxios;
