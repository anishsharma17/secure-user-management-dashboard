import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./LoginForm.api";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { AuthData,  useAuth } from "../../context/auth-context";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";


const initialState = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
};


type FormState = typeof initialState;
type LoginPayload = Omit<FormState, "errors">;
type ErrorBody = { status: number; message: string };
export const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [formState, setFormState] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  const authMutation = useMutation( (payload : LoginPayload) => {
    return loginUser(payload.email, payload.password);
  },
    {
      onSuccess: (response: AuthData) => {
        toast.success("Login Successfully!");
        setAuth(response);
        navigate(location.state || "/dashboard", { state: null });
      },
      onError: (err: AxiosError) => {
        const repsonse = err.response as AxiosResponse<ErrorBody, Record<string, unknown>>;
        setError(repsonse?.data.message);
      },
    }
  );

  const validation = (formValues: FormState) => {
    setError("");
    setFormState((old) => {
      return { ...old, errors: { ...old.errors, email: "", password: "" } };
    });
    // email validation patterns
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!(formValues.email && regexEmail.test(formValues.email))) {
      setFormState((old) => {
        return { ...old, errors: { ...old.errors, email: "Please enter correct email! " } };
      });
      return false;
    }

    //password validation
    if (!(formValues.password.length && formValues.password.length > 5)) {
      setFormState((old) => {
        return { ...old, errors: { ...old.errors, password: "Please enter password greater then 5 character! " } };
      });
      return false;
    }
    return true;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const valid = validation(formState);
    if (valid) {
      authMutation.mutate( { email: formState.email, password: formState.password } );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value.trim() });
  };

  return (
      <div className="mx-auto mb-40 font-sans sm:h-full pt-28">
        <div className="h-full p-4 sm:mt-0">
          <h1 className="p-5 mx-auto text-3xl text-center text-red-700">{error}</h1>
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="overflow-hidden sm:rounded-sm">
              <div className="px-4 py-5 sm:p-6">
                <h2 data-testid="heading" className="text-4xl text-center text-gray-800 font-THIN">
                  Log In
                </h2>
                <div data-testid="email" className="mt-10 col-span-30">
                  <label
                    htmlFor="email"
                    aria-label="email"
                    className="inline-block after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700"
                  >Email
                  </label>
                  <input
                    type="text"
                    value={formState.email}
                    onChange={handleChange}
                    name="email"
                    id="email"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {formState.errors.email ? (
                    <p className="text-red-700" id="emai_err_msg">
                      {formState.errors.email}
                    </p>
                  ) : null}
                </div>
                <div data-testid="password" className="mt-5 col-span-30">
                  <label
                    htmlFor="password"
                    aria-label="password"
                    className="inline-block after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="text-xl relative  text-[#128d6a]">
                    {open === false ? (
                      <AiFillEyeInvisible
                        className="absolute block mt-4 text-center right-5"
                        onClick={toggle}
                      />
                    ) : (
                      <AiFillEye
                        className="absolute block mt-4 text-center right-5"
                        onClick={toggle}
                      />
                    )}
                  </div>
                  <input
                    type={open === true ? "text" : "password"}
                    name="password"
                    id="password"
                    min={6}
                    value={formState.password}
                    onChange={handleChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />

                  {formState.errors.password ? (
                    <p className="text-red-700" id="pass_err_msg">
                      {formState.errors.password}
                    </p>
                  ) : null}
                   <p className="after:content after:ml-0.5 after:text-sky-600 lg:w-1/3 md:w-2/3 w-full text-sky-600 mt-2">
                <a data-testid="forgetpasswordlink" href="/signup">
                  Create Account
                </a>
              </p>
                </div>
              </div>
              <div data-testid="button" className="px-4 py-3 text-left sm:px-6">
                <button type="submit" className="btn-2">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
  );
  
};
