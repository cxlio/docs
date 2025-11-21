var Oe={},_n=Symbol("terminator");function ha(e,t){let o=!1,r={error:n,unsubscribe:i,get closed(){return o},signal:new Ne,next(a){if(!o)try{e.next?.(a)}catch(c){n(c)}},complete(){if(!o)try{e.complete?.()}finally{i()}}};e.signal?.subscribe(i);function n(a){if(o)throw a;if(!e.error)throw i(),a;try{e.error(a)}finally{i()}}function i(){o||(o=!0,r.signal.next())}try{if(t?.(r))throw new Error("Unsubscribe function result is deprectaed")}catch(a){n(a)}return r}function Kl(...e){return t=>e.reduce((o,r)=>r(o),t)}var E=class{__subscribe;constructor(t){this.__subscribe=t}then(t,o){return ya(this).then(t,o)}pipe(...t){return t.reduce((o,r)=>r(o),this)}subscribe(t){return ha(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},oe=class extends E{closed=!1;signal=new Ne;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let o of Array.from(this.observers))o.closed||o.next(t)}error(t){if(!this.closed){this.closed=!0;let o=!1,r;for(let n of Array.from(this.observers))try{n.error(t)}catch(i){o=!0,r=i}if(o)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},Ne=class extends E{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},oo=class extends oe{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},Tt=class extends oe{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let o=super.onSubscribe(t);return this.closed||t.next(this.currentValue),o}},ro=class extends oe{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(o=>t.next(o)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},Je=class extends oe{$value=Oe;get hasValue(){return this.$value!==Oe}get value(){if(this.$value===Oe)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Oe&&t.next(this.$value),super.onSubscribe(t)}},Ho=class extends Error{message="No elements in sequence"};function ge(...e){return new E(t=>{let o=0,r;function n(){let i=e[o++];i&&!t.closed?(r?.next(),i.subscribe({next:t.next,error:t.error,complete:n,signal:r=new Ne})):t.complete()}t.signal.subscribe(()=>r?.next()),n()})}function Y(e){return new E(t=>{e().subscribe(t)})}function Un(e){return new E(t=>{for(let o of e)t.closed||t.next(o);t.complete()})}function jn(e){return new E(t=>{e.then(o=>{t.closed||t.next(o),t.complete()}).catch(o=>t.error(o))})}function no(e){return Y(()=>jn(e()))}function ba(e){return new E(t=>{for(let o of e)t.closed||t.next(o);t.complete()})}function et(e){return e instanceof E?e:Array.isArray(e)?Un(e):e instanceof Promise?jn(e):ba(e)}function N(...e){return Un(e)}function qn(e){return new Promise((t,o)=>{let r=Oe;e.subscribe({next:n=>r=n,error:n=>o(n),complete:()=>t(r)})})}function ya(e){return qn(e).then(t=>t===Oe?void 0:t)}async function Gl(e){return qn(e.first())}function tt(e,t){return he(o=>({next:e(o),unsubscribe:t}))}function he(e){return t=>new E(o=>{let r=e(o,t);o.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=o.error),r.complete||(r.complete=o.complete),r.signal=o.signal,t.subscribe(r)})}function Oo(e){return tt(t=>o=>t.next(e(o)))}function va(e,t){return he(o=>{let r=t,n=0;return{next(i){r=e(r,i,n++)},complete(){o.next(r),o.complete()}}})}function $l(e,t){let o,r=function(){o&&clearTimeout(o),o=setTimeout(()=>{e.apply(this,arguments)},t)};return r.cancel=()=>clearTimeout(o),r}function wa(e){return he(t=>{let o=!0,r;return{next(n){o&&(o=!1,t.next(n),r=setTimeout(()=>o=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function Zl(e){if(e<0)throw new Error("Invalid period");return new E(t=>{let o=setInterval(t.next,e);t.signal.subscribe(()=>clearInterval(o))})}function Ye(e){return new E(t=>{let o=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(o))})}function ka(e,t=Ye){return Wn(o=>t(e).map(()=>o))}function Wn(e){return t=>B(o=>{let r=!1,n=!1,i,a=()=>{i?.next(),r=!1,n&&o.complete()},c=new Ne;o.signal.subscribe(()=>{a(),c.next()}),t.subscribe({next(s){a(),i=new Ne,r=!0,e(s).subscribe({next:o.next,error:o.error,complete:a,signal:i})},error:o.error,complete(){n=!0,r||o.complete()},signal:c})})}function Sa(e){return t=>B(o=>{let r=o.signal,n=0,i=0,a=!1;t.subscribe({next:c=>{n++,e(c).subscribe({next:o.next,error:o.error,complete:()=>{i++,a&&i===n&&o.complete()},signal:r})},error:o.error,complete(){a=!0,i===n&&o.complete()},signal:r})})}function Ea(e){return he(t=>{let o=!0;return{next(r){o&&(o=!1,e(r).subscribe({next:t.next,error:t.error,complete:()=>o=!0,signal:t.signal}))}}})}function io(e){return tt(t=>o=>{e(o)&&t.next(o)})}function Ca(e){return tt(t=>o=>{e-- >0&&!t.closed&&t.next(o),(e<=0||t.closed)&&t.complete()})}function Aa(e){return tt(t=>o=>{!t.closed&&e(o)?t.next(o):t.complete()})}function Na(){let e=!1;return he(t=>({next(o){e||(e=!0,t.next(o),t.complete())},complete(){t.closed||t.error(new Ho)}}))}function ot(e){return tt(t=>o=>{e(o),t.next(o)})}function Ma(e){return he((t,o)=>{let r,n={next:t.next,error(i){try{if(t.closed)return;let a=e(i,o);a&&(r?.next(),r=new Ne,a.subscribe({...n,signal:r}))}catch(a){t.error(a)}},unsubscribe:()=>r?.next()};return n})}function Ta(){return tt(e=>{let t=Oe;return o=>{o!==t&&(t=o,e.next(o))}})}function Da(){return e=>{let t=new ro(1),o=!1;return B(r=>{t.subscribe(r),o||(o=!0,e.subscribe(t))})}}function Ql(e){return t=>{let o=new ro(e),r=0;return B(n=>{r++,o.subscribe(n),r===1&&t.subscribe(o),n.signal.subscribe(()=>{--r===0&&o.signal.next()})})}}function Ra(){return e=>{let t,o=0;function r(){--o===0&&t?.signal.next()}return B(n=>{n.signal.subscribe(r),o++===0?(t=Dt(),t.subscribe(n),e.subscribe(t)):t.subscribe(n)})}}function Fa(){return e=>{let t=new oe,o,r,n=!1,i=!1;return B(a=>{i?(a.next(r),a.complete()):t.subscribe(a),o??=e.subscribe({next:c=>{n=!0,r=c},error:a.error,complete(){i=!0,n&&t.next(r),t.complete()},signal:a.signal})})}}function u(...e){return e.length===1?e[0]:new E(t=>{let o=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){o--===1&&t.complete()},signal:t.signal})})}function Jl(...e){return e.length===0?v:new E(t=>{let o=new Array(e.length);function r(){let n=!0;for(;n;){for(let i of o){if(i?.[0]===_n)return t.complete();(!i||i.length===0)&&(n=!1)}n&&t.next(o.map(i=>i.shift()))}}e.forEach((n,i)=>{let a=o[i]=[];n.subscribe({next(c){a.push(c),r()},error:t.error,complete(){a.push(_n),r()},signal:t.signal})})})}function P(...e){return e.length===0?v:new E(t=>{let o=e.length,r=o,n=0,i=!1,a=new Array(o),c=new Array(o);e.forEach((s,f)=>s.subscribe({next(w){c[f]=w,a[f]||(a[f]=!0,++n>=r&&(i=!0)),i&&t.next(c.slice(0))},error:t.error,complete(){--o<=0&&t.complete()},signal:t.signal}))})}function Ia(e){return he(t=>({next:t.next,unsubscribe:e}))}function La(){return io(()=>!1)}function ec(e){return new E(t=>t.error(e))}var v=new E(e=>e.complete());function te(e){return new Tt(e)}function B(e){return new E(e)}function tc(){return new oe}function Dt(){return new Je}var Xn={catchError:Ma,debounceTime:ka,distinctUntilChanged:Ta,exhaustMap:Ea,filter:io,finalize:Ia,first:Na,ignoreElements:La,map:Oo,mergeMap:Sa,publishLast:Fa,reduce:va,share:Ra,shareLatest:Da,switchMap:Wn,take:Ca,takeWhile:Aa,tap:ot,throttleTime:wa};for(let e in Xn)E.prototype[e]=function(...t){return this.pipe(Xn[e](...t))};function nc(e){let t;for(;t=e.childNodes[0];)e.removeChild(t)}function h(e,t,o){return new E(r=>{let n=r.next.bind(r);e.addEventListener(t,n,o),r.signal.subscribe(()=>e.removeEventListener(t,n,o))})}function ao(e){return Yo(e,{childList:!0})}function so(e,t){return Yo(e,{attributes:!0,attributeFilter:t})}function Yo(e,t={attributes:!0,childList:!0}){return new E(o=>{let r=new MutationObserver(n=>n.forEach(i=>{for(let a of i.addedNodes)o.next({type:"added",target:e,value:a});for(let a of i.removedNodes)o.next({type:"removed",target:e,value:a});i.type==="characterData"?o.next({type:"characterData",target:e}):i.attributeName&&o.next({type:"attribute",target:e,value:i.attributeName})}));r.observe(e,t),o.signal.subscribe(()=>r.disconnect())})}function lo(e){return h(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function L(e){return h(e,"click")}function co(e,t){return new E(o=>{let r=new IntersectionObserver(n=>{for(let i of n)o.next(i)},t);r.observe(e),o.signal.subscribe(()=>r.disconnect())})}function po(e){return co(e).map(t=>t.isIntersecting)}function rt(e){return co(e).filter(t=>t.isIntersecting).first()}function za(e){let t;return function(...o){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,o),t=0})}}function ic(e){let t;return function(...o){t||(t=!0,queueMicrotask(()=>{t=!1,e.apply(this,o)}))}}function Kn(e){return he(t=>{let o=za(n=>{t.closed||(e&&e(n),t.next(n),r&&t.complete())}),r=!1;return{next:o,complete:()=>r=!0}})}function Gn(){return Y(()=>document.readyState!=="loading"?N(!0):h(window,"DOMContentLoaded").first().map(()=>!0))}function Me(e,t,o){let r=new CustomEvent(t,o);e.dispatchEvent(r)}function ac(e,t){let o;return u(Y(()=>(o=e.childNodes,o?N(o):v)),Yo(e,{childList:!0,...t}),_e().switchMap(()=>e.childNodes!==o?(o=e.childNodes,N(o)):v))}function _e(){return Y(()=>document.readyState==="complete"?N(!0):h(window,"load").first().map(()=>!0))}function K(...e){return new E(t=>{let o=new ResizeObserver(r=>r.forEach(n=>t.next(n)));for(let r of e)o.observe(r);t.signal.subscribe(()=>o.disconnect())})}function be(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function sc(e){return!e.disabled&&e instanceof HTMLElement&&(e.offsetParent!==null||!!(e.offsetWidth&&e.offsetHeight))&&(e.tabIndex!==-1||e.contentEditable==="true"||e.hasAttribute("tabindex"))}function lc(e,t){return e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}function _o(e,t,o){return r=>ge(N(e?r.matches(e):!1),h(r,t).switchMap(()=>u(N(!0),h(r,o).map(()=>e?r.matches(e):!1))))}var cc=_o("","animationstart","animationend"),Xo=_o("","mouseenter","mouseleave"),Pa=_o(":focus,:focus-within","focusin","focusout"),Uo=e=>P(Xo(e),Pa(e)).map(([t,o])=>t||o);function fo(e,t,o){return t=t?.toLowerCase(),h(e,"keydown",o).filter(r=>!t||r.key?.toLowerCase()===t)}function Rt(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function pe(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}function pc(e){return pe(e)?.activeElement??null}var Va=ot(e=>console.log(e));E.prototype.log=function(){return this.pipe(Va)};E.prototype.raf=function(e){return this.pipe(Kn(e))};var j=Symbol("bindings"),$n={},nt=Symbol("augments"),Xe=Symbol("parser"),qo=class{bindings;messageHandlers;internals;attributes$=new oo;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,o){let r=!1;if(this.messageHandlers)for(let n of this.messageHandlers)n.type===t&&(n.next(o),r||=n.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let o of this.bindings)t.push(o.subscribe());if(this.prebind)for(let o of this.prebind)t.push(o.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},xo=Symbol("css"),x=class extends HTMLElement{static observedAttributes;static[nt];static[Xe];[j]=new qo;[xo];connectedCallback(){this[j].wasInitialized=!0,this[j].wasConnected||this.constructor[nt]?.forEach(t=>t(this)),this[j].connect()}disconnectedCallback(){this[j].disconnect()}attributeChangedCallback(t,o,r){let n=this.constructor[Xe]?.[t]??Ba;o!==r&&(this[t]=n(r,this[t]))}};function Ba(e,t){let o=t===!1||t===!0;return e===""?o?!0:"":e===null?o?!1:void 0:e}function Zn(e,t){e.hasOwnProperty(nt)||(e[nt]=e[nt]?.slice(0)??[]),e[nt]?.push(t)}var Ha={mode:"open"};function M(e){return e.shadowRoot??e.attachShadow(Ha)}function Qn(e,t){t instanceof Node?M(e).appendChild(t):e[j].add(t)}function uo(e,t){t.length&&Zn(e,o=>{for(let r of t){let n=r.call(e,o);n&&n!==o&&Qn(o,n)}})}function Jn(e,t){$n[e]=t,customElements.define(e,t)}function G(e){return e[j].internals??=e.attachInternals()}function mc(e,...t){return o=>{typeof e=="string"?(uo(o,t),Jn(e,o)):(t.unshift(e),uo(o,t))}}function l(e,{init:t,augment:o,tagName:r}){if(t)for(let n of t)n(e);o&&uo(e,o),r&&Jn(r,e)}function xc(e,...t){uo(e,t)}function it(e){return ge(N(e),e[j].attributes$.map(()=>e))}function F(e,t){return e[j].attributes$.pipe(io(o=>o.attribute===t),Oo(()=>e[t]))}function m(e,t){return u(F(e,t),Y(()=>N(e[t])))}function Oa(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function Ft(e,t,o){return o===!1||o===null||o===void 0?o=null:o===!0&&(o=""),o===null?e.removeAttribute(t):e.setAttribute(t,String(o)),o}function Ya(e,t,o){e.hasOwnProperty(Xe)||(e[Xe]={...e[Xe]}),e[Xe]&&(e[Xe][t]=o)}function d(e,t){return o=>{t?.observe!==!1&&Oa(o).push(e),t?.parse&&Ya(o,e,t.parse);let r=`$$${e}`,n=o.prototype,i=Object.getOwnPropertyDescriptor(n,e);i&&Object.defineProperty(n,r,i);let a=t?.persist,c={enumerable:!0,configurable:!1,get(){return this[r]},set(s){this[r]!==s?(this[r]=s,a?.(this,e,s),this[j].attributes$.next({target:this,attribute:e,value:s})):i?.set&&(a?.(this,e,s),this[r]=s)}};Zn(o,s=>{if(i||(s[r]=s[e]),Object.defineProperty(s,e,c),a?.(s,e,s[e]),t?.render){let f=t.render(s);f&&Qn(s,f)}})}}function g(e){return d(e,{persist:Ft,observe:!0})}function ei(e){let t=`on${e}`;return d(t,{render(o){return m(o,t).switchMap(r=>r?new E(n=>{let i=a=>{a.target===o&&o[t]?.call(o,a)};o.addEventListener(e,i),n.signal.subscribe(()=>o.removeEventListener(e,i))}):v)},parse(o){return o?new Function("event",o):void 0}})}function _(e){return d(e,{observe:!1})}function gc(){return{...$n}}function y(){return document.createElement("slot")}function ti(e){return t=>{let[o,r]=e();return t[j].add(o),r}}var ye=class extends x{};l(ye,{tagName:"c-span"});function _a(e,t){let o=document.createTextNode("");return e[j].add(t.tap(r=>o.textContent=r)),o}var jo=document.createDocumentFragment();function mo(e,t,o=e){if(t!=null)if(Array.isArray(t)){for(let r of t)mo(e,r,jo);o!==jo&&o.appendChild(jo)}else e instanceof x&&t instanceof E?o.appendChild(_a(e,t)):t instanceof Node?o.appendChild(t):e instanceof x&&typeof t=="function"?mo(e,t(e),o):o.appendChild(document.createTextNode(t))}function oi(e,t){for(let o in t){let r=t[o];e instanceof x?r instanceof E?e[j].add(o==="$"?r:r.tap(n=>e[o]=n)):o==="$"&&typeof r=="function"?e[j].add(r(e)):e[o]=r:e[o]=r}}function Xa(e,t){return e.constructor.observedAttributes?.includes(t)}function ri(e,t){let o=e instanceof x&&Xa(e,t)?F(e,t):so(e,[t]).map(()=>e[t]);return u(o,Y(()=>N(e[t])))}function Te(e,t,o){return d(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let n=r===void 0?void 0:Number(r);return t!==void 0&&(n===void 0||n<t||isNaN(n))&&(n=t),o!==void 0&&n!==void 0&&n>o&&(n=o),n}})}function $(e,t,o){for(let r=e.parentElement;r;r=r.parentElement)if(r[j]?.message(t,o))return}function Q(e,t,o=!0){return new E(r=>{let n={type:t,next:r.next,stopPropagation:o};e[j].addMessageHandler(n),r.signal.subscribe(()=>e[j].removeMessageHandler(n))})}function b(e,t,...o){let r=typeof e=="string"?document.createElement(e):new e;return t&&oi(r,t),o&&mo(r,o),r}function Ue(e,t,...o){if(e!==Ue&&typeof e=="function"&&!(e.prototype instanceof x))return o.length&&((t??={}).children=o),e(t);let r=e===Ue?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&oi(r,t),o&&mo(r,o),r}function ni(e,t){return o=>new E(()=>{o.hasAttribute(e)||o.setAttribute(e,t)})}function go(e,t){return ni(`aria-${e}`,t)}function ii(e,t){return ot(o=>e.setAttribute("aria-"+t,o===!0?"true":o===!1?"false":o.toString()))}function vc(e){return ot(t=>e.setAttribute("aria-checked",t===void 0?"mixed":t?"true":"false"))}function C(e){return ni("role",e)}function wc(e,t){return at(t).tap(o=>{e.setAttribute("aria-describedby",o)}).finalize(()=>e.removeAttribute("aria-describedby"))}function ai(e,t){return e.ariaLabel||e.getAttribute("aria-labelledby")?v:t.tap(o=>e.ariaLabel=o)}var si=0;function ve(e){return e.id||=`cxl__${si++}`}function at(e){return ri(e,"id").map(t=>(t||(e.id=`cxl__${si++}`),e.id))}function kc(e,t){return P(...t.map(o=>at(o))).tap(o=>{e.setAttribute("aria-controls",o.join(" "))})}var W=p(":host{display:contents}"),Go=[-2,-1,0,1,2,3,4,5],ui=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],It=Dt(),ho=te(""),X=p(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),Ua=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),di={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function bo(e=""){return`
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
		`}function mi(e=di){return Object.entries(e).map(([t,o])=>`--cxl-color--${t}:${o};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var H={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:di,imports:Ua?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function we(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}function xi(e){return`box-shadow:var(--cxl-elevation-${e});z-index:${e};`}var lt=p(we()),gi={"./theme-dark.js":()=>import("./theme-dark-VB5GOX6M.js")},je=[0,4,8,16,24,32,48,64],st,li,ja;function z(e,t){return e==="xsmall"?`@media(max-width:${H.breakpoints.small}px){${t}}`:`@media(min-width:${H.breakpoints[e]}px){${t}}`}function yo(e){return K(e).map(t=>{let o=H.breakpoints,r=t.contentRect.width,n="xsmall";for(let i in o){if(o[i]>r)return n;n=i}return n})}function qa(e=""){return Object.entries(vi).map(([t,o])=>`:host([color=${t}]) ${e}{ ${o} }`).join("")}function J(e,t,o=""){return hi(e,`
		${t?`:host ${o} { ${vi[t]} }`:""}
		:host${t?"":"([color])"} ${o} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${o}{
			color: inherit;
			background-color: transparent;
		}
		${qa(o)}
	`)}function hi(e,t){let o=p(t);return d(e,{persist:Ft,render:r=>o(r)})}function re(e,t){return hi(e,Go.map(o=>{let r=t(o);return o===0?`:host ${r}`:`:host([size="${o}"]) ${r}`}).join(""))}function bi(){let e=document.adoptedStyleSheets.indexOf(st);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function Wa(e){st&&bi();let t=e.globalCss??"";e.colors&&(t+=`:root{${mi(e.colors)}}`),t&&(st=De(t),document.adoptedStyleSheets.push(st)),It.next({theme:e,stylesheet:st,css:t}),ho.next(e.name)}var ci="";function yi(e){e?e!==ci&&(typeof e=="string"?import(e):e()).then(t=>Wa(t.default)):st&&(bi(),It.next(void 0),ho.next("")),ci=e}function Ka(e){let t;return It.tap(o=>{let r=o?.theme.override?.[e.tagName];r?t?t.replace(r):e.shadowRoot?.adoptedStyleSheets.push(t??=De(r)):t&&t.replace("")})}function De(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function vo(e,t=""){let o=De(t);return M(e).adoptedStyleSheets.push(o),o}function p(e){let t;return o=>{let r=M(o);if(r.adoptedStyleSheets.push(t??=De(e)),!o[xo])return H.css&&r.adoptedStyleSheets.unshift(ja??=De(H.css)),o[xo]=!0,Ka(o)}}var $o=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],Nc=[...$o,"inherit"];function Wo(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function Mc(e,t,o="transparent"){return`color-mix(in srgb, var(--cxl-color-${e}) ${t}%,${o})`}function O(e){return`${Wo(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var vi=$o.reduce((e,t)=>(e[t]=`
${Wo(t)}
${t==="inverse-surface"?Wo("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"}),wi=(e="")=>`${e?`:host(${e})`:":host"} { 
	--cxl-color-surface: transparent; 
	border-style: solid; 
	border-color: var(--cxl-color-on-surface); 
	border-width: 1px; 
	box-shadow: none;
}
${$o.map(t=>`:host(${e}[color=${t}]) { --cxl-color-on-surface: var(--cxl-color--${t}); }`).join("")}
`;function ct(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function A(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}function Tc(){cancelAnimationFrame(ki)}var ki=requestAnimationFrame(()=>Qa()),Si={},pi=document.createElement("template"),fi={};function Ga(e){return function(t){let o=e(t),r=fi[o];if(r)return r.cloneNode(!0);let n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=()=>(n.dispatchEvent(new ErrorEvent("error")),"");return fetch(o).then(a=>a.ok?a.text():i(),i).then(a=>{if(!a)return;pi.innerHTML=a;let c=pi.content.children[0];if(!c)return;let s=c.getAttribute("viewBox");s?n.setAttribute("viewBox",s):c.hasAttribute("width")&&c.hasAttribute("height")&&n.setAttribute("viewBox",`0 0 ${c.getAttribute("width")} ${c.getAttribute("height")}`);for(let f of c.childNodes)n.append(f);fi[t.name]=n}),n.setAttribute("fill","currentColor"),n}}var $a=Ga(({name:e,width:t,fill:o})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${o?"fill1_":""}${t}px.svg`)),Ei=$a;function Dc(e){Ei=e}function Rc(e){Si[e.id]=e}function wo(e,t={}){let{width:o,height:r}=t;o===void 0&&r===void 0&&(o=r=24);let n=Si[e]?.icon()||Ei({name:e,width:o,fill:t.fill});return t.className&&n.setAttribute("class",t.className),o&&(n.setAttribute("width",`${o}`),r===void 0&&n.setAttribute("height",`${o}`)),r&&(n.setAttribute("height",`${r}`),o===void 0&&n.setAttribute("width",`${r}`)),t.alt&&n.setAttribute("alt",t.alt),n}var Ko,Za=new Promise(e=>{Ko=e});function Qa(e){cancelAnimationFrame(ki),li||(e&&(e.colors&&(H.colors=e.colors),e.globalCss&&(H.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(li=De(`:root { ${mi(H.colors)} }`+H.globalCss)),H.imports?Promise.allSettled(H.imports.map(t=>{let o=document.createElement("link");return o.rel="stylesheet",o.href=t,document.head.append(o),new Promise((r,n)=>(o.onload=r,o.onerror=n))})).then(Ko):Ko())}function Re(){return no(async()=>{await Za,await document.fonts.ready})}var Lt=class extends x{outline=!1;color};l(Lt,{tagName:"c-alert",init:[g("outline"),J("color","inverse-surface")],augment:[C("alert"),p(`
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
	${wi("[outline]")}`),y]});var Qo=[p(`
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
}`),y,()=>b("slot",{name:"title"})];function Ja(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var Zo=class extends x{size;sticky=!1;contextual};l(Zo,{tagName:"c-appbar",init:[g("size"),g("sticky"),g("contextual")],augment:[p(`
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
		`),...Qo,()=>b("slot",{name:"contextual"}),e=>m(e,"sticky").switchMap(t=>t?co(e,{threshold:[1]}).tap(o=>e.toggleAttribute("scroll",o.intersectionRatio<1)):v),e=>{let t;return u(ao(e),m(e,"contextual")).raf().switchMap(()=>{for(let o of e.children)if(Ja(o)&&(o.slot="contextual",o.open=o.name===e.contextual,o.open))return t=o,h(o,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,v})}]});function Jo(e){return m(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function es(e,t=e,o=0){let r=t.hasAttribute("tabindex")?t.tabIndex:o;return Jo(e).tap(n=>{n?t.removeAttribute("tabindex"):t.tabIndex=r})}function ts(e,t=e){return u(h(t,"focusout").tap(()=>e.touched=!0),u(F(e,"disabled"),F(e,"touched")).tap(()=>$(e,"focusable.change")))}function Fe(e,t=e,o=0){return u(es(e,t,o),ts(e,t))}function Ci(e){return e in H.animation}function ne({target:e,animation:t,options:o}){if(H.disableAnimations)return e.animate(null);let r=typeof t=="string"?H.animation[t]:t;if(!r)throw new Error(`Animation "${t}" not defined`);let n=typeof r.kf=="function"?r.kf(e):r.kf,i={duration:250,easing:H.easing.emphasized,...r.options,...o,...H.prefersReducedMotion?{duration:0}:void 0};return e.animate(n,i)}function zt(e){let{trigger:t,stagger:o,commit:r,keep:n}=e;function i(c){return new E(s=>{let f=ne(c);f.ready.then(()=>s.next({type:"start",animation:f}),()=>{}),f.addEventListener("finish",()=>{s.next({type:"end",animation:f}),r&&f.commitStyles(),!(n||n!==!1&&c.options?.fill&&(c.options.fill==="both"||c.options.fill==="forwards"))&&s.complete()}),s.signal.subscribe(()=>{try{f.cancel()}catch{}})})}let a=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return u(...a.map((c,s)=>{let f={...e.options,delay:o!==void 0?(e.options?.delay??0)+s*o:e.options?.delay};return(t==="visible"?po(c).filter(k=>k):t==="hover"?Xo(c):N(!0)).switchMap(k=>k?i({...e,options:f,target:c}):v)}))}function Ai(e,t,o=e.getBoundingClientRect()){let r=o.width>o.height?o.width:o.height,n=new ko,i=e.shadowRoot||e,{x:a,y:c}=t??{},s=a===void 0||!t||Rt(t),f=a>o.right||a<o.left||c>o.bottom||c<o.top;return n.x=s||f?o.width/2:a-o.left,n.y=s||f?o.height/2:c-o.top,n.radius=r,t||(n.duration=0),i.prepend(n),n}function Ni(e,t=e){let o,r,n,i=()=>{o=Ai(t,r instanceof Event?r:void 0,n),o.duration=600,r=void 0};return u(h(e,"click").tap(a=>{r=a,n=t.getBoundingClientRect()}),m(e,"selected").raf().switchMap(()=>{if(e.selected){if(!o?.parentNode){if(be(e))return r=void 0,rt(e).tap(i);i()}}else o&&Mi(o);return v})).ignoreElements()}function Mi(e){return new Promise(t=>{ne({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function ee(e,t=e){let o=!1,r=0;return u(h(t,"pointerdown"),h(t,"click")).tap(n=>n.cxlRipple??=e).raf().mergeMap(n=>{if(n.cxlRipple===e&&!o&&!e.disabled&&e.parentNode){r=Date.now(),o=!0,e.style.setProperty("--cxl-mask-hover","none");let i=Ai(e,n),a=i.duration,c=()=>{e.style.removeProperty("--cxl-mask-hover"),Mi(i).then(()=>{o=!1})};return n.type==="click"?Ye(a).tap(c):u(h(document,"pointerup"),h(document,"pointercancel")).first().map(()=>{let s=Date.now()-r;setTimeout(()=>c(),s>a?32:a-s)})}return v})}var ko=class extends x{x=0;y=0;radius=0;duration=500};l(ko,{tagName:"c-ripple",init:[d("x"),d("y"),d("radius")],augment:[p(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",B(()=>{let o=t.style;o.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,o.width=o.height=e.radius*2+"px",t.parentNode||M(e).append(t),ne({target:t,animation:"expand",options:{duration:e.duration}}),ne({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var qe=[X,lt,p(`
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
}`)],os=p(`
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
`);function er(e){return m(e,"disabled").switchMap(t=>t?v:lo(e).tap(o=>{o.stopPropagation(),e.click()}))}function ke(e){return u(er(e),Fe(e))}var pt=class extends x{disabled=!1;touched=!1};l(pt,{init:[g("disabled"),g("touched")],augment:[C("button"),ke]});var fe=class extends pt{size;color;variant};l(fe,{tagName:"c-button",init:[re("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),J("color","primary"),g("variant")],augment:[...qe,os,ee,y]});var Pt=class extends fe{};l(Pt,{tagName:"c-button-round",augment:[p(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var We=class extends x{name="";width;height;alt;fill=!1};l(We,{tagName:"c-icon",init:[d("name"),d("width"),d("height"),d("fill"),d("alt")],augment:[C("none"),p(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,o;return e.shadowRoot?.adoptedStyleSheets.push(t),rt(e).switchMap(()=>it(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,n=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${n===void 0?"":`height:${n}px`}}`),o?.remove(),o=e.name?wo(e.name,{className:"icon",width:r,height:n,fill:e.fill,alt:e.alt}):void 0,o&&(o.onerror=()=>{o&&e.alt&&o.replaceWith(e.alt)},M(e).append(o))})}]});var se=class extends Pt{icon="";width;height;fill=!1;variant="text";alt};l(se,{tagName:"c-icon-button",init:[d("icon"),d("width"),d("height"),d("alt"),d("fill")],augment:[e=>b(We,{className:"icon",width:m(e,"width"),height:m(e,"height"),name:m(e,"icon"),fill:m(e,"fill"),alt:m(e,"alt")})]});var Cp=1440*60*1e3,rs=/^\s*(\d{1,2})\s*:\s*(\d{1,2})\s*(?::(\d{1,2})\s*)?([pPaA][mM])?/,ns=/^(\d{4}(?:-\d{2}(?:-\d{2})?)?)(T\d{2}:\d{2}(?:\d{2}(?:\.\d3)?)?)?(Z(?:[+-]\d{1,2})?)?$/;function is(e){let t=rs.exec(e);if(t){let o=new Date,r=+t[1],n=t[4]?.toLowerCase()==="pm";return o.setHours(n?r+12:r),o.setMinutes(+t[2]),o}return new Date(NaN)}function as(e){let t=ns.exec(e),o=new Date(t&&!t[3]&&!t[2]?`${e}T00:00`:e);return isNaN(o.getTime())&&(o=is(e)),o}function Ti(e,t,o){if(t==="relative"){let r=new Date;return e.getFullYear()===r.getFullYear()?e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()?e.toLocaleTimeString(o,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(o,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(o,{month:"2-digit",day:"2-digit",year:"2-digit"})}return t==="medium"||t==="long"||t==="short"||t==="full"?e.toLocaleString(o,{dateStyle:t,timeStyle:t}):e.toLocaleString()}function Di(e){return d(e,{parse:t=>t?as(t):void 0})}function Eo(e,t,o){return t?typeof o=="string"?Ti(t,o,e):t.toLocaleString(e,o):""}var tr={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function ss(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var So={content:tr,name:"default",localeName:ss(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>Eo(So.localeName,e,t)},ls={content:tr,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>Eo("en-US",e,t)};function cs(){let e=te(So),t={default:So,en:ls},o={},r=e.map(a=>a.content);async function n(a){let c=a.split("-")[0];if(!(t[a]??t[c])){let f=o[a]??o[c];f&&await f()}return t[c]||So}async function i(a){e.next(await n(a))}return navigator?.language&&i(navigator.language),{content:r,registeredLocales:t,locale:e,setLocale:i,getLocale(a){return a?no(()=>n(a)):e},get(a,c){return r.map(s=>s[a]??(c&&s[c])??"")},register(a){t[a.name]=a}}}var U=cs();function Dp(e){return P(U.locale,m(e,"locale")).switchMap(([t,o])=>o?U.getLocale(o):N(t))}function ft(e){return Object.assign(tr,e),U.get}function Rp(e,t){return U.locale.map(o=>o.formatDate?.(e,t)??Eo(o.localeName,e,t))}function Fp(e){return t=>t?U.locale.map(o=>o.formatDate?.(t,e)??Eo(o.localeName,t,e)):N("")}function Ip(e,t,o=U.locale){let r=new Date,n=t==="xsmall"?"narrow":t==="small"?"short":"long";return r.setDate(r.getDate()-r.getDay()+e),o.map(i=>i.formatDate(r,{weekday:n}))}var Ri=class e extends x{name;size;open=!1;backIcon=b(se,{icon:"arrow_back",className:"icon",ariaLabel:U.get("core.close"),$:t=>L(t).tap(()=>this.open=!1)});static{l(e,{tagName:"c-appbar-contextual",init:[d("name"),g("open"),g("size")],augment:[t=>t.backIcon,...Qo,p(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),t=>F(t,"open").tap(o=>{o||t.dispatchEvent(new Event("close"))})]})}};var or=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer?.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},Z=new or;function Fi(e=document){document.documentElement.lang="en";let t=[b("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),b("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),b("meta",{name:"mobile-web-app-capable",content:"yes"}),b("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${A("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function Ii(e=2e3){return u(Ye(e),Re()).first()}function Li(e){return Ii().raf(()=>e.setAttribute("ready",""))}function Co(e){return u(B(t=>{let o=Fi(e.ownerDocument??document);t.signal.subscribe(()=>o.forEach(r=>r.remove()))}),_e().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),Ii().switchMap(()=>yo(e).raf(t=>e.setAttribute("breakpoint",t))),Li(e),ho.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var rr=class extends x{connectedCallback(){requestAnimationFrame(()=>Fi(this.ownerDocument||document)),super.connectedCallback()}};l(rr,{tagName:"c-meta",augment:[()=>Li(document.body)]});function zi(e,t,o){o==="in"&&(e.style.display="");let r=e.offsetWidth,n=ne({target:e,animation:{kf:{[t]:o==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});o==="out"&&(n.onfinish=()=>e.style.display="none")}var nr=class extends x{sheetstart=!1;sheetend=!1};l(nr,{tagName:"c-application",init:[g("sheetstart"),g("sheetend")],augment:[p(`
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
${ct()}
	`),Co,e=>Q(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>Q(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=b("slot",{name:"start"}),o=b("slot",{id:"body"}),r=b("slot",{name:"end"}),n=De("html { overflow: hidden }");return M(e).append(t,o,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),Z.popupContainer=e,u(B(i=>{let a=(e.ownerDocument??document).adoptedStyleSheets;a.push(n),i.signal.subscribe(()=>{let c=a.indexOf(n);c!==-1&&a.splice(c,1)})}),F(e,"sheetstart").tap(i=>zi(t,"marginLeft",i?"in":"out")),F(e,"sheetend").tap(i=>zi(r,"marginRight",i?"in":"out")))}]});function ue(e,t,o){return new E(r=>{let n={id:e,controller:o,target:t};$(t,`registable.${e}`,n),r.signal.subscribe(()=>n.unsubscribe?.())})}function Ao(e,t,o,r){return new E(n=>{function i(c){let s=c.target;c.unsubscribe=()=>{let k=o.indexOf(s);k!==-1&&o.splice(k,1),r?.({type:"disconnect",target:s,elements:o}),n.next()};let f=o.indexOf(s);f!==-1&&o.splice(f,1);let w=o.findIndex(k=>k.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_PRECEDING);w===-1?o.push(s):o.splice(w,0,s),r?.({type:"connect",target:s,elements:o}),n.next()}let a=Q(t,`registable.${e}`).subscribe(i);n.signal.subscribe(a.unsubscribe)})}function ut(e,t,o=new Set){return new E(r=>{function n(a){let c=a.target,s=a.controller||a.target;a.unsubscribe=()=>{o.delete(s),r.next({type:"disconnect",target:s,element:c,elements:o})},o.add(s),r.next({type:"connect",target:s,element:c,elements:o})}let i=Q(t,`registable.${e}`).subscribe(n);r.signal.subscribe(i.unsubscribe)})}var ir={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(o){console.error(o)}}};function af(e){return(t,o)=>t[e]>o[e]?1:t[e]<o[e]?-1:0}function Se(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let o,r=e.getRootNode();return r instanceof ShadowRoot&&(o=r.getElementById(t),o)?o:e.ownerDocument.getElementById(t)??void 0}function No(e,t){return m(e,t).map(o=>Se(e,o))}var ps=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,fs=/^\d{5}(?:[-\s]\d{4})?$/,us={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},Pi={required:ys,email:vs,json:Ss,zipcode:ws,nonZero:hs,nonEmpty:gs},ds={pattern:bs,equalToElement:ar(Oi),greaterThan:Bi,lessThan:Hi,greaterThanElement:ar(Bi),lessThanElement:ar(Hi),min:Cs,max:As,equalTo:Oi,maxlength:Ns,minlength:Ms},ms=ft(us);function ar(e){return(t,o)=>{let r=typeof t=="string"?Se(o,t):t;if(!r)throw"Invalid element";return e(r)}}function de(e,t){return{key:e,valid:t,message:ms(`validation.${e}`,"validation.invalid")}}function xs(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function gs(e){return de("nonEmpty",!xs(e))}function hs(e){return de("nonZero",e===""||Number(e)!==0)}function bs(e){let t=typeof e=="string"?e=new RegExp(e):e;return o=>de("pattern",typeof o=="string"&&(o===""||t.test(o)))}function sr(e){return e!=null&&e!==""}function ys(e,t){let o=t&&"checked"in t?!!t.checked:!0;return de("required",o&&sr(e))}function vs(e){return de("email",typeof e=="string"&&(e===""||ps.test(e)))}function ws(e){return de("zipcode",typeof e=="string"&&(e===""||fs.test(e)))}function ks(e){try{return JSON.parse(e),!0}catch{return!1}}function Ss(e){return de("json",ks(e))}function Es(e){return e instanceof HTMLElement&&"value"in e}function Vt(e,t,o){let r=Es(t)?m(t,"value"):t instanceof E?t:N(t);return n=>r.map(i=>de(e,!sr(n)||!sr(i)||o(n,i)))}function Vi(e,t){let o=/(\w+)(?:\(([^)]+?)\))?/g,r=[],n;for(;n=o.exec(e);)if(n[2]){let i=ds[n[1]];if(!i)throw`Invalid rule "${n[1]}"`;r.push(i(n[2],t))}else if(n[1]in Pi)r.push(Pi[n[1]]);else throw`Invalid rule "${n[1]}"`;return r}function Yi(e,t){let o=(typeof e=="string"?Vi(e,t):e).flatMap(r=>typeof r=="string"?Vi(r,t):r);return(r,n)=>o.map(i=>{let a=i(r,n);return a instanceof E?a:a instanceof Promise?et(a):N(a)})}function Cs(e){return Vt("min",e,(t,o)=>Number(t)>=Number(o))}function Bi(e){return Vt("greaterThan",e,(t,o)=>Number(t)>Number(o))}function As(e){return Vt("max",e,(t,o)=>Number(t)<=Number(o))}function Hi(e){return Vt("lessThan",e,(t,o)=>Number(t)<Number(o))}function Oi(e){return Vt("equalTo",e,(t,o)=>t==o)}function Ns(e){return t=>de("maxlength",!t||t.length<=+e)}function Ms(e){return t=>de("minlength",!t||t.length>=+e)}function Ts(e){return _i(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function dt(e){return F(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||Me(e,"change",{bubbles:!0})})}function _i(e){return u(m(e,"value"),m(e,"checked")).map(()=>{})}var ie=class e extends x{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{l(e,{init:[g("autofocus"),g("invalid"),g("disabled"),g("touched"),d("rules"),g("name"),_("validationResult"),ei("update")],augment:[t=>(t.defaultValue=t.value,u(ue("form",t),F(t,"invalid").tap(()=>Me(t,"invalid")),m(t,"invalid").switchMap(o=>{if(o){if(t.setAria("invalid","true"),!t.validationMessage)return U.get("validation.invalid").tap(r=>t.setCustomValidity(r))}else t.setAria("invalid",null);return v}),B(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),m(t,"rules").switchMap(o=>{if(!o)return v;let r=Yi(o,t);return _i(t).switchMap(()=>u(...r(t.value,t)).tap(n=>t.setValidity(n))).finalize(()=>t.resetValidity())}),m(t,"value").tap(o=>t.setFormValue(o)),m(t,"validationResult").switchMap(o=>!o||o.valid?v:o.message instanceof E?o.message:o.message===void 0?U.get("validation.invalid"):N(o.message)).tap(o=>{t.setCustomValidity(o)}))),Ts]})}get labels(){return G(this).labels}get validity(){return G(this)?.validity||null}get validationMessage(){return G(this)?.validationMessage||""}reportValidity(){return G(this)?.reportValidity()??!0}checkValidity(){return G(this)?.checkValidity()??!0}setCustomValidity(t){let o=!!t,r=t!==this.validationMessage;this.applyValidity(o,t),this.invalid!==o?this.invalid=o:r&&Me(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,o){o?this.setAttribute(`aria-${t}`,o):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let o in this.validMap){let r=this.validMap[o];if(!r.valid)return this.validationResult=r}this.resetInvalid()}applyValidity(t,o){G(this)?.setValidity({customError:t},o)}formDisabledCallback(t){this.disabled=t}setFormValue(t){G(this)?.setFormValue?.(t)}};function Ds(e,t){let o,r=t.key;if(r==="ArrowDown"&&e.goDown)o=e.goDown();else if(r==="ArrowRight"&&e.goRight)o=e.goRight();else if(r==="ArrowUp"&&e.goUp)o=e.goUp();else if(r==="ArrowLeft"&&e.goLeft)o=e.goLeft();else if(r==="Home")o=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(r==="End")o=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)o=e.other(t);else return null;return t.stopPropagation(),o&&t.preventDefault(),o}function Ee(e){return h(e.host,"keydown").map(t=>Ds(e,t)).filter(t=>!!t)}function Rs(e){return new E(t=>{let o=e.focus;e.focus=()=>{o.call(e),t.next()},t.signal.subscribe(()=>e.focus=o)})}function lr({host:e,observe:t,getFocusable:o,getSelected:r,getActive:n=()=>cr(e)}){let i=[];function a(){let c=i.find(s=>!s.disabled&&!s.hidden&&!be(s));c&&(c.tabIndex=0)}return u(h(e,"focusin").tap(()=>{let c=n(),s=!1;for(let f of i)f.tabIndex=f===c?(s=!0,0):-1;s||a()}),(t??N(!0)).tap(()=>{if(i=o(),i.find(f=>f.tabIndex===0))return;let s=r?.();s?s.tabIndex=0:a()}),e instanceof HTMLElement?Rs(e).tap(()=>{let c=o();(c?.find(f=>f.tabIndex===0)??c?.[0])?.focus()}):v).ignoreElements()}function cr(e){return pe(e)?.activeElement??document.activeElement??void 0}function pr({getFocusable:e,getActive:t}){return(o=1,r,n=be)=>{let i=t(),a=e(),c=r??(i?a.indexOf(i):-1),s;do s=a[c+=o];while(s&&n(s));return s}}function kf(e){let{host:t,getFocusable:o,orientation:r,observe:n}=e,i=pr(e),a=[];function c(s){s instanceof HTMLElement&&s.focus({focusVisible:!0})}return u((n??N(!0)).tap(()=>a=o()),lr(e),Ee({host:t,...r==="horizontal"?{goRight:()=>i(1),goLeft:()=>i(-1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>i(1,-1),goLast:()=>i(-1,a.length),other:e.customKey}).tap(c))}function Xi({host:e,input:t,handleOther:o=!1,axis:r}){let n=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function i(k=1){if(e.open===!1){e.open=!0;let S=n();requestAnimationFrame(()=>{S?.focused&&f(S)})}else return a(k)}function a(k=1,S){let T=n(),D=S??(T?e.options.indexOf(T):-1),I;do I=e.options[D+=k];while(I?.hidden);return I}function c(k){let S=k.key;if(/^\w$/.test(S)){let T=n(),D=T?e.options.indexOf(T):-1;if(D===-1)return;let I=D;I+1>=e.options.length&&(D=0);let R=new RegExp(`^\\s*${S}`,"i"),V;for(;V=e.options[++D];)if(!V.hidden&&V.textContent?.match(R))return V;if(I===0)return;for(D=0;D<I&&(V=e.options[D++]);)if(!V.hidden&&V.textContent?.match(R))return V}}let s=()=>e.options.find(k=>k.focused);function f(k){for(let S of e.options)S.focused=!1;k?(k.focused=!0,t?.setAria("activedescendant",ve(k)),k.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let w=k=>$(k,"selectable.action",k);return u(Ee({host:t??e,...r==="x"?{goLeft:()=>i(-1),goRight:()=>i(1)}:{goDown:()=>i(1),goUp:()=>i(-1)},goFirst:()=>e.open!==!1?a(1,-1):void 0,goLast:()=>e.open!==!1?a(-1,e.options.length):void 0,other:o?c:void 0}).tap(k=>{e.open===!1&&k?w(k):f(k)}),h(t??e,"focus").tap(()=>f(n())),fo(t??e,"Enter").tap(k=>{let S=s();e.open!==!1&&S?(k.stopPropagation(),w(S)):e.open===!1&&(e.open=!0)}))}function fr(e){return new E(t=>{u(Ao("selectable",e,e.options,o=>{if(o.type==="connect"&&(o.target.view=e.optionView,o.target.selected))return e.defaultValue===void 0&&(e.defaultValue=o.target.value),t.next(o.target);let r;for(let n of e.options)n.hidden||!n.parentNode||n.selected&&(r?n.selected=!1:r=n);t.next(r)}),Q(e,"selectable.action").tap(o=>{if(!e.disabled&&o&&e.options?.includes(o)){let r=e.value!==o.value;t.next(o),r&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var Ke={},Mo=class e extends ie{options=[];_value;_selected=Ke;static{l(e,{init:[d("value"),_("selected")],augment:[t=>fr(t).tap(o=>{(!o||o!==t.selected)&&t.setSelected(o)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===Ke?this.options[0]?.value:this._value}get selected(){return this._selected===Ke&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==Ke&&this._selected.value===t){this._value=t;return}else for(let o of this.options)if(o.value===t){this._value=t,this.setSelected(o);return}this._selected!==Ke?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let o of this.options)o.focused=o.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==Ke&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=Ke)}};function mt(e,t,...o){let r=document.createElementNS("http://www.w3.org/2000/svg",e);for(let n in t){if(n==="children")continue;let i=t[n];r.setAttribute(n==="className"?"class":n,i)}return o&&r.append(...o),r}function Ge(e){return mt("svg",e,mt("path",{d:e.d}))}function Fs({host:e,target:t,position:o,onToggle:r,whenClosed:n=v}){return i=>(t.popover??="auto",t.togglePopover(i),r?.(i),i?u(K(e),h(window,"resize"),h(window,"scroll",{capture:!0,passive:!0})).tap(o):n)}function Ui(e){let{host:t,beforeToggle:o,target:r}=e,n=Fs({...e,whenClosed:L(t).tap(()=>{t.open=!0})});return u(h(r,"toggle").tap(i=>{let a=i.newState==="open";t.open=a}),m(t,"open").raf().switchMap(i=>(o?.(i),t.ariaExpanded=i?"true":"false",n(i))))}var Bt=class extends x{invalid=!1};l(Bt,{tagName:"c-field-help",init:[d("invalid")],augment:[p(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${A("body-small")}
}
	`),y,e=>(e.slot||="help",m(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var Ht=p(`
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
`),dr=p(`
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
`),Is=p(`
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

${we(".content")}
	`);function Ls(e){return u(Q(e,"registable.form",!1).tap(t=>{t.id==="form"&&t.target&&(e.input=t.target)}),ut("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var zs=()=>b("div",{className:"content"},b("slot",{name:"leading"}),b("div",{className:"body"},b("slot",{name:"label"}),b("slot",{id:"bodyslot"})),b("slot",{name:"trailing"}),b("div",{className:"indicator"}));function Ps(e){function t(f){n.next(f.touched&&f.invalid),e.toggleAttribute("invalid",n.value);let w=0,k=[];for(let T of a.assignedNodes())!(T instanceof HTMLElement)||T===s||("invalid"in T&&T.invalid?n.value&&(T.invalid===!0||T.invalid===f.validationResult?.key)?(w++,T.style.display="",k.push(ve(T))):T.style.display="none":k.push(ve(T)));let S=!n.value||w>0;s.textContent=S?"":f.validationMessage,S?s.remove():(s.parentElement||e.append(s),k.push(ve(s))),k.length?f.setAria("describedby",k.join(" ")):f.setAria("describedby",null)}function o(f){let w=e.input;if(w){if(e.toggleAttribute("inputdisabled",w.disabled),t(w),!f)return;f.type==="focus"?i.next(!0):f.type==="blur"&&i.next(!1)}}function r(){let f=e.input?.value,w=!e.input?.hasAttribute("autofilled")&&(!f||f.length===0);c.classList.toggle("novalue",w),c.classList.toggle("value",!w)}let n=te(!1),i=te(!1),a=b("slot",{name:"help"}),c=e.contentElement.children[1].children[0],s=b(Bt,{ariaLive:"polite"});return M(e).append(b("div",{className:"help"},a)),u(m(e,"input").switchMap(f=>f?u(N(void 0).tap(()=>{o(),queueMicrotask(r)}),h(f,"focusable.change").tap(o).tap(r),h(f,"focus").tap(o),h(f,"invalid").tap(o),h(f,"update").tap(r),u(h(f,"blur"),h(a,"slotchange")).raf(o),h(e.contentElement,"click").tap(()=>{f&&document.activeElement!==f&&!e.matches(":focus-within")&&!i.value&&f.focus()})):v),Ls(e))}var Ce=class e extends x{floating=!1;input;size;contentElement=zs();static{l(e,{init:[g("floating"),_("input"),re("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,Ps]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},ur=class extends Ce{};l(ur,{tagName:"c-field",augment:[Ht,dr,Is]});var Vs=p(`
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
`),ji=p(`
${bo("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function Bs(e,t){return()=>{let o=e.parentElement instanceof Ce?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${o.bottom}px`,t.style.left=`${o.x}px`,t.style.minWidth=`${o.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-o.bottom-16,280)}px`}}function xr({host:e,target:t,input:o,position:r,beforeToggle:n,onToggle:i,handleOther:a,axis:c}){return u(Xi({host:e,input:o,handleOther:a,axis:c}),h(o??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),Ui({host:e,target:t,position:r??Bs(e,t),beforeToggle:n,onToggle:i}))}function Hs(e){let{host:t}=e;return u(Vs(t)??v,X(t)??v,Fe(t),xr(e))}var xt=class extends x{};l(xt,{tagName:"c-select-option",augment:[p(`
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
		`),y]});var mr=class extends Mo{open=!1;optionView=xt;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let o of this.options)o!==t&&(o.slot="");t&&(t.slot="selected")}}};l(mr,{tagName:"c-select",init:[g("open")],augment:[C("listbox"),p(`
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
		`),e=>{let t=b("div",{className:"menu"},b("slot")),o=b("slot",{name:"selected"}),r=t.style,n=vo(e),i=0,a=0;M(e).append(t,o,Ge({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function c(){if(e.open)a=e.selected?.rendered?.offsetHeight??0;else{r.cssText="";let s=e.options.reduce((f,w)=>Math.max(f,w?.rendered?.offsetWidth??0),0);n.replaceSync(`:host{width:${s}px}`)}}return u(u(rt(e),Re()).raf(c),Hs({host:e,target:t,handleOther:!0,beforeToggle(s){c();let f=e.selected;f&&(f.slot=s?"":"selected"),t.classList.toggle("open",s)},onToggle(s){let f=e.selected;!s&&f&&(i=f.rendered?.offsetHeight??0)},position(){let s=e.parentElement??e,f=Math.round((a-i)/2),w=e.selected?.rendered,k=s.getBoundingClientRect(),S=e.getBoundingClientRect(),T=S.top-14,D,I=w?w.offsetTop:0;I>T&&(I=T),D=t.scrollHeight;let R=window.innerHeight-S.top+8+I,V=S.top-f-I;D>R?D=R:D<S.height&&(D=S.height),r.top=V+"px",r.left=k.left+"px",r.maxHeight=D+"px",r.minWidth=k.width+"px",r.transformOrigin=`${I}px`}}))}]});function gr(e){let t=Dt();return u(ue("field",e,o=>t.next(o)),t)}function gt(e){let t;return gr(e).switchMap(o=>m(e,"input").switchMap(r=>r?N(r):o?m(o,"input").switchMap(n=>n?N(t=n):v):t?N(t):v))}function Ot(e,t,o){return m(e,o).tap(r=>Ft(t,o,r))}var Os="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function me({host:e,input:t,toText:o,toValue:r,update:n}){t.className="cxl-native-input",t.setAttribute("style",Os),t.setAttribute("form","__cxl_ignore__");function i(s){e.value=r?r(t.value||""):t.value,s.stopPropagation(),e.dispatchEvent(new Event(s.type,{bubbles:!0}))}function a(){let s=e.value,f=o?o(s,t.value):s||"";t.value!==f&&e.setInputValue(f)}function c(){t.ariaLabel=e.ariaLabel;let s=e.getAttribute("aria-labelledby");s?t.setAttribute("aria-labelledby",s):t.removeAttribute("aria-labelledby")}return u(Fe(e,t),Y(()=>(c(),t.form?h(t.form,"reset").tap(i):v)),m(e,"value").tap(()=>{o&&t.matches(":focus")||a()}),h(t,"blur").tap(a),h(t,"input").tap(i),h(t,"change").tap(i),Ot(e,t,"disabled"),Ot(e,t,"name"),Ot(e,t,"autocomplete"),Ot(e,t,"spellcheck"),Ot(e,t,"autofocus"),so(e,["aria-label","aria-labelledby"]).tap(c),n?n.tap(a):v,h(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),h(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var ht=class e extends ie{inputValue="";static{l(e,{init:[_("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,h(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity||null}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,o){o?this.inputEl.setAttribute(`aria-${t}`,o):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,o){G(this).setValidity({customError:t},o,this.inputEl),this.inputEl.setCustomValidity(t?o||"Invalid Field":"")}};var br=[p(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),X],Yt=[...br,y],le=class e extends ht{autofilled=!1;autocomplete;static{l(e,{init:[g("autofilled"),d("autocomplete")],augment:[t=>h(t.inputEl,"animationstart").tap(o=>{(o.animationName==="cxl-onautofillstart"||o.animationName==="cxl-onautofillend")&&(t.autofilled=o.animationName==="cxl-onautofillstart",$(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,o){this.inputEl.setSelectionRange(t,o)}getWindowSelection(){return this.shadowRoot?.getSelection?.()||getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},hr=class extends le{value="";inputEl=b("input",{className:"input"})};l(hr,{tagName:"c-input-text",init:[d("value")],augment:[...Yt,e=>e.append(e.inputEl),e=>me({host:e,input:e.inputEl})]});function Ys(e){getComputedStyle(e).direction==="rtl"?e.scrollLeft=1e6:e.scrollLeft=e.scrollWidth}var To=class e extends le{selected;value;inputEl=b("input",{className:"input"});static{l(e,{tagName:"c-input-option",init:[d("value"),_("selected")],augment:[...Yt,t=>t.append(t.inputEl),t=>me({host:t,input:t.inputEl,toText:()=>t.selected?.textContent??"",toValue:o=>o!==""?t.selected?.value:void 0}),t=>F(t,"selected").tap(o=>{let r=t.selected?.textContent;t.value=o?.value,t.setInputValue(r??""),Ys(t.inputEl)})]})}};function _s(e){return yr(e,"^")}function yr(e,t=""){if(e==="")return()=>!0;let o=Xs(e,t);return r=>r.textContent?o.test(r.textContent):!1}function Xs(e,t="",o="i"){return new RegExp(t+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o)}var qi=class e extends x{optionView=xt;open=!1;debounce=100;options=[];matcher=yr;static{l(e,{tagName:"c-autocomplete",init:[g("open"),Te("debounce")],augment:[C("listbox"),ji,W,t=>{let o=b("slot",{name:"empty"}),r=b("div",{id:"menu",tabIndex:-1},b("slot"),o),n=Ge({viewBox:"0 0 24 24",id:"caret",d:"M7 10l5 5 5-5z",width:20,height:20,fill:"currentColor"});n.style.cursor="pointer",o.style.display="none";function i(s){t.open=!0,c(s)}function a(s,f){s?.setAria("activedescendant",ve(f)),f.rendered?.scrollIntoView({block:"nearest"})}function c(s){let f=s.inputValue??s.value,w=t.matcher==="substring"?yr:t.matcher==="prefix"?_s:t.matcher,k=f?w(String(f)):void 0,S=0;for(let T of t.options){let D=k?!k(T):!1;T.hidden=D,T.focused=!(D||S++>0),T.focused&&a(s,T)}o.style.display=S?"none":""}return M(t).append(r,n),u(gt(t).switchMap(s=>(s.setAria("autocomplete","list"),s.role="combobox",s.setAria("controls",ve(t)),s.setAria("haspopup",t.role),s.setAttribute("autocomplete","off"),u(m(t,"open").tap(f=>{if(f)n.tabIndex=-1,i(s);else{for(let w of t.options)w.focused=!1;n.tabIndex=0,s?.setAria("activedescendant",null)}s.setAria("expanded",String(f))}),u(lo(n),h(n,"mousedown")).tap(f=>{f.preventDefault(),f.stopPropagation(),s.focus()}).debounceTime(100).tap(()=>{t.open=!0}),m(t,"debounce").switchMap(f=>h(s,"input").debounceTime(f).tap(()=>t.open?c(s):i(s))),h(t,"change").tap(f=>{f.target===t&&s.dispatchEvent(new Event("change",{bubbles:!0}))}),xr({host:t,target:r,input:s}),u(fr(t),F(s,"value").map(f=>{for(let w of t.options)if(w.value===f)return w})).tap(f=>{for(let w of t.options)w.focused=w.selected=!1;f&&(f.selected=!0),s instanceof To?s.selected=f:s&&(s.value=f?.value),t.open=!1})))))}]})}};var Us=p(`
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
`),vr=class extends x{size;src="";text=""};l(vr,{tagName:"c-avatar",init:[re("size",e=>`{
				width: ${30+e*8}px;
				height: ${30+e*8}px;
				font-size: ${18+e*4}px;
			}`),d("src"),d("text")],augment:[Us,e=>{let t;return P(m(e,"src"),m(e,"text")).raf(([o,r])=>{t?.remove(),o?(t=new Image,t.alt=e.text??"",t.src=o):r?t=new Text(r):t=wo("person"),M(e).append(t)})}]});var wr=class extends x{};l(wr,{tagName:"c-body",augment:[p(`
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

${z("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),y]});var kr=class extends pt{};l(kr,{tagName:"c-button-text",augment:[...qe,p(`
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
		`),ee,y]});function Sr(e="block"){let t=(o=>{for(let r=12;r>0;r--)o.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,o.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,o.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,o.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,o.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return o})({xl:"",lg:"",md:"",sm:"",xs:""});return p(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${z("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${z("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${z("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${z("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var Er=p(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${ct()}
${je.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${je.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),bt=class extends x{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};l(bt,{init:[g("sm"),g("xs"),g("md"),g("lg"),g("xl"),g("vpad"),g("pad"),g("center"),g("fill"),g("grow"),g("elevation"),J("color")]});var _t=class extends bt{};l(_t,{tagName:"c-c",augment:[Er,Sr(),p(":host([center]) { text-align: center}"),y]});var js=p(`
:host {
	${O("surface-container")}
	${A("body-medium")}
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
${ct()}
`),Xt=class extends _t{variant};l(Xt,{tagName:"c-card",init:[g("variant")],augment:[js]});var qs=p(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${A("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function Ws(e){return u(ue("list",e),m(e,"selected").tap(t=>e.ariaSelected=String(t)))}function Ar(e){return u(er(e),Fe(e,e,-1),Ws(e))}var yt=class extends x{disabled=!1;touched=!1;selected=!1};l(yt,{init:[g("disabled"),g("touched"),g("selected")],augment:[Ar]});var Cr=class extends yt{size};l(Cr,{tagName:"c-item",init:[re("size",e=>`{min-height:${56+e*8}px}`)],augment:[qs,X,lt,C("option"),y,ee]});var Nr=class extends Xt{disabled=!1;touched=!1;selected=!1};l(Nr,{tagName:"c-card-item",init:[g("disabled"),g("touched"),g("selected")],augment:[C("option"),...qe,p(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),Ar,ee]});function Mr(e){return u(P(m(e,"indeterminate"),m(e,"checked")).map(([t,o])=>e.ariaChecked=t?"mixed":String(o)),u(L(e).tap(()=>{e.disabled||(e.indeterminate&&(e.indeterminate=!1),e.checked=!e.checked)}),m(e,"checked").tap(()=>{G(e).setFormValue?.(e.checked?String(e.value):null)}),F(e,"checked").tap(()=>{e.dispatchEvent(new Event("change",{bubbles:!0}))})).ignoreElements())}var Wi=class e extends ie{value="on";checked=!1;indeterminate=!1;defaultChecked=!1;static{l(e,{tagName:"c-checkbox",init:[d("value"),d("checked"),d("indeterminate")],augment:[C("checkbox"),p(`
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
${we(".mask")}
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
`),ke,X,t=>{t.defaultChecked=t.checked;let o=b("div",{className:"mask"}),r=b("div",{className:"box"},Ge({className:"check",viewBox:"0 0 24 24",d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),Ge({className:"minus",viewBox:"0 0 24 24",d:"M19 13H5v-2h14v2z"}),o);return M(t).append(r,b("slot")),u(ee(o,t),Mr(t).tap(n=>r.setAttribute("state",n)))}]})}formResetCallback(){this.checked=this.defaultChecked,this.touched=!1}setFormValue(t){G(this).setFormValue?.(this.checked?t:null)}};var Tr=class extends x{disabled=!1;touched=!1;selected=!1;color;size=0};l(Tr,{tagName:"c-chip",init:[g("disabled"),g("touched"),g("selected"),J("color","surface-container-low"),re("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[C("button"),ke,...qe,p(`
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
		`),ee,()=>b("slot",{name:"leading"}),y,()=>b("slot",{name:"trailing"})]});var Dr=class extends x{date;format;locale};l(Dr,{tagName:"c-date",init:[Di("date"),d("format"),d("locale")],augment:[e=>P(m(e,"locale").switchMap(t=>U.getLocale(t)),m(e,"date"),m(e,"format")).raf(([t,o,r])=>e.textContent=o?t.formatDate(o,r):"")]});ft({"dialog.close":"Close dialog","dialog.cancel":"Cancel","dialog.ok":"Ok"});var Fr=p(`
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

${z("small",".content { max-height: 85%; }")}
	`),vt=class extends x{static=!1;open=!1;fullscreen=!1;dialog=document.createElement("dialog");returnValue};l(vt,{init:[d("static"),d("open"),g("fullscreen")],augment:[W,e=>h(e,"keydown").tap(t=>{t.key==="Escape"&&(t.preventDefault(),e.open=!1)}),e=>h(e.dialog,"close").tap(()=>e.open=!1),e=>e.dialog,e=>m(e,"open").tap(t=>{t?e.static?e.dialog.show():Z.openModal({element:e.dialog,close:()=>e.open=!1}):e.dialog.open&&(e.dialog.close(),Me(e,"close"))}),e=>Q(e,"toggle.close").tap(t=>{e.returnValue=t,e.open=!1})]});var Rr=class extends vt{};l(Rr,{tagName:"c-dialog",augment:[Fr,e=>{e.dialog.append(b("slot",{className:"content"}))}]});function Do(e,t,...o){let r=b(e,t,...o);return new Promise(n=>{let i=()=>{r.removeEventListener("close",i),r.remove(),n(r.returnValue)};r.addEventListener("close",i),r.parentNode||document.body.append(r),r.open=!0})}var $e=class extends vt{};l($e,{tagName:"c-dialog-basic",augment:[Fr,p(`
dialog {
	display:flex; flex-direction:column;row-gap:16px;
	max-width: min(calc(100% - 24px), 560px);
}
slot[name=title] { ${A("title-large")} }
slot[name=actions] {
	display:flex; column-gap: 24px; align-items: center; justify-content: end; margin-top:8px;
}
		`),e=>{e.dialog.append(b("slot",{name:"title"}),b("slot"),b("slot",{name:"actions"}))}]});var Ze=(e,t,o=e)=>L(e).tap(()=>$(o,"toggle.close",t)),tm=(e,t,o=e)=>L(e).tap(()=>$(o,"toggle.open",t));function Ki(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(o=>{let r=Se(e,o);return r?[r]:[]}):Array.isArray(t)?t:[t]}function Ks(e,t,o,r,n=h(e,"click").map(()=>!o())){return u(r,n).switchMap(i=>{let a=t();return a?et(a.map(c=>({target:c,open:i}))):v})}function Ut(e,t=e){function o(i,a){return[m(e,"open").switchMap(c=>(i.parentNode||Z.popupContainer.append(i),c&&i instanceof x?F(i,"open").map(s=>{e.open&&s===!1&&(e.open=!1)}):v)),at(i).tap(c=>{let s=i.getAttribute("role");(s==="menu"||s==="listbox"||s==="tree"||s==="grid"||s==="dialog")&&(a.ariaHasPopup=s),a.getRootNode()===i.getRootNode()&&a.setAttribute("aria-controls",c)})]}let r=P(m(e,"trigger"),m(e,"target")).switchMap(([i])=>{let a=Ki(e),c=a?u(...a.flatMap(s=>o(s,e))).ignoreElements():v;return u(i==="hover"?P(Uo(t),a?u(...a.map(s=>Uo(s))):v).map(s=>!!s.find(f=>!!f)).debounceTime(250):i==="checked"?h(t,"change").map(s=>s.target&&"checked"in s.target?!!s.target.checked:!1):h(t,"click").map(()=>!e.open),c)}),n;return Gn().switchMap(()=>Ks(t,()=>Ki(e),()=>e.open,m(e,"open"),r).filter(i=>{let{open:a,target:c}=i;if(e.open!==a){if(a)n=pe(e)?.activeElement,c.trigger=e;else if(c.trigger&&c.trigger!==e)return i.open=!0,c.trigger=e,!0;return e.open=a,!1}if(!a&&c.trigger===e){let s=document.activeElement;(s===document.body||s===document.documentElement)&&n?.focus()}return!0}))}var wt=class extends x{open=!1;target;trigger};l(wt,{init:[d("target"),d("trigger"),g("open")],augment:[e=>Ut(e).raf(({target:t,open:o})=>t.open=o)]});var Ir=class extends wt{};l(Ir,{tagName:"c-toggle",augment:[W,y]});function cm(e){let t=[],{message:o,title:r,action:n}=typeof e=="string"?{message:e}:e;return r&&t.push(b("div",{slot:"title"},r)),t.push(b(ye,void 0,o),b(fe,{$:Ze,variant:"text",slot:"actions"},n??U.get("dialog.ok"))),Do($e,{},...t)}function hm(e){let t=[];if(typeof e=="string")t.push(e);else{let{message:o,title:r,action:n,cancelAction:i}=e;r&&t.push(b("div",{slot:"title"},r)),t.push(b(ye,void 0,o),b(fe,{variant:"text",slot:"actions",$:Ze},i??U.get("dialog.cancel")),b(fe,{variant:"text",slot:"actions",$:Ze},n??U.get("dialog.ok")))}return Do($e,{},...t)}var Ie;function Gi(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Gs(e){return e==="infinite"?1/0:+e}function $s(e){if(Ci(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let o={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(c,s,f)=>(s&&(r=+s),f&&(o.composite=f),"")),Ie??=document.createElement("style").style,Ie.animation=e,o.fill=Ie.animationFillMode;let n=o.fill==="forwards"||o.fill==="both",i=t?void 0:Gi(Ie.animationDuration);i!==void 0&&(o.duration=i);let a=Gi(Ie.animationDelay);return a!==void 0&&(o.delay=a),Ie.animationIterationCount&&(o.iterations=Gs(Ie.animationIterationCount)),{animation:Ie.animationName,keep:n,stagger:r,options:o}}function Zs(e){return typeof e=="string"&&(e=e.split(",").map(t=>$s(t.trim()))),e}function jt(e,t,o,r){let n=r?`motion-${r}-on`:"motion-on",i=Zs(o);return e.setAttribute(n,""),u(...i.map(a=>zt({target:t,...a}))).finalize(()=>e.removeAttribute(n))}var Lr=class extends x{motion;target};l(Lr,{tagName:"c-dismiss",init:[d("motion"),d("target")],augment:[W,y,e=>No(e,"target").switchMap(t=>t?L(e).tap(()=>{e.motion?jt(e,t,e.motion).finalize(()=>t.remove()).subscribe():t.remove()}):v)]});function zr(e,{target:t,clientX:o,clientY:r},n,i){if(!t)throw new Error("Invalid Event Target");return{type:e,target:t,clientX:o,clientY:r,startX:n,startY:i}}function Qs(){let e={},t=te(e),o=new oe;return{dragging:t,dropping:o,elements:e,next:()=>t.next(e)}}var Le=Qs();function Js(e){return({target:t,moveTarget:o,delay:r})=>{let n=!1,i=0;r??=60;let a=o||t,c=t.style,{userSelect:s,transition:f}=c;return new E(w=>{function k(R,V=!0){n?(n=!1,a.style.transition=f,D?.unsubscribe(),w.next(R),delete Le.elements.mouse,V&&Le.dropping.next({element:a,event:R}),Le.next()):clearTimeout(i)}let S=0,T=0;s=c.userSelect,c.userSelect="none";let D,I=u(e(t).switchMap(R=>{if(R.type==="pointerdown"){f=a.style.transition,R.preventDefault(),S=R.clientX,T=R.clientY;let V=R.pointerId;n=!1,i=setTimeout(()=>{if(a.style.transition="none",!!t.isConnected){try{t.setPointerCapture(V)}catch(ce){console.error(ce)}n=!0,w.next(zr("start",R,S,T)),D=h(window,"keydown").tap(ce=>{n&&ce.key==="Escape"&&(ce.preventDefault(),k({type:"end",target:t,clientX:0,clientY:0,startX:S,startY:T},!0))}).subscribe()}},r)}else if(R.type==="pointermove"){if(n){let V=zr("move",R,S,T);w.next(V),Le.elements.mouse={element:a,event:V},Le.next()}}else return clearTimeout(i),N(R);return v}).debounceTime().tap(R=>k(zr("end",R,S,T))),h(t,"click",{capture:!0}).tap(R=>{n&&R.target===t&&R.stopImmediatePropagation()})).subscribe();w.signal.subscribe(()=>{I.unsubscribe(),D?.unsubscribe(),c.userSelect=s})})}}function el(e){return e.style.touchAction||(e.style.touchAction="none"),h(e,"pointerdown").switchMap(t=>t.currentTarget?new E(o=>{o.next(t);let r=u(h(window,"pointermove").tap(n=>o.next(n)),u(h(window,"pointercancel"),h(window,"pointerup")).tap(n=>{o.next(n),r.unsubscribe()})).subscribe();o.signal.subscribe(()=>r.unsubscribe())}):v)}var tl=Js(el);function ol(e){return tl(e)}function $i(e,t){let o=t.clientX,r=t.clientY;return e.left<o&&e.right>o&&e.top<r&&e.bottom>r}function rl(e){let t=Le.elements,o=[],r;for(let n in t){let i=t[n],{event:a,element:c}=i;a&&c!==e&&(r||=e.getBoundingClientRect(),$i(r,a)&&o.push({type:"over",target:e,relatedTarget:c,clientX:a.clientX,clientY:a.clientY}))}return o}function nl(e){let t=0;return Le.dragging.switchMap(()=>{let o=rl(e);return t===0&&o.length===0?v:(t=o.length,N(o))})}function il(e){return nl(e).switchMap(t=>t.length===0?N({type:"out",target:e,clientX:0,clientY:0}):et(t))}function al(e){return Le.dropping.switchMap(({element:t,event:o})=>e!==t&&$i(e.getBoundingClientRect(),o)?N({type:"drop",target:e,clientX:o.clientX,clientY:o.clientY,relatedTarget:t}):v)}function sl(e,t){return{width:e.offsetWidth,height:e.offsetHeight,x:t.clientX,y:t.clientY,sx:t.clientX/e.offsetWidth,sy:t.clientY/e.offsetHeight}}function ll({target:e,moveTarget:t,axis:o}){let r;return n=>{let i=t||e;if(n.type==="start")r=sl(i,n);else if(n.type==="end")i.style.transform="",r=void 0;else if(r){let a=o==="y"?0:(n.clientX-r.x)/r.width,c=o==="x"?0:(n.clientY-r.y)/r.height;return N({event:n,x:a,y:c,sx:r.sx,sy:r.sy})}return v}}function cl(e){return({x:t,y:o})=>{let r=(e.moveTarget||e.target).style;r.transform=`translate(${t*100}%, ${o*100}%)`}}function Zi(e){let t=0;return u(h(e,"dragenter").tap(o=>{++t===1&&e.setAttribute("dragover",""),o.stopPropagation()}),h(e,"dragleave").tap(()=>{--t===0&&e.removeAttribute("dragover")}),h(e,"dragover").tap(o=>o.preventDefault()),h(e,"drop").tap(o=>{o.preventDefault(),o.stopPropagation(),e.removeAttribute("dragover"),t=0})).filter(o=>o.type==="drop")}function Qi(e){let t=e.moveTarget||e.target;return u(ol(e).tap(o=>{o.type==="start"?t.toggleAttribute("dragging",!0):o.type==="end"&&t.toggleAttribute("dragging",!1)}).switchMap(ll(e)).tap(cl(e)).ignoreElements(),il(t).tap(o=>t.toggleAttribute("dragover",o.type==="over")),al(t))}var Ji=class e extends x{dragging=!1;dragover=!1;target;static{l(e,{tagName:"c-drag-handle",init:[g("dragging"),g("dragover")],augment:[y,p(`
:host { display: block; cursor:grab; position: relative; touch-action: none; }
:host([dragging]) { z-index: 10 }
		`),t=>No(t,"target").switchMap(o=>Qi({target:t,moveTarget:o,delay:150}).tap(r=>t.handleDrag?.(r)))]})}};var qt=class extends x{center=!1};l(qt,{tagName:"c-backdrop",init:[g("center")],augment:[p(`
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

	`),e=>h(e,"keydown").tap(t=>t.stopPropagation()),y]});var kt=p(":host(:not([open],[motion-out-on])){display:none}");function Qe(e,t=()=>e,o=!1){let r=Y(()=>N(t("in"))),n=Y(()=>N(t("out")));return u(Q(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),P(m(e,"motion-in").map(i=>i?r.switchMap(a=>jt(e,a,i,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?Ye(e.duration).map(()=>e.open=!1):v):r),m(e,"motion-out").map(i=>(i?n.switchMap(a=>jt(e,a,i,"out").ignoreElements()):n).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([i,a])=>F(e,"open").switchMap(c=>{if(e.popover!=="auto"){let s=c?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:c?"closed":"open",newState:s}))}return c?o?ge(a,i):i:o?ge(a,i):a})))}var ze=class extends x{open=!1;duration;"motion-in";"motion-out"};l(ze,{init:[d("motion-in"),d("motion-out"),Te("duration"),g("open")]});var Pr=class extends ze{};l(Pr,{tagName:"c-toggle-target",augment:[p(`
:host{display:contents}
`),e=>{let t=b("slot"),o=b("slot",{name:"off"});return(e.open?o:t).style.display="none",M(e).append(t,o),Qe(e,r=>{t.style.display=o.style.display="none";let n=e.open?r==="in"?t:o:r==="in"?o:t;return n.style.display="",n.assignedElements()},!0)}]});var Wt=class extends ze{};l(Wt,{tagName:"c-toggle-panel",augment:[y,kt,Qe]});var pl=p(`
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
${z("small","#drawer { width: 360px }")}

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
`),Vr=class extends x{open=!1;position;responsive;permanent=!1};l(Vr,{tagName:"c-drawer",init:[g("open"),g("position"),d("responsive"),d("permanent")],augment:[pl,p(`
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
`),e=>{let t=te(!1),o=u(m(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",n=b(Wt,{id:"drawer","motion-in":o.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":o.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},y),i=new qt;i.id="backdrop";let a=b("dialog",{id:"dialog"},i,n);return M(e).append(a),u(h(n,"close").tap(()=>a.close()),h(a,"close").tap(()=>e.open=!1),F(n,"open").tap(c=>e.open=c),F(e,"open").raf(c=>{c||n.scrollTo(0,0)}),h(i,"click").tap(()=>e.open=!1),h(a,"cancel").tap(c=>{c.preventDefault(),e.open=!1}),m(e,"open").tap(c=>{if(t.value&&e.permanent)return n.open=!0;c?t.value||(Z.openModal({element:a,close:()=>e.open=!1}),a.getBoundingClientRect()):Z.currentModal?.element===a&&Z.modalClosed()}).raf(c=>{n.open=c}),m(e,"responsive").switchMap(c=>c!==void 0?yo(document.body):N("xsmall")).switchMap(c=>{let s=H.breakpoints[e.responsive||"large"],f=H.breakpoints[c]>=s;return t.next(f),f&&n.className!=="permanent"?a.close():!f&&n.className==="permanent"&&(e.open=!1),f&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",f),n.className=f?"permanent":"drawer",F(e,"open").tap(w=>{e.hasAttribute("responsiveon")||ne({target:i,animation:w?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var Br=class extends wt{icon="arrow_right"};l(Br,{tagName:"c-dropdown",init:[d("icon")],augment:[p(`
:host { display: flex; gap: 0; align-items: center; cursor: pointer; }
.icon { transition: rotate var(--cxl-speed); height:24px; width:24px; translate: -7px; margin-right: -6px; }
:host(:dir(rtl)) .icon { rotate: 180deg; }
:host([open]) .icon { rotate: 90deg; }
		`),e=>{let t=b(We,{className:"icon"});return e.shadowRoot?.append(t,b("slot")),u(m(e,"icon").tap(o=>t.name=o),h(e,"keydown").tap(o=>{o.key==="ArrowRight"?e.open=!0:o.key==="ArrowLeft"&&(e.open=!1)}))}]});var Ro=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,o=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,o)):r.insertBefore(t,o))}empty(){let t=this.start.nextSibling;for(;t&&t!==this.end;){let o=t.nextSibling;t.remove(),t=o}}};function ta({source:e,render:t,empty:o,append:r,loading:n}){let i=[],a=document.createDocumentFragment(),c,s;function f(w){if(s?.parentNode?.removeChild(s),!w)return;let k=0;for(let T of w){let D=i[k]?.item;if(D)D.value!==T&&D.next(T);else{let I=te(T),R=t(I,k,w),V=R instanceof DocumentFragment?Array.from(R.childNodes):[R];i.push({elements:V,item:I}),a.append(R)}k++}a.childNodes.length&&r(a),c?.remove(),k===0&&o&&r(c=o());let S=i.length;for(;S-- >k;)i.pop()?.elements.forEach(T=>T.remove())}return Y(()=>(s=n?.(),s&&r(s),e.raf(f)))}function hx(e){return ti(()=>{let t=new Ro;return[ta({...e,append:t.insert.bind(t)}),t.end]})}function fl(e){if(e instanceof HTMLTemplateElement)return e;throw"Element must be a <template>"}function ul(e,t){let o=e.getRootNode();if(o instanceof Document)return fl(o.getElementById(t));throw new Error("Invalid root node")}function ea(e,t){if(t){if(typeof t=="function")return t;if(typeof t=="string"&&(t=ul(e,t)),t instanceof HTMLTemplateElement)return()=>t.content.cloneNode(!0);throw new Error("Invalid template")}}function dl(e){return m(e,"template").switchMap(t=>t?N(ea(e,t)):_e().map(()=>ea(e,e.children[0])))}function bx(e,t,o){return dl(e).switchMap(r=>{let n=e.target?Se(e,e.target)??e:e;return r?ta({source:t,render:o?(i,a,c)=>o(r(i,a,c)):r,append:n.append.bind(n)}):v})}var Hr=class extends Ce{};l(Hr,{tagName:"c-field-bar",augment:[Ht,p(`
:host {
	box-sizing: border-box;
	${O("surface-container-high")}
	${A("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 4px 12px; }
		`)]});var Or=class extends Ce{};l(Or,{tagName:"c-field-outlined",augment:[Ht,dr,p(`
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
${Go.map(e=>`:host([size="${e}"]) { --cxl-field-outlined-label-top: ${16+e*4}px }`)}
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
		`)]});var Kt=class extends bt{vflex=!1;gap;middle=!1};l(Kt,{tagName:"c-flex",init:[g("vflex"),g("gap"),g("middle")],augment:[Sr("flex"),Er,p(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${je.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),y]});var oa=class e extends x{elements=new Set;initialValue;static{l(e,{tagName:"c-form",augment:[C("form"),W,t=>h(t,"submit",{capture:!0}).tap(o=>{o.preventDefault();let r;for(let n of t.elements)n.invalid&&(r??=n),n.touched=!0;r&&(r.focus(),o.stopPropagation(),o.stopImmediatePropagation())}),t=>ut("form",t,t.elements).tap(o=>{let r=o.target,n=r.name,i=t.initialValue;i&&n&&n in i&&(r.value=i[n])}),y]})}checkValidity(){let t=!0;for(let o of this.elements)o.invalid&&(t=!1),o.touched=!0;return t}reset(){for(let t of this.elements)t.formResetCallback()}submit(){Me(this,"submit")}requestSubmit(){this.submit()}getElementByName(t){for(let o of this.elements)if(o.name===t)return o}setTouched(t){for(let o of this.elements)o.touched=t}setFormData(t){this.initialValue=t;for(let o in t){let r=this.getElementByName(o);r&&(r.value=t[o])}}getFormData(){let t={};for(let o of this.elements){let r="checked"in o?o.checked?o.value:void 0:o.value;o.name&&(t[o.name]=r)}return t}};function ml(e){let t=e.parentElement;for(;t;){if(t.tagName==="FORM"||t.tagName==="C-FORM")return t;t=t.parentElement}}var Yr=class extends x{};l(Yr,{tagName:"c-form-submit",augment:[W,y,e=>Y(()=>{let t=ml(e);return t?u(fo(t,"enter").tap(()=>e.click()),L(e).tap(()=>{if(t.tagName==="FORM"){let o;for(let r of t.elements)r instanceof ie&&(o=r,r.touched=!0);o?.focus()}t.requestSubmit()})):v})]});function xl(e){let t=new CSSStyleSheet;return M(e).adoptedStyleSheets.push(t),m(e,"columns").raf(()=>{let o=`repeat(${e.columns}, minmax(0,1fr))`;t.replaceSync(`:host{grid-template-columns:${o}}`)})}var _r=class extends x{rows;columns=12};l(_r,{tagName:"c-grid",init:[d("columns"),d("rows")],augment:[y,p(`
:host{display:grid;gap:16px;box-sizing:border-box;}
${z("medium",":host{gap:24px}")}
`),xl]});function gl(e){return Ao("list",e,e.items)}function Xr(e){return lr({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:gl(e)})}function Ur(e){return pr({getFocusable:()=>e.items,getActive:()=>cr(e)})}function Fo(e){let t=Ur(e);return u(Xr(e),Ee({host:e,goDown:()=>t(1),goUp:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length)}).tap(o=>o.focus()))}function hl(e){let t=Ur(e);function o(r){return Math.round(r.getBoundingClientRect().left)}return u(Xr(e),Ee({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let r=pe(e)?.activeElement,n=r&&o(r);return t(-1,void 0,n!==void 0?i=>o(i)!==n:void 0)},goDown:()=>{let r=pe(e)?.activeElement,n=r&&o(r);return t(1,void 0,n!==void 0?i=>o(i)!==n:void 0)}}).tap(r=>r.focus()))}var jr=class extends x{items=[]};l(jr,{tagName:"c-grid-list",augment:[C("grid"),p(":host{display:grid;box-sizing:border-box;}"),y,hl]});var qr=class extends x{pad;vertical=!1};l(qr,{tagName:"c-hr",init:[g("pad"),g("vertical")],augment:[C("separator"),p(`
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
${je.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function Kr(e){let t=document.createElement("style");return u(B(o=>{let r=e.persistkey&&ir.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),o.signal.subscribe(()=>t.remove())}),it(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let o=e.open?e.themeon:e.themeoff;e.persistkey&&ir.set(e.persistkey,o),yi(gi[o]||o)}),L(e).tap(()=>e.open=!e.open))}var Wr=class extends x{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};l(Wr,{tagName:"c-toggle-theme",init:[d("persistkey"),d("usepreferred"),d("open"),d("themeon"),d("themeoff")],augment:[C("group"),Kr]});var Gr=class extends se{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};l(Gr,{tagName:"c-icon-toggle-theme",init:[d("persistkey"),d("usepreferred"),d("open"),d("themeon"),d("themeoff")],augment:[Kr,e=>P(m(e,"iconon"),m(e,"iconoff"),m(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var bl=()=>{let e;function t(){let o=document.adoptedStyleSheets.indexOf(e);o!==-1&&document.adoptedStyleSheets.splice(o,1)}addEventListener("message",o=>{let{theme:r}=o.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r),document.adoptedStyleSheets.push(e))})},yl=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},$r=class extends x{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};l($r,{tagName:"c-iframe",init:[d("src"),d("srcdoc"),d("sandbox"),d("handletheme")],augment:[p(`
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
	`),e=>{let t=Ue("iframe",{loading:"lazy"}),o=Ue("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),o.style.display="none";function n(a){r.replaceSync(":host{height:"+a+"px}"),t.style.height="100%",t.style.opacity="1",o.style.display="none"}function i(a){if(a){let c=`<script type="module">
(${yl.toString()})();
(${bl.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${a}${c}`,o.style.display=""}}return M(e).append(t,o),u(P(m(e,"srcdoc"),m(e,"src")).raf(async([a,c])=>{i(c?`<base href="${c}" />`+await fetch(c).then(s=>s.text()):a)}),h(window,"message").tap(a=>{let{height:c}=a.data;a.source===t.contentWindow&&c!==void 0&&n(c)}),m(e,"handletheme").switchMap(a=>a?h(t,"load").switchMap(()=>It.raf(c=>{let s=c?.css??"";t.contentWindow?.postMessage({theme:s},"*")})):v),m(e,"sandbox").tap(a=>a===void 0?t.removeAttribute("sandbox"):t.sandbox.value=a))}]});var vl=ft({"input.clear":"Clear input value"}),Zr=class extends se{icon="close"};l(Zr,{tagName:"c-input-clear",augment:[e=>ai(e,vl("input.clear")),e=>gt(e).switchMap(t=>L(e).tap(()=>t.value=""))]});function wl(e,t){return t.style.width="0",t.parentNode||e.append(t),u(u(h(t,"input"),h(t,"change")).map(o=>{if(o.stopPropagation(),e.dispatchEvent(new Event(o.type,{bubbles:!0})),t.files)return Array.from(t.files)}),L(e).tap(()=>t.click()).ignoreElements(),Zi(e).map(o=>{if(o.stopPropagation(),o.dataTransfer?.files.length)return Array.from(o.dataTransfer.files)}))}var Qr=class extends ht{value=void 0;inputEl=Ue("input",{tabIndex:-1,type:"file"})};l(Qr,{tagName:"c-input-file",init:[_("value")],augment:[W,y,e=>{let t=e.inputEl;return t.setAttribute("form","__cxl_ignore__"),e.append(t),u(Jo(e),wl(e,t).tap(o=>{e.value=o}))}]});var Jr=class e extends le{value=void 0;formatter=kl;inputEl=b("input",{className:"input"});static{l(e,{init:[d("value")],augment:[y,t=>t.append(t.inputEl),t=>me({host:t,input:t.inputEl,toText:(o,r)=>o!==void 0&&isNaN(o)?r:t.formatter(o),toValue:o=>{if(o===""){t.setValidity({key:"number",valid:!0});return}let r=Number(o);return t.setValidity({key:"number",valid:!isNaN(r)}),r}})]})}},en=class extends Jr{};l(en,{tagName:"c-input-number",augment:[...br]});function kl(e){return e===void 0||isNaN(e)?"":e.toString()}var ra=class e extends le{value="";inputEl=b("input",{type:"password",className:"input"});static{l(e,{tagName:"c-input-password",init:[d("value")],augment:[...Yt,t=>t.append(t.inputEl),t=>me({host:t,input:t.inputEl})]})}};var tn=class extends x{};l(tn,{tagName:"c-input-placeholder",augment:[p(`
:host {
	display: inline-block;
	pointer-events: var(--cxl-override-pointer-events, none);
	color: var(--cxl-color-on-surface-variant);
	position: absolute;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
	`),y,e=>{let t=vo(e);return e.shadowRoot?.adoptedStyleSheets.push(t),gt(e).switchMap(o=>P(K(o),m(o,"value"),m(o,"inputValue")).raf(()=>{let r=o.inputValue??o.value,n=r===void 0||r==="";t.replaceSync(`:host{top:${o.offsetTop}px;left:${o.offsetLeft}px;width:${o.offsetWidth}px;height:${o.offsetHeight}px;${n?"":"display:none;"}`)}))}]});function na(e,t){return e?typeof e=="string"?(t.setAttribute("aria-label",e),v):at(e).tap(o=>{e.textContent&&t.setAttribute("aria-labelledby",o)}).finalize(()=>{t.removeAttribute("aria-labelledby")}):v}var on=class extends x{};l(on,{tagName:"c-label",augment:[p(`
:host {
	display: inline-block;
}`),y,e=>gr(e).switchMap(t=>"input"in t?m(t,"input").switchMap(o=>o?na(e,o):v):na(e,t)),e=>B(()=>{e.slot="label"})]});var rn=class extends x{items=[]};l(rn,{tagName:"c-list",augment:[p(":host{display:block;padding:8px 0;}"),C("listbox"),y,Fo]});var Sl=p(`
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
	`);function El(e){function t(){e.exclusive&&!e.static&&Z.popupOpened({element:e,close:()=>e.open=!1}),e.static||(e.popover??="auto",e.showPopover())}return m(e,"open").switchMap(o=>o?(t(),u(h(e,"keydown").tap(r=>{r.key==="Escape"&&(e.open=!1,e.returnTo?.focus(),r.preventDefault(),r.stopPropagation())}),h(e,"toggle").tap(r=>{let n=r.newState==="open";n||(e.open=n)}),F(e,"open").tap(r=>{!r&&e.popover&&e.hidePopover()}),h(e,"close").tap(r=>{r.target===e&&e.popover&&e.hidePopover()}))):v)}var Gt=class extends ze{exclusive=!0;static=!1;trigger;returnTo};l(Gt,{tagName:"c-popup",init:[d("exclusive"),g("static")],augment:[y,kt,Sl,Qe,El]});var nn=class extends Gt{"motion-in"="fadeIn";"motion-out"="fadeOut";items=[];focusstart;setFocus(){let t=pe(this)?.activeElement;if(!(t&&this.contains(t))){if(this.focusstart==="selected"){let o=this.items.find(r=>r.selected);if(o){o.focus();return}}this.items[0]?.focus()}}};l(nn,{tagName:"c-menu",init:[d("focusstart")],augment:[C("menu"),p(bo()),Fo,e=>m(e,"open").tap(t=>{t&&e.setFocus()})]});var an=class extends x{};l(an,{tagName:"c-nav-headline",augment:[p(`
:host{
	color:var(--cxl-color-on-surface-variant);
	font:var(--cxl-font-title-small);
	letter-spacing:var(--cxl-letter-spacing-title-small);
	min-height:48px;
	display:flex;
	align-items: center;
	padding: 0 16px;
}
`),y]});var Cl=[p(`
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
${we("c-ripple")}
	`),X,Ni,y],$t=class extends yt{size};l($t,{tagName:"c-nav-item",init:[re("size",e=>`{min-height:${56+e*8}px}`)],augment:[C("option"),...Cl]});var sn=class extends se{open=!1;target;icon="menu"};l(sn,{tagName:"c-navbar-toggle",init:[d("target"),_("open")],augment:[e=>Ut(e).tap(({target:t,open:o})=>t.open=o)]});var St=class extends Lt{duration=4e3;"motion-in"="slideInUp,fadeIn";"motion-out"="fadeOut";open=!1;static=!1};l(St,{tagName:"c-snackbar",init:[g("open"),Te("duration"),d("motion-in"),d("motion-out"),d("static")],augment:[p(`
:host {
	display: inline-flex;
	justify-content: left;
	margin: 16px auto;
	border: 0; outline: 0;
	top: auto;
}
slot[name=action] { margin-inline-start: auto; display: block; }
	`),()=>b("slot",{name:"action"}),e=>m(e,"open").tap(t=>{t&&!e.static&&(e.popover="manual",e.showPopover())}),kt,Qe,e=>h(e,"close").tap(()=>e.remove())]});var Zt=class extends x{queue=[];notify(t){let o=typeof t=="string"?b(St,void 0,t):t instanceof HTMLElement?t:t=b(St,t,t.content);return new Promise(r=>{this.queue.push([o,r]),this.queue.length===1&&this.notifyNext()})}notifyNext(){let[t,o]=this.queue[0],r=()=>{this.queue.shift(),t.removeEventListener("close",r),o(),this.queue.length&&this.notifyNext()};this.shadowRoot?.append(t),t.open=!0,t.addEventListener("close",r)}};l(Zt,{tagName:"c-snackbar-container",augment:[p(`
:host {
	position:relative; width: 100%; height: 0;
	display: flex; text-align:center; align-items: end;
	overflow: visible;
}`)]});var ia;function $h(e){typeof e=="string"&&(e={content:e});let t=e.container;return t||(t=ia??=new Zt,document.body.appendChild(t)),t.notify(e)}function Zh(e){ia=e}function aa(e){return u(m(e,"selected").pipe(ii(e,"selected")),ue("selectable",e),L(e).tap(()=>$(e,"selectable.action",e)))}var ln=class extends x{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};l(ln,{tagName:"c-option",init:[d("value"),_("view"),g("selected"),g("hidden"),g("focused")],augment:[C("option"),p(":host{display:contents} :host([hidden]){display:none;}"),dt,aa,e=>{let t;return u(m(e,"view").switchMap(o=>o?(t?.remove(),e.rendered=t=new o,t.appendChild(b("slot")),M(e).append(t),u(m(e,"selected").tap(r=>t?.toggleAttribute("selected",r)),m(e,"focused").tap(r=>t?.toggleAttribute("focused",r)))):(e.rendered=t=void 0,v)))}]});var cn=class extends x{};l(cn,{tagName:"c-page",augment:[Co,p(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${O("background")}
}`),y]});var pn=class extends x{value=1/0;color},sa={duration:2e3,iterations:1/0,easing:"cubic-bezier(0.4, 0, 0.6, 1)"};l(pn,{tagName:"c-progress",init:[d("value"),J("color","primary",".bar")],augment:[C("progressbar"),go("valuemax","1"),p(`
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
	`),e=>{let t,o,r=b("div",{className:"bar"}),n=b("div",{className:"bar"});return M(e).append(r,n),m(e,"value").tap(i=>{i!==1/0&&i>1?i=1:i<0&&(i=0),e.ariaValueNow=i===1/0?null:String(i),e.ariaBusy=String(i!==1),e.toggleAttribute("indeterminate",i===1/0),i===1/0?(t=ne({target:r,animation:{kf:{transform:["translateX(-100%) scaleX(0.3)","translateX(0%) scaleX(0.8)","translateX(100%) scaleX(0.3)"]},options:sa}}),o=ne({target:n,animation:{kf:{transform:["translate(-150%, -100%) scaleX(0.4)","translate(-50%, -100%) scaleX(0.6)","translate(100%, -100%) scaleX(0.4)"]},options:sa}})):(t?.cancel(),o?.cancel()),r.style.transform=i===1/0?"":"scaleX("+i+")"})},dt]});var fn=class extends x{value=1/0};l(fn,{tagName:"c-progress-circular",init:[Te("value")],augment:[C("progressbar"),go("valuemax","1"),p(`
:host {
	display: inline-block;
	width: 48px;
	height: 48px;
}
svg { width: 100%; height: 100% }
		`),e=>{let t=mt("svg",{viewBox:"0 0 100 100"}),o=mt("circle",{cx:"50%",cy:"50%",r:"45",style:"stroke:var(--cxl-color-secondary-container);fill:transparent;stroke-width:10%;stroke-dasharray:282.743px"}),r=mt("circle",{cx:"50%",cy:"50%",r:"45",style:"stroke:var(--cxl-color-primary);fill:transparent;transition:stroke-dashoffset var(--cxl-speed);stroke-width:10%;transform-origin:center;stroke-dasharray:282.743px"});return t.append(o,r),M(e).append(t),m(e,"value").switchMap(n=>{if(e.ariaValueNow=n===1/0?null:String(n),e.ariaBusy=String(n!==1),n!==1/0){let a=282.743-282.743*Math.max(0,Math.min(1,n));r.style.strokeDashoffset=`${a}px`,r.style.transform="rotate(-90deg)"}return n===1/0?u(zt({target:e,animation:"spin",options:{iterations:1/0,duration:2e3,easing:"linear"}}),zt({target:r,animation:{options:{duration:4e3,iterations:1/0,easing:"cubic-bezier(.35,0,.25,1)"},kf:((i,a)=>[{offset:0,strokeDashoffset:i,transform:"rotate(0)"},{offset:.125,strokeDashoffset:a,transform:"rotate(0)"},{offset:.12501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(72.5deg)"},{offset:.25,strokeDashoffset:i,transform:"rotateX(180deg) rotate(72.5deg)"},{offset:.2501,strokeDashoffset:i,transform:"rotate(270deg)"},{offset:.375,strokeDashoffset:a,transform:"rotate(270deg)"},{offset:.37501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(161.5deg)"},{offset:.5,strokeDashoffset:i,transform:"rotateX(180deg) rotate(161.5deg)"},{offset:.5001,strokeDashoffset:i,transform:"rotate(180deg)"},{offset:.625,strokeDashoffset:a,transform:"rotate(180deg)"},{offset:.62501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(251.5deg)"},{offset:.75,strokeDashoffset:i,transform:"rotateX(180deg) rotate(251.5deg)"},{offset:.7501,strokeDashoffset:i,transform:"rotate(90deg)"},{offset:.875,strokeDashoffset:a,transform:"rotate(90deg)"},{offset:.87501,strokeDashoffset:a,transform:"rotateX(180deg) rotate(341.5deg)"},{offset:1,strokeDashoffset:i,transform:"rotateX(180deg) rotate(341.5deg)"}])((282.743*(1-.05)).toString(),(282.743*(1-.8)).toString())}})):v})},dt]});var un=class extends x{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};l(un,{tagName:"c-r",init:[g("xl"),g("lg"),g("md"),g("sm"),g("xs")],augment:[p(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${z("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${z("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${z("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${z("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),y]});var Al=/([^&=]+)=?([^&]*)/g,Nl=/:([\w_$@]+)/g,Ml=/\/\((.*?)\)/g,Tl=/(\(\?)?:\w+/g,Dl=/\*\w+/g,Rl=/[-{}[\]+?.,\\^$|#\s]/g,Fl=/([^#]*)(?:#(.+))?/,yn="@@cxlRoute",ae={location:window.location,history:window.history};function Il(e){let t=[];return[new RegExp("^/?"+e.replace(Rl,"\\$&").replace(Ml,"\\/?(?:$1)?").replace(Tl,function(r,n){return t.push(r.substr(1)),n?r:"([^/?]*)"}).replace(Dl,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function la(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function dn(e,t){return t?e.replace(Nl,(o,r)=>t[r]||""):e}function Ll(e){let t={},o;for(;o=Al.exec(e);)t[o[1]]=decodeURIComponent(o[2]);return t}var mn=class{path;regex;parameters;constructor(t){this.path=t=la(t),[this.regex,this.parameters]=Il(t)}_extractQuery(t){let o=t.indexOf("?");return o===-1?{}:Ll(t.slice(o+1))}getArguments(t){let o=this.regex.exec(t),r=o&&o.slice(1);if(!r)return;let n=this._extractQuery(t);return r.forEach((i,a)=>{let c=a===r.length-1?i||"":i?decodeURIComponent(i):"";n[this.parameters[a]]=c}),n}test(t){return this.regex.test(t)}toString(){return this.path}},xn=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new mn(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let o=this.definition.render();o[yn]=this;for(let r in t)t[r]!==void 0&&(o[r]=t[r]);return o}},gn=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(o=>o.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(o=>o.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function zl(e){return e[yn]}function Ct(e){let t=Fl.exec(e);return{path:la(t?.[1]||""),hash:t?.[2]||""}}var Pl={getHref(e){return e=typeof e=="string"?Ct(e):e,`${ae.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ae.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let o=this.getHref(e);o!==`${location.pathname}${location.search}${location.hash}`&&ae.history.pushState({url:e},"",o)}},deserialize(){return{path:ae.location.search.slice(1),hash:ae.location.hash.slice(1)}}},Vl={getHref(e){return e=typeof e=="string"?Ct(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ae.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let o=this.getHref(e);o!==`${location.pathname}${location.search}${location.hash}`&&ae.history.pushState({url:e},"",o||"/")}},deserialize(){return{path:ae.location.pathname,hash:ae.location.hash.slice(1)}}},ca={getHref(e){return e=typeof e=="string"?Ct(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ca.getHref(e);ae.location.hash!==t&&(ae.location.hash=t)},deserialize(){return Ct(ae.location.hash.slice(1))}},Et={hash:ca,path:Vl,query:Pl},hn=class{callbackFn;state;routes=new gn;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let o=new xn(t);return this.routes.register(o),o}go(t){this.lastGo=t;let o=typeof t=="string"?Ct(t):t,r=o.path,n=this.state?.url;if(r!==n?.path){let i=this.routes.findRoute(r);if(!i)throw new Error(`Path: "${r}" not found`);let a=i.path?.getArguments(r);if(i.redirectTo)return this.go(dn(i.redirectTo,a));let c=this.execute(i,a);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:o,arguments:a,route:i,current:c,root:this.root})}else this.state&&o.hash!=n?.hash&&this.updateState({...this.state,url:o})}getPath(t,o){let r=this.routes.get(t),n=r&&r.path;return n&&dn(n.toString(),o)}isActiveUrl(t){let o=Ct(t);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(n=>{let i=n[yn],a=this.state?.arguments;if(i?.path?.test(o.path)&&(!o.hash||o.hash===r.hash)){if(a){let c=i.path.getArguments(o.path);for(let s in c)if(a[s]!=c[s])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,o){let r=this.instances[t],n;if(r)for(n in o){let i=o[n];i!==void 0&&(r[n]=i)}return r}executeRoute(t,o,r){let n=t.parent,i=n&&this.routes.get(n),a=t.id,c=i&&this.executeRoute(i,o,r),s=this.findRoute(a,o)||t.create(o);return c?s&&s.parentNode!==c&&c.appendChild(s):this.root=s,r[a]=s,s}discardOldRoutes(t){let o=this.instances;for(let r in o){let n=o[r];t[r]!==n&&(n.parentNode?.removeChild(n),delete o[r])}}execute(t,o){let r={},n=this.executeRoute(t,o||{},r);return this.discardOldRoutes(r),this.instances=r,n}},Pe=new Je,pa=new Je,q=new hn(()=>Pe.next());function Pb(e){return t=>{let o=typeof e=="string"?{path:e}:e;q.route({...o,render:()=>new t})}}function Vb(e=""){return t=>{let o=typeof e=="string"?{path:e}:e;q.route({...o,isDefault:!0,render:()=>new t})}}function Bb(e){return Pe.map(()=>q.isActiveUrl(e))}function Bl(e){let t=e;for(;t=t.parentElement;)if(t.scrollTop!==0)return t.scrollTo(0,0)}function Hl(e){let t;return Pe.tap(()=>{let{root:o}=q.getState();o.parentNode!==e?e.appendChild(o):t&&t!==o&&t.parentNode&&e.removeChild(t),t=o}).raf(()=>{let o=q.getState().url;o.hash?e.querySelector(`#${o.hash},a[name="${o.hash}"]`)?.scrollIntoView():e.parentElement&&history.state?.lastAction&&history.state?.lastAction!=="pop"&&Bl(e)})}function fa(e,t=Et.query){return u(B(()=>pa.next(t)),e.tap(()=>q.go(t.deserialize())),Pe.tap(()=>t.serialize(q.getState().url))).catchError(o=>{if(o?.name==="SecurityError")return v;throw o})}function Ol(){return Pe.switchMap(()=>{let e=q.getState(),t=[],o=e.current;do{let r=o.routeTitle;r&&t.unshift(r instanceof E?r:N(r))}while(o=o.parentNode);return P(...t)}).tap(e=>document.title=e.join(" - "))}function ua(){return ge(N(location.hash.slice(1)),h(window,"hashchange").map(()=>location.hash.slice(1)))}var Io;function Yl(){if(!Io){Io=new Tt(history.state);let e=history.pushState;history.pushState=function(...t){let o=e.apply(this,t);return history.state&&(history.state.lastAction="push"),Io.next(history.state),o}}return u(h(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),Io)}function da(){let e;return u(ua(),Yl()).map(()=>window.location).filter(t=>{let o=t.href!==e;return e=t.href,o})}function _l(e,t=Et.query,o){let r=typeof t=="string"?Et[t]:t,n=o||(r===Et.hash?ua():da());return u(Hl(e),fa(n,r),Ol())}function Hb(e=Et.query,t){return o=>_l(o,e,t)}var Ob=Pe.raf().map(()=>{let e=[],t=q.getState(),o=t.current;do o.routeTitle&&e.unshift({title:o.routeTitle,first:o===t.current,path:Xl(o)});while(o=o.parentNode);return e});function Xl(e){let t=zl(e);return t&&dn(t.path?.toString()||"",q.state?.arguments||{})}function Yb(e){return L(e).tap(t=>{t.preventDefault(),e.href!==void 0&&(e.external?location.assign(e.href):q.go(e.href))})}function Lo(e,t,o=t){return u(P(pa,it(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),L(t).tap(r=>{e.target||r.preventDefault()}),L(o).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):q.go(e.href))}))}function Ul(e,t){let o=document.createElement("div");return o.style.display="contents",o.routeTitle=t,o.appendChild(e.content.cloneNode(!0)),o}var bn=class extends x{strategy="query";get state(){return q.state}go(t){return q.go(t)}};l(bn,{tagName:"c-router",init:[d("strategy")],augment:[e=>{function t(o){let r=o.dataset;if(r.registered)return;r.registered="true";let n=r.title||void 0;q.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:o.hasAttribute("data-default"),redirectTo:r.redirectto,render:Ul.bind(null,o,n)})}return _e().switchMap(()=>{for(let o of Array.from(e.children))o instanceof HTMLTemplateElement&&t(o);return u(ao(e).tap(o=>{o.type==="added"&&o.value instanceof HTMLTemplateElement&&t(o.value)}),m(e,"strategy").switchMap(o=>{let r=Et[o];return fa(da(),r).catchError((n,i)=>(console.error(n),i))}))})}]});function wn(e,t=e){return u(jl(e,t).ignoreElements(),Pe.map(()=>e.href!==void 0&&q.isActiveUrl(e.href)))}function jl(e,t=e){let o=b("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return o.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,M(e).append(o),u(Lo(e,o),h(o,"click").tap(r=>{r.stopPropagation(),Rt(r)||e.dispatchEvent(new PointerEvent(r.type,r)),$(e,"toggle.close",void 0)}),L(t).tap(r=>{Rt(r)&&o.click()}))}var vn=class extends x{href};l(vn,{tagName:"c-router-selectable",init:[d("href")],augment:[W,()=>b("slot"),e=>Y(()=>{let t=e.parentElement;return wn(e,t).raf(o=>{t.selected=o})})]});var kn=class extends $t{href;external=!1;target};l(kn,{tagName:"c-router-item",init:[d("href"),d("external"),d("target")],augment:[e=>wn(e).tap(t=>{e.selected=t})]});var Qt=class extends x{href;focusable=!1;external=!1;dismiss=!1;target};l(Qt,{tagName:"c-router-link",init:[d("href"),d("focusable"),d("external"),d("target"),d("dismiss")],augment:[p(`
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
	`),e=>{let t=b("a",{className:"link"},b("slot"));return M(e).append(t),u(m(e,"focusable").tap(o=>t.tabIndex=o?0:-1),Ze(e),Lo(e,t))}]});var Sn=class extends Qt{focusable=!0};l(Sn,{tagName:"c-router-a",augment:[p(`
:host{text-decoration:underline;}
.link { display:inline-block; }
:host(:focus-within) .link { outline:var(--cxl-color-primary) auto 1px; }
`)]});function ql(e){function t(){R=a[w],o(),Nt=!1}function o(){V=Math.min(Math.round(D*Ve),T),ce=(D-Math.floor(R/Ve))/(V-R||1),(!isFinite(ce)||ce<=0)&&(ce=.01)}function r(xe){throw console.error(`Faulty element detected: 
The provided element has an invalid or unmeasurable size. Check that the "${w}" of the element is not zero or negative. Make sure the element is styled properly and any necessary dimensions are set correctly before rendering.`),console.log(xe),new Error("Rendered element size returned invalid value.")}function n(){Nt&&t();let xe=Po=a[S],Vn=ce*xe;At=Vn|0;let Vo=Math.max(Math.min(At,D-I+1),0),Bn=At+I>D?1/0:R,Hn=Vn-At,Be=Vo,to=0,On=0,He=0,Yn=0,Mt=0;for(I=0,Vo>0?He=-(c(Be-1,to++,"pre")[w]+Hn*Ve):He=-Hn*Ve;Be>=0&&On<Bn&&Be<D;){let Ae=c(Be++,to++,"on"),Bo=Ae[w];Bo<=0&&r(Ae),I===0&&(Yn=Ae[k]),Mt=Ae[k]+Bo,On=Mt+He,I++}if(Be<D&&Bn&&c(Be,to++,"post"),f?.(to),I>0){let Ae=(Mt-Yn)/I;Ae!==Ve&&(Ve=Ve*.75+Ae*.25)}return I>1&&At+I>=D&&(He=R-Mt,He>0&&(He=0)),Pn?(t(),Pn=!1):xe+Mt>V&&o(),{start:Vo,end:Be,totalSize:V,count:I,offset:He}}let{axis:i,scrollElement:a,render:c,refresh:s,remove:f}=e,w=i==="x"?"offsetWidth":"offsetHeight",k=i==="x"?"offsetLeft":"offsetTop",S=i==="x"?"scrollLeft":"scrollTop",T=5e6,D=e.dataLength,I=0,R=0,V=0,ce=0,Ve=50,At=0,Pn=!0,Nt=!0,Po=NaN,ga=h(a,"scroll",{passive:!0});return u(s?.tap(xe=>{xe?.dataLength!==void 0&&(D=xe.dataLength,Nt=!0),Po=NaN})??v,po(a).switchMap(xe=>xe?u(K(a).tap(()=>Nt=!0),ga).raf():v)).filter(()=>Nt||Po!==a[S]).map(n)}function fy(e){let{axis:t,host:o,translate:r=!0}=e,n=e.scrollElement||o.parentElement;if(!n)throw"scrollElement option could not be resolved.";let i=document.createElement("div"),a=t==="x"?"width":"height";i.style.position="absolute",i.style.width=i.style.height="1px",i.style.top=i.style.left="0",(e.scrollContainer??n).appendChild(i),o.style.position="sticky",o.style.top=o.style.left="0",r&&(o.style.translate="0 0");let c=0,s=!1;return ql({...e,scrollElement:n}).tap(({totalSize:f,offset:w})=>{if(r)if(w!==0){let k=w|0;o.style.translate=t==="x"?`${k}px 0`:`0 ${k}px`,s=!0}else s&&(o.style.translate="0 0",s=!1);c!==f&&(i.style[a]=`${f}px`,c=f)}).finalize(()=>i.remove())}var Jt=class extends x{type;center=!1;full=!1};l(Jt,{tagName:"c-layout",init:[g("type"),g("center"),g("full")],augment:[p(`
.div {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
  column-gap: 0;
}
:host([type=grid]) .div { display: grid; }
:host([type="two-column-left"]) .div,
:host([type="two-column-right"]) .div,
:host([type="two-column"]) .div {
  row-gap: 32px;
}

${z("small",`
  .div {
    column-gap: 32px;
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  :host([type="two-column-left"]) .div {
    grid-template-columns: 2fr 1fr;
    column-gap: 64px;
    row-gap: 32px;
  }

  :host([type="two-column-right"]) .div {
    grid-template-columns: 1fr 2fr;
    column-gap: 64px;
    row-gap: 32px;
  }
  :host([type="two-column"]) .div {
    grid-template-columns: 1fr 1fr;
    column-gap: 48px;
    row-gap: 32px;
  }

  :host([type="three-column"]) .div {
    grid-template-columns: 1fr 2fr 1fr;
    column-gap: 48px;
    row-gap: 32px;
  }
`)}
${z("large",`
  .div {
    width: 100%;
    max-width: 1200px;
  }

  :host([center]) .div {
    margin-left: auto;
    margin-right: auto;
  }
`)}
:host { display:block }
:host([type=block]) .div { display: block }
:host([full]) .div { width:auto;max-width:none }
`),()=>b("div",{className:"div"},b("slot"))]});var En=class extends Jt{dense=!1;color;center=!0;type="block"};l(En,{tagName:"c-section",init:[g("dense"),J("color")],augment:[p(`
:host { padding: 96px 16px; }
:host([dense]) { padding-top: 48px;padding-bottom:48px; }
${z("medium",":host {padding-left:32px;padding-right:32px}")}
${z("large",":host {padding-left:64px;padding-right:64px}")}
	`)]});var ma=class e extends ie{value="on";checked=!1;defaultChecked=!1;static{l(e,{tagName:"c-switch",init:[d("value"),g("checked")],augment:[C("switch"),ke,p(`
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
${we(".mask")}
:host([checked]) .mask { translate: 20px 0; }
		`),t=>{t.defaultChecked=t.checked},X,()=>b("div",{className:"knob"}),()=>b("div",{className:"mask"}),Mr]})}formResetCallback(){this.checked=this.defaultChecked,this.touched=!1}setFormValue(t){G(this).setFormValue?.(this.checked?t:null)}};var Cn=class extends x{font};l(Cn,{tagName:"c-t",init:[g("font")],augment:[p(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${ui.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${A("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${A("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${A("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${A("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${A("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${A("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),y,e=>m(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var An=class extends x{selected;tabs=new Set;variant};l(An,{tagName:"c-tabs",init:[_("selected"),g("variant")],augment:[C("tablist"),p(`
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
		`),y,e=>{function t(o=1){let r=Array.from(e.tabs),n=e.selected||r[0],i=r.indexOf(n);return i===-1?null:r[i+o]||null}return Ee({host:e,goRight:t.bind(null,1),goLeft:t.bind(null,-1),goFirst:()=>Array.from(e.tabs)[0]||null,goLast:()=>Array.from(e.tabs)[e.tabs.size-1]||null}).tap(o=>{o&&(o.click(),o.focus?.())})},e=>{let t=new oe;return M(e).append(b(ye,{className:"selected",$:o=>u(Re(),m(e,"selected"),m(e,"variant"),t,K(e)).raf(()=>{if(be(e))return;let r=e.selected;if(!r)return o.style.transform="scaleX(0)";let n=r.offsetLeft;if(e.variant==="secondary"){let i=r.clientWidth/100;o.style.transform=`translate(${n}px, 0) scaleX(${i})`,o.style.display="block"}else{let i=document.createRange();i.selectNodeContents(r);let{width:a}=i.getBoundingClientRect(),c=n+(r.clientWidth-a)/2,s=a/100;o.style.transform=`translate(${c}px, 0) scaleX(${s})`,o.style.display="block"}e.scrollWidth!==r.clientWidth&&(e.scrollLeft=n-32)})})),ut("tabs",e,e.tabs).raf().switchMap(o=>{let r=[];for(let n of o.elements)r.push(m(n,"selected").tap(i=>{i?(e.selected&&e.selected!==n&&(e.selected.selected=!1),e.selected=n):e.selected===n&&(e.selected=void 0),n.tabIndex=i?0:-1}),K(n).tap(()=>t.next()));return u(...r)})}]});var zo=class extends x{selected=!1;touched=!1;disabled=!1;name};l(zo,{init:[g("touched"),g("selected"),g("disabled"),d("name")],augment:[C("tab"),ke,e=>ue("tabs",e),e=>m(e,"name").switchMap(t=>t?L(e).tap(()=>e.selected=!0):v),e=>m(e,"selected").tap(t=>{e.setAttribute("aria-selected",t?"true":"false")})]});var Nn=class extends zo{};l(Nn,{tagName:"c-tab",augment:[p(`
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
${z("small",":host { flex-grow: 0 }")}
		`),ee,X,lt,y]});var Mn=class extends x{};l(Mn,{tagName:"c-table",augment:[C("table"),p(`
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
		`),y]});var Tn=class extends x{};l(Tn,{tagName:"c-tbody",augment:[C("rowgroup"),p(":host{display:table-row-group}"),y]});var Dn=class extends x{};l(Dn,{tagName:"c-td",augment:[C("cell"),p(`
:host {
	box-sizing: border-box;
	display: table-cell;
	padding: 0 16px;
	height: 51px;
	vertical-align: middle;
	border-bottom: 1px solid var(--cxl-color-outline);
}
		`),y]});var Rn=class extends x{};l(Rn,{tagName:"c-th",augment:[C("columnheader"),p(`
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
}`),y]});var Fn=class extends le{value="";inputEl=document.createElement("textarea")};l(Fn,{tagName:"c-textarea",init:[d("value")],augment:[y,e=>e.append(e.inputEl),e=>me({host:e,input:e.inputEl}),X,e=>{let t=new CSSStyleSheet;return t.replaceSync(":host{flex-grow:1;position:relative;}"),e.shadowRoot?.adoptedStyleSheets.push(t),u(m(e,"value"),K(e.inputEl),Re()).raf(()=>{let o=e.inputEl.style;o.height="0";let r=e.inputEl.scrollHeight;t.replaceSync(`:host{flex-grow:1;position:relative;height:${r}px}`),o.height="100%"})}]});function xa({element:e,relativeTo:t,position:o,container:r}){if(o==="none")return;if(r||=Z.currentPopupContainer||Z.popupContainer||document.body,e.parentNode||r.appendChild(e),typeof o=="function")return o(e);let n=t.getBoundingClientRect(),i=e.style,a=Math.max(r.offsetWidth-e.offsetWidth-16,16),c=Math.max(r.offsetHeight-e.offsetHeight-16,16);i.left=i.top=i.width=i.transformOrigin="";let s=()=>getComputedStyle(e).direction==="rtl",f=0,w=0,k;(o==="auto"||!o)&&(o="center bottom");for(let S of o.split(" "))if(S==="right"||S==="end"&&!s()||S==="start"&&s())f=n.right;else if(S==="left-to-right"||S==="start-to-end"&&!s())f=n.left;else if(S==="left"||S==="end"&&s()||S==="start"&&!s())f=n.left-e.offsetWidth;else if(S==="center")f=n.left+n.width/2-e.offsetWidth/2;else if(S==="right-to-left"||S==="end-to-start"&&s())f=n.right-e.offsetWidth;else if(S==="bottom")w=n.bottom;else if(S==="top")w=n.top-e.offsetHeight;else if(S==="middle")w=n.top+n.height/2-e.offsetHeight/2;else if(S==="fill")f=n.left,k=n.width;else if(S==="top-to-bottom")w=n.top;else if(S==="bottom-to-top")w=n.bottom-e.offsetHeight;else throw new Error(`Invalid position "${S}"`);f<16?f=16:f>a&&(f=a),w<16?w=16:w>c&&(w=c),i.left=`${f}px`,i.top=`${w}px`,k&&(i.minWidth=`${k}px`)}function Wl(e){let t=u(F(e,"position"),h(window,"scroll",{capture:!0,passive:!0})),o=r=>xa({element:r,relativeTo:(typeof e.relative=="string"?Se(e,e.relative):e.relative)??e.firstElementChild??e,position:e.position||"auto",container:document.body});return Ut(e).switchMap(({target:r,open:n})=>{if(r.open&&n&&(r.open=!1),r.trigger!==e)return v;if(r.open=n,n){let i=r.dialog??r,a=e.firstElementChild;return r.dialog&&(i.style.margin="0"),o(i),u(K(i),t).raf(()=>{a&&be(a)?e.open=!1:o(i)})}return v})}var In=class extends x{open=!1;target;position;relative;trigger};l(In,{tagName:"c-toggle-popup",init:[g("open"),d("target"),d("position"),d("relative"),d("trigger")],augment:[Wl,y,p(":host{display:contents}")]});var eo=class extends Kt{};l(eo,{tagName:"c-toolbar",augment:[p(`
:host {
	grid-column-end: span 12;
	column-gap: 24px;
	row-gap: 8px;
	align-items: center;
	min-height: 48px;
	flex-wrap: wrap;
	flex-shrink: 0;
}
${z("small",":host{column-gap:24px}")}
		`)]});var Ln=class extends eo{};l(Ln,{tagName:"c-toolbar-floating",augment:[p(`
:host {
	background-color: var(--cxl-color-surface-container);
	color: var(--cxl-color-on-surface-variant);
	border-radius: var(--cxl-shape-corner-full);
	padding: 8px 24px;
	height: 64px;
	${xi(3)}
}
		`)]});var zn=class extends x{color};l(zn,{tagName:"c-tr",init:[J("color")],augment:[C("row"),p(":host{display:table-row;height:53px;}"),y]});export{Lt as Alert,Zo as Appbar,Ri as AppbarContextual,Qo as AppbarLayout,nr as Application,mc as Augment,qi as Autocomplete,vr as Avatar,Tt as BehaviorSubject,qo as Bindings,bt as Block,wr as Body,fe as Button,pt as ButtonBase,Pt as ButtonRound,kr as ButtonText,_t as C,Xt as Card,Nr as CardItem,Wi as Checkbox,Tr as Chip,vi as ColorStyles,x as Component,cs as ContentManager,Dr as Date,Vb as DefaultRoute,Rr as Dialog,vt as DialogBase,$e as DialogBasic,Lr as Dismiss,Ji as DragHandle,Vr as Drawer,Br as Dropdown,v as EMPTY,Ho as EmptyError,ur as Field,Hr as FieldBar,Ce as FieldBase,Bt as FieldHelp,Or as FieldOutlined,Kt as Flex,oa as Form,Yr as FormSubmit,_r as Grid,jr as GridList,ca as HashStrategy,qr as Hr,We as Icon,se as IconButton,Gr as IconToggleTheme,$r as Iframe,ie as Input,Zr as InputClear,Qr as InputFile,en as InputNumber,Jr as InputNumberBase,To as InputOption,ra as InputPassword,tn as InputPlaceholder,hr as InputText,le as InputTextBase,Cr as Item,yt as ItemBase,on as Label,rn as List,hn as MainRouter,nn as Menu,rr as Meta,an as NavHeadline,$t as NavItem,sn as NavbarToggle,E as Observable,ln as Option,oo as OrderedSubject,wi as OutlineColorStyles,cn as Page,Vl as PathStrategy,Gt as Popup,pn as Progress,fn as ProgressCircular,Pl as QueryStrategy,un as R,Je as Reference,ro as ReplaySubject,ko as Ripple,xn as RouteBase,gn as RouteManager,Sn as RouterA,bn as RouterComponent,kn as RouterItem,Qt as RouterLink,vn as RouterSelectable,En as Section,mr as Select,xt as SelectOption,Ne as Signal,Go as SizeValues,y as Slot,St as Snackbar,Zt as SnackbarContainer,ye as Span,Et as Strategies,oe as Subject,ha as Subscriber,Nc as SurfaceColorNames,ma as Switch,Cn as T,Nn as Tab,zo as TabBase,Mn as Table,An as Tabs,Tn as Tbody,Dn as Td,Fn as TextArea,Rn as Th,Ir as Toggle,wt as ToggleBase,Wt as TogglePanel,In as TogglePopup,Pr as ToggleTarget,ze as ToggleTargetBase,eo as Toolbar,Ln as ToolbarFloating,zn as Tr,ui as TypographyValues,Ni as activeRipple,cm as alert,cc as animated,Fi as applyMeta,Qa as applyTheme,go as aria,vc as ariaChecked,kc as ariaControls,wc as ariaDescribed,ve as ariaId,ai as ariaLabel,ii as ariaValue,d as attribute,F as attributeChanged,xc as augment,Us as avatarBaseStyles,te as be,Lo as bindHref,j as bindings,yo as breakpoint,pr as buildGo,Sr as buildGridCss,Ga as buildIconFactoryCdn,Ur as buildListGo,we as buildMask,bo as buildMenuStyles,qe as buttonBaseStyles,ke as buttonBehavior,er as buttonKeyboardBehavior,os as buttonStyles,js as cardStyles,Ma as catchError,dt as changeEvent,Mr as checkedBehavior,J as colorAttribute,Mc as colorMix,P as combineLatest,l as component,ge as concat,hm as confirm,U as content,b as create,p as css,hi as cssAttribute,xo as cssSymbol,$l as debounceFunction,ic as debounceImmediate,za as debounceRaf,ka as debounceTime,Eo as defaultFormatDate,So as defaultLocale,gi as defaultThemes,Y as defer,Tc as delayTheme,Do as dialog,Fr as dialogStyles,Jo as disabledAttribute,X as disabledStyles,W as displayContents,Ta as distinctUntilChanged,pl as drawerStyles,ta as each,bx as eachBehavior,xi as elevation,nc as empty,ls as englishLocale,ei as event,Ea as exhaustMap,_a as expression,dr as fieldBaseStyles,Ps as fieldBehavior,zs as fieldLayout,Ht as fieldLayoutStyles,Is as fieldStyles,wl as fileUploadBehavior,io as filter,Ia as finalize,ml as findForm,Na as first,Gl as firstValueFrom,Fe as focusable,es as focusableDisabled,ts as focusableEvents,Pa as focused,A as font,Fp as formatDate,et as from,Un as fromArray,no as fromAsync,ba as fromGenerator,jn as fromPromise,m as get,pc as getActiveElement,at as getAriaId,ri as getAttribute,Ip as getDayText,zl as getElementRoute,Rp as getFormattedDate,cr as getHostActive,wo as getIcon,Dp as getLocale,gc as getRegisteredComponents,pe as getRoot,Xs as getSearchRegex,M as getShadow,No as getTarget,Se as getTargetById,Ki as getTargets,xl as gridColumns,hl as gridNavigation,Er as growAndFillStyles,Ds as handleListArrowKeys,Xo as hovered,Uo as hoveredOrFocused,La as ignoreElements,_l as initializeRouter,Ls as inputContainer,Yt as inputTextBase,br as inputTextStyles,G as internals,Zl as interval,sc as isFocusable,be as isHidden,Rt as isKeyboardClick,Li as isPageReady,Ws as itemBehavior,Ar as itemButtonBehavior,gl as itemHost,qs as itemStyles,Yb as linkBehavior,yi as loadTheme,Wa as loadThemeDefinition,lr as manageFocus,Xr as manageFocusList,Oo as map,lt as maskStyles,z as media,u as merge,Sa as mergeMap,$ as message,Co as metaBehavior,jt as motion,Cl as navItemComponent,Ee as navigation,kf as navigationItems,Fo as navigationList,De as newStylesheet,lc as nodeSort,la as normalize,$h as notify,Te as numberAttribute,B as observable,ac as observeChildren,Ka as observeTheme,N as of,h as on,L as onAction,so as onAttributeMutation,ao as onChildrenMutation,_o as onEvent,Re as onFontsReady,ua as onHashChange,Yl as onHistoryChange,co as onIntersection,lo as onKeyAction,fo as onKeypress,_e as onLoad,da as onLocation,Q as onMessage,Yo as onMutation,Ii as onPageReady,Gn as onReady,K as onResize,It as onThemeChange,it as onUpdate,po as onVisibility,rt as onVisible,he as operator,tt as operatorNext,Xn as operators,Rs as overrideFocusMethod,$s as parseAnimation,Zs as parseMotion,Ll as parseQueryParameters,Ct as parseUrl,Kl as pipe,ti as placeholder,El as popupBehavior,Sl as popupStyles,Wl as popupToggleBehavior,Bs as positionUnder,_s as prefixMatcher,_ as property,Fa as publishLast,Kn as raf,va as reduce,Dt as ref,Dc as registerDefaultIconFactory,Rc as registerIcon,ft as registerText,mo as renderChildren,hx as renderEach,dn as replaceParameters,ee as ripple,C as role,Pb as route,Bb as routeIsActive,Ob as routeTitles,q as router,Hb as routerHost,jl as routerLink,Hl as routerOutlet,wn as routerSelectable,Pe as routerState,fa as routerStrategy,ct as scrollbarStyles,xr as selectBehavior,Hs as selectComponent,Vs as selectInputStyles,ji as selectMenuStyles,Ft as setAttribute,Ol as setDocumentTitle,Zh as setSnackbarContainer,Ra as share,Da as shareLatest,Ql as shareReplay,re as sizeAttribute,ia as snackbarContainer,af as sortBy,je as spacingValues,ir as storage,pa as strategy$,g as styleAttribute,vo as stylesheet,tc as subject,yr as substringMatcher,O as surface,Wn as switchMap,ae as sys,Ca as take,Aa as takeWhile,ot as tap,H as theme,ho as themeName,Za as themeReady,wa as throttleTime,ec as throwError,Ye as timer,ya as toPromise,Ks as toggleBehavior,Ze as toggleClose,Ut as toggleComponent,tm as toggleOpen,Qe as toggleTargetBehavior,kt as toggleTargetStyles,Me as trigger,Ue as tsx,Ts as updateEvent,fy as virtualScroll,ql as virtualScrollRender,Jl as zip};
