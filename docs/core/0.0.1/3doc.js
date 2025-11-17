var Me={},as=Symbol("terminator");function Gr(e,t){let r=!1,a={error:n,unsubscribe:o,get closed(){return r},signal:Ie(),next(s){if(!r)try{e.next?.(s)}catch(i){n(i)}},complete(){if(!r)try{e.complete?.()}finally{o()}}};e.signal?.subscribe(o);function n(s){if(r)throw s;if(!e.error)throw o(),s;try{e.error(s)}finally{o()}}function o(){r||(r=!0,a.signal.next())}try{if(t?.(a))throw new Error("Unsubscribe function result is deprectaed")}catch(s){n(s)}return a}var j=class{__subscribe;constructor(e){this.__subscribe=e}then(e,t){return Kr(this).then(e,t)}pipe(...e){return e.reduce((t,r)=>r(t),this)}subscribe(e){return Gr(!e||typeof e=="function"?{next:e}:e,this.__subscribe)}},_e=class extends j{closed=!1;signal=Ie();observers=new Set;constructor(){super(e=>this.onSubscribe(e))}next(e){if(!this.closed)for(let t of Array.from(this.observers))t.closed||t.next(e)}error(e){if(!this.closed){this.closed=!0;let t=!1,r;for(let a of Array.from(this.observers))try{a.error(e)}catch(n){t=!0,r=n}if(t)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(e=>e.complete()),this.observers.clear())}onSubscribe(e){this.closed?e.complete():(this.observers.add(e),e.signal.subscribe(()=>this.observers.delete(e)))}},Zr=class extends j{closed=!1;observers=new Set;constructor(){super(e=>{this.closed?(e.next(),e.complete()):this.observers.add(e)})}next(){if(!this.closed){this.closed=!0;for(let e of Array.from(this.observers))e.closed||(e.next(),e.complete());this.observers.clear()}}},Qt=class extends _e{queue=[];emitting=!1;next(e){if(!this.closed)if(this.emitting)this.queue.push(e);else{for(this.emitting=!0,super.next(e);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},bt=class extends _e{currentValue;constructor(e){super(),this.currentValue=e}get value(){return this.currentValue}next(e){this.currentValue=e,super.next(e)}onSubscribe(e){let t=super.onSubscribe(e);return this.closed||e.next(this.currentValue),t}},Qr=class extends _e{bufferSize;buffer=[];hasError=!1;lastError;constructor(e=1/0){super(),this.bufferSize=e}error(e){this.hasError=!0,this.lastError=e,super.error(e)}next(e){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(e),super.next(e)}onSubscribe(e){this.observers.add(e),this.buffer.forEach(t=>e.next(t)),this.hasError?e.error(this.lastError):this.closed&&e.complete(),e.signal.subscribe(()=>this.observers.delete(e))}},Xe=class extends _e{$value=Me;get hasValue(){return this.$value!==Me}get value(){if(this.$value===Me)throw new Error("Reference not initialized");return this.$value}next(e){return this.$value=e,super.next(e)}onSubscribe(e){!this.closed&&this.$value!==Me&&e.next(this.$value),super.onSubscribe(e)}},Jr=class extends Error{message="No elements in sequence"};function Ie(){return new Zr}function he(...e){return new j(t=>{let r=0,a;function n(){let o=e[r++];o&&!t.closed?(a?.next(),o.subscribe({next:t.next,error:t.error,complete:n,signal:a=Ie()})):t.complete()}t.signal.subscribe(()=>a?.next()),n()})}function ae(e){return new j(t=>{e().subscribe(t)})}function Jt(e){return new j(t=>{for(let r of e)t.closed||t.next(r);t.complete()})}function Xt(e){return new j(t=>{e.then(r=>{t.closed||t.next(r),t.complete()}).catch(r=>t.error(r))})}function Ke(e){return ae(()=>Xt(e()))}function Xr(e){return new j(t=>{for(let r of e)t.closed||t.next(r);t.complete()})}function Kt(e){return e instanceof j?e:Array.isArray(e)?Jt(e):e instanceof Promise?Xt(e):Xr(e)}function J(...e){return Jt(e)}function Vn(e){return new Promise((t,r)=>{let a=Me;e.subscribe({next:n=>a=n,error:n=>r(n),complete:()=>t(a)})})}function Kr(e){return Vn(e).then(t=>t===Me?void 0:t)}function De(e,t){return ge(r=>({next:e(r),unsubscribe:t}))}function ge(e){return t=>new j(r=>{let a=e(r,t);r.signal.subscribe(()=>a.unsubscribe?.()),a.error||(a.error=r.error),a.complete||(a.complete=r.complete),a.signal=r.signal,t.subscribe(a)})}function vt(e){return De(t=>r=>t.next(e(r)))}function ea(e,t){return ge(r=>{let a=t,n=0;return{next(o){a=e(a,o,n++)},complete(){r.next(a),r.complete()}}})}function ta(e){return ge(t=>{let r=!0,a;return{next(n){r&&(r=!1,t.next(n),a=setTimeout(()=>r=!0,e))},unsubscribe:()=>clearTimeout(a)}})}function Ee(e){return new j(t=>{let r=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(r))})}function ra(e,t=Ee){return er(r=>t(e).map(()=>r))}function er(e){return t=>ie(r=>{let a=!1,n=!1,o,s=()=>{o?.next(),a=!1,n&&r.complete()},i=Ie();r.signal.subscribe(()=>{s(),i.next()}),t.subscribe({next(l){s(),o=Ie(),a=!0,e(l).subscribe({next:r.next,error:r.error,complete:s,signal:o})},error:r.error,complete(){n=!0,a||r.complete()},signal:i})})}function aa(e){return t=>ie(r=>{let a=r.signal,n=0,o=0,s=!1;t.subscribe({next:i=>{n++,e(i).subscribe({next:r.next,error:r.error,complete:()=>{o++,s&&o===n&&r.complete()},signal:a})},error:r.error,complete(){s=!0,o===n&&r.complete()},signal:a})})}function na(e){return ge(t=>{let r=!0;return{next(a){r&&(r=!1,e(a).subscribe({next:t.next,error:t.error,complete:()=>r=!0,signal:t.signal}))}}})}function et(e){return De(t=>r=>{e(r)&&t.next(r)})}function oa(e){return De(t=>r=>{e-- >0&&!t.closed&&t.next(r),(e<=0||t.closed)&&t.complete()})}function sa(e){return De(t=>r=>{!t.closed&&e(r)?t.next(r):t.complete()})}function ia(){let e=!1;return ge(t=>({next(r){e||(e=!0,t.next(r),t.complete())},complete(){t.closed||t.error(new Jr)}}))}function tt(e){return De(t=>r=>{e(r),t.next(r)})}function la(e){return ge((t,r)=>{let a,n={next:t.next,error(o){try{if(t.closed)return;let s=e(o,r);s&&(a?.next(),a=Ie(),s.subscribe({...n,signal:a}))}catch(s){t.error(s)}},unsubscribe:()=>a?.next()};return n})}function ca(){return De(e=>{let t=Me;return r=>{r!==t&&(t=r,e.next(r))}})}function ua(){return e=>{let t=new Qr(1),r=!1;return ie(a=>{t.subscribe(a),r||(r=!0,e.subscribe(t))})}}function pa(){return e=>{let t,r=0;function a(){--r===0&&t?.signal.next()}return ie(n=>{n.signal.subscribe(a),r++===0?(t=qe(),t.subscribe(n),e.subscribe(t)):t.subscribe(n)})}}function da(){return e=>{let t=new _e,r,a,n=!1,o=!1;return ie(s=>{o?(s.next(a),s.complete()):t.subscribe(s),r??=e.subscribe({next:i=>{n=!0,a=i},error:s.error,complete(){o=!0,n&&t.next(a),t.complete()},signal:s.signal})})}}function M(...e){return e.length===1?e[0]:new j(t=>{let r=e.length;for(let a of e)t.closed||a.subscribe({next:t.next,error:t.error,complete(){r--===1&&t.complete()},signal:t.signal})})}function se(...e){return e.length===0?_:new j(t=>{let r=e.length,a=r,n=0,o=!1,s=new Array(r),i=new Array(r);e.forEach((l,S)=>l.subscribe({next(g){i[S]=g,s[S]||(s[S]=!0,++n>=a&&(o=!0)),o&&t.next(i.slice(0))},error:t.error,complete(){--r<=0&&t.complete()},signal:t.signal}))})}function fa(e){return ge(t=>({next:t.next,unsubscribe:e}))}function ma(){return et(()=>!1)}var _=new j(e=>e.complete());function de(e){return new bt(e)}function ie(e){return new j(e)}function qe(){return new Xe}var Zt={catchError:la,debounceTime:ra,distinctUntilChanged:ca,exhaustMap:na,filter:et,finalize:fa,first:ia,ignoreElements:ma,map:vt,mergeMap:aa,publishLast:da,reduce:ea,share:pa,shareLatest:ua,switchMap:er,take:oa,takeWhile:sa,tap:tt,throttleTime:ta};for(let e in Zt)j.prototype[e]=function(...t){return this.pipe(Zt[e](...t))};function B(e,t,r){return new j(a=>{let n=a.next.bind(a);e.addEventListener(t,n,r),a.signal.subscribe(()=>e.removeEventListener(t,n,r))})}function rt(e){return yt(e,{childList:!0})}function tr(e,t){return yt(e,{attributes:!0,attributeFilter:t})}function yt(e,t={attributes:!0,childList:!0}){return new j(r=>{let a=new MutationObserver(n=>n.forEach(o=>{for(let s of o.addedNodes)r.next({type:"added",target:e,value:s});for(let s of o.removedNodes)r.next({type:"removed",target:e,value:s});o.type==="characterData"?r.next({type:"characterData",target:e}):o.attributeName&&r.next({type:"attribute",target:e,value:o.attributeName})}));a.observe(e,t),r.signal.subscribe(()=>a.disconnect())})}function rr(e){return B(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function oe(e){return B(e,"click")}function at(e,t){return new j(r=>{let a=new IntersectionObserver(n=>{for(let o of n)r.next(o)},t);a.observe(e),r.signal.subscribe(()=>a.disconnect())})}function ar(e){return at(e).map(t=>t.isIntersecting)}function Re(e){return at(e).filter(t=>t.isIntersecting).first()}function ha(e){let t;return function(...r){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,r),t=0})}}function nr(e){return ge(t=>{let r=ha(n=>{t.closed||(e&&e(n),t.next(n),a&&t.complete())}),a=!1;return{next:r,complete:()=>a=!0}})}function or(){return ae(()=>document.readyState!=="loading"?J(!0):B(window,"DOMContentLoaded").first().map(()=>!0))}function nt(e,t){let r;return M(ae(()=>(r=e.childNodes,r?J(r):_)),yt(e,{childList:!0,...t}),ve().switchMap(()=>e.childNodes!==r?(r=e.childNodes,J(r)):_))}function ve(){return ae(()=>document.readyState==="complete"?J(!0):B(window,"load").first().map(()=>!0))}function sr(...e){return new j(t=>{let r=new ResizeObserver(a=>a.forEach(n=>t.next(n)));for(let a of e)r.observe(a);t.signal.subscribe(()=>r.disconnect())})}function ir(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function wt(e,t,r){return a=>he(J(e?a.matches(e):!1),B(a,t).switchMap(()=>M(J(!0),B(a,r).map(()=>e?a.matches(e):!1))))}var Gn=wt("","animationstart","animationend"),kt=wt("","mouseenter","mouseleave"),ga=wt(":focus,:focus-within","focusin","focusout"),St=e=>se(kt(e),ga(e)).map(([t,r])=>t||r);function We(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function lr(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var Zn=tt(e=>console.log(e));j.prototype.log=function(){return this.pipe(Zn)};j.prototype.raf=function(e){return this.pipe(nr(e))};var te=Symbol("bindings"),Qn={},Ye=Symbol("augments"),ze=Symbol("parser"),xa=class{bindings;messageHandlers;internals;attributes$=new Qt;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(e){(this.messageHandlers??=new Set).add(e)}removeMessageHandler(e){this.messageHandlers?.delete(e)}message(e,t){let r=!1;if(this.messageHandlers)for(let a of this.messageHandlers)a.type===e&&(a.next(t),r||=a.stopPropagation);return r}add(e){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(e):(this.prebind??=[]).push(e)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let e=this.subscriptions=[];if(this.bindings)for(let t of this.bindings)e.push(t.subscribe());if(this.prebind)for(let t of this.prebind)e.push(t.subscribe())}}disconnect(){this.subscriptions?.forEach(e=>e.unsubscribe()),this.subscriptions=void 0}},st=Symbol("css"),T=class extends HTMLElement{static observedAttributes;static[Ye];static[ze];[te]=new xa;[st];connectedCallback(){this[te].wasInitialized=!0,this[te].wasConnected||this.constructor[Ye]?.forEach(e=>e(this)),this[te].connect()}disconnectedCallback(){this[te].disconnect()}attributeChangedCallback(e,t,r){let a=this.constructor[ze]?.[e]??Jn;t!==r&&(this[e]=a(r,this[e]))}};function Jn(e,t){let r=t===!1||t===!0;return e===""?r?!0:"":e===null?r?!1:void 0:e}function ba(e,t){e.hasOwnProperty(Ye)||(e[Ye]=e[Ye]?.slice(0)??[]),e[Ye]?.push(t)}var Xn={mode:"open"};function X(e){return e.shadowRoot??e.attachShadow(Xn)}function va(e,t){t instanceof Node?X(e).appendChild(t):e[te].add(t)}function Kn(e,t){t.length&&ba(e,r=>{for(let a of t){let n=a.call(e,r);n&&n!==r&&va(r,n)}})}function eo(e,t){Qn[e]=t,customElements.define(e,t)}function v(e,{init:t,augment:r,tagName:a}){if(t)for(let n of t)n(e);r&&Kn(e,r),a&&eo(a,e)}function Fe(e){return he(J(e),e[te].attributes$.map(()=>e))}function ee(e,t){return e[te].attributes$.pipe(et(r=>r.attribute===t),vt(()=>e[t]))}function z(e,t){return M(ee(e,t),ae(()=>J(e[t])))}function to(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function $t(e,t,r){return r===!1||r===null||r===void 0?r=null:r===!0&&(r=""),r===null?e.removeAttribute(t):e.setAttribute(t,String(r)),r}function ro(e,t,r){e.hasOwnProperty(ze)||(e[ze]={...e[ze]}),e[ze]&&(e[ze][t]=r)}function R(e,t){return r=>{t?.observe!==!1&&to(r).push(e),t?.parse&&ro(r,e,t.parse);let a=`$$${e}`,n=r.prototype,o=Object.getOwnPropertyDescriptor(n,e);o&&Object.defineProperty(n,a,o);let s=t?.persist,i={enumerable:!0,configurable:!1,get(){return this[a]},set(l){this[a]!==l?(this[a]=l,s?.(this,e,l),this[te].attributes$.next({target:this,attribute:e,value:l})):o?.set&&(s?.(this,e,l),this[a]=l)}};ba(r,l=>{if(o||(l[a]=l[e]),Object.defineProperty(l,e,i),s?.(l,e,l[e]),t?.render){let S=t.render(l);S&&va(l,S)}})}}function F(e){return R(e,{persist:$t,observe:!0})}function xe(e){return R(e,{observe:!1})}function q(){return document.createElement("slot")}function ur(e){return t=>{let[r,a]=e();return t[te].add(r),a}}var it=class extends T{};v(it,{tagName:"c-span"});function ya(e,t){let r=document.createTextNode("");return e[te].add(t.tap(a=>r.textContent=a)),r}var cr=document.createDocumentFragment();function ot(e,t,r=e){if(t!=null)if(Array.isArray(t)){for(let a of t)ot(e,a,cr);r!==cr&&r.appendChild(cr)}else e instanceof T&&t instanceof j?r.appendChild(ya(e,t)):t instanceof Node?r.appendChild(t):e instanceof T&&typeof t=="function"?ot(e,t(e),r):r.appendChild(document.createTextNode(t))}function wa(e,t){for(let r in t){let a=t[r];e instanceof T?a instanceof j?e[te].add(r==="$"?a:a.tap(n=>e[r]=n)):r==="$"&&typeof a=="function"?e[te].add(a(e)):e[r]=a:e[r]=a}}function ao(e,t){return e.constructor.observedAttributes?.includes(t)}function pr(e,t){let r=e instanceof T&&ao(e,t)?ee(e,t):tr(e,[t]).map(()=>e[t]);return M(r,ae(()=>J(e[t])))}function dr(e,t,r){return R(e,{parse(a){if(a==="Infinity"||a==="infinity")return 1/0;let n=a===void 0?void 0:Number(a);return t!==void 0&&(n===void 0||n<t||isNaN(n))&&(n=t),r!==void 0&&n!==void 0&&n>r&&(n=r),n}})}function Ce(e,t,r){for(let a=e.parentElement;a;a=a.parentElement)if(a[te]?.message(t,r))return}function Le(e,t,r=!0){return new j(a=>{let n={type:t,next:a.next,stopPropagation:r};e[te].addMessageHandler(n),a.signal.subscribe(()=>e[te].removeMessageHandler(n))})}function W(e,t,...r){let a=typeof e=="string"?document.createElement(e):new e;return t&&wa(a,t),r&&ot(a,r),a}function L(e,t,...r){if(e!==L&&typeof e=="function"&&!(e.prototype instanceof T))return r.length&&((t??={}).children=r),e(t);let a=e===L?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&wa(a,t),r&&ot(a,r),a}var no=/([^&=]+)=?([^&]*)/g,oo=/:([\w_$@]+)/g,so=/\/\((.*?)\)/g,io=/(\(\?)?:\w+/g,lo=/\*\w+/g,co=/[-{}[\]+?.,\\^$|#\s]/g,uo=/([^#]*)(?:#(.+))?/,fr="@@cxlRoute",ce={location:window.location,history:window.history};function po(e){let t=[];return[new RegExp("^/?"+e.replace(co,"\\$&").replace(so,"\\/?(?:$1)?").replace(io,function(r,a){return t.push(r.substr(1)),a?r:"([^/?]*)"}).replace(lo,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function mr(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function Ct(e,t){return t?e.replace(oo,(r,a)=>t[a]||""):e}function ka(e){let t={},r;for(;r=no.exec(e);)t[r[1]]=decodeURIComponent(r[2]);return t}var fo=class{path;regex;parameters;constructor(e){this.path=e=mr(e),[this.regex,this.parameters]=po(e)}_extractQuery(e){let t=e.indexOf("?");return t===-1?{}:ka(e.slice(t+1))}getArguments(e){let t=this.regex.exec(e),r=t&&t.slice(1);if(!r)return;let a=this._extractQuery(e);return r.forEach((n,o)=>{let s=o===r.length-1?n||"":n?decodeURIComponent(n):"";a[this.parameters[o]]=s}),a}test(e){return this.regex.test(e)}toString(){return this.path}},Sa=class{id;path;parent;redirectTo;definition;isDefault;constructor(e){if(e.path!==void 0)this.path=new fo(e.path);else if(!e.id)throw console.log(e),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=e.id||(e.path??`route${Math.random().toString()}`),this.isDefault=e.isDefault||!1,this.parent=e.parent,this.redirectTo=e.redirectTo,this.definition=e}create(e){let t=this.definition.render();t[fr]=this;for(let r in e)e[r]!==void 0&&(t[r]=e[r]);return t}},$a=class{routes=[];defaultRoute;findRoute(e){return this.routes.find(t=>t.path?.test(e))??this.defaultRoute}get(e){return this.routes.find(t=>t.id===e)}register(e){if(e.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=e}this.routes.unshift(e)}};function Ea(e){return e[fr]}function Pe(e){let t=uo.exec(e);return{path:mr(t?.[1]||""),hash:t?.[2]||""}}var Ca={getHref(e){return e=typeof e=="string"?Pe(e):e,`${ce.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ce.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let r=this.getHref(e);r!==`${location.pathname}${location.search}${location.hash}`&&ce.history.pushState({url:e},"",r)}},deserialize(){return{path:ce.location.search.slice(1),hash:ce.location.hash.slice(1)}}},Aa={getHref(e){return e=typeof e=="string"?Pe(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ce.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let r=this.getHref(e);r!==`${location.pathname}${location.search}${location.hash}`&&ce.history.pushState({url:e},"",r||"/")}},deserialize(){return{path:ce.location.pathname,hash:ce.location.hash.slice(1)}}},hr={getHref(e){return e=typeof e=="string"?Pe(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=hr.getHref(e);ce.location.hash!==t&&(ce.location.hash=t)},deserialize(){return Pe(ce.location.hash.slice(1))}},gr={hash:hr,path:Aa,query:Ca},Ta=class{callbackFn;state;routes=new $a;instances={};root;lastGo;constructor(e){this.callbackFn=e}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(e){let t=new Sa(e);return this.routes.register(t),t}go(e){this.lastGo=e;let t=typeof e=="string"?Pe(e):e,r=t.path,a=this.state?.url;if(r!==a?.path){let n=this.routes.findRoute(r);if(!n)throw new Error(`Path: "${r}" not found`);let o=n.path?.getArguments(r);if(n.redirectTo)return this.go(Ct(n.redirectTo,o));let s=this.execute(n,o);if(this.lastGo!==e)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:t,arguments:o,route:n,current:s,root:this.root})}else this.state&&t.hash!=a?.hash&&this.updateState({...this.state,url:t})}getPath(e,t){let r=this.routes.get(e),a=r&&r.path;return a&&Ct(a.toString(),t)}isActiveUrl(e){let t=Pe(e);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(a=>{let n=a[fr],o=this.state?.arguments;if(n?.path?.test(t.path)&&(!t.hash||t.hash===r.hash)){if(o){let s=n.path.getArguments(t.path);for(let i in s)if(o[i]!=s[i])return!1}return!0}return!1})}updateState(e){this.state=e,this.callbackFn?.(e)}findRoute(e,t){let r=this.instances[e],a;if(r)for(a in t){let n=t[a];n!==void 0&&(r[a]=n)}return r}executeRoute(e,t,r){let a=e.parent,n=a&&this.routes.get(a),o=e.id,s=n&&this.executeRoute(n,t,r),i=this.findRoute(o,t)||e.create(t);return s?i&&i.parentNode!==s&&s.appendChild(i):this.root=i,r[o]=i,i}discardOldRoutes(e){let t=this.instances;for(let r in t){let a=t[r];e[r]!==a&&(a.parentNode?.removeChild(a),delete t[r])}}execute(e,t){let r={},a=this.executeRoute(e,t||{},r);return this.discardOldRoutes(r),this.instances=r,a}},Ve=new Xe,xr=new Xe,fe=new Ta(()=>Ve.next());function Na(e,t=gr.query){return M(ie(()=>xr.next(t)),e.tap(()=>fe.go(t.deserialize())),Ve.tap(()=>t.serialize(fe.getState().url))).catchError(r=>{if(r?.name==="SecurityError")return _;throw r})}function Ma(){return he(J(location.hash.slice(1)),B(window,"hashchange").map(()=>location.hash.slice(1)))}var Et;function Ia(){if(!Et){Et=new bt(history.state);let e=history.pushState;history.pushState=function(...t){let r=e.apply(this,t);return history.state&&(history.state.lastAction="push"),Et.next(history.state),r}}return M(B(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),Et)}function Da(){let e;return M(Ma(),Ia()).map(()=>window.location).filter(t=>{let r=t.href!==e;return e=t.href,r})}var mo=Ve.raf().map(()=>{let e=[],t=fe.getState(),r=t.current;do r.routeTitle&&e.unshift({title:r.routeTitle,first:r===t.current,path:ho(r)});while(r=r.parentNode);return e});function ho(e){let t=Ea(e);return t&&Ct(t.path?.toString()||"",fe.state?.arguments||{})}function br(e,t,r=t){return M(se(xr,Fe(e)).tap(([a])=>{e.href!==void 0&&(t.href=e.external?e.href:a.getHref(e.href)),t.target=e.target||""}),oe(t).tap(a=>{e.target||a.preventDefault()}),oe(r).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):fe.go(e.href))}))}function go(e,t){let r=document.createElement("div");return r.style.display="contents",r.routeTitle=t,r.appendChild(e.content.cloneNode(!0)),r}var Ra=class extends T{strategy="query";get state(){return fe.state}go(e){return fe.go(e)}};v(Ra,{tagName:"c-router",init:[R("strategy")],augment:[e=>{function t(r){let a=r.dataset;if(a.registered)return;a.registered="true";let n=a.title||void 0;fe.route({path:a.path,id:a.id||void 0,parent:a.parent||void 0,isDefault:r.hasAttribute("data-default"),redirectTo:a.redirectto,render:go.bind(null,r,n)})}return ve().switchMap(()=>{for(let r of Array.from(e.children))r instanceof HTMLTemplateElement&&t(r);return M(rt(e).tap(r=>{r.type==="added"&&r.value instanceof HTMLTemplateElement&&t(r.value)}),z(e,"strategy").switchMap(r=>{let a=gr[r];return Na(Da(),a).catchError((n,o)=>(console.error(n),o))}))})}]});function vr(e){return(t,r)=>t[e]>r[e]?1:t[e]<r[e]?-1:0}function At(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let r,a=e.getRootNode();return a instanceof ShadowRoot&&(r=a.getElementById(t),r)?r:e.ownerDocument.getElementById(t)??void 0}var lt=N(":host{display:contents}"),Pa=[-2,-1,0,1,2,3,4,5],kr=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],Tt=qe(),Sr=de(""),Be=N(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),bo=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),Oa={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function vo(e=Oa){return Object.entries(e).map(([t,r])=>`--cxl-color--${t}:${r};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var K={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:Oa,imports:bo?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
--cxl-color-scrim: rgb(29 27 32 / 0.5); /* neutral 10? #1D1B20 */

--cxl-font-family: Roboto;
--cxl-font-monospace:"Roboto Mono", monospace;

--cxl-font-display-large: 400 57px/64px var(--cxl-font-family);
--cxl-letter-spacing-display-large: -0.25px;
--cxl-font-display-medium: 400 45px/52px var(--cxl-font-family);
--cxl-letter-spacing-display-medium: 0;
--cxl-font-display-small: 400 36px/44px var(--cxl-font-family);
--cxl-letter-spacing-display-small: 0;
--cxl-font-headline-large: 400 32px/40px var(--cxl-font-family);
--cxl-letter-spacing-headline-large: -0.25px;
--cxl-font-headline-medium: 400 28px/36px var(--cxl-font-family);
--cxl-letter-spacing-headline-medium: 0;
--cxl-font-headline-small: 400 24px/32px var(--cxl-font-family);
--cxl-letter-spacing-headline-small: 0;
--cxl-font-title-large: 400 22px/28px var(--cxl-font-family);
--cxl-letter-spacing-title-large: 0;
--cxl-font-title-medium: 500 16px/24px var(--cxl-font-family);
--cxl-letter-spacing-title-medium: 0.15px;
--cxl-font-title-small: 500 14px/20px var(--cxl-font-family);
--cxl-letter-spacing-title-small: 0.1px;
--cxl-font-body-large: 400 16px/24px var(--cxl-font-family);
--cxl-letter-spacing-body-large: normal;
--cxl-font-body-medium: 400 14px/20px var(--cxl-font-family);
--cxl-letter-spacing-body-medium: 0.25px;
--cxl-font-body-small: 400 12px/16px var(--cxl-font-family);
--cxl-letter-spacing-body-small: 0.4px;
--cxl-font-label-large: 500 14px/18px var(--cxl-font-family);
--cxl-letter-spacing-label-large: 0.1px;
--cxl-font-label-medium: 500 12px/16px var(--cxl-font-family);
--cxl-letter-spacing-label-medium: 0.5px;
--cxl-font-label-small: 500 11px/16px var(--cxl-font-family);
--cxl-letter-spacing-label-small: 0.5px;
--cxl-font-code:400 14px var(--cxl-font-monospace);
--cxl-letter-spacing-code: 0.2px;

--cxl-font-weight-bold: 700;
--cxl-font-weight-label-large-prominent: var(--cxl-font-weight-bold);

--cxl-speed:200ms;

--cxl-elevation-1: rgb(0 0 0 / .2) 0 2px 1px -1px, rgb(0 0 0 / .14) 0 1px 1px 0, rgb(0 0 0 / .12) 0px 1px 3px 0;
--cxl-elevation-2: rgb(0 0 0 / .2) 0 3px 3px -2px, rgb(0 0 0 / .14) 0 3px 4px 0, rgb(0 0 0 / .12) 0px 1px 8px 0;
--cxl-elevation-3: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;;
--cxl-elevation-4: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
--cxl-elevation-5: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;

--cxl-shape-corner-xlarge: 28px;
--cxl-shape-corner-large: 16px;
--cxl-shape-corner-medium: 12px;
--cxl-shape-corner-small: 8px;
--cxl-shape-corner-xsmall: 4px;
--cxl-shape-corner-full: 50vh;
}
	`,css:""};function Nt(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var ct=N(Nt()),Mt=[0,4,8,16,24,32,48,64];var za,yo;function le(e,t){return e==="xsmall"?`@media(max-width:${K.breakpoints.small}px){${t}}`:`@media(min-width:${K.breakpoints[e]}px){${t}}`}function ut(e){return sr(e).map(t=>{let r=K.breakpoints,a=t.contentRect.width,n="xsmall";for(let o in r){if(r[o]>a)return n;n=o}return n})}function wo(e=""){return Object.entries(Er).map(([t,r])=>`:host([color=${t}]) ${e}{ ${r} }`).join("")}function je(e,t,r=""){return $r(e,`
		${t?`:host ${r} { ${Er[t]} }`:""}
		:host${t?"":"([color])"} ${r} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${r}{
			color: inherit;
			background-color: transparent;
		}
		${wo(r)}
	`)}function $r(e,t){let r=N(t);return R(e,{persist:$t,render:a=>r(a)})}function ye(e,t){return $r(e,Pa.map(r=>{let a=t(r);return r===0?`:host ${a}`:`:host([size="${r}"]) ${a}`}).join(""))}function Ba(e){let t;return Tt.tap(r=>{let a=r?.theme.override?.[e.tagName];a?t?t.replace(a):e.shadowRoot?.adoptedStyleSheets.push(t??=Oe(a)):t&&t.replace("")})}function Oe(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function N(e){let t;return r=>{let a=X(r);if(a.adoptedStyleSheets.push(t??=Oe(e)),!r[st])return K.css&&a.adoptedStyleSheets.unshift(yo??=Oe(K.css)),r[st]=!0,Ba(r)}}var ja=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],ko=[...ja,"inherit"];function yr(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function be(e){return`${yr(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var Er=ja.reduce((e,t)=>(e[t]=`
${yr(t)}
${t==="inverse-surface"?yr("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function Ue(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function Z(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var So=requestAnimationFrame(()=>_a()),$o={},Fa=document.createElement("template"),La={};function Ua(e){return function(t){let r=e(t),a=La[r];if(a)return a.cloneNode(!0);let n=document.createElementNS("http://www.w3.org/2000/svg","svg"),o=()=>(n.dispatchEvent(new ErrorEvent("error")),"");return fetch(r).then(s=>s.ok?s.text():o(),o).then(s=>{if(!s)return;Fa.innerHTML=s;let i=Fa.content.children[0];if(!i)return;let l=i.getAttribute("viewBox");l?n.setAttribute("viewBox",l):i.hasAttribute("width")&&i.hasAttribute("height")&&n.setAttribute("viewBox",`0 0 ${i.getAttribute("width")} ${i.getAttribute("height")}`);for(let S of i.childNodes)n.append(S);La[t.name]=n}),n.setAttribute("fill","currentColor"),n}}var Eo=Ua(({name:e,width:t,fill:r})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${r?"fill1_":""}${t}px.svg`)),Co=Eo;function Cr(e,t={}){let{width:r,height:a}=t;r===void 0&&a===void 0&&(r=a=24);let n=$o[e]?.icon()||Co({name:e,width:r,fill:t.fill});return t.className&&n.setAttribute("class",t.className),r&&(n.setAttribute("width",`${r}`),a===void 0&&n.setAttribute("height",`${r}`)),a&&(n.setAttribute("height",`${a}`),r===void 0&&n.setAttribute("width",`${a}`)),t.alt&&n.setAttribute("alt",t.alt),n}var wr,Ha=new Promise(e=>{wr=e});function _a(e){cancelAnimationFrame(So),za||(e&&(e.colors&&(K.colors=e.colors),e.globalCss&&(K.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(za=Oe(`:root { ${vo(K.colors)} }`+K.globalCss)),K.imports?Promise.allSettled(K.imports.map(t=>{let r=document.createElement("link");return r.rel="stylesheet",r.href=t,document.head.append(r),new Promise((a,n)=>(r.onload=a,r.onerror=n))})).then(wr):wr())}function Ar(){return Ke(async()=>{await Ha,await document.fonts.ready})}function It(e,t=e){return M(qa(e,t).ignoreElements(),Ve.map(()=>e.href!==void 0&&fe.isActiveUrl(e.href)))}function qa(e,t=e){let r=W("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return r.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,X(e).append(r),M(br(e,r),B(r,"click").tap(a=>{a.stopPropagation(),We(a)||e.dispatchEvent(new PointerEvent(a.type,a)),Ce(e,"toggle.close",void 0)}),oe(t).tap(a=>{We(a)&&r.click()}))}var Wa=class extends T{href};v(Wa,{tagName:"c-router-selectable",init:[R("href")],augment:[lt,()=>W("slot"),e=>ae(()=>{let t=e.parentElement;return It(e,t).raf(r=>{t.selected=r})})]});function Ya(e,t,r){return new j(a=>{let n={id:e,controller:r,target:t};Ce(t,`registable.${e}`,n),a.signal.subscribe(()=>n.unsubscribe?.())})}function Va(e){return e in K.animation}function we({target:e,animation:t,options:r}){if(K.disableAnimations)return e.animate(null);let a=typeof t=="string"?K.animation[t]:t;if(!a)throw new Error(`Animation "${t}" not defined`);let n=typeof a.kf=="function"?a.kf(e):a.kf,o={duration:250,easing:K.easing.emphasized,...a.options,...r,...K.prefersReducedMotion?{duration:0}:void 0};return e.animate(n,o)}function Ga(e){let{trigger:t,stagger:r,commit:a,keep:n}=e;function o(i){return new j(l=>{let S=we(i);S.ready.then(()=>l.next({type:"start",animation:S}),()=>{}),S.addEventListener("finish",()=>{l.next({type:"end",animation:S}),a&&S.commitStyles(),!(n||n!==!1&&i.options?.fill&&(i.options.fill==="both"||i.options.fill==="forwards"))&&l.complete()}),l.signal.subscribe(()=>{try{S.cancel()}catch{}})})}let s=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return M(...s.map((i,l)=>{let S={...e.options,delay:r!==void 0?(e.options?.delay??0)+l*r:e.options?.delay};return(t==="visible"?ar(i).filter(g=>g):t==="hover"?kt(i):J(!0)).switchMap(g=>g?o({...e,options:S,target:i}):_)}))}function Za(e,t,r=e.getBoundingClientRect()){let a=r.width>r.height?r.width:r.height,n=new Xa,o=e.shadowRoot||e,{x:s,y:i}=t??{},l=s===void 0||!t||We(t),S=s>r.right||s<r.left||i>r.bottom||i<r.top;return n.x=l||S?r.width/2:s-r.left,n.y=l||S?r.height/2:i-r.top,n.radius=a,t||(n.duration=0),o.prepend(n),n}function Qa(e,t=e){let r,a,n,o=()=>{r=Za(t,a instanceof Event?a:void 0,n),r.duration=600,a=void 0};return M(B(e,"click").tap(s=>{a=s,n=t.getBoundingClientRect()}),z(e,"selected").raf().switchMap(()=>{if(e.selected){if(!r?.parentNode){if(ir(e))return a=void 0,Re(e).tap(o);o()}}else r&&Ja(r);return _})).ignoreElements()}function Ja(e){return new Promise(t=>{we({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function Ae(e,t=e){let r=!1,a=0;return M(B(t,"pointerdown"),B(t,"click")).tap(n=>n.cxlRipple??=e).raf().mergeMap(n=>{if(n.cxlRipple===e&&!r&&!e.disabled&&e.parentNode){a=Date.now(),r=!0,e.style.setProperty("--cxl-mask-hover","none");let o=Za(e,n),s=o.duration,i=()=>{e.style.removeProperty("--cxl-mask-hover"),Ja(o).then(()=>{r=!1})};return n.type==="click"?Ee(s).tap(i):M(B(document,"pointerup"),B(document,"pointercancel")).first().map(()=>{let l=Date.now()-a;setTimeout(()=>i(),l>s?32:s-l)})}return _})}var Xa=class extends T{x=0;y=0;radius=0;duration=500};v(Xa,{tagName:"c-ripple",init:[R("x"),R("y"),R("radius")],augment:[N(`
:host {
	display: block;
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	direction: ltr;
}
.ripple {
	position: relative;
	background-image: inherit;
	border-radius: 100%;
	background-color: var(--cxl-color-ripple, color-mix(in srgb, var(--cxl-color-on-surface) 16%, transparent));
}`),e=>{let t=document.createElement("div");return t.className="ripple",ie(()=>{let r=t.style;r.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,r.width=r.height=e.radius*2+"px",t.parentNode||X(e).append(t),we({target:t,animation:"expand",options:{duration:e.duration}}),we({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});function Ka(e){return z(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function en(e,t=e,r=0){let a=t.hasAttribute("tabindex")?t.tabIndex:r;return Ka(e).tap(n=>{n?t.removeAttribute("tabindex"):t.tabIndex=a})}function tn(e,t=e){return M(B(t,"focusout").tap(()=>e.touched=!0),M(ee(e,"disabled"),ee(e,"touched")).tap(()=>Ce(e,"focusable.change")))}function pt(e,t=e,r=0){return M(en(e,t,r),tn(e,t))}function Ao(e,t){return r=>new j(()=>{r.hasAttribute(e)||r.setAttribute(e,t)})}function me(e){return Ao("role",e)}var To=0;function Tr(e){return pr(e,"id").map(t=>(t||(e.id=`cxl__${To++}`),e.id))}var Ge=[Be,ct,N(`
:host {
	box-sizing: border-box;
	position: relative;
	transition: box-shadow var(--cxl-speed);
}
:host(:hover) {
	box-shadow: var(--cxl-elevation-1);
}
:host(:active) { box-shadow: var(--cxl-elevation-0); }
:host(:focus-visible) {
	outline: 3px auto var(--cxl-color-secondary);
}
:host([disabled]) {
	background-color: color-mix(in srgb, var(--cxl-color--on-surface) 12%, transparent);
	color: color-mix(in srgb, var(--cxl-color--on-surface) 38%, transparent);
}
:host([variant=elevated]) {
	--cxl-color-surface: var(--cxl-color--surface-container-low);
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=elevated]:hover) {
	box-shadow: var(--cxl-elevation-2);
}
:host([variant=elevated]:active) {
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=elevated][disabled]) { box-shadow: none; }
:host([variant=outlined][disabled]) {
	border-color: color-mix(in srgb, var(--cxl-color-on-surface) 12%, transparent);
}	
:host([variant=outlined][disabled]),:host([variant=text][disabled]) {
	background-color: transparent;
	box-shadow: none;
}`)],rn=N(`
:host {
	${Z("label-large")}
	user-select: none;
	cursor: pointer;
	overflow: hidden;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	column-gap: 8px;
	line-height: unset;
	white-space: nowrap;
	border-radius: var(--cxl-shape-corner-full);
	align-self: center;
}
:host([variant=outlined]:hover),:host([variant=text]:hover) {
	box-shadow: none;
}
:host([variant=text]) { margin: -10px -12px; }
:host([variant=text]:not([disabled])) {
	background-color: transparent;
	color: var(--cxl-color-primary);
}
:host([variant=text]),:host([variant=outlined]) {
	--cxl-color-on-surface: var(--cxl-color--primary);
	--cxl-color-surface: var(--cxl-color--surface);
}
:host([variant=outlined]) {
	border: 1px solid var(--cxl-color-outline);
	background-color: transparent;
}
:host([variant=elevated]) {
	--cxl-color-on-surface: var(--cxl-color-primary);
}
`);function Dt(e){return z(e,"disabled").switchMap(t=>t?_:rr(e).tap(r=>{r.stopPropagation(),e.click()}))}function Rt(e){return M(Dt(e),pt(e))}var dt=class extends T{disabled=!1;touched=!1};v(dt,{init:[F("disabled"),F("touched")],augment:[me("button"),Rt]});var zt=class extends dt{size;color;variant};v(zt,{tagName:"c-button",init:[ye("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),je("color","primary"),F("variant")],augment:[...Ge,rn,Ae,q]});var an=N(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${Z("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function nn(e){return M(Ya("list",e),z(e,"selected").tap(t=>e.ariaSelected=String(t)))}function on(e){return M(Dt(e),pt(e,e,-1),nn(e))}var ft=class extends T{disabled=!1;touched=!1;selected=!1};v(ft,{init:[F("disabled"),F("touched"),F("selected")],augment:[on]});var sn=class extends ft{size};v(sn,{tagName:"c-item",init:[ye("size",e=>`{min-height:${56+e*8}px}`)],augment:[an,Be,ct,me("option"),q,Ae]});var ln=[N(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${Z("label-large")}
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	border-radius: 28px;
	overflow:hidden;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	-webkit-tap-highlight-color: transparent;
	z-index: 0;
}
:host(:focus-visible) { z-index: 1; }
:host(:focus-visible) slot {
	outline: 3px auto var(--cxl-color-secondary);
}
:host([selected]) {
	--cxl-color-on-surface: var(--cxl-color-on-secondary-container);
	background-color: var(--cxl-color-secondary-container);
	font-weight: var(--cxl-font-weight-label-large-prominent);
}
/** Avoid accessibility errors with background */
:host([selected]) c-ripple { background-color: var(--cxl-color-surface); }
c-ripple { z-index: -1 }
:host([dense]) { min-height:48px; }
${Nt("c-ripple")}
	`),Be,Qa,q],Ze=class extends ft{size};v(Ze,{tagName:"c-nav-item",init:[ye("size",e=>`{min-height:${56+e*8}px}`)],augment:[me("option"),...ln]});var cn=class extends Ze{href;external=!1;target};v(cn,{tagName:"c-router-item",init:[R("href"),R("external"),R("target")],augment:[e=>It(e).tap(t=>{e.selected=t})]});var ke=class extends T{font};v(ke,{tagName:"c-t",init:[F("font")],augment:[N(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${kr.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${Z("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${Z("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${Z("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${Z("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${Z("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${Z("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),q,e=>z(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var No=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(e){e.element.parentElement!==this.popupContainer?this.popupOpened(e):e.close()}popupOpened(e){this.currentPopup&&e.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=e}openModal(e){this.currentModal&&e.element!==this.currentModal.element&&this.currentModal.close(),e.element.parentNode||this.popupContainer?.append(e.element),e.element.open||e.element.showModal(),this.currentModal=e}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(e){this.currentTooltip&&this.currentTooltip!==e&&this.currentTooltip.remove(),this.currentTooltip=e}close(){this.currentPopup?.close()}},Te=new No;function un(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(r=>{let a=At(e,r);return a?[a]:[]}):Array.isArray(t)?t:[t]}function Mo(e,t,r,a,n=B(e,"click").map(()=>!r())){return M(a,n).switchMap(o=>{let s=t();return s?Kt(s.map(i=>({target:i,open:o}))):_})}function Nr(e,t=e){function r(o,s){return[z(e,"open").switchMap(i=>(o.parentNode||Te.popupContainer.append(o),i&&o instanceof T?ee(o,"open").map(l=>{e.open&&l===!1&&(e.open=!1)}):_)),Tr(o).tap(i=>{let l=o.getAttribute("role");(l==="menu"||l==="listbox"||l==="tree"||l==="grid"||l==="dialog")&&(s.ariaHasPopup=l),s.getRootNode()===o.getRootNode()&&s.setAttribute("aria-controls",i)})]}let a=se(z(e,"trigger"),z(e,"target")).switchMap(([o])=>{let s=un(e),i=s?M(...s.flatMap(l=>r(l,e))).ignoreElements():_;return M(o==="hover"?se(St(t),s?M(...s.map(l=>St(l))):_).map(l=>!!l.find(S=>!!S)).debounceTime(250):o==="checked"?B(t,"change").map(l=>l.target&&"checked"in l.target?!!l.target.checked:!1):B(t,"click").map(()=>!e.open),i)}),n;return or().switchMap(()=>Mo(t,()=>un(e),()=>e.open,z(e,"open"),a).filter(o=>{let{open:s,target:i}=o;if(e.open!==s){if(s)n=lr(e)?.activeElement,i.trigger=e;else if(i.trigger&&i.trigger!==e)return o.open=!0,i.trigger=e,!0;return e.open=s,!1}if(!s&&i.trigger===e){let l=document.activeElement;(l===document.body||l===document.documentElement)&&n?.focus()}return!0}))}var pn=class extends T{open=!1;target;trigger};v(pn,{init:[R("target"),R("trigger"),F("open")],augment:[e=>Nr(e).raf(({target:t,open:r})=>t.open=r)]});var Io=class extends pn{};v(Io,{tagName:"c-toggle",augment:[lt,q]});var Qe=class extends T{name="";width;height;alt;fill=!1};v(Qe,{tagName:"c-icon",init:[R("name"),R("width"),R("height"),R("fill"),R("alt")],augment:[me("none"),N(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,r;return e.shadowRoot?.adoptedStyleSheets.push(t),Re(e).switchMap(()=>Fe(e)).debounceTime(0).tap(()=>{let a=e.width??e.height,n=e.height??e.width;t.replace(`:host{${a===void 0?"":`width:${a}px;`}${n===void 0?"":`height:${n}px`}}`),r?.remove(),r=e.name?Cr(e.name,{className:"icon",width:a,height:n,fill:e.fill,alt:e.alt}):void 0,r&&(r.onerror=()=>{r&&e.alt&&r.replaceWith(e.alt)},X(e).append(r))})}]});var Mr=class extends zt{};v(Mr,{tagName:"c-button-round",augment:[N(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var Se=class extends Mr{icon="";width;height;fill=!1;variant="text";alt};v(Se,{tagName:"c-icon-button",init:[R("icon"),R("width"),R("height"),R("alt"),R("fill")],augment:[e=>W(Qe,{className:"icon",width:z(e,"width"),height:z(e,"height"),name:z(e,"icon"),fill:z(e,"fill"),alt:z(e,"alt")})]});var Ft=class extends Se{open=!1;target;icon="menu"};v(Ft,{tagName:"c-navbar-toggle",init:[R("target"),xe("open")],augment:[e=>Nr(e).tap(({target:t,open:r})=>t.open=r)]});var Ne;function dn(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Do(e){return e==="infinite"?1/0:+e}function Ro(e){if(Va(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let r={},a;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(i,l,S)=>(l&&(a=+l),S&&(r.composite=S),"")),Ne??=document.createElement("style").style,Ne.animation=e,r.fill=Ne.animationFillMode;let n=r.fill==="forwards"||r.fill==="both",o=t?void 0:dn(Ne.animationDuration);o!==void 0&&(r.duration=o);let s=dn(Ne.animationDelay);return s!==void 0&&(r.delay=s),Ne.animationIterationCount&&(r.iterations=Do(Ne.animationIterationCount)),{animation:Ne.animationName,keep:n,stagger:a,options:r}}function zo(e){return typeof e=="string"&&(e=e.split(",").map(t=>Ro(t.trim()))),e}function Ir(e,t,r,a){let n=a?`motion-${a}-on`:"motion-on",o=zo(r);return e.setAttribute(n,""),M(...o.map(s=>Ga({target:t,...s}))).finalize(()=>e.removeAttribute(n))}var fn=N(":host(:not([open],[motion-out-on])){display:none}");function Dr(e,t=()=>e,r=!1){let a=ae(()=>J(t("in"))),n=ae(()=>J(t("out")));return M(Le(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),se(z(e,"motion-in").map(o=>o?a.switchMap(s=>Ir(e,s,o,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?Ee(e.duration).map(()=>e.open=!1):_):a),z(e,"motion-out").map(o=>(o?n.switchMap(s=>Ir(e,s,o,"out").ignoreElements()):n).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([o,s])=>ee(e,"open").switchMap(i=>{if(e.popover!=="auto"){let l=i?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:i?"closed":"open",newState:l}))}return i?r?he(s,o):o:r?he(s,o):s})))}var Lt=class extends T{open=!1;duration;"motion-in";"motion-out"};v(Lt,{init:[R("motion-in"),R("motion-out"),dr("duration"),F("open")]});var Fo=class extends Lt{};v(Fo,{tagName:"c-toggle-target",augment:[N(`
:host{display:contents}
`),e=>{let t=W("slot"),r=W("slot",{name:"off"});return(e.open?r:t).style.display="none",X(e).append(t,r),Dr(e,a=>{t.style.display=r.style.display="none";let n=e.open?a==="in"?t:r:a==="in"?r:t;return n.style.display="",n.assignedElements()},!0)}]});var Rr=class extends Lt{};v(Rr,{tagName:"c-toggle-panel",augment:[q,fn,Dr]});var zr=class extends T{center=!1};v(zr,{tagName:"c-backdrop",init:[F("center")],augment:[N(`
:host {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--cxl-color-scrim);
  overflow: hidden;
}
:host([center]) {
  display: flex;
  justify-content: center;
  align-items: center;
}

	`),e=>B(e,"keydown").tap(t=>t.stopPropagation()),q]});var mn=N(`
#drawer {
	box-sizing: border-box;
    background-color: var(--cxl-color-surface);
    color: var(--cxl-color-on-surface);
    position: absolute;
	display: block;
    width: 85%;
	min-width: 256px;

    overflow-y: auto;
    overflow-x: hidden;
    z-index: 5;
}
${le("small","#drawer { width: 360px }")}

#dialog {
    margin: 0;
    padding: 0;
    border-width: 0;
    max-width: none;
    max-height: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow-x: hidden;
    overflow-y: hidden;
    text-align: initial;
}

#dialog::backdrop {
    background-color: transparent;
}
`),hn=class extends T{open=!1;position;responsive;permanent=!1};v(hn,{tagName:"c-drawer",init:[F("open"),F("position"),R("responsive"),R("permanent")],augment:[mn,N(`
:host { max-width: 360px; }
#drawer.permanent {
	${be("surface")}
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    width: 100%;
    height: 100%;
	z-index: 0;
}
#drawer {
    top: 0;
    bottom: 0;
}
#drawer, :host([position=left]) #drawer {
	left: 0;
	border-radius: 0 var(--cxl-shape-corner-large) var(--cxl-shape-corner-large) 0;
}
:host([position=right]) #drawer,:host(:not([position]):dir(rtl)) #drawer {
	right: 0;
	left: auto;
	border-radius: var(--cxl-shape-corner-large) 0 0 var(--cxl-shape-corner-large);
}
:host([responsiveon]) #backdrop { display: none; }
:host([responsiveon]) #dialog { display: contents; }
`),e=>{let t=de(!1),r=M(z(e,"position"),t).raf(),a=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",n=W(Rr,{id:"drawer","motion-in":r.map(()=>e.permanent&&t.value?void 0:a()?"slideInRight":"slideInLeft"),"motion-out":r.map(()=>e.permanent&&t.value?void 0:a()?"slideOutRight":"slideOutLeft")},q),o=new zr;o.id="backdrop";let s=W("dialog",{id:"dialog"},o,n);return X(e).append(s),M(B(n,"close").tap(()=>s.close()),B(s,"close").tap(()=>e.open=!1),ee(n,"open").tap(i=>e.open=i),ee(e,"open").raf(i=>{i||n.scrollTo(0,0)}),B(o,"click").tap(()=>e.open=!1),B(s,"cancel").tap(i=>{i.preventDefault(),e.open=!1}),z(e,"open").tap(i=>{if(t.value&&e.permanent)return n.open=!0;i?t.value||(Te.openModal({element:s,close:()=>e.open=!1}),s.getBoundingClientRect()):Te.currentModal?.element===s&&Te.modalClosed()}).raf(i=>{n.open=i}),z(e,"responsive").switchMap(i=>i!==void 0?ut(document.body):J("xsmall")).switchMap(i=>{let l=K.breakpoints[e.responsive||"large"],S=K.breakpoints[i]>=l;return t.next(S),S&&n.className!=="permanent"?s.close():!S&&n.className==="permanent"&&(e.open=!1),S&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",S),n.className=S?"permanent":"drawer",ee(e,"open").tap(g=>{e.hasAttribute("responsiveon")||we({target:o,animation:g?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var gn=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(e,t=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(e)?(this.frag.append(...e),r.insertBefore(this.frag,t)):r.insertBefore(e,t))}empty(){let e=this.start.nextSibling;for(;e&&e!==this.end;){let t=e.nextSibling;e.remove(),e=t}}};function xn({source:e,render:t,empty:r,append:a,loading:n}){let o=[],s=document.createDocumentFragment(),i,l;function S(g){if(l?.parentNode?.removeChild(l),!g)return;let f=0;for(let c of g){let E=o[f]?.item;if(E)E.value!==c&&E.next(c);else{let m=de(c),y=t(m,f,g),h=y instanceof DocumentFragment?Array.from(y.childNodes):[y];o.push({elements:h,item:m}),s.append(y)}f++}s.childNodes.length&&a(s),i?.remove(),f===0&&r&&a(i=r());let w=o.length;for(;w-- >f;)o.pop()?.elements.forEach(c=>c.remove())}return ae(()=>(l=n?.(),l&&a(l),e.raf(S)))}function Fr(e){return ur(()=>{let t=new gn;return[xn({...e,append:t.insert.bind(t)}),t.end]})}var Lo=()=>{let e;function t(){let r=document.adoptedStyleSheets.indexOf(e);r!==-1&&document.adoptedStyleSheets.splice(r,1)}addEventListener("message",r=>{let{theme:a}=r.data;t(),a!==void 0&&(e=new CSSStyleSheet,e.replace(a),document.adoptedStyleSheets.push(e))})},Po=()=>{addEventListener("load",()=>{let e=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(e).observe(document.documentElement)})})},Pt=class extends T{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};v(Pt,{tagName:"c-iframe",init:[R("src"),R("srcdoc"),R("sandbox"),R("handletheme")],augment:[N(`
:host {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}
iframe {
  width: 100%;
  height: 0;
  opacity: 0;
  transition: opacity var(--cxl-speed);
  display: flex;
  border-style: none;
}
	`),e=>{let t=L("iframe",{loading:"lazy"}),r=L("slot",{name:"loading"}),a=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(a),r.style.display="none";function n(s){a.replaceSync(":host{height:"+s+"px}"),t.style.height="100%",t.style.opacity="1",r.style.display="none"}function o(s){if(s){let i=`<script type="module">
(${Po.toString()})();
(${Lo.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${s}${i}`,r.style.display=""}else t.srcdoc=""}return X(e).append(t,r),M(se(z(e,"srcdoc"),z(e,"src")).tap(async([s,i])=>{o(i?`<base href="${i}" />`+await fetch(i).then(l=>l.text()):s)}),B(window,"message").tap(s=>{let{height:i}=s.data;s.source===t.contentWindow&&i!==void 0&&n(i)}),z(e,"handletheme").switchMap(s=>s?B(t,"load").switchMap(()=>Tt.raf(i=>{let l=i?.css??"";t.contentWindow?.postMessage({theme:l},"*")})):_),z(e,"sandbox").tap(s=>s===void 0?t.removeAttribute("sandbox"):t.sandbox.value=s))}]});var Ot=class extends dt{};v(Ot,{tagName:"c-button-text",augment:[...Ge,N(`
:host {
	${Z("label-large")}
	padding: 0 12px; border-radius: var(--cxl-shape-corner-full);
	flex-shrink: 0;
	margin: -10px -12px;
	background-color: transparent;
	color: var(--cxl-color-primary);
	cursor: pointer;
	overflow: hidden;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	column-gap: 8px;
	line-height: unset;
	min-height: 40px;
	align-self: center;
}
:host([disabled]) {
	color: color-mix(in srgb, var(--cxl-color--on-surface) 38%, transparent);
	background-color: transparent;
}
:host(:hover) { box-shadow: none; }
		`),Ae,q]});function bn(e="block"){let t=(r=>{for(let a=12;a>0;a--)r.xl+=`:host([xl="${a}"]){display:${e};grid-column-end:span ${a};}`,r.lg+=`:host([lg="${a}"]){display:${e};grid-column-end:span ${a};}`,r.md+=`:host([md="${a}"]){display:${e};grid-column-end:span ${a};}`,r.sm+=`:host([sm="${a}"]){display:${e};grid-column-end:span ${a};}`,r.xs+=`:host([xs="${a}"]){display:${e};grid-column-end:span ${a};}`;return r})({xl:"",lg:"",md:"",sm:"",xs:""});return N(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${le("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${le("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${le("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${le("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var vn=N(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${Ue()}
${Mt.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${Mt.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),Lr=class extends T{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};v(Lr,{init:[F("sm"),F("xs"),F("md"),F("lg"),F("xl"),F("vpad"),F("pad"),F("center"),F("fill"),F("grow"),F("elevation"),je("color")]});var Bt=class extends Lr{};v(Bt,{tagName:"c-c",augment:[vn,bn(),N(":host([center]) { text-align: center}"),q]});var yn=N(`
:host {
	${be("surface-container")}
	${Z("body-medium")}
	border-radius: var(--cxl-shape-corner-medium);
	overflow: hidden;
}
:host([variant=elevated]:not([color])) {
	--cxl-color-surface: var(--cxl-color-surface-container-low);
	z-index: 1;
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=outlined]) {
	${be("surface")}
	border: 1px solid var(--cxl-color-outline-variant);
}
${Ue()}
`),wn=class extends Bt{variant};v(wn,{tagName:"c-card",init:[F("variant")],augment:[yn]});var jt=class extends T{disabled=!1;touched=!1;selected=!1;color;size=0};v(jt,{tagName:"c-chip",init:[F("disabled"),F("touched"),F("selected"),je("color","surface-container-low"),ye("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[me("button"),Rt,...Ge,N(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${Z("label-large")}
	display: inline-flex;
	align-items: center;
 	position: relative;
	overflow: hidden;
 	column-gap: 8px;
	flex-shrink: 0;
	cursor: pointer;
	flex-wrap: nowrap;
	align-self: center;
}
:host([disabled]) {
	background-color: color-mix(in srgb, var(--cxl-color--on-surface) 12%, transparent);
	color: color-mix(in srgb, var(--cxl-color--on-surface) 38%, transparent);
	border-color: color-mix(in srgb, var(--cxl-color-on-surface) 12%, transparent);
}
:host([selected]) {
	border-color: var(--cxl-color-secondary-container);
	${be("secondary-container")}
}
:host(:hover) { box-shadow: none; }
slot[name] { display: inline-block; }
		`),Ae,()=>W("slot",{name:"leading"}),q,()=>W("slot",{name:"trailing"})]});var Pc=1440*60*1e3;function kn(e,t,r){if(t==="relative"){let a=new Date;return e.getFullYear()===a.getFullYear()?e.getDate()===a.getDate()&&e.getMonth()===a.getMonth()?e.toLocaleTimeString(r,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(r,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(r,{month:"2-digit",day:"2-digit",year:"2-digit"})}return t==="medium"||t==="long"||t==="short"||t==="full"?e.toLocaleString(r,{dateStyle:t,timeStyle:t}):e.toLocaleString()}function Sn(e,t,r){return t?typeof r=="string"?kn(t,r,e):t.toLocaleString(e,r):""}var $n={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function Oo(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var Ut={content:$n,name:"default",localeName:Oo(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>Sn(Ut.localeName,e,t)},Bo={content:$n,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>Sn("en-US",e,t)};function jo(){let e=de(Ut),t={default:Ut,en:Bo},r={},a=e.map(s=>s.content);async function n(s){let i=s.split("-")[0];if(!(t[s]??t[i])){let l=r[s]??r[i];l&&await l()}return t[i]||Ut}async function o(s){e.next(await n(s))}return navigator?.language&&o(navigator.language),{content:a,registeredLocales:t,locale:e,setLocale:o,getLocale(s){return s?Ke(()=>n(s)):e},get(s,i){return a.map(l=>l[s]??(i&&l[i])??"")},register(s){t[s.name]=s}}}var En=jo();var Ht=[N(`
:host {
	box-sizing: border-box;
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	flex-shrink: 0;
	display: flex;
	align-items: center;
	column-gap: 24px;
	min-height: 64px;
	padding: 4px 16px;
	${Z("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${Z("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${Z("headline-medium")}
	flex-wrap: wrap;
}`),q,()=>W("slot",{name:"title"})];function Uo(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var _t=class extends T{size;sticky=!1;contextual};v(_t,{tagName:"c-appbar",init:[F("size"),F("sticky"),F("contextual")],augment:[N(`
:host {
	z-index: 2;
	width:100%;
}
:host([sticky]) { position: sticky; top: -1px; }
:host([scroll]) {
 	transition: background-color var(--cxl-speed);
	border-top: 1px solid var(--cxl-color-surface-container); background-color: var(--cxl-color-surface-container)
}
:host([contextual]) { padding: 0; }
:host([contextual]) slot:not([name=contextual]) { display:none; }
		`),...Ht,()=>W("slot",{name:"contextual"}),e=>z(e,"sticky").switchMap(t=>t?at(e,{threshold:[1]}).tap(r=>e.toggleAttribute("scroll",r.intersectionRatio<1)):_),e=>{let t;return M(rt(e),z(e,"contextual")).raf().switchMap(()=>{for(let r of e.children)if(Uo(r)&&(r.slot="contextual",r.open=r.name===e.contextual,r.open))return t=r,B(r,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,_})}]});var Cn=class extends T{name;size;open=!1;backIcon=W(Se,{icon:"arrow_back",className:"icon",ariaLabel:En.get("core.close"),$:e=>oe(e).tap(()=>this.open=!1)})};v(Cn,{tagName:"c-appbar-contextual",init:[R("name"),F("open"),F("size")],augment:[e=>e.backIcon,...Ht,N(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),e=>ee(e,"open").tap(t=>{t||e.dispatchEvent(new Event("close"))})]});function An(e=document){document.documentElement.lang="en";let t=[W("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),W("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),W("meta",{name:"mobile-web-app-capable",content:"yes"}),W("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${Z("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function Tn(e=2e3){return M(Ee(e),Ar()).first()}function Nn(e){return Tn().raf(()=>e.setAttribute("ready",""))}function Mn(e){return M(ie(t=>{let r=An(e.ownerDocument??document);t.signal.subscribe(()=>r.forEach(a=>a.remove()))}),ve().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),Tn().switchMap(()=>ut(e).raf(t=>e.setAttribute("breakpoint",t))),Nn(e),Sr.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Ho=class extends T{connectedCallback(){requestAnimationFrame(()=>An(this.ownerDocument||document)),super.connectedCallback()}};v(Ho,{tagName:"c-meta",augment:[()=>Nn(document.body)]});function In(e,t,r){r==="in"&&(e.style.display="");let a=e.offsetWidth,n=we({target:e,animation:{kf:{[t]:r==="in"?[`-${a}px`,"0"]:["0",`-${a}px`]}}});r==="out"&&(n.onfinish=()=>e.style.display="none")}var qt=class extends T{sheetstart=!1;sheetend=!1};v(qt,{tagName:"c-application",init:[F("sheetstart"),F("sheetend")],augment:[N(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${be("background")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${Ue()}
	`),Mn,e=>Le(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>Le(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=W("slot",{name:"start"}),r=W("slot",{id:"body"}),a=W("slot",{name:"end"}),n=Oe("html { overflow: hidden }");return X(e).append(t,r,a),e.sheetstart||(t.style.display="none"),e.sheetend||(a.style.display="none"),Te.popupContainer=e,M(ie(o=>{let s=(e.ownerDocument??document).adoptedStyleSheets;s.push(n),o.signal.subscribe(()=>{let i=s.indexOf(n);i!==-1&&s.splice(i,1)})}),ee(e,"sheetstart").tap(o=>In(t,"marginLeft",o?"in":"out")),ee(e,"sheetend").tap(o=>In(a,"marginRight",o?"in":"out")))}]});var Dn=class extends T{};v(Dn,{tagName:"c-body",augment:[N(`
:host {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-x:hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	background-color: var(--cxl-color-background);
	color: var(--cxl-color-on-background);
}
slot { display: flex; flex-direction: column; max-width: 1200px; flex-grow: 1; }

${le("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}

		`),q]});var Pr=class extends _t{sticky=!0};v(Pr,{tagName:"doc-appbar",augment:[e=>{e.append(L(Ft,{target:"navbar"}),CONFIG.packageName)}]});var Or=class extends T{};v(Or,{tagName:"doc-card",augment:[N(`
:host{margin-top: 16px; display:block; padding:16px; elevation:1; }
		`),()=>L("slot")]});var Br=class extends T{formatter};v(Br,{tagName:"doc-hl",augment:[N(`
:host { display: block; }
.hljs { white-space: pre-wrap; font: var(--cxl-font-code); padding:16px; }
	`),e=>{let t=L("div",{className:"hljs"});return t.style.tabSize="4",X(e).append(t),ve().switchMap(()=>nt(e).raf(()=>{let r=e.childNodes[0]?.textContent?.trim()||"";r&&e.formatter&&(r=e.formatter(r)),t.innerHTML=r}))}]});var jr=class extends T{};v(jr,{tagName:"doc-grd",augment:[N(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${le("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${le("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${le("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),q]});var mt=class extends T{summary;selected};v(mt,{tagName:"doc-nav-list",init:[xe("summary"),xe("selected")],augment:[e=>Fr({source:z(e,"summary").map(t=>t?.index),render:t=>L(Ze,{$:r=>oe(r).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?L(jt,{size:-2},"beta"):void 0)})(e)]});var Ur=Symbol("TrieMatch"),Vt=class{constructor(e,t){this.message=e,this.position=t}};function G({source:e,start:t,end:r}){return e.slice(t,r)}function _o(){let e=[],t=(n,o)=>new Vt(n,o);function r(n){if(e.push(n),e.length>100)throw e.push(new Vt("Too many errors. Aborting compilation",{start:0,end:0,line:0,source:""})),"TOO_MANY_ERRORS"}function a(n,o){try{return n()}catch(s){if(s instanceof Vt)return r(s),o();throw s}}return{catchAndRecover:a,errors:e,error:t,pushError:r}}function Hr(e){let{error:t,errors:r,catchAndRecover:a,pushError:n}=_o(),o,s,i=()=>o,l={current:i,error:t,pushError:n,errors:r,expect:p,expectNode:P,expectNodeKind:A,expectNodeParser:(b,D)=>()=>P(b(),D),next:f,node:E,optional:c,skipWhile:w,enclosed:m,skipUntil:y,parseUntil:k,parseUntilKind:H,parseList:$,parseListWithEmpty:d,start:S,backtrack:g,parseWhile:h};function S(b){s=e(b),r.length=0,f()}function g(b){s.backtrack(b),o=b}function f(){return a(()=>o=s.next(),f)}function w(b){for(;o?.kind===b;)f()}function c(b){if(b===o.kind){let D=o;return f(),D}}function E(b){return{...o,kind:b}}function m(b,D,x){let O=p(b),Q=D(),u=p(x);return Q.start=O.start,Q.end=u.end,Q}function y(b){for(;!b();)f()}function h(b){let D=[];for(;o?.kind!=="eof";){let x=b();if(x)D.push(x);else break}return D}function k(b,D){let x=[];return a(()=>{for(;o&&!D()&&o.kind!=="eof";){let O=b();if(O)x.push(O);else throw t(`Unexpected token "${o.kind}"`,i())}},()=>y(D)),x}function p(b){if(b!==o.kind)throw t(`Expected "${b}" but got "${o.kind}"`,o);let D=o;return f(),D}function A(b,D,x){if(!b||b.kind!==D)throw t(x,b||o);return b}function P(b,D){if(!b)throw t(D,o);return b}function H(b,D){return k(b,()=>i()?.kind===D)}function d(b,D,x){let O=[],Q;for(;Q=i();){if(Q.kind===D){O.push(void 0);continue}let u=b();if(!u||!x(u)||(O.push(u),!c(D)))break}return O}function $(b,D,x){let O=[];do{let Q=b();if(!Q||!x(Q))break;O.push(Q)}while(c(D));return O}return l}function qo(...e){let t={};for(let r of e){let a=t;for(let n of r)a=a[n]??={};a[Ur]=r}return t}function Pn({source:e}){let t=e.length,r=0,a=0,n=0;function o(m,y){return{kind:m,start:r,end:r+=y,line:a,source:e}}function s(m,y=0){for(;r+y<t&&!m(e.charAt(r+y));)y++;return y}function i(m,y=0){for(;r+y<t&&m(e.charAt(r+y));)y++;return y}function l(m,y,h=0){let k=r+h;for(let p=0;p<m.length;p++)if(e.charAt(k+p)!==m[p])return 0;return y?.(e.charAt(k+m.length))?0:h+m.length}function S(m,y,h=1){for(;r+h<t&&(m(e.charAt(r+h))||y?.(h,e));)e.charAt(r+h)===`
`&&n++,h++;return h}function g(m,y=0,h=r){return r+=y,new Vt(m,{start:h,end:r,line:a,source:e})}function f(){for(let m=e[r];r<t;m=e[++r])if(m===`
`)n++;else if(m!=="\r"&&m!==" "&&m!=="	")break;a=n}function w(m){r=m.end,n=a=m.line}function c(m,y=0){for(;r+y<t&&m.test(e.charAt(r+y));)y++;return y}function E(m,y){let h=qo(...m);return(k=0)=>{let p=e[r+k],A=h;for(;A=A[p];)if(k++,p=e[r+k],A[Ur]&&y(p))return o(A[Ur],k)}}return{createTrieMatcher:E,tk:o,matchWhile:i,matchUntil:s,matchString:l,matchEnclosed:S,matchWhileRegex:c,error:g,skip:(m=1)=>r+=m,skipWhitespace:f,backtrack:w,eof:(m=0)=>r+m>=t,current:(m=0)=>e.charAt(r+m)}}var pe=e=>e===`
`,re=e=>e===" "||e==="	",Rn=e=>re(e)||pe(e),Wr=e=>e>="a"&&e<="z"||e>="A"&&e<="Z",Wo=e=>Wr(e)||e==="-",Yo=e=>Wr(e)||e==="-"||e==="+",Vo=e=>e==="#",Go=e=>e!=="`"&&e!==`
`&&e!=="_"&&e!=="*"&&e!=="<"&&e!=="[",zn=e=>e>="0"&&e<="9",Zo=/\p{White_Space}/u,Wt=/\p{P}|\p{S}/u,Yt=e=>e===""||Zo.test(e);function ht(e,t=0){let r=t,a=e(n=>{let o=n==="	"?4-r%4:n===" "?1:0;return r+=o,!!o},t);return r-=t,{indent:r,textStart:a}}function On(e,t,r,a,n,o){let s=a,i=0,l=0,S=0,g=0,f=0,w;for(;w=e.current(a);){w===`
`?(l=S=0,g++,f=a):S||(w===" "?l++:w==="	"?l+=4:S=1),a++;let c=0,E=e.matchWhile(m=>m===t,a);if(n?E-a===r?c=E:a=E:E-a>=r&&(c=e.matchWhile(re,E)),c&&o(c,l,g)){i=a,a=c;break}}return{consumed:a,blockEnd:i,blockStart:s,lineStart:f,lineCount:g}}var Qo=/^(address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)$/i,Fn=/pre|script|style|textarea/i;function Bn(e){let{matchWhile:t,current:r,eof:a,matchString:n,matchUntil:o}=e;function s(w){let c="",E=w,m;for(;(m=r(E))&&Wo(m);)c+=m,E++;return{tagNameEnd:E,tagName:c}}function i(w,c=!1){let E=r(w),m=E==="/";m&&(E=r(w++));let{tagNameEnd:y,tagName:h}=s(w);if(!h)return;let k=Qo.test(h),p=t(re,y);if(r(p)===">")return{tagName:h,tagEnd:p+1,isClosingTag:m,isRule6:k};if(m)return;let A="",P=t(H=>{let d=H!==">"&&(c&&!k?H!==`
`:!(H===`
`&&A===`
`));return A=H,d},y+1);return c&&a(P)?{tagName:h,tagEnd:P-1,isClosingTag:m,isRule6:k}:r(P++)===">"?{tagName:h,tagEnd:P,isClosingTag:m,isRule6:k}:0}function l(w,c,E=!0){for(;!a(w++);){let m=n(c,void 0,w);if(m)return E?o(pe,w):m}return 0}function S(w){if(r(w)==="!")return r(w+1)==="-"&&r(w+2)==="-"?l(w,"-->",!1):l(w+1,">",!1);if(r(w)==="?")return l(w+1,"?>",!1);let c=i(w);return c?c.tagEnd:0}function g(w){let c=t(re,w);return r(c)===`
`||r(c)===""}function f(w,c=!1){if(r(w)==="!")return r(w+1)==="-"&&r(w+2)==="-"?l(w+3,"-->"):l(w+1,">");if(r(w)==="?")return l(w+1,"?>");let E=i(w,c);if(!E)return 0;let{tagName:m,tagEnd:y,isClosingTag:h}=E;if(a(y))return y;if(!E.isRule6){if(Fn.test(m)){if(h)return 0;let p="</",A=y;for(;!a(A++);)if(n(p,void 0,A)){let P=i(A+1);if(P&&Fn.test(P.tagName))return o(pe,P.tagEnd)}return A-2}else if(!g(y))return 0}let k=y;do if(r(k)===`
`&&(r(k+1)===`
`||r(k+1)===""))return k;while(!a(k++));return 0}return{matchHtml:f,matchInline:S}}function _r({matchEnclosed:e,current:t,matchWhile:r},a,n,o){let s=t(n)==="<"?e(c=>c!==">"&&c!==`
`,a,n+1)+1:e(c=>(!o||c!==")")&&c!==" "&&c!=="	"&&c!==`
`,a,n);if(!o&&s===n)return;let{consumed:i,eol:l}=jn(r,(o?1:0)+s);if(i===s&&!pe(t(i)))return;let S=t(i),g,f;if(S==='"'||S==="'"){f=i;let c;if(g=e(E=>{let m=E!==S&&!(E===`
`&&c===`
`);return c=E,m},a,f+1),t(g++)!==S)return}let w=g===void 0?s:g;if(!o){let c=r(re,w);if(t(c)!==`
`&&t(c)!=="")return l?{linkEnd:s,linkStart:n}:void 0}if(!o||t(w)===")")return{titleEnd:g,titleStart:f,linkEnd:s,linkStart:n}}function Jo(e){let t=Pn({source:e}),{current:r,tk:a,matchWhile:n,backtrack:o,eof:s,matchEnclosed:i,matchUntil:l,skip:S}=t,{matchInline:g}=Bn(t),f=c=>r(c)!==`
`&&r(c-1)==="\\"&&r(c-2)!=="\\";function w(){if(s())return a("eof",0);let c=r();switch(c){case"\\":if(r(1)===`
`)return a("br",2);break;case"`":{let p=n($=>$===c),A=p,{consumed:P,blockEnd:H,blockStart:d}=On(t,c,A,p,!0,()=>!0);return H?{...a("code",P),blockEnd:H,blockStart:d}:a("text",p+A)}case"_":case"*":return(r(1)===c?2:1)==1?a("em",1):a("strong",2);case"<":{let p=n(Yo,1),A=r(p);if(p-1>1&&A===":"||A==="@"){let H=n(d=>d!==">"&&d!==" "&&d!=="<",p+1);if(r(H)===">")return{...a("autolink",H+1),type:A}}let P=g(1);return P?a("html",P):a("text",p)}case"!":{if(r(1)==="["){let p=i(A=>A!=="]",f,1);if(r(p)==="]"){let A=r(p+1)==="("?_r(t,f,p+2,!0):void 0;return A?{...a("img",(A.titleEnd??A.linkEnd)+1),linkTextEnd:p,linkTextStart:2,...A}:{...a("img",p+1),linkTextEnd:p,linkTextStart:2,linkStart:0,titleEnd:0,titleStart:0,linkEnd:0}}}return a("text",1)}case"[":{let p=i(A=>A!=="]",f,1);if(r(p)==="]")if(r(p+1)==="("){let A=_r(t,f,p+2,!0);if(A)return{...a("a",(A.titleEnd??A.linkEnd)+1),linkTextEnd:p,linkTextStart:1,...A}}else return{...a("a",p+1),linkTextEnd:p,linkTextStart:1,linkStart:0,titleEnd:0,titleStart:0,linkEnd:0};return a("text",1)}}let{indent:E,textStart:m}=ht(n);if(c=r(m),m>=2&&c===`
`)return a("br",m+1);if(E>=4&&c!==`
`&&c!=="")return{...a("tabsBlock",l(pe,m)),textStart:m,indent:E};let y=i(Go,f,(c===`
`?1:0)+m),h=r(y),k=y;if(h===`
`&&r(y-1)==="\\"&&(y-=1,k--),h===`
`||h===""){for(;y>m&&re(r(y-1));)y--;let p=a("text",y);return(h===""||k-y===1||r(k)==="\\")&&S(k-y),p}return a("text",y)}return{next:w,backtrack:o}}function jn(e,t){let r=0,a=0,n=e(o=>re(o)?(a++,!0):o===`
`&&r++<1,t);return{spaces:a,consumed:n,eol:r}}function Un(e){let t=Pn({source:e}),{current:r,tk:a,matchWhile:n,backtrack:o,eof:s,matchUntil:i,matchEnclosed:l}=t,{matchHtml:S}=Bn(t),g=c=>r(c)!==`
`&&r(c-1)==="\\"&&r(c-2)!=="\\";function f(c,E=1){let m=n(re,E),y=1,h=m;for(;h=n(re,h),r(h)===c;)y++,h++;let k=n(re,h);if(y>=3&&(pe(r(k))||r(k)===""))return k}function w(){if(s())return a("eof",0);let{textStart:c,indent:E}=ht(n),m=r(c);if(m===`
`){let h=0,k=n(p=>p===`
`?(h++,!0):re(p),c);for(;r(k)!==`
`;)k--;return{...a("eol",k+1),count:h}}if(E<4&&(m==="`"||m==="~")){let h=n(p=>p===m,c),k=h-c;if(k>=3){let p,A=!1,P=0,H=h;do{if(p=On(t,m,k,H,!1,(d,$)=>(r(d)===`
`||r(d)==="")&&$<4),H=p.consumed,A||(P=p.blockStart),s(H))break;A=!0}while(!p.lineCount);if(p.lineCount&&!(s(H)&&A)){let{consumed:d,lineStart:$,blockEnd:b}=p;return{...a("block",d),blockEnd:b?$+1:d,blockStart:P,indent:E}}}}if(E>=4)return{...a("tabsBlock",i(pe,c)),textStart:c,indent:E,textIndent:E,blockIndent:E-4,blockStart:c};if(zn(m)){let h=n(zn,c+1),k=r(h);if(h-c<10&&(k==="."||k===")")&&Rn(r(h+1))){let{indent:p,textStart:A}=ht(n,h+1),P=h-c+1,H=i(pe,A),d=E+P+1,$=E+P+p;return r(A)===`
`&&($++,d++),{...a("ol",H),indent:E,textStart:A,blockStart:c,markerStart:c,dot:k,markerEnd:h,blockIndent:$-d>=4?d:$,textIndent:$}}}if(m==="*"||m==="-"||m==="_"){let h=f(m);if(h)return{...a("hr",h),indent:E,textStart:c}}if((m==="-"||m==="*"||m==="+")&&Rn(r(c+1))){let h=m,{indent:k,textStart:p}=ht(n,c+1),A=c,P=E+1+k,H=E+2;r(p)===`
`&&(P=2,H=2);let d=i(pe,p);return{...a("li",d),indent:E,blockStart:A,textStart:p,bullet:h,textIndent:P,blockIndent:P-H>=4?H:P}}if(m==="#"){let h=n(Vo,c+1),k=n(re,h);if(k>h||r(h)===`
`){let p=h-c;if(p<=6){let A=i(pe,k),P=A;for(;re(r(P-1));)P--;let H=P;for(;r(P-1)==="#";)P--;if(!re(r(P-1)))P=H;else for(;re(r(P-2));)P--;return{...a("heading",A),level:p,textStart:k,textEnd:P,textIndent:0}}}}if(m==="["){let h=l(k=>k!=="]",g,c+1);if(r(h)==="]"&&r(h+1)===":"){let{consumed:k}=jn(n,h+2),p=_r(t,g,k);if(p)return{...a("linkdef",p.titleEnd??p.linkEnd),...p,linkTextStart:c+1,linkTextEnd:h}}}if(m===">"){let{textStart:h,indent:k}=ht(n,c+1),p=c+1===h?0:1,A=E+2+k-p;return{...a("blockquote",i(pe,c+1)),indent:E,textStart:h,textIndent:A,blockIndent:E+1+p}}if(m==="<"){let h=n(Wr,c+1);if(r(h)!==":"){let k=S(c+1,!0);if(k)return a("html",k)}}let y=i(pe);if(r(y)===`
`){let h=n(re,y+1),k=r(h);if(h-y-1<4&&(k==="="||k==="-")){let p=n(P=>P===k,h+1),A=n(re,p);if(r(A)===`
`)return{...a("setext",A),level:k==="="?1:2,length:A-h,textStart:c,textEnd:y}}}return{...a("text",y),indent:E,textIndent:E,textStart:c,blockStart:0,blockIndent:0}}return{next:w,backtrack:o}}function Je(e){return e.replace(/\\([\\!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/g,"$1")}function qr(e,t){let r=G(e),a=Je(r.slice(e.linkTextStart,e.linkTextEnd));if(!e.linkEnd&&t){let o=t[a.toLowerCase()];return o?{...o,text:a}:void 0}let n=Je(r.slice(e.linkStart,e.linkEnd));return n.startsWith("<")&&n.endsWith(">")&&(n=n.slice(1,-1)),{title:e.titleStart!==void 0&&e.titleEnd!==void 0?Je(r.slice(e.titleStart+1,e.titleEnd-1)):void 0,href:n,text:a}}function Xo(e,t){let{current:r,parseWhile:a,next:n,backtrack:o}=e,s=0;function i(g,f){let w=g.source.charAt(g.end),c=g.source.charAt(g.start-1),E=Yt(w),m=Wt.test(w),y=Yt(c),h=Wt.test(c),k=!E&&(!m||y||h);return f==="_"?k&&(!(!y&&(!h||E||m))||h):k}function l(g,f){let w=g.source.charAt(g.end),c=g.source.charAt(g.start-1),E=Yt(w),m=Wt.test(w),y=Yt(c),h=Wt.test(c),k=!E&&(!m||y||h),p=!y&&(!h||E||m);return f==="_"?p&&(!k||m):p}function S(){let g=r();switch(s++,g.kind){case"code":{let f=G(g).slice(g.blockStart,g.blockEnd).replace(/\n/g," "),w=f.length>2&&f.startsWith(" ")&&f.endsWith(" ")?f.slice(1,-1):f;return n(),{...g,kind:"code",value:w}}case"em":case"strong":{let f=g.source.charAt(g.start);if(i(g,f)){let w=!1;n();let c=a(()=>{let E=r();if(E.kind===g.kind&&E.source.charAt(E.start)===f&&l(E,f)){w=!0;return}return S()});if(w&&c.length)return n(),{...g,children:c}}return o(g),n(),{...g,kind:"text",value:G(g)}}case"text":{let f=Je(G(g)),w={...g,value:s===1?f.trimStart():f},c=n();for(;c.kind==="text";)w.value+=Je(G(c)),w.end=c.end,c=n();return w}case"tabsBlock":{let f=g.indent-4;return n(),{...g,kind:"block",value:" ".repeat(f)+G(g).slice(g.textStart)+`
`}}case"br":return n(),g;case"autolink":{let f=G(g).slice(1,-1),w=(g.type==="@"?"mailto:":"")+f;return n(),{...g,kind:"a",href:w,text:f}}case"img":{let f=qr(g,t);return n(),f?{...g,kind:"img",...f}:{...g,kind:"text",value:G(g)}}case"a":{let f=qr(g,t);return n(),f?{...g,kind:"a",...f}:{...g,kind:"text",value:G(g)}}case"html":return n(),{...g,block:!1}}}return a(S)}function Hn(e,t=!1,r=[],a={}){function n(){let d=Hr(Jo);for(let $ of r)d.start($.value),$.children=Xo(d,a)}function o(d,$=0,b="",D){let x={...d,start:d.start+$,kind:"text",value:b+G(d).slice($,D)};return r.push(x),x}function s(d,$=o(d)){let b;for(;$;){let D=p();if(D.kind==="eol"&&D.count===1){let x=p();if(x.kind==="ol"){if((+x.source.slice(x.start+x.markerStart,x.start+x.markerEnd)).toString()!=="1"||x.textStart+x.start-x.end===0){$.value+=`
`+G(x);continue}}else if(x.kind==="li"&&G(x).length===1){$.value+=`
`+G(x);continue}else if(x.kind==="setext"){if(t)if(d.kind==="text")p(),$.value+=`
`+x.source.slice(x.start+x.textStart,x.start+x.textEnd),$.value?($.value=$.value.replace(/^\s*([^\n]+?)\s*$/gm,"$1"),b={...x,start:$.start,kind:"heading",children:[$]}):$.value+=G(x);else if(x.level===1)$.value+=`
`+G(x);else break;else{p(),$.value+=`
`+G(x);continue}continue}else if(x.kind==="text"){x.start=D.start,$.value+=G(x).replace(/^[\t ]*([^\n]+?)$/gm,"$1");continue}else if(x.kind==="tabsBlock"){$.value+=`
`+G(x).slice(x.textStart);continue}else if(x.kind==="linkdef"){$.value+=`
`+G(x);continue}}A(D);break}return b||{...d,kind:"p",children:[$]}}function i(d){let $=y();if(!($.kind!=="li"||$.bullet!==d))return E($,!0)}function l(d){let $=d.bullet,b=k(()=>i($)),D=!!b.find((x,O)=>{if(x.pCount===2||x.pCount===1&&b.length-1!==O)return!0});return{...d,kind:"ul",children:b,loose:D}}function S(d){let $,b,D=k(()=>{let O=y();if(O.kind!=="ol")return;let Q=O.dot;if($??=Q,Q!==$)return;let u=(+O.source.slice(O.start+O.markerStart,O.start+O.markerEnd)).toString();return b??=u,E({...O,kind:"li",bullet:Q,bulletOrder:u},!0)}),x=!!D.find((O,Q)=>{if(O.pCount===2||O.pCount===1&&D.length-1!==Q)return!0});return{...d,kind:"ol",children:D,loose:x,listStart:b}}function g(d,$){d.value=d.value.replace(/^\t+/gm,b=>"    ".repeat(b.length)).replace(new RegExp(`^[ 	]{1,${$}}`,"gm"),"")}function f(d,$=4){let b={...d,kind:"block",value:G(d)},D=y();for(;D.kind==="eol";){let x=p();if(x.kind==="li"&&x.indent>=4){let O=G(D);x.indent<$&&($=x.indent),b.value+=O+G(x).slice(x.blockStart),b.end=x.end,D=p()}else if(x.kind==="tabsBlock"){let O=G(D);x.indent<$&&($=x.indent),b.value+=O+G(x),b.end=x.end,D=p()}else{b.value+=`
`;break}}return g(b,$),b}function w(d,{source:$,start:b,textStart:D,end:x},O){return" ".repeat(d)+$.slice(b+(O??D),x)}function c(d,$){return $.kind==="li"||$.kind==="ol"?$.indent>=d.blockIndent:$.textIndent>=d.blockIndent}function E(d,$=!1){let b=[" ".repeat(d.textIndent-d.blockIndent)+d.source.slice(d.start+d.textStart,d.end)],D=0;for(;d;){let Q=p();if(Q.kind!=="eol")break;if(Q.count===1){let u=p();if(b.push(`
`),u.kind==="blockquote")d.end=u.end,b.push(w(u.textIndent-u.blockIndent,u));else if(u.kind==="tabsBlock"||u.kind==="li"||u.kind==="ol")if(u.kind==="tabsBlock"||c(d,u))d.end=u.end,b.push(w(Math.max(u.indent-d.blockIndent,0),u,u.blockStart));else{A(u);break}else if(u.kind==="hr")if(u.indent>=d.blockIndent)d.end=u.end,b.push(" ".repeat(u.indent-d.blockIndent)+u.source.slice(u.start+u.textStart,u.end));else{A(u);break}else if(u.kind==="text"||u.kind==="setext"&&u.level===1)d.end=u.end,b.push(G(u));else{A(u);break}}else if($){let u=p();if(D=1,d.end-d.start>1&&(u.kind==="tabsBlock"||u.kind==="li"||u.kind==="ol"||u.kind==="text"))if(c(d,u))d.end=u.end,b.push(G(Q),w(Math.max(u.indent-d.blockIndent,0),u,u.blockStart));else{A(u);break}else{A(u);break}}else{b.push(`
`);break}}let x=Hr(Un);x.start(b.join(""));let O=Hn(x,!1,r,a);return{...d,children:O.children,pCount:O.pCount===2?2:D}}function m(){let d=y();switch(d.kind){case"heading":{let $={...d,children:[o(d,d.textStart,"",d.textEnd)]};return p(),$}case"block":{let $=G(d).slice(d.blockStart,d.blockEnd),b=/^(.+)/.exec($),D=b?.[1],x=$.slice((b?.[0].length??0)+1);return x&&!x.endsWith(`
`)&&(x+=`
`),d.indent&&(x=x.replace(new RegExp(`^\\s{1,${d.indent}}`,"gm"),"")),p(),{...d,kind:"block",info:D,value:x}}case"blockquote":return E(d);case"tabsBlock":return p(),f(d);case"html":return p(),{...d,block:!0};case"li":return l(d);case"ol":return S(d);case"hr":return p(),d;case"linkdef":{let $=qr(d);return $&&(a[$.text.toLowerCase()]??=$),p(),m()}case"eol":return d.count>1&&(P=2),p(),{...d,kind:"text",value:""};case"setext":return p(),{...d,kind:"heading",children:[o(d,d.textStart,"",d.textEnd)]};case"eof":return}return s(d)}let{current:y,node:h,parseWhile:k,next:p,backtrack:A}=e,P=0,H={...h("root"),children:k(m),linkDefinitions:a,pCount:P};return t&&n(),H}function He(e,t){let r=e.map(Yr).join("");return t?`<${t}>${r}</${t}>`:r}function $e(e){return e.replace(/[&<>"]/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;"}return"&quot;"})}function Ln(e){let t=[];for(let r of e.children){if(r.kind!=="li")break;if(e.loose)t.push(He(r.children,r.kind));else{let a=r.children.map(n=>n.kind==="p"?He(n.children):Yr(n)).join("");t.push(`<${r.kind}>${a}</${r.kind}>`)}}return t.join("")}function Yr(e){switch(e.kind){case"root":{let t=He(e.children);return t?t+`
`:""}case"hr":return`<${e.kind} />`;case"br":return`<${e.kind} />
`;case"code":return`<code>${$e(e.value)}</code>`;case"img":{let t=e.title?` title="${$e(e.title)}"`:"";return`<img src="${encodeURI($e(e.href))}" alt="${$e(e.text)}"${t} />`}case"a":{let t=e.title?` title="${$e(e.title)}"`:"";return`<a href="${encodeURI($e(e.href))}"${t}>${$e(e.text)}</a>`}case"ol":{let t=e.listStart;return`<ol${t&&t!=="1"?` start="${t}"`:""}>${Ln(e)}</ol>`}case"blockquote":return`<blockquote>${He(e.children)||`
`}</blockquote>`;case"em":case"strong":case"p":return He(e.children,e.kind);case"ul":return`<ul>${Ln(e)}</ul>`;case"heading":return He(e.children,`h${e.level}`);case"block":{let t=e.info&&/\s*([^\s]+)/.exec(e.info);return`<pre><code${t?` class="language-${Je(t[1])}"`:""}>${$e(e.value)}</code></pre>`}case"text":return e.children?He(e.children):$e(e.value);case"html":return G(e)+(e.block&&e.end<e.source.length-1?`
`:"")}return""}function Ko(){let e=Hr(Un);function t(a){return e.start(a),{root:Hn(e,!0),errors:e.errors}}function r(a){let n=t(a);return{output:Yr(n.root),ast:n.root,errors:n.errors}}return{compile:r,parse:t}}function _n(e){return Ko().compile(e).output}var I;(function(e){e[e.Unknown=0]="Unknown",e[e.Variable=1]="Variable",e[e.TypeAlias=2]="TypeAlias",e[e.TypeParameter=3]="TypeParameter",e[e.Interface=4]="Interface",e[e.TypeUnion=5]="TypeUnion",e[e.Reference=6]="Reference",e[e.Module=7]="Module",e[e.Class=8]="Class",e[e.Parameter=9]="Parameter",e[e.Property=10]="Property",e[e.Method=11]="Method",e[e.Getter=12]="Getter",e[e.Setter=13]="Setter",e[e.Constructor=14]="Constructor",e[e.Array=15]="Array",e[e.Function=16]="Function",e[e.FunctionType=17]="FunctionType",e[e.ConditionalType=18]="ConditionalType",e[e.Parenthesized=19]="Parenthesized",e[e.Infer=20]="Infer",e[e.IndexedType=21]="IndexedType",e[e.Enum=22]="Enum",e[e.Literal=23]="Literal",e[e.IndexSignature=24]="IndexSignature",e[e.Export=25]="Export",e[e.Keyof=26]="Keyof",e[e.Typeof=27]="Typeof",e[e.ConstructorType=28]="ConstructorType",e[e.Tuple=29]="Tuple",e[e.ThisType=30]="ThisType",e[e.Constant=31]="Constant",e[e.BaseType=32]="BaseType",e[e.ClassType=33]="ClassType",e[e.ObjectType=34]="ObjectType",e[e.Component=35]="Component",e[e.Attribute=36]="Attribute",e[e.Namespace=37]="Namespace",e[e.CallSignature=38]="CallSignature",e[e.ConstructSignature=39]="ConstructSignature",e[e.MappedType=40]="MappedType",e[e.TypeIntersection=41]="TypeIntersection",e[e.ReadonlyKeyword=42]="ReadonlyKeyword",e[e.UnknownType=43]="UnknownType",e[e.Event=44]="Event",e[e.Spread=45]="Spread",e[e.ImportType=46]="ImportType",e[e.Symbol=47]="Symbol"})(I||(I={}));var ne;(function(e){e[e.None=0]="None",e[e.Export=1]="Export",e[e.Ambient=2]="Ambient",e[e.Public=4]="Public",e[e.Private=8]="Private",e[e.Protected=16]="Protected",e[e.Static=32]="Static",e[e.Readonly=64]="Readonly",e[e.Abstract=128]="Abstract",e[e.Async=256]="Async",e[e.Default=512]="Default",e[e.Deprecated=8192]="Deprecated",e[e.Overload=16384]="Overload",e[e.External=32768]="External",e[e.DefaultLibrary=65536]="DefaultLibrary",e[e.DeclarationMerge=131072]="DeclarationMerge",e[e.Rest=262144]="Rest",e[e.Optional=524288]="Optional",e[e.Internal=1048576]="Internal"})(ne||(ne={}));var gt=class extends T{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;formatter;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};v(gt,{tagName:"doc-demo",init:[R("view"),R("libraries"),R("header")],augment:[N(`
  :host {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--cxl-color-outline-variant);
    border-radius: 4px;
    position: relative;
	min-height:138px;
  }
  .parent {
    visibility: hidden; 
    flex-grow: 1;
    padding: 40px 0 0 0;
  }
  .container {
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    max-height: 740px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  @media (max-width: 768px) {
    .cmobile {
      padding-bottom: 0;
    }
  }
  .source {
  	display: none;
    font: var(--cxl-font-code); 
    overflow-y: auto;
    flex-grow: 1;
    margin-top: 40px;
    min-height: 64px;
	position: absolute;
	inset: 0;
	text-align: initial;
	white-space: pre-wrap;
  }
  
  .visible { display: block; visibility: visible; }
  .hide { display: none; }
  .tabs { flex-grow: 1; }
  #ticon{ padding-left:8px; padding-right:8px;}
  
  #toolbar {
    justify-content: right;
    background-color: transparent;
    z-index: 1;
    position: absolute;
    right: 8px;
	gap: 16px;
    top: 0px;
	height: 40px;
	padding: 0 12px;
	align-items: center;
	display: flex;
  }
	`),e=>{let t=z(e,"view"),r=de("container"),a=L(Pt,{className:r}),n=L(it,{$:f=>Re(f).tap(()=>{e.formatter?f.innerHTML=e.formatter(l):f.innerText=l}),className:t.map(f=>f==="source"?"source visible hljs":"source")}),o=L(Ot,{$:f=>oe(f).tap(()=>e.view="source"),className:z(e,"view").map(f=>f==="source"?"hide":""),title:"See source"},L(Qe,{name:"code"}),"Code"),s=L(Se,{$:f=>oe(f).tap(()=>e.view="mobile"),height:20,className:z(e,"view").map(f=>f==="source"?"":"hide"),icon:"close",title:"Close source"}),i=L("div",{id:"toolbar"},L("slot",{name:"toolbar"}),L(Se,{$:f=>oe(f).tap(async()=>{await navigator.clipboard.writeText(l),f.icon="done",setTimeout(()=>f.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(f=>f==="source"?"icon":"icon hide")}),o,s),l;function S(f){let w=f==="desktop";r.next(w?"container":"container cmobile")}function g(){let f=e.childNodes[0]?.textContent?.trim()||"";if(!f)return;let w=e.libraries?e.libraries.split(",").map(c=>`<script type="module" src="${e.getLibraryUrl(c)}"><\/script>`).join(""):"";a.srcdoc=`${e.header}${w}${f}`,l=f}return X(e).append(i,L(it,{className:t.map(f=>f==="source"?"parent":`parent visible ${f}`)},a),n),M(z(e,"view").tap(S),nt(e).raf(g))}]});function qn(e){let t=e.index;function r(i){if(!(!i||typeof i=="string")&&typeof i=="number")return t.find(l=>l.id===i)}function a(i){if(!(!i||typeof i=="string")){if(typeof i=="number"){let l=t.find(S=>S.id===i);return l&&(l.kind===I.Interface||l.kind===I.Class)?l:l?a(l.resolvedType??l.type):void 0}return i.kind===I.Reference?r(i.type):i.resolvedType&&typeof i.resolvedType!="string"?i.resolvedType:i}}function n(i,l){if(i.children){for(let S of i.children)!S.name||S.flags&&S.flags&ne.Abstract||(l[S.name]??=S);return l}}function o(i,l={}){n(i,l);let S=a(i.type);if(S?.children)for(let g of S.children){let f=a(g);if(!f||f.kind!==I.Component||f.name==="Component")break;o(f,l)}return l}function s(i){return i.kind===I.FunctionType||i.kind===I.Function||i.kind===I.Method||i.kind===I.Setter}return{getNodeProperties:o,getTypeSummary:a,isFunction:s,getRef:r,json:e}}var es={[I.Constant]:"Constants",[I.Variable]:"Variables",[I.Interface]:"Interfaces",[I.Class]:"Classes",[I.Property]:"Properties",[I.Method]:"Methods",[I.Getter]:"Getters",[I.Setter]:"Setters",[I.Constructor]:"Constructor",[I.Function]:"Functions",[I.Enum]:"Enums",[I.Component]:"Components",[I.Attribute]:"Attributes",[I.TypeAlias]:"Type Alias",[I.CallSignature]:"Call Signature",[I.ConstructSignature]:"Construct Signature",[I.Event]:"Events",[I.IndexSignature]:"Index Signature",[I.Export]:"Exports",[I.Namespace]:"Namespaces"};function Wn(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function ts(e){return e.name?`docs/ui-${e.name}`:void 0}function rs(e){let t=ts(e),r=e.name??"?";return t?L("a",{href:t},r):r}function Yn({summary:e,summaryJson:t,link:r=rs,uiCdn:a,importmap:n,codeHighlight:o}){let{getTypeSummary:s,getRef:i,isFunction:l}=qn(t),S=t.index;function g(u){if(u)return typeof u=="string"?u:s(u)??(typeof u=="number"?void 0:u.name)}function f(u){return u?"&lt;"+u.map(C=>c(C)+(C.kind!==I.Reference&&C.type?` extends ${c(C.type)}`:"")).join(", ")+"&gt;":""}function w(u){return["{ ",...u.children?.map(p).flatMap(k("; "))??[]," }"]}function c(u){let C=g(u);if(!C&&u&&console.log(u),!C||typeof C=="string")return[C||"?"];switch(C.kind){case I.TypeUnion:return C.children?.map(c).flatMap(k(" | "))??[];case I.Literal:case I.BaseType:return[C.name??"?"];case I.ObjectType:return w(C)??["?"];case I.Array:return[...c(C.type),"[]"];case I.Interface:case I.Class:case I.Component:{let U=C.typeP?f(C.typeP):void 0;return[r(C),U]}case I.FunctionType:return p(C);case I.ClassType:{let U=i(u);return[U?r(U):C.name??"?"]}case I.IndexedType:return[...c(C.children?.[0]),"[",...c(C.children?.[1]),"]"];default:console.log(C)}return[]}function E(u){let C=u.flags??0;return[`${`${C&ne.Public?"public ":C&ne.Private?"private":C&ne.Protected?"protected ":""}${C&ne.Rest?"...":""}${u.name}${C&ne.Optional?"?":""}`}: `,...c(u.type)]}function m(u){return["(",...u?.map(E).flatMap(k(", "))??[],")"]}function y(u){let C=u.flags??0,U=u.kind===I.Getter?"get ":u.kind===I.Setter?"set ":void 0;return[C&ne.Static?"static ":"",C&ne.Readonly?"readonly ":"",C&ne.Abstract?"abstract ":"",U]}function h(u){return["[",...u.parameters?.flatMap(p)??[]??[],"]: ",...u.type?c(u.type)??[]:["?"]]}function k(u){return(C,U)=>U!==0?[...u,...C]:C}function p(u){if(u.kind===I.IndexSignature)return h(u);if(u.kind===I.Spread&&u.children?.[0])return["...",...c(u.children[0])];let C=u.flags&&u.flags&ne.Optional,U=l(u)?m(u.parameters):[],Y=u.kind===I.FunctionType;return[...y(u),u.name,C?"?":"",...U,Y?" => ":": ",...c(u.resolvedType??u.type)]}function A(u){return[L("h3",{},L(ke,{font:"title-large"},...p(u))),...D(u)]}function P(u,C){if(!u.children)return[];let U={};for(let Y of u.children)Y.kind!==I.Constructor&&Y.kind!==I.Unknown&&(Y.flags||0)&ne.Public&&!C?.(Y)&&(U[Y.kind]??={name:es[Y.kind],nodes:[]}).nodes.push(Y);return Object.values(U).sort(vr("name")).flatMap(Y=>[L("h2",{},Y.name),...Y.nodes.flatMap(A)])}function H(u){let C;u=u.replace(/<caption>(.+?)<\/caption>/,(ue,Gt)=>(C=Gt,""));let U=`<style>body{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:0 24px 24px 24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,Y=(n??"")+`<script type="module" src="${a}"><\/script>`,V=L(gt,{header:U+Y,formatter:o},u);return[C?L(ke,{font:"title-medium"},C):void 0,V]}function d(u){return S.find(C=>C.name===u)}function $(u){let C=u.flatMap(U=>{let Y=U.value,V=Wn(Y);if(typeof Y=="string"){let ue=d(Y);V=ue?r(ue):Y}return[V,", "]});return C.pop(),L("p",{},"Related: ",C)}function b({src:u}){let C=L("div");return C.innerHTML=_n(u),C}function D(u){let C=u.docs;if(!C||!C.content)return[];let U=[],Y=C.content.flatMap(V=>{let ue=Wn(V.value);return V.tag==="icon"||V.tag==="title"?[]:V.tag==="example"||V.tag==="demo"||V.tag==="demoonly"?H(ue):V.tag==="see"?(U.push(V),[]):V.tag==="return"?[L(ke,{font:"headline-small"},"Returns"),L("p",void 0,ue)]:V.tag==="param"?[L("p",void 0,ue)]:[V.tag?L("p",void 0,`${V.tag}: `,ue):b({src:ue})]});return U.length&&Y.push($(U)),Y}function x(u){let C=[],U=s(u);if(!(!U||U.kind!==I.ClassType))return U.children?.forEach(Y=>{if(typeof Y!="object")return;let V=s(Y);V&&V.name!=="Component"&&C.push(r(V))}),L(ke,{font:"headline-small"}," ",...C.length?["extends ",C]:[])}function O(u){let C=s(u.type),U=[];if(!C?.children)return[];for(let Y of C.children){let V=s(Y);if(!V||V.kind!==I.Component||V.name==="Component")break;let ue=P(V,Gt=>!!((Gt.flags??0)&ne.Abstract));ue.length&&U.push(L("br"),L(ke,{font:"h6"},"Inherited from ",r(V)),...ue),U.push(...O(V))}return U}let Q=e.kind===I.Component&&e.docs?.tagName;return L("div",{},L("h1",{},e.name," ",e.type&&x(e.type)," ",Q?L(ke,{font:"title-medium"},`<${Q}>`):""),...D(e),...P(e),...O(e))}var xt=class extends T{name;summary;uicdn;importmap=""};v(xt,{tagName:"doc-page",init:[xe("name"),xe("summary"),xe("uicdn")],augment:[e=>Fe(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,r=e.summary.index.find(a=>a.name===t);r&&e.append(Yn({summary:r,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});var Vr=class extends qt{summary;sheetstart=!0};v(Vr,{tagName:"doc-root",augment:[e=>{let t=qe();fetch("summary.json").then(a=>a.json()).then(a=>t.next(a));let r=L(mt,{slot:"start",summary:t});e.append(r,L(xt,{summary:t,name:z(r,"selected")}))}]});export{Br as BlogCode,Vr as ComponentList,Pr as DocAppbar,Or as DocCard,jr as DocGrid,mt as NavList,xt as Page};
