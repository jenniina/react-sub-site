const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-BvaQW4lr.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-RWhtUYTY.js","assets/react-dom-yh0erWL-.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-CHm9GgGE.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-BXtkaQB_.js","assets/react-router-dom-CYs6befe.js","assets/react-router-S1Hdk0kP.js","assets/@remix-run-DTnHqtaE.js","assets/index-DtQroiLw.css"])))=>i.map(i=>d[i]);
import{u as ce,ff as De,fg as Ce,fh as Ge,fi as _e,fj as xe,fk as ro,fl as no,K as lo,c$ as so,fm as ao,fn as io,fo as co,fp as mo,fq as po,fr as uo,fs as ho,ft as fo,fu as go,fv as Ao,fw as $o,z as xo,A as Co,fx as _o,fy as wo,ap as bo,fz as yo,S as vo,fA as Ro,fB as jo,fC as Io,fD as Eo,fE as No,fF as To,fG as ko,ag as So,fH as Fe,d8 as Uo,fI as Do,fJ as Fo,ax as Oo,ay as Lo,fK as Mo,fL as Go,fM as Jo,fN as Ho,W as he,bC as Oe,bd as Le,Y as ae}from"./index-RWhtUYTY.js";import{r as x,j as o}from"./react-A9DAvxly.js";import{a2 as Me,a3 as Wo,a4 as Bo}from"./react-icons-BXtkaQB_.js";const zo="_light_159i2_39",Po="_drag_159i2_221",Vo="_overflow_159i2_235",Ko="_indicator_159i2_343",qo="_tooltip_159i2_343",Xo="_form_159i2_511",Yo="_remove_159i2_539",Qo="_inputs_159i2_569",A={"color-container":"_color-container_159i2_1",light:zo,"color-picker":"_color-picker_159i2_57","width-wrap":"_width-wrap_159i2_109","btn-wrap":"_btn-wrap_159i2_123","info-wrap":"_info-wrap_159i2_141","color-blocks":"_color-blocks_159i2_189",drag:Po,overflow:Vo,"block-wrap":"_block-wrap_159i2_243","color-wrap":"_color-wrap_159i2_261","color-block":"_color-block_159i2_189","compliance-indicators":"_compliance-indicators_159i2_321",indicator:Ko,tooltip:qo,"indicator-aaa":"_indicator-aaa_159i2_373","indicator-null":"_indicator-null_159i2_381","compliance-info":"_compliance-info_159i2_389","toggle-controls":"_toggle-controls_159i2_397","color-edit-container":"_color-edit-container_159i2_427","color-select":"_color-select_159i2_429","mode-container":"_mode-container_159i2_485",form:Xo,"color-format-submit":"_color-format-submit_159i2_537",remove:Yo,"color-name":"_color-name_159i2_553",inputs:Qo,"hex-input":"_hex-input_159i2_593"},Zo=(r,u)=>{const[N,V]=x.useState(!1),[X,Z]=x.useState(r);x.useEffect(()=>{Z(r)},[r]);const W=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",R=x.useMemo(()=>u==null?void 0:u.map(d=>`${W?"local-":""}DnD-${d}`),[u,W]),K=x.useCallback(()=>u==null?void 0:u.reduce((d,h,b)=>{const C=JSON.parse(localStorage.getItem(R[b])||"[]");return d[h]={items:C.length>0?C:r.filter(n=>n.status===h),setItems:n=>{localStorage.setItem(R[b],JSON.stringify(n)),J($=>({...$,[h]:{...$[h],items:n}}))},removeItems:()=>{localStorage.removeItem(R[b]),J(n=>({...n,[h]:{...n[h],items:[]}}))}},d},{}),[u,R]),B=(d,h)=>JSON.stringify(d)===JSON.stringify(h),[a,J]=x.useState(K),L=x.useRef(!0);x.useEffect(()=>{if(L.current){L.current=!1;return}u.forEach((d,h)=>{var y;const b=((y=a[d])==null?void 0:y.items)||[],C=r.filter(i=>i.status===d),n=new Map(C.map(i=>[i.id,i])),$=b.map(i=>{const k=n.get(i.id);return k&&JSON.stringify(i)!==JSON.stringify(k)?k:i}),_=new Set(b.map(i=>i.id)),s=C.filter(i=>!_.has(i.id)),g=[...$,...s];B(b,g)||a[d].setItems(g)}),u.forEach((d,h)=>{var C;const b=((C=a[d])==null?void 0:C.items)||[];localStorage.setItem(R[h],JSON.stringify(b))})},[r,u,R,a,B]),x.useEffect(()=>{u.forEach((d,h)=>{var y;const b=((y=a[d])==null?void 0:y.items)||[],C=r.filter(i=>i.status===d),n=new Map(C.map(i=>[i.id,i])),$=b.map(i=>{const k=n.get(i.id);return k&&JSON.stringify(i)!==JSON.stringify(k)?k:i}),_=new Set(b.map(i=>i.id)),s=C.filter(i=>!_.has(i.id)),g=[...$,...s];B(b,g)||a[d].setItems(g)}),u.forEach((d,h)=>{var C;const b=((C=a[d])==null?void 0:C.items)||[];localStorage.setItem(R[h],JSON.stringify(b))})},[r,u,R,a,B]),x.useEffect(()=>{Z(u.flatMap(d=>{var h;return((h=a[d])==null?void 0:h.items)||[]}))},[a]),x.useEffect(()=>{u.forEach((d,h)=>{var C;const b=((C=a[d])==null?void 0:C.items)||[];localStorage.setItem(R[h],JSON.stringify(b))})},[X,u,R,a]);const ee=x.useCallback((d,h,b)=>{var g,y,i,k,z,F,O,p,l,j;const C=(g=Object.keys(a))==null?void 0:g.find(c=>{var S,de;return(de=(S=a==null?void 0:a[c])==null?void 0:S.items)==null?void 0:de.find(P=>(P==null?void 0:P.id)===d)});if(!C)return;const n=(i=(y=a==null?void 0:a[C])==null?void 0:y.items)==null?void 0:i.find(c=>(c==null?void 0:c.id)===d),$=(z=(k=a==null?void 0:a[h])==null?void 0:k.items)==null?void 0:z.findIndex(c=>(c==null?void 0:c.id)===b);if(!n)return;n.status=h;const _=(O=(F=a==null?void 0:a[C])==null?void 0:F.items)==null?void 0:O.filter(c=>c.id!==d);(p=a==null?void 0:a[C])==null||p.setItems(_);let s=[...(l=a==null?void 0:a[h])==null?void 0:l.items];return s=s.filter(c=>c.id!==n.id),s.splice($>=0?$:s.length,0,n),(j=a==null?void 0:a[h])==null||j.setItems(s),J(c=>({...c,[C]:{...c[C],items:_},[h]:{...c[h],items:s}})),s},[a,J]),se=x.useCallback((d,h)=>{if(d===h)return;const b=u==null?void 0:u.indexOf(d);if(b===-1){console.error(`Old status "${d}" not found in statuses array`);return}const C=R[b],n=`${W?"local-":""}DnD-${h}`,$=a[d].items.map(_=>({..._,status:h}));J(_=>({..._,[d]:{..._[d],items:[]},[h]:{..._[h],items:$}})),localStorage.setItem(n,JSON.stringify($)),localStorage.removeItem(C)},[a,R,u]);return{isDragging:N,listItemsByStatus:a,handleUpdate:ee,handleRenameStatus:se,handleDragging:d=>V(d)}},le="colors",ie="hsl",fe=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:le,colorFormat:ie,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:le,colorFormat:ie,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:le,colorFormat:ie,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:le,colorFormat:ie,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:le,colorFormat:ie,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],et=r=>{const[u,N,V]=ce("Jenniina-colorsAccessibility",fe),[X,Z]=ce("Jenniina-currentColor","#7D7D7D"),[W,R]=ce("Jenniina-idCounter",fe.length+1),[K,B]=x.useState(r),[a,J]=x.useState(!1),L=x.useCallback(n=>n.map($=>{const _=ee($,n);return{...$,compliantColors:_}}),[]),ee=(n,$)=>{let _=[],s=[],g=[];return $.forEach(y=>{if(y.id===n.id)return;const i=De(n,y);i.isAAARegularTextCompliant&&_.push(y.id),i.isAARegularTextCompliant&&g.push(y.id),i.isAAUIComponentsCompliant&&s.push(y.id)}),{AAA_RegularText:Array.from(new Set(_)),AA_RegularText:Array.from(new Set(g)),AA_UIComponents:Array.from(new Set(s))}},se=x.useCallback(()=>{const{r:n,g:$,b:_}=Ce(X),{h:s,s:g,l:y}=Ge(n,$,_),i=xe(n,$,_),k={id:W,color:`hsl(${s}, ${g}%, ${y}%)`,luminance:i,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},z=[...u,k],F=L(z);N(F),R(O=>O+1)},[X,W,L,N,R,u]),Y=x.useCallback(n=>{const $=u.filter(s=>s.id!==n).map(s=>({...s,compliantColors:{AAA_RegularText:s.compliantColors.AAA_RegularText.filter(g=>g!==n),AA_RegularText:s.compliantColors.AA_RegularText.filter(g=>g!==n),AA_UIComponents:s.compliantColors.AA_UIComponents.filter(g=>g!==n)}})),_=L($);N(_)},[u,L,N]),d=x.useCallback((n,$,_)=>{try{let s,g,y,i;if(_==="hsl"){const p=$.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!p)throw new Error("Invalid HSL format");const l=Number(p[1]),j=Number(p[2]),c=Number(p[3]);if(l<0||l>360||j<0||j>100||c<0||c>100)throw new Error("HSL values out of range");s=`hsl(${l}, ${j}%, ${c}%)`;const S=_e(l,j,c);g=S.r,y=S.g,i=S.b}else if(_==="rgb"){const p=$.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!p)throw new Error("Invalid RGB format");const l=Number(p[1]),j=Number(p[2]),c=Number(p[3]);if([l,j,c].some(S=>S<0||S>255))throw new Error("RGB values must be between 0 and 255");s=`rgb(${l}, ${j}, ${c})`,g=l,y=j,i=c}else if(_==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test($))throw new Error("Invalid Hex format");s=$.toUpperCase();const p=Ce(s);g=p.r,y=p.g,i=p.b}else throw new Error("Unsupported color format");const k=xe(g,y,i),z=u.map(p=>p.id===n?{...p,color:s,colorFormat:_,luminance:k,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:p),F=z.map(p=>{if(p.id===n)return p;const l=z.find(c=>c.id===n);if(!l)return p;const j=De(p,l);return{...p,compliantColors:{AAA_RegularText:j.isAAARegularTextCompliant?[...new Set([...p.compliantColors.AAA_RegularText,n])]:p.compliantColors.AAA_RegularText.filter(c=>c!==n),AA_RegularText:j.isAARegularTextCompliant?[...new Set([...p.compliantColors.AA_RegularText,n])]:p.compliantColors.AA_RegularText.filter(c=>c!==n),AA_UIComponents:j.isAAUIComponentsCompliant?[...new Set([...p.compliantColors.AA_UIComponents,n])]:p.compliantColors.AA_UIComponents.filter(c=>c!==n)}}}),O=F.find(p=>p.id===n);if(O){const p=ee(O,F),l=F.map(j=>j.id===n?{...j,compliantColors:p}:j);N(l)}else N(F)}catch(s){console.error("Error updating color:",s)}},[u,N]),h=x.useCallback(()=>{V(),N(fe),R(fe.length+1)},[V,N,R]),b=x.useCallback(()=>{V(),N([]),R(1)},[V,N,R]),C=x.useCallback(()=>{const n=ro(u,K,a);let $=W;const _=n.map(g=>{const y=_e(g[0],g[1],g[2]),i=xe(y.r,y.g,y.b);return{id:$++,color:`hsl(${g[0]}, ${g[1]}%, ${g[2]}%)`,luminance:i,status:le,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let s=[...u,..._];s=L(s),N(s),R($),J(!1)},[u,K,a,L,N,R]);return x.useEffect(()=>{a&&u.length===0&&C()},[a,u]),{colors:u,setColors:N,setColorsReset:J,addColor:se,removeColor:Y,updateColor:d,resetColors:h,clearColors:b,currentColor:X,setCurrentColor:Z,mode:K,setMode:B,makeColorPalette:C}},ot=x.lazy(()=>no(()=>import("./ColorsInput-BvaQW4lr.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),ne=Ho(5);var Je=(r=>(r.AA_RegularText="AA_RegularText",r.AAA_RegularText="AAA_RegularText",r.AA_UIComponents="AA_UIComponents",r))(Je||{});const D="colors",tt=({language:r})=>{var be,ye,ve,Re,je;const{colors:u,setColors:N,addColor:V,removeColor:X,updateColor:Z,currentColor:W,setCurrentColor:R,resetColors:K,clearColors:B,mode:a,setMode:J,makeColorPalette:L,setColorsReset:ee}=et("analogous"),se=x.useMemo(()=>[D],[]),Y=lo(),d=so(),h=ao(),[b,C]=x.useState(!0),[n,$]=ce("Jenniina-showColorNames",!0),{isDragging:_,listItemsByStatus:s,handleDragging:g,handleUpdate:y}=Zo(u,se),i=x.useRef(0),[k,z]=x.useState(0),F=8,[O,p]=ce("Jenniina-color-block-width",F),l=`${O}em`,j=O/F,c={tooltip:`${.7*j}em`,colorName:`${.7*j}em`,input:`${.8*j}em`},S=[{value:"analogous",label:io[r]},{value:"complementary",label:co[r]},{value:"monochromatic",label:mo[r]},{value:"triad",label:po[r]},{value:"tetrad",label:uo[r]}];let de=Math.floor(Math.random()*S.length);const[P,He]=x.useState(S[de]);x.useEffect(()=>{J(P==null?void 0:P.value)},[P]);const We=()=>{s[D].removeItems(),ee(!0),B()},Q=(t,m)=>{if(m==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(m==="rgb"){const f=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(f){const e=Number(f[1]),v=Number(f[2]),E=Number(f[3]);if([e,v,E].every(I=>I>=0&&I<=255))return Fe(e,v,E);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(m==="hsl"){const f=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(f){let e=ae(0,Number(f[1]),360),v=ae(0,Number(f[2]),100),E=ae(0,Number(f[3]),100);return e=(e+360)%360,v=ae(0,v,100),E=ae(0,E,100),`hsl(${e}, ${v}%, ${E}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${m}`)},Be={AA_RegularText:({xPosition:t,yIndicator:m,blockWidth:f,indicatorSize:e,otherColor:v,blockColor:E,colorFormatBlock:I,colorFormatOther:w})=>{const M=Q(E,I),T=Q(v,w);return`
 <circle
  cx="${t+f/2}"
  cy="${m+e/2}"
  r="${e*.32}"
  fill="${M}"
  stroke="${T}"
  stroke-width="${e*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:m,blockWidth:f,indicatorSize:e,otherColor:v,blockColor:E,colorFormatBlock:I,colorFormatOther:w})=>{const M=Q(E,I),T=Q(v,w);return`
    <rect
  x="${t+f/2-e*.2}"
  y="${m+e/2-e*.15}"
  width="${e*.3}"
  height="${e*.3}"
  fill="${M}"
  stroke="${T}"
  stroke-width="${e*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:m,blockWidth:f,indicatorSize:e,otherColor:v,blockColor:E,colorFormatBlock:I,colorFormatOther:w})=>{const M=Q(v,w);return`
<circle
  cx="${t+f/2}"
  cy="${m+e/2}"
  r="${e/2}"
  fill="${M}"
  stroke="none"
/>
`}},we=()=>{var Ee;const t=O*20,m=t,f=m/3,e=f/1.5,v=t/4,E=f/20,I=m/10,w=((Ee=s[D])==null?void 0:Ee.items)||[],T=(w==null?void 0:w.length)*(f+e)-e+v*2,oe=n?I+v:0,me=w.length*m,Ae=T+oe*1.6,Ye=w==null?void 0:w.map((U,te)=>{const re=te*m;let q;try{q=Q(U.color,U.colorFormat)}catch(H){console.error(H),Y(he(`${Le[r]}: ${H.message}`,!0,4)),q="#000000"}const ue=`
        <rect
          x="${re}"
          y="0"
          width="${m}"
          height="${T}"
          fill="${q}"
          stroke="none"
        />
      `,G=n?`
        <!-- Text Background -->
        <rect
          x="${re}"
          y="${T-.5}"
          width="${m}"
          height="${oe}"
          fill="${q}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${re+m/2}"
          y="${T+oe/2+I/3}"
          font-size="${I}"
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
          ${ue}
          <!-- Color Text Label -->
          ${G}
        </g>
      `}).join(""),Qe=w==null?void 0:w.map((U,te)=>{const q=v+te*(f+e)+(f-E)/2,ue=Q(U.color,U.colorFormat);return`
        <rect
          x="0"
          y="${q}"
          width="${me}"
          height="${E}"
          fill="${ue}"
          stroke="none"
        />
      `}).join(""),Ze=w==null?void 0:w.map((U,te)=>{const re=te*m,q=G=>{var H,Ne,Te,ke,Se,Ue;return(Ne=(H=U.compliantColors)==null?void 0:H.AAA_RegularText)!=null&&Ne.includes(G)?"AAA_RegularText":(ke=(Te=U.compliantColors)==null?void 0:Te.AA_RegularText)!=null&&ke.includes(G)?"AA_RegularText":(Ue=(Se=U.compliantColors)==null?void 0:Se.AA_UIComponents)!=null&&Ue.includes(G)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${w==null?void 0:w.filter((G,H)=>H!==te).map(G=>{const H=q(G.id);return H?Be[H]({xPosition:re,yIndicator:v+w.indexOf(G)*(f+e),blockWidth:m,indicatorSize:f,otherColor:G.color,blockColor:U.color,colorFormatBlock:U.colorFormat,colorFormatOther:G.colorFormat}):""}).join("")}
        </g>
      `}).join(""),$e=10,eo=me-$e,Ie=Ae-$e*1.5,pe="https://colors.jenniina.fi",oo=`
      <a href="${pe}" target="_blank" rel="noopener noreferrer">
        <text
          x="${eo}"
          y="${Ie}"
          font-size="${I}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${pe}
        </text>
      </a>
    `,to=`
      <a href="${pe}" target="_blank" rel="noopener noreferrer">
        <text
          x="${$e}"
          y="${Ie}"
          font-size="${I}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${pe}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${me}" height="${Ae}">
      <!-- Color Blocks -->
      <g>
        ${Ye}
      </g>
      <!-- Lines -->
      <g>
        ${Qe}
      </g>
      <!-- Compliance Indicators -->
      <g>
        ${Ze}
      </g>
      <!-- Source Link -->
      <g>
        ${to}
      </g>
      <g>
        ${oo}
      </g>
    </svg>
  `,svgWidth:me,svgHeight:Ae}},ze=()=>{const{svgContent:t}=we(),m=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),f=URL.createObjectURL(m),e=document.createElement("a");e.href=f,e.download="color-blocks.svg",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(f),Y(he(Oe[r],!1,5))},Pe=()=>{const{svgContent:t,svgWidth:m,svgHeight:f}=we(),e=new Image;e.width=m,e.height=f;const v=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),E=URL.createObjectURL(v);e.onload=()=>{const I=document.createElement("canvas");I.width=m,I.height=f;const w=I.getContext("2d");w==null||w.drawImage(e,0,0);const M=I.toDataURL("image/png"),T=document.createElement("a");T.href=M,T.download="color-blocks.png",document.body.appendChild(T),T.click(),document.body.removeChild(T),URL.revokeObjectURL(E),Y(he(Oe[r],!1,5))},e.onerror=I=>{console.error("Error loading SVG into image for PNG conversion:",I),URL.revokeObjectURL(E),Y(he(Le[r],!0,4))},e.src=E},Ve=(t,m)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:m}))},Ke=(t,m)=>{t.preventDefault(),z(m),i.current=m},qe=t=>{t.preventDefault(),g(!0)},Xe=t=>{const m=JSON.parse(t.dataTransfer.getData("text/plain"));m.type==="item"&&(y(m.id,D,k),setTimeout(()=>{var f;N((f=s[D])==null?void 0:f.items)},200),g(!1))};x.useEffect(()=>{var t,m;(!((t=s[D])!=null&&t.items)||((m=s[D])==null?void 0:m.items.length)<1)&&K()},[]);const ge=.04;return o.jsxs("div",{id:A["color-container"],className:`${A["color-container"]} ${d?A.light:""}`,style:{"--font-size":c.input},children:[o.jsx("div",{id:"info",className:A["info-wrap"],children:o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),o.jsx("span",{children:ho[r]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),o.jsx("span",{children:fo[r]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),o.jsx("span",{children:go[r]})]})]})}),o.jsxs("div",{className:A["btn-wrap"],children:[((ye=(be=s[D])==null?void 0:be.items)==null?void 0:ye.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{type:"button",onClick:Pe,className:"gray small",children:[Ao[r],"  ",o.jsx(Me,{})]}),o.jsxs("button",{type:"button",onClick:ze,className:"gray small",children:[$o[r],"  ",o.jsx(Me,{})]})]}),o.jsx("button",{onClick:h,className:"gray small",children:d?o.jsxs(o.Fragment,{children:[xo[r],"  ",o.jsx(Wo,{})]}):o.jsxs(o.Fragment,{children:[Co[r],"  ",o.jsx(Bo,{})," "]})})]}),o.jsxs("div",{className:A["color-picker"],children:[o.jsxs("label",{htmlFor:"color-input",className:" ",children:[_o[r],":"]}),o.jsx("input",{id:"color-input",type:"color",value:W,onChange:t=>R(t.target.value)}),o.jsx("button",{className:"gray small",type:"button",onClick:V,children:wo[r]}),o.jsx("button",{className:"gray small",type:"button",onClick:K,children:bo[r]}),o.jsx("button",{className:"gray small",type:"button",onClick:()=>{s[D].removeItems(),B()},children:yo[r]}),o.jsxs("div",{className:`${A["color-edit-container"]} ${A["mode-container"]}`,children:[o.jsx(vo,{options:S,value:P,onChange:t=>He(t),id:"color-mode",instructions:Ro[r],className:`${A["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),o.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:L,children:[jo[r],o.jsx("span",{className:"tooltip above narrow2",children:Io[r]})]}),o.jsx("button",{className:"gray small",type:"button",onClick:We,children:Eo[r]})]})]}),o.jsx("div",{id:"color-blocks",className:`${A["color-blocks"]} ${!n||!b?A.overflow:""} ${_?A.drag:""}`,children:(ve=s[D])==null?void 0:ve.items.map(t=>{var m,f;return o.jsx("ul",{className:A["block-wrap"],onDrop:Xe,children:o.jsxs("li",{className:A["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${l}`,maxWidth:`${l}`},children:[o.jsx("ul",{children:o.jsx("li",{draggable:"true",onDragStart:e=>Ve(e,t.id),onDragEnter:e=>Ke(e,t.id),onDragOver:e=>qe(e),onDragEnd:()=>g(!1),"data-identity":t.id,className:A["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${l}`,maxWidth:`${l}`,height:`calc(calc(${l} * 0.6) * ${(m=s[D])==null?void 0:m.items.length})`},children:o.jsx("div",{className:A["compliance-indicators"],style:{gap:`calc(${l} / 4)`,"--width-full":`${l}`},children:(f=s[D])==null?void 0:f.items.map(e=>{var E,I,w,M,T,oe;if(e.id===t.id)return o.jsx("div",{className:`${A["indicator-null"]} ${A.indicator}`,style:{"--color":e.color,"--width":`calc(${l} / 3)`,"--left":`calc(calc(${l} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${l} / 3)`,height:`calc(${l} / 3)`}},`none-${e.color}-${e.id}`);let v=null;return(I=(E=t.compliantColors)==null?void 0:E.AAA_RegularText)!=null&&I.includes(e.id)?v="AAA_RegularText":(M=(w=t.compliantColors)==null?void 0:w.AA_RegularText)!=null&&M.includes(e.id)?v="AA_RegularText":(oe=(T=t.compliantColors)==null?void 0:T.AA_UIComponents)!=null&&oe.includes(e.id)&&(v="AA_UIComponents"),v==="AAA_RegularText"?o.jsx("div",{tabIndex:0,className:`${A["indicator-aaa"]} ${A.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:e.color,"--left":`calc(calc(${l} / 3) * -1)`,width:`calc(${l} / 3)`,height:`calc(${l} / 3)`},"aria-labelledby":`span-${e.id}-${t.id}-${ne}`,children:o.jsx("span",{id:`span-${e.id}-${t.id}-${ne}`,className:`tooltip below narrow3 ${A.tooltip}`,style:{fontSize:`clamp(0.7rem, ${c.input}, 0.9rem)`,"--tooltip-max-width":l},children:`${No[r]}: ${e.id}`})},`aaa-${e.color}-${e.id}`):v==="AA_RegularText"?o.jsx("div",{tabIndex:0,className:`${A["indicator-aa"]} ${A.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:t.color,outline:`calc(${l} * ${ge*1.1}) solid ${e.color}`,outlineOffset:`calc(${l} * -0.013)`,"--left":`calc(calc(${l} / 5) * -2)`,width:`calc(${l} / 5)`,height:`calc(${l} / 5)`,margin:`calc(${l} / 15)`,borderRadius:"50%"},"aria-labelledby":`span-${e.id}-${t.id}-${ne}`,children:o.jsx("span",{id:`span-${e.id}-${t.id}-${ne}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${c.input}, 0.9rem)`,"--tooltip-max-width":l},children:`${To[r]}: ${e.id}`})},`aa-${e.color}-${e.id}`):v==="AA_UIComponents"?o.jsx("div",{tabIndex:0,className:`${A["indicator-aa-ui"]} ${A.indicator} tooltip-wrap`,style:{"--color":e.color,"--left":`calc(calc(${l} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${l} * ${ge}) solid ${e.color}`,outlineOffset:`calc(${l} * ${ge} * -1)`,width:`calc(${l} / 7)`,height:`calc(${l} / 7)`,margin:`calc(${l} / 10.5)`},"aria-labelledby":`span-ui-${e.id}-${t.id}-${ne}`,children:o.jsx("span",{id:`span-ui-${e.id}-${t.id}-${ne}`,className:`tooltip below narrow3 ${A.tooltip}`,style:{fontSize:`clamp(0.7rem, ${c.input}, 0.9rem)`,"--tooltip-max-width":l},children:`${ko[r]}: ${e.id}`})},`aa-ui-${e.color}-${e.id}`):o.jsx("div",{"aria-hidden":"true",className:`${A["indicator-null"]} ${A.indicator}`,style:{"--color":e.color,backgroundColor:"transparent","--left":`calc(calc(${l} / 3) * -1)`,width:`calc(${l} / 3)`,height:`calc(${l} / 3)`}},`null-${e.color}-${e.id}`)})})})}),n&&o.jsx("div",{style:{backgroundColor:t.color,width:`${l}`,maxWidth:`${l}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:A["color-name"],children:o.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${c.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),b&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:A["color-edit-container"],children:o.jsx(x.Suspense,{fallback:o.jsxs("div",{children:[So[r],"..."]}),children:o.jsx(ot,{language:r,block:t,updateColor:Z,width:l,hexToRGB:Ce,rgbToHSL:Ge,rgbToHex:Fe,hslToRGB:_e,fontSize:`clamp(0.75rem, ${c.input}, 1rem)`})})}),o.jsx("button",{className:`tooltip-wrap small delete danger gray ${A.remove}`,onClick:()=>X(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${c.input}, 2rem)`},children:Uo[r]})]})]})},`${t.id}`)})}),((je=(Re=s[D])==null?void 0:Re.items)==null?void 0:je.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:A["width-wrap"],children:[o.jsx("label",{htmlFor:"color-block-width",children:Do[r]}),o.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:O,onChange:t=>p(Number(t.target.value))})]}),o.jsxs("div",{className:`${A["toggle-controls"]}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:Fo[r]}),o.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>C(!b),className:"gray small",children:b?Oo[r]:Lo[r]})]}),o.jsxs("div",{children:[o.jsx("strong",{children:Mo[r]}),o.jsx("button",{type:"button",onClick:()=>$(!n),className:"gray small",children:n?Go[r]:Jo[r]})]})]})]})]})},at=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:Je,default:tt},Symbol.toStringTag,{value:"Module"}));export{at as A,A as s};
