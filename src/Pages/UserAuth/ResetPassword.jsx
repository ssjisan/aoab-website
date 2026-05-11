import Form from "../../Components/UserAuth/ResetPassword/Form";
import { useContext } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import Error404 from "../../Components/Common/Error404";

export default function ResetPassword() {
  const { email } = useContext(DataContext);

  // Configure Style End
  return (
    <>
      {email === "" ? (
        <Error404 />
      ) : (
        <div>
          <Form />
        </div>
      )}
    </>
  );
}
