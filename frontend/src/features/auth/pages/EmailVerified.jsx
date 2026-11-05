import { Link } from "react-router";

const EmailVerified = () => (
  <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b0f] px-4 py-12 text-white selection:bg-teal-300/30">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-40 top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-teal-500/10 blur-[120px]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 bottom-[-14rem] h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-[130px]"
    />

    <section className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#101318]/90 px-7 py-10 text-center shadow-[0_32px_120px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-10">
      <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/[0.08] text-teal-200">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="size-7"
        >
          <path
            d="m5 12.5 4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">Email verified</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
        Your email address has been verified. You can now sign in to your
        account.
      </p>

      <Link
        to="/login"
        className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-xl bg-teal-300 px-4 text-sm font-semibold text-[#07100e] transition hover:bg-teal-200 focus:outline-none focus:ring-4 focus:ring-teal-300/20"
      >
        Sign in
      </Link>
    </section>
  </main>
);

export default EmailVerified;
