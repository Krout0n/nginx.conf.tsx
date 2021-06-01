import { Directive } from ".";
import { WorkerProcessesProps } from "../components/types";

export default class WorkerProcesses implements Directive {
  num: number;
  constructor(props: WorkerProcessesProps) {
    this.num = props.num;
  }

  emit_config(): string {
    return `worker_processes ${this.num};`;
  }
}
