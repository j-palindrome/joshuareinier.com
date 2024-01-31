import { Link } from "@remix-run/react";

export default function Button({
  children,
  click,
}: React.PropsWithChildren & {
  click: string | React.MouseEventHandler;
}) {
  return (
    <Link
      className="rounded-lg bg-black/50 p-2 font-menu backdrop-blur"
      {...(typeof click === "string"
        ? { to: click }
        : { onClick: click, to: "" })}
    >
      {children}
    </Link>
  );
}
