import{r as w,j as o}from"./react-kX_YxI4E.js";import{L as C,u as R,N as g,E as M,e as b,aB as E}from"./index-DlLCwrmZ.js";import{u as $,g as L}from"./Images-eWQGrC3F.js";import{Q as I,P as q,g as v}from"./poems-DoXpG1Vn.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-CzVo0GbG.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const N=({image:e,language:n,handleDownload:j,searchTerm:l,textType:d})=>{const{t:s}=w.useContext(C),h=R(),{tooltip:f,handleMouseMove:p,handleMouseLeave:r}=$(),m=c=>{const t=c.currentTarget.getBoundingClientRect(),i=c.clientX-t.left+10,k=c.clientY-t.top+10;p(i,k)},[x,u]=w.useState({id:0,content:"",originator:{name:"",id:0,description:"",language_code:"en",master_id:0,url:""},tags:[""],url:"",language_code:"en"}),[y,a]=w.useState({title:"",author:"",lines:[],linecount:"0"});return w.useEffect(()=>{if(d==="poem"){const c=Math.floor(Math.random()*5)+1;(async()=>{const i=await v(n,c);a(i[0])})()}else d==="quote"?(async()=>{if(n=M.fi){const t=await L(M.en,l);t.quote?u(t.quote):h(b(t.message??s("Error"),!0,8))}else{const t=await L(n,l);t.quote?u(t.quote):h(b(t.message??s("Error"),!0,8))}})():Math.floor(Math.random()*2)+1===1?(async()=>{const i=Math.floor(Math.random()*5)+1,k=await v(n,i);a(k[0])})():(async()=>{const i=await L(n,l);i.quote?u(i.quote):h(b(i.message??s("Error"),!0,8))})()},[n,l,d]),o.jsxs("div",{onMouseMove:m,onMouseLeave:r,children:[o.jsxs("div",{className:`tooltip-wrap ${g["image-wrap"]} ${g["image-modal"]}`,children:[o.jsxs("button",{onClick:j,className:"reset",children:[o.jsx("img",{src:e.largeImageURL,alt:e.tags,loading:"lazy",style:{width:"100%",height:"auto",borderRadius:"8px",cursor:"pointer",position:"relative"}})," "]}),f.visible&&o.jsx("span",{className:"tooltip narrow",style:{top:f.y,left:f.x,right:"unset"},children:s("ClickToLoadImage")})]}),d==="quote"?o.jsx(I,{quote:x,language:n}):o.jsx(q,{poem:y,language:n})]})},ee=({image:e,language:n,show:j,searchTerm:l,textType:d})=>{const{t:s}=w.useContext(C),h=R(),f=async()=>{if(window.confirm(s("Download")+"?")){const r=await fetch(e.largeImageURL,{mode:"cors"});if(!r.ok)throw new Error("Network response was not ok");try{const m=await r.blob(),x=window.URL.createObjectURL(m),u=e.largeImageURL.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i),y=u?u[1].toLowerCase():"jpg",a=document.createElement("a");a.href=x,a.download=`${E(`${e.id}`)}-${E(e.user)}.${y}`,a.target="_blank",a.rel="noreferrer",document.body.appendChild(a),a.click(),document.body.removeChild(a),window.URL.revokeObjectURL(x)}catch(m){console.error("Download failed:",m),h(b(`${s("Error")}: ${m}`,!0,5))}}},p=()=>{j({title:e.tags,className:g["image-modal"],children:o.jsx(N,{image:e,language:n,handleDownload:f,searchTerm:l,textType:d})})};return o.jsxs("div",{className:`tooltip-wrap ${g["image-wrap"]}`,children:[o.jsx("button",{type:"button",style:{background:"none",border:"none",padding:0,cursor:"pointer",width:"100%"},"aria-label":s("ClickToOpenLargeImage"),onClick:p,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),p())},children:o.jsx("img",{src:e.webformatURL,alt:e.tags,title:e.tags,loading:"lazy",className:`${g["image-small"]}`,tabIndex:0,style:{width:"100%",height:"auto",borderRadius:"8px",cursor:"pointer"},onClick:p,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&p()}})}),o.jsx("span",{className:"tooltip above narrow2",children:s("ClickToOpenLargeImage")}),o.jsx("p",{children:o.jsx("small",{children:o.jsxs("a",{href:e.pageURL,target:"_blank",rel:"noreferrer",children:[s("ImagePage")," (",s("Author"),": ",e.user,")"]})})})]},e.id)};export{ee as default};
