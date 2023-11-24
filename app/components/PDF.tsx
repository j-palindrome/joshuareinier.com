import { icons } from "~/assets/assets";

export default function PDF({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={
        "relative mx-auto my-2 h-[calc(100vh-200px)] w-full" + (className || "")
      }
    >
      <button className="absolute right-0 top-0 z-40 m-2 rounded border border-white bg-black p-1">
        <a href={src} target="_blank">
          <img src={icons.fullScreen} height={16} width={16} />
        </a>
      </button>
      <object
        data={src}
        type="application/pdf"
        width="100%"
        height="100%"
        className="invert"
      ></object>
    </div>
  );
}
