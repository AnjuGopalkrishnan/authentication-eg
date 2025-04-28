import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoginFormController from "@/domain/controller/login-form-controller";
import { LoginUser } from "@/domain/dto/user";
import { loginUserSchema } from "@/lib/yup-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/components/ui/form";
import AuthButton from "@/components/common/auth-button";

const LoginPage = () => {
  const { onSubmit, isPending } = LoginFormController();
  const userLoginForm = useForm<LoginUser>({
    resolver: yupResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center w-full">
        <Form {...userLoginForm}>
          <form
            onSubmit={userLoginForm.handleSubmit(onSubmit)}
            className=" w-[96%] md:1/2 lg:w-1/3 xl:w-1/4 bg-white   transition-all duration-300 hover:shadow-sm py-10 px-10 rounded-md border-primary border cursor-pointer"
          >
            <FormField
              control={userLoginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userLoginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AuthButton type="submit" text="Sign in" loading={isPending} />

            <div className="mb-3">
              <p className="text-center">
                Don't have an account ?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  Sign Up{" "}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
