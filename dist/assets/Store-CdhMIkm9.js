import{j as e}from"./react-kX_YxI4E.js";import{u as Q,L as z,dS as r,bc as E,d9 as K,dh as Y,dT as X,dU as Z,db as F,dP as _,o as u,dV as g,de as ss,dW as es,dX as is,dY as S,dZ as A,d_ as P,d$ as w,e0 as rs,e1 as ts,e2 as C,e3 as ns,e4 as os,e5 as cs,e6 as ds,e7 as y,e8 as ps,e9 as as,ea as ms,eb as hs,ec as Es,ed as $s,ee as T,ef as N,eg as ls,eh as k,ei as f,ej as R,ek as I,el as O,em as xs,en as js,eo as bs,ep as As,eq as fs,er as ys,es as Ws,et as Fs,bd as B,eu as q,ev as Ss,ew as a,ex as Ps,ey as D,ez as ws,eA as Cs,eB as Ts,eC as Ns,eD as ks,eE as Rs,eF as Is,eG as Os,eH as Bs,eI as qs,eJ as v,be as Ds,eK as vs,eL as Ms,eM as Ls,eN as Gs,aV as M,eO as zs,eP as Us,eQ as Vs,eR as L,eS as Js,ak as Hs}from"./index-pLSDius4.js";import{L as U}from"./react-router-dom-ZPAD5XPx.js";import{z as Qs,D as Ks,E as Ys,J as Xs,B as G,K as Zs,N as _s}from"./react-icons-ayiissuD.js";import{A as us}from"./AdditionalInfo-C7wdSS1l.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const gs=({language:s,items:m,name:$,id:n,cart:o,setCart:l,intro:x,link:j})=>{const b=Q(),c=z();return e.jsx(e.Fragment,{children:e.jsx("section",{className:`card ${r.card} ${r["store-items"]} ${c?r.light:""}`,style:{width:"100%",position:"relative",zIndex:2},children:e.jsx("div",{children:e.jsxs("div",{className:`${r["store-wrap"]} ${r[n]}`,children:[n!=="misc"&&e.jsxs("h2",{id:n,children:[n==="wordpress"?e.jsx(e.Fragment,{children:e.jsx(Qs,{})}):n==="react"?e.jsx(e.Fragment,{children:e.jsx(Ks,{})}):n==="graphic"?e.jsx(e.Fragment,{children:e.jsx(Ys,{})}):"",e.jsx("span",{children:$}),n==="react"?e.jsx(e.Fragment,{children:e.jsx(Xs,{})}):""]}),x&&x.trim()!==""&&e.jsx("p",{style:{margin:0,minWidth:"100%"},children:x}),j&&e.jsx("div",{className:r.links,style:{marginTop:0,minWidth:"100%"},children:j}),e.jsx(us,{type:n,language:s,styles:r,classNameWrap:r["additional-information"],isOpen:!0,setIsFormOpen:()=>{}}),m.map(t=>e.jsxs("div",{id:t.id,className:`${r["store-item"]} ${s!==E.English&&s!==E.Suomi?r.foreign:""}`,children:[e.jsx("h3",{children:t.name}),e.jsx("p",{className:r.grow,children:K(t.description)}),e.jsxs("p",{children:[Y[s],": ",t.price," €"," ",t.id==="misc-quote"?null:e.jsxs("small",{children:["(",X[s],")"]})]}),(()=>{const d=o.find(h=>h.id===t.id);return d&&d.quantity>0?e.jsx(e.Fragment,{children:e.jsxs("p",{className:r.added,children:[e.jsx("span",{children:Z[s]})," ",e.jsx("button",{className:`${r["remove-from-cart"]} danger delete`,onClick:()=>{window.confirm(`${F[s]} ${t.name} ${_[s]}?`)&&l(o.filter(h=>h.id!==t.id))},children:F[s]})]})}):e.jsxs("button",{id:"add-to-cart",className:r["add-to-cart"],onClick:()=>{o.find(p=>p.id===t.id)?l(o.map(p=>p.id===t.id?{...p,quantity:p.quantity+1}:p)):(l([...o,{...t,quantity:1}]),b(u(`${g[s]}`,!1,3)))},children:[e.jsx(G,{style:{fontSize:"1.3em"}})," ",e.jsx("span",{children:ss[s]})]})})(),o.map(d=>d.id===t.id&&d.quantity>0&&e.jsxs(U,{to:"/cart",className:r["cart-link"],children:[e.jsx(G,{style:{fontSize:"1.3em"}})," ",e.jsxs("big",{children:[es[s]," »"]})]},d.id))]},t.id))]})})})})},se=({styles:s,name:m,id:$,direction:n})=>e.jsxs("button",{className:`${s["scroll-button"]}`,onClick:()=>{var o;(o=document.getElementById($))==null||o.scrollIntoView()},children:[n==="above"&&e.jsxs(e.Fragment,{children:[e.jsx(Zs,{height:"1.3rem",width:"1.3rem",style:{margin:"-0.4rem 0 -0.1rem"}}),e.jsx("span",{children:m})]}),n==="any"&&e.jsx("span",{children:m}),n==="below"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:m})," ",e.jsx(_s,{height:"1.3rem",width:"1.3rem",style:{margin:"-0.1rem 0 -0.4rem"}})]})]}),ye=({language:s,cart:m,setCart:$})=>{const n=z(),o=[{id:"wordpress-simple",name:is[s],price:190,description:`${S[s]} ${A[s]}`},{id:"wordpress-website",name:P[s],price:260,description:`${w[s]}  ${A[s]}`},{id:"wordpress-blog-contact",name:rs[s],price:350,description:`${ts[s]} ${C[s]}`},{id:"wordpress-full",name:ns[s],price:890,description:`${os[s]}`},{id:"wordpress-blog-contact-existing",name:`${cs[s]} `,price:160,description:`${ds[s]} (${P[s]}).  ${y[s]} ${C[s]}`},{id:"wordpress-webstore",name:`${ps[s]}`,price:580,description:`${as[s]}. ${y[s]}`}],l=[{id:"react-simple",name:ms[s],price:340,description:`${S[s]} ${A[s]}`},{id:"react-website",name:hs[s],price:400,description:`${w[s]} ${A[s]}`},{id:"react-contact-functionality",name:Es[s],price:620,description:`${$s[s]} ${T[s]} (Node.js app & React). ${N[s]}`},{id:"react-adding-functionality",name:`${ls[s]} (Node.js app & React)`,price:220,description:`${T[s]} ${y[s]} ${N[s]}`}],x=26,j=28,b=33,c={maintenance:{price:x},updates:{price:j},translation:{price:b},training:{price:b}},t=[{name:k[s],id:"misc-maintenance",price:c.maintenance.price,description:`${k[s]}: ${c.maintenance.price}€/${f[s]} ${R[s]}. `},{name:I[s],id:"misc-updates",price:c.updates.price,description:`${I[s]}: ${c.updates.price}€/${f[s]} ${R[s]}. `},{name:O[s],id:"misc-translation",price:c.translation.price,description:`${O[s]}: ${c.translation.price}€/${f[s]}. `},{name:xs[s],id:"misc-training",price:c.training.price,description:`${js[s]}: ${bs[s]} ${c.training.price}€/${f[s]}. 

