import{r as n,j as o}from"./react-kX_YxI4E.js";import{N as W}from"./react-router-dom-StiqOUIT.js";import{i as N}from"./react-icons-DhcENkY1.js";import{L as F,j as O,k as C}from"./index-De2CRixK.js";import{b as $,O as D}from"./react-router-DUuhLvki.js";import"./dom-to-image-more-CfDXlNbO.js";import"./@remix-run-DTnHqtaE.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";function I(i,r="0px",c=0){const[s,t]=n.useState(!1);return n.useEffect(()=>{if(i.current==null)return;const f=new IntersectionObserver(([d])=>t(d.isIntersecting),{rootMargin:r,threshold:c});return f.observe(i.current),()=>{i.current!=null&&f.unobserve(i.current)}},[i.current,r,c]),s}function y(){const i=n.useRef();return n.useEffect(()=>{const r=i.current;if(r){const c=s=>{s.deltaY!=0&&(s.preventDefault(),r.scrollTo({left:r.scrollLeft+s.deltaY,behavior:"smooth"}))};return r.addEventListener("wheel",c),()=>r.removeEventListener("wheel",c)}},[]),i}function sr({language:i}){const{t:r}=n.useContext(F),{windowWidth:c}=O(),s=$(),t=y(),f=60;function d(){t.current&&c>C?t.current.scrollLeft-=200:t.current&&(t.current.scrollLeft-=f)}function k(){t.current&&c>C?t.current.scrollLeft+=200:t.current&&(t.current.scrollLeft+=f)}const p=[{url:"/portfolio",name:`${r("EPortfolio")}`,special:"first"},{url:"/portfolio/media",name:r("EMedia")},{url:"/portfolio/memory",name:r("EMemoryGame")},{url:"/portfolio/colors",name:r("EColorAccessibility")},{url:"/portfolio/composer",name:r("EComposerOlliSanta")},{url:"/portfolio/blob",name:r("EBlob")},{url:"/portfolio/jokes",name:r("EJokes")},{url:"/portfolio/quiz",name:r("EQuiz")},{url:"/portfolio/select",name:r("ECustomSelect")},{url:"/portfolio/salon",name:r("EHairSalon")},{url:"/portfolio/draganddrop",name:r("EDragAndDrop")},{url:"/portfolio/graphql",name:"GraphQL"},{url:"/portfolio/form",name:r("EMultistepForm")},{url:"/portfolio/todo",name:r("EToDo"),special:"last"}],e=p.map(()=>n.useRef(null)),[w,L]=n.useState(e[0]),b=I(w,"-20px",1),R=I(e[e.length-1],"-40px",1);n.useEffect(()=>{b&&t.current&&(t.current.scrollLeft=0)},[b,t]),n.useEffect(()=>{s.pathname==="/portfolio"?L(e[1]):L(e[0])},[s.pathname,e,p]),n.useEffect(()=>{var a,l;const m=p.findIndex(u=>u.url===s.pathname);m!==-1&&e[m].current&&((l=(a=e==null?void 0:e[m])==null?void 0:a.current)==null||l.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}))},[s.pathname]);const V=m=>m.map((a,l)=>{const u=a.special==="first",z=a.special==="last",v=s.pathname===a.url;return o.jsx("li",{ref:e[l],id:u?v?`portfolio-${l}`:"firstportfolioitem":z?"lastportfolioitem":`portfolio-${l}`,className:u&&v?"hide":u?"return":"",onFocus:()=>{var j,x;if(e[l]&&e[l].current&&t.current){const E=((j=e[l].current)==null?void 0:j.offsetLeft)??0,g=E+(((x=e[l].current)==null?void 0:x.offsetWidth)??0),S=t.current.scrollLeft,T=S+t.current.clientWidth,h=100;E<S+h?t.current.scrollLeft=E-h:g>T-h&&(t.current.scrollLeft=g-t.current.clientWidth+h)}},children:o.jsxs(W,{to:a.url,children:[u?o.jsx("span",{"aria-hidden":"true",children:"« "}):"",a.name]})},l)});return o.jsxs(o.Fragment,{children:[o.jsxs("nav",{className:"nav-sub",children:[o.jsxs("button",{className:`horizonal-scroll goleft 
                ${b?"disable":""}`,onClick:d,children:[" ",o.jsx(N,{}),o.jsx("span",{className:"scr",children:r("EScrollToTheLeft")})]}),o.jsx("ul",{ref:t,children:V(p)}),o.jsxs("button",{onClick:k,className:`horizonal-scroll goright 
                ${R?"disable":""}`,children:[" ",o.jsx(N,{}),o.jsx("span",{className:"scr",children:r("EScrollToTheRight")})]})]}),o.jsx(D,{})]})}export{sr as default};
