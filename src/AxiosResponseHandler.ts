import { AxiosResponse } from 'axios';

type Converter<From, To> = (from: From) => To;

export const convertResponse = <From, To>(converter: Converter<From, To>) => (axiosResponse: AxiosResponse<From>): To =>
  converter(axiosResponse.data);
