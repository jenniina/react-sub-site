import{r as i,j as a}from"./react-A9DAvxly.js";import{a as p}from"./react-redux-CHm9GgGE.js";import{K as c,cM as n,cN as f,cO as l,cP as u,cr as d}from"./index-hhrSh8be.js";import{a as h}from"./react-router-S1Hdk0kP.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DfNghVim.js";import"./react-router-dom-CYs6befe.js";import"./@remix-run-DTnHqtaE.js";import"./uuid-Dv1xt2bl.js";const P=()=>{const{secondsRemaining:t}=p(r=>r.questions),o=t%60,e=Math.floor(t/60),s=c(),m=h();return i.useEffect(()=>{t===0&&(s(n()),s(f()),s(l()),m("/portfolio/quiz/results"))},[t]),i.useEffect(()=>{const r=setInterval(()=>{s(u())},1e3);return()=>clearInterval(r)},[]),a.jsxs("div",{className:`${d.timer}`,children:[e<10&&"0",e,":",o<10&&"0",o]})};export{P as default};