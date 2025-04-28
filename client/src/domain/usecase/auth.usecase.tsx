import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginUser, SignupUser } from "../dto/user";
import { AuthRepository } from "../repository/auth.repository";

export const useSignupUserUsecase = (repository: AuthRepository) => {
  return useMutation({
    mutationKey: ["signupUser"],
    mutationFn: (body: SignupUser) => repository.signupUser(body),
    onSuccess: async () => {
      toast.success("Sign up successful!");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error?.response?.data.message);
      console.error(error);
    },
  });
};

export const useLoginUserUsecase = (repository: AuthRepository) => {
  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (body: LoginUser) => repository.loginUser(body),
    onSuccess: async () => {
      toast.success("Sign in successful!");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error?.response?.data.message);
      console.error(error);
    },
  });
};

export const useLogoutUserUsecase = (repository: AuthRepository) => {
  return useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: () => repository.logoutUser(),
    onSuccess: async () => {
      toast.success("Sign out successful!");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error?.response?.data.message);
      console.error(error);
    },
  });
};
