import{r as n,j as o}from"./react-A9DAvxly.js";import{N as i}from"./react-router-dom-BQMcumiI.js";import{j as p}from"./react-icons-CMyplLKx.js";import{a_ as E,fl as b,I as L,aN as S,fm as v,fn as N,a9 as w,fo as R,ae as k,a0 as z,fp as T,fq as C,fr as h}from"./index-nWW9Io9b.js";import{u as m}from"./useIsOnScreen-BjIRUFn4.js";import{b as D,O as q}from"./react-router-344DmMNz.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./@remix-run-DTnHqtaE.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DTZ4pglK.js";import"./immer-BNrqi0cU.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-BimPEqV4.js";function H(){const r=n.useRef();return n.useEffect(()=>{const s=r.current;if(s){const l=t=>{t.deltaY!=0&&(t.preventDefault(),s.scrollTo({left:s.scrollLeft+t.deltaY,behavior:"smooth"}))};return s.addEventListener("wheel",l),()=>s.removeEventListener("wheel",l)}},[]),r}function Z({language:r}){const{windowHeight:s,windowWidth:l}=E(),t=D(),c=n.useRef(),f=n.useRef(),a=n.useRef(),d=m(c,"-20px",1),x=m(f,"-20px",1),e=H();function j(){e.current&&l>h?e.current.scrollLeft-=100:e.current&&(e.current.scrollLeft-=40)}function u(){e.current&&l>h?e.current.scrollLeft+=100:e.current&&(e.current.scrollLeft+=40)}return o.jsxs(o.Fragment,{children:[o.jsxs("nav",{className:"nav-sub",children:[o.jsxs("button",{className:`horizonal-scroll goleft 
                ${d?"disable":""}`,onClick:j,children:[" ",o.jsx(p,{}),o.jsx("span",{className:"scr",children:b[r]})]}),o.jsxs("ul",{ref:e,children:[o.jsx("li",{ref:t.pathname=="/portfolio/"||t.pathname=="/portfolio"?a:c,id:t.pathname=="/portfolio/"||t.pathname=="/portfolio"?"":"firstportfolioitem",className:t.pathname=="/portfolio/"||t.pathname=="/portfolio"?"hide":"return",children:o.jsxs(i,{to:"/portfolio/",children:["« ",L[r]]})}),o.jsx("li",{ref:t.pathname=="/portfolio/"||t.pathname=="/portfolio"?c:a,id:t.pathname=="/portfolio/"||t.pathname=="/portfolio"?"firstportfolioitem":"",children:o.jsx(i,{to:"/portfolio/blob",children:S[r]})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/jokes",children:v[r]})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/quiz",children:N[r]})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/select",children:w[r]})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/graphql",children:"GraphQL"})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/salon",children:R[r]})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/form",children:k[r]})}),o.jsx("li",{children:o.jsx(i,{to:"/portfolio/draganddrop",children:z[r]})}),o.jsx("li",{ref:f,id:"lastportfolioitem",children:o.jsx(i,{to:"/portfolio/todo",children:T[r]})})]}),o.jsxs("button",{onClick:u,className:`horizonal-scroll goright 
                ${x?"disable":""}`,children:[" ",o.jsx(p,{}),o.jsx("span",{className:"scr",children:C[r]})]})]}),o.jsx(q,{})]})}export{Z as default};
