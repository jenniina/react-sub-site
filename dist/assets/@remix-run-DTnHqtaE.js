/**
 * @remix-run/router v1.0.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function w(){return w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},w.apply(this,arguments)}var m;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(m||(m={}));const b="popstate";function ae(e){e===void 0&&(e={});function t(a,r){let{pathname:s,search:i,hash:l}=a.location;return R("",{pathname:s,search:i,hash:l},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:L(r)}return O(t,n,null,e)}function B(){return Math.random().toString(36).substr(2,8)}function I(e){return{usr:e.state,key:e.key}}function R(e,t,n,a){return n===void 0&&(n=null),w({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?S(t):t,{state:n,key:t&&t.key||a||B()})}function L(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function S(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}function C(e){let t=typeof window<"u"&&typeof window.location<"u"&&window.location.origin!=="null"?window.location.origin:"unknown://unknown",n=typeof e=="string"?e:L(e);return new URL(n,t)}function O(e,t,n,a){a===void 0&&(a={});let{window:r=document.defaultView,v5Compat:s=!1}=a,i=r.history,l=m.Pop,o=null;function d(){l=m.Pop,o&&o({action:l,location:h.location})}function c(u,p){l=m.Push;let g=R(h.location,u,p),x=I(g),v=h.createHref(g);try{i.pushState(x,"",v)}catch{r.location.assign(v)}s&&o&&o({action:l,location:h.location})}function f(u,p){l=m.Replace;let g=R(h.location,u,p),x=I(g),v=h.createHref(g);i.replaceState(x,"",v),s&&o&&o({action:l,location:h.location})}let h={get action(){return l},get location(){return e(r,i)},listen(u){if(o)throw new Error("A history only accepts one active listener");return r.addEventListener(b,d),o=u,()=>{r.removeEventListener(b,d),o=null}},createHref(u){return t(r,u)},encodeLocation(u){let p=C(L(u));return w({},u,{pathname:p.pathname,search:p.search,hash:p.hash})},push:c,replace:f,go(u){return i.go(u)}};return h}var W;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(W||(W={}));function ie(e,t,n){n===void 0&&(n="/");let a=typeof t=="string"?S(t):t,r=F(a.pathname||"/",n);if(r==null)return null;let s=U(e);j(s);let i=null;for(let l=0;i==null&&l<s.length;++l)i=_(s[l],N(r));return i}function U(e,t,n,a){return t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a=""),e.forEach((r,s)=>{let i={relativePath:r.path||"",caseSensitive:r.caseSensitive===!0,childrenIndex:s,route:r};i.relativePath.startsWith("/")&&(y(i.relativePath.startsWith(a),'Absolute route path "'+i.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),i.relativePath=i.relativePath.slice(a.length));let l=P([a,i.relativePath]),o=n.concat(i);r.children&&r.children.length>0&&(y(r.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+l+'".')),U(r.children,t,o,l)),!(r.path==null&&!r.index)&&t.push({path:l,score:z(l,r.index),routesMeta:o})}),t}function j(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:G(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}const H=/^:\w+$/,k=3,A=2,V=1,M=10,D=-2,T=e=>e==="*";function z(e,t){let n=e.split("/"),a=n.length;return n.some(T)&&(a+=D),t&&(a+=A),n.filter(r=>!T(r)).reduce((r,s)=>r+(H.test(s)?k:s===""?V:M),a)}function G(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function _(e,t){let{routesMeta:n}=e,a={},r="/",s=[];for(let i=0;i<n.length;++i){let l=n[i],o=i===n.length-1,d=r==="/"?t:t.slice(r.length)||"/",c=J({path:l.relativePath,caseSensitive:l.caseSensitive,end:o},d);if(!c)return null;Object.assign(a,c.params);let f=l.route;s.push({params:a,pathname:P([r,c.pathname]),pathnameBase:Y(P([r,c.pathnameBase])),route:f}),c.pathnameBase!=="/"&&(r=P([r,c.pathnameBase]))}return s}function J(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=K(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let s=r[0],i=s.replace(/(.)\/+$/,"$1"),l=r.slice(1);return{params:a.reduce((d,c,f)=>{if(c==="*"){let h=l[f]||"";i=s.slice(0,s.length-h.length).replace(/(.)\/+$/,"$1")}return d[c]=q(l[f]||"",c),d},{}),pathname:s,pathnameBase:i,pattern:e}}function K(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),$(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(i,l)=>(a.push(l),"([^\\/]+)"));return e.endsWith("*")?(a.push("*"),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function N(e){try{return decodeURI(e)}catch(t){return $(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function q(e,t){try{return decodeURIComponent(e)}catch(n){return $(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function F(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}function y(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function $(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Q(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?S(e):e;return{pathname:n?n.startsWith("/")?n:X(n,t):t,search:Z(a),hash:ee(r)}}function X(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function E(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function le(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function se(e,t,n,a){a===void 0&&(a=!1);let r;typeof e=="string"?r=S(e):(r=w({},e),y(!r.pathname||!r.pathname.includes("?"),E("?","pathname","search",r)),y(!r.pathname||!r.pathname.includes("#"),E("#","pathname","hash",r)),y(!r.search||!r.search.includes("#"),E("#","search","hash",r)));let s=e===""||r.pathname==="",i=s?"/":r.pathname,l;if(a||i==null)l=n;else{let f=t.length-1;if(i.startsWith("..")){let h=i.split("/");for(;h[0]==="..";)h.shift(),f-=1;r.pathname=h.join("/")}l=f>=0?t[f]:"/"}let o=Q(r,l),d=i&&i!=="/"&&i.endsWith("/"),c=(s||i===".")&&n.endsWith("/");return!o.pathname.endsWith("/")&&(d||c)&&(o.pathname+="/"),o}const P=e=>e.join("/").replace(/\/\/+/g,"/"),Y=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Z=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ee=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;class te{constructor(t,n,a){this.status=t,this.statusText=n||"",this.data=a}}function oe(e){return e instanceof te}const ne=new Set(["POST","PUT","PATCH","DELETE"]);[...ne];export{m as A,oe as a,L as b,ae as c,le as g,y as i,P as j,ie as m,S as p,se as r,F as s};
