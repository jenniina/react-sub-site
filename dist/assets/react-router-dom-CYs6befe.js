import{r as c}from"./react-A9DAvxly.js";import{R as j,u as E,a as K,b,c as k,D as U}from"./react-router-S1Hdk0kP.js";import{c as W,b as w}from"./@remix-run-DTnHqtaE.js";/**
 * React Router DOM v6.4.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},R.apply(this,arguments)}function x(e,t){if(e==null)return{};var o={},n=Object.keys(e),r,a;for(a=0;a<n.length;a++)r=n[a],!(t.indexOf(r)>=0)&&(o[r]=e[r]);return o}function B(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function D(e,t){return e.button===0&&(!t||t==="_self")&&!B(e)}const F=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"],A=["aria-current","caseSensitive","className","end","style","to","children"];function q(e){let{basename:t,children:o,window:n}=e,r=c.useRef();r.current==null&&(r.current=W({window:n,v5Compat:!0}));let a=r.current,[i,l]=c.useState({action:a.action,location:a.location});return c.useLayoutEffect(()=>a.listen(l),[a]),c.createElement(j,{basename:t,children:o,location:i.location,navigationType:i.action,navigator:a})}const H=c.forwardRef(function(t,o){let{onClick:n,relative:r,reloadDocument:a,replace:i,state:l,target:p,to:u,preventScrollReset:h}=t,v=x(t,F),C=E(u,{relative:r}),m=I(u,{replace:i,state:l,target:p,preventScrollReset:h,relative:r});function s(f){n&&n(f),f.defaultPrevented||m(f)}return c.createElement("a",R({},v,{href:C,onClick:a?n:s,ref:o,target:p}))}),z=c.forwardRef(function(t,o){let{"aria-current":n="page",caseSensitive:r=!1,className:a="",end:i=!1,style:l,to:p,children:u}=t,h=x(t,A),v=k(p,{relative:h.relative}),C=b(),m=c.useContext(U),s=v.pathname,f=C.pathname,d=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;r||(f=f.toLowerCase(),d=d?d.toLowerCase():null,s=s.toLowerCase());let g=f===s||!i&&f.startsWith(s)&&f.charAt(s.length)==="/",y=d!=null&&(d===s||!i&&d.startsWith(s)&&d.charAt(s.length)==="/"),N=g?n:void 0,S;typeof a=="function"?S=a({isActive:g,isPending:y}):S=[a,g?"active":null,y?"pending":null].filter(Boolean).join(" ");let O=typeof l=="function"?l({isActive:g,isPending:y}):l;return c.createElement(H,R({},h,{"aria-current":N,className:S,ref:o,style:O,to:p}),typeof u=="function"?u({isActive:g,isPending:y}):u)});var L;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(L||(L={}));var P;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(P||(P={}));function I(e,t){let{target:o,replace:n,state:r,preventScrollReset:a,relative:i}=t===void 0?{}:t,l=K(),p=b(),u=k(e,{relative:i});return c.useCallback(h=>{if(D(h,o)){h.preventDefault();let v=n!==void 0?n:w(p)===w(u);l(e,{replace:v,state:r,preventScrollReset:a,relative:i})}},[p,l,u,n,r,o,e,a,i])}export{q as B,H as L,z as N};