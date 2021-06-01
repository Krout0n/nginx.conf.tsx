type DirectiveTag = "server" | "location" | "worker_processes" | "error_log";

export function createElement(
  _tag: DirectiveTag,
  _obj: never,
  ..._args: never
) {
  return {};
}
