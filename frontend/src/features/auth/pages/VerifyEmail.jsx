import { useState } from "react";
import { Link } from "react-router";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";


const VerifyEmail = () => {
  const [resendMessage, setResendMessage] = useState("");

  const {user} = useSelector(state=>state.auth)

  if(user){
    return <Navigate to={"/"} replace/>
  }

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

      <section className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#101318]/90 px-7 py-10 text-center shadow-[0_32px_120px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-10">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/[0.08] text-teal-200">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-7"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="m4 7 8 6 8-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Verify Email</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
          We sent you a verification link. Open the email and follow the link to
          verify your address.
        </p>

        <button
          type="button"
          onClick={() =>
            setResendMessage(
              "Resending isn't available yet. Please try again later.",
            )
          }
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-teal-300/10"
        >
          Resend email
        </button>

        {resendMessage && (
          <p role="status" className="mt-3 text-sm text-slate-400">
            {resendMessage}
          </p>
        )}

        <p className="mt-6 text-sm text-slate-400">
          Already verified?{" "}
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

export default VerifyEmail;
