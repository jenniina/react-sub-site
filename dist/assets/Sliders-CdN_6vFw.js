import{r as b,j as r}from"./react-kX_YxI4E.js";import{L as f}from"./index-DlLCwrmZ.js";import"./dom-to-image-more-CfDXlNbO.js";import"./react-dom-B5MLDbn_.js";import"./scheduler-CzFDRTuY.js";import"./react-redux-BEmJlIGA.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./react-is-DUDD-a5e.js";import"./use-sync-external-store-BPp6CH6k.js";import"./@reduxjs-DhFEcpJw.js";import"./immer-C0GRqQ_d.js";import"./redux-CE3tqztX.js";import"./@babel-DF5_wy6Y.js";import"./redux-thunk-CY0Q9z1Q.js";import"./axios-CCb-kr4I.js";import"./react-icons-CzVo0GbG.js";import"./react-router-dom-StiqOUIT.js";import"./react-router-DUuhLvki.js";import"./@remix-run-DTnHqtaE.js";const T=({d:a,language:k,sliderLightnessInput:u,setSliderLightVal:t,sliderLightness:o,sliderLightVal:l,defaultLightness:c,sliderLightnessReset:x,sliderSaturationInput:h,setSliderSatVal:n,sliderSaturation:d,sliderSatVal:p,defaultSaturation:j,sliderSaturationReset:v,sliderHueInput:$,setSliderHueVal:i,sliderHue:g,sliderHueVal:m,defaultHue:C,sliderHueReset:N})=>{const{t:s}=b.useContext(f);return r.jsx(r.Fragment,{children:r.jsxs("div",{id:`drag-slider-wrap${a}`,className:"drag-slider-wrap",children:[r.jsxs("div",{className:"drag-slider-single",children:[r.jsx("label",{htmlFor:`drag-slider-hue${a}`,id:`huedescription${a}`,children:s("AdjustBackgroundHue")}),r.jsx("input",{ref:$,onChange:e=>{i(e.target.value),g()},onMouseUp:e=>{i(e.target.value),g()},onPointerUp:e=>{i(e.target.value),g()},type:"range",min:0,max:359,value:m,className:"drag-slider drag-slider-hue",id:`drag-slider-hue${a}`}),r.jsx("span",{children:m}),r.jsx("button",{onClick:()=>{i(C),N()},children:s("ResetHue")})]}),r.jsxs("div",{className:"drag-slider-single",children:[r.jsx("label",{htmlFor:`drag-slider-saturation${a}`,id:`saturationdescription${a}`,children:s("AdjustBackgroundSaturation")}),r.jsx("input",{ref:h,onChange:e=>{n(e.target.value),d()},onMouseUp:e=>{n(e.target.value),d()},onPointerUp:e=>{n(e.target.value),d()},type:"range",min:0,max:100,value:p,className:"drag-slider drag-slider-saturation",id:`drag-slider-saturation${a}`}),r.jsx("span",{children:p}),r.jsx("button",{onClick:()=>{n(j),v()},children:s("ResetSaturation")})]}),r.jsxs("div",{className:"drag-slider-single",children:[r.jsx("label",{htmlFor:`drag-slider-lightness${a}`,id:`lightnessdescription${a}`,children:s("AdjustBackgroundLightness")}),r.jsx("input",{ref:u,onChange:e=>{t(e.target.value),o()},onMouseUp:e=>{t(e.target.value),o()},onPointerUp:e=>{t(e.target.value),o()},type:"range",min:0,max:100,value:l,className:"drag-slider drag-slider-lightness",id:`drag-slider-lightness${a}`}),r.jsx("span",{children:l}),r.jsx("button",{onClick:()=>{t(c),x()},children:s("ResetLightness")})]})]})})};export{T as default};
