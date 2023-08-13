import * as d3 from "d3";
import _ from "lodash";
import { RefObject, useEffect } from "react";
import invariant from "tiny-invariant";

export default function useForceGraph(
  nodes: NonNullable<Parameters<(typeof d3)["forceSimulation"]>[0]>,
  ids: string[],
  container: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    invariant(container.current);

    const rect = container.current.getBoundingClientRect();
    console.log(rect.height, rect.width);

    const nodeSize = document
      .querySelector(`[data-d3=${ids[0]}]`)
      ?.getBoundingClientRect().width;
    invariant(nodeSize);

    function walls(radius: number, padding: number = 0) {
      const k = -10;
      const collision = radius + padding;
      for (let i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i];
        invariant(
          node.x !== undefined &&
            node.y !== undefined &&
            node.vx !== undefined &&
            node.vy !== undefined
        );
        if (node.x > rect.width - collision)
          node.x = rect.width - radius - padding;
        if (node.x < collision) node.x = radius + padding;
        if (node.y < collision) node.y = radius + padding;
      }
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force("walls", () => walls(nodeSize / 2, 24))
      .force("charge", d3.forceManyBody())
      .force("collision", d3.forceCollide(nodeSize / 2 + 24))
      .force("center", d3.forceCenter(rect.width / 2 - 24, nodeSize / 2));
    // .force("up", d3.forceY(0))
    // .force("down", d3.forceX(rect.width / 2));

    simulation.on("tick", () => {
      for (let node of simulation.nodes()) {
        invariant(
          node.index !== undefined &&
            node.y !== undefined &&
            node.x !== undefined
        );

        const id = ids[node.index];
        d3.select(`[data-d3=${id}`)
          .style("top", node.y + "px")
          .style("left", node.x + "px");
      }
    });

    return () => {
      simulation.stop();
    };
  }, [ids.join(",")]);
}
