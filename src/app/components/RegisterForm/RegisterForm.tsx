import { useState } from "react";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import { Action } from "@/app/reducers/cmdInputReducer";
import HideString from "@/app/utils/HideString";
import AddAccountToDatabase from "@/app/utils/AddAccountToDatabase";

const RegisterForm = ({ dispatch }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputText, setInputText] = useState("Enter your name: ");
  const [inputType, setInputType] = useState("text");

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;

    console.log("bajo jajo");

    if (name === "") {
      if (target.value.length >= 4 && target.value.length <= 24) {
        setName(target.value);
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: inputText,
        });

        setInputText("Enter your email: ");
        setInputType("text");
      } else {
        dispatch({
          type: "wrong login length",
          value: target.value,
          consoleTitle: inputText,
        });
      }
    } else if (email === "") {
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(target.value)) {
        setEmail(target.value);
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: inputText,
        });

        setInputText("Enter your password: ");
        setInputType("password");
      } else {
        dispatch({
          type: "not valid email format",
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

        AddAccountToDatabase(name, email, password);
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
