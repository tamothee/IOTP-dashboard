import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginPage from "./login/page";

export default function Auth({ children }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return <div>{children}</div>;
  } else {
    <LoginPage/>
  }
}
