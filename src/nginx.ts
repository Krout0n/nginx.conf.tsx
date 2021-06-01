import { LocationProps } from "./components/types";
import { Directive } from "./directives";
import Location from "./directives/location";

type DirectiveTag = "server" | "location" | "workerProcesses" | "error_log";

export function createElement(
  tag: DirectiveTag,
  props: never,
  ..._args: never
): Directive {
  switch (tag) {
    case "location":
      if (isLocationProps(props)) {
        return new Location(props);
      }
      throw new Error("Unexpected property is given.");
    default:
      throw new Error("unimplemented!");
  }
}

function isLocationProps(x: any): x is LocationProps {
  return x.path;
}
