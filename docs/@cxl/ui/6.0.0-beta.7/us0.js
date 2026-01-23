var Be={},bi=Symbol("terminator");function ja(e,t){let o=!1,r={error:n,unsubscribe:i,get closed(){return o},signal:new ge,next(a){if(!o)try{e.next?.(a)}catch(c){n(c)}},complete(){if(!o)try{e.complete?.()}finally{i()}}};e.signal?.subscribe(i);function n(a){if(o)throw a;if(!e.error)throw i(),a;try{e.error(a)}finally{i()}}function i(){o||(o=!0,r.signal.next())}try{t?.(r)}catch(a){n(a)}return r}function Sc(...e){return t=>e.reduce((o,r)=>r(o),t)}var C=class{__subscribe;constructor(t){this.__subscribe=t}then(t,o){return qa(this).then(t,o)}pipe(...t){return t.reduce((o,r)=>r(o),this)}subscribe(t){return ja(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},oe=class extends C{closed=!1;signal=new ge;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let o of Array.from(this.observers))o.closed||o.next(t)}error(t){if(!this.closed){this.closed=!0;let o=!1,r;for(let n of Array.from(this.observers))try{n.error(t)}catch(i){o=!0,r=i}if(o)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},ge=class extends C{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},mo=class extends oe{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},It=class extends oe{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let o=super.onSubscribe(t);return this.closed||t.next(this.currentValue),o}},go=class extends oe{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(o=>t.next(o)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},lt=class extends oe{$value=Be;get hasValue(){return this.$value!==Be}get value(){if(this.$value===Be)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Be&&t.next(this.$value),super.onSubscribe(t)}},Qo=class extends Error{message="No elements in sequence"};function Ne(...e){return new C(t=>{let o=0,r;function n(){let i=e[o++];i&&!t.closed?(r?.next(),i.subscribe({next:t.next,error:t.error,complete:n,signal:r=new ge})):t.complete()}t.signal.subscribe(()=>r?.next()),n()})}function _(e){return new C(t=>{e().subscribe(t)})}function Jo(e){return new C(t=>{e.then(o=>{t.closed||t.next(o),t.complete()}).catch(o=>t.error(o))})}function Ec(e){return new C(t=>{t.signal.subscribe(()=>void e.return?.()),(async()=>{do{let o=await e.next();if(t.closed||o.done)break;t.next(o.value)}while(!t.closed);t.complete()})().catch(o=>t.error(o))})}function Lt(e){return _(()=>Jo(e()))}function vi(e){return new C(t=>{for(let o of e)t.closed||t.next(o);t.complete()})}function xe(e){return e instanceof C?e:e instanceof Promise?Jo(e):vi(e)}function M(...e){return vi(e)}function wi(e){return new Promise((t,o)=>{let r=Be;e.subscribe({next:n=>r=n,error:n=>o(n),complete:()=>t(r)})})}function qa(e){return wi(e).then(t=>t===Be?void 0:t)}async function Cc(e){return wi(e.first())}function Qe(e,t){return he(o=>({next:e(o),unsubscribe:t}))}function he(e){return t=>new C(o=>{let r=e(o,t);r.unsubscribe&&o.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=o.error),r.complete||(r.complete=o.complete),r.signal=o.signal,t.subscribe(r)})}function $o(e){return Qe(t=>o=>t.next(e(o)))}function Wa(e){let t=Be;return Qe(o=>r=>{let n=e(r);n!==t&&(t=n,o.next(n))})}function Ka(e,t){return he(o=>{let r=t,n=0;return{next(i){r=e(r,i,n++)},complete(){o.next(r),o.complete()}}})}function Ac(e,t){let o,r=function(){o&&clearTimeout(o),o=setTimeout(()=>{e.apply(this,arguments)},t)};return r.cancel=()=>clearTimeout(o),r}function Ga(e){return he(t=>{let o=!0,r;return{next(n){o&&(o=!1,t.next(n),r=setTimeout(()=>o=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function Nc(e){if(e<0)throw new Error("Invalid period");return new C(t=>{let o=setInterval(t.next,e);t.signal.subscribe(()=>clearInterval(o))})}function Me(e){return new C(t=>{let o=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(o))})}function Za(e,t=Me){return ki(o=>t(e).map(()=>o))}function ki(e){return t=>X(o=>{let r=!1,n=!1,i,a=()=>{i?.next(),r=!1,n&&o.complete()},c=new ge;o.signal.subscribe(()=>{a(),c.next()}),t.subscribe({next(l){a(),i=new ge,r=!0,xe(e(l)).subscribe({next:o.next,error:o.error,complete:a,signal:i})},error:o.error,complete(){n=!0,r||o.complete()},signal:c})})}function Qa(e){return t=>X(o=>{let r=o.signal,n=0,i=0,a=!1;t.subscribe({next:c=>{n++,xe(e(c)).subscribe({next:o.next,error:o.error,complete:()=>{i++,a&&i===n&&o.complete()},signal:r})},error:o.error,complete(){a=!0,i===n&&o.complete()},signal:r})})}function Ja(e){return he(t=>{let o=new ge,r,n,i=[],a=!1,c=!1,l=()=>{r?.next(),r=void 0,n=void 0,c=!1,i.length&&!t.closed?u(i.shift()):a&&t.complete()},u=w=>{c=!0,r=new ge,n=xe(e(w)).subscribe({next:t.next,error:t.error,complete:l,signal:r})};return t.signal.subscribe(()=>{r?.next(),o.next()}),{next(w){c?i.push(w):u(w)},error:t.error,complete(){a=!0,!c&&i.length===0&&t.complete()},signal:o,unsubscribe:()=>n?.unsubscribe()}})}function $a(e){return he(t=>{let o=!0;return{next(r){o&&(o=!1,xe(e(r)).subscribe({next:t.next,error:t.error,complete:()=>o=!0,signal:t.signal}))}}})}function xo(e){return Qe(t=>o=>{e(o)&&t.next(o)})}function es(e){return Qe(t=>o=>{e-- >0&&!t.closed&&t.next(o),(e<=0||t.closed)&&t.complete()})}function ts(e){return Qe(t=>o=>{!t.closed&&e(o)?t.next(o):t.complete()})}function os(){let e=!1;return he(t=>({next(o){e||(e=!0,t.next(o),t.complete())},complete(){t.closed||t.error(new Qo)}}))}function ct(e){return Qe(t=>o=>{e(o),t.next(o)})}function rs(e){return he((t,o)=>{let r,n={next:t.next,error(i){try{if(t.closed)return;let a=e(i,o);r?.next(),r=new ge,a.subscribe({...n,signal:r})}catch(a){t.error(a)}},unsubscribe:()=>r?.next()};return n})}function ns(){return Qe(e=>{let t=Be;return o=>{o!==t&&(t=o,e.next(o))}})}function is(){return e=>{let t=new go(1),o=!1;return X(r=>{t.subscribe(r),o||(o=!0,e.subscribe(t))})}}function Mc(e){return t=>{let o=new go(e),r=0;return X(n=>{r++,o.subscribe(n),r===1&&t.subscribe(o),n.signal.subscribe(()=>{--r===0&&o.signal.next()})})}}function as(){return e=>{let t,o=0;function r(){--o===0&&t.signal.next()}return X(n=>{n.signal.subscribe(r),o++===0?(t=Pt(),t.subscribe(n),e.subscribe(t)):t.subscribe(n)})}}function ss(){return e=>{let t=new oe,o,r,n=!1,i=!1;return X(a=>{i?(a.next(r),a.complete()):t.subscribe(a),o??=e.subscribe({next:c=>{n=!0,r=c},error:a.error,complete(){i=!0,n&&t.next(r),t.complete()},signal:a.signal})})}}function f(...e){return e.length===1?e[0]:new C(t=>{let o=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){o--===1&&t.complete()},signal:t.signal})})}function Tc(...e){return e.length===0?v:new C(t=>{let o=new Array(e.length);function r(){let n=!0;for(;n;){for(let i of o)if(!i||i.length===0)n=!1;else if(i[0]===bi)return t.complete();n&&t.next(o.map(i=>i?.shift()))}}e.forEach((n,i)=>{let a=o[i]=[];n.subscribe({next(c){a.push(c),r()},error:t.error,complete(){a.push(bi),r()},signal:t.signal})})})}function B(...e){return e.length===0?v:new C(t=>{let o=e.length,r=o,n=0,i=!1,a=new Array(o),c=new Array(o);e.forEach((l,u)=>l.subscribe({next(w){c[u]=w,a[u]||(a[u]=!0,++n>=r&&(i=!0)),i&&t.next(c.slice(0))},error:t.error,complete(){--o<=0&&t.complete()},signal:t.signal}))})}function ls(e){return he(t=>({next:t.next,unsubscribe:e}))}function cs(){return xo(()=>!1)}function Fc(e){return new C(t=>t.error(e))}var v=new C(e=>e.complete());function ie(e){return new It(e)}function X(e){return new C(e)}function Si(){return new oe}function Pt(){return new lt}var yi={catchError:rs,concatMap:Ja,debounceTime:Za,distinctUntilChanged:ns,exhaustMap:$a,filter:xo,finalize:ls,first:os,ignoreElements:cs,map:$o,mergeMap:Qa,publishLast:ss,reduce:Ka,select:Wa,share:as,shareLatest:is,switchMap:ki,take:es,takeWhile:ts,tap:ct,throttleTime:Ga};for(let e in yi)C.prototype[e]=function(...t){return this.pipe(yi[e](...t))};function zc(e){let t;for(;t=e.childNodes[0];)e.removeChild(t)}function b(e,t,o){return new C(r=>{let n=r.next.bind(r);e.addEventListener(t,n,o),r.signal.subscribe(()=>e.removeEventListener(t,n,o))})}function ho(e){return er(e,{childList:!0})}function bo(e,t){return er(e,{attributes:!0,attributeFilter:t})}function er(e,t={attributes:!0,childList:!0}){return new C(o=>{let r=new MutationObserver(n=>n.forEach(i=>{for(let a of i.addedNodes)o.next({type:"added",target:e,value:a});for(let a of i.removedNodes)o.next({type:"removed",target:e,value:a});i.type==="characterData"?o.next({type:"characterData",target:e}):i.attributeName&&o.next({type:"attribute",target:e,value:i.attributeName})}));r.observe(e,t),o.signal.subscribe(()=>r.disconnect())})}function yo(e){return b(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function D(e){return b(e,"click")}function vo(e,t){return new C(o=>{let r=new IntersectionObserver(n=>{for(let i of n)o.next(i)},t);r.observe(e),o.signal.subscribe(()=>r.disconnect())})}function wo(e){return vo(e).map(t=>t.isIntersecting)}function pt(e){return vo(e).filter(t=>t.isIntersecting).first()}function ps(e){let t;return function(...o){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,o),t=0})}}function Ic(e){let t;return function(...o){t||(t=!0,queueMicrotask(()=>{t=!1,e.apply(this,o)}))}}function Ei(e){return he(t=>{let o=ps(n=>{t.closed||(e&&e(n),t.next(n),r&&t.complete())}),r=!1;return{next:o,complete:()=>r=!0}})}function Ci(){return _(()=>document.readyState!=="loading"?M(!0):b(window,"DOMContentLoaded").first().map(()=>!0))}function be(e,t,o){let r=new CustomEvent(t,o);e.dispatchEvent(r)}function Lc(e,t){let o;return f(_(()=>(o=e.childNodes,o?M(void 0):v)),Je().switchMap(()=>e.childNodes!==o?M(void 0):v),er(e,{childList:!0,...t}).map(()=>{}))}function Je(){return _(()=>document.readyState==="complete"?M(!0):b(window,"load").first().map(()=>!0))}function J(...e){return new C(t=>{let o=new ResizeObserver(r=>r.forEach(n=>t.next(n)));for(let r of e)o.observe(r);t.signal.subscribe(()=>o.disconnect())})}function Te(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function Pc(e){return!e.disabled&&e instanceof HTMLElement&&(e.offsetParent!==null||!!(e.offsetWidth&&e.offsetHeight))&&(e.tabIndex!==-1||e.contentEditable==="true"||e.hasAttribute("tabindex"))}function Bc(e,t){return e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}function tr(e,t,o){return r=>Ne(M(e?r.matches(e):!1),b(r,t).switchMap(()=>f(M(!0),b(r,o).map(()=>e?r.matches(e):!1))))}var Vc=tr("","animationstart","animationend"),or=tr("","mouseenter","mouseleave"),fs=tr(":focus,:focus-within","focusin","focusout"),rr=e=>B(or(e),fs(e)).map(([t,o])=>t||o);function Ai(e,t,o){return t=t?.toLowerCase(),b(e,"keydown",o).filter(r=>!t||r.key?.toLowerCase()===t)}function Bt(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function ye(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}function Hc(e){return ye(e)?.activeElement??null}var us=ct(e=>console.trace(e));C.prototype.log=function(){return this.pipe(us)};C.prototype.raf=function(e){return this.pipe(Ei(e))};var K=Symbol("bindings"),Ni={},ft=Symbol("augments"),$e=Symbol("parser"),ir=class{bindings;messageHandlers;internals;attributes$=new mo;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,o){let r=!1;if(this.messageHandlers)for(let n of this.messageHandlers)n.type===t&&(n.next(o),r||=n.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let o of this.bindings)t.push(o.subscribe());if(this.prebind)for(let o of this.prebind)t.push(o.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},Eo=Symbol("css"),d=class extends HTMLElement{static observedAttributes;static[ft];static[$e];[K]=new ir;[Eo];connectedCallback(){this[K].wasInitialized=!0,this[K].wasConnected||this.constructor[ft]?.forEach(t=>t(this)),this[K].connect()}disconnectedCallback(){this[K].disconnect()}attributeChangedCallback(t,o,r){let n=this.constructor[$e]?.[t]??ms;o!==r&&(this[t]=n(r,this[t]))}};function ms(e,t){let o=t===!1||t===!0;return e===""?o?!0:"":e===null?o?!1:void 0:e}function Mi(e,t){e.hasOwnProperty(ft)||(e[ft]=e[ft]?.slice(0)??[]),e[ft]?.push(t)}var ds={mode:"open"};function N(e){return e.shadowRoot??e.attachShadow(ds)}function Ti(e,t){t instanceof Node?N(e).appendChild(t):e[K].add(t)}function ko(e,t){t.length&&Mi(e,o=>{for(let r of t){let n=r.call(e,o);n&&n!==o&&Ti(o,n)}})}function Fi(e,t){Ni[e]=t,customElements.define(e,t)}function $(e){return e[K].internals??=e.attachInternals()}function Xc(e,...t){return o=>{typeof e=="string"?(ko(o,t),Fi(e,o)):(t.unshift(e),ko(o,t))}}function s(e,{init:t,augment:o,tagName:r}){if(t)for(let n of t)n(e);o&&ko(e,o),r&&Fi(r,e)}function Uc(e,...t){ko(e,t)}function ut(e){return Ne(M(e),e[K].attributes$.map(()=>e))}function z(e,t){return e[K].attributes$.pipe(xo(o=>o.attribute===t),$o(()=>e[t]))}function m(e,t){return f(z(e,t),_(()=>M(e[t])))}function jc(e,t,o){e[t]=o}function gs(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function Vt(e,t,o){return o===!1||o===null||o===void 0?o=null:o===!0&&(o=""),o===null?e.removeAttribute(t):e.setAttribute(t,String(o)),o}function xs(e,t,o){e.hasOwnProperty($e)||(e[$e]={...e[$e]}),e[$e]&&(e[$e][t]=o)}function g(e,t){return o=>{t?.observe!==!1&&gs(o).push(e),t?.parse&&xs(o,e,t.parse);let r=`$$${e}`,n=o.prototype,i=Object.getOwnPropertyDescriptor(n,e);i&&Object.defineProperty(n,r,i);let a=t?.persist,c={enumerable:!0,configurable:!1,get(){return this[r]},set(l){this[r]!==l?(this[r]=l,a?.(this,e,l),this[K].attributes$.next({target:this,attribute:e,value:l})):i?.set&&(a?.(this,e,l),this[r]=l)}};Mi(o,l=>{if(i||(l[r]=l[e]),Object.defineProperty(l,e,c),a?.(l,e,l[e]),t?.render){let u=t.render(l);u&&Ti(l,u)}})}}function x(e){return g(e,{persist:Vt,observe:!0})}function Co(e){let t=`on${e}`;return g(t,{render(o){return m(o,t).switchMap(r=>r?new C(n=>{let i=a=>{a.target===o&&o[t]?.call(o,a)};o.addEventListener(e,i),n.signal.subscribe(()=>o.removeEventListener(e,i))}):v)},parse(o){return o?new Function("event",o):void 0}})}function O(e){return g(e,{observe:!1})}function qc(){return{...Ni}}function y(){return document.createElement("slot")}function Ao(e){return t=>{let[o,r]=e();return t[K].add(o),r}}function hs(e,t){let o=document.createTextNode("");return e[K].add(t.tap(r=>o.textContent=r)),o}var nr=document.createDocumentFragment();function So(e,t,o=e){if(t!=null)if(Array.isArray(t)){for(let r of t)So(e,r,nr);o!==nr&&o.appendChild(nr)}else e instanceof d&&t instanceof C?o.appendChild(hs(e,t)):t instanceof Node?o.appendChild(t):e instanceof d&&typeof t=="function"?So(e,t(e),o):o.appendChild(document.createTextNode(t))}function Ri(e,t){for(let o in t){let r=t[o];e instanceof d?r instanceof C?e[K].add(o==="$"?r:r.tap(n=>e[o]=n)):o==="$"&&typeof r=="function"?e[K].add(r(e)):e[o]=r:e[o]=r}}function bs(e,t){return e.constructor.observedAttributes?.includes(t)}function Di(e,t){let o=e instanceof d&&bs(e,t)?z(e,t):bo(e,[t]).map(()=>e[t]);return f(o,_(()=>M(e[t])))}function le(e,t,o){return g(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let n=r===null?void 0:Number(r);return t!==void 0&&(n===void 0||n<t||isNaN(n))&&(n=t),o!==void 0&&n!==void 0&&n>o&&(n=o),n}})}function U(e,t,o){for(let r=e.parentElement;r;r=r.parentElement)if(r[K]?.message(t,o))return}function G(e,t,o=!0){let r,n=0,i=new oe,a={type:t,next(c){n?i.next(c):(r??=[]).push(c)},stopPropagation:o};return e[K].addMessageHandler(a),new C(c=>{n===0&&r?.length&&(r.forEach(u=>c.next(u)),r.length=0),n++;let l=i.subscribe(c);c.signal.subscribe(()=>{n--,l.unsubscribe()})})}function Wc(e,t,o,r=!0){return G(e,t,r).tap(n=>{o[K].message(t,n)})}function h(e,t,...o){let r=typeof e=="string"?document.createElement(e):new e;return t&&Ri(r,t),o.length&&So(r,o),r}function et(e,t,...o){if(e!==et&&typeof e=="function"&&!(e.prototype instanceof d))return o.length&&((t??={}).children=o),e(t);let r=e===et?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&Ri(r,t),o.length&&So(r,o),r}function zi(e,t){return o=>new C(()=>{o.hasAttribute(e)||o.setAttribute(e,t)})}function mt(e,t){return zi(`aria-${e}`,t)}function Ii(e,t){return ct(o=>e.setAttribute("aria-"+t,o===!0?"true":o===!1?"false":o.toString()))}function Qc(e){return ct(t=>e.setAttribute("aria-checked",t===void 0?"mixed":t?"true":"false"))}function k(e){return zi("role",e)}function Jc(e,t){return Ve(t).tap(o=>{e.setAttribute("aria-describedby",o)}).finalize(()=>e.removeAttribute("aria-describedby"))}function Li(e,t){return e.ariaLabel||e.getAttribute("aria-labelledby")?v:t.tap(o=>e.ariaLabel=o)}var Pi=0;function Fe(e){return e.id||=`cxl__${Pi++}`}function Ve(e){return Di(e,"id").map(t=>(t||(e.id=`cxl__${Pi++}`),e.id))}function Bi(e,t){return B(...t.map(o=>Ve(o))).tap(o=>{e.setAttribute("aria-controls",o.join(" "))})}var V=p(":host{display:contents}"),lr=[-2,-1,0,1,2,3,4,5],_i=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],dt=Pt(),No=ie(""),H=p(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),Mo=`
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${A("body-medium")}
`,ys=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),Xi={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",scrim:"rgb(29 27 32 / 0.5)","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function To(e=""){return`
:host ${e} {
	${q("surface-container")}
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
		`}function Ui(e=Xi){return Object.entries(e).map(([t,o])=>`--cxl-color--${t}:${o};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var Y={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:Xi,imports:ys?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function Re(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}function ji(e){return`box-shadow:var(--cxl-elevation-${e});z-index:${e};`}var Ye=p(Re()),qi={"./theme-dark.js":()=>import("./theme-dark-F4QQQFSI.js")},tt=[0,4,8,"12",16,24,32,48,64],He,Vi,vs;function L(e,t){return e==="xsmall"?`@media(max-width:${Y.breakpoints.small}px){${t}}`:`@media(min-width:${Y.breakpoints[e]}px){${t}}`}function Fo(e){return f(Lt(async()=>e.getBoundingClientRect().width),J(e).map(t=>t.contentRect.width)).map(t=>{let o=Y.breakpoints,r="xsmall";for(let n in o){if(o[n]>t)return r;r=n}return r}).distinctUntilChanged()}function ws(e=""){return Object.entries(Zi).map(([t,o])=>`:host([color=${t}]) ${e}{ ${o} }`).join("")}function re(e,t,o=""){return Wi(e,`
		${t?`:host ${o} { ${Zi[t]} }`:""}
		:host${t?"":"([color])"} ${o} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${o}{
			color: inherit;
			background-color: transparent;
		}
		${ws(o)}
	`)}function Wi(e,t){let o=p(t);return g(e,{persist:Vt,render:r=>o(r)})}function j(e,t){return Wi(e,lr.map(o=>{let r=t(o);return o===0?`:host{--cxl-size:${o}}:host ${r}`:`:host([size="${o}"]){--cxl-size:${o}}:host([size="${o}"]) ${r}`}).join(""))}function Ki(){let e=He?document.adoptedStyleSheets.indexOf(He):-1;e!==-1&&document.adoptedStyleSheets.splice(e,1)}function ks(e){He&&Ki();let t=e.globalCss??"";e.colors&&(t+=`:root{${Ui(e.colors)}}`),t?(He=Oe(t),document.adoptedStyleSheets.push(He)):He=void 0,dt.next({theme:e,stylesheet:He,css:t}),No.next(e.name)}var Hi="";function Gi(e){e?e!==Hi&&(typeof e=="string"?import(e):e()).then(t=>ks(t.default),t=>console.error(t)):He&&(Ki(),dt.next(void 0),No.next("")),Hi=e}function Ss(e){let t;return dt.tap(o=>{let r=o?.theme.override?.[e.tagName];r?t?t.replace(r).catch(n=>console.error(n)):e.shadowRoot?.adoptedStyleSheets.push(t??=Oe(r)):t&&t.replaceSync("")})}function Oe(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function Ro(e,t=""){let o=Oe(t);return N(e).adoptedStyleSheets.push(o),o}function p(e){let t;return o=>{let r=N(o);if(r.adoptedStyleSheets.push(t??=Oe(e)),!o[Eo])return Y.css&&r.adoptedStyleSheets.unshift(vs??=Oe(Y.css)),o[Eo]=!0,Ss(o)}}var cr=["background","primary","primary-container","primary-fixed-dim","primary-fixed","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],rp=[...cr,"inherit"];function ar(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function np(e,t,o="transparent"){return`color-mix(in srgb, var(--cxl-color-${e}) ${t}%,${o})`}function q(e){return`${ar(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var Zi=cr.reduce((e,t)=>(e[t]=`
${ar(t)}
${t==="inverse-surface"?ar("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"}),Qi=(e="")=>`${e?`:host(${e})`:":host"} { 
	--cxl-color-surface: transparent; 
	border-style: solid; 
	border-color: var(--cxl-color-on-surface); 
	border-width: 1px; 
	box-shadow: none;
}
${cr.map(t=>`:host(${e}[color=${t}]) { --cxl-color-on-surface: var(--cxl-color--${t}); }`).join("")}
`;function gt(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function A(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}function ip(){cancelAnimationFrame(Ji)}var Ji=requestAnimationFrame(()=>Ns()),$i={},Oi=document.createElement("template"),Yi={};function Es(e){return function(t){let o=e(t),r=Yi[o];if(r)return r.cloneNode(!0);let n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=()=>(n.dispatchEvent(new ErrorEvent("error")),"");return fetch(o).then(a=>a.ok?a.text():i(),i).then(a=>{if(!a)return;Oi.innerHTML=a;let c=Oi.content.children[0];if(!c)return;let l=c.getAttribute("viewBox");l?n.setAttribute("viewBox",l):c.hasAttribute("width")&&c.hasAttribute("height")&&n.setAttribute("viewBox",`0 0 ${c.getAttribute("width")} ${c.getAttribute("height")}`);for(let u of c.childNodes)n.append(u);Yi[t.name]=n}).catch(a=>console.error(a)),n.setAttribute("fill","currentColor"),n}}var Cs=Es(({name:e,width:t,fill:o})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${o?"fill1_":""}${t}px.svg`)),ea=Cs;function ap(e){ea=e}function sp(e){$i[e.id]=e}function xt(e,t={}){let{width:o,height:r}=t;o===void 0&&r===void 0&&(o=r=24);let n=$i[e]?.icon()??ea({name:e,width:o,fill:t.fill});return t.className&&n.setAttribute("class",t.className),o&&(n.setAttribute("width",`${o}`),r===void 0&&n.setAttribute("height",`${o}`)),r&&(n.setAttribute("height",`${r}`),o===void 0&&n.setAttribute("width",`${r}`)),t.alt&&n.setAttribute("alt",t.alt),n}var sr,As=new Promise(e=>{sr=()=>{dt.next(void 0),e()}});function Ns(e){cancelAnimationFrame(Ji),Vi||(e&&(e.colors&&(Y.colors=e.colors),e.globalCss&&(Y.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(Vi=Oe(`html{${Ui(Y.colors)}}${Y.globalCss}`)),Y.imports?Promise.allSettled(Y.imports.map(t=>{let o=document.createElement("link");return o.rel="stylesheet",o.href=t,document.head.append(o),new Promise((r,n)=>(o.onload=r,o.onerror=n))})).then(sr,t=>console.error(t)):sr())}function _e(){return Lt(async()=>{await As,await document.fonts.ready})}var pr=class extends d{type;details};s(pr,{tagName:"c-action",init:[g("type"),g("details")],augment:[V,y,e=>D(e).tap(()=>{e.type&&U(e,e.type,e.details)})]});function ae(e,t,o){return new C(r=>{let n={id:e,controller:o,target:t};U(t,`registable.${e}`,n),r.signal.subscribe(()=>n.unsubscribe?.())})}function Do(e,t,o,r){return new C(n=>{function i(c){let l=c.target;c.unsubscribe=()=>{let S=o.indexOf(l);S!==-1&&o.splice(S,1),r?.({type:"disconnect",target:l,elements:o}),n.next()};let u=o.indexOf(l);u!==-1&&o.splice(u,1);let w=0,E=o.length;for(;w<E;){let S=w+E>>1;o[S].compareDocumentPosition(l)&Node.DOCUMENT_POSITION_FOLLOWING?w=S+1:E=S}o.splice(w,0,l),r?.({type:"connect",target:l,elements:o}),n.next()}let a=G(t,`registable.${e}`).subscribe(i);n.signal.subscribe(a.unsubscribe)})}function Xe(e,t,o=new Set){let r=Si();return f(G(t,`registable.${e}`).map(n=>{let i=n.target,a=n.controller||n.target;return n.unsubscribe=()=>{o.delete(a),r.next({type:"disconnect",target:a,element:i,elements:o})},o.add(a),{type:"connect",target:a,element:i,elements:o}}),r)}var fr=class extends d{panels=new Set};s(fr,{tagName:"c-accordion",augment:[e=>Xe("accordion",e,e.panels),e=>b(e,"toggle",{capture:!0}).tap(t=>{let o=t.target;if(o&&o.open&&e.panels.has(o))for(let r of e.panels)r!==o&&(r.open=!1)})]});var ee=class extends d{name="";width;height;alt;fill=!1};s(ee,{tagName:"c-icon",init:[g("name"),g("width"),g("height"),g("fill"),g("alt")],augment:[k("none"),p(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,o;return e.shadowRoot?.adoptedStyleSheets.push(t),pt(e).switchMap(()=>ut(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,n=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${n===void 0?"":`height:${n}px`}}`).catch(i=>{}),o?.remove(),o=e.name?xt(e.name,{className:"icon",width:r,height:n,fill:e.fill,alt:e.alt}):void 0,o&&(o.onerror=()=>{o&&e.alt&&o.replaceWith(e.alt)},N(e).append(o))})}]});function ur(e){return m(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function Ms(e,t=e,o=0){let r=t.hasAttribute("tabindex")?t.tabIndex:o;return ur(e).tap(n=>{n?t.removeAttribute("tabindex"):t.tabIndex=r})}function Ts(e,t=e){return f(b(t,"focusout").tap(()=>e.touched=!0),f(z(e,"disabled"),z(e,"touched")).tap(()=>U(e,"focusable.change")))}function ve(e,t=e,o=0){return f(Ms(e,t,o),Ts(e,t))}function ta(e){return e in Y.animation}function ne({target:e,animation:t,options:o}){if(Y.disableAnimations)return e.animate(null);if(typeof t=="string"&&!(t in Y.animation))throw new Error(`Animation "${t}" not defined`);let r=typeof t=="string"?Y.animation[t]:t,n=typeof r.kf=="function"?r.kf(e):r.kf,i={duration:250,easing:Y.easing.emphasized,...r.options,...o,...Y.prefersReducedMotion?{duration:0}:void 0};return e.animate(n,i)}function Ht(e){let{trigger:t,stagger:o,commit:r,keep:n}=e;function i(c){return new C(l=>{let u=ne(c);u.ready.then(()=>l.next({type:"start",animation:u}),w=>{console.error(w)}),u.addEventListener("finish",()=>{l.next({type:"end",animation:u}),r&&u.commitStyles(),!(n||n!==!1&&c.options?.fill&&(c.options.fill==="both"||c.options.fill==="forwards"))&&l.complete()}),l.signal.subscribe(()=>{try{u.cancel()}catch{}})})}let a=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return f(...a.map((c,l)=>{let u={...e.options,delay:o!==void 0?(e.options?.delay??0)+l*o:e.options?.delay};return(t==="visible"?wo(c).filter(E=>E):t==="hover"?or(c):M(!0)).switchMap(E=>E?i({...e,options:u,target:c}):v)}))}function oa(e,t,o=e.getBoundingClientRect()){let r=o.width>o.height?o.width:o.height,n=new zo,i=e.shadowRoot||e,{x:a,y:c}=t??{x:1/0,y:1/0},l=!t||Bt(t),u=a>o.right||a<o.left||c>o.bottom||c<o.top;return n.x=l||u?o.width/2:a-o.left,n.y=l||u?o.height/2:c-o.top,n.radius=r,t||(n.duration=0),i.prepend(n),n}function ra(e,t=e){let o,r,n,i=()=>{o=oa(t,r instanceof Event?r:void 0,n),o.duration=600,r=void 0};return f(b(e,"click").tap(a=>{r=a,n=t.getBoundingClientRect()}),m(e,"selected").raf().switchMap(()=>{if(e.selected){if(!o?.parentNode){if(Te(e))return r=void 0,pt(e).tap(i);i()}}else o&&na(o).catch(a=>console.error(a));return v})).ignoreElements()}function na(e){return new Promise(t=>{ne({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function Q(e,t=e){let o=!1,r=0;return f(b(t,"pointerdown"),b(t,"click")).tap(n=>n.cxlRipple??=e).raf().mergeMap(n=>{if(n.cxlRipple===e&&!o&&!e.disabled&&e.parentNode){r=Date.now(),o=!0,e.style.setProperty("--cxl-mask-hover","none");let i=oa(e,n),a=i.duration,c=()=>{e.style.removeProperty("--cxl-mask-hover"),na(i).catch(()=>{}).finally(()=>{o=!1})};return n.type==="click"?Me(a).tap(c):f(b(document,"pointerup"),b(document,"pointercancel")).first().map(()=>{let l=Date.now()-r;setTimeout(()=>c(),l>a?32:a-l)})}return v})}var zo=class extends d{x=0;y=0;radius=0;duration=500};s(zo,{tagName:"c-ripple",init:[g("x"),g("y"),g("radius")],augment:[p(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",X(()=>{let o=t.style;o.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,o.width=o.height=e.radius*2+"px",t.parentNode||N(e).append(t),ne({target:t,animation:"expand",options:{duration:e.duration}}),ne({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var ot=[H,Ye,p(`
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
	border-color: color-mix(in srgb, var(--cxl-color-outline) 12%, transparent);
	color: color-mix(in srgb, var(--cxl-color--on-surface) 38%, transparent);
}	
:host([variant=outlined][disabled]),:host([variant=text][disabled]) {
	background-color: transparent;
	box-shadow: none;
}`)],Fs=p(`
:host {
	${A("label-large")}
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
	color: var(--cxl-color-surface);
}
:host([variant=text]:not([color])),:host([variant=outlined]:not([color])) {
	--cxl-color-on-surface: var(--cxl-color--on-primary);
	--cxl-color-surface: var(--cxl-color--primary);
}
:host([variant=outlined]) {
	border: 1px solid var(--cxl-color-outline);
	background-color: transparent;
	color: var(--cxl-color-surface);
}
:host([variant=elevated]) {
	--cxl-color-on-surface: var(--cxl-color-primary);
}
`);function mr(e){return m(e,"disabled").switchMap(t=>t?v:yo(e).tap(o=>{o.stopPropagation(),e.click()}))}function ce(e){return f(mr(e),ve(e))}var ht=class extends d{disabled=!1;touched=!1};s(ht,{init:[x("disabled"),x("touched")],augment:[k("button"),ce]});var we=class extends ht{size;color;variant};s(we,{tagName:"c-button",init:[j("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),re("color","primary"),x("variant")],augment:[...ot,Fs,Q,y]});var Ue;function ia(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Rs(e){return e==="infinite"?1/0:+e}function Ds(e){if(ta(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let o={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(c,l,u)=>(l&&(r=+l),u&&(o.composite=u),"")),Ue??=document.createElement("style").style,Ue.animation=e,o.fill=Ue.animationFillMode;let n=o.fill==="forwards"||o.fill==="both",i=t?void 0:ia(Ue.animationDuration);i!==void 0&&(o.duration=i);let a=ia(Ue.animationDelay);return a!==void 0&&(o.delay=a),Ue.animationIterationCount&&(o.iterations=Rs(Ue.animationIterationCount)),{animation:Ue.animationName,keep:n,stagger:r,options:o}}function zs(e){return typeof e=="string"&&(e=e.split(",").map(t=>Ds(t.trim()))),e}function Ot(e,t,o,r){let n=r?`motion-${r}-on`:"motion-on",i=zs(o);return e.setAttribute(n,""),f(...i.map(a=>Ht({target:t,...a}))).finalize(()=>e.removeAttribute(n))}var bt=p(":host(:not([open],[motion-out-on])){display:none}");function De(e,t=()=>e,o=!1){let r=_(()=>M(t("in"))),n=_(()=>M(t("out"))),i=_(()=>e.duration!==void 0&&e.duration!==1/0?Me(e.duration).map(()=>e.open=!1):v).log();return f(G(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),B(m(e,"motion-in").map(a=>(a?r.mergeMap(c=>Ot(e,c,a,"in")):r).mergeMap(()=>i)),m(e,"motion-out").map(a=>(a?n.switchMap(c=>Ot(e,c,a,"out")):n).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([a,c])=>z(e,"open").switchMap(l=>{if(e.popover!=="auto"){let u=l?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:l?"closed":"open",newState:u}))}return l?o?Ne(c,a):a:o?Ne(c,a):c})))}var ke=class extends d{open=!1;duration;"motion-in";"motion-out"};s(ke,{init:[g("motion-in"),g("motion-out"),le("duration"),x("open")]});var Yt=class extends ke{};s(Yt,{tagName:"c-toggle-target",augment:[p(`
:host{display:contents}
`),e=>{let t=h("slot"),o=h("slot",{name:"off"});return(e.open?o:t).style.display="none",N(e).append(t,o),De(e,r=>{t.style.display=o.style.display="none";let n=e.open?r==="in"?t:o:r==="in"?o:t;return n.style.display="",n.assignedElements()},!0)}]});var dr={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(o){console.error(o)}}};function rf(e){return(t,o)=>t[e]>o[e]?1:t[e]<o[e]?-1:0}function ze(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let o,r=e.getRootNode();return r instanceof ShadowRoot&&(o=r.getElementById(t),o)?o:e.ownerDocument.getElementById(t)??void 0}function Io(e,t){return m(e,t).map(o=>ze(e,o))}var gr=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},te=new gr;var Po=(e,t,o=e)=>D(e).tap(()=>U(o,"toggle.close",t)),df=(e,t,o=e)=>D(e).tap(()=>U(o,"toggle.open",t));function Lo(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(o=>{let r=ze(e,o);return r?[r]:[]}):Array.isArray(t)?t:[t]}function hr(e,t,o,r,n=b(e,"click").map(()=>!o())){return f(r,n).switchMap(i=>{let a=t();return a?xe(a.map(c=>({target:c,open:i}))):v})}function rt(e,t=e){function o(i,a){return[m(e,"open").switchMap(c=>(i.parentNode||te.popupContainer.append(i),i.open=c,c&&i instanceof d?z(i,"open").map(l=>{e.open&&l===!1&&(e.open=!1)}):v)),Ve(i).tap(c=>{let l=i.getAttribute("role");(l==="menu"||l==="listbox"||l==="tree"||l==="grid"||l==="dialog")&&(a.ariaHasPopup=l),a.getRootNode()===i.getRootNode()&&a.setAttribute("aria-controls",c)})]}let r=B(m(e,"trigger"),m(e,"target")).switchMap(([i])=>{let a=Lo(e),c=a?f(...a.flatMap(l=>o(l,e))).ignoreElements():v;return f(i==="hover"?B(rr(t),a?f(...a.map(l=>rr(l))):v).map(l=>!!l.find(u=>!!u)).debounceTime(250):i==="checked"?b(t,"change").map(l=>l.target&&"checked"in l.target?!!l.target.checked:!1):b(t,"click").map(()=>!e.open),c)}),n;return Ci().switchMap(()=>hr(t,()=>Lo(e),()=>e.open,m(e,"open"),r).filter(i=>{let{open:a,target:c}=i;if(e.open!==a){if(a)n=ye(e)?.activeElement,c.trigger=e;else if(c.trigger&&c.trigger!==e)return i.open=!0,c.trigger=e,!0;return e.open=a,!1}if(!a&&c.trigger===e){let l=document.activeElement;(l===document.body||l===document.documentElement)&&n?.focus()}return!0}))}var je=class extends d{open=!1;target;trigger};s(je,{init:[g("target"),g("trigger"),x("open")],augment:[e=>rt(e).raf(({target:t,open:o})=>t.open=o)]});var xr=class extends je{};s(xr,{tagName:"c-toggle",augment:[V,y]});var _t=class extends ke{};s(_t,{tagName:"c-details",augment:[p(`
:host { display: block; }
:host(:not([open],[motion-out-on])) #body {display:none}
		`),e=>{let t=h("slot",{id:"body"}),o=h("slot",{id:"header",name:"header"});return N(e).append(o,t),f(hr(o,()=>[e],()=>e.open,m(e,"open")).raf(({open:r})=>{e.open=r}),De(e,()=>t))}]});var Xt=class extends _t{constructor(){super(),this["motion-in"]="openY",this["motion-out"]="closeY"}};s(Xt,{tagName:"c-accordion-panel",augment:[k("region"),p(`
:host {
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	border-bottom: 1px solid var(--cxl-color-outline-variant);
}
#body {
	display: block;
	overflow: hidden;
}
		`),e=>ae("accordion",e)]});var br=class extends d{disabled=!1;touched=!1};s(br,{tagName:"c-accordion-header",init:[x("disabled")],augment:[k("button"),p(`
:host {
	${A("title-small")}
	line-height: unset;
	display: flex;
	align-items: center;
	padding: 16px;
	padding-inline-end: 44px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}	
#icon {
	position: absolute;
	inset-inline-end: 12px;
	transition: rotate var(--cxl-speed);
}
#icon.open {
	rotate: -180deg;
}
:host([disabled]) {
	color: color-mix(in srgb, var(--cxl-color--on-surface) 38%, transparent);
}
		`),H,e=>{let t=new ee;t.name="keyboard_arrow_down",t.id="icon",t.role="none",e.slot||="header",N(e).append(t,document.createElement("slot"));let o=e.parentElement;return o instanceof Xt?f(Ve(o).tap(r=>e.setAttribute("aria-controls",r)),m(o,"open").tap(r=>{t.classList.toggle("open",r),e.ariaExpanded=String(r)})):v},ce]});var Ut=class extends d{outline=!1;color};s(Ut,{tagName:"c-alert",init:[x("outline"),re("color","inverse-surface")],augment:[k("alert"),p(`
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
	${A("body-medium")}
}
	${Qi("[outline]")}`),y]});var vr=[p(`
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
	${A("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${A("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${A("headline-medium")}
	flex-wrap: wrap;
}`),y,()=>h("slot",{name:"title"})];function Is(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var yr=class extends d{size;sticky=!1;contextual};s(yr,{tagName:"c-appbar",init:[x("size"),x("sticky"),x("contextual")],augment:[p(`
:host { z-index: 2; width:100%; }
:host([sticky]) { position: sticky; top: -1px; }
:host([scroll]) {
 	transition: background-color var(--cxl-speed);
	border-top: 1px solid var(--cxl-color-surface-container); background-color: var(--cxl-color-surface-container)
}
:host([contextual]) { padding: 0; }
:host([contextual]) slot:not([name=contextual]) { display:none; }
		`),...vr,()=>h("slot",{name:"contextual"}),e=>m(e,"sticky").switchMap(t=>t?vo(e,{threshold:[1]}).tap(o=>e.toggleAttribute("scroll",o.intersectionRatio<1)):v),e=>{let t;return f(ho(e),m(e,"contextual")).raf().switchMap(()=>{for(let o of e.children)if(Is(o)&&(o.slot="contextual",o.open=o.name===e.contextual,o.open))return t=o,b(o,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,v})}]});var wr=class extends d{};s(wr,{tagName:"c-appbar-title",augment:[k("heading"),mt("level","1"),p(`
:host {
	display: block;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 100%;
}
	`),y]});var jt=class extends we{};s(jt,{tagName:"c-button-round",augment:[p(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var pe=class extends jt{icon="";width;height;fill=!1;variant="text";alt};s(pe,{tagName:"c-icon-button",init:[g("icon"),g("width"),g("height"),g("alt"),g("fill")],augment:[e=>h(ee,{className:"icon",width:m(e,"width"),height:m(e,"height"),name:m(e,"icon"),fill:m(e,"fill"),alt:m(e,"alt")})]});var nu=1440*60*1e3,Ls=/^\s*(\d{1,2})\s*:\s*(\d{1,2})\s*(?::(\d{1,2})\s*)?([pPaA][mM])?/,Ps=/^(\d{4}(?:-\d{2}(?:-\d{2})?)?)(T\d{2}:\d{2}(?:\d{2}(?:\.\d3)?)?)?(Z(?:[+-]\d{1,2})?)?$/;function Bs(e){let t=Ls.exec(e);if(t){let o=new Date,r=+(t[1]??0),n=t[4]?.toLowerCase()==="pm";return o.setHours(n?r+12:r),o.setMinutes(+(t[2]??0)),o}return new Date(NaN)}function Vs(e){let t=Ps.exec(e),o=new Date(t&&!t[3]&&!t[2]?`${e}T00:00`:e);return isNaN(o.getTime())&&(o=Bs(e)),o}function aa(e,t,o){if(t==="relative"){let r=new Date;return e.getFullYear()===r.getFullYear()?e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()?e.toLocaleTimeString(o,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(o,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(o,{month:"2-digit",day:"2-digit",year:"2-digit"})}return e.toLocaleString(o,{dateStyle:t,timeStyle:t})}function sa(e){return g(e,{parse:t=>t?Vs(t):void 0})}function la(e,t,o){return typeof o=="string"?aa(t,o,e):t.toLocaleString(e,o)}var kr={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function Hs(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var qt={content:kr,name:"default",localeName:Hs(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>la(qt.localeName,e,t)},Os={content:kr,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>la("en-US",e,t)};function Ys(){let e=ie(qt),t={default:qt,en:Os},o={},r=e.map(a=>a.content);async function n(a){let c=a.split("-")[0];if(!c)return qt;if(!(t[a]??t[c])){let u=o[a]??o[c];u&&await u()}return t[c]||qt}async function i(a){e.next(await n(a))}return navigator.language&&i(navigator.language).catch(a=>console.error(a)),{content:r,registeredLocales:t,locale:e,setLocale:i,getLocale(a){return a?Lt(()=>n(a)):e},get(a,c){return r.map(l=>l[a])},register(a){t[a.name]=a}}}var W=Ys();function cu(e){return B(W.locale,m(e,"locale")).switchMap(([t,o])=>o?W.getLocale(o):M(t))}function yt(e){return Object.assign(kr,e),W.get}function pu(e,t){return W.locale.map(o=>o.formatDate(e,t))}function fu(e){return t=>t?W.locale.map(o=>o.formatDate(t,e)):M("")}function uu(e,t,o=W.locale){let r=new Date,n=t==="xsmall"?"narrow":t==="small"?"short":"long";return r.setDate(r.getDate()-r.getDay()+e),o.map(i=>i.formatDate(r,{weekday:n}))}var ca=class e extends d{name;size;open=!1;backIcon=h(pe,{icon:"arrow_back",className:"icon",ariaLabel:W.get("core.close"),$:t=>D(t).tap(()=>this.open=!1)});static{s(e,{tagName:"c-appbar-contextual",init:[g("name"),x("open"),x("size")],augment:[t=>t.backIcon,...vr,p(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),t=>z(t,"open").tap(o=>{o||t.dispatchEvent(new Event("close"))})]})}};function pa(e=document){document.documentElement.lang="en";let t=[h("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),h("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),h("meta",{name:"mobile-web-app-capable",content:"yes"}),h("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${A("body-large")}}
			:link{color:var(--cxl-color-primary)}
			:visited{color:var(--cxl-color-secondary)}
			`)];return e.head.append(...t),t}function fa(e=2e3){return f(Me(e),_e()).first()}function ua(e){return fa().raf(()=>e.setAttribute("ready",""))}function Bo(e){return f(X(t=>{let o=pa(e.ownerDocument);t.signal.subscribe(()=>o.forEach(r=>r.remove()))}),Je().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),fa().switchMap(()=>Fo(e).raf(t=>e.setAttribute("breakpoint",t))),ua(e),No.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Sr=class extends d{connectedCallback(){requestAnimationFrame(()=>pa(this.ownerDocument)),super.connectedCallback()}};s(Sr,{tagName:"c-meta",augment:[()=>ua(document.body)]});function ma(e,t,o){o==="in"&&(e.style.display="");let r=e.offsetWidth,n=ne({target:e,animation:{kf:{[t]:o==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});o==="out"&&(n.onfinish=()=>e.style.display="none")}var Er=class extends d{sheetstart=!1;sheetend=!1};s(Er,{tagName:"c-application",init:[x("sheetstart"),x("sheetend")],augment:[p(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${q("surface")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
	position: relative;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${gt()}
	`),Bo,e=>G(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>G(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=h("slot",{name:"start"}),o=h("slot",{id:"body"}),r=h("slot",{name:"end"}),n=Oe("html { overflow: hidden }");return N(e).append(t,o,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),te.popupContainer=e,f(X(i=>{let a=e.ownerDocument.adoptedStyleSheets;a.push(n),i.signal.subscribe(()=>{let c=a.indexOf(n);c!==-1&&a.splice(c,1)})}),z(e,"sheetstart").tap(i=>ma(t,"marginLeft",i?"in":"out")),z(e,"sheetend").tap(i=>ma(r,"marginRight",i?"in":"out")))}]});var _s=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,Xs=/^\d{5}(?:[-\s]\d{4})?$/,Us={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},da={required:Qs,email:Js,json:tl,zipcode:$s,nonZero:Gs,nonEmpty:Ks},js={pattern:Zs,equalToElement:Cr(ba),greaterThan:xa,lessThan:ha,greaterThanElement:Cr(xa),lessThanElement:Cr(ha),min:rl,max:nl,equalTo:ba,maxlength:il,minlength:al},qs=yt(Us);function Cr(e){return(t,o)=>{let r=typeof t=="string"?ze(o,t):t;if(!r)throw"Invalid element";return e(r)}}function Se(e,t){return{key:e,valid:t,message:qs(`validation.${e}`,"validation.invalid")}}function Ws(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function Ks(e){return Se("nonEmpty",!Ws(e))}function Gs(e){return Se("nonZero",e===""||Number(e)!==0)}function Zs(e){let t=typeof e=="string"?e=new RegExp(e):e;return o=>Se("pattern",typeof o=="string"&&(o===""||t.test(o)))}function Ar(e){return e!=null&&e!==""}function Qs(e,t){let o=t&&"checked"in t?!!t.checked:!0;return Se("required",o&&Ar(e))}function Js(e){return Se("email",typeof e=="string"&&(e===""||_s.test(e)))}function $s(e){return Se("zipcode",typeof e=="string"&&(e===""||Xs.test(e)))}function el(e){try{return JSON.parse(e),!0}catch{return!1}}function tl(e){return Se("json",el(e))}function ol(e){return e instanceof HTMLElement&&"value"in e}function Wt(e,t,o){let r=ol(t)?m(t,"value"):t instanceof C?t:M(t);return n=>r.map(i=>Se(e,!Ar(n)||!Ar(i)||o(n,i)))}function ga(e,t){let o=/(\w+)(?:\(([^)]+?)\))?/g,r=[],n;for(;n=o.exec(e);)if(n[2]){let i=js[n[1]];if(!i)throw`Invalid rule "${n[1]}"`;r.push(i(n[2],t))}else if(n[1]&&n[1]in da)r.push(da[n[1]]);else throw`Invalid rule "${n[1]}"`;return r}function ya(e,t){let o=(typeof e=="string"?ga(e,t):e).flatMap(r=>typeof r=="string"?ga(r,t):r);return(r,n)=>o.map(i=>{let a=i(r,n);return a instanceof C?a:a instanceof Promise?xe(a):M(a)})}function rl(e){return Wt("min",e,(t,o)=>Number(t)>=Number(o))}function xa(e){return Wt("greaterThan",e,(t,o)=>Number(t)>Number(o))}function nl(e){return Wt("max",e,(t,o)=>Number(t)<=Number(o))}function ha(e){return Wt("lessThan",e,(t,o)=>Number(t)<Number(o))}function ba(e){return Wt("equalTo",e,(t,o)=>t==o)}function il(e){return t=>Se("maxlength",!t||t.length<=+e)}function al(e){return t=>Se("minlength",!t||t.length>=+e)}function sl(e){return va(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function vt(e){return z(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||be(e,"change",{bubbles:!0})})}function va(e){return f(m(e,"value"),m(e,"checked")).map(()=>{})}var se=class e extends d{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{s(e,{init:[x("autofocus"),x("invalid"),x("disabled"),x("touched"),g("rules"),x("name"),O("validationResult"),Co("update")],augment:[t=>(t.defaultValue=t.value,f(ae("form",t),z(t,"invalid").tap(()=>be(t,"invalid")),m(t,"invalid").switchMap(o=>{if(o){if(t.setAria("invalid","true"),!t.validationMessage)return W.get("validation.invalid").tap(r=>t.setCustomValidity(r))}else t.setAria("invalid",null);return v}),X(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),m(t,"rules").switchMap(o=>{if(!o)return v;let r=ya(o,t);return va(t).switchMap(()=>f(...r(t.value,t)).tap(n=>t.setValidity(n))).finalize(()=>t.resetValidity())}),m(t,"value").tap(o=>t.setFormValue(o)),m(t,"validationResult").switchMap(o=>!o||o.valid?v:o.message instanceof C?o.message:o.message===void 0?W.get("validation.invalid"):M(o.message)).tap(o=>{t.setCustomValidity(o)}))),sl]})}get labels(){return $(this).labels}get validity(){return $(this).validity}get validationMessage(){return $(this).validationMessage}reportValidity(){return $(this).reportValidity()}checkValidity(){return $(this).checkValidity()}setCustomValidity(t){let o=!!t,r=t!==this.validationMessage;this.applyValidity(o,t),this.invalid!==o?this.invalid=o:r&&be(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,o){o?this.setAttribute(`aria-${t}`,o):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let o in this.validMap){let r=this.validMap[o];if(r&&!r.valid)return this.validationResult=r}this.resetInvalid()}applyValidity(t,o){$(this).setValidity({customError:t},o)}formDisabledCallback(t){this.disabled=t}setFormValue(t){$(this).setFormValue(t)}};function ll(e,t){let o,r=t.key;if(r==="ArrowDown"&&e.goDown)o=e.goDown();else if(r==="ArrowRight"&&e.goRight)o=e.goRight();else if(r==="ArrowUp"&&e.goUp)o=e.goUp();else if(r==="ArrowLeft"&&e.goLeft)o=e.goLeft();else if(r==="Home")o=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(r==="End")o=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)o=e.other(t);else return null;return t.stopPropagation(),o&&t.preventDefault(),o}function Ie(e){return b(e.host,"keydown").map(t=>ll(e,t)).filter(t=>!!t)}function cl(e){return new C(t=>{let o=e.focus;e.focus=()=>{o.call(e),t.next()},t.signal.subscribe(()=>e.focus=o)})}function Nr({host:e,observe:t,getFocusable:o,getSelected:r,getActive:n=()=>Mr(e)}){let i=[];function a(){let c=i.find(l=>!l.disabled&&!l.hidden&&!Te(l));c&&(c.tabIndex=0)}return f(b(e,"focusin").tap(()=>{let c=n(),l=!1;for(let u of i)u.tabIndex=u===c?(l=!0,0):-1;l||a()}),(t??M(!0)).tap(()=>{if(i=o(),i.find(u=>u.tabIndex===0))return;let l=r?.();l?l.tabIndex=0:a()}),e instanceof HTMLElement?cl(e).tap(()=>{let c=o();(c.find(u=>u.tabIndex===0)??c[0])?.focus()}):v).ignoreElements()}function Mr(e){return ye(e)?.activeElement??document.activeElement??void 0}function Tr({getFocusable:e,getActive:t}){return(o=1,r,n=Te)=>{let i=t(),a=e(),c=r??(i?a.indexOf(i):-1),l;do l=a[c+=o];while(l&&n(l));return l}}function Wu(e){let{host:t,getFocusable:o,orientation:r,observe:n}=e,i=Tr(e),a=[];function c(l){l instanceof HTMLElement&&l.focus({focusVisible:!0})}return f((n??M(!0)).tap(()=>a=o()),Nr(e),Ie({host:t,...r==="horizontal"?{goRight:()=>i(1),goLeft:()=>i(-1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>i(1,-1),goLast:()=>i(-1,a.length),other:e.customKey}).tap(c))}function Vo({host:e,input:t,handleOther:o=!1,axis:r}){let n=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function i(E=1){if(e.open===!1){e.open=!0;let S=n();requestAnimationFrame(()=>{S?.focused&&u(S)})}else return a(E)}function a(E=1,S){let T=n(),R=S??(T?e.options.indexOf(T):-1),I;do I=e.options[R+=E];while(I?.hidden);return I}function c(E){let S=E.key;if(/^\w$/.test(S)){let T=n(),R=T?e.options.indexOf(T):-1;if(R===-1)return;let I=R;I+1>=e.options.length&&(R=0);let F=new RegExp(`^\\s*${S}`,"i"),P;for(;P=e.options[++R];)if(!P.hidden&&P.textContent.match(F))return P;if(I===0)return;for(R=0;R<I&&(P=e.options[R++]);)if(!P.hidden&&P.textContent.match(F))return P}}let l=()=>e.options.find(E=>E.focused);function u(E){for(let S of e.options)S.focused=!1;E?(E.focused=!0,t?.setAria("activedescendant",Fe(E)),E.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let w=E=>U(E,"selectable.action",E);return f(Ie({host:t??e,...r==="x"?{goLeft:()=>i(-1),goRight:()=>i(1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>e.open!==!1?a(1,-1):void 0,goLast:()=>e.open!==!1?a(-1,e.options.length):void 0,other:o?c:void 0}).tap(E=>{e.open===!1?w(E):u(E)}),b(t??e,"focus").tap(()=>u(n())),Ai(t??e,"Enter").tap(E=>{let S=l();e.open!==!1&&S?(E.stopPropagation(),w(S)):e.open===!1&&(e.open=!0)}))}function Fr(e){return new C(t=>{f(Do("selectable",e,e.options,o=>{if(o.type==="connect"&&(o.target.view=e.optionView,o.target.selected))return e.defaultValue===void 0&&(e.defaultValue=o.target.value),t.next(o.target);let r;for(let n of e.options)n.hidden||!n.parentNode||n.selected&&(r?n.selected=!1:r=n);t.next(r)}),G(e,"selectable.action").tap(o=>{if(!e.disabled&&e.options.includes(o)){let r=e.value!==o.value;t.next(o),r&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var nt={},wt=class e extends se{options=[];_value;_selected=nt;static{s(e,{init:[g("value"),O("selected")],augment:[t=>Fr(t).tap(o=>{(!o||o!==t.selected)&&t.setSelected(o)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===nt?this.options[0]?.value:this._value}get selected(){return this._selected===nt&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==nt&&this._selected.value===t){this._value=t;return}else for(let o of this.options)if(o.value===t){this._value=t,this.setSelected(o);return}this._selected!==nt?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let o of this.options)o.focused=o.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==nt&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=nt)}};function kt(e,t,...o){let r=document.createElementNS("http://www.w3.org/2000/svg",e);for(let n in t){if(n==="children")continue;let i=t[n];r.setAttribute(n==="className"?"class":n,i??"")}return o.length&&r.append(...o),r}function it(e){return kt("svg",e,kt("path",{d:e.d}))}function pl({host:e,target:t,position:o,onToggle:r,whenClosed:n=v}){return i=>(t.popover??="auto",t.togglePopover(i),r?.(i),i?f(J(e),b(window,"resize"),b(window,"scroll",{capture:!0,passive:!0})).tap(o):n)}function wa(e){let{host:t,beforeToggle:o,target:r}=e,n=pl({...e,whenClosed:D(t).tap(()=>{t.open=!0})});return f(b(r,"toggle").tap(i=>{let a=i.newState==="open";t.open=a}),m(t,"open").raf().switchMap(i=>(o?.(i),t.ariaExpanded=i?"true":"false",n(i))))}var Kt=class extends d{invalid=!1};s(Kt,{tagName:"c-field-help",init:[g("invalid")],augment:[p(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${A("body-small")}
}
	`),y,e=>(e.slot||="help",m(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var at=p(`
:host {
  display: block;
  position: relative;
  text-align: start;
  ${A("body-large")}
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
	${A("body-small")}
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
`),Dr=p(`
:host(:focus-within) slot[name=label] { color: var(--cxl-color-primary); }
slot[name=label] {
	${A("body-small")}
	height: 16px;
}
:host([floating]) slot[name=label] {
	display:none;
	transition: font var(--cxl-speed), height var(--cxl-speed), top var(--cxl-speed), left var(--cxl-speed);
}
:host([floating]) slot[name=label].novalue, :host([floating]) slot[name=label].value { display:block; }
`),fl=p(`
:host {
	border-radius: var(--cxl-shape-corner-xsmall) var(--cxl-shape-corner-xsmall) 0 0;
}
:host([floating]:not(:focus-within)) slot[name=label].novalue {
	${A("body-large")}
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

${Re(".content")}
	`);function ul(e){return f(G(e,"registable.form",!1).tap(t=>{t.id==="form"&&(e.input=t.target)}),Xe("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var ml=()=>h("div",{className:"content"},h("slot",{name:"leading"}),h("div",{className:"body"},h("slot",{name:"label"}),h("slot",{id:"bodyslot"})),h("slot",{name:"trailing"}),h("div",{className:"indicator"}));function dl(e){function t(u){n.next(u.touched&&u.invalid),e.toggleAttribute("invalid",n.value);let w=0,E=[];for(let T of a.assignedNodes())!(T instanceof HTMLElement)||T===l||("invalid"in T&&T.invalid?n.value&&(T.invalid===!0||T.invalid===u.validationResult?.key)?(w++,T.style.display="",E.push(Fe(T))):T.style.display="none":E.push(Fe(T)));let S=!n.value||w>0;l.textContent=S?"":u.validationMessage,S?l.remove():(l.parentElement||e.append(l),E.push(Fe(l))),E.length?u.setAria("describedby",E.join(" ")):u.setAria("describedby",null)}function o(u){let w=e.input;if(w){if(e.toggleAttribute("inputdisabled",w.disabled),t(w),!u)return;u.type==="focus"?i.next(!0):u.type==="blur"&&i.next(!1)}}function r(){let u=e.input?.value,w=!e.input?.hasAttribute("autofilled")&&(!u||u.length===0);c?.classList.toggle("novalue",w),c?.classList.toggle("value",!w)}let n=ie(!1),i=ie(!1),a=h("slot",{name:"help"}),c=e.contentElement.children[1]?.children[0],l=h(Kt,{ariaLive:"polite"});return N(e).append(h("div",{className:"help"},a)),f(m(e,"input").switchMap(u=>u?f(M(void 0).tap(()=>{o(),queueMicrotask(r)}),b(u,"focusable.change").tap(o).tap(r),b(u,"focus").tap(o),b(u,"invalid").tap(o),b(u,"update").tap(r),z(u,"touched").tap(()=>o()),f(b(u,"blur"),b(a,"slotchange")).raf(o),b(e.contentElement,"click").tap(()=>{document.activeElement!==u&&!e.matches(":focus-within")&&!i.value&&u.focus()})):v),ul(e))}var fe=class e extends d{floating=!1;input;size;contentElement=ml();static{s(e,{init:[x("floating"),O("input"),j("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,dl]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},Rr=class extends fe{};s(Rr,{tagName:"c-field",augment:[at,Dr,fl]});var gl=p(`
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
`),ka=p(`
${To("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function xl(e,t){return()=>{let o=e.parentElement instanceof fe?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${o.bottom}px`,t.style.left=`${o.x}px`,t.style.minWidth=`${o.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-o.bottom-16,280)}px`}}function Ir({host:e,target:t,input:o,position:r,beforeToggle:n,onToggle:i,handleOther:a,axis:c}){return f(Vo({host:e,input:o,handleOther:a,axis:c}),b(o??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),wa({host:e,target:t,position:r??xl(e,t),beforeToggle:n,onToggle:i}))}function hl(e){let{host:t}=e;return f(gl(t)??v,H(t)??v,ve(t),Ir(e))}var St=class extends d{};s(St,{tagName:"c-select-option",augment:[p(`
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
		`),y]});var zr=class extends wt{open=!1;optionView=St;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let o of this.options)o!==t&&(o.slot="");t&&(t.slot="selected")}}};s(zr,{tagName:"c-select",init:[x("open")],augment:[k("listbox"),p(`
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
	${q("surface-container")}
	border: 0;
	transform-origin: top;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-2);
	visibility:visible;
}
		`),e=>{let t=h("div",{className:"menu"},h("slot")),o=h("slot",{name:"selected"}),r=t.style,n=Ro(e),i=0,a=0;N(e).append(t,o,it({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function c(){if(e.open)a=e.selected?.rendered?.offsetHeight??0;else{r.cssText="";let l=e.options.reduce((u,w)=>Math.max(u,w.rendered?.offsetWidth??0),0);n.replaceSync(`:host{width:min(100%,${l}px)}`)}}return f(f(pt(e),_e()).raf(c),hl({host:e,target:t,handleOther:!0,beforeToggle(l){c();let u=e.selected;u&&(u.slot=l?"":"selected"),t.classList.toggle("open",l)},onToggle(l){let u=e.selected;!l&&u&&(i=u.rendered?.offsetHeight??0)},position(){let l=e.parentElement??e,u=Math.round((a-i)/2),w=e.selected?.rendered,E=l.getBoundingClientRect(),S=e.getBoundingClientRect(),T=S.top-14,R,I=w?w.offsetTop:0;I>T&&(I=T),R=t.scrollHeight;let F=window.innerHeight-S.top+8+I,P=S.top-u-I;R>F?R=F:R<S.height&&(R=S.height),r.top=P+"px",r.left=E.left+"px",r.maxHeight=R+"px",r.minWidth=E.width+"px",r.transformOrigin=`${I}px`}}))}]});function Lr(e){let t=Pt();return f(ae("field",e,o=>t.next(o)),t)}function Et(e){return Lr(e).switchMap(t=>m(e,"input").switchMap(o=>o?M(o):m(t,"input").switchMap(r=>r?M(r):v)))}function Gt(e,t,o){return m(e,o).tap(r=>Vt(t,o,r))}var bl="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function Ee({host:e,input:t,toText:o,toValue:r,update:n}){t.className="cxl-native-input",t.setAttribute("style",bl),t.setAttribute("form","__cxl_ignore__");function i(l){e.value=r?r(t.value||""):t.value,l.stopPropagation(),e.dispatchEvent(new Event(l.type,{bubbles:!0}))}function a(){let l=e.value,u=o?o(l,t.value):l||"";t.value!==u&&e.setInputValue(u)}function c(){t.ariaLabel=e.ariaLabel;let l=e.getAttribute("aria-labelledby");l?t.setAttribute("aria-labelledby",l):t.removeAttribute("aria-labelledby")}return f(ve(e,t),_(()=>(c(),t.form?b(t.form,"reset").tap(i):v)),m(e,"value").tap(()=>{o&&t.matches(":focus")||a()}),b(t,"blur").tap(a),b(t,"input").tap(i),b(t,"change").tap(i),Gt(e,t,"disabled"),Gt(e,t,"name"),Gt(e,t,"autocomplete"),Gt(e,t,"spellcheck"),Gt(e,t,"autofocus"),bo(e,["aria-label","aria-labelledby"]).tap(c),n?n.tap(a):v,b(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),b(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var Ct=class e extends se{inputValue="";static{s(e,{init:[O("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,b(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,o){o?this.inputEl.setAttribute(`aria-${t}`,o):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,o){$(this).setValidity({customError:t},o,this.inputEl),this.inputEl.setCustomValidity(t?o||"Invalid Field":"")}};var Br=[p(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),H],Zt=[...Br,y],ue=class e extends Ct{autofilled=!1;autocomplete;static{s(e,{init:[x("autofilled"),g("autocomplete")],augment:[t=>b(t.inputEl,"animationstart").tap(o=>{(o.animationName==="cxl-onautofillstart"||o.animationName==="cxl-onautofillend")&&(t.autofilled=o.animationName==="cxl-onautofillstart",U(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,o){this.inputEl.setSelectionRange(t,o)}getWindowSelection(){return this.shadowRoot?.getSelection?.()??getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},Pr=class extends ue{value="";inputEl=h("input",{className:"input"})};s(Pr,{tagName:"c-input-text",init:[g("value")],augment:[...Zt,e=>e.append(e.inputEl),e=>Ee({host:e,input:e.inputEl})]});function yl(e){getComputedStyle(e).direction==="rtl"?e.scrollLeft=1e6:e.scrollLeft=e.scrollWidth}var Ho=class e extends ue{selected;value;inputEl=h("input",{className:"input"});static{s(e,{tagName:"c-input-option",init:[g("value"),O("selected")],augment:[...Zt,t=>t.append(t.inputEl),t=>Ee({host:t,input:t.inputEl,toText:()=>t.selected?.textContent??"",toValue:o=>o!==""?t.selected?.value:void 0}),t=>z(t,"selected").tap(o=>{let r=t.selected?.textContent;t.value=o?.value,t.setInputValue(r??""),yl(t.inputEl)})]})}};function vl(e){return Vr(e,"^")}function Vr(e,t=""){if(e==="")return()=>!0;let o=wl(e,t);return r=>r.textContent?o.test(r.textContent):!1}function wl(e,t="",o="i"){return new RegExp(t+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o)}var Oo=class e extends d{optionView=St;open=!1;debounce=100;options=[];matcher=Vr;static{s(e,{tagName:"c-autocomplete",init:[x("open"),le("debounce")],augment:[k("listbox"),ka,V,t=>{let o=h("slot",{name:"empty"}),r=h("div",{id:"menu",tabIndex:-1},h("slot"),o),n=it({viewBox:"0 0 24 24",id:"caret",d:"M7 10l5 5 5-5z",width:20,height:20,fill:"currentColor"});n.style.cursor="pointer",o.style.display="none";function i(l){t.open=!0,c(l)}function a(l,u){l.setAria("activedescendant",Fe(u)),u.rendered?.scrollIntoView({block:"nearest"})}function c(l){let u=l.inputValue??l.value,w=t.doSearch(u);o.style.display=w?"none":"",w&&a(l,w)}return N(t).append(r,n),f(Et(t).switchMap(l=>(l.setAria("autocomplete","list"),l.role="combobox",l.setAria("controls",Fe(t)),l.setAria("haspopup",t.role),l.setAttribute("autocomplete","off"),f(m(t,"open").tap(u=>{if(u)n.tabIndex=-1,i(l);else{for(let w of t.options)w.focused=!1;n.tabIndex=0,l.setAria("activedescendant",null)}l.setAria("expanded",String(u))}),f(yo(n),b(n,"mousedown")).tap(u=>{u.preventDefault(),u.stopPropagation(),l.focus()}).debounceTime(100).tap(()=>{t.open=!0}),m(t,"debounce").switchMap(u=>b(l,"input").debounceTime(u).tap(()=>t.open?c(l):i(l))),b(t,"change").tap(u=>{u.target===t&&l.dispatchEvent(new Event("change",{bubbles:!0}))}),Ir({host:t,target:r,input:l}),f(Fr(t),z(l,"value").map(u=>{for(let w of t.options)if(w.value===u)return w})).tap(u=>{for(let w of t.options)w.focused=w.selected=!1;u&&(u.selected=!0),l instanceof Ho?l.selected=u:l.value=u?.value,u&&(t.open=!1)})))))}]})}doSearch(t){let o=0,r,n=this.matcher==="substring"?Vr:this.matcher==="prefix"?vl:this.matcher,i=t?n(String(t)):void 0;for(let a of this.options){let c=!i?.(a);a.hidden=c,a.focused=!(c||o++>0),a.focused&&(r=a)}return r}};var Hr=class extends Oo{onsearch;doSearch(t){return be(this,"search",{detail:t}),this.options[0]}};s(Hr,{tagName:"c-autocomplete-dynamic",init:[Co("search")]});var kl=p(`
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
	${A("title-large")}
}
svg,img { width: 100%; height: 100%; }
`),Or=class extends d{size;src="";text=""};s(Or,{tagName:"c-avatar",init:[j("size",e=>`{
				width: ${30+e*8}px;
				height: ${30+e*8}px;
				font-size: ${18+e*4}px;
			}`),g("src"),g("text")],augment:[kl,e=>{let t;return B(m(e,"src"),m(e,"text")).raf(([o,r])=>{t?.remove(),o?(t=new Image,t.alt=e.text,t.src=o):r?t=new Text(r):t=xt("person"),N(e).append(t)})}]});var Yr=class extends d{};s(Yr,{tagName:"c-body",augment:[p(`
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

${L("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),y]});var Yo=class extends d{};s(Yo,{tagName:"c-button-segmented-view",augment:[p(`
:host {
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 8px;
	padding: calc(4px + (var(--cxl-size,0) * 4px)) calc(16px + (var(--cxl-size,0) * 4px));
	overflow: hidden;
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	border-radius: var(--cxl-border-radius);
}
:host([selected]) {
	--cxl-color-surface: var(--cxl-color-secondary-container);
	--cxl-color-on-surface: var(--cxl-color-on-secondary-container);
}
:host([focused]) {
	background-image: var(--cxl-focused);
	outline: var(--cxl-focused-outline);
}
:host(:not([selected])) #check { display: none; }
:host(:not([selected])) { padding: 4px 32px; }
		`),Ye,Q,()=>h(ee,{id:"check",name:"check"}),y]});var _r=class extends wt{optionView=Yo;size};s(_r,{tagName:"c-button-segmented",init:[j("size",e=>`{
			font-size: ${14+e*1}px;
			min-height: ${40+e*8}px;
		}`)],augment:[k("listbox"),p(`
:host {
	display: grid;
	flex-shrink: 0;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	box-sizing: border-box;
	outline: 1px solid var(--cxl-color-outline);
	border-radius: 50vh;
	min-height: 40px;
	column-gap: 1px;
	background-color: var(--cxl-color-outline);
	color: var(--cxl-color-on-surface);
	overflow: hidden;
	${A("label-large")}
}
:host(:focus-visible) {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
	--cxl-focused-outline: 3px auto var(--cxl-color-secondary);
}
::slotted(:first-of-type) {
	--cxl-border-radius: 50vh 0 0 50vh;
}
::slotted(:last-of-type) {
	--cxl-border-radius: 0 50vh 50vh 0;
}
		`),H,y,ve,e=>Vo({host:e,axis:"x"})]});var Xr=class extends ht{};s(Xr,{tagName:"c-button-text",augment:[...ot,p(`
:host {
	${A("label-large")}
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
		`),Q,y]});function Ur(e="block"){let t=(o=>{for(let r=12;r>0;r--)o.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,o.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,o.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,o.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,o.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return o})({xl:"",lg:"",md:"",sm:"",xs:""});return p(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${L("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${L("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${L("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${L("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var jr=p(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${gt()}
${tt.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${tt.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),At=class extends d{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};s(At,{init:[x("sm"),x("xs"),x("md"),x("lg"),x("xl"),x("vpad"),x("pad"),x("center"),x("fill"),x("grow"),x("elevation"),re("color")]});var Qt=class extends At{};s(Qt,{tagName:"c-c",augment:[jr,Ur(),p(":host([center]) { text-align: center}"),y]});var Sl=p(`
:host {
	${q("surface-container")}
	${A("body-medium")}
	border-radius: var(--cxl-shape-corner-medium);
	overflow: hidden;
}
:host([variant=elevated]:not([color])) {
	--cxl-color-surface: var(--cxl-color-surface-container-low);
	z-index: 1;
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=outlined]:not([color])) {
	${q("surface")}
}
:host([variant=outlined]) {
	border: 1px solid var(--cxl-color-outline-variant);
}
${gt()}
`),Jt=class extends Qt{variant};s(Jt,{tagName:"c-card",init:[x("variant")],augment:[Sl]});var El=p(`
:host { ${Mo} }
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function Cl(e){return f(ae("list",e),m(e,"selected").tap(t=>e.ariaSelected=String(t)))}function Wr(e){return f(mr(e),ve(e,e,-1),Cl(e))}var Ce=class extends d{disabled=!1;touched=!1;selected=!1};s(Ce,{init:[x("disabled"),x("touched"),x("selected")],augment:[Wr]});var qr=class extends Ce{size};s(qr,{tagName:"c-item",init:[j("size",e=>`{min-height:${56+e*8}px}`)],augment:[El,H,Ye,k("option"),y,Q]});var Kr=class extends Jt{disabled=!1;touched=!1;selected=!1};s(Kr,{tagName:"c-card-item",init:[x("disabled"),x("touched"),x("selected")],augment:[k("option"),...ot,p(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),Wr,Q]});function Gr(e){return f(B(m(e,"indeterminate"),m(e,"checked")).map(([t,o])=>e.ariaChecked=t?"mixed":String(o)),f(D(e).tap(()=>{e.disabled||(e.indeterminate&&(e.indeterminate=!1),e.checked=!e.checked)}),m(e,"checked").tap(()=>{$(e).setFormValue(e.checked?String(e.value):null)}),z(e,"checked").tap(()=>{e.dispatchEvent(new Event("change",{bubbles:!0}))})).ignoreElements())}var Sa=class e extends se{value="on";checked=!1;indeterminate=!1;defaultChecked=!1;static{s(e,{tagName:"c-checkbox",init:[g("value"),g("checked"),g("indeterminate")],augment:[k("checkbox"),p(`
:host {
	position: relative;
	display: flex;
	column-gap: 16px;
	align-items: center;
	outline: none;
	cursor: pointer;
	text-align: start;
	padding: 15px;
	${A("body-large")}
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
${Re(".mask")}
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
`),ce,H,t=>{t.defaultChecked=t.checked;let o=h("div",{className:"mask"}),r=h("div",{className:"box"},it({className:"check",viewBox:"0 0 24 24",d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),it({className:"minus",viewBox:"0 0 24 24",d:"M19 13H5v-2h14v2z"}),o);return N(t).append(r,h("slot")),f(Q(o,t),Gr(t).tap(n=>r.setAttribute("state",n)))}]})}formResetCallback(){this.checked=this.defaultChecked,this.touched=!1}setFormValue(t){$(this).setFormValue(this.checked?t:null)}};var $t=class extends d{color;size=0};s($t,{tagName:"c-pill",init:[re("color","surface-container-low"),j("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[p(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${A("label-large")}
	display: inline-flex;
	align-items: center;
 	position: relative;
	overflow: hidden;
 	column-gap: 8px;
	flex-shrink: 0;
	flex-wrap: nowrap;
	align-self: center;
}
slot[name] { display: inline-block; }
		`),()=>h("slot",{name:"leading"}),y,()=>h("slot",{name:"trailing"})]});var Zr=class extends $t{disabled=!1;touched=!1;selected=!1};s(Zr,{tagName:"c-chip",init:[x("disabled"),x("touched"),x("selected")],augment:[k("button"),ce,...ot,p(`
:host { 
	cursor: pointer;
}
:host([disabled]) {
	background-color: color-mix(in srgb, var(--cxl-color--on-surface) 12%, transparent);
	color: color-mix(in srgb, var(--cxl-color--on-surface) 38%, transparent);
	border-color: color-mix(in srgb, var(--cxl-color-on-surface) 12%, transparent);
}
:host([selected]) {
	border-color: var(--cxl-color-secondary-container);
	${q("secondary-container")}
}
:host(:hover) { box-shadow: none; }
		`),Q]});var Qr=class extends d{date;format;locale};s(Qr,{tagName:"c-date",init:[sa("date"),g("format"),g("locale")],augment:[e=>B(m(e,"locale").switchMap(t=>W.getLocale(t)),m(e,"date"),m(e,"format")).raf(([t,o,r])=>e.textContent=o?t.formatDate(o,r):"")]});yt({"dialog.close":"Close dialog","dialog.cancel":"Cancel","dialog.ok":"Ok"});var $r=(e,t,o=e)=>D(e).tap(()=>U(o,"dialog.close",t)),en=p(`
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
	${q("surface-container-high")}
	
	box-sizing: border-box;
	min-width: 280px;
	max-width: calc(100% - 24px);
	padding: 24px;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-3);
	border-radius: var(--cxl-shape-corner-xlarge);
}

dialog::backdrop { background-color: var(--cxl-color-scrim); }

${L("small",".content { max-height: 85%; }")}
	`),Nt=class extends d{static=!1;open=!1;fullscreen=!1;dialog=document.createElement("dialog");returnValue};s(Nt,{init:[g("static"),g("open"),x("fullscreen")],augment:[V,e=>b(e,"keydown").tap(t=>{t.key==="Escape"&&(t.preventDefault(),e.open=!1)}),e=>b(e.dialog,"close").tap(()=>e.open=!1),e=>e.dialog,e=>m(e,"open").tap(t=>{t?e.static?e.dialog.show():te.openModal({element:e.dialog,close:()=>e.open=!1}):e.dialog.open&&(e.dialog.close(),be(e,"close"))}),e=>G(e,"dialog.close").tap(t=>{e.returnValue=t,e.open=!1})]});var Jr=class extends Nt{};s(Jr,{tagName:"c-dialog",augment:[en,e=>{e.dialog.append(h("slot",{className:"content"}))}]});function _o(e,t,...o){let r=h(e,t,...o);return new Promise(n=>{let i=()=>{r.removeEventListener("close",i),r.remove(),n(r.returnValue)};r.addEventListener("close",i),r.parentNode||document.body.append(r),r.open=!0})}var st=class extends Nt{};s(st,{tagName:"c-dialog-basic",augment:[en,p(`
dialog {
	display:flex; flex-direction:column;row-gap:16px;
	max-width: min(calc(100% - 24px), 560px);
}
slot[name=title] { ${A("title-large")} }
slot[name=actions] {
	display:flex; column-gap: 24px; align-items: center; justify-content: end; margin-top:8px;
}
		`),e=>{e.dialog.append(h("slot",{name:"title"}),h("slot"),h("slot",{name:"actions"}))}]});var Le=class extends d{};s(Le,{tagName:"c-span"});function Ug(e){let t=[],{message:o,title:r,action:n}=typeof e=="string"?{message:e}:e;return r&&t.push(h("div",{slot:"title"},r)),t.push(h(Le,void 0,o),h(we,{$:Po,variant:"text",slot:"actions"},n??W.get("dialog.ok"))),_o(st,{},...t)}function Jg(e){let t=[];typeof e=="string"&&(e={message:e});let{message:o,title:r,action:n,cancelAction:i}=e;return r&&t.push(h("div",{slot:"title"},r)),t.push(h(Le,void 0,o),h(we,{variant:"text",slot:"actions",$:a=>$r(a,!1)},i??W.get("dialog.cancel")),h(we,{variant:"text",slot:"actions",$:a=>$r(a,!0)},n??W.get("dialog.ok"))),_o(st,{},...t)}var tn=class extends d{motion;target};s(tn,{tagName:"c-dismiss",init:[g("motion"),g("target")],augment:[V,y,e=>Io(e,"target").switchMap(t=>t?D(e).tap(()=>{e.motion?Ot(e,t,e.motion).finalize(()=>t.remove()).subscribe():t.remove()}):v)]});function on(e,{target:t,clientX:o,clientY:r},n,i){if(!t)throw new Error("Invalid Event Target");return{type:e,target:t,clientX:o,clientY:r,startX:n,startY:i}}function Al(){let e={},t=ie(e),o=new oe;return{dragging:t,dropping:o,elements:e,next:()=>t.next(e)}}var qe=Al();function Nl(e){return({target:t,moveTarget:o,delay:r})=>{let n=!1,i=0;r??=60;let a=o||t,c=t.style,{userSelect:l,transition:u}=c;return new C(w=>{function E(F,P=!0){n?(n=!1,a.style.transition=u,R?.unsubscribe(),w.next(F),delete qe.elements.mouse,P&&qe.dropping.next({element:a,event:F}),qe.next()):clearTimeout(i)}let S=0,T=0;l=c.userSelect,c.userSelect="none";let R,I=f(e(t).switchMap(F=>{if(F.type==="pointerdown"){u=a.style.transition,F.preventDefault(),S=F.clientX,T=F.clientY;let P=F.pointerId;n=!1,i=setTimeout(()=>{if(a.style.transition="none",!!t.isConnected){try{t.setPointerCapture(P)}catch(de){console.error(de)}n=!0,w.next(on("start",F,S,T)),R=b(window,"keydown").tap(de=>{n&&de.key==="Escape"&&(de.preventDefault(),E({type:"end",target:t,clientX:0,clientY:0,startX:S,startY:T},!0))}).subscribe()}},r)}else if(F.type==="pointermove"){if(n){let P=on("move",F,S,T);w.next(P),qe.elements.mouse={element:a,event:P},qe.next()}}else return clearTimeout(i),M(F);return v}).debounceTime().tap(F=>E(on("end",F,S,T))),b(t,"click",{capture:!0}).tap(F=>{n&&F.target===t&&F.stopImmediatePropagation()})).subscribe();w.signal.subscribe(()=>{I.unsubscribe(),R?.unsubscribe(),c.userSelect=l})})}}function Ml(e){return e.style.touchAction||(e.style.touchAction="none"),b(e,"pointerdown").switchMap(t=>t.currentTarget?new C(o=>{o.next(t);let r=f(b(window,"pointermove").tap(n=>o.next(n)),f(b(window,"pointercancel"),b(window,"pointerup")).tap(n=>{o.next(n),r.unsubscribe()})).subscribe();o.signal.subscribe(()=>r.unsubscribe())}):v)}var Tl=Nl(Ml);function Fl(e){return Tl(e)}function Ea(e,t){let o=t.clientX,r=t.clientY;return e.left<o&&e.right>o&&e.top<r&&e.bottom>r}function Rl(e){let t=qe.elements,o=[],r;for(let n in t){let i=t[n];if(!i)continue;let{event:a,element:c}=i;c!==e&&(r||=e.getBoundingClientRect(),Ea(r,a)&&o.push({type:"over",target:e,relatedTarget:c,clientX:a.clientX,clientY:a.clientY}))}return o}function Dl(e){let t=0;return qe.dragging.switchMap(()=>{let o=Rl(e);return t===0&&o.length===0?v:(t=o.length,M(o))})}function zl(e){return Dl(e).switchMap(t=>t.length===0?M({type:"out",target:e,clientX:0,clientY:0}):xe(t))}function Il(e){return qe.dropping.switchMap(({element:t,event:o})=>e!==t&&Ea(e.getBoundingClientRect(),o)?M({type:"drop",target:e,clientX:o.clientX,clientY:o.clientY,relatedTarget:t}):v)}function Ll(e,t){return{width:e.offsetWidth,height:e.offsetHeight,x:t.clientX,y:t.clientY,sx:t.clientX/e.offsetWidth,sy:t.clientY/e.offsetHeight}}function Pl({target:e,moveTarget:t,axis:o}){let r;return n=>{let i=t||e;if(n.type==="start")r=Ll(i,n);else if(n.type==="end")i.style.transform="",r=void 0;else if(r){let a=o==="y"?0:(n.clientX-r.x)/r.width,c=o==="x"?0:(n.clientY-r.y)/r.height;return M({event:n,x:a,y:c,sx:r.sx,sy:r.sy})}return v}}function Bl(e){return({x:t,y:o})=>{let r=(e.moveTarget||e.target).style;r.transform=`translate(${t*100}%, ${o*100}%)`}}function Ca(e){let t=0;return f(b(e,"dragenter").tap(o=>{++t===1&&e.setAttribute("dragover",""),o.stopPropagation()}),b(e,"dragleave").tap(()=>{--t===0&&e.removeAttribute("dragover")}),b(e,"dragover").tap(o=>o.preventDefault()),b(e,"drop").tap(o=>{o.preventDefault(),o.stopPropagation(),e.removeAttribute("dragover"),t=0})).filter(o=>o.type==="drop")}function Aa(e){let t=e.moveTarget||e.target;return f(Fl(e).tap(o=>{o.type==="start"?t.toggleAttribute("dragging",!0):o.type==="end"&&t.toggleAttribute("dragging",!1)}).switchMap(Pl(e)).tap(Bl(e)).ignoreElements(),zl(t).tap(o=>t.toggleAttribute("dragover",o.type==="over")),Il(t))}var Na=class e extends d{dragging=!1;dragover=!1;target;static{s(e,{tagName:"c-drag-handle",init:[x("dragging"),x("dragover")],augment:[y,p(`
:host { display: block; cursor:grab; position: relative; touch-action: none; }
:host([dragging]) { z-index: 10 }
		`),t=>Io(t,"target").switchMap(o=>Aa({target:t,moveTarget:o,delay:150}).tap(r=>t.handleDrag?.(r)))]})}};var eo=class extends d{center=!1};s(eo,{tagName:"c-backdrop",init:[x("center")],augment:[p(`
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

	`),e=>b(e,"keydown").tap(t=>t.stopPropagation()),y]});var to=class extends ke{};s(to,{tagName:"c-toggle-panel",augment:[y,bt,De]});var Vl=p(`
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
${L("small","#drawer { width: 360px }")}

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
`),rn=class extends d{open=!1;position;responsive;permanent=!1};s(rn,{tagName:"c-drawer",init:[x("open"),x("position"),g("responsive"),g("permanent")],augment:[Vl,p(`
/* Position absolute so it doesn't interfere with layout if placed in the DOM */
:host { max-width: 360px; position: absolute; }
#drawer.permanent {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    width: 100%;
    height: 100%;
	z-index: 0;
	border-radius: 0;
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
:host([responsiveon]) { position: initial }
:host([responsiveon]) #backdrop { display: none; }
:host([responsiveon]) #dialog { display: contents; }
`),e=>{let t=ie(!1),o=f(m(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",n=h(to,{id:"drawer","motion-in":o.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":o.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},y),i=new eo;i.id="backdrop";let a=h("dialog",{id:"dialog"},i,n);return N(e).append(a),f(b(n,"close").tap(()=>a.close()),b(a,"close").tap(()=>e.open=!1),G(e,"drawer.close").tap(()=>e.open=!1).ignoreElements(),z(n,"open").tap(c=>e.open=c),z(e,"open").raf(c=>{c||n.scrollTo(0,0)}),b(i,"click").tap(()=>e.open=!1),b(a,"cancel").tap(c=>{c.preventDefault(),e.open=!1}),m(e,"open").tap(c=>{if(t.value&&e.permanent)return n.open=!0;c?t.value||(te.openModal({element:a,close:()=>e.open=!1}),a.getBoundingClientRect()):te.currentModal?.element===a&&te.modalClosed()}).raf(c=>{n.open=c}),m(e,"responsive").switchMap(c=>c!==void 0?Fo(document.body):M("xsmall")).switchMap(c=>{let l=Y.breakpoints[e.responsive||"large"],u=Y.breakpoints[c]>=l;return t.next(u),u&&n.className!=="permanent"?a.close():!u&&n.className==="permanent"&&(e.open=!1),u&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",u),n.className=u?"permanent":"drawer",z(e,"open").tap(w=>{e.hasAttribute("responsiveon")||ne({target:i,animation:w?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var nn=class extends je{icon="arrow_right"};s(nn,{tagName:"c-dropdown",init:[g("icon")],augment:[p(`
:host { display: flex; gap: 0; align-items: center; cursor: pointer; }
.icon { transition: rotate var(--cxl-speed); height:24px; width:24px; translate: -7px; margin-right: -6px; }
:host(:dir(rtl)) .icon { rotate: 180deg; }
:host([open]) .icon { rotate: 90deg; }
		`),e=>{let t=h(ee,{className:"icon"});return e.shadowRoot?.append(t,h("slot")),f(m(e,"icon").tap(o=>t.name=o),b(e,"keydown").tap(o=>{o.key==="ArrowRight"?e.open=!0:o.key==="ArrowLeft"&&(e.open=!1)}))}]});var Mt=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,o=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,o)):r.insertBefore(t,o))}empty(){let t=this.end.parentNode;if(!t||this.start.parentNode!==t)return;let o=document.createRange();o.setStartAfter(this.start),o.setEndBefore(this.end),o.deleteContents()}};function Ta({source:e,render:t,empty:o,append:r,loading:n}){let i=[],a=document.createDocumentFragment(),c,l;function u(w){if(l?.parentNode?.removeChild(l),!w)return;let E=0;for(let T of w){let R=i[E]?.item;if(R)R.value!==T&&R.next(T);else{let I=ie(T),F=t(I,E,w),P=F instanceof DocumentFragment?Array.from(F.childNodes):[F];i.push({elements:P,item:I}),a.append(F)}E++}a.childNodes.length&&r(a),c?.remove(),E===0&&o&&r(c=o());let S=i.length;for(;S-- >E;)i.pop()?.elements.forEach(T=>T.remove())}return _(()=>(l=n?.(),l&&r(l),e.raf(u)))}function jx(e){return Ao(()=>{let t=new Mt;return[Ta({...e,append:o=>t.insert(o)}),t.end]})}function Hl(e){if(e instanceof HTMLTemplateElement)return e;throw"Element must be a <template>"}function Ol(e,t){let o=e.getRootNode();if(o instanceof Document)return Hl(o.getElementById(t));throw new Error("Invalid root node")}function Ma(e,t){if(t){if(typeof t=="function")return t;if(typeof t=="string"&&(t=Ol(e,t)),t instanceof HTMLTemplateElement)return()=>t.content.cloneNode(!0);throw new Error("Invalid template")}}function Yl(e){return m(e,"template").switchMap(t=>t?M(Ma(e,t)):Je().map(()=>Ma(e,e.children[0])))}function _l(e,t,o){return Yl(e).switchMap(r=>{let n=e.target?ze(e,e.target)??e:e;return r?Ta({source:t,render:o?(i,a,c)=>o(r(i,a,c)):r,append:i=>n.append(i)}):v})}var an=class extends d{source;template};s(an,{tagName:"c-each",init:[O("source"),O("template")],augment:[V,y,e=>_l(e,m(e,"source"))]});var sn=class extends fe{};s(sn,{tagName:"c-field-bar",augment:[at,p(`
:host {
	box-sizing: border-box;
	${q("surface-container-high")}
	${A("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 8px 12px; }
		`)]});var ln=class extends fe{};s(ln,{tagName:"c-field-frame",augment:[p(`
slot[name=label] { ${A("body-large")} }
		`),at]});var cn=class extends fe{};s(cn,{tagName:"c-field-outlined",augment:[at,Dr,p(`
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
	${A("body-large")}
	height: 0;
	top: var(--cxl-field-outlined-label-top, 16px);
	inset-inline-start: unset;
}
${lr.map(e=>`:host([size="${e}"]) { --cxl-field-outlined-label-top: ${16+e*4}px }`)}
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
		`)]});var oo=class extends At{vflex=!1;gap;middle=!1};s(oo,{tagName:"c-flex",init:[x("vflex"),x("gap"),x("middle")],augment:[Ur("flex"),jr,p(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${tt.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),y]});var Fa=class e extends d{elements=new Set;initialValue;static{s(e,{tagName:"c-form",augment:[k("form"),V,t=>b(t,"submit",{capture:!0}).tap(o=>{o.preventDefault();let r;for(let n of t.elements)n.invalid&&(r??=n),n.touched=!0;r&&(r.focus(),o.stopPropagation(),o.stopImmediatePropagation())}),t=>Xe("form",t,t.elements).tap(o=>{let r=o.target,n=r.name,i=t.initialValue;i&&n&&n in i&&(r.value=i[n])}),y]})}checkValidity(){let t=!0;for(let o of this.elements)o.invalid&&(t=!1),o.touched=!0;return t}reset(){for(let t of this.elements)t.formResetCallback()}submit(){be(this,"submit")}requestSubmit(){this.submit()}getElementByName(t){for(let o of this.elements)if(o.name===t)return o}setTouched(t){for(let o of this.elements)o.touched=t}setFormData(t){this.initialValue=t;for(let o in t){let r=this.getElementByName(o);r&&(r.value=t[o])}}getFormData(){let t={};for(let o of this.elements){let r="checked"in o?o.checked?o.value:void 0:o.value;o.name&&(t[o.name]=r)}return t}};function Xl(e){let t=e.parentElement;for(;t;){if(t.tagName==="FORM"||t.tagName==="C-FORM")return t;t=t.parentElement}}var pn=class extends d{};s(pn,{tagName:"c-form-submit",augment:[V,y,e=>_(()=>{let t=Xl(e);return t?f(D(e).tap(()=>{if(t.tagName==="FORM"){let o;for(let r of t.elements)r instanceof se&&(r.invalid&&(o??=r),r.touched=!0);o?.focus()}t.requestSubmit()})):v})]});function Ul(e){let t=new CSSStyleSheet;return N(e).adoptedStyleSheets.push(t),m(e,"columns").raf(()=>{let o=`repeat(${e.columns}, minmax(0,1fr))`;t.replaceSync(`:host{grid-template-columns:${o}}`)})}var fn=class extends d{rows;columns=12};s(fn,{tagName:"c-grid",init:[g("columns"),g("rows")],augment:[y,p(`
:host{display:grid;gap:16px;box-sizing:border-box;}
${L("medium",":host{gap:24px}")}
`),Ul]});function jl(e){return Do("list",e,e.items)}function un(e){return Nr({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:jl(e)})}function mn(e){return Tr({getFocusable:()=>e.items,getActive:()=>Mr(e)})}function Xo(e){let t=mn(e);return f(un(e),Ie({host:e,goDown:()=>t(1),goUp:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length)}).tap(o=>o.focus()))}function ql(e){let t=mn(e);function o(r){return Math.round(r.getBoundingClientRect().left)}return f(un(e),Ie({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let r=ye(e)?.activeElement,n=r&&o(r);return t(-1,void 0,n!==void 0?i=>o(i)!==n:void 0)},goDown:()=>{let r=ye(e)?.activeElement,n=r&&o(r);return t(1,void 0,n!==void 0?i=>o(i)!==n:void 0)}}).tap(r=>r.focus()))}var dn=class extends d{items=[]};s(dn,{tagName:"c-grid-list",augment:[k("grid"),p(":host{display:grid;box-sizing:border-box;}"),y,ql]});var gn=class extends d{pad;vertical=!1};s(gn,{tagName:"c-hr",init:[x("pad"),x("vertical")],augment:[k("separator"),p(`
:host {
	display: block;
	height: 1px;
	background-color: var(--cxl-color-outline-variant);
	grid-column: 1 / -1;
}
:host([vertical]) {
	height: auto;
	width: 1px;
	align-self: stretch;
	margin-top: 8px;
	margin-bottom: 8px;
}
${tt.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function hn(e){let t=document.createElement("style");return f(X(o=>{let r=e.persistkey&&dr.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia("(prefers-color-scheme: dark)").matches),o.signal.subscribe(()=>t.remove())}),ut(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let o=e.open?e.themeon:e.themeoff;e.persistkey&&dr.set(e.persistkey,o),Gi(qi[o]||o)}),D(e).tap(()=>e.open=!e.open))}var xn=class extends d{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};s(xn,{tagName:"c-toggle-theme",init:[g("persistkey"),g("usepreferred"),g("open"),g("themeon"),g("themeoff")],augment:[k("group"),hn]});var bn=class extends pe{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};s(bn,{tagName:"c-icon-toggle-theme",init:[g("persistkey"),g("usepreferred"),g("open"),g("themeon"),g("themeoff")],augment:[hn,e=>B(m(e,"iconon"),m(e,"iconoff"),m(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var Wl=()=>{let e;function t(){let o=document.adoptedStyleSheets.indexOf(e);o!==-1&&document.adoptedStyleSheets.splice(o,1)}addEventListener("message",o=>{let{theme:r}=o.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r).catch(n=>console.error(n)),document.adoptedStyleSheets.push(e))})},Kl=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(()=>{document.fonts.ready.then(()=>{new ResizeObserver(t).observe(document.documentElement)},o=>console.error(o))})};document.readyState==="complete"?e():addEventListener("load",e)},yn=class extends d{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0;iframe=et("iframe",{loading:"lazy"})};s(yn,{tagName:"c-iframe",init:[g("src"),g("srcdoc"),g("sandbox"),g("handletheme")],augment:[p(`
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
	`),e=>{let t=e.iframe,o=et("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),o.style.display="none";function n(c){r.replaceSync(":host{height:"+c+"px}"),t.style.height="100%",t.style.opacity="1",o.style.display="none"}function i(c){if(c){let l=`<script type="module">
(${Kl.toString()})();
(${Wl.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${c}${l}`,o.style.display=""}}async function a(c){let l=new URL(c);return`${l.search||l.hash?`<script>history.replaceState(0,0,'about:srcdoc${l.search}${l.hash}');<\/script>`:""}<base href="${c}" />`+await fetch(c).then(u=>u.text())}return N(e).append(t,o),f(B(m(e,"srcdoc"),m(e,"src")).raf(([c,l])=>{(async()=>{i(l?await a(l):c)})().catch(()=>{})}),b(window,"message").tap(c=>{let{height:l}=c.data;c.source===t.contentWindow&&l!==void 0&&n(l)}),m(e,"handletheme").switchMap(c=>c?b(t,"load").switchMap(()=>dt.raf(l=>{let u=l?.css??"";t.contentWindow?.postMessage({theme:u},"*")})):v),m(e,"sandbox").tap(c=>c===void 0?t.removeAttribute("sandbox"):t.sandbox.value=c))}]});var Gl=yt({"input.clear":"Clear input value"}),vn=class extends pe{icon="close"};s(vn,{tagName:"c-input-clear",augment:[e=>Li(e,Gl("input.clear")),e=>Et(e).switchMap(t=>D(e).tap(()=>t.value=""))]});function Zl(e,t){return t.style.width="0",t.style.overflow="hidden",t.parentNode||e.append(t),f(f(b(t,"input"),b(t,"change")).map(o=>{if(o.stopPropagation(),e.dispatchEvent(new Event(o.type,{bubbles:!0})),t.files)return Array.from(t.files)}),D(e).tap(()=>t.click()).ignoreElements(),Ca(e).map(o=>{if(o.stopPropagation(),o.dataTransfer?.files.length)return Array.from(o.dataTransfer.files)}))}var wn=class extends Ct{value=void 0;inputEl=et("input",{tabIndex:-1,type:"file"})};s(wn,{tagName:"c-input-file",init:[O("value")],augment:[V,y,e=>{let t=e.inputEl;return t.setAttribute("form","__cxl_ignore__"),e.append(t),f(ur(e),Zl(e,t).tap(o=>{e.value=o}))}]});var kn=class e extends ue{value=void 0;formatter=Ql;inputEl=h("input",{className:"input"});static{s(e,{init:[g("value")],augment:[y,t=>t.append(t.inputEl),t=>Ee({host:t,input:t.inputEl,toText:(o,r)=>o!==void 0&&isNaN(o)?r:t.formatter(o),toValue:o=>{if(o===""){t.setValidity({key:"number",valid:!0});return}let r=Number(o);return t.setValidity({key:"number",valid:!isNaN(r)}),r}})]})}},Sn=class extends kn{};s(Sn,{tagName:"c-input-number",augment:[...Br]});function Ql(e){return e===void 0||isNaN(e)?"":e.toString()}var Ra=class e extends ue{value="";inputEl=h("input",{type:"password",className:"input"});static{s(e,{tagName:"c-input-password",init:[g("value")],augment:[...Zt,t=>t.append(t.inputEl),t=>Ee({host:t,input:t.inputEl})]})}};var En=class extends d{};s(En,{tagName:"c-input-placeholder",augment:[p(`
:host {
	display: inline-block;
	pointer-events: var(--cxl-override-pointer-events, none);
	color: var(--cxl-color-on-surface-variant);
	position: absolute;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
	`),y,e=>{let t=Ro(e);return Et(e).switchMap(o=>f(J(o),m(o,"value"),m(o,"inputValue")).raf(()=>{let r=o.inputValue??o.value,n=r===void 0||r==="";t.replaceSync(`:host{top:${o.offsetTop}px;left:${o.offsetLeft}px;width:${o.offsetWidth}px;height:${o.offsetHeight}px;${n?"":"display:none;"}`)}))}]});function Da(e,t){return e?typeof e=="string"?(t.setAttribute("aria-label",e),v):Ve(e).tap(o=>{e.textContent&&t.setAttribute("aria-labelledby",o)}).finalize(()=>{t.removeAttribute("aria-labelledby")}):v}var Cn=class extends d{};s(Cn,{tagName:"c-label",augment:[p(`
:host {
	display: inline-block;
}`),y,e=>Lr(e).switchMap(t=>"input"in t?m(t,"input").switchMap(o=>o?Da(e,o):v):Da(e,t)),e=>X(()=>{e.slot="label"})]});var Jl=p(`
#body {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
  column-gap: 0;
}
:host([type=grid]) #body { display: grid; }
:host([type="two-column-left"]) #body,
:host([type="two-column-right"]) #body,
:host([type="three-column"]) #body,
:host([type="two-column"]) #body {
  row-gap: 32px;
}

:host([type="item"]) #body {
	${Mo}
}

${L("small",`
  #body {
    column-gap: 32px;
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
  :host([type="two-column-left"]) #body {
    grid-template-columns: 2fr 1fr;
    column-gap: 64px;
    row-gap: 32px;
  }
  :host([type="three-column"]) #body {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 32px;
    row-gap: 32px;
  }
  :host([type="four-column"]) #body {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
  }
  :host([type="two-column-right"]) #body {
    grid-template-columns: 1fr 2fr;
    column-gap: 64px;
    row-gap: 32px;
  }
  :host([type="two-column"]) #body {
    grid-template-columns: 1fr 1fr;
    column-gap: 48px;
    row-gap: 32px;
  }
`)}
${L("large",`
  #body {
    width: 100%;
    max-width: 1200px;
  }

  :host([center]) #body {
    margin-left: auto;
    margin-right: auto;
  }
`)}
:host { display:block }
:host([type=block]) #body { display: block }
:host([full]) #body { width:auto;max-width:none }
`),Uo=class extends d{type;center=!1;full=!1};s(Uo,{init:[x("type"),x("center"),x("full")]});var ro=class extends Uo{};s(ro,{tagName:"c-layout",augment:[Jl,()=>h("div",{id:"body",part:"body"},h("slot"))]});var An=class extends d{items=[]};s(An,{tagName:"c-list",augment:[p(":host{display:block;padding:8px 0;}"),k("listbox"),y,Xo]});var $l=p(`
:host {
	position: fixed;
	margin: 0;
	padding: 0;
	outline: 0;
	border: 0;
	display: block;
	border-radius: var(--cxl-shape-corner-xsmall);
	box-shadow: var(--cxl-elevation-2);
	${q("surface-container")}
}
::backdrop { overflow: hidden; }
:host([static]) { position: static; }
	`);function ec(e){function t(){e.exclusive&&!e.static&&te.popupOpened({element:e,close:()=>e.open=!1}),e.static||(e.popover??="auto",e.showPopover())}return m(e,"open").switchMap(o=>o?(t(),f(b(e,"keydown").tap(r=>{r.key==="Escape"&&(e.open=!1,e.returnTo?.focus(),r.preventDefault(),r.stopPropagation())}),b(e,"toggle").tap(r=>{let n=r.newState==="open";n||(e.open=n)}),z(e,"open").tap(r=>{!r&&e.popover&&e.hidePopover()}),b(e,"close").tap(r=>{r.target===e&&e.popover&&e.hidePopover()}))):v)}var no=class extends ke{exclusive=!0;static=!1;trigger;returnTo};s(no,{tagName:"c-popup",init:[g("exclusive"),x("static")],augment:[y,bt,$l,De,ec]});var Nn=class extends no{"motion-in"="fadeIn";"motion-out"="fadeOut";items=[];focusstart;setFocus(){let t=ye(this)?.activeElement;if(!(t&&this.contains(t))){if(this.focusstart==="selected"){let o=this.items.find(r=>r.selected);if(o){o.focus();return}}this.items[0]?.focus()}}};s(Nn,{tagName:"c-menu",init:[g("focusstart")],augment:[k("menu"),p(To()),Xo,e=>m(e,"open").tap(t=>{t&&e.setFocus()})]});var ao=[p(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${A("label-large")}
	box-sizing: border-box;
	position: relative;
	cursor: pointer;
	border-radius: 28px;
	overflow:hidden;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 12px;
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
:host slot::after { content: ''; position: absolute; inset: 0; }
${Re("slot::after")}
	`),H,ra,y],io=class extends Ce{size};s(io,{tagName:"c-nav-item",init:[j("size",e=>`{min-height:${56+e*8}px}`)],augment:[k("option"),...ao]});var Mn=class extends Ce{icon="arrow_drop_down";open=!1;target;size};s(Mn,{tagName:"c-nav-dropdown",init:[g("icon"),g("target"),x("open"),j("size",e=>`{min-height:${56+e*8}px}`)],augment:[k("treeitem"),...ao,p(`
:host { padding-inline: 16px 36px; }
.icon { position: absolute; inset-inline-end: 8px; transition: rotate var(--cxl-speed); height:24px;width:24px; }
:host([open]) .icon { rotate: 180deg; }
		`),e=>rt(e).raf(({target:t,open:o})=>t.open=o),e=>{let t=h(ee,{className:"icon"});return N(e).append(t),f(m(e,"icon").tap(o=>t.name=o))}]});var so=class extends je{icon="more_vert";motion};s(so,{tagName:"c-toggle-icon",init:[g("icon")],augment:[e=>{let t;return f(m(e,"icon").raf(o=>{if(!o)return t?.remove();t=xt(o),N(e).append(t)}),m(e,"open").raf(()=>{t&&e.motion&&ne({target:t,animation:e.motion,options:{direction:e.open?"normal":"reverse",fill:"both"}})}))}]});var Tn=class extends Ce{icon="arrow_right";open=!1;target;size};s(Tn,{tagName:"c-nav-tree-item",init:[g("icon"),g("target"),x("open"),j("size",e=>`{min-height:${56+e*8}px}`)],augment:[k("treeitem"),...ao,p(`
:host { padding-inline-start: 20px; }
.icon { position: absolute; inset-inline-start: 0px; transition: rotate var(--cxl-speed); height:24px;width:24px; }
:host(:dir(rtl)) .icon { rotate: 180deg; }
:host([open]) .icon { rotate: 90deg; }
		`),e=>{let t=h(so,{className:"icon"});N(e).append(t);function o(r){if(Array.isArray(r)){for(let n of r)if(n.childNodes.length)return!0}else if(r?.childNodes.length)return!0;return!1}return f(m(e,"icon").tap(r=>t.icon=r),m(e,"open").tap(r=>{e.ariaExpanded=String(r),t.open=r}),m(e,"target").switchMap(()=>{let r=Lo(e),n=o(r);return t.style.display=n?"":"none",t.target=r,r?Bi(e,Array.isArray(r)?r:[r]):v}),m(t,"open").tap(r=>e.open=r),b(e,"keydown").tap(r=>{r.key==="ArrowRight"?e.open=!0:r.key==="ArrowLeft"&&(e.open=!1)}))}]});var Fn=class extends Yt{};s(Fn,{tagName:"c-nav-target",augment:[k("group"),p(":host{display:block;padding-inline-start:12px;}")]});var Rn=class extends d{};s(Rn,{tagName:"c-nav-headline",augment:[p(`
:host{
	color:var(--cxl-color-on-surface-variant);
	font:var(--cxl-font-title-small);
	letter-spacing:var(--cxl-letter-spacing-title-small);
	min-height:48px;
	display:flex;
	align-items: center;
	padding: 0 16px;
}
`),y]});var Dn=class extends pe{open=!1;target;icon="menu"};s(Dn,{tagName:"c-navbar-toggle",init:[g("target"),O("open")],augment:[e=>rt(e).tap(({target:t,open:o})=>t.open=o)]});var Tt=class extends Ut{duration=4e3;"motion-in"="slideInUp,fadeIn";"motion-out"="fadeOut";open=!1;static=!1};s(Tt,{tagName:"c-snackbar",init:[x("open"),le("duration"),g("motion-in"),g("motion-out"),g("static")],augment:[p(`
:host {
	display: inline-flex;
	justify-content: left;
	margin: 16px auto;
	border: 0; outline: 0;
	top: auto;
}
slot[name=action] { margin-inline-start: auto; display: block; }
	`),()=>h("slot",{name:"action"}),e=>m(e,"open").tap(t=>{t&&!e.static&&(e.popover="manual",e.showPopover())}),bt,De,e=>b(e,"close").tap(()=>e.remove())]});var lo=class extends d{queue=[];notify(t){let o;return typeof t=="string"?o=h(Tt,void 0,t):t instanceof HTMLElement?o=t:o=h(Tt,t,t.content),new Promise(r=>{this.queue.push([o,r]),this.queue.length===1&&this.queue[0]&&this.notifyNext(this.queue[0])})}notifyNext([t,o]){let r=()=>{this.queue.shift(),t.removeEventListener("close",r),o(),this.queue[0]&&this.notifyNext(this.queue[0])};this.shadowRoot?.append(t),t.addEventListener("close",r),t.open=!0}};s(lo,{tagName:"c-snackbar-container",augment:[p(`
:host {
	position:relative; width: 100%; height: 0;
	display: flex; text-align:center; align-items: end;
	overflow: visible;
}`)]});var za;function av(e){let t;return typeof e=="string"?e={content:e}:e instanceof HTMLElement||(t=e.container),t||(t=za??=new lo,t.parentNode||document.body.appendChild(t)),t.notify(e)}function sv(e){za=e}function Ia(e){return f(m(e,"selected").pipe(Ii(e,"selected")),ae("selectable",e),D(e).tap(()=>U(e,"selectable.action",e)))}var zn=class extends d{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};s(zn,{tagName:"c-option",init:[g("value"),O("view"),x("selected"),x("hidden"),x("focused")],augment:[k("option"),p(":host{display:contents} :host([hidden]){display:none;}"),vt,Ia,e=>{let t;return f(m(e,"view").switchMap(o=>o?(t?.remove(),e.rendered=t=new o,t.appendChild(h("slot")),N(e).append(t),f(m(e,"selected").tap(r=>t?.toggleAttribute("selected",r)),m(e,"focused").tap(r=>t?.toggleAttribute("focused",r)))):(e.rendered=t=void 0,v)))}]});var In=class extends d{};s(In,{tagName:"c-page",augment:[Bo,p(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${q("background")}
}`),y]});var Ln=class extends d{value=1/0;color},La={duration:2e3,iterations:1/0,easing:"cubic-bezier(0.4, 0, 0.6, 1)"};s(Ln,{tagName:"c-progress",init:[g("value"),re("color","primary",".bar")],augment:[k("progressbar"),mt("valuemax","1"),p(`
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
	`),e=>{let t,o,r=h("div",{className:"bar"}),n=h("div",{className:"bar"});return N(e).append(r,n),m(e,"value").tap(i=>{i!==1/0&&i>1?i=1:i<0&&(i=0),e.ariaValueNow=i===1/0?null:String(i),e.ariaBusy=String(i!==1),e.toggleAttribute("indeterminate",i===1/0),i===1/0?(t=ne({target:r,animation:{kf:{transform:["translateX(-100%) scaleX(0.3)","translateX(0%) scaleX(0.8)","translateX(100%) scaleX(0.3)"]},options:La}}),o=ne({target:n,animation:{kf:{transform:["translate(-150%, -100%) scaleX(0.4)","translate(-50%, -100%) scaleX(0.6)","translate(100%, -100%) scaleX(0.4)"]},options:La}})):(t?.cancel(),o?.cancel()),r.style.transform=i===1/0?"":"scaleX("+i+")"})},vt]});var Pn=class extends d{value=1/0};s(Pn,{tagName:"c-progress-circular",init:[le("value")],augment:[k("progressbar"),mt("valuemax","1"),p(`
:host {
	display: inline-block;
	width: 48px;
	height: 48px;
}
svg { width: 100%; height: 100% }
		`),e=>{let t=kt("svg",{viewBox:"0 0 100 100"}),o=kt("circle",{cx:"50%",cy:"50%",r:"45",style:"stroke:var(--cxl-color-secondary-container);fill:transparent;stroke-width:10%;stroke-dasharray:282.743px"}),r=kt("circle",{cx:"50%",cy:"50%",r:"45",style:"stroke:var(--cxl-color-primary);fill:transparent;transition:stroke-dashoffset var(--cxl-speed);stroke-width:10%;transform-origin:center;stroke-dasharray:282.743px"});return t.append(o,r),N(e).append(t),m(e,"value").switchMap(n=>{if(e.ariaValueNow=n===1/0?null:String(n),e.ariaBusy=String(n!==1),n!==1/0){let a=282.743-282.743*Math.max(0,Math.min(1,n));r.style.strokeDashoffset=`${a}px`,r.style.transform="rotate(-90deg)"}return n===1/0?f(Ht({target:e,animation:"spin",options:{iterations:1/0,duration:2e3,easing:"linear"}}),Ht({target:r,animation:{options:{duration:4e3,iterations:1/0,easing:"cubic-bezier(.35,0,.25,1)"},kf:((i,a)=>[{offset:0,strokeDashoffset:i,transform:"rotate(0)"},{offset:.125,strokeDashoffset:a,transform:"rotate(0)"},{offset:.12501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(72.5deg)"},{offset:.25,strokeDashoffset:i,transform:"rotateX(180deg) rotate(72.5deg)"},{offset:.2501,strokeDashoffset:i,transform:"rotate(270deg)"},{offset:.375,strokeDashoffset:a,transform:"rotate(270deg)"},{offset:.37501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(161.5deg)"},{offset:.5,strokeDashoffset:i,transform:"rotateX(180deg) rotate(161.5deg)"},{offset:.5001,strokeDashoffset:i,transform:"rotate(180deg)"},{offset:.625,strokeDashoffset:a,transform:"rotate(180deg)"},{offset:.62501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(251.5deg)"},{offset:.75,strokeDashoffset:i,transform:"rotateX(180deg) rotate(251.5deg)"},{offset:.7501,strokeDashoffset:i,transform:"rotate(90deg)"},{offset:.875,strokeDashoffset:a,transform:"rotate(90deg)"},{offset:.87501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(341.5deg)"},{offset:1,strokeDashoffset:i,transform:"rotateX(180deg) rotate(341.5deg)"}])((282.743*(1-.05)).toString(),(282.743*(1-.8)).toString())}})):v})},vt]});var Bn=class extends d{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};s(Bn,{tagName:"c-r",init:[x("xl"),x("lg"),x("md"),x("sm"),x("xs")],augment:[p(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${L("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${L("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${L("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${L("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),y]});function Vn({source:e,renderFn:t,loading:o,error:r}){return Ao(()=>{let n=new Mt,i=!1;return[f(o?Me(750).tap(()=>{i||n.insert(o())}):v,e.tap(a=>{i=!0,n.empty();let c=t(a);c&&n.insert(c)}).catchError(a=>{if(i=!0,r)return n.empty(),n.insert(r(a)),v;throw a})),n.end]})}function Pa(e,t,o=()=>h(ee,{name:"star",fill:!0})){let r=[],n,i=0;for(;i<e;i++)n=o(i),n.classList.add(t),r.push(n);if(e!==i){let a=e+1-i;if(n&&a){let c=`${a*100}%`;n.style.clipPath=`polygon(0 0, ${c} 0, ${c} 100%, 0 100%)`}}return r}var Hn=class extends d{max=5;rating=0;alt};s(Hn,{tagName:"c-rating",init:[le("max"),le("rating"),x("alt")],augment:[k("img"),p(`
:host {
  display: inline-block;
  position: relative;
  color: #faaf00;
  stroke: currentColor;
}
.group {
  position: absolute;
  left: 0;
  top: 0;
}
.bgstar {
  color: var(--cxl-color-outline-variant);
}
	`),e=>Vn({source:m(e,"max"),renderFn:()=>h("span",void 0,...Pa(e.max,"bgstar"))})(e),e=>Vn({source:m(e,"rating"),renderFn:t=>h("span",{className:"group"},...Pa(Number(t)>e.max?e.max:Number(t),"star"))})(e)]});var tc=/([^&=]+)=?([^&]*)/g,oc=/:([\w_$@]+)/g,rc=/\/\((.*?)\)/g,nc=/(\(\?)?:\w+/g,ic=/\*\w+/g,ac=/[-{}[\]+?.,\\^$|#\s]/g,Wn="@@cxlRoute",me={location:window.location,history:window.history};function sc(e){let t=[];return[new RegExp("^/?"+e.replace(ac,"\\$&").replace(rc,"\\/?(?:$1)?").replace(nc,function(r,n){return t.push(r.substr(1)),n?r:"([^/?]*)"}).replace(ic,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function lc(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function On(e,t){return t?e.replace(oc,(o,r)=>t[r]||""):e}function cc(e){let t={},o;for(;o=tc.exec(e);)o[1]!==void 0&&(t[o[1]]=decodeURIComponent(o[2]??""));return t}var Yn=class{path;regex;parameters;constructor(t){this.path=t=lc(t),[this.regex,this.parameters]=sc(t)}_extractQuery(t){let o=t.indexOf("?");return o===-1?{}:cc(t.slice(o+1))}getArguments(t){let r=this.regex.exec(t)?.slice(1);if(!r)return;let n=this._extractQuery(t);return r.forEach((i,a)=>{let c=a===r.length-1?i||"":i?decodeURIComponent(i):"",l=this.parameters[a];l&&(n[l]=c)}),n}test(t){return this.regex.test(t)}toString(){return this.path}},_n=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new Yn(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let o=this.definition.render();o[Wn]=this;for(let r in t)t[r]!==void 0&&(o[r]=t[r]);return o}},Xn=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(o=>o.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(o=>o.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function pc(e){return e[Wn]}function Un(e,t){let o=new URL(e,`http://localhost/${t}`);return{path:o.pathname.slice(1),hash:o.hash.slice(1)}}var fc={getHref(e){return`${me.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=co()?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let o=this.getHref(e);o!==`${location.pathname}${location.search}${location.hash}`&&me.history.pushState({url:e},"",o)}},deserialize(){return{path:me.location.search.slice(1),hash:me.location.hash.slice(1)}}};function co(){return me.history.state}var uc={getHref(e){return`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=co()?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let o=this.getHref(e);o!==`${location.pathname}${location.search}${location.hash}`&&me.history.pushState({url:e},"",o||"/")}},deserialize(){return{path:me.location.pathname,hash:me.location.hash.slice(1)}}},Ba={getHref(e){return`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Ba.getHref(e);me.location.hash!==t&&(me.location.hash=t)},deserialize(){return Un(me.location.hash.slice(1),"")}},Ft={hash:Ba,path:uc,query:fc},jn=class{callbackFn;state;routes=new Xn;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let o=new _n(t);return this.routes.register(o),o}go(t){this.lastGo=t;let o=this.state?.url,r=typeof t=="string"?Un(t,o?.path??""):t,n=r.path;if(n!==o?.path){let i=this.routes.findRoute(n);if(!i)throw new Error(`Path: "${n}" not found`);let a=i.path?.getArguments(n);if(i.redirectTo)return this.go(On(i.redirectTo,a));let c=this.execute(i,a);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${n}" could not be created`);this.updateState({url:r,arguments:a,route:i,current:c,root:this.root})}else this.state&&r.hash!=o.hash&&this.updateState({...this.state,url:r})}getPath(t,o){let n=this.routes.get(t)?.path;return n&&On(n.toString(),o)}isActiveUrl(t){let o=this.state?.url;if(!o)return!1;let r=Un(t,o.path);return!!Object.values(this.instances).find(n=>{let i=n[Wn],a=this.state?.arguments;if(i?.path?.test(r.path)&&(!r.hash||r.hash===o.hash)){if(a){let c=i.path.getArguments(r.path);for(let l in c)if(a[l]!=c[l])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,o){let r=this.instances[t],n;if(r)for(n in o){let i=o[n];i!==void 0&&(r[n]=i)}return r}executeRoute(t,o,r){let n=t.parent,i=n&&this.routes.get(n),a=t.id,c=i&&this.executeRoute(i,o,r),l=this.findRoute(a,o)||t.create(o);return c?l.parentNode!==c&&c.appendChild(l):this.root=l,r[a]=l,l}discardOldRoutes(t){let o=this.instances;for(let r in o){let n=o[r];n&&t[r]!==n&&(n.parentNode?.removeChild(n),delete o[r])}}execute(t,o){let r={},n=this.executeRoute(t,o||{},r);return this.discardOldRoutes(r),this.instances=r,n}},We=new lt,Va=new lt,Z=new jn(()=>We.next());function o0(e){return t=>{let o=typeof e=="string"?{path:e}:e;Z.route({...o,render:()=>new t})}}function r0(e=""){return t=>{let o=typeof e=="string"?{path:e}:e;Z.route({...o,isDefault:!0,render:()=>new t})}}function n0(e){return We.map(()=>Z.isActiveUrl(e))}function mc(e){let t=e;for(;t=t.parentElement;)if(t.scrollTop!==0)return t.scrollTo(0,0)}function Kn(e){let t;return We.tap(()=>{let{root:o}=Z.getState();o.parentNode!==e?e.appendChild(o):t&&t!==o&&t.parentNode&&e.removeChild(t),t=o}).raf(()=>{let o=Z.getState().url;if(o.hash)e.querySelector(`#${o.hash},a[name="${o.hash}"]`)?.scrollIntoView();else{let r=co()?.lastAction;e.parentElement&&r&&r!=="pop"&&mc(e)}})}function Ha(e,t=Ft.query){return f(X(()=>Va.next(t)),e.tap(()=>Z.go(t.deserialize())),We.tap(()=>t.serialize(Z.getState().url))).catchError(o=>{if(o?.name==="SecurityError")return v;throw o})}function dc(){return We.switchMap(()=>{let e=Z.getState(),t=[],o=e.current;do{let r=o.routeTitle;r&&t.unshift(r instanceof C?r:M(r))}while(o=o.parentNode);return B(...t)}).tap(e=>document.title=e.join(" - "))}function Oa(){return Ne(M(location.hash.slice(1)),b(window,"hashchange").map(()=>location.hash.slice(1)))}var jo;function gc(){if(!jo){jo=new It(history.state);let e=history.pushState;history.pushState=function(...t){let o=e.apply(this,t),r=co();return r&&(r.lastAction="push",jo?.next(r)),o}}return f(b(window,"popstate").map(()=>{let e=co();return e&&(e.lastAction="pop"),e}),jo)}function Ya(){let e;return f(Oa(),gc()).map(()=>window.location).filter(t=>{let o=t.href!==e;return e=t.href,o})}function xc(e,t=Ft.query,o){let r=typeof t=="string"?Ft[t]:t,n=o||(r===Ft.hash?Oa():Ya());return f(Kn(e),Ha(n,r),dc())}function i0(e=Ft.query,t){return o=>xc(o,e,t)}var a0=We.raf().map(()=>{let e=[],t=Z.getState(),o=t.current;do o.routeTitle&&e.unshift({title:o.routeTitle,first:o===t.current,path:hc(o)});while(o=o.parentNode);return e});function hc(e){let t=pc(e);return t&&On(t.path?.toString()||"",Z.state?.arguments||{})}function s0(e){return D(e).tap(t=>{t.preventDefault(),e.external?location.assign(e.href):Z.go(e.href)})}function qo(e,t,o=t){return f(B(Va,ut(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),D(t).tap(r=>{e.target||r.preventDefault()}),D(o).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):Z.go(e.href))}))}function bc(e,t){let o=document.createElement("div");return o.style.display="contents",o.routeTitle=t,o.appendChild(e.content.cloneNode(!0)),o}var qn=class extends d{strategy="query";get state(){return Z.state}go(t){return Z.go(t)}};s(qn,{tagName:"c-router",init:[g("strategy")],augment:[e=>{function t(o){let r=o.dataset;if(r.registered)return;r.registered="true";let n=r.title||void 0;Z.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:o.hasAttribute("data-default"),redirectTo:r.redirectto,render:bc.bind(null,o,n)})}return Je().switchMap(()=>{for(let o of Array.from(e.children))o instanceof HTMLTemplateElement&&t(o);return f(ho(e).tap(o=>{o.type==="added"&&o.value instanceof HTMLTemplateElement&&t(o.value)}),m(e,"strategy").switchMap(o=>{let r=Ft[o];return Ha(Ya(),r).catchError((n,i)=>(console.error(n),i))}))})}]});function Zn(e,t=e){return f(yc(e,t).ignoreElements(),We.map(()=>e.href!==void 0&&Z.isActiveUrl(e.href)))}function yc(e,t=e){let o=h("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return o.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,N(e).append(o),f(qo(e,o),b(o,"click").tap(r=>{r.stopPropagation(),Bt(r)||e.dispatchEvent(new PointerEvent(r.type,r)),U(e,"drawer.close",void 0)}),D(t).tap(r=>{Bt(r)&&o.click()}))}var Gn=class extends d{href};s(Gn,{tagName:"c-router-selectable",init:[g("href")],augment:[V,()=>h("slot"),e=>_(()=>{let t=e.parentElement;return Zn(e,t).raf(o=>{t.selected=o})})]});var Qn=class extends io{href;external=!1;target};s(Qn,{tagName:"c-router-item",init:[g("href"),g("external"),g("target")],augment:[e=>Zn(e).tap(t=>{e.selected=t})]});var po=class extends d{href;focusable=!1;external=!1;dismiss=!1;target};s(po,{tagName:"c-router-link",init:[g("href"),g("focusable"),g("external"),g("target"),g("dismiss")],augment:[p(`
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
	`),e=>{let t=h("a",{className:"link"},h("slot"));return N(e).append(t),f(m(e,"focusable").tap(o=>t.tabIndex=o?0:-1),Po(e),qo(e,t))}]});var Jn=class extends po{focusable=!0};s(Jn,{tagName:"c-router-a",augment:[p(`
:host{text-decoration:underline;}
.link { display:inline-block; }
:host(:focus-within) .link { outline:var(--cxl-color-primary) auto 1px; }
`)]});var $n=class extends d{};s($n,{tagName:"c-router-outlet",init:[],augment:[k("main"),V,Kn,y]});function vc(e){function t(){F=a[w],o(),Dt=!1}function o(){P=Math.min(Math.round(R*Ke),T),de=(R-Math.floor(F/Ke))/(P-F||1),(!isFinite(de)||de<=0)&&(de=.01)}function r(Ae){throw console.error(`Faulty element detected: 
The provided element has an invalid or unmeasurable size. Check that the "${w}" of the element is not zero or negative. Make sure the element is styled properly and any necessary dimensions are set correctly before rendering.`),console.log(Ae),new Error("Rendered element size returned invalid value.")}function n(){Dt&&t();let Ae=Ko=a[S],mi=de*Ae;Rt=mi|0;let Go=Math.max(Math.min(Rt,R-I+1),0),di=Rt+I>R?1/0:F,gi=mi-Rt,Ge=Go,uo=0,xi=0,Ze=0,hi=0,zt=0;for(I=0,Go>0?Ze=-(c(Ge-1,uo++,"pre")[w]+gi*Ke):Ze=-gi*Ke;Ge>=0&&xi<di&&Ge<R;){let Pe=c(Ge++,uo++,"on"),Zo=Pe[w];Zo<=0&&r(Pe),I===0&&(hi=Pe[E]),zt=Pe[E]+Zo,xi=zt+Ze,I++}if(Ge<R&&di&&c(Ge,uo++,"post"),u?.(uo),I>0){let Pe=(zt-hi)/I;Pe!==Ke&&(Ke=Ke*.75+Pe*.25)}return I>1&&Rt+I>=R&&(Ze=F-zt,Ze>0&&(Ze=0)),ui?(t(),ui=!1):Ae+zt>P&&o(),{start:Go,end:Ge,totalSize:P,count:I,offset:Ze}}let{axis:i,scrollElement:a,render:c,refresh:l,remove:u}=e,w=i==="x"?"offsetWidth":"offsetHeight",E=i==="x"?"offsetLeft":"offsetTop",S=i==="x"?"scrollLeft":"scrollTop",T=5e6,R=e.dataLength,I=0,F=0,P=0,de=0,Ke=50,Rt=0,ui=!0,Dt=!0,Ko=NaN,Ua=b(a,"scroll",{passive:!0});return f(l?.tap(Ae=>{Ae?.dataLength!==void 0&&(R=Ae.dataLength,Dt=!0),Ko=NaN})??v,wo(a).switchMap(Ae=>Ae?f(J(a).tap(()=>Dt=!0),Ua).raf():v)).filter(()=>Dt||Ko!==a[S]).map(n)}function P0(e){let{axis:t,host:o,translate:r=!0}=e,n=e.scrollElement||o.parentElement;if(!n)throw"scrollElement option could not be resolved.";let i=document.createElement("div"),a=t==="x"?"width":"height";i.style.position="absolute",i.style.width=i.style.height="1px",i.style.top=i.style.left="0",(e.scrollContainer??n).appendChild(i),o.style.position="sticky",o.style.top=o.style.left="0",r&&(o.style.translate="0 0");let c=0,l=!1;return vc({...e,scrollElement:n}).tap(({totalSize:u,offset:w})=>{if(r)if(w!==0){let E=w|0;o.style.translate=t==="x"?`${E}px 0`:`0 ${E}px`,l=!0}else l&&(o.style.translate="0 0",l=!1);c!==u&&(i.style[a]=`${u}px`,c=u)}).finalize(()=>i.remove())}var wc=p(`
:host { padding: 96px 16px; }
:host([dense]) { padding-top: 48px;padding-bottom:48px; }
${L("medium",":host {padding-left:32px;padding-right:32px}")}
${L("large",":host {padding-left:64px;padding-right:64px}")}
	`),ei=class extends ro{dense=!1;color;center=!0;type="block"};s(ei,{tagName:"c-section",init:[x("dense"),re("color")],augment:[wc]});var _a=class e extends se{value="on";checked=!1;defaultChecked=!1;static{s(e,{tagName:"c-switch",init:[g("value"),x("checked")],augment:[k("switch"),ce,p(`
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
${Re(".mask")}
:host([checked]) .mask { translate: 20px 0; }
		`),t=>{t.defaultChecked=t.checked},H,()=>h("div",{className:"knob"}),()=>h("div",{className:"mask"}),Gr]})}formResetCallback(){this.checked=this.defaultChecked,this.touched=!1}setFormValue(t){$(this).setFormValue(this.checked?t:null)}};var ti=class extends d{font};s(ti,{tagName:"c-t",init:[x("font")],augment:[p(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${_i.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${A("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${A("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${A("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${A("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${A("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${A("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),y,e=>m(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var oi=class extends d{selected;tabs=new Set;variant};s(oi,{tagName:"c-tabs",init:[O("selected"),x("variant")],augment:[k("tablist"),p(`
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
		`),y,e=>{function t(o=1){let r=Array.from(e.tabs),n=e.selected||r[0],i=n?r.indexOf(n):-1;return i===-1?null:r[i+o]||null}return Ie({host:e,goRight:t.bind(null,1),goLeft:t.bind(null,-1),goFirst:()=>Array.from(e.tabs)[0]||null,goLast:()=>Array.from(e.tabs)[e.tabs.size-1]||null}).tap(o=>{o.click(),o.focus()})},e=>{let t=new oe;return N(e).append(h(Le,{className:"selected",$:o=>f(_e(),m(e,"selected"),m(e,"variant"),t,J(e)).raf(()=>{if(Te(e))return;let r=e.selected;if(!r)return o.style.transform="scaleX(0)";let n=r.offsetLeft;if(e.variant==="secondary"){let i=r.clientWidth/100;o.style.transform=`translate(${n}px, 0) scaleX(${i})`,o.style.display="block"}else{let i=document.createRange();i.selectNodeContents(r);let{width:a}=i.getBoundingClientRect(),c=n+(r.clientWidth-a)/2,l=a/100;o.style.transform=`translate(${c}px, 0) scaleX(${l})`,o.style.display="block"}e.scrollWidth!==r.clientWidth&&(e.scrollLeft=n-32)})})),Xe("tabs",e,e.tabs).raf().switchMap(o=>{let r=[];for(let n of o.elements)r.push(m(n,"selected").tap(i=>{i?(e.selected&&e.selected!==n&&(e.selected.selected=!1),e.selected=n):e.selected===n&&(e.selected=void 0),n.tabIndex=i?0:-1}),J(n).tap(()=>t.next()));return f(...r)})}]});var Wo=class extends d{selected=!1;touched=!1;disabled=!1;name};s(Wo,{init:[x("touched"),x("selected"),x("disabled"),g("name")],augment:[k("tab"),ce,e=>ae("tabs",e),e=>m(e,"name").switchMap(t=>t?D(e).tap(()=>e.selected=!0):v),e=>m(e,"selected").tap(t=>{e.setAttribute("aria-selected",t?"true":"false")})]});var ri=class extends Wo{};s(ri,{tagName:"c-tab",augment:[p(`
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
${L("small",":host { flex-grow: 0 }")}
		`),Q,H,Ye,y]});var ni=class extends d{};s(ni,{tagName:"c-table",augment:[k("table"),p(`
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
	${A("body-large")}
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	outline-offset: -1px;
}
		`),y]});var ii=class extends d{};s(ii,{tagName:"c-tbody",augment:[k("rowgroup"),p(":host{display:table-row-group}"),y]});var ai=class extends d{};s(ai,{tagName:"c-td",augment:[k("cell"),p(`
:host {
	box-sizing: border-box;
	display: table-cell;
	padding: 0 16px;
	height: 51px;
	vertical-align: middle;
	border-bottom: 1px solid var(--cxl-color-outline);
}
		`),y]});var si=class extends d{};s(si,{tagName:"c-th",augment:[k("columnheader"),p(`
:host {
	box-sizing: border-box;
	display: table-cell;
	${A("title-medium")}
	color: var(--cxl-color-on-surface-variant);
	padding: 16px;
	white-space: nowrap;
	height: 55px;
	vertical-align: middle;
	border-bottom: 1px solid var(--cxl-color-outline);
	position: relative;
}`),y]});var li=class extends ue{value="";inputEl=document.createElement("textarea")};s(li,{tagName:"c-textarea",init:[g("value")],augment:[y,e=>e.append(e.inputEl),e=>Ee({host:e,input:e.inputEl}),H,e=>{let t=new CSSStyleSheet;return t.replaceSync(":host{flex-grow:1;position:relative;}"),e.shadowRoot?.adoptedStyleSheets.push(t),f(m(e,"value"),J(e.inputEl),_e()).raf(()=>{let o=e.inputEl.style;o.height="0";let r=e.inputEl.scrollHeight;t.replaceSync(`:host{flex-grow:1;position:relative;height:${r}px}`),o.height="100%"})}]});function Xa({element:e,relativeTo:t,position:o,container:r}){if(o==="none")return;if(r??=te.currentPopupContainer??te.popupContainer,e.parentNode||r.appendChild(e),typeof o=="function")return o(e);let n=t.getBoundingClientRect(),i=e.style,a=Math.max(r.offsetWidth-e.offsetWidth-16,16),c=Math.max(r.offsetHeight-e.offsetHeight-16,16);i.left=i.top=i.width=i.transformOrigin="";let l=()=>getComputedStyle(e).direction==="rtl",u=0,w=0,E;(o==="auto"||!o)&&(o="center bottom");for(let S of o.split(" "))if(S==="right"||S==="end"&&!l()||S==="start"&&l())u=n.right;else if(S==="left-to-right"||S==="start-to-end"&&!l())u=n.left;else if(S==="left"||S==="end"&&l()||S==="start"&&!l())u=n.left-e.offsetWidth;else if(S==="center")u=n.left+n.width/2-e.offsetWidth/2;else if(S==="right-to-left"||S==="end-to-start"&&l())u=n.right-e.offsetWidth;else if(S==="bottom")w=n.bottom;else if(S==="top")w=n.top-e.offsetHeight;else if(S==="middle")w=n.top+n.height/2-e.offsetHeight/2;else if(S==="fill")u=n.left,E=n.width;else if(S==="top-to-bottom")w=n.top;else if(S==="bottom-to-top")w=n.bottom-e.offsetHeight;else throw new Error(`Invalid position "${S}"`);u<16?u=16:u>a&&(u=a),w<16?w=16:w>c&&(w=c),i.left=`${u}px`,i.top=`${w}px`,E&&(i.minWidth=`${E}px`)}function kc(e){let t=f(z(e,"position"),b(window,"scroll",{capture:!0,passive:!0})),o=r=>Xa({element:r,relativeTo:(typeof e.relative=="string"?ze(e,e.relative):e.relative)??e.firstElementChild??e,position:e.position||"auto",container:document.body});return rt(e).switchMap(({target:r,open:n})=>{if(r.open&&n&&(r.open=!1),r.trigger!==e)return v;if(r.open=n,n){let i=r.dialog??r,a=e.firstElementChild;return r.dialog&&(i.style.margin="0"),o(i),f(J(i),t).raf(()=>{a&&Te(a)?e.open=!1:o(i)})}return v})}var ci=class extends d{open=!1;target;position;relative;trigger};s(ci,{tagName:"c-toggle-popup",init:[x("open"),g("target"),g("position"),g("relative"),g("trigger")],augment:[kc,y,p(":host{display:contents}")]});var fo=class extends oo{};s(fo,{tagName:"c-toolbar",augment:[p(`
:host {
	grid-column: 1 / -1;
	column-gap: 24px;
	row-gap: 8px;
	align-items: center;
	min-height: 48px;
	flex-wrap: wrap;
	flex-shrink: 0;
}
${L("small",":host{column-gap:24px}")}
		`)]});var pi=class extends fo{};s(pi,{tagName:"c-toolbar-floating",augment:[p(`
:host {
	background-color: var(--cxl-color-surface-container);
	color: var(--cxl-color-on-surface-variant);
	border-radius: var(--cxl-shape-corner-full);
	padding: 8px 24px;
	height: 64px;
	${ji(3)}
}
		`)]});var fi=class extends d{color};s(fi,{tagName:"c-tr",init:[re("color")],augment:[k("row"),p(":host{display:table-row;height:53px;}"),y]});export{fr as Accordion,br as AccordionHeader,Xt as AccordionPanel,pr as Action,Ut as Alert,yr as Appbar,ca as AppbarContextual,vr as AppbarLayout,wr as AppbarTitle,Er as Application,Xc as Augment,Oo as Autocomplete,Hr as AutocompleteDynamic,Or as Avatar,It as BehaviorSubject,ir as Bindings,At as Block,Yr as Body,we as Button,ht as ButtonBase,jt as ButtonRound,_r as ButtonSegmented,Xr as ButtonText,Qt as C,Jt as Card,Kr as CardItem,Sa as Checkbox,Zr as Chip,Zi as ColorStyles,d as Component,Ys as ContentManager,Qr as Date,r0 as DefaultRoute,Jr as Dialog,Nt as DialogBase,st as DialogBasic,tn as Dismiss,Na as DragHandle,rn as Drawer,nn as Dropdown,v as EMPTY,an as Each,Qo as EmptyError,Rr as Field,sn as FieldBar,fe as FieldBase,ln as FieldFrame,Kt as FieldHelp,cn as FieldOutlined,oo as Flex,Fa as Form,pn as FormSubmit,fn as Grid,dn as GridList,Ba as HashStrategy,gn as Hr,ee as Icon,pe as IconButton,bn as IconToggleTheme,yn as Iframe,se as Input,vn as InputClear,wn as InputFile,Sn as InputNumber,kn as InputNumberBase,Ho as InputOption,Ra as InputPassword,En as InputPlaceholder,Pr as InputText,ue as InputTextBase,qr as Item,Ce as ItemBase,Cn as Label,ro as Layout,Uo as LayoutBase,An as List,jn as MainRouter,Nn as Menu,Sr as Meta,Mn as NavDropdown,Rn as NavHeadline,io as NavItem,Fn as NavTarget,Tn as NavTreeItem,Dn as NavbarToggle,C as Observable,zn as Option,mo as OrderedSubject,Qi as OutlineColorStyles,In as Page,uc as PathStrategy,$t as Pill,no as Popup,Ln as Progress,Pn as ProgressCircular,fc as QueryStrategy,Bn as R,Hn as Rating,lt as Reference,go as ReplaySubject,zo as Ripple,_n as RouteBase,Xn as RouteManager,Jn as RouterA,qn as RouterComponent,Qn as RouterItem,po as RouterLink,$n as RouterOutlet,Gn as RouterSelectable,ei as Section,zr as Select,St as SelectOption,ge as Signal,lr as SizeValues,y as Slot,Tt as Snackbar,lo as SnackbarContainer,Le as Span,Ft as Strategies,oe as Subject,ja as Subscriber,rp as SurfaceColorNames,_a as Switch,ti as T,ri as Tab,Wo as TabBase,ni as Table,oi as Tabs,ii as Tbody,ai as Td,li as TextArea,si as Th,xr as Toggle,je as ToggleBase,to as TogglePanel,ci as TogglePopup,Yt as ToggleTarget,ke as ToggleTargetBase,fo as Toolbar,pi as ToolbarFloating,fi as Tr,_i as TypographyValues,ra as activeRipple,Ug as alert,Vc as animated,pa as applyMeta,Ns as applyTheme,mt as aria,Qc as ariaChecked,Bi as ariaControls,Jc as ariaDescribed,Fe as ariaId,Li as ariaLabel,Ii as ariaValue,g as attribute,z as attributeChanged,Uc as augment,kl as avatarBaseStyles,ie as be,qo as bindHref,K as bindings,Fo as breakpoint,Tr as buildGo,Ur as buildGridCss,Es as buildIconFactoryCdn,mn as buildListGo,Re as buildMask,To as buildMenuStyles,ot as buttonBaseStyles,ce as buttonBehavior,mr as buttonKeyboardBehavior,Fs as buttonStyles,Sl as cardStyles,rs as catchError,vt as changeEvent,Gr as checkedBehavior,re as colorAttribute,np as colorMix,B as combineLatest,s as component,Ne as concat,Ja as concatMap,Jg as confirm,W as content,h as create,p as css,Wi as cssAttribute,Eo as cssSymbol,Ac as debounceFunction,Ic as debounceImmediate,ps as debounceRaf,Za as debounceTime,la as defaultFormatDate,qt as defaultLocale,qi as defaultThemes,_ as defer,ip as delayTheme,_o as dialog,$r as dialogClose,en as dialogStyles,ur as disabledAttribute,H as disabledStyles,V as displayContents,ns as distinctUntilChanged,Vl as drawerStyles,Ta as each,_l as eachBehavior,ji as elevation,zc as empty,Os as englishLocale,Co as event,$a as exhaustMap,hs as expression,Dr as fieldBaseStyles,dl as fieldBehavior,ml as fieldLayout,at as fieldLayoutStyles,fl as fieldStyles,Zl as fileUploadBehavior,xo as filter,ls as finalize,Xl as findForm,os as first,Cc as firstValueFrom,ve as focusable,Ms as focusableDisabled,Ts as focusableEvents,fs as focused,A as font,fu as formatDate,xe as from,Lt as fromAsync,Ec as fromGenerator,vi as fromIterable,Jo as fromPromise,m as get,Hc as getActiveElement,Ve as getAriaId,Di as getAttribute,uu as getDayText,pc as getElementRoute,pu as getFormattedDate,Mr as getHostActive,xt as getIcon,cu as getLocale,qc as getRegisteredComponents,ye as getRoot,wl as getSearchRegex,N as getShadow,Pa as getStars,Io as getTarget,ze as getTargetById,Lo as getTargets,Ul as gridColumns,ql as gridNavigation,jr as growAndFillStyles,ll as handleListArrowKeys,or as hovered,rr as hoveredOrFocused,cs as ignoreElements,xc as initializeRouter,ul as inputContainer,Zt as inputTextBase,Br as inputTextStyles,$ as internals,Nc as interval,Pc as isFocusable,Te as isHidden,Bt as isKeyboardClick,ua as isPageReady,Cl as itemBehavior,Wr as itemButtonBehavior,jl as itemHost,Mo as itemLayout,El as itemStyles,Jl as layoutStyles,s0 as linkBehavior,Gi as loadTheme,ks as loadThemeDefinition,Nr as manageFocus,un as manageFocusList,$o as map,Ye as maskStyles,L as media,f as merge,Qa as mergeMap,U as message,Wc as messageProxy,Bo as metaBehavior,Ot as motion,ao as navItemComponent,Ie as navigation,Wu as navigationItems,Xo as navigationList,Oe as newStylesheet,Bc as nodeSort,lc as normalize,av as notify,le as numberAttribute,X as observable,Lc as observeChildren,Ss as observeTheme,M as of,b as on,D as onAction,bo as onAttributeMutation,ho as onChildrenMutation,tr as onEvent,_e as onFontsReady,Oa as onHashChange,gc as onHistoryChange,vo as onIntersection,yo as onKeyAction,Ai as onKeypress,Je as onLoad,Ya as onLocation,G as onMessage,er as onMutation,fa as onPageReady,Ci as onReady,J as onResize,dt as onThemeChange,ut as onUpdate,wo as onVisibility,pt as onVisible,he as operator,Qe as operatorNext,yi as operators,cl as overrideFocusMethod,Ds as parseAnimation,zs as parseMotion,cc as parseQueryParameters,Un as parseUrl,Sc as pipe,Ao as placeholder,ec as popupBehavior,$l as popupStyles,kc as popupToggleBehavior,xl as positionUnder,vl as prefixMatcher,O as property,ss as publishLast,Ei as raf,Ka as reduce,Pt as ref,ap as registerDefaultIconFactory,sp as registerIcon,yt as registerText,So as renderChildren,jx as renderEach,On as replaceParameters,Q as ripple,k as role,o0 as route,n0 as routeIsActive,a0 as routeTitles,Z as router,i0 as routerHost,yc as routerLink,Kn as routerOutlet,Zn as routerSelectable,We as routerState,Ha as routerStrategy,gt as scrollbarStyles,wc as sectionStyles,Wa as select,Ir as selectBehavior,hl as selectComponent,gl as selectInputStyles,ka as selectMenuStyles,jc as set,Vt as setAttribute,dc as setDocumentTitle,sv as setSnackbarContainer,as as share,is as shareLatest,Mc as shareReplay,j as sizeAttribute,za as snackbarContainer,rf as sortBy,tt as spacingValues,dr as storage,Va as strategy$,x as styleAttribute,Ro as stylesheet,Si as subject,Vr as substringMatcher,q as surface,kt as svg,it as svgPath,ki as switchMap,me as sys,es as take,ts as takeWhile,ct as tap,Y as theme,No as themeName,As as themeReady,Ga as throttleTime,Fc as throwError,Me as timer,qa as toPromise,hr as toggleBehavior,Po as toggleClose,rt as toggleComponent,df as toggleOpen,De as toggleTargetBehavior,bt as toggleTargetStyles,be as trigger,et as tsx,sl as updateEvent,P0 as virtualScroll,vc as virtualScrollRender,Tc as zip};
