const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Progress-hrqiErGa.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/react-redux-C4cSaZU-.js","assets/react-dom-CxfJ6lHP.js","assets/scheduler-CzFDRTuY.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/quiz.module-DTU83NUw.js","assets/quiz-BRuK_W9Z.css","assets/index-DQhGG1l7.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-yVutJqMS.js","assets/react-router-dom-j9Ns2JNj.js","assets/react-router-BoqxkIr7.js","assets/@remix-run-DTnHqtaE.js","assets/index-CfEGHDOJ.css","assets/Timer-D0iR_idM.js"])))=>i.map(i=>d[i]);
import{r as $,u,t as q,v as w,w as y,x as z,y as b,_ as f,z as A,A as P,B as k,C as F,q as j,D as C,F as D}from"./index-DQhGG1l7.js";import{j as s,r as c}from"./react-A9DAvxly.js";import{a as x}from"./react-redux-C4cSaZU-.js";import{s as r}from"./quiz.module-DTU83NUw.js";import{a as N,f as L}from"./react-router-BoqxkIr7.js";import"./react-dom-CxfJ6lHP.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-yVutJqMS.js";import"./react-router-dom-j9Ns2JNj.js";import"./@remix-run-DTnHqtaE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";const Q=({language:e})=>s.jsxs("div",{className:`${r["loader-wrap"]}`,children:[s.jsx("div",{className:`${r.loader}`}),s.jsx("h3",{children:$[e]})]}),S=({language:e})=>{const{index:o}=x(p=>p.questions),a=u(),i=N(),n=()=>{a(z()),a(b()),i("/portfolio/quiz/results")};return o<14?s.jsx("button",{className:`${r.next}`,onClick:()=>a(q()),children:w[e]}):s.jsx("button",{className:`${r.next}`,onClick:n,children:y[e]})},T=({type:e,message:o})=>s.jsx("p",{className:e,children:o}),I=c.lazy(()=>f(()=>import("./Progress-hrqiErGa.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))),R=c.lazy(()=>f(()=>import("./Timer-D0iR_idM.js"),__vite__mapDeps([22,1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,19,20,21,8,9]))),os=({language:e})=>{const{difficulty:o}=L(),{mode:a}=x(t=>t.difficulty),{currentQuestion:i,answer:n,index:p,status:d}=x(t=>t.questions),h=u();c.useEffect(()=>{h(A(a))},[]);const v=i==null?void 0:i.question,l=i==null?void 0:i.options,m=n!==null,E=N(),_=()=>{E("/portfolio/quiz")};return s.jsx("section",{className:`card ${r.top}`,children:s.jsx("div",{children:s.jsxs("div",{className:`${r.quiz} `,children:[d==="loading"&&s.jsx(Q,{language:e}),d==="error"&&s.jsx(T,{type:"error",message:P[e]}),d==="ready"&&s.jsxs(s.Fragment,{children:[s.jsx("h1",{className:r.h1,children:s.jsxs("a",{href:"#",onClick:_,children:["« ",k[e]]})}),s.jsx("h2",{children:F[e]}),s.jsx(c.Suspense,{fallback:s.jsxs("div",{className:"flex center margin0auto textcenter",children:[j[e],"..."]}),children:s.jsx(I,{language:e})}),s.jsxs("div",{className:r.wrap,children:[s.jsxs("div",{className:`${r.diff}`,children:[C[e],": ",o]}),s.jsx("h2",{className:`${r.question}`,children:v}),s.jsx("div",{className:`${r.options}`,children:l==null?void 0:l.map(t=>s.jsx("button",{className:`${n===t?r.answer:""} 
            ${m&&i.correctAnswer===t?r.correct:""} 
            ${m?r.disabled:""}
            `,disabled:m,onClick:()=>h(D(t)),children:t},t))})]}),s.jsxs("footer",{children:[s.jsx(c.Suspense,{fallback:s.jsxs("div",{className:"flex center margin0auto textcenter",children:[j[e],"..."]}),children:s.jsx(R,{})}),n&&s.jsx(S,{language:e})]})]})]})})})};export{os as default};
