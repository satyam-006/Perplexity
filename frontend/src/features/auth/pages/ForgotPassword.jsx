import { useState } from "react";
import { Link} from "react-router";
import { useAuth } from "../hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");


  const { handleForgotPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleForgotPassword({email})
    setSubmitMessage(
      "A password reset link has been sent to your registered email address. Please check your inbox and follow the instructions to reset your password.",
    );
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
          Account recovery
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot password?
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Enter the email address associated with your account and we’ll help
          you get back in.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="forgot-password-email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="forgot-password-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitMessage("");
              }}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#0b0e12] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
            />
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-teal-300 px-4 text-sm font-semibold text-[#07100e] transition hover:bg-teal-200 focus:outline-none focus:ring-4 focus:ring-teal-300/20"
          >
            Send recovery email
          </button>

          {submitMessage && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-teal-300/15 bg-teal-300/[0.06] px-4 py-3 text-sm leading-5 text-teal-100/80"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-300/15 text-teal-200">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-3.5"
                >
                  <path
                    d="m4 10 4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p>{submitMessage}</p>
            </div>
          )}
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-medium text-teal-200 transition hover:text-teal-100"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;
