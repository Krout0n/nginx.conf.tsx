import { Directive } from ".";
import { LocationProps, Prefix } from "../components/types";

export default class Location implements Directive {
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
