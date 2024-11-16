import{r as u,j as l,aD as B,e as C,ac as H}from"./react-BnFLqAjc.js";import{bF as z,bG as $,a$ as P,b3 as M,bH as V,bI as K,bJ as G,bK as J,bL as Q,bM as X,K as W,bj as Z,bN as L,W as g,bO as ee,bP as se,bQ as Y,bR as ae,bS as te,ac as re,bT as F,bU as R,bV as U,bW as q,bX as ne,bY as le,bZ as oe,b_ as ce,b$ as ie,c0 as de,c1 as fe,c2 as me}from"./index-Dfsmemzz.js";const ue="_form_7mcgs_1",pe="_closed_7mcgs_173",he="_open_7mcgs_189",ye="_modify_7mcgs_173",p={form:ue,"list-wrap":"_list-wrap_7mcgs_31","todo-input-area":"_todo-input-area_7mcgs_37","todo-ul":"_todo-ul_7mcgs_49","drag-handle":"_drag-handle_7mcgs_83","btn-wrap":"_btn-wrap_7mcgs_139",closed:pe,"modify-todo":"_modify-todo_7mcgs_173",open:he,delete:"_delete_7mcgs_243","left-to-do":"_left-to-do_7mcgs_291",modify:ye};function Te({todo:e,toggleTodo:n,deleteTodo:o,language:t,modifyTodo:k,isDragging:_,handleUpdate:b,handleDragging:E}){const[j,w]=u.useState((e==null?void 0:e.name)??""),[S,x]=u.useState(!1);function O(){n(e==null?void 0:e.key)}function d(){window.confirm(Q[t]+' "'+(e==null?void 0:e.name)+'"?')&&(w(""),o(e==null?void 0:e.key),x(!1))}const y=i=>{i.preventDefault(),k(e==null?void 0:e.key,j),x(!1)},A=i=>{w(i.target.value)};u.useEffect(()=>{(e==null?void 0:e.name)!==j&&w((e==null?void 0:e.name)||"")},[e]);const[D,f]=u.useState(!0),[I,T]=u.useState(!1),N=()=>{f(!0),T(!1)},s=()=>{f(!0)},a=()=>{f(!1)},r=()=>{f(!1),T(!0)},c=()=>{var i;(i=window.getSelection())!=null&&i.toString()?(f(!1),T(!0)):(f(!0),T(!1))},m=i=>{I&&i.preventDefault()};return l.jsxs("li",{className:`${_?"dragging":""}`,draggable:D,onDragStart:i=>{var h;D?(i.dataTransfer.setData("application/my-app",(h=e==null?void 0:e.order)==null?void 0:h.toString()),E(!0)):i.preventDefault()},onDragEnd:()=>E(!1),children:[l.jsxs("span",{onMouseOver:s,onMouseDown:N,className:`${p["drag-handle"]} tooltip-wrap`,children:[l.jsx(B,{}),l.jsx("span",{className:"tooltip narrow2 below right",children:z[t]})]}),l.jsxs("label",{className:`${S?p.open:p.closed}`,onClick:m,children:[l.jsx("input",{type:"checkbox",id:`check_${$(e==null?void 0:e.name)}`,checked:(e==null?void 0:e.complete)??!1,onChange:O}),l.jsx("span",{onMouseOver:a,onMouseDown:r,onMouseUp:c,children:e==null?void 0:e.name})]}),l.jsxs("div",{className:`${S?p.open:p.closed} ${p["btn-wrap"]}`,children:[l.jsx(P,{language:t,className:`${p["modify-todo"]} modify-todo`,wrapperClass:"modify-todo-wrap",text:M[t],isOpen:S,setIsFormOpen:x,hideBrackets:!1,onClick:()=>{w((e==null?void 0:e.name)??"")},children:l.jsxs("form",{onSubmit:y,className:`${p.modify}`,children:[l.jsxs("label",{children:[l.jsx("textarea",{id:`task_${$(e==null?void 0:e.name)}`,required:!0,name:"task",value:j,onChange:A}),l.jsxs("span",{className:"scr",children:[M[t]," ",V((e==null?void 0:e.name)??K[t],t)]})]}),l.jsx("button",{type:"submit",className:"modify",children:G[t]})]})}),l.jsxs("button",{className:`${p.delete}`,onClick:d,"data-label":J[t],children:[l.jsx("span",{children:"×"}),l.jsx("span",{className:"scr",children:J[t]})]})]})]})}function ge({toggleTodo:e,deleteTodo:n,language:o,modifyTodo:t,modifyTodoOrder:k,todosWithIdAndStatus:_,setTodosWithIdAndStatus:b}){var x,O;const{isDragging:E,listItemsByStatus:j,handleUpdate:w,handleDragging:S}=X(_,["todos"]);return W(),l.jsx("ul",{className:`${p["todo-ul"]} todo-ul`,onDragOver:d=>d.preventDefault(),onDrop:d=>{var I;d.preventDefault();const y=d.dataTransfer.getData("application/my-app"),A=(I=Array.from(d.currentTarget.querySelectorAll(".todo-ul > li")))==null?void 0:I.reduce((T,N)=>{const s=N.getBoundingClientRect(),a=Math.abs(s.top-d.clientY);return a<T.offset?{offset:a,element:N}:T},{offset:Number.POSITIVE_INFINITY}),D=Array.from(d.currentTarget.querySelectorAll(".todo-ul > li")).indexOf(A.element);if(Number(y)===D)return;const f=w(Number(y),"todos",D);if(Array.isArray(f)){const T=f==null?void 0:f.map((N,s)=>({key:N.key,order:s}));k(T)}else console.error("Order is not an array");S(!1)},children:(O=(x=j.todos)==null?void 0:x.items)==null?void 0:O.slice().sort((d,y)=>d.order??0>(y.order??0)?1:-1).sort((d,y)=>d.complete===y.complete?0:d.complete?1:-1).map(d=>l.jsx(Te,{toggleTodo:e,deleteTodo:n,todo:_==null?void 0:_.find(y=>y.key===d.key),language:o,modifyTodo:t,isDragging:E,handleUpdate:w,handleDragging:S},d==null?void 0:d.key))})}function we({language:e}){const n=W(),o=C(s=>{var a;return(a=s.auth)==null?void 0:a.user});u.useEffect(()=>{n(Z())},[]);const t=C(s=>s.todos.todos),k=C(s=>s.todos.status),_=C(s=>s.todos.error),b="ReactTodos",E=t==null?void 0:t.some(s=>s.complete);u.useEffect(()=>{if(t.length===0&&!o){const s=JSON.parse(window.localStorage.getItem(b)||"[]"),a=new Set(t.map(r=>r.key));s.forEach(r=>{a.has(r.key)||n(L(r))})}},[n,t,o]),u.useEffect(()=>{window.localStorage.setItem(b,JSON.stringify(t))},[t]);const j=s=>{const a=new Set,r=[];return s.forEach(c=>{a.has(c.key)?r.push(c):a.add(c.key)}),r},w=s=>{if(!s){n(g("Error: no key",!0,8));return}if(o!=null&&o._id)n(F(o._id,s));else{n(R(s));const a=t.filter(r=>r.key!==s);window.localStorage.setItem(b,JSON.stringify(a))}};u.useEffect(()=>{const s=j(t),a=new Set;s.forEach(r=>{a.has(r.key)||(w(r.key),a.add(r.key))})},[t]);const[S,x]=u.useState([]);u.useEffect(()=>{const s=t==null?void 0:t.slice().sort((a,r)=>(a.order??0)-(r.order??0)).map(a=>({...a,id:a.order,status:"todos"}));x(s)},[t]),u.useEffect(()=>{k==="failed"&&n(g(`There was an error: ${_}`,!0,8))},[k,_,n]);const[O,d]=u.useState(!1);u.useEffect(()=>{o!=null&&o._id&&!O&&n(ee(o._id)).then(()=>{d(!0)})},[o==null?void 0:o._id]);function y(s){const a=t.find(r=>r.key===s);if(a){const r={...a,complete:!a.complete};n(o?U(o._id,s,r):q(r))}}const A=async(s,a)=>{if(!s){n(g("Error: no key",!0,8));return}const r=t.find(c=>c.key===s);if(r){const c={...r,name:a};if(o)await n(U(o._id,s,c)).then(()=>{n(g("Todo updated",!1,3))}).catch(m=>{var i,h;console.error(m),(h=(i=m.response)==null?void 0:i.data)!=null&&h.message?n(g(m.response.data.message,!0,8)):n(g(`${m}`,!0,8))});else{n(q(c));const m=t.map(i=>i.key===s?c:i);window.localStorage.setItem(b,JSON.stringify(m))}}},D=s=>{var a,r;if(o)n(async c=>{var m,i;try{await ne(o._id,s).then(()=>{c(le(o._id))})}catch(h){console.error(h),(i=(m=h.response)==null?void 0:m.data)!=null&&i.message?c(g(h.response.data.message,!0,8)):c(g(`${h}`,!0,8))}});else try{n(oe(s))}catch(c){console.error(c),(r=(a=c.response)==null?void 0:a.data)!=null&&r.message?n(g(c.response.data.message,!0,8)):n(g(`${c}`,!0,8))}finally{window.localStorage.setItem(b,JSON.stringify(t))}},f=u.useRef(null),I=s=>{var i;s.preventDefault();const a=((i=f.current)==null?void 0:i.value)??"";if(a==="")return;const r=H(),c=t.reduce((h,v)=>v.order>h?v.order:h,0),m={key:r,name:a,complete:!1,order:c+1};o?n(ce(o._id,m)):(n(L(m)),window.localStorage.setItem(b,JSON.stringify([...t,m]))),f.current&&(f.current.value="")};async function T(s){if(s.preventDefault(),window.confirm(ie[e]))if(o)await n(de(o._id));else{n(fe());const a=t.filter(r=>!r.complete);window.localStorage.setItem(b,JSON.stringify(a))}}function N(s){if(!s){n(g("Error: no key",!0,8));return}if(o!=null&&o._id)n(F(o._id,s));else{n(R(s));let a=t.filter(r=>r.key!==s);a=a.map((r,c)=>({...r,order:c+1})),n(me(a)),window.localStorage.setItem(b,JSON.stringify(a))}}return l.jsxs(l.Fragment,{children:[l.jsx("form",{onSubmit:I,className:p.form,children:l.jsxs("fieldset",{children:[l.jsx("legend",{className:"scr",children:se[e]}),l.jsxs("div",{className:p["todo-input-area"],children:[l.jsx("label",{htmlFor:"taskinput",children:Y[e]}),l.jsx("textarea",{ref:f,id:"taskinput",className:"bg",name:"task",required:!0,autoComplete:"off",placeholder:`${K[e]}...`}),l.jsx("button",{id:p["submit-todo"],type:"submit",children:Y[e]}),l.jsx("button",{className:"danger",disabled:!E,onClick:s=>T(s),children:ae[e]})]})]})}),l.jsxs("div",{className:p["list-wrap"],children:[l.jsxs("p",{className:p["left-to-do"],children:[t==null?void 0:t.filter(s=>!(s!=null&&s.complete)).length," ",te[e]]}),l.jsx(ge,{todosWithIdAndStatus:S,setTodosWithIdAndStatus:x,toggleTodo:y,deleteTodo:N,language:e,modifyTodo:A,modifyTodoOrder:D}),k==="loading"&&l.jsxs("p",{children:[re[e],"..."]})]})]})}export{we as default};
