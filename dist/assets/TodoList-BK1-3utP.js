const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TodoItem-C94mZQzt.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/index-t27NYhnJ.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-CzVo0GbG.js","assets/react-router-dom-StiqOUIT.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-BQmqmx7r.css"])))=>i.map(i=>d[i]);
import{L,aQ as A,ai as C,_ as P}from"./index-t27NYhnJ.js";import{r as m,j as s}from"./react-kX_YxI4E.js";import"./react-dom-B5MLDbn_.js";import"./dom-to-image-more-CfDXlNbO.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-CzVo0GbG.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const R=m.lazy(()=>P(()=>import("./TodoItem-C94mZQzt.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])));function W({toggleTodo:D,deleteTodo:T,language:_,modifyTodo:k,modifyTodoOrder:N,todosWithIdAndStatus:t,sending:b,priorityOptions:j,categoryOptions:v,maxCharacters:O}){var f,g;const{t:E}=m.useContext(L),{isDragging:I,listItemsByStatus:p,handleUpdate:c,handleDragging:u}=A(t,["todos"]);return s.jsx("ul",{className:`${C["todo-ul"]} todo-ul`,onDragOver:e=>e.preventDefault(),onDrop:e=>{var x;e.preventDefault();const r=e.dataTransfer.getData("application/my-app"),i=(x=Array.from(e.currentTarget.querySelectorAll(".todo-ul > li")))==null?void 0:x.reduce((n,a)=>{const l=a.getBoundingClientRect(),d=Math.abs(l.top-e.clientY);return d<n.offset?{offset:d,element:a}:n},{offset:Number.POSITIVE_INFINITY}),y=Array.from(e.currentTarget.querySelectorAll(".todo-ul > li")).indexOf(i.element);if(Number(r)===y)return;const o=c(Number(r),"todos",y);if(Array.isArray(o)){const n=o==null?void 0:o.map((a,l)=>({key:a.key,order:l}));N(n)}else console.error("Order is not an array");u(!1)},children:(g=(f=p.todos)==null?void 0:f.items)==null?void 0:g.slice().sort((e,r)=>e.order??0>(r.order??0)?1:-1).sort((e,r)=>e.complete===r.complete?0:e.complete?1:-1).map(e=>{var r;return s.jsx(m.Suspense,{fallback:s.jsxs("div",{className:"flex center margin0auto textcenter",children:[E("Loading"),"..."]}),children:s.jsx(R,{sending:b,toggleTodo:D,deleteTodo:T,todo:t==null?void 0:t.find(i=>i.key===e.key),language:_,modifyTodo:k,isDragging:I,handleUpdate:c,handleDragging:u,priorityOptions:j,categoryOptions:v,zin:(r=p.todos)==null?void 0:r.items.length,maxCharacters:O},e==null?void 0:e.key)},e==null?void 0:e.key)})})}export{W as default};
