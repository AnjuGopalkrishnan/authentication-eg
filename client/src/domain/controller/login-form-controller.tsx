import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { LoginUser } from "../dto/user";
import { AuthRepository } from "../repository/auth.repository";
import { useLoginUserUsecase } from "../usecase/auth.usecase";

export default function LoginFormController() {
  const navigate = useNavigate();
  const setUserDetails = useUserStore((state) => state.setUserDetails);

  const {
    isPending,
    mutateAsync: loginUser,
    isError,
    error,
    isSuccess,
  } = useLoginUserUsecase(new AuthRepository());

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    try {
      const userResponse = await loginUser(data);
      if (userResponse) {
        // Save user details in zustand store
        setUserDetails(userResponse);
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return {
    onSubmit,
    isPending,
    isError,
    error,
    isSuccess,
  };
}
