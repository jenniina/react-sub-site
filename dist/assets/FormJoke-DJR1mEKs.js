const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Joke-C3KDssgd.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-CwyG3AXH.js","assets/react-dom-yh0erWL-.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-CHm9GgGE.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-BGZR1ov-.js","assets/react-router-dom-CYs6befe.js","assets/react-router-S1Hdk0kP.js","assets/@remix-run-DTnHqtaE.js","assets/index-B5UwMFIb.css"])))=>i.map(i=>d[i]);
import{cR as X,S as r,cS as Y,L as m,cT as Z,cU as d,cV as G,cW as H,cX as Q,cY as g,cZ as ee,c_ as se,c$ as te,d0 as p,d1 as oe,d2 as re,d3 as ie,ad as ae}from"./index-CwyG3AXH.js";import{r as i,j as t}from"./react-A9DAvxly.js";import{a2 as le}from"./react-icons-BGZR1ov-.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const ce=i.lazy(()=>X(()=>import("./Joke-C3KDssgd.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),be=({handleFormSubmit:j,jokeCategory:x,categoryValues:h,setCategoryValues:u,setJokeCategory:a,setQueryValue:f,getKeyByValue:E,setLanguage:v,setQuery:y,joke:k,language:e,query:N,delivery:T,jokeId:C,author:$,options:S,submitted:b,isCheckedSafemode:l,isCheckedJokeType:w,handleToggleChangeSafemode:A,handleToggleChangeEJokeType:_,reveal:q,setReveal:F,handleJokeSave:V,optionsCategory:I,categoryByLanguages:c,visibleJoke:L,setVisibleJoke:R,norrisCategories:z,selectedNorrisCategory:D,setSelectedNorrisCategory:O,hasNorris:P,getCategoryInLanguage:U,subCategoryResults:J,handleBlacklistUpdate:B,sending:n})=>(i.useEffect(()=>{setTimeout(()=>{const s=document.querySelectorAll(".select-container"),o=(s==null?void 0:s.length)+2;s==null||s.forEach((K,M)=>{const W=o-M;K.style.zIndex=`${W}`})},500)},[]),t.jsxs(t.Fragment,{children:[t.jsxs("form",{onSubmit:s=>{s.preventDefault(),R(!1),setTimeout(()=>{j(s)},400)},className:"joke",children:[t.jsxs("div",{className:"controls-wrap",children:[t.jsx(r,{language:e,id:"language-joke",className:"language full",instructions:`${Y[e]}:`,options:S(m),value:e?{value:e,label:E(m,e)}:void 0,onChange:s=>{v(s==null?void 0:s.value),a(Z.Misc)}}),t.jsxs("div",{className:"toggle-wrap",children:[t.jsx(d,{isChecked:l,name:"safemode",id:"safemode",className:`${e} ${l?"":"unsafe"} safemode`,label:`${G[e]}: `,on:H[e],off:Q[e],handleToggleChange:A}),t.jsx(d,{isChecked:w,name:"joketype",id:"joketype",className:`${e} joketype`,label:`${g[e]}: `,on:ee[e],off:se[e],handleToggleChange:_,equal:!0})]})]}),c?t.jsx(r,{language:e,multiple:!0,id:"jokeCategory",className:"category",instructions:`${te[e]}:`,selectAnOption:p[e],value:h,options:I(c),onChange:s=>{u(s),a(s==null?void 0:s.map(o=>o.value).join(","))}}):"",t.jsx(r,{language:e,id:"jokeCategoryNorrisCategories",className:`category extras ${P?"":"hidden"}`,instructions:`${oe[e]}:`,selectAnOption:p[e],value:D,options:z,onChange:s=>{O(s)}}),t.jsxs("div",{className:"flex column center",children:[t.jsx("div",{className:"input-wrap",children:t.jsxs("label",{htmlFor:"queryValue",children:[t.jsx("input",{type:"text",id:"queryValue",name:"queryValue",value:N,onChange:s=>{y(s.target.value),f(encodeURIComponent(s.target.value)+"&")}}),t.jsx("span",{children:re[e]})]})}),t.jsx("button",{id:"generate-joke",type:"submit",disabled:n,children:ie[e]})]})]}),t.jsx("div",{className:`downwards-arrow ${b?"play":""}`,children:t.jsx(le,{})}),t.jsx(i.Suspense,{fallback:t.jsxs("div",{children:[ae[e],"..."]}),children:t.jsx(ce,{sending:n,joke:k,delivery:T,author:$,jokeId:C,reveal:q,jokeCategory:x,setReveal:F,handleJokeSave:V,language:e,visibleJoke:L,getCategoryInLanguage:U,subCategoryResults:J,handleBlacklistUpdate:B})})]}));export{be as default};
