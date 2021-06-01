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

declare global {
  namespace JSX {
    type Element = {};
    interface IntrinsicElements {
      server: ServerProps;
      location: LocationProps;
      workerProcesses: WorkerProcessesProps;
      errorLog: ErrorLogProps;
      pid: PidProps;
      workerRlimitNofile: WorkerRlimitNofileProps;
    }
  }
}

/*
/etc/nginx/conf.d/default.conf
  server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    location ~ /\.ht {
        deny  all;
    }
  }
*/
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
</server>;

<workerProcesses num={5} />;
<errorLog path="logs/error.log" />;
<pid path="logs/nginx.pid" />;
<workerRlimitNofile num={8192} />;
