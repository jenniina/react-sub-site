import{r as x,j as e}from"./react-A9DAvxly.js";import{gQ as f,gt as p,gs as u}from"./index-BM0FeXIF.js";import{a as y}from"./axios-CCb-kr4I.js";const v=({quote:t,language:a,url:r,title:n})=>{const[d,l]=x.useState(!1),s=x.useRef(null),c=()=>{var o,h;const m=`"${t.quote}" - ${t.author}`;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(m).then(()=>{l(!0),setTimeout(()=>l(!1),3e3)},i=>{console.error("Failed to copy:",i)});else{const i=document.createElement("textarea");i.value=m,(o=s.current)==null||o.appendChild(i),i.focus(),i.select();try{document.execCommand("copy"),l(!0),setTimeout(()=>l(!1),3e3)}catch(g){console.error("Failed to copy:",g)}(h=s.current)==null||h.removeChild(i)}};return t.quote===""?e.jsx(e.Fragment,{}):e.jsxs(e.Fragment,{children:[e.jsx("p",{ref:s,children:e.jsxs("i",{children:[e.jsxs("big",{style:{display:"inline-block",margin:"0 0 0.5em"},children:['"',t.quote,'"']}),"— ",t.author]})}),e.jsxs("div",{className:"flex gap",children:[e.jsxs("small",{style:{maxWidth:"max-content",margin:"0"},children:["[ ",f[a],": ",t.category," ]"]}),e.jsx("button",{className:"small",style:{maxWidth:"max-content",marginLeft:"1em"},onClick:c,children:d?p[a]:u[a]}),n&&e.jsx("small",{children:r?e.jsx("a",{href:r,target:"_blank",rel:"noreferrer",children:n}):e.jsx(e.Fragment,{children:n})})]})]})},F=({poem:t,language:a})=>{const[r,n]=x.useState(!1),d=x.useRef(null),l=()=>{var c,m;const s=`${t.title} 

 ${t.lines.join(`
`)}

 - ${t.author}`;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(s).then(()=>{n(!0),setTimeout(()=>n(!1),3e3)},o=>{console.error("Failed to copy:",o)});else{const o=document.createElement("textarea");o.value=s,(c=d.current)==null||c.appendChild(o),o.focus(),o.select();try{document.execCommand("copy"),n(!0),setTimeout(()=>n(!1),3e3)}catch(h){console.error("Failed to copy:",h)}(m=d.current)==null||m.removeChild(o)}};return!t||!t.lines||t.lines.length<1?e.jsx(e.Fragment,{}):e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:"0 0 0.5em 0"},children:t.title}),e.jsx("p",{ref:d,children:e.jsxs("i",{children:[e.jsx("big",{style:{display:"block",margin:"0 0 0.5em"},children:t.lines.map((s,c)=>e.jsxs(x.Fragment,{children:[s,t.lines.length===c+1?"":e.jsx("br",{})]},s))}),"— ",t.author]})}),e.jsx("div",{className:"flex gap",children:e.jsx("button",{className:"small",style:{maxWidth:"max-content",marginLeft:"1em"},onClick:l,children:r?p[a]:u[a]})})]})},j="https://poetrydb.org",E=async(t,a)=>{try{const r=await y.get(`${j}/random,linecount/1;${a}`);if(r.status===200&&r.data)return r.data;throw new Error("Failed to fetch poem.")}catch(r){return console.error("Error fetching poem:",r),[]}};export{F as P,v as Q,E as g};