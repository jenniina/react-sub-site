import{r as i,j as e}from"./react-A9DAvxly.js";import{L as b,d5 as D,d6 as o,d7 as O,d8 as W,d9 as R,da as me,cU as y,K as pe,b0 as he,db as xe,dc as be,dd as fe,de as ke,cV as E,cZ as je,c_ as ve,c$ as ye,df as Ee,dg as Te,dh as Se,di as z,dj as Ne,cr as Ce,dk as we,S as T,dl as Ae,d1 as Je,dm as $e,dn as Fe,dp as d,dq as Pe,dr as ge,ds as Ie,dt as Le,du as qe,T as De,dv as Oe,cn as We,bl as Re,dw as ze,W as f,dx as Be,b4 as B,dy as _}from"./index-Ud_b26E_.js";import{v as _e}from"./uuid-Dv1xt2bl.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-BGZR1ov-.js";import"./react-router-dom-CYs6befe.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const ns=({userId:k,language:s,optionsCategory:M,categoryByLanguages:S,jokeCategoryByLanguage:U,options:V,getKeyByValue:H,norrisCategories:N})=>{const[j,Y]=i.useState(b[D[s]]),[C,w]=i.useState(o.single),[K,Z]=i.useState(O.en),[G,Q]=i.useState(W.en),[A,J]=i.useState(""),[$,F]=i.useState(""),[P,g]=i.useState(""),[u,X]=i.useState(!0),[n,ee]=i.useState(!0),[m,se]=i.useState(!1),[r,te]=i.useState({label:U[s].Misc,value:R.Misc}),ie=me[s],[I,re]=i.useState(""),[p,ae]=i.useState(N[0]),[ce,le]=i.useState(!1),[L,h]=i.useState(!1);i.useEffect(()=>{const t=I===y.ChuckNorris;le(t)},[I]);const c=pe(),oe=t=>{t.preventDefault(),h(!0);const v=t.currentTarget.nsfw.checked||t.currentTarget.religious.checked||t.currentTarget.political.checked||t.currentTarget.racist.checked||t.currentTarget.sexist.checked||t.currentTarget.explicit.checked;let l;l={jokeId:_e(),category:(r==null?void 0:r.value)??y.Misc,subCategories:(r==null?void 0:r.label)===y.ChuckNorris?[p==null?void 0:p.value]:[],language:j,type:o.single,user:[k],private:n,verified:!!n,anonymous:m,author:k,safe:!((r==null?void 0:r.value)===R.Dark||v),flags:{nsfw:t.currentTarget.nsfw.checked,religious:t.currentTarget.religious.checked,political:t.currentTarget.political.checked,racist:t.currentTarget.racist.checked,sexist:t.currentTarget.sexist.checked,explicit:t.currentTarget.explicit.checked}},C===o.single?l={...l,joke:A,type:o.single}:l={...l,setup:$,delivery:P,type:o.twopart},c(Oe(l)).then(a=>{c(We(k)).then(()=>c(Re())).then(()=>{c(ze()),J(""),F(""),g(""),h(!1)}),c(f(`${Be[s]}. ${a.message??""}`,!1,8))}).catch(a=>{var x,q;console.error(a),h(!1),a.code==="ERR_BAD_RESPONSE"?c(f(`${B[s]}: ${a.response.data.message}. ${_[s]}`,!0,8)):(h(!1),(q=(x=a.response)==null?void 0:x.data)!=null&&q.message?c(f(a.response.data.message,!0,8)):c(f(`${B[s]}: ${a.message}. ${_[s]}`,!0,8)))})};i.useEffect(()=>{w(u?o.twopart:o.single)},[u]);const ne=()=>{X(!u)},de=()=>{ee(!n)},ue=()=>{se(!m)};return i.useEffect(()=>{Z(O[s]),Q(W[s])},[s]),i.useEffect(()=>{setTimeout(()=>{const t=document.querySelectorAll(".select-container"),v=(t==null?void 0:t.length)+2;t==null||t.forEach((l,a)=>{const x=v-a;l.style.zIndex=`${x}`})},500)},[]),e.jsx(he,{language:s,text:xe[s],className:"submit",wrapperClass:"submit-wrap",children:e.jsxs("div",{className:"submit-inner",children:[e.jsx("h3",{children:be[s]}),e.jsxs("p",{className:"textcenter",children:[fe[s]," jenniina.fi"]}),e.jsx("p",{className:"textcenter mb3",children:ke[s]}),e.jsxs("form",{onSubmit:oe,className:"form-submit-new",children:[e.jsxs("div",{className:"toggle-wrap",children:[e.jsx(E,{isChecked:u,name:"submit-joketype",id:"submit-joketype",hideLabel:!1,label:`${je[s]}: `,className:`${s} submit joketype`,on:ve[s],off:ye[s],handleToggleChange:ne,equal:!0}),e.jsx(E,{isChecked:n,name:"submit-private",id:"submit-private",hideLabel:!1,label:`${Ee[s]}: `,className:`${s} submit private`,on:Te[s],off:Se[s],handleToggleChange:de,equal:!1}),e.jsx(E,{isChecked:m,name:"submit-anonymous",id:"submit-anonymous",hideLabel:!1,label:`${z[s]}: `,className:`${s} submit anonymous`,on:Ne[s],off:Ce[s],handleToggleChange:ue,equal:!1})]}),C===o.single?e.jsxs("label",{htmlFor:"submit-joke-single-input",className:"textarea-wrap",children:[e.jsx("span",{children:we[s]}),e.jsx("textarea",{name:"joke",id:"submit-joke-single-input",required:!0,rows:4,value:A,onChange:t=>{J(t.target.value)}})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{htmlFor:"submit-setup-input",children:[e.jsx("input",{type:"text",id:"submit-setup-input",name:"setup",required:!0,value:$,onChange:t=>{F(t.target.value)}}),e.jsx("span",{children:K})]})}),e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{htmlFor:"submit-delivery-input",children:[e.jsx("input",{type:"text",id:"submit-delivery-input",name:"delivery",value:P,onChange:t=>{g(t.target.value)},required:!0}),e.jsx("span",{children:G})]})})]}),S?e.jsxs(e.Fragment,{children:[e.jsx(T,{language:s,id:"submit-category-select",className:"submit",instructions:`${Ae[s]}:`,selectAnOption:ie,value:r,options:M(S),onChange:t=>{te(t),re(t==null?void 0:t.label)}}),e.jsx(T,{language:s,id:"jokeCategoryNorrisCategories-submit",className:`category extras narrow ${ce?"":"hidden"}`,instructions:"Chuck Norris Category:",selectAnOption:Je[s],value:p,options:N,onChange:t=>{ae(t)}})]}):"",e.jsx(T,{language:s,id:"submit-language",className:"submit narrow",instructions:`${$e[s]}:`,options:V(b),value:s?{value:b[D[j]],label:H(b,j)}:void 0,onChange:t=>{Y(t==null?void 0:t.value)}}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:Fe[s]}),e.jsxs("div",{className:"checkbox-wrap",children:[e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-nsfw",name:"nsfw",value:"nsfw"}),e.jsx("label",{htmlFor:"flag-nsfw",children:d[s].nsfw})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-religious",name:"religious",value:"religious"}),e.jsx("label",{htmlFor:"flag-religious",children:d[s].religious})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-political",name:"political",value:"political"}),e.jsx("label",{htmlFor:"flag-political",children:d[s].political})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-racist",name:"racist",value:"racist"}),e.jsx("label",{htmlFor:"flag-racist",children:d[s].racist})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-sexist",name:"sexist",value:"sexist"}),e.jsx("label",{htmlFor:"flag-sexist",children:d[s].sexist})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-explicit",name:"explicit",value:"explicit"}),e.jsx("label",{htmlFor:"flag-explicit",children:d[s].explicit})]})]})]}),e.jsxs("p",{children:[n?Pe[s]:ge[s],e.jsx("br",{}),e.jsx("br",{}),m?Ie[s]:z[s]]}),e.jsx("button",{type:"submit",className:"small",disabled:L,id:"submit-new-joke",children:L?Le[s]:n?qe[s]:De[s]})]})]})})};export{ns as default};
