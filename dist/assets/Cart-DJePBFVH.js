import{r as _,j as e}from"./react-A9DAvxly.js";import{A as je}from"./AdditionalInfo-B5IVdFzj.js";import{c$ as ye,K as we,u as i,d0 as fe,L as G,M as ve,W as y,d1 as be,d2 as K,d3 as Ee,d4 as _e,d5 as Ce,bz as Ne,d6 as $e,U as qe,d7 as ke,d8 as Fe,d9 as C,da as Ae,db as Te,dc as De,dd as S,de as W,df as Q,dg as Se,dh as U,di as Ie,r as Z,dj as Pe,m as Re,dk as Le,dl as Be,dm as X,dn as Je,dp as Oe,dq as ze,dr as Me,ds as Y,dt as V,cq as g,du as N,dv as $,dw as q,dx as k,dy as ee,dz as He,dA as Ge,dB as Ke,dC as We,dD as Qe,dE as Ue,dF as Ze,dG as Xe,F as Ye,dH as Ve,b9 as ge,dI as es,dJ as ss,dK as rs,dL as ts,dM as as}from"./index-DE4Ix6OC.js";import{L as se}from"./react-router-dom-CYs6befe.js";import{B as is}from"./ButtonToggle-ClmLsuP4.js";import{a as ns,X as ls,R as ds}from"./react-icons-CFiePanq.js";import"./hoist-non-react-statics-D5aJipOz.js";import"./react-dom-yh0erWL-.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-CHm9GgGE.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-DEc9BFqZ.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-S1Hdk0kP.js";import"./@remix-run-DTnHqtaE.js";const cs="_light_uwfyl_1",os="_quantity_uwfyl_51",ps="_total_uwfyl_129",hs="_gdpr_uwfyl_231",ms="_terms_uwfyl_233",us="_wrap_uwfyl_393",xs="_submit_uwfyl_461",t={light:cs,"cart-wrap":"_cart-wrap_uwfyl_5","addition-wrap":"_addition-wrap_uwfyl_41",quantity:os,"quantity-btn":"_quantity-btn_uwfyl_69","item-details":"_item-details_uwfyl_83","textarea-wrap":"_textarea-wrap_uwfyl_99","input-wrap":"_input-wrap_uwfyl_101",total:ps,"please-fill":"_please-fill_uwfyl_157","toggle-wrap":"_toggle-wrap_uwfyl_179","clear-btn-wrap":"_clear-btn-wrap_uwfyl_203","send-order-wrap":"_send-order-wrap_uwfyl_225",gdpr:hs,terms:ms,"accordion-wrap":"_accordion-wrap_uwfyl_271","additional-info-wrap":"_additional-info-wrap_uwfyl_285","back-to-store":"_back-to-store_uwfyl_323","cart-form":"_cart-form_uwfyl_375",wrap:us,"more-info-wrap":"_more-info-wrap_uwfyl_439",submit:xs},Rs=({language:r,cart:n,setCart:w,removeCart:I})=>{const re=ye(),u=we(),[P,F]=i("localStorageTotal",0),[l,R]=i("localStorageEmail",""),[d,L]=i("JCartName",""),[f,te]=i("JCartBusiness",!1),[E,ae]=i("JCartCompanyName",""),[c,B]=i("JCartCountry",""),[o,J]=i("JCartAddress",""),[p,O]=i("JCartCity",""),[h,z]=i("JCartZip",""),[v,ie]=i("JCartPhone",""),[b,ne]=i("JCartBusinessID",""),[le,de]=i("JCartDetails",{email:l,name:d,businessID:b,zip:h,city:p,address:o,country:c,phone:v}),[M,ce]=i("JCartExtra",""),[oe,pe]=_.useState(!1),[he,me]=_.useState(!1),[ue,x]=_.useState(!1),A=5,H=10,xe=1,T=3;_.useEffect(()=>{de({name:d,companyName:E,email:l,businessID:b,zip:h,city:p,address:o,country:c,phone:v})},[d,E,l,b,h,p,o,c,v]);const D=(s,a)=>{w(m=>m.map(j=>j.id===s?{...j,quantity:j.quantity+a}:j))};return _.useEffect(()=>{F(n.reduce((s,a)=>s+a.price*a.quantity,0))},[n]),e.jsxs("div",{className:`${t["cart-wrap"]} ${re?t.light:""}`,children:[e.jsxs(se,{to:"/store",className:t["back-to-store"],children:[e.jsx("span",{"aria-hidden":!0,children:"«"})," ",e.jsx(ns,{})," ",e.jsx("strong",{children:fe[r]})]}),r!==G.Suomi&&r!==G.English&&e.jsx("p",{children:ve[r]}),e.jsxs("form",{onSubmit:s=>{s.preventDefault(),x(!0),n.length<1&&(u(y(be[r],!0,8)),x(!1)),oe?he?f&&d&&d.trim()!==""&&E&&E.trim()!==""&&b&&b.trim()!==""&&l&&l.trim()!==""&&o&&o.trim()!==""&&h&&h.trim()!==""&&p&&p.trim()!==""&&c&&c.trim()!==""||!f&&d&&d.trim()!==""&&l&&l.trim()!==""&&o&&o.trim()!==""&&h&&h.trim()!==""&&p&&p.trim()!==""&&c&&c.trim()!==""?Ce.newOrder(r,{orderID:`${Math.ceil(Ne(1e5,999999))}-${$e(2,!0)}`,info:le,total:P,extra:M,items:n}).then(a=>{a.success?(u(y(a.message,!1,10)),w([]),I(),F(0),x(!1)):(u(y(a.message,!1,10)),x(!1))}).catch(a=>{a.response&&a.response.data&&a.response.data.message?u(y(a.response.data.message,!0,8)):u(y(a.message,!0,8)),x(!1)}):(u(y(qe[r],!0,8)),x(!1)):(u(y(`${K[r]}: ${_e[r]}`,!0,8)),x(!1)):(u(y(`${K[r]}: ${Ee[r]}`,!0,8)),x(!1))},className:t["cart-form"],children:[n.map((s,a)=>{if(s.quantity<1||isNaN(s.quantity))w(n.filter(m=>m.id!==s.id));else return e.jsxs("div",{className:t.wrap,children:[e.jsxs("h2",{children:[e.jsxs("span",{children:[a+1,". "]}),e.jsx("span",{children:s.name})]}),e.jsx("p",{children:ke(s.description)}),e.jsx(je,{type:s.id,language:r,styles:t,isOpen:!0,setIsFormOpen:()=>{},classNameWrap:t["additional-info-wrap"],text:Fe[r]}),e.jsxs("div",{className:`${t.quantity}`,children:[s.id!=="misc-quote"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:()=>{if(s.quantity-1<1)if(window.confirm(`${C[r]}: ${s.name}?`)){w(n.filter(m=>m.id!==s.id));return}else return;D(s.id,-1)},className:`tooltip-wrap ${t["quantity-btn"]}`,children:[e.jsx("span",{className:"tooltip above space right narrow2",children:Ae[r]}),e.jsx("span",{children:"-1"})]}),e.jsxs("span",{children:[Te[r],": ",s.quantity]}),e.jsxs("button",{type:"button",onClick:()=>{D(s.id,1)},className:`tooltip-wrap ${t["quantity-btn"]}`,children:[e.jsx("span",{className:"tooltip above space right narrow2",children:De[r]}),e.jsx("span",{children:"+1"})]})]}):e.jsx("button",{type:"button",onClick:()=>{if(s.quantity-1<1)if(window.confirm(`${C[r]}: ${s.name}?`)){w(n.filter(m=>m.id!==s.id));return}else return;D(s.id,-1)},children:e.jsx("span",{children:C[r]})}),s.quantity>=H?e.jsxs("span",{children:[S[r],": ",s.quantity+T," ",W[r]]}):s.quantity>=A?e.jsxs("span",{children:[S[r],": ",s.quantity+xe," ",W[r]]}):""]}),s.id!=="misc-quote"?e.jsx(e.Fragment,{children:e.jsxs("p",{children:[Q[r],": ",s.price," € × ",s.quantity," ="," ",e.jsxs("b",{children:[s.price*s.quantity," €"]})]})}):e.jsxs("p",{children:[Q[r],": ",s.price," €"," "]}),s.id.startsWith("misc")&&s.quantity>=A&&e.jsx("p",{children:e.jsxs("big",{children:[e.jsx(ls,{})," ",e.jsx("span",{children:Se[r]})," ",s.quantity>=H?e.jsxs(e.Fragment,{children:[e.jsxs("strong",{children:[" × ",T," "]}),e.jsx("span",{children:"—"})," ",e.jsx("span",{children:U[r]}),e.jsxs("strong",{children:[" ",s.price*T," € "]})]}):s.quantity>=A?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:" —"})," ",e.jsx("span",{children:U[r]}),e.jsxs("strong",{children:[" ",s.price," € "]})]}):""]})}),e.jsx("div",{className:t["item-details"],children:e.jsx("div",{className:`${t["textarea-wrap"]} textarea-wrap`,children:e.jsxs("label",{htmlFor:`${s.id}-details`,children:[e.jsxs("span",{children:[Ie[r],":"]}),e.jsx("textarea",{rows:5,required:!0,id:`details-${s.id}`,name:`details-${s.id}`,placeholder:s.id.startsWith("misc")&&s.id!=="misc-quote"?Z[r]:Pe[r],onChange:m=>{w(n.map(j=>j.id===s.id?{...j,details:m.target.value}:j))}})]})})})]},`${s.id}-${a}`)}),n.length>0?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:t.total,children:e.jsx("big",{children:e.jsxs("span",{children:[S[r],": ",P," €"," "]})})}),e.jsxs("div",{className:`${t["please-fill"]}`,children:[e.jsx("div",{className:`${t["toggle-wrap"]}`,children:e.jsx(is,{id:"business-toggle",className:`${t.toggle}`,name:"company",on:Re[r],off:Le[r],equal:!0,isChecked:f,handleToggleChange:()=>te(!f),label:`${Be[r]}: `})}),f?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"business-id",children:[e.jsx("input",{type:"text",name:"business-id",id:"business-id",required:!0,value:b,placeholder:X[r],onChange:s=>ne(s.target.value)}),e.jsxs("span",{children:[X[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"company-name",children:[e.jsx("input",{type:"text",id:"company-name",name:"company",required:!0,value:E,placeholder:`${Je[r]}/${Oe[r]}`,onChange:s=>ae(s.target.value)}),e.jsxs("span",{children:[ze[r],"/",Me[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"name-cart",children:[e.jsx("input",{type:"text",id:"name-cart",name:"name",required:!0,value:d,placeholder:Y[r],onChange:s=>L(s.target.value)}),e.jsxs("span",{children:[Y[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"email-cart",children:[e.jsx("input",{type:"email",name:"email",id:"email-cart",required:!0,value:l,placeholder:V[r],onChange:s=>R(s.target.value)}),e.jsxs("span",{children:[g[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"address-cart",children:[e.jsx("input",{type:"text",id:"address-cart",name:"address",required:!0,value:o,placeholder:N[r],onChange:s=>J(s.target.value)}),e.jsxs("span",{children:[N[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"zip-cart",children:[e.jsx("input",{type:"text",id:"zip-cart",name:"postal-code",required:!0,value:h,placeholder:$[r],onChange:s=>z(s.target.value),onKeyDown:s=>{!/[0-9]/.test(s.key)&&s.key!=="Backspace"&&s.key!=="Delete"&&s.key!=="ArrowLeft"&&s.key!=="ArrowRight"&&s.key!=="Tab"&&s.preventDefault()}}),e.jsxs("span",{children:[$[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"city-cart",children:[e.jsx("input",{id:"city-cart",type:"text",name:"city",required:!0,value:p,placeholder:q[r],onChange:s=>O(s.target.value)}),e.jsxs("span",{children:[q[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"country-cart",children:[e.jsx("input",{type:"text",id:"country-cart",name:"country",required:!0,value:c,placeholder:k[r],onChange:s=>B(s.target.value)}),e.jsxs("span",{children:[k[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder not-required ${v&&v.trim()!==""?"filled":"not-filled"}`,children:e.jsxs("label",{htmlFor:"phone-cart",children:[e.jsx("input",{type:"text",id:"phone-cart",name:"phone",value:v,placeholder:ee[r],onChange:s=>ie(s.target.value),onKeyDown:s=>{!/[0-9]/.test(s.key)&&s.key!=="Backspace"&&s.key!=="Delete"&&s.key!=="ArrowLeft"&&s.key!=="ArrowRight"&&s.key!=="Tab"&&s.key!==" "&&s.preventDefault()}}),e.jsxs("span",{children:[ee[r]," (",He[r].toLowerCase(),"):"]})]})})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"name-cart",children:[e.jsx("input",{type:"text",id:"name-cart",name:"name",required:!0,value:d,placeholder:Ge[r],onChange:s=>L(s.target.value)}),e.jsxs("span",{children:[Ke[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"email-cart",children:[e.jsx("input",{type:"email",name:"email",id:"email-cart",required:!0,value:l,placeholder:V[r],onChange:s=>R(s.target.value)}),e.jsxs("span",{children:[g[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"address-cart",children:[e.jsx("input",{type:"text",id:"address-cart",name:"address",required:!0,value:o,placeholder:N[r],onChange:s=>J(s.target.value)}),e.jsxs("span",{children:[N[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"zip-cart",children:[e.jsx("input",{type:"text",name:"postal-code",id:"zip-cart",required:!0,value:h,placeholder:$[r],onChange:s=>z(s.target.value),onKeyDown:s=>{!/[0-9]/.test(s.key)&&s.key!=="Backspace"&&s.key!=="Delete"&&s.key!=="ArrowLeft"&&s.key!=="ArrowRight"&&s.key!=="Tab"&&s.preventDefault()}}),e.jsxs("span",{children:[$[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"city-cart",children:[e.jsx("input",{type:"text",id:"city-cart",name:"city",required:!0,value:p,placeholder:q[r],onChange:s=>O(s.target.value)}),e.jsxs("span",{children:[q[r],":"]})]})}),e.jsx("div",{className:`${t["input-wrap"]} input-wrap placeholder`,children:e.jsxs("label",{htmlFor:"country-cart",children:[e.jsx("input",{type:"text",id:"country-cart",name:"country",required:!0,value:c,placeholder:k[r],onChange:s=>B(s.target.value)}),e.jsxs("span",{children:[k[r],":"]})]})})]}),e.jsx("div",{className:`${t["textarea-wrap"]} textarea-wrap`,children:e.jsxs("label",{htmlFor:"extra",children:[e.jsxs("span",{children:[Z[r],":"]}),e.jsx("textarea",{rows:5,id:"extra",value:M,placeholder:`${We[r]}${f?`, ${Qe[r]} ${Ue[r]}`:""}`,onChange:s=>ce(s.target.value)})]})})]}),e.jsxs("div",{className:`${t["send-order-wrap"]} flex center`,children:[e.jsx("div",{className:t.terms,children:e.jsxs("label",{children:[e.jsx("input",{id:"terms-cart",required:!0,type:"checkbox",name:"terms",onChange:s=>{me(s.target.checked)}}),e.jsxs("span",{children:[Ze[r]," ",e.jsx(se,{to:"/terms",children:Xe[r]})]})]})}),e.jsx("div",{className:t.gdpr,children:e.jsxs("label",{className:"radio-checkbox",children:[e.jsx("input",{id:"gdpr-cart",required:!0,type:"checkbox",name:"gdpr",onChange:s=>{pe(s.target.checked)}}),e.jsx("span",{children:Ye[r]})]})}),e.jsxs("button",{className:t.submit,type:"submit",disabled:ue,children:[e.jsx("span",{children:Ve[r]})," ",e.jsx(ds,{})]}),e.jsx(ge,{className:"cart-accordion grayer",text:es[r],language:r,wrapperClass:t["more-info-wrap"],children:e.jsx(ss,{language:r})})]}),e.jsx("div",{className:`${t["clear-btn-wrap"]} flex center`,children:e.jsx("button",{type:"button",onClick:()=>{window.confirm(`${C[r]}: ${rs[r]}?`)&&(w([]),I(),F(0))},className:"danger delete",children:ts[r]})})]}):e.jsx(e.Fragment,{children:e.jsxs("p",{className:"flex center",children:["[ ",as[r]," ]"]})})," "]})]})};export{Rs as default};
