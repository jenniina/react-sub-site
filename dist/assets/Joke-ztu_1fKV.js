import{r as u,j as a}from"./react-kX_YxI4E.js";import{L as $,O as N,E}from"./index-De2CRixK.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DhcENkY1.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const K=({joke:e,delivery:t,author:m,jokeCategory:o,reveal:n,setReveal:c,handleJokeSave:l,sending:p,language:i,visibleJoke:s,getCategoryInLanguage:h,subCategoryResults:d,jokeId:x,handleBlacklistUpdate:j})=>{const{t:r}=u.useContext($);return a.jsxs("form",{onSubmit:l,className:`joke-form-save ${e&&s?"fadeIn":""}`,children:[a.jsxs("article",{"aria-live":"polite",className:`joke ${s?"fadeIn":""}`,children:[a.jsx("p",{className:`${s?"fadeIn":""} ${t?"":"no-delivery"}`,children:a.jsxs("small",{children:[r("ECategoryTitle"),": ",h(o,i)]})}),a.jsx("p",{className:`${s?"fadeIn":""} ${t?"":"no-delivery"}`,children:e}),a.jsx("button",{type:"button",onClick:()=>c(!n),className:`delivery ${t?"has-delivery":"no-delivery"} ${t&&!n?"reveal":""} ${s?"fadeIn":""}`,children:a.jsxs(a.Fragment,{children:[a.jsx("span",{...n?{"aria-hidden":!1}:{"aria-hidden":!0},children:r("EClickToReveal")}),t?a.jsx("p",{"aria-live":"assertive",className:`${s?"fadeIn":""}`,children:n?"":t}):""]})}),m?a.jsx("p",{className:`author ${s?"fadeIn":""}`,children:a.jsxs("small",{children:[r("EAuthor"),": ",m]})}):"",d.length>0?a.jsx("p",{className:`sub-categories ${s?"fadeIn":""}`,children:a.jsxs("small",{children:[r("ECategoryTitle"),":"," ",d.map(f=>f).join(", ")]})}):""]}),e||t?a.jsxs("div",{className:"save-delete-wrap",children:[a.jsx("button",{type:"submit",disabled:p,className:`submit ${s?"fadeIn":""}`,children:r("ESaveJoke")}),a.jsx("button",{type:"button",className:`delete danger narrow ${s?"fadeIn":""}`,onClick:()=>j(x,i,o===N.ChuckNorris&&i===E.en?e:void 0),children:r("EHide")})]}):""]})};export{K as default};
