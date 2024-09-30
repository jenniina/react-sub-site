import{t as L,c as F,r as z,F as B}from"./immer-BNrqi0cU.js";import{c as Y,a as H,b as J,d as D}from"./redux-CE3tqztX.js";import{t as W}from"./redux-thunk-CY0Q9z1Q.js";var X=function(){var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,o){n.__proto__=o}||function(n,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])},r(t,e)};return function(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");r(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}}(),K=function(r,t){var e={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,o,i,v;return v={next:h(0),throw:h(1),return:h(2)},typeof Symbol=="function"&&(v[Symbol.iterator]=function(){return this}),v;function h(a){return function(c){return s([a,c])}}function s(a){if(n)throw new TypeError("Generator is already executing.");for(;e;)try{if(n=1,o&&(i=a[0]&2?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[a[0]&2,i.value]),a[0]){case 0:case 1:i=a;break;case 4:return e.label++,{value:a[1],done:!1};case 5:e.label++,o=a[1],a=[0];continue;case 7:a=e.ops.pop(),e.trys.pop();continue;default:if(i=e.trys,!(i=i.length>0&&i[i.length-1])&&(a[0]===6||a[0]===2)){e=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){e.label=a[1];break}if(a[0]===6&&e.label<i[1]){e.label=i[1],i=a;break}if(i&&e.label<i[2]){e.label=i[2],e.ops.push(a);break}i[2]&&e.ops.pop(),e.trys.pop();continue}a=t.call(r,e)}catch(c){a=[6,c],o=0}finally{n=i=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},A=function(r,t){for(var e=0,n=t.length,o=r.length;e<n;e++,o++)r[o]=t[e];return r},Q=Object.defineProperty,Z=Object.defineProperties,$=Object.getOwnPropertyDescriptors,V=Object.getOwnPropertySymbols,ee=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable,q=function(r,t,e){return t in r?Q(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e},E=function(r,t){for(var e in t||(t={}))ee.call(t,e)&&q(r,e,t[e]);if(V)for(var n=0,o=V(t);n<o.length;n++){var e=o[n];re.call(t,e)&&q(r,e,t[e])}return r},M=function(r,t){return Z(r,$(t))},te=function(r,t,e){return new Promise(function(n,o){var i=function(s){try{h(e.next(s))}catch(a){o(a)}},v=function(s){try{h(e.throw(s))}catch(a){o(a)}},h=function(s){return s.done?n(s.value):Promise.resolve(s.value).then(i,v)};h((e=e.apply(r,t)).next())})},ne=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?D:D.apply(null,arguments)};function ae(r){if(typeof r!="object"||r===null)return!1;var t=Object.getPrototypeOf(r);if(t===null)return!0;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return t===e}function j(r,t){function e(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(t){var i=t.apply(void 0,n);if(!i)throw new Error("prepareAction did not return an object");return E(E({type:r,payload:i.payload},"meta"in i&&{meta:i.meta}),"error"in i&&{error:i.error})}return{type:r,payload:n[0]}}return e.toString=function(){return""+r},e.type=r,e.match=function(n){return n.type===r},e}var oe=function(r){X(t,r);function t(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=r.apply(this,e)||this;return Object.setPrototypeOf(o,t.prototype),o}return Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return r.prototype.concat.apply(this,e)},t.prototype.prepend=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.length===1&&Array.isArray(e[0])?new(t.bind.apply(t,A([void 0],e[0].concat(this)))):new(t.bind.apply(t,A([void 0],e.concat(this))))},t}(Array),ie=function(r){X(t,r);function t(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=r.apply(this,e)||this;return Object.setPrototypeOf(o,t.prototype),o}return Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return r.prototype.concat.apply(this,e)},t.prototype.prepend=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.length===1&&Array.isArray(e[0])?new(t.bind.apply(t,A([void 0],e[0].concat(this)))):new(t.bind.apply(t,A([void 0],e.concat(this))))},t}(Array);function k(r){return L(r)?F(r,function(){}):r}function ue(r){return typeof r=="boolean"}function ce(){return function(t){return fe(t)}}function fe(r){r===void 0&&(r={});var t=r.thunk,e=t===void 0?!0:t;r.immutableCheck,r.serializableCheck,r.actionCreatorCheck;var n=new oe;return e&&(ue(e)?n.push(W):n.push(W.withExtraArgument(e.extraArgument))),n}var le=!0;function je(r){var t=ce(),e=r||{},n=e.reducer,o=n===void 0?void 0:n,i=e.middleware,v=i===void 0?t():i,h=e.devTools,s=h===void 0?!0:h,a=e.preloadedState,c=a===void 0?void 0:a,f=e.enhancers,d=f===void 0?void 0:f,l;if(typeof o=="function")l=o;else if(ae(o))l=Y(o);else throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');var u=v;typeof u=="function"&&(u=u(t));var y=H.apply(void 0,u),w=D;s&&(w=ne(E({trace:!le},typeof s=="object"&&s)));var p=new ie(y),m=p;Array.isArray(d)?m=A([y],d):typeof d=="function"&&(m=d(p));var _=w.apply(void 0,m);return J(l,c,_)}function U(r){var t={},e=[],n,o={addCase:function(i,v){var h=typeof i=="string"?i:i.type;if(!h)throw new Error("`builder.addCase` cannot be called with an empty action type");if(h in t)throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");return t[h]=v,o},addMatcher:function(i,v){return e.push({matcher:i,reducer:v}),o},addDefaultCase:function(i){return n=i,o}};return r(o),[t,e,n]}function de(r){return typeof r=="function"}function se(r,t,e,n){e===void 0&&(e=[]);var o=typeof t=="function"?U(t):[t,e,n],i=o[0],v=o[1],h=o[2],s;if(de(r))s=function(){return k(r())};else{var a=k(r);s=function(){return a}}function c(f,d){f===void 0&&(f=s());var l=A([i[d.type]],v.filter(function(u){var y=u.matcher;return y(d)}).map(function(u){var y=u.reducer;return y}));return l.filter(function(u){return!!u}).length===0&&(l=[h]),l.reduce(function(u,y){if(y)if(z(u)){var w=u,p=y(w,d);return p===void 0?u:p}else{if(L(u))return F(u,function(m){return y(m,d)});var p=y(u,d);if(p===void 0){if(u===null)return u;throw Error("A case reducer on a non-draftable value must not return undefined")}return p}return u},f)}return c.getInitialState=s,c}function ve(r,t){return r+"/"+t}function _e(r){var t=r.name;if(!t)throw new Error("`name` is a required option for createSlice");typeof process<"u";var e=typeof r.initialState=="function"?r.initialState:k(r.initialState),n=r.reducers||{},o=Object.keys(n),i={},v={},h={};o.forEach(function(c){var f=n[c],d=ve(t,c),l,u;"reducer"in f?(l=f.reducer,u=f.prepare):l=f,i[c]=l,v[d]=l,h[c]=u?j(d,u):j(d)});function s(){var c=typeof r.extraReducers=="function"?U(r.extraReducers):[r.extraReducers],f=c[0],d=f===void 0?{}:f,l=c[1],u=l===void 0?[]:l,y=c[2],w=y===void 0?void 0:y,p=E(E({},d),v);return se(e,function(m){for(var _ in p)m.addCase(_,p[_]);for(var g=0,O=u;g<O.length;g++){var C=O[g];m.addMatcher(C.matcher,C.reducer)}w&&m.addDefaultCase(w)})}var a;return{name:t,reducer:function(c,f){return a||(a=s()),a(c,f)},actions:h,caseReducers:i,getInitialState:function(){return a||(a=s()),a.getInitialState()}}}var he="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",ye=function(r){r===void 0&&(r=21);for(var t="",e=r;e--;)t+=he[Math.random()*64|0];return t},pe=["name","message","stack","code"],T=function(){function r(t,e){this.payload=t,this.meta=e}return r}(),G=function(){function r(t,e){this.payload=t,this.meta=e}return r}(),me=function(r){if(typeof r=="object"&&r!==null){for(var t={},e=0,n=pe;e<n.length;e++){var o=n[e];typeof r[o]=="string"&&(t[o]=r[o])}return t}return{message:String(r)}},Pe=function(){function r(t,e,n){var o=j(t+"/fulfilled",function(a,c,f,d){return{payload:a,meta:M(E({},d||{}),{arg:f,requestId:c,requestStatus:"fulfilled"})}}),i=j(t+"/pending",function(a,c,f){return{payload:void 0,meta:M(E({},f||{}),{arg:c,requestId:a,requestStatus:"pending"})}}),v=j(t+"/rejected",function(a,c,f,d,l){return{payload:d,error:(n&&n.serializeError||me)(a||"Rejected"),meta:M(E({},l||{}),{arg:f,requestId:c,rejectedWithValue:!!d,requestStatus:"rejected",aborted:(a==null?void 0:a.name)==="AbortError",condition:(a==null?void 0:a.name)==="ConditionError"})}}),h=typeof AbortController<"u"?AbortController:function(){function a(){this.signal={aborted:!1,addEventListener:function(){},dispatchEvent:function(){return!1},onabort:function(){},removeEventListener:function(){},reason:void 0,throwIfAborted:function(){}}}return a.prototype.abort=function(){},a}();function s(a){return function(c,f,d){var l=n!=null&&n.idGenerator?n.idGenerator(a):ye(),u=new h,y;function w(m){y=m,u.abort()}var p=function(){return te(this,null,function(){var m,_,g,O,C,S,x;return K(this,function(P){switch(P.label){case 0:return P.trys.push([0,4,,5]),O=(m=n==null?void 0:n.condition)==null?void 0:m.call(n,a,{getState:f,extra:d}),we(O)?[4,O]:[3,2];case 1:O=P.sent(),P.label=2;case 2:if(O===!1||u.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};return C=new Promise(function(b,R){return u.signal.addEventListener("abort",function(){return R({name:"AbortError",message:y||"Aborted"})})}),c(i(l,a,(_=n==null?void 0:n.getPendingMeta)==null?void 0:_.call(n,{requestId:l,arg:a},{getState:f,extra:d}))),[4,Promise.race([C,Promise.resolve(e(a,{dispatch:c,getState:f,extra:d,requestId:l,signal:u.signal,abort:w,rejectWithValue:function(b,R){return new T(b,R)},fulfillWithValue:function(b,R){return new G(b,R)}})).then(function(b){if(b instanceof T)throw b;return b instanceof G?o(b.payload,l,a,b.meta):o(b,l,a)})])];case 3:return g=P.sent(),[3,5];case 4:return S=P.sent(),g=S instanceof T?v(null,l,a,S.payload,S.meta):v(S,l,a),[3,5];case 5:return x=n&&!n.dispatchConditionRejection&&v.match(g)&&g.meta.condition,x||c(g),[2,g]}})})}();return Object.assign(p,{abort:w,requestId:l,arg:a,unwrap:function(){return p.then(be)}})}}return Object.assign(s,{pending:i,rejected:v,fulfilled:o,typePrefix:t})}return r.withTypes=function(){return r},r}();function be(r){if(r.meta&&r.meta.rejectedWithValue)throw r.payload;if(r.error)throw r.error;return r.payload}function we(r){return r!==null&&typeof r=="object"&&typeof r.then=="function"}var I="listenerMiddleware";j(I+"/add");j(I+"/removeAll");j(I+"/remove");var N;typeof queueMicrotask=="function"&&queueMicrotask.bind(typeof window<"u"?window:typeof global<"u"?global:globalThis);B();export{Pe as a,je as b,_e as c};
