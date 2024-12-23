const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-Cq-O13x0.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-BNHP9xTd.js","assets/react-dom-CxfJ6lHP.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-C4cSaZU-.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-RHjzyHVQ.js","assets/react-router-dom-CYs6befe.js","assets/react-router-S1Hdk0kP.js","assets/@remix-run-DTnHqtaE.js","assets/index-C_uU-J1O.css"])))=>i.map(i=>d[i]);
import{u as ie,fj as De,fk as Ce,fl as Ge,fm as _e,fn as $e,fo as ro,c4 as no,K as lo,d2 as so,fp as ao,fq as io,fr as co,fs as mo,ft as po,fu as uo,fv as ho,fw as fo,fx as go,fy as Ao,fz as $o,z as xo,A as Co,fA as _o,fB as bo,ap as wo,fC as vo,S as yo,fD as Ro,fE as jo,fF as Eo,fG as No,fH as Io,fI as To,fJ as ko,ag as So,fK as Fe,db as Uo,fL as Do,fM as Fo,ax as Oo,ay as Lo,fN as Mo,fO as Go,fP as Ho,fQ as Jo,W as ue,bC as Oe,bd as Le,Y as se}from"./index-BNHP9xTd.js";import{r as C,j as o}from"./react-A9DAvxly.js";import{a2 as Me,a3 as Wo,a4 as Bo}from"./react-icons-RHjzyHVQ.js";const zo="_light_159i2_39",Po="_drag_159i2_221",Vo="_overflow_159i2_235",Ko="_indicator_159i2_343",qo="_tooltip_159i2_343",Xo="_form_159i2_511",Yo="_remove_159i2_539",Qo="_inputs_159i2_569",g={"color-container":"_color-container_159i2_1",light:zo,"color-picker":"_color-picker_159i2_57","width-wrap":"_width-wrap_159i2_109","btn-wrap":"_btn-wrap_159i2_123","info-wrap":"_info-wrap_159i2_141","color-blocks":"_color-blocks_159i2_189",drag:Po,overflow:Vo,"block-wrap":"_block-wrap_159i2_243","color-wrap":"_color-wrap_159i2_261","color-block":"_color-block_159i2_189","compliance-indicators":"_compliance-indicators_159i2_321",indicator:Ko,tooltip:qo,"indicator-aaa":"_indicator-aaa_159i2_373","indicator-null":"_indicator-null_159i2_381","compliance-info":"_compliance-info_159i2_389","toggle-controls":"_toggle-controls_159i2_397","color-edit-container":"_color-edit-container_159i2_427","color-select":"_color-select_159i2_429","mode-container":"_mode-container_159i2_485",form:Xo,"color-format-submit":"_color-format-submit_159i2_537",remove:Yo,"color-name":"_color-name_159i2_553",inputs:Qo,"hex-input":"_hex-input_159i2_593"},Zo=(n,f)=>{const[k,z]=C.useState(!1),[q,re]=C.useState(n),W=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",j=C.useMemo(()=>f==null?void 0:f.map(m=>`${W?"local-":""}DnD-${m}`),[f,W]),P=C.useCallback(()=>f==null?void 0:f.reduce((m,h,I)=>{const b=JSON.parse(localStorage.getItem(j[I])||"[]");return m[h]={items:b.length>0?b:n.filter(R=>R.status===h),setItems:R=>{localStorage.setItem(j[I],JSON.stringify(R)),G(l=>({...l,[h]:{...l[h],items:R}}))},removeItems:()=>{localStorage.removeItem(j[I]),G(R=>({...R,[h]:{...R[h],items:[]}}))}},m},{}),[f,j]),X=(m,h)=>JSON.stringify(m)===JSON.stringify(h),[a,G]=C.useState(P);C.useEffect(()=>{f.forEach((m,h)=>{var A;const I=((A=a[m])==null?void 0:A.items)||[],b=n.filter(p=>p.status===m),R=new Map(b.map(p=>[p.id,p])),l=I.map(p=>{const E=R.get(p.id);return E&&JSON.stringify(p)!==JSON.stringify(E)?E:p}).filter(p=>R.has(p.id)),$=new Set(I.map(p=>p.id)),_=b.filter(p=>!$.has(p.id)),s=[...l,..._];X(I,s)||a[m].setItems(s)}),f.forEach((m,h)=>{var b;const I=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(j[h],JSON.stringify(I))})},[n,f,j,X]),C.useEffect(()=>{re(f.flatMap(m=>{var h;return((h=a[m])==null?void 0:h.items)||[]}))},[a]),C.useEffect(()=>{f.forEach((m,h)=>{var b;const I=((b=a[m])==null?void 0:b.items)||[];localStorage.setItem(j[h],JSON.stringify(I))})},[q,f,j,a]);const H=C.useCallback((m,h,I)=>{var s,A,p,E,V,B,F,O,c,r;const b=(s=Object.keys(a))==null?void 0:s.find(d=>{var w,S;return(S=(w=a==null?void 0:a[d])==null?void 0:w.items)==null?void 0:S.find(ne=>(ne==null?void 0:ne.id)===m)});if(!b)return;const R=(p=(A=a==null?void 0:a[b])==null?void 0:A.items)==null?void 0:p.find(d=>(d==null?void 0:d.id)===m),l=(V=(E=a==null?void 0:a[h])==null?void 0:E.items)==null?void 0:V.findIndex(d=>(d==null?void 0:d.id)===I);if(!R)return;R.status=h;const $=(F=(B=a==null?void 0:a[b])==null?void 0:B.items)==null?void 0:F.filter(d=>d.id!==m);(O=a==null?void 0:a[b])==null||O.setItems($);let _=[...(c=a==null?void 0:a[h])==null?void 0:c.items];return _=_.filter(d=>d.id!==R.id),_.splice(l>=0?l:_.length,0,R),(r=a==null?void 0:a[h])==null||r.setItems(_),G(d=>({...d,[b]:{...d[b],items:$},[h]:{...d[h],items:_}})),_},[a,G]),Q=C.useCallback((m,h)=>{if(m===h)return;const I=f==null?void 0:f.indexOf(m);if(I===-1){console.error(`Old status "${m}" not found in statuses array`);return}const b=j[I],R=`${W?"local-":""}DnD-${h}`,l=a[m].items.map($=>({...$,status:h}));G($=>({...$,[m]:{...$[m],items:[]},[h]:{...$[h],items:l}})),localStorage.setItem(R,JSON.stringify(l)),localStorage.removeItem(b)},[a,j,f]);return{isDragging:k,listItemsByStatus:a,handleUpdate:H,handleRenameStatus:Q,handleDragging:m=>z(m)}},te="colors",ae="hsl",he=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:te,colorFormat:ae,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],et=n=>{const[f,k,z]=ie("Jenniina-colorsAccessibility",he),[q,re]=ie("Jenniina-currentColor","#7D7D7D"),[W,j]=ie("Jenniina-idCounter",he.length+1),[P,X]=C.useState(n),[a,G]=C.useState(!1),H=C.useCallback(l=>l.map($=>{const _=Q($,l);return{...$,compliantColors:_}}),[]),Q=(l,$)=>{let _=[],s=[],A=[];return $.forEach(p=>{if(p.id===l.id)return;const E=De(l,p);E.isAAARegularTextCompliant&&_.push(p.id),E.isAARegularTextCompliant&&A.push(p.id),E.isAAUIComponentsCompliant&&s.push(p.id)}),{AAA_RegularText:Array.from(new Set(_)),AA_RegularText:Array.from(new Set(A)),AA_UIComponents:Array.from(new Set(s))}},ce=C.useCallback(()=>{const{r:l,g:$,b:_}=Ce(q),{h:s,s:A,l:p}=Ge(l,$,_),E=$e(l,$,_),V={id:W,color:`hsl(${s}, ${A}%, ${p}%)`,luminance:E,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},B=[...f,V],F=H(B);k(F),j(O=>O+1)},[q,W,H,k,j,f]),m=C.useCallback(l=>{const $=f.filter(s=>s.id!==l).map(s=>({...s,compliantColors:{AAA_RegularText:s.compliantColors.AAA_RegularText.filter(A=>A!==l),AA_RegularText:s.compliantColors.AA_RegularText.filter(A=>A!==l),AA_UIComponents:s.compliantColors.AA_UIComponents.filter(A=>A!==l)}})),_=H($);k(_)},[f,H,k]),h=C.useCallback((l,$,_)=>{try{let s,A,p,E;if(_==="hsl"){const c=$.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!c)throw new Error("Invalid HSL format");const r=Number(c[1]),d=Number(c[2]),w=Number(c[3]);if(r<0||r>360||d<0||d>100||w<0||w>100)throw new Error("HSL values out of range");s=`hsl(${r}, ${d}%, ${w}%)`;const S=_e(r,d,w);A=S.r,p=S.g,E=S.b}else if(_==="rgb"){const c=$.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!c)throw new Error("Invalid RGB format");const r=Number(c[1]),d=Number(c[2]),w=Number(c[3]);if([r,d,w].some(S=>S<0||S>255))throw new Error("RGB values must be between 0 and 255");s=`rgb(${r}, ${d}, ${w})`,A=r,p=d,E=w}else if(_==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test($))throw new Error("Invalid Hex format");s=$.toUpperCase();const c=Ce(s);A=c.r,p=c.g,E=c.b}else throw new Error("Unsupported color format");const V=$e(A,p,E),B=f.map(c=>c.id===l?{...c,color:s,colorFormat:_,luminance:V,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:c),F=B.map(c=>{if(c.id===l)return c;const r=B.find(w=>w.id===l);if(!r)return c;const d=De(c,r);return{...c,compliantColors:{AAA_RegularText:d.isAAARegularTextCompliant?[...new Set([...c.compliantColors.AAA_RegularText,l])]:c.compliantColors.AAA_RegularText.filter(w=>w!==l),AA_RegularText:d.isAARegularTextCompliant?[...new Set([...c.compliantColors.AA_RegularText,l])]:c.compliantColors.AA_RegularText.filter(w=>w!==l),AA_UIComponents:d.isAAUIComponentsCompliant?[...new Set([...c.compliantColors.AA_UIComponents,l])]:c.compliantColors.AA_UIComponents.filter(w=>w!==l)}}}),O=F.find(c=>c.id===l);if(O){const c=Q(O,F),r=F.map(d=>d.id===l?{...d,compliantColors:c}:d);k(r)}else k(F)}catch(s){console.error("Error updating color:",s)}},[f,k]),I=C.useCallback(()=>{z(),k(he),j(he.length+1)},[z,k,j]),b=C.useCallback(()=>{z(),k([]),j(1)},[z,k,j]),R=C.useCallback(()=>{const l=ro(f,P,a);let $=W;const _=l.map(A=>{const p=_e(A[0],A[1],A[2]),E=$e(p.r,p.g,p.b);return{id:$++,color:`hsl(${A[0]}, ${A[1]}%, ${A[2]}%)`,luminance:E,status:te,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let s=[...f,..._];s=H(s),k(s),j($),G(!1)},[f,P,a,H,k,j]);return C.useEffect(()=>{a&&f.length===0&&R()},[a,f]),{colors:f,setColors:k,setColorsReset:G,addColor:ce,removeColor:m,updateColor:h,resetColors:I,clearColors:b,currentColor:q,setCurrentColor:re,mode:P,setMode:X,makeColorPalette:R}},ot=C.lazy(()=>no(()=>import("./ColorsInput-Cq-O13x0.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),xe=Jo(5);var He=(n=>(n.AA_RegularText="AA_RegularText",n.AAA_RegularText="AAA_RegularText",n.AA_UIComponents="AA_UIComponents",n))(He||{});const D="colors",tt=({language:n})=>{var we,ve,ye,Re,je;const{colors:f,setColors:k,addColor:z,removeColor:q,updateColor:re,currentColor:W,setCurrentColor:j,resetColors:P,clearColors:X,mode:a,setMode:G,makeColorPalette:H,setColorsReset:Q}=et("analogous"),ce=C.useMemo(()=>[D],[]),m=lo(),h=so(),I=ao(),[b,R]=C.useState(!0),[l,$]=ie("Jenniina-showColorNames",!0),{isDragging:_,listItemsByStatus:s,handleDragging:A,handleUpdate:p}=Zo(f,ce),E=C.useRef(0),[V,B]=C.useState(0),F=8,[O,c]=ie("Jenniina-color-block-width",F),r=`${O}em`,d=O/F,w={tooltip:`${.7*d}em`,colorName:`${.7*d}em`,input:`${.8*d}em`},S=[{value:"analogous",label:io[n]},{value:"complementary",label:co[n]},{value:"monochromatic",label:mo[n]},{value:"triad",label:po[n]},{value:"tetrad",label:uo[n]}];let ne=Math.floor(Math.random()*S.length);const[le,Je]=C.useState(S[ne]);C.useEffect(()=>{G(le==null?void 0:le.value)},[le]);const We=()=>{s[D].removeItems(),Q(!0),X()},Y=(t,i)=>{if(i==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(i==="rgb"){const u=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(u){const e=Number(u[1]),v=Number(u[2]),N=Number(u[3]);if([e,v,N].every(y=>y>=0&&y<=255))return Fe(e,v,N);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(i==="hsl"){const u=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(u){let e=se(0,Number(u[1]),360),v=se(0,Number(u[2]),100),N=se(0,Number(u[3]),100);return e=(e+360)%360,v=se(0,v,100),N=se(0,N,100),`hsl(${e}, ${v}%, ${N}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${i}`)},Be={AA_RegularText:({xPosition:t,yIndicator:i,blockWidth:u,indicatorSize:e,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=Y(N,y),T=Y(v,x);return`
 <circle
  cx="${t+u/2}"
  cy="${i+e/2}"
  r="${e*.32}"
  fill="${L}"
  stroke="${T}"
  stroke-width="${e*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:i,blockWidth:u,indicatorSize:e,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=Y(N,y),T=Y(v,x);return`
    <rect
  x="${t+u/2-e*.2}"
  y="${i+e/2-e*.15}"
  width="${e*.3}"
  height="${e*.3}"
  fill="${L}"
  stroke="${T}"
  stroke-width="${e*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:i,blockWidth:u,indicatorSize:e,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=Y(v,x);return`
<circle
  cx="${t+u/2}"
  cy="${i+e/2}"
  r="${e/2}"
  fill="${L}"
  stroke="none"
/>
`}},be=()=>{var Ne;const t=O*20,i=t,u=i/3,e=u/1.5,v=t/4,N=u/20,y=i/10,x=((Ne=s[D])==null?void 0:Ne.items)||[],T=(x==null?void 0:x.length)*(u+e)-e+v*2,Z=l?y+v:0,de=x.length*i,ge=T+Z*1.6,Ye=x==null?void 0:x.map((U,ee)=>{const oe=ee*i;let K;try{K=Y(U.color,U.colorFormat)}catch(J){console.error(J),m(ue(`${Le[n]}: ${J.message}`,!0,4)),K="#000000"}const pe=`
        <rect
          x="${oe}"
          y="0"
          width="${i}"
          height="${T}"
          fill="${K}"
          stroke="none"
        />
      `,M=l?`
        <!-- Text Background -->
        <rect
          x="${oe}"
          y="${T-.5}"
          width="${i}"
          height="${Z}"
          fill="${K}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${oe+i/2}"
          y="${T+Z/2+y/3}"
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
      `}).join(""),Qe=x==null?void 0:x.map((U,ee)=>{const K=v+ee*(u+e)+(u-N)/2,pe=Y(U.color,U.colorFormat);return`
        <rect
          x="0"
          y="${K}"
          width="${de}"
          height="${N}"
          fill="${pe}"
          stroke="none"
        />
      `}).join(""),Ze=x==null?void 0:x.map((U,ee)=>{const oe=ee*i,K=M=>{var J,Ie,Te,ke,Se,Ue;return(Ie=(J=U.compliantColors)==null?void 0:J.AAA_RegularText)!=null&&Ie.includes(M)?"AAA_RegularText":(ke=(Te=U.compliantColors)==null?void 0:Te.AA_RegularText)!=null&&ke.includes(M)?"AA_RegularText":(Ue=(Se=U.compliantColors)==null?void 0:Se.AA_UIComponents)!=null&&Ue.includes(M)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${x==null?void 0:x.filter((M,J)=>J!==ee).map(M=>{const J=K(M.id);return J?Be[J]({xPosition:oe,yIndicator:v+x.indexOf(M)*(u+e),blockWidth:i,indicatorSize:u,otherColor:M.color,blockColor:U.color,colorFormatBlock:U.colorFormat,colorFormatOther:M.colorFormat}):""}).join("")}
        </g>
      `}).join(""),Ae=10,eo=de-Ae,Ee=ge-Ae*1.5,me="https://colors.jenniina.fi",oo=`
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
    <svg xmlns="http://www.w3.org/2000/svg" width="${de}" height="${ge}">
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
  `,svgWidth:de,svgHeight:ge}},ze=()=>{const{svgContent:t}=be(),i=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(i),e=document.createElement("a");e.href=u,e.download="color-blocks.svg",document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(u),m(ue(Oe[n],!1,5))},Pe=()=>{const{svgContent:t,svgWidth:i,svgHeight:u}=be(),e=new Image;e.width=i,e.height=u;const v=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),N=URL.createObjectURL(v);e.onload=()=>{const y=document.createElement("canvas");y.width=i,y.height=u;const x=y.getContext("2d");x==null||x.drawImage(e,0,0);const L=y.toDataURL("image/png"),T=document.createElement("a");T.href=L,T.download="color-blocks.png",T.target="_blank",T.rel="noreferrer",document.body.appendChild(T),T.click(),document.body.removeChild(T),URL.revokeObjectURL(N),m(ue(Oe[n],!1,5))},e.onerror=y=>{console.error("Error loading SVG into image for PNG conversion:",y),URL.revokeObjectURL(N),m(ue(Le[n],!0,4))},e.src=N},Ve=(t,i)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:i}))},Ke=(t,i)=>{t.preventDefault(),B(i),E.current=i},qe=t=>{t.preventDefault(),A(!0)},Xe=t=>{const i=JSON.parse(t.dataTransfer.getData("text/plain"));i.type==="item"&&(p(i.id,D,V),setTimeout(()=>{var u;k((u=s[D])==null?void 0:u.items)},200),A(!1))};C.useEffect(()=>{var t,i;(!((t=s[D])!=null&&t.items)||((i=s[D])==null?void 0:i.items.length)<1)&&P()},[]);const fe=.04;return o.jsxs("div",{id:g["color-container"],className:`${g["color-container"]} ${h?g.light:""}`,style:{"--font-size":w.input},children:[o.jsx("div",{id:"info",className:g["info-wrap"],children:o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),o.jsx("span",{children:ho[n]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),o.jsx("span",{children:fo[n]})]}),o.jsxs("li",{children:[o.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),o.jsx("span",{children:go[n]})]})]})}),o.jsxs("div",{className:g["btn-wrap"],children:[((ve=(we=s[D])==null?void 0:we.items)==null?void 0:ve.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{type:"button",onClick:Pe,className:"gray small",children:[Ao[n],"  ",o.jsx(Me,{})]}),o.jsxs("button",{type:"button",onClick:ze,className:"gray small",children:[$o[n],"  ",o.jsx(Me,{})]})]}),o.jsx("button",{onClick:I,className:"gray small",children:h?o.jsxs(o.Fragment,{children:[xo[n],"  ",o.jsx(Wo,{})]}):o.jsxs(o.Fragment,{children:[Co[n],"  ",o.jsx(Bo,{})," "]})})]}),o.jsxs("div",{className:g["color-picker"],children:[o.jsxs("label",{htmlFor:"color-input",className:" ",children:[_o[n],":"]}),o.jsx("input",{id:"color-input",type:"color",value:W,onChange:t=>j(t.target.value)}),o.jsx("button",{className:"gray small",type:"button",onClick:z,children:bo[n]}),o.jsx("button",{className:"gray small",type:"button",onClick:P,children:wo[n]}),o.jsx("button",{className:"gray small",type:"button",onClick:()=>{s[D].removeItems(),X()},children:vo[n]}),o.jsxs("div",{className:`${g["color-edit-container"]} ${g["mode-container"]}`,children:[o.jsx(yo,{options:S,value:le,onChange:t=>Je(t),id:"color-mode",instructions:Ro[n],className:`${g["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),o.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:H,children:[jo[n],o.jsx("span",{className:"tooltip above narrow2",children:Eo[n]})]}),o.jsx("button",{className:"gray small",type:"button",onClick:We,children:No[n]})]})]}),o.jsx("div",{id:"color-blocks",className:`${g["color-blocks"]} ${!l||!b?g.overflow:""} ${_?g.drag:""}`,children:(ye=s[D])==null?void 0:ye.items.map(t=>{var i,u;return o.jsx("ul",{className:g["block-wrap"],onDrop:Xe,children:o.jsxs("li",{className:g["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[o.jsx("ul",{children:o.jsx("li",{draggable:"true",onDragStart:e=>Ve(e,t.id),onDragEnter:e=>Ke(e,t.id),onDragOver:e=>qe(e),onDragEnd:()=>A(!1),"data-identity":t.id,className:g["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(i=s[D])==null?void 0:i.items.length})`},children:o.jsx("div",{className:g["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(u=s[D])==null?void 0:u.items.map(e=>{var N,y,x,L,T,Z;if(e.id===t.id)return o.jsx("div",{className:`${g["indicator-null"]} ${g.indicator}`,style:{"--color":e.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${e.color}-${e.id}`);let v=null;return(y=(N=t.compliantColors)==null?void 0:N.AAA_RegularText)!=null&&y.includes(e.id)?v="AAA_RegularText":(L=(x=t.compliantColors)==null?void 0:x.AA_RegularText)!=null&&L.includes(e.id)?v="AA_RegularText":(Z=(T=t.compliantColors)==null?void 0:T.AA_UIComponents)!=null&&Z.includes(e.id)&&(v="AA_UIComponents"),v==="AAA_RegularText"?o.jsx("div",{tabIndex:0,className:`${g["indicator-aaa"]} ${g.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:e.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${xe}`,className:`tooltip below narrow3 ${g.tooltip}`,style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Io[n]}: ${e.id}`})},`aaa-${e.color}-${e.id}`):v==="AA_RegularText"?o.jsx("div",{tabIndex:0,className:`${g["indicator-aa"]} ${g.indicator} tooltip-wrap`,style:{"--color":e.color,backgroundColor:t.color,outline:`calc(${r} * ${fe*1.1}) solid ${e.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},children:o.jsx("span",{id:`span-${e.id}-${t.id}-${xe}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${To[n]}: ${e.id}`})},`aa-${e.color}-${e.id}`):v==="AA_UIComponents"?o.jsx("div",{tabIndex:0,className:`${g["indicator-aa-ui"]} ${g.indicator} tooltip-wrap`,style:{"--color":e.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${r} * ${fe}) solid ${e.color}`,outlineOffset:`calc(${r} * ${fe} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},children:o.jsx("span",{id:`span-ui-${e.id}-${t.id}-${xe}`,className:`tooltip below narrow3 ${g.tooltip}`,style:{fontSize:`clamp(0.7rem, ${w.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${ko[n]}: ${e.id}`})},`aa-ui-${e.color}-${e.id}`):o.jsx("div",{"aria-hidden":"true",className:`${g["indicator-null"]} ${g.indicator}`,style:{"--color":e.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${e.color}-${e.id}`)})})})}),l&&o.jsx("div",{style:{backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:g["color-name"],children:o.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${w.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),b&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:g["color-edit-container"],children:o.jsx(C.Suspense,{fallback:o.jsxs("div",{className:"flex center margin0auto textcenter",children:[So[n],"..."]}),children:o.jsx(ot,{language:n,block:t,updateColor:re,width:r,hexToRGB:Ce,rgbToHSL:Ge,rgbToHex:Fe,hslToRGB:_e,fontSize:`clamp(0.75rem, ${w.input}, 1rem)`})})}),o.jsx("button",{className:`tooltip-wrap small delete danger gray ${g.remove}`,onClick:()=>q(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${w.input}, 2rem)`},children:Uo[n]})]})]})},`${t.id}`)})}),((je=(Re=s[D])==null?void 0:Re.items)==null?void 0:je.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:g["width-wrap"],children:[o.jsx("label",{htmlFor:"color-block-width",children:Do[n]}),o.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:O,onChange:t=>c(Number(t.target.value))})]}),o.jsxs("div",{className:`${g["toggle-controls"]}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:Fo[n]}),o.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>R(!b),className:"gray small",children:b?Oo[n]:Lo[n]})]}),o.jsxs("div",{children:[o.jsx("strong",{children:Mo[n]}),o.jsx("button",{type:"button",onClick:()=>$(!l),className:"gray small",children:l?Go[n]:Ho[n]})]})]})]})]})},at=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:He,default:tt},Symbol.toStringTag,{value:"Module"}));export{at as A,g as s};
