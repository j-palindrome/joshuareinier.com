import { Link, useLocation, useSearchParams } from "@remix-run/react";

export default function Tag({
  children,
  to,
  keepSearch = true,
}: {
  children: string;
  to: string | (() => void);
  keepSearch?: boolean;
}) {
  const { search } = useLocation();

  const className =
    "inline-block w-fit rounded-full border border-blue-500 px-2 font-menu mouse:hover:bg-gray-700 touch:active:bg-gray-700 transition-colors duration-300 whitespace-nowrap my-1";
  return (
    <>
      {typeof to === "string" ? (
        <Link to={to + (keepSearch ? search : "")} className={className}>
          {children}
        </Link>
      ) : (
        <button className={className} onClick={to}>
          {children}
        </button>
      )}
    </>
  );
}
