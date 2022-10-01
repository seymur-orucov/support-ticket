import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email, password, confirm_password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // * REDIRECT WHEN LOGGED IN
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <Input
              props={{
                type: "text",
                id: "name",
                name: "name",
                placeholder: "Enter your name",
                required: true,
                value: name,
                onChange: onChange,
              }}
            />
            <Input
              props={{
                type: "text",
                id: "email",
                name: "email",
                placeholder: "Enter your email",
                required: true,
                value: email,
                onChange: onChange,
              }}
            />
            <Input
              props={{
                type: "password",
                id: "password",
                name: "password",
                placeholder: "Enter password",
                required: true,
                value: password,
                onChange: onChange,
              }}
            />
            <Input
              props={{
                type: "password",
                id: "confirm_password",
                name: "confirm_password",
                placeholder: "Confirm password",
                required: true,
                value: confirm_password,
                onChange: onChange,
              }}
            />
            <div className="form-group">
              <Button style="btn-block">Submit</Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
