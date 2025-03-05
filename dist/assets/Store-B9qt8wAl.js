import{r as b,j as i}from"./react-kX_YxI4E.js";import{L as y,u as O,l as T,w as s,E as m,v as I,e as j}from"./index-De2CRixK.js";import{L as P}from"./react-router-dom-StiqOUIT.js";import{aD as w,aE as D,aF as N,aG as M,B as W,aH as R,aI as k}from"./react-icons-DhcENkY1.js";import{A as B}from"./AdditionalInfo-xjo803cQ.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const v=({language:o,items:l,name:h,id:t,cart:e,addToCart:u,removeFromCart:A,intro:E,link:$})=>{const{t:a}=b.useContext(y),g=O(),c=T();return i.jsx(i.Fragment,{children:i.jsx("section",{className:`card ${s.card} ${s["store-items"]} ${c?s.light:""}`,style:{width:"100%",position:"relative",zIndex:2},children:i.jsx("div",{children:i.jsxs("div",{className:`${s["store-wrap"]} ${s[t]}`,children:[t!=="misc"&&i.jsxs("h2",{id:t,children:[t==="wordpress"?i.jsx(i.Fragment,{children:i.jsx(w,{})}):t==="react"?i.jsx(i.Fragment,{children:i.jsx(D,{})}):t==="graphic"?i.jsx(i.Fragment,{children:i.jsx(N,{})}):"",i.jsx("span",{children:h}),t==="react"?i.jsx(i.Fragment,{children:i.jsx(M,{})}):""]}),E&&E.trim()!==""&&i.jsx("p",{style:{margin:0,minWidth:"100%"},children:E}),$&&i.jsx("div",{className:s.links,style:{marginTop:0,minWidth:"100%"},children:$}),i.jsx(B,{type:t,language:o,styles:s,classNameWrap:s["additional-information"],isOpen:!0,setIsFormOpen:()=>{}}),l.map(r=>i.jsxs("div",{id:r.id,className:`${s["store-item"]} ${o!==m.en&&o!==m.fi?s.foreign:""}`,children:[i.jsx("h3",{children:r.name}),i.jsx("p",{className:s.grow,children:I(r.description)}),i.jsxs("p",{children:[a("EPrice"),": ",r.price," €"," ",r.id==="misc-quote"?null:i.jsxs("small",{children:["(",a("EContainsVAT"),")"]})]}),(()=>{const d=e.find(p=>p.id===r.id);return d&&d.quantity>0?i.jsx(i.Fragment,{children:i.jsxs("p",{className:s.added,children:[i.jsx("span",{children:a("EAddedToCart")})," ",i.jsx("button",{className:`${s["remove-from-cart"]} danger delete`,onClick:()=>{window.confirm(`${a("ERemove")} ${r.name} ${a("ECart")}?`)&&A(r.id)},children:a("ERemove")})]})}):i.jsxs("button",{id:"add-to-cart",className:s["add-to-cart"],onClick:()=>{const p=e.find(x=>x.id===r.id);p?(u({...r,quantity:p.quantity+1}),g(j(`${a("ESavingSuccessful")}`,!1,3))):(u({...r,quantity:1}),g(j(`${a("ESavingSuccessful")}`,!1,3)))},children:[i.jsx(W,{style:{fontSize:"1.3em"}})," ",i.jsx("span",{children:a("EAddToCart")})]})})(),e.map(d=>d.id===r.id&&d.quantity>0&&i.jsxs(P,{to:"/cart",className:s["cart-link"],children:[i.jsx(W,{style:{fontSize:"1.3em"}})," ",i.jsxs("big",{children:[a("EGoToCart")," »"]})]},d.id))]},r.id))]})})})})},q=({styles:o,name:l,id:h,direction:t})=>i.jsxs("button",{className:`${o["scroll-button"]}`,onClick:()=>{var e;(e=document.getElementById(h))==null||e.scrollIntoView()},children:[t==="above"&&i.jsxs(i.Fragment,{children:[i.jsx(R,{height:"1.3rem",width:"1.3rem",style:{margin:"-0.4rem 0 -0.1rem"}}),i.jsx("span",{children:l})]}),t==="any"&&i.jsx("span",{children:l}),t==="below"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{children:l})," ",i.jsx(k,{height:"1.3rem",width:"1.3rem",style:{margin:"-0.1rem 0 -0.4rem"}})]})]}),oe=({language:o,cart:l,addToCart:h,removeFromCart:t})=>{const{t:e}=b.useContext(y),u=T(),A=[{id:"wordpress-simple",name:e("ESimpleWordPressWebsite"),price:190,description:`${e("EAnAccessibleSinglePageWebsite")} ${e("EMayContainEffects")}`},{id:"wordpress-website",name:e("EWordPressWebsite"),price:260,description:`${e("EAnAccessibleMultiPageWebsite")}  ${e("EMayContainEffects")}`},{id:"wordpress-blog-contact",name:e("EWordPressWebsiteWithBlogAndContactForm"),price:350,description:`${e("EAnAccessibleWebsiteWithBlogAndContactForm")} ${e("ETheBlogSectionCanBeNewsArticlesEtc")}`},{id:"wordpress-full",name:e("EWordPressFullPackage"),price:890,description:`${e("EAnAccessibleWebsiteWithBlogContactFormAndOnlineStoreWooCommerce")}`},{id:"wordpress-blog-contact-existing",name:`${e("EBlogAndContactForm")} `,price:160,description:`${e("EAddingABlogAndContactFormToAnExistingWebsite")} (${e("EWordPressWebsite")}).  ${e("EAddonsAreAdaptedToTheStyle")} ${e("ETheBlogSectionCanBeNewsArticlesEtc")}`},{id:"wordpress-webstore",name:`${e("EWebStore")}`,price:580,description:`${e("EAddingAWebStoreToAnExistingWebsite")}. ${e("EAddonsAreAdaptedToTheStyle")}`}],E=[{id:"react-simple",name:e("ESimpleReactWebsite"),price:340,description:`${e("EAnAccessibleSinglePageWebsite")} ${e("EMayContainEffects")}`},{id:"react-website",name:e("EReactWebsite"),price:400,description:`${e("EAnAccessibleMultiPageWebsite")} ${e("EMayContainEffects")}`},{id:"react-contact-functionality",name:e("EReactWebsiteWithContactFormAndOtherFunctionality"),price:620,description:`${e("EAnAccessibleWebsiteWithContactFormAndOtherFunctionality")} ${e("EFunctionalitiesCanBe")} (Node.js app & React). ${e("EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures")}`},{id:"react-adding-functionality",name:`${e("EAddingFunctionalityToAReactSite")} (Node.js app & React)`,price:220,description:`${e("EFunctionalitiesCanBe")} ${e("EAddonsAreAdaptedToTheStyle")} ${e("EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures")}`}],$=26,a=28,g=33,c={maintenance:{price:$},updates:{price:a},translation:{price:g},training:{price:g}},r=[{name:e("EWebsiteMaintenance"),id:"misc-maintenance",price:c.maintenance.price,description:`${e("EWebsiteMaintenance")}: ${c.maintenance.price}€/${e("EHourSmall")} ${e("EForWordPressOrReactNodeBasedWebsites")}. `},{name:e("EWebsiteContentUpdatesOrModifications"),id:"misc-updates",price:c.updates.price,description:`${e("EWebsiteContentUpdatesOrModifications")}: ${c.updates.price}€/${e("EHourSmall")} ${e("EForWordPressOrReactNodeBasedWebsites")}. `},{name:e("ETranslationWork"),id:"misc-translation",price:c.translation.price,description:`${e("ETranslationWork")}: ${c.translation.price}€/${e("EHourSmall")}. `},{name:e("ETrainingInWebsiteManagement"),id:"misc-training",price:c.training.price,description:`${e("EForSitesByJenniina")}: ${e("ETrainingInWebsiteManagementDescription")} ${c.training.price}€/${e("EHourSmall")}. 

