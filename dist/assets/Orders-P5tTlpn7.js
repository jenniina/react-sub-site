import{r as D,j as s}from"./react-A9DAvxly.js";import{c as S}from"./cart-CgS8CQgD.js";import{K as H,c$ as J,dM as r,b9 as I,f9 as M,f2 as X,f5 as N,f6 as w,dc as Z,f7 as R,f8 as g,be as C,S as O,f3 as q,de as Y,dh as ss,da as ts,f4 as T,fa as K,r as Q,fb as es,fc as as,bW as is,fd as ns,W as u,fe as cs}from"./index-Bhl207lb.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./axios-CCb-kr4I.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./react-icons-CrVlm7qW.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const As=({language:a,user:m,statusOptions:b,paidOptions:B,splitToLines:V,paidStatus:v,itemStatus:_,info:F})=>{const j=H(),U=J(),[i,h]=D.useState(null),[L,z]=D.useState(!1),[y,E]=D.useState(!1),A=async()=>{var e,d;try{const x=(await S.getAllOrders(a,m._id)).map(f=>({...f,createdAt:new Date(f.createdAt),updatedAt:new Date(f.updatedAt)})).sort((f,o)=>f.status==="cancelled"&&o.status!=="cancelled"?1:f.status!=="cancelled"&&o.status==="cancelled"?-1:o.createdAt.getTime()-f.createdAt.getTime());h(x)}catch(p){(d=(e=p.response)==null?void 0:e.data)!=null&&d.message?j(u(p.response.data.message,!0,8)):j(u(p.message,!0,8))}};D.useEffect(()=>{m&&(m!=null&&m.role)&&(m==null?void 0:m.role)>1&&A()},[m]),D.useEffect(()=>{i&&h(i.map(e=>({...e,total:e.items.map(d=>d.price*d.quantity).reduce((d,p)=>d+p,0)})))},[L]);const G=async e=>{S.deleteOrder(a,e,m._id).then(()=>{j(u(`${cs[a]} ${e}`,!1,5)),A()}).catch(d=>{var p,x;(x=(p=d.response)==null?void 0:p.data)!=null&&x.message?j(u(d.response.data.message,!0,8)):j(u(d.message,!0,8))})},$=async e=>{E(!0),S.updateOrder(a,e,m._id).then(d=>{d.success&&j(u(`${d.message}`,!1,5)),A(),E(!1)}).catch(d=>{var p,x;(x=(p=d.response)==null?void 0:p.data)!=null&&x.message?j(u(d.response.data.message,!0,8)):j(u(d.message,!0,8)),E(!1)})};return s.jsx("div",{className:`${r.orders} ${U?r.light:""}`,children:i==null?void 0:i.map((e,d)=>{var p,x,f,o,P,W,k;return s.jsx("div",{className:`${r.order} ${e.status==="completed"?r.completed:e.status==="cancelled"?r.cancelled:e.status==="pending"?r.pending:e.status==="in progress"?r["in-progress"]:""}`,children:s.jsx(I,{language:a,text:`${e.status==="completed"?"[ "+M[a]+" ] ":""}${e.orderID} ${e.info.companyName?`${e.info.name} (${e.info.companyName})`:e.info.name}`,hideBrackets:!0,className:`${e.status==="cancelled"||e.status==="completed"?"reset":e.status==="pending"?"grayer":""} change-status`,wrapperClass:r["change-status-main"],showButton:!0,children:s.jsxs(s.Fragment,{children:[s.jsxs("h2",{children:[e.info.name," ",e.info.companyName?`(${e.info.companyName})`:""]}),s.jsxs("div",{className:r["info-wrap"],children:[s.jsx("p",{children:s.jsxs("big",{children:[s.jsxs("strong",{children:[X[a],": "]}),e.orderID]})}),s.jsxs("p",{children:[s.jsxs("strong",{children:[N[a],": "]}),_(e.status)]}),s.jsxs("p",{children:[s.jsxs("strong",{children:[w[a],": "]}),v[e.items.every(t=>t.paid==="full")?"full":e.items.every(t=>t.paid==="none")?"none":"partial"]]}),s.jsxs("p",{children:[Z[a],": ",s.jsxs("big",{children:[e.total," € "]})]}),s.jsxs("table",{className:`${r["info-table"]}`,children:[s.jsx("caption",{children:R[a]}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsxs("th",{children:[R[a],": "]}),s.jsxs("td",{children:[(p=e.createdAt)==null?void 0:p.toLocaleDateString()," ",(x=e.createdAt)==null?void 0:x.toLocaleTimeString()]})]}),s.jsxs("tr",{children:[s.jsxs("th",{children:[g[a],": "]}),s.jsxs("td",{children:[e.updatedAt.toLocaleDateString()," ",(f=e.updatedAt)==null?void 0:f.toLocaleTimeString()]})]})]})]})]}),s.jsx(I,{language:a,text:`${C[a]} (${N[a]})`,hideBrackets:!0,className:"narrow2 change-status",wrapperClass:r["change-status-main"],children:s.jsx(s.Fragment,{children:s.jsxs("form",{className:r["change-status-form"],onSubmit:t=>{t.preventDefault(),$(i==null?void 0:i.find(n=>n.orderID===e.orderID))},children:[s.jsx(O,{language:a,id:`status-${e.orderID}`,className:"status",instructions:"Status",options:b,value:b.find(t=>t.value===e.status),onChange:t=>{h(i==null?void 0:i.map(n=>n.orderID===e.orderID?{...n,status:t==null?void 0:t.value}:n))}}),s.jsx("button",{type:"submit",disabled:y,children:q[a]})]})})}),(o=e.items)==null?void 0:o.map(t=>s.jsxs("div",{className:r["item-wrap"],children:[s.jsx("h3",{children:t.name}),s.jsx("p",{children:t.description}),s.jsxs("p",{children:[s.jsxs("strong",{children:[Y[a],": "]}),t.id==="misc-quote"?t.price+" €":t.price+" x "+t.quantity+" = "+t.quantity*t.price+" €"]}),s.jsxs("p",{children:[s.jsxs("strong",{children:[ss[a],": "]})," ",s.jsx("br",{}),V(t.details)]}),s.jsxs("p",{children:[s.jsxs("strong",{children:[N[a],": "]}),_(t.status)," "]}),t.id==="misc-quote"?null:s.jsxs("p",{children:[s.jsxs("strong",{children:[w[a],": "]}),v[t.paid]]},t.id),s.jsx(I,{language:a,text:`${C[a]}`,hideBrackets:!0,className:"narrow2 change-status",wrapperClass:r["change-status"],children:s.jsx(s.Fragment,{children:s.jsxs("form",{className:r["change-status-form"],onSubmit:n=>{n.preventDefault(),$(i==null?void 0:i.find(c=>c.orderID===e.orderID))},children:[s.jsxs("label",{children:[s.jsx("span",{children:Y[a]}),s.jsx("input",{type:"number",className:"bg",name:`price-${t.id}`,defaultValue:t.price,onChange:n=>{h(i==null?void 0:i.map(c=>c.orderID===e.orderID?{...c,items:c.items.map(l=>l.id===t.id?{...l,price:Number(n.target.value)}:l)}:c)),z(!L)}})]}),s.jsxs("label",{children:[s.jsx("span",{children:ts[a]}),s.jsx("input",{type:"number",className:"bg",name:`quantity-${t.id}`,defaultValue:t.quantity,onChange:n=>{h(i==null?void 0:i.map(c=>c.orderID===e.orderID?{...c,items:c.items.map(l=>l.id===t.id?{...l,quantity:Number(n.target.value)}:l)}:c))}})]}),s.jsxs("label",{children:[s.jsx("span",{children:T[a]}),s.jsx("textarea",{name:`details-${t.id}`,rows:6,defaultValue:t.details,onChange:n=>{h(i==null?void 0:i.map(c=>c.orderID===e.orderID?{...c,items:c.items.map(l=>l.id===t.id?{...l,details:n.target.value}:l)}:c))}})]}),s.jsx(O,{language:a,id:`status-${t.id}`,className:`status ${K.prev2}`,instructions:N[a],options:b,value:b.find(n=>n.value===t.status),onChange:n=>{h(i==null?void 0:i.map(c=>c.orderID===e.orderID?{...c,items:c.items.map(l=>l.id===t.id?{...l,status:n==null?void 0:n.value}:l)}:c))}}),s.jsx(O,{language:a,id:`paid-${t.id}`,className:`paid ${K.prev}`,instructions:w[a],options:B,value:B.find(n=>n.value===t.paid),onChange:n=>{h(i==null?void 0:i.map(c=>c.orderID===e.orderID?{...c,items:c.items.map(l=>l.id===t.id?{...l,paid:n==null?void 0:n.value}:l)}:c))}}),s.jsx("button",{type:"submit",disabled:y,children:q[a]})]})})})]},t.id)),s.jsxs("div",{className:r["info-wrap"],children:[s.jsxs("table",{className:`${r["info-table"]}`,children:[s.jsx("caption",{children:T[a]}),s.jsx("tbody",{children:Object.keys(e.info).map(t=>{var n;return t==="_id"?null:e.info[t]!==null&&((n=e.info[t])==null?void 0:n.trim())!==""&&s.jsxs("tr",{children:[s.jsxs("th",{children:[F(t),":"]}),s.jsx("td",{children:e.info[t]})]},t)})})]}),e.extra&&e.extra.trim()!==""&&s.jsxs("p",{children:[s.jsxs("strong",{children:[Q[a],": "]})," ",s.jsx("br",{}),V(e.extra)]}),s.jsx(I,{language:a,text:`${C[a]} (${T[a]})`,hideBrackets:!0,className:"narrow2 change-status",wrapperClass:r["change-status-info"],children:s.jsx(s.Fragment,{children:s.jsxs("form",{className:r["change-status-form"],onSubmit:t=>{t.preventDefault(),$(i==null?void 0:i.find(n=>n.orderID===e.orderID))},children:[Object.keys(e.info).map((t,n)=>t==="_id"?null:s.jsxs("label",{children:[s.jsx("span",{children:F(t)}),s.jsx("input",{type:"text",className:"bg",name:`info-${t}-${n}`,defaultValue:e.info[t],onChange:c=>{h(i==null?void 0:i.map(l=>l.orderID===e.orderID?{...l,info:{...l.info,[t]:c.target.value}}:l))}})]},`${t}-${n}`)),s.jsxs("label",{children:[s.jsx("span",{children:Q[a]}),s.jsx("textarea",{rows:6,name:`additional-${e.orderID}`,defaultValue:e.extra,onChange:t=>{h(i==null?void 0:i.map(n=>n.orderID===e.orderID?{...n,extra:t.target.value}:n))}})]}),(P=e.items)!=null&&P.every(t=>t.paid==="full")?s.jsx("button",{onClick:()=>{h(i==null?void 0:i.map(t=>t.orderID===e.orderID?{...t,status:"completed"}:t)),$(i==null?void 0:i.find(t=>t.orderID===e.orderID))},children:M[a]},e.updatedAt.toString()):s.jsxs("div",{children:[es[a]," ",s.jsx("br",{}),((W=e.items)==null?void 0:W.some(t=>t.paid!=="full"))&&as[a],":"," ",s.jsx("ul",{className:"ul",children:(k=e.items)==null?void 0:k.filter(t=>t.paid!=="full").map((t,n)=>s.jsxs("li",{children:[t.name," (",v[t.paid],")"]},`${t.paid}-${n}`))})]},e.updatedAt.toString()),s.jsx("button",{type:"submit",disabled:y,children:q[a]})]})})}),m&&m.role&&m.role>2&&s.jsx("div",{className:`${r["delete-order"]}`,children:s.jsxs("button",{className:"danger delete",onClick:()=>{window.confirm(`${is[a]} ${e.orderID}?`)&&G(e.orderID)},children:[ns[a],": ",e.orderID]},e.createdAt.toString())})]})]})})},`${e.orderID}-${d}`)})})};export{As as default};
