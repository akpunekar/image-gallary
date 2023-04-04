import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  /* Destructuring the formData object. */
  const { username, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* Destructuring the state object. */
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    /* Checking if there is an error and if there is, it will display a toast message. */
    if (isError) {
      toast.error("User Exist or " + message);
    }
    if (isSuccess || user) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    /* A function that is used to update the state of the formData object. */
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    /* Checking if the password and confirmPassword are the same. If they are not, it will display a
    toast message. If they are the same, it will create a userData object and dispatch the register
    action. */
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        password,
      };
      dispatch(register(userData));
    }
  };

  /* Checking if the isLoading state is true. If it is, it will display a spinner. */
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
            <input
              type="text"
              className="form-control"
              id="name"
              name="username"
              value={username}
              placeholder="Enter username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
