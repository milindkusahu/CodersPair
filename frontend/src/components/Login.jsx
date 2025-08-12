import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const styles = {
  label: "text-sm/6 font-medium",
  input:
    "input input-bordered bg-base-200 w-full rounded-md px-3 py-1.5 text-base focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600",
  button:
    "btn btn-primary flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2",
};

const Login = () => {
  const [emailId, setEmailId] = useState("ankit@x.com");
  const [password, setPassword] = useState("eaof#648SJJ_5");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password,
      });

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        emailId,
        password,
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="CodersPair"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-7 text-center text-2xl/9 font-bold tracking-tight">
          {isLoginForm ? "Sign in to your account" : "Create an account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={
            isLoginForm ? (e) => handleLogin(e) : (e) => handleSignup(e)
          }
        >
          {!isLoginForm && (
            <div className="flex gap-5">
              <div>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="firstName"
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="lastName"
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={styles.input}
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-xs text-info">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <p className="text-red-500">{error}</p>

          <div>
            <button type="submit" className={styles.button}>
              {isLoginForm ? "Sign in" : "Create an account"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm/6 cursor-pointer">
          {isLoginForm
            ? `Don't have an account? `
            : `Already have an account? `}
          <a
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="font-semibold text-info"
          >
            {isLoginForm ? "Register here" : "Login here"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
