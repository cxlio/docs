var li=Object.create;var wn=Object.defineProperty;var ui=Object.getOwnPropertyDescriptor;var pi=Object.getOwnPropertyNames;var fi=Object.getPrototypeOf,di=Object.prototype.hasOwnProperty;var mi=(e,t)=>()=>(e&&(t=e(e=0)),t);var hi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),gi=(e,t)=>{for(var n in t)wn(e,n,{get:t[n],enumerable:!0})},xi=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of pi(t))!di.call(e,o)&&o!==n&&wn(e,o,{get:()=>t[o],enumerable:!(r=ui(t,o))||r.enumerable});return e};var bi=(e,t,n)=>(n=e!=null?li(fi(e)):{},xi(t||!e||!e.__esModule?wn(n,"default",{value:e,enumerable:!0}):n,e));var Wr={};gi(Wr,{default:()=>Ki,theme:()=>Vr});var Zi,Vr,Ki,Yr=mi(()=>{"use strict";Zi={primary:"#8ECFF2","on-primary":"#003548","primary-container":"#004D67","on-primary-container":"#C1E8FF",secondary:"#B5C9D7","on-secondary":"#1F333D","secondary-container":"#364954","on-secondary-container":"#D1E6F3",tertiary:"#C9C2EA","on-tertiary":"#312C4C","tertiary-container":"#474364","on-tertiary-container":"#E5DEFF",error:"#FFB4AB","on-error":"#690005","error-container":"#93000A","on-error-container":"#FFDAD6",background:"#0F1417","on-background":"#DFE3E7",surface:"#0F1417","on-surface":"#DFE3E7","surface-variant":"#40484D","on-surface-variant":"#C0C7CD",outline:"#8A9297","outline-variant":"#40484D",shadow:"#000000",scrim:"#000000","inverse-surface":"#DFE3E7","on-inverse-surface":"#2C3134","inverse-primary":"#186584","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#0F1417","surface-bright":"#353A3D","surface-container-lowest":"#0A0F12","surface-container-low":"#171C1F","surface-container":"#1B2023","surface-container-high":"#262B2E","surface-container-highest":"#313539",warning:"#FFC107","on-warning":"#212121","warning-container":"#4E3400","on-warning-container":"#FFF3CF",success:"#81C784","on-success":"#000","success-container":"#2E7D32","on-success-container":"#fff"},Vr={name:"dark",colors:Zi},Ki=Vr});var Jo=hi((Mp,qo)=>{"use strict";function Po(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let n=e[t],r=typeof n;(r==="object"||r==="function")&&!Object.isFrozen(n)&&Po(n)}),e}var pn=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Lo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Ae(e,...t){let n=Object.create(null);for(let r in e)n[r]=e[r];return t.forEach(function(r){for(let o in r)n[o]=r[o]}),n}var Js="</span>",Ro=e=>!!e.scope,Qs=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,o)=>`${r}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`},cr=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Lo(t)}openNode(t){if(!Ro(t))return;let n=Qs(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Ro(t)&&(this.buffer+=Js)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Oo=(e={})=>{let t={children:[]};return Object.assign(t,e),t},lr=class e{constructor(){this.rootNode=Oo(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=Oo({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{e._collapse(n)}))}},ur=class extends lr{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){let r=t.root;n&&(r.scope=`language:${n}`),this.add(r)}toHTML(){return new cr(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Mt(e){return e?typeof e=="string"?e:e.source:null}function Bo(e){return je("(?=",e,")")}function Zs(e){return je("(?:",e,")*")}function Ks(e){return je("(?:",e,")?")}function je(...e){return e.map(n=>Mt(n)).join("")}function ea(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function fr(...e){return"("+(ea(e).capture?"":"?:")+e.map(r=>Mt(r)).join("|")+")"}function zo(e){return new RegExp(e.toString()+"|").exec("").length-1}function ta(e,t){let n=e&&e.exec(t);return n&&n.index===0}var na=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function dr(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;let o=n,a=Mt(r),i="";for(;a.length>0;){let s=na.exec(a);if(!s){i+=a;break}i+=a.substring(0,s.index),a=a.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+o):(i+=s[0],s[0]==="("&&n++)}return i}).map(r=>`(${r})`).join(t)}var ra=/\b\B/,jo="[a-zA-Z]\\w*",mr="[a-zA-Z_]\\w*",Ho="\\b\\d+(\\.\\d+)?",Uo="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Go="\\b(0b[01]+)",oa="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ia=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=je(t,/.*\b/,e.binary,/\b.*/)),Ae({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},Nt={begin:"\\\\[\\s\\S]",relevance:0},sa={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Nt]},aa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Nt]},ca={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},dn=function(e,t,n={}){let r=Ae({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let o=fr("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:je(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},la=dn("//","$"),ua=dn("/\\*","\\*/"),pa=dn("#","$"),fa={scope:"number",begin:Ho,relevance:0},da={scope:"number",begin:Uo,relevance:0},ma={scope:"number",begin:Go,relevance:0},ha={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Nt,{begin:/\[/,end:/\]/,relevance:0,contains:[Nt]}]},ga={scope:"title",begin:jo,relevance:0},xa={scope:"title",begin:mr,relevance:0},ba={begin:"\\.\\s*"+mr,relevance:0},ya=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},un=Object.freeze({__proto__:null,APOS_STRING_MODE:sa,BACKSLASH_ESCAPE:Nt,BINARY_NUMBER_MODE:ma,BINARY_NUMBER_RE:Go,COMMENT:dn,C_BLOCK_COMMENT_MODE:ua,C_LINE_COMMENT_MODE:la,C_NUMBER_MODE:da,C_NUMBER_RE:Uo,END_SAME_AS_BEGIN:ya,HASH_COMMENT_MODE:pa,IDENT_RE:jo,MATCH_NOTHING_RE:ra,METHOD_GUARD:ba,NUMBER_MODE:fa,NUMBER_RE:Ho,PHRASAL_WORDS_MODE:ca,QUOTE_STRING_MODE:aa,REGEXP_MODE:ha,RE_STARTERS_RE:oa,SHEBANG:ia,TITLE_MODE:ga,UNDERSCORE_IDENT_RE:mr,UNDERSCORE_TITLE_MODE:xa});function wa(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function va(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Ea(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=wa,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Sa(e,t){Array.isArray(e.illegal)&&(e.illegal=fr(...e.illegal))}function ka(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Ca(e,t){e.relevance===void 0&&(e.relevance=1)}var Aa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=je(n.beforeMatch,Bo(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ma=["of","and","for","in","not","or","if","then","parent","list","value"],Na="keyword";function Vo(e,t,n=Na){let r=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(a){Object.assign(r,Vo(e[a],t,a))}),r;function o(a,i){t&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){let c=s.split("|");r[c[0]]=[a,Ta(c[0],c[1])]})}}function Ta(e,t){return t?Number(t):_a(e)?0:1}function _a(e){return Ma.includes(e.toLowerCase())}var Do={},ze=e=>{console.error(e)},Io=(e,...t)=>{console.log(`WARN: ${e}`,...t)},nt=(e,t)=>{Do[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Do[`${e}/${t}`]=!0)},fn=new Error;function Wo(e,t,{key:n}){let r=0,o=e[n],a={},i={};for(let s=1;s<=t.length;s++)i[s+r]=o[s],a[s+r]=!0,r+=zo(t[s-1]);e[n]=i,e[n]._emit=a,e[n]._multi=!0}function Ra(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ze("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),fn;if(typeof e.beginScope!="object"||e.beginScope===null)throw ze("beginScope must be object"),fn;Wo(e,e.begin,{key:"beginScope"}),e.begin=dr(e.begin,{joinWith:""})}}function Oa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ze("skip, excludeEnd, returnEnd not compatible with endScope: {}"),fn;if(typeof e.endScope!="object"||e.endScope===null)throw ze("endScope must be object"),fn;Wo(e,e.end,{key:"endScope"}),e.end=dr(e.end,{joinWith:""})}}function Da(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ia(e){Da(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Ra(e),Oa(e)}function $a(e){function t(i,s){return new RegExp(Mt(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=zo(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let s=this.regexes.map(c=>c[1]);this.matcherRe=t(dr(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(s);if(!c)return null;let f=c.findIndex((S,te)=>te>0&&S!==void 0),T=this.matchIndexes[f];return c.splice(0,f),Object.assign(c,T)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];let c=new n;return this.rules.slice(s).forEach(([f,T])=>c.addRule(f,T)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let f=c.exec(s);if(this.resumingScanAtSamePosition()&&!(f&&f.index===this.lastIndex)){let T=this.getMatcher(0);T.lastIndex=this.lastIndex+1,f=T.exec(s)}return f&&(this.regexIndex+=f.position+1,this.regexIndex===this.count&&this.considerAll()),f}}function o(i){let s=new r;return i.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function a(i,s){let c=i;if(i.isCompiled)return c;[va,ka,Ia,Aa].forEach(T=>T(i,s)),e.compilerExtensions.forEach(T=>T(i,s)),i.__beforeBegin=null,[Ea,Sa,Ca].forEach(T=>T(i,s)),i.isCompiled=!0;let f=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),f=i.keywords.$pattern,delete i.keywords.$pattern),f=f||/\w+/,i.keywords&&(i.keywords=Vo(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(f,!0),s&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Mt(c.end)||"",i.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(T){return Fa(T==="self"?i:T)})),i.contains.forEach(function(T){a(T,c)}),i.starts&&a(i.starts,s),c.matcher=o(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Ae(e.classNameAliases||{}),a(e)}function Yo(e){return e?e.endsWithParent||Yo(e.starts):!1}function Fa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Ae(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Yo(e)?Ae(e,{starts:e.starts?Ae(e.starts):null}):Object.isFrozen(e)?Ae(e):e}var Pa="11.11.1",pr=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},ar=Lo,$o=Ae,Fo=Symbol("nomatch"),La=7,Xo=function(e){let t=Object.create(null),n=Object.create(null),r=[],o=!0,a="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:ur};function c(l){return s.noHighlightRe.test(l)}function f(l){let p=l.className+" ";p+=l.parentNode?l.parentNode.className:"";let g=s.languageDetectRe.exec(p);if(g){let M=re(g[1]);return M||(Io(a.replace("{}",g[1])),Io("Falling back to no-highlight mode for this block.",l)),M?g[1]:"no-highlight"}return p.split(/\s+/).find(M=>c(M)||re(M))}function T(l,p,g){let M="",P="";typeof p=="object"?(M=l,g=p.ignoreIllegals,P=p.language):(nt("10.7.0","highlight(lang, code, ...args) has been deprecated."),nt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=l,M=p),g===void 0&&(g=!0);let ne={code:M,language:P};m("before:highlight",ne);let ge=ne.result?ne.result:S(ne.language,ne.code,g);return ge.code=ne.code,m("after:highlight",ge),ge}function S(l,p,g,M){let P=Object.create(null);function ne(d,w){return d.keywords[w]}function ge(){if(!A.keywords){U.addText($);return}let d=0;A.keywordPatternRe.lastIndex=0;let w=A.keywordPatternRe.exec($),N="";for(;w;){N+=$.substring(d,w.index);let D=ie.case_insensitive?w[0].toLowerCase():w[0],V=ne(A,D);if(V){let[le,ai]=V;if(U.addText(N),N="",P[D]=(P[D]||0)+1,P[D]<=La&&(zt+=ai),le.startsWith("_"))N+=w[0];else{let ci=ie.classNameAliases[le]||le;oe(w[0],ci)}}else N+=w[0];d=A.keywordPatternRe.lastIndex,w=A.keywordPatternRe.exec($)}N+=$.substring(d),U.addText(N)}function Lt(){if($==="")return;let d=null;if(typeof A.subLanguage=="string"){if(!t[A.subLanguage]){U.addText($);return}d=S(A.subLanguage,$,!0,Sr[A.subLanguage]),Sr[A.subLanguage]=d._top}else d=B($,A.subLanguage.length?A.subLanguage:null);A.relevance>0&&(zt+=d.relevance),U.__addSublanguage(d._emitter,d.language)}function Z(){A.subLanguage!=null?Lt():ge(),$=""}function oe(d,w){d!==""&&(U.startScope(w),U.addText(d),U.endScope())}function yr(d,w){let N=1,D=w.length-1;for(;N<=D;){if(!d._emit[N]){N++;continue}let V=ie.classNameAliases[d[N]]||d[N],le=w[N];V?oe(le,V):($=le,ge(),$=""),N++}}function wr(d,w){return d.scope&&typeof d.scope=="string"&&U.openNode(ie.classNameAliases[d.scope]||d.scope),d.beginScope&&(d.beginScope._wrap?(oe($,ie.classNameAliases[d.beginScope._wrap]||d.beginScope._wrap),$=""):d.beginScope._multi&&(yr(d.beginScope,w),$="")),A=Object.create(d,{parent:{value:A}}),A}function vr(d,w,N){let D=ta(d.endRe,N);if(D){if(d["on:end"]){let V=new pn(d);d["on:end"](w,V),V.isMatchIgnored&&(D=!1)}if(D){for(;d.endsParent&&d.parent;)d=d.parent;return d}}if(d.endsWithParent)return vr(d.parent,w,N)}function ni(d){return A.matcher.regexIndex===0?($+=d[0],1):(yn=!0,0)}function ri(d){let w=d[0],N=d.rule,D=new pn(N),V=[N.__beforeBegin,N["on:begin"]];for(let le of V)if(le&&(le(d,D),D.isMatchIgnored))return ni(w);return N.skip?$+=w:(N.excludeBegin&&($+=w),Z(),!N.returnBegin&&!N.excludeBegin&&($=w)),wr(N,d),N.returnBegin?0:w.length}function oi(d){let w=d[0],N=p.substring(d.index),D=vr(A,d,N);if(!D)return Fo;let V=A;A.endScope&&A.endScope._wrap?(Z(),oe(w,A.endScope._wrap)):A.endScope&&A.endScope._multi?(Z(),yr(A.endScope,d)):V.skip?$+=w:(V.returnEnd||V.excludeEnd||($+=w),Z(),V.excludeEnd&&($=w));do A.scope&&U.closeNode(),!A.skip&&!A.subLanguage&&(zt+=A.relevance),A=A.parent;while(A!==D.parent);return D.starts&&wr(D.starts,d),V.returnEnd?0:w.length}function ii(){let d=[];for(let w=A;w!==ie;w=w.parent)w.scope&&d.unshift(w.scope);d.forEach(w=>U.openNode(w))}let Bt={};function Er(d,w){let N=w&&w[0];if($+=d,N==null)return Z(),0;if(Bt.type==="begin"&&w.type==="end"&&Bt.index===w.index&&N===""){if($+=p.slice(w.index,w.index+1),!o){let D=new Error(`0 width match regex (${l})`);throw D.languageName=l,D.badRule=Bt.rule,D}return 1}if(Bt=w,w.type==="begin")return ri(w);if(w.type==="illegal"&&!g){let D=new Error('Illegal lexeme "'+N+'" for mode "'+(A.scope||"<unnamed>")+'"');throw D.mode=A,D}else if(w.type==="end"){let D=oi(w);if(D!==Fo)return D}if(w.type==="illegal"&&N==="")return $+=`
`,1;if(bn>1e5&&bn>w.index*3)throw new Error("potential infinite loop, way more iterations than matches");return $+=N,N.length}let ie=re(l);if(!ie)throw ze(a.replace("{}",l)),new Error('Unknown language: "'+l+'"');let si=$a(ie),xn="",A=M||si,Sr={},U=new s.__emitter(s);ii();let $="",zt=0,Te=0,bn=0,yn=!1;try{if(ie.__emitTokens)ie.__emitTokens(p,U);else{for(A.matcher.considerAll();;){bn++,yn?yn=!1:A.matcher.considerAll(),A.matcher.lastIndex=Te;let d=A.matcher.exec(p);if(!d)break;let w=p.substring(Te,d.index),N=Er(w,d);Te=d.index+N}Er(p.substring(Te))}return U.finalize(),xn=U.toHTML(),{language:l,value:xn,relevance:zt,illegal:!1,_emitter:U,_top:A}}catch(d){if(d.message&&d.message.includes("Illegal"))return{language:l,value:ar(p),illegal:!0,relevance:0,_illegalBy:{message:d.message,index:Te,context:p.slice(Te-100,Te+100),mode:d.mode,resultSoFar:xn},_emitter:U};if(o)return{language:l,value:ar(p),illegal:!1,relevance:0,errorRaised:d,_emitter:U,_top:A};throw d}}function te(l){let p={value:ar(l),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return p._emitter.addText(l),p}function B(l,p){p=p||s.languages||Object.keys(t);let g=te(l),M=p.filter(re).filter(st).map(Z=>S(Z,l,!1));M.unshift(g);let P=M.sort((Z,oe)=>{if(Z.relevance!==oe.relevance)return oe.relevance-Z.relevance;if(Z.language&&oe.language){if(re(Z.language).supersetOf===oe.language)return 1;if(re(oe.language).supersetOf===Z.language)return-1}return 0}),[ne,ge]=P,Lt=ne;return Lt.secondBest=ge,Lt}function Me(l,p,g){let M=p&&n[p]||g;l.classList.add("hljs"),l.classList.add(`language-${M}`)}function me(l){let p=null,g=f(l);if(c(g))return;if(m("before:highlightElement",{el:l,language:g}),l.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",l);return}if(l.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(l)),s.throwUnescapedHTML))throw new pr("One of your code blocks includes unescaped HTML.",l.innerHTML);p=l;let M=p.textContent,P=g?T(M,{language:g,ignoreIllegals:!0}):B(M);l.innerHTML=P.value,l.dataset.highlighted="yes",Me(l,g,P.language),l.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(l.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),m("after:highlightElement",{el:l,result:P,text:M})}function he(l){s=$o(s,l)}let ot=()=>{He(),nt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function it(){He(),nt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let Ne=!1;function He(){function l(){He()}if(document.readyState==="loading"){Ne||window.addEventListener("DOMContentLoaded",l,!1),Ne=!0;return}document.querySelectorAll(s.cssSelector).forEach(me)}function It(l,p){let g=null;try{g=p(e)}catch(M){if(ze("Language definition for '{}' could not be registered.".replace("{}",l)),o)ze(M);else throw M;g=i}g.name||(g.name=l),t[l]=g,g.rawDefinition=p.bind(null,e),g.aliases&&$t(g.aliases,{languageName:l})}function mn(l){delete t[l];for(let p of Object.keys(n))n[p]===l&&delete n[p]}function hn(){return Object.keys(t)}function re(l){return l=(l||"").toLowerCase(),t[l]||t[n[l]]}function $t(l,{languageName:p}){typeof l=="string"&&(l=[l]),l.forEach(g=>{n[g.toLowerCase()]=p})}function st(l){let p=re(l);return p&&!p.disableAutodetect}function gn(l){l["before:highlightBlock"]&&!l["before:highlightElement"]&&(l["before:highlightElement"]=p=>{l["before:highlightBlock"](Object.assign({block:p.el},p))}),l["after:highlightBlock"]&&!l["after:highlightElement"]&&(l["after:highlightElement"]=p=>{l["after:highlightBlock"](Object.assign({block:p.el},p))})}function Ft(l){gn(l),r.push(l)}function Pt(l){let p=r.indexOf(l);p!==-1&&r.splice(p,1)}function m(l,p){let g=l;r.forEach(function(M){M[g]&&M[g](p)})}function h(l){return nt("10.7.0","highlightBlock will be removed entirely in v12.0"),nt("10.7.0","Please use highlightElement now."),me(l)}Object.assign(e,{highlight:T,highlightAuto:B,highlightAll:He,highlightElement:me,highlightBlock:h,configure:he,initHighlighting:ot,initHighlightingOnLoad:it,registerLanguage:It,unregisterLanguage:mn,listLanguages:hn,getLanguage:re,registerAliases:$t,autoDetection:st,inherit:$o,addPlugin:Ft,removePlugin:Pt}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=Pa,e.regex={concat:je,lookahead:Bo,either:fr,optional:Ks,anyNumberOfTimes:Zs};for(let l in un)typeof un[l]=="object"&&Po(un[l]);return Object.assign(e,un),e},rt=Xo({});rt.newInstance=()=>Xo({});qo.exports=rt;rt.HighlightJS=rt;rt.default=rt});var _e={},Va=Symbol("terminator");function yi(e,t){let n=!1,r={error:o,unsubscribe:a,get closed(){return n},signal:new xe,next(i){if(!n)try{e.next?.(i)}catch(s){o(s)}},complete(){if(!n)try{e.complete?.()}finally{a()}}};e.signal?.subscribe(a);function o(i){if(n)throw i;if(!e.error)throw a(),i;try{e.error(i)}finally{a()}}function a(){n||(n=!0,r.signal.next())}try{if(t?.(r))throw new Error("Unsubscribe function result is deprectaed")}catch(i){o(i)}return r}var _=class{__subscribe;constructor(t){this.__subscribe=t}then(t,n){return Ei(this).then(t,n)}pipe(...t){return t.reduce((n,r)=>r(n),this)}subscribe(t){return yi(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},Re=class extends _{closed=!1;signal=new xe;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let n of Array.from(this.observers))n.closed||n.next(t)}error(t){if(!this.closed){this.closed=!0;let n=!1,r;for(let o of Array.from(this.observers))try{o.error(t)}catch(a){n=!0,r=a}if(n)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},xe=class extends _{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},jt=class extends Re{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},at=class extends Re{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let n=super.onSubscribe(t);return this.closed||t.next(this.currentValue),n}},vn=class extends Re{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(n=>t.next(n)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},Ue=class extends Re{$value=_e;get hasValue(){return this.$value!==_e}get value(){if(this.$value===_e)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==_e&&t.next(this.$value),super.onSubscribe(t)}},En=class extends Error{message="No elements in sequence"};function ue(...e){return new _(t=>{let n=0,r;function o(){let a=e[n++];a&&!t.closed?(r?.next(),a.subscribe({next:t.next,error:t.error,complete:o,signal:r=new xe})):t.complete()}t.signal.subscribe(()=>r?.next()),o()})}function X(e){return new _(t=>{e().subscribe(t)})}function Cr(e){return new _(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function Ar(e){return new _(t=>{e.then(n=>{t.closed||t.next(n),t.complete()}).catch(n=>t.error(n))})}function Mr(e){return X(()=>Ar(e()))}function wi(e){return new _(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function Nr(e){return e instanceof _?e:Array.isArray(e)?Cr(e):e instanceof Promise?Ar(e):wi(e)}function z(...e){return Cr(e)}function vi(e){return new Promise((t,n)=>{let r=_e;e.subscribe({next:o=>r=o,error:o=>n(o),complete:()=>t(r)})})}function Ei(e){return vi(e).then(t=>t===_e?void 0:t)}function Ge(e,t){return pe(n=>({next:e(n),unsubscribe:t}))}function pe(e){return t=>new _(n=>{let r=e(n,t);n.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=n.error),r.complete||(r.complete=n.complete),r.signal=n.signal,t.subscribe(r)})}function Sn(e){return Ge(t=>n=>t.next(e(n)))}function Si(e,t){return pe(n=>{let r=t,o=0;return{next(a){r=e(r,a,o++)},complete(){n.next(r),n.complete()}}})}function ki(e){return pe(t=>{let n=!0,r;return{next(o){n&&(n=!1,t.next(o),r=setTimeout(()=>n=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function Oe(e){return new _(t=>{let n=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(n))})}function Ci(e,t=Oe){return Tr(n=>t(e).map(()=>n))}function Tr(e){return t=>q(n=>{let r=!1,o=!1,a,i=()=>{a?.next(),r=!1,o&&n.complete()},s=new xe;n.signal.subscribe(()=>{i(),s.next()}),t.subscribe({next(c){i(),a=new xe,r=!0,e(c).subscribe({next:n.next,error:n.error,complete:i,signal:a})},error:n.error,complete(){o=!0,r||n.complete()},signal:s})})}function Ai(e){return t=>q(n=>{let r=n.signal,o=0,a=0,i=!1;t.subscribe({next:s=>{o++,e(s).subscribe({next:n.next,error:n.error,complete:()=>{a++,i&&a===o&&n.complete()},signal:r})},error:n.error,complete(){i=!0,a===o&&n.complete()},signal:r})})}function Mi(e){return pe(t=>{let n=!0;return{next(r){n&&(n=!1,e(r).subscribe({next:t.next,error:t.error,complete:()=>n=!0,signal:t.signal}))}}})}function Ht(e){return Ge(t=>n=>{e(n)&&t.next(n)})}function Ni(e){return Ge(t=>n=>{e-- >0&&!t.closed&&t.next(n),(e<=0||t.closed)&&t.complete()})}function Ti(e){return Ge(t=>n=>{!t.closed&&e(n)?t.next(n):t.complete()})}function _i(){let e=!1;return pe(t=>({next(n){e||(e=!0,t.next(n),t.complete())},complete(){t.closed||t.error(new En)}}))}function Ut(e){return Ge(t=>n=>{e(n),t.next(n)})}function Ri(e){return pe((t,n)=>{let r,o={next:t.next,error(a){try{if(t.closed)return;let i=e(a,n);i&&(r?.next(),r=new xe,i.subscribe({...o,signal:r}))}catch(i){t.error(i)}},unsubscribe:()=>r?.next()};return o})}function Oi(){return Ge(e=>{let t=_e;return n=>{n!==t&&(t=n,e.next(n))}})}function Di(){return e=>{let t=new vn(1),n=!1;return q(r=>{t.subscribe(r),n||(n=!0,e.subscribe(t))})}}function Ii(){return e=>{let t,n=0;function r(){--n===0&&t?.signal.next()}return q(o=>{o.signal.subscribe(r),n++===0?(t=ct(),t.subscribe(o),e.subscribe(t)):t.subscribe(o)})}}function $i(){return e=>{let t=new Re,n,r,o=!1,a=!1;return q(i=>{a?(i.next(r),i.complete()):t.subscribe(i),n??=e.subscribe({next:s=>{o=!0,r=s},error:i.error,complete(){a=!0,o&&t.next(r),t.complete()},signal:i.signal})})}}function v(...e){return e.length===1?e[0]:new _(t=>{let n=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){n--===1&&t.complete()},signal:t.signal})})}function J(...e){return e.length===0?I:new _(t=>{let n=e.length,r=n,o=0,a=!1,i=new Array(n),s=new Array(n);e.forEach((c,f)=>c.subscribe({next(T){s[f]=T,i[f]||(i[f]=!0,++o>=r&&(a=!0)),a&&t.next(s.slice(0))},error:t.error,complete(){--n<=0&&t.complete()},signal:t.signal}))})}function Fi(e){return pe(t=>({next:t.next,unsubscribe:e}))}function Pi(){return Ht(()=>!1)}var I=new _(e=>e.complete());function be(e){return new at(e)}function q(e){return new _(e)}function ct(){return new Ue}var kr={catchError:Ri,debounceTime:Ci,distinctUntilChanged:Oi,exhaustMap:Mi,filter:Ht,finalize:Fi,first:_i,ignoreElements:Pi,map:Sn,mergeMap:Ai,publishLast:$i,reduce:Si,share:Ii,shareLatest:Di,switchMap:Tr,take:Ni,takeWhile:Ti,tap:Ut,throttleTime:ki};for(let e in kr)_.prototype[e]=function(...t){return this.pipe(kr[e](...t))};function R(e,t,n){return new _(r=>{let o=r.next.bind(r);e.addEventListener(t,o,n),r.signal.subscribe(()=>e.removeEventListener(t,o,n))})}function Gt(e){return kn(e,{childList:!0})}function _r(e,t){return kn(e,{attributes:!0,attributeFilter:t})}function kn(e,t={attributes:!0,childList:!0}){return new _(n=>{let r=new MutationObserver(o=>o.forEach(a=>{for(let i of a.addedNodes)n.next({type:"added",target:e,value:i});for(let i of a.removedNodes)n.next({type:"removed",target:e,value:i});a.type==="characterData"?n.next({type:"characterData",target:e}):a.attributeName&&n.next({type:"attribute",target:e,value:a.attributeName})}));r.observe(e,t),n.signal.subscribe(()=>r.disconnect())})}function Rr(e){return R(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function Q(e){return R(e,"click")}function Vt(e,t){return new _(n=>{let r=new IntersectionObserver(o=>{for(let a of o)n.next(a)},t);r.observe(e),n.signal.subscribe(()=>r.disconnect())})}function Or(e){return Vt(e).map(t=>t.isIntersecting)}function De(e){return Vt(e).filter(t=>t.isIntersecting).first()}function Li(e){let t;return function(...n){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,n),t=0})}}function Dr(e){return pe(t=>{let n=Li(o=>{t.closed||(e&&e(o),t.next(o),r&&t.complete())}),r=!1;return{next:n,complete:()=>r=!0}})}function Ir(){return X(()=>document.readyState!=="loading"?z(!0):R(window,"DOMContentLoaded").first().map(()=>!0))}function Wt(e,t){let n;return v(X(()=>(n=e.childNodes,n?z(n):I)),kn(e,{childList:!0,...t}),Ie().switchMap(()=>e.childNodes!==n?(n=e.childNodes,z(n)):I))}function Ie(){return X(()=>document.readyState==="complete"?z(!0):R(window,"load").first().map(()=>!0))}function $r(...e){return new _(t=>{let n=new ResizeObserver(r=>r.forEach(o=>t.next(o)));for(let r of e)n.observe(r);t.signal.subscribe(()=>n.disconnect())})}function Fr(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function Cn(e,t,n){return r=>ue(z(e?r.matches(e):!1),R(r,t).switchMap(()=>v(z(!0),R(r,n).map(()=>e?r.matches(e):!1))))}var Xa=Cn("","animationstart","animationend"),An=Cn("","mouseenter","mouseleave"),Bi=Cn(":focus,:focus-within","focusin","focusout"),Mn=e=>J(An(e),Bi(e)).map(([t,n])=>t||n);function lt(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function Pr(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var zi=Ut(e=>console.log(e));_.prototype.log=function(){return this.pipe(zi)};_.prototype.raf=function(e){return this.pipe(Dr(e))};var W=Symbol("bindings"),ji={},Ve=Symbol("augments"),$e=Symbol("parser"),Tn=class{bindings;messageHandlers;internals;attributes$=new jt;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,n){let r=!1;if(this.messageHandlers)for(let o of this.messageHandlers)o.type===t&&(o.next(n),r||=o.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let n of this.bindings)t.push(n.subscribe());if(this.prebind)for(let n of this.prebind)t.push(n.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},Xt=Symbol("css"),x=class extends HTMLElement{static observedAttributes;static[Ve];static[$e];[W]=new Tn;[Xt];connectedCallback(){this[W].wasInitialized=!0,this[W].wasConnected||this.constructor[Ve]?.forEach(t=>t(this)),this[W].connect()}disconnectedCallback(){this[W].disconnect()}attributeChangedCallback(t,n,r){let o=this.constructor[$e]?.[t]??Hi;n!==r&&(this[t]=o(r,this[t]))}};function Hi(e,t){let n=t===!1||t===!0;return e===""?n?!0:"":e===null?n?!1:void 0:e}function Lr(e,t){e.hasOwnProperty(Ve)||(e[Ve]=e[Ve]?.slice(0)??[]),e[Ve]?.push(t)}var Ui={mode:"open"};function j(e){return e.shadowRoot??e.attachShadow(Ui)}function Br(e,t){t instanceof Node?j(e).appendChild(t):e[W].add(t)}function Gi(e,t){t.length&&Lr(e,n=>{for(let r of t){let o=r.call(e,n);o&&o!==n&&Br(n,o)}})}function Vi(e,t){ji[e]=t,customElements.define(e,t)}function u(e,{init:t,augment:n,tagName:r}){if(t)for(let o of t)o(e);n&&Gi(e,n),r&&Vi(r,e)}function ye(e){return ue(z(e),e[W].attributes$.map(()=>e))}function Y(e,t){return e[W].attributes$.pipe(Ht(n=>n.attribute===t),Sn(()=>e[t]))}function E(e,t){return v(Y(e,t),X(()=>z(e[t])))}function Wi(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function _n(e,t,n){return n===!1||n===null||n===void 0?n=null:n===!0&&(n=""),n===null?e.removeAttribute(t):e.setAttribute(t,String(n)),n}function Yi(e,t,n){e.hasOwnProperty($e)||(e[$e]={...e[$e]}),e[$e]&&(e[$e][t]=n)}function b(e,t){return n=>{t?.observe!==!1&&Wi(n).push(e),t?.parse&&Yi(n,e,t.parse);let r=`$$${e}`,o=n.prototype,a=Object.getOwnPropertyDescriptor(o,e);a&&Object.defineProperty(o,r,a);let i=t?.persist,s={enumerable:!0,configurable:!1,get(){return this[r]},set(c){this[r]!==c?(this[r]=c,i?.(this,e,c),this[W].attributes$.next({target:this,attribute:e,value:c})):a?.set&&(i?.(this,e,c),this[r]=c)}};Lr(n,c=>{if(a||(c[r]=c[e]),Object.defineProperty(c,e,s),i?.(c,e,c[e]),t?.render){let f=t.render(c);f&&Br(c,f)}})}}function C(e){return b(e,{persist:_n,observe:!0})}function fe(e){return b(e,{observe:!1})}function O(){return document.createElement("slot")}function zr(e){return t=>{let[n,r]=e();return t[W].add(n),r}}var We=class extends x{};u(We,{tagName:"c-span"});function Xi(e,t){let n=document.createTextNode("");return e[W].add(t.tap(r=>n.textContent=r)),n}var Nn=document.createDocumentFragment();function Yt(e,t,n=e){if(t!=null)if(Array.isArray(t)){for(let r of t)Yt(e,r,Nn);n!==Nn&&n.appendChild(Nn)}else e instanceof x&&t instanceof _?n.appendChild(Xi(e,t)):t instanceof Node?n.appendChild(t):e instanceof x&&typeof t=="function"?Yt(e,t(e),n):n.appendChild(document.createTextNode(t))}function jr(e,t){for(let n in t){let r=t[n];e instanceof x?r instanceof _?e[W].add(n==="$"?r:r.tap(o=>e[n]=o)):n==="$"&&typeof r=="function"?e[W].add(r(e)):e[n]=r:e[n]=r}}function qi(e,t){return e.constructor.observedAttributes?.includes(t)}function Hr(e,t){let n=e instanceof x&&qi(e,t)?Y(e,t):_r(e,[t]).map(()=>e[t]);return v(n,X(()=>z(e[t])))}function Ur(e,t,n){return b(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let o=r===void 0?void 0:Number(r);return t!==void 0&&(o===void 0||o<t||isNaN(o))&&(o=t),n!==void 0&&o!==void 0&&o>n&&(o=n),o}})}function Fe(e,t,n){for(let r=e.parentElement;r;r=r.parentElement)if(r[W]?.message(t,n))return}function Ye(e,t,n=!0){return new _(r=>{let o={type:t,next:r.next,stopPropagation:n};e[W].addMessageHandler(o),r.signal.subscribe(()=>e[W].removeMessageHandler(o))})}function F(e,t,...n){let r=typeof e=="string"?document.createElement(e):new e;return t&&jr(r,t),n&&Yt(r,n),r}function k(e,t,...n){if(e!==k&&typeof e=="function"&&!(e.prototype instanceof x))return n.length&&((t??={}).children=n),e(t);let r=e===k?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&jr(r,t),n&&Yt(r,n),r}function Ji(e,t){return n=>new _(()=>{n.hasAttribute(e)||n.setAttribute(e,t)})}function K(e){return Ji("role",e)}var Qi=0;function Gr(e){return Hr(e,"id").map(t=>(t||(e.id=`cxl__${Qi++}`),e.id))}var qt=y(":host{display:contents}"),es=[-2,-1,0,1,2,3,4,5],Zr=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],ut=ct(),Jt=be(""),qe=y(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),ts=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),Kr={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function eo(e=Kr){return Object.entries(e).map(([t,n])=>`--cxl-color--${t}:${n};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var H={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:Kr,imports:ts?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function Dn(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var Qt=y(Dn()),to={"./theme-dark.js":()=>Promise.resolve().then(()=>(Yr(),Wr))},pt=[0,4,8,16,24,32,48,64],Xe,Xr,ns;function G(e,t){return e==="xsmall"?`@media(max-width:${H.breakpoints.small}px){${t}}`:`@media(min-width:${H.breakpoints[e]}px){${t}}`}function Zt(e){return $r(e).map(t=>{let n=H.breakpoints,r=t.contentRect.width,o="xsmall";for(let a in n){if(n[a]>r)return o;o=a}return o})}function rs(e=""){return Object.entries(so).map(([t,n])=>`:host([color=${t}]) ${e}{ ${n} }`).join("")}function Je(e,t,n=""){return no(e,`
		${t?`:host ${n} { ${so[t]} }`:""}
		:host${t?"":"([color])"} ${n} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${n}{
			color: inherit;
			background-color: transparent;
		}
		${rs(n)}
	`)}function no(e,t){let n=y(t);return b(e,{persist:_n,render:r=>n(r)})}function we(e,t){return no(e,es.map(n=>{let r=t(n);return n===0?`:host ${r}`:`:host([size="${n}"]) ${r}`}).join(""))}function ro(){let e=document.adoptedStyleSheets.indexOf(Xe);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function os(e){Xe&&ro();let t=e.globalCss??"";e.colors&&(t+=`:root{${eo(e.colors)}}`),t&&(Xe=Pe(t),document.adoptedStyleSheets.push(Xe)),ut.next({theme:e,stylesheet:Xe,css:t}),Jt.next(e.name)}var qr="";function oo(e){e?e!==qr&&(typeof e=="string"?import(e):e()).then(t=>os(t.default)):Xe&&(ro(),ut.next(void 0),Jt.next("")),qr=e}function is(e){let t;return ut.tap(n=>{let r=n?.theme.override?.[e.tagName];r?t?t.replace(r):e.shadowRoot?.adoptedStyleSheets.push(t??=Pe(r)):t&&t.replace("")})}function Pe(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function y(e){let t;return n=>{let r=j(n);if(r.adoptedStyleSheets.push(t??=Pe(e)),!n[Xt])return H.css&&r.adoptedStyleSheets.unshift(ns??=Pe(H.css)),n[Xt]=!0,is(n)}}var io=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],ic=[...io,"inherit"];function Rn(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function ve(e){return`${Rn(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var so=io.reduce((e,t)=>(e[t]=`
${Rn(t)}
${t==="inverse-surface"?Rn("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function Kt(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function L(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var ss=requestAnimationFrame(()=>fs()),as={},Jr=document.createElement("template"),Qr={};function cs(e){return function(t){let n=e(t),r=Qr[n];if(r)return r.cloneNode(!0);let o=document.createElementNS("http://www.w3.org/2000/svg","svg"),a=()=>(o.dispatchEvent(new ErrorEvent("error")),"");return fetch(n).then(i=>i.ok?i.text():a(),a).then(i=>{if(!i)return;Jr.innerHTML=i;let s=Jr.content.children[0];if(!s)return;let c=s.getAttribute("viewBox");c?o.setAttribute("viewBox",c):s.hasAttribute("width")&&s.hasAttribute("height")&&o.setAttribute("viewBox",`0 0 ${s.getAttribute("width")} ${s.getAttribute("height")}`);for(let f of s.childNodes)o.append(f);Qr[t.name]=o}),o.setAttribute("fill","currentColor"),o}}var ls=cs(({name:e,width:t,fill:n})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${n?"fill1_":""}${t}px.svg`)),us=ls;function ao(e,t={}){let{width:n,height:r}=t;n===void 0&&r===void 0&&(n=r=24);let o=as[e]?.icon()||us({name:e,width:n,fill:t.fill});return t.className&&o.setAttribute("class",t.className),n&&(o.setAttribute("width",`${n}`),r===void 0&&o.setAttribute("height",`${n}`)),r&&(o.setAttribute("height",`${r}`),n===void 0&&o.setAttribute("width",`${r}`)),t.alt&&o.setAttribute("alt",t.alt),o}var On,ps=new Promise(e=>{On=e});function fs(e){cancelAnimationFrame(ss),Xr||(e&&(e.colors&&(H.colors=e.colors),e.globalCss&&(H.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(Xr=Pe(`:root { ${eo(H.colors)} }`+H.globalCss)),H.imports?Promise.allSettled(H.imports.map(t=>{let n=document.createElement("link");return n.rel="stylesheet",n.href=t,document.head.append(n),new Promise((r,o)=>(n.onload=r,n.onerror=o))})).then(On):On())}function co(){return Mr(async()=>{await ps,await document.fonts.ready})}var ds=[y(`
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
	${L("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${L("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${L("headline-medium")}
	flex-wrap: wrap;
}`),O,()=>F("slot",{name:"title"})];function ms(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var ft=class extends x{size;sticky=!1;contextual};u(ft,{tagName:"c-appbar",init:[C("size"),C("sticky"),C("contextual")],augment:[y(`
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
		`),...ds,()=>F("slot",{name:"contextual"}),e=>E(e,"sticky").switchMap(t=>t?Vt(e,{threshold:[1]}).tap(n=>e.toggleAttribute("scroll",n.intersectionRatio<1)):I),e=>{let t;return v(Gt(e),E(e,"contextual")).raf().switchMap(()=>{for(let n of e.children)if(ms(n)&&(n.slot="contextual",n.open=n.name===e.contextual,n.open))return t=n,R(n,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,I})}]});function hs(e){return E(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function gs(e,t=e,n=0){let r=t.hasAttribute("tabindex")?t.tabIndex:n;return hs(e).tap(o=>{o?t.removeAttribute("tabindex"):t.tabIndex=r})}function xs(e,t=e){return v(R(t,"focusout").tap(()=>e.touched=!0),v(Y(e,"disabled"),Y(e,"touched")).tap(()=>Fe(e,"focusable.change")))}function en(e,t=e,n=0){return v(gs(e,t,n),xs(e,t))}function lo(e){return e in H.animation}function de({target:e,animation:t,options:n}){if(H.disableAnimations)return e.animate(null);let r=typeof t=="string"?H.animation[t]:t;if(!r)throw new Error(`Animation "${t}" not defined`);let o=typeof r.kf=="function"?r.kf(e):r.kf,a={duration:250,easing:H.easing.emphasized,...r.options,...n,...H.prefersReducedMotion?{duration:0}:void 0};return e.animate(o,a)}function uo(e){let{trigger:t,stagger:n,commit:r,keep:o}=e;function a(s){return new _(c=>{let f=de(s);f.ready.then(()=>c.next({type:"start",animation:f}),()=>{}),f.addEventListener("finish",()=>{c.next({type:"end",animation:f}),r&&f.commitStyles(),!(o||o!==!1&&s.options?.fill&&(s.options.fill==="both"||s.options.fill==="forwards"))&&c.complete()}),c.signal.subscribe(()=>{try{f.cancel()}catch{}})})}let i=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return v(...i.map((s,c)=>{let f={...e.options,delay:n!==void 0?(e.options?.delay??0)+c*n:e.options?.delay};return(t==="visible"?Or(s).filter(S=>S):t==="hover"?An(s):z(!0)).switchMap(S=>S?a({...e,options:f,target:s}):I)}))}function po(e,t,n=e.getBoundingClientRect()){let r=n.width>n.height?n.width:n.height,o=new tn,a=e.shadowRoot||e,{x:i,y:s}=t??{},c=i===void 0||!t||lt(t),f=i>n.right||i<n.left||s>n.bottom||s<n.top;return o.x=c||f?n.width/2:i-n.left,o.y=c||f?n.height/2:s-n.top,o.radius=r,t||(o.duration=0),a.prepend(o),o}function fo(e,t=e){let n,r,o,a=()=>{n=po(t,r instanceof Event?r:void 0,o),n.duration=600,r=void 0};return v(R(e,"click").tap(i=>{r=i,o=t.getBoundingClientRect()}),E(e,"selected").raf().switchMap(()=>{if(e.selected){if(!n?.parentNode){if(Fr(e))return r=void 0,De(e).tap(a);a()}}else n&&mo(n);return I})).ignoreElements()}function mo(e){return new Promise(t=>{de({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function Ee(e,t=e){let n=!1,r=0;return v(R(t,"pointerdown"),R(t,"click")).tap(o=>o.cxlRipple??=e).raf().mergeMap(o=>{if(o.cxlRipple===e&&!n&&!e.disabled&&e.parentNode){r=Date.now(),n=!0,e.style.setProperty("--cxl-mask-hover","none");let a=po(e,o),i=a.duration,s=()=>{e.style.removeProperty("--cxl-mask-hover"),mo(a).then(()=>{n=!1})};return o.type==="click"?Oe(i).tap(s):v(R(document,"pointerup"),R(document,"pointercancel")).first().map(()=>{let c=Date.now()-r;setTimeout(()=>s(),c>i?32:i-c)})}return I})}var tn=class extends x{x=0;y=0;radius=0;duration=500};u(tn,{tagName:"c-ripple",init:[b("x"),b("y"),b("radius")],augment:[y(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",q(()=>{let n=t.style;n.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,n.width=n.height=e.radius*2+"px",t.parentNode||j(e).append(t),de({target:t,animation:"expand",options:{duration:e.duration}}),de({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var mt=[qe,Qt,y(`
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
}`)],bs=y(`
:host {
	${L("label-large")}
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
`);function In(e){return E(e,"disabled").switchMap(t=>t?I:Rr(e).tap(n=>{n.stopPropagation(),e.click()}))}function $n(e){return v(In(e),en(e))}var Qe=class extends x{disabled=!1;touched=!1};u(Qe,{init:[C("disabled"),C("touched")],augment:[K("button"),$n]});var dt=class extends Qe{size;color;variant};u(dt,{tagName:"c-button",init:[we("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),Je("color","primary"),C("variant")],augment:[...mt,bs,Ee,O]});var ht=class extends dt{};u(ht,{tagName:"c-button-round",augment:[y(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var Se=class extends x{name="";width;height;alt;fill=!1};u(Se,{tagName:"c-icon",init:[b("name"),b("width"),b("height"),b("fill"),b("alt")],augment:[K("none"),y(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,n;return e.shadowRoot?.adoptedStyleSheets.push(t),De(e).switchMap(()=>ye(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,o=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${o===void 0?"":`height:${o}px`}}`),n?.remove(),n=e.name?ao(e.name,{className:"icon",width:r,height:o,fill:e.fill,alt:e.alt}):void 0,n&&(n.onerror=()=>{n&&e.alt&&n.replaceWith(e.alt)},j(e).append(n))})}]});var se=class extends ht{icon="";width;height;fill=!1;variant="text";alt};u(se,{tagName:"c-icon-button",init:[b("icon"),b("width"),b("height"),b("alt"),b("fill")],augment:[e=>F(Se,{className:"icon",width:E(e,"width"),height:E(e,"height"),name:E(e,"icon"),fill:E(e,"fill"),alt:E(e,"alt")})]});var Fn=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer?.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},ke=new Fn;function ho(e=document){document.documentElement.lang="en";let t=[F("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),F("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),F("meta",{name:"mobile-web-app-capable",content:"yes"}),F("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${L("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function go(e=2e3){return v(Oe(e),co()).first()}function xo(e){return go().raf(()=>e.setAttribute("ready",""))}function nn(e){return v(q(t=>{let n=ho(e.ownerDocument??document);t.signal.subscribe(()=>n.forEach(r=>r.remove()))}),Ie().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),go().switchMap(()=>Zt(e).raf(t=>e.setAttribute("breakpoint",t))),xo(e),Jt.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Pn=class extends x{connectedCallback(){requestAnimationFrame(()=>ho(this.ownerDocument||document)),super.connectedCallback()}};u(Pn,{tagName:"c-meta",augment:[()=>xo(document.body)]});function bo(e,t,n){n==="in"&&(e.style.display="");let r=e.offsetWidth,o=de({target:e,animation:{kf:{[t]:n==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});n==="out"&&(o.onfinish=()=>e.style.display="none")}var gt=class extends x{sheetstart=!1;sheetend=!1};u(gt,{tagName:"c-application",init:[C("sheetstart"),C("sheetend")],augment:[y(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${ve("background")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${Kt()}
	`),nn,e=>Ye(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>Ye(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=F("slot",{name:"start"}),n=F("slot",{id:"body"}),r=F("slot",{name:"end"}),o=Pe("html { overflow: hidden }");return j(e).append(t,n,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),ke.popupContainer=e,v(q(a=>{let i=(e.ownerDocument??document).adoptedStyleSheets;i.push(o),a.signal.subscribe(()=>{let s=i.indexOf(o);s!==-1&&i.splice(s,1)})}),Y(e,"sheetstart").tap(a=>bo(t,"marginLeft",a?"in":"out")),Y(e,"sheetend").tap(a=>bo(r,"marginRight",a?"in":"out")))}]});var rn=class extends x{};u(rn,{tagName:"c-body",augment:[y(`
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

${G("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),O]});var xt=class extends Qe{};u(xt,{tagName:"c-button-text",augment:[...mt,y(`
:host {
	${L("label-large")}
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
		`),Ee,O]});function Bn(e="block"){let t=(n=>{for(let r=12;r>0;r--)n.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,n.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,n.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,n.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,n.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return n})({xl:"",lg:"",md:"",sm:"",xs:""});return y(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${G("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${G("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${G("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${G("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var zn=y(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${Kt()}
${pt.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${pt.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),Ze=class extends x{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};u(Ze,{init:[C("sm"),C("xs"),C("md"),C("lg"),C("xl"),C("vpad"),C("pad"),C("center"),C("fill"),C("grow"),C("elevation"),Je("color")]});var Ln=class extends Ze{};u(Ln,{tagName:"c-c",augment:[zn,Bn(),y(":host([center]) { text-align: center}"),O]});function yo(e,t,n){return new _(r=>{let o={id:e,controller:n,target:t};Fe(t,`registable.${e}`,o),r.signal.subscribe(()=>o.unsubscribe?.())})}var ys=y(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${L("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function ws(e){return v(yo("list",e),E(e,"selected").tap(t=>e.ariaSelected=String(t)))}function vs(e){return v(In(e),en(e,e,-1),ws(e))}var Ke=class extends x{disabled=!1;touched=!1;selected=!1};u(Ke,{init:[C("disabled"),C("touched"),C("selected")],augment:[vs]});var jn=class extends Ke{size};u(jn,{tagName:"c-item",init:[we("size",e=>`{min-height:${56+e*8}px}`)],augment:[ys,qe,Qt,K("option"),O,Ee]});var Hn={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(n){console.error(n)}}};function wo(e){return(t,n)=>t[e]>n[e]?1:t[e]<n[e]?-1:0}function vo(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let n,r=e.getRootNode();return r instanceof ShadowRoot&&(n=r.getElementById(t),n)?n:e.ownerDocument.getElementById(t)??void 0}var bt=class extends x{disabled=!1;touched=!1;selected=!1;color;size=0};u(bt,{tagName:"c-chip",init:[C("disabled"),C("touched"),C("selected"),Je("color","surface-container-low"),we("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[K("button"),$n,...mt,y(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${L("label-large")}
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
	${ve("secondary-container")}
}
:host(:hover) { box-shadow: none; }
slot[name] { display: inline-block; }
		`),Ee,()=>F("slot",{name:"leading"}),O,()=>F("slot",{name:"trailing"})]});function Eo(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(n=>{let r=vo(e,n);return r?[r]:[]}):Array.isArray(t)?t:[t]}function Es(e,t,n,r,o=R(e,"click").map(()=>!n())){return v(r,o).switchMap(a=>{let i=t();return i?Nr(i.map(s=>({target:s,open:a}))):I})}function Gn(e,t=e){function n(a,i){return[E(e,"open").switchMap(s=>(a.parentNode||ke.popupContainer.append(a),s&&a instanceof x?Y(a,"open").map(c=>{e.open&&c===!1&&(e.open=!1)}):I)),Gr(a).tap(s=>{let c=a.getAttribute("role");(c==="menu"||c==="listbox"||c==="tree"||c==="grid"||c==="dialog")&&(i.ariaHasPopup=c),i.getRootNode()===a.getRootNode()&&i.setAttribute("aria-controls",s)})]}let r=J(E(e,"trigger"),E(e,"target")).switchMap(([a])=>{let i=Eo(e),s=i?v(...i.flatMap(c=>n(c,e))).ignoreElements():I;return v(a==="hover"?J(Mn(t),i?v(...i.map(c=>Mn(c))):I).map(c=>!!c.find(f=>!!f)).debounceTime(250):a==="checked"?R(t,"change").map(c=>c.target&&"checked"in c.target?!!c.target.checked:!1):R(t,"click").map(()=>!e.open),s)}),o;return Ir().switchMap(()=>Es(t,()=>Eo(e),()=>e.open,E(e,"open"),r).filter(a=>{let{open:i,target:s}=a;if(e.open!==i){if(i)o=Pr(e)?.activeElement,s.trigger=e;else if(s.trigger&&s.trigger!==e)return a.open=!0,s.trigger=e,!0;return e.open=i,!1}if(!i&&s.trigger===e){let c=document.activeElement;(c===document.body||c===document.documentElement)&&o?.focus()}return!0}))}var on=class extends x{open=!1;target;trigger};u(on,{init:[b("target"),b("trigger"),C("open")],augment:[e=>Gn(e).raf(({target:t,open:n})=>t.open=n)]});var Un=class extends on{};u(Un,{tagName:"c-toggle",augment:[qt,O]});var Ce;function So(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Ss(e){return e==="infinite"?1/0:+e}function ks(e){if(lo(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let n={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(s,c,f)=>(c&&(r=+c),f&&(n.composite=f),"")),Ce??=document.createElement("style").style,Ce.animation=e,n.fill=Ce.animationFillMode;let o=n.fill==="forwards"||n.fill==="both",a=t?void 0:So(Ce.animationDuration);a!==void 0&&(n.duration=a);let i=So(Ce.animationDelay);return i!==void 0&&(n.delay=i),Ce.animationIterationCount&&(n.iterations=Ss(Ce.animationIterationCount)),{animation:Ce.animationName,keep:o,stagger:r,options:n}}function Cs(e){return typeof e=="string"&&(e=e.split(",").map(t=>ks(t.trim()))),e}function Vn(e,t,n,r){let o=r?`motion-${r}-on`:"motion-on",a=Cs(n);return e.setAttribute(o,""),v(...a.map(i=>uo({target:t,...i}))).finalize(()=>e.removeAttribute(o))}var yt=class extends x{center=!1};u(yt,{tagName:"c-backdrop",init:[C("center")],augment:[y(`
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

	`),e=>R(e,"keydown").tap(t=>t.stopPropagation()),O]});var ko=y(":host(:not([open],[motion-out-on])){display:none}");function Yn(e,t=()=>e,n=!1){let r=X(()=>z(t("in"))),o=X(()=>z(t("out")));return v(Ye(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),J(E(e,"motion-in").map(a=>a?r.switchMap(i=>Vn(e,i,a,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?Oe(e.duration).map(()=>e.open=!1):I):r),E(e,"motion-out").map(a=>(a?o.switchMap(i=>Vn(e,i,a,"out").ignoreElements()):o).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([a,i])=>Y(e,"open").switchMap(s=>{if(e.popover!=="auto"){let c=s?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:s?"closed":"open",newState:c}))}return s?n?ue(i,a):a:n?ue(i,a):i})))}var et=class extends x{open=!1;duration;"motion-in";"motion-out"};u(et,{init:[b("motion-in"),b("motion-out"),Ur("duration"),C("open")]});var Wn=class extends et{};u(Wn,{tagName:"c-toggle-target",augment:[y(`
:host{display:contents}
`),e=>{let t=F("slot"),n=F("slot",{name:"off"});return(e.open?n:t).style.display="none",j(e).append(t,n),Yn(e,r=>{t.style.display=n.style.display="none";let o=e.open?r==="in"?t:n:r==="in"?n:t;return o.style.display="",o.assignedElements()},!0)}]});var wt=class extends et{};u(wt,{tagName:"c-toggle-panel",augment:[O,ko,Yn]});var As=y(`
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
${G("small","#drawer { width: 360px }")}

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
`),sn=class extends x{open=!1;position;responsive;permanent=!1};u(sn,{tagName:"c-drawer",init:[C("open"),C("position"),b("responsive"),b("permanent")],augment:[As,y(`
:host { max-width: 360px; }
#drawer.permanent {
	${ve("surface")}
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
`),e=>{let t=be(!1),n=v(E(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",o=F(wt,{id:"drawer","motion-in":n.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":n.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},O),a=new yt;a.id="backdrop";let i=F("dialog",{id:"dialog"},a,o);return j(e).append(i),v(R(o,"close").tap(()=>i.close()),R(i,"close").tap(()=>e.open=!1),Y(o,"open").tap(s=>e.open=s),Y(e,"open").raf(s=>{s||o.scrollTo(0,0)}),R(a,"click").tap(()=>e.open=!1),R(i,"cancel").tap(s=>{s.preventDefault(),e.open=!1}),E(e,"open").tap(s=>{if(t.value&&e.permanent)return o.open=!0;s?t.value||(ke.openModal({element:i,close:()=>e.open=!1}),i.getBoundingClientRect()):ke.currentModal?.element===i&&ke.modalClosed()}).raf(s=>{o.open=s}),E(e,"responsive").switchMap(s=>s!==void 0?Zt(document.body):z("xsmall")).switchMap(s=>{let c=H.breakpoints[e.responsive||"large"],f=H.breakpoints[s]>=c;return t.next(f),f&&o.className!=="permanent"?i.close():!f&&o.className==="permanent"&&(e.open=!1),f&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",f),o.className=f?"permanent":"drawer",Y(e,"open").tap(T=>{e.hasAttribute("responsiveon")||de({target:a,animation:T?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var an=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,n=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,n)):r.insertBefore(t,n))}empty(){let t=this.start.nextSibling;for(;t&&t!==this.end;){let n=t.nextSibling;t.remove(),t=n}}};function Ms({source:e,render:t,empty:n,append:r,loading:o}){let a=[],i=document.createDocumentFragment(),s,c;function f(T){if(c?.parentNode?.removeChild(c),!T)return;let S=0;for(let B of T){let Me=a[S]?.item;if(Me)Me.value!==B&&Me.next(B);else{let me=be(B),he=t(me,S,T),ot=he instanceof DocumentFragment?Array.from(he.childNodes):[he];a.push({elements:ot,item:me}),i.append(he)}S++}i.childNodes.length&&r(i),s?.remove(),S===0&&n&&r(s=n());let te=a.length;for(;te-- >S;)a.pop()?.elements.forEach(B=>B.remove())}return X(()=>(c=o?.(),c&&r(c),e.raf(f)))}function Co(e){return zr(()=>{let t=new an;return[Ms({...e,append:t.insert.bind(t)}),t.end]})}var Le=class extends Ze{vflex=!1;gap;middle=!1};u(Le,{tagName:"c-flex",init:[C("vflex"),C("gap"),C("middle")],augment:[Bn("flex"),zn,y(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${pt.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),O]});function qn(e){let t=document.createElement("style");return v(q(n=>{let r=e.persistkey&&Hn.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),n.signal.subscribe(()=>t.remove())}),ye(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let n=e.open?e.themeon:e.themeoff;e.persistkey&&Hn.set(e.persistkey,n),oo(to[n]||n)}),Q(e).tap(()=>e.open=!e.open))}var Xn=class extends x{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};u(Xn,{tagName:"c-toggle-theme",init:[b("persistkey"),b("usepreferred"),b("open"),b("themeon"),b("themeoff")],augment:[K("group"),qn]});var vt=class extends se{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};u(vt,{tagName:"c-icon-toggle-theme",init:[b("persistkey"),b("usepreferred"),b("open"),b("themeon"),b("themeoff")],augment:[qn,e=>J(E(e,"iconon"),E(e,"iconoff"),E(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var Ns=()=>{let e;function t(){let n=document.adoptedStyleSheets.indexOf(e);n!==-1&&document.adoptedStyleSheets.splice(n,1)}addEventListener("message",n=>{let{theme:r}=n.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r),document.adoptedStyleSheets.push(e))})},Ts=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},Et=class extends x{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};u(Et,{tagName:"c-iframe",init:[b("src"),b("srcdoc"),b("sandbox"),b("handletheme")],augment:[y(`
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
	`),e=>{let t=k("iframe",{loading:"lazy"}),n=k("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),n.style.display="none";function o(i){r.replaceSync(":host{height:"+i+"px}"),t.style.height="100%",t.style.opacity="1",n.style.display="none"}function a(i){if(i){let s=`<script type="module">
(${Ts.toString()})();
(${Ns.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${i}${s}`,n.style.display=""}}return j(e).append(t,n),v(J(E(e,"srcdoc"),E(e,"src")).raf(async([i,s])=>{a(s?`<base href="${s}" />`+await fetch(s).then(c=>c.text()):i)}),R(window,"message").tap(i=>{let{height:s}=i.data;i.source===t.contentWindow&&s!==void 0&&o(s)}),E(e,"handletheme").switchMap(i=>i?R(t,"load").switchMap(()=>ut.raf(s=>{let c=s?.css??"";t.contentWindow?.postMessage({theme:c},"*")})):I),E(e,"sandbox").tap(i=>i===void 0?t.removeAttribute("sandbox"):t.sandbox.value=i))}]});var _s=[y(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${L("label-large")}
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
${Dn("c-ripple")}
	`),qe,fo,O],Be=class extends Ke{size};u(Be,{tagName:"c-nav-item",init:[we("size",e=>`{min-height:${56+e*8}px}`)],augment:[K("option"),..._s]});var St=class extends se{open=!1;target;icon="menu"};u(St,{tagName:"c-navbar-toggle",init:[b("target"),fe("open")],augment:[e=>Gn(e).tap(({target:t,open:n})=>t.open=n)]});var cn=class extends x{};u(cn,{tagName:"c-page",augment:[nn,y(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${ve("background")}
}`),O]});var Rs=/([^&=]+)=?([^&]*)/g,Os=/:([\w_$@]+)/g,Ds=/\/\((.*?)\)/g,Is=/(\(\?)?:\w+/g,$s=/\*\w+/g,Fs=/[-{}[\]+?.,\\^$|#\s]/g,Ps=/([^#]*)(?:#(.+))?/,nr="@@cxlRoute",ee={location:window.location,history:window.history};function Ls(e){let t=[];return[new RegExp("^/?"+e.replace(Fs,"\\$&").replace(Ds,"\\/?(?:$1)?").replace(Is,function(r,o){return t.push(r.substr(1)),o?r:"([^/?]*)"}).replace($s,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function Ao(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function Jn(e,t){return t?e.replace(Os,(n,r)=>t[r]||""):e}function Bs(e){let t={},n;for(;n=Rs.exec(e);)t[n[1]]=decodeURIComponent(n[2]);return t}var Qn=class{path;regex;parameters;constructor(t){this.path=t=Ao(t),[this.regex,this.parameters]=Ls(t)}_extractQuery(t){let n=t.indexOf("?");return n===-1?{}:Bs(t.slice(n+1))}getArguments(t){let n=this.regex.exec(t),r=n&&n.slice(1);if(!r)return;let o=this._extractQuery(t);return r.forEach((a,i)=>{let s=i===r.length-1?a||"":a?decodeURIComponent(a):"";o[this.parameters[i]]=s}),o}test(t){return this.regex.test(t)}toString(){return this.path}},Zn=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new Qn(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let n=this.definition.render();n[nr]=this;for(let r in t)t[r]!==void 0&&(n[r]=t[r]);return n}},Kn=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(n=>n.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(n=>n.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function zs(e){return e[nr]}function tt(e){let t=Ps.exec(e);return{path:Ao(t?.[1]||""),hash:t?.[2]||""}}var js={getHref(e){return e=typeof e=="string"?tt(e):e,`${ee.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ee.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&ee.history.pushState({url:e},"",n)}},deserialize(){return{path:ee.location.search.slice(1),hash:ee.location.hash.slice(1)}}},Hs={getHref(e){return e=typeof e=="string"?tt(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ee.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&ee.history.pushState({url:e},"",n||"/")}},deserialize(){return{path:ee.location.pathname,hash:ee.location.hash.slice(1)}}},Mo={getHref(e){return e=typeof e=="string"?tt(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Mo.getHref(e);ee.location.hash!==t&&(ee.location.hash=t)},deserialize(){return tt(ee.location.hash.slice(1))}},No={hash:Mo,path:Hs,query:js},er=class{callbackFn;state;routes=new Kn;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let n=new Zn(t);return this.routes.register(n),n}go(t){this.lastGo=t;let n=typeof t=="string"?tt(t):t,r=n.path,o=this.state?.url;if(r!==o?.path){let a=this.routes.findRoute(r);if(!a)throw new Error(`Path: "${r}" not found`);let i=a.path?.getArguments(r);if(a.redirectTo)return this.go(Jn(a.redirectTo,i));let s=this.execute(a,i);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:n,arguments:i,route:a,current:s,root:this.root})}else this.state&&n.hash!=o?.hash&&this.updateState({...this.state,url:n})}getPath(t,n){let r=this.routes.get(t),o=r&&r.path;return o&&Jn(o.toString(),n)}isActiveUrl(t){let n=tt(t);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(o=>{let a=o[nr],i=this.state?.arguments;if(a?.path?.test(n.path)&&(!n.hash||n.hash===r.hash)){if(i){let s=a.path.getArguments(n.path);for(let c in s)if(i[c]!=s[c])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,n){let r=this.instances[t],o;if(r)for(o in n){let a=n[o];a!==void 0&&(r[o]=a)}return r}executeRoute(t,n,r){let o=t.parent,a=o&&this.routes.get(o),i=t.id,s=a&&this.executeRoute(a,n,r),c=this.findRoute(i,n)||t.create(n);return s?c&&c.parentNode!==s&&s.appendChild(c):this.root=c,r[i]=c,c}discardOldRoutes(t){let n=this.instances;for(let r in n){let o=n[r];t[r]!==o&&(o.parentNode?.removeChild(o),delete n[r])}}execute(t,n){let r={},o=this.executeRoute(t,n||{},r);return this.discardOldRoutes(r),this.instances=r,o}},kt=new Ue,To=new Ue,ae=new er(()=>kt.next());function Us(e,t=No.query){return v(q(()=>To.next(t)),e.tap(()=>ae.go(t.deserialize())),kt.tap(()=>t.serialize(ae.getState().url))).catchError(n=>{if(n?.name==="SecurityError")return I;throw n})}function Gs(){return ue(z(location.hash.slice(1)),R(window,"hashchange").map(()=>location.hash.slice(1)))}var ln;function Vs(){if(!ln){ln=new at(history.state);let e=history.pushState;history.pushState=function(...t){let n=e.apply(this,t);return history.state&&(history.state.lastAction="push"),ln.next(history.state),n}}return v(R(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),ln)}function Ws(){let e;return v(Gs(),Vs()).map(()=>window.location).filter(t=>{let n=t.href!==e;return e=t.href,n})}var op=kt.raf().map(()=>{let e=[],t=ae.getState(),n=t.current;do n.routeTitle&&e.unshift({title:n.routeTitle,first:n===t.current,path:Ys(n)});while(n=n.parentNode);return e});function Ys(e){let t=zs(e);return t&&Jn(t.path?.toString()||"",ae.state?.arguments||{})}function _o(e,t,n=t){return v(J(To,ye(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),Q(t).tap(r=>{e.target||r.preventDefault()}),Q(n).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):ae.go(e.href))}))}function Xs(e,t){let n=document.createElement("div");return n.style.display="contents",n.routeTitle=t,n.appendChild(e.content.cloneNode(!0)),n}var tr=class extends x{strategy="query";get state(){return ae.state}go(t){return ae.go(t)}};u(tr,{tagName:"c-router",init:[b("strategy")],augment:[e=>{function t(n){let r=n.dataset;if(r.registered)return;r.registered="true";let o=r.title||void 0;ae.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:n.hasAttribute("data-default"),redirectTo:r.redirectto,render:Xs.bind(null,n,o)})}return Ie().switchMap(()=>{for(let n of Array.from(e.children))n instanceof HTMLTemplateElement&&t(n);return v(Gt(e).tap(n=>{n.type==="added"&&n.value instanceof HTMLTemplateElement&&t(n.value)}),E(e,"strategy").switchMap(n=>{let r=No[n];return Us(Ws(),r).catchError((o,a)=>(console.error(o),a))}))})}]});function or(e,t=e){return v(qs(e,t).ignoreElements(),kt.map(()=>e.href!==void 0&&ae.isActiveUrl(e.href)))}function qs(e,t=e){let n=F("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return n.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,j(e).append(n),v(_o(e,n),R(n,"click").tap(r=>{r.stopPropagation(),lt(r)||e.dispatchEvent(new PointerEvent(r.type,r)),Fe(e,"toggle.close",void 0)}),Q(t).tap(r=>{lt(r)&&n.click()}))}var rr=class extends x{href};u(rr,{tagName:"c-router-selectable",init:[b("href")],augment:[qt,()=>F("slot"),e=>X(()=>{let t=e.parentElement;return or(e,t).raf(n=>{t.selected=n})})]});var Ct=class extends Be{href;external=!1;target};u(Ct,{tagName:"c-router-item",init:[b("href"),b("external"),b("target")],augment:[e=>or(e).tap(t=>{e.selected=t})]});var ce=class extends x{font};u(ce,{tagName:"c-t",init:[C("font")],augment:[y(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${Zr.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${L("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${L("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${L("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${L("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${L("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${L("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),O,e=>E(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var At=class extends Le{};u(At,{tagName:"c-toolbar",augment:[y(`
:host {
	grid-column-end: span 12;
	column-gap: 24px;
	row-gap: 8px;
	align-items: center;
	min-height: 48px;
	flex-wrap: wrap;
	flex-shrink: 0;
}
${G("small",":host{column-gap:24px}")}
		`)]});var ir=class extends ft{sticky=!0};u(ir,{tagName:"doc-appbar",augment:[e=>{e.append(k(At,{id:"appbar-toolbar"},k(St,{target:"navbar"}),k(Le,{grow:!0},CONFIG.packageName),k(vt,{persistkey:"3doc.theme"})))}]});var sr=class extends x{};u(sr,{tagName:"doc-card",augment:[y(`
:host{margin-top: 16px; display:block; elevation:1; }
${G("medium",":host{padding:16px}")}
		`),()=>k("slot")]});var Qo=bi(Jo(),1);var Tt=Qo.default;function Zo(e){let t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r=/[\p{L}0-9._:-]+/u,o={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},i=e.inherit(a,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),c=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),f={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:r,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[o]},{begin:/'/,end:/'/,contains:[o]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,c,s,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,i,c,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},o,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[c]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[f],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[f],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:f}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}Tt.registerLanguage("html",Zo);var hr=class extends x{formatter=t=>'<link rel="stylesheet" href="hljs.css" /><code style="white-space:pre;min-height:100%;font:var(--cxl-font-code);tab-size:2;">'+Tt.highlight(t,{language:"html"}).value+"</code>"};u(hr,{tagName:"doc-hl",augment:[y(`
:host { display: block; }
.hljs { white-space: pre-wrap; font: var(--cxl-font-code); padding:16px; }
	`),e=>{let t=k("div",{className:"hljs"});return t.style.tabSize="4",j(e).append(t),Ie().switchMap(()=>Wt(e).raf(()=>{let n=e.childNodes[0]?.textContent?.trim()||"";n&&e.formatter&&(n=e.formatter(n)),t.innerHTML=n}))}]});var gr=class extends x{};u(gr,{tagName:"doc-grd",augment:[y(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${G("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${G("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${G("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),O]});var _t=class extends x{summary;selected};u(_t,{tagName:"doc-nav-list",init:[fe("summary"),fe("selected")],augment:[e=>Co({source:E(e,"summary").map(t=>t?.index),render:t=>k(Be,{$:n=>Q(n).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?k(bt,{size:-2},"beta"):void 0)})(e)]});var Rt=class extends x{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;formatter;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};u(Rt,{tagName:"doc-demo-bare",init:[b("view"),b("libraries"),b("header")],augment:[y(`
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
	`),e=>{let t=E(e,"view"),n=be("container"),r=k(Et,{className:n}),o=k(We,{$:S=>De(S).tap(()=>{e.formatter?S.innerHTML=e.formatter(c):S.innerText=c}),className:t.map(S=>S==="source"?"source visible hljs":"source")}),a=k(xt,{$:S=>Q(S).tap(()=>e.view="source"),className:E(e,"view").map(S=>S==="source"?"hide":""),title:"See source"},k(Se,{name:"code"}),"Code"),i=k(se,{$:S=>Q(S).tap(()=>e.view="mobile"),height:20,className:E(e,"view").map(S=>S==="source"?"":"hide"),icon:"close",title:"Close source"}),s=k("div",{id:"toolbar"},k("slot",{name:"toolbar"}),k(se,{$:S=>Q(S).tap(async()=>{await navigator.clipboard.writeText(c),S.icon="done",setTimeout(()=>S.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(S=>S==="source"?"icon":"icon hide")}),a,i),c;function f(S){let te=S==="desktop";n.next(te?"container":"container cmobile")}function T(){let S=e.childNodes[0]?.textContent?.trim()||"";if(!S)return;let te=e.libraries?e.libraries.split(",").map(B=>`<script type="module" src="${e.getLibraryUrl(B)}"><\/script>`).join(""):"";r.srcdoc=`${e.header}${te}${S}`,c=S}return j(e).append(s,k(We,{className:t.map(S=>S==="source"?"parent":`parent visible ${S}`)},r),o),v(E(e,"view").tap(f),De(e).switchMap(()=>Wt(e).raf(T)))}]});var Ot=class extends Rt{header=`<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>${CONFIG.demoStyles?`<style>${CONFIG.demoStyles}</style>`:""}${CONFIG.demoScripts?.map(t=>`<script type="module" src="${t}"><\/script>`).join("")??""}`;formatter=t=>'<link rel="stylesheet" href="hljs.css" />'+Tt.highlight(t,{language:"html"}).value};u(Ot,{tagName:"doc-demo"});function Ko(e){let t=e.index;function n(s){if(!(!s||typeof s=="string")&&typeof s=="number")return t.find(c=>c.id===s)}function r(s){if(!(!s||typeof s=="string")){if(typeof s=="number"){let c=t.find(f=>f.id===s);return c&&(c.kind===4||c.kind===8)?c:c?r(c.resolvedType??c.type):void 0}return s.kind===6?n(s.type):s.resolvedType&&typeof s.resolvedType!="string"?s.resolvedType:s}}function o(s,c){if(s.children){for(let f of s.children)!f.name||f.flags&&f.flags&128||(c[f.name]??=f);return c}}function a(s,c={}){o(s,c);let f=r(s.type);if(f?.children)for(let T of f.children){let S=r(T);if(!S||S.kind!==35||S.name==="Component")break;a(S,c)}return c}function i(s){return s.kind===17||s.kind===16||s.kind===11||s.kind===13}return{getNodeProperties:a,getTypeSummary:r,isFunction:i,getRef:n,json:e}}var ja={31:"Constants",1:"Variables",4:"Interfaces",8:"Classes",10:"Properties",11:"Methods",12:"Getters",13:"Setters",14:"Constructor",16:"Functions",22:"Enums",35:"Components",36:"Attributes",2:"Type Alias",38:"Call Signature",39:"Construct Signature",44:"Events",24:"Index Signature",25:"Exports",37:"Namespaces"};function ei(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function Ha(e){return e.name?`docs/ui-${e.name}`:void 0}function Ua(e){let t=Ha(e),n=e.name??"?";return t?k("a",{href:t},n):n}function ti({summary:e,summaryJson:t,link:n=Ua,uiCdn:r,importmap:o,codeHighlight:a}){let{getTypeSummary:i,getRef:s,isFunction:c}=Ko(t),f=t.index;function T(m){if(m)return typeof m=="string"?m:i(m)??(typeof m=="number"?void 0:m.name)}function S(m){return m?"&lt;"+m.map(h=>B(h)+(h.kind!==6&&h.type?` extends ${B(h.type)}`:"")).join(", ")+"&gt;":""}function te(m){return["{ ",...m.children?.map(Ne).flatMap(it("; "))??[]," }"]}function B(m){let h=T(m);if(!h||typeof h=="string")return[h||"?"];switch(h.kind){case 5:return h.children?.map(B).flatMap(it(" | "))??[];case 23:case 32:return[h.name??"?"];case 34:return te(h)??["?"];case 15:return[...B(h.type),"[]"];case 4:case 8:case 35:{let l=h.typeP?S(h.typeP):void 0;return[n(h),l]}case 17:return Ne(h);case 33:{let l=s(m);return[l?n(l):h.name??"?"]}case 21:return[...B(h.children?.[0]),"[",...B(h.children?.[1]),"]"];default:console.log(h)}return[]}function Me(m){let h=m.flags??0;return[`${`${h&4?"public ":h&8?"private":h&16?"protected ":""}${h&262144?"...":""}${m.name}${h&524288?"?":""}`}: `,...B(m.type)]}function me(m){return["(",...m?.map(Me).flatMap(it(", "))??[],")"]}function he(m){let h=m.flags??0,l=m.kind===12?"get ":m.kind===13?"set ":void 0;return[h&32?"static ":"",h&64?"readonly ":"",h&128?"abstract ":"",l]}function ot(m){return["[",...m.parameters?.flatMap(Ne)??[]??[],"]: ",...m.type?B(m.type)??[]:["?"]]}function it(m){return(h,l)=>l!==0?[...m,...h]:h}function Ne(m){if(m.kind===24)return ot(m);if(m.kind===45&&m.children?.[0])return["...",...B(m.children[0])];let h=m.flags&&m.flags&524288,l=c(m)?me(m.parameters):[],p=m.kind===17;return[...he(m),m.name,h?"?":"",...l,p?" => ":": ",...B(m.resolvedType??m.type)]}function He(m){return[k("h3",{},k(ce,{font:"title-large"},...Ne(m))),...st(m)]}function It(m,h){if(!m.children)return[];let l={};for(let p of m.children)p.kind!==14&&p.kind!==0&&(p.flags||0)&4&&!h?.(p)&&(l[p.kind]??={name:ja[p.kind],nodes:[]}).nodes.push(p);return Object.values(l).sort(wo("name")).flatMap(p=>[k("h2",{},p.name),...p.nodes.flatMap(He)])}function mn(m){let h;m=m.replace(/<caption>(.+?)<\/caption>/,(M,P)=>(h=P,""));let l=`<style>body{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:0 24px 24px 24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,p=(o??"")+`<script type="module" src="${r}"><\/script>`,g=k(Ot,{header:l+p,formatter:a},m);return[h?k(ce,{font:"title-medium"},h):void 0,g]}function hn(m){return f.find(h=>h.name===m)}function re(m){let h=m.flatMap(l=>{let p=l.value,g=ei(p);if(typeof p=="string"){let M=hn(p);g=M?n(M):p}return[g,", "]});return h.pop(),k("p",{},"Related: ",h)}function $t({src:m}){let h=k("div");return h.textContent=m,h}function st(m){let h=m.docs;if(!h||!h.content)return[];let l=[],p=h.content.flatMap(g=>{let M=ei(g.value);return g.tag==="icon"||g.tag==="title"?[]:g.tag==="example"||g.tag==="demo"||g.tag==="demoonly"?mn(M):g.tag==="see"?(l.push(g),[]):g.tag==="return"?[k(ce,{font:"headline-small"},"Returns"),k("p",void 0,M)]:g.tag==="param"?[k("p",void 0,M)]:[g.tag?k("p",void 0,`${g.tag}: `,M):$t({src:M})]});return l.length&&p.push(re(l)),p}function gn(m){let h=[],l=i(m);if(!(!l||l.kind!==33))return l.children?.forEach(p=>{if(typeof p!="object")return;let g=i(p);g&&g.name!=="Component"&&h.push(n(g))}),k(ce,{font:"headline-small"}," ",...h.length?["extends ",h]:[])}function Ft(m){let h=i(m.type),l=[];if(!h?.children)return[];for(let p of h.children){let g=i(p);if(!g||g.kind!==35||g.name==="Component")break;let M=It(g,P=>!!((P.flags??0)&128));M.length&&l.push(k("br"),k(ce,{font:"h6"},"Inherited from ",n(g)),...M),l.push(...Ft(g))}return l}let Pt=e.kind===35&&e.docs?.tagName;return k("div",{},k("h1",{},e.name," ",e.type&&gn(e.type)," ",Pt?k(ce,{font:"title-medium"},`<${Pt}>`):""),...st(e),...It(e),...Ft(e))}var Dt=class extends x{name;summary;uicdn;importmap=""};u(Dt,{tagName:"doc-page",init:[fe("name"),fe("summary"),fe("uicdn")],augment:[e=>ye(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,n=e.summary.index.find(r=>r.name===t);n&&e.append(ti({summary:n,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});var xr=class extends gt{summary;sheetstart=!0};u(xr,{tagName:"doc-root",augment:[e=>{let t=ct();fetch("summary.json").then(r=>r.json()).then(r=>t.next(r));let n=k(_t,{slot:"start",summary:t});e.append(n,k(Dt,{summary:t,name:E(n,"selected")}))}]});var br=class extends Ct{};u(br,{tagName:"doc-item"});export{hr as BlogCode,rn as Body,xr as ComponentList,ir as DocAppbar,sr as DocCard,gr as DocGrid,br as DocItem,sn as Drawer,Se as Icon,_t as NavList,Dt as Page,cn as UiPage};
