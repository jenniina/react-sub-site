import{r as b,j as e}from"./react-A9DAvxly.js";import{K as Qe,S as Ze,f3 as ht,f4 as pt,W as pe,bd as ve,u as $e,f5 as Xe,f6 as ye,f7 as et,f8 as je,f9 as we,fa as $t,c$ as xt,fb as gt,bX as At,fc as ft,fd as Ct,fe as _t,ff as bt,fg as wt,fh as vt,fi as yt,fj as jt,fk as Rt,fl as Nt,z as Et,A as Tt,fm as It,fn as St,ap as Ft,fo as Ut,fp as Dt,fq as kt,fr as Bt,fs as Lt,ft as Wt,fu as Mt,fv as Gt,fw as Ye,d9 as Ot,fx as Vt,fy as Ht,ax as Pt,ay as Jt,fz as zt,fA as Xt,fB as Yt,fC as qt,bC as qe,Y as ue}from"./index-4eU-Uoho.js";import{a2 as Ke,a3 as Kt,a4 as Qt}from"./react-icons-BXtkaQB_.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const Zt="_light_159i2_39",eo="_drag_159i2_221",to="_overflow_159i2_235",oo="_indicator_159i2_343",so="_tooltip_159i2_343",ro="_form_159i2_511",no="_remove_159i2_539",lo="_inputs_159i2_569",n={"color-container":"_color-container_159i2_1",light:Zt,"color-picker":"_color-picker_159i2_57","width-wrap":"_width-wrap_159i2_109","btn-wrap":"_btn-wrap_159i2_123","info-wrap":"_info-wrap_159i2_141","color-blocks":"_color-blocks_159i2_189",drag:eo,overflow:to,"block-wrap":"_block-wrap_159i2_243","color-wrap":"_color-wrap_159i2_261","color-block":"_color-block_159i2_189","compliance-indicators":"_compliance-indicators_159i2_321",indicator:oo,tooltip:so,"indicator-aaa":"_indicator-aaa_159i2_373","indicator-null":"_indicator-null_159i2_381","compliance-info":"_compliance-info_159i2_389","toggle-controls":"_toggle-controls_159i2_397","color-edit-container":"_color-edit-container_159i2_427","color-select":"_color-select_159i2_429","mode-container":"_mode-container_159i2_485",form:ro,"color-format-submit":"_color-format-submit_159i2_537",remove:no,"color-name":"_color-name_159i2_553",inputs:lo,"hex-input":"_hex-input_159i2_593"},ao=({language:l,block:m,fontSize:w,updateColor:T,width:G,hexToRGB:se,hslToRGB:q,rgbToHex:F,rgbToHSL:H})=>{const re=Qe(),te=/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i,ne=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,z=/^#([0-9A-F]{3}){1,2}$/i,Q=[{value:"hsl",label:"HSL"},{value:"rgb",label:"RGB"},{value:"hex",label:"Hex"}],[U,Z]=b.useState(Q.find(t=>t.value===m.colorFormat)||Q[0]),[K,P]=b.useState(""),[I,O]=b.useState(0),[c,g]=b.useState(0),[x,a]=b.useState(0),[h,f]=b.useState(0),[v,W]=b.useState(0),[D,S]=b.useState(0);b.useEffect(()=>{switch(m.colorFormat){case"hex":{P(m.color);const{r:t,g:i,b:A}=se(m.color);O(t),g(i),a(A);const{h:$,s:C,l:R}=H(t,i,A);f($),W(C),S(R);break}case"rgb":{const t=m.color.match(ne);if(t){const i=Number(t[1]),A=Number(t[2]),$=Number(t[3]);O(i),g(A),a($);const{h:C,s:R,l:E}=H(i,A,$);f(C),W(R),S(E)}break}case"hsl":{const t=m.color.match(te);if(t){const i=Number(t[1]),A=Number(t[2]),$=Number(t[3]);f(i),W(A),S($);const{r:C,g:R,b:E}=q(i,A,$);O(C),g(R),a(E);const X=F(C,R,E);P(X)}break}}},[m.color,m.colorFormat]);const J=t=>{try{let i;if(t==="hex")if(z.test(K)){i=K.toUpperCase(),T(m.id,i,"hex");const{r:A,g:$,b:C}=se(i);O(A),g($),a(C);const{h:R,s:E,l:X}=H(A,$,C);f(R),W(E),S(X),T(m.id,K,"hex")}else throw new Error("Invalid Hex format.");else if(t==="rgb")if(I>=0&&I<=255&&c>=0&&c<=255&&x>=0&&x<=255){i=`rgb(${I}, ${c}, ${x})`,T(m.id,i,"rgb");const A=F(I,c,x);P(A);const{h:$,s:C,l:R}=H(I,c,x);f($),W(C),S(R),T(m.id,`rgb(${I}, ${c}, ${x})`,"rgb")}else throw new Error("Invalid RGB values.");else if(t==="hsl")if(h>=0&&h<=360&&v>=0&&v<=100&&D>=0&&D<=100){i=`hsl(${h}, ${v}%, ${D}%)`,T(m.id,i,"hsl");const{r:A,g:$,b:C}=q(h,v,D);O(A),g($),a(C);const R=F(A,$,C);P(R),T(m.id,`hsl(${h}, ${v}%, ${D}%)`,"hsl")}else throw new Error("Invalid HSL values.");else throw new Error("Unsupported color format.")}catch(i){console.error(i.message),re(pe(ve[l]+" "+i.message,!0,4))}},d=t=>{t.preventDefault(),J(U==null?void 0:U.value)},r=(t,i)=>{t==="h"&&f(i),t==="s"&&W(i),t==="l"&&S(i);const A=t==="h"?i:h,$=t==="s"?i:v,C=t==="l"?i:D;if(A>=0&&A<=360&&$>=0&&$<=100&&C>=0&&C<=100){const{r:R,g:E,b:X}=q(A,$,C);O(R),g(E),a(X),T(m.id,`hsl(${A}, ${$}%, ${C}%)`,"hsl"),P(F(R,E,X))}},y=(t,i)=>{t==="r"&&O(i),t==="g"&&g(i),t==="b"&&a(i);const A=t==="r"?i:I,$=t==="g"?i:c,C=t==="b"?i:x;if([A,$,C].every(R=>R>=0&&R<=255)){const{h:R,s:E,l:X}=H(A,$,C);f(R),W(E),S(X),T(m.id,`rgb(${A}, ${$}, ${C})`,"rgb"),P(F(A,$,C))}};return e.jsxs(e.Fragment,{children:[e.jsx(Ze,{hideDelete:!0,id:"color-select",className:n["color-select"],language:l,instructions:ht[l],hide:!0,options:Q,value:U,z:1,onChange:t=>{if(Z(t),(t==null?void 0:t.value)==="hex"){const i=F(I,c,x);P(i),T(m.id,i,"hex")}else(t==null?void 0:t.value)==="rgb"?(O(I),g(c),a(x),T(m.id,`rgb(${I}, ${c}, ${x})`,"rgb")):(t==null?void 0:t.value)==="hsl"&&(f(h),W(v),S(D),T(m.id,`hsl(${h}, ${v}%, ${D}%)`,"hsl"))}}),(U==null?void 0:U.value)==="hex"&&e.jsxs("form",{className:n.form,onSubmit:d,children:[e.jsx("div",{className:`${n.inputs} ${n["hex-input"]}`,children:e.jsxs("label",{children:[e.jsx("span",{children:"Hex: "}),e.jsx("input",{name:`hex-input-${m.id}`,type:"text",value:K,onChange:t=>P(t.target.value),className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w},placeholder:"#FFFFFF"})]})}),e.jsx("button",{style:{minWidth:"calc(100% - 4px)",maxWidth:"calc(100% - 4px)",fontSize:w},type:"submit",className:`${n["color-format-submit"]} small gray`,children:pt[l]})]}),(U==null?void 0:U.value)==="rgb"&&e.jsxs("form",{className:`${n.inputs} ${n["rgb-inputs"]}`,onSubmit:d,children:[e.jsxs("label",{children:[e.jsx("span",{children:"R: "}),e.jsx("input",{name:`r-input-${m.id}`,type:"number",value:I,onChange:t=>y("r",Number(t.target.value)),min:0,max:255,className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w}})]}),e.jsxs("label",{children:[e.jsx("span",{children:"G: "}),e.jsx("input",{name:`g-input-${m.id}`,type:"number",value:c,onChange:t=>y("g",Number(t.target.value)),min:0,max:255,className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w}})]}),e.jsxs("label",{children:[e.jsx("span",{children:"B: "}),e.jsx("input",{name:`b-input-${m.id}`,type:"number",value:x,onChange:t=>y("b",Number(t.target.value)),min:0,max:255,className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w}})]})]}),(U==null?void 0:U.value)==="hsl"&&e.jsxs("form",{className:`${n.inputs} ${n["hsl-inputs"]}`,onSubmit:d,children:[e.jsxs("label",{children:[e.jsx("span",{children:"H: "}),e.jsx("input",{name:`h-input-${m.id}`,type:"number",value:h,onChange:t=>r("h",Number(t.target.value)),min:0,max:360,className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w}})," "]}),e.jsxs("label",{children:[e.jsx("span",{children:"S: "}),e.jsx("input",{name:`s-input-${m.id}`,type:"number",value:v,onChange:t=>r("s",Number(t.target.value)),min:0,max:100,className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w}})]}),e.jsxs("label",{children:[e.jsx("span",{children:"L: "}),e.jsx("input",{name:`l-input-${m.id}`,type:"number",value:D,onChange:t=>r("l",Number(t.target.value)),min:0,max:100,className:n["color-input"],style:{maxWidth:`${G}`,fontSize:w}})]})]})]})},ie="colors",he="hsl",fe=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:ie,colorFormat:he,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:ie,colorFormat:he,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:ie,colorFormat:he,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:ie,colorFormat:he,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:ie,colorFormat:he,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],io=l=>{const[m,w,T]=$e("Jenniina-colorsAccessibility",fe),[G,se]=$e("Jenniina-currentColor","#7D7D7D"),[q,F]=$e("Jenniina-idCounter",fe.length+1),[H,re]=b.useState(l),[te,ne]=b.useState(!1),z=b.useCallback(c=>c.map(g=>{const x=Q(g,c);return{...g,compliantColors:x}}),[]),Q=(c,g)=>{let x=[],a=[],h=[];return g.forEach(f=>{if(f.id===c.id)return;const v=Xe(c,f);v.isAAARegularTextCompliant&&x.push(f.id),v.isAARegularTextCompliant&&h.push(f.id),v.isAAUIComponentsCompliant&&a.push(f.id)}),{AAA_RegularText:Array.from(new Set(x)),AA_RegularText:Array.from(new Set(h)),AA_UIComponents:Array.from(new Set(a))}},U=b.useCallback(()=>{const{r:c,g,b:x}=ye(G),{h:a,s:h,l:f}=et(c,g,x),v=we(c,g,x),W={id:q,color:`hsl(${a}, ${h}%, ${f}%)`,luminance:v,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},D=[...m,W],S=z(D);w(S),F(J=>J+1)},[G,q,z,w,F,m]),Z=b.useCallback(c=>{const g=m.filter(a=>a.id!==c).map(a=>({...a,compliantColors:{AAA_RegularText:a.compliantColors.AAA_RegularText.filter(h=>h!==c),AA_RegularText:a.compliantColors.AA_RegularText.filter(h=>h!==c),AA_UIComponents:a.compliantColors.AA_UIComponents.filter(h=>h!==c)}})),x=z(g);w(x)},[m,z,w]),K=b.useCallback((c,g,x)=>{try{let a,h,f,v;if(x==="hsl"){const d=g.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!d)throw new Error("Invalid HSL format");const r=Number(d[1]),y=Number(d[2]),t=Number(d[3]);if(r<0||r>360||y<0||y>100||t<0||t>100)throw new Error("HSL values out of range");a=`hsl(${r}, ${y}%, ${t}%)`;const i=je(r,y,t);h=i.r,f=i.g,v=i.b}else if(x==="rgb"){const d=g.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!d)throw new Error("Invalid RGB format");const r=Number(d[1]),y=Number(d[2]),t=Number(d[3]);if([r,y,t].some(i=>i<0||i>255))throw new Error("RGB values must be between 0 and 255");a=`rgb(${r}, ${y}, ${t})`,h=r,f=y,v=t}else if(x==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test(g))throw new Error("Invalid Hex format");a=g.toUpperCase();const d=ye(a);h=d.r,f=d.g,v=d.b}else throw new Error("Unsupported color format");const W=we(h,f,v),D=m.map(d=>d.id===c?{...d,color:a,colorFormat:x,luminance:W,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:d),S=D.map(d=>{if(d.id===c)return d;const r=D.find(t=>t.id===c);if(!r)return d;const y=Xe(d,r);return{...d,compliantColors:{AAA_RegularText:y.isAAARegularTextCompliant?[...new Set([...d.compliantColors.AAA_RegularText,c])]:d.compliantColors.AAA_RegularText.filter(t=>t!==c),AA_RegularText:y.isAARegularTextCompliant?[...new Set([...d.compliantColors.AA_RegularText,c])]:d.compliantColors.AA_RegularText.filter(t=>t!==c),AA_UIComponents:y.isAAUIComponentsCompliant?[...new Set([...d.compliantColors.AA_UIComponents,c])]:d.compliantColors.AA_UIComponents.filter(t=>t!==c)}}}),J=S.find(d=>d.id===c);if(J){const d=Q(J,S),r=S.map(y=>y.id===c?{...y,compliantColors:d}:y);w(r)}else w(S)}catch(a){console.error("Error updating color:",a)}},[m,w]),P=b.useCallback(()=>{T(),w(fe),F(fe.length+1)},[T,w,F]),I=b.useCallback(()=>{T(),w([]),F(1)},[T,w,F]),O=b.useCallback(()=>{const c=$t(m,H,te);let g=q;const x=c.map(h=>{const f=je(h[0],h[1],h[2]),v=we(f.r,f.g,f.b);return{id:g++,color:`hsl(${h[0]}, ${h[1]}%, ${h[2]}%)`,luminance:v,status:ie,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let a=[...m,...x];a=z(a),w(a),F(g),ne(!1)},[m,H,te,z,w,F]);return b.useEffect(()=>{te&&m.length===0&&O()},[te,m]),{colors:m,setColors:w,setColorsReset:ne,addColor:U,removeColor:Z,updateColor:K,resetColors:P,clearColors:I,currentColor:G,setCurrentColor:se,mode:H,setMode:re,makeColorPalette:O}},ae=qt(5);var co=(l=>(l.AA_RegularText="AA_RegularText",l.AAA_RegularText="AAA_RegularText",l.AA_UIComponents="AA_UIComponents",l))(co||{});const B="colors",To=({language:l})=>{var Ne,Ee,Te,Ie,Se;const{colors:m,setColors:w,addColor:T,removeColor:G,updateColor:se,currentColor:q,setCurrentColor:F,resetColors:H,clearColors:re,mode:te,setMode:ne,makeColorPalette:z,setColorsReset:Q}=io("analogous"),U=b.useMemo(()=>[B],[]),Z=Qe(),K=xt(),P=gt(),[I,O]=b.useState(!0),[c,g]=$e("Jenniina-showColorNames",!0),{isDragging:x,listItemsByStatus:a,handleDragging:h,handleUpdate:f}=At(m,U),v=b.useRef(0),[W,D]=b.useState(0),S=8,[J,d]=$e("Jenniina-color-block-width",S),r=`${J}em`,y=J/S,t={tooltip:`${.7*y}em`,colorName:`${.7*y}em`,input:`${.8*y}em`},i=[{value:"analogous",label:ft[l]},{value:"complementary",label:Ct[l]},{value:"monochromatic",label:_t[l]},{value:"triad",label:bt[l]},{value:"tetrad",label:wt[l]}];let A=Math.floor(Math.random()*i.length);const[$,C]=b.useState(i[A]);b.useEffect(()=>{ne($==null?void 0:$.value)},[$]);const R=()=>{Q(!0),re()},E=(s,u)=>{if(u==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(s))return s.toUpperCase();throw new Error(`Invalid HEX color format: ${s}`)}else if(u==="rgb"){const p=s.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(p){const o=Number(p[1]),_=Number(p[2]),N=Number(p[3]);if([o,_,N].every(j=>j>=0&&j<=255))return Ye(o,_,N);throw new Error(`RGB values out of range in color: ${s}`)}else throw new Error(`Invalid RGB color format: ${s}`)}else if(u==="hsl"){const p=s.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(p){let o=ue(0,Number(p[1]),360),_=ue(0,Number(p[2]),100),N=ue(0,Number(p[3]),100);return o=(o+360)%360,_=ue(0,_,100),N=ue(0,N,100),`hsl(${o}, ${_}%, ${N}%)`}else throw new Error(`Invalid HSL color format: ${s}`)}else throw new Error(`Unsupported color format: ${u}`)},X={AA_RegularText:({xPosition:s,yIndicator:u,blockWidth:p,indicatorSize:o,otherColor:_,blockColor:N,colorFormatBlock:j,colorFormatOther:V})=>{const L=E(N,j),k=E(_,V);return`
 <circle
  cx="${s+p/2}"
  cy="${u+o/2}"
  r="${o*.32}"
  fill="${L}"
  stroke="${k}"
  stroke-width="${o*.1}"
