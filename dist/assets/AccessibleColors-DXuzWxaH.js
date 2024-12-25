const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ColorsInput-BqkyVm2B.js","assets/react-A9DAvxly.js","assets/hoist-non-react-statics-D5aJipOz.js","assets/index-Bet1KYOA.js","assets/react-dom-CxfJ6lHP.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-C4cSaZU-.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-DEc9BFqZ.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-icons-yVutJqMS.js","assets/react-router-dom-j9Ns2JNj.js","assets/react-router-BoqxkIr7.js","assets/@remix-run-DTnHqtaE.js","assets/index-CfEGHDOJ.css"])))=>i.map(i=>d[i]);
import{d5 as co,fm as Fo,fn as _o,fo as Ho,fp as wo,fq as xo,fr as ne,_ as le,u as se,N as ae,fs as ce,ft as ie,fu as de,fv as me,fw as pe,fx as ue,fy as he,fz as fe,fA as ge,fB as Ae,fC as $e,fD as xe,fE as Ce,fF as _e,ar as we,at as be,fG as ve,bB as ye,fH as Re,Y as je,fI as Ee,fJ as Ne,fK as Te,fL as Ie,fM as ke,f as Se,fN as Oo,dd as Ue,fO as De,aF as Fe,fP as Oe,fQ as Le,fR as Me,fS as Ge,fT as He,fU as Je,p as ho,fV as Lo,c1 as Mo,fW as so}from"./index-Bet1KYOA.js";import{r as C,j as e}from"./react-A9DAvxly.js";import{P as Go,O as Be,Q as We}from"./react-icons-yVutJqMS.js";const Pe="_light_eood7_39",ze="_drag_eood7_221",Ve="_overflow_eood7_235",Ke="_indicator_eood7_343",qe="_tooltip_eood7_343",Qe="_form_eood7_511",Xe="_remove_eood7_539",Ye="_inputs_eood7_569",g={"color-container":"_color-container_eood7_1",light:Pe,"color-picker":"_color-picker_eood7_57","width-wrap":"_width-wrap_eood7_109","btn-wrap":"_btn-wrap_eood7_123","info-wrap":"_info-wrap_eood7_141","color-blocks":"_color-blocks_eood7_189",drag:ze,overflow:Ve,"block-wrap":"_block-wrap_eood7_243","color-wrap":"_color-wrap_eood7_261","color-block":"_color-block_eood7_189","compliance-indicators":"_compliance-indicators_eood7_321",indicator:Ke,tooltip:qe,"indicator-aaa":"_indicator-aaa_eood7_373","indicator-null":"_indicator-null_eood7_381","compliance-info":"_compliance-info_eood7_389","toggle-controls":"_toggle-controls_eood7_397","color-edit-container":"_color-edit-container_eood7_427","color-select":"_color-select_eood7_429","mode-container":"_mode-container_eood7_485",form:Qe,"color-format-submit":"_color-format-submit_eood7_537",remove:Xe,"color-name":"_color-name_eood7_553",inputs:Ye,"hex-input":"_hex-input_eood7_599"},Ze=(n,f)=>{const[k,P]=C.useState(!1),[q,ro]=C.useState(n),B=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",j=C.useMemo(()=>f==null?void 0:f.map(m=>`${B?"local-":""}DnD-${m}`),[f,B]),z=C.useCallback(()=>f==null?void 0:f.reduce((m,h,T)=>{const w=JSON.parse(localStorage.getItem(j[T])||"[]");return m[h]={items:w.length>0?w:n.filter(R=>R.status===h),setItems:R=>{localStorage.setItem(j[T],JSON.stringify(R)),G(l=>({...l,[h]:{...l[h],items:R}}))},removeItems:()=>{localStorage.removeItem(j[T]),G(R=>({...R,[h]:{...R[h],items:[]}}))}},m},{}),[f,j]),Q=(m,h)=>JSON.stringify(m)===JSON.stringify(h),[a,G]=C.useState(z);C.useEffect(()=>{f.forEach((m,h)=>{var A;const T=((A=a[m])==null?void 0:A.items)||[],w=n.filter(p=>p.status===m),R=new Map(w.map(p=>[p.id,p])),l=T.map(p=>{const E=R.get(p.id);return E&&JSON.stringify(p)!==JSON.stringify(E)?E:p}).filter(p=>R.has(p.id)),$=new Set(T.map(p=>p.id)),_=w.filter(p=>!$.has(p.id)),s=[...l,..._];Q(T,s)||a[m].setItems(s)}),f.forEach((m,h)=>{var w;const T=((w=a[m])==null?void 0:w.items)||[];localStorage.setItem(j[h],JSON.stringify(T))})},[n,f,j,Q]),C.useEffect(()=>{ro(f.flatMap(m=>{var h;return((h=a[m])==null?void 0:h.items)||[]}))},[a]),C.useEffect(()=>{f.forEach((m,h)=>{var w;const T=((w=a[m])==null?void 0:w.items)||[];localStorage.setItem(j[h],JSON.stringify(T))})},[q,f,j,a]);const H=C.useCallback((m,h,T)=>{var s,A,p,E,V,W,F,O,i,r;const w=(s=Object.keys(a))==null?void 0:s.find(d=>{var b,S;return(S=(b=a==null?void 0:a[d])==null?void 0:b.items)==null?void 0:S.find(no=>(no==null?void 0:no.id)===m)});if(!w)return;const R=(p=(A=a==null?void 0:a[w])==null?void 0:A.items)==null?void 0:p.find(d=>(d==null?void 0:d.id)===m),l=(V=(E=a==null?void 0:a[h])==null?void 0:E.items)==null?void 0:V.findIndex(d=>(d==null?void 0:d.id)===T);if(!R)return;R.status=h;const $=(F=(W=a==null?void 0:a[w])==null?void 0:W.items)==null?void 0:F.filter(d=>d.id!==m);(O=a==null?void 0:a[w])==null||O.setItems($);let _=[...(i=a==null?void 0:a[h])==null?void 0:i.items];return _=_.filter(d=>d.id!==R.id),_.splice(l>=0?l:_.length,0,R),(r=a==null?void 0:a[h])==null||r.setItems(_),G(d=>({...d,[w]:{...d[w],items:$},[h]:{...d[h],items:_}})),_},[a,G]),Y=C.useCallback((m,h)=>{if(m===h)return;const T=f==null?void 0:f.indexOf(m);if(T===-1){console.error(`Old status "${m}" not found in statuses array`);return}const w=j[T],R=`${B?"local-":""}DnD-${h}`,l=a[m].items.map($=>({...$,status:h}));G($=>({...$,[m]:{...$[m],items:[]},[h]:{...$[h],items:l}})),localStorage.setItem(R,JSON.stringify(l)),localStorage.removeItem(w)},[a,j,f]);return{isDragging:k,listItemsByStatus:a,handleUpdate:H,handleRenameStatus:Y,handleDragging:m=>P(m)}},to="colors",ao="hsl",fo=[{id:1,color:"hsl(200, 50%, 10%)",luminance:.011540526030345211,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[4,5],AA_UIComponents:[3,4,5],AA_RegularText:[3,4,5]}},{id:2,color:"hsl(200, 50%, 35%)",luminance:.12179747967530058,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[],AA_UIComponents:[4,5],AA_RegularText:[5]}},{id:3,color:"hsl(200, 50%, 55%)",luminance:.3071249100459835,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[],AA_UIComponents:[1],AA_RegularText:[1]}},{id:4,color:"hsl(200, 50%, 75%)",luminance:.5493970089199802,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1]}},{id:5,color:"hsl(200, 50%, 90%)",luminance:.800081557105977,status:to,colorFormat:ao,compliantColors:{AAA_RegularText:[1],AA_UIComponents:[1,2],AA_RegularText:[1,2]}}],ot=n=>{const[f,k,P]=co("Jenniina-colorsAccessibility",fo),[q,ro]=co("Jenniina-currentColor","#7D7D7D"),[B,j]=co("Jenniina-idCounter",fo.length+1),[z,Q]=C.useState(n),[a,G]=C.useState(!1),H=C.useCallback(l=>l.map($=>{const _=Y($,l);return{...$,compliantColors:_}}),[]),Y=(l,$)=>{let _=[],s=[],A=[];return $.forEach(p=>{if(p.id===l.id)return;const E=Fo(l,p);E.isAAARegularTextCompliant&&_.push(p.id),E.isAARegularTextCompliant&&A.push(p.id),E.isAAUIComponentsCompliant&&s.push(p.id)}),{AAA_RegularText:Array.from(new Set(_)),AA_RegularText:Array.from(new Set(A)),AA_UIComponents:Array.from(new Set(s))}},io=C.useCallback(()=>{const{r:l,g:$,b:_}=_o(q),{h:s,s:A,l:p}=Ho(l,$,_),E=xo(l,$,_),V={id:B,color:`hsl(${s}, ${A}%, ${p}%)`,luminance:E,status:"colors",colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}},W=[...f,V],F=H(W);k(F),j(O=>O+1)},[q,B,H,k,j,f]),m=C.useCallback(l=>{const $=f.filter(s=>s.id!==l).map(s=>({...s,compliantColors:{AAA_RegularText:s.compliantColors.AAA_RegularText.filter(A=>A!==l),AA_RegularText:s.compliantColors.AA_RegularText.filter(A=>A!==l),AA_UIComponents:s.compliantColors.AA_UIComponents.filter(A=>A!==l)}})),_=H($);k(_)},[f,H,k]),h=C.useCallback((l,$,_)=>{try{let s,A,p,E;if(_==="hsl"){const i=$.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(!i)throw new Error("Invalid HSL format");const r=Number(i[1]),d=Number(i[2]),b=Number(i[3]);if(r<0||r>360||d<0||d>100||b<0||b>100)throw new Error("HSL values out of range");s=`hsl(${r}, ${d}%, ${b}%)`;const S=wo(r,d,b);A=S.r,p=S.g,E=S.b}else if(_==="rgb"){const i=$.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(!i)throw new Error("Invalid RGB format");const r=Number(i[1]),d=Number(i[2]),b=Number(i[3]);if([r,d,b].some(S=>S<0||S>255))throw new Error("RGB values must be between 0 and 255");s=`rgb(${r}, ${d}, ${b})`,A=r,p=d,E=b}else if(_==="hex"){if(!/^#([0-9A-F]{3}){1,2}$/i.test($))throw new Error("Invalid Hex format");s=$.toUpperCase();const i=_o(s);A=i.r,p=i.g,E=i.b}else throw new Error("Unsupported color format");const V=xo(A,p,E),W=f.map(i=>i.id===l?{...i,color:s,colorFormat:_,luminance:V,compliantColors:{AAA_RegularText:[],AA_RegularText:[],AA_UIComponents:[]}}:i),F=W.map(i=>{if(i.id===l)return i;const r=W.find(b=>b.id===l);if(!r)return i;const d=Fo(i,r);return{...i,compliantColors:{AAA_RegularText:d.isAAARegularTextCompliant?[...new Set([...i.compliantColors.AAA_RegularText,l])]:i.compliantColors.AAA_RegularText.filter(b=>b!==l),AA_RegularText:d.isAARegularTextCompliant?[...new Set([...i.compliantColors.AA_RegularText,l])]:i.compliantColors.AA_RegularText.filter(b=>b!==l),AA_UIComponents:d.isAAUIComponentsCompliant?[...new Set([...i.compliantColors.AA_UIComponents,l])]:i.compliantColors.AA_UIComponents.filter(b=>b!==l)}}}),O=F.find(i=>i.id===l);if(O){const i=Y(O,F),r=F.map(d=>d.id===l?{...d,compliantColors:i}:d);k(r)}else k(F)}catch(s){console.error("Error updating color:",s)}},[f,k]),T=C.useCallback(()=>{P(),k(fo),j(fo.length+1)},[P,k,j]),w=C.useCallback(()=>{P(),k([]),j(1)},[P,k,j]),R=C.useCallback(()=>{const l=ne(f,z,a);let $=B;const _=l.map(A=>{const p=wo(A[0],A[1],A[2]),E=xo(p.r,p.g,p.b);return{id:$++,color:`hsl(${A[0]}, ${A[1]}%, ${A[2]}%)`,luminance:E,status:to,colorFormat:"hsl",compliantColors:{AA_RegularText:[],AAA_RegularText:[],AA_UIComponents:[]}}});let s=[...f,..._];s=H(s),k(s),j($),G(!1)},[f,z,a,H,k,j]);return C.useEffect(()=>{a&&f.length===0&&R()},[a,f]),{colors:f,setColors:k,setColorsReset:G,addColor:io,removeColor:m,updateColor:h,resetColors:T,clearColors:w,currentColor:q,setCurrentColor:ro,mode:z,setMode:Q,makeColorPalette:R}},et=C.lazy(()=>le(()=>import("./ColorsInput-BqkyVm2B.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),Co=Je(5);var Jo=(n=>(n.AA_RegularText="AA_RegularText",n.AAA_RegularText="AAA_RegularText",n.AA_UIComponents="AA_UIComponents",n))(Jo||{});const D="colors",tt=({language:n})=>{var vo,yo,Ro,jo,Eo;const{colors:f,setColors:k,addColor:P,removeColor:q,updateColor:ro,currentColor:B,setCurrentColor:j,resetColors:z,clearColors:Q,mode:a,setMode:G,makeColorPalette:H,setColorsReset:Y}=ot("analogous"),io=C.useMemo(()=>[D],[]),m=se(),h=ae(),T=ce(),[w,R]=C.useState(!0),[l,$]=co("Jenniina-showColorNames",!0),{isDragging:_,listItemsByStatus:s,handleDragging:A,handleUpdate:p}=Ze(f,io),E=C.useRef(0),[V,W]=C.useState(0),F=8,[O,i]=co("Jenniina-color-block-width",F),r=`${O}em`,d=O/F,b={tooltip:`${.7*d}em`,colorName:`${.7*d}em`,input:`${.8*d}em`},S=[{value:"analogous",label:ie[n]},{value:"complementary",label:de[n]},{value:"monochromatic",label:me[n]},{value:"triad",label:pe[n]},{value:"tetrad",label:ue[n]}];let no=Math.floor(Math.random()*S.length);const[lo,Bo]=C.useState(S[no]);C.useEffect(()=>{G(lo==null?void 0:lo.value)},[lo]);const Wo=()=>{s[D].removeItems(),Y(!0),Q()},X=(t,c)=>{if(c==="hex"){if(/^#([A-Fa-f0-9]{6})$/.test(t))return t.toUpperCase();throw new Error(`Invalid HEX color format: ${t}`)}else if(c==="rgb"){const u=t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);if(u){const o=Number(u[1]),v=Number(u[2]),N=Number(u[3]);if([o,v,N].every(y=>y>=0&&y<=255))return Oo(o,v,N);throw new Error(`RGB values out of range in color: ${t}`)}else throw new Error(`Invalid RGB color format: ${t}`)}else if(c==="hsl"){const u=t.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);if(u){let o=so(0,Number(u[1]),360),v=so(0,Number(u[2]),100),N=so(0,Number(u[3]),100);return o=(o+360)%360,v=so(0,v,100),N=so(0,N,100),`hsl(${o}, ${v}%, ${N}%)`}else throw new Error(`Invalid HSL color format: ${t}`)}else throw new Error(`Unsupported color format: ${c}`)},Po={AA_RegularText:({xPosition:t,yIndicator:c,blockWidth:u,indicatorSize:o,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=X(N,y),I=X(v,x);return`
 <circle
  cx="${t+u/2}"
  cy="${c+o/2}"
  r="${o*.32}"
  fill="${L}"
  stroke="${I}"
  stroke-width="${o*.1}"
/>
`},AA_UIComponents:({xPosition:t,yIndicator:c,blockWidth:u,indicatorSize:o,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=X(N,y),I=X(v,x);return`
    <rect
  x="${t+u/2-o*.2}"
  y="${c+o/2-o*.15}"
  width="${o*.3}"
  height="${o*.3}"
  fill="${L}"
  stroke="${I}"
  stroke-width="${o*.1}"
/>
`},AAA_RegularText:({xPosition:t,yIndicator:c,blockWidth:u,indicatorSize:o,otherColor:v,blockColor:N,colorFormatBlock:y,colorFormatOther:x})=>{const L=X(v,x);return`
<circle
  cx="${t+u/2}"
  cy="${c+o/2}"
  r="${o/2}"
  fill="${L}"
  stroke="none"
/>
`}},bo=()=>{var To;const t=O*20,c=t,u=c/3,o=u/1.5,v=t/4,N=u/20,y=c/10,x=((To=s[D])==null?void 0:To.items)||[],I=(x==null?void 0:x.length)*(u+o)-o+v*2,Z=l?y+v:0,mo=x.length*c,Ao=I+Z*1.6,Yo=x==null?void 0:x.map((U,oo)=>{const eo=oo*c;let K;try{K=X(U.color,U.colorFormat)}catch(J){console.error(J),m(ho(`${Mo[n]}: ${J.message}`,!0,4)),K="#000000"}const uo=`
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
      `}).join(""),Zo=x==null?void 0:x.map((U,oo)=>{const K=v+oo*(u+o)+(u-N)/2,uo=X(U.color,U.colorFormat);return`
        <rect
          x="0"
          y="${K}"
          width="${mo}"
          height="${N}"
          fill="${uo}"
          stroke="none"
        />
      `}).join(""),oe=x==null?void 0:x.map((U,oo)=>{const eo=oo*c,K=M=>{var J,Io,ko,So,Uo,Do;return(Io=(J=U.compliantColors)==null?void 0:J.AAA_RegularText)!=null&&Io.includes(M)?"AAA_RegularText":(So=(ko=U.compliantColors)==null?void 0:ko.AA_RegularText)!=null&&So.includes(M)?"AA_RegularText":(Do=(Uo=U.compliantColors)==null?void 0:Uo.AA_UIComponents)!=null&&Do.includes(M)?"AA_UIComponents":null};return`
        <g>
          <!-- Compliance Indicators -->
          ${x==null?void 0:x.filter((M,J)=>J!==oo).map(M=>{const J=K(M.id);return J?Po[J]({xPosition:eo,yIndicator:v+x.indexOf(M)*(u+o),blockWidth:c,indicatorSize:u,otherColor:M.color,blockColor:U.color,colorFormatBlock:U.colorFormat,colorFormatOther:M.colorFormat}):""}).join("")}
        </g>
      `}).join(""),$o=10,ee=mo-$o,No=Ao-$o*1.5,po="https://colors.jenniina.fi",te=`
      <a href="${po}" target="_blank" rel="noopener noreferrer">
        <text
          x="${ee}"
          y="${No}"
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
          y="${No}"
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
    <svg xmlns="http://www.w3.org/2000/svg" width="${mo}" height="${Ao}">
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
  `,svgWidth:mo,svgHeight:Ao}},zo=()=>{const{svgContent:t}=bo(),c=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(c),o=document.createElement("a");o.href=u,o.download="color-blocks.svg",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(u),m(ho(Lo[n],!1,5))},Vo=()=>{const{svgContent:t,svgWidth:c,svgHeight:u}=bo(),o=new Image;o.width=c,o.height=u;const v=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),N=URL.createObjectURL(v);o.onload=()=>{const y=document.createElement("canvas");y.width=c,y.height=u;const x=y.getContext("2d");x==null||x.drawImage(o,0,0);const L=y.toDataURL("image/png"),I=document.createElement("a");I.href=L,I.download="color-blocks.png",I.target="_blank",I.rel="noreferrer",document.body.appendChild(I),I.click(),document.body.removeChild(I),URL.revokeObjectURL(N),m(ho(Lo[n],!1,5))},o.onerror=y=>{console.error("Error loading SVG into image for PNG conversion:",y),URL.revokeObjectURL(N),m(ho(Mo[n],!0,4))},o.src=N},Ko=(t,c)=>{t.dataTransfer.setData("text/plain",JSON.stringify({type:"item",id:c}))},qo=(t,c)=>{t.preventDefault(),W(c),E.current=c},Qo=t=>{t.preventDefault(),A(!0)},Xo=t=>{const c=JSON.parse(t.dataTransfer.getData("text/plain"));c.type==="item"&&(p(c.id,D,V),setTimeout(()=>{var u;k((u=s[D])==null?void 0:u.items)},200),A(!1))};C.useEffect(()=>{var t,c;(!((t=s[D])!=null&&t.items)||((c=s[D])==null?void 0:c.items.length)<1)&&z()},[]);const go=.04;return e.jsxs("div",{id:g["color-container"],className:`${g["color-container"]} ${h?g.light:""}`,style:{"--font-size":b.input},children:[e.jsx("div",{id:"info",className:g["info-wrap"],children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"var(--color-primary-20)",borderRadius:"50%",width:"2em",height:"2em"}}),e.jsx("span",{children:he[n]})]}),e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.3em",borderRadius:"50%",width:"1.7em",height:"1.7em",margin:"0 0.2em 0 0.2em "}}),e.jsx("span",{children:fe[n]})]}),e.jsxs("li",{children:[e.jsx("div",{style:{display:"inline-block",backgroundColor:"transparent",outline:"0.3em solid var(--color-primary-20)",outlineOffset:"-0.26em",borderRadius:"0",width:"0.9em",height:"0.9em",margin:"0 0.65em 0 0.65em"}}),e.jsx("span",{children:ge[n]})]})]})}),e.jsxs("div",{className:g["btn-wrap"],children:[((yo=(vo=s[D])==null?void 0:vo.items)==null?void 0:yo.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:Vo,className:"gray small",children:[Ae[n],"  ",e.jsx(Go,{})]}),e.jsxs("button",{type:"button",onClick:zo,className:"gray small",children:[$e[n],"  ",e.jsx(Go,{})]})]}),e.jsx("button",{onClick:T,className:"gray small",children:h?e.jsxs(e.Fragment,{children:[xe[n],"  ",e.jsx(Be,{})]}):e.jsxs(e.Fragment,{children:[Ce[n],"  ",e.jsx(We,{})," "]})})]}),e.jsxs("div",{className:g["color-picker"],children:[e.jsxs("label",{htmlFor:"color-input",className:" ",children:[_e[n],":"]}),e.jsx("input",{id:"color-input",type:"color",value:B,onChange:t=>j(t.target.value)}),e.jsx("button",{className:"gray small",type:"button",onClick:P,children:we[n]}),e.jsx("button",{className:"gray small",type:"button",onClick:z,children:be[n]}),e.jsx("button",{className:"gray small",type:"button",onClick:()=>{s[D].removeItems(),Q()},children:ve[n]}),e.jsxs("div",{className:`${g["color-edit-container"]} ${g["mode-container"]}`,children:[e.jsx(ye,{options:S,value:lo,onChange:t=>Bo(t),id:"color-mode",instructions:Re[n],className:`${g["color-select"]}`,hide:!0,hideDelete:!0,tooltip:!0,y:"above narrow2",z:3}),e.jsxs("button",{className:"gray small tooltip-wrap",type:"button",onClick:H,children:[je[n],e.jsx("span",{className:"tooltip above narrow2",children:Ee[n]})]}),e.jsx("button",{className:"gray small",type:"button",onClick:Wo,children:Ne[n]})]})]}),e.jsx("div",{id:"color-blocks",className:`${g["color-blocks"]} ${!l||!w?g.overflow:""} ${_?g.drag:""}`,children:(Ro=s[D])==null?void 0:Ro.items.map(t=>{var c,u;return e.jsx("ul",{className:g["block-wrap"],onDrop:Xo,children:e.jsxs("li",{className:g["color-wrap"],title:`ID: ${t.id}`,"aria-label":`ID: ${t.id}`,style:{width:`${r}`,maxWidth:`${r}`},children:[e.jsx("ul",{children:e.jsx("li",{draggable:"true",onDragStart:o=>Ko(o,t.id),onDragEnter:o=>qo(o,t.id),onDragOver:o=>Qo(o),onDragEnd:()=>A(!1),"data-identity":t.id,className:g["color-block"],style:{"--color":t.color,backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,height:`calc(calc(${r} * 0.6) * ${(c=s[D])==null?void 0:c.items.length})`},children:e.jsx("div",{className:g["compliance-indicators"],style:{gap:`calc(${r} / 4)`,"--width-full":`${r}`},children:(u=s[D])==null?void 0:u.items.map(o=>{var N,y,x,L,I,Z;if(o.id===t.id)return e.jsx("div",{className:`${g["indicator-null"]} ${g.indicator}`,style:{"--color":o.color,"--width":`calc(${r} / 3)`,"--left":`calc(calc(${r} / 3) * -1)`,backgroundColor:"transparent",width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`none-${o.color}-${o.id}`);let v=null;return(y=(N=t.compliantColors)==null?void 0:N.AAA_RegularText)!=null&&y.includes(o.id)?v="AAA_RegularText":(L=(x=t.compliantColors)==null?void 0:x.AA_RegularText)!=null&&L.includes(o.id)?v="AA_RegularText":(Z=(I=t.compliantColors)==null?void 0:I.AA_UIComponents)!=null&&Z.includes(o.id)&&(v="AA_UIComponents"),v==="AAA_RegularText"?e.jsx("div",{tabIndex:0,className:`${g["indicator-aaa"]} ${g.indicator} tooltip-wrap`,style:{"--color":o.color,backgroundColor:o.color,"--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`},children:e.jsx("span",{id:`span-${o.id}-${t.id}-${Co}`,className:`tooltip below narrow3 ${g.tooltip}`,style:{fontSize:`clamp(0.7rem, ${b.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Te[n]}: ${o.id}`})},`aaa-${o.color}-${o.id}`):v==="AA_RegularText"?e.jsx("div",{tabIndex:0,className:`${g["indicator-aa"]} ${g.indicator} tooltip-wrap`,style:{"--color":o.color,backgroundColor:t.color,outline:`calc(${r} * ${go*1.1}) solid ${o.color}`,outlineOffset:`calc(${r} * -0.013)`,"--left":`calc(calc(${r} / 5) * -2)`,width:`calc(${r} / 5)`,height:`calc(${r} / 5)`,margin:`calc(${r} / 15)`,borderRadius:"50%"},children:e.jsx("span",{id:`span-${o.id}-${t.id}-${Co}`,className:"tooltip below narrow3",style:{fontSize:`clamp(0.7rem, ${b.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${Ie[n]}: ${o.id}`})},`aa-${o.color}-${o.id}`):v==="AA_UIComponents"?e.jsx("div",{tabIndex:0,className:`${g["indicator-aa-ui"]} ${g.indicator} tooltip-wrap`,style:{"--color":o.color,"--left":`calc(calc(${r} / 7) * -3)`,backgroundColor:t.color,outline:`calc(${r} * ${go}) solid ${o.color}`,outlineOffset:`calc(${r} * ${go} * -1)`,width:`calc(${r} / 7)`,height:`calc(${r} / 7)`,margin:`calc(${r} / 10.5)`},children:e.jsx("span",{id:`span-ui-${o.id}-${t.id}-${Co}`,className:`tooltip below narrow3 ${g.tooltip}`,style:{fontSize:`clamp(0.7rem, ${b.input}, 0.9rem)`,"--tooltip-max-width":r},children:`${ke[n]}: ${o.id}`})},`aa-ui-${o.color}-${o.id}`):e.jsx("div",{"aria-hidden":"true",className:`${g["indicator-null"]} ${g.indicator}`,style:{"--color":o.color,backgroundColor:"transparent","--left":`calc(calc(${r} / 3) * -1)`,width:`calc(${r} / 3)`,height:`calc(${r} / 3)`}},`null-${o.color}-${o.id}`)})})})}),l&&e.jsx("div",{style:{backgroundColor:t.color,width:`${r}`,maxWidth:`${r}`,display:"flex",justifyContent:"center",alignItems:"center",padding:"0.5em 0.1em "},className:g["color-name"],children:e.jsx("span",{style:{color:t.luminance<.179?"white":"black",fontSize:`clamp(0.7rem, ${b.input}, 1.2rem)`,textAlign:"center"},children:t.color})}),w&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:g["color-edit-container"],children:e.jsx(C.Suspense,{fallback:e.jsxs("div",{className:"flex center margin0auto textcenter",children:[Se[n],"..."]}),children:e.jsx(et,{language:n,block:t,updateColor:ro,width:r,hexToRGB:_o,rgbToHSL:Ho,rgbToHex:Oo,hslToRGB:wo,fontSize:`clamp(0.75rem, ${b.input}, 1rem)`})})}),e.jsx("button",{className:`tooltip-wrap small delete danger gray ${g.remove}`,onClick:()=>q(t.id),style:{margin:"0.8em auto",width:"calc(100% - 4px)",minWidth:"calc(100% - 4px)",fontSize:`clamp(0.75rem, ${b.input}, 2rem)`},children:Ue[n]})]})]})},`${t.id}`)})}),((Eo=(jo=s[D])==null?void 0:jo.items)==null?void 0:Eo.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:g["width-wrap"],children:[e.jsx("label",{htmlFor:"color-block-width",children:De[n]}),e.jsx("input",{id:"color-block-width",type:"range",min:6,max:12,step:.5,value:O,onChange:t=>i(Number(t.target.value))})]}),e.jsxs("div",{className:`${g["toggle-controls"]}`,children:[e.jsxs("div",{children:[e.jsx("strong",{children:Fe[n]}),e.jsx("button",{id:"toggle-controls",type:"button",onClick:()=>R(!w),className:"gray small",children:w?Oe[n]:Le[n]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:Me[n]}),e.jsx("button",{type:"button",onClick:()=>$(!l),className:"gray small",children:l?Ge[n]:He[n]})]})]})]})]})},at=Object.freeze(Object.defineProperty({__proto__:null,ComplianceLevel:Jo,default:tt},Symbol.toStringTag,{value:"Module"}));export{at as A,g as s};
