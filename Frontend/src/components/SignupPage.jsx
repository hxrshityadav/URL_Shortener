import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const submitLock = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    mode: "onTouched",
  });

  const password = watch("password");

  const onRegister = async (data) => {
    if (submitLock.current) return;
    if (!data.agreeTerms) {
      toast.error("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    submitLock.current = true;
    setLoader(true);
    try {
      const requestPayload = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: ["user"],
      };

      await api.post("/api/auth/public/register", requestPayload);
      toast.success("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Try again.");
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
          Create your account
        </h2>
        <p className="text-sm text-text-secondary text-center mb-8">
          Start shortening links for free
        </p>

        <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="input"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="text-xs text-destructive">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs text-destructive">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              type="password"
              placeholder="Choose a secure password"
              className="input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-xs text-destructive">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => val === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-destructive">{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className="flex items-start gap-2.5 mt-1">
            <input
              id="agreeTerms"
              type="checkbox"
              className="mt-1 accent-primary cursor-pointer"
              {...register("agreeTerms", { required: true })}
            />
            <label htmlFor="agreeTerms" className="text-xs text-text-secondary leading-snug cursor-pointer select-none">
              I agree to the{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loader}
            className="btn-primary w-full py-3 text-center mt-3 cursor-pointer"
          >
            {loader ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors duration-normal">
            Log in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
