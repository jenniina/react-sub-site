import{r as a,j as e}from"./react-A9DAvxly.js";import{aI as Le,aJ as Me,n as Te,aK as ye,aL as Oe,aM as Ce,aN as Fe,aO as Re,aP as De,aQ as Ie,aR as ze}from"./react-icons-5ULj0WcV.js";import{N as P}from"./react-router-dom-B5GO_nIJ.js";import{s as Pe,cL as ee,cM as se,cN as te,cO as ne,cP as Ae,cQ as He,cR as We,a$ as Ye,cS as Be,cT as i,u as Ue,cU as d,bS as ae,cV as Je,cB as Qe,cW as Ve,cI as Ze,cp as Ke,b3 as oe,bY as ie,bZ as re,cX as Xe,ar as qe,cD as Ge,cY as es,n as N,cZ as ss,c_ as ts,c$ as ns}from"./AccessibleColors-CRBQVtI_.js";import{u as as,l as os,d as is}from"./Blob-DEVQxHac.js";import{a as rs}from"./react-redux-CHm9GgGE.js";import{F as ls}from"./Login-Dw71jGfM.js";import{R as cs}from"./Register-BAcCOfpp.js";import{S as ds}from"./Select-BZ5uqlR9.js";import{P as ms}from"./PasswordReset-BSmEB_ZE.js";import{A as us}from"./Accordion-DsZcHxu2.js";import{C as hs}from"./Cart-DyrMmj7e.js";import{u as fs,a as _s}from"./react-router-U2TbpS38.js";const ps="_transformations_26b2w_25",bs="_hide_26b2w_35",ws="_show_26b2w_41",xs="_toolbar_26b2w_81",js="_settings_26b2w_99",vs="_light_26b2w_169",gs="_togglemenu_26b2w_311",$s="_menupath_26b2w_333",Ss="_search_26b2w_359",Ns="_menualt_26b2w_389",ks="_hidden_26b2w_503",Es="_toolwrap_26b2w_515",Ls="_loginregisterwrap_26b2w_567",Ms="_closed_26b2w_583",Ts="_fi_26b2w_593",ys="_es_26b2w_595",Os="_Welcome_26b2w_717",Cs="_jenniina_26b2w_723",Fs="_link_26b2w_751",Rs="_active_26b2w_753",Ds="_welcome_26b2w_855",Is="_about_26b2w_857",zs="_portfolio_26b2w_859",Ps="_contact_26b2w_861",As="_language_26b2w_891",Hs="_navstyle_26b2w_923",Ws="_dots_26b2w_949",Ys="_dashes_26b2w_963",Bs="_loginregister_26b2w_567",Us="_logout_26b2w_1043",Js="_keepvisible_26b2w_1217",Qs="_menutoggle_26b2w_1353",Vs="_menumain_26b2w_1469",Zs="_togglemenuexception_26b2w_1489",Ks="_altnav_26b2w_2245",Xs="_smallnav_26b2w_2313",qs="_altexception_26b2w_2347",Gs="_store_26b2w_2867",et="_cart_26b2w_2869",s={"main-header":"_main-header_26b2w_1",transformations:ps,hide:bs,show:ws,toolbar:xs,settings:js,light:vs,"header-inner-wrap":"_header-inner-wrap_26b2w_187","logo-container":"_logo-container_26b2w_223",togglemenu:gs,menupath:$s,search:Ss,"menu-container":"_menu-container_26b2w_373",menualt:Ns,hidden:ks,toolwrap:Es,"toolbar-btn":"_toolbar-btn_26b2w_557",loginregisterwrap:Ls,closed:Ms,fi:Ts,es:ys,Welcome:Os,jenniina:Cs,link:Fs,active:Rs,welcome:Ds,about:Is,portfolio:zs,contact:Ps,language:As,navstyle:Hs,dots:Ws,dashes:Ys,loginregister:Bs,logout:Us,"skip-links":"_skip-links_26b2w_1067","skip-link":"_skip-link_26b2w_1067",keepvisible:Js,menutoggle:Qs,menumain:Vs,togglemenuexception:Zs,"dlt-btn":"_dlt-btn_26b2w_1903","dlt-btn-inner-left":"_dlt-btn-inner-left_26b2w_1973","dlt-btn-inner":"_dlt-btn-inner_26b2w_1973","dlt-inner-wrapper":"_dlt-inner-wrapper_26b2w_2199",altnav:Ks,smallnav:Xs,altexception:qs,store:Gs,cart:et};function st(){const[x,t]=a.useState("up");return a.useEffect(()=>{let _=window.pageYOffset;const k=()=>{const m=window.pageYOffset,E=m>_?"down":"up";E!==x&&(m-_>4||m-_<-4)&&t(E),_=m>0?m:0};return window.addEventListener("scroll",k),()=>{window.removeEventListener("scroll",k)}},[x]),x}const tt="/assets/JLA_Jenniina-light-3-480x198-WevMf7uo.png",nt="/assets/JLA_Jenniina-3-480x198-Bu0NpiM3.png",at=({setStyleMenu:x,language:t,options:_,getKeyByValue:k,setLanguage:m,hasCartItems:E},le)=>{const A=rs(o=>{var r;return(r=o.auth)==null?void 0:r.user}),{windowHeight:p,windowWidth:n}=Pe(),ce=[{label:ee[t],href:"/"},{label:se[t],href:"/about"},{label:te[t],href:"/portfolio"},{label:ne[t],href:"/contact"}],de=[{label:Ae[t],href:"#site-navigation"},{label:He[t],href:"#main-content"},{label:We[t],href:"#main-footer"}],me=o=>{if(o===ee[t])return e.jsx(Re,{className:n<i?s.smallnav:""});if(o===se[t])return e.jsx(De,{className:n<i?s.smallnav:""});if(o===te[t])return e.jsx(Ie,{className:n<i?s.smallnav:""});if(o===ne[t])return e.jsx(ze,{className:n<i?s.smallnav:""})},ue=({links:o})=>e.jsxs("ul",{children:[n<d&&!l?e.jsx("li",{className:`tooltip-wrap ${s.jenniina}`,children:e.jsxs("a",{href:"https://jenniina.fi",children:[e.jsx("img",{src:u?nt:tt,width:"96px",height:"39.6px"}),e.jsxs("span",{className:"tooltip below right narrow",children:["« ",ae[t]]})]})}):"",o.map((r,S)=>e.jsx("li",{className:`${s[r.label]}`,children:e.jsxs(P,{to:r.href,className:({isActive:F})=>F?`active ${s.active} ${s.link} tooltip-wrap pointer`:`${s.link} tooltip-wrap`,children:[me(r.label),e.jsx("span",{children:r.label}),e.jsx("b",{className:`${l&&n<d?`tooltip space narrow2 above ${S<2?"right":"left"}`:"scr"}`,"aria-hidden":!0,children:r.label})]})},`${r.label}${S}`))]}),he=({skipLinks:o})=>e.jsx("ul",{children:o.map(r=>e.jsx("li",{children:e.jsx(P,{to:r.href,className:`${s["skip-link"]}`,children:r.label})},r.href))}),u=Ye(),fe=Be(),H=fs(),W=a.useRef(null);as({ref:W,onOutsideClick:je});const _e=st(),[c,h]=a.useState(!0),[pe,L]=a.useState(!1),[b,w]=a.useState(!1),[be,j]=a.useState(!0),v=()=>{setTimeout(()=>{L(!0)},300)},M=()=>{setTimeout(()=>{j(!0)},300)};function we(){c&&n<i?(h(!1),v()):(h(!0),L(!1)),b&&(w(!1),M())}function xe(){b?(w(!1),M()):(w(!0),j(!1)),c&&n<i&&(h(!1),v())}function je(){c?L(!1):v(),c&&n<i&&(h(!1),v()),b?j(!1):M(),b&&(w(!1),M())}const[l,R]=a.useState(!0),[ve,T]=a.useState(!0);function ge(){l&&c&&n<i?(h(!1),v(),setTimeout(()=>{R(!1)},300)):!c&&n<i?(h(!0),L(!1),R(!0)):(R(o=>!o),T(!1),setTimeout(()=>{T(!0)},200))}a.useEffect(()=>{T(!1),setTimeout(()=>{T(!0)},200)},[u]),a.useEffect(()=>{(n>i||l&&p>n&&n<i)&&h(!0)},[n,p]),a.useImperativeHandle(le,()=>({getStyle:()=>l}),[l]),a.useEffect(()=>{x(l)},[l]);const[$e,Y]=a.useState(!1);a.useEffect(()=>(window.addEventListener("scroll",B),()=>{window.removeEventListener("scroll",B)}));const B=()=>{window.scrollY>100?Y(!0):Y(!1)},f=Ue(),Se=()=>{f(os())},[y,g]=a.useState(!1),[O,$]=a.useState(!1),[D,I]=a.useState(!1);a.useEffect(()=>{D&&(g(!1),$(!1))},[D]),a.useEffect(()=>{y&&($(!1),I(!1))},[y]),a.useEffect(()=>{O&&(g(!1),I(!1))},[O]);const Ne=_s();a.useEffect(()=>{const o=new URLSearchParams(window.location.search);o.get("login")&&(w(!0),j(!1),g(!0),$(!1)),o.get("register")&&(w(!0),j(!1),$(!0),g(!1))},[Ne]);const[U,J]=a.useState(""),[z,Q]=a.useState(""),[V,Z]=a.useState(""),[K,X]=a.useState(""),[ke,C]=a.useState(!1),Ee=o=>{if(o.preventDefault(),C(!0),z.trim()!==V.trim()){f(N(`${ss}`,!0,8)),C(!1);return}f(is({name:K,username:U,password:z,language:t,verified:!1})).then(async()=>{f(N(`${ts[t]} - ${ns[t]} `,!1,8)),J(""),Q(""),Z(""),X(""),C(!1)}).catch(r=>{var S,F,q,G;if(console.error(r),(F=(S=r.response)==null?void 0:S.data)!=null&&F.message)f(N(r.response.data.message,!0,8));else if(r.code==="ERR_BAD_REQUEST"){f(N(`Error: ${(G=(q=r.response)==null?void 0:q.data)==null?void 0:G.message}`,!0,8));return}f(N(`Error: ${r.message}`,!0,8)),C(!1)})};return e.jsx(e.Fragment,{children:e.jsxs("header",{ref:W,className:`
                ${`main-header ${s["main-header"]}`}
                ${_e==="down"&&$e?s.hide:s.show} 
                ${u?s.light:""} 
                ${l?`${s.menualt} menualt`:`${s.menumain} menumain`} 
                ${ve?`${s.transformations}`:""} 
                ${s[`${t}`]}
                `,children:[e.jsx("nav",{className:s["skip-links"],children:e.jsx(he,{skipLinks:de})}),e.jsxs("div",{className:s["header-inner-wrap"],children:[e.jsx("div",{className:`${u?`${s["logo-container"]} ${s.light}`:s["logo-container"]} 
                        ${n<d?"scr":""}`,children:e.jsx("a",{href:"https://jenniina.fi/",children:e.jsxs("span",{children:["« ",ae[t]]})})}),e.jsxs("button",{"aria-haspopup":"true","aria-expanded":c,onClick:we,className:`${p<n&&n<i?`${s.togglemenuexception} ${s.togglemenu}`:s.togglemenu}`,children:[e.jsx("svg",{stroke:"currentColor",strokeWidth:"12",strokeLinecap:"round",strokeLinejoin:"round",fill:"none",viewBox:"0 0 100 100","aria-hidden":"true",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg",style:{fontSize:"1em"},children:e.jsx("g",{children:e.jsx("path",{className:s.menupath,d:"m 90 90 l -80 -80 l 60 0 a 1 1 0 1 1 0 40 l -40 0 a 1 1 0 0 0 0 40 l 60 0 l 0 -80 l -80 80"})})}),e.jsx("span",{className:n<i?"scr":"",children:Je[t]})]}),e.jsx("nav",{id:"site-navigation",className:`site-navigation 
                        ${s["menu-container"]} 
                            ${c?` ${s.show}`:`${pe&&n<i?s.hidden:""}
                                    `}
                                    ${p<n&&n<i?s.altnav:""}
                                    ${l&&p<n&&n>d&&n<i?s.altexception:""}
                                    ${l&&p>n&&n<i?s.keepvisible:""}
                                    `,"aria-expanded":c,children:e.jsx(ue,{links:ce})}),e.jsxs("button",{className:s.search,role:"search","aria-label":"search",children:[e.jsx(Le,{style:n<d?{fontSize:"1em"}:{fontSize:"1.4em"},"aria-hidden":!0}),e.jsx("span",{className:n<i?"scr":"",children:Qe[t]})]}),E&&window.location.pathname!=="/cart"?e.jsxs("button",{className:`${s.settings} ${s.cart}`,"aria-label":"cart",disabled:window.location.pathname==="/cart",onClick:()=>{H("/cart")},children:[e.jsx(Me,{style:n<d?{fontSize:"1.1em"}:{fontSize:"1.4em"},"aria-hidden":!0}),e.jsx("span",{className:n<i?"scr":"",children:hs[t]})]}):e.jsxs("button",{className:`${s.settings} ${s.store}`,"aria-label":"store",disabled:window.location.pathname==="/store",onClick:()=>{H("/store")},children:[e.jsx(Te,{style:n<d?{fontSize:"1.1em"}:{fontSize:"1.4em"},"aria-hidden":!0}),e.jsx("span",{className:n<i?"scr":"",children:Ve[t]})]}),e.jsxs("button",{className:s.settings,onClick:xe,children:[e.jsx(ye,{style:n<d?{fontSize:"0.9em"}:{fontSize:"1.1em"},"aria-hidden":!0}),e.jsx("span",{id:"settings",className:n<i?"scr":"",children:Ze[t]})]}),e.jsxs("nav",{id:"settings-toolbar",className:`${s.toolbar} 
                           ${b?`${s.show}`:`${be?s.hidden:""}`}
                            `,"aria-labelledby":"settings","aria-expanded":b,children:[e.jsx(ds,{language:t,id:"language-navbar",className:`language ${s.language}`,instructions:Ke[t],hide:!0,options:_(oe),value:t?{value:t,label:k(oe,t)}:void 0,onChange:o=>{m(o==null?void 0:o.value)}}),e.jsxs("div",{className:s.toolwrap,children:[e.jsx("label",{htmlFor:"dlt-btn",children:u?ie[t]:re[t]}),e.jsx("button",{id:"dlt-btn",className:u?`${s["dlt-btn"]}`:`${s.active} ${s["dlt-btn"]} ${s["toolbar-btn"]}`,onClick:fe,children:e.jsx("div",{className:`${s["dlt-inner-wrapper"]}`,children:e.jsx("div",{className:`${s["dlt-btn-inner-left"]}`,children:e.jsx("div",{className:`${s["dlt-innermost"]}`,children:e.jsx("span",{className:"scr",children:u?ie[t]:re[t]})})})})})]}),e.jsxs("div",{className:s.toolwrap,children:[e.jsx("label",{htmlFor:"navbar-style",children:Xe[t]}),e.jsx("button",{id:"navbar-style",onClick:ge,className:`${s.navstyle} ${s["toolbar-btn"]}`,children:n<i?e.jsx(Oe,{"aria-hidden":!0,fontSize:"1.5em"}):e.jsxs(e.Fragment,{children:[e.jsx(Ce,{className:s.dots,"aria-hidden":!0,fontSize:"1.8em"}),e.jsx(Fe,{className:s.dashes,"aria-hidden":!0,fontSize:"1.8em"})]})})]}),e.jsx("div",{className:s.loginregister,children:A?e.jsxs(e.Fragment,{children:[e.jsx(P,{to:"/edit",className:({isActive:o})=>o?`active ${s.active} ${s.link}`:`${s.link}`,children:e.jsx("span",{children:qe[t]})}),e.jsxs("button",{onClick:Se,id:"logoutnav",className:`logout danger ${s.logout}`,children:[Ge[t]," ×"]})]}):e.jsx(e.Fragment,{children:e.jsxs("div",{className:`${s.loginregisterwrap} ${!O&&!y?s.closed:""}`,children:[e.jsx(ls,{setIsFormOpen:g,isOpen:y,language:t,text:"nav"}),e.jsx(cs,{language:t,setIsFormOpen:$,isOpen:O,handleRegister:Ee,username:U,setUsername:J,password:z,setPassword:Q,confirmPassword:V,setConfirmPassword:Z,name:K,setName:X,text:"nav",sending:ke})]})})}),!A&&e.jsx("div",{className:"password-reset-wrap",children:e.jsx(us,{language:t,className:"password-reset",wrapperClass:"password-reset-wrap",text:`${es[t]}`,isOpen:D,setIsFormOpen:I,hideBrackets:!0,children:e.jsx(ms,{language:t,text:"login"})})})]})]})]})})},wt=a.forwardRef(at);export{wt as N};
