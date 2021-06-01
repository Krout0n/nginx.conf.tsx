import { Directive } from "../directives/";

export default class Http implements Directive {
  children: Directive[];
  constructor(children: Directive[]) {
    this.children = children;
  }

  emitConfig(): string {
    return `http { ${this.children
      .map((child) => child.emitConfig())
      .join("\n")} }`;
  }
}
