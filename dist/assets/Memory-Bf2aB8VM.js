import{j as e,r as j}from"./react-A9DAvxly.js";import{a5 as He,a6 as ke,a7 as de,a8 as Z,a9 as qe,aa as Je,ab as Ve,ac as Ye,ad as Qe,ae as Xe,af as Ze,ag as es,ah as ss,ai as as,aj as ts,ak as rs,al as cs,am as ns,an as is,ao as os,ap as ls,aq as ds,ar as hs,as as ms,at as ps,au as us,av as xs,aw as js,ax as fs,ay as vs,az as _s,aA as gs,aB as ys,aC as $s,aD as Ss,aE as bs,aF as Fs,aG as ws,aH as Es,aI as Ns,aJ as Cs,aK as Hs,aL as ks,aM as Ps,aN as Is,aO as Ts,aP as As,aQ as Ds,aR as Os,aS as Bs,aT as Ls,aU as Ms,aV as zs,z as Gs,aW as Rs,aX as Us}from"./react-icons-8b918X3F.js";import{fw as H,ae as Pe,fx as Ws,fy as ee,fz as q,fA as Ks,fB as oe,K as qs,fC as Js,c$ as Vs,fD as ve,fE as _e,fF as ge,u as le,fG as Ys,fH as Qs,fI as Xs,fJ as Zs,fK as U,fL as ea,fM as J,fN as ye,fO as $e,ag as Se,fP as be,W as V,fQ as sa,eW as aa,fR as ta,fS as ra,fT as ca,fU as na,fV as ia,fW as oa,fX as la,fY as da,cz as ha,fZ as ma,dB as Fe,f_ as pa,f$ as ua,g0 as xa,b9 as ja,be as fa,bf as va,g1 as _a,g2 as we,g3 as ga,g4 as ya,cF as $a,bk as Sa}from"./index-NVZRrT9I.js";import{a as z}from"./axios-CCb-kr4I.js";import{a as ba}from"./react-redux-CHm9GgGE.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";const Fa="_sectioncard_cgrcv_21",wa="_game_cgrcv_39",Ea="_container_cgrcv_55",Na="_modal_cgrcv_57",Ca="_settings_cgrcv_71",Ha="_size8_cgrcv_139",ka="_size10_cgrcv_141",Pa="_light_cgrcv_193",Ia="_grid_cgrcv_131",Ta="_card_cgrcv_239",Aa="_flipped_cgrcv_299",Da="_front_cgrcv_299",Oa="_flip_cgrcv_299",Ba="_back_cgrcv_311",La="_header_cgrcv_507",Ma="_time_cgrcv_859",za="_select_cgrcv_963",Ga="_active_cgrcv_1063",Ra="_finish_cgrcv_1153",Ua="_close_cgrcv_1189",Wa="_big_cgrcv_1203",n={"game-container":"_game-container_cgrcv_1",sectioncard:Fa,game:wa,container:Ea,modal:Na,settings:Ca,"player-names-wrap":"_player-names-wrap_cgrcv_97","grid-wrap":"_grid-wrap_cgrcv_131",size8:Ha,size10:ka,light:Pa,grid:Ia,card:Ta,flipped:Aa,front:Da,flip:Oa,back:Ba,"flip-back":"_flip-back_cgrcv_1","flipped-over":"_flipped-over_cgrcv_323",header:La,"game-over":"_game-over_cgrcv_523","high-scores":"_high-scores_cgrcv_535","new-score":"_new-score_cgrcv_647","title-svg":"_title-svg_cgrcv_781","title-icon":"_title-icon_cgrcv_789","time-wrap":"_time-wrap_cgrcv_859",time:Ma,"delete-btn":"_delete-btn_cgrcv_901","delete-name-form":"_delete-name-form_cgrcv_909",select:za,"player-names":"_player-names_cgrcv_97","set-card-type":"_set-card-type_cgrcv_987","set-grid":"_set-grid_cgrcv_1029",active:Ga,"set-players":"_set-players_cgrcv_1065","set-handedness":"_set-handedness_cgrcv_1075",finish:Ra,"edit-wrap":"_edit-wrap_cgrcv_1159",close:Ua,big:Wa},Ka=({option:s,isActive:l,onClick:i})=>{const F=k=>{switch(k){case H.icons:return e.jsx(de,{});case H.numbers:return e.jsx(ke,{});case H.letters:return e.jsx(He,{});default:return null}};return e.jsxs("button",{className:`tooltip-wrap ${l?`${n.active} grayer`:""}`,onClick:i,disabled:l,children:[F(s.value),e.jsx("span",{className:"tooltip above narrow2 space",children:s.label})]})},qa=({option:s,isActive:l,onClick:i})=>e.jsxs("button",{className:`tooltip-wrap ${l?`${n.active} grayer`:""}`,onClick:i,disabled:l,children:[e.jsx("span",{children:s.icon}),e.jsx("span",{className:"tooltip above narrow2 space",children:s.label})]}),Ja=({value:s,isActive:l,onClick:i})=>e.jsx("button",{className:`${n["player-button"]} ${l?n.active:""}`,disabled:l,onClick:i,children:s}),Va=({setGameStarted:s,language:l,gridSize:i,cards:F,flippedCards:k,flippedOverCards:w,matchedCards:v,cardType:R,handleCardClick:T,renderCardContent:$})=>{const{windowHeight:D,windowWidth:O}=Pe(),N=`size${i}`;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`${n["grid-wrap"]} ${n[N]}`,children:e.jsx("div",{className:n.grid,style:{gridTemplateColumns:`repeat(${i}, 1fr)`,gridTemplateRows:`repeat(${i}, 1fr)`,"--size":`${D>O?94:85}`,"--amount":`${i}`,"--multiplier":`${D>O?"1vw":"1vh"}`},children:F.map((B,u)=>{const t={"--fontSize":R.value===H.icons?D>O?`${50/i}vw`:`${50/i}vh`:D>O?`${40/i}vw`:`${40/i}vh`};return e.jsxs("div",{style:t,className:`${n.card} ${k.includes(u)||v.includes(u)?n.flipped:""} ${w.includes(u)?n["flipped-over"]:""}`,onClick:()=>T(u),children:[e.jsx("div",{className:n.front,children:$(B)}),e.jsx("div",{className:n.back})]},B.id)})})}),e.jsx("button",{className:n.finish,type:"button",onClick:()=>{s(!1)},children:Ws[l]})]})},Ya=j.memo(Va),Qa=(s,l)=>{const[i,F]=j.useState(0),k=j.useCallback(()=>{F(0)},[]);return j.useEffect(()=>{let w;if(s){F(0);const v=100,R=.1;w=setInterval(()=>{F(T=>{const $=T+R;return parseFloat($.toFixed(1))})},v)}return()=>{w&&clearInterval(w)}},[s,l]),{timer:i,resetTimer:k}},Xa="http://localhost:4000",G=`${Xa}/api/highscores`,Za=async(s,l)=>(await z.post(`${G}/${s}/key/${l.levelKey}`,l)).data,et=async(s,l)=>(await z.get(`${G}/${s}/key/${l}`)).data,st=async s=>(await z.get(`${G}/${s}`)).data,at=async(s,l)=>(await z.delete(`${G}/${s}/id/${l}`)).data,tt=async(s,l,i)=>(await z.put(`${G}/${s}/id/${l._id}?userID=${i}`,l)).data,rt=async(s,l,i)=>(await z.delete(`${G}/${s}/player/${l}?userID=${i}`)).data,ct=async(s,l)=>(await z.post(`${G}/${s}/cleanup/${l}`)).data,nt=async(s,l,i,F)=>(await z.put(`${G}/${s}/player?userID=${F}`,{oldName:l,newName:i})).data,W={addHighScore:Za,getHighScoresByLevel:et,getAllHighScores:st,deleteHighScore:at,updateHighScore:tt,deleteHighScoresByPlayerName:rt,changePlayerName:nt,cleanUpHighScores:ct},Ee=localStorage.getItem("AppLanguage"),y=Ee?Ee.replace(/"/g,""):"en",it=()=>{const[s,l]=j.useState({}),[i,F]=j.useState(!0),[k,w]=j.useState(null);j.useEffect(()=>{(async()=>{try{const d=await W.getAllHighScores(y),t={};d.forEach(r=>{const[c,...g]=r.levelKey.split("_"),h=g.join("_");t[c]||(t[c]={}),t[c][h]||(t[c][h]=[]),t[c][h].push(r)}),Object.keys(t).forEach(r=>{Object.keys(t[r]).forEach(c=>{t[r][c]=t[r][c].sort((g,h)=>g.time-h.time).slice(0,5)})}),l(t)}catch(d){console.error(ee[y],d),w(ee[y])}finally{F(!1)}})()},[y]);const v=async u=>{try{const d=await W.addHighScore(y,u);if(d.highScore){const[t,...r]=d.highScore.levelKey.split("_"),c=r.join("_");return l(g=>{const h={...g};h[t]||(h[t]={}),h[t][c]||(h[t][c]=[]);const _=h[t][c]||[],P=_.findIndex(C=>{var A;return C._id===((A=d.highScore)==null?void 0:A._id)});let b;return P!==-1?(b=[..._],d.highScore&&(b[P]=d.highScore)):d.highScore?b=[..._,d.highScore]:b=[..._],b=b.sort((C,A)=>C.time-A.time).slice(0,5),h[t][c]=b,h}),await N(),d.highScore}else return}catch{w("Failed to add high score.");return}},R=async u=>{try{const d=await W.getHighScoresByLevel(y,u);return d.sort((t,r)=>t.time-r.time),d.slice(0,5)}catch(d){return console.error(ee[y],d),w(ee[y]),[]}},T=async u=>{try{const d=await W.deleteHighScore(y,u);d.success?l(t=>{const r={};return Object.keys(t).forEach(c=>{r[c]={...t[c]},Object.keys(r[c]).forEach(g=>{r[c][g]=r[c][g].filter(h=>h._id!==u)})}),r}):console.error(q[y],d.message)}catch(d){console.error(q[y],d),w(q[y])}},$=async(u,d)=>{try{const t=await W.updateHighScore(y,u,d);if(t.success&&t.highScore){const r=t.highScore,[c,...g]=r.levelKey.split("_"),h=g.join("_");l(_=>{_[c]||(_[c]={}),_[c][h]||(_[c][h]=[]);const P=_[c][h]||[],b=P.findIndex(C=>C._id===r._id);if(b!==-1){const C=[...P];C[b]=r;const A=C.sort((se,Y)=>se.time-Y.time).slice(0,5);return{..._,[c]:{..._[c],[h]:A}}}return _}),console.log(Ks[y])}else console.error(oe[y],t.message)}catch(t){console.error(oe[y],t),w(oe[y])}},D=async(u,d)=>{try{const t=await W.deleteHighScoresByPlayerName(y,u,d);t.success?l(r=>{const c={};return Object.keys(r).forEach(g=>{c[g]={},Object.keys(r[g]).forEach(h=>{c[g][h]=r[g][h].filter(_=>!_.players.some(P=>P.name===u))})}),c}):console.error(q[y],t.message)}catch(t){console.error(q[y],t),w(q[y])}},O=u=>{const t=[...u.players].sort((r,c)=>r.name.localeCompare(c.name)).map(r=>`${r.name}:${r.score}`).join("-");return`${u.levelKey}_${u.time}-${t}`},N=async()=>{const u=Object.values(s).flatMap(t=>Object.values(t)).flat(),d={};u.forEach(t=>{const r=O(t);d[r]||(d[r]=[]),d[r].push(t)});for(const t in d){const r=d[t];if(r.length>1){r.sort((h,_)=>new Date(_.createdAt??0).getTime()-new Date(h.createdAt??0).getTime());const[c,...g]=r;for(const h of g)h._id&&await T(h._id)}}};return{highScores:s,addHighScore:v,getHighScoresByLevel:R,deleteHighScore:T,updateHighScore:$,deleteHighScoresByPlayerName:D,changePlayerName:async(u,d,t)=>{try{await W.changePlayerName(y,u,d,t),l(r=>{const c={};return Object.keys(r).forEach(g=>{c[g]={},Object.keys(r[g]).forEach(h=>{c[g][h]=r[g][h].map(_=>{const P=_.players.map(b=>b.name===u?{...b,name:d}:b);return{..._,players:P}})})}),c})}catch(r){console.error("Failed to change player name.",r)}},loading:i,error:k}},Ne=j.memo(({timer:s})=>e.jsxs("span",{children:[s.toFixed(1),"s"]})),Ce=[e.jsx(Ve,{}),e.jsx(Ye,{}),e.jsx(Qe,{}),e.jsx(Xe,{}),e.jsx(Ze,{}),e.jsx(es,{}),e.jsx(ss,{}),e.jsx(as,{}),e.jsx(ts,{}),e.jsx(rs,{}),e.jsx(cs,{}),e.jsx(ns,{}),e.jsx(is,{}),e.jsx(os,{}),e.jsx(ls,{}),e.jsx(ds,{}),e.jsx(hs,{}),e.jsx(ms,{}),e.jsx(ps,{}),e.jsx(us,{}),e.jsx(xs,{}),e.jsx(js,{}),e.jsx(fs,{}),e.jsx(vs,{}),e.jsx(_s,{}),e.jsx(de,{}),e.jsx(gs,{}),e.jsx(ys,{}),e.jsx($s,{}),e.jsx(Ss,{}),e.jsx(bs,{}),e.jsx(Fs,{}),e.jsx(ws,{}),e.jsx(Es,{}),e.jsx(Ns,{}),e.jsx(Cs,{}),e.jsx(Hs,{}),e.jsx(ks,{}),e.jsx(Ps,{}),e.jsx(Is,{}),e.jsx(Ts,{}),e.jsx(As,{}),e.jsx(Ds,{}),e.jsx(Os,{}),e.jsx(Bs,{}),e.jsx(Ls,{}),e.jsx(Ms,{}),e.jsx(zs,{}),e.jsx(Gs,{}),e.jsx(Rs,{}),e.jsx(Us,{})],ot=["solo","duet"],Nt=({language:s})=>{const l=qs(),i=ba(a=>{var o;return(o=a.auth)==null?void 0:o.user}),{show:F}=Js(),k=Vs();j.useEffect(()=>{},[]);const w=[{value:H.icons,label:ve[s]},{value:H.numbers,label:_e[s]},{value:H.letters,label:ge[s]}],[v,R]=le("memoryCardType",w[0]),T=[{value:4,icon:"4 × 4",label:`${Ys[s]}`},{value:6,icon:"6 × 6",label:`${Qs[s]}`},{value:8,icon:"8 × 8",label:`${Xs[s]}`},{value:10,icon:"10 × 10",label:`${Zs[s]}`}],[$,D]=le("memoryGrid",T[1]),O=[1,2],[N,B]=le("memoryPlayers",[{id:1,name:`${U[s]} 1`,score:0}]),[u,d]=j.useState(""),[t,r]=j.useState(0),[c,g]=j.useState([]),[h,_]=j.useState([]),[P,b]=j.useState([]),[C,A]=j.useState([]),[se,Y]=j.useState(!1),[L,ae]=j.useState(!1),[Ie,he]=j.useState(!1),{timer:te,resetTimer:Te}=Qa(Ie,"1ms"),{highScores:Q,addHighScore:Ae,deleteHighScore:De,updateHighScore:lt,deleteHighScoresByPlayerName:Oe,changePlayerName:Be,loading:re,error:X}=it(),[Le,me]=j.useState(!1),[ce,Me]=j.useState(!1),[pe,ze]=j.useState(null),{windowWidth:K}=Pe(),ue=()=>{let a=[];const o=$?Number($.value)*Number($.value)/2:0;if((v==null?void 0:v.value)===H.letters){const p=Array.from({length:o},(f,x)=>{const E=65+x%26;return Math.floor(x/26)%2===0?String.fromCharCode(E):String.fromCharCode(E+32)});a=[...p,...p]}else if((v==null?void 0:v.value)===H.numbers){const p=Array.from({length:o},(f,x)=>x.toString());a=[...p,...p]}else if((v==null?void 0:v.value)===H.icons){const f=[...Ce].sort(()=>Math.random()-.5).slice(0,o);a=[...f,...f]}const m=a.map((p,f)=>({value:p,id:f})).sort(()=>Math.random()-.5).slice(0,$?Number($.value)*Number($.value):0);g(m),_([]),A([]),ae(!0),he(!0),Te(),B(p=>p.map(f=>({...f,score:0}))),r(0),me(!1)},xe=(a,o,m)=>`${m}_${a}x${a}_${o}`,Ge=async()=>{me(!0),ae(!1);const a=N.length===1?"solo":"duet",m={levelKey:xe(Number($.value),v.value,a),time:te,players:N,size:Number($.value),type:v.value},p=await Ae(m);p&&(ze(p._id||null),Me(!0)),b([])};j.useEffect(()=>{if(ce){const a=N.length===1?"solo":"duet",o=xe(Number($.value),v.value,a);setTimeout(()=>{const[m,...p]=o.split("_");p.join("_"),F({children:e.jsxs("div",{id:"high-scores",className:`${n.modal} ${k?n.light:""}`,children:[e.jsx("h3",{children:ea[s]}),e.jsx("div",{className:`${n["high-scores"]}`,children:(()=>{const f=N.length===1?J.solo:J.duet;let x="";return f===J.solo?x=ye[s]:f===J.duet&&(x=$e[s]),e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:x},f),re&&e.jsxs("p",{children:[Se[s],"..."]}),X&&e.jsxs("p",{children:[X," — ",be[s]]}),Object.keys(Q[f]||{}).sort().map(E=>{var S,M;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h5",{children:je(`${E}`)}),e.jsx("ol",{children:(M=(S=Q[f])==null?void 0:S[E])==null?void 0:M.map((I,ne)=>e.jsx("li",{className:I._id===pe?n["new-score"]:"",children:e.jsxs("div",{children:[e.jsx("span",{children:I.players.map(ie=>e.jsxs("span",{children:[ie.name,": ",ie.score," "]},ie.id))}),e.jsxs("i",{className:n.time,children:[I.time.toFixed(1),"s"]})]})},I._id||`${ne}-${I.time.toFixed(1)}`))})]})},`${f}-${E}`)})]})})()})]})})},0)}else ce||V(sa[s],!1,5)},[Q,ce,pe,re,X]);const Re=a=>{if(!(se||h.includes(a)||C.includes(a))&&(_(o=>[...o,a]),h.length===1)){Y(!0);const o=h[0],m=a,p=c[o],f=c[m];p.value===f.value?(A(x=>[...x,o,m]),B(x=>x.map((E,S)=>S===t?{...E,score:E.score+1}:E)),_([]),Y(!1)):setTimeout(()=>{_([]),b(x=>[...x,o,m]),Y(!1),r(x=>(x+1)%N.length)},800)}};j.useEffect(()=>{L&&C.length===c.length&&c.length>0&&!Le&&(he(!1),setTimeout(()=>{Ge()},1e3))},[L,C,c]);const Ue=a=>(v==null?void 0:v.value)===H.icons?a.value:e.jsx("span",{children:a.value}),We=(a,o)=>{if(/[^\p{L}0-9 ]/gu.test(o)){l(V(Sa[s],!0,5));return}const f=o.replace(/[^\p{L}0-9 ]/gu,"").trim();B(x=>x.map((E,S)=>S===a?{...E,name:f||`${U[s]} ${S+1}`}:E))},Ke=a=>{B(o=>Array.from({length:a},(p,f)=>{const x=o[f];return x?{...x,id:f+1}:{id:f+1,name:`${U[s]} ${f+1}`,score:0}})),r(0)};j.useEffect(()=>{const a=Ce.map(m=>m.type.displayName||m.type.name),o=a.filter((m,p)=>a.indexOf(m)!==p);o.length>0&&console.log("Duplicate Icons Found:",o)},[]);const je=a=>{const o=a.split("_");let m="",p=e.jsx(e.Fragment,{});return o[1]===H.numbers?(p=e.jsx("span",{className:n["title-svg"],children:e.jsx(ke,{"aria-hidden":"true"})}),m=_e[s]):o[1]===H.letters?(p=e.jsx("span",{className:n["title-svg"],children:e.jsx(He,{"aria-hidden":"true"})}),m=ge[s]):o[1]===H.icons&&(p=e.jsx("span",{className:n["title-icon"],children:e.jsx(de,{"aria-hidden":"true"})}),m=ve[s]),e.jsxs(e.Fragment,{children:[o[0]," ",p," ",e.jsx("br",{}),m]})};j.useEffect(()=>{L&&aa("game")},[L]);const fe=15;return e.jsxs("div",{id:n["game-container"],className:`${n.container} ${k?n.light:""}`,children:[!L&&C.length===c.length&&c.length>0&&e.jsx("section",{className:`card ${n.sectioncard}`,children:e.jsx("div",{children:e.jsxs("div",{className:n["game-over"],children:[e.jsx("h2",{children:ta[s]}),e.jsxs("p",{children:[ra[s],": ",e.jsx(Ne,{timer:te})]}),e.jsxs("div",{children:[e.jsxs("h3",{children:[ca[s],":"]}),N.map(a=>e.jsxs("p",{children:[a.name,": ",a.score]},a.id))]}),e.jsx("button",{onClick:ue,children:na[s]})]})})}),!L&&e.jsx("section",{className:`card ${n.sectioncard}`,children:e.jsx("div",{children:e.jsxs("div",{id:"settings",className:n.settings,children:[e.jsx("h2",{className:"scr",children:ia[s]}),e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("h3",{children:oa[s]}),e.jsx("div",{className:n["set-card-type"],children:w.map(a=>e.jsx(Ka,{option:a,isActive:(v==null?void 0:v.value)===a.value,onClick:()=>R(a)},a.value))})]}),e.jsxs("div",{children:[e.jsx("h3",{children:la[s]}),e.jsx("div",{className:n["set-grid"],children:T.map(a=>e.jsx(qa,{option:a,isActive:($==null?void 0:$.value)===a.value,onClick:()=>D(a)},a.value))})]}),e.jsxs("div",{className:n["player-names-wrap"],children:[e.jsx("h3",{children:da[s]}),e.jsx("div",{className:n["set-players"],children:e.jsx(e.Fragment,{children:O.map(a=>e.jsx(Ja,{value:a,isActive:N.length===a,onClick:()=>Ke(a)},a))})}),e.jsxs("div",{className:n["player-names"],children:[e.jsxs("small",{children:[ha[s],"."," ",ma[s]]}),N.map((a,o)=>e.jsxs("div",{className:"input-wrap",children:[e.jsxs("label",{children:[e.jsx("input",{type:"text",name:`player-${o}`,value:a.name,onChange:m=>We(o,m.target.value),maxLength:fe,placeholder:`${U[s]} ${o+1}`}),e.jsx("span",{children:`${U[s]} ${o+1} ${Fe[s].toLowerCase()}:`})]}),e.jsxs("small",{children:[a.name.length,"/",fe]})]},a.id))]})]})]}),e.jsx("button",{className:n.big,onClick:ue,children:pa[s]})]})})}),!L&&e.jsx("section",{className:`card ${n.sectioncard} ${n["scores-wrap"]}`,children:e.jsx("div",{children:e.jsxs("div",{id:"high-scores",children:[e.jsxs("h2",{children:[K>400&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(0.8, 0.8)"}}),ua[s]," ",K>400&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(-0.8, 0.8)"}})]}),e.jsxs("p",{className:"textcenter margin0auto",children:[K>200&&e.jsx("span",{"aria-hidden":"true",children:"— "}),xa[s],K>200&&e.jsx("span",{"aria-hidden":"true",children:" —"})]}),e.jsx("div",{className:n["high-scores"],children:ot.map(a=>{let o="";return a===J.solo?o=ye[s]:a===J.duet&&(o=$e[s]),e.jsxs(j.Fragment,{children:[e.jsxs("h3",{children:[K>200&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(0.8)"}}),o,K>200&&e.jsx(Z,{"aria-hidden":"true",style:{transform:"scale(-0.8)"}})]}),re&&e.jsxs("p",{children:[Se[s],"..."]}),X&&e.jsxs("p",{children:[X," — ",be[s]]}),Object.keys(Q[a]||{}).sort().map(m=>{var p,f;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h4",{children:je(`${m}`)}),e.jsx("ol",{children:(f=(p=Q[a])==null?void 0:p[m])==null?void 0:f.map((x,E)=>e.jsx("li",{children:e.jsxs("div",{children:[e.jsx("span",{children:x.players.map(S=>e.jsxs(j.Fragment,{children:[e.jsxs("span",{children:[S.name," ",x.players.length>1?`: ${S.score}`:""," "]}),i&&i.role&&i.role>1&&e.jsx(ja,{hideBrackets:!0,language:s,id:`edit-${x._id}`,className:"edit",wrapperClass:`${n["edit-wrap"]}`,text:e.jsx(e.Fragment,{children:e.jsx(qe,{"aria-hidden":"true"})}),isOpen:!1,closeClass:n.close,setIsFormOpen:()=>{},tooltip:fa[s],y:"above",children:e.jsx("form",{onSubmit:M=>{M.preventDefault();const I=S.name,ne=M.target.name;Be(I,ne,i==null?void 0:i._id)},children:e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{type:"text",name:"name",required:!0}),e.jsxs("span",{children:[va[s]," (",S.name,"):"]})]})})})})]},S.id))}),e.jsxs("span",{className:`flex ${n["time-wrap"]}`,children:[e.jsxs("i",{className:n.time,children:[x.time.toFixed(1),"s"]}),i&&i.role&&i.role>1&&e.jsx(e.Fragment,{children:e.jsxs("button",{type:"button",className:`danger small tooltip-wrap ${n["delete-btn"]}`,onClick:()=>{x._id&&window.confirm(_a[s])&&De(x._id).catch(S=>{var M,I;console.error(S),(I=(M=S.response)==null?void 0:M.data)!=null&&I.message?l(V(S.response.data.message,!0,8)):l(V(S.message,!0,5))})},children:[e.jsx("span",{"aria-hidden":"true",children:e.jsx(Je,{"aria-hidden":"true"})}),e.jsx("span",{className:"tooltip above narrow2",children:we[s]})]})})]})]})},`${a}-${m}-${E}-${x.time.toFixed(1)}`))})]})},`${a}-${m}`)})]},a)})}),i&&i.role&&i.role>1&&e.jsxs("form",{className:`${n["delete-name-form"]}`,onSubmit:a=>{a.preventDefault(),window.confirm(ga[s])&&Oe(u,i==null?void 0:i._id).then(()=>{d("")}).catch(o=>{var m,p;console.error(o),(p=(m=o.response)==null?void 0:m.data)!=null&&p.message?l(V(o.response.data.message,!0,8)):l(V(o.message,!0,5))})},children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{children:[e.jsx("input",{type:"text",name:"name",value:u,required:!0,onChange:a=>d(a.target.value)}),e.jsxs("span",{children:[Fe[s]," (",U[s],"):"]})]})}),e.jsx("button",{type:"submit",className:"danger",children:we[s]})]})]})})}),L&&e.jsx("section",{className:`card ${n.sectioncard} ${n.game}`,children:e.jsx("div",{children:e.jsxs("div",{id:"game",children:[e.jsxs("div",{className:n.header,children:[e.jsxs("div",{children:[ya[s],": ",e.jsx(Ne,{timer:te})]}),e.jsxs("div",{children:[U[s],": ",N[t].name," | ",$a[s],":"," ",N[t].score]})]}),e.jsx(Ya,{language:s,setGameStarted:ae,gridSize:$.value,cards:c,cardType:v,flippedCards:h,flippedOverCards:P,matchedCards:C,handleCardClick:Re,renderCardContent:Ue})]})})})]})};export{Nt as default};
