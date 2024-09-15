import { UserCredential } from "firebase/auth";

interface UserCredentialsContextTypes {
  userCredentials: UserCredential | null;
  setUserCredentials: React.Dispatch<
    React.SetStateAction<UserCredential | null>
  >;
}

export default UserCredentialsContextTypes;
