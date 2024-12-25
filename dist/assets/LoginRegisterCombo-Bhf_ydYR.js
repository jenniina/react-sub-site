import{r as i,j as s}from"./react-A9DAvxly.js";import{r as D,M as O,u as y,g as U,i as _,cw as k,bZ as z,hh as A,aA as H,hi as P,bX as q,cu as I,hj as T,p as h,hk as W,hl as B,c1 as C,hm as Q,b_ as K,hn as X,ho as Y}from"./index-Bet1KYOA.js";import{a as Z}from"./react-redux-C4cSaZU-.js";import{s as m}from"./quiz.module-DTU83NUw.js";import{D as G,o as J,j as V,x as ss,f as es,y as L,g as ts,h as rs,F as M}from"./quiz-BgDInUK-.js";import{L as is}from"./react-router-dom-j9Ns2JNj.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-CxfJ6lHP.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-yVutJqMS.js";import"./react-is-DUDD-a5e.js";import"./react-router-BoqxkIr7.js";import"./@remix-run-DTnHqtaE.js";import"./use-sync-external-store-DEc9BFqZ.js";const os=({easy:r,medium:c,hard:o,language:t})=>{const{windowWidth:d}=D(),[n,p]=i.useState(!0);return i.useEffect(()=>{d<O?p(!1):p(!0)},[d]),s.jsxs("table",{className:m.highscores,children:[s.jsx("caption",{children:G[t]}),s.jsx("thead",{children:s.jsxs("tr",{className:m.th,children:[s.jsx("th",{children:J[t]}),s.jsx("th",{className:m.score,children:V[t]}),n&&s.jsx("th",{className:m.percentage,children:"%"}),s.jsx("th",{children:ss[t]})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("th",{children:es[t]}),s.jsxs("td",{children:[r?r.score:0,"/300"]}),n&&s.jsxs("td",{children:[+(r.score*100/300).toFixed(1),"%"]}),s.jsx("td",{children:r.score===0||r.time===0?L[t]:s.jsxs(s.Fragment,{children:[Math.floor(r.time/60)<10&&"0",Math.floor(r.time/60),":",r.time%60<10&&"0",r.time%60]})})]}),s.jsxs("tr",{children:[s.jsx("th",{children:ts[t]}),s.jsxs("td",{children:[c?c.score:0,"/300"]}),n&&s.jsxs("td",{children:[+(c.score*100/300).toFixed(1),"%"]}),s.jsx("td",{children:c.score===0||c.time===0?L[t]:s.jsxs(s.Fragment,{children:[Math.floor(c.time/60)<10&&"0",Math.floor(c.time/60),":",c.time%60<10&&"0",c.time%60]})})]}),s.jsxs("tr",{children:[s.jsx("th",{children:rs[t]}),s.jsxs("td",{children:[o?o.score:0,"/300"]}),n&&s.jsxs("td",{children:[+(o.score*100/300).toFixed(1),"%"]}),s.jsx("td",{children:o.score===0||o.time===0?L[t]:s.jsxs(s.Fragment,{children:[Math.floor(o.time/60)<10&&"0",Math.floor(o.time/60),":",o.time%60<10&&"0",o.time%60]})})]})]})]})},ns=({easy:r,medium:c,hard:o,language:t,setIsFormOpen:d})=>{const n=y(),[p,g]=i.useState(!1),[N,E]=i.useState(""),[b,x]=i.useState(""),v=i.useRef(null),[j,R]=i.useState({easy:r??{score:0,time:210},medium:c??{score:0,time:210},hard:o??{score:0,time:210}}),[f,F]=i.useState(!1),e=Z(l=>{var a;return(a=l.auth)==null?void 0:a.user});i.useEffect(()=>{e!=null&&e._id&&n(U(e._id)).then(l=>{l!==null&&R(l.highscores)})},[e==null?void 0:e._id]),i.useEffect(()=>{n(_())},[]);const u=()=>{n(T())},$=async l=>{l.preventDefault(),g(!0),n(h(W[t],!1,8)),await n(B(N,b,"en")).then(()=>{E(""),x(""),g(!1)}).catch(a=>{var w,S;(S=(w=a.response)==null?void 0:w.data)!=null&&S.message?n(h(a.response.data.message,!0,8)):a.code==="ERR_BAD_REQUEST"?n(h(`${C.en}: ${a.response.data.message}`,!0,8)):a.code==="ERR_NETWORK"&&n(h(`${C.en}: ${a.message}`,!0,8)),g(!1)})};return s.jsx("div",{className:"login-wrap",children:e?s.jsxs(s.Fragment,{children:[s.jsxs("p",{children:[s.jsxs("span",{children:[k[(e==null?void 0:e.language)??"en"]," ",e!=null&&e.name?e==null?void 0:e.name:e.username," "]}),s.jsx(is,{to:"/edit",children:`${z[e==null?void 0:e.language]}`}),s.jsxs("button",{onClick:u,id:"logout",className:"logout danger",children:[A[(e==null?void 0:e.language)??"en"]," ×"]})]}),s.jsx("button",{onClick:()=>F(!f),className:m.showHighscores,children:`${f?"hide":"show"} highscores`}),f&&s.jsx(os,{language:t,easy:j.easy,medium:j.medium,hard:j.hard})]}):s.jsx(s.Fragment,{children:s.jsxs(H,{language:t,className:"accordion-login login-to-save",wrapperClass:"login-to-save-wrap",text:M[t],ref:v,setIsFormOpen:d,hideBrackets:!0,children:[s.jsx("h2",{children:M[t]}),s.jsxs("form",{onSubmit:$,className:`login ${m.login}`,children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"quiz-username",children:[s.jsx("input",{id:"quiz-username",name:"username",type:"text",value:N,required:!0,autoComplete:"email",onChange:({target:l})=>E(l.value.trim())}),s.jsxs("span",{children:[P[t],": "]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{name:"password",type:"password",required:!0,autoComplete:"current-password",value:b,onChange:({target:l})=>x(l.value.trim())}),s.jsxs("span",{children:[q[t],": "]})]})}),s.jsx("button",{type:"submit",disabled:p,id:"login",className:"login",children:I[t]})]})]})})})},$s=({language:r,user:c,highscoresLocal:o,text:t})=>{const d=y(),[n,p]=i.useState(!1),[g,N]=i.useState(!1),[E,b]=i.useState(""),[x,v]=i.useState(""),[j,R]=i.useState(""),[f,F]=i.useState(""),[e,u]=i.useState(!1),$=l=>{if(l.preventDefault(),u(!0),x.trim()!==j.trim()){d(h(K[r],!0,8)),u(!1);return}d(X({name:f,username:E,password:x,language:"en"})).then(async()=>{d(h(Y[r],!1,8)),u(!1)}).catch(a=>{var w,S;console.error(a),(S=(w=a.response)==null?void 0:w.data)!=null&&S.message?d(h(a.response.data.message,!0,8)):d(h(`${C[r]}: ${a.message}`,!0,8)),u(!1)})};return s.jsxs("div",{className:`quiz-register-login-wrap register-login-wrap ${m["register-login-wrap"]}`,children:[s.jsx("div",{className:`${n?"open":""} ${c?"logged":""}`,children:s.jsx(ns,{setIsFormOpen:p,language:r,easy:o.easy,medium:o.medium,hard:o.hard})}),s.jsx("div",{className:`${g?"open":""}`,children:s.jsx(Q,{sending:e,setIsFormOpen:N,language:r,handleRegister:$,username:E,setUsername:b,password:x,setPassword:v,confirmPassword:j,setConfirmPassword:R,name:f,setName:F,text:t})})]})};export{$s as default};
