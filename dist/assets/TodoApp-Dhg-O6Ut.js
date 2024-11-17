import{r as m,j as o}from"./react-A9DAvxly.js";import{bH as H,b1 as $,b0 as W,b5 as M,bI as z,bJ as K,bK as P,bL as J,bM as V,bN as Q,K as B,bl as X,bO as L,W as b,bP as Z,bQ as G,bR as Y,bS as ee,bT as se,ad as te,bU as R,bV as U,bW as q,bX as F,bY as re,bZ as ae,b_ as ne,b$ as oe,c0 as le,c1 as ie,c2 as ce,c3 as de}from"./index-CKGjDRr5.js";import{a1 as fe}from"./react-icons-BGZR1ov-.js";import{a as C}from"./react-redux-CHm9GgGE.js";import{v as me}from"./uuid-Dv1xt2bl.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";const pe="_form_7mcgs_1",ue="_closed_7mcgs_173",he="_open_7mcgs_189",ye="_modify_7mcgs_173",p={form:pe,"list-wrap":"_list-wrap_7mcgs_31","todo-input-area":"_todo-input-area_7mcgs_37","todo-ul":"_todo-ul_7mcgs_49","drag-handle":"_drag-handle_7mcgs_83","btn-wrap":"_btn-wrap_7mcgs_139",closed:ue,"modify-todo":"_modify-todo_7mcgs_173",open:he,delete:"_delete_7mcgs_243","left-to-do":"_left-to-do_7mcgs_291",modify:ye};function Te({todo:e,toggleTodo:n,deleteTodo:l,language:t,modifyTodo:E,isDragging:_,handleUpdate:T,handleDragging:O}){const[S,w]=m.useState((e==null?void 0:e.name)??""),[N,k]=m.useState(!1);function d(){n(e==null?void 0:e.key)}function y(){window.confirm(V[t]+' "'+(e==null?void 0:e.name)+'"?')&&(w(""),l(e==null?void 0:e.key),k(!1))}const v=c=>{c.preventDefault(),E(e==null?void 0:e.key,S),k(!1)},I=c=>{w(c.target.value)};m.useEffect(()=>{(e==null?void 0:e.name)!==S&&w((e==null?void 0:e.name)||"")},[e]);const[x,u]=m.useState(!0),[j,g]=m.useState(!1),D=()=>{u(!0),g(!1)},s=()=>{u(!0)},r=()=>{u(!1)},a=()=>{u(!1),g(!0)},i=()=>{var c;(c=window.getSelection())!=null&&c.toString()?(u(!1),g(!0)):(u(!0),g(!1))},f=c=>{j&&c.preventDefault()};return o.jsxs("li",{className:`${_?"dragging":""}`,draggable:x,onDragStart:c=>{var h;x?(c.dataTransfer.setData("application/my-app",(h=e==null?void 0:e.order)==null?void 0:h.toString()),O(!0)):c.preventDefault()},onDragEnd:()=>O(!1),children:[o.jsxs("span",{onMouseOver:s,onMouseDown:D,className:`${p["drag-handle"]} tooltip-wrap`,children:[o.jsx(fe,{}),o.jsx("span",{className:"tooltip narrow2 below right",children:H[t]})]}),o.jsxs("label",{className:`${N?p.open:p.closed}`,onClick:f,children:[o.jsx("input",{type:"checkbox",id:`check_${$(e==null?void 0:e.name)}`,checked:(e==null?void 0:e.complete)??!1,onChange:d}),o.jsx("span",{onMouseOver:r,onMouseDown:a,onMouseUp:i,children:e==null?void 0:e.name})]}),o.jsxs("div",{className:`${N?p.open:p.closed} ${p["btn-wrap"]}`,children:[o.jsx(W,{language:t,className:`${p["modify-todo"]} modify-todo`,wrapperClass:"modify-todo-wrap",text:M[t],isOpen:N,setIsFormOpen:k,hideBrackets:!1,onClick:()=>{w((e==null?void 0:e.name)??"")},children:o.jsxs("form",{onSubmit:v,className:`${p.modify}`,children:[o.jsxs("label",{children:[o.jsx("textarea",{id:`task_${$(e==null?void 0:e.name)}`,required:!0,name:"task",value:S,onChange:I}),o.jsxs("span",{className:"scr",children:[M[t]," ",z((e==null?void 0:e.name)??K[t],t)]})]}),o.jsx("button",{type:"submit",className:"modify",children:P[t]})]})}),o.jsxs("button",{className:`${p.delete}`,onClick:y,"data-label":J[t],children:[o.jsx("span",{children:"×"}),o.jsx("span",{className:"scr",children:J[t]})]})]})]})}function ge({toggleTodo:e,deleteTodo:n,language:l,modifyTodo:t,modifyTodoOrder:E,todosWithIdAndStatus:_}){var N,k;const{isDragging:T,listItemsByStatus:O,handleUpdate:S,handleDragging:w}=Q(_,["todos"]);return B(),o.jsx("ul",{className:`${p["todo-ul"]} todo-ul`,onDragOver:d=>d.preventDefault(),onDrop:d=>{var u;d.preventDefault();const y=d.dataTransfer.getData("application/my-app"),v=(u=Array.from(d.currentTarget.querySelectorAll(".todo-ul > li")))==null?void 0:u.reduce((j,g)=>{const D=g.getBoundingClientRect(),s=Math.abs(D.top-d.clientY);return s<j.offset?{offset:s,element:g}:j},{offset:Number.POSITIVE_INFINITY}),I=Array.from(d.currentTarget.querySelectorAll(".todo-ul > li")).indexOf(v.element);if(Number(y)===I)return;const x=S(Number(y),"todos",I);if(Array.isArray(x)){const j=x==null?void 0:x.map((g,D)=>({key:g.key,order:D}));E(j)}else console.error("Order is not an array");w(!1)},children:(k=(N=O.todos)==null?void 0:N.items)==null?void 0:k.slice().sort((d,y)=>d.order??0>(y.order??0)?1:-1).sort((d,y)=>d.complete===y.complete?0:d.complete?1:-1).map(d=>o.jsx(Te,{toggleTodo:e,deleteTodo:n,todo:_==null?void 0:_.find(y=>y.key===d.key),language:l,modifyTodo:t,isDragging:T,handleUpdate:S,handleDragging:w},d==null?void 0:d.key))})}function Ye({language:e}){const n=B(),l=C(s=>{var r;return(r=s.auth)==null?void 0:r.user});m.useEffect(()=>{n(X())},[]);const t=C(s=>s.todos.todos),E=C(s=>s.todos.status),_=C(s=>s.todos.error),T="ReactTodos",O=t==null?void 0:t.some(s=>s.complete);m.useEffect(()=>{if(t.length===0&&!l){const s=JSON.parse(window.localStorage.getItem(T)||"[]"),r=new Set(t.map(a=>a.key));s.forEach(a=>{r.has(a.key)||n(L(a))})}},[n,t,l]),m.useEffect(()=>{window.localStorage.setItem(T,JSON.stringify(t))},[t]);const S=s=>{const r=new Set,a=[];return s.forEach(i=>{r.has(i.key)?a.push(i):r.add(i.key)}),a},w=s=>{if(!s){n(b("Error: no key",!0,8));return}if(l!=null&&l._id)n(R(l._id,s));else{n(U(s));const r=t.filter(a=>a.key!==s);window.localStorage.setItem(T,JSON.stringify(r))}};m.useEffect(()=>{const s=S(t),r=new Set;s.forEach(a=>{r.has(a.key)||(w(a.key),r.add(a.key))})},[t]);const[N,k]=m.useState([]);m.useEffect(()=>{const s=t==null?void 0:t.slice().sort((r,a)=>(r.order??0)-(a.order??0)).map(r=>({...r,id:r.order,status:"todos"}));k(s)},[t]),m.useEffect(()=>{E==="failed"&&n(b(`There was an error: ${_}`,!0,8))},[E,_,n]);const[d,y]=m.useState(!1);m.useEffect(()=>{l!=null&&l._id&&!d&&n(Z(l._id)).then(()=>{y(!0)})},[l==null?void 0:l._id]);function v(s){const r=t.find(a=>a.key===s);if(r){const a={...r,complete:!r.complete};n(l?q(l._id,s,a):F(a))}}const I=async(s,r)=>{if(!s){n(b("Error: no key",!0,8));return}const a=t.find(i=>i.key===s);if(a){const i={...a,name:r};if(l)await n(q(l._id,s,i)).then(()=>{n(b("Todo updated",!1,3))}).catch(f=>{var c,h;console.error(f),(h=(c=f.response)==null?void 0:c.data)!=null&&h.message?n(b(f.response.data.message,!0,8)):n(b(`${f}`,!0,8))});else{n(F(i));const f=t.map(c=>c.key===s?i:c);window.localStorage.setItem(T,JSON.stringify(f))}}},x=s=>{var r,a;if(l)n(async i=>{var f,c;try{await re(l._id,s).then(()=>{i(ae(l._id))})}catch(h){console.error(h),(c=(f=h.response)==null?void 0:f.data)!=null&&c.message?i(b(h.response.data.message,!0,8)):i(b(`${h}`,!0,8))}});else try{n(ne(s))}catch(i){console.error(i),(a=(r=i.response)==null?void 0:r.data)!=null&&a.message?n(b(i.response.data.message,!0,8)):n(b(`${i}`,!0,8))}finally{window.localStorage.setItem(T,JSON.stringify(t))}},u=m.useRef(null),j=s=>{var c;s.preventDefault();const r=((c=u.current)==null?void 0:c.value)??"";if(r==="")return;const a=me(),i=t.reduce((h,A)=>A.order>h?A.order:h,0),f={key:a,name:r,complete:!1,order:i+1};l?n(oe(l._id,f)):(n(L(f)),window.localStorage.setItem(T,JSON.stringify([...t,f]))),u.current&&(u.current.value="")};async function g(s){if(s.preventDefault(),window.confirm(le[e]))if(l)await n(ie(l._id));else{n(ce());const r=t.filter(a=>!a.complete);window.localStorage.setItem(T,JSON.stringify(r))}}function D(s){if(!s){n(b("Error: no key",!0,8));return}if(l!=null&&l._id)n(R(l._id,s));else{n(U(s));let r=t.filter(a=>a.key!==s);r=r.map((a,i)=>({...a,order:i+1})),n(de(r)),window.localStorage.setItem(T,JSON.stringify(r))}}return o.jsxs(o.Fragment,{children:[o.jsx("form",{onSubmit:j,className:p.form,children:o.jsxs("fieldset",{children:[o.jsx("legend",{className:"scr",children:G[e]}),o.jsxs("div",{className:p["todo-input-area"],children:[o.jsx("label",{htmlFor:"taskinput",children:Y[e]}),o.jsx("textarea",{ref:u,id:"taskinput",className:"bg",name:"task",required:!0,autoComplete:"off",placeholder:`${K[e]}...`}),o.jsx("button",{id:p["submit-todo"],type:"submit",children:Y[e]}),o.jsx("button",{className:"danger",disabled:!O,onClick:s=>g(s),children:ee[e]})]})]})}),o.jsxs("div",{className:p["list-wrap"],children:[o.jsxs("p",{className:p["left-to-do"],children:[t==null?void 0:t.filter(s=>!(s!=null&&s.complete)).length," ",se[e]]}),o.jsx(ge,{todosWithIdAndStatus:N,toggleTodo:v,deleteTodo:D,language:e,modifyTodo:I,modifyTodoOrder:x}),E==="loading"&&o.jsxs("p",{children:[te[e],"..."]})]})]})}export{Ye as default};
