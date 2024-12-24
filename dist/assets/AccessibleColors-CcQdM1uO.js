const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-BmskOm-J.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-DQhGG1l7.js","assets/react-dom-CxfJ6lHP.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-C4cSaZU-.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-yVutJqMS.js","assets/react-router-dom-j9Ns2JNj.js","assets/react-router-BoqxkIr7.js","assets/@remix-run-DTnHqtaE.js","assets/index-CfEGHDOJ.css"])))=>i.map(i=>d[i]);
import{dy as co,fO as Fo,fP as Co,fQ as Ho,fR as bo,fS as xo,fT as ne,_ as le,u as se,ae,fU as ce,fV as ie,fW as de,fX as me,fY as pe,fZ as ue,f_ as ge,f$ as he,g0 as Ae,g1 as fe,g2 as $e,g3 as xe,g4 as _e,g5 as Ce,aT as be,aV as we,g6 as ve,c1 as ye,g7 as Re,ap as je,g8 as Ee,g9 as Te,ga as Ne,gb as Ie,gc as ke,q as Se,gd as Oo,dG as Ue,ge as De,b5 as Fe,gf as Oe,gg as Le,gh as Me,gi as Ge,gj as He,gk as Je,G as go,gl as Lo,ct as Mo,gm as so}from"./index-DQhGG1l7.js";import{r as _,j as e}from"./react-A9DAvxly.js";import{P as Go,O as We,Q as Be}from"./react-icons-yVutJqMS.js";const Pe="_light_eood7_39",Ve="_drag_eood7_221",ze="_overflow_eood7_235",Ke="_indicator_eood7_343",Xe="_tooltip_eood7_343",qe="_form_eood7_511",Qe="_remove_eood7_539",Ye="_inputs_eood7_569",A={"color-container":"_color-container_eood7_1",light:Pe,"color-picker":"_color-picker_eood7_57","width-wrap":"_width-wrap_eood7_109","btn-wrap":"_btn-wrap_eood7_123","info-wrap":"_info-wrap_eood7_141","color-blocks":"_color-blocks_eood7_189",drag:Ve,overflow:ze,"block-wrap":"_block-wrap_eood7_243","color-wrap":"_color-wrap_eood7_261","color-block":"_color-block_eood7_189","compliance-indicators":"_compliance-indicators_eood7_321",indicator:Ke,tooltip:Xe,"indicator-aaa":"_indicator-aaa_eood7_373","indicator-null":"_indicator-null_eood7_381","compliance-info":"_compliance-info_eood7_389","toggle-controls":"_toggle-controls_eood7_397","color-edit-container":"_color-edit-container_eood7_427","color-select":"_color-select_eood7_429","mode-container":"_mode-container_eood7_485",form:qe,"color-format-submit":"_color-format-submit_eood7_537",remove:Qe,"color-name":"_color-name_eood7_553",inputs:Ye,"hex-input":"_hex-input_eood7_599"},Ze=(n,h)=>{const[k,P]=_.useState(!1),[X,ro]=_.useState(n),W=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",j=_.useMemo(()=>h==null?void 0:h.map(m=>`${W?"local-":""}DnD-${m}`),[h,W]),V=_.useCallback(()=>h==null?void 0:h.reduce((m,g,N)=>{const b=JSON.parse(localStorage.getItem(j[N])||"[]");return m[g]={items:b.length>0?b:n.filter(R=>R.status===g),setItems:R=>{localStorage.setItem(j[N],JSON.stringify(R)),G(l=>({...l,[g]:{...l[g],items:R}}))},removeItems:()=>{localStorage.removeItem(j[N]),G(R=>({...R,[g]:{...R[g],items:[]}}))}},m},{}),[h,j]),q=(m,g)=>JSON.stringify(m)===JSON.stringify(g),[a,G]=_.useState(V);_.useEffect(()=>{h.forEach((m,g)=>{var f;const N=((f=a[m])==null?void 0:f.items)||[],b=n.filter(p=>p.status===m),R=new Map(b.map(p=>[p.id,p])),l=N.map(p=>{const E=R.get(p.id);return E&&JSON.stringify(p)!==JSON.stringify(E)?E:p}).filter(p=>R.has(p.id)),$=new Set(N.map(p=>p.id)),C=b.filter(p=>!$.has(p.id)),s=[...l,...C];q(N,s)||a[m].setItems(s)}),h.forEach((m,g)=>{var b;const N=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(j[g],JSON.stringify(N))})},[n,h,j,q]),_.useEffect(()=>{ro(h.flatMap(m=>{var g;return((g=a[m])==null?void 0:g.items)||[]}))},[a]),_.useEffect(()=>{h.forEach((m,g)=>{var b;const N=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(j[g],JSON.stringify(N))})},[X,h,j,a]);const H=_.useCallback((m,g,N)=>{var s,f,p,E,z,B,F,O,i,r;const b=(s=Object.keys(a))==null?void 0:s.find(d=>{var w,S;return(S=(w=a==null?void 0:a[d])==null?void 0:w.items)==null?void 0:S.find(no=>(no==null?void 0:no.id)===m)});if(!b)return;const R=(p=(f=a==null?void 0:a[b])==null?void 0:f.items)==null?void 0:p.find(d=>(d==null?void 0:d.id)===m),l=(z=(E=a==null?void 0:a[g])==null?void 0:E.items)==null?void 0:z.findIndex(d=>(d==null?void 0:d.id)===N);if(!R)return;R.status=g;const $=(F=(B=a==null?void 0:a[b])==null?void 0:B.items)==null?void 0:F.filter(d=>d.id!==m);(O=a==null?void 0:a[b])==null||O.setItems($);let C=[...(i=a==null?void 0:a[g])==null?void 0:i.items];return C=C.filter(d=>d.id!==R.id),C.splice(l>=0?l:C.length,0,R),(r=a==null?void 0:a[g])==null||r.setItems(C),G(d=>({...d,[b]:{...d[b],items:$},[g]:{...d[g],items:C}})),C},[a,G]),Y=_.useCallback((m,g)=>{if(m===g)return;const N=h==null?void 0:h.indexOf(m);if(N===-1){console.error(`Old status "${m}" not found in statuses array`);return}const b=j[N],R=`${W?"local-":""}DnD-${g}`,l=a[m].items.map($=>({...$,status:g}));G($=>({...$,[m]:{...$[m],items:[]},[g]:{...$[g],items:l}})),localStorage.setItem(R,JSON.stringify(l)),localStorage.removeItem(b)},[a,j,h]);return{isDragging:k,listItemsByStatus:a,handleUpdate:H,handleRenameStatus:Y,handleDragging:m=>P(m)}},to="colors",ao="hsl",ho=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],ot=n=>{const[h,k,P]=co("Jenniina-colorsAccessibility",ho),[X,ro]=co("Jenniina-currentColor","#7D7D7D"),[W,j]=co("Jenniina-idCounter",ho.length+1),[V,q]=_.useState(n),[a,G]=_.useState(!1),H=_.useCallback(l=>l.map($=>{const C=Y($,l);return{...$,compliantColors:C}}),[]),Y=(l,$)=>{let C=[],s=[],f=[];return $.forEach(p=>{if(p.id===l.id)return;const E=Fo(l,p);E.isAAARegularTextCompliant&&C.push(p.id),E.isAARegularTextCompliant&&f.push(p.id),E.isAAUIComponentsCompliant&&s.push(p.id)}),{AAA_RegularText:Array.from(new Set(C)),AA_RegularText:Array.from(new Set(f)),AA_UIComponents:Array.from(new Set(s))}},io=_.useCallback(()=>{const{r:l,g:$,b:C}=Co(X),{h:s,s:f,l:p}=Ho(l,$,C),E=xo(l,$,C),z={id:W,color:`hsl(${s}, ${f}%, ${p}%)`,luminance:E,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},B=[...h,z],F=H(B);k(F),j(O=>O+1)},[X,W,H,k,j,h]),m=_.useCallback(l=>{const $=h.filter(s=>s.id!==l).map(s=>({...s,compliantColors:{AAA_RegularText:s.compliantColors.AAA_RegularText.filter(f=>f!==l),AA_RegularText:s.compliantColors.AA_RegularText.filter(f=>f!==l),AA_UIComponents:s.compliantColors.AA_UIComponents.filter(f=>f!==l)}})),C=H($);k(C)},[h,H,k]),g=_.useCallback((l,$,C)=>{try{let s,f,p,E;if(C==="hsl"){const i=$.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!i)throw new Error("Invalid HSL format");const r=Number(i[1]),d=Number(i[2]),w=Number(i[3]);if(r<0||r>360||d<0||d>100||w<0||w>100)throw new Error("HSL values out of range");s=`hsl(${r}, ${d}%, ${w}%)`;const S=bo(r,d,w);f=S.r,p=S.g,E=S.b}else if(C==="rgb"){const i=$.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!i)throw new Error("Invalid RGB format");const r=Number(i[1]),d=Number(i[2]),w=Number(i[3]);if([r,d,w].some(S=>S<0||S>255))throw new Error("RGB values must be between 0 and 255");s=`rgb(${r}, ${d}, ${w})`,f=r,p=d,E=w}else if(C==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test($))throw new Error("Invalid Hex format");s=$.toUpperCase();const i=Co(s);f=i.r,p=i.g,E=i.b}else throw new Error("Unsupported color format");const z=xo(f,p,E),B=h.map(i=>i.id===l?{...i,color:s,colorFormat:C,luminance:z,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:i),F=B.map(i=>{if(i.id===l)return i;const r=B.find(w=>w.id===l);if(!r)return i;const d=Fo(i,r);return{...i,compliantColors:{AAA_RegularText:d.isAAARegularTextCompliant?[...new Set([...i.compliantColors.AAA_RegularText,l])]:i.compliantColors.AAA_RegularText.filter(w=>w!==l),AA_RegularText:d.isAARegularTextCompliant?[...new Set([...i.compliantColors.AA_RegularText,l])]:i.compliantColors.AA_RegularText.filter(w=>w!==l),AA_UIComponents:d.isAAUIComponentsCompliant?[...new Set([...i.compliantColors.AA_UIComponents,l])]:i.compliantColors.AA_UIComponents.filter(w=>w!==l)}}}),O=F.find(i=>i.id===l);if(O){const i=Y(O,F),r=F.map(d=>d.id===l?{...d,compliantColors:i}:d);k(r)}else k(F)}catch(s){console.error("Error updating color:",s)}},[h,k]),N=_.useCallback(()=>{P(),k(ho),j(ho.length+1)},[P,k,j]),b=_.useCallback(()=>{P(),k([]),j(1)},[P,k,j]),R=_.useCallback(()=>{const l=ne(h,V,a);let $=W;const C=l.map(f=>{const p=bo(f[0],f[1],f[2]),E=xo(p.r,p.g,p.b);return{id:$++,color:`hsl(${f[0]}, ${f[1]}%, ${f[2]}%)`,luminance:E,status:to,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let s=[...h,...C];s=H(s),k(s),j($),G(!1)},[h,V,a,H,k,j]);return _.useEffect(()=>{a&&h.length===0&&R()},[a,h]),{colors:h,setColors:k,setColorsReset:G,addColor:io,removeColor:m,updateColor:g,resetColors:N,clearColors:b,currentColor:X,setCurrentColor:ro,mode:V,setMode:q,makeColorPalette:R}},et=_.lazy(()=>le(()=>import("./ColorsInput-BmskOm-J.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),_o=Je(5);var Jo=(n=>(n.AA_RegularText="AA_RegularText",n.AAA_RegularText="AAA_RegularText",n.AA_UIComponents="AA_UIComponents",n))(Jo||{});const D="colors",tt=({language:n})=>{var vo,yo,Ro,jo,Eo;const{colors:h,setColors:k,addColor:P,removeColor:X,updateColor:ro,currentColor:W,setCurrentColor:j,resetColors:V,clearColors:q,mode:a,setMode:G,makeColorPalette:H,setColorsReset:Y}=ot("analogous"),io=_.useMemo(()=>[D],[]),m=se(),g=ae(),N=ce(),[b,R]=_.useState(!0),[l,$]=co("Jenniina-showColorNames",!0),{isDragging:C,listItemsByStatus:s,handleDragging:f,handleUpdate:p}=Ze(h,io),E=_.useRef(0),[z,B]=_.useState(0),F=8,[O,i]=co("Jenniina-color-block-width",F),r=`${O}em`,d=O/F,w={tooltip:`${.7*d}em`,colorName:`${.7*d}em`,input:`${.8*d}em`},S=[{value:"analogous",label:ie[n]},{value:"complementary",label:de[n]},{value:"monochromatic",label:me[n]},{value:"triad",label:pe[n]},{value:"tetrad",label:ue[n]}];let no=Math.floor(Math.random()*S.length);const[lo,Wo]=_.useState(S[no]);_.useEffect(()=>{G(lo==null?void 0:lo.value)},[lo]);const Bo=()=>{s[D].removeItems(),Y(!0),q()},Q=(t,c)=>{if(c==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(c==="rgb"){const u=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(u){const o=Number(u[1]),v=Number(u[2]),T=Number(u[3]);if([o,v,T].every(y=>y>=0&&y<=255))return Oo(o,v,T);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(c==="hsl"){const u=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(u){let o=so(0,Number(u[1]),360),v=so(0,Number(u[2]),100),T=so(0,Number(u[3]),100);return o=(o+360)%360,v=so(0,v,100),T=so(0,T,100),`hsl(${o}, ${v}%, ${T}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${c}`)},Po={AA_RegularText:({xPosition:t,yIndicator:c,blockWidth:u,indicatorSize:o,otherColor:v,blockColor:T,colorFormatBlock:y,colorFormatOther:x})=>{const L=Q(T,y),I=Q(v,x);return`
 <circle
  cx="${t+u/2}"
  cy="${c+o/2}"
  r="${o*.32}"
  fill="${L}"
  stroke="${I}"
  stroke-width="${o*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:c,blockWidth:u,indicatorSize:o,otherColor:v,blockColor:T,colorFormatBlock:y,colorFormatOther:x})=>{const L=Q(T,y),I=Q(v,x);return`
    <rect
  x="${t+u/2-o*.2}"
  y="${c+o/2-o*.15}"
  width="${o*.3}"
  height="${o*.3}"
  fill="${L}"
  stroke="${I}"
  stroke-width="${o*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:c,blockWidth:u,indicatorSize:o,otherColor:v,blockColor:T,colorFormatBlock:y,colorFormatOther:x})=>{const L=Q(v,x);return`
<circle
  cx="${t+u/2}"
  cy="${c+o/2}"
  r="${o/2}"
  fill="${L}"
  stroke="none"
/>
`}},wo=()=>{var No;const t=O*20,c=t,u=c/3,o=u/1.5,v=t/4,T=u/20,y=c/10,x=((No=s[D])==null?void 0:No.items)||[],I=(x==null?void 0:x.length)*(u+o)-o+v*2,Z=l?y+v:0,mo=x.length*c,fo=I+Z*1.6,Yo=x==null?void 0:x.map((U,oo)=>{const eo=oo*c;let K;try{K=Q(U.color,U.colorFormat)}catch(J){console.error(J),m(go(`${Mo[n]}: ${J.message}`,!0,4)),K="#000000"}const uo=`
        <rect
          x="${eo}"
          y="0"
          width="${c}"
          height="${I}"
          fill="${K}"
          stroke="none"
        />
      `,M=l?`
        <!-- Text Background -->
        <rect
          x="${eo}"
          y="${I-.5}"
          width="${c}"
          height="${Z}"
          fill="${K}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${eo+c/2}"
          y="${I+Z/2+y/3}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${U.luminance>.179?"#000000":"#FFFFFF"}"
          stroke="none"
        >
          ${U.color}
        </text>
      `:"";return`
        <g>
          <!-- Color Block -->
          ${uo}
          <!-- Color Text Label -->
          ${M}
        </g>
      `}).join(""),Zo=x==null?void 0:x.map((U,oo)=>{const K=v+oo*(u+o)+(u-T)/2,uo=Q(U.color,U.colorFormat);return`
        <rect
          x="0"
          y="${K}"
          width="${mo}"
          height="${T}"
          fill="${uo}"
          stroke="none"
        />
      `}).join(""),oe=x==null?void 0:x.map((U,oo)=>{const eo=oo*c,K=M=>{var J,Io,ko,So,Uo,Do;return(Io=(J=U.compliantColors)==null?void 0:J.AAA_RegularText)!=null&&Io.includes(M)?"AAA_RegularText":(So=(ko=U.compliantColors)==null?void 0:ko.AA_RegularText)!=null&&So.includes(M)?"AA_RegularText":(Do=(Uo=U.compliantColors)==null?void 0:Uo.AA_UIComponents)!=null&&Do.includes(M)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${x==null?void 0:x.filter((M,J)=>J!==oo).map(M=>{const J=K(M.id);return J?Po[J]({xPosition:eo,yIndicator:v+x.indexOf(M)*(u+o),blockWidth:c,indicatorSize:u,otherColor:M.color,blockColor:U.color,colorFormatBlock:U.colorFormat,colorFormatOther:M.colorFormat}):""}).join("")}
        </g>
      `}).join(""),$o=10,ee=mo-$o,To=fo-$o*1.5,po="https://colors.jenniina.fi",te=`
      <a href="${po}" target="_blank" rel="noopener noreferrer">
        <text
          x="${ee}"
          y="${To}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${po}
        </text>
      </a>
    `,re=`
      <a href="${po}" target="_blank" rel="noopener noreferrer">
        <text
          x="${$o}"
          y="${To}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${po}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${mo}" height="${fo}">
      <!-- Color Blocks -->
      <g>
        ${Yo}
      </g>
      <!-- Lines -->
      <g>
        ${Zo}
      </g>
      <!-- Compliance Indicators -->
      <g>
        ${oe}
      </g>
      <!-- Source Link -->
      <g>
        ${re}
      </g>
      <g>
        ${te}
      </g>
    </svg>
  `,svgWidth:mo,svgHeight:fo}},Vo=()=>{const{svgContent:t}=wo(),c=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(c),o=document.createElement("a");o.href=u,o.download="color-blocks.svg",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(u),m(go(Lo[n],!1,5))},zo=()=>{const{svgContent:t,svgWidth:c,svgHeight:u}=wo(),o=new Image;o.width=c,o.height=u;const v=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),T=URL.createObjectURL(v);o.onload=()=>{const y=document.createElement("canvas");y.width=c,y.height=u;const x=y.getContext("2d");x==null||x.drawImage(o,0,0);const L=y.toDataURL("image/png"),I=document.createElement("a");I.href=L,I.download="color-blocks.png",I.target="_blank",I.rel="noreferrer",document.body.appendChild(I),I.click(),document.body.removeChild(I),URL.revokeObjectURL(T),m(go(Lo[n],!1,5))},o.onerror=y=>{console.error("Error loading SVG into image for PNG conversion:",y),URL.revokeObjectURL(T),m(go(Mo[n],!0,4))},o.src=T},Ko=(t,c)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:c}))},Xo=(t,c)=>{t.preventDefault(),B(c),E.current=c},qo=t=>{t.preventDefault(),f(!0)},Qo=t=>{const c=JSON.parse(t.dataTransfer.getData("text/plain"));c.type==="item"&&(p(c.id,D,z),setTimeout(()=>{var u;k((u=s[D])==null?void 0:u.items)},200),f(!1))};_.useEffect(()=>{var t,c;(!((t=s[D])!=null&&t.items)||((c=s[D])==null?void 0:c.items.length)<1)&&V()},[]);const Ao=.04;return e.jsxs("div",{id:A["color-container"],className:`${A["color-container"]} ${g?A.light:""}`,style:{"--font-size":w.input},children:[e.jsx("div",{id:"info",className:A["info-wrap"],children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),e.jsx("span",{children:ge[n]})]}),e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),e.jsx("span",{children:he[n]})]}),e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),e.jsx("span",{children:Ae[n]})]})]})}),e.jsxs("div",{className:A["btn-wrap"],children:[((yo=(vo=s[D])==null?void 0:vo.items)==null?void 0:yo.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:zo,className:"gray small",children:[fe[n],"  ",e.jsx(Go,{})]}),e.jsxs("button",{type:"button",onClick:Vo,className:"gray small",children:[$e[n],"  ",e.jsx(Go,{})]})]}),e.jsx("button",{onClick:N,className:"gray small",children:g?e.jsxs(e.Fragment,{children:[xe[n],"  ",e.jsx(We,{})]}):e.jsxs(e.Fragment,{children:[_e[n],"  ",e.jsx(Be,{})," "]})})]}),e.jsxs("div",{className:A["color-picker"],children:[e.jsxs("label",{htmlFor:"color-input",className:" ",children:[Ce[n],":"]}),e.jsx("input",{id:"color-input",type:"color",value:W,onChange:t=>j(t.target.value)}),e.jsx("button",{className:"gray small",type:"button",onClick:P,children:be[n]}),e.jsx("button",{className:"gray small",type:"button",onClick:V,children:we[n]}),e.jsx("button",{className:"gray small",type:"button",onClick:()=>{s[D].removeItems(),q()},children:ve[n]}),e.jsxs("div",{className:`${A["color-edit-container"]} ${A["mode-container"]}`,children:[e.jsx(ye,{options:S,value:lo,onChange:t=>Wo(t),id:"color-mode",instructions:Re[n],className:`${A["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),e.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:H,children:[je[n],e.jsx("span",{className:"tooltip above narrow2",children:Ee[n]})]}),e.jsx("button",{className:"gray small",type:"button",onClick:Bo,children:Te[n]})]})]}),e.jsx("div",{id:"color-blocks",className:`${A["color-blocks"]} ${!l||!b?A.overflow:""} ${C?A.drag:""}`,children:(Ro=s[D])==null?void 0:Ro.items.map(t=>{var c,u;return e.jsx("ul",{className:A["block-wrap"],onDrop:Qo,children:e.jsxs("li",{className:A["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[e.jsx("ul",{children:e.jsx("li",{draggable:"true",onDragStart:o=>Ko(o,t.id),onDragEnter:o=>Xo(o,t.id),onDragOver:o=>qo(o),onDragEnd:()=>f(!1),"data-identity":t.id,className:A["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(c=s[D])==null?void 0:c.items.length})`},children:e.jsx("div",{className:A["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(u=s[D])==null?void 0:u.items.map(o=>{var T,y,x,L,I,Z;if(o.id===t.id)return e.jsx("div",{className:`${A["indicator-null"]} ${A.indicator}`,style:{"--color":o.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${o.color}-${o.id}`);let v=null;return(y=(T=t.compliantColors)==null?void 0:T.AAA_RegularText)!=null&&y.includes(o.id)?v="AAA_RegularText":(L=(x=t.compliantColors)==null?void 0:x.AA_RegularText)!=null&&L.includes(o.id)?v="AA_RegularText":(Z=(I=t.compliantColors)==null?void 0:I.AA_UIComponents)!=null&&Z.includes(o.id)&&(v="AA_UIComponents"),v==="AAA_RegularText"?e.jsx("div",{tabIndex:0,className:`${A["indicator-aaa"]} ${A.indicator} tooltip-wrap`,style:{"--color":o.color,backgroundColor:o.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},children:e.jsx("span",{id:`span-${o.id}-${t.id}-${_o}`,className:`tooltip below narrow3 ${A.tooltip}`,style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Ne[n]}: ${o.id}`})},`aaa-${o.color}-${o.id}`):v==="AA_RegularText"?e.jsx("div",{tabIndex:0,className:`${A["indicator-aa"]} ${A.indicator} tooltip-wrap`,style:{"--color":o.color,backgroundColor:t.color,outline:`calc(${r} * ${Ao*1.1}) solid ${o.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},children:e.jsx("span",{id:`span-${o.id}-${t.id}-${_o}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Ie[n]}: ${o.id}`})},`aa-${o.color}-${o.id}`):v==="AA_UIComponents"?e.jsx("div",{tabIndex:0,className:`${A["indicator-aa-ui"]} ${A.indicator} tooltip-wrap`,style:{"--color":o.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${r} * ${Ao}) solid ${o.color}`,outlineOffset:`calc(${r} * ${Ao} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},children:e.jsx("span",{id:`span-ui-${o.id}-${t.id}-${_o}`,className:`tooltip below narrow3 ${A.tooltip}`,style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${ke[n]}: ${o.id}`})},`aa-ui-${o.color}-${o.id}`):e.jsx("div",{"aria-hidden":"true",className:`${A["indicator-null"]} ${A.indicator}`,style:{"--color":o.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${o.color}-${o.id}`)})})})}),l&&e.jsx("div",{style:{backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:A["color-name"],children:e.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${w.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),b&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:A["color-edit-container"],children:e.jsx(_.Suspense,{fallback:e.jsxs("div",{className:"flex center margin0auto textcenter",children:[Se[n],"..."]}),children:e.jsx(et,{language:n,block:t,updateColor:ro,width:r,hexToRGB:Co,rgbToHSL:Ho,rgbToHex:Oo,hslToRGB:bo,fontSize:`clamp(0.75rem, ${w.input}, 1rem)`})})}),e.jsx("button",{className:`tooltip-wrap small delete danger gray ${A.remove}`,onClick:()=>X(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${w.input}, 2rem)`},children:Ue[n]})]})]})},`${t.id}`)})}),((Eo=(jo=s[D])==null?void 0:jo.items)==null?void 0:Eo.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:A["width-wrap"],children:[e.jsx("label",{htmlFor:"color-block-width",children:De[n]}),e.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:O,onChange:t=>i(Number(t.target.value))})]}),e.jsxs("div",{className:`${A["toggle-controls"]}`,children:[e.jsxs("div",{children:[e.jsx("strong",{children:Fe[n]}),e.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>R(!b),className:"gray small",children:b?Oe[n]:Le[n]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:Me[n]}),e.jsx("button",{type:"button",onClick:()=>$(!l),className:"gray small",children:l?Ge[n]:He[n]})]})]})]})]})},at=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:Jo,default:tt},Symbol.toStringTag,{value:"Module"}));export{at as A,A as s};
