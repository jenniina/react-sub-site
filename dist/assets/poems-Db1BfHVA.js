import{r as x,j as e}from"./react-kX_YxI4E.js";import{h5 as h,h2 as u}from"./index-epxSP5Qu.js";import{a as f}from"./axios-CCb-kr4I.js";const T=({quote:t,language:a,url:r,title:s})=>{const[d,c]=x.useState(!1),n=x.useRef(null),l=()=>{var o,p;const m=`"${t.content}" - ${t.originator.name}`;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(m).then(()=>{c(!0),setTimeout(()=>c(!1),3e3)},i=>{console.error("Failed to copy:",i)});else{const i=document.createElement("textarea");i.value=m,(o=n.current)==null||o.appendChild(i),i.focus(),i.select();try{document.execCommand("copy"),c(!0),setTimeout(()=>c(!1),3e3)}catch(g){console.error("Failed to copy:",g)}(p=n.current)==null||p.removeChild(i)}};return t.content===""?e.jsx(e.Fragment,{}):e.jsxs(e.Fragment,{children:[e.jsx("p",{ref:n,children:e.jsxs("i",{children:[e.jsxs("big",{style:{display:"inline-block",margin:"0 0 0.5em"},children:['"',t.content,'"']}),"— ",t.originator.name]})}),e.jsxs("div",{className:"flex gap",children:[e.jsx("button",{className:"small",style:{maxWidth:"max-content",marginLeft:"1em"},onClick:l,children:d?h[a]:u[a]}),s&&e.jsx("small",{children:r?e.jsx("a",{href:r,target:"_blank",rel:"noreferrer",children:s}):e.jsx(e.Fragment,{children:s})})]})]})},v=({poem:t,language:a})=>{const[r,s]=x.useState(!1),d=x.useRef(null),c=()=>{var l,m;const n=`${t.title} 

 ${t.lines.join(`
`)}

 - ${t.author}`;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(n).then(()=>{s(!0),setTimeout(()=>s(!1),3e3)},o=>{console.error("Failed to copy:",o)});else{const o=document.createElement("textarea");o.value=n,(l=d.current)==null||l.appendChild(o),o.focus(),o.select();try{document.execCommand("copy"),s(!0),setTimeout(()=>s(!1),3e3)}catch(p){console.error("Failed to copy:",p)}(m=d.current)==null||m.removeChild(o)}};return!t||!t.lines||t.lines.length<1?e.jsx(e.Fragment,{}):e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:"0 0 0.5em 0"},children:t.title}),e.jsx("p",{ref:d,children:e.jsxs("i",{children:[e.jsx("big",{style:{display:"block",margin:"0 0 0.5em"},children:t.lines.map((n,l)=>e.jsxs(x.Fragment,{children:[n,t.lines.length===l+1?"":e.jsx("br",{})]},n))}),"— ",t.author]})}),e.jsx("div",{className:"flex gap",children:e.jsx("button",{className:"small",style:{maxWidth:"max-content",marginLeft:"1em"},onClick:c,children:r?h[a]:u[a]})})]})},j="https://poetrydb.org",F=async(t,a)=>{try{const r=await f.get(`${j}/random,linecount/1;${a}`);if(r.status===200&&r.data)return r.data;throw new Error("Failed to fetch poem.")}catch(r){return console.error("Error fetching poem:",r),[]}};export{v as P,T as Q,F as g};
