const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginRegisterCombo-DG6zXCq-.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/index-pLSDius4.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-ayiissuD.js","assets/react-router-dom-ZPAD5XPx.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-DKDDwi0u.css","assets/quiz.module-DTU83NUw.js","assets/quiz-BRuK_W9Z.css","assets/quiz-BgDInUK-.js"])))=>i.map(i=>d[i]);
import{_ as E,u as v,i as z,g as N,c as $,d as _,e as y,s as S}from"./index-pLSDius4.js";import{r as c,j as s}from"./react-kX_YxI4E.js";import{a as m}from"./react-redux-BEmJlIGA.js";import{s as t}from"./quiz.module-DTU83NUw.js";import{j as r}from"./react-icons-ayiissuD.js";import{E as b,a as C,b as L,c as Q,d as g,e as q,f as A,g as T,h as k}from"./quiz-BgDInUK-.js";import{a as w}from"./react-router-DUuhLvki.js";import"./react-dom-B5MLDbn_.js";import"./dom-to-image-more-CfDXlNbO.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-ZPAD5XPx.js";import"./@remix-run-DTnHqtaE.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";const F=c.lazy(()=>E(()=>import("./LoginRegisterCombo-DG6zXCq-.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]))),as=({heading:D,text:I,type:R,language:e})=>{const d=w(),{points:p,highscores:u,finalSeconds:x}=m(i=>i.questions),[j,f]=c.useState(u),a=v(),o=m(i=>{var n;return(n=i.auth)==null?void 0:n.user});c.useEffect(()=>{a(z())},[]);const h=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1";c.useEffect(()=>{o!=null&&o._id&&p!==0&&x!==0&&a(N(o._id)).then(i=>{if(i!==null)f(i.highscores);else if(i===null&&localStorage.getItem(`${h?"local-":""}quiz-highscores`)){const n=JSON.parse(localStorage.getItem(`${h?"local-":""}quiz-highscores`));a($({highscores:n,user:o._id}))}})},[o]);const l=i=>{a(S(i)),d(`/portfolio/quiz/difficulty/${i}`)};return s.jsx(s.Fragment,{children:s.jsx("section",{className:"card",children:s.jsxs("div",{children:[s.jsxs("div",{className:`medium ${t.features}`,children:[s.jsx("h2",{children:"Features"}),s.jsxs("ul",{className:"ul",children:[s.jsxs("li",{children:[b[e]," ",s.jsx("a",{href:"https://the-trivia-api.com",children:'"the Trivia Api"'})]}),s.jsxs("li",{children:[_[e]," ",C[e]]}),s.jsx("li",{children:L[e]}),s.jsx("li",{children:Q[e]})]}),s.jsx("a",{href:"https://github.com/jenniina/react-sub-site/tree/main/src/components/Quiz",children:"Github"})]}),s.jsxs("div",{className:`start-screen ${t.quiz}`,children:[s.jsx("h2",{children:g[e]}),s.jsxs("p",{children:[q[e],":"]}),s.jsxs("div",{className:`${t.difficulty}`,children:[s.jsxs("button",{className:`${t.mode} ${t.easy}`,onClick:()=>l("easy"),children:[A[e]," ",s.jsx(r,{})]}),s.jsxs("button",{className:`${t.mode} ${t.medium}`,onClick:()=>l("medium"),children:[T[e]," ",s.jsx(r,{}),s.jsx(r,{})]}),s.jsxs("button",{className:`${t.mode} ${t.hard}`,onClick:()=>l("hard"),children:[k[e]," ",s.jsx(r,{}),s.jsx(r,{}),s.jsx(r,{})]})]})]}),s.jsx(c.Suspense,{fallback:s.jsxs("div",{className:"flex center margin0auto textcenter",children:[y[e],"..."]}),children:s.jsx(F,{language:e,user:o,highscoresLocal:j,text:"quizstart"})})]})})})};export{as as default};
