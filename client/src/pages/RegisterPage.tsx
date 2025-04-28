import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SignupFormController from "@/domain/controller/signup-form-controller";
import { SignupUser } from "@/domain/dto/user";
import { signupUserSchema } from "@/lib/yup-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthButton from "@/components/common/auth-button";

const RegisterPage = () => {
  const { onSubmit, isPending } = SignupFormController();
  const userSignupForm = useForm<SignupUser>({
    resolver: yupResolver(signupUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center w-full">
        <Form {...userSignupForm}>
          <form
            onSubmit={userSignupForm.handleSubmit(onSubmit)}
            className=" w-[96%] md:1/2 lg:w-1/3 xl:w-1/4 bg-white   transition-all duration-300 hover:shadow-sm py-10 px-10 rounded-md border-primary border cursor-pointer"
          >
            <FormField
              control={userSignupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userSignupForm.control}
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
              control={userSignupForm.control}
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

            <AuthButton type="submit" text="Sign up" loading={isPending} />

            <div className="mb-3">
              <p className="text-center">
                Already Have An Account ?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  Sign in{" "}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
