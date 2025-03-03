const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-BvQRHk-v.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/index-C_Hs8uIh.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-D7bD3W54.js","assets/react-router-dom-StiqOUIT.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-Dgb_yWai.css"])))=>i.map(i=>d[i]);
import{d6 as pe,fn as Fe,fo as xe,fp as He,fq as _e,fr as Ae,fs as ro,_ as lo,u as no,L as so,ft as ao,fu as co,fv as io,fw as mo,fx as uo,fy as po,fz as ho,fA as fo,fB as go,fC as Ao,fD as $o,fE as xo,fF as _o,fG as Co,at as wo,av as bo,fH as jo,bB as vo,fI as yo,$ as Ro,fJ as Eo,fK as To,fL as Io,fM as No,fN as ko,e as So,fO as Oe,de as Uo,fP as Do,aH as Fo,fQ as Oo,fR as Lo,fS as Mo,fT as Go,fU as Ho,fV as Po,o as me,fW as Le,c1 as Me,fX as ne}from"./index-C_Hs8uIh.js";import{r as w,j as o}from"./react-kX_YxI4E.js";import{P as Ge,O as Bo,Q as Jo}from"./react-icons-D7bD3W54.js";import{u as Wo}from"./react-router-dom-StiqOUIT.js";const zo="_light_1wloj_39",Vo="_drag_1wloj_223",Ko="_overflow_1wloj_237",Xo="_indicator_1wloj_345",qo="_tooltip_1wloj_345",Qo="_form_1wloj_515",Yo="_remove_1wloj_543",Zo="_inputs_1wloj_573",A={"color-container":"_color-container_1wloj_1",light:zo,"color-picker":"_color-picker_1wloj_57","width-wrap":"_width-wrap_1wloj_111","btn-wrap":"_btn-wrap_1wloj_125","info-wrap":"_info-wrap_1wloj_143","color-blocks":"_color-blocks_1wloj_191",drag:Vo,overflow:Ko,"block-wrap":"_block-wrap_1wloj_245","color-wrap":"_color-wrap_1wloj_263","color-block":"_color-block_1wloj_191","compliance-indicators":"_compliance-indicators_1wloj_323",indicator:Xo,tooltip:qo,"indicator-aaa":"_indicator-aaa_1wloj_375","indicator-null":"_indicator-null_1wloj_383","compliance-info":"_compliance-info_1wloj_391","toggle-controls":"_toggle-controls_1wloj_399","color-edit-container":"_color-edit-container_1wloj_429","color-select":"_color-select_1wloj_431","mode-container":"_mode-container_1wloj_489",form:Qo,"color-format-submit":"_color-format-submit_1wloj_541",remove:Yo,"color-name":"_color-name_1wloj_557",inputs:Zo,"hex-input":"_hex-input_1wloj_603"},et=(l,g)=>{const[k,W]=w.useState(!1),[X,le]=w.useState(l),B=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",R=w.useMemo(()=>g==null?void 0:g.map(m=>`${B?"local-":""}DnD-${m}`),[g,B]),z=w.useCallback(()=>g==null?void 0:g.reduce((m,f,I)=>{const b=JSON.parse(localStorage.getItem(R[I])||"[]");return m[f]={items:b.length>0?b:l.filter(v=>v.status===f),setItems:v=>{localStorage.setItem(R[I],JSON.stringify(v)),G(n=>({...n,[f]:{...n[f],items:v}}))},removeItems:()=>{localStorage.removeItem(R[I]),G(v=>({...v,[f]:{...v[f],items:[]}}))}},m},{}),[g,R]),q=(m,f)=>JSON.stringify(m)===JSON.stringify(f),[a,G]=w.useState(z);w.useEffect(()=>{g.forEach((m,f)=>{var $;const I=(($=a[m])==null?void 0:$.items)||[],b=l.filter(u=>u.status===m),v=new Map(b.map(u=>[u.id,u])),n=I.map(u=>{const E=v.get(u.id);return E&&JSON.stringify(u)!==JSON.stringify(E)?E:u}).filter(u=>v.has(u.id)),h=new Set(I.map(u=>u.id)),_=b.filter(u=>!h.has(u.id)),c=[...n,..._];q(I,c)||a[m].setItems(c)}),g.forEach((m,f)=>{var b;const I=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(R[f],JSON.stringify(I))})},[l,g,R,q]),w.useEffect(()=>{le(g.flatMap(m=>{var f;return((f=a[m])==null?void 0:f.items)||[]}))},[a]),w.useEffect(()=>{g.forEach((m,f)=>{var b;const I=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(R[f],JSON.stringify(I))})},[X,g,R,a]);const H=w.useCallback((m,f,I)=>{var c,$,u,E,V,J,F,O,i,r;const b=(c=Object.keys(a))==null?void 0:c.find(d=>{var C,S;return(S=(C=a==null?void 0:a[d])==null?void 0:C.items)==null?void 0:S.find(Z=>(Z==null?void 0:Z.id)===m)});if(!b)return;const v=(u=($=a==null?void 0:a[b])==null?void 0:$.items)==null?void 0:u.find(d=>(d==null?void 0:d.id)===m),n=(V=(E=a==null?void 0:a[f])==null?void 0:E.items)==null?void 0:V.findIndex(d=>(d==null?void 0:d.id)===I);if(!v)return;v.status=f;const h=(F=(J=a==null?void 0:a[b])==null?void 0:J.items)==null?void 0:F.filter(d=>d.id!==m);(O=a==null?void 0:a[b])==null||O.setItems(h);let _=[...(i=a==null?void 0:a[f])==null?void 0:i.items];return _=_.filter(d=>d.id!==v.id),_.splice(n>=0?n:_.length,0,v),(r=a==null?void 0:a[f])==null||r.setItems(_),G(d=>({...d,[b]:{...d[b],items:h},[f]:{...d[f],items:_}})),_},[a,G]),Y=w.useCallback((m,f)=>{if(m===f)return;const I=g==null?void 0:g.indexOf(m);if(I===-1){console.error(`Old status "${m}" not found in statuses array`);return}const b=R[I],v=`${B?"local-":""}DnD-${f}`,n=a[m].items.map(h=>({...h,status:f}));G(h=>({...h,[m]:{...h[m],items:[]},[f]:{...h[f],items:n}})),localStorage.setItem(v,JSON.stringify(n)),localStorage.removeItem(b)},[a,R,g]);return{isDragging:k,listItemsByStatus:a,handleUpdate:H,handleRenameStatus:Y,handleDragging:m=>W(m)}},re="colors",se="hsl",ue=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:re,colorFormat:se,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:re,colorFormat:se,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:re,colorFormat:se,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:re,colorFormat:se,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:re,colorFormat:se,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],ot=l=>{const[g,k,W]=pe("Jenniina-colorsAccessibility",ue),[X,le]=pe("Jenniina-currentColor","#7D7D7D"),[B,R]=pe("Jenniina-idCounter",ue.length+1),[z,q]=w.useState(l),[a,G]=w.useState(!1),H=w.useCallback(n=>n.map(h=>{const _=Y(h,n);return{...h,compliantColors:_}}),[]),Y=(n,h)=>{let _=[],c=[],$=[];return h.forEach(u=>{if(u.id===n.id)return;const E=Fe(n,u);E.isAAARegularTextCompliant&&_.push(u.id),E.isAARegularTextCompliant&&$.push(u.id),E.isAAUIComponentsCompliant&&c.push(u.id)}),{AAA_RegularText:Array.from(new Set(_)),AA_RegularText:Array.from(new Set($)),AA_UIComponents:Array.from(new Set(c))}},ae=w.useCallback(()=>{const{r:n,g:h,b:_}=xe(X),{h:c,s:$,l:u}=He(n,h,_),E=Ae(n,h,_),V={id:B,color:`hsl(${c}, ${$}%, ${u}%)`,luminance:E,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},J=[...g,V],F=H(J);k(F),R(O=>O+1)},[X,B,H,k,R,g]),m=w.useCallback(n=>{const h=g.filter(c=>c.id!==n).map(c=>({...c,compliantColors:{AAA_RegularText:c.compliantColors.AAA_RegularText.filter($=>$!==n),AA_RegularText:c.compliantColors.AA_RegularText.filter($=>$!==n),AA_UIComponents:c.compliantColors.AA_UIComponents.filter($=>$!==n)}})),_=H(h);k(_)},[g,H,k]),f=w.useCallback((n,h,_)=>{try{let c,$,u,E;if(_==="hsl"){const i=h.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!i)throw new Error("Invalid HSL format");const r=Number(i[1]),d=Number(i[2]),C=Number(i[3]);if(r<0||r>360||d<0||d>100||C<0||C>100)throw new Error("HSL values out of range");c=`hsl(${r}, ${d}%, ${C}%)`;const S=_e(r,d,C);$=S.r,u=S.g,E=S.b}else if(_==="rgb"){const i=h.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!i)throw new Error("Invalid RGB format");const r=Number(i[1]),d=Number(i[2]),C=Number(i[3]);if([r,d,C].some(S=>S<0||S>255))throw new Error("RGB values must be between 0 and 255");c=`rgb(${r}, ${d}, ${C})`,$=r,u=d,E=C}else if(_==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test(h))throw new Error("Invalid Hex format");c=h.toUpperCase();const i=xe(c);$=i.r,u=i.g,E=i.b}else throw new Error("Unsupported color format");const V=Ae($,u,E),J=g.map(i=>i.id===n?{...i,color:c,colorFormat:_,luminance:V,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:i),F=J.map(i=>{if(i.id===n)return i;const r=J.find(C=>C.id===n);if(!r)return i;const d=Fe(i,r);return{...i,compliantColors:{AAA_RegularText:d.isAAARegularTextCompliant?[...new Set([...i.compliantColors.AAA_RegularText,n])]:i.compliantColors.AAA_RegularText.filter(C=>C!==n),AA_RegularText:d.isAARegularTextCompliant?[...new Set([...i.compliantColors.AA_RegularText,n])]:i.compliantColors.AA_RegularText.filter(C=>C!==n),AA_UIComponents:d.isAAUIComponentsCompliant?[...new Set([...i.compliantColors.AA_UIComponents,n])]:i.compliantColors.AA_UIComponents.filter(C=>C!==n)}}}),O=F.find(i=>i.id===n);if(O){const i=Y(O,F),r=F.map(d=>d.id===n?{...d,compliantColors:i}:d);k(r)}else k(F)}catch(c){console.error("Error updating color:",c)}},[g,k]),I=w.useCallback(()=>{W(),k(ue),R(ue.length+1)},[W,k,R]),b=w.useCallback(()=>{W(),k([]),R(1)},[W,k,R]),v=w.useCallback(()=>{const n=ro(g,z,a);let h=B;const _=n.map($=>{const u=_e($[0],$[1],$[2]),E=Ae(u.r,u.g,u.b);return{id:h++,color:`hsl(${$[0]}, ${$[1]}%, ${$[2]}%)`,luminance:E,status:re,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let c=[...g,..._];c=H(c),k(c),R(h),G(!1)},[g,z,a,H,k,R]);return w.useEffect(()=>{a&&g.length===0&&v()},[a,g]),{colors:g,setColors:k,setColorsReset:G,addColor:ae,removeColor:m,updateColor:f,resetColors:I,clearColors:b,currentColor:X,setCurrentColor:le,mode:z,setMode:q,makeColorPalette:v}},tt=w.lazy(()=>lo(()=>import("./ColorsInput-BvQRHk-v.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),$e=Po(5);var Pe=(l=>(l.AA_RegularText="AA_RegularText",l.AAA_RegularText="AAA_RegularText",l.AA_UIComponents="AA_UIComponents",l))(Pe||{});const D="colors",rt=({language:l})=>{var be,je,ve,ye,Re,Ee;const{colors:g,setColors:k,addColor:W,removeColor:X,updateColor:le,currentColor:B,setCurrentColor:R,resetColors:z,clearColors:q,mode:a,setMode:G,makeColorPalette:H,setColorsReset:Y}=ot("analogous"),ae=w.useMemo(()=>[D],[]),m=no(),f=so(),I=ao(),[b,v]=Wo({show:"true",name:"true",mode:"analogous"}),n=(b.get("show")||"true")==="true",h=(b.get("name")||"true")==="true",{isDragging:_,listItemsByStatus:c,handleDragging:$,handleUpdate:u}=et(g,ae),E=w.useRef(0),[V,J]=w.useState(0),F=8,[O,i]=pe("Jenniina-color-block-width",F),r=`${O}em`,d=O/F,C={tooltip:`${.7*d}em`,colorName:`${.7*d}em`,input:`${.8*d}em`},S=[{value:"analogous",label:co[l]},{value:"complementary",label:io[l]},{value:"monochromatic",label:mo[l]},{value:"triad",label:uo[l]},{value:"tetrad",label:po[l]}],Z=Math.floor(Math.random()*S.length),Ce=b.get("mode")||S[Z];w.useEffect(()=>{G(Ce)},[Ce]);const Be=()=>{c[D].removeItems(),Y(!0),q()},Q=(t,s)=>{if(s==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(s==="rgb"){const p=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(p){const e=Number(p[1]),j=Number(p[2]),T=Number(p[3]);if([e,j,T].every(y=>y>=0&&y<=255))return Oe(e,j,T);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(s==="hsl"){const p=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(p){let e=ne(0,Number(p[1]),360),j=ne(0,Number(p[2]),100),T=ne(0,Number(p[3]),100);return e=(e+360)%360,j=ne(0,j,100),T=ne(0,T,100),`hsl(${e}, ${j}%, ${T}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${s}`)},Je={AA_RegularText:({xPosition:t,yIndicator:s,blockWidth:p,indicatorSize:e,otherColor:j,blockColor:T,colorFormatBlock:y,colorFormatOther:x})=>{const L=Q(T,y),N=Q(j,x);return`
 <circle
  cx="${t+p/2}"
  cy="${s+e/2}"
  r="${e*.32}"
  fill="${L}"
  stroke="${N}"
  stroke-width="${e*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:s,blockWidth:p,indicatorSize:e,otherColor:j,blockColor:T,colorFormatBlock:y,colorFormatOther:x})=>{const L=Q(T,y),N=Q(j,x);return`
    <rect
  x="${t+p/2-e*.2}"
  y="${s+e/2-e*.15}"
  width="${e*.3}"
  height="${e*.3}"
  fill="${L}"
  stroke="${N}"
  stroke-width="${e*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:s,blockWidth:p,indicatorSize:e,otherColor:j,blockColor:T,colorFormatBlock:y,colorFormatOther:x})=>{const L=Q(j,x);return`
<circle
  cx="${t+p/2}"
  cy="${s+e/2}"
  r="${e/2}"
  fill="${L}"
  stroke="none"
/>
`}},we=()=>{var Ie;const t=O*20,s=t,p=s/3,e=p/1.5,j=t/4,T=p/20,y=s/10,x=((Ie=c[D])==null?void 0:Ie.items)||[],N=(x==null?void 0:x.length)*(p+e)-e+j*2,ee=h?y+j:0,ce=x.length*s,fe=N+ee*1.6,Qe=x==null?void 0:x.map((U,oe)=>{const te=oe*s;let K;try{K=Q(U.color,U.colorFormat)}catch(P){console.error(P),m(me(`${Me[l]}: ${P.message}`,!0,4)),K="#000000"}const de=`
        <rect
          x="${te}"
          y="0"
          width="${s}"
          height="${N}"
          fill="${K}"
          stroke="none"
        />
      `,M=h?`
        <!-- Text Background -->
        <rect
          x="${te}"
          y="${N-.5}"
          width="${s}"
          height="${ee}"
          fill="${K}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${te+s/2}"
          y="${N+ee/2+y/3}"
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
          ${de}
          <!-- Color Text Label -->
          ${M}
        </g>
      `}).join(""),Ye=x==null?void 0:x.map((U,oe)=>{const K=j+oe*(p+e)+(p-T)/2,de=Q(U.color,U.colorFormat);return`
        <rect
          x="0"
          y="${K}"
          width="${ce}"
          height="${T}"
          fill="${de}"
          stroke="none"
        />
      `}).join(""),Ze=x==null?void 0:x.map((U,oe)=>{const te=oe*s,K=M=>{var P,Ne,ke,Se,Ue,De;return(Ne=(P=U.compliantColors)==null?void 0:P.AAA_RegularText)!=null&&Ne.includes(M)?"AAA_RegularText":(Se=(ke=U.compliantColors)==null?void 0:ke.AA_RegularText)!=null&&Se.includes(M)?"AA_RegularText":(De=(Ue=U.compliantColors)==null?void 0:Ue.AA_UIComponents)!=null&&De.includes(M)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${x==null?void 0:x.filter((M,P)=>P!==oe).map(M=>{const P=K(M.id);return P?Je[P]({xPosition:te,yIndicator:j+x.indexOf(M)*(p+e),blockWidth:s,indicatorSize:p,otherColor:M.color,blockColor:U.color,colorFormatBlock:U.colorFormat,colorFormatOther:M.colorFormat}):""}).join("")}
        </g>
      `}).join(""),ge=10,eo=ce-ge,Te=fe-ge*1.5,ie="https://colors.jenniina.fi",oo=`
      <a href="${ie}" target="_blank" rel="noopener noreferrer">
        <text
          x="${eo}"
          y="${Te}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${ie}
        </text>
      </a>
    `,to=`
      <a href="${ie}" target="_blank" rel="noopener noreferrer">
        <text
          x="${ge}"
          y="${Te}"
          font-size="${y}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${ie}
        </text>
      </a>
    `;return{svgContent:`
    <svg xmlns="http://www.w3.org/2000/svg" width="${ce}" height="${fe}">
      <!-- Color Blocks -->
      <g>
        ${Qe}
      </g>
      <!-- Lines -->
      <g>
        ${Ye}
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
  `,svgWidth:ce,svgHeight:fe}},We=()=>{const{svgContent:t}=we(),s=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(s),e=document.createElement("a");e.href=p,e.download="color-blocks.svg",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(p),m(me(Le[l],!1,5))},ze=()=>{const{svgContent:t,svgWidth:s,svgHeight:p}=we(),e=new Image;e.width=s,e.height=p;const j=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),T=URL.createObjectURL(j);e.onload=()=>{const y=document.createElement("canvas");y.width=s,y.height=p;const x=y.getContext("2d");x==null||x.drawImage(e,0,0);const L=y.toDataURL("image/png"),N=document.createElement("a");N.href=L,N.download="color-blocks.png",N.target="_blank",N.rel="noreferrer",document.body.appendChild(N),N.click(),document.body.removeChild(N),URL.revokeObjectURL(T),m(me(Le[l],!1,5))},e.onerror=y=>{console.error("Error loading SVG into image for PNG conversion:",y),URL.revokeObjectURL(T),m(me(Me[l],!0,4))},e.src=T},Ve=(t,s)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:s}))},Ke=(t,s)=>{t.preventDefault(),J(s),E.current=s},Xe=t=>{t.preventDefault(),$(!0)},qe=t=>{const s=JSON.parse(t.dataTransfer.getData("text/plain"));s.type==="item"&&(u(s.id,D,V),setTimeout(()=>{var p;k((p=c[D])==null?void 0:p.items)},200),$(!1))};w.useEffect(()=>{var t,s;(!((t=c[D])!=null&&t.items)||((s=c[D])==null?void 0:s.items.length)<1)&&z()},[]);const he=.04;return o.jsxs("div",{id:A["color-container"],className:`${A["color-container"]} ${f?A.light:""}`,style:{"--font-size":C.input},children:[o.jsx("div",{id:"info",className:A["info-wrap"],children:o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),o.jsx("span",{children:ho[l]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),o.jsx("span",{children:fo[l]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),o.jsx("span",{children:go[l]})]})]})}),o.jsxs("div",{className:A["btn-wrap"],children:[((je=(be=c[D])==null?void 0:be.items)==null?void 0:je.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{type:"button",onClick:ze,className:"gray small",children:[Ao[l],"  ",o.jsx(Ge,{})]}),o.jsxs("button",{type:"button",onClick:We,className:"gray small",children:[$o[l],"  ",o.jsx(Ge,{})]})]}),o.jsx("button",{onClick:I,className:"gray small",children:f?o.jsxs(o.Fragment,{children:[xo[l],"  ",o.jsx(Bo,{})]}):o.jsxs(o.Fragment,{children:[_o[l],"  ",o.jsx(Jo,{})," "]})})]}),o.jsxs("div",{className:A["color-picker"],children:[o.jsxs("label",{htmlFor:"color-input",className:" ",children:[Co[l],":"]}),o.jsx("input",{id:"color-input",type:"color",value:B,onChange:t=>R(t.target.value)}),o.jsx("button",{className:"gray small",type:"button",onClick:W,children:wo[l]}),o.jsx("button",{className:"gray small",type:"button",onClick:z,children:bo[l]}),o.jsx("button",{className:"gray small",type:"button",onClick:()=>{c[D].removeItems(),q()},children:jo[l]}),o.jsxs("div",{className:`${A["color-edit-container"]} ${A["mode-container"]}`,children:[o.jsx(vo,{options:S,value:{value:a,label:(ve=S.find(t=>t.value===a))==null?void 0:ve.label},onChange:t=>v(s=>(s.set("mode",(t==null?void 0:t.value)||S[Z].value),s),{replace:!0,preventScrollReset:!0}),id:"color-mode",instructions:yo[l],className:`${A["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),o.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:H,children:[Ro[l],o.jsx("span",{className:"tooltip above narrow2",children:Eo[l]})]}),o.jsx("button",{className:"gray small",type:"button",onClick:Be,children:To[l]})]})]}),o.jsx("div",{id:"color-blocks",className:`${A["color-blocks"]} ${!h||!n?A.overflow:""} ${_?A.drag:""}`,children:(ye=c[D])==null?void 0:ye.items.map(t=>{var s,p;return o.jsx("ul",{className:A["block-wrap"],onDrop:qe,children:o.jsxs("li",{className:A["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[o.jsx("ul",{children:o.jsx("li",{draggable:"true",onDragStart:e=>Ve(e,t.id),onDragEnter:e=>Ke(e,t.id),onDragOver:e=>Xe(e),onDragEnd:()=>$(!1),"data-identity":t.id,className:A["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(s=c[D])==null?void 0:s.items.length})`},children:o.jsx("div",{className:A["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(p=c[D])==null?void 0:p.items.map(e=>{var T,y,x,L,N,ee;if(e.id===t.id)return o.jsx("div",{className:`${A["indicator-null"]} ${A.indicator}`,style:{"--color":e.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${e.color}-${e.id}`);let j=null;return(y=(T=t.compliantColors)==null?void 0:T.AAA_RegularText)!=null&&y.includes(e.id)?j="AAA_RegularText":(L=(x=t.compliantColors)==null?void 0:x.AA_RegularText)!=null&&L.includes(e.id)?j="AA_RegularText":(ee=(N=t.compliantColors)==null?void 0:N.AA_UIComponents)!=null&&ee.includes(e.id)&&(j="AA_UIComponents"),j==="AAA_RegularText"?o.jsx("div",{tabIndex:0,className:`${A["indicator-aaa"]} ${A.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:e.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${$e}`,className:`tooltip below narrow3 ${A.tooltip}`,style:{fontSize:`clamp(0.7rem, ${C.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Io[l]}: ${e.id}`})},`aaa-${e.color}-${e.id}`):j==="AA_RegularText"?o.jsx("div",{tabIndex:0,className:`${A["indicator-aa"]} ${A.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:t.color,outline:`calc(${r} * ${he*1.1}) solid ${e.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${$e}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${C.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${No[l]}: ${e.id}`})},`aa-${e.color}-${e.id}`):j==="AA_UIComponents"?o.jsx("div",{tabIndex:0,className:`${A["indicator-aa-ui"]} ${A.indicator} tooltip-wrap`,style:{"--color":e.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${r} * ${he}) solid ${e.color}`,outlineOffset:`calc(${r} * ${he} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},children:o.jsx("span",{id:`span-ui-${e.id}-${t.id}-${$e}`,className:`tooltip below narrow3 ${A.tooltip}`,style:{fontSize:`clamp(0.7rem, ${C.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${ko[l]}: ${e.id}`})},`aa-ui-${e.color}-${e.id}`):o.jsx("div",{"aria-hidden":"true",className:`${A["indicator-null"]} ${A.indicator}`,style:{"--color":e.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${e.color}-${e.id}`)})})})}),h&&o.jsx("div",{style:{backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:A["color-name"],children:o.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${C.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),n&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:A["color-edit-container"],children:o.jsx(w.Suspense,{fallback:o.jsxs("div",{className:"flex center margin0auto textcenter",children:[So[l],"..."]}),children:o.jsx(tt,{language:l,block:t,updateColor:le,width:r,hexToRGB:xe,rgbToHSL:He,rgbToHex:Oe,hslToRGB:_e,fontSize:`clamp(0.75rem, ${C.input}, 1rem)`})})}),o.jsx("button",{className:`tooltip-wrap small delete danger gray ${A.remove}`,onClick:()=>X(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${C.input}, 2rem)`},children:Uo[l]})]})]})},`${t.id}`)})}),((Ee=(Re=c[D])==null?void 0:Re.items)==null?void 0:Ee.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:A["width-wrap"],children:[o.jsx("label",{htmlFor:"color-block-width",children:Do[l]}),o.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:O,onChange:t=>i(Number(t.target.value))})]}),o.jsxs("div",{className:`${A["toggle-controls"]}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:Fo[l]}),o.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>v(t=>(t.set("show",n?"false":"true"),t),{replace:!0,preventScrollReset:!0}),className:"gray small",children:n?Oo[l]:Lo[l]})]}),o.jsxs("div",{children:[o.jsx("strong",{children:Mo[l]}),o.jsx("button",{type:"button",onClick:()=>v(t=>(t.set("name",h?"false":"true"),t),{replace:!0,preventScrollReset:!0}),className:"gray small",children:h?Go[l]:Ho[l]})]})]})]})]})},it=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:Pe,default:rt},Symbol.toStringTag,{value:"Module"}));export{it as A,A as s};
