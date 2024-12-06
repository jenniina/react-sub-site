import{r as B,j as o}from"./react-A9DAvxly.js";import{K as le,S as xe,f3 as fe,f4 as Lt,W as pt,bd as St,c$ as $e,f5 as Ce,u as wt,bX as _e,f6 as be,f7 as we,f8 as ye,f9 as Re,fa as ve,z as je,A as Ne,fb as Te,fc as Ee,ap as Ie,fd as Se,fe as Ue,ff as Fe,fg as Le,fh as Be,fi as vt,fj as yt,fk as oe,fl as Y,d9 as De,fm as Me,fn as Ge,ax as We,ay as ke,fo as ze,fp as He,fq as Oe,fr as Ve,bC as re,fs as Pe,ft as Je,fu as jt,br as se,fv as Xe,fw as Ye}from"./index-OV4e8cjy.js";import{a2 as ne,a3 as qe,a4 as Ke}from"./react-icons-BXtkaQB_.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const Qe="_light_xgcdz_39",Ze="_drag_xgcdz_221",to="_overflow_xgcdz_235",eo="_indicator_xgcdz_343",oo="_tooltip_xgcdz_343",ro="_form_xgcdz_511",so="_remove_xgcdz_539",no="_inputs_xgcdz_569",m={"color-container":"_color-container_xgcdz_1",light:Qe,"color-picker":"_color-picker_xgcdz_57","width-wrap":"_width-wrap_xgcdz_109","btn-wrap":"_btn-wrap_xgcdz_123","info-wrap":"_info-wrap_xgcdz_141","color-blocks":"_color-blocks_xgcdz_189",drag:Ze,overflow:to,"block-wrap":"_block-wrap_xgcdz_243","color-wrap":"_color-wrap_xgcdz_261","color-block":"_color-block_xgcdz_189","compliance-indicators":"_compliance-indicators_xgcdz_321",indicator:eo,tooltip:oo,"indicator-aaa":"_indicator-aaa_xgcdz_373","indicator-null":"_indicator-null_xgcdz_381","compliance-info":"_compliance-info_xgcdz_389","toggle-controls":"_toggle-controls_xgcdz_397","color-edit-container":"_color-edit-container_xgcdz_427","color-select":"_color-select_xgcdz_429","mode-container":"_mode-container_xgcdz_485",form:ro,"color-format-submit":"_color-format-submit_xgcdz_537",remove:so,"color-name":"_color-name_xgcdz_553",inputs:no,"hex-input":"_hex-input_xgcdz_591"},lo=({language:p,block:f,fontSize:N,updateColor:z,width:T,hexToRGB:xt,hslToRGB:H,rgbToHex:q,rgbToHSL:I})=>{const S=le(),K=/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i,Q=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,D=/^#([0-9A-F]{3}){1,2}$/i,P=[{value:"hsl",label:"HSL"},{value:"rgb",label:"RGB"},{value:"hex",label:"Hex"}],[R,ft]=B.useState(P.find(i=>i.value===f.colorFormat)||P[0]),[y,Z]=B.useState(""),[lt,at]=B.useState(0),[it,ct]=B.useState(0),[ot,J]=B.useState(0),[mt,h]=B.useState(0),[tt,M]=B.useState(0),[dt,G]=B.useState(0);B.useEffect(()=>{switch(f.colorFormat){case"hex":{Z(f.color);const{r:i,g:x,b:g}=xt(f.color);at(i),ct(x),J(g);const{h:v,s:C,l:E}=I(i,x,g);h(v),M(C),G(E);break}case"rgb":{const i=f.color.match(Q);if(i){const x=Number(i[1]),g=Number(i[2]),v=Number(i[3]);at(x),ct(g),J(v);const{h:C,s:E,l:W}=I(x,g,v);h(C),M(E),G(W)}break}case"hsl":{const i=f.color.match(K);if(i){const x=Number(i[1]),g=Number(i[2]),v=Number(i[3]);h(x),M(g),G(v);const{r:C,g:E,b:W}=H(x,g,v);at(C),ct(E),J(W);const rt=q(C,E,W);Z(rt)}break}}},[]);const O=i=>{i.preventDefault();const x=R==null?void 0:R.value;try{let g;if(x==="hex")if(D.test(y))g=y.toUpperCase(),z(f.id,g,"hex");else throw new Error("Invalid Hex format.");else if(x==="rgb")if(lt>=0&&lt<=255&&it>=0&&it<=255&&ot>=0&&ot<=255)g=`rgb(${lt}, ${it}, ${ot})`,z(f.id,g,"rgb");else throw new Error("Invalid RGB values.");else if(x==="hsl")if(mt>=0&&mt<=360&&tt>=0&&tt<=100&&dt>=0&&dt<=100)g=`hsl(${mt}, ${tt}%, ${dt}%)`,z(f.id,g,"hsl");else throw new Error("Invalid HSL values.");else throw new Error("Unsupported color format.")}catch(g){console.error(g.message),S(pt(St[p]+" "+g.message,!0,4))}},ht=(i,x)=>{i==="h"&&h(x),i==="s"&&M(x),i==="l"&&G(x);const g=i==="h"?x:mt,v=i==="s"?x:tt,C=i==="l"?x:dt;if(g>=0&&g<=360&&v>=0&&v<=100&&C>=0&&C<=100){const{r:E,g:W,b:rt}=H(g,v,C);at(E),ct(W),J(rt),z(f.id,`hsl(${g}, ${v}%, ${C}%)`,"hsl"),Z(q(E,W,rt))}},$t=(i,x)=>{i==="r"&&at(x),i==="g"&&ct(x),i==="b"&&J(x);const g=i==="r"?x:lt,v=i==="g"?x:it,C=i==="b"?x:ot;if([g,v,C].every(E=>E>=0&&E<=255)){const{h:E,s:W,l:rt}=I(g,v,C);h(E),M(W),G(rt),z(f.id,`rgb(${g}, ${v}, ${C})`,"rgb"),Z(q(g,v,C))}};return o.jsxs(o.Fragment,{children:[o.jsx(xe,{hideDelete:!0,id:"color-select",className:m["color-select"],language:p,instructions:fe[p],hide:!0,options:P,value:R,onChange:i=>{ft(i)}}),(R==null?void 0:R.value)==="hex"&&o.jsxs("form",{className:m.form,onSubmit:O,children:[o.jsx("div",{className:`${m.inputs} ${m["hex-input"]}`,children:o.jsxs("label",{children:[o.jsx("span",{children:"Hex: "}),o.jsx("input",{name:`hex-input-${f.id}`,type:"text",value:y,onChange:i=>Z(i.target.value),className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N},placeholder:"#FFFFFF"})]})}),o.jsx("button",{style:{minWidth:"calc(100% - 4px)",maxWidth:"calc(100% - 4px)",fontSize:N},type:"submit",className:`${m["color-format-submit"]} small gray`,children:Lt[p]})]}),(R==null?void 0:R.value)==="rgb"&&o.jsxs("form",{className:`${m.inputs} ${m["rgb-inputs"]}`,onSubmit:O,children:[o.jsxs("label",{children:[o.jsx("span",{children:"R: "}),o.jsx("input",{name:`r-input-${f.id}`,type:"number",value:lt,onChange:i=>$t("r",Number(i.target.value)),min:0,max:255,className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N}})]}),o.jsxs("label",{children:[o.jsx("span",{children:"G: "}),o.jsx("input",{name:`g-input-${f.id}`,type:"number",value:it,onChange:i=>$t("g",Number(i.target.value)),min:0,max:255,className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N}})]}),o.jsxs("label",{children:[o.jsx("span",{children:"B: "}),o.jsx("input",{name:`b-input-${f.id}`,type:"number",value:ot,onChange:i=>$t("b",Number(i.target.value)),min:0,max:255,className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N}})]}),o.jsx("button",{style:{minWidth:"calc(100% - 4px)",maxWidth:"calc(100% - 4px)",fontSize:N},type:"submit",className:`${m["color-format-submit"]} small gray`,children:Lt[p]})]}),(R==null?void 0:R.value)==="hsl"&&o.jsxs("form",{className:`${m.inputs} ${m["hsl-inputs"]}`,onSubmit:O,children:[o.jsxs("label",{children:[o.jsx("span",{children:"H: "}),o.jsx("input",{name:`h-input-${f.id}`,type:"number",value:mt,onChange:i=>ht("h",Number(i.target.value)),min:0,max:360,className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N}})," "]}),o.jsxs("label",{children:[o.jsx("span",{children:"S: "}),o.jsx("input",{name:`s-input-${f.id}`,type:"number",value:tt,onChange:i=>ht("s",Number(i.target.value)),min:0,max:100,className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N}})]}),o.jsxs("label",{children:[o.jsx("span",{children:"L: "}),o.jsx("input",{name:`l-input-${f.id}`,type:"number",value:dt,onChange:i=>ht("l",Number(i.target.value)),min:0,max:100,className:m["color-input"],style:{maxWidth:`${T}`,fontSize:N}})]}),o.jsx("button",{style:{minWidth:"calc(100% - 4px)",maxWidth:"calc(100% - 4px)",fontSize:N},type:"submit",className:`${m["color-format-submit"]} small gray`,children:Lt[p]})]})]})},At=Ve(5),Ut=["analogous","complementary","triad","monochromatic"];let Bt=Math.floor(Math.random()*Ut.length);const Et=(p,f)=>{const N=I=>{let S,K,Q;if(I.colorFormat==="hex")({r:S,g:K,b:Q}=vt(I.color));else if(I.colorFormat==="rgb"){const D=I.color.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(D)S=Number(D[1]),K=Number(D[2]),Q=Number(D[3]);else throw new Error("Invalid RGB format")}else if(I.colorFormat==="hsl"){const D=I.color.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(D){const P=Number(D[1]),R=Number(D[2]),ft=Number(D[3]);({r:S,g:K,b:Q}=Y(P,R,ft))}else throw new Error("Invalid HSL format")}else throw new Error("Unsupported color format");return{r:S,g:K,b:Q}},z=N(p),T=N(f),xt=jt(z.r,z.g,z.b),H=jt(T.r,T.g,T.b),q=Xe(xt,H);return{isAAARegularTextCompliant:q>=7,isAARegularTextCompliant:q>=4.5,isAAUIComponentsCompliant:q>=3}},$="colors",Rt="hsl",It=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:$,colorFormat:Rt,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:$,colorFormat:Rt,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:$,colorFormat:Rt,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:$,colorFormat:Rt,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:$,colorFormat:Rt,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],vo=({language:p})=>{var Dt,Mt,Gt,Wt,kt;const f=le(),N=$e(),z=Ce(),[T,xt]=B.useState(!0),[H,q]=wt("Jenniina-showColorNames",!0),[I,S,K]=wt("Jenniina-colorsAccessibility",It),[Q,D]=wt("Jenniina-currentColor","#7D7D7D"),[P,R]=wt("Jenniina-idCounter",1),{isDragging:ft,listItemsByStatus:y,handleDragging:Z,handleUpdate:lt}=_e(I,[$]),at=B.useRef(0),[it,ct]=B.useState(0),ot=8,[J,mt]=wt("Jenniina-color-block-width",ot),h=`${J}em`,tt=J/ot,M={tooltip:`${.7*tt}em`,colorName:`${.7*tt}em`,input:`${.8*tt}em`},dt=(t,r)=>{const s=Et(t,r);return s.isAAARegularTextCompliant&&(t.compliantColors.AAA_RegularText.push(r.id),r.compliantColors.AAA_RegularText.push(t.id)),s.isAARegularTextCompliant&&(t.compliantColors.AA_RegularText.push(r.id),r.compliantColors.AA_RegularText.push(t.id)),s.isAAUIComponentsCompliant&&(t.compliantColors.AA_UIComponents.push(r.id),r.compliantColors.AA_UIComponents.push(t.id)),t.compliantColors.AAA_RegularText=Array.from(new Set(t.compliantColors.AAA_RegularText)),t.compliantColors.AA_RegularText=Array.from(new Set(t.compliantColors.AA_RegularText)),t.compliantColors.AA_UIComponents=Array.from(new Set(t.compliantColors.AA_UIComponents)),r.compliantColors.AAA_RegularText=Array.from(new Set(r.compliantColors.AAA_RegularText)),r.compliantColors.AA_RegularText=Array.from(new Set(r.compliantColors.AA_RegularText)),r.compliantColors.AA_UIComponents=Array.from(new Set(r.compliantColors.AA_UIComponents)),{updatedColor1:t,updatedColor2:r}},G=()=>Math.floor(Math.random()*256),O=()=>Math.floor(Math.random()*101),[ht,$t]=B.useState(Ut[Bt]),i=Math.floor(Math.random()*10)+10,x=(t,r)=>{const s=[];switch(t){case"analogous":for(let n=1;n<=4;n++){const l=(r.l+i*n)%100,d=[(r.h+30*n)%360,O(),l],c=Y(...d);s.push([c.r,c.g,c.b])}break;case"complementary":const e=[(r.h+180)%360,O(),O()],a=Y(...e);s.push([a.r,a.g,a.b]);for(let n=1;n<=3;n++){const l=(r.l+i*n)%100,d=[(e[0]+30*n)%360,O(),l],c=Y(...d);s.push([c.r,c.g,c.b])}break;case"triad":for(let n=1;n<=4;n++){const l=(r.l+i*n)%100,d=[(r.h+90*n)%360,O(),l],c=Y(...d);s.push([c.r,c.g,c.b])}break;case"monochromatic":for(let n=1;n<=4;n++){const l=(r.l+i*n)%100,d=[r.h,O(),l],c=Y(...d);s.push([c.r,c.g,c.b])}break;default:for(let n=1;n<=4;n++){const l=(r.l+i*n)%100,d=[(r.h+30*n)%360,O(),l],c=Y(...d);s.push([c.r,c.g,c.b])}break}return s},g=t=>{const r=[];if(t.length===0){const s=[G(),G(),G()];r.push(s);const e=yt(s[0],s[1],s[2]),a=x(ht,e);return r.push(...a),r}else{const s=t[t.length-1];let e;try{if(s.colorFormat==="hex")e=vt(s.color);else if(s.colorFormat==="rgb"){const l=s.color.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(l)e={r:Number(l[1]),g:Number(l[2]),b:Number(l[3])};else throw new Error("Invalid RGB format")}else if(s.colorFormat==="hsl"){const l=s.color.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(l){const d=Number(l[1]),c=Number(l[2]),A=Number(l[3]);e=Y(d,c,A)}else throw new Error("Invalid HSL format")}else throw new Error("Unsupported color format");const a=yt(e.r,e.g,e.b),n=x(ht,a);r.push(...n.slice(0,2))}catch(a){console.error("Error generating new colors:",a);for(let n=0;n<2;n++)r.push([G(),G(),G()])}}return r.slice(0,t.length+2)},v=()=>{const r=g(I).map((e,a)=>{const[n,l,d]=e,c=yt(n,l,d),A=jt(n,l,d);return{id:P+a,color:`hsl(${c.h}, ${c.s}%, ${c.l}%)`,luminance:A,status:$,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let s=[...I,...r];s=s.map(e=>(r.forEach(a=>{const{updatedColor1:n,updatedColor2:l}=dt(e,a);e=n,a=l}),e)),S(s),R(P+r.length),Bt=Math.floor(Math.random()*Ut.length),$t(Ut[Bt])},C=(t,r)=>{if(r==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(r==="rgb"){const s=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(s){const e=Number(s[1]),a=Number(s[2]),n=Number(s[3]);if([e,a,n].every(l=>l>=0&&l<=255))return oe(e,a,n);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(r==="hsl"){const s=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(s){const e=Number(s[1]),a=Number(s[2]),n=Number(s[3]);if([e,a,n].every((l,d)=>d===0?l>=0&&l<=360:l>=0&&l<=100))return Ye(e,a,n);throw new Error(`HSL values out of range in color: ${t}`)}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${r}`)},E={AA_RegularText:({xPosition:t,yIndicator:r,blockWidth:s,indicatorSize:e,otherColor:a,blockColor:n,colorFormatBlock:l,colorFormatOther:d})=>{const c=C(n,l),A=C(a,d);return`
 <circle
  cx="${t+s/2}"
  cy="${r+e/2}"
  r="${e*.32}"
  fill="${c}"
  stroke="${A}"
  stroke-width="${e*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:r,blockWidth:s,indicatorSize:e,otherColor:a,blockColor:n,colorFormatBlock:l,colorFormatOther:d})=>{const c=C(n,l),A=C(a,d);return`
    <rect
  x="${t+s/2-e*.2}"
  y="${r+e/2-e*.15}"
  width="${e*.3}"
  height="${e*.3}"
  fill="${c}"
  stroke="${A}"
  stroke-width="${e*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:r,blockWidth:s,indicatorSize:e,otherColor:a,blockColor:n,colorFormatBlock:l,colorFormatOther:d})=>{const c=C(a,d);return`
