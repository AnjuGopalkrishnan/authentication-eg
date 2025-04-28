import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthRepository } from "../repository/auth.repository";
import { useSignupUserUsecase } from "../usecase/auth.usecase";
import { SignupUser } from "../dto/user";

export default function SignupFormController() {
  const navigate = useNavigate();
  const {
    isPending,
    mutateAsync: signupUser,
    isError,
    error,
    isSuccess,
  } = useSignupUserUsecase(new AuthRepository());

  const onSubmit: SubmitHandler<SignupUser> = async (data) => {
    const userResponse = await signupUser(data);
    navigate("/login");
  };

  return {
    onSubmit,
    isPending,
    isError,
    error,
    isSuccess,
  };
}
