import{r as n,j as t}from"./react-A9DAvxly.js";import{E as u}from"./AccessibleColors-CRBQVtI_.js";import{F as f}from"./react-icons-5ULj0WcV.js";const y=n.forwardRef((e,h)=>{const[s,l]=n.useState(!1),[x,i]=n.useState(!1);n.useEffect(()=>{l(e.isOpen||!1),e.setIsFormOpen&&e.setIsFormOpen(e.isOpen||!1)},[e.isOpen]),n.useEffect(()=>{s&&e.onClick&&e.onClick()},[s]);const a=()=>{s?(i(!0),setTimeout(()=>{l(!1),i(!1),e.setIsFormOpen&&e.setIsFormOpen(!1)},300)):(i(!0),l(!0),setTimeout(()=>{i(!1)}),e.setIsFormOpen&&e.setIsFormOpen(!0))};n.useImperativeHandle(h,()=>({toggleVisibility:a}));const b=()=>{const r=document.querySelectorAll(`.${e.wrapperClass}`);if(r.length>0){let c=null,d=1/0;r.forEach(m=>{const o=m.getBoundingClientRect().top;o<0&&Math.abs(o)<d&&(c=m,d=Math.abs(o))}),c&&c.scrollIntoView({behavior:"smooth"})}a()};return t.jsxs("div",{id:`${e.id??e.className}-container`,className:`${s?"open":`closed ${e.closeClass}`} ${e.className}-container accordion-container ${e.wrapperClass}`,children:[t.jsxs("button",{type:"button",className:`${e.tooltip?"tooltip-wrap":""} accordion-btn open ${e.className}`,onClick:a,style:s?{display:"none"}:{display:"flex",alignItems:"center",justifyContent:"center"},children:[t.jsx("span",{"aria-hidden":"true",className:e.hideBrackets?"hide":"",children:"» "}),t.jsx("i",{children:e.text}),t.jsx("span",{"aria-hidden":"true",className:e.hideBrackets?"hide":"",children:" «"}),t.jsx("strong",{className:e.tooltip?`tooltip narrow2 ${e.x} ${e.y}`:"",children:e.tooltip})]}),t.jsxs("div",{className:`accordion-inner ${e.className} ${x?"animating":""} ${s?"open":"closed"}`,children:[t.jsxs("button",{type:"button",className:"accordion-btn close",onClick:a,children:[t.jsx(f,{}),u[e.language]]}),e.children,e.showButton&&t.jsxs("button",{type:"button",className:"accordion-btn close",onClick:b,children:[t.jsx(f,{}),u[e.language]]})]})]})});export{y as A};
