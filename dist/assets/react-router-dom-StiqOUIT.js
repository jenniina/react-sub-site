import{r as s}from"./react-kX_YxI4E.js";import{R as E,u as U,a as A,b as L,c as N,D as F}from"./react-router-DUuhLvki.js";import{c as K,b as w}from"./@remix-run-DTnHqtaE.js";/**
 * React Router DOM v6.4.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function P(){return P=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var r=arguments[a];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},P.apply(this,arguments)}function O(e,a){if(e==null)return{};var r={},t=Object.keys(e),n,o;for(o=0;o<t.length;o++)n=t[o],!(a.indexOf(n)>=0)&&(r[n]=e[n]);return r}function W(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function B(e,a){return e.button===0&&(!a||a==="_self")&&!W(e)}function C(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((a,r)=>{let t=e[r];return a.concat(Array.isArray(t)?t.map(n=>[r,n]):[[r,t]])},[]))}function D(e,a){let r=C(e);for(let t of a.keys())r.has(t)||a.getAll(t).forEach(n=>{r.append(t,n)});return r}const H=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"],M=["aria-current","caseSensitive","className","end","style","to","children"];function I(e){let{basename:a,children:r,window:t}=e,n=s.useRef();n.current==null&&(n.current=K({window:t,v5Compat:!0}));let o=n.current,[l,c]=s.useState({action:o.action,location:o.location});return s.useLayoutEffect(()=>o.listen(c),[o]),s.createElement(E,{basename:a,children:r,location:l.location,navigationType:l.action,navigator:o})}const _=s.forwardRef(function(a,r){let{onClick:t,relative:n,reloadDocument:o,replace:l,state:c,target:i,to:f,preventScrollReset:p}=a,v=O(a,H),S=U(f,{relative:n}),d=T(f,{replace:l,state:c,target:i,preventScrollReset:p,relative:n});function u(h){t&&t(h),h.defaultPrevented||d(h)}return s.createElement("a",P({},v,{href:S,onClick:o?t:u,ref:r,target:i}))}),J=s.forwardRef(function(a,r){let{"aria-current":t="page",caseSensitive:n=!1,className:o="",end:l=!1,style:c,to:i,children:f}=a,p=O(a,M),v=N(i,{relative:p.relative}),S=L(),d=s.useContext(F),u=v.pathname,h=S.pathname,m=d&&d.navigation&&d.navigation.location?d.navigation.location.pathname:null;n||(h=h.toLowerCase(),m=m?m.toLowerCase():null,u=u.toLowerCase());let y=h===u||!l&&h.startsWith(u)&&h.charAt(u.length)==="/",g=m!=null&&(m===u||!l&&m.startsWith(u)&&m.charAt(u.length)==="/"),j=y?t:void 0,R;typeof o=="function"?R=o({isActive:y,isPending:g}):R=[o,y?"active":null,g?"pending":null].filter(Boolean).join(" ");let x=typeof c=="function"?c({isActive:y,isPending:g}):c;return s.createElement(_,P({},p,{"aria-current":j,className:R,ref:r,style:x,to:i}),typeof f=="function"?f({isActive:y,isPending:g}):f)});var b;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(b||(b={}));var k;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(k||(k={}));function T(e,a){let{target:r,replace:t,state:n,preventScrollReset:o,relative:l}=a===void 0?{}:a,c=A(),i=L(),f=N(e,{relative:l});return s.useCallback(p=>{if(B(p,r)){p.preventDefault();let v=t!==void 0?t:w(i)===w(f);c(e,{replace:v,state:n,preventScrollReset:o,relative:l})}},[i,c,f,t,n,r,e,o,l])}function Q(e){let a=s.useRef(C(e)),r=L(),t=s.useMemo(()=>D(r.search,a.current),[r.search]),n=A(),o=s.useCallback((l,c)=>{const i=C(typeof l=="function"?l(t):l);n("?"+i,c)},[n,t]);return[t,o]}export{I as B,_ as L,J as N,Q as u};
