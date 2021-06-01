import {
  LocationProps,
  WorkerProcessesProps,
  ErrorLogProps,
  ServerProps,
} from "./components/types";
import { Directive } from "./directives";
import ErrorLog from "./directives/errorLog";
import Location from "./directives/location";
import Server from "./directives/server";
import WorkerProcesses from "./directives/WorkerProcesses";
import Http from "./directives/http";

type DirectiveTag =
  | "server"
  | "location"
  | "workerProcesses"
  | "errorLog"
  | "http";

export function createElement(
  tag: DirectiveTag,
  props: any,
  ...children: Directive[]
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
    case "errorLog":
      if (isErrorLogProps(props)) {
        return new ErrorLog(props);
      }
      throw new Error("Unexpected property is given.");
    case "server":
      if (isServerProps(props)) {
        return new Server({
          ...props,
          children,
        });
      }
      throw new Error("Unexpected property is given.");
    case "http":
      return new Http(children);
    default:
      throw new Error(`unimplemented! ${tag}`);
  }
}

function isWorkerProcessesProps(props: any): props is WorkerProcessesProps {
  return (props as WorkerProcessesProps).num !== undefined;
}

function isLocationProps(props: any): props is LocationProps {
  return (props as LocationProps).path !== undefined;
}

function isErrorLogProps(props: any): props is ErrorLogProps {
  return (props as ErrorLogProps).path !== undefined;
}

// とりあえず
function isServerProps(props: any): props is ServerProps {
  return (props as ServerProps).serverName !== undefined;
}
