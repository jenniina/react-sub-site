import{K as y,r as c,j as s,cn as C,co as U,cp as N,cq as S,bk as _,X as a,cr as q,cs as D,ct as R,bj as A,cu as F,cv as T}from"./index-CLKPobif.js";import{s as $}from"./edit.module-Tb44_we2.js";const O=({user:n,language:e})=>{const t=y(),[p,l]=c.useState(""),[o,m]=c.useState(""),[u,h]=c.useState(""),v=async d=>{var w,x;d.preventDefault();try{if(o.trim()!==u.trim()){t(a(q[e],!0,5));return}else if(o.length<10){t(a(D[e],!0,5));return}const b={_id:n._id,passwordOld:p,password:o,language:e};n&&t(R(b)).then(r=>{r&&(r.success===!1?t(a(`${r.message||A[e]}`,!0,5)):(t(a(`${r.message||F[e]}`,!1,5)),l(""),m(""),h("")))}).catch(r=>{var f,j,E,P;console.error(r),(j=(f=r.response)==null?void 0:f.data)!=null&&j.message?t(a(r.response.data.message,!0,8)):r.code==="ERR_BAD_REQUEST"&&((P=(E=r.response)==null?void 0:E.data)!=null&&P.message)?t(a(`${r.response.data.message}`,!0,5)):setTimeout(()=>{t(a(T[e],!0,5))},2e3)})}catch(i){(x=(w=i.response)==null?void 0:w.data)!=null&&x.message?t(a(i.response.data.message,!0,8)):console.error("error",i)}};return s.jsx(s.Fragment,{children:n?s.jsxs(s.Fragment,{children:[s.jsx("h2",{children:C[e]}),s.jsxs("form",{onSubmit:v,className:$["edit-user"],children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"old-password",id:"old-password",value:p,onChange:({target:d})=>l(d.value.trim())}),s.jsx("span",{children:U[e]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"password",id:"password-edit",value:o,onChange:({target:d})=>m(d.value.trim())}),s.jsx("span",{children:N[e]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{children:[s.jsx("input",{required:!0,type:"password",name:"confirmPassword",id:"confirmPassword",value:u,onChange:({target:d})=>h(d.value.trim())}),s.jsx("span",{children:S[e]})]})}),s.jsx("button",{type:"submit",children:_[e]})]})]}):s.jsx(s.Fragment,{})})};export{O as default};
