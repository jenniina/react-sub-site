import{j as e,r as j}from"./react-A9DAvxly.js";import{a5 as He,a6 as ke,a7 as me,a8 as Z,a9 as qe,aa as Je,ab as Ve,ac as Ye,ad as Qe,ae as Xe,af as Ze,ag as es,ah as ss,ai as as,aj as ts,ak as rs,al as ns,am as cs,an as is,ao as os,ap as ls,aq as ds,ar as hs,as as ms,at as ps,au as us,av as xs,aw as js,ax as fs,ay as _s,az as bs,aA as vs,aB as ys,aC as $s,aD as gs,aE as Ss,aF as ws,aG as Fs,aH as Es,aI as Ns,aJ as Cs,aK as Hs,aL as ks,aM as Ps,aN as Is,aO as Ts,aP as As,aQ as Ds,aR as Os,aS as Bs,aT as Ls,aU as Ms,aV as Gs,y as zs,aW as Rs,aX as Us}from"./react-icons-BXtkaQB_.js";import{fx as H,fy as de,fz as he,ae as Pe,fA as Ws,fB as ee,fC as q,fD as Ks,fE as oe,K as qs,fF as Js,c$ as Vs,fG as ve,fH as ye,fI as $e,u as le,fJ as Ys,fK as Qs,fL as Xs,fM as Zs,fN as U,fO as ea,fP as J,ag as ge,fQ as Se,W as V,fR as sa,eW as aa,fS as ta,fT as ra,fU as na,fV as ca,fW as ia,fX as oa,fY as la,fZ as da,cz as ha,f_ as ma,dB as we,f$ as pa,g0 as ua,g1 as xa,b9 as ja,be as fa,bf as _a,g2 as ba,g3 as Fe,g4 as va,g5 as ya,cF as $a,bk as ga}from"./index-OV4e8cjy.js";import{a as G}from"./axios-CCb-kr4I.js";import{a as Sa}from"./react-redux-CHm9GgGE.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";const wa="_sectioncard_14ba1_21",Fa="_game_14ba1_53",Ea="_container_14ba1_69",Na="_modal_14ba1_71",Ca="_settings_14ba1_85",Ha="_size8_14ba1_153",ka="_size10_14ba1_155",Pa="_light_14ba1_207",Ia="_grid_14ba1_145",Ta="_card_14ba1_253",Aa="_flipped_14ba1_313",Da="_front_14ba1_313",Oa="_flip_14ba1_313",Ba="_back_14ba1_325",La="_header_14ba1_521",Ma="_time_14ba1_889",Ga="_select_14ba1_993",za="_active_14ba1_1137",Ra="_finish_14ba1_1279",Ua="_close_14ba1_1315",Wa="_big_14ba1_1329",c={"game-container":"_game-container_14ba1_1",sectioncard:wa,game:Fa,container:Ea,modal:Na,settings:Ca,"player-names-wrap":"_player-names-wrap_14ba1_111","grid-wrap":"_grid-wrap_14ba1_145",size8:Ha,size10:ka,light:Pa,grid:Ia,card:Ta,flipped:Aa,front:Da,flip:Oa,back:Ba,"flip-back":"_flip-back_14ba1_1","flipped-over":"_flipped-over_14ba1_337",header:La,"game-over":"_game-over_14ba1_537","high-scores":"_high-scores_14ba1_549","new-score":"_new-score_14ba1_661","title-svg":"_title-svg_14ba1_811","title-icon":"_title-icon_14ba1_819","time-wrap":"_time-wrap_14ba1_889",time:Ma,"delete-btn":"_delete-btn_14ba1_931","delete-name-form":"_delete-name-form_14ba1_939",select:Ga,"player-names":"_player-names_14ba1_111","set-card-type":"_set-card-type_14ba1_1017","set-players":"_set-players_14ba1_1035","set-grid":"_set-grid_14ba1_1037",active:za,"set-handedness":"_set-handedness_14ba1_1151",finish:Ra,"edit-wrap":"_edit-wrap_14ba1_1285",close:Ua,big:Wa},Ka=({option:s,isActive:l,onClick:i})=>{const S=k=>{switch(k){case H.icons:return e.jsx(me,{});case H.numbers:return e.jsx(ke,{});case H.letters:return e.jsx(He,{});default:return null}};return e.jsxs("button",{className:`tooltip-wrap ${l?`${c.active} grayer`:""}`,onClick:i,disabled:l,children:[S(s.value),e.jsx("span",{className:"tooltip above narrow2 space",children:s.label})]})},qa=({option:s,isActive:l,onClick:i})=>e.jsxs("button",{className:`tooltip-wrap ${l?`${c.active} grayer`:""}`,onClick:i,disabled:l,children:[e.jsx("span",{children:s.icon}),e.jsx("span",{className:"tooltip above narrow2 space",children:s.label})]}),Ja=({language:s,value:l,isActive:i,onClick:S})=>e.jsxs("button",{className:`tooltip-wrap ${c["player-button"]} ${i?c.active:""}`,disabled:i,onClick:S,children:[e.jsx("span",{children:l}),e.jsx("span",{className:"tooltip above narrow2",children:Number(l)>1?de[s]:he[s]})]}),Va=({setGameStarted:s,language:l,gridSize:i,cards:S,flippedCards:k,flippedOverCards:F,matchedCards:_,cardType:R,handleCardClick:T,renderCardContent:$})=>{const{windowHeight:D,windowWidth:O}=Pe(),N=`size${i}`;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`${c["grid-wrap"]} ${c[N]}`,children:e.jsx("div",{className:c.grid,style:{gridTemplateColumns:`repeat(${i}, 1fr)`,gridTemplateRows:`repeat(${i}, 1fr)`,"--size":`${D>O?94:85}`,"--amount":`${i}`,"--multiplier":`${D>O?"1vw":"1vh"}`},children:S.map((B,u)=>{const t={"--fontSize":R.value===H.icons?D>O?`${50/i}vw`:`${50/i}vh`:D>O?`${40/i}vw`:`${40/i}vh`};return e.jsxs("div",{style:t,className:`${c.card} ${k.includes(u)||_.includes(u)?c.flipped:""} ${F.includes(u)?c["flipped-over"]:""}`,onClick:()=>T(u),children:[e.jsx("div",{className:c.front,children:$(B)}),e.jsx("div",{className:c.back})]},B.id)})})}),e.jsx("button",{className:c.finish,type:"button",onClick:()=>{s(!1)},children:Ws[l]})]})},Ya=j.memo(Va),Qa=(s,l)=>{const[i,S]=j.useState(0),k=j.useCallback(()=>{S(0)},[]);return j.useEffect(()=>{let F;if(s){S(0);const _=100,R=.1;F=setInterval(()=>{S(T=>{const $=T+R;return parseFloat($.toFixed(1))})},_)}return()=>{F&&clearInterval(F)}},[s,l]),{timer:i,resetTimer:k}},Xa="http://localhost:4000",z=`${Xa}/api/highscores`,Za=async(s,l)=>(await G.post(`${z}/${s}/key/${l.levelKey}`,l)).data,et=async(s,l)=>(await G.get(`${z}/${s}/key/${l}`)).data,st=async s=>(await G.get(`${z}/${s}`)).data,at=async(s,l)=>(await G.delete(`${z}/${s}/id/${l}`)).data,tt=async(s,l,i)=>(await G.put(`${z}/${s}/id/${l._id}?userID=${i}`,l)).data,rt=async(s,l,i)=>(await G.delete(`${z}/${s}/player/${l}?userID=${i}`)).data,nt=async(s,l)=>(await G.post(`${z}/${s}/cleanup/${l}`)).data,ct=async(s,l,i,S)=>(await G.put(`${z}/${s}/player?userID=${S}`,{oldName:l,newName:i})).data,W={addHighScore:Za,getHighScoresByLevel:et,getAllHighScores:st,deleteHighScore:at,updateHighScore:tt,deleteHighScoresByPlayerName:rt,changePlayerName:ct,cleanUpHighScores:nt},Ee=localStorage.getItem("AppLanguage"),y=Ee?Ee.replace(/"/g,""):"en",it=()=>{const[s,l]=j.useState({}),[i,S]=j.useState(!0),[k,F]=j.useState(null);j.useEffect(()=>{(async()=>{try{const d=await W.getAllHighScores(y),t={};d.forEach(r=>{const[n,...v]=r.levelKey.split("_"),h=v.join("_");t[n]||(t[n]={}),t[n][h]||(t[n][h]=[]),t[n][h].push(r)}),Object.keys(t).forEach(r=>{Object.keys(t[r]).forEach(n=>{t[r][n]=t[r][n].sort((v,h)=>v.time-h.time).slice(0,5)})}),l(t)}catch(d){console.error(ee[y],d),F(ee[y])}finally{S(!1)}})()},[y]);const _=async u=>{try{const d=await W.addHighScore(y,u);if(d.highScore){const[t,...r]=d.highScore.levelKey.split("_"),n=r.join("_");return l(v=>{const h={...v};h[t]||(h[t]={}),h[t][n]||(h[t][n]=[]);const b=h[t][n]||[],P=b.findIndex(C=>{var A;return C._id===((A=d.highScore)==null?void 0:A._id)});let w;return P!==-1?(w=[...b],d.highScore&&(w[P]=d.highScore)):d.highScore?w=[...b,d.highScore]:w=[...b],w=w.sort((C,A)=>C.time-A.time).slice(0,5),h[t][n]=w,h}),await N(),d.highScore}else return}catch{F("Failed to add high score.");return}},R=async u=>{try{const d=await W.getHighScoresByLevel(y,u);return d.sort((t,r)=>t.time-r.time),d.slice(0,5)}catch(d){return console.error(ee[y],d),F(ee[y]),[]}},T=async u=>{try{const d=await W.deleteHighScore(y,u);d.success?l(t=>{const r={};return Object.keys(t).forEach(n=>{r[n]={...t[n]},Object.keys(r[n]).forEach(v=>{r[n][v]=r[n][v].filter(h=>h._id!==u)})}),r}):console.error(q[y],d.message)}catch(d){console.error(q[y],d),F(q[y])}},$=async(u,d)=>{try{const t=await W.updateHighScore(y,u,d);if(t.success&&t.highScore){const r=t.highScore,[n,...v]=r.levelKey.split("_"),h=v.join("_");l(b=>{b[n]||(b[n]={}),b[n][h]||(b[n][h]=[]);const P=b[n][h]||[],w=P.findIndex(C=>C._id===r._id);if(w!==-1){const C=[...P];C[w]=r;const A=C.sort((se,Y)=>se.time-Y.time).slice(0,5);return{...b,[n]:{...b[n],[h]:A}}}return b}),console.log(Ks[y])}else console.error(oe[y],t.message)}catch(t){console.error(oe[y],t),F(oe[y])}},D=async(u,d)=>{try{const t=await W.deleteHighScoresByPlayerName(y,u,d);t.success?l(r=>{const n={};return Object.keys(r).forEach(v=>{n[v]={},Object.keys(r[v]).forEach(h=>{n[v][h]=r[v][h].filter(b=>!b.players.some(P=>P.name===u))})}),n}):console.error(q[y],t.message)}catch(t){console.error(q[y],t),F(q[y])}},O=u=>{const t=[...u.players].sort((r,n)=>r.name.localeCompare(n.name)).map(r=>`${r.name}:${r.score}`).join("-");return`${u.levelKey}_${u.time}-${t}`},N=async()=>{const u=Object.values(s).flatMap(t=>Object.values(t)).flat(),d={};u.forEach(t=>{const r=O(t);d[r]||(d[r]=[]),d[r].push(t)});for(const t in d){const r=d[t];if(r.length>1){r.sort((h,b)=>new Date(b.createdAt??0).getTime()-new Date(h.createdAt??0).getTime());const[n,...v]=r;for(const h of v)h._id&&await T(h._id)}}};return{highScores:s,addHighScore:_,getHighScoresByLevel:R,deleteHighScore:T,updateHighScore:$,deleteHighScoresByPlayerName:D,changePlayerName:async(u,d,t)=>{try{await W.changePlayerName(y,u,d,t),l(r=>{const n={};return Object.keys(r).forEach(v=>{n[v]={},Object.keys(r[v]).forEach(h=>{n[v][h]=r[v][h].map(b=>{const P=b.players.map(w=>w.name===u?{...w,name:d}:w);return{...b,players:P}})})}),n})}catch(r){console.error("Failed to change player name.",r)}},loading:i,error:k}},Ne=j.memo(({timer:s})=>e.jsxs("span",{children:[s.toFixed(1),"s"]})),Ce=[e.jsx(Ve,{}),e.jsx(Ye,{}),e.jsx(Qe,{}),e.jsx(Xe,{}),e.jsx(Ze,{}),e.jsx(es,{}),e.jsx(ss,{}),e.jsx(as,{}),e.jsx(ts,{}),e.jsx(rs,{}),e.jsx(ns,{}),e.jsx(cs,{}),e.jsx(is,{}),e.jsx(os,{}),e.jsx(ls,{}),e.jsx(ds,{}),e.jsx(hs,{}),e.jsx(ms,{}),e.jsx(ps,{}),e.jsx(us,{}),e.jsx(xs,{}),e.jsx(js,{}),e.jsx(fs,{}),e.jsx(_s,{}),e.jsx(bs,{}),e.jsx(me,{}),e.jsx(vs,{}),e.jsx(ys,{}),e.jsx($s,{}),e.jsx(gs,{}),e.jsx(Ss,{}),e.jsx(ws,{}),e.jsx(Fs,{}),e.jsx(Es,{}),e.jsx(Ns,{}),e.jsx(Cs,{}),e.jsx(Hs,{}),e.jsx(ks,{}),e.jsx(Ps,{}),e.jsx(Is,{}),e.jsx(Ts,{}),e.jsx(As,{}),e.jsx(Ds,{}),e.jsx(Os,{}),e.jsx(Bs,{}),e.jsx(Ls,{}),e.jsx(Ms,{}),e.jsx(Gs,{}),e.jsx(zs,{}),e.jsx(Rs,{}),e.jsx(Us,{})],ot=["solo","duet"],Nt=({language:s})=>{const l=qs(),i=Sa(a=>{var o;return(o=a.auth)==null?void 0:o.user}),{show:S}=Js(),k=Vs();j.useEffect(()=>{},[]);const F=[{value:H.icons,label:ve[s]},{value:H.numbers,label:ye[s]},{value:H.letters,label:$e[s]}],[_,R]=le("memoryCardType",F[0]),T=[{value:4,icon:"4 × 4",label:`${Ys[s]}`},{value:6,icon:"6 × 6",label:`${Qs[s]}`},{value:8,icon:"8 × 8",label:`${Xs[s]}`},{value:10,icon:"10 × 10",label:`${Zs[s]}`}],[$,D]=le("memoryGrid",T[1]),O=[1,2],[N,B]=le("memoryPlayers",[{id:1,name:`${U[s]} 1`,score:0}]),[u,d]=j.useState(""),[t,r]=j.useState(0),[n,v]=j.useState([]),[h,b]=j.useState([]),[P,w]=j.useState([]),[C,A]=j.useState([]),[se,Y]=j.useState(!1),[L,ae]=j.useState(!1),[Ie,pe]=j.useState(!1),{timer:te,resetTimer:Te}=Qa(Ie,"1ms"),{highScores:Q,addHighScore:Ae,deleteHighScore:De,updateHighScore:lt,deleteHighScoresByPlayerName:Oe,changePlayerName:Be,loading:re,error:X}=it(),[Le,ue]=j.useState(!1),[ne,Me]=j.useState(!1),[xe,Ge]=j.useState(null),{windowWidth:K}=Pe(),je=()=>{let a=[];const o=$?Number($.value)*Number($.value)/2:0;if((_==null?void 0:_.value)===H.letters){const p=Array.from({length:o},(f,x)=>{const E=65+x%26;return Math.floor(x/26)%2===0?String.fromCharCode(E):String.fromCharCode(E+32)});a=[...p,...p]}else if((_==null?void 0:_.value)===H.numbers){const p=Array.from({length:o},(f,x)=>x.toString());a=[...p,...p]}else if((_==null?void 0:_.value)===H.icons){const f=[...Ce].sort(()=>Math.random()-.5).slice(0,o);a=[...f,...f]}const m=a.map((p,f)=>({value:p,id:f})).sort(()=>Math.random()-.5).slice(0,$?Number($.value)*Number($.value):0);v(m),b([]),A([]),ae(!0),pe(!0),Te(),B(p=>p.map(f=>({...f,score:0}))),r(0),ue(!1)},fe=(a,o,m)=>`${m}_${a}x${a}_${o}`,ze=async()=>{ue(!0),ae(!1);const a=N.length===1?"solo":"duet",m={levelKey:fe(Number($.value),_.value,a),time:te,players:N,size:Number($.value),type:_.value},p=await Ae(m);p&&(Ge(p._id||null),Me(!0)),w([])};j.useEffect(()=>{if(ne){const a=N.length===1?"solo":"duet",o=fe(Number($.value),_.value,a);setTimeout(()=>{const[m,...p]=o.split("_");p.join("_"),S({children:e.jsxs("div",{id:"high-scores",className:`${c.modal} ${k?c.light:""}`,children:[e.jsx("h3",{children:ea[s]}),e.jsx("div",{className:`${c["high-scores"]}`,children:(()=>{const f=N.length===1?J.solo:J.duet;let x="";return f===J.solo?x=he[s]:f===J.duet&&(x=de[s]),e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:x},f),re&&e.jsxs("p",{children:[ge[s],"..."]}),X&&e.jsxs("p",{children:[X," — ",Se[s]]}),Object.keys(Q[f]||{}).sort().map(E=>{var g,M;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h5",{children:_e(`${E}`)}),e.jsx("ol",{children:(M=(g=Q[f])==null?void 0:g[E])==null?void 0:M.map((I,ce)=>e.jsx("li",{className:I._id===xe?c["new-score"]:"",children:e.jsxs("div",{children:[e.jsx("span",{children:I.players.map(ie=>e.jsxs("span",{children:[ie.name,": ",ie.score," "]},ie.id))}),e.jsxs("i",{className:c.time,children:[I.time.toFixed(1),"s"]})]})},I._id||`${ce}-${I.time.toFixed(1)}`))})]})},`${f}-${E}`)})]})})()})]})})},0)}else ne||V(sa[s],!1,5)},[Q,ne,xe,re,X]);const Re=a=>{if(!(se||h.includes(a)||C.includes(a))&&(b(o=>[...o,a]),h.length===1)){Y(!0);const o=h[0],m=a,p=n[o],f=n[m];p.value===f.value?(A(x=>[...x,o,m]),B(x=>x.map((E,g)=>g===t?{...E,score:E.score+1}:E)),b([]),Y(!1)):setTimeout(()=>{b([]),w(x=>[...x,o,m]),Y(!1),r(x=>(x+1)%N.length)},800)}};j.useEffect(()=>{L&&C.length===n.length&&n.length>0&&!Le&&(pe(!1),setTimeout(()=>{ze()},1e3))},[L,C,n]);const Ue=a=>(_==null?void 0:_.value)===H.icons?a.value:e.jsx("span",{children:a.value}),We=(a,o)=>{if(/[^\p{L}0-9 ]/gu.test(o)){l(V(ga[s],!0,5));return}const f=o.replace(/[^\p{L}0-9 ]/gu,"").trim();B(x=>x.map((E,g)=>g===a?{...E,name:f||`${U[s]} ${g+1}`}:E))},Ke=a=>{B(o=>Array.from({length:a},(p,f)=>{const x=o[f];return x?{...x,id:f+1}:{id:f+1,name:`${U[s]} ${f+1}`,score:0}})),r(0)};j.useEffect(()=>{const a=Ce.map(m=>m.type.displayName||m.type.name),o=a.filter((m,p)=>a.indexOf(m)!==p);o.length>0&&console.log("Duplicate Icons Found:",o)},[]);const _e=a=>{const o=a.split("_");let m="",p=e.jsx(e.Fragment,{});return o[1]===H.numbers?(p=e.jsx("span",{className:c["title-svg"],children:e.jsx(ke,{"aria-hidden":"true"})}),m=ye[s]):o[1]===H.letters?(p=e.jsx("span",{className:c["title-svg"],children:e.jsx(He,{"aria-hidden":"true"})}),m=$e[s]):o[1]===H.icons&&(p=e.jsx("span",{className:c["title-icon"],children:e.jsx(me,{"aria-hidden":"true"})}),m=ve[s]),e.jsxs(e.Fragment,{children:[o[0]," ",p," ",e.jsx("br",{}),m]})};j.useEffect(()=>{L&&aa("game")},[L]);const be=15;return e.jsxs("div",{id:c["game-container"],className:`${c.container} ${k?c.light:""}`,children:[!L&&C.length===n.length&&n.length>0&&e.jsx("section",{className:`card ${c.sectioncard}`,children:e.jsx("div",{children:e.jsxs("div",{className:c["game-over"],children:[e.jsx("h2",{children:ta[s]}),e.jsxs("p",{children:[ra[s],": ",e.jsx(Ne,{timer:te})]}),e.jsxs("div",{children:[e.jsxs("h3",{children:[na[s],":"]}),N.map(a=>e.jsxs("p",{children:[a.name,": ",a.score]},a.id))]}),e.jsx("button",{onClick:je,children:ca[s]})]})})}),!L&&e.jsx("section",{className:`card ${c.sectioncard}`,children:e.jsx("div",{children:e.jsxs("div",{id:"settings",className:c.settings,children:[e.jsx("h2",{className:"scr",children:ia[s]}),e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("h3",{children:oa[s]}),e.jsx("div",{className:c["set-card-type"],children:F.map(a=>e.jsx(Ka,{option:a,isActive:(_==null?void 0:_.value)===a.value,onClick:()=>R(a)},a.value))})]}),e.jsxs("div",{children:[e.jsx("h3",{children:la[s]}),e.jsx("div",{className:c["set-grid"],children:T.map(a=>e.jsx(qa,{option:a,isActive:($==null?void 0:$.value)===a.value,onClick:()=>D(a)},a.value))})]}),e.jsxs("div",{className:c["player-names-wrap"],children:[e.jsx("h3",{children:da[s]}),e.jsx("div",{className:c["set-players"],children:e.jsx(e.Fragment,{children:O.map(a=>e.jsx(Ja,{language:s,value:a,isActive:N.length===a,onClick:()=>Ke(a)},a))})}),e.jsxs("div",{className:c["player-names"],children:[e.jsxs("small",{children:[ha[s],"."," ",ma[s]]}),N.map((a,o)=>e.jsxs("div",{className:"input-wrap",children:[e.jsxs("label",{children:[e.jsx("input",{type:"text",name:`player-${o}`,value:a.name,onChange:m=>We(o,m.target.value),maxLength:be,placeholder:`${U[s]} ${o+1}`}),e.jsx("span",{children:`${U[s]} ${o+1} ${we[s].toLowerCase()}:`})]}),e.jsxs("small",{children:[a.name.length,"/",be]})]},a.id))]})]})]}),e.jsx("button",{className:c.big,onClick:je,children:pa[s]})]})})}),!L&&e.jsx("section",{className:`card ${c.sectioncard} ${c["scores-wrap"]}`,children:e.jsx("div",{children:e.jsxs("div",{id:"high-scores",children:[e.jsxs("h2",{children:[K>400&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(0.8, 0.8)"}}),ua[s]," ",K>400&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(-0.8, 0.8)"}})]}),e.jsxs("p",{className:"textcenter margin0auto",children:[K>200&&e.jsx("span",{"aria-hidden":"true",children:"— "}),xa[s],K>200&&e.jsx("span",{"aria-hidden":"true",children:" —"})]}),e.jsx("div",{className:c["high-scores"],children:ot.map(a=>{let o="";return a===J.solo?o=he[s]:a===J.duet&&(o=de[s]),e.jsxs(j.Fragment,{children:[e.jsxs("h3",{children:[K>200&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(0.8)"}}),o,K>200&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(-0.8)"}})]}),re&&e.jsxs("p",{children:[ge[s],"..."]}),X&&e.jsxs("p",{children:[X," — ",Se[s]]}),Object.keys(Q[a]||{}).sort().map(m=>{var p,f;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h4",{children:_e(`${m}`)}),e.jsx("ol",{children:(f=(p=Q[a])==null?void 0:p[m])==null?void 0:f.map((x,E)=>e.jsx("li",{children:e.jsxs("div",{children:[e.jsx("span",{children:x.players.map(g=>e.jsxs(j.Fragment,{children:[e.jsxs("span",{children:[g.name," ",x.players.length>1?`: ${g.score}`:""," "]}),i&&i.role&&i.role>1&&e.jsx(ja,{hideBrackets:!0,language:s,id:`edit-${x._id}`,className:"edit",wrapperClass:`${c["edit-wrap"]}`,text:e.jsx(e.Fragment,{children:e.jsx(qe,{"aria-hidden":"true"})}),isOpen:!1,closeClass:c.close,setIsFormOpen:()=>{},tooltip:fa[s],y:"above",children:e.jsx("form",{onSubmit:M=>{M.preventDefault();const I=g.name,ce=M.target.name;Be(I,ce,i==null?void 0:i._id)},children:e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{type:"text",name:"name",required:!0}),e.jsxs("span",{children:[_a[s]," (",g.name,"):"]})]})})})})]},g.id))}),e.jsxs("span",{className:`flex ${c["time-wrap"]}`,children:[e.jsxs("i",{className:c.time,children:[x.time.toFixed(1),"s"]}),i&&i.role&&i.role>1&&e.jsx(e.Fragment,{children:e.jsxs("button",{type:"button",className:`danger small tooltip-wrap ${c["delete-btn"]}`,onClick:()=>{x._id&&window.confirm(ba[s])&&De(x._id).catch(g=>{var M,I;console.error(g),(I=(M=g.response)==null?void 0:M.data)!=null&&I.message?l(V(g.response.data.message,!0,8)):l(V(g.message,!0,5))})},children:[e.jsx("span",{"aria-hidden":"true",children:e.jsx(Je,{"aria-hidden":"true"})}),e.jsx("span",{className:"tooltip above narrow2",children:Fe[s]})]})})]})]})},`${a}-${m}-${E}-${x.time.toFixed(1)}`))})]})},`${a}-${m}`)})]},a)})}),i&&i.role&&i.role>1&&e.jsxs("form",{className:`${c["delete-name-form"]}`,onSubmit:a=>{a.preventDefault(),window.confirm(va[s])&&Oe(u,i==null?void 0:i._id).then(()=>{d("")}).catch(o=>{var m,p;console.error(o),(p=(m=o.response)==null?void 0:m.data)!=null&&p.message?l(V(o.response.data.message,!0,8)):l(V(o.message,!0,5))})},children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{type:"text",name:"name",value:u,required:!0,onChange:a=>d(a.target.value)}),e.jsxs("span",{children:[we[s]," (",U[s],"):"]})]})}),e.jsx("button",{type:"submit",className:"danger",children:Fe[s]})]})]})})}),L&&e.jsx("section",{className:`card ${c.sectioncard} ${c.game}`,children:e.jsx("div",{children:e.jsxs("div",{id:"game",children:[e.jsxs("div",{className:c.header,children:[e.jsxs("div",{children:[ya[s],": ",e.jsx(Ne,{timer:te})]}),e.jsxs("div",{children:[U[s],": ",N[t].name," | ",$a[s],":"," ",N[t].score]})]}),e.jsx(Ya,{language:s,setGameStarted:ae,gridSize:$.value,cards:n,cardType:_,flippedCards:h,flippedOverCards:P,matchedCards:C,handleCardClick:Re,renderCardContent:Ue})]})})})]})};export{Nt as default};