import Form from "../../Components/UserAuth/OTPVerifyForRestPassword/Form";
import Error404 from "../../Components/Common/Error404";
import { useContext } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";

export default function OTPVerifyForRestPassword() {
  const { email } = useContext(DataContext);
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