/>
`},AA_UIComponents:({xPosition:s,yIndicator:u,blockWidth:p,indicatorSize:o,otherColor:_,blockColor:N,colorFormatBlock:j,colorFormatOther:V})=>{const L=E(N,j),k=E(_,V);return`
    <rect
  x="${s+p/2-o*.2}"
  y="${u+o/2-o*.15}"
  width="${o*.3}"
  height="${o*.3}"
  fill="${L}"
  stroke="${k}"
  stroke-width="${o*.1}"
/>
`},AAA_RegularText:({xPosition:s,yIndicator:u,blockWidth:p,indicatorSize:o,otherColor:_,blockColor:N,colorFormatBlock:j,colorFormatOther:V})=>{const L=E(_,V);return`
<circle
  cx="${s+p/2}"
  cy="${u+o/2}"
  r="${o/2}"
  fill="${L}"
  stroke="none"
/>
`}},Re=()=>{var Ue,De,ke,Be,Le,We,Me,Ge,Oe;const s=J*20,u=s,p=u/3,o=p/1.5,_=s/4,N=p/20,j=u/10,L=((De=(Ue=a[B])==null?void 0:Ue.items)==null?void 0:De.length)*(p+o)-o+_*2,k=c?j+_:0,oe=((ke=a[B])==null?void 0:ke.items.length)*u,_e=L+k*1.6,at=(Le=(Be=a[B])==null?void 0:Be.items)==null?void 0:Le.map((M,ce)=>{const le=ce*u;let ee;try{ee=E(M.color,M.colorFormat)}catch(me){console.error(me),Z(pe(`${ve[l]}: ${me.message}`,!0,4)),ee="#000000"}const ge=`
        <rect
          x="${le}"
          y="0"
          width="${u}"
          height="${L}"
          fill="${ee}"
          stroke="none"
        />
      `,Ae=c?`
        <!-- Text Background -->
        <rect
          x="${le}"
          y="${L-.5}"
          width="${u}"
          height="${k}"
          fill="${ee}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${le+u/2}"
          y="${L+k/2+j/3}"
          font-size="${j}"
          font-family="Arial"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${M.luminance>.179?"#000000":"#FFFFFF"}"
          stroke="none"
        >
          ${M.color}
        </text>
      `:"";return`
        <g>
          <!-- Color Block -->
          ${ge}
          <!-- Color Text Label -->
          ${Ae}
        </g>
      `}).join(""),it=(Me=(We=a[B])==null?void 0:We.items)==null?void 0:Me.map((M,ce)=>{const ee=_+ce*(p+o)+(p-N)/2,ge=E(M.color,M.colorFormat);return`
        <rect
          x="0"
          y="${ee}"
          width="${oe}"
          height="${N}"
          fill="${ge}"
          stroke="none"
        />
      `}).join(""),ct=(Oe=(Ge=a[B])==null?void 0:Ge.items)==null?void 0:Oe.map((M,ce)=>{var Ae,me;const le=ce*u,ee=Y=>{var de,Ve,He,Pe,Je,ze;return(Ve=(de=M.compliantColors)==null?void 0:de.AAA_RegularText)!=null&&Ve.includes(Y)?"AAA_RegularText":(Pe=(He=M.compliantColors)==null?void 0:He.AA_RegularText)!=null&&Pe.includes(Y)?"AA_RegularText":(ze=(Je=M.compliantColors)==null?void 0:Je.AA_UIComponents)!=null&&ze.includes(Y)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${(me=(Ae=a[B])==null?void 0:Ae.items)==null?void 0:me.filter(Y=>Y.id!==M.id).map(Y=>{const de=ee(Y.id);return de?X[de]({xPosition:le,yIndicator:_+(Y.id-1)*(p+o),blockWidth:u,indicatorSize:p,otherColor:Y.color,blockColor:M.color,colorFormatBlock:M.colorFormat,colorFormatOther:Y.colorFormat}):""}).join("")}
        </g>
      `}).join(""),be=10,mt=oe-be,Fe=_e-be*1.5,xe="https://colors.jenniina.fi",dt=`
      <a href="${xe}" target="_blank" rel="noopener noreferrer">
        <text
          x="${mt}"
          y="${Fe}"
          font-size="${j}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${xe}
        </text>
      </a>
    `,ut=`
      <a href="${xe}" target="_blank" rel="noopener noreferrer">
        <text
          x="${be}"
          y="${Fe}"
          font-size="${j}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${xe}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${oe}" height="${_e}">
      <!-- Color Blocks -->
      <g>
        ${at}
      </g>
      <!-- Lines -->
      <g>
        ${it}
      </g>
      <!-- Compliance Indicators -->
      <g>
        ${ct}
      </g>
      <!-- Source Link -->
      <g>
        ${ut}
      </g>
      <g>
        ${dt}
      </g>
    </svg>
  `,svgWidth:oe,svgHeight:_e}},tt=()=>{const{svgContent:s}=Re(),u=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(u),o=document.createElement("a");o.href=p,o.download="color-blocks.svg",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(p),Z(pe(qe[l],!1,5))},ot=()=>{const{svgContent:s,svgWidth:u,svgHeight:p}=Re(),o=new Image;o.width=u,o.height=p;const _=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),N=URL.createObjectURL(_);o.onload=()=>{const j=document.createElement("canvas");j.width=u,j.height=p;const V=j.getContext("2d");V==null||V.drawImage(o,0,0);const L=j.toDataURL("image/png"),k=document.createElement("a");k.href=L,k.download="color-blocks.png",document.body.appendChild(k),k.click(),document.body.removeChild(k),URL.revokeObjectURL(N),Z(pe(qe[l],!1,5))},o.onerror=j=>{console.error("Error loading SVG into image for PNG conversion:",j),URL.revokeObjectURL(N),Z(pe(ve[l],!0,4))},o.src=N},st=(s,u)=>{s.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:u}))},rt=(s,u)=>{s.preventDefault(),D(u),v.current=u},nt=s=>{s.preventDefault(),h(!0)},lt=s=>{const u=JSON.parse(s.dataTransfer.getData("text/plain"));u.type==="item"&&(f(u.id,B,W),setTimeout(()=>{var p;w((p=a[B])==null?void 0:p.items)},200),h(!1))};b.useEffect(()=>{var s,u;(!((s=a[B])!=null&&s.items)||((u=a[B])==null?void 0:u.items.length)<1)&&H()},[]);const Ce=.04;return e.jsxs("div",{id:n["color-container"],className:`${n["color-container"]} ${K?n.light:""}`,style:{"--font-size":t.input},children:[e.jsx("div",{id:"info",className:n["info-wrap"],children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),e.jsx("span",{children:vt[l]})]}),e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),e.jsx("span",{children:yt[l]})]}),e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),e.jsx("span",{children:jt[l]})]})]})}),e.jsxs("div",{className:n["btn-wrap"],children:[((Ee=(Ne=a[B])==null?void 0:Ne.items)==null?void 0:Ee.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:ot,className:"gray small",children:[Rt[l],"  ",e.jsx(Ke,{})]}),e.jsxs("button",{type:"button",onClick:tt,className:"gray small",children:[Nt[l],"  ",e.jsx(Ke,{})]})]}),e.jsx("button",{onClick:P,className:"gray small",children:K?e.jsxs(e.Fragment,{children:[Et[l],"  ",e.jsx(Kt,{})]}):e.jsxs(e.Fragment,{children:[Tt[l],"  ",e.jsx(Qt,{})," "]})})]}),e.jsxs("div",{className:n["color-picker"],children:[e.jsxs("label",{htmlFor:"color-input",className:" ",children:[It[l],":"]}),e.jsx("input",{id:"color-input",type:"color",value:q,onChange:s=>F(s.target.value)}),e.jsx("button",{className:"gray small",type:"button",onClick:T,children:St[l]}),e.jsx("button",{className:"gray small",type:"button",onClick:H,children:Ft[l]}),e.jsx("button",{className:"gray small",type:"button",onClick:re,children:Ut[l]}),e.jsxs("div",{className:`${n["color-edit-container"]} ${n["mode-container"]}`,children:[e.jsx(Ze,{options:i,value:$,onChange:s=>C(s),id:"color-mode",instructions:Dt[l],className:`${n["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),e.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:z,children:[kt[l],e.jsx("span",{className:"tooltip above narrow2",children:Bt[l]})]}),e.jsx("button",{className:"gray small",type:"button",onClick:R,children:Lt[l]})]})]}),e.jsx("div",{id:"color-blocks",className:`${n["color-blocks"]} ${!c||!I?n.overflow:""} ${x?n.drag:""}`,children:(Te=a[B])==null?void 0:Te.items.map(s=>{var u,p;return e.jsx("ul",{className:n["block-wrap"],onDrop:lt,children:e.jsxs("li",{className:n["color-wrap"],title:`ID: ${s.id}`,"aria-label":`ID: ${s.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[e.jsx("ul",{children:e.jsx("li",{draggable:"true",onDragStart:o=>st(o,s.id),onDragEnter:o=>rt(o,s.id),onDragOver:o=>nt(o),onDragEnd:()=>h(!1),"data-identity":s.id,className:n["color-block"],style:{"--color":s.color,backgroundColor:s.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(u=a[B])==null?void 0:u.items.length})`},children:e.jsx("div",{className:n["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(p=a[B])==null?void 0:p.items.map(o=>{var N,j,V,L,k,oe;if(o.id===s.id)return e.jsx("div",{className:`${n["indicator-null"]} ${n.indicator}`,style:{"--color":o.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${o.color}-${o.id}`);let _=null;return(j=(N=s.compliantColors)==null?void 0:N.AAA_RegularText)!=null&&j.includes(o.id)?_="AAA_RegularText":(L=(V=s.compliantColors)==null?void 0:V.AA_RegularText)!=null&&L.includes(o.id)?_="AA_RegularText":(oe=(k=s.compliantColors)==null?void 0:k.AA_UIComponents)!=null&&oe.includes(o.id)&&(_="AA_UIComponents"),_==="AAA_RegularText"?e.jsx("div",{tabIndex:0,className:`${n["indicator-aaa"]} ${n.indicator} tooltip-wrap`,style:{"--color":o.color,backgroundColor:o.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},"aria-labelledby":`span-${o.id}-${s.id}-${ae}`,children:e.jsx("span",{id:`span-${o.id}-${s.id}-${ae}`,className:`tooltip below narrow3 ${n.tooltip}`,style:{fontSize:`clamp(0.7rem, ${t.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Wt[l]}: ${o.id}`})},`aaa-${o.color}-${o.id}`):_==="AA_RegularText"?e.jsx("div",{tabIndex:0,className:`${n["indicator-aa"]} ${n.indicator} tooltip-wrap`,style:{"--color":o.color,backgroundColor:s.color,outline:`calc(${r} * ${Ce*1.1}) solid ${o.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},"aria-labelledby":`span-${o.id}-${s.id}-${ae}`,children:e.jsx("span",{id:`span-${o.id}-${s.id}-${ae}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${t.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Mt[l]}: ${o.id}`})},`aa-${o.color}-${o.id}`):_==="AA_UIComponents"?e.jsx("div",{tabIndex:0,className:`${n["indicator-aa-ui"]} ${n.indicator} tooltip-wrap`,style:{"--color":o.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:s.color,outline:`calc(${r} * ${Ce}) solid ${o.color}`,outlineOffset:`calc(${r} * ${Ce} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},"aria-labelledby":`span-ui-${o.id}-${s.id}-${ae}`,children:e.jsx("span",{id:`span-ui-${o.id}-${s.id}-${ae}`,className:`tooltip below narrow3 ${n.tooltip}`,style:{fontSize:`clamp(0.7rem, ${t.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Gt[l]}: ${o.id}`})},`aa-ui-${o.color}-${o.id}`):e.jsx("div",{"aria-hidden":"true",className:`${n["indicator-null"]} ${n.indicator}`,style:{"--color":o.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${o.color}-${o.id}`)})})})}),c&&e.jsx("div",{style:{backgroundColor:s.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:n["color-name"],children:e.jsx("span",{style:{color:s.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${t.input}, 1.2rem)`,textAlign:"center"},children:s.color})}),I&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:n["color-edit-container"],children:e.jsx(ao,{language:l,block:s,updateColor:se,width:r,hexToRGB:ye,rgbToHSL:et,rgbToHex:Ye,hslToRGB:je,fontSize:`clamp(0.75rem, ${t.input}, 1rem)`})}),e.jsx("button",{className:`tooltip-wrap small delete danger gray ${n.remove}`,onClick:()=>G(s.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${t.input}, 2rem)`},children:Ot[l]})]})]})},`${s.id}`)})}),((Se=(Ie=a[B])==null?void 0:Ie.items)==null?void 0:Se.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:n["width-wrap"],children:[e.jsx("label",{htmlFor:"color-block-width",children:Vt[l]}),e.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:J,onChange:s=>d(Number(s.target.value))})]}),e.jsxs("div",{className:`${n["toggle-controls"]}`,children:[e.jsxs("div",{children:[e.jsx("strong",{children:Ht[l]}),e.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>O(!I),className:"gray small",children:I?Pt[l]:Jt[l]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:zt[l]}),e.jsx("button",{type:"button",onClick:()=>g(!c),className:"gray small",children:c?Xt[l]:Yt[l]})]})]})]})]})};export{co as ComplianceLevel,To as default};
