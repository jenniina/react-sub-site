import{r as a,j as s}from"./react-A9DAvxly.js";import{a as n}from"./react-redux-CHm9GgGE.js";import{E as l,b3 as c}from"./AccessibleColors-CRBQVtI_.js";const p=({language:i=c.English,className:m})=>{const e=n(o=>o.notification),[r,t]=a.useState(!1);return a.useEffect(()=>{t(!1)},[e]),e===null||r?null:s.jsx("div",{className:`notification ${e.isError?"error":""}`,"aria-live":"assertive",children:s.jsxs("p",{children:[e.message," ",s.jsxs("button",{type:"button",className:"close",onClick:()=>{t(!0)},children:[s.jsx("span",{children:l[i]}),s.jsx("span",{"aria-hidden":"true",className:"times",children:"×"})]})]})})};export{p as N};
