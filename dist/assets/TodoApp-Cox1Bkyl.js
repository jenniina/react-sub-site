const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TodoList-BaLp2Xvt.js","assets/index-ht7i4Lck.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-DhcENkY1.js","assets/react-router-dom-StiqOUIT.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-ifq8xKwP.css"])))=>i.map(i=>d[i]);
import{u as ue,i as he,e8 as ye,e9 as _,o as p,ea as Te,eb as M,ec as f,ed as Se,ee as F,ef as xe,eg as we,eh as Ee,ei as W,bp as k,ej as Ne,ek as je,el as ve,em as Ce,en as ge,eo as _e,d as ke,ep as Oe,e as q,_ as Ae,eq as B,er as U,es as Y,et as H,cK as $e,eu as be,ev as Ie,ew as De,ex as J,ey as Pe,ez as Fe,eA as Je}from"./index-ht7i4Lck.js";import{r as c,j as n}from"./react-kX_YxI4E.js";import{a as O}from"./react-redux-BEmJlIGA.js";import{aC as ze}from"./react-icons-DhcENkY1.js";import{v as Le}from"./uuid-Dv1xt2bl.js";import"./react-dom-B5MLDbn_.js";import"./dom-to-image-more-CfDXlNbO.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";const Re=c.lazy(()=>Ae(()=>import("./TodoList-BaLp2Xvt.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),x=300;function dt({language:r}){const o=ue(),a=O(e=>{var t;return(t=e.auth)==null?void 0:t.user});c.useEffect(()=>{o(he())},[]);const i=O(e=>e.todos.todos),A=O(e=>e.todos.status),z=O(e=>e.todos.error),[v,V]=c.useState("low"),[L,Ke]=c.useState(""),[$,G]=c.useState("other"),[w,Q]=c.useState("all"),[E,X]=c.useState("all"),T="ReactTodos",Z=i==null?void 0:i.some(e=>e.complete);c.useEffect(()=>{if(i.length===0&&!a){const e=JSON.parse(window.localStorage.getItem(T)||"[]"),t=new Set(i.map(s=>s.key));e.forEach(s=>{t.has(s.key)||o(ye(s))})}},[o,i,a]),c.useEffect(()=>{window.localStorage.setItem(T,JSON.stringify(i))},[i]);const ee=e=>{const t=new Set,s=[];return e.forEach(l=>{t.has(l.key)?s.push(l):t.add(l.key)}),s},te=e=>{if(!e){o(p("Error: no key",!0,8));return}if(a!=null&&a._id)o(B(a._id,e));else{o(U(e));const t=i.filter(s=>s.key!==e);window.localStorage.setItem(T,JSON.stringify(t))}};c.useEffect(()=>{const e=ee(i),t=new Set;e.forEach(s=>{t.has(s.key)||(te(s.key),t.add(s.key))})},[i]);const[N,se]=c.useState([]),b=i.filter(e=>{const t=w==="all"||e.priority===w,s=E==="all"||e.category===E;return t&&s});c.useEffect(()=>{const e=b==null?void 0:b.slice().sort((t,s)=>(t.order??0)-(s.order??0)).map(t=>({...t,id:t.order,status:"todos"}));se(e)},[i,w,E]);const oe=["all","low","medium","high"],re=["all","work","personal","shopping","other"],ae=["low","medium","high"],ie=["work","personal","shopping","other"],I=_(oe,r),D=_(re,r),C=_(ae,r),g=_(ie,r);c.useEffect(()=>{A==="failed"&&o(p(`There was an error: ${z}`,!0,8))},[A,z,o]);const[R,u]=c.useState(!1);c.useEffect(()=>{a!=null&&a._id&&o(Te(a._id)).then(()=>{o(M(a._id))}).catch(e=>{var t,s;console.error(e),(s=(t=e.response)==null?void 0:t.data)!=null&&s.message?o(p(e.response.data.message,!0,8)):o(p(`${e.message}`,!0,8))})},[a==null?void 0:a._id]);function ne(e){const t=i.find(s=>s.key===e);if(t){const s={...t,complete:!t.complete};o(a?Y(a._id,e,s):H(s))}}const de=async(e,t,s,l,y)=>{if(u(!0),!e){o(p("Error: no key",!0,8)),u(!1);return}const m=i.find(d=>d.key===e);if(m){const d={...m,name:t,priority:s,deadline:l,category:y};if(a)await o(Y(a._id,e,d)).then(()=>{o(p(`${$e[r]}`,!1,3)),u(!1)}).catch(h=>{var j,K;console.error(h),(K=(j=h.response)==null?void 0:j.data)!=null&&K.message?o(p(h.response.data.message,!0,8)):o(p(`${h}`,!0,8)),u(!1)});else{o(H(d));const h=i.map(j=>j.key===e?d:j);window.localStorage.setItem(T,JSON.stringify(h)),u(!1)}}},le=e=>{var t,s;if(a)o(async l=>{var y,m;try{await be(a._id,e).then(()=>{l(M(a._id))})}catch(d){console.error(d),(m=(y=d.response)==null?void 0:y.data)!=null&&m.message?l(p(d.response.data.message,!0,8)):l(p(`${d}`,!0,8))}});else try{o(Ie(e))}catch(l){console.error(l),(s=(t=l.response)==null?void 0:t.data)!=null&&s.message?o(p(l.response.data.message,!0,8)):o(p(`${l}`,!0,8))}finally{window.localStorage.setItem(T,JSON.stringify(i))}},P=c.useRef(null),[S,ce]=c.useState(""),fe=e=>{if(e.preventDefault(),u(!0),S===""){u(!1),o(p(F[r],!0,3));return}if(S.length>x){u(!1),o(p(`${W[r]} (${x} max)`,!0,8));return}const t=Le(),s=i.reduce((m,d)=>d.order>m?d.order:m,0),l=i.reduce((m,d)=>d.order<m?d.order:m,0);let y;if(v==="high"?y={key:t,name:S,complete:!1,order:l-1,priority:v,deadline:L,category:$}:y={key:t,name:S,complete:!1,order:s+1,priority:v,deadline:L,category:$},a)o(De(a._id,y)),u(!1);else{const m=[...i,y].sort((d,h)=>d.order-h.order).map((d,h)=>({...d,order:h}));o(J(m)),window.localStorage.setItem(T,JSON.stringify(m)),J(m),u(!1)}P.current&&(P.current.value="")};async function me(e){if(e.preventDefault(),window.confirm(Pe[r]))if(a)await o(Fe(a._id));else{o(Je());const t=i.filter(s=>!s.complete);window.localStorage.setItem(T,JSON.stringify(t))}}function pe(e){if(!e){o(p("Error: no key",!0,8));return}if(a!=null&&a._id)o(B(a._id,e));else{o(U(e));let t=i.filter(s=>s.key!==e);t=t.map((s,l)=>({...s,order:l+1})),o(J(t)),window.localStorage.setItem(T,JSON.stringify(t))}}return n.jsxs(n.Fragment,{children:[n.jsx("form",{onSubmit:fe,className:f.form,children:n.jsxs("fieldset",{children:[n.jsx("legend",{className:"scr",children:Se[r]}),n.jsxs("div",{className:f["todo-input-area"],children:[n.jsx("label",{htmlFor:"taskinput",children:F[r]}),n.jsx("textarea",{ref:P,id:"taskinput",className:"bg",rows:3,name:"task",value:S,onChange:e=>ce(e.target.value),required:!0,autoComplete:"off",placeholder:`${xe[r]}...`}),n.jsxs("p",{className:f.small,children:[x-S.length," ",we[r]," (",Ee[r],":"," ",x,")"," ",S.length>x&&n.jsx("span",{className:f.warning,children:W[r]})]}),n.jsx(k,{z:N.length+5,id:"category",className:`${f.select} ${f["category-select"]}`,hideDelete:!0,instructions:Ne[r],value:g.find(e=>e.value===$)||g[0],onChange:e=>G(e==null?void 0:e.value),options:g,language:r}),n.jsx(k,{id:"priority",className:f.select,hideDelete:!0,instructions:je[r],value:C.find(e=>e.value===v)||C[0],onChange:e=>V(e==null?void 0:e.value),options:C,language:r,z:N.length+4}),n.jsxs("button",{id:f["submit-todo"],className:f["submit-todo"],type:"submit",disabled:R,children:[F[r]," ",n.jsx(ze,{})]})]})]})}),n.jsxs("div",{className:f["controls-wrap"],children:[n.jsx(k,{id:"category-filter",className:`${f.select} ${f["category-select"]}`,hideDelete:!0,instructions:ve[r],value:D.find(e=>e.value===E)||D[0],onChange:e=>X(e==null?void 0:e.value),options:D,language:r,z:N.length+3}),n.jsx(k,{id:"priority-filter",className:f.select,hideDelete:!0,instructions:Ce[r],value:I.find(e=>e.value===w)||I[0],onChange:e=>Q(e==null?void 0:e.value),options:I,language:r,z:N.length+2}),n.jsx("button",{className:`danger ${f["clear-completed"]}`,disabled:!Z,onClick:e=>me(e),children:ge[r]})]}),n.jsxs("div",{className:f["list-wrap"],children:[n.jsxs("p",{className:f["left-to-do"],children:[i==null?void 0:i.filter(e=>!(e!=null&&e.complete)).length," ",_e[r]]}),(w!=="all"||E!=="all")&&n.jsxs("p",{className:f["filter-notification"],children:[ke[r]," ",Oe[r]]}),n.jsx(c.Suspense,{fallback:n.jsxs("p",{className:"flex center margin0auto textcenter",children:[q[r],"..."]}),children:n.jsx(Re,{sending:R,todosWithIdAndStatus:N,toggleTodo:ne,deleteTodo:pe,language:r,modifyTodo:de,modifyTodoOrder:le,priorityOptions:C,categoryOptions:g,maxCharacters:x})}),A==="loading"&&n.jsxs("p",{className:"flex center margin0auto textcenter",children:[q[r],"..."]})]})]})}export{dt as default};
