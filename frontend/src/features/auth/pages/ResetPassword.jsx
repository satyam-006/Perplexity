import { useState } from "react";
import { Link, useParams,useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { resetToken: token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const { handleResetPassword } = useAuth();
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setSubmitMessage("Your passwords don't match. Please try again.");
      return;
    }

    await handleResetPassword({ token, newPassword: formData.password });
    navigate("/login")
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
    setSubmitMessage("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b0f] px-4 py-12 text-white selection:bg-teal-300/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-teal-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-[-14rem] h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-[130px]"
      />

      <section className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#101318]/90 px-7 py-10 shadow-[0_32px_120px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-10">
        <Link to="/login" className="mb-9 flex w-fit items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-teal-300 text-[#08110f]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-6"
            >
              <path
                d="M12 2.75 20.25 12 12 21.25 3.75 12 12 2.75Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="m12 7.5 4.5 4.5-4.5 4.5L7.5 12 12 7.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Perplexity
          </span>
        </Link>

        <p className="mb-3 text-sm font-medium text-teal-200">
          Choose a new password
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Create a new password for your account. Use at least 6 characters.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="reset-password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="reset-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={6}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#0b0e12] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-200"
              >
                {showPassword ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5"
                  >
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.8 4.8 9.5 6-.3.5-1.3 1.8-2.8 3M6.2 6.2C3.9 7.7 2.7 9.7 2.5 11c.2.5 3.8 8 9.5 8 1.1 0 2.1-.3 3-.7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5"
                  >
                    <path
                      d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="reset-confirm-password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="reset-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={6}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your new password"
                className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#0b0e12] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
                aria-pressed={showConfirmPassword}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-200"
              >
                {showConfirmPassword ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5"
                  >
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.8 4.8 9.5 6-.3.5-1.3 1.8-2.8 3M6.2 6.2C3.9 7.7 2.7 9.7 2.5 11c.2.5 3.8 8 9.5 8 1.1 0 2.1-.3 3-.7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5"
                  >
                    <path
                      d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-teal-300 px-4 text-sm font-semibold text-[#07100e] transition hover:bg-teal-200 focus:outline-none focus:ring-4 focus:ring-teal-300/20"
          >
            Reset password
          </button>

          {submitMessage && (
            <p
              role="status"
              className="rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-3 text-sm leading-5 text-amber-100/80"
            >
              {submitMessage}
            </p>
          )}
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          <Link
            to="/login"
            className="font-medium text-teal-200 transition hover:text-teal-100"
          >
            Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ResetPassword;
