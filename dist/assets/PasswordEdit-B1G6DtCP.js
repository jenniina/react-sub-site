import{r as d,j as s}from"./react-kX_YxI4E.js";import{L as S,u as U,e as a,at as N}from"./index-DlLCwrmZ.js";import{s as _}from"./edit.module-3NLXhYEv.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-CzVo0GbG.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const W=({user:m,language:C})=>{const{t}=d.useContext(S),r=U(),[l,u]=d.useState(""),[n,c]=d.useState(""),[f,h]=d.useState(""),[E,i]=d.useState(!1),b=async o=>{var w,x;o.preventDefault(),i(!0);try{if(n.trim()!==f.trim()){r(a(t("PasswordsDoNotMatch"),!0,5)),i(!1);return}else if(n.length<10){r(a(t("PasswordMustBeAtLeastTenCharacters"),!0,5)),i(!1);return}const y={_id:m._id,passwordOld:l,password:n,language:C};m&&r(N(y)).then(e=>{e&&(e.success===!1?r(a(`${e.message||t("Error")}`,!0,5)):(r(a(`${e.message||t("UserUpdated")}`,!1,5)),u(""),c(""),h(""))),i(!1)}).catch(e=>{var j,g,P,v;console.error(e),(g=(j=e.response)==null?void 0:j.data)!=null&&g.message?r(a(e.response.data.message,!0,8)):e.code==="ERR_BAD_REQUEST"&&((v=(P=e.response)==null?void 0:P.data)!=null&&v.message)?r(a(`${e.response.data.message}`,!0,5)):setTimeout(()=>{r(a(t("UserNotUpdated"),!0,5))},2e3),i(!1)})}catch(p){(x=(w=p.response)==null?void 0:w.data)!=null&&x.message?r(a(p.response.data.message,!0,8)):console.error("error",p)}};return s.jsx(s.Fragment,{children:m?s.jsxs(s.Fragment,{children:[s.jsx("h2",{children:t("EditPassword")}),s.jsxs("form",{onSubmit:b,className:_["edit-user"],children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password",value:l,onChange:({target:o})=>u(o.value.trim())}),s.jsx("span",{children:t("CurrentPassword")})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"password",id:"password-edit",value:n,onChange:({target:o})=>c(o.value.trim())}),s.jsx("span",{children:t("Password")})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"confirmPassword",id:"confirmPassword",value:f,onChange:({target:o})=>h(o.value.trim())}),s.jsx("span",{children:t("ConfirmPassword")})]})}),s.jsx("button",{type:"submit",disabled:E,children:t("Edit")})]})]}):s.jsx(s.Fragment,{})})};export{W as default};
