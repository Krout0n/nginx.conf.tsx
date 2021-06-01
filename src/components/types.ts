declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      // childrenという名前を子を表すプロパティ名として宣言
      children: any;
    }
    type Element = {};
    interface IntrinsicElements {
      server: ServerProps;
      location: LocationProps;
      workerProcesses: WorkerProcessesProps;
      errorLog: ErrorLogProps;
      pid: PidProps;
      workerRlimitNofile: WorkerRlimitNofileProps;
      http: HttpProps;
      include: IncludeProps;
    }
  }
}

export type ServerProps = Partial<
  Readonly<{
    // TODO: Address 型を定義しても良い
    listen: number | string;
    serverName: string;
    errorPage: readonly string[];

    children: JSX.Element[];
  }>
>;

export type Prefix = "^~" | "=" | "~" | "~*";
// TODO: 多分もっとある
export type LocationProps = Readonly<
  { path: string } & Partial<{
    prefix: Prefix;
    root: string;
    index: string | readonly string[];
    deny: string;
  }>
>;

// user       www www;  ## Default: nobody
// worker_processes  5;  ## Default: 1
// error_log  logs/error.log;
// pid        logs/nginx.pid;
// worker_rlimit_nofile 8192;

export type WorkerProcessesProps = Readonly<{ num: number }>;
export type ErrorLogProps = Readonly<{ path: string }>;
export type PidProps = Readonly<{ path: string }>;
export type WorkerRlimitNofileProps = Readonly<{ num: number }>;

// events {
//   worker_connections  4096;  ## Default: 1024
// }

// http  {
// include    conf/mime.types;
// include    /etc/nginx/proxy.conf;
// include    /etc/nginx/fastcgi.conf;
export type HttpProps = Readonly<{ children: JSX.Element[] }>;
export type IncludeProps = Readonly<{ path: string }>;
