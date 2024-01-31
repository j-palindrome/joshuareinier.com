import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Section from "../../components/Section";

export const meta: V2_MetaFunction = () => [{ title: "Home" }];

export default function Index() {
  return (
    <>
      {/* <Canvas className="!h-screen !w-screen">
        <Scene />
      </Canvas> */}
      <Section>
        <h2>Creative Systems</h2>
        <div>
          <p>
            I help creative people with their process: I design generative
            workflows, integrating systems of information and time-management
            with research and art. Often, this involves custom-designed
            audiovisual systems with JavaScript/React, and{" "}
            <a href="https://cycling74.com/products/max">Max/MSP/Jitter</a>.
          </p>

          <div>
            <button className="h-12 w-full rounded-lg border border-white backdrop-blur transition-colors duration-300 hover:bg-selection">
              <a
                className="h-full w-full"
                href="mailto:joshuatreinier@gmail.com"
              >
                {" "}
                Schedule a meeting
              </a>
            </button>
          </div>
          <p>
            I am based in New York and available for in-person or Zoom
            consultations.
          </p>
          <div className="w-full flex-wrap justify-center child:flex-none md:flex">
            <Video
              src="/assets/vid/max-1.mp4"
              title="Microtonal Keyboard"
              desc="Mapping the keys to any microtonal scale, and mapping the data to a variety of parameters."
            />

            <Video
              src="/assets/vid/max-2.mp4"
              title="VorTEX"
              desc="A custom audio-reactive visual system, configured for improvising within a gradient of abstraction (coded for Robert Appleton)."
            />

            <Video
              src="/assets/vid/time-ruler.mov"
              title="Time Ruler"
              desc="An intuitive time-management plugin for Obsidian integrating calendars and tasks."
            />
          </div>
        </div>
      </Section>
      <Outlet />
    </>
  );
}

function Video({
  src,
  desc,
  title,
}: {
  src: string;
  desc: string;
  title: string;
}) {
  return (
    <div className="w-full md:w-1/2">
      <div className="relative w-full">
        <video className="w-full" autoPlay muted loop src={src} />
        <h2 className="absolute bottom-0 left-0 bg-black/50 px-4 font-menu font-bold">
          {title}
        </h2>
      </div>

      <p className="px-4 font-sans text-sm">{desc}</p>
    </div>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <mesh>
        <planeGeometry />
        <meshBasicMaterial color="white" />
      </mesh>
      <OrbitControls />
    </>
  );
}
