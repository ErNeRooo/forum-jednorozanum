import CheckIfEmailIsOccupied from "./CheckIfEmailIsOccupied";
import CheckIfNameIsOccupied from "./CheckIfNameIsOccupied";
import DeleteLoggedUser from "./DeleteLoggedUser";
import LogInAccount from "./LogInAccount";

const DeleteAccountIfExists = async (email: string, password: string) => {
  const isEmailOccupied = await CheckIfEmailIsOccupied(email);

  if (!isEmailOccupied) return;
  else {
    LogInAccount(email, password).then(({ isLoggedIn, errorMessage }) => {
      if (isLoggedIn) {
        DeleteLoggedUser().then(({ isSuccessfull, errorMessage }) => {
          if (isSuccessfull) {
            return;
          } else {
            throw new Error(errorMessage?.toString());
          }
        });
      } else {
        throw new Error(errorMessage?.toString());
      }
    });
  }
};

export default DeleteAccountIfExists;
