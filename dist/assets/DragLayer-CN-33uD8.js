import{r as G,j as b}from"./react-kX_YxI4E.js";import{fU as I,hQ as H,u as J,kJ as E,hX as C,y as K,o as P,kK as Q,kL as V,hW as X}from"./index-pLSDius4.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-ayiissuD.js";import"./react-router-dom-ZPAD5XPx.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const O=({d:s,layer:m,language:c,item:r,index:$,start:w,movement:x,stopMovementCheck:y,stopMoving:T,wheel:M,focused:S,blurred:j,selectedvalue0:o,setFocusedBlob:g,dragUlRef:n,removeBlob:k,mode:l,changeBlobLayer:v,layerAmount:A,changeColor:B})=>{const f=s===0?33:I(22,r.i*2.6,50),{dispatch:u}=G.useContext(H),N=J(),d={background:`${r.background}`,display:"block",left:`${r.x}`,top:`${r.y}`,zIndex:`${r.z}`,"--i":isNaN(Number(r.i))?"10":`${r.i}`,"--layer":`${m}`,WebkitFilter:`blur(${f}px)`,filter:`blur(${f}px)`},i=s===0?["5.9px","8.2px","9.9px","10.8px","10.7px","10.5px","10px"]:["5.1px","5.4px","6.5px","7px","7.8px","8.4px","8.6px"],W=e=>{if(l==="change-color")B(r.id);else if(l==="delete")k(r);else if(l==="clone")u({type:"duplicateDraggable",payload:{d:s,draggable:r}});else if(l==="layer-up"){let t=r.layer;t<A-1?(t+=1,v(r,t)):N(P(Q[c],!0,4))}else if(l==="layer-down"){let t=r.layer;t>0?(t-=1,v(r,t)):N(P(V[c],!0,4))}else if(l==="scale-down"){let t=r.i;t=isNaN(t)?10:t,t-=.4,t=Math.min(Math.max(7,t),36),u({type:"partialUpdate",payload:{d:s,id:r.id,update:{i:t}}})}else if(l==="scale-up"){let t=r.i;t=isNaN(t)?10:t,t+=.4,t=Math.min(Math.max(7,t),36),u({type:"partialUpdate",payload:{d:s,id:r.id,update:{i:t}}})}};return b.jsxs("li",{onFocus:e=>{var a;n&&n.current&&((a=n.current)==null||a.setAttribute("aria-activedescendant",`${e.target.id}`));const t=e.target;setTimeout(()=>{var F,L;const p=t.getBoundingClientRect(),D=(F=t.parentNode)==null?void 0:F.getBoundingClientRect(),h=t.closest(".drag-wrap-outer"),q=h==null?void 0:h.scrollLeft,z=h==null?void 0:h.scrollTop;g({top:p.top-D.top-z,left:p.left-D.left-q,width:p.width,height:p.height}),o.current&&(o.current.textContent=`${E[c]}: ${(L=t.querySelector("span"))==null?void 0:L.textContent}`)},500),S(t)},onBlur:e=>{var t;g(null),j(e.target),n&&n.current&&((t=n.current)==null||t.removeAttribute("aria-activedescendant")),o.current&&(o.current.textContent=`${C[c]}`)},className:`dragzone animation ${l}`,id:r.id,role:"option",tabIndex:0,style:d,onClick:W,children:[b.jsx("div",{className:"draggable-overlay",style:Number(r.i)<8?{width:`calc(var(--i) * ${i[0]})`,height:`calc(var(--i) * ${i[0]})`}:Number(r.i)<10?{width:`calc(var(--i) * ${i[1]})`,height:`calc(var(--i) * ${i[1]})`}:Number(r.i)<20?{width:`calc(var(--i) * ${i[2]})`,height:`calc(var(--i) * ${i[2]})`}:Number(r.i)<24?{width:`calc(var(--i) * ${i[3]})`,height:`calc(var(--i) * ${i[3]})`}:Number(r.i)<28?{width:`calc(var(--i) * ${i[4]})`,height:`calc(var(--i) * ${i[4]})`}:Number(r.i)<32?{width:`calc(var(--i) * ${i[5]})`,height:`calc(var(--i) * ${i[5]})`}:isNaN(Number(r.i))||r.i===null||r.i===void 0?{width:`7 * ${i[6]})`,height:`7 * ${i[6]})`}:{width:`calc(var(--i) * ${i[6]})`,height:`calc(var(--i) * ${i[6]})`},onMouseDown:e=>{var a,p;e.stopPropagation();const t=e.currentTarget.parentElement;t.draggable=!0,o.current&&(o.current.textContent=`${E[c]}: ${(a=t==null?void 0:t.querySelector("span"))==null?void 0:a.textContent}`),n&&n.current&&((p=n.current)==null||p.setAttribute("aria-activedescendant",`${t.id}`)),w(e,t)},onMouseMove:e=>{var t;if(e.buttons===1){e.stopPropagation();const a=e.currentTarget.parentElement;a.draggable=!0,x(e,a),o.current&&(o.current.textContent=`${E[c]}: ${(t=a==null?void 0:a.querySelector("span"))==null?void 0:t.textContent}`)}},onMouseLeave:e=>{var a;e.stopPropagation();const t=e.currentTarget.parentElement;t.draggable=!1,n&&n.current&&((a=n.current)==null||a.removeAttribute("aria-activedescendant")),T(e,t),o.current&&(o.current.textContent=`${C[c]}`)},onMouseUp:e=>{var a;const t=e.currentTarget.parentElement;t.draggable=!1,y(e,t),n&&n.current&&((a=n.current)==null||a.removeAttribute("aria-activedescendant")),o.current&&(o.current.textContent=`${C[c]}`)},onTouchStart:e=>{var a,p;e.preventDefault(),e.stopPropagation();const t=e.currentTarget.parentElement;t.draggable=!0,n&&n.current&&((a=n.current)==null||a.setAttribute("aria-activedescendant",`${t.id}`)),w(e,t),o.current&&(o.current.textContent=`${E[c]}: ${(p=t==null?void 0:t.querySelector("span"))==null?void 0:p.textContent}`)},onTouchMove:e=>{e.preventDefault(),e.stopPropagation();const t=e.currentTarget.parentElement;t.draggable=!0,x(e,t)},onTouchEnd:e=>{var a;const t=e.currentTarget.parentElement;t.draggable=!1,n&&n.current&&((a=n.current)==null||a.removeAttribute("aria-activedescendant")),y(e,t),o.current&&(o.current.textContent=`${C[c]}`)},onWheel:e=>{const t=e.currentTarget.parentElement;M(t)}}),b.jsxs("span",{className:"scr",children:[K[c]," ",r.number]})]},$)},$t=({layer_:s,className:m,language:c,d:r,items:$,saveDraggables:w,dragUlRef:x,selectedvalue0:y,setFocusedBlob:T,start:M,movement:S,stopMovementCheck:j,stopMoving:o,wheel:g,focused:n,blurred:k,removeBlob:l,mode:v,layerAmount:A,changeBlobLayer:B,changeColor:f})=>{const u=r===0?0:1,N={WebkitFilter:`url(#svgGaussian${u}) url(#svgMatrix${u})`,filter:`url(#svgGaussian${u}) url(#svgMatrix${u})`,position:"absolute",top:0,left:0,height:"100%",width:"100%",pointerEvents:"none",minHeight:"420px",minWidth:"100%",margin:"0",padding:"0",overflow:"visible",borderRadius:"0"};return b.jsxs(b.Fragment,{children:[b.jsxs("span",{id:`listbox${r}-layer${s}-label`,className:"scr",children:[X[c]," ",s+1]}),b.jsx("ul",{ref:x,role:"listbox",id:`listbox${r}-layer${s}`,className:`drag-container-layer drag-container${r}-layer drag-container${r}-layer${s} ${m}`,"aria-labelledby":`listbox${r}-layer${s}-label`,"aria-activedescendant":"",style:N,children:$==null?void 0:$.map((d,i)=>{if(d!=null)return b.jsx(O,{layer:s,d:r,language:c,item:d,index:i,start:M,movement:S,stopMovementCheck:j,stopMoving:o,wheel:g,focused:n,blurred:k,selectedvalue0:y,setFocusedBlob:T,dragUlRef:x,removeBlob:l,mode:v,changeBlobLayer:B,layerAmount:A,changeColor:f},i)})})]})};export{$t as default};
