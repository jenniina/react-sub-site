import{r as d,j as e}from"./react-kX_YxI4E.js";import{L as y,u as N,e as i,au as C}from"./index-DlLCwrmZ.js";import{s as p}from"./edit.module-3NLXhYEv.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-CzVo0GbG.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const K=({user:t,language:U})=>{const{t:a}=d.useContext(y),r=N(),[l,w]=d.useState((t==null?void 0:t.username)??""),[c,u]=d.useState(""),[S,o]=d.useState(!1),b=async n=>{var h,x;n.preventDefault(),o(!0);try{const v={_id:t._id,username:l,passwordOld:c,language:U};if(t){if(l.trim()===t.username.trim()){r(i(`${a("UsernameIsTheSame")}`,!0,5)),o(!1);return}r(C(v)).then(s=>{s&&(s.success===!1?r(i(`${s.message??a("Error")}`,!0,5)):(r(i(`${s.message??a("UserUpdated")}`,!1,5)),u(""))),o(!1)}).catch(s=>{var f,j,g,E;console.error(s),(j=(f=s.response)==null?void 0:f.data)!=null&&j.message?r(i(s.response.data.message,!0,8)):s.code==="ERR_BAD_REQUEST"&&((E=(g=s.response)==null?void 0:g.data)!=null&&E.message)?r(i(`${s.response.data.message}`,!0,5)):setTimeout(()=>{r(i(a("UserNotUpdated"),!0,5))},2e3),o(!1)})}}catch(m){(x=(h=m.response)==null?void 0:h.data)!=null&&x.message?r(i(m.response.data.message,!0,8)):console.error("error",m)}};return e.jsx(e.Fragment,{children:t?e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:a("EditEmail")}),e.jsx("p",{className:p.p,children:a("SendsAnEmailToTheNewAddressForVerification")}),e.jsxs("p",{className:`${p.p} ${p["p-last"]}`,children:[a("CurrentEmail"),": ",e.jsx("strong",{children:t==null?void 0:t.username})]}),e.jsxs("form",{onSubmit:b,className:p["edit-user"],children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{required:!0,type:"text",name:"username",id:"username",value:l,onChange:({target:n})=>w(n.value.trim())}),e.jsx("span",{children:a("Email")})]})}),e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password-username",value:c,onChange:({target:n})=>u(n.value.trim())}),e.jsx("span",{children:a("CurrentPassword")})]})}),e.jsx("button",{type:"submit",disabled:S,children:a("Edit")})]})]}):e.jsx(e.Fragment,{})})};export{K as default};
