import { LocationProps, WorkerProcessesProps } from "./components/types";
import { Directive } from "./directives";
import Location from "./directives/location";
import WorkerProcesses from "./directives/WorkerProcesses";

type DirectiveTag = "server" | "location" | "workerProcesses" | "error_log";

export function createElement(
  tag: DirectiveTag,
  props: any,
  ..._args: never
): Directive {
  switch (tag) {
    case "location":
      if (isLocationProps(props)) {
        return new Location(props);
      }
      throw new Error("Unexpected property is given.");
    case "workerProcesses":
      if (isWorkerProcessesProps(props)) {
        return new WorkerProcesses(props);
      }
      throw new Error("Unexpected property is given.");
    default:
      throw new Error("unimplemented!");
  }
}

function isWorkerProcessesProps(props: any): props is WorkerProcessesProps {
  return (props as WorkerProcessesProps).num !== undefined;
}

function isLocationProps(props: any): props is LocationProps {
  return (props as LocationProps).path !== undefined;
}
