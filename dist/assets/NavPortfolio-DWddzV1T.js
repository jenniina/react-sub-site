import{r as c,j as e}from"./react-kX_YxI4E.js";import{N as W}from"./react-router-dom-ZPAD5XPx.js";import{i as S}from"./react-icons-ayiissuD.js";import{q as D,r as V,t as $,v as y,w as A,x as O,y as q,z as B,A as G,B as H,C as M,D as P,F as J,G as Q,H as N,I as Y,J as K,K as C}from"./index-pLSDius4.js";import{b as U,O as X}from"./react-router-DUuhLvki.js";import"./dom-to-image-more-CfDXlNbO.js";import"./@remix-run-DTnHqtaE.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";function Z(){const o=c.useRef();return c.useEffect(()=>{const l=o.current;if(l){const i=r=>{r.deltaY!=0&&(r.preventDefault(),l.scrollTo({left:l.scrollLeft+r.deltaY,behavior:"smooth"}))};return l.addEventListener("wheel",i),()=>l.removeEventListener("wheel",i)}},[]),o}function Lr({language:o}){const{windowWidth:l}=D(),i=U(),r=Z(),d=60;function k(){r.current&&l>C?r.current.scrollLeft-=200:r.current&&(r.current.scrollLeft-=d)}function w(){r.current&&l>C?r.current.scrollLeft+=200:r.current&&(r.current.scrollLeft+=d)}const m=[{url:"/portfolio",name:`${V[o]}`,special:"first"},{url:"/portfolio/media",name:$[o]},{url:"/portfolio/memory",name:y[o]},{url:"/portfolio/colors",name:A[o]},{url:"/portfolio/composer",name:O[o]},{url:"/portfolio/blob",name:q[o]},{url:"/portfolio/jokes",name:B[o]},{url:"/portfolio/quiz",name:G[o]},{url:"/portfolio/select",name:H[o]},{url:"/portfolio/salon",name:M[o]},{url:"/portfolio/draganddrop",name:P[o]},{url:"/portfolio/graphql",name:"GraphQL"},{url:"/portfolio/form",name:J[o]},{url:"/portfolio/todo",name:Q[o],special:"last"}],t=m.map(()=>c.useRef(null)),[z,E]=c.useState(t[0]),u=N(z,"-20px",1),I=N(t[t.length-1],"-40px",1);c.useEffect(()=>{u&&r.current&&(r.current.scrollLeft=0)},[u,r]),c.useEffect(()=>{i.pathname==="/portfolio"?E(t[1]):E(t[0])},[i.pathname,t,m]),c.useEffect(()=>{var n,s;const f=m.findIndex(a=>a.url===i.pathname);f!==-1&&t[f].current&&((s=(n=t==null?void 0:t[f])==null?void 0:n.current)==null||s.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}))},[i.pathname]);const R=f=>f.map((n,s)=>{const a=n.special==="first",F=n.special==="last",L=i.pathname===n.url;return e.jsx("li",{ref:t[s],id:a?L?`portfolio-${s}`:"firstportfolioitem":F?"lastportfolioitem":`portfolio-${s}`,className:a&&L?"hide":a?"return":"",onFocus:()=>{var b,j;if(t[s]&&t[s].current&&r.current){const h=((b=t[s].current)==null?void 0:b.offsetLeft)??0,v=h+(((j=t[s].current)==null?void 0:j.offsetWidth)??0),x=r.current.scrollLeft,T=x+r.current.clientWidth,p=100;h<x+p?r.current.scrollLeft=h-p:v>T-p&&(r.current.scrollLeft=v-r.current.clientWidth+p)}},children:e.jsxs(W,{to:n.url,children:[a?e.jsx("span",{"aria-hidden":"true",children:"« "}):"",n.name]})},s)});return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"nav-sub",children:[e.jsxs("button",{className:`horizonal-scroll goleft 
                ${u?"disable":""}`,onClick:k,children:[" ",e.jsx(S,{}),e.jsx("span",{className:"scr",children:Y[o]})]}),e.jsx("ul",{ref:r,children:R(m)}),e.jsxs("button",{onClick:w,className:`horizonal-scroll goright 
                ${I?"disable":""}`,children:[" ",e.jsx(S,{}),e.jsx("span",{className:"scr",children:K[o]})]})]}),e.jsx(X,{})]})}export{Lr as default};
