import { Link } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { AuthRepository } from "@/domain/repository/auth.repository";
import { useLogoutUserUsecase } from "@/domain/usecase/auth.usecase";
import { Button } from "../ui/button";

const Header = () => {
  const user = useUserStore((state) => state.userDetails);
  const logout = useUserStore((state) => state.logout);

  const { mutateAsync: logoutUser } = useLogoutUserUsecase(
    new AuthRepository()
  );

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await logoutUser();
      logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="w-[96%] py-5 justify-between  flex items-center lg:w-[90%] mx-auto">
      <Link to={"/"} className="py-2 px-2 text-2xl border shadow">
        <span className="bg-orange-500 py-1 px-2 rounded-[5px] shadow text-white">
          easy
        </span>
        generator
      </Link>
      <ul className="flex items-center gap-x-3">
        {!user ? (
          <>
            <li>
              <Link
                className="py-2 px-2 transition-all duration-300 border-b border-b-transparent hover:border-b-accent text-xl hover:text-orange-500 flex items-center justify-center gap-x-2"
                to="/login"
              >
                Sign in
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button
                variant="ghost"
                className="py-2 px-2 transition-all duration-300 border-b border-b-transparent hover:border-b-accent text-lg hover:text-orange-500 cursor-pointer"
                onClick={handleLogout}
              >
                Sign out
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
