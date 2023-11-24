export default function TextBackground({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <div className={`feathered relative w-fit p-2 ${className ?? ""}`}>
      <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-xl bg-black/30 backdrop-blur"></div>
      {children}
    </div>
  );
}
