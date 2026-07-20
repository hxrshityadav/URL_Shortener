import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const submitLock = useRef(false);
  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onLogin = async (data) => {
    if (submitLock.current) return;
    submitLock.current = true;
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/public/login", data);
      setToken(response.token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoader(false);
      submitLock.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px] bg-bg-surface border border-border rounded-2xl p-8 md:p-10 shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-text-primary">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>Snipr</span>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-text-primary tracking-tight text-center mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-text-secondary text-center mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Username or Email
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="text-xs text-destructive">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-primary hover:text-primary-hover transition-colors duration-normal">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="input"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-xs text-destructive">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loader}
            className="btn-primary w-full py-3 text-center mt-2 cursor-pointer"
          >
            {loader ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="relative my-7 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-border" />
          <span className="relative z-10 px-4 bg-bg-surface text-xs text-text-muted uppercase tracking-wider">
            or
          </span>
        </div>

        <button
          type="button"
          onClick={() => toast.success("GitHub OAuth login simulated")}
          className="btn-ghost w-full py-3 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
          Sign in with GitHub
        </button>

        <p className="text-center text-sm text-text-secondary mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:text-primary-hover font-medium transition-colors duration-normal">
            Sign up →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
