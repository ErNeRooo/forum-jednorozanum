import { useState } from "react";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import { Action } from "@/app/reducers/cmdInputReducer";
import GetUserNameByEmail from "@/app/utils/GetUserNameByEmail";
import LogInAccount from "@/app/utils/LogInAccount";
import HideString from "@/app/utils/HideString";
import { useRouter } from "next/navigation";

const LoginForm = ({ dispatch, ExitForm }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const router = useRouter();

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;

    if (email === "") {
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(target.value)) {
        setEmail(target.value);
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: "Enter your email: ",
        });
      } else {
        dispatch({
          type: "not valid email format",
          value: target.value,
          consoleTitle: "Enter your email: ",
        });
      }

      target.value = "";
    } else if (password === "") {
      setPassword(target.value);

      LogInAccount(email, target.value).then(({ isLoggedIn, errorMessage }) => {
        if (isLoggedIn) {
          dispatch({
            type: "just save command",
            value: HideString(target.value),
            consoleTitle: "Enter your password: ",
          });

          setIsInputVisible(false);

          GetUserNameByEmail(email).then((name) => {
            dispatch({
              type: "login completed",
              value: name,
              consoleTitle: "Enter your password: ",
            });
          });

          setTimeout(() => {
            console.log("redirecting...");

            router.push("/explore");
          }, 3000);
        } else {
          console.log(errorMessage);

          if (errorMessage === "Firebase: Error (auth/wrong-password).") {
            dispatch({
              type: "wrong password",
              value: HideString(target.value),
              consoleTitle: "Enter your password: ",
            });
          } else if (
            errorMessage === "Firebase: Error (auth/user-not-found)."
          ) {
            dispatch({
              type: "user not found",
              value: HideString(target.value),
              consoleTitle: "Enter your password: ",
            });
          } else {
            dispatch({
              type: "account log in error",
              value: HideString(target.value),
              consoleTitle: "Enter your password: ",
            });
          }

          ExitForm();
        }

        setEmail("");
        setPassword("");
        target.value = "";
      });
    }
  };

  return (
    isInputVisible && (
      <ConsoleInput
        handler={handleOnEnter}
        consoleText={
          email === "" ? "Enter your email: " : "Enter your password: "
        }
        type={email === "" ? "text" : "password"}
        isArrowsActive={false}
      ></ConsoleInput>
    )
  );
};

interface Props {
  dispatch: React.Dispatch<Action>;
  ExitForm: () => void;
}

export default LoginForm;
