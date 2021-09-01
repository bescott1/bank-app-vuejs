import axios from 'axios';

const mockedAccountsAxios = axios as jest.Mocked<typeof axios>;
mockedAccountsAxios.get.mockImplementation(url => {
  switch (url) {
    case 'https://localhost:8080/accounts':
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
    case 'https://localhost:8080/accounts/1':
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

export default mockedAccountsAxios;
