const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Joke-BF6vZ6cs.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/index-t27NYhnJ.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-CzVo0GbG.js","assets/react-router-dom-StiqOUIT.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-BQmqmx7r.css"])))=>i.map(i=>d[i]);
import{_ as M,L as W,S as i,W as d,O as G}from"./index-t27NYhnJ.js";import{r as a,j as t}from"./react-kX_YxI4E.js";import{B as p}from"./ButtonToggle-BxSBMIQ9.js";import{a_ as H}from"./react-icons-CzVo0GbG.js";import"./react-dom-B5MLDbn_.js";import"./dom-to-image-more-CfDXlNbO.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const Q=a.lazy(()=>M(()=>import("./Joke-BF6vZ6cs.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),ge=({handleFormSubmit:u,jokeCategory:x,categoryValues:j,setCategoryValues:h,setJokeCategory:n,setQueryValue:f,getKeyByValue:X,setLanguage:g,setQuery:y,joke:v,language:o,query:C,delivery:N,jokeId:k,author:T,options:$,submitted:A,isCheckedSafemode:l,isCheckedJokeType:S,handleToggleChangeSafemode:b,handleToggleChangeEJokeType:w,reveal:_,setReveal:E,handleJokeSave:L,optionsCategory:q,categoryByLanguages:m,visibleJoke:F,setVisibleJoke:V,norrisCategories:I,selectedNorrisCategory:O,setSelectedNorrisCategory:z,hasNorris:B,getCategoryInLanguage:D,subCategoryResults:P,handleBlacklistUpdate:R,sending:c})=>{const{t:s}=a.useContext(W);return a.useEffect(()=>{setTimeout(()=>{const e=document.querySelectorAll(".select-container"),r=(e==null?void 0:e.length)+2;e==null||e.forEach((J,K)=>{const U=r-K;J.style.zIndex=`${U}`})},500)},[]),t.jsxs(t.Fragment,{children:[t.jsxs("form",{onSubmit:e=>{e.preventDefault(),V(!1),setTimeout(()=>{u(e)},400)},className:"joke",children:[t.jsxs("div",{className:"controls-wrap",children:[t.jsx(i,{language:o,id:"language-joke",className:"language full",instructions:`${s("SelectALanguage")}:`,options:$(d),value:o?{value:o,label:d[o]}:void 0,onChange:e=>{g(e==null?void 0:e.value),n(G.Misc)}}),t.jsxs("div",{className:"toggle-wrap",children:[t.jsx(p,{isChecked:l,name:"safemode",id:"safemode",className:`${o} ${l?"":"unsafe"} safemode`,label:`${s("SafemodeTitle")}: `,on:s("SafeTitle"),off:s("UnsafeTitle"),handleToggleChange:b}),t.jsx(p,{isChecked:S,name:"joketype",id:"joketype",className:`${o} joketype`,label:`${s("JokeTypeTitle")}: `,on:s("TwoPart"),off:s("Single"),handleToggleChange:w,equal:!0})]})]}),m?t.jsx(i,{language:o,multiple:!0,id:"jokeCategory",className:"category",instructions:`${s("SelectACategory")}:`,selectAnOption:s("Any"),value:j,options:q(m),onChange:e=>{h(e),n(e==null?void 0:e.map(r=>r.value).join(","))}}):"",t.jsx(i,{language:o,id:"jokeCategoryNorrisCategories",className:`category extras ${B?"":"hidden"}`,instructions:`${s("ChuckNorrisCategory")}:`,selectAnOption:s("Any"),value:O,options:I,onChange:e=>{z(e)}}),t.jsxs("div",{className:"flex column center",children:[t.jsx("div",{className:"input-wrap",children:t.jsxs("label",{htmlFor:"queryValue",children:[t.jsx("input",{type:"text",id:"queryValue",name:"queryValue",value:C,onChange:e=>{y(e.target.value),f(encodeURIComponent(e.target.value)+"&")}}),t.jsx("span",{children:s("SearchByKeyword")})]})}),t.jsx("button",{id:"generate-joke",type:"submit",disabled:c,children:s("FindAJoke")})]})]}),t.jsx("div",{className:`downwards-arrow ${A?"play":""}`,children:t.jsx(H,{})}),t.jsx(a.Suspense,{fallback:t.jsxs("div",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),children:t.jsx(Q,{sending:c,joke:v,delivery:N,author:T,jokeId:k,reveal:_,jokeCategory:x,setReveal:E,handleJokeSave:L,language:o,visibleJoke:F,getCategoryInLanguage:D,subCategoryResults:P,handleBlacklistUpdate:R})})]})};export{ge as default};
