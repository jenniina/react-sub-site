import{r as f,j as s}from"./react-A9DAvxly.js";import{K as v,cc as y,cd as N,ce as S,cf as $,c4 as T,b3 as _,W as i,cg as A,ch as C,b2 as F,ca as R,cb as D}from"./index-hhrSh8be.js";import{s as n}from"./edit.module-Tb44_we2.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DfNghVim.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./uuid-Dv1xt2bl.js";const ss=({user:r,language:e})=>{const a=v(),[d,U]=f.useState((r==null?void 0:r.username)??""),[p,c]=f.useState(""),b=async m=>{var l,h;m.preventDefault();try{const w={_id:r._id,username:d,passwordOld:p,language:e};if(r){if(d.trim()===r.username.trim()){a(i(`${A[e]}`,!0,5));return}a(C(w)).then(t=>{t&&(t.success===!1?a(i(`${t.message??F[e]}`,!0,5)):(a(i(`${t.message??R[e]}`,!1,5)),c("")))}).catch(t=>{var E,x,u,j;console.error(t),(x=(E=t.response)==null?void 0:E.data)!=null&&x.message?a(i(t.response.data.message,!0,8)):t.code==="ERR_BAD_REQUEST"&&((j=(u=t.response)==null?void 0:u.data)!=null&&j.message)?a(i(`${t.response.data.message}`,!0,5)):setTimeout(()=>{a(i(D[e],!0,5))},2e3)})}}catch(o){(h=(l=o.response)==null?void 0:l.data)!=null&&h.message?a(i(o.response.data.message,!0,8)):console.error("error",o)}};return s.jsx(s.Fragment,{children:r?s.jsxs(s.Fragment,{children:[s.jsx("h2",{children:y[e]}),s.jsx("p",{className:n.p,children:N[e]}),s.jsxs("p",{className:`${n.p} ${n["p-last"]}`,children:[S[e],": ",s.jsx("strong",{children:r==null?void 0:r.username})]}),s.jsxs("form",{onSubmit:b,className:n["edit-user"],children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"text",name:"username",id:"username",value:d,onChange:({target:m})=>U(m.value.trim())}),s.jsx("span",{children:$[e]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password-username",value:p,onChange:({target:m})=>c(m.value.trim())}),s.jsx("span",{children:T[e]})]})}),s.jsx("button",{type:"submit",children:_[e]})]})]}):s.jsx(s.Fragment,{})})};export{ss as default};