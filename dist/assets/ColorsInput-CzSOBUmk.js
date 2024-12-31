import{r as b,j as t}from"./react-kX_YxI4E.js";import{u as P,bz as Q,k2 as X,f8 as Y,o as Z,b$ as _}from"./index-BdZ3b4Wv.js";import{s as m}from"./AccessibleColors-CpFdCUc0.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DEg4IKXU.js";import"./react-router-dom-ZPAD5XPx.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const gs=({language:C,block:r,fontSize:j,updateColor:c,width:V,hexToRGB:L,hslToRGB:B,rgbToHex:W,rgbToHSL:R})=>{const M=P(),U=/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i,O=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,q=/^#([0-9A-F]{3}){1,2}$/i,D=[{value:"hsl",label:"HSL"},{value:"rgb",label:"RGB"},{value:"hex",label:"Hex"}],[h,J]=b.useState(D.find(s=>s.value===r.colorFormat)||D[0]),[I,f]=b.useState(""),[u,N]=b.useState(0),[o,v]=b.useState(0),[x,y]=b.useState(0),[$,F]=b.useState(0),[d,E]=b.useState(0),[g,S]=b.useState(0);b.useEffect(()=>{switch(r.colorFormat){case"hex":{f(r.color);const{r:s,g:e,b:n}=L(r.color);N(s),v(e),y(n);const{h:a,s:i,l}=R(s,e,n);F(a),E(i),S(l);break}case"rgb":{const s=r.color.match(O);if(s){const e=Number(s[1]),n=Number(s[2]),a=Number(s[3]);N(e),v(n),y(a);const{h:i,s:l,l:p}=R(e,n,a);F(i),E(l),S(p)}break}case"hsl":{const s=r.color.match(U);if(s){const e=Number(s[1]),n=Number(s[2]),a=Number(s[3]);F(e),E(n),S(a);const{r:i,g:l,b:p}=B(e,n,a);N(i),v(l),y(p);const w=W(i,l,p);f(w)}break}}},[r.color,r.colorFormat]);const K=s=>{try{let e;if(s==="hex")if(q.test(I)){e=I.toUpperCase(),c(r.id,e,"hex");const{r:n,g:a,b:i}=L(e);N(n),v(a),y(i);const{h:l,s:p,l:w}=R(n,a,i);F(l),E(p),S(w),c(r.id,I,"hex")}else throw new Error("Invalid Hex format.");else if(s==="rgb")if(u>=0&&u<=255&&o>=0&&o<=255&&x>=0&&x<=255){e=`rgb(${u}, ${o}, ${x})`,c(r.id,e,"rgb");const n=W(u,o,x);f(n);const{h:a,s:i,l}=R(u,o,x);F(a),E(i),S(l),c(r.id,`rgb(${u}, ${o}, ${x})`,"rgb")}else throw new Error("Invalid RGB values.");else if(s==="hsl")if($>=0&&$<=360&&d>=0&&d<=100&&g>=0&&g<=100){e=`hsl(${$}, ${d}%, ${g}%)`,c(r.id,e,"hsl");const{r:n,g:a,b:i}=B($,d,g);N(n),v(a),y(i);const l=W(n,a,i);f(l),c(r.id,`hsl(${$}, ${d}%, ${g}%)`,"hsl")}else throw new Error("Invalid HSL values.");else throw new Error("Unsupported color format.")}catch(e){console.error(e.message),M(Z(_[C]+" "+e.message,!0,4))}},G=s=>{s.preventDefault(),K(h==null?void 0:h.value)},A=(s,e)=>{s==="h"&&F(e),s==="s"&&E(e),s==="l"&&S(e);const n=s==="h"?e:$,a=s==="s"?e:d,i=s==="l"?e:g;if(n>=0&&n<=360&&a>=0&&a<=100&&i>=0&&i<=100){const{r:l,g:p,b:w}=B(n,a,i);N(l),v(p),y(w),c(r.id,`hsl(${n}, ${a}%, ${i}%)`,"hsl"),f(W(l,p,w))}},H=(s,e)=>{s==="r"&&N(e),s==="g"&&v(e),s==="b"&&y(e);const n=s==="r"?e:u,a=s==="g"?e:o,i=s==="b"?e:x;if([n,a,i].every(l=>l>=0&&l<=255)){const{h:l,s:p,l:w}=R(n,a,i);F(l),E(p),S(w),c(r.id,`rgb(${n}, ${a}, ${i})`,"rgb"),f(W(n,a,i))}};return t.jsxs(t.Fragment,{children:[t.jsx(Q,{hideDelete:!0,id:"color-select",className:m["color-select"],language:C,instructions:X[C],hide:!0,options:D,value:h,z:1,onChange:s=>{if(J(s),(s==null?void 0:s.value)==="hex"){const e=W(u,o,x);f(e),c(r.id,e,"hex")}else(s==null?void 0:s.value)==="rgb"?(N(u),v(o),y(x),c(r.id,`rgb(${u}, ${o}, ${x})`,"rgb")):(s==null?void 0:s.value)==="hsl"&&(F($),E(d),S(g),c(r.id,`hsl(${$}, ${d}%, ${g}%)`,"hsl"))}}),(h==null?void 0:h.value)==="hex"&&t.jsxs("form",{className:m.form,onSubmit:G,children:[t.jsx("div",{className:`${m.inputs} ${m["hex-input"]}`,children:t.jsxs("label",{children:[t.jsx("span",{children:"Hex: "}),t.jsx("input",{name:`hex-input-${r.id}`,type:"text",value:I,onChange:s=>f(s.target.value),className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j},placeholder:"#FFFFFF"})]})}),t.jsx("button",{style:{minWidth:"calc(100% - 4px)",maxWidth:"calc(100% - 4px)",fontSize:j},type:"submit",className:`${m["color-format-submit"]} small gray`,children:Y[C]})]}),(h==null?void 0:h.value)==="rgb"&&t.jsxs("form",{className:`${m.inputs} ${m["rgb-inputs"]}`,onSubmit:G,children:[t.jsxs("label",{children:[t.jsx("span",{children:"R: "}),t.jsx("input",{name:`r-input-${r.id}`,type:"number",value:u,onChange:s=>H("r",Number(s.target.value)),min:0,max:255,className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j}})]}),t.jsxs("label",{children:[t.jsx("span",{children:"G: "}),t.jsx("input",{name:`g-input-${r.id}`,type:"number",value:o,onChange:s=>H("g",Number(s.target.value)),min:0,max:255,className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j}})]}),t.jsxs("label",{children:[t.jsx("span",{children:"B: "}),t.jsx("input",{name:`b-input-${r.id}`,type:"number",value:x,onChange:s=>H("b",Number(s.target.value)),min:0,max:255,className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j}})]})]}),(h==null?void 0:h.value)==="hsl"&&t.jsxs("form",{className:`${m.inputs} ${m["hsl-inputs"]}`,onSubmit:G,children:[t.jsxs("label",{children:[t.jsx("span",{children:"H: "}),t.jsx("input",{name:`h-input-${r.id}`,type:"number",value:$,onChange:s=>A("h",Number(s.target.value)),min:0,max:360,className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j}})]}),t.jsxs("label",{children:[t.jsx("span",{children:"S: "}),t.jsx("input",{name:`s-input-${r.id}`,type:"number",value:d,onChange:s=>A("s",Number(s.target.value)),min:0,max:100,className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j}})]}),t.jsxs("label",{children:[t.jsx("span",{children:"L: "}),t.jsx("input",{name:`l-input-${r.id}`,type:"number",value:g,onChange:s=>A("l",Number(s.target.value)),min:0,max:100,className:m["color-input"],style:{maxWidth:`${V}`,fontSize:j}})]})]})]})};export{gs as default};