const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-D7l_ZG3c.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/index-Clfw_fQ4.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-CzVo0GbG.js","assets/react-router-dom-StiqOUIT.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-D4F6nkb-.css"])))=>i.map(i=>d[i]);
import{q as ge,y as Oe,z as xe,B as Ge,C as _e,D as fe,F as to,_ as ro,L as lo,u as no,l as ao,G as so,S as co,H as Le,I as io,e as me,J as ae}from"./index-Clfw_fQ4.js";import{r as _,j as o}from"./react-kX_YxI4E.js";import{P as Me,u as mo,v as uo}from"./react-icons-CzVo0GbG.js";import{u as go}from"./react-router-dom-StiqOUIT.js";const po="_light_1wloj_39",ho="_drag_1wloj_223",Ao="_overflow_1wloj_237",fo="_indicator_1wloj_345",$o="_tooltip_1wloj_345",xo="_form_1wloj_515",_o="_remove_1wloj_543",Co="_inputs_1wloj_573",f={"color-container":"_color-container_1wloj_1",light:po,"color-picker":"_color-picker_1wloj_57","width-wrap":"_width-wrap_1wloj_111","btn-wrap":"_btn-wrap_1wloj_125","info-wrap":"_info-wrap_1wloj_143","color-blocks":"_color-blocks_1wloj_191",drag:ho,overflow:Ao,"block-wrap":"_block-wrap_1wloj_245","color-wrap":"_color-wrap_1wloj_263","color-block":"_color-block_1wloj_191","compliance-indicators":"_compliance-indicators_1wloj_323",indicator:fo,tooltip:$o,"indicator-aaa":"_indicator-aaa_1wloj_375","indicator-null":"_indicator-null_1wloj_383","compliance-info":"_compliance-info_1wloj_391","toggle-controls":"_toggle-controls_1wloj_399","color-edit-container":"_color-edit-container_1wloj_429","color-select":"_color-select_1wloj_431","mode-container":"_mode-container_1wloj_489",form:xo,"color-format-submit":"_color-format-submit_1wloj_541",remove:_o,"color-name":"_color-name_1wloj_557",inputs:Co,"hex-input":"_hex-input_1wloj_603"},wo=(D,g)=>{const[k,V]=_.useState(!1),[Y,ne]=_.useState(D),B=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",y=_.useMemo(()=>g==null?void 0:g.map(p=>`${B?"local-":""}DnD-${p}`),[g,B]),K=_.useCallback(()=>g==null?void 0:g.reduce((p,m,R)=>{const w=JSON.parse(localStorage.getItem(y[R])||"[]");return p[m]={items:w.length>0?w:D.filter(b=>b.status===m),setItems:b=>{localStorage.setItem(y[R],JSON.stringify(b)),G(l=>({...l,[m]:{...l[m],items:b}}))},removeItems:()=>{localStorage.removeItem(y[R]),G(b=>({...b,[m]:{...b[m],items:[]}}))}},p},{}),[g,y]),Q=(p,m)=>JSON.stringify(p)===JSON.stringify(m),[a,G]=_.useState(K);_.useEffect(()=>{g.forEach((p,m)=>{var c;const R=((c=a[p])==null?void 0:c.items)||[],w=D.filter(d=>d.status===p),b=new Map(w.map(d=>[d.id,d])),l=R.map(d=>{const I=b.get(d.id);return I&&JSON.stringify(d)!==JSON.stringify(I)?I:d}).filter(d=>b.has(d.id)),h=new Set(R.map(d=>d.id)),A=w.filter(d=>!h.has(d.id)),$=[...l,...A];Q(R,$)||a[p].setItems($)}),g.forEach((p,m)=>{var w;const R=((w=a[p])==null?void 0:w.items)||[];localStorage.setItem(y[m],JSON.stringify(R))})},[D,g,y,Q]),_.useEffect(()=>{ne(g.flatMap(p=>{var m;return((m=a[p])==null?void 0:m.items)||[]}))},[a]),_.useEffect(()=>{g.forEach((p,m)=>{var w;const R=((w=a[p])==null?void 0:w.items)||[];localStorage.setItem(y[m],JSON.stringify(R))})},[Y,g,y,a]);const H=_.useCallback((p,m,R)=>{var $,c,d,I,q,W,O,J,s,S;const w=($=Object.keys(a))==null?void 0:$.find(r=>{var j,U;return(U=(j=a==null?void 0:a[r])==null?void 0:j.items)==null?void 0:U.find(z=>(z==null?void 0:z.id)===p)});if(!w)return;const b=(d=(c=a==null?void 0:a[w])==null?void 0:c.items)==null?void 0:d.find(r=>(r==null?void 0:r.id)===p),l=(q=(I=a==null?void 0:a[m])==null?void 0:I.items)==null?void 0:q.findIndex(r=>(r==null?void 0:r.id)===R);if(!b)return;b.status=m;const h=(O=(W=a==null?void 0:a[w])==null?void 0:W.items)==null?void 0:O.filter(r=>r.id!==p);(J=a==null?void 0:a[w])==null||J.setItems(h);let A=[...(s=a==null?void 0:a[m])==null?void 0:s.items];return A=A.filter(r=>r.id!==b.id),A.splice(l>=0?l:A.length,0,b),(S=a==null?void 0:a[m])==null||S.setItems(A),G(r=>({...r,[w]:{...r[w],items:h},[m]:{...r[m],items:A}})),A},[a,G]),ee=_.useCallback((p,m)=>{if(p===m)return;const R=g==null?void 0:g.indexOf(p);if(R===-1){console.error(`Old status "${p}" not found in statuses array`);return}const w=y[R],b=`${B?"local-":""}DnD-${m}`,l=a[p].items.map(h=>({...h,status:m}));G(h=>({...h,[p]:{...h[p],items:[]},[m]:{...h[m],items:l}})),localStorage.setItem(b,JSON.stringify(l)),localStorage.removeItem(w)},[a,y,g]);return{isDragging:k,listItemsByStatus:a,handleUpdate:H,handleRenameStatus:ee,handleDragging:p=>V(p)}},le="colors",se="hsl",ue=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:le,colorFormat:se,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:le,colorFormat:se,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:le,colorFormat:se,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:le,colorFormat:se,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:le,colorFormat:se,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],bo=D=>{const[g,k,V]=ge("Jenniina-colorsAccessibility",ue),[Y,ne]=ge("Jenniina-currentColor","#7D7D7D"),[B,y]=ge("Jenniina-idCounter",ue.length+1),[K,Q]=_.useState(D),[a,G]=_.useState(!1),H=_.useCallback(l=>l.map(h=>{const A=ee(h,l);return{...h,compliantColors:A}}),[]),ee=(l,h)=>{let A=[],$=[],c=[];return h.forEach(d=>{if(d.id===l.id)return;const I=Oe(l,d);I.isAAARegularTextCompliant&&A.push(d.id),I.isAARegularTextCompliant&&c.push(d.id),I.isAAUIComponentsCompliant&&$.push(d.id)}),{AAA_RegularText:Array.from(new Set(A)),AA_RegularText:Array.from(new Set(c)),AA_UIComponents:Array.from(new Set($))}},i=_.useCallback(()=>{const{r:l,g:h,b:A}=xe(Y),{h:$,s:c,l:d}=Ge(l,h,A),I=fe(l,h,A),q={id:B,color:`hsl(${$}, ${c}%, ${d}%)`,luminance:I,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},W=[...g,q],O=H(W);k(O),y(J=>J+1)},[Y,B,H,k,y,g]),p=_.useCallback(l=>{const h=g.filter($=>$.id!==l).map($=>({...$,compliantColors:{AAA_RegularText:$.compliantColors.AAA_RegularText.filter(c=>c!==l),AA_RegularText:$.compliantColors.AA_RegularText.filter(c=>c!==l),AA_UIComponents:$.compliantColors.AA_UIComponents.filter(c=>c!==l)}})),A=H(h);k(A)},[g,H,k]),m=_.useCallback((l,h,A)=>{try{let $,c,d,I;if(A==="hsl"){const s=h.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!s)throw new Error("Invalid HSL format");const S=Number(s[1]),r=Number(s[2]),j=Number(s[3]);if(S<0||S>360||r<0||r>100||j<0||j>100)throw new Error("HSL values out of range");$=`hsl(${S}, ${r}%, ${j}%)`;const U=_e(S,r,j);c=U.r,d=U.g,I=U.b}else if(A==="rgb"){const s=h.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!s)throw new Error("Invalid RGB format");const S=Number(s[1]),r=Number(s[2]),j=Number(s[3]);if([S,r,j].some(U=>U<0||U>255))throw new Error("RGB values must be between 0 and 255");$=`rgb(${S}, ${r}, ${j})`,c=S,d=r,I=j}else if(A==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test(h))throw new Error("Invalid Hex format");$=h.toUpperCase();const s=xe($);c=s.r,d=s.g,I=s.b}else throw new Error("Unsupported color format");const q=fe(c,d,I),W=g.map(s=>s.id===l?{...s,color:$,colorFormat:A,luminance:q,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:s),O=W.map(s=>{if(s.id===l)return s;const S=W.find(j=>j.id===l);if(!S)return s;const r=Oe(s,S);return{...s,compliantColors:{AAA_RegularText:r.isAAARegularTextCompliant?[...new Set([...s.compliantColors.AAA_RegularText,l])]:s.compliantColors.AAA_RegularText.filter(j=>j!==l),AA_RegularText:r.isAARegularTextCompliant?[...new Set([...s.compliantColors.AA_RegularText,l])]:s.compliantColors.AA_RegularText.filter(j=>j!==l),AA_UIComponents:r.isAAUIComponentsCompliant?[...new Set([...s.compliantColors.AA_UIComponents,l])]:s.compliantColors.AA_UIComponents.filter(j=>j!==l)}}}),J=O.find(s=>s.id===l);if(J){const s=ee(J,O),S=O.map(r=>r.id===l?{...r,compliantColors:s}:r);k(S)}else k(O)}catch($){console.error("Error updating color:",$)}},[g,k]),R=_.useCallback(()=>{V(),k(ue),y(ue.length+1)},[V,k,y]),w=_.useCallback(()=>{V(),k([]),y(1)},[V,k,y]),b=_.useCallback(()=>{const l=to(g,K,a);let h=B;const A=l.map(c=>{const d=_e(c[0],c[1],c[2]),I=fe(d.r,d.g,d.b);return{id:h++,color:`hsl(${c[0]}, ${c[1]}%, ${c[2]}%)`,luminance:I,status:le,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let $=[...g,...A];$=H($),k($),y(h),G(!1)},[g,K,a,H,k,y]);return _.useEffect(()=>{a&&g.length===0&&b()},[a,g]),{colors:g,setColors:k,setColorsReset:G,addColor:i,removeColor:p,updateColor:m,resetColors:R,clearColors:w,currentColor:Y,setCurrentColor:ne,mode:K,setMode:Q,makeColorPalette:b}},jo=_.lazy(()=>ro(()=>import("./ColorsInput-D7l_ZG3c.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),$e=io(5);var He=(D=>(D.AA_RegularText="AA_RegularText",D.AAA_RegularText="AAA_RegularText",D.AA_UIComponents="AA_UIComponents",D))(He||{});const F="colors",vo=({language:D})=>{var je,ve,ye,Re,Ie,Te;const{colors:g,setColors:k,addColor:V,removeColor:Y,updateColor:ne,currentColor:B,setCurrentColor:y,resetColors:K,clearColors:Q,mode:a,setMode:G,makeColorPalette:H,setColorsReset:ee}=bo("analogous"),{t:i}=_.useContext(lo),p=_.useMemo(()=>[F],[]),m=no(),R=ao(),w=so(),[b,l]=go({show:"true",name:"true",mode:"analogous"}),h=(b.get("show")||"true")==="true",A=(b.get("name")||"true")==="true",{isDragging:$,listItemsByStatus:c,handleDragging:d,handleUpdate:I}=wo(g,p),q=_.useRef(0),[W,O]=_.useState(0),J=8,[s,S]=ge("Jenniina-color-block-width",J),r=`${s}em`,j=s/J,U={tooltip:`${.7*j}em`,colorName:`${.7*j}em`,input:`${.8*j}em`},z=[{value:"analogous",label:i("Analogous")},{value:"complementary",label:i("Complementary")},{value:"monochromatic",label:i("Monochromatic")},{value:"triad",label:i("Triad")},{value:"tetrad",label:i("Tetrad")}],Ce=Math.floor(Math.random()*z.length),we=b.get("mode")||z[Ce];_.useEffect(()=>{G(we)},[we]);const Je=()=>{c[F].removeItems(),ee(!0),Q()},Z=(t,n)=>{if(n==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(n==="rgb"){const u=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(u){const e=Number(u[1]),C=Number(u[2]),T=Number(u[3]);if([e,C,T].every(v=>v>=0&&v<=255))return Le(e,C,T);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(n==="hsl"){const u=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(u){let e=ae(0,Number(u[1]),360),C=ae(0,Number(u[2]),100),T=ae(0,Number(u[3]),100);return e=(e+360)%360,C=ae(0,C,100),T=ae(0,T,100),`hsl(${e}, ${C}%, ${T}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${n}`)},Pe={AA_RegularText:({xPosition:t,yIndicator:n,blockWidth:u,indicatorSize:e,otherColor:C,blockColor:T,colorFormatBlock:v,colorFormatOther:x})=>{const L=Z(T,v),N=Z(C,x);return`
 <circle
  cx="${t+u/2}"
  cy="${n+e/2}"
  r="${e*.32}"
  fill="${L}"
  stroke="${N}"
  stroke-width="${e*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:n,blockWidth:u,indicatorSize:e,otherColor:C,blockColor:T,colorFormatBlock:v,colorFormatOther:x})=>{const L=Z(T,v),N=Z(C,x);return`
    <rect
  x="${t+u/2-e*.2}"
  y="${n+e/2-e*.15}"
  width="${e*.3}"
  height="${e*.3}"
  fill="${L}"
  stroke="${N}"
  stroke-width="${e*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:n,blockWidth:u,indicatorSize:e,otherColor:C,blockColor:T,colorFormatBlock:v,colorFormatOther:x})=>{const L=Z(C,x);return`
<circle
  cx="${t+u/2}"
  cy="${n+e/2}"
  r="${e/2}"
  fill="${L}"
  stroke="none"
/>
`}},be=()=>{var ke;const t=s*20,n=t,u=n/3,e=u/1.5,C=t/4,T=u/20,v=n/10,x=((ke=c[F])==null?void 0:ke.items)||[],N=(x==null?void 0:x.length)*(u+e)-e+C*2,oe=A?v+C:0,ce=x.length*n,he=N+oe*1.6,Xe=x==null?void 0:x.map((E,te)=>{const re=te*n;let X;try{X=Z(E.color,E.colorFormat)}catch(P){console.error(P),m(me(`${i("Error")}: ${P.message}`,!0,4)),X="#000000"}const de=`
        <rect
          x="${re}"
          y="0"
          width="${n}"
          height="${N}"
          fill="${X}"
          stroke="none"
        />
      `,M=A?`
        <!-- Text Background -->
        <rect
          x="${re}"
          y="${N-.5}"
          width="${n}"
          height="${oe}"
          fill="${X}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${re+n/2}"
          y="${N+oe/2+v/3}"
          font-size="${v}"
          font-family="Arial"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${E.luminance>.179?"#000000":"#FFFFFF"}"
          stroke="none"
        >
          ${E.color}
        </text>
      `:"";return`
        <g>
          <!-- Color Block -->
          ${de}
          <!-- Color Text Label -->
          ${M}
        </g>
      `}).join(""),Ye=x==null?void 0:x.map((E,te)=>{const X=C+te*(u+e)+(u-T)/2,de=Z(E.color,E.colorFormat);return`
        <rect
          x="0"
          y="${X}"
          width="${ce}"
          height="${T}"
          fill="${de}"
          stroke="none"
        />
      `}).join(""),Qe=x==null?void 0:x.map((E,te)=>{const re=te*n,X=M=>{var P,Se,Ue,De,Ee,Fe;return(Se=(P=E.compliantColors)==null?void 0:P.AAA_RegularText)!=null&&Se.includes(M)?"AAA_RegularText":(De=(Ue=E.compliantColors)==null?void 0:Ue.AA_RegularText)!=null&&De.includes(M)?"AA_RegularText":(Fe=(Ee=E.compliantColors)==null?void 0:Ee.AA_UIComponents)!=null&&Fe.includes(M)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${x==null?void 0:x.filter((M,P)=>P!==te).map(M=>{const P=X(M.id);return P?Pe[P]({xPosition:re,yIndicator:C+x.indexOf(M)*(u+e),blockWidth:n,indicatorSize:u,otherColor:M.color,blockColor:E.color,colorFormatBlock:E.colorFormat,colorFormatOther:M.colorFormat}):""}).join("")}
        </g>
      `}).join(""),Ae=10,Ze=ce-Ae,Ne=he-Ae*1.5,ie="https://colors.jenniina.fi",eo=`
      <a href="${ie}" target="_blank" rel="noopener noreferrer">
        <text
          x="${Ze}"
          y="${Ne}"
          font-size="${v}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${ie}
        </text>
      </a>
    `,oo=`
      <a href="${ie}" target="_blank" rel="noopener noreferrer">
        <text
          x="${Ae}"
          y="${Ne}"
          font-size="${v}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${ie}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${ce}" height="${he}">
      <!-- Color Blocks -->
      <g>
        ${Xe}
      </g>
      <!-- Lines -->
      <g>
        ${Ye}
      </g>
      <!-- Compliance Indicators -->
      <g>
        ${Qe}
      </g>
      <!-- Source Link -->
      <g>
        ${oo}
      </g>
      <g>
        ${eo}
      </g>
    </svg>
  `,svgWidth:ce,svgHeight:he}},Be=()=>{const{svgContent:t}=be(),n=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(n),e=document.createElement("a");e.href=u,e.download="color-blocks.svg",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(u),m(me(i("ArtSaved"),!1,5))},We=()=>{const{svgContent:t,svgWidth:n,svgHeight:u}=be(),e=new Image;e.width=n,e.height=u;const C=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),T=URL.createObjectURL(C);e.onload=()=>{const v=document.createElement("canvas");v.width=n,v.height=u;const x=v.getContext("2d");x==null||x.drawImage(e,0,0);const L=v.toDataURL("image/png"),N=document.createElement("a");N.href=L,N.download="color-blocks.png",N.target="_blank",N.rel="noreferrer",document.body.appendChild(N),N.click(),document.body.removeChild(N),URL.revokeObjectURL(T),m(me(i("ArtSaved"),!1,5))},e.onerror=v=>{console.error("Error loading SVG into image for PNG conversion:",v),URL.revokeObjectURL(T),m(me(i("Error"),!0,4))},e.src=T},ze=(t,n)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:n}))},Ve=(t,n)=>{t.preventDefault(),O(n),q.current=n},Ke=t=>{t.preventDefault(),d(!0)},qe=t=>{const n=JSON.parse(t.dataTransfer.getData("text/plain"));n.type==="item"&&(I(n.id,F,W),setTimeout(()=>{var u;k((u=c[F])==null?void 0:u.items)},200),d(!1))};_.useEffect(()=>{var t,n;(!((t=c[F])!=null&&t.items)||((n=c[F])==null?void 0:n.items.length)<1)&&K()},[]);const pe=.04;return o.jsxs("div",{id:f["color-container"],className:`${f["color-container"]} ${R?f.light:""}`,style:{"--font-size":U.input},children:[o.jsx("div",{id:"info",className:f["info-wrap"],children:o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),o.jsx("span",{children:i("HighestAAAComplianceWithRegularText")})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),o.jsx("span",{children:i("MinimumAAComplianceWithRegularText")})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),o.jsx("span",{children:i("AAACompliantWithUI")})]})]})}),o.jsxs("div",{className:f["btn-wrap"],children:[((ve=(je=c[F])==null?void 0:je.items)==null?void 0:ve.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{type:"button",onClick:We,className:"gray small",children:[i("SaveAsPNG"),"  ",o.jsx(Me,{})]}),o.jsxs("button",{type:"button",onClick:Be,className:"gray small",children:[i("SaveAsSVG"),"  ",o.jsx(Me,{})]})]}),o.jsx("button",{onClick:w,className:"gray small",children:R?o.jsxs(o.Fragment,{children:[i("DarkMode"),"  ",o.jsx(mo,{})]}):o.jsxs(o.Fragment,{children:[i("LightMode"),"  ",o.jsx(uo,{})," "]})})]}),o.jsxs("div",{className:f["color-picker"],children:[o.jsxs("label",{htmlFor:"color-input",className:" ",children:[i("ColorPicker"),":"]}),o.jsx("input",{id:"color-input",type:"color",value:B,onChange:t=>y(t.target.value)}),o.jsx("button",{className:"gray small",type:"button",onClick:V,children:i("AddAColor")}),o.jsx("button",{className:"gray small",type:"button",onClick:K,children:i("Reset")}),o.jsx("button",{className:"gray small",type:"button",onClick:()=>{c[F].removeItems(),Q()},children:i("Clear")}),o.jsxs("div",{className:`${f["color-edit-container"]} ${f["mode-container"]}`,children:[o.jsx(co,{options:z,value:{value:a,label:(ye=z.find(t=>t.value===a))==null?void 0:ye.label},onChange:t=>l(n=>(n.set("mode",(t==null?void 0:t.value)||z[Ce].value),n),{replace:!0,preventScrollReset:!0}),id:"color-mode",instructions:i("SelectColorModeForNewColors"),className:`${f["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),o.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:H,children:[i("GenerateColors"),o.jsx("span",{className:"tooltip above narrow2",children:i("GeneratesColorsBasedOnLastColor")})]}),o.jsx("button",{className:"gray small",type:"button",onClick:Je,children:i("ClearAndGenerateNew")})]})]}),o.jsx("div",{id:"color-blocks",className:`${f["color-blocks"]} ${!A||!h?f.overflow:""} ${$?f.drag:""}`,children:(Re=c[F])==null?void 0:Re.items.map(t=>{var n,u;return o.jsx("ul",{className:f["block-wrap"],onDrop:qe,children:o.jsxs("li",{className:f["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[o.jsx("ul",{children:o.jsx("li",{draggable:"true",onDragStart:e=>ze(e,t.id),onDragEnter:e=>Ve(e,t.id),onDragOver:e=>Ke(e),onDragEnd:()=>d(!1),"data-identity":t.id,className:f["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(n=c[F])==null?void 0:n.items.length})`},children:o.jsx("div",{className:f["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(u=c[F])==null?void 0:u.items.map(e=>{var T,v,x,L,N,oe;if(e.id===t.id)return o.jsx("div",{className:`${f["indicator-null"]} ${f.indicator}`,style:{"--color":e.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${e.color}-${e.id}`);let C=null;return(v=(T=t.compliantColors)==null?void 0:T.AAA_RegularText)!=null&&v.includes(e.id)?C="AAA_RegularText":(L=(x=t.compliantColors)==null?void 0:x.AA_RegularText)!=null&&L.includes(e.id)?C="AA_RegularText":(oe=(N=t.compliantColors)==null?void 0:N.AA_UIComponents)!=null&&oe.includes(e.id)&&(C="AA_UIComponents"),C==="AAA_RegularText"?o.jsx("div",{tabIndex:0,className:`${f["indicator-aaa"]} ${f.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:e.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${$e}`,className:`tooltip below narrow3 ${f.tooltip}`,style:{fontSize:`clamp(0.7rem, ${U.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${i("AAACompliantWithID")}: ${e.id}`})},`aaa-${e.color}-${e.id}`):C==="AA_RegularText"?o.jsx("div",{tabIndex:0,className:`${f["indicator-aa"]} ${f.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:t.color,outline:`calc(${r} * ${pe*1.1}) solid ${e.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${$e}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${U.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${i("AACompliantWithID")}: ${e.id}`})},`aa-${e.color}-${e.id}`):C==="AA_UIComponents"?o.jsx("div",{tabIndex:0,className:`${f["indicator-aa-ui"]} ${f.indicator} tooltip-wrap`,style:{"--color":e.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${r} * ${pe}) solid ${e.color}`,outlineOffset:`calc(${r} * ${pe} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},children:o.jsx("span",{id:`span-ui-${e.id}-${t.id}-${$e}`,className:`tooltip below narrow3 ${f.tooltip}`,style:{fontSize:`clamp(0.7rem, ${U.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${i("AAGraphicElementCompliantWithID")}: ${e.id}`})},`aa-ui-${e.color}-${e.id}`):o.jsx("div",{"aria-hidden":"true",className:`${f["indicator-null"]} ${f.indicator}`,style:{"--color":e.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${e.color}-${e.id}`)})})})}),A&&o.jsx("div",{style:{backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:f["color-name"],children:o.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${U.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),h&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:f["color-edit-container"],children:o.jsx(_.Suspense,{fallback:o.jsxs("div",{className:"flex center margin0auto textcenter",children:[i("Loading"),"..."]}),children:o.jsx(jo,{language:D,block:t,updateColor:ne,width:r,hexToRGB:xe,rgbToHSL:Ge,rgbToHex:Le,hslToRGB:_e,fontSize:`clamp(0.75rem, ${U.input}, 1rem)`})})}),o.jsx("button",{className:`tooltip-wrap small delete danger gray ${f.remove}`,onClick:()=>Y(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${U.input}, 2rem)`},children:i("Remove")})]})]})},`${t.id}`)})}),((Te=(Ie=c[F])==null?void 0:Ie.items)==null?void 0:Te.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:f["width-wrap"],children:[o.jsx("label",{htmlFor:"color-block-width",children:i("EditSize")}),o.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:s,onChange:t=>S(Number(t.target.value))})]}),o.jsxs("div",{className:`${f["toggle-controls"]}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:i("ToggleControlVisibility")}),o.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>l(t=>(t.set("show",h?"false":"true"),t),{replace:!0,preventScrollReset:!0}),className:"gray small",children:i(h?"HideControls":"ShowControls")})]}),o.jsxs("div",{children:[o.jsx("strong",{children:i("ToggleColorNameVisibility")}),o.jsx("button",{type:"button",onClick:()=>l(t=>(t.set("name",A?"false":"true"),t),{replace:!0,preventScrollReset:!0}),className:"gray small",children:i(A?"HideColorName":"ShowColorName")})]})]})]})]})},ko=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:He,default:vo},Symbol.toStringTag,{value:"Module"}));export{ko as A,f as s};
