import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {handleRegister} = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
    setSubmitMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleRegister(formData)
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

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#101318]/90 shadow-[0_32px_120px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl md:min-h-[610px] md:grid-cols-[1fr_0.92fr]">
        <div className="hidden flex-col justify-between border-r border-white/[0.07] bg-gradient-to-br from-white/[0.035] to-transparent p-12 md:flex">
          <Link to="/login" className="flex w-fit items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-teal-300 text-[#08110f] shadow-lg shadow-teal-300/10">
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
            <span className="text-lg font-semibold tracking-tight">Perplexity</span>
          </Link>

          <div className="max-w-md pb-4">
            <div className="mb-7 flex size-12 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/[0.08] text-teal-200">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-6"
              >
                <path
                  d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
            <p className="mb-4 text-sm font-medium text-teal-200">
              A clearer way to explore
            </p>
            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-white">
              Your next great
              <br />
              question starts here.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-400">
              Get thoughtful answers, discover new ideas, and make sense of
              anything - all in one place.
            </p>
          </div>

          <p className="text-xs text-slate-600">
            Ask more. Understand more.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-12 md:px-10 lg:px-14">
          <div className="w-full max-w-sm">
            <div className="mb-9 md:hidden">
              <Link to="/login" className="flex w-fit items-center gap-3">
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
            </div>

            <div className="mb-7">
              <p className="mb-3 text-sm text-slate-400">Get started</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your space for questions, ideas, and discovery.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="register-username"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Username
                </label>
                <input
                  id="register-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#0b0e12] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                />
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#0b0e12] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                />
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-300 px-4 text-sm font-semibold text-[#07100e] transition hover:bg-teal-200 focus:outline-none focus:ring-4 focus:ring-teal-300/20"
              >
                Create account
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-4"
                >
                  <path
                    d="M4 10h12m-5-5 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-teal-200 transition hover:text-teal-100"
              >
                Sign in
              </Link>
            </p>
            <p className="mt-8 text-center text-xs leading-5 text-slate-600">
              By creating an account, you agree to our{" "}
              <a href="#terms" className="text-slate-400 hover:text-slate-300">
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                className="text-slate-400 hover:text-slate-300"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
