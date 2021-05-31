/* @jsx NginxConfig.createElement */
import * as React from "react";
import * as NginxConfig from "./nginx";

type WorkerProcessesProps = Readonly<{num: number}>;

// user       www www;  ## Default: nobody

// worker_processes  5;  ## Default: 1
export const WorkerProcesses: NginxConfig.VFC<WorkerProcessesProps> = (num = {num: 1}) => (
  <div className="worker_processes" {...num}></div>
)

// error_log  logs/error.log;
// pid        logs/nginx.pid;
// worker_rlimit_nofile 8192;

type ServerProps = Partial<Readonly<{
  // listen 80; TODO: Address 型を定義しても良い
  listen: number | string;
  //   server_name  localhost;
  serverName: string;
  // error_page 500 502 503 504  /50x.html;
  errorPage: readonly string[],
}>>

// TODO: type ServerChildren = React.VFC<LocationProps> と言った風にして任意のJSXが children に来るのを防げそうなので検討する
export const Server: React.FC<ServerProps> = ({children}) => (
  <div className="server">{children}</div>
)

type Prefix = "^~" | "=" | "~" | "~*"
// TODO: 多分もっとある
type LocationProps = Readonly<{path: string} & Partial<{
  prefix: Prefix;
  root: string;
  index: string | readonly string[];
  deny: string;
}>>;

export const Location: React.VFC<LocationProps> = (props) => {
  return <div className="location" {...props} ></div>
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

<Server errorPage={["500", "502", "503", "504", "/50x.html"]}>
  <Location path={"/"} root={"/usr/share/nginx/html"} index={["index.html", "index.html"]} />
  <Location prefix={"="} path={"/50x.html"} root={"/usr/share/nginx/html"} />
  <Location prefix={"~"} path={"/\\.ht"} deny={"all"}  />  
</Server>

{/* <WorkerProcesses num={2}></WorkerProcesses>; */}
