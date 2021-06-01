/* @jsx NginxConfig.createElement */
import * as NginxConfig from "./nginx";

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
