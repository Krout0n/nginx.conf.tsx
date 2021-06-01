type DirectiveTag = "server" | "location" | "workerProcesses" | "error_log";

export function createElement(
  _tag: DirectiveTag,
  _obj: never,
  ..._args: never
) {
  return {};
}
