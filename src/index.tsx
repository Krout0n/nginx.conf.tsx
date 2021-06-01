/* @jsx NginxConfig.createElement */
import * as NginxConfig from "./nginx";

type ServerProps = Partial<
  Readonly<{
    // TODO: Address 型を定義しても良い
    listen: number | string;
    serverName: string;
    errorPage: readonly string[];

    children: JSX.Element;
  }>
>;

type Prefix = "^~" | "=" | "~" | "~*";
// TODO: 多分もっとある
type LocationProps = Readonly<
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

type WorkerProcessesProps = Readonly<{ num: number }>;
type ErrorLogProps = Readonly<{ path: string }>;
type PidProps = Readonly<{ path: string }>;
type WorkerRlimitNofileProps = Readonly<{ num: number }>;

// events {
//   worker_connections  4096;  ## Default: 1024
// }

// http  {
// include    conf/mime.types;
// include    /etc/nginx/proxy.conf;
// include    /etc/nginx/fastcgi.conf;
type HttpProps = Readonly<{ children: JSX.Element[] }>;
type IncludeProps = Readonly<{ path: string }>;

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

<workerProcesses num={5} />;
<errorLog path="logs/error.log" />;
<pid path="logs/nginx.pid" />;
<workerRlimitNofile num={8192} />;

<http>
  <include path="conf/mime.types" />
  <include path="/etc/nginx/proxy.conf" />
  <include path="/etc/nginx/fastcgi.conf" />
  <server
    listen={80}
    serverName="local"
    errorPage={["500", "502", "503", "504", "/50x.html"]}
  >
    <location
      path="/"
      root="/usr/share/nginx/html"
      index={["index.html", "index.htm"]}
    />
    <location prefix="=" path="/50x.html" root="/usr/share/nginx/html" />
    <location prefix="~" path="/\.ht" deny="all" />
  </server>
</http>;
