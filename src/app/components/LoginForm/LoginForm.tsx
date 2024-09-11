import { useState } from "react";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import { Action } from "@/app/reducers/cmdInputReducer";

const LoginForm = ({ dispatch }: Props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;

    if (login === "") {
      setLogin(target.value);
      dispatch({
        type: "just save command",
        value: target.value,
        consoleTitle: "Enter your login: ",
      });
    } else {
      setPassword(target.value);
      dispatch({
        type: "just save command",
        value: target.value,
        consoleTitle: "Enter your password: ",
      });
    }

    target.value = "";
  };

  return (
    <ConsoleInput
      handler={handleOnEnter}
      consoleText={
        login === "" ? "Enter your login: " : "Enter your password: "
      }
      type={login === "" ? "text" : "password"}
    ></ConsoleInput>
  );
};

interface Props {
  dispatch: React.Dispatch<Action>;
}

export default LoginForm;
