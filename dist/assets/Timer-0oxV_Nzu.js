import{a9 as i,K as o,ac as l,r as n,d2 as d,d3 as u,d4 as m,d5 as f,j as p,cI as h}from"./index-DmCUPrzn.js";const x=()=>{const{secondsRemaining:s}=i(t=>t.questions),a=s%60,r=Math.floor(s/60),e=o(),c=l();return n.useEffect(()=>{s===0&&(e(d()),e(u()),e(m()),c("/portfolio/quiz/results"))},[s]),n.useEffect(()=>{const t=setInterval(()=>{e(f())},1e3);return()=>clearInterval(t)},[]),p.jsxs("div",{className:`${h.timer}`,children:[r<10&&"0",r,":",a<10&&"0",a]})};export{x as default};
