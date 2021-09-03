import { AccountFormEntry } from '@/components/accounts/account/account-form/AccountFormEntry';
import axios from 'axios';

const mockedAccountsAxios = axios as jest.Mocked<typeof axios>;
mockedAccountsAxios.get.mockImplementation(url => {
  switch (url) {
    case 'https://localhost:8080/api/accounts':
      return Promise.resolve({
        data: [
          {
            id: 1,
            firstName: 'Ben',
            lastName: 'Scott',
            email: 'bscott@ipponusa.com',
            balance: 0.0,
          },
        ],
      });
    case 'https://localhost:8080/api/accounts/1':
      return Promise.resolve({
        data: {
          id: 1,
          firstName: 'Ben',
          lastName: 'Scott',
          email: 'bscott@ipponusa.com',
          balance: 0.0,
        },
      });
    default:
      return Promise.reject(new Error('not found'));
  }
});
mockedAccountsAxios.post.mockImplementation((url, postData: AccountFormEntry) => {
  if (url === 'https://localhost:8080/api/accounts') {
    return Promise.resolve({
      data: {
        id: 1234,
        firstName: postData.firstName,
        lastName: postData.lastName,
        email: postData.email,
        balance: 0.0,
      },
    });
  }
  return Promise.reject(new Error('not found'));
});

export default mockedAccountsAxios;
