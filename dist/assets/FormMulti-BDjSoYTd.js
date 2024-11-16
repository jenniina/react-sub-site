import{j as e,r as d}from"./react-A9DAvxly.js";import{R as G}from"./react-icons-DfNghVim.js";import{c as y,d as H,e as _,f as M,g as E,h as Q,i as U,j as X,S as B,k as Z,l as g,u as ee,m as T,n as I,o as A,p as L,q,r as se,s as te,t as re,v as ie,w as W,x as le,y as oe,z as ae,A as ne,B as ce,C as de,D as me,F as he,G as ue,H as pe,I as xe,J as fe,K as je,L as $,M as be,N as Ee,O as ve,P as Ne,Q as D,R as Se,T as ye,U as we,V as P,W as Fe,X as ke}from"./index-hhrSh8be.js";import{a as Ce}from"./axios-CCb-kr4I.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./uuid-Dv1xt2bl.js";function w({title:t,description:a,children:r}){return e.jsx(e.Fragment,{children:e.jsxs("fieldset",{children:[e.jsxs("legend",{children:[" ",t,e.jsxs("p",{children:[" ",a," "]})]}),r]})})}const _e="_wrapper_1exrd_1",Me="_steps_1exrd_13",Te="_hiddenform_1exrd_25",Ie="_subfield_1exrd_67",Ae="_btns_1exrd_151",Le="_submit_1exrd_167",qe="_dropdownsingle_1exrd_177",We="_dropdownmultiple_1exrd_179",o={wrapper:_e,steps:Me,hiddenform:Te,subfield:Ie,btns:Ae,submit:Le,dropdownsingle:qe,dropdownmultiple:We};function R({email:t,message:a,select:r,updateFields:m,language:i}){const p=[{label:y[i],value:H[i]},{label:_[i],value:_[i]},{label:M[i],value:M[i]},{label:E[i],value:E[i]}],[n,c]=d.useState(p[0]);return e.jsxs(w,{title:"Message",description:Q[i],children:[e.jsx("div",{className:o.subfield,style:{paddingTop:"4em"},children:e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{id:"form-email",autoFocus:!0,required:!0,type:"email",name:"email",value:t,onChange:s=>m({email:s.target.value})}),e.jsxs("span",{children:[U[i]," ",e.jsx("i",{className:"required","aria-hidden":"true",children:"*"})]})]})})}),e.jsxs("div",{className:o.subfield,children:[e.jsx("label",{children:X[i]}),e.jsx(B,{language:i,id:"single",className:`${o.dropdownsingle} full`,instructions:y[i],hide:!0,options:p,value:n,onChange:s=>{c(s),m({select:(s==null?void 0:s.label)??(n==null?void 0:n.label)})}})]}),e.jsxs("div",{className:o.subfield,children:[e.jsxs("label",{htmlFor:"form-message",children:[Z[i]," ",e.jsx("i",{className:"required","aria-hidden":"true",children:"*"})]}),e.jsx("textarea",{id:"form-message",required:!0,name:"message",value:a,rows:3,placeholder:g[i],onChange:s=>m({message:s.target.value})})]})]})}function $e({encouragement:t,color:a,dark:r,light:m,gdpr:i,selectmulti:p,clarification:n,updateFields:c,language:s}){const v=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",[h,f]=ee(`${v?"local-":""}multivalues`,[]),u=[{label:T[s],value:T[s]},{label:I[s],value:I[s]},{label:A[s],value:A[s]},{label:`${E[s]}, ${L[s]}`,value:E[s]},{label:`${q[s]}, ${L[s]}`,value:q[s]}];return d.useEffect(()=>{c({selectmulti:h==null?void 0:h.map(l=>l==null?void 0:l.value).join(", ")})},[h]),e.jsx(e.Fragment,{children:e.jsxs(w,{title:se[s],description:te[s],children:[e.jsxs("div",{className:o.subfield,children:[e.jsx("label",{className:"full left",htmlFor:"form-encouragement",children:re[s]}),e.jsx("textarea",{id:"form-encouragement",className:"full",autoFocus:!0,name:"encouragement",value:t,rows:2,placeholder:ie[s],onChange:l=>c({encouragement:l.target.value})})]}),e.jsxs("div",{className:o.subfield,children:[e.jsx("label",{id:"label-color",className:`left nowrap full ${o.colorlabel}`,htmlFor:"form-color2",children:W[s]}),e.jsx("input",{id:"form-color2",className:"half bg","aria-labelledby":"label-color",type:"text",name:"color",value:a,onChange:l=>c({color:l.target.value})}),e.jsxs("label",{className:"scr",htmlFor:"form-color",children:[W[s]," ",le[s]]}),e.jsx("input",{id:"form-color",className:"half","aria-labelledby":"label-color",type:"color",name:"color",value:a,onChange:l=>c({color:l.target.value})})]}),e.jsxs("div",{className:o.subfield,children:[e.jsx("label",{className:"full",children:oe[s]}),e.jsxs("label",{className:"nowrap",children:[e.jsx("input",{id:"form-dark",type:"radio",name:"mode",value:"dark mode",onChange:l=>c({dark:l.target.value})})," ",ae[s]]}),e.jsxs("label",{htmlFor:"form-light",className:"nowrap",children:[e.jsx("input",{id:"form-light",type:"radio",name:"mode",value:"light mode",onChange:l=>{c({light:l.target.value})}})," ",ne[s]]})]}),e.jsxs("div",{className:o.subfield,children:[e.jsx("label",{htmlFor:"multiple-hide",children:ce[s]}),e.jsx("span",{style:{position:"relative",zIndex:"2",width:"100%"},children:e.jsx(B,{language:s,multiple:!0,id:"multiple-hide",className:o.dropdownmultiple,instructions:`${y[s]}. ${de[s]}`,hide:!0,options:u,value:h,onChange:l=>{f(l),c({selectmulti:h==null?void 0:h.map(x=>x==null?void 0:x.value).join(", ")})}})}),e.jsxs("label",{className:"full",children:[e.jsx("span",{children:me[s]}),e.jsx("input",{className:"bg",type:"text",name:"clarification",onChange:l=>{c({clarification:l.target.value})}})]})]}),e.jsx("div",{children:e.jsxs("label",{className:"radio-checkbox",children:[e.jsx("input",{id:"form-gdpr",required:!0,type:"checkbox",name:"gdpr",value:"gdpr-ok",onChange:l=>{c({gdpr:l.target.value})}}),e.jsx("i",{className:"required","aria-hidden":"true",children:"*"})," ",he[s]," "]})})]})})}function De(t){const[a,r]=d.useState(0);function m(){r(n=>n>=t.length-1?n:n+1)}function i(){r(n=>n<=0?n:n-1)}function p(n){r(n)}return{currentStepIndex:a,step:t[a],steps:t,isFirstStep:a===0,isLastStep:a===t.length-1,goTo:p,next:m,back:i}}function Y({firstName:t,lastName:a,updateFields:r,language:m}){return e.jsxs(w,{title:ue[m],description:pe[m],children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{required:!0,type:"text",name:"firstname",value:t,onChange:i=>r({firstName:i.target.value})}),e.jsxs("span",{children:[xe[m]," ",e.jsx("i",{className:"required","aria-hidden":"true",children:"*"})]})]})}),e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{className:"drop",children:[e.jsx("input",{id:"form-last-name",required:!0,type:"text",name:"lastname",value:a,onChange:i=>r({lastName:i.target.value})}),e.jsxs("span",{children:[fe[m]," ",e.jsx("i",{className:"required","aria-hidden":"true",children:"*"})]})]})})]})}const O={firstName:"",lastName:"",encouragement:"",color:"#FFFFFF",dark:"",light:"",email:"",message:"",gdpr:"",select:"",selectmulti:"",clarification:""},Pe="http://localhost:4000",Re=async t=>(await Ce.post(`${Pe}/api/send-email-form`,t)).data;function ls({language:t}){const a=d.useRef(),[r,m]=d.useState(O),[i,p]=d.useState(!1),n=je();function c(N){m(S=>({...S,...N}))}const{steps:s,currentStepIndex:v,step:h,isFirstStep:f,isLastStep:u,back:l,next:x,goTo:J}=De([d.createElement(Y,{...r,updateFields:c,key:"InitialForm",language:t}),d.createElement(R,{...r,updateFields:c,key:"MessageForm",language:t}),d.createElement($e,{...r,updateFields:c,key:"ExtrasForm",language:t})]);async function z(N){if(N.preventDefault(),!u)return x();if(a.current)try{p(!0),await Re(r).then(()=>{p(!1),J(0),m(O),k(!0),setTimeout(()=>{k(!1)},1e5),n(Fe(P[t],!1,8))})}catch(S){console.error("error",S),alert(ke[t])}}function K(){f&&(r.firstName==null||r.firstName==""||r.lastName==null||r.lastName=="")?(j(!0),setTimeout(()=>{j(!1)},3e3)):!f&&!u&&(r.email==null||r.email.trim()==""||r.message==null||r.message.trim()=="")?(j(!0),setTimeout(()=>{j(!1)},3e3)):x()}const[F,j]=d.useState(!1),[V,k]=d.useState(!1),b=d.useRef(),C=d.useRef();return d.useEffect(()=>{if(!(b.current==null||C.current==null))return b.current.style.top="-2em",()=>{}},[F]),e.jsxs("div",{className:o.wrapper,children:[t!==$.Suomi&&t!==$.English&&e.jsx("p",{children:be[t]}),e.jsxs("form",{ref:a,onSubmit:z,"aria-labelledby":"steps",children:[e.jsxs("span",{id:"steps",className:o.steps,children:[Ee[t]," ",ve[t]," ",e.jsxs("span",{children:[v+1," / ",s.length]})]}),e.jsx("div",{className:o.hiddenform,children:u?e.jsxs(e.Fragment,{children:[d.createElement(Y,{...r,updateFields:c,language:t,key:"InitialForm2"}),d.createElement(R,{...r,updateFields:c,language:t,key:"MessageForm2"})]}):""}),h,e.jsxs("div",{className:o.btns,style:{position:"relative"},children:[!f&&e.jsxs("button",{type:"button",onClick:l,children:[e.jsx("span",{"aria-hidden":"true",children:"«"})," ",Ne[t]]}),!u&&e.jsxs("button",{ref:C,type:"button",className:u?o.submit:o.next,onClick:K,children:[i?D[t]:Se[t]," ",e.jsx("span",{"aria-hidden":"true",children:"»"})]}),u&&e.jsxs("button",{className:u?o.submit:o.next,type:"submit",children:[i?D[t]:ye[t]," ",e.jsx(G,{})]}),F&&e.jsx("div",{ref:b,"aria-live":"assertive",style:{position:"absolute",fontWeight:"bold",color:"inherit",letterSpacing:"0.04em"},children:we[t]}),V&&e.jsx("div",{ref:b,"aria-live":"polite",style:{position:"absolute",top:"-1.4em",fontWeight:"bold",color:"inherit",letterSpacing:"0.04em"},children:P[t]})]})]})]})}export{ls as default};