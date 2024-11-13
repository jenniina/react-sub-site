import{r as u,j as c,bX as z,bY as H,bZ as $,bg as W,bk as M,b_ as X,b$ as B,c0 as P,c1 as J,c2 as V,c3 as Z,K,ab as C,bB as G,c4 as Y,X as g,c5 as Q,c6 as ee,c7 as L,c8 as se,c9 as ae,af as te,ca as q,cb as F,cc as R,cd as U,ce as re,cf as ne,cg as ce,ch as le,ci as oe,cj as ie,ck as de,cl as fe,cm as me}from"./index-CLKPobif.js";const ue="_form_7mcgs_1",pe="_closed_7mcgs_173",he="_open_7mcgs_189",ye="_modify_7mcgs_173",p={form:ue,"list-wrap":"_list-wrap_7mcgs_31","todo-input-area":"_todo-input-area_7mcgs_37","todo-ul":"_todo-ul_7mcgs_49","drag-handle":"_drag-handle_7mcgs_83","btn-wrap":"_btn-wrap_7mcgs_139",closed:pe,"modify-todo":"_modify-todo_7mcgs_173",open:he,delete:"_delete_7mcgs_243","left-to-do":"_left-to-do_7mcgs_291",modify:ye};function Te({todo:e,toggleTodo:n,deleteTodo:l,language:t,modifyTodo:N,isDragging:w,handleUpdate:_,handleDragging:D}){const[j,x]=u.useState((e==null?void 0:e.name)??""),[b,S]=u.useState(!1);function O(){n(e==null?void 0:e.key)}function d(){window.confirm(V[t]+' "'+(e==null?void 0:e.name)+'"?')&&(x(""),l(e==null?void 0:e.key),S(!1))}const y=i=>{i.preventDefault(),N(e==null?void 0:e.key,j),S(!1)},A=i=>{x(i.target.value)};u.useEffect(()=>{(e==null?void 0:e.name)!==j&&x((e==null?void 0:e.name)||"")},[e]);const[E,f]=u.useState(!0),[I,T]=u.useState(!1),k=()=>{f(!0),T(!1)},s=()=>{f(!0)},a=()=>{f(!1)},r=()=>{f(!1),T(!0)},o=()=>{var i;(i=window.getSelection())!=null&&i.toString()?(f(!1),T(!0)):(f(!0),T(!1))},m=i=>{I&&i.preventDefault()};return c.jsxs("li",{className:`${w?"dragging":""}`,draggable:E,onDragStart:i=>{var h;E?(i.dataTransfer.setData("application/my-app",(h=e==null?void 0:e.order)==null?void 0:h.toString()),D(!0)):i.preventDefault()},onDragEnd:()=>D(!1),children:[c.jsxs("span",{onMouseOver:s,onMouseDown:k,className:`${p["drag-handle"]} tooltip-wrap`,children:[c.jsx(z,{}),c.jsx("span",{className:"tooltip narrow2 below right",children:H[t]})]}),c.jsxs("label",{className:`${b?p.open:p.closed}`,onClick:m,children:[c.jsx("input",{type:"checkbox",id:`check_${$(e==null?void 0:e.name)}`,checked:(e==null?void 0:e.complete)??!1,onChange:O}),c.jsx("span",{onMouseOver:a,onMouseDown:r,onMouseUp:o,children:e==null?void 0:e.name})]}),c.jsxs("div",{className:`${b?p.open:p.closed} ${p["btn-wrap"]}`,children:[c.jsx(W,{language:t,className:`${p["modify-todo"]} modify-todo`,wrapperClass:"modify-todo-wrap",text:M[t],isOpen:b,setIsFormOpen:S,hideBrackets:!1,onClick:()=>{x((e==null?void 0:e.name)??"")},children:c.jsxs("form",{onSubmit:y,className:`${p.modify}`,children:[c.jsxs("label",{children:[c.jsx("textarea",{id:`task_${$(e==null?void 0:e.name)}`,required:!0,name:"task",value:j,onChange:A}),c.jsxs("span",{className:"scr",children:[M[t]," ",X((e==null?void 0:e.name)??B[t],t)]})]}),c.jsx("button",{type:"submit",className:"modify",children:P[t]})]})}),c.jsxs("button",{className:`${p.delete}`,onClick:d,"data-label":J[t],children:[c.jsx("span",{children:"×"}),c.jsx("span",{className:"scr",children:J[t]})]})]})]})}function ge({toggleTodo:e,deleteTodo:n,language:l,modifyTodo:t,modifyTodoOrder:N,todosWithIdAndStatus:w,setTodosWithIdAndStatus:_}){var S,O;const{isDragging:D,listItemsByStatus:j,handleUpdate:x,handleDragging:b}=Z(w,["todos"]);return K(),c.jsx("ul",{className:`${p["todo-ul"]} todo-ul`,onDragOver:d=>d.preventDefault(),onDrop:d=>{var I;d.preventDefault();const y=d.dataTransfer.getData("application/my-app"),A=(I=Array.from(d.currentTarget.querySelectorAll(".todo-ul > li")))==null?void 0:I.reduce((T,k)=>{const s=k.getBoundingClientRect(),a=Math.abs(s.top-d.clientY);return a<T.offset?{offset:a,element:k}:T},{offset:Number.POSITIVE_INFINITY}),E=Array.from(d.currentTarget.querySelectorAll(".todo-ul > li")).indexOf(A.element);if(Number(y)===E)return;const f=x(Number(y),"todos",E);if(Array.isArray(f)){const T=f==null?void 0:f.map((k,s)=>({key:k.key,order:s}));N(T)}else console.error("Order is not an array");b(!1)},children:(O=(S=j.todos)==null?void 0:S.items)==null?void 0:O.slice().sort((d,y)=>d.order??0>(y.order??0)?1:-1).sort((d,y)=>d.complete===y.complete?0:d.complete?1:-1).map(d=>c.jsx(Te,{toggleTodo:e,deleteTodo:n,todo:w==null?void 0:w.find(y=>y.key===d.key),language:l,modifyTodo:t,isDragging:D,handleUpdate:x,handleDragging:b},d==null?void 0:d.key))})}function we({language:e}){const n=K(),l=C(s=>{var a;return(a=s.auth)==null?void 0:a.user});u.useEffect(()=>{n(G())},[]);const t=C(s=>s.todos.todos),N=C(s=>s.todos.status),w=C(s=>s.todos.error),_="ReactTodos",D=t==null?void 0:t.some(s=>s.complete);u.useEffect(()=>{if(t.length===0&&!l){const s=JSON.parse(window.localStorage.getItem(_)||"[]"),a=new Set(t.map(r=>r.key));s.forEach(r=>{a.has(r.key)||n(Y(r))})}},[n,t,l]),u.useEffect(()=>{window.localStorage.setItem(_,JSON.stringify(t))},[t]);const j=s=>{const a=new Set,r=[];return s.forEach(o=>{a.has(o.key)?r.push(o):a.add(o.key)}),r},x=s=>{if(!s){n(g("Error: no key",!0,8));return}if(l!=null&&l._id)n(q(l._id,s));else{n(F(s));const a=t.filter(r=>r.key!==s);window.localStorage.setItem(_,JSON.stringify(a))}};u.useEffect(()=>{const s=j(t),a=new Set;s.forEach(r=>{a.has(r.key)||(x(r.key),a.add(r.key))})},[t]);const[b,S]=u.useState([]);u.useEffect(()=>{const s=t==null?void 0:t.slice().sort((a,r)=>(a.order??0)-(r.order??0)).map(a=>({...a,id:a.order,status:"todos"}));S(s)},[t]),u.useEffect(()=>{N==="failed"&&n(g(`There was an error: ${w}`,!0,8))},[N,w,n]);const[O,d]=u.useState(!1);u.useEffect(()=>{l!=null&&l._id&&!O&&n(Q(l._id)).then(()=>{d(!0)})},[l==null?void 0:l._id]);function y(s){const a=t.find(r=>r.key===s);if(a){const r={...a,complete:!a.complete};n(l?R(l._id,s,r):U(r))}}const A=async(s,a)=>{if(!s){n(g("Error: no key",!0,8));return}const r=t.find(o=>o.key===s);if(r){const o={...r,name:a};if(l)await n(R(l._id,s,o)).then(()=>{n(g("Todo updated",!1,3))}).catch(m=>{var i,h;console.error(m),(h=(i=m.response)==null?void 0:i.data)!=null&&h.message?n(g(m.response.data.message,!0,8)):n(g(`${m}`,!0,8))});else{n(U(o));const m=t.map(i=>i.key===s?o:i);window.localStorage.setItem(_,JSON.stringify(m))}}},E=s=>{var a,r;if(l)n(async o=>{var m,i;try{await re(l._id,s).then(()=>{o(ne(l._id))})}catch(h){console.error(h),(i=(m=h.response)==null?void 0:m.data)!=null&&i.message?o(g(h.response.data.message,!0,8)):o(g(`${h}`,!0,8))}});else try{n(ce(s))}catch(o){console.error(o),(r=(a=o.response)==null?void 0:a.data)!=null&&r.message?n(g(o.response.data.message,!0,8)):n(g(`${o}`,!0,8))}finally{window.localStorage.setItem(_,JSON.stringify(t))}},f=u.useRef(null),I=s=>{var i;s.preventDefault();const a=((i=f.current)==null?void 0:i.value)??"";if(a==="")return;const r=le(),o=t.reduce((h,v)=>v.order>h?v.order:h,0),m={key:r,name:a,complete:!1,order:o+1};l?n(oe(l._id,m)):(n(Y(m)),window.localStorage.setItem(_,JSON.stringify([...t,m]))),f.current&&(f.current.value="")};async function T(s){if(s.preventDefault(),window.confirm(ie[e]))if(l)await n(de(l._id));else{n(fe());const a=t.filter(r=>!r.complete);window.localStorage.setItem(_,JSON.stringify(a))}}function k(s){if(!s){n(g("Error: no key",!0,8));return}if(l!=null&&l._id)n(q(l._id,s));else{n(F(s));let a=t.filter(r=>r.key!==s);a=a.map((r,o)=>({...r,order:o+1})),n(me(a)),window.localStorage.setItem(_,JSON.stringify(a))}}return c.jsxs(c.Fragment,{children:[c.jsx("form",{onSubmit:I,className:p.form,children:c.jsxs("fieldset",{children:[c.jsx("legend",{className:"scr",children:ee[e]}),c.jsxs("div",{className:p["todo-input-area"],children:[c.jsx("label",{htmlFor:"taskinput",children:L[e]}),c.jsx("textarea",{ref:f,id:"taskinput",className:"bg",name:"task",required:!0,autoComplete:"off",placeholder:`${B[e]}...`}),c.jsx("button",{id:p["submit-todo"],type:"submit",children:L[e]}),c.jsx("button",{className:"danger",disabled:!D,onClick:s=>T(s),children:se[e]})]})]})}),c.jsxs("div",{className:p["list-wrap"],children:[c.jsxs("p",{className:p["left-to-do"],children:[t==null?void 0:t.filter(s=>!(s!=null&&s.complete)).length," ",ae[e]]}),c.jsx(ge,{todosWithIdAndStatus:b,setTodosWithIdAndStatus:S,toggleTodo:y,deleteTodo:k,language:e,modifyTodo:A,modifyTodoOrder:E}),N==="loading"&&c.jsxs("p",{children:[te[e],"..."]})]})]})}export{we as default};
