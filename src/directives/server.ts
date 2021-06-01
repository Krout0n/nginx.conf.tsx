import { Directive } from ".";
import { ServerProps } from "../components/types";

export default class Server implements Directive {
  listen: number | string | undefined;
  serverName: string | undefined;
  errorPage: readonly string[] | undefined;
  children: Directive[];

  constructor(
    props: Omit<ServerProps, "children"> & Readonly<{ children: Directive[] }>
  ) {
    this.listen = props.listen;
    this.serverName = props.serverName;
    this.errorPage = props.errorPage;
    this.children = props.children;
  }

  emitConfig(): string {
    return `server {
      ${this.stringifyListen()}
      ${this.stringifyServerName()}
      ${this.stringifyErrorPage()}
      ${this.stringifyChildren()}
    }`;
  }

  stringifyListen(): string {
    if (!this.listen) return "";
    return `listen ${this.listen};`;
  }

  stringifyServerName(): string {
    if (!this.serverName) return "";
    return `server_name ${this.serverName};`;
  }

  stringifyErrorPage(): string {
    if (!this.errorPage) return "";
    return `error_page ${this.errorPage.join(" ")};`;
  }

  stringifyChildren(): string {
    return this.children.map((child) => child.emitConfig()).join("\n");
  }
}
