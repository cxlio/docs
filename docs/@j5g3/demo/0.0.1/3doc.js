var ci=Object.defineProperty;var pi=(e,t)=>()=>(e&&(t=e(e=0)),t);var ui=(e,t)=>{for(var r in t)ci(e,r,{get:t[r],enumerable:!0})};var Wo={};ui(Wo,{default:()=>Yi,theme:()=>qo});var Ui,qo,Yi,Jo=pi(()=>{"use strict";Ui={primary:"#8ECFF2","on-primary":"#003548","primary-container":"#004D67","on-primary-container":"#C1E8FF",secondary:"#B5C9D7","on-secondary":"#1F333D","secondary-container":"#364954","on-secondary-container":"#D1E6F3",tertiary:"#C9C2EA","on-tertiary":"#312C4C","tertiary-container":"#474364","on-tertiary-container":"#E5DEFF",error:"#FFB4AB","on-error":"#690005","error-container":"#93000A","on-error-container":"#FFDAD6",background:"#0F1417","on-background":"#DFE3E7",surface:"#0F1417","on-surface":"#DFE3E7","surface-variant":"#40484D","on-surface-variant":"#C0C7CD",outline:"#8A9297","outline-variant":"#40484D",shadow:"#000000",scrim:"#000000","inverse-surface":"#DFE3E7","on-inverse-surface":"#2C3134","inverse-primary":"#186584","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#0F1417","surface-bright":"#353A3D","surface-container-lowest":"#0A0F12","surface-container-low":"#171C1F","surface-container":"#1B2023","surface-container-high":"#262B2E","surface-container-highest":"#313539",warning:"#FFC107","on-warning":"#212121","warning-container":"#4E3400","on-warning-container":"#FFF3CF",success:"#81C784","on-success":"#000","success-container":"#2E7D32","on-success-container":"#fff"},qo={name:"dark",colors:Ui},Yi=qo});var Ee={},Ls=Symbol("terminator");function di(e,t){let r=!1,o={error:n,unsubscribe:i,get closed(){return r},signal:new he,next(a){if(!r)try{e.next?.(a)}catch(l){n(l)}},complete(){if(!r)try{e.complete?.()}finally{i()}}};e.signal?.subscribe(i);function n(a){if(r)throw a;if(!e.error)throw i(),a;try{e.error(a)}finally{i()}}function i(){r||(r=!0,o.signal.next())}try{if(t?.(o))throw new Error("Unsubscribe function result is deprectaed")}catch(a){n(a)}return o}var E=class{__subscribe;constructor(t){this.__subscribe=t}then(t,r){return gi(this).then(t,r)}pipe(...t){return t.reduce((r,o)=>o(r),this)}subscribe(t){return di(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},ke=class extends E{closed=!1;signal=new he;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let r of Array.from(this.observers))r.closed||r.next(t)}error(t){if(!this.closed){this.closed=!0;let r=!1,o;for(let n of Array.from(this.observers))try{n.error(t)}catch(i){r=!0,o=i}if(r)throw o}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},he=class extends E{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},Ht=class extends ke{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},rt=class extends ke{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let r=super.onSubscribe(t);return this.closed||t.next(this.currentValue),r}},kr=class extends ke{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(r=>t.next(r)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},Ve=class extends ke{$value=Ee;get hasValue(){return this.$value!==Ee}get value(){if(this.$value===Ee)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Ee&&t.next(this.$value),super.onSubscribe(t)}},Ar=class extends Error{message="No elements in sequence"};function pe(...e){return new E(t=>{let r=0,o;function n(){let i=e[r++];i&&!t.closed?(o?.next(),i.subscribe({next:t.next,error:t.error,complete:n,signal:o=new he})):t.complete()}t.signal.subscribe(()=>o?.next()),n()})}function _(e){return new E(t=>{e().subscribe(t)})}function Do(e){return new E(t=>{for(let r of e)t.closed||t.next(r);t.complete()})}function Ro(e){return new E(t=>{e.then(r=>{t.closed||t.next(r),t.complete()}).catch(r=>t.error(r))})}function jt(e){return _(()=>Ro(e()))}function fi(e){return new E(t=>{for(let r of e)t.closed||t.next(r);t.complete()})}function _t(e){return e instanceof E?e:Array.isArray(e)?Do(e):e instanceof Promise?Ro(e):fi(e)}function T(...e){return Do(e)}function mi(e){return new Promise((t,r)=>{let o=Ee;e.subscribe({next:n=>o=n,error:n=>r(n),complete:()=>t(o)})})}function gi(e){return mi(e).then(t=>t===Ee?void 0:t)}function $e(e,t){return ue(r=>({next:e(r),unsubscribe:t}))}function ue(e){return t=>new E(r=>{let o=e(r,t);r.signal.subscribe(()=>o.unsubscribe?.()),o.error||(o.error=r.error),o.complete||(o.complete=r.complete),o.signal=r.signal,t.subscribe(o)})}function Nr(e){return $e(t=>r=>t.next(e(r)))}function xi(e,t){return ue(r=>{let o=t,n=0;return{next(i){o=e(o,i,n++)},complete(){r.next(o),r.complete()}}})}function hi(e){return ue(t=>{let r=!0,o;return{next(n){r&&(r=!1,t.next(n),o=setTimeout(()=>r=!0,e))},unsubscribe:()=>clearTimeout(o)}})}function Ae(e){return new E(t=>{let r=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(r))})}function bi(e,t=Ae){return Io(r=>t(e).map(()=>r))}function Io(e){return t=>U(r=>{let o=!1,n=!1,i,a=()=>{i?.next(),o=!1,n&&r.complete()},l=new he;r.signal.subscribe(()=>{a(),l.next()}),t.subscribe({next(s){a(),i=new he,o=!0,e(s).subscribe({next:r.next,error:r.error,complete:a,signal:i})},error:r.error,complete(){n=!0,o||r.complete()},signal:l})})}function yi(e){return t=>U(r=>{let o=r.signal,n=0,i=0,a=!1;t.subscribe({next:l=>{n++,e(l).subscribe({next:r.next,error:r.error,complete:()=>{i++,a&&i===n&&r.complete()},signal:o})},error:r.error,complete(){a=!0,i===n&&r.complete()},signal:o})})}function vi(e){return ue(t=>{let r=!0;return{next(o){r&&(r=!1,e(o).subscribe({next:t.next,error:t.error,complete:()=>r=!0,signal:t.signal}))}}})}function Ut(e){return $e(t=>r=>{e(r)&&t.next(r)})}function wi(e){return $e(t=>r=>{e-- >0&&!t.closed&&t.next(r),(e<=0||t.closed)&&t.complete()})}function Si(e){return $e(t=>r=>{!t.closed&&e(r)?t.next(r):t.complete()})}function Ci(){let e=!1;return ue(t=>({next(r){e||(e=!0,t.next(r),t.complete())},complete(){t.closed||t.error(new Ar)}}))}function ot(e){return $e(t=>r=>{e(r),t.next(r)})}function Ei(e){return ue((t,r)=>{let o,n={next:t.next,error(i){try{if(t.closed)return;let a=e(i,r);a&&(o?.next(),o=new he,a.subscribe({...n,signal:o}))}catch(a){t.error(a)}},unsubscribe:()=>o?.next()};return n})}function ki(){return $e(e=>{let t=Ee;return r=>{r!==t&&(t=r,e.next(r))}})}function Ai(){return e=>{let t=new kr(1),r=!1;return U(o=>{t.subscribe(o),r||(r=!0,e.subscribe(t))})}}function Ni(){return e=>{let t,r=0;function o(){--r===0&&t?.signal.next()}return U(n=>{n.signal.subscribe(o),r++===0?(t=Ne(),t.subscribe(n),e.subscribe(t)):t.subscribe(n)})}}function Ti(){return e=>{let t=new ke,r,o,n=!1,i=!1;return U(a=>{i?(a.next(o),a.complete()):t.subscribe(a),r??=e.subscribe({next:l=>{n=!0,o=l},error:a.error,complete(){i=!0,n&&t.next(o),t.complete()},signal:a.signal})})}}function u(...e){return e.length===1?e[0]:new E(t=>{let r=e.length;for(let o of e)t.closed||o.subscribe({next:t.next,error:t.error,complete(){r--===1&&t.complete()},signal:t.signal})})}function q(...e){return e.length===0?C:new E(t=>{let r=e.length,o=r,n=0,i=!1,a=new Array(r),l=new Array(r);e.forEach((s,p)=>s.subscribe({next(k){l[p]=k,a[p]||(a[p]=!0,++n>=o&&(i=!0)),i&&t.next(l.slice(0))},error:t.error,complete(){--r<=0&&t.complete()},signal:t.signal}))})}function Mi(e){return ue(t=>({next:t.next,unsubscribe:e}))}function Fi(){return Ut(()=>!1)}var C=new E(e=>e.complete());function W(e){return new rt(e)}function U(e){return new E(e)}function Ne(){return new Ve}var Fo={catchError:Ei,debounceTime:bi,distinctUntilChanged:ki,exhaustMap:vi,filter:Ut,finalize:Mi,first:Ci,ignoreElements:Fi,map:Nr,mergeMap:yi,publishLast:Ti,reduce:xi,share:Ni,shareLatest:Ai,switchMap:Io,take:wi,takeWhile:Si,tap:ot,throttleTime:hi};for(let e in Fo)E.prototype[e]=function(...t){return this.pipe(Fo[e](...t))};function y(e,t,r){return new E(o=>{let n=o.next.bind(o);e.addEventListener(t,n,r),o.signal.subscribe(()=>e.removeEventListener(t,n,r))})}function Yt(e){return Tr(e,{childList:!0})}function Gt(e,t){return Tr(e,{attributes:!0,attributeFilter:t})}function Tr(e,t={attributes:!0,childList:!0}){return new E(r=>{let o=new MutationObserver(n=>n.forEach(i=>{for(let a of i.addedNodes)r.next({type:"added",target:e,value:a});for(let a of i.removedNodes)r.next({type:"removed",target:e,value:a});i.type==="characterData"?r.next({type:"characterData",target:e}):i.attributeName&&r.next({type:"attribute",target:e,value:i.attributeName})}));o.observe(e,t),r.signal.subscribe(()=>o.disconnect())})}function qt(e){return y(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function $(e){return y(e,"click")}function Wt(e,t){return new E(r=>{let o=new IntersectionObserver(n=>{for(let i of n)r.next(i)},t);o.observe(e),r.signal.subscribe(()=>o.disconnect())})}function Lo(e){return Wt(e).map(t=>t.isIntersecting)}function de(e){return Wt(e).filter(t=>t.isIntersecting).first()}function Di(e){let t;return function(...r){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,r),t=0})}}function Po(e){return ue(t=>{let r=Di(n=>{t.closed||(e&&e(n),t.next(n),o&&t.complete())}),o=!1;return{next:r,complete:()=>o=!0}})}function zo(){return _(()=>document.readyState!=="loading"?T(!0):y(window,"DOMContentLoaded").first().map(()=>!0))}function Jt(e,t,r){let o=new CustomEvent(t,r);e.dispatchEvent(o)}function Xt(e,t){let r;return u(_(()=>(r=e.childNodes,r?T(r):C)),Tr(e,{childList:!0,...t}),fe().switchMap(()=>e.childNodes!==r?(r=e.childNodes,T(r)):C))}function fe(){return _(()=>document.readyState==="complete"?T(!0):y(window,"load").first().map(()=>!0))}function Qt(...e){return new E(t=>{let r=new ResizeObserver(o=>o.forEach(n=>t.next(n)));for(let o of e)r.observe(o);t.signal.subscribe(()=>r.disconnect())})}function nt(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function Mr(e,t,r){return o=>pe(T(e?o.matches(e):!1),y(o,t).switchMap(()=>u(T(!0),y(o,r).map(()=>e?o.matches(e):!1))))}var Os=Mr("","animationstart","animationend"),Fr=Mr("","mouseenter","mouseleave"),Ri=Mr(":focus,:focus-within","focusin","focusout"),Dr=e=>q(Fr(e),Ri(e)).map(([t,r])=>t||r);function Oo(e,t,r){return t=t?.toLowerCase(),y(e,"keydown",r).filter(o=>!t||o.key?.toLowerCase()===t)}function it(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function Te(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var Ii=ot(e=>console.log(e));E.prototype.log=function(){return this.pipe(Ii)};E.prototype.raf=function(e){return this.pipe(Po(e))};var Y=Symbol("bindings"),Li={},Be=Symbol("augments"),Me=Symbol("parser"),Ir=class{bindings;messageHandlers;internals;attributes$=new Ht;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,r){let o=!1;if(this.messageHandlers)for(let n of this.messageHandlers)n.type===t&&(n.next(r),o||=n.stopPropagation);return o}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let r of this.bindings)t.push(r.subscribe());if(this.prebind)for(let r of this.prebind)t.push(r.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},Kt=Symbol("css"),f=class extends HTMLElement{static observedAttributes;static[Be];static[Me];[Y]=new Ir;[Kt];connectedCallback(){this[Y].wasInitialized=!0,this[Y].wasConnected||this.constructor[Be]?.forEach(t=>t(this)),this[Y].connect()}disconnectedCallback(){this[Y].disconnect()}attributeChangedCallback(t,r,o){let n=this.constructor[Me]?.[t]??Pi;r!==o&&(this[t]=n(o,this[t]))}};function Pi(e,t){let r=t===!1||t===!0;return e===""?r?!0:"":e===null?r?!1:void 0:e}function Vo(e,t){e.hasOwnProperty(Be)||(e[Be]=e[Be]?.slice(0)??[]),e[Be]?.push(t)}var zi={mode:"open"};function R(e){return e.shadowRoot??e.attachShadow(zi)}function $o(e,t){t instanceof Node?R(e).appendChild(t):e[Y].add(t)}function Oi(e,t){t.length&&Vo(e,r=>{for(let o of t){let n=o.call(e,r);n&&n!==r&&$o(r,n)}})}function Vi(e,t){Li[e]=t,customElements.define(e,t)}function oe(e){return e[Y].internals??=e.attachInternals()}function c(e,{init:t,augment:r,tagName:o}){if(t)for(let n of t)n(e);r&&Oi(e,r),o&&Vi(o,e)}function be(e){return pe(T(e),e[Y].attributes$.map(()=>e))}function z(e,t){return e[Y].attributes$.pipe(Ut(r=>r.attribute===t),Nr(()=>e[t]))}function m(e,t){return u(z(e,t),_(()=>T(e[t])))}function $i(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function at(e,t,r){return r===!1||r===null||r===void 0?r=null:r===!0&&(r=""),r===null?e.removeAttribute(t):e.setAttribute(t,String(r)),r}function Bi(e,t,r){e.hasOwnProperty(Me)||(e[Me]={...e[Me]}),e[Me]&&(e[Me][t]=r)}function h(e,t){return r=>{t?.observe!==!1&&$i(r).push(e),t?.parse&&Bi(r,e,t.parse);let o=`$$${e}`,n=r.prototype,i=Object.getOwnPropertyDescriptor(n,e);i&&Object.defineProperty(n,o,i);let a=t?.persist,l={enumerable:!0,configurable:!1,get(){return this[o]},set(s){this[o]!==s?(this[o]=s,a?.(this,e,s),this[Y].attributes$.next({target:this,attribute:e,value:s})):i?.set&&(a?.(this,e,s),this[o]=s)}};Vo(r,s=>{if(i||(s[o]=s[e]),Object.defineProperty(s,e,l),a?.(s,e,s[e]),t?.render){let p=t.render(s);p&&$o(s,p)}})}}function x(e){return h(e,{persist:at,observe:!0})}function Bo(e){let t=`on${e}`;return h(t,{render(r){return m(r,t).switchMap(o=>o?new E(n=>{let i=a=>{a.target===r&&r[t]?.call(r,a)};r.addEventListener(e,i),n.signal.subscribe(()=>r.removeEventListener(e,i))}):C)},parse(r){return r?new Function("event",r):void 0}})}function B(e){return h(e,{observe:!1})}function N(){return document.createElement("slot")}function Ho(e){return t=>{let[r,o]=e();return t[Y].add(r),o}}var He=class extends f{};c(He,{tagName:"c-span"});function Hi(e,t){let r=document.createTextNode("");return e[Y].add(t.tap(o=>r.textContent=o)),r}var Rr=document.createDocumentFragment();function Zt(e,t,r=e){if(t!=null)if(Array.isArray(t)){for(let o of t)Zt(e,o,Rr);r!==Rr&&r.appendChild(Rr)}else e instanceof f&&t instanceof E?r.appendChild(Hi(e,t)):t instanceof Node?r.appendChild(t):e instanceof f&&typeof t=="function"?Zt(e,t(e),r):r.appendChild(document.createTextNode(t))}function jo(e,t){for(let r in t){let o=t[r];e instanceof f?o instanceof E?e[Y].add(r==="$"?o:o.tap(n=>e[r]=n)):r==="$"&&typeof o=="function"?e[Y].add(o(e)):e[r]=o:e[r]=o}}function ji(e,t){return e.constructor.observedAttributes?.includes(t)}function _o(e,t){let r=e instanceof f&&ji(e,t)?z(e,t):Gt(e,[t]).map(()=>e[t]);return u(r,_(()=>T(e[t])))}function er(e,t,r){return h(e,{parse(o){if(o==="Infinity"||o==="infinity")return 1/0;let n=o===void 0?void 0:Number(o);return t!==void 0&&(n===void 0||n<t||isNaN(n))&&(n=t),r!==void 0&&n!==void 0&&n>r&&(n=r),n}})}function Q(e,t,r){for(let o=e.parentElement;o;o=o.parentElement)if(o[Y]?.message(t,r))return}function te(e,t,r=!0){return new E(o=>{let n={type:t,next:o.next,stopPropagation:r};e[Y].addMessageHandler(n),o.signal.subscribe(()=>e[Y].removeMessageHandler(n))})}function S(e,t,...r){let o=typeof e=="string"?document.createElement(e):new e;return t&&jo(o,t),r&&Zt(o,r),o}function b(e,t,...r){if(e!==b&&typeof e=="function"&&!(e.prototype instanceof f))return r.length&&((t??={}).children=r),e(t);let o=e===b?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&jo(o,t),r&&Zt(o,r),o}function _i(e,t){return r=>new E(()=>{r.hasAttribute(e)||r.setAttribute(e,t)})}function Uo(e,t){return ot(r=>e.setAttribute("aria-"+t,r===!0?"true":r===!1?"false":r.toString()))}function V(e){return _i("role",e)}var Yo=0;function me(e){return e.id||=`cxl__${Yo++}`}function Go(e){return _o(e,"id").map(t=>(t||(e.id=`cxl__${Yo++}`),e.id))}var _e=d(":host{display:contents}"),Gi=[-2,-1,0,1,2,3,4,5],en=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],st=Ne(),tr=W(""),ne=d(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),qi=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),tn={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function rn(e=""){return`
:host ${e} {
	${G("surface-container")}
	overflow-y: auto;
	padding: 8px 0;
	min-width: 112px;
	max-width: 280px;
	width: max-content;
	border-radius: var(--cxl-shape-corner-xsmall);
	cursor: default;
	z-index: 2;
}
:host([static]) ${e} { max-width: none; }
		`}function on(e=tn){return Object.entries(e).map(([t,r])=>`--cxl-color--${t}:${r};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var H={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:tn,imports:qi?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function lt(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var rr=d(lt()),nn={"./theme-dark.js":()=>Promise.resolve().then(()=>(Jo(),Wo))},Fe=[0,4,8,16,24,32,48,64],je,Xo,Wi;function O(e,t){return e==="xsmall"?`@media(max-width:${H.breakpoints.small}px){${t}}`:`@media(min-width:${H.breakpoints[e]}px){${t}}`}function Ue(e){return Qt(e).map(t=>{let r=H.breakpoints,o=t.contentRect.width,n="xsmall";for(let i in r){if(r[i]>o)return n;n=i}return n})}function Ji(e=""){return Object.entries(un).map(([t,r])=>`:host([color=${t}]) ${e}{ ${r} }`).join("")}function Ye(e,t,r=""){return an(e,`
		${t?`:host ${r} { ${un[t]} }`:""}
		:host${t?"":"([color])"} ${r} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${r}{
			color: inherit;
			background-color: transparent;
		}
		${Ji(r)}
	`)}function an(e,t){let r=d(t);return h(e,{persist:at,render:o=>r(o)})}function ie(e,t){return an(e,Gi.map(r=>{let o=t(r);return r===0?`:host ${o}`:`:host([size="${r}"]) ${o}`}).join(""))}function sn(){let e=document.adoptedStyleSheets.indexOf(je);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function Xi(e){je&&sn();let t=e.globalCss??"";e.colors&&(t+=`:root{${on(e.colors)}}`),t&&(je=ye(t),document.adoptedStyleSheets.push(je)),st.next({theme:e,stylesheet:je,css:t}),tr.next(e.name)}var Qo="";function ln(e){e?e!==Qo&&(typeof e=="string"?import(e):e()).then(t=>Xi(t.default)):je&&(sn(),st.next(void 0),tr.next("")),Qo=e}function Qi(e){let t;return st.tap(r=>{let o=r?.theme.override?.[e.tagName];o?t?t.replace(o):e.shadowRoot?.adoptedStyleSheets.push(t??=ye(o)):t&&t.replace("")})}function ye(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function cn(e,t=""){let r=ye(t);return R(e).adoptedStyleSheets.push(r),r}function d(e){let t;return r=>{let o=R(r);if(o.adoptedStyleSheets.push(t??=ye(e)),!r[Kt])return H.css&&o.adoptedStyleSheets.unshift(Wi??=ye(H.css)),r[Kt]=!0,Qi(r)}}var pn=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],Ws=[...pn,"inherit"];function Lr(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function G(e){return`${Lr(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var un=pn.reduce((e,t)=>(e[t]=`
${Lr(t)}
${t==="inverse-surface"?Lr("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function Ge(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function M(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var Zi=requestAnimationFrame(()=>na()),Ki={},Zo=document.createElement("template"),Ko={};function ea(e){return function(t){let r=e(t),o=Ko[r];if(o)return o.cloneNode(!0);let n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=()=>(n.dispatchEvent(new ErrorEvent("error")),"");return fetch(r).then(a=>a.ok?a.text():i(),i).then(a=>{if(!a)return;Zo.innerHTML=a;let l=Zo.content.children[0];if(!l)return;let s=l.getAttribute("viewBox");s?n.setAttribute("viewBox",s):l.hasAttribute("width")&&l.hasAttribute("height")&&n.setAttribute("viewBox",`0 0 ${l.getAttribute("width")} ${l.getAttribute("height")}`);for(let p of l.childNodes)n.append(p);Ko[t.name]=n}),n.setAttribute("fill","currentColor"),n}}var ta=ea(({name:e,width:t,fill:r})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${r?"fill1_":""}${t}px.svg`)),ra=ta;function dn(e,t={}){let{width:r,height:o}=t;r===void 0&&o===void 0&&(r=o=24);let n=Ki[e]?.icon()||ra({name:e,width:r,fill:t.fill});return t.className&&n.setAttribute("class",t.className),r&&(n.setAttribute("width",`${r}`),o===void 0&&n.setAttribute("height",`${r}`)),o&&(n.setAttribute("height",`${o}`),r===void 0&&n.setAttribute("width",`${o}`)),t.alt&&n.setAttribute("alt",t.alt),n}var Pr,oa=new Promise(e=>{Pr=e});function na(e){cancelAnimationFrame(Zi),Xo||(e&&(e.colors&&(H.colors=e.colors),e.globalCss&&(H.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(Xo=ye(`:root { ${on(H.colors)} }`+H.globalCss)),H.imports?Promise.allSettled(H.imports.map(t=>{let r=document.createElement("link");return r.rel="stylesheet",r.href=t,document.head.append(r),new Promise((o,n)=>(r.onload=o,r.onerror=n))})).then(Pr):Pr())}function or(){return jt(async()=>{await oa,await document.fonts.ready})}var zr=[d(`
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
	${M("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${M("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${M("headline-medium")}
	flex-wrap: wrap;
}`),N,()=>S("slot",{name:"title"})];function ia(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var ct=class extends f{size;sticky=!1;contextual};c(ct,{tagName:"c-appbar",init:[x("size"),x("sticky"),x("contextual")],augment:[d(`
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
		`),...zr,()=>S("slot",{name:"contextual"}),e=>m(e,"sticky").switchMap(t=>t?Wt(e,{threshold:[1]}).tap(r=>e.toggleAttribute("scroll",r.intersectionRatio<1)):C),e=>{let t;return u(Yt(e),m(e,"contextual")).raf().switchMap(()=>{for(let r of e.children)if(ia(r)&&(r.slot="contextual",r.open=r.name===e.contextual,r.open))return t=r,y(r,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,C})}]});function aa(e){return m(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function sa(e,t=e,r=0){let o=t.hasAttribute("tabindex")?t.tabIndex:r;return aa(e).tap(n=>{n?t.removeAttribute("tabindex"):t.tabIndex=o})}function la(e,t=e){return u(y(t,"focusout").tap(()=>e.touched=!0),u(z(e,"disabled"),z(e,"touched")).tap(()=>Q(e,"focusable.change")))}function ve(e,t=e,r=0){return u(sa(e,t,r),la(e,t))}function fn(e){return e in H.animation}function ge({target:e,animation:t,options:r}){if(H.disableAnimations)return e.animate(null);let o=typeof t=="string"?H.animation[t]:t;if(!o)throw new Error(`Animation "${t}" not defined`);let n=typeof o.kf=="function"?o.kf(e):o.kf,i={duration:250,easing:H.easing.emphasized,...o.options,...r,...H.prefersReducedMotion?{duration:0}:void 0};return e.animate(n,i)}function mn(e){let{trigger:t,stagger:r,commit:o,keep:n}=e;function i(l){return new E(s=>{let p=ge(l);p.ready.then(()=>s.next({type:"start",animation:p}),()=>{}),p.addEventListener("finish",()=>{s.next({type:"end",animation:p}),o&&p.commitStyles(),!(n||n!==!1&&l.options?.fill&&(l.options.fill==="both"||l.options.fill==="forwards"))&&s.complete()}),s.signal.subscribe(()=>{try{p.cancel()}catch{}})})}let a=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return u(...a.map((l,s)=>{let p={...e.options,delay:r!==void 0?(e.options?.delay??0)+s*r:e.options?.delay};return(t==="visible"?Lo(l).filter(g=>g):t==="hover"?Fr(l):T(!0)).switchMap(g=>g?i({...e,options:p,target:l}):C)}))}function gn(e,t,r=e.getBoundingClientRect()){let o=r.width>r.height?r.width:r.height,n=new nr,i=e.shadowRoot||e,{x:a,y:l}=t??{},s=a===void 0||!t||it(t),p=a>r.right||a<r.left||l>r.bottom||l<r.top;return n.x=s||p?r.width/2:a-r.left,n.y=s||p?r.height/2:l-r.top,n.radius=o,t||(n.duration=0),i.prepend(n),n}function xn(e,t=e){let r,o,n,i=()=>{r=gn(t,o instanceof Event?o:void 0,n),r.duration=600,o=void 0};return u(y(e,"click").tap(a=>{o=a,n=t.getBoundingClientRect()}),m(e,"selected").raf().switchMap(()=>{if(e.selected){if(!r?.parentNode){if(nt(e))return o=void 0,de(e).tap(i);i()}}else r&&hn(r);return C})).ignoreElements()}function hn(e){return new Promise(t=>{ge({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function ae(e,t=e){let r=!1,o=0;return u(y(t,"pointerdown"),y(t,"click")).tap(n=>n.cxlRipple??=e).raf().mergeMap(n=>{if(n.cxlRipple===e&&!r&&!e.disabled&&e.parentNode){o=Date.now(),r=!0,e.style.setProperty("--cxl-mask-hover","none");let i=gn(e,n),a=i.duration,l=()=>{e.style.removeProperty("--cxl-mask-hover"),hn(i).then(()=>{r=!1})};return n.type==="click"?Ae(a).tap(l):u(y(document,"pointerup"),y(document,"pointercancel")).first().map(()=>{let s=Date.now()-o;setTimeout(()=>l(),s>a?32:a-s)})}return C})}var nr=class extends f{x=0;y=0;radius=0;duration=500};c(nr,{tagName:"c-ripple",init:[h("x"),h("y"),h("radius")],augment:[d(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",U(()=>{let r=t.style;r.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,r.width=r.height=e.radius*2+"px",t.parentNode||R(e).append(t),ge({target:t,animation:"expand",options:{duration:e.duration}}),ge({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var De=[ne,rr,d(`
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
}`)],ca=d(`
:host {
	${M("label-large")}
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
`);function Or(e){return m(e,"disabled").switchMap(t=>t?C:qt(e).tap(r=>{r.stopPropagation(),e.click()}))}function Vr(e){return u(Or(e),ve(e))}var qe=class extends f{disabled=!1;touched=!1};c(qe,{init:[x("disabled"),x("touched")],augment:[V("button"),Vr]});var pt=class extends qe{size;color;variant};c(pt,{tagName:"c-button",init:[ie("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),Ye("color","primary"),x("variant")],augment:[...De,ca,ae,N]});var ut=class extends pt{};c(ut,{tagName:"c-button-round",augment:[d(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var Z=class extends f{name="";width;height;alt;fill=!1};c(Z,{tagName:"c-icon",init:[h("name"),h("width"),h("height"),h("fill"),h("alt")],augment:[V("none"),d(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,r;return e.shadowRoot?.adoptedStyleSheets.push(t),de(e).switchMap(()=>be(e)).debounceTime(0).tap(()=>{let o=e.width??e.height,n=e.height??e.width;t.replace(`:host{${o===void 0?"":`width:${o}px;`}${n===void 0?"":`height:${n}px`}}`),r?.remove(),r=e.name?dn(e.name,{className:"icon",width:o,height:n,fill:e.fill,alt:e.alt}):void 0,r&&(r.onerror=()=>{r&&e.alt&&r.replaceWith(e.alt)},R(e).append(r))})}]});var X=class extends ut{icon="";width;height;fill=!1;variant="text";alt};c(X,{tagName:"c-icon-button",init:[h("icon"),h("width"),h("height"),h("alt"),h("fill")],augment:[e=>S(Z,{className:"icon",width:m(e,"width"),height:m(e,"height"),name:m(e,"icon"),fill:m(e,"fill"),alt:m(e,"alt")})]});var Ol=1440*60*1e3;function bn(e,t,r){if(t==="relative"){let o=new Date;return e.getFullYear()===o.getFullYear()?e.getDate()===o.getDate()&&e.getMonth()===o.getMonth()?e.toLocaleTimeString(r,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(r,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(r,{month:"2-digit",day:"2-digit",year:"2-digit"})}return t==="medium"||t==="long"||t==="short"||t==="full"?e.toLocaleString(r,{dateStyle:t,timeStyle:t}):e.toLocaleString()}function yn(e,t,r){return t?typeof r=="string"?bn(t,r,e):t.toLocaleString(e,r):""}var $r={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function pa(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var ir={content:$r,name:"default",localeName:pa(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>yn(ir.localeName,e,t)},ua={content:$r,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>yn("en-US",e,t)};function da(){let e=W(ir),t={default:ir,en:ua},r={},o=e.map(a=>a.content);async function n(a){let l=a.split("-")[0];if(!(t[a]??t[l])){let p=r[a]??r[l];p&&await p()}return t[l]||ir}async function i(a){e.next(await n(a))}return navigator?.language&&i(navigator.language),{content:o,registeredLocales:t,locale:e,setLocale:i,getLocale(a){return a?jt(()=>n(a)):e},get(a,l){return o.map(s=>s[a]??(l&&s[l])??"")},register(a){t[a.name]=a}}}var We=da();function vn(e){return Object.assign($r,e),We.get}var ar=class e extends f{name;size;open=!1;backIcon=S(X,{icon:"arrow_back",className:"icon",ariaLabel:We.get("core.close"),$:t=>$(t).tap(()=>this.open=!1)});static{c(e,{tagName:"c-appbar-contextual",init:[h("name"),x("open"),x("size")],augment:[t=>t.backIcon,...zr,d(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),t=>z(t,"open").tap(r=>{r||t.dispatchEvent(new Event("close"))})]})}};var Br=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer?.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},we=new Br;function wn(e=document){document.documentElement.lang="en";let t=[S("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),S("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),S("meta",{name:"mobile-web-app-capable",content:"yes"}),S("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${M("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function Sn(e=2e3){return u(Ae(e),or()).first()}function Cn(e){return Sn().raf(()=>e.setAttribute("ready",""))}function sr(e){return u(U(t=>{let r=wn(e.ownerDocument??document);t.signal.subscribe(()=>r.forEach(o=>o.remove()))}),fe().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),Sn().switchMap(()=>Ue(e).raf(t=>e.setAttribute("breakpoint",t))),Cn(e),tr.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Hr=class extends f{connectedCallback(){requestAnimationFrame(()=>wn(this.ownerDocument||document)),super.connectedCallback()}};c(Hr,{tagName:"c-meta",augment:[()=>Cn(document.body)]});function En(e,t,r){r==="in"&&(e.style.display="");let o=e.offsetWidth,n=ge({target:e,animation:{kf:{[t]:r==="in"?[`-${o}px`,"0"]:["0",`-${o}px`]}}});r==="out"&&(n.onfinish=()=>e.style.display="none")}var dt=class extends f{sheetstart=!1;sheetend=!1};c(dt,{tagName:"c-application",init:[x("sheetstart"),x("sheetend")],augment:[d(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${G("background")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${Ge()}
	`),sr,e=>te(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>te(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=S("slot",{name:"start"}),r=S("slot",{id:"body"}),o=S("slot",{name:"end"}),n=ye("html { overflow: hidden }");return R(e).append(t,r,o),e.sheetstart||(t.style.display="none"),e.sheetend||(o.style.display="none"),we.popupContainer=e,u(U(i=>{let a=(e.ownerDocument??document).adoptedStyleSheets;a.push(n),i.signal.subscribe(()=>{let l=a.indexOf(n);l!==-1&&a.splice(l,1)})}),z(e,"sheetstart").tap(i=>En(t,"marginLeft",i?"in":"out")),z(e,"sheetend").tap(i=>En(o,"marginRight",i?"in":"out")))}]});function Se(e,t,r){return new E(o=>{let n={id:e,controller:r,target:t};Q(t,`registable.${e}`,n),o.signal.subscribe(()=>n.unsubscribe?.())})}function lr(e,t,r,o){return new E(n=>{function i(l){let s=l.target;l.unsubscribe=()=>{let g=r.indexOf(s);g!==-1&&r.splice(g,1),o?.({type:"disconnect",target:s,elements:r}),n.next()};let p=r.indexOf(s);p!==-1&&r.splice(p,1);let k=r.findIndex(g=>g.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_PRECEDING);k===-1?r.push(s):r.splice(k,0,s),o?.({type:"connect",target:s,elements:r}),n.next()}let a=te(t,`registable.${e}`).subscribe(i);n.signal.subscribe(a.unsubscribe)})}function kn(e,t,r=new Set){return new E(o=>{function n(a){let l=a.target,s=a.controller||a.target;a.unsubscribe=()=>{r.delete(s),o.next({type:"disconnect",target:s,element:l,elements:r})},r.add(s),o.next({type:"connect",target:s,element:l,elements:r})}let i=te(t,`registable.${e}`).subscribe(n);o.signal.subscribe(i.unsubscribe)})}var jr={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(r){console.error(r)}}};function An(e){return(t,r)=>t[e]>r[e]?1:t[e]<r[e]?-1:0}function cr(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let r,o=e.getRootNode();return o instanceof ShadowRoot&&(r=o.getElementById(t),r)?r:e.ownerDocument.getElementById(t)??void 0}var fa=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,ma=/^\d{5}(?:[-\s]\d{4})?$/,ga={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},Nn={required:Sa,email:Ca,json:Aa,zipcode:Ea,nonZero:va,nonEmpty:ya},xa={pattern:wa,equalToElement:_r(Dn),greaterThan:Mn,lessThan:Fn,greaterThanElement:_r(Mn),lessThanElement:_r(Fn),min:Ta,max:Ma,equalTo:Dn,maxlength:Fa,minlength:Da},ha=vn(ga);function _r(e){return(t,r)=>{let o=typeof t=="string"?cr(r,t):t;if(!o)throw"Invalid element";return e(o)}}function se(e,t){return{key:e,valid:t,message:ha(`validation.${e}`,"validation.invalid")}}function ba(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function ya(e){return se("nonEmpty",!ba(e))}function va(e){return se("nonZero",e===""||Number(e)!==0)}function wa(e){let t=typeof e=="string"?e=new RegExp(e):e;return r=>se("pattern",typeof r=="string"&&(r===""||t.test(r)))}function Ur(e){return e!=null&&e!==""}function Sa(e,t){let r=t&&"checked"in t?!!t.checked:!0;return se("required",r&&Ur(e))}function Ca(e){return se("email",typeof e=="string"&&(e===""||fa.test(e)))}function Ea(e){return se("zipcode",typeof e=="string"&&(e===""||ma.test(e)))}function ka(e){try{return JSON.parse(e),!0}catch{return!1}}function Aa(e){return se("json",ka(e))}function Na(e){return e instanceof HTMLElement&&"value"in e}function ft(e,t,r){let o=Na(t)?m(t,"value"):t instanceof E?t:T(t);return n=>o.map(i=>se(e,!Ur(n)||!Ur(i)||r(n,i)))}function Tn(e,t){let r=/(\w+)(?:\(([^)]+?)\))?/g,o=[],n;for(;n=r.exec(e);)if(n[2]){let i=xa[n[1]];if(!i)throw`Invalid rule "${n[1]}"`;o.push(i(n[2],t))}else if(n[1]in Nn)o.push(Nn[n[1]]);else throw`Invalid rule "${n[1]}"`;return o}function Rn(e,t){let r=(typeof e=="string"?Tn(e,t):e).flatMap(o=>typeof o=="string"?Tn(o,t):o);return(o,n)=>r.map(i=>{let a=i(o,n);return a instanceof E?a:a instanceof Promise?_t(a):T(a)})}function Ta(e){return ft("min",e,(t,r)=>Number(t)>=Number(r))}function Mn(e){return ft("greaterThan",e,(t,r)=>Number(t)>Number(r))}function Ma(e){return ft("max",e,(t,r)=>Number(t)<=Number(r))}function Fn(e){return ft("lessThan",e,(t,r)=>Number(t)<Number(r))}function Dn(e){return ft("equalTo",e,(t,r)=>t==r)}function Fa(e){return t=>se("maxlength",!t||t.length<=+e)}function Da(e){return t=>se("minlength",!t||t.length>=+e)}function Ra(e){return Ln(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function In(e){return z(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||Jt(e,"change",{bubbles:!0})})}function Ln(e){return u(m(e,"value"),m(e,"checked")).map(()=>{})}var Je=class e extends f{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{c(e,{init:[x("autofocus"),x("invalid"),x("disabled"),x("touched"),h("rules"),x("name"),B("validationResult"),Bo("update")],augment:[t=>(t.defaultValue=t.value,u(Se("form",t),z(t,"invalid").tap(()=>Jt(t,"invalid")),m(t,"invalid").switchMap(r=>{if(r){if(t.setAria("invalid","true"),!t.validationMessage)return We.get("validation.invalid").tap(o=>t.setCustomValidity(o))}else t.setAria("invalid",null);return C}),U(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),m(t,"rules").switchMap(r=>{if(!r)return C;let o=Rn(r,t);return Ln(t).switchMap(()=>u(...o(t.value,t)).tap(n=>t.setValidity(n))).finalize(()=>t.resetValidity())}),m(t,"value").tap(r=>t.setFormValue(r)),m(t,"validationResult").switchMap(r=>!r||r.valid?C:r.message instanceof E?r.message:r.message===void 0?We.get("validation.invalid"):T(r.message)).tap(r=>{t.setCustomValidity(r)}))),Ra]})}get labels(){return oe(this).labels}get validity(){return oe(this)?.validity||null}get validationMessage(){return oe(this)?.validationMessage||""}reportValidity(){return oe(this)?.reportValidity()??!0}checkValidity(){return oe(this)?.checkValidity()??!0}setCustomValidity(t){let r=!!t,o=t!==this.validationMessage;this.applyValidity(r,t),this.invalid!==r?this.invalid=r:o&&Jt(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,r){r?this.setAttribute(`aria-${t}`,r):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let r in this.validMap){let o=this.validMap[r];if(!o.valid)return this.validationResult=o}this.resetInvalid()}applyValidity(t,r){oe(this)?.setValidity({customError:t},r)}formDisabledCallback(t){this.disabled=t}setFormValue(t){oe(this)?.setFormValue?.(t)}};function Ia(e,t){let r,o=t.key;if(o==="ArrowDown"&&e.goDown)r=e.goDown();else if(o==="ArrowRight"&&e.goRight)r=e.goRight();else if(o==="ArrowUp"&&e.goUp)r=e.goUp();else if(o==="ArrowLeft"&&e.goLeft)r=e.goLeft();else if(o==="Home")r=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(o==="End")r=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)r=e.other(t);else return null;return t.stopPropagation(),r&&t.preventDefault(),r}function mt(e){return y(e.host,"keydown").map(t=>Ia(e,t)).filter(t=>!!t)}function La(e){return new E(t=>{let r=e.focus;e.focus=()=>{r.call(e),t.next()},t.signal.subscribe(()=>e.focus=r)})}function Pn({host:e,observe:t,getFocusable:r,getSelected:o,getActive:n=()=>Yr(e)}){let i=[];function a(){let l=i.find(s=>!s.disabled&&!s.hidden&&!nt(s));l&&(l.tabIndex=0)}return u(y(e,"focusin").tap(()=>{let l=n(),s=!1;for(let p of i)p.tabIndex=p===l?(s=!0,0):-1;s||a()}),(t??T(!0)).tap(()=>{if(i=r(),i.find(p=>p.tabIndex===0))return;let s=o?.();s?s.tabIndex=0:a()}),e instanceof HTMLElement?La(e).tap(()=>{let l=r();(l?.find(p=>p.tabIndex===0)??l?.[0])?.focus()}):C).ignoreElements()}function Yr(e){return Te(e)?.activeElement??document.activeElement??void 0}function zn({getFocusable:e,getActive:t}){return(r=1,o,n=nt)=>{let i=t(),a=e(),l=o??(i?a.indexOf(i):-1),s;do s=a[l+=r];while(s&&n(s));return s}}function On({host:e,input:t,handleOther:r=!1,axis:o}){let n=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function i(g=1){if(e.open===!1){e.open=!0;let F=n();requestAnimationFrame(()=>{F?.focused&&p(F)})}else return a(g)}function a(g=1,F){let A=n(),P=F??(A?e.options.indexOf(A):-1),j;do j=e.options[P+=g];while(j?.hidden);return j}function l(g){let F=g.key;if(/^\w$/.test(F)){let A=n(),P=A?e.options.indexOf(A):-1;if(P===-1)return;let j=P;j+1>=e.options.length&&(P=0);let K=new RegExp(`^\\s*${F}`,"i"),J;for(;J=e.options[++P];)if(!J.hidden&&J.textContent?.match(K))return J;if(j===0)return;for(P=0;P<j&&(J=e.options[P++]);)if(!J.hidden&&J.textContent?.match(K))return J}}let s=()=>e.options.find(g=>g.focused);function p(g){for(let F of e.options)F.focused=!1;g?(g.focused=!0,t?.setAria("activedescendant",me(g)),g.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let k=g=>Q(g,"selectable.action",g);return u(mt({host:t??e,...o==="x"?{goLeft:()=>i(-1),goRight:()=>i(1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>e.open!==!1?a(1,-1):void 0,goLast:()=>e.open!==!1?a(-1,e.options.length):void 0,other:r?l:void 0}).tap(g=>{e.open===!1&&g?k(g):p(g)}),y(t??e,"focus").tap(()=>p(n())),Oo(t??e,"Enter").tap(g=>{let F=s();e.open!==!1&&F?(g.stopPropagation(),k(F)):e.open===!1&&(e.open=!0)}))}function Gr(e){return new E(t=>{u(lr("selectable",e,e.options,r=>{if(r.type==="connect"&&(r.target.view=e.optionView,r.target.selected))return e.defaultValue===void 0&&(e.defaultValue=r.target.value),t.next(r.target);let o;for(let n of e.options)n.hidden||!n.parentNode||n.selected&&(o?n.selected=!1:o=n);t.next(o)}),te(e,"selectable.action").tap(r=>{if(!e.disabled&&r&&e.options?.includes(r)){let o=e.value!==r.value;t.next(r),o&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var Re={},pr=class e extends Je{options=[];_value;_selected=Re;static{c(e,{init:[h("value"),B("selected")],augment:[t=>Gr(t).tap(r=>{(!r||r!==t.selected)&&t.setSelected(r)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===Re?this.options[0]?.value:this._value}get selected(){return this._selected===Re&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==Re&&this._selected.value===t){this._value=t;return}else for(let r of this.options)if(r.value===t){this._value=t,this.setSelected(r);return}this._selected!==Re?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let r of this.options)r.focused=r.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==Re&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=Re)}};function Vn(e,t,...r){let o=document.createElementNS("http://www.w3.org/2000/svg",e);for(let n in t){if(n==="children")continue;let i=t[n];o.setAttribute(n==="className"?"class":n,i)}return r&&o.append(...r),o}function ur(e){return Vn("svg",e,Vn("path",{d:e.d}))}function Pa({host:e,target:t,position:r,onToggle:o,whenClosed:n=C}){return i=>(t.popover??="auto",t.togglePopover(i),o?.(i),i?u(Qt(e),y(window,"resize"),y(window,"scroll",{capture:!0,passive:!0})).tap(r):n)}function $n(e){let{host:t,beforeToggle:r,target:o}=e,n=Pa({...e,whenClosed:$(t).tap(()=>{t.open=!0})});return u(y(o,"toggle").tap(i=>{let a=i.newState==="open";t.open=a}),m(t,"open").raf().switchMap(i=>(r?.(i),t.ariaExpanded=i?"true":"false",n(i))))}var gt=class extends f{invalid=!1};c(gt,{tagName:"c-field-help",init:[h("invalid")],augment:[d(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${M("body-small")}
}
	`),N,e=>(e.slot||="help",m(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var Wr=d(`
:host {
  display: block;
  position: relative;
  text-align: start;
  ${M("body-large")}
}
:host([invalid]),:host([invalid]) slot[name=label],:host([invalid]) slot[name=trailing] {
	--cxl-color-primary: var(--cxl-color-error);
	--cxl-field-invalid: var(--cxl-color-error);
	color: var(--cxl-color-error);
}
.content {
	position: relative;
	box-sizing: border-box;
	display: flex;
	column-gap: 12px;
	align-items: center;
	padding: 8px 12px 8px 12px;
}
::slotted([slot=help]) { margin-top: 4px; }
.help {
	${M("body-small")}
	padding: 0 16px;
	display: flex;
	flex-direction: column;
}
.body {
	display:flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: center;
	margin: 0 4px;
}
slot[name=label] {
	display:block;
}
#bodyslot { display: flex; column-gap: 16px; align-items: center; }
.indicator { position:absolute; }
`),za=d(`
:host(:focus-within) slot[name=label] { color: var(--cxl-color-primary); }
slot[name=label] {
	${M("body-small")}
	height: 16px;
}
:host([floating]) slot[name=label] {
	display:none;
	transition: font var(--cxl-speed), height var(--cxl-speed), top var(--cxl-speed), left var(--cxl-speed);
}
:host([floating]) slot[name=label].novalue, :host([floating]) slot[name=label].value { display:block; }
`),Oa=d(`
:host {
	border-radius: var(--cxl-shape-corner-xsmall) var(--cxl-shape-corner-xsmall) 0 0;
}
:host([floating]:not(:focus-within)) slot[name=label].novalue {
	${M("body-large")}
	height: 0;
}
:host([inputdisabled]) {
  filter: saturate(0);
  opacity: 0.6;
  pointer-events: var(--cxl-override-pointer-events, none);
}
.content {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-surface: var(--cxl-color-surface-container-highest);
	color: var(--cxl-color-on-surface);
	background-color: var(--cxl-color-surface);
	min-height: 56px;
	padding: 8px 12px 8px 12px;
}
.indicator {
	background-color: var(--cxl-field-invalid, var(--cxl-color-on-surface-variant));
	bottom: 0; height: 1px; left: 0; right: 0;
	transition: scale var(--cxl-speed);
	transform-origin: bottom;
}
:host(:focus-within) .indicator {
	scale: 1 3;
	background-color: var(--cxl-color-primary);
}

${lt(".content")}
	`);function Va(e){return u(te(e,"registable.form",!1).tap(t=>{t.id==="form"&&t.target&&(e.input=t.target)}),kn("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var $a=()=>S("div",{className:"content"},S("slot",{name:"leading"}),S("div",{className:"body"},S("slot",{name:"label"}),S("slot",{id:"bodyslot"})),S("slot",{name:"trailing"}),S("div",{className:"indicator"}));function Ba(e){function t(p){n.next(p.touched&&p.invalid),e.toggleAttribute("invalid",n.value);let k=0,g=[];for(let A of a.assignedNodes())!(A instanceof HTMLElement)||A===s||("invalid"in A&&A.invalid?n.value&&(A.invalid===!0||A.invalid===p.validationResult?.key)?(k++,A.style.display="",g.push(me(A))):A.style.display="none":g.push(me(A)));let F=!n.value||k>0;s.textContent=F?"":p.validationMessage,F?s.remove():(s.parentElement||e.append(s),g.push(me(s))),g.length?p.setAria("describedby",g.join(" ")):p.setAria("describedby",null)}function r(p){let k=e.input;if(k){if(e.toggleAttribute("inputdisabled",k.disabled),t(k),!p)return;p.type==="focus"?i.next(!0):p.type==="blur"&&i.next(!1)}}function o(){let p=e.input?.value,k=!e.input?.hasAttribute("autofilled")&&(!p||p.length===0);l.classList.toggle("novalue",k),l.classList.toggle("value",!k)}let n=W(!1),i=W(!1),a=S("slot",{name:"help"}),l=e.contentElement.children[1].children[0],s=S(gt,{ariaLive:"polite"});return R(e).append(S("div",{className:"help"},a)),u(m(e,"input").switchMap(p=>p?u(T(void 0).tap(()=>{r(),queueMicrotask(o)}),y(p,"focusable.change").tap(r).tap(o),y(p,"focus").tap(r),y(p,"invalid").tap(r),y(p,"update").tap(o),u(y(p,"blur"),y(a,"slotchange")).raf(r),y(e.contentElement,"click").tap(()=>{p&&document.activeElement!==p&&!e.matches(":focus-within")&&!i.value&&p.focus()})):C),Va(e))}var Ie=class e extends f{floating=!1;input;size;contentElement=$a();static{c(e,{init:[x("floating"),B("input"),ie("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,Ba]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},qr=class extends Ie{};c(qr,{tagName:"c-field",augment:[Wr,za,Oa]});var Ha=d(`
:host {
	box-sizing: border-box;
	display: block;
	cursor: pointer;
	height: 20px;
	position: relative;
	padding-right: 28px;
	flex-grow: 1;
	text-align: start;
	outline: 0;
	-webkit-tap-highlight-color: transparent;
}
.caret {
	position: absolute;
	right: 0;
	top: 0;
	line-height: 0;
	width: 20px;
	height: 20px;
	fill: currentColor;
}
`),Bn=d(`
${rn("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function ja(e,t){return()=>{let r=e.parentElement instanceof Ie?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${r.bottom}px`,t.style.left=`${r.x}px`,t.style.minWidth=`${r.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-r.bottom-16,280)}px`}}function Xr({host:e,target:t,input:r,position:o,beforeToggle:n,onToggle:i,handleOther:a,axis:l}){return u(On({host:e,input:r,handleOther:a,axis:l}),y(r??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),$n({host:e,target:t,position:o??ja(e,t),beforeToggle:n,onToggle:i}))}function _a(e){let{host:t}=e;return u(Ha(t)??C,ne(t)??C,ve(t),Xr(e))}var Xe=class extends f{};c(Xe,{tagName:"c-select-option",augment:[d(`
:host {
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	column-gap: 16px;
	align-items: center;
	/*background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);*/
	padding: var(--cxl-select-padding, 16px);
	position: relative;
	user-select: none;
	white-space: nowrap;
	overflow: hidden;
	-webkit-user-select: none;
	-webkit-tap-highlight-color: transparent;
}
:host([focused]) {
	background-image: var(--cxl-select-focused);
}
:host(:hover) { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
		`),N]});var Jr=class extends pr{open=!1;optionView=Xe;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let r of this.options)r!==t&&(r.slot="");t&&(t.slot="selected")}}};c(Jr,{tagName:"c-select",init:[x("open")],augment:[V("listbox"),d(`
:host([open]) ::slotted([selected]) {
	--cxl-color-surface: var(--cxl-color-primary-container);
}
:host([open]) {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
:host(:not([open])) {
	--cxl-select-padding: 0;
	--cxl-mask-focus: transparent;
	--cxl-mask-hover: transparent;
}
slot[name=selected] {
	pointer-events: none;
	--cxl-color-surface: transparent;
}
.menu {
	position: fixed;
	padding: 8px 0;
	min-width: 112px;
	width: max-content;
	border-radius: var(--cxl-shape-corner-xsmall);
	visibility:hidden;
	margin: 0;
	transition: scale var(--cxl-speed);
	/** popover applies display:none if this is not set */
	display: block;
}
.menu.open {
	${G("surface-container")}
	border: 0;
	transform-origin: top;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-2);
	visibility:visible;
}
		`),e=>{let t=S("div",{className:"menu"},S("slot")),r=S("slot",{name:"selected"}),o=t.style,n=cn(e),i=0,a=0;R(e).append(t,r,ur({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function l(){if(e.open)a=e.selected?.rendered?.offsetHeight??0;else{o.cssText="";let s=e.options.reduce((p,k)=>Math.max(p,k?.rendered?.offsetWidth??0),0);n.replaceSync(`:host{width:${s}px}`)}}return u(u(de(e),or()).raf(l),_a({host:e,target:t,handleOther:!0,beforeToggle(s){l();let p=e.selected;p&&(p.slot=s?"":"selected"),t.classList.toggle("open",s)},onToggle(s){let p=e.selected;!s&&p&&(i=p.rendered?.offsetHeight??0)},position(){let s=e.parentElement??e,p=Math.round((a-i)/2),k=e.selected?.rendered,g=s.getBoundingClientRect(),F=e.getBoundingClientRect(),A=F.top-14,P,j=k?k.offsetTop:0;j>A&&(j=A),P=t.scrollHeight;let K=window.innerHeight-F.top+8+j,J=F.top-p-j;P>K?P=K:P<F.height&&(P=F.height),o.top=J+"px",o.left=g.left+"px",o.maxHeight=P+"px",o.minWidth=g.width+"px",o.transformOrigin=`${j}px`}}))}]});function Ua(e){let t=Ne();return u(Se("field",e,r=>t.next(r)),t)}function Hn(e){let t;return Ua(e).switchMap(r=>m(e,"input").switchMap(o=>o?T(o):r?m(r,"input").switchMap(n=>n?T(t=n):C):t?T(t):C))}function xt(e,t,r){return m(e,r).tap(o=>at(t,r,o))}var Ya="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function fr({host:e,input:t,toText:r,toValue:o,update:n}){t.className="cxl-native-input",t.setAttribute("style",Ya),t.setAttribute("form","__cxl_ignore__");function i(s){e.value=o?o(t.value||""):t.value,s.stopPropagation(),e.dispatchEvent(new Event(s.type,{bubbles:!0}))}function a(){let s=e.value,p=r?r(s,t.value):s||"";t.value!==p&&e.setInputValue(p)}function l(){t.ariaLabel=e.ariaLabel;let s=e.getAttribute("aria-labelledby");s?t.setAttribute("aria-labelledby",s):t.removeAttribute("aria-labelledby")}return u(ve(e,t),_(()=>(l(),t.form?y(t.form,"reset").tap(i):C)),m(e,"value").tap(()=>{r&&t.matches(":focus")||a()}),y(t,"blur").tap(a),y(t,"input").tap(i),y(t,"change").tap(i),xt(e,t,"disabled"),xt(e,t,"name"),xt(e,t,"autocomplete"),xt(e,t,"spellcheck"),xt(e,t,"autofocus"),Gt(e,["aria-label","aria-labelledby"]).tap(l),n?n.tap(a):C,y(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),y(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var dr=class e extends Je{inputValue="";static{c(e,{init:[B("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,y(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity||null}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,r){r?this.inputEl.setAttribute(`aria-${t}`,r):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,r){oe(this).setValidity({customError:t},r,this.inputEl),this.inputEl.setCustomValidity(t?r||"Invalid Field":"")}};var Ga=[d(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),ne],Qr=[...Ga,N],ht=class e extends dr{autofilled=!1;autocomplete;static{c(e,{init:[x("autofilled"),h("autocomplete")],augment:[t=>y(t.inputEl,"animationstart").tap(r=>{(r.animationName==="cxl-onautofillstart"||r.animationName==="cxl-onautofillend")&&(t.autofilled=r.animationName==="cxl-onautofillstart",Q(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,r){this.inputEl.setSelectionRange(t,r)}getWindowSelection(){return this.shadowRoot?.getSelection?.()||getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},bt=class extends ht{value="";inputEl=S("input",{className:"input"})};c(bt,{tagName:"c-input-text",init:[h("value")],augment:[...Qr,e=>e.append(e.inputEl),e=>fr({host:e,input:e.inputEl})]});function qa(e){getComputedStyle(e).direction==="rtl"?e.scrollLeft=1e6:e.scrollLeft=e.scrollWidth}var Qe=class e extends ht{selected;value;inputEl=S("input",{className:"input"});static{c(e,{tagName:"c-input-option",init:[h("value"),B("selected")],augment:[...Qr,t=>t.append(t.inputEl),t=>fr({host:t,input:t.inputEl,toText:()=>t.selected?.textContent??"",toValue:r=>r!==""?t.selected?.value:void 0}),t=>z(t,"selected").tap(r=>{let o=t.selected?.textContent;t.value=r?.value,t.setInputValue(o??""),qa(t.inputEl)})]})}};function Wa(e){return Zr(e,"^")}function Zr(e,t=""){if(e==="")return()=>!0;let r=Ja(e,t);return o=>o.textContent?r.test(o.textContent):!1}function Ja(e,t="",r="i"){return new RegExp(t+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),r)}var mr=class e extends f{optionView=Xe;open=!1;debounce=100;options=[];matcher=Zr;static{c(e,{tagName:"c-autocomplete",init:[x("open"),er("debounce")],augment:[V("listbox"),Bn,_e,t=>{let r=S("slot",{name:"empty"}),o=S("div",{id:"menu",tabIndex:-1},S("slot"),r),n=ur({viewBox:"0 0 24 24",id:"caret",d:"M7 10l5 5 5-5z",width:20,height:20,fill:"currentColor"});n.style.cursor="pointer",r.style.display="none";function i(s){t.open=!0,l(s)}function a(s,p){s?.setAria("activedescendant",me(p)),p.rendered?.scrollIntoView({block:"nearest"})}function l(s){let p=s.inputValue??s.value,k=t.matcher==="substring"?Zr:t.matcher==="prefix"?Wa:t.matcher,g=p?k(String(p)):void 0,F=0;for(let A of t.options){let P=g?!g(A):!1;A.hidden=P,A.focused=!(P||F++>0),A.focused&&a(s,A)}r.style.display=F?"none":""}return R(t).append(o,n),u(Hn(t).switchMap(s=>(s.setAria("autocomplete","list"),s.role="combobox",s.setAria("controls",me(t)),s.setAria("haspopup",t.role),s.setAttribute("autocomplete","off"),u(m(t,"open").tap(p=>{if(p)n.tabIndex=-1,i(s);else{for(let k of t.options)k.focused=!1;n.tabIndex=0,s?.setAria("activedescendant",null)}s.setAria("expanded",String(p))}),u(qt(n),y(n,"mousedown")).tap(p=>{p.preventDefault(),p.stopPropagation(),s.focus()}).debounceTime(100).tap(()=>{t.open=!0}),m(t,"debounce").switchMap(p=>y(s,"input").debounceTime(p).tap(()=>t.open?l(s):i(s))),y(t,"change").tap(p=>{p.target===t&&s.dispatchEvent(new Event("change",{bubbles:!0}))}),Xr({host:t,target:o,input:s}),u(Gr(t),z(s,"value").map(p=>{for(let k of t.options)if(k.value===p)return k})).tap(p=>{for(let k of t.options)k.focused=k.selected=!1;p&&(p.selected=!0),s instanceof Qe?s.selected=p:s&&(s.value=p?.value),t.open=!1})))))}]})}};var gr=class extends f{};c(gr,{tagName:"c-body",augment:[d(`
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
	padding: 16px;
}
slot { display: flex; flex-direction: column; max-width: 1200px; flex-grow: 1; }

${O("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),N]});var yt=class extends qe{};c(yt,{tagName:"c-button-text",augment:[...De,d(`
:host {
	${M("label-large")}
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
		`),ae,N]});function Kr(e="block"){let t=(r=>{for(let o=12;o>0;o--)r.xl+=`:host([xl="${o}"]){display:${e};grid-column-end:span ${o};}`,r.lg+=`:host([lg="${o}"]){display:${e};grid-column-end:span ${o};}`,r.md+=`:host([md="${o}"]){display:${e};grid-column-end:span ${o};}`,r.sm+=`:host([sm="${o}"]){display:${e};grid-column-end:span ${o};}`,r.xs+=`:host([xs="${o}"]){display:${e};grid-column-end:span ${o};}`;return r})({xl:"",lg:"",md:"",sm:"",xs:""});return d(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${O("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${O("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${O("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${O("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var eo=d(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${Ge()}
${Fe.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${Fe.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),Ze=class extends f{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};c(Ze,{init:[x("sm"),x("xs"),x("md"),x("lg"),x("xl"),x("vpad"),x("pad"),x("center"),x("fill"),x("grow"),x("elevation"),Ye("color")]});var xe=class extends Ze{};c(xe,{tagName:"c-c",augment:[eo,Kr(),d(":host([center]) { text-align: center}"),N]});var Xa=d(`
:host {
	${G("surface-container")}
	${M("body-medium")}
	border-radius: var(--cxl-shape-corner-medium);
	overflow: hidden;
}
:host([variant=elevated]:not([color])) {
	--cxl-color-surface: var(--cxl-color-surface-container-low);
	z-index: 1;
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=outlined]) {
	${G("surface")}
	border: 1px solid var(--cxl-color-outline-variant);
}
${Ge()}
`),vt=class extends xe{variant};c(vt,{tagName:"c-card",init:[x("variant")],augment:[Xa]});var Qa=d(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${M("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function Za(e){return u(Se("list",e),m(e,"selected").tap(t=>e.ariaSelected=String(t)))}function ro(e){return u(Or(e),ve(e,e,-1),Za(e))}var Ke=class extends f{disabled=!1;touched=!1;selected=!1};c(Ke,{init:[x("disabled"),x("touched"),x("selected")],augment:[ro]});var to=class extends Ke{size};c(to,{tagName:"c-item",init:[ie("size",e=>`{min-height:${56+e*8}px}`)],augment:[Qa,ne,rr,V("option"),N,ae]});var wt=class extends vt{disabled=!1;touched=!1;selected=!1};c(wt,{tagName:"c-card-item",init:[x("disabled"),x("touched"),x("selected")],augment:[V("option"),...De,d(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),ro,ae]});var St=class extends f{disabled=!1;touched=!1;selected=!1;color;size=0};c(St,{tagName:"c-chip",init:[x("disabled"),x("touched"),x("selected"),Ye("color","surface-container-low"),ie("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[V("button"),Vr,...De,d(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${M("label-large")}
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
	${G("secondary-container")}
}
:host(:hover) { box-shadow: none; }
slot[name] { display: inline-block; }
		`),ae,()=>S("slot",{name:"leading"}),N,()=>S("slot",{name:"trailing"})]});function jn(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(r=>{let o=cr(e,r);return o?[o]:[]}):Array.isArray(t)?t:[t]}function Ka(e,t,r,o,n=y(e,"click").map(()=>!r())){return u(o,n).switchMap(i=>{let a=t();return a?_t(a.map(l=>({target:l,open:i}))):C})}function oo(e,t=e){function r(i,a){return[m(e,"open").switchMap(l=>(i.parentNode||we.popupContainer.append(i),l&&i instanceof f?z(i,"open").map(s=>{e.open&&s===!1&&(e.open=!1)}):C)),Go(i).tap(l=>{let s=i.getAttribute("role");(s==="menu"||s==="listbox"||s==="tree"||s==="grid"||s==="dialog")&&(a.ariaHasPopup=s),a.getRootNode()===i.getRootNode()&&a.setAttribute("aria-controls",l)})]}let o=q(m(e,"trigger"),m(e,"target")).switchMap(([i])=>{let a=jn(e),l=a?u(...a.flatMap(s=>r(s,e))).ignoreElements():C;return u(i==="hover"?q(Dr(t),a?u(...a.map(s=>Dr(s))):C).map(s=>!!s.find(p=>!!p)).debounceTime(250):i==="checked"?y(t,"change").map(s=>s.target&&"checked"in s.target?!!s.target.checked:!1):y(t,"click").map(()=>!e.open),l)}),n;return zo().switchMap(()=>Ka(t,()=>jn(e),()=>e.open,m(e,"open"),o).filter(i=>{let{open:a,target:l}=i;if(e.open!==a){if(a)n=Te(e)?.activeElement,l.trigger=e;else if(l.trigger&&l.trigger!==e)return i.open=!0,l.trigger=e,!0;return e.open=a,!1}if(!a&&l.trigger===e){let s=document.activeElement;(s===document.body||s===document.documentElement)&&n?.focus()}return!0}))}var xr=class extends f{open=!1;target;trigger};c(xr,{init:[h("target"),h("trigger"),x("open")],augment:[e=>oo(e).raf(({target:t,open:r})=>t.open=r)]});var Ct=class extends xr{};c(Ct,{tagName:"c-toggle",augment:[_e,N]});var Ce;function _n(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function es(e){return e==="infinite"?1/0:+e}function ts(e){if(fn(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let r={},o;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(l,s,p)=>(s&&(o=+s),p&&(r.composite=p),"")),Ce??=document.createElement("style").style,Ce.animation=e,r.fill=Ce.animationFillMode;let n=r.fill==="forwards"||r.fill==="both",i=t?void 0:_n(Ce.animationDuration);i!==void 0&&(r.duration=i);let a=_n(Ce.animationDelay);return a!==void 0&&(r.delay=a),Ce.animationIterationCount&&(r.iterations=es(Ce.animationIterationCount)),{animation:Ce.animationName,keep:n,stagger:o,options:r}}function rs(e){return typeof e=="string"&&(e=e.split(",").map(t=>ts(t.trim()))),e}function no(e,t,r,o){let n=o?`motion-${o}-on`:"motion-on",i=rs(r);return e.setAttribute(n,""),u(...i.map(a=>mn({target:t,...a}))).finalize(()=>e.removeAttribute(n))}var Et=class extends f{center=!1};c(Et,{tagName:"c-backdrop",init:[x("center")],augment:[d(`
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

	`),e=>y(e,"keydown").tap(t=>t.stopPropagation()),N]});var Un=d(":host(:not([open],[motion-out-on])){display:none}");function ao(e,t=()=>e,r=!1){let o=_(()=>T(t("in"))),n=_(()=>T(t("out")));return u(te(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),q(m(e,"motion-in").map(i=>i?o.switchMap(a=>no(e,a,i,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?Ae(e.duration).map(()=>e.open=!1):C):o),m(e,"motion-out").map(i=>(i?n.switchMap(a=>no(e,a,i,"out").ignoreElements()):n).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([i,a])=>z(e,"open").switchMap(l=>{if(e.popover!=="auto"){let s=l?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:l?"closed":"open",newState:s}))}return l?r?pe(a,i):i:r?pe(a,i):a})))}var et=class extends f{open=!1;duration;"motion-in";"motion-out"};c(et,{init:[h("motion-in"),h("motion-out"),er("duration"),x("open")]});var io=class extends et{};c(io,{tagName:"c-toggle-target",augment:[d(`
:host{display:contents}
`),e=>{let t=S("slot"),r=S("slot",{name:"off"});return(e.open?r:t).style.display="none",R(e).append(t,r),ao(e,o=>{t.style.display=r.style.display="none";let n=e.open?o==="in"?t:r:o==="in"?r:t;return n.style.display="",n.assignedElements()},!0)}]});var kt=class extends et{};c(kt,{tagName:"c-toggle-panel",augment:[N,Un,ao]});var os=d(`
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
${O("small","#drawer { width: 360px }")}

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
`),hr=class extends f{open=!1;position;responsive;permanent=!1};c(hr,{tagName:"c-drawer",init:[x("open"),x("position"),h("responsive"),h("permanent")],augment:[os,d(`
:host { max-width: 360px; }
#drawer.permanent {
	${G("surface")}
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
`),e=>{let t=W(!1),r=u(m(e,"position"),t).raf(),o=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",n=S(kt,{id:"drawer","motion-in":r.map(()=>e.permanent&&t.value?void 0:o()?"slideInRight":"slideInLeft"),"motion-out":r.map(()=>e.permanent&&t.value?void 0:o()?"slideOutRight":"slideOutLeft")},N),i=new Et;i.id="backdrop";let a=S("dialog",{id:"dialog"},i,n);return R(e).append(a),u(y(n,"close").tap(()=>a.close()),y(a,"close").tap(()=>e.open=!1),z(n,"open").tap(l=>e.open=l),z(e,"open").raf(l=>{l||n.scrollTo(0,0)}),y(i,"click").tap(()=>e.open=!1),y(a,"cancel").tap(l=>{l.preventDefault(),e.open=!1}),m(e,"open").tap(l=>{if(t.value&&e.permanent)return n.open=!0;l?t.value||(we.openModal({element:a,close:()=>e.open=!1}),a.getBoundingClientRect()):we.currentModal?.element===a&&we.modalClosed()}).raf(l=>{n.open=l}),m(e,"responsive").switchMap(l=>l!==void 0?Ue(document.body):T("xsmall")).switchMap(l=>{let s=H.breakpoints[e.responsive||"large"],p=H.breakpoints[l]>=s;return t.next(p),p&&n.className!=="permanent"?a.close():!p&&n.className==="permanent"&&(e.open=!1),p&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",p),n.className=p?"permanent":"drawer",z(e,"open").tap(k=>{e.hasAttribute("responsiveon")||ge({target:i,animation:k?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var br=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,r=this.end){let o=this.end.parentNode;o&&(this.start.parentNode||o.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),o.insertBefore(this.frag,r)):o.insertBefore(t,r))}empty(){let t=this.start.nextSibling;for(;t&&t!==this.end;){let r=t.nextSibling;t.remove(),t=r}}};function ns({source:e,render:t,empty:r,append:o,loading:n}){let i=[],a=document.createDocumentFragment(),l,s;function p(k){if(s?.parentNode?.removeChild(s),!k)return;let g=0;for(let A of k){let P=i[g]?.item;if(P)P.value!==A&&P.next(A);else{let j=W(A),K=t(j,g,k),J=K instanceof DocumentFragment?Array.from(K.childNodes):[K];i.push({elements:J,item:j}),a.append(K)}g++}a.childNodes.length&&o(a),l?.remove(),g===0&&r&&o(l=r());let F=i.length;for(;F-- >g;)i.pop()?.elements.forEach(A=>A.remove())}return _(()=>(s=n?.(),s&&o(s),e.raf(p)))}function Le(e){return Ho(()=>{let t=new br;return[ns({...e,append:t.insert.bind(t)}),t.end]})}var Pe=class extends Ie{};c(Pe,{tagName:"c-field-bar",augment:[Wr,d(`
:host {
	box-sizing: border-box;
	${G("surface-container-high")}
	${M("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 4px 12px; }
		`)]});var ze=class extends Ze{vflex=!1;gap;middle=!1};c(ze,{tagName:"c-flex",init:[x("vflex"),x("gap"),x("middle")],augment:[Kr("flex"),eo,d(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${Fe.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),N]});function is(e){return lr("list",e,e.items)}function Yn(e){return Pn({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:is(e)})}function Gn(e){return zn({getFocusable:()=>e.items,getActive:()=>Yr(e)})}function as(e){let t=Gn(e);function r(o){return Math.round(o.getBoundingClientRect().left)}return u(Yn(e),mt({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let o=Te(e)?.activeElement,n=o&&r(o);return t(-1,void 0,n!==void 0?i=>r(i)!==n:void 0)},goDown:()=>{let o=Te(e)?.activeElement,n=o&&r(o);return t(1,void 0,n!==void 0?i=>r(i)!==n:void 0)}}).tap(o=>o.focus()))}var At=class extends f{items=[]};c(At,{tagName:"c-grid-list",augment:[V("grid"),d(":host{display:grid;box-sizing:border-box;}"),N,as]});var yr=class extends f{pad;vertical=!1};c(yr,{tagName:"c-hr",init:[x("pad"),x("vertical")],augment:[V("separator"),d(`
:host {
	display: block;
	height: 1px;
	background-color: var(--cxl-color-outline-variant);
}
:host([vertical]) {
	height: auto;
	width: 1px;
	align-self: stretch;
	margin-top: 8px;
	margin-bottom: 8px;
}
${Fe.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function lo(e){let t=document.createElement("style");return u(U(r=>{let o=e.persistkey&&jr.get(e.persistkey);o!==void 0?e.open=o===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),r.signal.subscribe(()=>t.remove())}),be(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let r=e.open?e.themeon:e.themeoff;e.persistkey&&jr.set(e.persistkey,r),ln(nn[r]||r)}),$(e).tap(()=>e.open=!e.open))}var so=class extends f{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};c(so,{tagName:"c-toggle-theme",init:[h("persistkey"),h("usepreferred"),h("open"),h("themeon"),h("themeoff")],augment:[V("group"),lo]});var Nt=class extends X{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};c(Nt,{tagName:"c-icon-toggle-theme",init:[h("persistkey"),h("usepreferred"),h("open"),h("themeon"),h("themeoff")],augment:[lo,e=>q(m(e,"iconon"),m(e,"iconoff"),m(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var ss=()=>{let e;function t(){let r=document.adoptedStyleSheets.indexOf(e);r!==-1&&document.adoptedStyleSheets.splice(r,1)}addEventListener("message",r=>{let{theme:o}=r.data;t(),o!==void 0&&(e=new CSSStyleSheet,e.replace(o),document.adoptedStyleSheets.push(e))})},ls=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},Tt=class extends f{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};c(Tt,{tagName:"c-iframe",init:[h("src"),h("srcdoc"),h("sandbox"),h("handletheme")],augment:[d(`
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
	`),e=>{let t=b("iframe",{loading:"lazy"}),r=b("slot",{name:"loading"}),o=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(o),r.style.display="none";function n(a){o.replaceSync(":host{height:"+a+"px}"),t.style.height="100%",t.style.opacity="1",r.style.display="none"}function i(a){if(a){let l=`<script type="module">
(${ls.toString()})();
(${ss.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${a}${l}`,r.style.display=""}}return R(e).append(t,r),u(q(m(e,"srcdoc"),m(e,"src")).raf(async([a,l])=>{i(l?`<base href="${l}" />`+await fetch(l).then(s=>s.text()):a)}),y(window,"message").tap(a=>{let{height:l}=a.data;a.source===t.contentWindow&&l!==void 0&&n(l)}),m(e,"handletheme").switchMap(a=>a?y(t,"load").switchMap(()=>st.raf(l=>{let s=l?.css??"";t.contentWindow?.postMessage({theme:s},"*")})):C),m(e,"sandbox").tap(a=>a===void 0?t.removeAttribute("sandbox"):t.sandbox.value=a))}]});var vr=class extends f{};c(vr,{tagName:"c-nav-headline",augment:[d(`
:host{
	color:var(--cxl-color-on-surface-variant);
	font:var(--cxl-font-title-small);
	letter-spacing:var(--cxl-letter-spacing-title-small);
	min-height:48px;
	display:flex;
	align-items: center;
	padding: 0 16px;
}
`),N]});var cs=[d(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${M("label-large")}
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
${lt("c-ripple")}
	`),ne,xn,N],Oe=class extends Ke{size};c(Oe,{tagName:"c-nav-item",init:[ie("size",e=>`{min-height:${56+e*8}px}`)],augment:[V("option"),...cs]});var Mt=class extends X{open=!1;target;icon="menu"};c(Mt,{tagName:"c-navbar-toggle",init:[h("target"),B("open")],augment:[e=>oo(e).tap(({target:t,open:r})=>t.open=r)]});function qn(e){return u(m(e,"selected").pipe(Uo(e,"selected")),Se("selectable",e),$(e).tap(()=>Q(e,"selectable.action",e)))}var Ft=class extends f{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};c(Ft,{tagName:"c-option",init:[h("value"),B("view"),x("selected"),x("hidden"),x("focused")],augment:[V("option"),d(":host{display:contents} :host([hidden]){display:none;}"),In,qn,e=>{let t;return u(m(e,"view").switchMap(r=>r?(t?.remove(),e.rendered=t=new r,t.appendChild(S("slot")),R(e).append(t),u(m(e,"selected").tap(o=>t?.toggleAttribute("selected",o)),m(e,"focused").tap(o=>t?.toggleAttribute("focused",o)))):(e.rendered=t=void 0,C)))}]});var wr=class extends f{};c(wr,{tagName:"c-page",augment:[sr,d(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${G("background")}
}`),N]});var Dt=class extends f{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};c(Dt,{tagName:"c-r",init:[x("xl"),x("lg"),x("md"),x("sm"),x("xs")],augment:[d(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${O("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${O("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${O("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${O("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),N]});var ps=/([^&=]+)=?([^&]*)/g,us=/:([\w_$@]+)/g,ds=/\/\((.*?)\)/g,fs=/(\(\?)?:\w+/g,ms=/\*\w+/g,gs=/[-{}[\]+?.,\\^$|#\s]/g,xs=/([^#]*)(?:#(.+))?/,xo="@@cxlRoute",re={location:window.location,history:window.history};function hs(e){let t=[];return[new RegExp("^/?"+e.replace(gs,"\\$&").replace(ds,"\\/?(?:$1)?").replace(fs,function(o,n){return t.push(o.substr(1)),n?o:"([^/?]*)"}).replace(ms,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function Wn(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function co(e,t){return t?e.replace(us,(r,o)=>t[o]||""):e}function bs(e){let t={},r;for(;r=ps.exec(e);)t[r[1]]=decodeURIComponent(r[2]);return t}var po=class{path;regex;parameters;constructor(t){this.path=t=Wn(t),[this.regex,this.parameters]=hs(t)}_extractQuery(t){let r=t.indexOf("?");return r===-1?{}:bs(t.slice(r+1))}getArguments(t){let r=this.regex.exec(t),o=r&&r.slice(1);if(!o)return;let n=this._extractQuery(t);return o.forEach((i,a)=>{let l=a===o.length-1?i||"":i?decodeURIComponent(i):"";n[this.parameters[a]]=l}),n}test(t){return this.regex.test(t)}toString(){return this.path}},uo=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new po(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let r=this.definition.render();r[xo]=this;for(let o in t)t[o]!==void 0&&(r[o]=t[o]);return r}},fo=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(r=>r.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(r=>r.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function ys(e){return e[xo]}function tt(e){let t=xs.exec(e);return{path:Wn(t?.[1]||""),hash:t?.[2]||""}}var vs={getHref(e){return e=typeof e=="string"?tt(e):e,`${re.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=re.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let r=this.getHref(e);r!==`${location.pathname}${location.search}${location.hash}`&&re.history.pushState({url:e},"",r)}},deserialize(){return{path:re.location.search.slice(1),hash:re.location.hash.slice(1)}}},ws={getHref(e){return e=typeof e=="string"?tt(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=re.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let r=this.getHref(e);r!==`${location.pathname}${location.search}${location.hash}`&&re.history.pushState({url:e},"",r||"/")}},deserialize(){return{path:re.location.pathname,hash:re.location.hash.slice(1)}}},Jn={getHref(e){return e=typeof e=="string"?tt(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Jn.getHref(e);re.location.hash!==t&&(re.location.hash=t)},deserialize(){return tt(re.location.hash.slice(1))}},Xn={hash:Jn,path:ws,query:vs},mo=class{callbackFn;state;routes=new fo;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let r=new uo(t);return this.routes.register(r),r}go(t){this.lastGo=t;let r=typeof t=="string"?tt(t):t,o=r.path,n=this.state?.url;if(o!==n?.path){let i=this.routes.findRoute(o);if(!i)throw new Error(`Path: "${o}" not found`);let a=i.path?.getArguments(o);if(i.redirectTo)return this.go(co(i.redirectTo,a));let l=this.execute(i,a);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${o}" could not be created`);this.updateState({url:r,arguments:a,route:i,current:l,root:this.root})}else this.state&&r.hash!=n?.hash&&this.updateState({...this.state,url:r})}getPath(t,r){let o=this.routes.get(t),n=o&&o.path;return n&&co(n.toString(),r)}isActiveUrl(t){let r=tt(t);if(!this.state?.url)return!1;let o=this.state.url;return!!Object.values(this.instances).find(n=>{let i=n[xo],a=this.state?.arguments;if(i?.path?.test(r.path)&&(!r.hash||r.hash===o.hash)){if(a){let l=i.path.getArguments(r.path);for(let s in l)if(a[s]!=l[s])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,r){let o=this.instances[t],n;if(o)for(n in r){let i=r[n];i!==void 0&&(o[n]=i)}return o}executeRoute(t,r,o){let n=t.parent,i=n&&this.routes.get(n),a=t.id,l=i&&this.executeRoute(i,r,o),s=this.findRoute(a,r)||t.create(r);return l?s&&s.parentNode!==l&&l.appendChild(s):this.root=s,o[a]=s,s}discardOldRoutes(t){let r=this.instances;for(let o in r){let n=r[o];t[o]!==n&&(n.parentNode?.removeChild(n),delete r[o])}}execute(t,r){let o={},n=this.executeRoute(t,r||{},o);return this.discardOldRoutes(o),this.instances=o,n}},Rt=new Ve,Qn=new Ve,le=new mo(()=>Rt.next());function Ss(e,t=Xn.query){return u(U(()=>Qn.next(t)),e.tap(()=>le.go(t.deserialize())),Rt.tap(()=>t.serialize(le.getState().url))).catchError(r=>{if(r?.name==="SecurityError")return C;throw r})}function Cs(){return pe(T(location.hash.slice(1)),y(window,"hashchange").map(()=>location.hash.slice(1)))}var Sr;function Es(){if(!Sr){Sr=new rt(history.state);let e=history.pushState;history.pushState=function(...t){let r=e.apply(this,t);return history.state&&(history.state.lastAction="push"),Sr.next(history.state),r}}return u(y(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),Sr)}function ks(){let e;return u(Cs(),Es()).map(()=>window.location).filter(t=>{let r=t.href!==e;return e=t.href,r})}var Tf=Rt.raf().map(()=>{let e=[],t=le.getState(),r=t.current;do r.routeTitle&&e.unshift({title:r.routeTitle,first:r===t.current,path:As(r)});while(r=r.parentNode);return e});function As(e){let t=ys(e);return t&&co(t.path?.toString()||"",le.state?.arguments||{})}function Zn(e,t,r=t){return u(q(Qn,be(e)).tap(([o])=>{e.href!==void 0&&(t.href=e.external?e.href:o.getHref(e.href)),t.target=e.target||""}),$(t).tap(o=>{e.target||o.preventDefault()}),$(r).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):le.go(e.href))}))}function Ns(e,t){let r=document.createElement("div");return r.style.display="contents",r.routeTitle=t,r.appendChild(e.content.cloneNode(!0)),r}var go=class extends f{strategy="query";get state(){return le.state}go(t){return le.go(t)}};c(go,{tagName:"c-router",init:[h("strategy")],augment:[e=>{function t(r){let o=r.dataset;if(o.registered)return;o.registered="true";let n=o.title||void 0;le.route({path:o.path,id:o.id||void 0,parent:o.parent||void 0,isDefault:r.hasAttribute("data-default"),redirectTo:o.redirectto,render:Ns.bind(null,r,n)})}return fe().switchMap(()=>{for(let r of Array.from(e.children))r instanceof HTMLTemplateElement&&t(r);return u(Yt(e).tap(r=>{r.type==="added"&&r.value instanceof HTMLTemplateElement&&t(r.value)}),m(e,"strategy").switchMap(r=>{let o=Xn[r];return Ss(ks(),o).catchError((n,i)=>(console.error(n),i))}))})}]});function bo(e,t=e){return u(Ts(e,t).ignoreElements(),Rt.map(()=>e.href!==void 0&&le.isActiveUrl(e.href)))}function Ts(e,t=e){let r=S("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return r.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,R(e).append(r),u(Zn(e,r),y(r,"click").tap(o=>{o.stopPropagation(),it(o)||e.dispatchEvent(new PointerEvent(o.type,o)),Q(e,"toggle.close",void 0)}),$(t).tap(o=>{it(o)&&r.click()}))}var ho=class extends f{href};c(ho,{tagName:"c-router-selectable",init:[h("href")],augment:[_e,()=>S("slot"),e=>_(()=>{let t=e.parentElement;return bo(e,t).raf(r=>{t.selected=r})})]});var It=class extends Oe{href;external=!1;target};c(It,{tagName:"c-router-item",init:[h("href"),h("external"),h("target")],augment:[e=>bo(e).tap(t=>{e.selected=t})]});var ce=class extends f{font};c(ce,{tagName:"c-t",init:[x("font")],augment:[d(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${en.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${M("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${M("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${M("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${M("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${M("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${M("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),N,e=>m(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var Lt=class extends ze{};c(Lt,{tagName:"c-toolbar",augment:[d(`
:host {
	grid-column-end: span 12;
	column-gap: 24px;
	row-gap: 8px;
	align-items: center;
	min-height: 48px;
	flex-wrap: wrap;
	flex-shrink: 0;
}
${O("small",":host{column-gap:24px}")}
		`)]});var Pt=class extends f{};c(Pt,{tagName:"doc-search",augment:[d(`
:host { display: contents; }
c-appbar-contextual {
	position: absolute;
	inset: 0;
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	z-index: 1;
}
		`),e=>{let t=W([]),r=b(mr,{},Le({source:t,render:l=>b(Ft,{value:l.value.href},l.value.name),empty:()=>b(xe,{slot:"empty",pad:16},"No Results Found")}));r.style.maxHeight="50%";let o=b(ar),n=b(Ct,{target:o},b(X,{icon:"search"})),i=b(Pe,{size:-2},b(Z,{name:"search"}),b(Qe,{$:l=>m(l,"selected").tap(s=>{!CONFIG.spa&&s?.value&&(location.href=s.value)})}),r);function a(){t.next(CONFIG.symbols)}return e.shadowRoot?.append(o,n),u(fe().tap(a),Ue(e.parentElement??e).tap(l=>{l==="xsmall"?(o.style.display="",n.style.display="",o.append(i)):(o.open=!1,o.style.display="none",n.style.display="none",e.shadowRoot?.append(i))}))}]});var yo=class extends ct{sticky=!0};c(yo,{tagName:"doc-appbar",augment:[e=>{e.append(b(Lt,{id:"appbar-toolbar"},b(Mt,{target:"navbar"}),b(ze,{grow:!0},CONFIG.packageName),b(Pt),b(Nt,{persistkey:"3doc.theme"})))}]});var vo=class extends f{};c(vo,{tagName:"doc-card",augment:[d(`
:host{
	margin-top: 16px;
	display:block;
	elevation:1;
	scroll-margin-top: 80px;
}
:host(:target) {
	outline: 2px dashed var(--cxl-color-primary);
}
${O("medium",":host{padding:16px}")}
		`),()=>b("slot")]});var wo=class extends f{formatter=t=>'<link rel="stylesheet" href="hljs.css" /><code style="white-space:pre;min-height:100%;font:var(--cxl-font-code);tab-size:2;">'+hljs.highlight(t,{language:"html"}).value+"</code>"};c(wo,{tagName:"doc-hl",augment:[d(`
:host { display: block; }
.hljs { white-space: pre-wrap; font: var(--cxl-font-code); padding:16px; }
	`),e=>{let t=b("div",{className:"hljs"});return t.style.tabSize="4",R(e).append(t),fe().switchMap(()=>Xt(e).raf(()=>{let r=e.childNodes[0]?.textContent?.trim()||"";r&&e.formatter&&(r=e.formatter(r)),t.innerHTML=r}))}]});var So=class extends f{};c(So,{tagName:"doc-grd",augment:[d(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${O("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${O("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${O("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),N]});var zt=class extends f{summary;selected};c(zt,{tagName:"doc-nav-list",init:[B("summary"),B("selected")],augment:[e=>Le({source:m(e,"summary").map(t=>t?.index),render:t=>b(Oe,{$:r=>$(r).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?b(St,{size:-2},"beta"):void 0)})(e)]});var Ot=class extends f{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;formatter;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};c(Ot,{tagName:"doc-demo-bare",init:[h("view"),h("libraries"),h("header")],augment:[d(`
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
	`),e=>{let t=m(e,"view"),r=W("container"),o=b(Tt,{className:r}),n=b(He,{$:g=>de(g).tap(()=>{e.formatter?g.innerHTML=e.formatter(s):g.innerText=s}),className:t.map(g=>g==="source"?"source visible hljs":"source")}),i=b(yt,{$:g=>$(g).tap(()=>e.view="source"),className:m(e,"view").map(g=>g==="source"?"hide":""),title:"See source"},b(Z,{name:"code"}),"Code"),a=b(X,{$:g=>$(g).tap(()=>e.view="mobile"),height:20,className:m(e,"view").map(g=>g==="source"?"":"hide"),icon:"close",title:"Close source"}),l=b("div",{id:"toolbar"},b("slot",{name:"toolbar"}),b(X,{$:g=>$(g).tap(async()=>{await navigator.clipboard.writeText(s),g.icon="done",setTimeout(()=>g.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(g=>g==="source"?"icon":"icon hide")}),i,a),s;function p(g){let F=g==="desktop";r.next(F?"container":"container cmobile")}function k(){let g=e.childNodes[0]?.textContent?.trim()||"";if(!g)return;let F=e.libraries?e.libraries.split(",").map(A=>`<script type="module" src="${e.getLibraryUrl(A)}"><\/script>`).join(""):"";o.srcdoc=`${e.header}${F}${g}`,s=g}return R(e).append(l,b(He,{className:t.map(g=>g==="source"?"parent":`parent visible ${g}`)},o),n),u(m(e,"view").tap(p),de(e).switchMap(()=>Xt(e).raf(k)))}]});var Vt=class extends Ot{header=this.getHeader();hljsCss="hljs.css";formatter=t=>`<link rel="stylesheet" href="${this.hljsCss}" />`+hljs.highlight(t,{language:"html"}).value;getHeader(){let t="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";return typeof CONFIG<"u"?t+`${CONFIG.demoStyles?`<style>${CONFIG.demoStyles}</style>`:""}${CONFIG.demoScripts?.map(r=>`<script type="module" src="${r}"><\/script>`).join("")??""}`:t}};c(Vt,{tagName:"doc-demo"});function ei(e){let t=e.index;function r(l){if(!(!l||typeof l=="string")&&typeof l=="number")return t.find(s=>s.id===l)}function o(l){if(!(!l||typeof l=="string")){if(typeof l=="number"){let s=t.find(p=>p.id===l);return s&&(s.kind===4||s.kind===8)?s:s?o(s.resolvedType??s.type):void 0}return l.kind===6?r(l.type):l.resolvedType&&typeof l.resolvedType!="string"?l.resolvedType:l}}function n(l,s){if(l.children){for(let p of l.children)!p.name||p.flags&&p.flags&128||(s[p.name]??=p);return s}}function i(l,s={}){n(l,s);let p=o(l.type);if(p?.children)for(let k of p.children){let g=o(k);if(!g||g.kind!==35||g.name==="Component")break;i(g,s)}return s}function a(l){return l.kind===17||l.kind===16||l.kind===11||l.kind===13}return{getNodeProperties:i,getTypeSummary:o,isFunction:a,getRef:r,json:e}}var Fs={31:"Constants",1:"Variables",4:"Interfaces",8:"Classes",10:"Properties",11:"Methods",12:"Getters",13:"Setters",14:"Constructor",16:"Functions",22:"Enums",35:"Components",36:"Attributes",2:"Type Alias",38:"Call Signature",39:"Construct Signature",44:"Events",24:"Index Signature",25:"Exports",37:"Namespaces"};function ti(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function Ds(e){return e.name?`docs/ui-${e.name}`:void 0}function Rs(e){let t=Ds(e),r=e.name??"?";return t?b("a",{href:t},r):r}function ri({summary:e,summaryJson:t,link:r=Rs,uiCdn:o,importmap:n,codeHighlight:i}){let{getTypeSummary:a,getRef:l,isFunction:s}=ei(t),p=t.index;function k(v){if(v)return typeof v=="string"?v:a(v)??(typeof v=="number"?void 0:v.name)}function g(v){return v?"&lt;"+v.map(w=>A(w)+(w.kind!==6&&w.type?` extends ${A(w.type)}`:"")).join(", ")+"&gt;":""}function F(v){return["{ ",...v.children?.map(Bt).flatMap(Cr("; "))??[]," }"]}function A(v){let w=k(v);if(!w||typeof w=="string")return[w||"?"];switch(w.kind){case 5:return w.children?.map(A).flatMap(Cr(" | "))??[];case 23:case 32:return[w.name??"?"];case 34:return F(w)??["?"];case 15:return[...A(w.type),"[]"];case 4:case 8:case 35:{let D=w.typeP?g(w.typeP):void 0;return[r(w),D]}case 17:return Bt(w);case 33:{let D=l(v);return[D?r(D):w.name??"?"]}case 21:return[...A(w.children?.[0]),"[",...A(w.children?.[1]),"]"];default:console.log(w)}return[]}function P(v){let w=v.flags??0;return[`${`${w&4?"public ":w&8?"private":w&16?"protected ":""}${w&262144?"...":""}${v.name}${w&524288?"?":""}`}: `,...A(v.type)]}function j(v){return["(",...v?.map(P).flatMap(Cr(", "))??[],")"]}function K(v){let w=v.flags??0,D=v.kind===12?"get ":v.kind===13?"set ":void 0;return[w&32?"static ":"",w&64?"readonly ":"",w&128?"abstract ":"",D]}function J(v){return["[",...v.parameters?.flatMap(Bt)??[]??[],"]: ",...v.type?A(v.type)??[]:["?"]]}function Cr(v){return(w,D)=>D!==0?[...v,...w]:w}function Bt(v){if(v.kind===24)return J(v);if(v.kind===45&&v.children?.[0])return["...",...A(v.children[0])];let w=v.flags&&v.flags&524288,D=s(v)?j(v.parameters):[],I=v.kind===17;return[...K(v),v.name,w?"?":"",...D,I?" => ":": ",...A(v.resolvedType??v.type)]}function oi(v){return[b("h3",{},b(ce,{font:"title-large"},...Bt(v))),...No(v)]}function Ao(v,w){if(!v.children)return[];let D={};for(let I of v.children)I.kind!==14&&I.kind!==0&&(I.flags||0)&4&&!w?.(I)&&(D[I.kind]??={name:Fs[I.kind],nodes:[]}).nodes.push(I);return Object.values(D).sort(An("name")).flatMap(I=>[b("h2",{},I.name),...I.nodes.flatMap(oi)])}function ni(v){let w;v=v.replace(/<caption>(.+?)<\/caption>/,(ee,Er)=>(w=Er,""));let D=`<style>body{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:0 24px 24px 24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,I=(n??"")+`<script type="module" src="${o}"><\/script>`,L=b(Vt,{header:D+I,formatter:i},v);return[w?b(ce,{font:"title-medium"},w):void 0,L]}function ii(v){return p.find(w=>w.name===v)}function ai(v){let w=v.flatMap(D=>{let I=D.value,L=ti(I);if(typeof I=="string"){let ee=ii(I);L=ee?r(ee):I}return[L,", "]});return w.pop(),b("p",{},"Related: ",w)}function si({src:v}){let w=b("div");return w.textContent=v,w}function No(v){let w=v.docs;if(!w||!w.content)return[];let D=[],I=w.content.flatMap(L=>{let ee=ti(L.value);return L.tag==="icon"||L.tag==="title"?[]:L.tag==="example"||L.tag==="demo"||L.tag==="demoonly"?ni(ee):L.tag==="see"?(D.push(L),[]):L.tag==="return"?[b(ce,{font:"headline-small"},"Returns"),b("p",void 0,ee)]:L.tag==="param"?[b("p",void 0,ee)]:[L.tag?b("p",void 0,`${L.tag}: `,ee):si({src:ee})]});return D.length&&I.push(ai(D)),I}function li(v){let w=[],D=a(v);if(!(!D||D.kind!==33))return D.children?.forEach(I=>{if(typeof I!="object")return;let L=a(I);L&&L.name!=="Component"&&w.push(r(L))}),b(ce,{font:"headline-small"}," ",...w.length?["extends ",w]:[])}function To(v){let w=a(v.type),D=[];if(!w?.children)return[];for(let I of w.children){let L=a(I);if(!L||L.kind!==35||L.name==="Component")break;let ee=Ao(L,Er=>!!((Er.flags??0)&128));ee.length&&D.push(b("br"),b(ce,{font:"h6"},"Inherited from ",r(L)),...ee),D.push(...To(L))}return D}let Mo=e.kind===35&&e.docs?.tagName;return b("div",{},b("h1",{},e.name," ",e.type&&li(e.type)," ",Mo?b(ce,{font:"title-medium"},`<${Mo}>`):""),...No(e),...Ao(e),...To(e))}var $t=class extends f{name;summary;uicdn;importmap=""};c($t,{tagName:"doc-page",init:[B("name"),B("summary"),B("uicdn")],augment:[e=>be(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,r=e.summary.index.find(o=>o.name===t);r&&e.append(ri({summary:r,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});var Co=class extends dt{summary;sheetstart=!0};c(Co,{tagName:"doc-root",augment:[e=>{let t=Ne();fetch("summary.json").then(o=>o.json()).then(o=>t.next(o));let r=b(zt,{slot:"start",summary:t});e.append(r,b($t,{summary:t,name:m(r,"selected")}))}]});var Eo=class extends It{};c(Eo,{tagName:"doc-item"});var ko=class extends f{};c(ko,{tagName:"doc-search-page",augment:[d(`
:host { display: block; margin: 64px 0 }
#searchbar { margin: 0 auto 32px auto; max-width: 600px; min-width: min(480px, 100%); }
#grid { grid-template-columns: 1fr; row-gap: 8px; }
c-card-item { display: flex; gap: 16px; align-items:center; }
.title { ${M("body-medium")}}

${O("small",`
	#grid { grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 8px; }
`)}
${O("medium",`
	#grid { grid-template-columns: 1fr 1fr 1fr; gap: 16px; padding: 0 8px; }
`)}
		`),()=>{let t=b(At,{id:"grid"},Le({source:T(["components"]),render:o=>b(Dt,void 0,b(xe,{className:"title",xs:1,sm:2,md:3},o.value.toUpperCase()),Le({source:T(CONFIG.symbols).map(n=>n.filter(i=>i.kind===35&&i.tagName)),render:n=>b(wt,{$:i=>$(i).tap(()=>{!CONFIG.spa&&n.value?.href&&(location.href=n.value.href)}),pad:16},b(Z,{name:n.value.icon})," ",n.map(i=>i.name))}))})),r=o=>m(o,"value").raf(n=>{n=n.toLowerCase();for(let i of t.children)for(let a of i.children)a.style.display=!n||a.textContent?.toLowerCase().includes(n)?"":"none"});return b("div",void 0,b(Pe,{id:"searchbar"},b(Z,{name:"search"}),b(bt,{$:r})),t)}]});export{wo as BlogCode,gr as Body,Co as ComponentList,yo as DocAppbar,vo as DocCard,So as DocGrid,Eo as DocItem,hr as Drawer,yr as Hr,Z as Icon,vr as NavHeadline,zt as NavList,$t as Page,wr as UiPage};
