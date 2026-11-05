const Loading = ({ label = "Loading..." }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-screen items-center justify-center bg-[#090b0f] px-4 text-slate-300"
  >
    <span
      aria-hidden="true"
      className="mr-3 size-8 animate-spin rounded-full border-2 border-teal-300/25 border-t-teal-300"
    />
    <span className="text-xl">{label}</span>
  </div>
);

export default Loading;
