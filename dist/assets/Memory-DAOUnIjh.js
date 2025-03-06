const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CardTypeButton-DXnM9Da6.js","assets/react-kX_YxI4E.js","assets/dom-to-image-more-CfDXlNbO.js","assets/react-icons-CzVo0GbG.js","assets/index-DlLCwrmZ.js","assets/react-dom-B5MLDbn_.js","assets/scheduler-CzFDRTuY.js","assets/react-redux-BEmJlIGA.js","assets/hoist-non-react-statics-DQogQWOa.js","assets/react-is-DUDD-a5e.js","assets/use-sync-external-store-BPp6CH6k.js","assets/@reduxjs-DhFEcpJw.js","assets/immer-C0GRqQ_d.js","assets/redux-CE3tqztX.js","assets/@babel-DF5_wy6Y.js","assets/redux-thunk-CY0Q9z1Q.js","assets/axios-CCb-kr4I.js","assets/react-router-dom-StiqOUIT.js","assets/react-router-DUuhLvki.js","assets/@remix-run-DTnHqtaE.js","assets/index-BB6z88U0.css","assets/GridSizeButton-BOVYECur.js","assets/PlayerAmountButton-D4l190nZ.js","assets/GameGrid-CtSUhPCs.js"])))=>i.map(i=>d[i]);
import{L as _e,_ as Q,u as De,K as Le,l as Ae,q as ce,j as Ie,e as G,M as Oe,A as Te}from"./index-DlLCwrmZ.js";import{r as l,j as e}from"./react-kX_YxI4E.js";import{D as J,E as Me,J as Be,K as Re,L as Ue,N as Ge,O as Ke,Q as We,S as qe,U as Ve,V as Ye,W as Je,X as Qe,Y as Xe,Z as Ze,_ as es,$ as ss,a0 as as,a1 as ts,a2 as rs,a3 as ns,a4 as is,a5 as cs,a6 as os,a7 as ls,a8 as ds,a9 as hs,aa as ms,ab as fe,ac as us,ad as xs,ae as ps,af as gs,ag as js,ah as _s,ai as fs,aj as ys,ak as vs,al as Ss,am as $s,an as bs,ao as Fs,ap as Ns,aq as ws,ar as zs,as as Cs,at as Hs,au as Ps,av as Es,aw as ks,ax as Ds,j as Ls,ay as As,az as Is,aA as Os,aB as Ts}from"./react-icons-CzVo0GbG.js";import{a as I}from"./axios-CCb-kr4I.js";import{a as Ms}from"./react-redux-BEmJlIGA.js";const Bs="_sectioncard_zxrpy_21",Rs="_game_zxrpy_53",Us="_container_zxrpy_69",Gs="_modal_zxrpy_71",Ks="_settings_zxrpy_85",Ws="_size8_zxrpy_129",qs="_size10_zxrpy_131",Vs="_light_zxrpy_183",Ys="_grid_zxrpy_121",Js="_card_zxrpy_229",Qs="_flipped_zxrpy_289",Xs="_front_zxrpy_289",Zs="_flip_zxrpy_289",ea="_back_zxrpy_301",sa="_header_zxrpy_497",aa="_time_zxrpy_865",ta="_select_zxrpy_937",ra="_active_zxrpy_1083",na="_finish_zxrpy_1225",ia="_close_zxrpy_1261",ca="_big_zxrpy_1275",h={"game-container":"_game-container_zxrpy_1",sectioncard:Bs,game:Rs,container:Us,modal:Gs,settings:Ks,"player-names-wrap":"_player-names-wrap_zxrpy_111","grid-wrap":"_grid-wrap_zxrpy_121",size8:Ws,size10:qs,light:Vs,grid:Ys,card:Js,flipped:Qs,front:Xs,flip:Zs,back:ea,"flip-back":"_flip-back_zxrpy_1","flipped-over":"_flipped-over_zxrpy_313",header:sa,"game-over":"_game-over_zxrpy_513","high-scores":"_high-scores_zxrpy_525","new-score":"_new-score_zxrpy_637","title-svg":"_title-svg_zxrpy_787","title-icon":"_title-icon_zxrpy_795","time-wrap":"_time-wrap_zxrpy_865",time:aa,"delete-btn":"_delete-btn_zxrpy_907","delete-name-form":"_delete-name-form_zxrpy_915",select:ta,"player-names":"_player-names_zxrpy_111","set-card-type":"_set-card-type_zxrpy_961","set-players":"_set-players_zxrpy_979","set-grid":"_set-grid_zxrpy_981",active:ra,"set-handedness":"_set-handedness_zxrpy_1097",finish:na,"edit-wrap":"_edit-wrap_zxrpy_1231",close:ia,big:ca};var H=(n=>(n.letters="letters",n.numbers="numbers",n.icons="icons",n))(H||{}),B=(n=>(n.solo="solo",n.duet="duet",n))(B||{});const oa=(n,s)=>{const[_,g]=l.useState(0),R=l.useCallback(()=>{g(0)},[]);return l.useEffect(()=>{let k;if(n){g(0);const z=100,v=.1;k=setInterval(()=>{g(K=>{const T=K+v;return parseFloat(T.toFixed(1))})},z)}return()=>{k&&clearInterval(k)}},[n,s]),{timer:_,resetTimer:R}},la="http://localhost:4000",O=`${la}/api/highscores`,da=async(n,s)=>(await I.post(`${O}/${n}/key/${s.levelKey}`,s)).data,ha=async(n,s)=>(await I.get(`${O}/${n}/key/${s}`)).data,ma=async n=>(await I.get(`${O}/${n}`)).data,ua=async(n,s)=>(await I.delete(`${O}/${n}/id/${s}`)).data,xa=async(n,s,_)=>(await I.put(`${O}/${n}/id/${s._id}?userID=${_}`,s)).data,pa=async(n,s,_)=>(await I.delete(`${O}/${n}/player/${s}?userID=${_}`)).data,ga=async(n,s)=>(await I.post(`${O}/${n}/cleanup/${s}`)).data,ja=async(n,s,_,g)=>(await I.put(`${O}/${n}/player?userID=${g}`,{oldName:s,newName:_})).data,M={addHighScore:da,getHighScoresByLevel:ha,getAllHighScores:ma,deleteHighScore:ua,updateHighScore:xa,deleteHighScoresByPlayerName:pa,changePlayerName:ja,cleanUpHighScores:ga},pe=localStorage.getItem("AppLanguage"),A=pe?pe.replace(/"/g,""):"en",_a=()=>{const{t:n}=l.useContext(_e),[s,_]=l.useState({}),[g,R]=l.useState(!0),[k,z]=l.useState(null);l.useEffect(()=>{(async()=>{try{const o=await M.getAllHighScores(A),r={};o.forEach(i=>{const[c,...y]=i.levelKey.split("_"),d=y.join("_");r[c]||(r[c]={}),r[c][d]||(r[c][d]=[]),r[c][d].push(i)}),Object.keys(r).forEach(i=>{Object.keys(r[i]).forEach(c=>{r[i][c]=r[i][c].sort((y,d)=>y.time-d.time).slice(0,5)})}),_(r)}catch(o){console.error(n("ErrorRetrievingHighScores"),o),z(n("ErrorRetrievingHighScores"))}finally{R(!1)}})()},[A]);const v=async f=>{try{const o=await M.addHighScore(A,f);if(o.highScore){const[r,...i]=o.highScore.levelKey.split("_"),c=i.join("_");return _(y=>{const d={...y};d[r]||(d[r]={}),d[r][c]||(d[r][c]=[]);const j=d[r][c]||[],C=j.findIndex(N=>{var E;return N._id===((E=o.highScore)==null?void 0:E._id)});let $;return C!==-1?($=[...j],o.highScore&&($[C]=o.highScore)):o.highScore?$=[...j,o.highScore]:$=[...j],$=$.sort((N,E)=>N.time-E.time).slice(0,5),d[r][c]=$,d}),await w(),o.highScore}else return}catch{z("Failed to add high score.");return}},K=async f=>{try{const o=await M.getHighScoresByLevel(A,f);return o.sort((r,i)=>r.time-i.time),o.slice(0,5)}catch(o){return console.error(n("ErrorRetrievingHighScores"),o),z(n("ErrorRetrievingHighScores")),[]}},T=async f=>{try{const o=await M.deleteHighScore(A,f);o.success?_(r=>{const i={};return Object.keys(r).forEach(c=>{i[c]={...r[c]},Object.keys(i[c]).forEach(y=>{i[c][y]=i[c][y].filter(d=>d._id!==f)})}),i}):console.error(n("ErrorDeletingHighScore"),o.message)}catch(o){console.error(n("ErrorDeletingHighScore"),o),z(n("ErrorDeletingHighScore"))}},b=async(f,o)=>{try{const r=await M.updateHighScore(A,f,o);if(r.success&&r.highScore){const i=r.highScore,[c,...y]=i.levelKey.split("_"),d=y.join("_");_(j=>{j[c]||(j[c]={}),j[c][d]||(j[c][d]=[]);const C=j[c][d]||[],$=C.findIndex(N=>N._id===i._id);if($!==-1){const N=[...C];N[$]=i;const E=N.sort((ee,q)=>ee.time-q.time).slice(0,5);return{...j,[c]:{...j[c],[d]:E}}}return j}),console.log(n("HighScoreUpdatedSuccessfully"))}else console.error(n("ErrorUpdatingHighScore"),r.message)}catch(r){console.error(n("ErrorUpdatingHighScore"),r),z(n("ErrorUpdatingHighScore"))}},X=async(f,o)=>{try{const r=await M.deleteHighScoresByPlayerName(A,f,o);r.success?_(i=>{const c={};return Object.keys(i).forEach(y=>{c[y]={},Object.keys(i[y]).forEach(d=>{c[y][d]=i[y][d].filter(j=>!j.players.some(C=>C.name===f))})}),c}):console.error(n("ErrorDeletingHighScore"),r.message)}catch(r){console.error(n("ErrorDeletingHighScore"),r),z(n("ErrorDeletingHighScore"))}},Z=f=>{const r=[...f.players].sort((i,c)=>i.name.localeCompare(c.name)).map(i=>`${i.name}:${i.score}`).join("-");return`${f.levelKey}_${f.time}-${r}`},w=async()=>{const f=Object.values(s).flatMap(r=>Object.values(r)).flat(),o={};f.forEach(r=>{const i=Z(r);o[i]||(o[i]=[]),o[i].push(r)});for(const r in o){const i=o[r];if(i.length>1){i.sort((d,j)=>new Date(j.createdAt??0).getTime()-new Date(d.createdAt??0).getTime());const[c,...y]=i;for(const d of y)d._id&&await T(d._id)}}};return{highScores:s,addHighScore:v,getHighScoresByLevel:K,deleteHighScore:T,updateHighScore:b,deleteHighScoresByPlayerName:X,changePlayerName:async(f,o,r)=>{try{await M.changePlayerName(A,f,o,r),_(i=>{const c={};return Object.keys(i).forEach(y=>{c[y]={},Object.keys(i[y]).forEach(d=>{c[y][d]=i[y][d].map(j=>{const C=j.players.map($=>$.name===f?{...$,name:o}:$);return{...j,players:C}})})}),c})}catch(i){console.error("Failed to change player name.",i)}},loading:g,error:k}},ge=l.memo(({timer:n})=>e.jsxs("span",{children:[n.toFixed(1),"s"]})),fa=l.lazy(()=>Q(()=>import("./CardTypeButton-DXnM9Da6.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),ya=l.lazy(()=>Q(()=>import("./GridSizeButton-BOVYECur.js"),__vite__mapDeps([21,1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,3,17,18,19,20]))),va=l.lazy(()=>Q(()=>import("./PlayerAmountButton-D4l190nZ.js"),__vite__mapDeps([22,1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,3,17,18,19,20]))),Sa=l.lazy(()=>Q(()=>import("./GameGrid-CtSUhPCs.js"),__vite__mapDeps([23,1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,3,17,18,19,20]))),je=[e.jsx(Re,{}),e.jsx(Ue,{}),e.jsx(Ge,{}),e.jsx(Ke,{}),e.jsx(We,{}),e.jsx(qe,{}),e.jsx(Ve,{}),e.jsx(Ye,{}),e.jsx(Je,{}),e.jsx(Qe,{}),e.jsx(Xe,{}),e.jsx(Ze,{}),e.jsx(es,{}),e.jsx(ss,{}),e.jsx(as,{}),e.jsx(ts,{}),e.jsx(rs,{}),e.jsx(ns,{}),e.jsx(is,{}),e.jsx(cs,{}),e.jsx(os,{}),e.jsx(ls,{}),e.jsx(ds,{}),e.jsx(hs,{}),e.jsx(ms,{}),e.jsx(fe,{}),e.jsx(us,{}),e.jsx(xs,{}),e.jsx(ps,{}),e.jsx(gs,{}),e.jsx(js,{}),e.jsx(_s,{}),e.jsx(fs,{}),e.jsx(ys,{}),e.jsx(vs,{}),e.jsx(Ss,{}),e.jsx($s,{}),e.jsx(bs,{}),e.jsx(Fs,{}),e.jsx(Ns,{}),e.jsx(ws,{}),e.jsx(zs,{}),e.jsx(Cs,{}),e.jsx(Hs,{}),e.jsx(Ps,{}),e.jsx(Es,{}),e.jsx(ks,{}),e.jsx(Ds,{}),e.jsx(Ls,{}),e.jsx(As,{}),e.jsx(Is,{})],$a=["solo","duet"],ba=({language:n})=>{const{t:s}=l.useContext(_e),_=De(),g=Ms(a=>{var t;return(t=a.auth)==null?void 0:t.user}),{show:R}=Le(),k=Ae();l.useEffect(()=>{},[]);const z=[{value:H.icons,label:s("Icons")},{value:H.numbers,label:s("Numbers")},{value:H.letters,label:s("Letters")}],[v,K]=ce("memoryCardType",z[0]),T=[{value:4,icon:"4 × 4",label:`${s("Beginner")}`},{value:6,icon:"6 × 6",label:`${s("Usual")}`},{value:8,icon:"8 × 8",label:`${s("Advanced")}`},{value:10,icon:"10 × 10",label:`${s("Expert")}`}],[b,X]=ce("memoryGrid",T[1]),Z=[1,2],[w,W]=ce("memoryPlayers",[{id:1,name:`${s("Player")} 1`,score:0}]),[f,o]=l.useState(""),[r,i]=l.useState(0),[c,y]=l.useState([]),[d,j]=l.useState([]),[C,$]=l.useState([]),[N,E]=l.useState([]),[ee,q]=l.useState(!1),[D,se]=l.useState(!1),[ye,oe]=l.useState(!1),{timer:ae,resetTimer:ve}=oa(ye,"1ms"),{highScores:V,addHighScore:Se,deleteHighScore:$e,updateHighScore:Fa,deleteHighScoresByPlayerName:be,changePlayerName:Fe,loading:te,error:Y}=_a(),[Ne,le]=l.useState(!1),[re,we]=l.useState(!1),[de,ze]=l.useState(null),{windowWidth:U}=Ie(),he=()=>{let a=[];const t=b?Number(b.value)*Number(b.value)/2:0;if((v==null?void 0:v.value)===H.letters){const u=Array.from({length:t},(p,x)=>{const F=65+x%26;return Math.floor(x/26)%2===0?String.fromCharCode(F):String.fromCharCode(F+32)});a=[...u,...u]}else if((v==null?void 0:v.value)===H.numbers){const u=Array.from({length:t},(p,x)=>x.toString());a=[...u,...u]}else if((v==null?void 0:v.value)===H.icons){const p=[...je].sort(()=>Math.random()-.5).slice(0,t);a=[...p,...p]}const m=a.map((u,p)=>({value:u,id:p})).sort(()=>Math.random()-.5).slice(0,b?Number(b.value)*Number(b.value):0);y(m),j([]),E([]),se(!0),oe(!0),ve(),W(u=>u.map(p=>({...p,score:0}))),i(0),le(!1)},me=(a,t,m)=>`${m}_${a}x${a}_${t}`,Ce=async()=>{le(!0),se(!1);const a=w.length===1?"solo":"duet",m={levelKey:me(Number(b.value),v.value,a),time:ae,players:w,size:Number(b.value),type:v.value},u=await Se(m);u&&(ze(u._id||null),we(!0)),$([])};l.useEffect(()=>{if(re){const a=w.length===1?"solo":"duet",t=me(Number(b.value),v.value,a);setTimeout(()=>{const[m,...u]=t.split("_");u.join("_"),R({title:s("YouMadeItToTheHighScores"),className:"",children:e.jsxs("div",{id:"high-scores",className:`${h.modal} ${k?h.light:""}`,children:[e.jsx("h3",{children:s("YouMadeItToTheHighScores")}),e.jsx("div",{className:`${h["high-scores"]}`,children:(()=>{const p=w.length===1?B.solo:B.duet;let x="";return p===B.solo?x=s("Solo"):p===B.duet&&(x=s("Duet")),e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:x},p),te&&e.jsxs("p",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),Y&&e.jsxs("p",{children:[Y," — ",s("TryWithADifferentBrowser")]}),Object.keys(V[p]||{}).sort().map(F=>{var S,L;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h5",{children:ue(`${F}`)}),e.jsx("ol",{children:(L=(S=V[p])==null?void 0:S[F])==null?void 0:L.map((P,ne)=>e.jsx("li",{className:P._id===de?h["new-score"]:"",children:e.jsxs("div",{children:[e.jsx("span",{children:P.players.map(ie=>e.jsxs("span",{children:[ie.name,": ",ie.score," "]},ie.id))}),e.jsxs("i",{className:h.time,children:[P.time.toFixed(1),"s"]})]})},P._id||`${ne}-${P.time.toFixed(1)}`))})]})},`${p}-${F}`)})]})})()})]})})},0)}else re||G(s("GoodJob"),!1,5)},[V,re,de,te,Y]);const He=a=>{if(!(ee||d.includes(a)||N.includes(a))&&(j(t=>[...t,a]),d.length===1)){q(!0);const t=d[0],m=a,u=c[t],p=c[m];u.value===p.value?(E(x=>[...x,t,m]),W(x=>x.map((F,S)=>S===r?{...F,score:F.score+1}:F)),j([]),q(!1)):setTimeout(()=>{j([]),$(x=>[...x,t,m]),q(!1),i(x=>(x+1)%w.length)},800)}};l.useEffect(()=>{D&&N.length===c.length&&c.length>0&&!Ne&&(oe(!1),setTimeout(()=>{Ce()},1e3))},[D,N,c]);const Pe=a=>(v==null?void 0:v.value)===H.icons?a.value:e.jsx("span",{children:a.value}),Ee=(a,t)=>{if(/[^\p{L}0-9 ]/gu.test(t)){_(G(s("SpecialCharactersNotAllowed"),!0,5));return}const p=t.replace(/[^\p{L}0-9 ]/gu,"").trim();W(x=>x.map((F,S)=>S===a?{...F,name:p||`${s("Player")} ${S+1}`}:F))},ke=a=>{W(t=>Array.from({length:a},(u,p)=>{const x=t[p];return x?{...x,id:p+1}:{id:p+1,name:`${s("Player")} ${p+1}`,score:0}})),i(0)};l.useEffect(()=>{const a=je.map(m=>m.type.displayName||m.type.name),t=a.filter((m,u)=>a.indexOf(m)!==u);t.length>0&&console.log("Duplicate Icons Found:",t)},[]);const ue=a=>{const t=a.split("_");let m="",u=e.jsx(e.Fragment,{});return t[1]===H.numbers?(u=e.jsx("span",{className:h["title-svg"],children:e.jsx(Os,{"aria-hidden":"true"})}),m=s("Numbers")):t[1]===H.letters?(u=e.jsx("span",{className:h["title-svg"],children:e.jsx(Ts,{"aria-hidden":"true"})}),m=s("Letters")):t[1]===H.icons&&(u=e.jsx("span",{className:h["title-icon"],children:e.jsx(fe,{"aria-hidden":"true"})}),m=s("Icons")),e.jsxs(e.Fragment,{children:[t[0]," ",u," ",e.jsx("br",{}),m]})};l.useEffect(()=>{D&&Oe("game")},[D]);const xe=15;return e.jsxs("div",{id:h["game-container"],className:`${h.container} ${k?h.light:""}`,children:[!D&&N.length===c.length&&c.length>0&&e.jsx("section",{className:`card ${h.sectioncard}`,children:e.jsx("div",{children:e.jsxs("div",{className:h["game-over"],children:[e.jsx("h2",{children:s("Done")}),e.jsxs("p",{children:[s("TimeTaken"),": ",e.jsx(ge,{timer:ae})]}),e.jsxs("div",{children:[e.jsxs("h3",{children:[s("Scores"),":"]}),w.map(a=>e.jsxs("p",{children:[a.name,": ",a.score]},a.id))]}),e.jsx("button",{onClick:he,children:s("PlayAgain")})]})})}),!D&&e.jsx("section",{className:`card ${h.sectioncard}`,children:e.jsx("div",{children:e.jsxs("div",{id:"settings",className:h.settings,children:[e.jsx("h2",{className:"scr",children:s("Settings")}),e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("h3",{children:s("CardType")}),e.jsx("div",{className:h["set-card-type"],children:z.map((a,t)=>e.jsx(l.Suspense,{fallback:e.jsxs("div",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),children:e.jsx(fa,{option:a,isActive:(v==null?void 0:v.value)===a.value,onClick:()=>K(a)},a.value)},t))})]}),e.jsxs("div",{children:[e.jsx("h3",{children:s("GridSize")}),e.jsx("div",{className:h["set-grid"],children:T.map((a,t)=>e.jsx(l.Suspense,{fallback:e.jsxs("div",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),children:e.jsx(ya,{option:a,isActive:(b==null?void 0:b.value)===a.value,onClick:()=>X(a)},a.value)},t))})]}),e.jsxs("div",{className:h["player-names-wrap"],children:[e.jsx("h3",{children:s("Players")}),e.jsx("div",{className:h["set-players"],children:e.jsx(e.Fragment,{children:Z.map((a,t)=>e.jsx(l.Suspense,{fallback:e.jsxs("div",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),children:e.jsx(va,{language:n,value:a,isActive:w.length===a,onClick:()=>ke(a)},a)},t))})}),e.jsxs("div",{className:h["player-names"],children:[e.jsxs("small",{children:[s("PleaseUseGoodTasteWhenChoosingYourNickname"),"."," ",s("ProfanityWillBeRemovedByTheAdmin")]}),w.map((a,t)=>e.jsxs("div",{className:"input-wrap",children:[e.jsxs("label",{children:[e.jsx("input",{type:"text",name:`player-${t}`,value:a.name,onChange:m=>Ee(t,m.target.value),maxLength:xe,placeholder:`${s("Player")} ${t+1}`}),e.jsx("span",{children:`${s("Player")} ${t+1} ${s("Name").toLowerCase()}:`})]}),e.jsxs("small",{children:[a.name.length,"/",xe]})]},a.id))]})]})]}),e.jsx("button",{className:h.big,onClick:he,children:s("StartGame")})]})})}),!D&&e.jsx("section",{className:`card ${h.sectioncard} ${h["scores-wrap"]}`,children:e.jsx("div",{children:e.jsxs("div",{id:"high-scores",children:[e.jsxs("h2",{children:[U>400&&e.jsx(J,{"aria-hidden":"true",style:{transform:"scale(0.8, 0.8)"}}),s("HighScores")," ",U>400&&e.jsx(J,{"aria-hidden":"true",style:{transform:"scale(-0.8, 0.8)"}})]}),e.jsxs("p",{className:"textcenter margin0auto",children:[U>200&&e.jsx("span",{"aria-hidden":"true",children:"— "}),s("FastestTime"),U>200&&e.jsx("span",{"aria-hidden":"true",children:" —"})]}),e.jsx("div",{className:h["high-scores"],children:$a.map(a=>{let t="";return a===B.solo?t=s("Solo"):a===B.duet&&(t=s("Duet")),e.jsxs(l.Fragment,{children:[e.jsxs("h3",{children:[U>200&&e.jsx(J,{"aria-hidden":"true",style:{transform:"scale(0.8)"}}),t,U>200&&e.jsx(J,{"aria-hidden":"true",style:{transform:"scale(-0.8)"}})]}),te&&e.jsxs("p",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),Y&&e.jsxs("p",{children:[Y," — ",s("TryWithADifferentBrowser")]}),Object.keys(V[a]||{}).sort().map(m=>{var u,p;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h4",{children:ue(`${m}`)}),e.jsx("ol",{children:(p=(u=V[a])==null?void 0:u[m])==null?void 0:p.map((x,F)=>e.jsx("li",{children:e.jsxs("div",{children:[e.jsx("span",{children:x.players.map(S=>e.jsxs(l.Fragment,{children:[e.jsxs("span",{children:[S.name," ",x.players.length>1?`: ${S.score}`:""," "]}),g&&g.role&&g.role>1&&e.jsx(Te,{hideBrackets:!0,language:n,id:`edit-${x._id}`,className:"edit",wrapperClass:`${h["edit-wrap"]}`,text:e.jsx(e.Fragment,{children:e.jsx(Me,{"aria-hidden":"true"})}),isOpen:!1,closeClass:h.close,setIsFormOpen:()=>{},tooltip:s("Edit"),y:"above",children:e.jsx("form",{onSubmit:L=>{L.preventDefault();const P=S.name,ne=L.target.name;Fe(P,ne,g==null?void 0:g._id)},children:e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{type:"text",name:"name",required:!0}),e.jsxs("span",{children:[s("NewName")," (",S.name,"):"]})]})})})})]},S.id))}),e.jsxs("span",{className:`flex ${h["time-wrap"]}`,children:[e.jsxs("i",{className:h.time,children:[x.time.toFixed(1),"s"]}),g&&g.role&&g.role>1&&e.jsx(e.Fragment,{children:e.jsxs("button",{type:"button",className:`danger small tooltip-wrap ${h["delete-btn"]}`,onClick:()=>{x._id&&window.confirm(s("DeleteHighScore"))&&$e(x._id).catch(S=>{var L,P;console.error(S),(P=(L=S.response)==null?void 0:L.data)!=null&&P.message?_(G(S.response.data.message,!0,8)):_(G(S.message,!0,5))})},children:[e.jsx("span",{"aria-hidden":"true",children:e.jsx(Be,{"aria-hidden":"true"})}),e.jsx("span",{className:"tooltip above narrow2",children:s("Delete")})]})})]})]})},`${a}-${m}-${F}-${x.time.toFixed(1)}`))})]})},`${a}-${m}`)})]},a)})}),g&&g.role&&g.role>1&&e.jsxs("form",{className:`${h["delete-name-form"]}`,onSubmit:a=>{a.preventDefault(),window.confirm(s("DeletePlayersHighScores"))&&be(f,g==null?void 0:g._id).then(()=>{o("")}).catch(t=>{var m,u;console.error(t),(u=(m=t.response)==null?void 0:m.data)!=null&&u.message?_(G(t.response.data.message,!0,8)):_(G(t.message,!0,5))})},children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{type:"text",name:"name",value:f,required:!0,onChange:a=>o(a.target.value)}),e.jsxs("span",{children:[s("Name")," (",s("Player"),"):"]})]})}),e.jsx("button",{type:"submit",className:"danger",children:s("Delete")})]})]})})}),D&&e.jsx("section",{className:`card ${h.sectioncard} ${h.game}`,children:e.jsx("div",{children:e.jsxs("div",{id:"game",children:[e.jsxs("div",{className:h.header,children:[e.jsxs("div",{children:[s("Time"),": ",e.jsx(ge,{timer:ae})]}),e.jsxs("div",{children:[s("Player"),": ",w[r].name," | ",s("Score"),":"," ",w[r].score]})]}),e.jsx(l.Suspense,{fallback:e.jsxs("div",{className:"flex center margin0auto textcenter",children:[s("Loading"),"..."]}),children:e.jsx(Sa,{language:n,setGameStarted:se,gridSize:b.value,cards:c,cardType:v,flippedCards:d,flippedOverCards:C,matchedCards:N,handleCardClick:He,renderCardContent:Pe})})]})})})]})},Pa=Object.freeze(Object.defineProperty({__proto__:null,default:ba},Symbol.toStringTag,{value:"Module"}));export{H as C,Pa as M,h as s};
