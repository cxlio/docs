var Be={},Fn=Symbol("terminator");function ia(e,t){let o=!1,r={error:n,unsubscribe:i,get closed(){return o},signal:new Ce,next(a){if(!o)try{e.next?.(a)}catch(c){n(c)}},complete(){if(!o)try{e.complete?.()}finally{i()}}};e.signal?.subscribe(i);function n(a){if(o)throw a;if(!e.error)throw i(),a;try{e.error(a)}finally{i()}}function i(){o||(o=!0,r.signal.next())}try{if(t?.(r))throw new Error("Unsubscribe function result is deprectaed")}catch(a){n(a)}return r}function Ll(...e){return t=>e.reduce((o,r)=>r(o),t)}var S=class{__subscribe;constructor(t){this.__subscribe=t}then(t,o){return sa(this).then(t,o)}pipe(...t){return t.reduce((o,r)=>r(o),this)}subscribe(t){return ia(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},te=class extends S{closed=!1;signal=new Ce;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let o of Array.from(this.observers))o.closed||o.next(t)}error(t){if(!this.closed){this.closed=!0;let o=!1,r;for(let n of Array.from(this.observers))try{n.error(t)}catch(i){o=!0,r=i}if(o)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},Ce=class extends S{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},Zt=class extends te{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},Ct=class extends te{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let o=super.onSubscribe(t);return this.closed||t.next(this.currentValue),o}},Qt=class extends te{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(o=>t.next(o)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},Ge=class extends te{$value=Be;get hasValue(){return this.$value!==Be}get value(){if(this.$value===Be)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Be&&t.next(this.$value),super.onSubscribe(t)}},Lo=class extends Error{message="No elements in sequence"};function de(...e){return new S(t=>{let o=0,r;function n(){let i=e[o++];i&&!t.closed?(r?.next(),i.subscribe({next:t.next,error:t.error,complete:n,signal:r=new Ce})):t.complete()}t.signal.subscribe(()=>r?.next()),n()})}function Y(e){return new S(t=>{e().subscribe(t)})}function zn(e){return new S(t=>{for(let o of e)t.closed||t.next(o);t.complete()})}function Ln(e){return new S(t=>{e.then(o=>{t.closed||t.next(o),t.complete()}).catch(o=>t.error(o))})}function Jt(e){return Y(()=>Ln(e()))}function aa(e){return new S(t=>{for(let o of e)t.closed||t.next(o);t.complete()})}function Ze(e){return e instanceof S?e:Array.isArray(e)?zn(e):e instanceof Promise?Ln(e):aa(e)}function A(...e){return zn(e)}function In(e){return new Promise((t,o)=>{let r=Be;e.subscribe({next:n=>r=n,error:n=>o(n),complete:()=>t(r)})})}function sa(e){return In(e).then(t=>t===Be?void 0:t)}async function Il(e){return In(e.first())}function Qe(e,t){return me(o=>({next:e(o),unsubscribe:t}))}function me(e){return t=>new S(o=>{let r=e(o,t);o.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=o.error),r.complete||(r.complete=o.complete),r.signal=o.signal,t.subscribe(r)})}function Io(e){return Qe(t=>o=>t.next(e(o)))}function la(e,t){return me(o=>{let r=t,n=0;return{next(i){r=e(r,i,n++)},complete(){o.next(r),o.complete()}}})}function Pl(e,t){let o,r=function(){o&&clearTimeout(o),o=setTimeout(()=>{e.apply(this,arguments)},t)};return r.cancel=()=>clearTimeout(o),r}function ca(e){return me(t=>{let o=!0,r;return{next(n){o&&(o=!1,t.next(n),r=setTimeout(()=>o=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function Vl(e){if(e<0)throw new Error("Invalid period");return new S(t=>{let o=setInterval(t.next,e);t.signal.subscribe(()=>clearInterval(o))})}function He(e){return new S(t=>{let o=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(o))})}function pa(e,t=He){return Pn(o=>t(e).map(()=>o))}function Pn(e){return t=>B(o=>{let r=!1,n=!1,i,a=()=>{i?.next(),r=!1,n&&o.complete()},c=new Ce;o.signal.subscribe(()=>{a(),c.next()}),t.subscribe({next(l){a(),i=new Ce,r=!0,e(l).subscribe({next:o.next,error:o.error,complete:a,signal:i})},error:o.error,complete(){n=!0,r||o.complete()},signal:c})})}function fa(e){return t=>B(o=>{let r=o.signal,n=0,i=0,a=!1;t.subscribe({next:c=>{n++,e(c).subscribe({next:o.next,error:o.error,complete:()=>{i++,a&&i===n&&o.complete()},signal:r})},error:o.error,complete(){a=!0,i===n&&o.complete()},signal:r})})}function ua(e){return me(t=>{let o=!0;return{next(r){o&&(o=!1,e(r).subscribe({next:t.next,error:t.error,complete:()=>o=!0,signal:t.signal}))}}})}function eo(e){return Qe(t=>o=>{e(o)&&t.next(o)})}function da(e){return Qe(t=>o=>{e-- >0&&!t.closed&&t.next(o),(e<=0||t.closed)&&t.complete()})}function ma(e){return Qe(t=>o=>{!t.closed&&e(o)?t.next(o):t.complete()})}function xa(){let e=!1;return me(t=>({next(o){e||(e=!0,t.next(o),t.complete())},complete(){t.closed||t.error(new Lo)}}))}function Je(e){return Qe(t=>o=>{e(o),t.next(o)})}function ga(e){return me((t,o)=>{let r,n={next:t.next,error(i){try{if(t.closed)return;let a=e(i,o);a&&(r?.next(),r=new Ce,a.subscribe({...n,signal:r}))}catch(a){t.error(a)}},unsubscribe:()=>r?.next()};return n})}function ha(){return Qe(e=>{let t=Be;return o=>{o!==t&&(t=o,e.next(o))}})}function ba(){return e=>{let t=new Qt(1),o=!1;return B(r=>{t.subscribe(r),o||(o=!0,e.subscribe(t))})}}function Bl(e){return t=>{let o=new Qt(e),r=0;return B(n=>{r++,o.subscribe(n),r===1&&t.subscribe(o),n.signal.subscribe(()=>{--r===0&&o.signal.next()})})}}function ya(){return e=>{let t,o=0;function r(){--o===0&&t?.signal.next()}return B(n=>{n.signal.subscribe(r),o++===0?(t=At(),t.subscribe(n),e.subscribe(t)):t.subscribe(n)})}}function va(){return e=>{let t=new te,o,r,n=!1,i=!1;return B(a=>{i?(a.next(r),a.complete()):t.subscribe(a),o??=e.subscribe({next:c=>{n=!0,r=c},error:a.error,complete(){i=!0,n&&t.next(r),t.complete()},signal:a.signal})})}}function f(...e){return e.length===1?e[0]:new S(t=>{let o=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){o--===1&&t.complete()},signal:t.signal})})}function Hl(...e){return e.length===0?v:new S(t=>{let o=new Array(e.length);function r(){let n=!0;for(;n;){for(let i of o){if(i?.[0]===Fn)return t.complete();(!i||i.length===0)&&(n=!1)}n&&t.next(o.map(i=>i.shift()))}}e.forEach((n,i)=>{let a=o[i]=[];n.subscribe({next(c){a.push(c),r()},error:t.error,complete(){a.push(Fn),r()},signal:t.signal})})})}function I(...e){return e.length===0?v:new S(t=>{let o=e.length,r=o,n=0,i=!1,a=new Array(o),c=new Array(o);e.forEach((l,x)=>l.subscribe({next(k){c[x]=k,a[x]||(a[x]=!0,++n>=r&&(i=!0)),i&&t.next(c.slice(0))},error:t.error,complete(){--o<=0&&t.complete()},signal:t.signal}))})}function wa(e){return me(t=>({next:t.next,unsubscribe:e}))}function ka(){return eo(()=>!1)}function Ol(e){return new S(t=>t.error(e))}var v=new S(e=>e.complete());function ee(e){return new Ct(e)}function B(e){return new S(e)}function Yl(){return new te}function At(){return new Ge}var Rn={catchError:ga,debounceTime:pa,distinctUntilChanged:ha,exhaustMap:ua,filter:eo,finalize:wa,first:xa,ignoreElements:ka,map:Io,mergeMap:fa,publishLast:va,reduce:la,share:ya,shareLatest:ba,switchMap:Pn,take:da,takeWhile:ma,tap:Je,throttleTime:ca};for(let e in Rn)S.prototype[e]=function(...t){return this.pipe(Rn[e](...t))};function Ul(e){let t;for(;t=e.childNodes[0];)e.removeChild(t)}function h(e,t,o){return new S(r=>{let n=r.next.bind(r);e.addEventListener(t,n,o),r.signal.subscribe(()=>e.removeEventListener(t,n,o))})}function to(e){return Po(e,{childList:!0})}function oo(e,t){return Po(e,{attributes:!0,attributeFilter:t})}function Po(e,t={attributes:!0,childList:!0}){return new S(o=>{let r=new MutationObserver(n=>n.forEach(i=>{for(let a of i.addedNodes)o.next({type:"added",target:e,value:a});for(let a of i.removedNodes)o.next({type:"removed",target:e,value:a});i.type==="characterData"?o.next({type:"characterData",target:e}):i.attributeName&&o.next({type:"attribute",target:e,value:i.attributeName})}));r.observe(e,t),o.signal.subscribe(()=>r.disconnect())})}function ro(e){return h(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function z(e){return h(e,"click")}function no(e,t){return new S(o=>{let r=new IntersectionObserver(n=>{for(let i of n)o.next(i)},t);r.observe(e),o.signal.subscribe(()=>r.disconnect())})}function io(e){return no(e).map(t=>t.isIntersecting)}function et(e){return no(e).filter(t=>t.isIntersecting).first()}function Sa(e){let t;return function(...o){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,o),t=0})}}function jl(e){let t;return function(...o){t||(t=!0,queueMicrotask(()=>{t=!1,e.apply(this,o)}))}}function Vn(e){return me(t=>{let o=Sa(n=>{t.closed||(e&&e(n),t.next(n),r&&t.complete())}),r=!1;return{next:o,complete:()=>r=!0}})}function Bn(){return Y(()=>document.readyState!=="loading"?A(!0):h(window,"DOMContentLoaded").first().map(()=>!0))}function Ae(e,t,o){let r=new CustomEvent(t,o);e.dispatchEvent(r)}function ql(e,t){let o;return f(Y(()=>(o=e.childNodes,o?A(o):v)),Po(e,{childList:!0,...t}),Oe().switchMap(()=>e.childNodes!==o?(o=e.childNodes,A(o)):v))}function Oe(){return Y(()=>document.readyState==="complete"?A(!0):h(window,"load").first().map(()=>!0))}function W(...e){return new S(t=>{let o=new ResizeObserver(r=>r.forEach(n=>t.next(n)));for(let r of e)o.observe(r);t.signal.subscribe(()=>o.disconnect())})}function xe(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function Wl(e){return!e.disabled&&e instanceof HTMLElement&&(e.offsetParent!==null||!!(e.offsetWidth&&e.offsetHeight))&&(e.tabIndex!==-1||e.contentEditable==="true"||e.hasAttribute("tabindex"))}function $l(e,t){return e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}function Vo(e,t,o){return r=>de(A(e?r.matches(e):!1),h(r,t).switchMap(()=>f(A(!0),h(r,o).map(()=>e?r.matches(e):!1))))}var Kl=Vo("","animationstart","animationend"),Bo=Vo("","mouseenter","mouseleave"),Ea=Vo(":focus,:focus-within","focusin","focusout"),Ho=e=>I(Bo(e),Ea(e)).map(([t,o])=>t||o);function Hn(e,t,o){return t=t?.toLowerCase(),h(e,"keydown",o).filter(r=>!t||r.key?.toLowerCase()===t)}function Nt(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function le(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}function Gl(e){return le(e)?.activeElement??null}var Ca=Je(e=>console.log(e));S.prototype.log=function(){return this.pipe(Ca)};S.prototype.raf=function(e){return this.pipe(Vn(e))};var U=Symbol("bindings"),On={},tt=Symbol("augments"),Ye=Symbol("parser"),Yo=class{bindings;messageHandlers;internals;attributes$=new Zt;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,o){let r=!1;if(this.messageHandlers)for(let n of this.messageHandlers)n.type===t&&(n.next(o),r||=n.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let o of this.bindings)t.push(o.subscribe());if(this.prebind)for(let o of this.prebind)t.push(o.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},lo=Symbol("css"),m=class extends HTMLElement{static observedAttributes;static[tt];static[Ye];[U]=new Yo;[lo];connectedCallback(){this[U].wasInitialized=!0,this[U].wasConnected||this.constructor[tt]?.forEach(t=>t(this)),this[U].connect()}disconnectedCallback(){this[U].disconnect()}attributeChangedCallback(t,o,r){let n=this.constructor[Ye]?.[t]??Aa;o!==r&&(this[t]=n(r,this[t]))}};function Aa(e,t){let o=t===!1||t===!0;return e===""?o?!0:"":e===null?o?!1:void 0:e}function Yn(e,t){e.hasOwnProperty(tt)||(e[tt]=e[tt]?.slice(0)??[]),e[tt]?.push(t)}var Na={mode:"open"};function M(e){return e.shadowRoot??e.attachShadow(Na)}function _n(e,t){t instanceof Node?M(e).appendChild(t):e[U].add(t)}function ao(e,t){t.length&&Yn(e,o=>{for(let r of t){let n=r.call(e,o);n&&n!==o&&_n(o,n)}})}function Xn(e,t){On[e]=t,customElements.define(e,t)}function $(e){return e[U].internals??=e.attachInternals()}function ec(e,...t){return o=>{typeof e=="string"?(ao(o,t),Xn(e,o)):(t.unshift(e),ao(o,t))}}function s(e,{init:t,augment:o,tagName:r}){if(t)for(let n of t)n(e);o&&ao(e,o),r&&Xn(r,e)}function tc(e,...t){ao(e,t)}function ot(e){return de(A(e),e[U].attributes$.map(()=>e))}function L(e,t){return e[U].attributes$.pipe(eo(o=>o.attribute===t),Io(()=>e[t]))}function d(e,t){return f(L(e,t),Y(()=>A(e[t])))}function Ma(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function Mt(e,t,o){return o===!1||o===null||o===void 0?o=null:o===!0&&(o=""),o===null?e.removeAttribute(t):e.setAttribute(t,String(o)),o}function Ta(e,t,o){e.hasOwnProperty(Ye)||(e[Ye]={...e[Ye]}),e[Ye]&&(e[Ye][t]=o)}function u(e,t){return o=>{t?.observe!==!1&&Ma(o).push(e),t?.parse&&Ta(o,e,t.parse);let r=`$$${e}`,n=o.prototype,i=Object.getOwnPropertyDescriptor(n,e);i&&Object.defineProperty(n,r,i);let a=t?.persist,c={enumerable:!0,configurable:!1,get(){return this[r]},set(l){this[r]!==l?(this[r]=l,a?.(this,e,l),this[U].attributes$.next({target:this,attribute:e,value:l})):i?.set&&(a?.(this,e,l),this[r]=l)}};Yn(o,l=>{if(i||(l[r]=l[e]),Object.defineProperty(l,e,c),a?.(l,e,l[e]),t?.render){let x=t.render(l);x&&_n(l,x)}})}}function g(e){return u(e,{persist:Mt,observe:!0})}function Un(e){let t=`on${e}`;return u(t,{render(o){return d(o,t).switchMap(r=>r?new S(n=>{let i=a=>{a.target===o&&o[t]?.call(o,a)};o.addEventListener(e,i),n.signal.subscribe(()=>o.removeEventListener(e,i))}):v)},parse(o){return o?new Function("event",o):void 0}})}function q(e){return u(e,{observe:!1})}function oc(){return{...On}}function y(){return document.createElement("slot")}function jn(e){return t=>{let[o,r]=e();return t[U].add(o),r}}var ge=class extends m{};s(ge,{tagName:"c-span"});function Da(e,t){let o=document.createTextNode("");return e[U].add(t.tap(r=>o.textContent=r)),o}var Oo=document.createDocumentFragment();function so(e,t,o=e){if(t!=null)if(Array.isArray(t)){for(let r of t)so(e,r,Oo);o!==Oo&&o.appendChild(Oo)}else e instanceof m&&t instanceof S?o.appendChild(Da(e,t)):t instanceof Node?o.appendChild(t):e instanceof m&&typeof t=="function"?so(e,t(e),o):o.appendChild(document.createTextNode(t))}function qn(e,t){for(let o in t){let r=t[o];e instanceof m?r instanceof S?e[U].add(o==="$"?r:r.tap(n=>e[o]=n)):o==="$"&&typeof r=="function"?e[U].add(r(e)):e[o]=r:e[o]=r}}function Fa(e,t){return e.constructor.observedAttributes?.includes(t)}function Wn(e,t){let o=e instanceof m&&Fa(e,t)?L(e,t):oo(e,[t]).map(()=>e[t]);return f(o,Y(()=>A(e[t])))}function rt(e,t,o){return u(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let n=r===void 0?void 0:Number(r);return t!==void 0&&(n===void 0||n<t||isNaN(n))&&(n=t),o!==void 0&&n!==void 0&&n>o&&(n=o),n}})}function K(e,t,o){for(let r=e.parentElement;r;r=r.parentElement)if(r[U]?.message(t,o))return}function Z(e,t,o=!0){return new S(r=>{let n={type:t,next:r.next,stopPropagation:o};e[U].addMessageHandler(n),r.signal.subscribe(()=>e[U].removeMessageHandler(n))})}function b(e,t,...o){let r=typeof e=="string"?document.createElement(e):new e;return t&&qn(r,t),o&&so(r,o),r}function _e(e,t,...o){if(e!==_e&&typeof e=="function"&&!(e.prototype instanceof m))return o.length&&((t??={}).children=o),e(t);let r=e===_e?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&qn(r,t),o&&so(r,o),r}function $n(e,t){return o=>new S(()=>{o.hasAttribute(e)||o.setAttribute(e,t)})}function co(e,t){return $n(`aria-${e}`,t)}function Kn(e,t){return Je(o=>e.setAttribute("aria-"+t,o===!0?"true":o===!1?"false":o.toString()))}function ac(e){return Je(t=>e.setAttribute("aria-checked",t===void 0?"mixed":t?"true":"false"))}function C(e){return $n("role",e)}function sc(e,t){return it(t).tap(o=>{e.setAttribute("aria-describedby",o)}).finalize(()=>e.removeAttribute("aria-describedby"))}function lc(e,t){return e.ariaLabel||e.getAttribute("aria-labelledby")?v:t.tap(o=>e.ariaLabel=o)}var Gn=0;function nt(e){return e.id||=`cxl__${Gn++}`}function it(e){return Wn(e,"id").map(t=>(t||(e.id=`cxl__${Gn++}`),e.id))}function cc(e,t){return I(...t.map(o=>it(o))).tap(o=>{e.setAttribute("aria-controls",o.join(" "))})}var Q=p(":host{display:contents}"),Uo=[-2,-1,0,1,2,3,4,5],ti=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],Tt=At(),po=ee(""),_=p(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),Ra=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),oi={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function fo(e=""){return`
:host ${e} {
	${O("surface-container")}
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
		`}function ri(e=oi){return Object.entries(e).map(([t,o])=>`--cxl-color--${t}:${o};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var H={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:oi,imports:Ra?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function he(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}function ni(e){return`box-shadow:var(--cxl-elevation-${e});z-index:${e};`}var st=p(he()),ii={"./theme-dark.js":()=>import("./theme-dark-VB5GOX6M.js")},Xe=[0,4,8,16,24,32,48,64],at,Zn,za;function V(e,t){return e==="xsmall"?`@media(max-width:${H.breakpoints.small}px){${t}}`:`@media(min-width:${H.breakpoints[e]}px){${t}}`}function uo(e){return W(e).map(t=>{let o=H.breakpoints,r=t.contentRect.width,n="xsmall";for(let i in o){if(o[i]>r)return n;n=i}return n})}function La(e=""){return Object.entries(ci).map(([t,o])=>`:host([color=${t}]) ${e}{ ${o} }`).join("")}function oe(e,t,o=""){return ai(e,`
		${t?`:host ${o} { ${ci[t]} }`:""}
		:host${t?"":"([color])"} ${o} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${o}{
			color: inherit;
			background-color: transparent;
		}
		${La(o)}
	`)}function ai(e,t){let o=p(t);return u(e,{persist:Mt,render:r=>o(r)})}function re(e,t){return ai(e,Uo.map(o=>{let r=t(o);return o===0?`:host ${r}`:`:host([size="${o}"]) ${r}`}).join(""))}function si(){let e=document.adoptedStyleSheets.indexOf(at);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function Ia(e){at&&si();let t=e.globalCss??"";e.colors&&(t+=`:root{${ri(e.colors)}}`),t&&(at=Ne(t),document.adoptedStyleSheets.push(at)),Tt.next({theme:e,stylesheet:at,css:t}),po.next(e.name)}var Qn="";function li(e){e?e!==Qn&&(typeof e=="string"?import(e):e()).then(t=>Ia(t.default)):at&&(si(),Tt.next(void 0),po.next("")),Qn=e}function Pa(e){let t;return Tt.tap(o=>{let r=o?.theme.override?.[e.tagName];r?t?t.replace(r):e.shadowRoot?.adoptedStyleSheets.push(t??=Ne(r)):t&&t.replace("")})}function Ne(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function mo(e,t=""){let o=Ne(t);return M(e).adoptedStyleSheets.push(o),o}function p(e){let t;return o=>{let r=M(o);if(r.adoptedStyleSheets.push(t??=Ne(e)),!o[lo])return H.css&&r.adoptedStyleSheets.unshift(za??=Ne(H.css)),o[lo]=!0,Pa(o)}}var jo=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],mc=[...jo,"inherit"];function _o(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function xc(e,t,o="transparent"){return`color-mix(in srgb, var(--cxl-color-${e}) ${t}%,${o})`}function O(e){return`${_o(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var ci=jo.reduce((e,t)=>(e[t]=`
${_o(t)}
${t==="inverse-surface"?_o("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"}),pi=(e="")=>`${e?`:host(${e})`:":host"} { 
	--cxl-color-surface: transparent; 
	border-style: solid; 
	border-color: var(--cxl-color-on-surface); 
	border-width: 1px; 
	box-shadow: none;
}
${jo.map(t=>`:host(${e}[color=${t}]) { --cxl-color-on-surface: var(--cxl-color--${t}); }`).join("")}
`;function lt(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function N(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}function gc(){cancelAnimationFrame(fi)}var fi=requestAnimationFrame(()=>Oa()),ui={},Jn=document.createElement("template"),ei={};function Va(e){return function(t){let o=e(t),r=ei[o];if(r)return r.cloneNode(!0);let n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=()=>(n.dispatchEvent(new ErrorEvent("error")),"");return fetch(o).then(a=>a.ok?a.text():i(),i).then(a=>{if(!a)return;Jn.innerHTML=a;let c=Jn.content.children[0];if(!c)return;let l=c.getAttribute("viewBox");l?n.setAttribute("viewBox",l):c.hasAttribute("width")&&c.hasAttribute("height")&&n.setAttribute("viewBox",`0 0 ${c.getAttribute("width")} ${c.getAttribute("height")}`);for(let x of c.childNodes)n.append(x);ei[t.name]=n}),n.setAttribute("fill","currentColor"),n}}var Ba=Va(({name:e,width:t,fill:o})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${o?"fill1_":""}${t}px.svg`)),di=Ba;function hc(e){di=e}function bc(e){ui[e.id]=e}function xo(e,t={}){let{width:o,height:r}=t;o===void 0&&r===void 0&&(o=r=24);let n=ui[e]?.icon()||di({name:e,width:o,fill:t.fill});return t.className&&n.setAttribute("class",t.className),o&&(n.setAttribute("width",`${o}`),r===void 0&&n.setAttribute("height",`${o}`)),r&&(n.setAttribute("height",`${r}`),o===void 0&&n.setAttribute("width",`${r}`)),t.alt&&n.setAttribute("alt",t.alt),n}var Xo,Ha=new Promise(e=>{Xo=e});function Oa(e){cancelAnimationFrame(fi),Zn||(e&&(e.colors&&(H.colors=e.colors),e.globalCss&&(H.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(Zn=Ne(`:root { ${ri(H.colors)} }`+H.globalCss)),H.imports?Promise.allSettled(H.imports.map(t=>{let o=document.createElement("link");return o.rel="stylesheet",o.href=t,document.head.append(o),new Promise((r,n)=>(o.onload=r,o.onerror=n))})).then(Xo):Xo())}function Me(){return Jt(async()=>{await Ha,await document.fonts.ready})}var Dt=class extends m{outline=!1;color};s(Dt,{tagName:"c-alert",init:[g("outline"),oe("color","inverse-surface")],augment:[C("alert"),p(`
:host {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	column-gap: 8px;
	justify-content: center;
	padding: 14px 16px;
	min-height: 48px;
	min-width: min(340px, 100%);
	border-radius: 4px;
	${N("body-medium")}
}
	${pi("[outline]")}`),y]});var Wo=[p(`
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
	${N("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${N("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${N("headline-medium")}
	flex-wrap: wrap;
}`),y,()=>b("slot",{name:"title"})];function Ya(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var qo=class extends m{size;sticky=!1;contextual};s(qo,{tagName:"c-appbar",init:[g("size"),g("sticky"),g("contextual")],augment:[p(`
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
		`),...Wo,()=>b("slot",{name:"contextual"}),e=>d(e,"sticky").switchMap(t=>t?no(e,{threshold:[1]}).tap(o=>e.toggleAttribute("scroll",o.intersectionRatio<1)):v),e=>{let t;return f(to(e),d(e,"contextual")).raf().switchMap(()=>{for(let o of e.children)if(Ya(o)&&(o.slot="contextual",o.open=o.name===e.contextual,o.open))return t=o,h(o,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,v})}]});function $o(e){return d(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function _a(e,t=e,o=0){let r=t.hasAttribute("tabindex")?t.tabIndex:o;return $o(e).tap(n=>{n?t.removeAttribute("tabindex"):t.tabIndex=r})}function Xa(e,t=e){return f(h(t,"focusout").tap(()=>e.touched=!0),f(L(e,"disabled"),L(e,"touched")).tap(()=>K(e,"focusable.change")))}function Te(e,t=e,o=0){return f(_a(e,t,o),Xa(e,t))}function mi(e){return e in H.animation}function ne({target:e,animation:t,options:o}){if(H.disableAnimations)return e.animate(null);let r=typeof t=="string"?H.animation[t]:t;if(!r)throw new Error(`Animation "${t}" not defined`);let n=typeof r.kf=="function"?r.kf(e):r.kf,i={duration:250,easing:H.easing.emphasized,...r.options,...o,...H.prefersReducedMotion?{duration:0}:void 0};return e.animate(n,i)}function Ft(e){let{trigger:t,stagger:o,commit:r,keep:n}=e;function i(c){return new S(l=>{let x=ne(c);x.ready.then(()=>l.next({type:"start",animation:x}),()=>{}),x.addEventListener("finish",()=>{l.next({type:"end",animation:x}),r&&x.commitStyles(),!(n||n!==!1&&c.options?.fill&&(c.options.fill==="both"||c.options.fill==="forwards"))&&l.complete()}),l.signal.subscribe(()=>{try{x.cancel()}catch{}})})}let a=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return f(...a.map((c,l)=>{let x={...e.options,delay:o!==void 0?(e.options?.delay??0)+l*o:e.options?.delay};return(t==="visible"?io(c).filter(w=>w):t==="hover"?Bo(c):A(!0)).switchMap(w=>w?i({...e,options:x,target:c}):v)}))}function xi(e,t,o=e.getBoundingClientRect()){let r=o.width>o.height?o.width:o.height,n=new go,i=e.shadowRoot||e,{x:a,y:c}=t??{},l=a===void 0||!t||Nt(t),x=a>o.right||a<o.left||c>o.bottom||c<o.top;return n.x=l||x?o.width/2:a-o.left,n.y=l||x?o.height/2:c-o.top,n.radius=r,t||(n.duration=0),i.prepend(n),n}function gi(e,t=e){let o,r,n,i=()=>{o=xi(t,r instanceof Event?r:void 0,n),o.duration=600,r=void 0};return f(h(e,"click").tap(a=>{r=a,n=t.getBoundingClientRect()}),d(e,"selected").raf().switchMap(()=>{if(e.selected){if(!o?.parentNode){if(xe(e))return r=void 0,et(e).tap(i);i()}}else o&&hi(o);return v})).ignoreElements()}function hi(e){return new Promise(t=>{ne({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function J(e,t=e){let o=!1,r=0;return f(h(t,"pointerdown"),h(t,"click")).tap(n=>n.cxlRipple??=e).raf().mergeMap(n=>{if(n.cxlRipple===e&&!o&&!e.disabled&&e.parentNode){r=Date.now(),o=!0,e.style.setProperty("--cxl-mask-hover","none");let i=xi(e,n),a=i.duration,c=()=>{e.style.removeProperty("--cxl-mask-hover"),hi(i).then(()=>{o=!1})};return n.type==="click"?He(a).tap(c):f(h(document,"pointerup"),h(document,"pointercancel")).first().map(()=>{let l=Date.now()-r;setTimeout(()=>c(),l>a?32:a-l)})}return v})}var go=class extends m{x=0;y=0;radius=0;duration=500};s(go,{tagName:"c-ripple",init:[u("x"),u("y"),u("radius")],augment:[p(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",B(()=>{let o=t.style;o.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,o.width=o.height=e.radius*2+"px",t.parentNode||M(e).append(t),ne({target:t,animation:"expand",options:{duration:e.duration}}),ne({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var Ue=[_,st,p(`
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
}`)],Ua=p(`
:host {
	${N("label-large")}
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
`);function Ko(e){return d(e,"disabled").switchMap(t=>t?v:ro(e).tap(o=>{o.stopPropagation(),e.click()}))}function be(e){return f(Ko(e),Te(e))}var ct=class extends m{disabled=!1;touched=!1};s(ct,{init:[g("disabled"),g("touched")],augment:[C("button"),be]});var ce=class extends ct{size;color;variant};s(ce,{tagName:"c-button",init:[re("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),oe("color","primary"),g("variant")],augment:[...Ue,Ua,J,y]});var Rt=class extends ce{};s(Rt,{tagName:"c-button-round",augment:[p(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var je=class extends m{name="";width;height;alt;fill=!1};s(je,{tagName:"c-icon",init:[u("name"),u("width"),u("height"),u("fill"),u("alt")],augment:[C("none"),p(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,o;return e.shadowRoot?.adoptedStyleSheets.push(t),et(e).switchMap(()=>ot(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,n=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${n===void 0?"":`height:${n}px`}}`),o?.remove(),o=e.name?xo(e.name,{className:"icon",width:r,height:n,fill:e.fill,alt:e.alt}):void 0,o&&(o.onerror=()=>{o&&e.alt&&o.replaceWith(e.alt)},M(e).append(o))})}]});var ye=class extends Rt{icon="";width;height;fill=!1;variant="text";alt};s(ye,{tagName:"c-icon-button",init:[u("icon"),u("width"),u("height"),u("alt"),u("fill")],augment:[e=>b(je,{className:"icon",width:d(e,"width"),height:d(e,"height"),name:d(e,"icon"),fill:d(e,"fill"),alt:d(e,"alt")})]});var up=1440*60*1e3,ja=/^\s*(\d{1,2})\s*:\s*(\d{1,2})\s*(?::(\d{1,2})\s*)?([pPaA][mM])?/,qa=/^(\d{4}(?:-\d{2}(?:-\d{2})?)?)(T\d{2}:\d{2}(?:\d{2}(?:\.\d3)?)?)?(Z(?:[+-]\d{1,2})?)?$/;function Wa(e){let t=ja.exec(e);if(t){let o=new Date,r=+t[1],n=t[4]?.toLowerCase()==="pm";return o.setHours(n?r+12:r),o.setMinutes(+t[2]),o}return new Date(NaN)}function $a(e){let t=qa.exec(e),o=new Date(t&&!t[3]&&!t[2]?`${e}T00:00`:e);return isNaN(o.getTime())&&(o=Wa(e)),o}function bi(e,t,o){if(t==="relative"){let r=new Date;return e.getFullYear()===r.getFullYear()?e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()?e.toLocaleTimeString(o,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(o,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(o,{month:"2-digit",day:"2-digit",year:"2-digit"})}return t==="medium"||t==="long"||t==="short"||t==="full"?e.toLocaleString(o,{dateStyle:t,timeStyle:t}):e.toLocaleString()}function yi(e){return u(e,{parse:t=>t?$a(t):void 0})}function bo(e,t,o){return t?typeof o=="string"?bi(t,o,e):t.toLocaleString(e,o):""}var Go={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function Ka(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var ho={content:Go,name:"default",localeName:Ka(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>bo(ho.localeName,e,t)},Ga={content:Go,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>bo("en-US",e,t)};function Za(){let e=ee(ho),t={default:ho,en:Ga},o={},r=e.map(a=>a.content);async function n(a){let c=a.split("-")[0];if(!(t[a]??t[c])){let x=o[a]??o[c];x&&await x()}return t[c]||ho}async function i(a){e.next(await n(a))}return navigator?.language&&i(navigator.language),{content:r,registeredLocales:t,locale:e,setLocale:i,getLocale(a){return a?Jt(()=>n(a)):e},get(a,c){return r.map(l=>l[a]??(c&&l[c])??"")},register(a){t[a.name]=a}}}var X=Za();function hp(e){return I(X.locale,d(e,"locale")).switchMap(([t,o])=>o?X.getLocale(o):A(t))}function yo(e){return Object.assign(Go,e),X.get}function bp(e,t){return X.locale.map(o=>o.formatDate?.(e,t)??bo(o.localeName,e,t))}function yp(e){return t=>t?X.locale.map(o=>o.formatDate?.(t,e)??bo(o.localeName,t,e)):A("")}function vp(e,t,o=X.locale){let r=new Date,n=t==="xsmall"?"narrow":t==="small"?"short":"long";return r.setDate(r.getDate()-r.getDay()+e),o.map(i=>i.formatDate(r,{weekday:n}))}var vi=class e extends m{name;size;open=!1;backIcon=b(ye,{icon:"arrow_back",className:"icon",ariaLabel:X.get("core.close"),$:t=>z(t).tap(()=>this.open=!1)});static{s(e,{tagName:"c-appbar-contextual",init:[u("name"),g("open"),g("size")],augment:[t=>t.backIcon,...Wo,p(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),t=>L(t,"open").tap(o=>{o||t.dispatchEvent(new Event("close"))})]})}};var Zo=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer?.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},G=new Zo;function wi(e=document){document.documentElement.lang="en";let t=[b("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),b("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),b("meta",{name:"mobile-web-app-capable",content:"yes"}),b("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${N("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function ki(e=2e3){return f(He(e),Me()).first()}function Si(e){return ki().raf(()=>e.setAttribute("ready",""))}function vo(e){return f(B(t=>{let o=wi(e.ownerDocument??document);t.signal.subscribe(()=>o.forEach(r=>r.remove()))}),Oe().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),ki().switchMap(()=>uo(e).raf(t=>e.setAttribute("breakpoint",t))),Si(e),po.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Qo=class extends m{connectedCallback(){requestAnimationFrame(()=>wi(this.ownerDocument||document)),super.connectedCallback()}};s(Qo,{tagName:"c-meta",augment:[()=>Si(document.body)]});function Ei(e,t,o){o==="in"&&(e.style.display="");let r=e.offsetWidth,n=ne({target:e,animation:{kf:{[t]:o==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});o==="out"&&(n.onfinish=()=>e.style.display="none")}var Jo=class extends m{sheetstart=!1;sheetend=!1};s(Jo,{tagName:"c-application",init:[g("sheetstart"),g("sheetend")],augment:[p(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${O("background")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${lt()}
	`),vo,e=>Z(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>Z(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=b("slot",{name:"start"}),o=b("slot",{id:"body"}),r=b("slot",{name:"end"}),n=Ne("html { overflow: hidden }");return M(e).append(t,o,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),G.popupContainer=e,f(B(i=>{let a=(e.ownerDocument??document).adoptedStyleSheets;a.push(n),i.signal.subscribe(()=>{let c=a.indexOf(n);c!==-1&&a.splice(c,1)})}),L(e,"sheetstart").tap(i=>Ei(t,"marginLeft",i?"in":"out")),L(e,"sheetend").tap(i=>Ei(r,"marginRight",i?"in":"out")))}]});var Qa=p(`
:host {
	box-sizing: border-box;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	border-radius: 100%;
	overflow-y: hidden;
	vertical-align: middle;
	position: relative;
	${N("title-large")}
}
svg,img { width: 100%; height: 100%; }
`),er=class extends m{size;src="";text=""};s(er,{tagName:"c-avatar",init:[re("size",e=>`{
				width: ${30+e*8}px;
				height: ${30+e*8}px;
				font-size: ${18+e*4}px;
			}`),u("src"),u("text")],augment:[Qa,e=>{let t;return I(d(e,"src"),d(e,"text")).raf(([o,r])=>{t?.remove(),o?(t=new Image,t.alt=e.text??"",t.src=o):r?t=new Text(r):t=xo("person"),M(e).append(t)})}]});var tr=class extends m{};s(tr,{tagName:"c-body",augment:[p(`
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

${V("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),y]});var or=class extends ct{};s(or,{tagName:"c-button-text",augment:[...Ue,p(`
:host {
	${N("label-large")}
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
		`),J,y]});function rr(e="block"){let t=(o=>{for(let r=12;r>0;r--)o.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,o.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,o.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,o.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,o.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return o})({xl:"",lg:"",md:"",sm:"",xs:""});return p(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${V("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${V("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${V("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${V("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var nr=p(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${lt()}
${Xe.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${Xe.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),pt=class extends m{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};s(pt,{init:[g("sm"),g("xs"),g("md"),g("lg"),g("xl"),g("vpad"),g("pad"),g("center"),g("fill"),g("grow"),g("elevation"),oe("color")]});var zt=class extends pt{};s(zt,{tagName:"c-c",augment:[nr,rr(),p(":host([center]) { text-align: center}"),y]});var Ja=p(`
:host {
	${O("surface-container")}
	${N("body-medium")}
	border-radius: var(--cxl-shape-corner-medium);
	overflow: hidden;
}
:host([variant=elevated]:not([color])) {
	--cxl-color-surface: var(--cxl-color-surface-container-low);
	z-index: 1;
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=outlined]) {
	${O("surface")}
	border: 1px solid var(--cxl-color-outline-variant);
}
${lt()}
`),Lt=class extends zt{variant};s(Lt,{tagName:"c-card",init:[g("variant")],augment:[Ja]});function pe(e,t,o){return new S(r=>{let n={id:e,controller:o,target:t};K(t,`registable.${e}`,n),r.signal.subscribe(()=>n.unsubscribe?.())})}function wo(e,t,o,r){return new S(n=>{function i(c){let l=c.target;c.unsubscribe=()=>{let w=o.indexOf(l);w!==-1&&o.splice(w,1),r?.({type:"disconnect",target:l,elements:o}),n.next()};let x=o.indexOf(l);x!==-1&&o.splice(x,1);let k=o.findIndex(w=>w.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_PRECEDING);k===-1?o.push(l):o.splice(k,0,l),r?.({type:"connect",target:l,elements:o}),n.next()}let a=Z(t,`registable.${e}`).subscribe(i);n.signal.subscribe(a.unsubscribe)})}function ft(e,t,o=new Set){return new S(r=>{function n(a){let c=a.target,l=a.controller||a.target;a.unsubscribe=()=>{o.delete(l),r.next({type:"disconnect",target:l,element:c,elements:o})},o.add(l),r.next({type:"connect",target:l,element:c,elements:o})}let i=Z(t,`registable.${e}`).subscribe(n);r.signal.subscribe(i.unsubscribe)})}var es=p(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${N("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function ts(e){return f(pe("list",e),d(e,"selected").tap(t=>e.ariaSelected=String(t)))}function ar(e){return f(Ko(e),Te(e,e,-1),ts(e))}var ut=class extends m{disabled=!1;touched=!1;selected=!1};s(ut,{init:[g("disabled"),g("touched"),g("selected")],augment:[ar]});var ir=class extends ut{size};s(ir,{tagName:"c-item",init:[re("size",e=>`{min-height:${56+e*8}px}`)],augment:[es,_,st,C("option"),y,J]});var sr=class extends Lt{disabled=!1;touched=!1;selected=!1};s(sr,{tagName:"c-card-item",init:[g("disabled"),g("touched"),g("selected")],augment:[C("option"),...Ue,p(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),ar,J]});var lr={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(o){console.error(o)}}};function Tf(e){return(t,o)=>t[e]>o[e]?1:t[e]<o[e]?-1:0}function ve(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let o,r=e.getRootNode();return r instanceof ShadowRoot&&(o=r.getElementById(t),o)?o:e.ownerDocument.getElementById(t)??void 0}function ko(e,t){return d(e,t).map(o=>ve(e,o))}var os=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,rs=/^\d{5}(?:[-\s]\d{4})?$/,ns={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},Ci={required:fs,email:us,json:xs,zipcode:ds,nonZero:cs,nonEmpty:ls},is={pattern:ps,equalToElement:cr(Ti),greaterThan:Ni,lessThan:Mi,greaterThanElement:cr(Ni),lessThanElement:cr(Mi),min:hs,max:bs,equalTo:Ti,maxlength:ys,minlength:vs},as=yo(ns);function cr(e){return(t,o)=>{let r=typeof t=="string"?ve(o,t):t;if(!r)throw"Invalid element";return e(r)}}function fe(e,t){return{key:e,valid:t,message:as(`validation.${e}`,"validation.invalid")}}function ss(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function ls(e){return fe("nonEmpty",!ss(e))}function cs(e){return fe("nonZero",e===""||Number(e)!==0)}function ps(e){let t=typeof e=="string"?e=new RegExp(e):e;return o=>fe("pattern",typeof o=="string"&&(o===""||t.test(o)))}function pr(e){return e!=null&&e!==""}function fs(e,t){let o=t&&"checked"in t?!!t.checked:!0;return fe("required",o&&pr(e))}function us(e){return fe("email",typeof e=="string"&&(e===""||os.test(e)))}function ds(e){return fe("zipcode",typeof e=="string"&&(e===""||rs.test(e)))}function ms(e){try{return JSON.parse(e),!0}catch{return!1}}function xs(e){return fe("json",ms(e))}function gs(e){return e instanceof HTMLElement&&"value"in e}function It(e,t,o){let r=gs(t)?d(t,"value"):t instanceof S?t:A(t);return n=>r.map(i=>fe(e,!pr(n)||!pr(i)||o(n,i)))}function Ai(e,t){let o=/(\w+)(?:\(([^)]+?)\))?/g,r=[],n;for(;n=o.exec(e);)if(n[2]){let i=is[n[1]];if(!i)throw`Invalid rule "${n[1]}"`;r.push(i(n[2],t))}else if(n[1]in Ci)r.push(Ci[n[1]]);else throw`Invalid rule "${n[1]}"`;return r}function Di(e,t){let o=(typeof e=="string"?Ai(e,t):e).flatMap(r=>typeof r=="string"?Ai(r,t):r);return(r,n)=>o.map(i=>{let a=i(r,n);return a instanceof S?a:a instanceof Promise?Ze(a):A(a)})}function hs(e){return It("min",e,(t,o)=>Number(t)>=Number(o))}function Ni(e){return It("greaterThan",e,(t,o)=>Number(t)>Number(o))}function bs(e){return It("max",e,(t,o)=>Number(t)<=Number(o))}function Mi(e){return It("lessThan",e,(t,o)=>Number(t)<Number(o))}function Ti(e){return It("equalTo",e,(t,o)=>t==o)}function ys(e){return t=>fe("maxlength",!t||t.length<=+e)}function vs(e){return t=>fe("minlength",!t||t.length>=+e)}function ws(e){return Fi(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function dt(e){return L(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||Ae(e,"change",{bubbles:!0})})}function Fi(e){return f(d(e,"value"),d(e,"checked")).map(()=>{})}var ie=class e extends m{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{s(e,{init:[g("autofocus"),g("invalid"),g("disabled"),g("touched"),u("rules"),g("name"),q("validationResult"),Un("update")],augment:[t=>(t.defaultValue=t.value,f(pe("form",t),L(t,"invalid").tap(()=>Ae(t,"invalid")),d(t,"invalid").switchMap(o=>{if(o){if(t.setAria("invalid","true"),!t.validationMessage)return X.get("validation.invalid").tap(r=>t.setCustomValidity(r))}else t.setAria("invalid",null);return v}),B(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),d(t,"rules").switchMap(o=>{if(!o)return v;let r=Di(o,t);return Fi(t).switchMap(()=>f(...r(t.value,t)).tap(n=>t.setValidity(n))).finalize(()=>t.resetValidity())}),d(t,"value").tap(o=>t.setFormValue(o)),d(t,"validationResult").switchMap(o=>!o||o.valid?v:o.message instanceof S?o.message:o.message===void 0?X.get("validation.invalid"):A(o.message)).tap(o=>{t.setCustomValidity(o)}))),ws]})}get labels(){return $(this).labels}get validity(){return $(this)?.validity||null}get validationMessage(){return $(this)?.validationMessage||""}reportValidity(){return $(this)?.reportValidity()??!0}checkValidity(){return $(this)?.checkValidity()??!0}setCustomValidity(t){let o=!!t,r=t!==this.validationMessage;this.applyValidity(o,t),this.invalid!==o?this.invalid=o:r&&Ae(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,o){o?this.setAttribute(`aria-${t}`,o):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let o in this.validMap){let r=this.validMap[o];if(!r.valid)return this.validationResult=r}this.resetInvalid()}applyValidity(t,o){$(this)?.setValidity({customError:t},o)}formDisabledCallback(t){this.disabled=t}setFormValue(t){$(this)?.setFormValue?.(t)}};function mt(e,t,...o){let r=document.createElementNS("http://www.w3.org/2000/svg",e);for(let n in t){if(n==="children")continue;let i=t[n];r.setAttribute(n==="className"?"class":n,i)}return o&&r.append(...o),r}function Pt(e){return mt("svg",e,mt("path",{d:e.d}))}function fr(e){return f(I(d(e,"indeterminate"),d(e,"checked")).map(([t,o])=>e.ariaChecked=t?"mixed":String(o)),f(z(e).tap(()=>{e.disabled||(e.indeterminate&&(e.indeterminate=!1),e.checked=!e.checked)}),d(e,"checked").tap(()=>{$(e).setFormValue?.(e.checked?String(e.value):null)}),L(e,"checked").tap(()=>{e.dispatchEvent(new Event("change",{bubbles:!0}))})).ignoreElements())}var Ri=class e extends ie{value="on";checked=!1;indeterminate=!1;defaultChecked=!1;static{s(e,{tagName:"c-checkbox",init:[u("value"),u("checked"),u("indeterminate")],augment:[C("checkbox"),p(`
:host {
	position: relative;
	display: flex;
	column-gap: 16px;
	align-items: center;
	outline: none;
	cursor: pointer;
	text-align: start;
	padding: 15px;
	${N("body-large")}
	line-height: 18px;
}
:host(:empty) {
  margin: -15px;
  background-color: transparent;
}
:host(:empty) slot { display: none; }
:host([invalid][touched]) .box {
  border-color: var(--cxl-color-error);
  background-color: var(--cxl-color-error);
  color: var(--cxl-color-on-error);
}
:host([invalid][touched]) .box[state=false] {
  background-color: var(--cxl-color-surface);
}
.box {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	position: relative;
	box-sizing: border-box;
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	border-radius: 2px;
	border: 2px solid var(--cxl-color-on-surface);
	background-color: var(--cxl-color-surface);
}
.mask {
	display: block;
	position: absolute;
	top: -13px; left: -13px;
	width: 40px; height: 40px;
	border-radius: 100%;
	overflow: hidden;
}
${he(".mask")}
svg { display:none; stroke-width:4px;fill:currentColor;stroke:currentColor;width:14px;height:14px; }

.box[state=mixed] .minus { display: block; }
.box[state=true] .check { display: block; }

.box[state=true],.box[state=mixed]  {
	--cxl-color-on-surface: var(--cxl-color-primary);
	background-color: var(--cxl-color-on-surface);
	color: var(--cxl-color-on-primary);
}
:host([invalid][touched]) .box {
	--cxl-color-on-surface: var(--cxl-color-error);
}
:host([disabled]) .box {
	--cxl-color-on-surface: var(--cxl-color--on-surface);
	opacity: 0.38;
}
`),be,_,t=>{t.defaultChecked=t.checked;let o=b("div",{className:"mask"}),r=b("div",{className:"box"},Pt({className:"check",viewBox:"0 0 24 24",d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),Pt({className:"minus",viewBox:"0 0 24 24",d:"M19 13H5v-2h14v2z"}),o);return M(t).append(r,b("slot")),f(J(o,t),fr(t).tap(n=>r.setAttribute("state",n)))}]})}formResetCallback(){this.checked=this.defaultChecked,this.touched=!1}setFormValue(t){$(this).setFormValue?.(this.checked?t:null)}};var ur=class extends m{disabled=!1;touched=!1;selected=!1;color;size=0};s(ur,{tagName:"c-chip",init:[g("disabled"),g("touched"),g("selected"),oe("color","surface-container-low"),re("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[C("button"),be,...Ue,p(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${N("label-large")}
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
	${O("secondary-container")}
}
:host(:hover) { box-shadow: none; }
slot[name] { display: inline-block; }
		`),J,()=>b("slot",{name:"leading"}),y,()=>b("slot",{name:"trailing"})]});var dr=class extends m{date;format;locale};s(dr,{tagName:"c-date",init:[yi("date"),u("format"),u("locale")],augment:[e=>I(d(e,"locale").switchMap(t=>X.getLocale(t)),d(e,"date"),d(e,"format")).raf(([t,o,r])=>e.textContent=o?t.formatDate(o,r):"")]});yo({"dialog.close":"Close dialog","dialog.cancel":"Cancel","dialog.ok":"Ok"});var xr=p(`
:host([fullscreen]) dialog {
	background-color: var(--cxl-color-surface);
	box-shadow: none;
	margin: 0;
	width: 100%; height: 100%; max-width: none;
	border-radius: 0; max-height: none;
}
dialog {
	margin: auto;
	border-width: 0;
	max-height: none;
	text-align: start;
	outline: none;
	${O("surface-container-high")}
	
	box-sizing: border-box;
	min-width: 280px;
	max-width: calc(100% - 24px);
	padding: 24px;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-3);
	border-radius: var(--cxl-shape-corner-xlarge);
}

dialog::backdrop { background-color: var(--cxl-color-scrim); }

${V("small",".content { max-height: 85%; }")}
	`),xt=class extends m{static=!1;open=!1;fullscreen=!1;dialog=document.createElement("dialog");returnValue};s(xt,{init:[u("static"),u("open"),g("fullscreen")],augment:[Q,e=>h(e,"keydown").tap(t=>{t.key==="Escape"&&(t.preventDefault(),e.open=!1)}),e=>h(e.dialog,"close").tap(()=>e.open=!1),e=>e.dialog,e=>d(e,"open").tap(t=>{t?e.static?e.dialog.show():G.openModal({element:e.dialog,close:()=>e.open=!1}):e.dialog.open&&(e.dialog.close(),Ae(e,"close"))}),e=>Z(e,"toggle.close").tap(t=>{e.returnValue=t,e.open=!1})]});var mr=class extends xt{};s(mr,{tagName:"c-dialog",augment:[xr,e=>{e.dialog.append(b("slot",{className:"content"}))}]});function So(e,t,...o){let r=b(e,t,...o);return new Promise(n=>{let i=()=>{r.removeEventListener("close",i),r.remove(),n(r.returnValue)};r.addEventListener("close",i),r.parentNode||document.body.append(r),r.open=!0})}var qe=class extends xt{};s(qe,{tagName:"c-dialog-basic",augment:[xr,p(`
dialog {
	display:flex; flex-direction:column;row-gap:16px;
	max-width: min(calc(100% - 24px), 560px);
}
slot[name=title] { ${N("title-large")} }
slot[name=actions] {
	display:flex; column-gap: 24px; align-items: center; justify-content: end; margin-top:8px;
}
		`),e=>{e.dialog.append(b("slot",{name:"title"}),b("slot"),b("slot",{name:"actions"}))}]});var We=(e,t,o=e)=>z(e).tap(()=>K(o,"toggle.close",t)),Mu=(e,t,o=e)=>z(e).tap(()=>K(o,"toggle.open",t));function zi(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(o=>{let r=ve(e,o);return r?[r]:[]}):Array.isArray(t)?t:[t]}function ks(e,t,o,r,n=h(e,"click").map(()=>!o())){return f(r,n).switchMap(i=>{let a=t();return a?Ze(a.map(c=>({target:c,open:i}))):v})}function Vt(e,t=e){function o(i,a){return[d(e,"open").switchMap(c=>(i.parentNode||G.popupContainer.append(i),c&&i instanceof m?L(i,"open").map(l=>{e.open&&l===!1&&(e.open=!1)}):v)),it(i).tap(c=>{let l=i.getAttribute("role");(l==="menu"||l==="listbox"||l==="tree"||l==="grid"||l==="dialog")&&(a.ariaHasPopup=l),a.getRootNode()===i.getRootNode()&&a.setAttribute("aria-controls",c)})]}let r=I(d(e,"trigger"),d(e,"target")).switchMap(([i])=>{let a=zi(e),c=a?f(...a.flatMap(l=>o(l,e))).ignoreElements():v;return f(i==="hover"?I(Ho(t),a?f(...a.map(l=>Ho(l))):v).map(l=>!!l.find(x=>!!x)).debounceTime(250):i==="checked"?h(t,"change").map(l=>l.target&&"checked"in l.target?!!l.target.checked:!1):h(t,"click").map(()=>!e.open),c)}),n;return Bn().switchMap(()=>ks(t,()=>zi(e),()=>e.open,d(e,"open"),r).filter(i=>{let{open:a,target:c}=i;if(e.open!==a){if(a)n=le(e)?.activeElement,c.trigger=e;else if(c.trigger&&c.trigger!==e)return i.open=!0,c.trigger=e,!0;return e.open=a,!1}if(!a&&c.trigger===e){let l=document.activeElement;(l===document.body||l===document.documentElement)&&n?.focus()}return!0}))}var gt=class extends m{open=!1;target;trigger};s(gt,{init:[u("target"),u("trigger"),g("open")],augment:[e=>Vt(e).raf(({target:t,open:o})=>t.open=o)]});var gr=class extends gt{};s(gr,{tagName:"c-toggle",augment:[Q,y]});function Pu(e){let t=[],{message:o,title:r,action:n}=typeof e=="string"?{message:e}:e;return r&&t.push(b("div",{slot:"title"},r)),t.push(b(ge,void 0,o),b(ce,{$:We,variant:"text",slot:"actions"},n??X.get("dialog.ok"))),So(qe,{},...t)}function Uu(e){let t=[];if(typeof e=="string")t.push(e);else{let{message:o,title:r,action:n,cancelAction:i}=e;r&&t.push(b("div",{slot:"title"},r)),t.push(b(ge,void 0,o),b(ce,{variant:"text",slot:"actions",$:We},i??X.get("dialog.cancel")),b(ce,{variant:"text",slot:"actions",$:We},n??X.get("dialog.ok")))}return So(qe,{},...t)}var De;function Li(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Ss(e){return e==="infinite"?1/0:+e}function Es(e){if(mi(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let o={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(c,l,x)=>(l&&(r=+l),x&&(o.composite=x),"")),De??=document.createElement("style").style,De.animation=e,o.fill=De.animationFillMode;let n=o.fill==="forwards"||o.fill==="both",i=t?void 0:Li(De.animationDuration);i!==void 0&&(o.duration=i);let a=Li(De.animationDelay);return a!==void 0&&(o.delay=a),De.animationIterationCount&&(o.iterations=Ss(De.animationIterationCount)),{animation:De.animationName,keep:n,stagger:r,options:o}}function Cs(e){return typeof e=="string"&&(e=e.split(",").map(t=>Es(t.trim()))),e}function Bt(e,t,o,r){let n=r?`motion-${r}-on`:"motion-on",i=Cs(o);return e.setAttribute(n,""),f(...i.map(a=>Ft({target:t,...a}))).finalize(()=>e.removeAttribute(n))}var hr=class extends m{motion;target};s(hr,{tagName:"c-dismiss",init:[u("motion"),u("target")],augment:[Q,y,e=>ko(e,"target").switchMap(t=>t?z(e).tap(()=>{e.motion?Bt(e,t,e.motion).finalize(()=>t.remove()).subscribe():t.remove()}):v)]});function br(e,{target:t,clientX:o,clientY:r},n,i){if(!t)throw new Error("Invalid Event Target");return{type:e,target:t,clientX:o,clientY:r,startX:n,startY:i}}function As(){let e={},t=ee(e),o=new te;return{dragging:t,dropping:o,elements:e,next:()=>t.next(e)}}var Fe=As();function Ns(e){return({target:t,moveTarget:o,delay:r})=>{let n=!1,i=0;r??=60;let a=o||t,c=t.style,{userSelect:l,transition:x}=c;return new S(k=>{function w(T,P=!0){n?(n=!1,a.style.transition=x,F?.unsubscribe(),k.next(T),delete Fe.elements.mouse,P&&Fe.dropping.next({element:a,event:T}),Fe.next()):clearTimeout(i)}let E=0,D=0;l=c.userSelect,c.userSelect="none";let F,R=f(e(t).switchMap(T=>{if(T.type==="pointerdown"){x=a.style.transition,T.preventDefault(),E=T.clientX,D=T.clientY;let P=T.pointerId;n=!1,i=setTimeout(()=>{if(a.style.transition="none",!!t.isConnected){try{t.setPointerCapture(P)}catch(se){console.error(se)}n=!0,k.next(br("start",T,E,D)),F=h(window,"keydown").tap(se=>{n&&se.key==="Escape"&&(se.preventDefault(),w({type:"end",target:t,clientX:0,clientY:0,startX:E,startY:D},!0))}).subscribe()}},r)}else if(T.type==="pointermove"){if(n){let P=br("move",T,E,D);k.next(P),Fe.elements.mouse={element:a,event:P},Fe.next()}}else return clearTimeout(i),A(T);return v}).debounceTime().tap(T=>w(br("end",T,E,D))),h(t,"click",{capture:!0}).tap(T=>{n&&T.target===t&&T.stopImmediatePropagation()})).subscribe();k.signal.subscribe(()=>{R.unsubscribe(),F?.unsubscribe(),c.userSelect=l})})}}function Ms(e){return e.style.touchAction||(e.style.touchAction="none"),h(e,"pointerdown").switchMap(t=>t.currentTarget?new S(o=>{o.next(t);let r=f(h(window,"pointermove").tap(n=>o.next(n)),f(h(window,"pointercancel"),h(window,"pointerup")).tap(n=>{o.next(n),r.unsubscribe()})).subscribe();o.signal.subscribe(()=>r.unsubscribe())}):v)}var Ts=Ns(Ms);function Ds(e){return Ts(e)}function Ii(e,t){let o=t.clientX,r=t.clientY;return e.left<o&&e.right>o&&e.top<r&&e.bottom>r}function Fs(e){let t=Fe.elements,o=[],r;for(let n in t){let i=t[n],{event:a,element:c}=i;a&&c!==e&&(r||=e.getBoundingClientRect(),Ii(r,a)&&o.push({type:"over",target:e,relatedTarget:c,clientX:a.clientX,clientY:a.clientY}))}return o}function Rs(e){let t=0;return Fe.dragging.switchMap(()=>{let o=Fs(e);return t===0&&o.length===0?v:(t=o.length,A(o))})}function zs(e){return Rs(e).switchMap(t=>t.length===0?A({type:"out",target:e,clientX:0,clientY:0}):Ze(t))}function Ls(e){return Fe.dropping.switchMap(({element:t,event:o})=>e!==t&&Ii(e.getBoundingClientRect(),o)?A({type:"drop",target:e,clientX:o.clientX,clientY:o.clientY,relatedTarget:t}):v)}function Is(e,t){return{width:e.offsetWidth,height:e.offsetHeight,x:t.clientX,y:t.clientY,sx:t.clientX/e.offsetWidth,sy:t.clientY/e.offsetHeight}}function Ps({target:e,moveTarget:t,axis:o}){let r;return n=>{let i=t||e;if(n.type==="start")r=Is(i,n);else if(n.type==="end")i.style.transform="",r=void 0;else if(r){let a=o==="y"?0:(n.clientX-r.x)/r.width,c=o==="x"?0:(n.clientY-r.y)/r.height;return A({event:n,x:a,y:c,sx:r.sx,sy:r.sy})}return v}}function Vs(e){return({x:t,y:o})=>{let r=(e.moveTarget||e.target).style;r.transform=`translate(${t*100}%, ${o*100}%)`}}function Pi(e){let t=0;return f(h(e,"dragenter").tap(o=>{++t===1&&e.setAttribute("dragover",""),o.stopPropagation()}),h(e,"dragleave").tap(()=>{--t===0&&e.removeAttribute("dragover")}),h(e,"dragover").tap(o=>o.preventDefault()),h(e,"drop").tap(o=>{o.preventDefault(),o.stopPropagation(),e.removeAttribute("dragover"),t=0})).filter(o=>o.type==="drop")}function Vi(e){let t=e.moveTarget||e.target;return f(Ds(e).tap(o=>{o.type==="start"?t.toggleAttribute("dragging",!0):o.type==="end"&&t.toggleAttribute("dragging",!1)}).switchMap(Ps(e)).tap(Vs(e)).ignoreElements(),zs(t).tap(o=>t.toggleAttribute("dragover",o.type==="over")),Ls(t))}var Bi=class e extends m{dragging=!1;dragover=!1;target;static{s(e,{tagName:"c-drag-handle",init:[g("dragging"),g("dragover")],augment:[y,p(`
:host { display: block; cursor:grab; position: relative; touch-action: none; }
:host([dragging]) { z-index: 10 }
		`),t=>ko(t,"target").switchMap(o=>Vi({target:t,moveTarget:o,delay:150}).tap(r=>t.handleDrag?.(r)))]})}};var Ht=class extends m{center=!1};s(Ht,{tagName:"c-backdrop",init:[g("center")],augment:[p(`
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

	`),e=>h(e,"keydown").tap(t=>t.stopPropagation()),y]});var ht=p(":host(:not([open],[motion-out-on])){display:none}");function $e(e,t=()=>e,o=!1){let r=Y(()=>A(t("in"))),n=Y(()=>A(t("out")));return f(Z(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),I(d(e,"motion-in").map(i=>i?r.switchMap(a=>Bt(e,a,i,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?He(e.duration).map(()=>e.open=!1):v):r),d(e,"motion-out").map(i=>(i?n.switchMap(a=>Bt(e,a,i,"out").ignoreElements()):n).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([i,a])=>L(e,"open").switchMap(c=>{if(e.popover!=="auto"){let l=c?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:c?"closed":"open",newState:l}))}return c?o?de(a,i):i:o?de(a,i):a})))}var Re=class extends m{open=!1;duration;"motion-in";"motion-out"};s(Re,{init:[u("motion-in"),u("motion-out"),rt("duration"),g("open")]});var yr=class extends Re{};s(yr,{tagName:"c-toggle-target",augment:[p(`
:host{display:contents}
`),e=>{let t=b("slot"),o=b("slot",{name:"off"});return(e.open?o:t).style.display="none",M(e).append(t,o),$e(e,r=>{t.style.display=o.style.display="none";let n=e.open?r==="in"?t:o:r==="in"?o:t;return n.style.display="",n.assignedElements()},!0)}]});var Ot=class extends Re{};s(Ot,{tagName:"c-toggle-panel",augment:[y,ht,$e]});var Bs=p(`
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
${V("small","#drawer { width: 360px }")}

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
`),vr=class extends m{open=!1;position;responsive;permanent=!1};s(vr,{tagName:"c-drawer",init:[g("open"),g("position"),u("responsive"),u("permanent")],augment:[Bs,p(`
:host { max-width: 360px; }
#drawer.permanent {
	${O("surface")}
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
`),e=>{let t=ee(!1),o=f(d(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",n=b(Ot,{id:"drawer","motion-in":o.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":o.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},y),i=new Ht;i.id="backdrop";let a=b("dialog",{id:"dialog"},i,n);return M(e).append(a),f(h(n,"close").tap(()=>a.close()),h(a,"close").tap(()=>e.open=!1),L(n,"open").tap(c=>e.open=c),L(e,"open").raf(c=>{c||n.scrollTo(0,0)}),h(i,"click").tap(()=>e.open=!1),h(a,"cancel").tap(c=>{c.preventDefault(),e.open=!1}),d(e,"open").tap(c=>{if(t.value&&e.permanent)return n.open=!0;c?t.value||(G.openModal({element:a,close:()=>e.open=!1}),a.getBoundingClientRect()):G.currentModal?.element===a&&G.modalClosed()}).raf(c=>{n.open=c}),d(e,"responsive").switchMap(c=>c!==void 0?uo(document.body):A("xsmall")).switchMap(c=>{let l=H.breakpoints[e.responsive||"large"],x=H.breakpoints[c]>=l;return t.next(x),x&&n.className!=="permanent"?a.close():!x&&n.className==="permanent"&&(e.open=!1),x&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",x),n.className=x?"permanent":"drawer",L(e,"open").tap(k=>{e.hasAttribute("responsiveon")||ne({target:i,animation:k?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var wr=class extends gt{icon="arrow_right"};s(wr,{tagName:"c-dropdown",init:[u("icon")],augment:[p(`
:host { display: flex; gap: 0; align-items: center; cursor: pointer; }
.icon { transition: rotate var(--cxl-speed); height:24px; width:24px; translate: -7px; margin-right: -6px; }
:host(:dir(rtl)) .icon { rotate: 180deg; }
:host([open]) .icon { rotate: 90deg; }
		`),e=>{let t=b(je,{className:"icon"});return e.shadowRoot?.append(t,b("slot")),f(d(e,"icon").tap(o=>t.name=o),h(e,"keydown").tap(o=>{o.key==="ArrowRight"?e.open=!0:o.key==="ArrowLeft"&&(e.open=!1)}))}]});var Eo=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,o=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,o)):r.insertBefore(t,o))}empty(){let t=this.start.nextSibling;for(;t&&t!==this.end;){let o=t.nextSibling;t.remove(),t=o}}};function Oi({source:e,render:t,empty:o,append:r,loading:n}){let i=[],a=document.createDocumentFragment(),c,l;function x(k){if(l?.parentNode?.removeChild(l),!k)return;let w=0;for(let D of k){let F=i[w]?.item;if(F)F.value!==D&&F.next(D);else{let R=ee(D),T=t(R,w,k),P=T instanceof DocumentFragment?Array.from(T.childNodes):[T];i.push({elements:P,item:R}),a.append(T)}w++}a.childNodes.length&&r(a),c?.remove(),w===0&&o&&r(c=o());let E=i.length;for(;E-- >w;)i.pop()?.elements.forEach(D=>D.remove())}return Y(()=>(l=n?.(),l&&r(l),e.raf(x)))}function Ud(e){return jn(()=>{let t=new Eo;return[Oi({...e,append:t.insert.bind(t)}),t.end]})}function Hs(e){if(e instanceof HTMLTemplateElement)return e;throw"Element must be a <template>"}function Os(e,t){let o=e.getRootNode();if(o instanceof Document)return Hs(o.getElementById(t));throw new Error("Invalid root node")}function Hi(e,t){if(t){if(typeof t=="function")return t;if(typeof t=="string"&&(t=Os(e,t)),t instanceof HTMLTemplateElement)return()=>t.content.cloneNode(!0);throw new Error("Invalid template")}}function Ys(e){return d(e,"template").switchMap(t=>t?A(Hi(e,t)):Oe().map(()=>Hi(e,e.children[0])))}function jd(e,t,o){return Ys(e).switchMap(r=>{let n=e.target?ve(e,e.target)??e:e;return r?Oi({source:t,render:o?(i,a,c)=>o(r(i,a,c)):r,append:n.append.bind(n)}):v})}var Yt=class extends m{invalid=!1};s(Yt,{tagName:"c-field-help",init:[u("invalid")],augment:[p(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${N("body-small")}
}
	`),y,e=>(e.slot||="help",d(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var _t=p(`
:host {
  display: block;
  position: relative;
  text-align: start;
  ${N("body-large")}
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
	${N("body-small")}
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
`),Sr=p(`
:host(:focus-within) slot[name=label] { color: var(--cxl-color-primary); }
slot[name=label] {
	${N("body-small")}
	height: 16px;
}
:host([floating]) slot[name=label] {
	display:none;
	transition: font var(--cxl-speed), height var(--cxl-speed), top var(--cxl-speed), left var(--cxl-speed);
}
:host([floating]) slot[name=label].novalue, :host([floating]) slot[name=label].value { display:block; }
`),_s=p(`
:host {
	border-radius: var(--cxl-shape-corner-xsmall) var(--cxl-shape-corner-xsmall) 0 0;
}
:host([floating]:not(:focus-within)) slot[name=label].novalue {
	${N("body-large")}
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

${he(".content")}
	`);function Xs(e){return f(Z(e,"registable.form",!1).tap(t=>{t.id==="form"&&t.target&&(e.input=t.target)}),ft("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var Us=()=>b("div",{className:"content"},b("slot",{name:"leading"}),b("div",{className:"body"},b("slot",{name:"label"}),b("slot",{id:"bodyslot"})),b("slot",{name:"trailing"}),b("div",{className:"indicator"}));function js(e){function t(x){n.next(x.touched&&x.invalid),e.toggleAttribute("invalid",n.value);let k=0,w=[];for(let D of a.assignedNodes())!(D instanceof HTMLElement)||D===l||("invalid"in D&&D.invalid?n.value&&(D.invalid===!0||D.invalid===x.validationResult?.key)?(k++,D.style.display="",w.push(nt(D))):D.style.display="none":w.push(nt(D)));let E=!n.value||k>0;l.textContent=E?"":x.validationMessage,E?l.remove():(l.parentElement||e.append(l),w.push(nt(l))),w.length?x.setAria("describedby",w.join(" ")):x.setAria("describedby",null)}function o(x){let k=e.input;if(k){if(e.toggleAttribute("inputdisabled",k.disabled),t(k),!x)return;x.type==="focus"?i.next(!0):x.type==="blur"&&i.next(!1)}}function r(){let x=e.input?.value,k=!e.input?.hasAttribute("autofilled")&&(!x||x.length===0);c.classList.toggle("novalue",k),c.classList.toggle("value",!k)}let n=ee(!1),i=ee(!1),a=b("slot",{name:"help"}),c=e.contentElement.children[1].children[0],l=b(Yt,{ariaLive:"polite"});return M(e).append(b("div",{className:"help"},a)),f(d(e,"input").switchMap(x=>x?f(A(void 0).tap(()=>{o(),queueMicrotask(r)}),h(x,"focusable.change").tap(o).tap(r),h(x,"focus").tap(o),h(x,"invalid").tap(o),h(x,"update").tap(r),f(h(x,"blur"),h(a,"slotchange")).raf(o),h(e.contentElement,"click").tap(()=>{x&&document.activeElement!==x&&!e.matches(":focus-within")&&!i.value&&x.focus()})):v),Xs(e))}var we=class e extends m{floating=!1;input;size;contentElement=Us();static{s(e,{init:[g("floating"),q("input"),re("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,js]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},kr=class extends we{};s(kr,{tagName:"c-field",augment:[_t,Sr,_s]});var Er=class extends we{};s(Er,{tagName:"c-field-bar",augment:[_t,p(`
:host {
	box-sizing: border-box;
	${O("surface-container-high")}
	${N("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 16px 12px; }
		`)]});var Cr=class extends we{};s(Cr,{tagName:"c-field-outlined",augment:[_t,Sr,p(`
:host { margin-top: 4px; }
.content {
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	border: 1px solid var(--cxl-color-outline);
	border-radius: var(--cxl-shape-corner-xsmall);
	transition: outline calc(var(--cxl-speed) / 2);
	outline: 0 solid var(--cxl-color-primary);
}
.indicator { display: none; }
slot[name=label] {
	position: absolute;	
	background-color: var(--cxl-color-surface);
	inset-inline-start: 12px;
	top: -8px;
}
::slotted([slot="label"]) { margin: 0 4px; }
:host([floating]:not(:focus-within)) slot[name=label].novalue {
	${N("body-large")}
	height: 0;
	top: var(--cxl-field-outlined-label-top, 16px);
	inset-inline-start: unset;
}
${Uo.map(e=>`:host([size="${e}"]) { --cxl-field-outlined-label-top: ${16+e*4}px }`)}
:host([invalid]) .content { border-color: var(--cxl-color-error); }
:host(:hover) .content, :host(:focus) .content { background-image: none; }
:host(:focus-within) .content {
	outline-width: 2px;
}
:host([inputdisabled]) {
	color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent);
}
:host([inputdisabled]) .content {
	border-color: color-mix(in srgb, var(--cxl-color-on-surface) 12%, transparent);
	color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent);
}
		`)]});var Xt=class extends pt{vflex=!1;gap;middle=!1};s(Xt,{tagName:"c-flex",init:[g("vflex"),g("gap"),g("middle")],augment:[rr("flex"),nr,p(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${Xe.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),y]});var Yi=class e extends m{elements=new Set;initialValue;static{s(e,{tagName:"c-form",augment:[C("form"),Q,t=>h(t,"submit",{capture:!0}).tap(o=>{o.preventDefault();let r;for(let n of t.elements)n.invalid&&(r??=n),n.touched=!0;r&&(r.focus(),o.stopPropagation(),o.stopImmediatePropagation())}),t=>ft("form",t,t.elements).tap(o=>{let r=o.target,n=r.name,i=t.initialValue;i&&n&&n in i&&(r.value=i[n])}),y]})}checkValidity(){let t=!0;for(let o of this.elements)o.invalid&&(t=!1),o.touched=!0;return t}reset(){for(let t of this.elements)t.formResetCallback()}submit(){Ae(this,"submit")}requestSubmit(){this.submit()}getElementByName(t){for(let o of this.elements)if(o.name===t)return o}setTouched(t){for(let o of this.elements)o.touched=t}setFormData(t){this.initialValue=t;for(let o in t){let r=this.getElementByName(o);r&&(r.value=t[o])}}getFormData(){let t={};for(let o of this.elements){let r="checked"in o?o.checked?o.value:void 0:o.value;o.name&&(t[o.name]=r)}return t}};function qs(e){let t=e.parentElement;for(;t;){if(t.tagName==="FORM"||t.tagName==="C-FORM")return t;t=t.parentElement}}var Ar=class extends m{};s(Ar,{tagName:"c-form-submit",augment:[Q,y,e=>Y(()=>{let t=qs(e);return t?f(Hn(t,"enter").tap(()=>e.click()),z(e).tap(()=>{if(t.tagName==="FORM"){let o;for(let r of t.elements)r instanceof ie&&(o=r,r.touched=!0);o?.focus()}t.requestSubmit()})):v})]});function Ws(e){let t=new CSSStyleSheet;return M(e).adoptedStyleSheets.push(t),d(e,"columns").raf(()=>{let o=`repeat(${e.columns}, minmax(0,1fr))`;t.replaceSync(`:host{grid-template-columns:${o}}`)})}var Nr=class extends m{rows;columns=12};s(Nr,{tagName:"c-grid",init:[u("columns"),u("rows")],augment:[y,p(`
:host{display:grid;gap:16px;box-sizing:border-box;}
${V("medium",":host{gap:24px}")}
`),Ws]});function $s(e,t){let o,r=t.key;if(r==="ArrowDown"&&e.goDown)o=e.goDown();else if(r==="ArrowRight"&&e.goRight)o=e.goRight();else if(r==="ArrowUp"&&e.goUp)o=e.goUp();else if(r==="ArrowLeft"&&e.goLeft)o=e.goLeft();else if(r==="Home")o=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(r==="End")o=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)o=e.other(t);else return null;return t.stopPropagation(),o&&t.preventDefault(),o}function ke(e){return h(e.host,"keydown").map(t=>$s(e,t)).filter(t=>!!t)}function Ks(e){return new S(t=>{let o=e.focus;e.focus=()=>{o.call(e),t.next()},t.signal.subscribe(()=>e.focus=o)})}function Mr({host:e,observe:t,getFocusable:o,getSelected:r,getActive:n=()=>Tr(e)}){let i=[];function a(){let c=i.find(l=>!l.disabled&&!l.hidden&&!xe(l));c&&(c.tabIndex=0)}return f(h(e,"focusin").tap(()=>{let c=n(),l=!1;for(let x of i)x.tabIndex=x===c?(l=!0,0):-1;l||a()}),(t??A(!0)).tap(()=>{if(i=o(),i.find(x=>x.tabIndex===0))return;let l=r?.();l?l.tabIndex=0:a()}),e instanceof HTMLElement?Ks(e).tap(()=>{let c=o();(c?.find(x=>x.tabIndex===0)??c?.[0])?.focus()}):v).ignoreElements()}function Tr(e){return le(e)?.activeElement??document.activeElement??void 0}function Dr({getFocusable:e,getActive:t}){return(o=1,r,n=xe)=>{let i=t(),a=e(),c=r??(i?a.indexOf(i):-1),l;do l=a[c+=o];while(l&&n(l));return l}}function zm(e){let{host:t,getFocusable:o,orientation:r,observe:n}=e,i=Dr(e),a=[];function c(l){l instanceof HTMLElement&&l.focus({focusVisible:!0})}return f((n??A(!0)).tap(()=>a=o()),Mr(e),ke({host:t,...r==="horizontal"?{goRight:()=>i(1),goLeft:()=>i(-1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>i(1,-1),goLast:()=>i(-1,a.length),other:e.customKey}).tap(c))}function Gs(e){return wo("list",e,e.items)}function Fr(e){return Mr({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:Gs(e)})}function Rr(e){return Dr({getFocusable:()=>e.items,getActive:()=>Tr(e)})}function Co(e){let t=Rr(e);return f(Fr(e),ke({host:e,goDown:()=>t(1),goUp:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length)}).tap(o=>o.focus()))}function Zs(e){let t=Rr(e);function o(r){return Math.round(r.getBoundingClientRect().left)}return f(Fr(e),ke({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let r=le(e)?.activeElement,n=r&&o(r);return t(-1,void 0,n!==void 0?i=>o(i)!==n:void 0)},goDown:()=>{let r=le(e)?.activeElement,n=r&&o(r);return t(1,void 0,n!==void 0?i=>o(i)!==n:void 0)}}).tap(r=>r.focus()))}var zr=class extends m{items=[]};s(zr,{tagName:"c-grid-list",augment:[C("grid"),p(":host{display:grid;box-sizing:border-box;}"),y,Zs]});var Lr=class extends m{pad;vertical=!1};s(Lr,{tagName:"c-hr",init:[g("pad"),g("vertical")],augment:[C("separator"),p(`
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
${Xe.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function Pr(e){let t=document.createElement("style");return f(B(o=>{let r=e.persistkey&&lr.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),o.signal.subscribe(()=>t.remove())}),ot(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let o=e.open?e.themeon:e.themeoff;e.persistkey&&lr.set(e.persistkey,o),li(ii[o]||o)}),z(e).tap(()=>e.open=!e.open))}var Ir=class extends m{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};s(Ir,{tagName:"c-toggle-theme",init:[u("persistkey"),u("usepreferred"),u("open"),u("themeon"),u("themeoff")],augment:[C("group"),Pr]});var Vr=class extends ye{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};s(Vr,{tagName:"c-icon-toggle-theme",init:[u("persistkey"),u("usepreferred"),u("open"),u("themeon"),u("themeoff")],augment:[Pr,e=>I(d(e,"iconon"),d(e,"iconoff"),d(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var Qs=()=>{let e;function t(){let o=document.adoptedStyleSheets.indexOf(e);o!==-1&&document.adoptedStyleSheets.splice(o,1)}addEventListener("message",o=>{let{theme:r}=o.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r),document.adoptedStyleSheets.push(e))})},Js=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},Br=class extends m{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};s(Br,{tagName:"c-iframe",init:[u("src"),u("srcdoc"),u("sandbox"),u("handletheme")],augment:[p(`
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
	`),e=>{let t=_e("iframe",{loading:"lazy"}),o=_e("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),o.style.display="none";function n(a){r.replaceSync(":host{height:"+a+"px}"),t.style.height="100%",t.style.opacity="1",o.style.display="none"}function i(a){if(a){let c=`<script type="module">
(${Js.toString()})();
(${Qs.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${a}${c}`,o.style.display=""}}return M(e).append(t,o),f(I(d(e,"srcdoc"),d(e,"src")).raf(async([a,c])=>{i(c?`<base href="${c}" />`+await fetch(c).then(l=>l.text()):a)}),h(window,"message").tap(a=>{let{height:c}=a.data;a.source===t.contentWindow&&c!==void 0&&n(c)}),d(e,"handletheme").switchMap(a=>a?h(t,"load").switchMap(()=>Tt.raf(c=>{let l=c?.css??"";t.contentWindow?.postMessage({theme:l},"*")})):v),d(e,"sandbox").tap(a=>a===void 0?t.removeAttribute("sandbox"):t.sandbox.value=a))}]});function Ut(e,t,o){return d(e,o).tap(r=>Mt(t,o,r))}var el="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function ze({host:e,input:t,toText:o,toValue:r,update:n}){t.className="cxl-native-input",t.setAttribute("style",el),t.setAttribute("form","__cxl_ignore__");function i(l){e.value=r?r(t.value||""):t.value,l.stopPropagation(),e.dispatchEvent(new Event(l.type,{bubbles:!0}))}function a(){let l=e.value,x=o?o(l,t.value):l||"";t.value!==x&&e.setInputValue(x)}function c(){t.ariaLabel=e.ariaLabel;let l=e.getAttribute("aria-labelledby");l?t.setAttribute("aria-labelledby",l):t.removeAttribute("aria-labelledby")}return f(Te(e,t),Y(()=>(c(),t.form?h(t.form,"reset").tap(i):v)),d(e,"value").tap(()=>{o&&t.matches(":focus")||a()}),h(t,"blur").tap(a),h(t,"input").tap(i),h(t,"change").tap(i),Ut(e,t,"disabled"),Ut(e,t,"name"),Ut(e,t,"autocomplete"),Ut(e,t,"spellcheck"),Ut(e,t,"autofocus"),oo(e,["aria-label","aria-labelledby"]).tap(c),n?n.tap(a):v,h(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),h(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var bt=class e extends ie{inputValue="";static{s(e,{init:[q("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,h(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity||null}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,o){o?this.inputEl.setAttribute(`aria-${t}`,o):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,o){$(this).setValidity({customError:t},o,this.inputEl),this.inputEl.setCustomValidity(t?o||"Invalid Field":"")}};function tl(e,t){return t.style.width="0",t.parentNode||e.append(t),f(f(h(t,"input"),h(t,"change")).map(o=>{if(o.stopPropagation(),e.dispatchEvent(new Event(o.type,{bubbles:!0})),t.files)return Array.from(t.files)}),z(e).tap(()=>t.click()).ignoreElements(),Pi(e).map(o=>{if(o.stopPropagation(),o.dataTransfer?.files.length)return Array.from(o.dataTransfer.files)}))}var Hr=class extends bt{value=void 0;inputEl=_e("input",{tabIndex:-1,type:"file"})};s(Hr,{tagName:"c-input-file",init:[q("value")],augment:[Q,y,e=>{let t=e.inputEl;return t.setAttribute("form","__cxl_ignore__"),e.append(t),f($o(e),tl(e,t).tap(o=>{e.value=o}))}]});var Yr=[p(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),_],_r=[...Yr,y],Se=class e extends bt{autofilled=!1;autocomplete;static{s(e,{init:[g("autofilled"),u("autocomplete")],augment:[t=>h(t.inputEl,"animationstart").tap(o=>{(o.animationName==="cxl-onautofillstart"||o.animationName==="cxl-onautofillend")&&(t.autofilled=o.animationName==="cxl-onautofillstart",K(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,o){this.inputEl.setSelectionRange(t,o)}getWindowSelection(){return this.shadowRoot?.getSelection?.()||getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},Or=class extends Se{value="";inputEl=b("input",{className:"input"})};s(Or,{tagName:"c-input-text",init:[u("value")],augment:[..._r,e=>e.append(e.inputEl),e=>ze({host:e,input:e.inputEl})]});var Xr=class e extends Se{value=void 0;formatter=ol;inputEl=b("input",{className:"input"});static{s(e,{init:[u("value")],augment:[y,t=>t.append(t.inputEl),t=>ze({host:t,input:t.inputEl,toText:(o,r)=>o!==void 0&&isNaN(o)?r:t.formatter(o),toValue:o=>{if(o===""){t.setValidity({key:"number",valid:!0});return}let r=Number(o);return t.setValidity({key:"number",valid:!isNaN(r)}),r}})]})}},Ur=class extends Xr{};s(Ur,{tagName:"c-input-number",augment:[...Yr]});function ol(e){return e===void 0||isNaN(e)?"":e.toString()}var _i=class e extends Se{value="";inputEl=b("input",{type:"password",className:"input"});static{s(e,{tagName:"c-input-password",init:[u("value")],augment:[..._r,t=>t.append(t.inputEl),t=>ze({host:t,input:t.inputEl})]})}};function jr(e){let t=At();return f(pe("field",e,o=>t.next(o)),t)}function Xi(e){let t;return jr(e).switchMap(o=>d(e,"input").switchMap(r=>r?A(r):o?d(o,"input").switchMap(n=>n?A(t=n):v):t?A(t):v))}var qr=class extends m{};s(qr,{tagName:"c-input-placeholder",augment:[p(`
:host {
	display: inline-block;
	pointer-events: var(--cxl-override-pointer-events, none);
	color: var(--cxl-color-on-surface-variant);
	position: absolute;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
	`),y,e=>{let t=mo(e);return e.shadowRoot?.adoptedStyleSheets.push(t),Xi(e).switchMap(o=>I(W(o),d(o,"value"),d(o,"inputValue")).raf(()=>{let r=o.inputValue??o.value,n=r===void 0||r==="";t.replaceSync(`:host{top:${o.offsetTop}px;left:${o.offsetLeft}px;width:${o.offsetWidth}px;height:${o.offsetHeight}px;${n?"":"display:none;"}`)}))}]});function Ui(e,t){return e?typeof e=="string"?(t.setAttribute("aria-label",e),v):it(e).tap(o=>{e.textContent&&t.setAttribute("aria-labelledby",o)}).finalize(()=>{t.removeAttribute("aria-labelledby")}):v}var Wr=class extends m{};s(Wr,{tagName:"c-label",augment:[p(`
:host {
	display: inline-block;
}`),y,e=>jr(e).switchMap(t=>"input"in t?d(t,"input").switchMap(o=>o?Ui(e,o):v):Ui(e,t)),e=>B(()=>{e.slot="label"})]});var $r=class extends m{items=[]};s($r,{tagName:"c-list",augment:[p(":host{display:block;padding:8px 0;}"),C("listbox"),y,Co]});var rl=p(`
:host {
	position: fixed;
	margin: 0;
	padding: 0;
	outline: 0;
	border: 0;
	display: block;
	border-radius: var(--cxl-shape-corner-xsmall);
	box-shadow: var(--cxl-elevation-2);
	${O("surface-container")}
}
::backdrop { overflow: hidden; }
:host([static]) { position: static; }
	`);function nl(e){function t(){e.exclusive&&!e.static&&G.popupOpened({element:e,close:()=>e.open=!1}),e.static||(e.popover??="auto",e.showPopover())}return d(e,"open").switchMap(o=>o?(t(),f(h(e,"keydown").tap(r=>{r.key==="Escape"&&(e.open=!1,e.returnTo?.focus(),r.preventDefault(),r.stopPropagation())}),h(e,"toggle").tap(r=>{let n=r.newState==="open";n||(e.open=n)}),L(e,"open").tap(r=>{!r&&e.popover&&e.hidePopover()}),h(e,"close").tap(r=>{r.target===e&&e.popover&&e.hidePopover()}))):v)}var jt=class extends Re{exclusive=!0;static=!1;trigger;returnTo};s(jt,{tagName:"c-popup",init:[u("exclusive"),g("static")],augment:[y,ht,rl,$e,nl]});var Kr=class extends jt{"motion-in"="fadeIn";"motion-out"="fadeOut";items=[];focusstart;setFocus(){let t=le(this)?.activeElement;if(!(t&&this.contains(t))){if(this.focusstart==="selected"){let o=this.items.find(r=>r.selected);if(o){o.focus();return}}this.items[0]?.focus()}}};s(Kr,{tagName:"c-menu",init:[u("focusstart")],augment:[C("menu"),p(fo()),Co,e=>d(e,"open").tap(t=>{t&&e.setFocus()})]});var il=[p(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${N("label-large")}
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
${he("c-ripple")}
	`),_,gi,y],qt=class extends ut{size};s(qt,{tagName:"c-nav-item",init:[re("size",e=>`{min-height:${56+e*8}px}`)],augment:[C("option"),...il]});var Gr=class extends ye{open=!1;target;icon="menu"};s(Gr,{tagName:"c-navbar-toggle",init:[u("target"),q("open")],augment:[e=>Vt(e).tap(({target:t,open:o})=>t.open=o)]});var yt=class extends Dt{duration=4e3;"motion-in"="slideInUp,fadeIn";"motion-out"="fadeOut";open=!1;static=!1};s(yt,{tagName:"c-snackbar",init:[g("open"),rt("duration"),u("motion-in"),u("motion-out"),u("static")],augment:[p(`
:host {
	display: inline-flex;
	justify-content: left;
	margin: 16px auto;
	border: 0; outline: 0;
	top: auto;
}
slot[name=action] { margin-inline-start: auto; display: block; }
	`),()=>b("slot",{name:"action"}),e=>d(e,"open").tap(t=>{t&&!e.static&&(e.popover="manual",e.showPopover())}),ht,$e,e=>h(e,"close").tap(()=>e.remove())]});var Wt=class extends m{queue=[];notify(t){let o=typeof t=="string"?b(yt,void 0,t):t instanceof HTMLElement?t:t=b(yt,t,t.content);return new Promise(r=>{this.queue.push([o,r]),this.queue.length===1&&this.notifyNext()})}notifyNext(){let[t,o]=this.queue[0],r=()=>{this.queue.shift(),t.removeEventListener("close",r),o(),this.queue.length&&this.notifyNext()};this.shadowRoot?.append(t),t.open=!0,t.addEventListener("close",r)}};s(Wt,{tagName:"c-snackbar-container",augment:[p(`
:host {
	position:relative; width: 100%; height: 0;
	display: flex; text-align:center; align-items: end;
	overflow: visible;
}`)]});var ji;function Xg(e){typeof e=="string"&&(e={content:e});let t=e.container;return t||(t=ji??=new Wt,document.body.appendChild(t)),t.notify(e)}function Ug(e){ji=e}function qi(e){return f(d(e,"selected").pipe(Kn(e,"selected")),pe("selectable",e),z(e).tap(()=>K(e,"selectable.action",e)))}var Zr=class extends m{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};s(Zr,{tagName:"c-option",init:[u("value"),q("view"),g("selected"),g("hidden"),g("focused")],augment:[C("option"),p(":host{display:contents} :host([hidden]){display:none;}"),dt,qi,e=>{let t;return f(d(e,"view").switchMap(o=>o?(t?.remove(),e.rendered=t=new o,t.appendChild(b("slot")),M(e).append(t),f(d(e,"selected").tap(r=>t?.toggleAttribute("selected",r)),d(e,"focused").tap(r=>t?.toggleAttribute("focused",r)))):(e.rendered=t=void 0,v)))}]});var Qr=class extends m{};s(Qr,{tagName:"c-page",augment:[vo,p(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${O("background")}
}`),y]});var Jr=class extends m{value=1/0;color},Wi={duration:2e3,iterations:1/0,easing:"cubic-bezier(0.4, 0, 0.6, 1)"};s(Jr,{tagName:"c-progress",init:[u("value"),oe("color","primary",".bar")],augment:[C("progressbar"),co("valuemax","1"),p(`
:host {
	position:relative;
	display:block; height: 4px; 
	background-color:var(--cxl-color-secondary-container);
	border-radius: 2px; overflow:hidden;
	border-inline-end: 4px solid var(--cxl-color-primary);
}
:host([indeterminate]) { border-inline-end: 0; }
.bar { height: 100%; will-change: transform; }
:host(:not([indeterminate])) .bar { transform-origin: left center; }
:host(:dir(rtl):not([indeterminate])) .bar { transform-origin: right center; }
	`),e=>{let t,o,r=b("div",{className:"bar"}),n=b("div",{className:"bar"});return M(e).append(r,n),d(e,"value").tap(i=>{i!==1/0&&i>1?i=1:i<0&&(i=0),e.ariaValueNow=i===1/0?null:String(i),e.ariaBusy=String(i!==1),e.toggleAttribute("indeterminate",i===1/0),i===1/0?(t=ne({target:r,animation:{kf:{transform:["translateX(-100%) scaleX(0.3)","translateX(0%) scaleX(0.8)","translateX(100%) scaleX(0.3)"]},options:Wi}}),o=ne({target:n,animation:{kf:{transform:["translate(-150%, -100%) scaleX(0.4)","translate(-50%, -100%) scaleX(0.6)","translate(100%, -100%) scaleX(0.4)"]},options:Wi}})):(t?.cancel(),o?.cancel()),r.style.transform=i===1/0?"":"scaleX("+i+")"})},dt]});var en=class extends m{value=1/0};s(en,{tagName:"c-progress-circular",init:[rt("value")],augment:[C("progressbar"),co("valuemax","1"),p(`
:host {
	display: inline-block;
	width: 48px;
	height: 48px;
}
svg { width: 100%; height: 100% }
		`),e=>{let t=mt("svg",{viewBox:"0 0 100 100"}),o=mt("circle",{cx:"50%",cy:"50%",r:"45",style:"stroke:var(--cxl-color-secondary-container);fill:transparent;stroke-width:10%;stroke-dasharray:282.743px"}),r=mt("circle",{cx:"50%",cy:"50%",r:"45",style:"stroke:var(--cxl-color-primary);fill:transparent;transition:stroke-dashoffset var(--cxl-speed);stroke-width:10%;transform-origin:center;stroke-dasharray:282.743px"});return t.append(o,r),M(e).append(t),d(e,"value").switchMap(n=>{if(e.ariaValueNow=n===1/0?null:String(n),e.ariaBusy=String(n!==1),n!==1/0){let a=282.743-282.743*Math.max(0,Math.min(1,n));r.style.strokeDashoffset=`${a}px`,r.style.transform="rotate(-90deg)"}return n===1/0?f(Ft({target:e,animation:"spin",options:{iterations:1/0,duration:2e3,easing:"linear"}}),Ft({target:r,animation:{options:{duration:4e3,iterations:1/0,easing:"cubic-bezier(.35,0,.25,1)"},kf:((i,a)=>[{offset:0,strokeDashoffset:i,transform:"rotate(0)"},{offset:.125,strokeDashoffset:a,transform:"rotate(0)"},{offset:.12501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(72.5deg)"},{offset:.25,strokeDashoffset:i,transform:"rotateX(180deg) rotate(72.5deg)"},{offset:.2501,strokeDashoffset:i,transform:"rotate(270deg)"},{offset:.375,strokeDashoffset:a,transform:"rotate(270deg)"},{offset:.37501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(161.5deg)"},{offset:.5,strokeDashoffset:i,transform:"rotateX(180deg) rotate(161.5deg)"},{offset:.5001,strokeDashoffset:i,transform:"rotate(180deg)"},{offset:.625,strokeDashoffset:a,transform:"rotate(180deg)"},{offset:.62501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(251.5deg)"},{offset:.75,strokeDashoffset:i,transform:"rotateX(180deg) rotate(251.5deg)"},{offset:.7501,strokeDashoffset:i,transform:"rotate(90deg)"},{offset:.875,strokeDashoffset:a,transform:"rotate(90deg)"},{offset:.87501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(341.5deg)"},{offset:1,strokeDashoffset:i,transform:"rotateX(180deg) rotate(341.5deg)"}])((282.743*(1-.05)).toString(),(282.743*(1-.8)).toString())}})):v})},dt]});var tn=class extends m{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};s(tn,{tagName:"c-r",init:[g("xl"),g("lg"),g("md"),g("sm"),g("xs")],augment:[p(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${V("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${V("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${V("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${V("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),y]});var al=/([^&=]+)=?([^&]*)/g,sl=/:([\w_$@]+)/g,ll=/\/\((.*?)\)/g,cl=/(\(\?)?:\w+/g,pl=/\*\w+/g,fl=/[-{}[\]+?.,\\^$|#\s]/g,ul=/([^#]*)(?:#(.+))?/,cn="@@cxlRoute",ae={location:window.location,history:window.history};function dl(e){let t=[];return[new RegExp("^/?"+e.replace(fl,"\\$&").replace(ll,"\\/?(?:$1)?").replace(cl,function(r,n){return t.push(r.substr(1)),n?r:"([^/?]*)"}).replace(pl,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function $i(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function on(e,t){return t?e.replace(sl,(o,r)=>t[r]||""):e}function ml(e){let t={},o;for(;o=al.exec(e);)t[o[1]]=decodeURIComponent(o[2]);return t}var rn=class{path;regex;parameters;constructor(t){this.path=t=$i(t),[this.regex,this.parameters]=dl(t)}_extractQuery(t){let o=t.indexOf("?");return o===-1?{}:ml(t.slice(o+1))}getArguments(t){let o=this.regex.exec(t),r=o&&o.slice(1);if(!r)return;let n=this._extractQuery(t);return r.forEach((i,a)=>{let c=a===r.length-1?i||"":i?decodeURIComponent(i):"";n[this.parameters[a]]=c}),n}test(t){return this.regex.test(t)}toString(){return this.path}},nn=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new rn(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let o=this.definition.render();o[cn]=this;for(let r in t)t[r]!==void 0&&(o[r]=t[r]);return o}},an=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(o=>o.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(o=>o.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function xl(e){return e[cn]}function wt(e){let t=ul.exec(e);return{path:$i(t?.[1]||""),hash:t?.[2]||""}}var gl={getHref(e){return e=typeof e=="string"?wt(e):e,`${ae.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ae.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let o=this.getHref(e);o!==`${location.pathname}${location.search}${location.hash}`&&ae.history.pushState({url:e},"",o)}},deserialize(){return{path:ae.location.search.slice(1),hash:ae.location.hash.slice(1)}}},hl={getHref(e){return e=typeof e=="string"?wt(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ae.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let o=this.getHref(e);o!==`${location.pathname}${location.search}${location.hash}`&&ae.history.pushState({url:e},"",o||"/")}},deserialize(){return{path:ae.location.pathname,hash:ae.location.hash.slice(1)}}},Ki={getHref(e){return e=typeof e=="string"?wt(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Ki.getHref(e);ae.location.hash!==t&&(ae.location.hash=t)},deserialize(){return wt(ae.location.hash.slice(1))}},vt={hash:Ki,path:hl,query:gl},sn=class{callbackFn;state;routes=new an;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let o=new nn(t);return this.routes.register(o),o}go(t){this.lastGo=t;let o=typeof t=="string"?wt(t):t,r=o.path,n=this.state?.url;if(r!==n?.path){let i=this.routes.findRoute(r);if(!i)throw new Error(`Path: "${r}" not found`);let a=i.path?.getArguments(r);if(i.redirectTo)return this.go(on(i.redirectTo,a));let c=this.execute(i,a);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:o,arguments:a,route:i,current:c,root:this.root})}else this.state&&o.hash!=n?.hash&&this.updateState({...this.state,url:o})}getPath(t,o){let r=this.routes.get(t),n=r&&r.path;return n&&on(n.toString(),o)}isActiveUrl(t){let o=wt(t);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(n=>{let i=n[cn],a=this.state?.arguments;if(i?.path?.test(o.path)&&(!o.hash||o.hash===r.hash)){if(a){let c=i.path.getArguments(o.path);for(let l in c)if(a[l]!=c[l])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,o){let r=this.instances[t],n;if(r)for(n in o){let i=o[n];i!==void 0&&(r[n]=i)}return r}executeRoute(t,o,r){let n=t.parent,i=n&&this.routes.get(n),a=t.id,c=i&&this.executeRoute(i,o,r),l=this.findRoute(a,o)||t.create(o);return c?l&&l.parentNode!==c&&c.appendChild(l):this.root=l,r[a]=l,l}discardOldRoutes(t){let o=this.instances;for(let r in o){let n=o[r];t[r]!==n&&(n.parentNode?.removeChild(n),delete o[r])}}execute(t,o){let r={},n=this.executeRoute(t,o||{},r);return this.discardOldRoutes(r),this.instances=r,n}},Le=new Ge,Gi=new Ge,j=new sn(()=>Le.next());function Th(e){return t=>{let o=typeof e=="string"?{path:e}:e;j.route({...o,render:()=>new t})}}function Dh(e=""){return t=>{let o=typeof e=="string"?{path:e}:e;j.route({...o,isDefault:!0,render:()=>new t})}}function Fh(e){return Le.map(()=>j.isActiveUrl(e))}function bl(e){let t=e;for(;t=t.parentElement;)if(t.scrollTop!==0)return t.scrollTo(0,0)}function yl(e){let t;return Le.tap(()=>{let{root:o}=j.getState();o.parentNode!==e?e.appendChild(o):t&&t!==o&&t.parentNode&&e.removeChild(t),t=o}).raf(()=>{let o=j.getState().url;o.hash?e.querySelector(`#${o.hash},a[name="${o.hash}"]`)?.scrollIntoView():e.parentElement&&history.state?.lastAction&&history.state?.lastAction!=="pop"&&bl(e)})}function Zi(e,t=vt.query){return f(B(()=>Gi.next(t)),e.tap(()=>j.go(t.deserialize())),Le.tap(()=>t.serialize(j.getState().url))).catchError(o=>{if(o?.name==="SecurityError")return v;throw o})}function vl(){return Le.switchMap(()=>{let e=j.getState(),t=[],o=e.current;do{let r=o.routeTitle;r&&t.unshift(r instanceof S?r:A(r))}while(o=o.parentNode);return I(...t)}).tap(e=>document.title=e.join(" - "))}function Qi(){return de(A(location.hash.slice(1)),h(window,"hashchange").map(()=>location.hash.slice(1)))}var Ao;function wl(){if(!Ao){Ao=new Ct(history.state);let e=history.pushState;history.pushState=function(...t){let o=e.apply(this,t);return history.state&&(history.state.lastAction="push"),Ao.next(history.state),o}}return f(h(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),Ao)}function Ji(){let e;return f(Qi(),wl()).map(()=>window.location).filter(t=>{let o=t.href!==e;return e=t.href,o})}function kl(e,t=vt.query,o){let r=typeof t=="string"?vt[t]:t,n=o||(r===vt.hash?Qi():Ji());return f(yl(e),Zi(n,r),vl())}function Rh(e=vt.query,t){return o=>kl(o,e,t)}var zh=Le.raf().map(()=>{let e=[],t=j.getState(),o=t.current;do o.routeTitle&&e.unshift({title:o.routeTitle,first:o===t.current,path:Sl(o)});while(o=o.parentNode);return e});function Sl(e){let t=xl(e);return t&&on(t.path?.toString()||"",j.state?.arguments||{})}function Lh(e){return z(e).tap(t=>{t.preventDefault(),e.href!==void 0&&(e.external?location.assign(e.href):j.go(e.href))})}function No(e,t,o=t){return f(I(Gi,ot(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),z(t).tap(r=>{e.target||r.preventDefault()}),z(o).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):j.go(e.href))}))}function El(e,t){let o=document.createElement("div");return o.style.display="contents",o.routeTitle=t,o.appendChild(e.content.cloneNode(!0)),o}var ln=class extends m{strategy="query";get state(){return j.state}go(t){return j.go(t)}};s(ln,{tagName:"c-router",init:[u("strategy")],augment:[e=>{function t(o){let r=o.dataset;if(r.registered)return;r.registered="true";let n=r.title||void 0;j.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:o.hasAttribute("data-default"),redirectTo:r.redirectto,render:El.bind(null,o,n)})}return Oe().switchMap(()=>{for(let o of Array.from(e.children))o instanceof HTMLTemplateElement&&t(o);return f(to(e).tap(o=>{o.type==="added"&&o.value instanceof HTMLTemplateElement&&t(o.value)}),d(e,"strategy").switchMap(o=>{let r=vt[o];return Zi(Ji(),r).catchError((n,i)=>(console.error(n),i))}))})}]});function fn(e,t=e){return f(Cl(e,t).ignoreElements(),Le.map(()=>e.href!==void 0&&j.isActiveUrl(e.href)))}function Cl(e,t=e){let o=b("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return o.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,M(e).append(o),f(No(e,o),h(o,"click").tap(r=>{r.stopPropagation(),Nt(r)||e.dispatchEvent(new PointerEvent(r.type,r)),K(e,"toggle.close",void 0)}),z(t).tap(r=>{Nt(r)&&o.click()}))}var pn=class extends m{href};s(pn,{tagName:"c-router-selectable",init:[u("href")],augment:[Q,()=>b("slot"),e=>Y(()=>{let t=e.parentElement;return fn(e,t).raf(o=>{t.selected=o})})]});var un=class extends qt{href;external=!1;target};s(un,{tagName:"c-router-item",init:[u("href"),u("external"),u("target")],augment:[e=>fn(e).tap(t=>{e.selected=t})]});var $t=class extends m{href;focusable=!1;external=!1;dismiss=!1;target};s($t,{tagName:"c-router-link",init:[u("href"),u("focusable"),u("external"),u("target"),u("dismiss")],augment:[p(`
:host {
  display: contents;
  text-decoration: none;
}
.link {
  display: contents;
  outline: 0;
  text-decoration: inherit;
  color: inherit;
  cursor: pointer;
}
	`),e=>{let t=b("a",{className:"link"},b("slot"));return M(e).append(t),f(d(e,"focusable").tap(o=>t.tabIndex=o?0:-1),We(e),No(e,t))}]});var dn=class extends $t{focusable=!0};s(dn,{tagName:"c-router-a",augment:[p(`
:host{text-decoration:underline;}
.link { display:inline-block; }
:host(:focus-within) .link { outline:var(--cxl-color-primary) auto 1px; }
`)]});function Al(e){function t(){T=a[k],o(),St=!1}function o(){P=Math.min(Math.round(F*Ie),D),se=(F-Math.floor(T/Ie))/(P-T||1),(!isFinite(se)||se<=0)&&(se=.01)}function r(ue){throw console.error(`Faulty element detected: 
The provided element has an invalid or unmeasurable size. Check that the "${k}" of the element is not zero or negative. Make sure the element is styled properly and any necessary dimensions are set correctly before rendering.`),console.log(ue),new Error("Rendered element size returned invalid value.")}function n(){St&&t();let ue=Fo=a[E],An=se*ue;kt=An|0;let Ro=Math.max(Math.min(kt,F-R+1),0),Nn=kt+R>F?1/0:T,Mn=An-kt,Pe=Ro,Gt=0,Tn=0,Ve=0,Dn=0,Et=0;for(R=0,Ro>0?Ve=-(c(Pe-1,Gt++,"pre")[k]+Mn*Ie):Ve=-Mn*Ie;Pe>=0&&Tn<Nn&&Pe<F;){let Ee=c(Pe++,Gt++,"on"),zo=Ee[k];zo<=0&&r(Ee),R===0&&(Dn=Ee[w]),Et=Ee[w]+zo,Tn=Et+Ve,R++}if(Pe<F&&Nn&&c(Pe,Gt++,"post"),x?.(Gt),R>0){let Ee=(Et-Dn)/R;Ee!==Ie&&(Ie=Ie*.75+Ee*.25)}return R>1&&kt+R>=F&&(Ve=T-Et,Ve>0&&(Ve=0)),Cn?(t(),Cn=!1):ue+Et>P&&o(),{start:Ro,end:Pe,totalSize:P,count:R,offset:Ve}}let{axis:i,scrollElement:a,render:c,refresh:l,remove:x}=e,k=i==="x"?"offsetWidth":"offsetHeight",w=i==="x"?"offsetLeft":"offsetTop",E=i==="x"?"scrollLeft":"scrollTop",D=5e6,F=e.dataLength,R=0,T=0,P=0,se=0,Ie=50,kt=0,Cn=!0,St=!0,Fo=NaN,na=h(a,"scroll",{passive:!0});return f(l?.tap(ue=>{ue?.dataLength!==void 0&&(F=ue.dataLength,St=!0),Fo=NaN})??v,io(a).switchMap(ue=>ue?f(W(a).tap(()=>St=!0),na).raf():v)).filter(()=>St||Fo!==a[E]).map(n)}function nb(e){let{axis:t,host:o,translate:r=!0}=e,n=e.scrollElement||o.parentElement;if(!n)throw"scrollElement option could not be resolved.";let i=document.createElement("div"),a=t==="x"?"width":"height";i.style.position="absolute",i.style.width=i.style.height="1px",i.style.top=i.style.left="0",(e.scrollContainer??n).appendChild(i),o.style.position="sticky",o.style.top=o.style.left="0",r&&(o.style.translate="0 0");let c=0,l=!1;return Al({...e,scrollElement:n}).tap(({totalSize:x,offset:k})=>{if(r)if(k!==0){let w=k|0;o.style.translate=t==="x"?`${w}px 0`:`0 ${w}px`,l=!0}else l&&(o.style.translate="0 0",l=!1);c!==x&&(i.style[a]=`${x}px`,c=x)}).finalize(()=>i.remove())}function Nl({host:e,target:t,position:o,onToggle:r,whenClosed:n=v}){return i=>(t.popover??="auto",t.togglePopover(i),r?.(i),i?f(W(e),h(window,"resize"),h(window,"scroll",{capture:!0,passive:!0})).tap(o):n)}function ea(e){let{host:t,beforeToggle:o,target:r}=e,n=Nl({...e,whenClosed:z(t).tap(()=>{t.open=!0})});return f(h(r,"toggle").tap(i=>{let a=i.newState==="open";t.open=a}),d(t,"open").raf().switchMap(i=>(o?.(i),t.ariaExpanded=i?"true":"false",n(i))))}function ta({host:e,input:t,handleOther:o=!1,axis:r}){let n=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function i(w=1){if(e.open===!1){e.open=!0;let E=n();requestAnimationFrame(()=>{E?.focused&&x(E)})}else return a(w)}function a(w=1,E){let D=n(),F=E??(D?e.options.indexOf(D):-1),R;do R=e.options[F+=w];while(R?.hidden);return R}function c(w){let E=w.key;if(/^\w$/.test(E)){let D=n(),F=D?e.options.indexOf(D):-1;if(F===-1)return;let R=F;R+1>=e.options.length&&(F=0);let T=new RegExp(`^\\s*${E}`,"i"),P;for(;P=e.options[++F];)if(!P.hidden&&P.textContent?.match(T))return P;if(R===0)return;for(F=0;F<R&&(P=e.options[F++]);)if(!P.hidden&&P.textContent?.match(T))return P}}let l=()=>e.options.find(w=>w.focused);function x(w){for(let E of e.options)E.focused=!1;w?(w.focused=!0,t?.setAria("activedescendant",nt(w)),w.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let k=w=>K(w,"selectable.action",w);return f(ke({host:t??e,...r==="x"?{goLeft:()=>i(-1),goRight:()=>i(1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>e.open!==!1?a(1,-1):void 0,goLast:()=>e.open!==!1?a(-1,e.options.length):void 0,other:o?c:void 0}).tap(w=>{e.open===!1&&w?k(w):x(w)}),h(t??e,"focus").tap(()=>x(n())),ro(t??e).tap(w=>{let E=l();e.open!==!1&&E?(w.stopPropagation(),k(E)):e.open===!1&&(e.open=!0)}))}function Ml(e){return new S(t=>{f(wo("selectable",e,e.options,o=>{if(o.type==="connect"&&(o.target.view=e.optionView,o.target.selected))return e.defaultValue===void 0&&(e.defaultValue=o.target.value),t.next(o.target);let r;for(let n of e.options)n.hidden||!n.parentNode||n.selected&&(r?n.selected=!1:r=n);t.next(r)}),Z(e,"selectable.action").tap(o=>{if(!e.disabled&&o&&e.options?.includes(o)){let r=e.value!==o.value;t.next(o),r&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var Ke={},Mo=class e extends ie{options=[];_value;_selected=Ke;static{s(e,{init:[u("value"),q("selected")],augment:[t=>Ml(t).tap(o=>{(!o||o!==t.selected)&&t.setSelected(o)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===Ke?this.options[0]?.value:this._value}get selected(){return this._selected===Ke&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==Ke&&this._selected.value===t){this._value=t;return}else for(let o of this.options)if(o.value===t){this._value=t,this.setSelected(o);return}this._selected!==Ke?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let o of this.options)o.focused=o.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==Ke&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=Ke)}};var Tl=p(`
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
`),Mb=p(`
${fo("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function Dl(e,t){return()=>{let o=e.parentElement instanceof we?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${o.bottom}px`,t.style.left=`${o.x}px`,t.style.minWidth=`${o.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-o.bottom-16,280)}px`}}function Fl({host:e,target:t,input:o,position:r,beforeToggle:n,onToggle:i,handleOther:a,axis:c}){return f(ta({host:e,input:o,handleOther:a,axis:c}),h(o??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),ea({host:e,target:t,position:r??Dl(e,t),beforeToggle:n,onToggle:i}))}function Rl(e){let{host:t}=e;return f(Tl(t)??v,_(t)??v,Te(t),Fl(e))}var To=class extends m{};s(To,{tagName:"c-select-option",augment:[p(`
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
		`),y]});var mn=class extends Mo{open=!1;optionView=To;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let o of this.options)o!==t&&(o.slot="");t&&(t.slot="selected")}}};s(mn,{tagName:"c-select",init:[g("open")],augment:[C("listbox"),p(`
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
	${O("surface-container")}
	border: 0;
	transform-origin: top;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-2);
	visibility:visible;
}
		`),e=>{let t=b("div",{className:"menu"},b("slot")),o=b("slot",{name:"selected"}),r=t.style,n=mo(e),i=0,a=0;M(e).append(t,o,Pt({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function c(){if(e.open)a=e.selected?.rendered?.offsetHeight??0;else{r.cssText="";let l=e.options.reduce((x,k)=>Math.max(x,k?.rendered?.offsetWidth??0),0);n.replaceSync(`:host{width:${l}px}`)}}return f(f(et(e),Me()).raf(c),Rl({host:e,target:t,handleOther:!0,beforeToggle(l){c();let x=e.selected;x&&(x.slot=l?"":"selected"),t.classList.toggle("open",l)},onToggle(l){let x=e.selected;!l&&x&&(i=x.rendered?.offsetHeight??0)},position(){let l=e.parentElement??e,x=Math.round((a-i)/2),k=e.selected?.rendered,w=l.getBoundingClientRect(),E=e.getBoundingClientRect(),D=E.top-14,F,R=k?k.offsetTop:0;R>D&&(R=D),F=t.scrollHeight;let T=window.innerHeight-E.top+8+R,P=E.top-x-R;F>T?F=T:F<E.height&&(F=E.height),r.top=P+"px",r.left=w.left+"px",r.maxHeight=F+"px",r.minWidth=w.width+"px",r.transformOrigin=`${R}px`}}))}]});var oa=class e extends ie{value="on";checked=!1;defaultChecked=!1;static{s(e,{tagName:"c-switch",init:[u("value"),g("checked")],augment:[C("switch"),be,p(`
:host {
	position: relative;
	box-sizing: border-box;
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	width: 52px;
	height: 32px;
	border: 2px solid var(--cxl-color-outline);
	border-radius: var(--cxl-shape-corner-full);
	background-color: var(--cxl-color-surface-container-highest);
}
:host([checked]) {
	border-color: var(--cxl-color-primary);
	background-color: var(--cxl-color-primary);
}
.knob {
	transition: scale var(--cxl-speed), translate var(--cxl-speed);
	width: 28px;
	height: 28px;
	border-radius: var(--cxl-shape-corner-full);
	background-color: var(--cxl-color-outline);
	scale: 0.5714;
}
:host([checked]) .knob {
	background-color: var(--cxl-color-on-primary);
	scale: 0.8571;
	translate: 20px 0;
}
:host(:active) .knob {
	width: 28px;
	height: 28px;
	scale: 1;
}
:host([disabled]) .knob { opacity: 38%; }
:host([disabled]) {
	background-color: color-mix(in srgb, var(--cxl-color-surface-container-highest) 12%, transparent);
	border-color: color-mix(in srgb, var(--cxl-color-on-surface) 12%, transparent);
}
:host([disabled][active]) {
	background-color: color-mix(in srgb, var(--cxl-color-on-surface) 12%, transparent);
}
.mask {
	transition: translate var(--cxl-speed);
	display: block;
	position: absolute;
	left: -8px;
	width: 40px; height: 40px;
	border-radius: 100%;
	overflow: hidden;
}
${he(".mask")}
:host([checked]) .mask { translate: 20px 0; }
		`),t=>{t.defaultChecked=t.checked},_,()=>b("div",{className:"knob"}),()=>b("div",{className:"mask"}),fr]})}formResetCallback(){this.checked=this.defaultChecked,this.touched=!1}setFormValue(t){$(this).setFormValue?.(this.checked?t:null)}};var xn=class extends m{font};s(xn,{tagName:"c-t",init:[g("font")],augment:[p(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${ti.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${N("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${N("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${N("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${N("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${N("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${N("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),y,e=>d(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var gn=class extends m{selected;tabs=new Set;variant};s(gn,{tagName:"c-tabs",init:[q("selected"),g("variant")],augment:[C("tablist"),p(`
			:host {
				background-color: var(--cxl-color-surface);
				color: var(--cxl-color-on-surface);
				flex-shrink: 0;
				position: relative;
				overflow-y: hidden;
				display: flex;
				align-items: center;
				overflow-x: auto;
				border-bottom: 1px solid var(--cxl-color-surface-variant);
				--cxl-tabs-direction: column;
				--cxl-tabs-height: 63px;
			}
			.selected {
				transform-origin: left;
				background-color: var(--cxl-color-primary);
				height: 3px;
				border-radius: 3px 3px 0 0;
				width: 100px;
				display: none;
				position:absolute;
				left: 0;
				transition: transform var(--cxl-speed);
				bottom: 0;
			}
			:host([variant=secondary]) {
				--cxl-tabs-direction: row;
				--cxl-tabs-height: 47px;
			}
			:host([variant=secondary]) .selected {
				height: 2px;
				margin-top: -2px;
				border-radius: 0;
			}
		`),y,e=>{function t(o=1){let r=Array.from(e.tabs),n=e.selected||r[0],i=r.indexOf(n);return i===-1?null:r[i+o]||null}return ke({host:e,goRight:t.bind(null,1),goLeft:t.bind(null,-1),goFirst:()=>Array.from(e.tabs)[0]||null,goLast:()=>Array.from(e.tabs)[e.tabs.size-1]||null}).tap(o=>{o&&(o.click(),o.focus?.())})},e=>{let t=new te;return M(e).append(b(ge,{className:"selected",$:o=>f(Me(),d(e,"selected"),d(e,"variant"),t,W(e)).raf(()=>{if(xe(e))return;let r=e.selected;if(!r)return o.style.transform="scaleX(0)";let n=r.offsetLeft;if(e.variant==="secondary"){let i=r.clientWidth/100;o.style.transform=`translate(${n}px, 0) scaleX(${i})`,o.style.display="block"}else{let i=document.createRange();i.selectNodeContents(r);let{width:a}=i.getBoundingClientRect(),c=n+(r.clientWidth-a)/2,l=a/100;o.style.transform=`translate(${c}px, 0) scaleX(${l})`,o.style.display="block"}e.scrollWidth!==r.clientWidth&&(e.scrollLeft=n-32)})})),ft("tabs",e,e.tabs).raf().switchMap(o=>{let r=[];for(let n of o.elements)r.push(d(n,"selected").tap(i=>{i?(e.selected&&e.selected!==n&&(e.selected.selected=!1),e.selected=n):e.selected===n&&(e.selected=void 0),n.tabIndex=i?0:-1}),W(n).tap(()=>t.next()));return f(...r)})}]});var Do=class extends m{selected=!1;touched=!1;disabled=!1;name};s(Do,{init:[g("touched"),g("selected"),g("disabled"),u("name")],augment:[C("tab"),be,e=>pe("tabs",e),e=>d(e,"name").switchMap(t=>t?z(e).tap(()=>e.selected=!0):v),e=>d(e,"selected").tap(t=>{e.setAttribute("aria-selected",t?"true":"false")})]});var hn=class extends Do{};s(hn,{tagName:"c-tab",augment:[p(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	box-sizing: border-box;
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	font: var(--cxl-font-title-small);
	letter-spacing: var(--cxl-letter-spacing-title-small);
	flex-shrink: 0;
	flex-grow: 1;
	padding: 7px 16px 8px 16px;
	min-height: 47px;
	flex-direction: var(--cxl-tabs-direction, row);
	text-decoration: none;
	justify-content: center;
	display: inline-flex;
	gap: 4px 8px;
	align-items: center;
	cursor: pointer;
	min-width: 90px;
	position: relative;
}
:host([selected]) { 
	--cxl-color-on-surface: var(--cxl-color-primary);
}
${V("small",":host { flex-grow: 0 }")}
		`),J,_,st,y]});var bn=class extends m{};s(bn,{tagName:"c-table",augment:[C("table"),p(`
:host {
	--cxl-color-outline: var(--cxl-color-outline-variant);
	box-sizing: border-box;
	display: table;
	width: 100%;
	/* Hide overflow for draggable columns */
	overflow: hidden;
	outline: 1px solid var(--cxl-color-outline);
	border-bottom: 0;
	border-radius: 24px;
	${N("body-large")}
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	outline-offset: -1px;
}
		`),y]});var yn=class extends m{};s(yn,{tagName:"c-tbody",augment:[C("rowgroup"),p(":host{display:table-row-group}"),y]});var vn=class extends m{};s(vn,{tagName:"c-td",augment:[C("cell"),p(`
:host {
	box-sizing: border-box;
	display: table-cell;
	padding: 0 16px;
	height: 51px;
	vertical-align: middle;
	border-bottom: 1px solid var(--cxl-color-outline);
}
		`),y]});var wn=class extends Se{value="";inputEl=document.createElement("textarea")};s(wn,{tagName:"c-textarea",init:[u("value")],augment:[y,e=>e.append(e.inputEl),e=>ze({host:e,input:e.inputEl}),_,e=>{let t=new CSSStyleSheet;return t.replaceSync(":host{flex-grow:1;position:relative;}"),e.shadowRoot?.adoptedStyleSheets.push(t),f(d(e,"value"),W(e.inputEl),Me()).raf(()=>{let o=e.inputEl.style;o.height="0";let r=e.inputEl.scrollHeight;t.replaceSync(`:host{flex-grow:1;position:relative;height:${r}px}`),o.height="100%"})}]});function ra({element:e,relativeTo:t,position:o,container:r}){if(o==="none")return;if(r||=G.currentPopupContainer||G.popupContainer||document.body,e.parentNode||r.appendChild(e),typeof o=="function")return o(e);let n=t.getBoundingClientRect(),i=e.style,a=Math.max(r.offsetWidth-e.offsetWidth-16,16),c=Math.max(r.offsetHeight-e.offsetHeight-16,16);i.left=i.top=i.width=i.transformOrigin="";let l=()=>getComputedStyle(e).direction==="rtl",x=0,k=0,w;(o==="auto"||!o)&&(o="center bottom");for(let E of o.split(" "))if(E==="right"||E==="end"&&!l()||E==="start"&&l())x=n.right;else if(E==="left-to-right"||E==="start-to-end"&&!l())x=n.left;else if(E==="left"||E==="end"&&l()||E==="start"&&!l())x=n.left-e.offsetWidth;else if(E==="center")x=n.left+n.width/2-e.offsetWidth/2;else if(E==="right-to-left"||E==="end-to-start"&&l())x=n.right-e.offsetWidth;else if(E==="bottom")k=n.bottom;else if(E==="top")k=n.top-e.offsetHeight;else if(E==="middle")k=n.top+n.height/2-e.offsetHeight/2;else if(E==="fill")x=n.left,w=n.width;else if(E==="top-to-bottom")k=n.top;else if(E==="bottom-to-top")k=n.bottom-e.offsetHeight;else throw new Error(`Invalid position "${E}"`);x<16?x=16:x>a&&(x=a),k<16?k=16:k>c&&(k=c),i.left=`${x}px`,i.top=`${k}px`,w&&(i.minWidth=`${w}px`)}function zl(e){let t=f(L(e,"position"),h(window,"scroll",{capture:!0,passive:!0})),o=r=>ra({element:r,relativeTo:(typeof e.relative=="string"?ve(e,e.relative):e.relative)??e.firstElementChild??e,position:e.position||"auto",container:document.body});return Vt(e).switchMap(({target:r,open:n})=>{if(r.open&&n&&(r.open=!1),r.trigger!==e)return v;if(r.open=n,n){let i=r.dialog??r,a=e.firstElementChild;return r.dialog&&(i.style.margin="0"),o(i),f(W(i),t).raf(()=>{a&&xe(a)?e.open=!1:o(i)})}return v})}var kn=class extends m{open=!1;target;position;relative;trigger};s(kn,{tagName:"c-toggle-popup",init:[g("open"),u("target"),u("position"),u("relative"),u("trigger")],augment:[zl,y,p(":host{display:contents}")]});var Kt=class extends Xt{};s(Kt,{tagName:"c-toolbar",augment:[p(`
:host {
	grid-column-end: span 12;
	column-gap: 24px;
	row-gap: 8px;
	align-items: center;
	min-height: 48px;
	flex-wrap: wrap;
	flex-shrink: 0;
}
${V("small",":host{column-gap:24px}")}
		`)]});var Sn=class extends Kt{};s(Sn,{tagName:"c-toolbar-floating",augment:[p(`
:host {
	background-color: var(--cxl-color-surface-container);
	color: var(--cxl-color-on-surface-variant);
	border-radius: var(--cxl-shape-corner-full);
	padding: 8px 24px;
	height: 64px;
	${ni(3)}
}
		`)]});var En=class extends m{color};s(En,{tagName:"c-tr",init:[oe("color")],augment:[C("row"),p(":host{display:table-row;height:53px;}"),y]});export{Dt as Alert,qo as Appbar,vi as AppbarContextual,Wo as AppbarLayout,Jo as Application,ec as Augment,er as Avatar,Ct as BehaviorSubject,Yo as Bindings,pt as Block,tr as Body,ce as Button,ct as ButtonBase,Rt as ButtonRound,or as ButtonText,zt as C,Lt as Card,sr as CardItem,Ri as Checkbox,ur as Chip,ci as ColorStyles,m as Component,Za as ContentManager,dr as Date,Dh as DefaultRoute,mr as Dialog,xt as DialogBase,qe as DialogBasic,hr as Dismiss,Bi as DragHandle,vr as Drawer,wr as Dropdown,v as EMPTY,Lo as EmptyError,kr as Field,Er as FieldBar,we as FieldBase,Yt as FieldHelp,Cr as FieldOutlined,Xt as Flex,Yi as Form,Ar as FormSubmit,Nr as Grid,zr as GridList,Ki as HashStrategy,Lr as Hr,je as Icon,ye as IconButton,Vr as IconToggleTheme,Br as Iframe,ie as Input,Hr as InputFile,Ur as InputNumber,Xr as InputNumberBase,_i as InputPassword,qr as InputPlaceholder,Or as InputText,Se as InputTextBase,ir as Item,ut as ItemBase,Wr as Label,$r as List,sn as MainRouter,Kr as Menu,Qo as Meta,qt as NavItem,Gr as NavbarToggle,S as Observable,Zr as Option,Zt as OrderedSubject,pi as OutlineColorStyles,Qr as Page,hl as PathStrategy,jt as Popup,Jr as Progress,en as ProgressCircular,gl as QueryStrategy,tn as R,Ge as Reference,Qt as ReplaySubject,go as Ripple,nn as RouteBase,an as RouteManager,dn as RouterA,ln as RouterComponent,un as RouterItem,$t as RouterLink,pn as RouterSelectable,mn as Select,To as SelectOption,Ce as Signal,Uo as SizeValues,y as Slot,yt as Snackbar,Wt as SnackbarContainer,ge as Span,vt as Strategies,te as Subject,ia as Subscriber,mc as SurfaceColorNames,oa as Switch,xn as T,hn as Tab,Do as TabBase,bn as Table,gn as Tabs,yn as Tbody,vn as Td,wn as TextArea,gr as Toggle,gt as ToggleBase,Ot as TogglePanel,kn as TogglePopup,yr as ToggleTarget,Re as ToggleTargetBase,Kt as Toolbar,Sn as ToolbarFloating,En as Tr,ti as TypographyValues,gi as activeRipple,Pu as alert,Kl as animated,wi as applyMeta,Oa as applyTheme,co as aria,ac as ariaChecked,cc as ariaControls,sc as ariaDescribed,nt as ariaId,lc as ariaLabel,Kn as ariaValue,u as attribute,L as attributeChanged,tc as augment,Qa as avatarBaseStyles,ee as be,No as bindHref,U as bindings,uo as breakpoint,Dr as buildGo,rr as buildGridCss,Va as buildIconFactoryCdn,Rr as buildListGo,he as buildMask,fo as buildMenuStyles,Ue as buttonBaseStyles,be as buttonBehavior,Ko as buttonKeyboardBehavior,Ua as buttonStyles,Ja as cardStyles,ga as catchError,dt as changeEvent,fr as checkedBehavior,oe as colorAttribute,xc as colorMix,I as combineLatest,s as component,de as concat,Uu as confirm,X as content,b as create,p as css,ai as cssAttribute,lo as cssSymbol,Pl as debounceFunction,jl as debounceImmediate,Sa as debounceRaf,pa as debounceTime,bo as defaultFormatDate,ho as defaultLocale,ii as defaultThemes,Y as defer,gc as delayTheme,So as dialog,xr as dialogStyles,$o as disabledAttribute,_ as disabledStyles,Q as displayContents,ha as distinctUntilChanged,Bs as drawerStyles,Oi as each,jd as eachBehavior,ni as elevation,Ul as empty,Ga as englishLocale,Un as event,ua as exhaustMap,Da as expression,Sr as fieldBaseStyles,js as fieldBehavior,Us as fieldLayout,_t as fieldLayoutStyles,_s as fieldStyles,tl as fileUploadBehavior,eo as filter,wa as finalize,qs as findForm,xa as first,Il as firstValueFrom,Te as focusable,_a as focusableDisabled,Xa as focusableEvents,Ea as focused,N as font,yp as formatDate,Ze as from,zn as fromArray,Jt as fromAsync,aa as fromGenerator,Ln as fromPromise,d as get,Gl as getActiveElement,it as getAriaId,Wn as getAttribute,vp as getDayText,xl as getElementRoute,bp as getFormattedDate,Tr as getHostActive,xo as getIcon,hp as getLocale,oc as getRegisteredComponents,le as getRoot,M as getShadow,ko as getTarget,ve as getTargetById,zi as getTargets,Ws as gridColumns,Zs as gridNavigation,nr as growAndFillStyles,$s as handleListArrowKeys,Bo as hovered,Ho as hoveredOrFocused,ka as ignoreElements,kl as initializeRouter,Xs as inputContainer,_r as inputTextBase,Yr as inputTextStyles,$ as internals,Vl as interval,Wl as isFocusable,xe as isHidden,Nt as isKeyboardClick,Si as isPageReady,ts as itemBehavior,ar as itemButtonBehavior,Gs as itemHost,es as itemStyles,Lh as linkBehavior,li as loadTheme,Ia as loadThemeDefinition,Mr as manageFocus,Fr as manageFocusList,Io as map,st as maskStyles,V as media,f as merge,fa as mergeMap,K as message,vo as metaBehavior,Bt as motion,il as navItemComponent,ke as navigation,zm as navigationItems,Co as navigationList,Ne as newStylesheet,$l as nodeSort,$i as normalize,Xg as notify,rt as numberAttribute,B as observable,ql as observeChildren,Pa as observeTheme,A as of,h as on,z as onAction,oo as onAttributeMutation,to as onChildrenMutation,Vo as onEvent,Me as onFontsReady,Qi as onHashChange,wl as onHistoryChange,no as onIntersection,ro as onKeyAction,Hn as onKeypress,Oe as onLoad,Ji as onLocation,Z as onMessage,Po as onMutation,ki as onPageReady,Bn as onReady,W as onResize,Tt as onThemeChange,ot as onUpdate,io as onVisibility,et as onVisible,me as operator,Qe as operatorNext,Rn as operators,Ks as overrideFocusMethod,Es as parseAnimation,Cs as parseMotion,ml as parseQueryParameters,wt as parseUrl,Ll as pipe,jn as placeholder,nl as popupBehavior,rl as popupStyles,zl as popupToggleBehavior,Dl as positionUnder,q as property,va as publishLast,Vn as raf,la as reduce,At as ref,hc as registerDefaultIconFactory,bc as registerIcon,yo as registerText,so as renderChildren,Ud as renderEach,on as replaceParameters,J as ripple,C as role,Th as route,Fh as routeIsActive,zh as routeTitles,j as router,Rh as routerHost,Cl as routerLink,yl as routerOutlet,fn as routerSelectable,Le as routerState,Zi as routerStrategy,lt as scrollbarStyles,Fl as selectBehavior,Rl as selectComponent,Tl as selectInputStyles,Mb as selectMenuStyles,Mt as setAttribute,vl as setDocumentTitle,Ug as setSnackbarContainer,ya as share,ba as shareLatest,Bl as shareReplay,re as sizeAttribute,ji as snackbarContainer,Tf as sortBy,Xe as spacingValues,lr as storage,Gi as strategy$,g as styleAttribute,mo as stylesheet,Yl as subject,O as surface,Pn as switchMap,ae as sys,da as take,ma as takeWhile,Je as tap,H as theme,po as themeName,Ha as themeReady,ca as throttleTime,Ol as throwError,He as timer,sa as toPromise,ks as toggleBehavior,We as toggleClose,Vt as toggleComponent,Mu as toggleOpen,$e as toggleTargetBehavior,ht as toggleTargetStyles,Ae as trigger,_e as tsx,ws as updateEvent,nb as virtualScroll,Al as virtualScrollRender,Hl as zip};
