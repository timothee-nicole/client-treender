import React from "react";
import FormTree from "../components/FormTree";

// Page through which we will render the CREATE form component

const CreateTree = () => {
  return (
    <div>
      <FormTree action={"create"} />
    </div>
  );
};

export default CreateTree;