${e("ENote")} ${e("EOneHourOfTrainingIncluded")} `},{name:e("ERequestForQuote"),id:"misc-quote",price:0,description:`${e("ERequestForQuoteForProductsNotInStore")}. 

${e("EEGInfographicsOrMotionGraphics")}. ${o!==m.en&&o!==m.fi?`

${e("EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo")}`:""}`}],d=[{id:"graphic-flyer-1",name:`${e("EFlyerDesign")} 1`,price:230,description:`${e("EOneSided")}. ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-flyer-2",name:`${e("EFlyerDesign")} 2`,price:270,description:`${e("ETwoSided")}. ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-business-card-1",name:`${e("EBusinessCardDesign")} 1`,price:220,description:`${e("EOneSidedBusinessCard")}. ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-business-card-2",name:`${e("EBusinessCardDesign")} 2`,price:320,description:`${e("ETwoSidedBusinessCard")}. ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-poster",name:e("EPosterDesign"),price:290,description:`${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-programme",name:e("EProgrammeDesign"),price:320,description:`${e("EFourPageA5SizeProgramme")}. ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-poster-programme",name:e("EPosterAndProgramme"),price:400,description:`${e("EPosterAndProgrammeCombo")}. ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`},{id:"graphic-logo",name:e("ELogoDesign"),price:250,description:`${e("EIncludesPrintableAndWebVersionOfTheLogo")} ${e("EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts")}`}],p=E.map(n=>(n.quantity=0,n.details="",n.status="pending",n.paid="none",n)),x=A.map(n=>(n.quantity=0,n.details="",n.status="pending",n.paid="none",n)),C=d.map(n=>(n.quantity=0,n.details="",n.status="pending",n.paid="none",n)),F=r.map(n=>(n.quantity=0,n.details="",n.status="pending",n.paid="none",n)),f=[{name:e("EWebsites"),id:"misc",array:F,intro:o!==m.fi&&o!==m.en?`${e("EIfYouAreUnsureAboutReactOrWordPress")} ${e("EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo")}`:`${e("EIfYouAreUnsureAboutReactOrWordPress")}`,link:i.jsx(P,{to:"/contact",children:e("EContactForm")})},{name:"React & Node",id:"react",array:p,intro:`${e("EReactSitesAppsAreFastAndResponsive")}`,link:null},{name:"WordPress",id:"wordpress",array:x,intro:`${e("EWordPressSitesAreVersatile")} ${e("EUpdatingWordPressIsSimple")}`,link:i.jsxs(i.Fragment,{children:[e("EExampleSites")," (",e("EMainSite").toLowerCase(),"):",i.jsxs("ul",{className:"ul",children:[i.jsxs("li",{children:[i.jsx("a",{href:"https://jenniina.fi/jyvaskylan-salonkiorkesteri-orchestra-website/#title",children:e("EOrchestraWebsite")})," "]}),i.jsxs("li",{children:[i.jsx("a",{href:"https://jenniina.fi/metal-2022/#metal2022",children:e("EConferenceWebsite")})," "]}),i.jsx("li",{children:i.jsx("a",{href:"https://jenniina.fi/website-of-psychologist/#sirkku",children:e("EPsychologistWebsite")})})]})]})},{name:e("EGraphicDesign"),id:"graphic",array:C,intro:"",link:i.jsxs(i.Fragment,{children:[e("EProducts")," (",e("EMainSite").toLowerCase(),"):"," ",i.jsxs("a",{href:"https://jenniina.fi/portfolio#graphic-design",children:[e("EGraphicDesign")," (",e("ESampleArtwork"),")"]})]})}];return i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:`${s["scroll-button-wrap"]} ${u?s.light:""}`,children:[f.map((n,S)=>S===0?null:i.jsx(q,{styles:s,name:n.name,id:n.id,direction:"below"},n.id))," "]}),f.map(n=>i.jsx(v,{id:n.id,language:o,items:n.array,name:n.name,intro:n.intro,link:n.link,cart:l,addToCart:h,removeFromCart:t},n.id))]})};export{oe as default};
