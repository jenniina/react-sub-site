import{r as n,j as s}from"./react-A9DAvxly.js";import{K as y,c3 as C,c4 as U,c5 as N,c6 as S,b3 as _,W as a,c7 as D,c8 as R,c9 as q,b2 as A,ca as F,cb as T}from"./index-DcgSy2bx.js";import{s as $}from"./edit.module-Tb44_we2.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DfNghVim.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./uuid-Dv1xt2bl.js";const rs=({user:p,language:e})=>{const t=y(),[m,c]=n.useState(""),[i,l]=n.useState(""),[u,h]=n.useState(""),b=async o=>{var w,f;o.preventDefault();try{if(i.trim()!==u.trim()){t(a(D[e],!0,5));return}else if(i.length<10){t(a(R[e],!0,5));return}const v={_id:p._id,passwordOld:m,password:i,language:e};p&&t(q(v)).then(r=>{r&&(r.success===!1?t(a(`${r.message||A[e]}`,!0,5)):(t(a(`${r.message||F[e]}`,!1,5)),c(""),l(""),h("")))}).catch(r=>{var x,j,E,P;console.error(r),(j=(x=r.response)==null?void 0:x.data)!=null&&j.message?t(a(r.response.data.message,!0,8)):r.code==="ERR_BAD_REQUEST"&&((P=(E=r.response)==null?void 0:E.data)!=null&&P.message)?t(a(`${r.response.data.message}`,!0,5)):setTimeout(()=>{t(a(T[e],!0,5))},2e3)})}catch(d){(f=(w=d.response)==null?void 0:w.data)!=null&&f.message?t(a(d.response.data.message,!0,8)):console.error("error",d)}};return s.jsx(s.Fragment,{children:p?s.jsxs(s.Fragment,{children:[s.jsx("h2",{children:C[e]}),s.jsxs("form",{onSubmit:b,className:$["edit-user"],children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password",value:m,onChange:({target:o})=>c(o.value.trim())}),s.jsx("span",{children:U[e]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"password",id:"password-edit",value:i,onChange:({target:o})=>l(o.value.trim())}),s.jsx("span",{children:N[e]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"confirmPassword",id:"confirmPassword",value:u,onChange:({target:o})=>h(o.value.trim())}),s.jsx("span",{children:S[e]})]})}),s.jsx("button",{type:"submit",children:_[e]})]})]}):s.jsx(s.Fragment,{})})};export{rs as default};
