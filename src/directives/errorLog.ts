import { Directive } from ".";
import { ErrorLogProps } from "../components/types";

export default class ErrorLog implements Directive {
  path: string;

  constructor(props: ErrorLogProps) {
    this.path = props.path;
  }

  emitConfig(): string {
    return `error_log ${this.path};`;
  }
}
