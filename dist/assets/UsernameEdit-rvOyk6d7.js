import{r as c,j as s}from"./react-A9DAvxly.js";import{K as y,ce as N,cf as $,cg as T,ch as _,c6 as A,b5 as C,W as i,ci as F,cj as R,b4 as D,cc as q,cd as O}from"./index-DSShcy7i.js";import{s as d}from"./edit.module-Tb44_we2.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-qZGjoLfu.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const es=({user:a,language:e})=>{const r=y(),[p,b]=c.useState((a==null?void 0:a.username)??""),[l,h]=c.useState(""),[w,n]=c.useState(!1),S=async m=>{var E,f;m.preventDefault(),n(!0);try{const v={_id:a._id,username:p,passwordOld:l,language:e};if(a){if(p.trim()===a.username.trim()){r(i(`${F[e]}`,!0,5)),n(!1);return}r(R(v)).then(t=>{t&&(t.success===!1?r(i(`${t.message??D[e]}`,!0,5)):(r(i(`${t.message??q[e]}`,!1,5)),h(""))),n(!1)}).catch(t=>{var u,x,j,U;console.error(t),(x=(u=t.response)==null?void 0:u.data)!=null&&x.message?r(i(t.response.data.message,!0,8)):t.code==="ERR_BAD_REQUEST"&&((U=(j=t.response)==null?void 0:j.data)!=null&&U.message)?r(i(`${t.response.data.message}`,!0,5)):setTimeout(()=>{r(i(O[e],!0,5))},2e3),n(!1)})}}catch(o){(f=(E=o.response)==null?void 0:E.data)!=null&&f.message?r(i(o.response.data.message,!0,8)):console.error("error",o)}};return s.jsx(s.Fragment,{children:a?s.jsxs(s.Fragment,{children:[s.jsx("h2",{children:N[e]}),s.jsx("p",{className:d.p,children:$[e]}),s.jsxs("p",{className:`${d.p} ${d["p-last"]}`,children:[T[e],": ",s.jsx("strong",{children:a==null?void 0:a.username})]}),s.jsxs("form",{onSubmit:S,className:d["edit-user"],children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"text",name:"username",id:"username",value:p,onChange:({target:m})=>b(m.value.trim())}),s.jsx("span",{children:_[e]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password-username",value:l,onChange:({target:m})=>h(m.value.trim())}),s.jsx("span",{children:A[e]})]})}),s.jsx("button",{type:"submit",disabled:w,children:C[e]})]})]}):s.jsx(s.Fragment,{})})};export{es as default};