import{r as t,j as s}from"./react-A9DAvxly.js";import{il as Ne,d2 as we,im as W,bU as n,io as o,be as X,S as ee,ba as y,ip as q,bY as de,iq as F,ir as fe,bX as K,is as se,it as re,iu as ye,iv as De,iw as $e,fQ as Se,ix as ae,iy as ve,iz as Ee,iA as ke,iB as ne,iC as ie,iD as le,gO as C,f as te,e as ce,iE as me,g as pe,iF as he,fg as Ce,iG as Te}from"./index-BNHP9xTd.js";import{be as Me,bf as Fe,bg as Ye,bh as Ie,bi as _e,bj as Ae,bk as Be,bl as He,bm as Pe,bn as Re,bo as qe}from"./react-icons-RHjzyHVQ.js";import{R as ze}from"./react-dom-CxfJ6lHP.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-redux-C4cSaZU-.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./scheduler-CzFDRTuY.js";const ue=Se(6),Le=({todo:e,language:i,priorityOptions:$,categoryOptions:r,handleModify:z,sending:S,newCategory:G,newPriority:Y,setNewPriority:L,setNewCategory:O,showDeadline:b,setShowDeadline:I,title:v,newName:E,setNewName:_,newDay:l,setNewDay:m,newMonth:f,setNewMonth:N,newYear:u,setNewYear:w,setIsOpen:D})=>{const[x,h]=t.useState(null),A=a=>{_(a.target.value)},Q=a=>{Number(a)<=31&&a.length<=2?(m(a),h(null)):h(`${ae[i]}: ${se[i]}`)},J=a=>{Number(a)<=12&&a.length<=2?(N(a),h(null)):h(`${ae[i]}: ${re[i]}`)},U=a=>{const p=a.target.value;Number(p)<=Number(new Date().getFullYear())+10&&p.length<=4?(w(p),h(null)):h(ve[i])};t.useEffect(()=>{if(l&&f&&u){const a=new Date(Number(u),Number(f)-1,Number(l)),p=new Date;p.setHours(0,0,0,0),h(null),a<p&&h(Ne[i])}},[l,f,u,i]),t.useEffect(()=>{b?(l||m((new Date().getDate()+1).toString().padStart(2,"0")),f||N((new Date().getMonth()+1).toString().padStart(2,"0")),u||w(new Date().getFullYear().toString())):(m(""),N(""),w(""))},[b]);const d=t.useRef(null),T=t.useRef(null);t.useEffect(()=>{var p;T.current=document.activeElement,(p=d.current)==null||p.focus();const a=k=>{var M,V;if(k.key==="Tab"){const j=(V=(M=d.current)==null?void 0:M.parentElement)==null?void 0:V.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(!j||j.length===0){k.preventDefault();return}const H=j==null?void 0:j[0],P=j==null?void 0:j[j.length-1];k.shiftKey?document.activeElement===H&&(k.preventDefault(),P==null||P.focus()):document.activeElement===P&&(k.preventDefault(),H==null||H.focus())}else k.key==="Escape"&&B()};return document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",a),T.current?T.current.focus():document.body.focus()}},[d.current]);const B=()=>{D(!1),T.current?T.current.focus():document.body.focus()},Z=we();return ze.createPortal(s.jsx("div",{className:`${W["modal-overlay"]} ${Z?n.light:""}`,onClick:B,children:s.jsxs("div",{className:`${W["modal-content"]} ${n["todo-modal"]}`,onClick:a=>a.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":v??"Task",children:[s.jsxs("button",{ref:d,className:`${W["close-button"]} tooltip-wrap`,onClick:B,children:[s.jsx("span",{"aria-hidden":"true",children:"×"}),s.jsx("span",{className:"scr",children:o[i]}),s.jsx("span",{"aria-hidden":"true",className:"tooltip below left narrow2",children:o[i]})]}),s.jsx("h2",{children:X[i]}),s.jsxs("form",{onSubmit:z,className:`${n.modify}`,children:[s.jsx(ee,{id:`category_${y(q((e==null?void 0:e.name)??ue,i))}`,className:`${n.select} ${n["category-select"]}`,value:r==null?void 0:r.find(a=>a.value===G),onChange:a=>O(a==null?void 0:a.value),options:r,instructions:de[i],language:i,hideDelete:!0,z:3}),s.jsx(ee,{id:`priority_${y(q((e==null?void 0:e.name)??ue,i))}`,className:`${n.select}`,value:$==null?void 0:$.find(a=>a.value===Y),onChange:a=>L(a==null?void 0:a.value),options:$,instructions:F[i],language:i,hideDelete:!0,z:2}),s.jsxs("fieldset",{className:`${n.fieldset} ${n["deadline-wrap"]}`,children:[s.jsx("legend",{children:s.jsxs("label",{children:[fe[i]," ",s.jsx("input",{style:{marginLeft:"0.5em"},type:"checkbox",checked:b,onChange:()=>I(!b)})]})}),b&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:n["deadline-inputs"],children:[s.jsxs("div",{className:n.input,children:[s.jsx("label",{className:"scr",htmlFor:`day_${y(q((e==null?void 0:e.name)??K[i],i))}`,children:se[i]}),s.jsx("input",{type:"number",id:`day_${y((e==null?void 0:e.name)||"Task")}`,name:"day",min:1,max:31,value:l,placeholder:"DD",onChange:a=>Q(a.target.value),required:!0,className:"bg"})]}),s.jsxs("div",{className:n.input,children:[s.jsx("label",{className:"scr",htmlFor:`month_${y((e==null?void 0:e.name)||"Task")}`,children:re[i]}),s.jsx("input",{type:"number",id:`month_${y(q((e==null?void 0:e.name)??K[i],i))}`,name:"month",min:1,max:12,value:f,placeholder:"MM",onChange:a=>J(a.target.value),required:!0,className:"bg"})]}),s.jsxs("div",{className:n.input,children:[s.jsx("label",{className:"scr",htmlFor:`year_${y((e==null?void 0:e.name)||"Task")}`,children:ye[i]}),s.jsx("input",{type:"number",id:`year_${y(q((e==null?void 0:e.name)??K[i],i))}`,name:"year",min:new Date().getFullYear(),max:new Date().getFullYear()+10,value:u,placeholder:"YYYY",onChange:a=>U(a),required:!0,className:"bg"})]})]})," ",x&&s.jsx("p",{className:n.error,children:x})]})]}),s.jsxs("fieldset",{className:`${n.fieldset} ${n.textarea}`,children:[s.jsx("legend",{children:K[i]}),s.jsxs("label",{children:[s.jsx("textarea",{id:`task_${y(e==null?void 0:e.name)}`,required:!0,name:"task",rows:4,value:E,onChange:A}),s.jsxs("span",{className:"scr",children:[X[i]," ",q((e==null?void 0:e.name)??K[i],i)]})]})]}),s.jsxs("button",{type:"submit",disabled:S,className:"modify",children:[De[i]," ",s.jsx(Me,{})]}),s.jsxs("button",{onClick:B,className:`reset ${n.cancel}`,type:"button",children:[$e[i]," ",s.jsx(Fe,{})]})]})]})}),document.getElementById("modal-root"))};function Oe({todo:e,toggleTodo:i,deleteTodo:$,language:r,modifyTodo:z,isDragging:S,handleUpdate:G,handleDragging:Y,sending:L,priorityOptions:O,categoryOptions:b,zin:I}){const[v,E]=t.useState((e==null?void 0:e.name)??""),[_,l]=t.useState(!1),[m,f]=t.useState((e==null?void 0:e.priority)||"low"),[N,u]=t.useState(e!=null&&e.deadline?new Date(e.deadline).getDate().toString().padStart(2,"0"):""),[w,D]=t.useState(e!=null&&e.deadline?(new Date(e.deadline).getMonth()+1).toString().padStart(2,"0"):""),[x,h]=t.useState(e!=null&&e.deadline?new Date(e.deadline).getFullYear().toString():""),A=N&&w&&x?`${x}-${w}-${N}`:"",[Q,J]=t.useState((e==null?void 0:e.category)||"other"),[U,d]=t.useState(!1);function T(){i(e==null?void 0:e.key)}function B(){window.confirm(Ce[r]+' "'+(e==null?void 0:e.name)+'"?')&&(E(""),$(e==null?void 0:e.key),d(!1))}const Z=c=>{c.preventDefault(),z(e==null?void 0:e.key,v,m,A,Q),d(!1)};t.useEffect(()=>{e!=null&&e.deadline&&l(!0)},[e]),t.useEffect(()=>{if((e==null?void 0:e.name)!==v&&E((e==null?void 0:e.name)||""),e!=null&&e.deadline){const c=new Date(e.deadline);u(c.getDate().toString().padStart(2,"0")),D((c.getMonth()+1).toString().padStart(2,"0")),h(c.getFullYear().toString())}},[e]);const[a,p]=t.useState(!0),[k,M]=t.useState(!1),V=()=>{p(!0),M(!1)},j=()=>{p(!0)},H=()=>{p(!1)},P=()=>{p(!1),M(!0)},xe=()=>{var c;(c=window.getSelection())!=null&&c.toString()?(p(!1),M(!0)):(p(!0),M(!1))},je=c=>{k&&c.preventDefault()};return s.jsx(s.Fragment,{children:s.jsxs("li",{style:{zIndex:`calc(${I} - ${e==null?void 0:e.order})`},className:`${S?"dragging":""} ${U?n.open:n.closed}`,draggable:a,onDragStart:c=>{var R;a?(c.dataTransfer.setData("application/my-app",(R=e==null?void 0:e.order)==null?void 0:R.toString()),Y(!0)):c.preventDefault()},onDragEnd:()=>Y(!1),children:[s.jsxs("span",{onMouseOver:j,onMouseDown:V,className:`${n["drag-handle"]} tooltip-wrap`,children:[s.jsx(Ye,{}),s.jsx("span",{className:"tooltip narrow2 below right",children:Ee[r]})]}),s.jsxs("label",{onClick:je,children:[s.jsx("input",{type:"checkbox",id:`check_${y(e==null?void 0:e.name)}`,checked:(e==null?void 0:e.complete)??!1,onChange:T}),s.jsx("span",{onMouseOver:H,onMouseDown:P,onMouseUp:xe,children:e==null?void 0:e.name}),s.jsx("div",{className:`${n["more-info-wrap"]}`,children:(e==null?void 0:e.deadline)&&(e==null?void 0:e.deadline)!==""&&(()=>{const c=new Date(e.deadline),R=new Date;c.setHours(0,0,0,0),R.setHours(0,0,0,0);const be=c<R,g=c.getTime()===R.getTime();return s.jsxs("span",{className:`${n.deadline} ${be?n.overdue:""} ${g?n.today:""}`,children:[fe[r],":"," ",g?ke[r]:new Date(e.deadline).toLocaleDateString(r,{year:"numeric",month:"long",day:"numeric"})]})})()})]}),s.jsxs("div",{className:`${n["btn-wrap"]}`,children:[(e==null?void 0:e.priority)==="high"?s.jsxs("b",{className:`tooltip-wrap ${n.high}`,children:[s.jsx(Ie,{}),s.jsxs("span",{className:"scr",children:[F[r],": ",ne[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[F[r],": ",ne[r]]})]}):(e==null?void 0:e.priority)==="medium"?s.jsxs("b",{className:`tooltip-wrap ${n.medium}`,children:[s.jsx(_e,{}),s.jsxs("span",{className:"scr",children:[F[r],": ",ie[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[F[r],": ",ie[r]]})]}):(e==null?void 0:e.priority)==="low"?s.jsxs("b",{className:`tooltip-wrap ${n.low}`,children:[s.jsx(Ae,{viewBox:"0 0 17 17"}),s.jsxs("span",{className:"scr",children:[F[r],": ",le[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[F[r],": ",le[r]]})]}):s.jsx(s.Fragment,{children:" "}),(e==null?void 0:e.category)==="personal"?s.jsxs("b",{className:`tooltip-wrap ${n.cat}`,children:[s.jsx(Be,{}),s.jsxs("span",{className:"scr",children:[C[r],": ",te[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[C[r],": ",te[r]]})]}):(e==null?void 0:e.category)==="work"?s.jsxs("b",{className:`tooltip-wrap ${n.cat} ${n.bg}`,children:[s.jsx(He,{}),s.jsxs("span",{className:"scr",children:[C[r],": ",ce[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[C[r],": ",ce[r]]})]}):(e==null?void 0:e.category)==="shopping"?s.jsxs("b",{className:`tooltip-wrap ${n.cat} ${n.bg}`,children:[s.jsx(Pe,{}),s.jsxs("span",{className:"scr",children:[C[r],": ",me[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[C[r],": ",me[r]]})]}):s.jsxs("b",{className:`tooltip-wrap ${n.cat}`,children:[s.jsx(Re,{}),s.jsxs("span",{className:"scr",children:[C[r],": ",pe[r]]}),s.jsxs("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:[C[r],": ",pe[r]]})]}),s.jsxs("button",{onClick:()=>d(!0),className:`${n.edit} tooltip-wrap`,disabled:(e==null?void 0:e.complete)??!1,children:[s.jsx(qe,{}),s.jsx("span",{className:"scr",children:X[r]}),s.jsx("span",{className:"tooltip narrow2 below left","aria-hidden":"true",children:X[r]})]}),s.jsxs("button",{className:`${n.delete} tooltip-wrap`,onClick:U?()=>d(!1):B,children:[s.jsx("span",{className:n["delete-inner"],"aria-hidden":"true",children:"×"}),s.jsx("span",{className:"scr",children:he[r]}),s.jsx("span",{className:"tooltip below left narrow2","aria-hidden":"true",children:he[r]})]})]}),U&&s.jsx(Le,{title:e==null?void 0:e.name,language:r,handleModify:Z,newName:v,setNewName:E,newPriority:m,setNewPriority:f,newDay:N,setNewDay:u,newMonth:w,setNewMonth:D,newYear:x,setNewYear:h,newCategory:Q,setNewCategory:J,priorityOptions:O,categoryOptions:b,showDeadline:_,setShowDeadline:l,sending:L,todo:e,setIsOpen:d})]})})}function ts({toggleTodo:e,deleteTodo:i,language:$,modifyTodo:r,modifyTodoOrder:z,todosWithIdAndStatus:S,sending:G,priorityOptions:Y,categoryOptions:L}){var E,_;const{isDragging:O,listItemsByStatus:b,handleUpdate:I,handleDragging:v}=Te(S,["todos"]);return s.jsx("ul",{className:`${n["todo-ul"]} todo-ul`,onDragOver:l=>l.preventDefault(),onDrop:l=>{var w;l.preventDefault();const m=l.dataTransfer.getData("application/my-app"),f=(w=Array.from(l.currentTarget.querySelectorAll(".todo-ul > li")))==null?void 0:w.reduce((D,x)=>{const h=x.getBoundingClientRect(),A=Math.abs(h.top-l.clientY);return A<D.offset?{offset:A,element:x}:D},{offset:Number.POSITIVE_INFINITY}),N=Array.from(l.currentTarget.querySelectorAll(".todo-ul > li")).indexOf(f.element);if(Number(m)===N)return;const u=I(Number(m),"todos",N);if(Array.isArray(u)){const D=u==null?void 0:u.map((x,h)=>({key:x.key,order:h}));z(D)}else console.error("Order is not an array");v(!1)},children:(_=(E=b.todos)==null?void 0:E.items)==null?void 0:_.slice().sort((l,m)=>l.order??0>(m.order??0)?1:-1).sort((l,m)=>l.complete===m.complete?0:l.complete?1:-1).map(l=>{var m;return s.jsx(Oe,{sending:G,toggleTodo:e,deleteTodo:i,todo:S==null?void 0:S.find(f=>f.key===l.key),language:$,modifyTodo:r,isDragging:O,handleUpdate:I,handleDragging:v,priorityOptions:Y,categoryOptions:L,zin:(m=b.todos)==null?void 0:m.items.length},l==null?void 0:l.key)})})}export{ts as default};
