import{r as c,j as e}from"./react-A9DAvxly.js";import{N as $}from"./react-router-dom-j9Ns2JNj.js";import{i as S}from"./react-icons-yVutJqMS.js";import{X as F,Y as V,Z as D,$ as O,a0 as y,a1 as A,a2 as M,a3 as P,a4 as Y,a5 as q,a6 as B,a7 as G,a8 as H,a9 as Q,aa as N,ab as J,ac as U,ad as k}from"./index-DQhGG1l7.js";import{b as X,O as Z}from"./react-router-BoqxkIr7.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./@remix-run-DTnHqtaE.js";import"./react-dom-CxfJ6lHP.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-C4cSaZU-.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";function K(){const o=c.useRef();return c.useEffect(()=>{const l=o.current;if(l){const i=r=>{r.deltaY!=0&&(r.preventDefault(),l.scrollTo({left:l.scrollLeft+r.deltaY,behavior:"smooth"}))};return l.addEventListener("wheel",i),()=>l.removeEventListener("wheel",i)}},[]),o}function Er({language:o}){const{windowWidth:l}=F(),i=X(),r=K(),d=60;function C(){r.current&&l>k?r.current.scrollLeft-=200:r.current&&(r.current.scrollLeft-=d)}function R(){r.current&&l>k?r.current.scrollLeft+=200:r.current&&(r.current.scrollLeft+=d)}const m=[{url:"/portfolio",name:`${V[o]}`,special:"first"},{url:"/portfolio/media",name:D[o]},{url:"/portfolio/memory",name:O[o]},{url:"/portfolio/colors",name:y[o]},{url:"/portfolio/composer",name:A[o]},{url:"/portfolio/blob",name:M[o]},{url:"/portfolio/jokes",name:P[o]},{url:"/portfolio/quiz",name:Y[o]},{url:"/portfolio/select",name:q[o]},{url:"/portfolio/graphql",name:"GraphQL"},{url:"/portfolio/salon",name:B[o]},{url:"/portfolio/draganddrop",name:G[o]},{url:"/portfolio/form",name:H[o]},{url:"/portfolio/todo",name:Q[o],special:"last"}],t=m.map(()=>c.useRef(null)),[w,E]=c.useState(t[0]),u=N(w,"-20px",1),z=N(t[t.length-1],"-40px",1);c.useEffect(()=>{u&&r.current&&(r.current.scrollLeft=0)},[u,r]),c.useEffect(()=>{i.pathname==="/portfolio"?E(t[1]):E(t[0])},[i.pathname,t,m]),c.useEffect(()=>{var n,s;const f=m.findIndex(a=>a.url===i.pathname);f!==-1&&t[f].current&&((s=(n=t==null?void 0:t[f])==null?void 0:n.current)==null||s.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}))},[i.pathname]);const I=f=>f.map((n,s)=>{const a=n.special==="first",T=n.special==="last",b=i.pathname===n.url;return e.jsx("li",{ref:t[s],id:a?b?`portfolio-${s}`:"firstportfolioitem":T?"lastportfolioitem":`portfolio-${s}`,className:a&&b?"hide":a?"return":"",onFocus:()=>{var L,j;if(t[s]&&t[s].current&&r.current){const h=((L=t[s].current)==null?void 0:L.offsetLeft)??0,v=h+(((j=t[s].current)==null?void 0:j.offsetWidth)??0),x=r.current.scrollLeft,W=x+r.current.clientWidth,p=100;h<x+p?r.current.scrollLeft=h-p:v>W-p&&(r.current.scrollLeft=v-r.current.clientWidth+p)}},children:e.jsxs($,{to:n.url,children:[a?e.jsx("span",{"aria-hidden":"true",children:"« "}):"",n.name]})},s)});return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"nav-sub",children:[e.jsxs("button",{className:`horizonal-scroll goleft 
                ${u?"disable":""}`,onClick:C,children:[" ",e.jsx(S,{}),e.jsx("span",{className:"scr",children:J[o]})]}),e.jsx("ul",{ref:r,children:I(m)}),e.jsxs("button",{onClick:R,className:`horizonal-scroll goright 
                ${z?"disable":""}`,children:[" ",e.jsx(S,{}),e.jsx("span",{className:"scr",children:U[o]})]})]}),e.jsx(Z,{})]})}export{Er as default};
