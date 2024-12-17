const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Joke-CqS1yRt6.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-Bhl207lb.js","assets/react-dom-yh0erWL-.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-CHm9GgGE.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-CrVlm7qW.js","assets/react-router-dom-CYs6befe.js","assets/react-router-S1Hdk0kP.js","assets/@remix-run-DTnHqtaE.js","assets/index-DNejkYwN.css"])))=>i.map(i=>d[i]);
import{fl as H,S as r,g$ as Q,L as c,h0 as W,gN as X,h1 as Y,h2 as Z,h3 as g,h4 as ee,h5 as se,h6 as te,h7 as d,h8 as oe,gF as re,h9 as ie,ag as ae}from"./index-Bhl207lb.js";import{r as i,j as t}from"./react-A9DAvxly.js";import{B as p}from"./ButtonToggle-C_sisbGr.js";import{a_ as le}from"./react-icons-CrVlm7qW.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const ne=i.lazy(()=>H(()=>import("./Joke-CqS1yRt6.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),we=({handleFormSubmit:h,jokeCategory:j,categoryValues:x,setCategoryValues:f,setJokeCategory:a,setQueryValue:u,getKeyByValue:E,setLanguage:v,setQuery:y,joke:N,language:e,query:k,delivery:C,jokeId:T,author:$,options:S,submitted:b,isCheckedSafemode:l,isCheckedJokeType:w,handleToggleChangeSafemode:A,handleToggleChangeEJokeType:_,reveal:F,setReveal:q,handleJokeSave:I,optionsCategory:L,categoryByLanguages:n,visibleJoke:V,setVisibleJoke:z,norrisCategories:D,selectedNorrisCategory:O,setSelectedNorrisCategory:P,hasNorris:R,getCategoryInLanguage:B,subCategoryResults:J,handleBlacklistUpdate:U,sending:m})=>(i.useEffect(()=>{setTimeout(()=>{const s=document.querySelectorAll(".select-container"),o=(s==null?void 0:s.length)+2;s==null||s.forEach((K,M)=>{const G=o-M;K.style.zIndex=`${G}`})},500)},[]),t.jsxs(t.Fragment,{children:[t.jsxs("form",{onSubmit:s=>{s.preventDefault(),z(!1),setTimeout(()=>{h(s)},400)},className:"joke",children:[t.jsxs("div",{className:"controls-wrap",children:[t.jsx(r,{language:e,id:"language-joke",className:"language full",instructions:`${Q[e]}:`,options:S(c),value:e?{value:e,label:E(c,e)}:void 0,onChange:s=>{v(s==null?void 0:s.value),a(W.Misc)}}),t.jsxs("div",{className:"toggle-wrap",children:[t.jsx(p,{isChecked:l,name:"safemode",id:"safemode",className:`${e} ${l?"":"unsafe"} safemode`,label:`${X[e]}: `,on:Y[e],off:Z[e],handleToggleChange:A}),t.jsx(p,{isChecked:w,name:"joketype",id:"joketype",className:`${e} joketype`,label:`${g[e]}: `,on:ee[e],off:se[e],handleToggleChange:_,equal:!0})]})]}),n?t.jsx(r,{language:e,multiple:!0,id:"jokeCategory",className:"category",instructions:`${te[e]}:`,selectAnOption:d[e],value:x,options:L(n),onChange:s=>{f(s),a(s==null?void 0:s.map(o=>o.value).join(","))}}):"",t.jsx(r,{language:e,id:"jokeCategoryNorrisCategories",className:`category extras ${R?"":"hidden"}`,instructions:`${oe[e]}:`,selectAnOption:d[e],value:O,options:D,onChange:s=>{P(s)}}),t.jsxs("div",{className:"flex column center",children:[t.jsx("div",{className:"input-wrap",children:t.jsxs("label",{htmlFor:"queryValue",children:[t.jsx("input",{type:"text",id:"queryValue",name:"queryValue",value:k,onChange:s=>{y(s.target.value),u(encodeURIComponent(s.target.value)+"&")}}),t.jsx("span",{children:re[e]})]})}),t.jsx("button",{id:"generate-joke",type:"submit",disabled:m,children:ie[e]})]})]}),t.jsx("div",{className:`downwards-arrow ${b?"play":""}`,children:t.jsx(le,{})}),t.jsx(i.Suspense,{fallback:t.jsxs("div",{className:"flex center margin0auto textcenter",children:[ae[e],"..."]}),children:t.jsx(ne,{sending:m,joke:N,delivery:C,author:$,jokeId:T,reveal:F,jokeCategory:j,setReveal:q,handleJokeSave:I,language:e,visibleJoke:V,getCategoryInLanguage:B,subCategoryResults:J,handleBlacklistUpdate:U})})]}));export{we as default};
