import{r,j as s}from"./react-kX_YxI4E.js";import{a$ as Bs,b0 as Ts,b1 as Ms,b2 as Os,b3 as Is,b4 as Ps,b5 as ks,b6 as Rs,b7 as _s,b8 as Ds,b9 as Us,ba as Vs,bb as qs,aN as qe,aK as ze,bc as zs,bd as Hs,aL as Qs,aM as Ws}from"./react-icons-ayiissuD.js";import{bc as g,ch as z,u as Ys,co as oe,i as Xs,cl as Gs,cm as He,cR as he,b7 as Qe,jy as ge,jz as Ne,jA as Zs,jB as Ks,j6 as et,j7 as st,jC as tt,jD as at,jE as it,bz as K,gQ as lt,jF as Se,jG as nt,jH as We,bC as rt,jb as Ye,jI as ct,jJ as dt,gL as Xe,ar as ot,jK as ht,jL as pt,jM as xt,jN as ft,jO as ut,jP as vt,jQ as mt,cQ as jt,jR as bt,ci as A,jS as yt,T as Ct,cp as wt,jT as Et,jm as gt,jn as Nt,jU as St,jV as Lt,jW as $t,cD as At,jX as Jt,jY as Ge,jZ as Ft,ay as Bt,bX as Tt,jf as Mt,jg as Ot,cE as It,j_ as Pt,ep as kt,j$ as Rt,cg as _t,bA as Dt,cS as Ut,jq as Vt,jr as ee,k0 as qt,k1 as zt,o as H,k2 as Ht,cK as Qt,cL as Wt,cN as Yt,k3 as Xt,k4 as Gt,g_ as Zt,bg as Kt,f as ea,g$ as sa,k5 as ta}from"./index-pLSDius4.js";import{B as Ze}from"./ButtonToggle-C9_EYPya.js";import{a as Ke}from"./react-redux-BEmJlIGA.js";import{n as aa,d as ia}from"./Jokes-9l5hwfTx.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-dom-ZPAD5XPx.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";var la=(d=>(d.newest="newest",d.oldest="oldest",d))(la||{});const La=({user:d,handleDelete:Le,handleUpdate:es,language:t,isCheckedSafemode:se,setIsCheckedSafemode:ss,handleToggleChangeSafemode:ts,translateWordLanguage:as,optionsSortBy:is,getKeyofEnum:Q,options:ls,norrisCategories:ns,getCategoryInLanguage:te,setIsEditOpen:rs,editId:cs,setEditId:ds,handleRemoveJokeFromBlacklisted:os,handleBlacklistUpdate:hs,sending:pe})=>{var Re;const ae=Ke(e=>e.users),x=d==null?void 0:d._id,v=Ke(e=>{var a;return(a=e.jokes)==null?void 0:a.jokes}),[J,ps]=r.useState([]),[xe,xs]=r.useState({}),[m,W]=r.useState(!1),[Y,fe]=r.useState(J),[j,F]=r.useState(!1),[ue,fs]=r.useState([]),[X,ie]=r.useState(!1),[us,$e]=r.useState(0),[B,ve]=r.useState("popularity"),[f,Ae]=r.useState(""),[T,le]=r.useState(""),[_,Je]=r.useState(""),[Fe,vs]=r.useState(!1),[N,me]=r.useState(ns[0]),[ms,y]=r.useState(void 0),[je,Be]=r.useState(g.English),[Te,Me]=r.useState(z.Misc),[be,Oe]=r.useState("newest"),[ne,js]=r.useState(!0),[E,bs]=r.useState(3),[re,ye]=r.useState(!1),C=Ys();r.useEffect(()=>{if(Array.isArray(v)&&v.length>0&&Array.isArray(ae)&&(ae==null?void 0:ae.length)>0){let e=v==null?void 0:v.map(a=>{const i=d==null?void 0:d.name,l=oe[t][Q(g,a.language)];return{...a,visible:!1,translatedLanguage:l??"",name:a.anonymous?"ÖÖÖ_Anonymous":i??""}});e=se?se?e.filter(a=>a.safe).sort((a,i)=>{var l,o;return((l=i.user)==null?void 0:l.length)-((o=a.user)==null?void 0:o.length)}):[]:e.filter(a=>a.safe===!1).sort((a,i)=>{var l,o;return((l=i.user)==null?void 0:l.length)-((o=a.user)==null?void 0:o.length)}),ps(e)}},[v,ae,t,se,B,be,ne]),r.useEffect(()=>{Oe(ne?"newest":"oldest")},[ne]);const ys=()=>{js(e=>!e)};r.useEffect(()=>{C(Xs()),C(Gs()),C(He())},[]),r.useEffect(()=>{const e=T===z.ChuckNorris;vs(e)},[T]);const Ie=e=>{U(1),Ae(e.target.value)},Cs=()=>{le(""),Je(""),me(D[0]),Ae(""),ie(!1),$e(e=>e+1),ve("popularity"),U(1),ss(!0)},ws=e=>{le(e.value)};r.useEffect(()=>{setTimeout(()=>{const e=document.querySelectorAll(".select-container"),a=(e==null?void 0:e.length)+2;e==null||e.forEach((i,l)=>{const o=a-l;i.style.zIndex=`${o}`})},500)},[j]),r.useEffect(()=>{W(!x)},[x]);const Es=e=>{xs(a=>({...a,[e]:!a[e]}))};r.useEffect(()=>{U(1);let e=[...J];B==="age"&&(e=[...J].sort((i,l)=>{const o=i.createdAt?new Date(i.createdAt).getTime():0,p=l.createdAt?new Date(l.createdAt).getTime():0;return be==="newest"?p-o:o-p})),e=e==null?void 0:e.filter(i=>{var l,o,p,b,S,L,M,O,I;if(i){const P=("joke"in i?(l=i.joke)==null?void 0:l.toLowerCase().includes(f.toLowerCase()):!1)||("setup"in i?(o=i.setup)==null?void 0:o.toLowerCase().includes(f.toLowerCase()):!1)||("delivery"in i?(p=i.delivery)==null?void 0:p.toLowerCase().includes(f.toLowerCase()):!1)||((b=i.name)==null?void 0:b.toLowerCase().includes(f.toLowerCase()))||((S=i.category)==null?void 0:S.toLowerCase().includes(f.toLowerCase()))||((L=i.subCategories)==null?void 0:L.includes(f==null?void 0:f.toLowerCase()))||((M=i.translatedLanguage)==null?void 0:M.toLowerCase().includes(f.toLowerCase())),k=T?i.category===T:!0,R=_!==""?i.language===_:!0,c=(N==null?void 0:N.value)!==""&&(N==null?void 0:N.value)!=="any"?(O=i.subCategories)==null?void 0:O.includes(N==null?void 0:N.value):!0;return m&&i.private===!1&&i.verified===!0||m&&i.private===void 0||!m&&((I=i.user)!=null&&I.includes(x))?R&&k&&c&&P:!1}}),e=e==null?void 0:e.filter(i=>{var o;return!((o=d==null?void 0:d.blacklistedJokes)==null?void 0:o.some(p=>p.jokeId===i.jokeId&&p.language===i.language))}),B==="popularity"&&(e=e==null?void 0:e.sort((i,l)=>{var o,p;return((o=l.user)==null?void 0:o.length)-((p=i.user)==null?void 0:p.length)})),B==="category"&&(e=e==null?void 0:e.sort((i,l)=>i.category>l.category?1:-1)),B==="language"&&(e=e==null?void 0:e.sort((i,l)=>i.translatedLanguage>l.translatedLanguage?1:-1)),B==="name"&&(e=e==null?void 0:e.sort((i,l)=>i.name>l.name?1:-1));const a=e.slice(0,E);if(X&&e.length>0){const i=e[Math.floor(Math.random()*e.length)];fe([i])}else fe(re?a:e)},[m,J,T,_,N,f,X,us,be,B,re,E]);const gs=e=>{let a=e;e==="Chuck Norris"?a="ChuckNorris":e==="Dad Joke"&&(a="DadJoke"),le(a)},Ns=e=>{var i;const a=v==null?void 0:v.find(l=>l._id===e);if(!a){C(H(`${Ht[t]}`,!0,8));return}if(a){if((i=a.user)!=null&&i.includes(x==null?void 0:x.toString())){C(H(`${Qt[t]}`,!1,8));return}C(Wt({...a,user:[...a.user,x]})).then(()=>{C(He()),C(H(`${Yt[t]}`,!1,8))})}};let D=Array.from(new Set((Re=J==null?void 0:J.filter(e=>e.private===!1&&e.verified===!0||e.private===void 0))==null?void 0:Re.flatMap(e=>e.subCategories))).map(e=>{const a=e?he[e][t]||e:"",i=(a==null?void 0:a.charAt(0).toUpperCase())??e??"",l=(a==null?void 0:a.slice(1))??e??"";return{label:i+l,value:e}});D=D.filter(e=>e.value!=="any"),D.unshift({label:he.any[t].charAt(0).toUpperCase()+he.any[t].slice(1),value:"any"}),r.useEffect(()=>{me(D[0])},[t]),r.useEffect(()=>{(async()=>{var a;if(Array.isArray(v)&&v.length>0&&d&&(d!=null&&d.blacklistedJokes)){const i=await Promise.all(((a=d==null?void 0:d.blacklistedJokes)==null?void 0:a.map(async l=>{let o=l.value;return(v==null?void 0:v.find(b=>{var S,L;return((S=b.jokeId)==null?void 0:S.toString())===((L=l.jokeId)==null?void 0:L.toString())&&b.language===l.language}))??await Ss(l.jokeId,l.language,o??void 0)}))||[]);fs(i)}})()},[d==null?void 0:d.blacklistedJokes,v]);const G=ue==null?void 0:ue.filter(e=>{var a,i,l,o,p;if(e)return("joke"in e?(a=e.joke)==null?void 0:a.toLowerCase().includes(f.toLowerCase()):!1)||("setup"in e?(i=e.setup)==null?void 0:i.toLowerCase().includes(f.toLowerCase()):!1)||("delivery"in e?(l=e.delivery)==null?void 0:l.toLowerCase().includes(f.toLowerCase()):!1)||((o=e.category)==null?void 0:o.toLowerCase().includes(f.toLowerCase()))||((p=e.subCategories)==null?void 0:p.includes(f==null?void 0:f.toLowerCase()))}),Ss=async(e,a,i)=>{var l,o,p,b,S,L,M,O,I,P,k,R,c,w,q,de,_e,De,Ue;try{if(i){let $;try{$=await aa.searchNorrisJoke(i)}catch(h){return(o=(l=h.response)==null?void 0:l.data)!=null&&o.message&&C(H(h.response.data.message,!0,8)),console.error(h),null}finally{return{jokeId:$.id,joke:$.value,category:z.ChuckNorris,language:g.English,type:A.single,safe:!((p=$.categories)!=null&&p.includes("explicit")||(b=$.categories)!=null&&b.includes("political")||(S=$.categories)!=null&&S.includes("religion"))}}}else{const h=await(await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${e}&lang=${a}&format=json`)).json();if(h.error){const Ve=await ia.getDadJokeById(e);return{jokeId:Ve.id,joke:Ve.joke,category:z.DadJoke,language:g.English,type:A.single,safe:!0}}else return h.type==="twopart"?{jokeId:h.id,setup:h.setup,delivery:h.delivery,category:h.category,language:h.lang,type:A.twopart,safe:!((L=h.flags)!=null&&L.nsfw||(M=h.flags)!=null&&M.religious||(O=h.flags)!=null&&O.political||(I=h.flags)!=null&&I.racist||(P=h.flags)!=null&&P.sexist||(k=h.flags)!=null&&k.explicit||!h.safe)}:{jokeId:h.id,joke:h.joke,category:h.category,language:h.lang,type:A.single,safe:!((R=h.flags)!=null&&R.nsfw||(c=h.flags)!=null&&c.religious||(w=h.flags)!=null&&w.political||(q=h.flags)!=null&&q.racist||(de=h.flags)!=null&&de.sexist||(_e=h.flags)!=null&&_e.explicit||!h.safe)}}}catch($){return(Ue=(De=$.response)==null?void 0:De.data)!=null&&Ue.message&&C(H($.response.data.message,!0,8)),console.error($),null}};r.useEffect(()=>{x||F(!1)},[x]);const[u,U]=r.useState(1),[ce,Ls]=r.useState(10),[$s,Ce]=r.useState(1),[As,we]=r.useState(3),Z=e=>{U(e),e<=2?(Ce(1),we(3)):e>=n.length-1?(Ce(n.length-2),we(n.length)):(Ce(e-1),we(e+1))};r.useEffect(()=>{u||U(1)},[u]),r.useEffect(()=>{Z(1),F(!1)},[m]);const Pe=u*ce,Js=Pe-ce,V=Y==null?void 0:Y.slice(Js,Pe),n=[];for(let e=1;e<=Math.ceil((Y==null?void 0:Y.length)/ce);e++)n==null||n.push(e);const Ee=n==null?void 0:n.slice($s-1,As);r.useEffect(()=>{u>n.length&&U(1)},[n]);const Fs=e=>{navigator.clipboard.writeText(e).then(function(){C(H(`${Xt[t]}`,!1,3))},function(){C(H(`${Gt[t]}`,!0,3))})},ke=e=>s.jsxs("div",{className:"pagination",children:[(n==null?void 0:n.length)>1&&s.jsx("div",{children:s.jsxs("span",{children:[u," / ",n==null?void 0:n.length]})}),s.jsxs("div",{children:[s.jsxs("div",{className:"chevrons-wrap back",children:[s.jsxs("button",{className:`inner-nav-btn first tooltip-wrap ${u===1?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===1,onClick:()=>Z(1),children:[s.jsx(ze,{})," ",s.jsx("span",{className:"tooltip narrow2 below right",children:Zt[t]})]}),s.jsxs("button",{className:`inner-nav-btn back tooltip-wrap ${u===1?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===1,onClick:()=>Z(u-1),children:[s.jsx(Qs,{})," ",s.jsx("span",{className:"tooltip narrow2 below right",children:Kt[t]})]})]}),s.jsx("div",{className:`numbers${(n==null?void 0:n.length)===1?" hidden":""}`,children:Ee==null?void 0:Ee.map(a=>s.jsx("button",{className:`${a>9?"over9":a>99?"over99":a>999?"over999":""} ${a===u?"active":""}`,onClick:()=>Z(a),children:a},a))}),s.jsxs("div",{className:"chevrons-wrap forward",children:[s.jsxs("button",{className:`inner-nav-btn forward tooltip-wrap ${u===(n==null?void 0:n.length)?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===(n==null?void 0:n.length),onClick:()=>Z(u+1),children:[s.jsx(Ws,{})," ",s.jsx("span",{className:"tooltip narrow2 below left",children:ea[t]})]}),s.jsxs("button",{className:`inner-nav-btn last tooltip-wrap ${u===(n==null?void 0:n.length)?"disabled":""} ${(n==null?void 0:n.length)<=3?"hidden":""}`,disabled:u===(n==null?void 0:n.length),onClick:()=>Z(n==null?void 0:n.length),children:[s.jsx(qe,{}),s.jsxs("span",{className:"tooltip narrow2 left below",children:[sa[t],": ",n==null?void 0:n.length]})]})]})]}),s.jsxs("div",{children:[s.jsx("input",{"aria-labelledby":"items-per-page",className:"items-per-page narrow",name:"items-per-page",id:`items-per-page-input-${e}`,type:"number",min:"1",max:"100",defaultValue:ce,onChange:a=>Ls(a.target.valueAsNumber>0?a.target.valueAsNumber:1)})," ",s.jsx("span",{id:"items-per-page",children:ta[t]})," "]})]});return s.jsxs("div",{className:"saved",id:"saved",children:[x&&s.jsxs("div",{className:"local-saved-wrap",children:[s.jsx("button",{className:`btn${m&&!j?" active":""}`,onClick:()=>{W(!0),F(!1)},children:m?ge[t]:Qe[t]}),s.jsx("button",{className:`btn${!m&&!j?" active":""}`,onClick:()=>{W(!1),F(!1)},children:Ne[t]})]}),s.jsxs("div",{className:"saved-inner",children:[s.jsx("div",{className:"filler"}),s.jsxs("div",{children:[!j&&s.jsxs(s.Fragment,{children:[s.jsx("h3",{children:m?ge[t]:Ne[t]}),m&&s.jsxs("p",{className:"mb3 flex center textcenter",children:[" ",Zs[t]]}),s.jsxs("div",{className:"toggle-wrap",children:[s.jsxs("div",{className:"toggle-inner-wrap",children:[s.jsxs("div",{className:"safemode-wrap",children:[s.jsx(Ze,{isChecked:se,name:"safemode",id:"safemode2",className:`${t} ${se?"":"unsafe"} userjokes safemode`,label:`${Ks[t]}: `,hideLabel:!1,on:et[t],off:st[t],handleToggleChange:ts}),B==="age"&&s.jsx(Ze,{isChecked:ne,name:"age",id:"age",className:`${t} age`,label:`${tt[t]}: `,hideLabel:!1,on:at[t],off:it[t],handleToggleChange:()=>{ys()},equal:!0})]}),s.jsx("div",{className:"sortby-wrap",children:s.jsx(K,{language:t,id:"sortby",className:"sortby",instructions:`${lt[t]}:`,options:is(Se),value:{label:Se[B][g[Q(g,t)]],value:Se[B][g[Q(g,t)]]},onChange:e=>{ve(e==null?void 0:e.value)}})})]}),s.jsxs("div",{className:"toggle-inner-wrap",children:[s.jsx("div",{children:s.jsx(K,{language:t,id:"joke-languages",className:"language-filter",instructions:`${nt[t]}:`,options:[{label:We[t],value:""},...Array.from(new Set(J==null?void 0:J.map(e=>e.language))).map(e=>({label:oe[e][Q(g,e)],value:e}))],value:_?{label:oe[_][Q(g,_)],value:_}:{label:We[t],value:""},onChange:e=>{Je(e==null?void 0:e.value)}})}),s.jsx("div",{children:s.jsx(K,{language:t,id:"single-category-select",className:"single-category-select",instructions:`${rt[t]}:`,options:[{label:Ye[t],value:""},...Object.values(z).map(e=>({label:te(e,t),value:e}))],value:T?{label:te(T,t),value:T}:{label:Ye[t],value:""},onChange:e=>{le(e==null?void 0:e.value),ws(e),gs(e==null?void 0:e.value)}})})]}),s.jsxs("div",{className:"toggle-inner-wrap",children:[s.jsx("div",{children:s.jsx(K,{language:t,id:"userNorrisCategories",className:`category extras ${Fe?"":"hidden"}`,instructions:`${ct[t]}:`,selectAnOption:D[0].label,value:N,options:D,onChange:e=>{me(e)}})}),s.jsx("div",{className:Fe?"search-jokes-wrap":"full search-jokes-wrap",children:s.jsx("div",{className:"search-jokes input-wrap",children:s.jsxs("label",{htmlFor:"search-jokes",children:[s.jsx("input",{type:"text",id:"search-jokes",value:f,onChange:Ie,placeholder:dt[t]}),s.jsx("span",{children:Xe[t]})]})})})]})]}),s.jsx("div",{className:"reset-btn-wrap mb3",children:s.jsxs("button",{className:"reset-btn delete danger",onClick:()=>Cs(),children:[s.jsx(Bs,{})," ",s.jsx("span",{children:ot[t]})]})})]}),s.jsxs("div",{className:"button-wrap",children:[!j&&s.jsxs(s.Fragment,{children:[s.jsxs("button",{className:`icontext random-btn ${X?"active":""}`,onClick:()=>{U(1),F(!1),ie(!0),$e(e=>e+1),ye(!1)},children:[ht[t]," ",s.jsx(Ts,{})]})," ",s.jsxs("button",{className:`icontext all-or-latest-btn ${!X&&!re?"active":""}`,onClick:()=>{ie(!1),F(!1),ye(!1)},children:[pt[t]," ",s.jsx(Ms,{})]}),s.jsxs("div",{className:"flex center",children:[s.jsxs("button",{className:`icontext all-or-latest-btn ${re?"active":""}`,onClick:()=>{ie(!1),F(!1),Oe("newest"),ve("age"),ye(!0)},children:[xt[t],s.jsx("span",{className:"scr",children:E})," ",E===3&&s.jsx(Os,{}),E===4&&s.jsx(Is,{}),E===5&&s.jsx(Ps,{}),E===6&&s.jsx(ks,{}),E===7&&s.jsx(Rs,{}),E===8&&s.jsx(_s,{}),E===9&&s.jsx(Ds,{}),E>9&&s.jsx(Us,{})]}),s.jsxs("div",{children:[s.jsx("input",{type:"number",min:3,max:100,id:"number-of-latest",defaultValue:E,className:"narrow",onChange:e=>{bs(e.target.valueAsNumber)}}),s.jsx("label",{htmlFor:"number-of-latest",className:"scr",children:s.jsx("span",{children:ft[t]})})]})]})]}),d&&s.jsx("button",{className:`blocked-btn danger ${j?"active":""}`,onClick:()=>F(e=>!e),children:j?s.jsxs(s.Fragment,{children:[ut[t]," ",s.jsx(Vs,{})]}):s.jsxs(s.Fragment,{children:[vt[t]," ",s.jsx(qs,{})]})})]}),!X&&!j&&ke(1),d&&j&&(G==null?void 0:G.length)>0?s.jsx("div",{className:"blocked-controls-wrap",children:s.jsx("div",{className:"input-wrap search-blacklist",children:s.jsxs("label",{htmlFor:"searchBlacklistedJokes",children:[s.jsx("input",{id:"searchBlacklistedJokes",type:"text",onChange:Ie}),s.jsx("span",{children:Xe[t]})]})})}):j?s.jsx("p",{className:"textcenter",children:mt[t]}):"",s.jsx("ul",{className:`userjokeslist ${j?"blockedJokes":""}`,children:d&&j?G==null?void 0:G.map((e,a)=>{var i,l;return s.jsxs("li",{children:[s.jsx("form",{onSubmit:o=>{var p,b;C(jt(e)),os(o,e,(b=(p=d==null?void 0:d.blacklistedJokes)==null?void 0:p[a])==null?void 0:b._id)},children:s.jsx("button",{className:"",type:"submit",disabled:pe,children:bt[t]})}),e?e.type===A.single?s.jsx("p",{children:e.joke}):s.jsxs("div",{children:[s.jsx("p",{children:e.setup}),s.jsx("p",{children:e.delivery})]}):""]},((l=(i=d==null?void 0:d.blacklistedJokes)==null?void 0:i[a])==null?void 0:l.jokeId)??a)}):V&&(V==null?void 0:V.length)>0?V==null?void 0:V.map(e=>{var o,p,b,S,L,M,O,I,P,k,R;const{visible:a,translatedLanguage:i,...l}=e;return s.jsxs("li",{children:[s.jsx("div",{className:"primary-wrap",children:e.type===A.single?s.jsx("p",{className:"",children:e.joke}):s.jsxs("div",{children:[s.jsx("p",{className:"",children:e.setup}),s.jsx("p",{children:e.delivery?s.jsxs("button",{type:"button",onClick:()=>Es(e.jokeId),className:`${xe[e.jokeId]?"reveal":""} delivery`,children:[s.jsxs("span",{...xe[e.jokeId]?{"aria-hidden":!0}:{"aria-hidden":!1},children:[s.jsx(qe,{})," ",yt[t]," ",s.jsx(ze,{})]}),s.jsx("p",{"aria-live":"assertive",children:xe[e.jokeId]?e.delivery:""})]}):""})]})}),s.jsxs("div",{className:"secondary-wrap",children:[s.jsxs("div",{children:[s.jsxs("span",{children:[Ct[t],":"," ",te(e.category,t)," ",e.subCategories&&((o=e.subCategories)==null?void 0:o.length)>0&&((p=e.subCategories)!=null&&p.find(c=>c!=="any"))?s.jsxs(s.Fragment,{children:["(",(S=(b=e.subCategories)==null?void 0:b.filter(c=>c!=="any"))==null?void 0:S.map(c=>he[c][t].toLowerCase()??c).join(", "),")"]}):""]}),s.jsxs("span",{children:[as,": ",e.translatedLanguage]}),e.anonymous?s.jsxs("span",{children:[wt[t]," "]}):e.anonymous===!1?s.jsxs("span",{children:[Et[t],": ",e.name??""]}):"",!m&&x&&e.private?s.jsx("span",{children:gt[t]}):!m&&x&&e.private===!1?s.jsx("span",{children:Nt[t]}):"",e.private===!1&&e.verified===!1&&s.jsx("span",{children:St[t]}),((L=e.user)==null?void 0:L.length)>1&&s.jsxs("span",{children:[Lt[t]," ",(M=e.user)==null?void 0:M.length]})]}),s.jsxs("div",{children:[x&&((O=e.user)==null?void 0:O.includes(x))&&s.jsx("form",{onSubmit:e.type===A.single?Le(e==null?void 0:e._id,e==null?void 0:e.joke):Le(e==null?void 0:e._id,e==null?void 0:e.setup),className:"button-wrap",children:s.jsx("button",{type:"submit",disabled:pe,className:"delete danger",children:((I=e.user)==null?void 0:I.length)>1?$t[t]:At[t]})}),e.author!==x&&!((P=e.user)!=null&&P.includes(x))&&s.jsx("button",{onClick:()=>hs(e.jokeId,e.language,e.category===z.ChuckNorris&&e.type===A.single?e.joke:void 0),className:"delete danger",children:Jt[t]}),!((k=e.user)!=null&&k.includes(x))&&s.jsxs("button",{onClick:()=>Ns(e._id),className:"save",children:[Ge[t]," ",s.jsx(zs,{})]}),s.jsxs("button",{onClick:()=>Fs(e.type===A.single?e.joke:e.setup+` 
`+e.delivery),children:[Ft[t]," ",s.jsx(Hs,{})]}),x&&((R=e.user)==null?void 0:R.includes(x))&&e.author===x&&s.jsx(Bt,{language:t,id:`joke-edit-${e.jokeId}`,className:"joke-edit",wrapperClass:"joke-edit-wrap",text:Tt[t],onClick:()=>{Be(e.language),Me(e.category),y(l),ds(e.jokeId)},isOpen:cs===e.jokeId,setIsFormOpen:rs,children:s.jsxs("form",{onSubmit:es(e==null?void 0:e._id,ms??e),className:"joke-edit",children:[s.jsx("div",{className:"edit-wrap",children:e.private===!0&&e.type===A.twopart?s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"edit-setup",children:[s.jsx("input",{required:!0,type:"text",name:"edit-setup",id:"setup",defaultValue:e.setup,onChange:c=>{y(w=>({...w,setup:c.target.value}))}}),s.jsx("span",{children:Mt[t]})]})}),s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"edit-delivery",children:[s.jsx("input",{required:!0,type:"text",name:"delivery",id:"edit-delivery",defaultValue:e.delivery,onChange:c=>{y(w=>({...w,delivery:c.target.value}))}}),s.jsx("span",{children:Ot[t]})," "]})})]}):e.private===!0&&e.type===A.single?s.jsx("div",{className:"input-wrap",children:s.jsxs("label",{htmlFor:"edit-joke",children:[s.jsx("input",{required:!0,type:"text",name:"joke",id:"edit-joke",defaultValue:e.joke,onChange:c=>{y(w=>({...w,joke:c.target.value}))}}),s.jsx("span",{children:It[t]})]})}):s.jsxs("div",{children:[Pt[t],"."," ",kt[t]," ",Rt[t]]})}),e.private===!0&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"flex column center gap",children:[s.jsx(K,{language:t,id:"edit-language",className:"edit-language",instructions:`${_t[t]}:`,hide:!0,options:ls(g),value:{label:oe[je][Q(g,je)],value:je},onChange:c=>{Be(c==null?void 0:c.value),y(w=>({...w,language:c==null?void 0:c.value}))}}),s.jsx(K,{language:t,id:"edit-category",className:"edit-category",instructions:`${Dt[t]}:`,hide:!0,options:[{label:Ut[t],value:""},...Object.values(z).map(c=>({label:te(c,t),value:c}))],value:{label:te(Te,t),value:Te},onChange:c=>{const{visible:w,translatedLanguage:q,...de}=e;Me(c==null?void 0:c.value),y(()=>({...de,category:c==null?void 0:c.value}))}})]}),s.jsxs("fieldset",{children:[s.jsx("legend",{children:Vt[t]}),s.jsxs("div",{className:"checkbox-wrap",children:[s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-nsfw",name:"nsfw",value:"nsfw",onChange:()=>{y(()=>({...l,nsfw:!e.flags.nsfw}))}}),s.jsx("label",{htmlFor:"flag-nsfw",children:ee[t].nsfw})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-religious",name:"religious",value:"religious",onChange:()=>{y(()=>({...l,religious:!e.flags.religious}))}}),s.jsx("label",{htmlFor:"flag-religious",children:ee[t].religious})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-political",name:"political",value:"political",onChange:()=>{y(()=>({...l,political:!e.flags.political}))}}),s.jsx("label",{htmlFor:"flag-political",children:ee[t].political})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-racist",name:"racist",value:"racist",onChange:()=>{y(()=>({...l,racist:!e.flags.racist}))}}),s.jsx("label",{htmlFor:"flag-racist",children:ee[t].racist})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-sexist",name:"sexist",value:"sexist",onChange:()=>{y(()=>({...l,sexist:!e.flags.sexist}))}}),s.jsx("label",{htmlFor:"flag-sexist",children:ee[t].sexist})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:"flag-explicit",name:"explicit",value:"explicit",onChange:()=>{y(()=>({...l,explicit:!e.flags.explicit}))}}),s.jsx("label",{htmlFor:"flag-explicit",children:ee[t].explicit})]})]})]})]}),s.jsxs("fieldset",{className:"flex center gap margin0auto",children:[s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",name:"anonymous",id:"edit-anonymous",defaultChecked:e.anonymous,onChange:()=>{const{visible:c,translatedLanguage:w,...q}=e;y(()=>({...q,anonymous:!e.anonymous}))}}),s.jsx("label",{htmlFor:"edit-anonymous",children:"Anonymous:"})]}),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",name:"private",id:"edit-private",defaultChecked:e.private,onChange:()=>{const{visible:c,translatedLanguage:w,...q}=e;y(()=>({...q,private:!e.private}))}}),s.jsx("label",{htmlFor:"edit-private",children:"Private:"})]})]}),s.jsx("button",{type:"submit",disabled:pe,className:"save",children:Ge[t]})]})})]})]})]},e._id)}):s.jsxs("li",{className:"margin0auto max-content",children:[qt[t],s.jsx("br",{}),s.jsx("br",{}),"(",zt[t],")"]})}),!X&&!j&&ke(2)]}),s.jsx("div",{className:"filler below"})]}),x&&s.jsxs("div",{className:"local-saved-wrap below",children:[s.jsx("button",{className:`btn${m&&!j?" active":""}`,onClick:()=>{W(!0),F(!1)},children:m?ge[t]:Qe[t]}),s.jsx("button",{className:`btn${!m&&!j?" active":""}`,onClick:()=>{W(!1),F(!1)},children:Ne[t]})]})]})};export{la as EOrderByAge,La as default};
