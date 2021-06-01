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

declare global {
  namespace JSX {
    type Element = {};
    interface IntrinsicElements {
      server: ServerProps;
      location: LocationProps;
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
<server listen={80} serverName="local" errorPage={["500", "502", "503", "504", "/50x.html"]}>
  <location path="/" root="/usr/share/nginx/html" index={["index.html", "index.htm"]} />
  <location prefix="=" path="/50x.html" root="/usr/share/nginx/html" />
  <location prefix="~" path="/\.ht" deny="all" />
</server>;
