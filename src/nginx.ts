import { LocationProps, Prefix } from ".";

type DirectiveTag = "server" | "location" | "workerProcesses" | "error_log";

interface Directive {
  emit_config(): string;
}

class Location implements Directive {
  path: string;
  prefix: Prefix | undefined;
  index: string | readonly string[] | undefined;
  deny: string | undefined;
  root: string | undefined;

  constructor(props: LocationProps) {
    this.path = props.path;
    this.prefix = props.prefix;
    this.index = props.index;
    this.deny = props.deny;
    this.root = props.root;
  }

  emit_config(): string {
    return `location ${this.prefix ?? ""} ${this.path} {
      ${this.stringify_index()}
      ${this.stringify_root()}
      ${this.stringify_deny()}
    }`;
  }

  stringify_index(): string {
    if (!this.index) return "";
    const indices = typeof this.index === "string" ? [this.index] : this.index;
    return `index ${indices.join(" ")};`;
  }

  stringify_root(): string {
    if (!this.root) return "";
    return `root ${this.root};`;
  }

  stringify_deny(): string {
    if (!this.deny) return "";
    return `deny ${this.deny};`;
  }
}

export function createElement(
  tag: DirectiveTag,
  props: never,
  ..._args: never
): Directive {
  if (tag === "location" && isLocationProps(props)) {
    const location = new Location(props);
    console.log(location.emit_config());
    return location;
  }
  throw new Error("unimplemented!");
}

function isLocationProps(x: any): x is LocationProps {
  return x.path;
}
