import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // * REDIRECT WHEN LOGGED IN
    if (isSuccess || user) {
      navigate("/");
    }

    // dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
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
            <div className="form-group">
              <Button style="btn-block">Submit</Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
