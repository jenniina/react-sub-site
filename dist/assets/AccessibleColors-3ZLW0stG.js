const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-CMJW6la8.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-DuelJnhs.js","assets/react-dom-CxfJ6lHP.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-C4cSaZU-.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-atCsfckx.js","assets/react-router-dom-CYs6befe.js","assets/react-router-S1Hdk0kP.js","assets/@remix-run-DTnHqtaE.js","assets/index-DdktCQqS.css"])))=>i.map(i=>d[i]);
import{u as ie,fB as De,fC as Ce,fD as Ge,fE as _e,fF as $e,fG as ro,fH as no,K as lo,bR as so,fI as ao,fJ as io,fK as co,fL as mo,fM as po,fN as uo,fO as ho,fP as go,fQ as fo,fR as Ao,fS as $o,z as xo,A as Co,fT as _o,fU as bo,ap as wo,fV as vo,S as yo,fW as Ro,fX as jo,fY as Eo,fZ as No,f_ as To,f$ as Io,g0 as ko,ag as So,g1 as Fe,dv as Uo,g2 as Do,g3 as Fo,ax as Oo,ay as Lo,g4 as Mo,g5 as Go,g6 as Ho,c2 as Jo,W as ue,bC as Oe,bd as Le,Y as se}from"./index-DuelJnhs.js";import{r as C,j as o}from"./react-A9DAvxly.js";import{a5 as Me,a6 as Wo,a7 as Bo}from"./react-icons-atCsfckx.js";const Po="_light_159i2_39",zo="_drag_159i2_221",Vo="_overflow_159i2_235",Ko="_indicator_159i2_343",Xo="_tooltip_159i2_343",Yo="_form_159i2_511",qo="_remove_159i2_539",Qo="_inputs_159i2_569",f={"color-container":"_color-container_159i2_1",light:Po,"color-picker":"_color-picker_159i2_57","width-wrap":"_width-wrap_159i2_109","btn-wrap":"_btn-wrap_159i2_123","info-wrap":"_info-wrap_159i2_141","color-blocks":"_color-blocks_159i2_189",drag:zo,overflow:Vo,"block-wrap":"_block-wrap_159i2_243","color-wrap":"_color-wrap_159i2_261","color-block":"_color-block_159i2_189","compliance-indicators":"_compliance-indicators_159i2_321",indicator:Ko,tooltip:Xo,"indicator-aaa":"_indicator-aaa_159i2_373","indicator-null":"_indicator-null_159i2_381","compliance-info":"_compliance-info_159i2_389","toggle-controls":"_toggle-controls_159i2_397","color-edit-container":"_color-edit-container_159i2_427","color-select":"_color-select_159i2_429","mode-container":"_mode-container_159i2_485",form:Yo,"color-format-submit":"_color-format-submit_159i2_537",remove:qo,"color-name":"_color-name_159i2_553",inputs:Qo,"hex-input":"_hex-input_159i2_593"},Zo=(n,g)=>{const[k,P]=C.useState(!1),[X,re]=C.useState(n),W=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",j=C.useMemo(()=>g==null?void 0:g.map(m=>`${W?"local-":""}DnD-${m}`),[g,W]),z=C.useCallback(()=>g==null?void 0:g.reduce((m,h,T)=>{const b=JSON.parse(localStorage.getItem(j[T])||"[]");return m[h]={items:b.length>0?b:n.filter(R=>R.status===h),setItems:R=>{localStorage.setItem(j[T],JSON.stringify(R)),G(l=>({...l,[h]:{...l[h],items:R}}))},removeItems:()=>{localStorage.removeItem(j[T]),G(R=>({...R,[h]:{...R[h],items:[]}}))}},m},{}),[g,j]),Y=(m,h)=>JSON.stringify(m)===JSON.stringify(h),[a,G]=C.useState(z);C.useEffect(()=>{g.forEach((m,h)=>{var A;const T=((A=a[m])==null?void 0:A.items)||[],b=n.filter(p=>p.status===m),R=new Map(b.map(p=>[p.id,p])),l=T.map(p=>{const E=R.get(p.id);return E&&JSON.stringify(p)!==JSON.stringify(E)?E:p}).filter(p=>R.has(p.id)),$=new Set(T.map(p=>p.id)),_=b.filter(p=>!$.has(p.id)),s=[...l,..._];Y(T,s)||a[m].setItems(s)}),g.forEach((m,h)=>{var b;const T=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(j[h],JSON.stringify(T))})},[n,g,j,Y]),C.useEffect(()=>{re(g.flatMap(m=>{var h;return((h=a[m])==null?void 0:h.items)||[]}))},[a]),C.useEffect(()=>{g.forEach((m,h)=>{var b;const T=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(j[h],JSON.stringify(T))})},[X,g,j,a]);const H=C.useCallback((m,h,T)=>{var s,A,p,E,V,B,F,O,c,r;const b=(s=Object.keys(a))==null?void 0:s.find(d=>{var w,S;return(S=(w=a==null?void 0:a[d])==null?void 0:w.items)==null?void 0:S.find(ne=>(ne==null?void 0:ne.id)===m)});if(!b)return;const R=(p=(A=a==null?void 0:a[b])==null?void 0:A.items)==null?void 0:p.find(d=>(d==null?void 0:d.id)===m),l=(V=(E=a==null?void 0:a[h])==null?void 0:E.items)==null?void 0:V.findIndex(d=>(d==null?void 0:d.id)===T);if(!R)return;R.status=h;const $=(F=(B=a==null?void 0:a[b])==null?void 0:B.items)==null?void 0:F.filter(d=>d.id!==m);(O=a==null?void 0:a[b])==null||O.setItems($);let _=[...(c=a==null?void 0:a[h])==null?void 0:c.items];return _=_.filter(d=>d.id!==R.id),_.splice(l>=0?l:_.length,0,R),(r=a==null?void 0:a[h])==null||r.setItems(_),G(d=>({...d,[b]:{...d[b],items:$},[h]:{...d[h],items:_}})),_},[a,G]),Q=C.useCallback((m,h)=>{if(m===h)return;const T=g==null?void 0:g.indexOf(m);if(T===-1){console.error(`Old status "${m}" not found in statuses array`);return}const b=j[T],R=`${W?"local-":""}DnD-${h}`,l=a[m].items.map($=>({...$,status:h}));G($=>({...$,[m]:{...$[m],items:[]},[h]:{...$[h],items:l}})),localStorage.setItem(R,JSON.stringify(l)),localStorage.removeItem(b)},[a,j,g]);return{isDragging:k,listItemsByStatus:a,handleUpdate:H,handleRenameStatus:Q,handleDragging:m=>P(m)}},te="colors",ae="hsl",he=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],et=n=>{const[g,k,P]=ie("Jenniina-colorsAccessibility",he),[X,re]=ie("Jenniina-currentColor","#7D7D7D"),[W,j]=ie("Jenniina-idCounter",he.length+1),[z,Y]=C.useState(n),[a,G]=C.useState(!1),H=C.useCallback(l=>l.map($=>{const _=Q($,l);return{...$,compliantColors:_}}),[]),Q=(l,$)=>{let _=[],s=[],A=[];return $.forEach(p=>{if(p.id===l.id)return;const E=De(l,p);E.isAAARegularTextCompliant&&_.push(p.id),E.isAARegularTextCompliant&&A.push(p.id),E.isAAUIComponentsCompliant&&s.push(p.id)}),{AAA_RegularText:Array.from(new Set(_)),AA_RegularText:Array.from(new Set(A)),AA_UIComponents:Array.from(new Set(s))}},ce=C.useCallback(()=>{const{r:l,g:$,b:_}=Ce(X),{h:s,s:A,l:p}=Ge(l,$,_),E=$e(l,$,_),V={id:W,color:`hsl(${s}, ${A}%, ${p}%)`,luminance:E,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},B=[...g,V],F=H(B);k(F),j(O=>O+1)},[X,W,H,k,j,g]),m=C.useCallback(l=>{const $=g.filter(s=>s.id!==l).map(s=>({...s,compliantColors:{AAA_RegularText:s.compliantColors.AAA_RegularText.filter(A=>A!==l),AA_RegularText:s.compliantColors.AA_RegularText.filter(A=>A!==l),AA_UIComponents:s.compliantColors.AA_UIComponents.filter(A=>A!==l)}})),_=H($);k(_)},[g,H,k]),h=C.useCallback((l,$,_)=>{try{let s,A,p,E;if(_==="hsl"){const c=$.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!c)throw new Error("Invalid HSL format");const r=Number(c[1]),d=Number(c[2]),w=Number(c[3]);if(r<0||r>360||d<0||d>100||w<0||w>100)throw new Error("HSL values out of range");s=`hsl(${r}, ${d}%, ${w}%)`;const S=_e(r,d,w);A=S.r,p=S.g,E=S.b}else if(_==="rgb"){const c=$.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!c)throw new Error("Invalid RGB format");const r=Number(c[1]),d=Number(c[2]),w=Number(c[3]);if([r,d,w].some(S=>S<0||S>255))throw new Error("RGB values must be between 0 and 255");s=`rgb(${r}, ${d}, ${w})`,A=r,p=d,E=w}else if(_==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test($))throw new Error("Invalid Hex format");s=$.toUpperCase();const c=Ce(s);A=c.r,p=c.g,E=c.b}else throw new Error("Unsupported color format");const V=$e(A,p,E),B=g.map(c=>c.id===l?{...c,color:s,colorFormat:_,luminance:V,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:c),F=B.map(c=>{if(c.id===l)return c;const r=B.find(w=>w.id===l);if(!r)return c;const d=De(c,r);return{...c,compliantColors:{AAA_RegularText:d.isAAARegularTextCompliant?[...new Set([...c.compliantColors.AAA_RegularText,l])]:c.compliantColors.AAA_RegularText.filter(w=>w!==l),AA_RegularText:d.isAARegularTextCompliant?[...new Set([...c.compliantColors.AA_RegularText,l])]:c.compliantColors.AA_RegularText.filter(w=>w!==l),AA_UIComponents:d.isAAUIComponentsCompliant?[...new Set([...c.compliantColors.AA_UIComponents,l])]:c.compliantColors.AA_UIComponents.filter(w=>w!==l)}}}),O=F.find(c=>c.id===l);if(O){const c=Q(O,F),r=F.map(d=>d.id===l?{...d,compliantColors:c}:d);k(r)}else k(F)}catch(s){console.error("Error updating color:",s)}},[g,k]),T=C.useCallback(()=>{P(),k(he),j(he.length+1)},[P,k,j]),b=C.useCallback(()=>{P(),k([]),j(1)},[P,k,j]),R=C.useCallback(()=>{const l=ro(g,z,a);let $=W;const _=l.map(A=>{const p=_e(A[0],A[1],A[2]),E=$e(p.r,p.g,p.b);return{id:$++,color:`hsl(${A[0]}, ${A[1]}%, ${A[2]}%)`,luminance:E,status:te,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let s=[...g,..._];s=H(s),k(s),j($),G(!1)},[g,z,a,H,k,j]);return C.useEffect(()=>{a&&g.length===0&&R()},[a,g]),{colors:g,setColors:k,setColorsReset:G,addColor:ce,removeColor:m,updateColor:h,resetColors:T,clearColors:b,currentColor:X,setCurrentColor:re,mode:z,setMode:Y,makeColorPalette:R}},ot=C.lazy(()=>no(()=>import("./ColorsInput-CMJW6la8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),xe=Jo(5);var He=(n=>(n.AA_RegularText="AA_RegularText",n.AAA_RegularText="AAA_RegularText",n.AA_UIComponents="AA_UIComponents",n))(He||{});const D="colors",tt=({language:n})=>{var we,ve,ye,Re,je;const{colors:g,setColors:k,addColor:P,removeColor:X,updateColor:re,currentColor:W,setCurrentColor:j,resetColors:z,clearColors:Y,mode:a,setMode:G,makeColorPalette:H,setColorsReset:Q}=et("analogous"),ce=C.useMemo(()=>[D],[]),m=lo(),h=so(),T=ao(),[b,R]=C.useState(!0),[l,$]=ie("Jenniina-showColorNames",!0),{isDragging:_,listItemsByStatus:s,handleDragging:A,handleUpdate:p}=Zo(g,ce),E=C.useRef(0),[V,B]=C.useState(0),F=8,[O,c]=ie("Jenniina-color-block-width",F),r=`${O}em`,d=O/F,w={tooltip:`${.7*d}em`,colorName:`${.7*d}em`,input:`${.8*d}em`},S=[{value:"analogous",label:io[n]},{value:"complementary",label:co[n]},{value:"monochromatic",label:mo[n]},{value:"triad",label:po[n]},{value:"tetrad",label:uo[n]}];let ne=Math.floor(Math.random()*S.length);const[le,Je]=C.useState(S[ne]);C.useEffect(()=>{G(le==null?void 0:le.value)},[le]);const We=()=>{s[D].removeItems(),Q(!0),Y()},q=(t,i)=>{if(i==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(i==="rgb"){const u=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(u){const e=Number(u[1]),v=Number(u[2]),N=Number(u[3]);if([e,v,N].every(y=>y>=0&&y<=255))return Fe(e,v,N);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(i==="hsl"){const u=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(u){let e=se(0,Number(u[1]),360),v=se(0,Number(u[2]),100),N=se(0,Number(u[3]),100);return e=(e+360)%360,v=se(0,v,100),N=se(0,N,100),`hsl(${e}, ${v}%, ${N}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${i}`)},Be={AA_RegularText:({xPosition:t,yIndicator:i,blockWidth:u,indicatorSize:e,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=q(N,y),I=q(v,x);return`
 <circle
  cx="${t+u/2}"
  cy="${i+e/2}"
  r="${e*.32}"
  fill="${L}"
  stroke="${I}"
  stroke-width="${e*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:i,blockWidth:u,indicatorSize:e,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=q(N,y),I=q(v,x);return`
    <rect
  x="${t+u/2-e*.2}"
  y="${i+e/2-e*.15}"
  width="${e*.3}"
  height="${e*.3}"
  fill="${L}"
  stroke="${I}"
  stroke-width="${e*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:i,blockWidth:u,indicatorSize:e,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=q(v,x);return`
<circle
  cx="${t+u/2}"
  cy="${i+e/2}"
  r="${e/2}"
  fill="${L}"
  stroke="none"
/>
`}},be=()=>{var Ne;const t=O*20,i=t,u=i/3,e=u/1.5,v=t/4,N=u/20,y=i/10,x=((Ne=s[D])==null?void 0:Ne.items)||[],I=(x==null?void 0:x.length)*(u+e)-e+v*2,Z=l?y+v:0,de=x.length*i,fe=I+Z*1.6,qe=x==null?void 0:x.map((U,ee)=>{const oe=ee*i;let K;try{K=q(U.color,U.colorFormat)}catch(J){console.error(J),m(ue(`${Le[n]}: ${J.message}`,!0,4)),K="#000000"}const pe=`
        <rect
          x="${oe}"
          y="0"
          width="${i}"
          height="${I}"
          fill="${K}"
          stroke="none"
        />
      `,M=l?`
        <!-- Text Background -->
        <rect
          x="${oe}"
          y="${I-.5}"
          width="${i}"
          height="${Z}"
          fill="${K}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${oe+i/2}"
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
          ${pe}
          <!-- Color Text Label -->
          ${M}
        </g>
      `}).join(""),Qe=x==null?void 0:x.map((U,ee)=>{const K=v+ee*(u+e)+(u-N)/2,pe=q(U.color,U.colorFormat);return`
        <rect
          x="0"
          y="${K}"
          width="${de}"
          height="${N}"
          fill="${pe}"
          stroke="none"
        />
      `}).join(""),Ze=x==null?void 0:x.map((U,ee)=>{const oe=ee*i,K=M=>{var J,Te,Ie,ke,Se,Ue;return(Te=(J=U.compliantColors)==null?void 0:J.AAA_RegularText)!=null&&Te.includes(M)?"AAA_RegularText":(ke=(Ie=U.compliantColors)==null?void 0:Ie.AA_RegularText)!=null&&ke.includes(M)?"AA_RegularText":(Ue=(Se=U.compliantColors)==null?void 0:Se.AA_UIComponents)!=null&&Ue.includes(M)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${x==null?void 0:x.filter((M,J)=>J!==ee).map(M=>{const J=K(M.id);return J?Be[J]({xPosition:oe,yIndicator:v+x.indexOf(M)*(u+e),blockWidth:i,indicatorSize:u,otherColor:M.color,blockColor:U.color,colorFormatBlock:U.colorFormat,colorFormatOther:M.colorFormat}):""}).join("")}
        </g>
      `}).join(""),Ae=10,eo=de-Ae,Ee=fe-Ae*1.5,me="https://colors.jenniina.fi",oo=`
      <a href="${me}" target="_blank" rel="noopener noreferrer">
        <text
          x="${eo}"
          y="${Ee}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${me}
        </text>
      </a>
    `,to=`
      <a href="${me}" target="_blank" rel="noopener noreferrer">
        <text
          x="${Ae}"
          y="${Ee}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${me}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${de}" height="${fe}">
      <!-- Color Blocks -->
      <g>
        ${qe}
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
  `,svgWidth:de,svgHeight:fe}},Pe=()=>{const{svgContent:t}=be(),i=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(i),e=document.createElement("a");e.href=u,e.download="color-blocks.svg",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(u),m(ue(Oe[n],!1,5))},ze=()=>{const{svgContent:t,svgWidth:i,svgHeight:u}=be(),e=new Image;e.width=i,e.height=u;const v=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),N=URL.createObjectURL(v);e.onload=()=>{const y=document.createElement("canvas");y.width=i,y.height=u;const x=y.getContext("2d");x==null||x.drawImage(e,0,0);const L=y.toDataURL("image/png"),I=document.createElement("a");I.href=L,I.download="color-blocks.png",I.target="_blank",I.rel="noreferrer",document.body.appendChild(I),I.click(),document.body.removeChild(I),URL.revokeObjectURL(N),m(ue(Oe[n],!1,5))},e.onerror=y=>{console.error("Error loading SVG into image for PNG conversion:",y),URL.revokeObjectURL(N),m(ue(Le[n],!0,4))},e.src=N},Ve=(t,i)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:i}))},Ke=(t,i)=>{t.preventDefault(),B(i),E.current=i},Xe=t=>{t.preventDefault(),A(!0)},Ye=t=>{const i=JSON.parse(t.dataTransfer.getData("text/plain"));i.type==="item"&&(p(i.id,D,V),setTimeout(()=>{var u;k((u=s[D])==null?void 0:u.items)},200),A(!1))};C.useEffect(()=>{var t,i;(!((t=s[D])!=null&&t.items)||((i=s[D])==null?void 0:i.items.length)<1)&&z()},[]);const ge=.04;return o.jsxs("div",{id:f["color-container"],className:`${f["color-container"]} ${h?f.light:""}`,style:{"--font-size":w.input},children:[o.jsx("div",{id:"info",className:f["info-wrap"],children:o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),o.jsx("span",{children:ho[n]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),o.jsx("span",{children:go[n]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),o.jsx("span",{children:fo[n]})]})]})}),o.jsxs("div",{className:f["btn-wrap"],children:[((ve=(we=s[D])==null?void 0:we.items)==null?void 0:ve.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{type:"button",onClick:ze,className:"gray small",children:[Ao[n],"  ",o.jsx(Me,{})]}),o.jsxs("button",{type:"button",onClick:Pe,className:"gray small",children:[$o[n],"  ",o.jsx(Me,{})]})]}),o.jsx("button",{onClick:T,className:"gray small",children:h?o.jsxs(o.Fragment,{children:[xo[n],"  ",o.jsx(Wo,{})]}):o.jsxs(o.Fragment,{children:[Co[n],"  ",o.jsx(Bo,{})," "]})})]}),o.jsxs("div",{className:f["color-picker"],children:[o.jsxs("label",{htmlFor:"color-input",className:" ",children:[_o[n],":"]}),o.jsx("input",{id:"color-input",type:"color",value:W,onChange:t=>j(t.target.value)}),o.jsx("button",{className:"gray small",type:"button",onClick:P,children:bo[n]}),o.jsx("button",{className:"gray small",type:"button",onClick:z,children:wo[n]}),o.jsx("button",{className:"gray small",type:"button",onClick:()=>{s[D].removeItems(),Y()},children:vo[n]}),o.jsxs("div",{className:`${f["color-edit-container"]} ${f["mode-container"]}`,children:[o.jsx(yo,{options:S,value:le,onChange:t=>Je(t),id:"color-mode",instructions:Ro[n],className:`${f["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),o.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:H,children:[jo[n],o.jsx("span",{className:"tooltip above narrow2",children:Eo[n]})]}),o.jsx("button",{className:"gray small",type:"button",onClick:We,children:No[n]})]})]}),o.jsx("div",{id:"color-blocks",className:`${f["color-blocks"]} ${!l||!b?f.overflow:""} ${_?f.drag:""}`,children:(ye=s[D])==null?void 0:ye.items.map(t=>{var i,u;return o.jsx("ul",{className:f["block-wrap"],onDrop:Ye,children:o.jsxs("li",{className:f["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[o.jsx("ul",{children:o.jsx("li",{draggable:"true",onDragStart:e=>Ve(e,t.id),onDragEnter:e=>Ke(e,t.id),onDragOver:e=>Xe(e),onDragEnd:()=>A(!1),"data-identity":t.id,className:f["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(i=s[D])==null?void 0:i.items.length})`},children:o.jsx("div",{className:f["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(u=s[D])==null?void 0:u.items.map(e=>{var N,y,x,L,I,Z;if(e.id===t.id)return o.jsx("div",{className:`${f["indicator-null"]} ${f.indicator}`,style:{"--color":e.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${e.color}-${e.id}`);let v=null;return(y=(N=t.compliantColors)==null?void 0:N.AAA_RegularText)!=null&&y.includes(e.id)?v="AAA_RegularText":(L=(x=t.compliantColors)==null?void 0:x.AA_RegularText)!=null&&L.includes(e.id)?v="AA_RegularText":(Z=(I=t.compliantColors)==null?void 0:I.AA_UIComponents)!=null&&Z.includes(e.id)&&(v="AA_UIComponents"),v==="AAA_RegularText"?o.jsx("div",{tabIndex:0,className:`${f["indicator-aaa"]} ${f.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:e.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${xe}`,className:`tooltip below narrow3 ${f.tooltip}`,style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${To[n]}: ${e.id}`})},`aaa-${e.color}-${e.id}`):v==="AA_RegularText"?o.jsx("div",{tabIndex:0,className:`${f["indicator-aa"]} ${f.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:t.color,outline:`calc(${r} * ${ge*1.1}) solid ${e.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${xe}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Io[n]}: ${e.id}`})},`aa-${e.color}-${e.id}`):v==="AA_UIComponents"?o.jsx("div",{tabIndex:0,className:`${f["indicator-aa-ui"]} ${f.indicator} tooltip-wrap`,style:{"--color":e.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${r} * ${ge}) solid ${e.color}`,outlineOffset:`calc(${r} * ${ge} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},children:o.jsx("span",{id:`span-ui-${e.id}-${t.id}-${xe}`,className:`tooltip below narrow3 ${f.tooltip}`,style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${ko[n]}: ${e.id}`})},`aa-ui-${e.color}-${e.id}`):o.jsx("div",{"aria-hidden":"true",className:`${f["indicator-null"]} ${f.indicator}`,style:{"--color":e.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${e.color}-${e.id}`)})})})}),l&&o.jsx("div",{style:{backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:f["color-name"],children:o.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${w.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),b&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:f["color-edit-container"],children:o.jsx(C.Suspense,{fallback:o.jsxs("div",{className:"flex center margin0auto textcenter",children:[So[n],"..."]}),children:o.jsx(ot,{language:n,block:t,updateColor:re,width:r,hexToRGB:Ce,rgbToHSL:Ge,rgbToHex:Fe,hslToRGB:_e,fontSize:`clamp(0.75rem, ${w.input}, 1rem)`})})}),o.jsx("button",{className:`tooltip-wrap small delete danger gray ${f.remove}`,onClick:()=>X(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${w.input}, 2rem)`},children:Uo[n]})]})]})},`${t.id}`)})}),((je=(Re=s[D])==null?void 0:Re.items)==null?void 0:je.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:f["width-wrap"],children:[o.jsx("label",{htmlFor:"color-block-width",children:Do[n]}),o.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:O,onChange:t=>c(Number(t.target.value))})]}),o.jsxs("div",{className:`${f["toggle-controls"]}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:Fo[n]}),o.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>R(!b),className:"gray small",children:b?Oo[n]:Lo[n]})]}),o.jsxs("div",{children:[o.jsx("strong",{children:Mo[n]}),o.jsx("button",{type:"button",onClick:()=>$(!l),className:"gray small",children:l?Go[n]:Ho[n]})]})]})]})]})},at=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:He,default:tt},Symbol.toStringTag,{value:"Module"}));export{at as A,f as s};
