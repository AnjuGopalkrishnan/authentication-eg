import { type AxiosError, type AxiosResponse } from "axios";

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response) {
    const errorMessage: ConsoleError = {
      status: error.response.status,
      data: error.response.data,
    };
    console.error(errorMessage);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
  await Promise.reject(error);
};
