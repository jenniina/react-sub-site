import{r as p,j as e}from"./react-A9DAvxly.js";import{K as N,cj as R,S as C,L as j,c5 as D,b5 as F,ck as P,W as o,b4 as b,cb as A,cl as B,cm as O,bl as T,cc as k}from"./index-CwyG3AXH.js";import{s as U}from"./edit.module-Tb44_we2.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-BGZR1ov-.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const re=({user:t,language:i,setLanguage:S,options:v,getKeyByValue:w})=>{const a=N(),[l,c]=p.useState(""),[n,y]=p.useState((t==null?void 0:t.language)??i),[L,d]=p.useState(!1),_=async r=>{var u,g;r.preventDefault(),d(!0);try{const $={_id:t._id,name:t.name,passwordOld:l,language:n};t&&a(P($)).then(s=>{s&&(s.success===!1?a(o(`${b[i]}: ${s.message}`,!0,5)):(a(o(`${s.message??A[n]}`,!1,5)),a(B(s.user)).then(()=>{a(O(t==null?void 0:t._id)).then(()=>a(T())),S(n)}),c(""))),d(!1)}).catch(s=>{var f,h,E,x;console.error(s),(h=(f=s.response)==null?void 0:f.data)!=null&&h.message?a(o(s.response.data.message,!0,8)):s.code==="ERR_BAD_REQUEST"&&((x=(E=s.response)==null?void 0:E.data)!=null&&x.message)?a(o(`${b[i]}: ${s.response.data.message}`,!0,5)):setTimeout(()=>{a(o(k[i],!0,5))},2e3),d(!1)})}catch(m){(g=(u=m.response)==null?void 0:u.data)!=null&&g.message?a(o(m.response.data.message,!0,8)):console.error("error",m),d(!1)}};return e.jsx(e.Fragment,{children:t?e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:R[i]}),e.jsxs("form",{onSubmit:_,className:U["edit-user"],children:[e.jsx(C,{language:i,id:"language-register",className:`language ${U.language}`,instructions:"Language",hide:!0,options:v(j),value:n?{value:n,label:w(j,n)}:void 0,onChange:r=>{y(r==null?void 0:r.value)}}),e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password-user-language",value:l,onChange:({target:r})=>c(r.value.trim())}),e.jsx("span",{children:D[i]})]})}),e.jsx("button",{type:"submit",disabled:L,children:F[i]})]})]}):e.jsx(e.Fragment,{})})};export{re as default};
