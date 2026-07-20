import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";
import { ArrowLeft, Home } from "lucide-react";

const ErrorPage = ({ message, variant = "generic" }) => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const title = variant === "notFound" ? "Page not found" : "Something went wrong";
  const body = message ?? (variant === "notFound"
    ? "This link may have been deleted or never existed."
    : "An unexpected error occurred. Please try again later.");

  const handleBack = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-base flex items-center justify-center overflow-hidden px-6">
      {/* Large watermark */}
      <div className="absolute font-semibold text-[120px] md:text-[200px] text-primary/5 leading-none select-none z-0">
        {variant === "notFound" ? "404" : "500"}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md gap-5">
        <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          {body}
        </p>
        <button
          onClick={handleBack}
          className="btn-primary mt-2 py-2.5 px-6 gap-2 cursor-pointer"
        >
          {token ? (
            <><ArrowLeft className="w-4 h-4" /> Back to Dashboard</>
          ) : (
            <><Home className="w-4 h-4" /> Go Home</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
