import { AccountFormEntry } from '@/components/accounts/account/account-form/AccountFormEntry';
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
mockedAccountsAxios.post.mockImplementation((url, postData: AccountFormEntry) => {
  if (url === 'http://localhost:8080/api/accounts') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 1234,
        firstName: postData.firstName,
        lastName: postData.lastName,
        balance: 0.0,
      },
    });
  }
  return Promise.reject(new Error('invalid mock path'));
});

export default mockedAccountsAxios;
