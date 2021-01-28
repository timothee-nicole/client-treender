import React from "react";
import FormUser from "../components/auth/FormUser";
import FormSignin from "../components/auth/FormSignin";

// This component has ONE goal
// IF USER HAS AN ACCOUNT, HE MUST SIGN IN
// IF USER HAS NO ACCOUNT, HE MUST CREATE ONE
// This component redirects the user to the relevant page

const Account = () => {
  const [isSignedUp, setIsSignedUp] = React.useState(true);

  function handleIsSignedUp() {
    console.log(isSignedUp);
    setIsSignedUp((elem) => !elem);
    console.log(isSignedUp);
  }
  console.log(isSignedUp);
  return (
    <>
      {isSignedUp ? (
        <FormSignin handleForm={handleIsSignedUp} />
      ) : (
        <FormUser action="create" handleForm={handleIsSignedUp} />
      )}
    </>
  );
};

export default Account;