${As[s]} ${fs[s]} `},{name:ys[s],id:"misc-quote",price:0,description:`${Ws[s]}. 

${Fs[s]}. ${s!==E.English&&s!==E.Suomi?`

${B[s]}`:""}`}],d=[{id:"graphic-flyer-1",name:`${q[s]} 1`,price:230,description:`${Ss[s]}. ${a[s]}`},{id:"graphic-flyer-2",name:`${q[s]} 2`,price:270,description:`${Ps[s]}. ${a[s]}`},{id:"graphic-business-card-1",name:`${D[s]} 1`,price:220,description:`${ws[s]}. ${a[s]}`},{id:"graphic-business-card-2",name:`${D[s]} 2`,price:320,description:`${Cs[s]}. ${a[s]}`},{id:"graphic-poster",name:Ts[s],price:290,description:`${a[s]}`},{id:"graphic-programme",name:Ns[s],price:320,description:`${ks[s]}. ${a[s]}`},{id:"graphic-poster-programme",name:Rs[s],price:400,description:`${Is[s]}. ${a[s]}`},{id:"graphic-logo",name:Os[s],price:250,description:`${Bs[s]} ${a[s]}`}],h=l.map(i=>(i.quantity=0,i.details="",i.status="pending",i.paid="none",i)),p=o.map(i=>(i.quantity=0,i.details="",i.status="pending",i.paid="none",i)),V=d.map(i=>(i.quantity=0,i.details="",i.status="pending",i.paid="none",i)),J=t.map(i=>(i.quantity=0,i.details="",i.status="pending",i.paid="none",i)),W=[{name:qs[s],id:"misc",array:J,intro:s!==E.Suomi&&s!==E.English?`${v[s]} ${B[s]}`:`${v[s]}`,link:e.jsx(U,{to:"/contact",children:Ds[s]})},{name:"React & Node",id:"react",array:h,intro:`${vs[s]}`,link:null},{name:"WordPress",id:"wordpress",array:p,intro:`${Ms[s]} ${Ls[s]}`,link:e.jsxs(e.Fragment,{children:[Gs[s]," (",M[s].toLowerCase(),"):",e.jsxs("ul",{className:"ul",children:[e.jsxs("li",{children:[e.jsx("a",{href:"https://jenniina.fi/jyvaskylan-salonkiorkesteri-orchestra-website/#title",children:zs[s]})," "]}),e.jsxs("li",{children:[e.jsx("a",{href:"https://jenniina.fi/metal-2022/#metal2022",children:Us[s]})," "]}),e.jsx("li",{children:e.jsx("a",{href:"https://jenniina.fi/website-of-psychologist/#sirkku",children:Vs[s]})})]})]})},{name:L[s],id:"graphic",array:V,intro:"",link:e.jsxs(e.Fragment,{children:[Js[s]," (",M[s].toLowerCase(),"):"," ",e.jsxs("a",{href:"https://jenniina.fi/portfolio#graphic-design",children:[L[s]," (",Hs[s],")"]})]})}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`${r["scroll-button-wrap"]} ${n?r.light:""}`,children:[W.map((i,H)=>H===0?null:e.jsx(se,{styles:r,name:i.name,id:i.id,direction:"below"},i.id))," "]}),W.map(i=>e.jsx(gs,{id:i.id,language:s,items:i.array,name:i.name,intro:i.intro,link:i.link,cart:m,setCart:$},i.id))]})};export{ye as default};
