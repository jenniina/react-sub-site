import{r as p,j as e}from"./react-kX_YxI4E.js";import{u as v,cc as S,cd as _,ce as k,cf as C,bU as P,bX as R,c9 as D,o as r,b$ as N,c0 as F,ca as T,cb as q,i as A,c1 as B}from"./index-BdZ3b4Wv.js";import{s as m}from"./edit.module-Tb44_we2.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DEg4IKXU.js";import"./react-router-dom-ZPAD5XPx.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const ie=({user:s,language:a})=>{const i=v(),[c,b]=p.useState((s==null?void 0:s.name)||""),[l,h]=p.useState(""),[w,n]=p.useState(!1),y=async o=>{var f,x;o.preventDefault(),n(!0);try{const $={_id:s._id,name:c,passwordOld:l,language:a};s&&i(D($)).then(t=>{t&&(t.success===!1?i(r(`${N[a]}: ${t.message}`,!0,5)):(i(r(`${t.message??F[a]}`,!1,5)),i(T(t.user)).then(()=>{i(q(s==null?void 0:s._id)).then(()=>i(A()))}),h(""))),n(!1)}).catch(t=>{var j,E,u,U;console.error(t),(E=(j=t.response)==null?void 0:j.data)!=null&&E.message?i(r(t.response.data.message,!0,8)):t.code==="ERR_BAD_REQUEST"&&((U=(u=t.response)==null?void 0:u.data)!=null&&U.message)?i(r(`${N[a]}: ${t.response.data.message}`,!0,5)):setTimeout(()=>{i(r(B[a],!0,5))},2e3),n(!1)})}catch(d){(x=(f=d.response)==null?void 0:f.data)!=null&&x.message?i(r(d.response.data.message,!0,8)):console.error("error",d),n(!1)}};return e.jsx(e.Fragment,{children:s?e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:S[a]}),e.jsxs("p",{className:m.p,children:[_[a],": ",e.jsx("strong",{children:s==null?void 0:s.name})]}),e.jsx("p",{className:`${m.p} ${m["p-last"]}`,children:k[a]}),e.jsxs("form",{onSubmit:y,className:m["edit-user"],children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{required:!0,type:"text",name:"name",id:"name-edit",value:c,onChange:({target:o})=>b(o.value)}),e.jsx("span",{children:C[a]})]})}),e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password-user",value:l,onChange:({target:o})=>h(o.value.trim())}),e.jsx("span",{children:P[a]})]})}),e.jsx("button",{type:"submit",disabled:w,children:R[a]})]})]}):e.jsx(e.Fragment,{})})};export{ie as default};