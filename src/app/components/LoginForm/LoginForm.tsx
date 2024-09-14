import { useState } from "react";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import { Action } from "@/app/reducers/cmdInputReducer";

const LoginForm = ({ dispatch }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;

    if (email === "") {
      setEmail(target.value);
      dispatch({
        type: "just save command",
        value: target.value,
        consoleTitle: "Enter your email: ",
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
        email === "" ? "Enter your email: " : "Enter your password: "
      }
      type={email === "" ? "text" : "password"}
    ></ConsoleInput>
  );
};

interface Props {
  dispatch: React.Dispatch<Action>;
}

export default LoginForm;
