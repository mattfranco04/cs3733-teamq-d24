import React from "react";
import { Node } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface LineProps {
  path: Node[];
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
}

export function Lines({ nodes, path, imgWidth, imgHeight }: LineProps) {
  if (!path || path.length < 2) return null; // Path must have at least two nodes to draw lines
  return (
    <svg
      width={imgWidth}
      height={imgHeight}
      style={{ position: "absolute", top: 0, left: 0 }}
      className="pointer-events-none"
    >
      {path.map((node, index) => {
        if (index < path.length - 1) {
          const currentNode = nodes.find((n) => n.nodeId === node.nodeId);
          const nextNode = nodes.find(
            (n) => n.nodeId === path[index + 1].nodeId,
          );

          if (currentNode && nextNode) {
            return (
              // Line Positioning
              <line
                key={index}
                x1={scaleCoordinate(
                  currentNode.xcords,
                  imgWidth,
                  origImageWidth,
                  0,
                )}
                x2={scaleCoordinate(
                  nextNode.xcords,
                  imgWidth,
                  origImageWidth,
                  0,
                )}
                y1={scaleCoordinate(
                  currentNode.ycords,
                  imgHeight,
                  origImageHeight,
                  0,
                )}
                y2={scaleCoordinate(
                  nextNode.ycords,
                  imgHeight,
                  origImageHeight,
                  0,
                )}
                style={{ stroke: "red", strokeWidth: 2 }}
              />
            );
          }
        }
        return null;
      })}
    </svg>
  );
}