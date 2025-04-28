import { api } from "@/services/api";
import {
  LoginUser,
  LoginUserRes,
  SignupUser,
  SignupUserRes,
} from "../dto/user";

export class AuthRepository {
  async signupUser(body: SignupUser): Promise<SignupUserRes> {
    const { data } = await api.post<SignupUserRes>(`/auth/signup`, body);
    return data;
  }

  async loginUser(body: LoginUser): Promise<LoginUserRes> {
    const { data } = await api.post<LoginUserRes>(`/auth/signin`, body);
    return data;
  }

  async logoutUser(): Promise<void> {
    const { data } = await api.get(`/auth/signout`);
    return data;
  }
}
