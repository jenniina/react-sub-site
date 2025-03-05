import{r as i,j as e}from"./react-kX_YxI4E.js";import{L as ce,E as q,P as c,aL as D,aM as W,Z as B,O as v,u as ue,A as de,S as y,W as R,aN as d,a7 as me,aa as pe,i as he,V as xe,e as b}from"./index-De2CRixK.js";import{B as E}from"./ButtonToggle-Brqk0qTA.js";import{v as ge}from"./uuid-Dv1xt2bl.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-DhcENkY1.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const We=({userId:f,language:a,optionsCategory:z,categoryByLanguages:T,jokeCategoryByLanguage:M,options:V,getKeyByValue:be,norrisCategories:S})=>{const{t}=i.useContext(ce),[k,_]=i.useState(q[a]),[N,C]=i.useState(c.single),[H,U]=i.useState(D.en),[Y,K]=i.useState(W.en),[A,w]=i.useState(""),[J,$]=i.useState(""),[P,F]=i.useState(""),[m,Z]=i.useState(!0),[u,G]=i.useState(!0),[p,Q]=i.useState(!1),[r,X]=i.useState({label:M[a].Misc,value:B.Misc}),ee=t("ESelectAnOption"),[L,se]=i.useState(""),[h,te]=i.useState(S[0]),[ie,ae]=i.useState(!1),[I,x]=i.useState(!1);i.useEffect(()=>{const s=L===v.ChuckNorris;ae(s)},[L]);const n=ue(),re=s=>{s.preventDefault(),x(!0);const j=s.currentTarget.nsfw.checked||s.currentTarget.religious.checked||s.currentTarget.political.checked||s.currentTarget.racist.checked||s.currentTarget.sexist.checked||s.currentTarget.explicit.checked;let o;o={jokeId:ge(),category:(r==null?void 0:r.value)??v.Misc,subCategories:(r==null?void 0:r.label)===v.ChuckNorris?[h==null?void 0:h.value]:[],language:k,type:c.single,user:[f],private:u,verified:!!u,anonymous:p,author:f,safe:!((r==null?void 0:r.value)===B.Dark||j),flags:{nsfw:s.currentTarget.nsfw.checked,religious:s.currentTarget.religious.checked,political:s.currentTarget.political.checked,racist:s.currentTarget.racist.checked,sexist:s.currentTarget.sexist.checked,explicit:s.currentTarget.explicit.checked}},N===c.single?o={...o,joke:A,type:c.single}:o={...o,setup:J,delivery:P,type:c.twopart},n(me(o)).then(l=>{n(pe(f)).then(()=>n(he())).then(()=>{n(xe()),w(""),$(""),F(""),x(!1)}),n(b(`${t("ESavedJoke")}. ${l.message??""}`,!1,8))}).catch(l=>{var g,O;console.error(l),x(!1),l.code==="ERR_BAD_RESPONSE"?n(b(`${t("EError")}: ${l.response.data.message}. ${t("EReportErrorToAdmin")}`,!0,8)):(x(!1),(O=(g=l.response)==null?void 0:g.data)!=null&&O.message?n(b(l.response.data.message,!0,8)):n(b(`${t("EError")}: ${l.message}. ${t("EReportErrorToAdmin")}`,!0,8)))})};i.useEffect(()=>{C(m?c.twopart:c.single)},[m]);const le=()=>{Z(!m)},ne=()=>{G(!u)},oe=()=>{Q(!p)};return i.useEffect(()=>{U(D[a]),K(W[a])},[a]),i.useEffect(()=>{setTimeout(()=>{const s=document.querySelectorAll(".select-container"),j=(s==null?void 0:s.length)+2;s==null||s.forEach((o,l)=>{const g=j-l;o.style.zIndex=`${g}`})},500)},[]),e.jsx(de,{language:a,text:t("EClickHereToWriteYourOwnJoke"),className:"submit",wrapperClass:"submit-wrap",children:e.jsxs("div",{className:"submit-inner",children:[e.jsx("h3",{children:t("ESubmitAJoke")}),e.jsxs("p",{className:"textcenter",children:[t("ESubmitAJokeTo")," jenniina.fi"]}),e.jsx("p",{className:"textcenter mb3",children:t("EIfTheJokeIsNotPrivateVerificationIsNeeded")}),e.jsxs("form",{onSubmit:re,className:"form-submit-new",children:[e.jsxs("div",{className:"toggle-wrap",children:[e.jsx(E,{isChecked:m,name:"submit-joketype",id:"submit-joketype",hideLabel:!1,label:`${t("EJokeTypeTitle")}: `,className:`${a} submit joketype`,on:t("ETwoPart"),off:t("ESingle"),handleToggleChange:le,equal:!0}),e.jsx(E,{isChecked:u,name:"submit-private",id:"submit-private",hideLabel:!1,label:`${t("EPrivacy")}: `,className:`${a} submit private`,on:t("EPrivate"),off:t("EPublic"),handleToggleChange:ne,equal:!1}),e.jsx(E,{isChecked:p,name:"submit-anonymous",id:"submit-anonymous",hideLabel:!1,label:`${t("EPublishWithNickname")}: `,className:`${a} submit anonymous`,on:t("EAnonymous"),off:t("ENickname"),handleToggleChange:oe,equal:!1})]}),N===c.single?e.jsxs("label",{htmlFor:"submit-joke-single-input",className:"textarea-wrap",children:[e.jsx("span",{children:t("EJoke")}),e.jsx("textarea",{name:"joke",id:"submit-joke-single-input",required:!0,rows:4,value:A,onChange:s=>{w(s.target.value)}})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{htmlFor:"submit-setup-input",children:[e.jsx("input",{type:"text",id:"submit-setup-input",name:"setup",required:!0,value:J,onChange:s=>{$(s.target.value)}}),e.jsx("span",{children:H})]})}),e.jsx("div",{className:"input-wrap",children:e.jsxs("label",{htmlFor:"submit-delivery-input",children:[e.jsx("input",{type:"text",id:"submit-delivery-input",name:"delivery",value:P,onChange:s=>{F(s.target.value)},required:!0}),e.jsx("span",{children:Y})]})})]}),T?e.jsxs(e.Fragment,{children:[e.jsx(y,{language:a,id:"submit-category-select",className:"submit",instructions:`${t("ECategoryTitle")}:`,selectAnOption:ee,value:r,options:z(T),onChange:s=>{X(s),se(s==null?void 0:s.label)}}),e.jsx(y,{language:a,id:"jokeCategoryNorrisCategories-submit",className:`category extras narrow ${ie?"":"hidden"}`,instructions:"Chuck Norris Category:",selectAnOption:t("EAny"),value:h,options:S,onChange:s=>{te(s)}})]}):"",e.jsx(y,{language:a,id:"submit-language",className:"submit narrow",instructions:`${t("EJokeLanguage")}:`,options:V(R),value:a?{value:q[k],label:R[k]}:void 0,onChange:s=>{_(s==null?void 0:s.value)}}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:t("EAddWarningTitle")}),e.jsxs("div",{className:"checkbox-wrap",children:[e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-nsfw",name:"nsfw",value:"nsfw"}),e.jsx("label",{htmlFor:"flag-nsfw",children:d[a].nsfw})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-religious",name:"religious",value:"religious"}),e.jsx("label",{htmlFor:"flag-religious",children:d[a].religious})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-political",name:"political",value:"political"}),e.jsx("label",{htmlFor:"flag-political",children:d[a].political})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-racist",name:"racist",value:"racist"}),e.jsx("label",{htmlFor:"flag-racist",children:d[a].racist})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-sexist",name:"sexist",value:"sexist"}),e.jsx("label",{htmlFor:"flag-sexist",children:d[a].sexist})]}),e.jsxs("div",{children:[e.jsx("input",{type:"checkbox",id:"flag-explicit",name:"explicit",value:"explicit"}),e.jsx("label",{htmlFor:"flag-explicit",children:d[a].explicit})]})]})]}),e.jsxs("p",{children:[t(u?"EJokeIsSetToPrivateAndWillOnlyBeSeenByYouAndTheAdministrator":"EJokeIsSetToPublicAndWillNeedVerificationFromAnAdministrator"),e.jsx("br",{}),e.jsx("br",{}),t(p?"EPublishAnonymously":"EPublishWithNickname")]}),e.jsx("button",{type:"submit",className:"small",disabled:I,id:"submit-new-joke",children:t(I?"ESaving":u?"EPublish":"ESend")})]})]})})};export{We as default};