<circle
  cx="${t+s/2}"
  cy="${r+e/2}"
  r="${e/2}"
  fill="${c}"
  stroke="none"
/>
`}},W=()=>{var zt,Ht,Ot,Vt,Pt,Jt,Xt,Yt,qt;const t=J*20,r=t,s=r/3,e=s/1.5,a=t/4,n=s/20,l=r/10,c=((Ht=(zt=y[$])==null?void 0:zt.items)==null?void 0:Ht.length)*(s+e)-e+a*2,A=H?l+a:0,k=((Ot=y[$])==null?void 0:Ot.items.length)*r,V=c+A*1.6,u=(Pt=(Vt=y[$])==null?void 0:Vt.items)==null?void 0:Pt.map((L,Ct)=>{const gt=Ct*r;let nt;try{nt=C(L.color,L.colorFormat)}catch(_t){console.error(_t),f(pt(`${St[p]}: ${_t.message}`,!0,4)),nt="#000000"}const Nt=`
        <rect
          x="${gt}"
          y="0"
          width="${r}"
          height="${c}"
          fill="${nt}"
          stroke="none"
        />
      `,Tt=H?`
        <!-- Text Background -->
        <rect
          x="${gt}"
          y="${c-.5}"
          width="${r}"
          height="${A}"
          fill="${nt}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${gt+r/2}"
          y="${c+A/2+l/3}"
          font-size="${l}"
          font-family="Arial"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${L.luminance>.179?"#000000":"#FFFFFF"}"
          stroke="none"
        >
          ${L.color}
        </text>
      `:"";return`
        <g>
          <!-- Color Block -->
          ${Nt}
          <!-- Color Text Label -->
          ${Tt}
        </g>
      `}).join(""),b=(Xt=(Jt=y[$])==null?void 0:Jt.items)==null?void 0:Xt.map((L,Ct)=>{const nt=a+Ct*(s+e)+(s-n)/2,Nt=C(L.color,L.colorFormat);return`
        <rect
          x="0"
          y="${nt}"
          width="${k}"
          height="${n}"
          fill="${Nt}"
          stroke="none"
        />
      `}).join(""),w=(qt=(Yt=y[$])==null?void 0:Yt.items)==null?void 0:qt.map((L,Ct)=>{var Tt,_t;const gt=Ct*r,nt=X=>{var bt,Kt,Qt,Zt,te,ee;return(Kt=(bt=L.compliantColors)==null?void 0:bt.AAA_RegularText)!=null&&Kt.includes(X)?"AAA_RegularText":(Zt=(Qt=L.compliantColors)==null?void 0:Qt.AA_RegularText)!=null&&Zt.includes(X)?"AA_RegularText":(ee=(te=L.compliantColors)==null?void 0:te.AA_UIComponents)!=null&&ee.includes(X)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${(_t=(Tt=y[$])==null?void 0:Tt.items)==null?void 0:_t.filter(X=>X.id!==L.id).map(X=>{const bt=nt(X.id);return bt?E[bt]({xPosition:gt,yIndicator:a+(X.id-1)*(s+e),blockWidth:r,indicatorSize:s,otherColor:X.color,blockColor:L.color,colorFormatBlock:L.colorFormat,colorFormatOther:X.colorFormat}):""}).join("")}
        </g>
      `}).join(""),_=10,j=k-_,U=V-_*1.5,F="https://colors.jenniina.fi",ut=`
      <a href="${F}" target="_blank" rel="noopener noreferrer">
        <text
          x="${j}"
          y="${U}"
          font-size="${l}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${F}
        </text>
      </a>
    `,st=`
      <a href="${F}" target="_blank" rel="noopener noreferrer">
        <text
          x="${_}"
          y="${U}"
          font-size="${l}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${F}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${k}" height="${V}">
      <!-- Color Blocks -->
      <g>
        ${u}
      </g>
      <!-- Lines -->
      <g>
        ${b}
      </g>
      <!-- Compliance Indicators -->
      <g>
        ${w}
      </g>
      <!-- Source Link -->
      <g>
        ${st}
      </g>
      <g>
        ${ut}
      </g>
    </svg>
  `,svgWidth:k,svgHeight:V}},rt=()=>{const{svgContent:t}=W(),r=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(r),e=document.createElement("a");e.href=s,e.download="color-blocks.svg",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(s),f(pt(re[p],!1,5))},ae=()=>{const{svgContent:t,svgWidth:r,svgHeight:s}=W(),e=new Image;e.width=r,e.height=s;const a=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),n=URL.createObjectURL(a);e.onload=()=>{const l=document.createElement("canvas");l.width=r,l.height=s;const d=l.getContext("2d");d==null||d.drawImage(e,0,0);const c=l.toDataURL("image/png"),A=document.createElement("a");A.href=c,A.download="color-blocks.png",document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(n),f(pt(re[p],!1,5))},e.onerror=l=>{console.error("Error loading SVG into image for PNG conversion:",l),URL.revokeObjectURL(n),f(pt(St[p],!0,4))},e.src=n},ie=()=>{var A,k,V;const{r:t,g:r,b:s}=vt(Q),{h:e,s:a,l:n}=yt(t,r,s),l=jt(t,r,s),d={id:P,color:`hsl(${e}, ${a}%, ${n}%)`,luminance:l,status:$,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}};(k=(A=y[$])==null?void 0:A.items)==null||k.forEach(u=>{var w,_,j,U,F,ut,st,et;const b=Et(d,u);b.isAAARegularTextCompliant?((w=d.compliantColors)==null||w.AAA_RegularText.push(u.id),(_=u.compliantColors)==null||_.AAA_RegularText.push(d.id)):b.isAARegularTextCompliant?((j=d.compliantColors)==null||j.AA_RegularText.push(u.id),(U=u.compliantColors)==null||U.AA_RegularText.push(d.id)):b.isAAUIComponentsCompliant&&((ut=(F=d.compliantColors)==null?void 0:F.AA_UIComponents)==null||ut.push(u.id),(et=(st=u.compliantColors)==null?void 0:st.AA_UIComponents)==null||et.push(d.id))});const c=(V=y[$])==null?void 0:V.items.map(u=>{var b,w,_;return{...u,compliantColors:{AAA_RegularText:Array.from(new Set((b=u.compliantColors)==null?void 0:b.AAA_RegularText)),AA_RegularText:Array.from(new Set((w=u.compliantColors)==null?void 0:w.AA_RegularText)),AA_UIComponents:Array.from(new Set((_=u.compliantColors)==null?void 0:_.AA_UIComponents))}}});R(P+1),S([...c,d])},ce=t=>{var r;if(window.confirm(Pe[p])){const s=(r=y[$])==null?void 0:r.items.filter(e=>e.id!==t).map(e=>{var a,n,l,d;return{...e,compliantColors:{AAA_RegularText:(a=e.compliantColors)==null?void 0:a.AAA_RegularText.filter(c=>c!==t),AA_RegularText:(n=e.compliantColors)==null?void 0:n.AA_RegularText.filter(c=>c!==t),AA_UIComponents:(d=(l=e.compliantColors)==null?void 0:l.AA_UIComponents)==null?void 0:d.filter(c=>c!==t)}}});S(s),f(pt(Je[p],!1,5))}},me=(t,r,s)=>{var e;try{let a,n,l,d;if(s==="hsl"){const u=r.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!u)throw new Error("Invalid HSL format");const b=Number(u[1]),w=Number(u[2]),_=Number(u[3]);if(b<0||b>360||w<0||w>100||_<0||_>100)throw new Error("HSL values out of range");a=`hsl(${b}, ${w}%, ${_}%)`;const j=Y(b,w,_);n=j.r,l=j.g,d=j.b}else if(s==="rgb"){const u=r.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!u)throw new Error("Invalid RGB format");const b=Number(u[1]),w=Number(u[2]),_=Number(u[3]);if([b,w,_].some(j=>j<0||j>255))throw new Error("RGB values must be between 0 and 255");a=`rgb(${b}, ${w}, ${_})`,n=b,l=w,d=_}else if(s==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test(r))throw new Error("Invalid Hex format");a=r.toUpperCase();const u=vt(a);n=u.r,l=u.g,d=u.b}else throw new Error("Unsupported color format");const c=jt(n,l,d),A=(e=y[$])==null?void 0:e.items.map(u=>{var b,w,_,j,U,F,ut;if(u.id===t)return{...u,color:a,colorFormat:s,luminance:c,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}};{const st=Et(u,{id:t,color:a,colorFormat:s,luminance:c,status:u.status,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}});return{...u,compliantColors:{AAA_RegularText:st.isAAARegularTextCompliant?[...new Set([...(b=u.compliantColors)==null?void 0:b.AAA_RegularText,t])]:(w=u.compliantColors)==null?void 0:w.AAA_RegularText.filter(et=>et!==t),AA_RegularText:st.isAARegularTextCompliant?[...new Set([...(_=u.compliantColors)==null?void 0:_.AA_RegularText,t])]:(j=u.compliantColors)==null?void 0:j.AA_RegularText.filter(et=>et!==t),AA_UIComponents:st.isAAUIComponentsCompliant?[...new Set([...(U=u.compliantColors)==null?void 0:U.AA_UIComponents,t])]:(ut=(F=u.compliantColors)==null?void 0:F.AA_UIComponents)==null?void 0:ut.filter(et=>et!==t)}}}}),k=(u,b)=>{let w=[],_=[],j=[];return b.forEach(U=>{if(U.id===u.id)return;const F=Et(u,U);F.isAAARegularTextCompliant&&w.push(U.id),F.isAARegularTextCompliant&&j.push(U.id),F.isAAUIComponentsCompliant&&_.push(U.id)}),{AAA_RegularText:Array.from(new Set(w)),AA_RegularText:Array.from(new Set(j)),AA_UIComponents:Array.from(new Set(_))}},V=A.findIndex(u=>u.id===t);if(V!==-1){const u=k(A[V],A);A[V]={...A[V],compliantColors:u}}S([...A])}catch(a){console.error("Error updating color:",a),f(pt(`${St[p]}: ${a.message}`,!0,4))}},de=(t,r)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:r}))},ue=(t,r)=>{t.preventDefault(),ct(r),at.current=r},pe=t=>{t.preventDefault(),Z(!0)},he=t=>{const r=JSON.parse(t.dataTransfer.getData("text/plain"));r.type==="item"&&(lt(r.id,$,it),Z(!1))};B.useEffect(()=>{var t,r;(!((t=y[$])!=null&&t.items)||((r=y[$])==null?void 0:r.items.length)<1)&&S(It)},[]);const ge=()=>{window.confirm(se[p])&&(K(),S([]),R(1))},Ae=()=>{window.confirm(se[p])&&(K(),S(It),R(It.length+1))},Ft=.04;return o.jsxs("div",{id:m["color-container"],className:`${m["color-container"]} ${N?m.light:""}`,style:{"--font-size":M.input},children:[o.jsx("div",{id:"info",className:m["info-wrap"],children:o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),o.jsx("span",{children:be[p]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),o.jsx("span",{children:we[p]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),o.jsx("span",{children:ye[p]})]})]})}),o.jsxs("div",{className:m["btn-wrap"],children:[((Mt=(Dt=y[$])==null?void 0:Dt.items)==null?void 0:Mt.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{type:"button",onClick:ae,className:"gray small",children:[Re[p],"  ",o.jsx(ne,{})]}),o.jsxs("button",{type:"button",onClick:rt,className:"gray small",children:[ve[p],"  ",o.jsx(ne,{})]})]}),o.jsx("button",{onClick:z,className:"gray small",children:N?o.jsxs(o.Fragment,{children:[je[p],"  ",o.jsx(qe,{})]}):o.jsxs(o.Fragment,{children:[Ne[p],"  ",o.jsx(Ke,{})," "]})})]}),o.jsxs("div",{className:m["color-picker"],children:[o.jsxs("label",{htmlFor:"color-input",className:" ",children:[Te[p],":"]}),o.jsx("input",{id:"color-input",type:"color",value:Q,onChange:t=>D(t.target.value)}),o.jsx("button",{className:"gray small",type:"button",onClick:ie,children:Ee[p]}),o.jsx("button",{className:"gray small",type:"button",onClick:Ae,children:Ie[p]}),o.jsx("button",{className:"gray small",type:"button",onClick:ge,children:Se[p]}),o.jsx("button",{className:"gray small",type:"button",onClick:v,children:Ue[p]})]}),o.jsx("div",{id:"color-blocks",className:`${m["color-blocks"]} ${!H||!T?m.overflow:""} ${ft?m.drag:""}`,children:(Gt=y[$])==null?void 0:Gt.items.map(t=>{var r,s;return o.jsx("ul",{className:m["block-wrap"],onDrop:he,children:o.jsxs("li",{className:m["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${h}`,maxWidth:`${h}`},children:[o.jsx("ul",{children:o.jsx("li",{draggable:"true",onDragStart:e=>de(e,t.id),onDragEnter:e=>ue(e,t.id),onDragOver:e=>pe(e),onDragEnd:()=>Z(!1),"data-identity":t.id,className:m["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${h}`,maxWidth:`${h}`,height:`calc(calc(${h} * 0.6) * ${(r=y[$])==null?void 0:r.items.length})`},children:o.jsx("div",{className:m["compliance-indicators"],style:{gap:`calc(${h} / 4)`,"--width-full":`${h}`},children:(s=y[$])==null?void 0:s.items.map(e=>{var n,l,d,c,A,k;if(e.id===t.id)return o.jsx("div",{className:`${m["indicator-null"]} ${m.indicator}`,style:{"--color":e.color,"--width":`calc(${h} / 3)`,"--left":`calc(calc(${h} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${h} / 3)`,height:`calc(${h} / 3)`}},`none-${e.color}-${e.id}`);let a=null;return(l=(n=t.compliantColors)==null?void 0:n.AAA_RegularText)!=null&&l.includes(e.id)?a="AAA_RegularText":(c=(d=t.compliantColors)==null?void 0:d.AA_RegularText)!=null&&c.includes(e.id)?a="AA_RegularText":(k=(A=t.compliantColors)==null?void 0:A.AA_UIComponents)!=null&&k.includes(e.id)&&(a="AA_UIComponents"),a==="AAA_RegularText"?o.jsx("div",{tabIndex:0,className:`${m["indicator-aaa"]} ${m.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:e.color,"--left":`calc(calc(${h} / 3) * -1)`,width:`calc(${h} / 3)`,height:`calc(${h} / 3)`},"aria-labelledby":`span-${e.id}-${t.id}-${At}`,children:o.jsx("span",{id:`span-${e.id}-${t.id}-${At}`,className:`tooltip below narrow3 ${m.tooltip}`,style:{fontSize:`clamp(0.7rem, ${M.input}, 0.9rem)`,"--tooltip-max-width":h},children:`${Fe[p]}: ${e.id}`})},`aaa-${e.color}-${e.id}`):a==="AA_RegularText"?o.jsx("div",{tabIndex:0,className:`${m["indicator-aa"]} ${m.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:t.color,outline:`calc(${h} * ${Ft*1.1}) solid ${e.color}`,outlineOffset:`calc(${h} * -0.013)`,"--left":`calc(calc(${h} / 5) * -2)`,width:`calc(${h} / 5)`,height:`calc(${h} / 5)`,margin:`calc(${h} / 15)`,borderRadius:"50%"},"aria-labelledby":`span-${e.id}-${t.id}-${At}`,children:o.jsx("span",{id:`span-${e.id}-${t.id}-${At}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${M.input}, 0.9rem)`,"--tooltip-max-width":h},children:`${Le[p]}: ${e.id}`})},`aa-${e.color}-${e.id}`):a==="AA_UIComponents"?o.jsx("div",{tabIndex:0,className:`${m["indicator-aa-ui"]} ${m.indicator} tooltip-wrap`,style:{"--color":e.color,"--left":`calc(calc(${h} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${h} * ${Ft}) solid ${e.color}`,outlineOffset:`calc(${h} * ${Ft} * -1)`,width:`calc(${h} / 7)`,height:`calc(${h} / 7)`,margin:`calc(${h} / 10.5)`},"aria-labelledby":`span-ui-${e.id}-${t.id}-${At}`,children:o.jsx("span",{id:`span-ui-${e.id}-${t.id}-${At}`,className:`tooltip below narrow3 ${m.tooltip}`,style:{fontSize:`clamp(0.7rem, ${M.input}, 0.9rem)`,"--tooltip-max-width":h},children:`${Be[p]}: ${e.id}`})},`aa-ui-${e.color}-${e.id}`):o.jsx("div",{"aria-hidden":"true",className:`${m["indicator-null"]} ${m.indicator}`,style:{"--color":e.color,backgroundColor:"transparent","--left":`calc(calc(${h} / 3) * -1)`,width:`calc(${h} / 3)`,height:`calc(${h} / 3)`}},`null-${e.color}-${e.id}`)})})})}),H&&o.jsx("div",{style:{backgroundColor:t.color,width:`${h}`,maxWidth:`${h}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:m["color-name"],children:o.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${M.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),T&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:m["color-edit-container"],children:o.jsx(lo,{language:p,block:t,updateColor:me,width:h,hexToRGB:vt,rgbToHSL:yt,rgbToHex:oe,hslToRGB:Y,fontSize:`clamp(0.75rem, ${M.input}, 1rem)`})}),o.jsx("button",{className:`tooltip-wrap small delete danger gray ${m.remove}`,onClick:()=>ce(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${M.input}, 2rem)`},children:De[p]})]})]})},`${t.color}-${t.id}`)})}),((kt=(Wt=y[$])==null?void 0:Wt.items)==null?void 0:kt.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:m["width-wrap"],children:[o.jsx("label",{htmlFor:"color-block-width",children:Me[p]}),o.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:J,onChange:t=>mt(Number(t.target.value))})]}),o.jsxs("div",{className:`${m["toggle-controls"]}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:Ge[p]}),o.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>xt(!T),className:"gray small",children:T?We[p]:ke[p]})]}),o.jsxs("div",{children:[o.jsx("strong",{children:ze[p]}),o.jsx("button",{type:"button",onClick:()=>q(!H),className:"gray small",children:H?He[p]:Oe[p]})]})]})]})]})};export{vo as default};
