import{r,j as s}from"./react-A9DAvxly.js";import{a7 as Bs,a8 as Os,a9 as Ts,aa as Ms,ab as Ps,ac as Is,ad as ks,ae as Rs,af as Us,ag as Vs,ah as _s,ai as Ds,aj as qs,a1 as qe,a0 as ze,ak as zs,al as Hs,am as Ws,an as Ys}from"./react-icons-qZGjoLfu.js";import{L as g,cU as z,K as Xs,dz as oe,bl as Gs,bk as Qs,dw as He,dA as he,dB as We,dC as ge,dD as Ne,dE as Zs,cV as Ye,dF as Ks,cX as et,cY as st,dG as tt,dH as at,dI as it,S as K,dJ as lt,dK as Se,dL as nt,dM as Xe,dN as rt,d0 as Ge,dO as ct,dP as dt,d3 as Qe,am as ot,dQ as ht,dR as pt,dS as xt,dT as ft,dU as ut,dV as vt,dW as mt,dX as yt,dY as jt,d6 as A,dZ as bt,dl as Ct,dj as wt,d_ as Et,dg as gt,dh as Nt,d$ as St,e0 as Lt,e1 as $t,a$ as At,e2 as Jt,e3 as Ze,e4 as Ft,b0 as Bt,b5 as Ot,d7 as Tt,d8 as Mt,dk as Pt,e5 as It,e6 as kt,e7 as Rt,e8 as Ut,e9 as Vt,d1 as _t,dn as Dt,dp as ee,ea as qt,eb as zt,W as H,ec as Ht,ed as Wt,ee as Yt,dx as Xt,ef as Gt,eg as Qt,eh as Zt,ei as Kt,ej as ea,P as sa,R as ta,ek as aa,el as ia}from"./index-DSShcy7i.js";import{a as Ke}from"./react-redux-CHm9GgGE.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";var la=(d=>(d.newest="newest",d.oldest="oldest",d))(la||{});const ga=({user:d,handleDelete:Le,handleUpdate:es,language:t,isCheckedSafemode:se,setIsCheckedSafemode:ss,handleToggleChangeSafemode:ts,translateWordLanguage:as,optionsSortBy:is,getKeyofEnum:W,options:ls,norrisCategories:ns,getCategoryInLanguage:te,setIsEditOpen:rs,editId:cs,setEditId:ds,handleRemoveJokeFromBlacklisted:os,handleBlacklistUpdate:hs,sending:pe})=>{var Re;const ae=Ke(e=>e.users),x=d==null?void 0:d._id,v=Ke(e=>{var a;return(a=e.jokes)==null?void 0:a.jokes}),[J,ps]=r.useState([]),[xe,xs]=r.useState({}),[m,Y]=r.useState(!1),[X,fe]=r.useState(J),[y,F]=r.useState(!1),[ue,fs]=r.useState([]),[G,ie]=r.useState(!1),[us,$e]=r.useState(0),[B,ve]=r.useState("popularity"),[f,Ae]=r.useState(""),[O,le]=r.useState(""),[U,Je]=r.useState(""),[Fe,vs]=r.useState(!1),[N,me]=r.useState(ns[0]),[ms,b]=r.useState(void 0),[ye,Be]=r.useState(g.English),[Oe,Te]=r.useState(z.Misc),[je,Me]=r.useState("newest"),[ne,ys]=r.useState(!0),[E,js]=r.useState(3),[re,be]=r.useState(!1),C=Xs();r.useEffect(()=>{if(Array.isArray(v)&&v.length>0&&Array.isArray(ae)&&(ae==null?void 0:ae.length)>0){let e=v==null?void 0:v.map(a=>{const i=d==null?void 0:d.name,l=oe[t][W(g,a.language)];return{...a,visible:!1,translatedLanguage:l??"",name:a.anonymous?"ÖÖÖ_Anonymous":i??""}});e=se?se?e.filter(a=>a.safe).sort((a,i)=>{var l,o;return((l=i.user)==null?void 0:l.length)-((o=a.user)==null?void 0:o.length)}):[]:e.filter(a=>a.safe===!1).sort((a,i)=>{var l,o;return((l=i.user)==null?void 0:l.length)-((o=a.user)==null?void 0:o.length)}),ps(e)}},[v,ae,t,se,B,je,ne]),r.useEffect(()=>{Me(ne?"newest":"oldest")},[ne]);const bs=()=>{ys(e=>!e)};r.useEffect(()=>{C(Gs()),C(Qs()),C(He())},[]),r.useEffect(()=>{const e=O===z.ChuckNorris;vs(e)},[O]);const Pe=e=>{_(1),Ae(e.target.value)},Cs=()=>{le(""),Je(""),me(V[0]),Ae(""),ie(!1),$e(e=>e+1),ve("popularity"),_(1),ss(!0)},ws=e=>{le(e.value)};r.useEffect(()=>{setTimeout(()=>{const e=document.querySelectorAll(".select-container"),a=(e==null?void 0:e.length)+2;e==null||e.forEach((i,l)=>{const o=a-l;i.style.zIndex=`${o}`})},500)},[y]),r.useEffect(()=>{Y(!x)},[x]);const Es=e=>{xs(a=>({...a,[e]:!a[e]}))};r.useEffect(()=>{_(1);let e=[...J];B==="age"&&(e=[...J].sort((i,l)=>{const o=i.createdAt?new Date(i.createdAt).getTime():0,p=l.createdAt?new Date(l.createdAt).getTime():0;return je==="newest"?p-o:o-p})),e=e==null?void 0:e.filter(i=>{var l,o,p,j,S,L,T,M,P;if(i){const I=("joke"in i?(l=i.joke)==null?void 0:l.toLowerCase().includes(f.toLowerCase()):!1)||("setup"in i?(o=i.setup)==null?void 0:o.toLowerCase().includes(f.toLowerCase()):!1)||("delivery"in i?(p=i.delivery)==null?void 0:p.toLowerCase().includes(f.toLowerCase()):!1)||((j=i.name)==null?void 0:j.toLowerCase().includes(f.toLowerCase()))||((S=i.category)==null?void 0:S.toLowerCase().includes(f.toLowerCase()))||((L=i.subCategories)==null?void 0:L.includes(f==null?void 0:f.toLowerCase()))||((T=i.translatedLanguage)==null?void 0:T.toLowerCase().includes(f.toLowerCase())),k=O?i.category===O:!0,R=U!==""?i.language===U:!0,c=(N==null?void 0:N.value)!==""&&(N==null?void 0:N.value)!=="any"?(M=i.subCategories)==null?void 0:M.includes(N==null?void 0:N.value):!0;return m&&i.private===!1&&i.verified===!0||m&&i.private===void 0||!m&&((P=i.user)!=null&&P.includes(x))?R&&k&&c&&I:!1}}),e=e==null?void 0:e.filter(i=>{var o;return!((o=d==null?void 0:d.blacklistedJokes)==null?void 0:o.some(p=>p.jokeId===i.jokeId&&p.language===i.language))}),B==="popularity"&&(e=e==null?void 0:e.sort((i,l)=>{var o,p;return((o=l.user)==null?void 0:o.length)-((p=i.user)==null?void 0:p.length)})),B==="category"&&(e=e==null?void 0:e.sort((i,l)=>i.category>l.category?1:-1)),B==="language"&&(e=e==null?void 0:e.sort((i,l)=>i.translatedLanguage>l.translatedLanguage?1:-1)),B==="name"&&(e=e==null?void 0:e.sort((i,l)=>i.name>l.name?1:-1));const a=e.slice(0,E);if(G&&e.length>0){const i=e[Math.floor(Math.random()*e.length)];fe([i])}else fe(re?a:e)},[m,J,O,U,N,f,G,us,je,B,re,E]);const gs=e=>{let a=e;e==="Chuck Norris"?a="ChuckNorris":e==="Dad Joke"&&(a="DadJoke"),le(a)},Ns=e=>{var i;const a=v==null?void 0:v.find(l=>l._id===e);if(!a){C(H(`${Ht[t]}`,!0,8));return}if(a){if((i=a.user)!=null&&i.includes(x==null?void 0:x.toString())){C(H(`${Wt[t]}`,!1,8));return}C(Yt({...a,user:[...a.user,x]})).then(()=>{C(He()),C(H(`${Xt[t]}`,!1,8))})}};let V=Array.from(new Set((Re=J==null?void 0:J.filter(e=>e.private===!1&&e.verified===!0||e.private===void 0))==null?void 0:Re.flatMap(e=>e.subCategories))).map(e=>{const a=e?he[e][t]||e:"",i=(a==null?void 0:a.charAt(0).toUpperCase())??e??"",l=(a==null?void 0:a.slice(1))??e??"";return{label:i+l,value:e}});V=V.filter(e=>e.value!=="any"),V.unshift({label:he.any[t].charAt(0).toUpperCase()+he.any[t].slice(1),value:"any"}),r.useEffect(()=>{me(V[0])},[t]),r.useEffect(()=>{(async()=>{var a;if(Array.isArray(v)&&v.length>0&&d&&(d!=null&&d.blacklistedJokes)){const i=await Promise.all(((a=d==null?void 0:d.blacklistedJokes)==null?void 0:a.map(async l=>{let o=l.value;return(v==null?void 0:v.find(j=>{var S,L;return((S=j.jokeId)==null?void 0:S.toString())===((L=l.jokeId)==null?void 0:L.toString())&&j.language===l.language}))??await Ss(l.jokeId,l.language,o??void 0)}))||[]);fs(i)}})()},[d==null?void 0:d.blacklistedJokes,v]);const Q=ue==null?void 0:ue.filter(e=>{var a,i,l,o,p;if(e)return("joke"in e?(a=e.joke)==null?void 0:a.toLowerCase().includes(f.toLowerCase()):!1)||("setup"in e?(i=e.setup)==null?void 0:i.toLowerCase().includes(f.toLowerCase()):!1)||("delivery"in e?(l=e.delivery)==null?void 0:l.toLowerCase().includes(f.toLowerCase()):!1)||((o=e.category)==null?void 0:o.toLowerCase().includes(f.toLowerCase()))||((p=e.subCategories)==null?void 0:p.includes(f==null?void 0:f.toLowerCase()))}),Ss=async(e,a,i)=>{var l,o,p,j,S,L,T,M,P,I,k,R,c,w,q,de,Ue,Ve,_e;try{if(i){let $;try{$=await Gt.searchNorrisJoke(i)}catch(h){return(o=(l=h.response)==null?void 0:l.data)!=null&&o.message&&C(H(h.response.data.message,!0,8)),console.error(h),null}finally{return{jokeId:$.id,joke:$.value,category:z.ChuckNorris,language:g.English,type:A.single,safe:!((p=$.categories)!=null&&p.includes("explicit")||(j=$.categories)!=null&&j.includes("political")||(S=$.categories)!=null&&S.includes("religion"))}}}else{const h=await(await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${e}&lang=${a}&format=json`)).json();if(h.error){const De=await Qt.getDadJokeById(e);return{jokeId:De.id,joke:De.joke,category:z.DadJoke,language:g.English,type:A.single,safe:!0}}else return h.type==="twopart"?{jokeId:h.id,setup:h.setup,delivery:h.delivery,category:h.category,language:h.lang,type:A.twopart,safe:!((L=h.flags)!=null&&L.nsfw||(T=h.flags)!=null&&T.religious||(M=h.flags)!=null&&M.political||(P=h.flags)!=null&&P.racist||(I=h.flags)!=null&&I.sexist||(k=h.flags)!=null&&k.explicit||!h.safe)}:{jokeId:h.id,joke:h.joke,category:h.category,language:h.lang,type:A.single,safe:!((R=h.flags)!=null&&R.nsfw||(c=h.flags)!=null&&c.religious||(w=h.flags)!=null&&w.political||(q=h.flags)!=null&&q.racist||(de=h.flags)!=null&&de.sexist||(Ue=h.flags)!=null&&Ue.explicit||!h.safe)}}}catch($){return(_e=(Ve=$.response)==null?void 0:Ve.data)!=null&&_e.message&&C(H($.response.data.message,!0,8)),console.error($),null}};r.useEffect(()=>{x||F(!1)},[x]);const[u,_]=r.useState(1),[ce,Ls]=r.useState(10),[$s,Ce]=r.useState(1),[As,we]=r.useState(3),Z=e=>{_(e),e<=2?(Ce(1),we(3)):e>=n.length-1?(Ce(n.length-2),we(n.length)):(Ce(e-1),we(e+1))};r.useEffect(()=>{u||_(1)},[u]),r.useEffect(()=>{Z(1),F(!1)},[m]);const Ie=u*ce,Js=Ie-ce,D=X==null?void 0:X.slice(Js,Ie),n=[];for(let e=1;e<=Math.ceil((X==null?void 0:X.length)/ce);e++)n==null||n.push(e);const Ee=n==null?void 0:n.slice($s-1,As);r.useEffect(()=>{u>n.length&&_(1)},[n]);const Fs=e=>{navigator.clipboard.writeText(e).then(function(){C(H(`${Zt[t]}`,!1,3))},function(){C(H(`${Kt[t]}`,!0,3))})},ke=e=>s.jsxs("div",{className:"pagination",children:[(n==null?void 0:n.length)>1&&s.jsx("div",{children:s.jsxs("span",{children:[u," / ",n==null?void 0:n.length]})}),s.jsxs("div",{children:[s.jsxs("div",{className:"chevrons-wrap back",children:[s.jsxs("button",{className:`inner-nav-btn first tooltip-wrap ${u===1?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===1,onClick:()=>Z(1),children:[s.jsx(ze,{})," ",s.jsx("span",{className:"tooltip narrow2 below right",children:ea[t]})]}),s.jsxs("button",{className:`inner-nav-btn back tooltip-wrap ${u===1?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===1,onClick:()=>Z(u-1),children:[s.jsx(Ws,{})," ",s.jsx("span",{className:"tooltip narrow2 below right",children:sa[t]})]})]}),s.jsx("div",{className:`numbers${(n==null?void 0:n.length)===1?" hidden":""}`,children:Ee==null?void 0:Ee.map(a=>s.jsx("button",{className:`${a>9?"over9":a>99?"over99":a>999?"over999":""} ${a===u?"active":""}`,onClick:()=>Z(a),children:a},a))}),s.jsxs("div",{className:"chevrons-wrap forward",children:[s.jsxs("button",{className:`inner-nav-btn forward tooltip-wrap ${u===(n==null?void 0:n.length)?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===(n==null?void 0:n.length),onClick:()=>Z(u+1),children:[s.jsx(Ys,{})," ",s.jsx("span",{className:"tooltip narrow2 below left",children:ta[t]})]}),s.jsxs("button",{className:`inner-nav-btn last tooltip-wrap ${u===(n==null?void 0:n.length)?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===(n==null?void 0:n.length),onClick:()=>Z(n==null?void 0:n.length),children:[s.jsx(qe,{}),s.jsxs("span",{className:"tooltip narrow2 left below",children:[aa[t],": ",n==null?void 0:n.length]})]})]})]}),s.jsxs("div",{children:[s.jsx("input",{"aria-labelledby":"items-per-page",className:"items-per-page narrow",name:"items-per-page",id:`items-per-page-input-${e}`,type:"number",min:"1",max:"100",defaultValue:ce,onChange:a=>Ls(a.target.valueAsNumber>0?a.target.valueAsNumber:1)})," ",s.jsx("span",{id:"items-per-page",children:ia[t]})," "]})]});return s.jsxs("div",{className:"saved",id:"saved",children:[x&&s.jsxs("div",{className:"local-saved-wrap",children:[s.jsx("button",{className:`btn${m&&!y?" active":""}`,onClick:()=>{Y(!0),F(!1)},children:m?ge[t]:We[t]}),s.jsx("button",{className:`btn${!m&&!y?" active":""}`,onClick:()=>{Y(!1),F(!1)},children:Ne[t]})]}),s.jsxs("div",{className:"saved-inner",children:[s.jsx("div",{className:"filler"}),s.jsxs("div",{children:[!y&&s.jsxs(s.Fragment,{children:[s.jsx("h3",{children:m?ge[t]:Ne[t]}),m&&s.jsxs("p",{className:"mb3 flex center textcenter",children:[" ",Zs[t]]}),s.jsxs("div",{className:"toggle-wrap",children:[s.jsxs("div",{className:"toggle-inner-wrap",children:[s.jsxs("div",{className:"safemode-wrap",children:[s.jsx(Ye,{isChecked:se,name:"safemode",id:"safemode2",className:`${t} ${se?"":"unsafe"} userjokes safemode`,label:`${Ks[t]}: `,hideLabel:!1,on:et[t],off:st[t],handleToggleChange:ts}),B==="age"&&s.jsx(Ye,{isChecked:ne,name:"age",id:"age",className:`${t} age`,label:`${tt[t]}: `,hideLabel:!1,on:at[t],off:it[t],handleToggleChange:()=>{bs()},equal:!0})]}),s.jsx("div",{className:"sortby-wrap",children:s.jsx(K,{language:t,id:"sortby",className:"sortby",instructions:`${lt[t]}:`,options:is(Se),value:{label:Se[B][g[W(g,t)]],value:Se[B][g[W(g,t)]]},onChange:e=>{ve(e==null?void 0:e.value)}})})]}),s.jsxs("div",{className:"toggle-inner-wrap",children:[s.jsx("div",{children:s.jsx(K,{language:t,id:"joke-languages",className:"language-filter",instructions:`${nt[t]}:`,options:[{label:Xe[t],value:""},...Array.from(new Set(J==null?void 0:J.map(e=>e.language))).map(e=>({label:oe[e][W(g,e)],value:e}))],value:U?{label:oe[U][W(g,U)],value:U}:{label:Xe[t],value:""},onChange:e=>{Je(e==null?void 0:e.value)}})}),s.jsx("div",{children:s.jsx(K,{language:t,id:"single-category-select",className:"single-category-select",instructions:`${rt[t]}:`,options:[{label:Ge[t],value:""},...Object.values(z).map(e=>({label:te(e,t),value:e}))],value:O?{label:te(O,t),value:O}:{label:Ge[t],value:""},onChange:e=>{le(e==null?void 0:e.value),ws(e),gs(e==null?void 0:e.value)}})})]}),s.jsxs("div",{className:"toggle-inner-wrap",children:[s.jsx("div",{children:s.jsx(K,{language:t,id:"userNorrisCategories",className:`category extras ${Fe?"":"hidden"}`,instructions:`${ct[t]}:`,selectAnOption:V[0].label,value:N,options:V,onChange:e=>{me(e)}})}),s.jsx("div",{className:Fe?"search-jokes-wrap":"full search-jokes-wrap",children:s.jsx("div",{className:"search-jokes input-wrap",children:s.jsxs("label",{htmlFor:"search-jokes",children:[s.jsx("input",{type:"text",id:"search-jokes",value:f,onChange:Pe,placeholder:dt[t]}),s.jsx("span",{children:Qe[t]})]})})})]})]}),s.jsx("div",{className:"reset-btn-wrap mb3",children:s.jsxs("button",{className:"reset-btn delete danger",onClick:()=>Cs(),children:[s.jsx(Bs,{})," ",s.jsx("span",{children:ot[t]})]})})]}),s.jsxs("div",{className:"button-wrap",children:[!y&&s.jsxs(s.Fragment,{children:[s.jsxs("button",{className:`icontext random-btn ${G?"active":""}`,onClick:()=>{_(1),F(!1),ie(!0),$e(e=>e+1),be(!1)},children:[ht[t]," ",s.jsx(Os,{})]})," ",s.jsxs("button",{className:`icontext all-or-latest-btn ${!G&&!re?"active":""}`,onClick:()=>{ie(!1),F(!1),be(!1)},children:[pt[t]," ",s.jsx(Ts,{})]}),s.jsxs("div",{className:"flex center",children:[s.jsxs("button",{className:`icontext all-or-latest-btn ${re?"active":""}`,onClick:()=>{ie(!1),F(!1),Me("newest"),ve("age"),be(!0)},children:[xt[t],s.jsx("span",{className:"scr",children:E})," ",E===3&&s.jsx(Ms,{}),E===4&&s.jsx(Ps,{}),E===5&&s.jsx(Is,{}),E===6&&s.jsx(ks,{}),E===7&&s.jsx(Rs,{}),E===8&&s.jsx(Us,{}),E===9&&s.jsx(Vs,{}),E>9&&s.jsx(_s,{})]}),s.jsxs("div",{children:[s.jsx("input",{type:"number",min:3,max:100,id:"number-of-latest",defaultValue:E,className:"narrow",onChange:e=>{js(e.target.valueAsNumber)}}),s.jsx("label",{htmlFor:"number-of-latest",className:"scr",children:s.jsx("span",{children:ft[t]})})]})]})]}),d&&s.jsx("button",{className:`blocked-btn danger ${y?"active":""}`,onClick:()=>F(e=>!e),children:y?s.jsxs(s.Fragment,{children:[ut[t]," ",s.jsx(Ds,{})]}):s.jsxs(s.Fragment,{children:[vt[t]," ",s.jsx(qs,{})]})})]}),!G&&!y&&ke(1),d&&y&&(Q==null?void 0:Q.length)>0?s.jsx("div",{className:"blocked-controls-wrap",children:s.jsx("div",{className:"input-wrap search-blacklist",children:s.jsxs("label",{htmlFor:"searchBlacklistedJokes",children:[s.jsx("input",{id:"searchBlacklistedJokes",type:"text",onChange:Pe}),s.jsx("span",{children:Qe[t]})]})})}):y?s.jsx("p",{className:"textcenter",children:mt[t]}):"",s.jsx("ul",{className:`userjokeslist ${y?"blockedJokes":""}`,children:d&&y?Q==null?void 0:Q.map((e,a)=>{var i,l;return s.jsxs("li",{children:[s.jsx("form",{onSubmit:o=>{var p,j;C(yt(e)),os(o,e,(j=(p=d==null?void 0:d.blacklistedJokes)==null?void 0:p[a])==null?void 0:j._id)},children:s.jsx("button",{className:"",type:"submit",disabled:pe,children:jt[t]})}),e?e.type===A.single?s.jsx("p",{children:e.joke}):s.jsxs("div",{children:[s.jsx("p",{children:e.setup}),s.jsx("p",{children:e.delivery})]}):""]},((l=(i=d==null?void 0:d.blacklistedJokes)==null?void 0:i[a])==null?void 0:l.jokeId)??a)}):D&&(D==null?void 0:D.length)>0?D==null?void 0:D.map(e=>{var o,p,j,S,L,T,M,P,I,k,R;const{visible:a,translatedLanguage:i,...l}=e;return s.jsxs("li",{children:[s.jsx("div",{className:"primary-wrap",children:e.type===A.single?s.jsx("p",{className:"",children:e.joke}):s.jsxs("div",{children:[s.jsx("p",{className:"",children:e.setup}),s.jsx("p",{children:e.delivery?s.jsxs("button",{type:"button",onClick:()=>Es(e.jokeId),className:`${xe[e.jokeId]?"reveal":""} delivery`,children:[s.jsxs("span",{...xe[e.jokeId]?{"aria-hidden":!0}:{"aria-hidden":!1},children:[s.jsx(qe,{})," ",bt[t]," ",s.jsx(ze,{})]}),s.jsx("p",{"aria-live":"assertive",children:xe[e.jokeId]?e.delivery:""})]}):""})]})}),s.jsxs("div",{className:"secondary-wrap",children:[s.jsxs("div",{children:[s.jsxs("span",{children:[Ct[t],":"," ",te(e.category,t)," ",e.subCategories&&((o=e.subCategories)==null?void 0:o.length)>0&&((p=e.subCategories)!=null&&p.find(c=>c!=="any"))?s.jsxs(s.Fragment,{children:["(",(S=(j=e.subCategories)==null?void 0:j.filter(c=>c!=="any"))==null?void 0:S.map(c=>he[c][t].toLowerCase()??c).join(", "),")"]}):""]}),s.jsxs("span",{children:[as,": ",e.translatedLanguage]}),e.anonymous?s.jsxs("span",{children:[wt[t]," "]}):e.anonymous===!1?s.jsxs("span",{children:[Et[t],": ",e.name??""]}):"",!m&&x&&e.private?s.jsx("span",{children:gt[t]}):!m&&x&&e.private===!1?s.jsx("span",{children:Nt[t]}):"",e.private===!1&&e.verified===!1&&s.jsx("span",{children:St[t]}),((L=e.user)==null?void 0:L.length)>1&&s.jsxs("span",{children:[Lt[t]," ",(T=e.user)==null?void 0:T.length]})]}),s.jsxs("div",{children:[x&&((M=e.user)==null?void 0:M.includes(x))&&s.jsx("form",{onSubmit:e.type===A.single?Le(e==null?void 0:e._id,e==null?void 0:e.joke):Le(e==null?void 0:e._id,e==null?void 0:e.setup),className:"button-wrap",children:s.jsx("button",{type:"submit",disabled:pe,className:"delete danger",children:((P=e.user)==null?void 0:P.length)>1?$t[t]:At[t]})}),e.author!==x&&!((I=e.user)!=null&&I.includes(x))&&s.jsx("button",{onClick:()=>hs(e.jokeId,e.language,e.category===z.ChuckNorris&&e.type===A.single?e.joke:void 0),className:"delete danger",children:Jt[t]}),!((k=e.user)!=null&&k.includes(x))&&s.jsxs("button",{onClick:()=>Ns(e._id),className:"save",children:[Ze[t]," ",s.jsx(zs,{})]}),s.jsxs("button",{onClick:()=>Fs(e.type===A.single?e.joke:e.setup+` 
`+e.delivery),children:[Ft[t]," ",s.jsx(Hs,{})]}),x&&((R=e.user)==null?void 0:R.includes(x))&&e.author===x&&s.jsx(Bt,{language:t,id:`joke-edit-${e.jokeId}`,className:"joke-edit",wrapperClass:"joke-edit-wrap",text:Ot[t],onClick:()=>{Be(e.language),Te(e.category),b(l),ds(e.jokeId)},isOpen:cs===e.jokeId,setIsFormOpen:rs,children:s.jsxs("form",{onSubmit:es(e==null?void 0:e._id,ms??e),className:"joke-edit",children:[s.jsx("div",{className:"edit-wrap",children:e.private===!0&&e.type===A.twopart?s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"edit-setup",children:[s.jsx("input",{required:!0,type:"text",name:"edit-setup",id:"setup",defaultValue:e.setup,onChange:c=>{b(w=>({...w,setup:c.target.value}))}}),s.jsx("span",{children:Tt[t]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"edit-delivery",children:[s.jsx("input",{required:!0,type:"text",name:"delivery",id:"edit-delivery",defaultValue:e.delivery,onChange:c=>{b(w=>({...w,delivery:c.target.value}))}}),s.jsx("span",{children:Mt[t]})," "]})})]}):e.private===!0&&e.type===A.single?s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"edit-joke",children:[s.jsx("input",{required:!0,type:"text",name:"joke",id:"edit-joke",defaultValue:e.joke,onChange:c=>{b(w=>({...w,joke:c.target.value}))}}),s.jsx("span",{children:Pt[t]})]})}):s.jsxs("div",{children:[It[t],"."," ",kt[t]," ",Rt[t]]})}),e.private===!0&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"flex column center gap",children:[s.jsx(K,{language:t,id:"edit-language",className:"edit-language",instructions:`${Ut[t]}:`,hide:!0,options:ls(g),value:{label:oe[ye][W(g,ye)],value:ye},onChange:c=>{Be(c==null?void 0:c.value),b(w=>({...w,language:c==null?void 0:c.value}))}}),s.jsx(K,{language:t,id:"edit-category",className:"edit-category",instructions:`${Vt[t]}:`,hide:!0,options:[{label:_t[t],value:""},...Object.values(z).map(c=>({label:te(c,t),value:c}))],value:{label:te(Oe,t),value:Oe},onChange:c=>{const{visible:w,translatedLanguage:q,...de}=e;Te(c==null?void 0:c.value),b(()=>({...de,category:c==null?void 0:c.value}))}})]}),s.jsxs("fieldset",{children:[s.jsx("legend",{children:Dt[t]}),s.jsxs("div",{className:"checkbox-wrap",children:[s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-nsfw",name:"nsfw",value:"nsfw",onChange:()=>{b(()=>({...l,nsfw:!e.flags.nsfw}))}}),s.jsx("label",{htmlFor:"flag-nsfw",children:ee[t].nsfw})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-religious",name:"religious",value:"religious",onChange:()=>{b(()=>({...l,religious:!e.flags.religious}))}}),s.jsx("label",{htmlFor:"flag-religious",children:ee[t].religious})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-political",name:"political",value:"political",onChange:()=>{b(()=>({...l,political:!e.flags.political}))}}),s.jsx("label",{htmlFor:"flag-political",children:ee[t].political})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-racist",name:"racist",value:"racist",onChange:()=>{b(()=>({...l,racist:!e.flags.racist}))}}),s.jsx("label",{htmlFor:"flag-racist",children:ee[t].racist})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-sexist",name:"sexist",value:"sexist",onChange:()=>{b(()=>({...l,sexist:!e.flags.sexist}))}}),s.jsx("label",{htmlFor:"flag-sexist",children:ee[t].sexist})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-explicit",name:"explicit",value:"explicit",onChange:()=>{b(()=>({...l,explicit:!e.flags.explicit}))}}),s.jsx("label",{htmlFor:"flag-explicit",children:ee[t].explicit})]})]})]})]}),s.jsxs("fieldset",{className:"flex center gap margin0auto",children:[s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",name:"anonymous",id:"edit-anonymous",defaultChecked:e.anonymous,onChange:()=>{const{visible:c,translatedLanguage:w,...q}=e;b(()=>({...q,anonymous:!e.anonymous}))}}),s.jsx("label",{htmlFor:"edit-anonymous",children:"Anonymous:"})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",name:"private",id:"edit-private",defaultChecked:e.private,onChange:()=>{const{visible:c,translatedLanguage:w,...q}=e;b(()=>({...q,private:!e.private}))}}),s.jsx("label",{htmlFor:"edit-private",children:"Private:"})]})]}),s.jsx("button",{type:"submit",disabled:pe,className:"save",children:Ze[t]})]})})]})]})]},e._id)}):s.jsxs("li",{className:"margin0auto max-content",children:[qt[t],s.jsx("br",{}),s.jsx("br",{}),"(",zt[t],")"]})}),!G&&!y&&ke(2)]}),s.jsx("div",{className:"filler below"})]}),x&&s.jsxs("div",{className:"local-saved-wrap below",children:[s.jsx("button",{className:`btn${m&&!y?" active":""}`,onClick:()=>{Y(!0),F(!1)},children:m?ge[t]:We[t]}),s.jsx("button",{className:`btn${!m&&!y?" active":""}`,onClick:()=>{Y(!1),F(!1)},children:Ne[t]})]})]})};export{la as EOrderByAge,ga as default};