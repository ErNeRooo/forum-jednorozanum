import { useState } from "react";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import { Action } from "@/app/reducers/cmdInputReducer";
import HideString from "@/app/utils/HideString";

const RegisterForm = ({ dispatch }: Props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [inputText, setInputText] = useState("Enter your login: ");
  const [inputType, setInputType] = useState("text");

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;

    if (login === "") {
      if (target.value.length >= 4 && target.value.length <= 24) {
        setLogin(target.value);
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: inputText,
        });

        setInputText("Enter your password: ");
        setInputType("password");
      } else {
        dispatch({
          type: "wrong login length",
          value: target.value,
          consoleTitle: inputText,
        });
      }
    } else if (password === "") {
      if (target.value.length >= 8) {
        setPassword(target.value);
        dispatch({
          type: "just save command",
          value: HideString(target.value),
          consoleTitle: inputText,
        });

        setInputText("Confirm your password: ");
        setInputType("password");
      } else {
        dispatch({
          type: "to weak password",
          value: HideString(target.value),
          consoleTitle: inputText,
        });
      }
    } else {
      if (target.value === password) {
        dispatch({
          type: "just save command",
          value: HideString(target.value),
          consoleTitle: inputText,
        });
      } else {
        dispatch({
          type: "passwords does not match",
          value: HideString(target.value),
          consoleTitle: inputText,
        });
      }
    }

    target.value = "";
  };

  return (
    <ConsoleInput
      handler={handleOnEnter}
      consoleText={inputText}
      type={inputType}
    ></ConsoleInput>
  );
};

interface Props {
  dispatch: React.Dispatch<Action>;
}

export default RegisterForm;
