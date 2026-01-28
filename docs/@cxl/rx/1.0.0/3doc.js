var us=Object.create;var _r=Object.defineProperty;var ps=Object.getOwnPropertyDescriptor;var ds=Object.getOwnPropertyNames;var fs=Object.getPrototypeOf,ms=Object.prototype.hasOwnProperty;var gs=(e,t)=>()=>(e&&(t=e(e=0)),t);var hs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),xs=(e,t)=>{for(var n in t)_r(e,n,{get:t[n],enumerable:!0})},bs=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of ds(t))!ms.call(e,o)&&o!==n&&_r(e,o,{get:()=>t[o],enumerable:!(r=ps(t,o))||r.enumerable});return e};var ys=(e,t,n)=>(n=e!=null?us(fs(e)):{},bs(t||!e||!e.__esModule?_r(n,"default",{value:e,enumerable:!0}):n,e));var xi={};xs(xi,{default:()=>ec,theme:()=>hi});var Ks,hi,ec,bi=gs(()=>{"use strict";Ks={primary:"#8ECFF2","on-primary":"#003548","primary-container":"#004D67","on-primary-container":"#C1E8FF",secondary:"#B5C9D7","on-secondary":"#1F333D","secondary-container":"#364954","on-secondary-container":"#D1E6F3",tertiary:"#C9C2EA","on-tertiary":"#312C4C","tertiary-container":"#474364","on-tertiary-container":"#E5DEFF",error:"#FFB4AB","on-error":"#690005","error-container":"#93000A","on-error-container":"#FFDAD6",background:"#0F1417","on-background":"#DFE3E7",surface:"#0F1417","on-surface":"#DFE3E7","surface-variant":"#40484D","on-surface-variant":"#C0C7CD",outline:"#8A9297","outline-variant":"#40484D",scrim:"rgb(0 0 0 / 0.5)","inverse-surface":"#DFE3E7","on-inverse-surface":"#2C3134","inverse-primary":"#186584","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#0F1417","surface-bright":"#353A3D","surface-container-lowest":"#0A0F12","surface-container-low":"#171C1F","surface-container":"#1B2023","surface-container-high":"#262B2E","surface-container-highest":"#313539",warning:"#FFC107","on-warning":"#212121","warning-container":"#4E3400","on-warning-container":"#FFF3CF",success:"#81C784","on-success":"#000","success-container":"#2E7D32","on-success-container":"#fff"},hi={name:"dark",colors:Ks},ec=hi});var Ya=hs((Hb,Ga)=>{"use strict";function Oa(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let n=e[t],r=typeof n;(r==="object"||r==="function")&&!Object.isFrozen(n)&&Oa(n)}),e}var Sr=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Da(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function nt(e,...t){let n=Object.create(null);for(let r in e)n[r]=e[r];return t.forEach(function(r){for(let o in r)n[o]=r[o]}),n}var Yl="</span>",Na=e=>!!e.scope,Wl=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,o)=>`${r}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`},$o=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Da(t)}openNode(t){if(!Na(t))return;let n=Wl(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Na(t)&&(this.buffer+=Yl)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Ma=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Ho=class e{constructor(){this.rootNode=Ma(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=Ma({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{e._collapse(n)}))}},Uo=class extends Ho{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){let r=t.root;n&&(r.scope=`language:${n}`),this.add(r)}toHTML(){return new $o(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Dn(e){return e?typeof e=="string"?e:e.source:null}function La(e){return Et("(?=",e,")")}function ql(e){return Et("(?:",e,")*")}function Zl(e){return Et("(?:",e,")?")}function Et(...e){return e.map(n=>Dn(n)).join("")}function Xl(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Go(...e){return"("+(Xl(e).capture?"":"?:")+e.map(r=>Dn(r)).join("|")+")"}function Fa(e){return new RegExp(e.toString()+"|").exec("").length-1}function Jl(e,t){let n=e&&e.exec(t);return n&&n.index===0}var Ql=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Yo(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;let o=n,c=Dn(r),i="";for(;c.length>0;){let a=Ql.exec(c);if(!a){i+=c;break}i+=c.substring(0,a.index),c=c.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+o):(i+=a[0],a[0]==="("&&n++)}return i}).map(r=>`(${r})`).join(t)}var Kl=/\b\B/,Pa="[a-zA-Z]\\w*",Wo="[a-zA-Z_]\\w*",za="\\b\\d+(\\.\\d+)?",Ba="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",ja="\\b(0b[01]+)",eu="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",tu=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Et(t,/.*\b/,e.binary,/\b.*/)),nt({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},Ln={begin:"\\\\[\\s\\S]",relevance:0},nu={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ln]},ru={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ln]},ou={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ar=function(e,t,n={}){let r=nt({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let o=Go("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:Et(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},iu=Ar("//","$"),au=Ar("/\\*","\\*/"),su=Ar("#","$"),cu={scope:"number",begin:za,relevance:0},lu={scope:"number",begin:Ba,relevance:0},uu={scope:"number",begin:ja,relevance:0},pu={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Ln,{begin:/\[/,end:/\]/,relevance:0,contains:[Ln]}]},du={scope:"title",begin:Pa,relevance:0},fu={scope:"title",begin:Wo,relevance:0},mu={begin:"\\.\\s*"+Wo,relevance:0},gu=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},Er=Object.freeze({__proto__:null,APOS_STRING_MODE:nu,BACKSLASH_ESCAPE:Ln,BINARY_NUMBER_MODE:uu,BINARY_NUMBER_RE:ja,COMMENT:Ar,C_BLOCK_COMMENT_MODE:au,C_LINE_COMMENT_MODE:iu,C_NUMBER_MODE:lu,C_NUMBER_RE:Ba,END_SAME_AS_BEGIN:gu,HASH_COMMENT_MODE:su,IDENT_RE:Pa,MATCH_NOTHING_RE:Kl,METHOD_GUARD:mu,NUMBER_MODE:cu,NUMBER_RE:za,PHRASAL_WORDS_MODE:ou,QUOTE_STRING_MODE:ru,REGEXP_MODE:pu,RE_STARTERS_RE:eu,SHEBANG:tu,TITLE_MODE:du,UNDERSCORE_IDENT_RE:Wo,UNDERSCORE_TITLE_MODE:fu});function hu(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function xu(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function bu(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=hu,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function yu(e,t){Array.isArray(e.illegal)&&(e.illegal=Go(...e.illegal))}function vu(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function wu(e,t){e.relevance===void 0&&(e.relevance=1)}var Eu=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=Et(n.beforeMatch,La(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Su=["of","and","for","in","not","or","if","then","parent","list","value"],Cu="keyword";function $a(e,t,n=Cu){let r=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(c){Object.assign(r,$a(e[c],t,c))}),r;function o(c,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let s=a.split("|");r[s[0]]=[c,Au(s[0],s[1])]})}}function Au(e,t){return t?Number(t):ku(e)?0:1}function ku(e){return Su.includes(e.toLowerCase())}var Ta={},wt=e=>{console.error(e)},Ra=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Vt=(e,t)=>{Ta[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Ta[`${e}/${t}`]=!0)},Cr=new Error;function Ha(e,t,{key:n}){let r=0,o=e[n],c={},i={};for(let a=1;a<=t.length;a++)i[a+r]=o[a],c[a+r]=!0,r+=Fa(t[a-1]);e[n]=i,e[n]._emit=c,e[n]._multi=!0}function Nu(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw wt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Cr;if(typeof e.beginScope!="object"||e.beginScope===null)throw wt("beginScope must be object"),Cr;Ha(e,e.begin,{key:"beginScope"}),e.begin=Yo(e.begin,{joinWith:""})}}function Mu(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw wt("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Cr;if(typeof e.endScope!="object"||e.endScope===null)throw wt("endScope must be object"),Cr;Ha(e,e.end,{key:"endScope"}),e.end=Yo(e.end,{joinWith:""})}}function Tu(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ru(e){Tu(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Nu(e),Mu(e)}function _u(e){function t(i,a){return new RegExp(Dn(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,s){s.position=this.position++,this.matchIndexes[this.matchAt]=s,this.regexes.push([s,a]),this.matchAt+=Fa(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(s=>s[1]);this.matcherRe=t(Yo(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let s=this.matcherRe.exec(a);if(!s)return null;let l=s.findIndex((A,T)=>T>0&&A!==void 0),b=this.matchIndexes[l];return s.splice(0,l),Object.assign(s,b)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let s=new n;return this.rules.slice(a).forEach(([l,b])=>s.addRule(l,b)),s.compile(),this.multiRegexes[a]=s,s}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,s){this.rules.push([a,s]),s.type==="begin"&&this.count++}exec(a){let s=this.getMatcher(this.regexIndex);s.lastIndex=this.lastIndex;let l=s.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let b=this.getMatcher(0);b.lastIndex=this.lastIndex+1,l=b.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function o(i){let a=new r;return i.contains.forEach(s=>a.addRule(s.begin,{rule:s,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function c(i,a){let s=i;if(i.isCompiled)return s;[xu,vu,Ru,Eu].forEach(b=>b(i,a)),e.compilerExtensions.forEach(b=>b(i,a)),i.__beforeBegin=null,[bu,yu,wu].forEach(b=>b(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=$a(i.keywords,e.case_insensitive)),s.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),s.beginRe=t(s.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(s.endRe=t(s.end)),s.terminatorEnd=Dn(s.end)||"",i.endsWithParent&&a.terminatorEnd&&(s.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(s.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(b){return Iu(b==="self"?i:b)})),i.contains.forEach(function(b){c(b,s)}),i.starts&&c(i.starts,a),s.matcher=o(s),s}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=nt(e.classNameAliases||{}),c(e)}function Ua(e){return e?e.endsWithParent||Ua(e.starts):!1}function Iu(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return nt(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ua(e)?nt(e,{starts:e.starts?nt(e.starts):null}):Object.isFrozen(e)?nt(e):e}var Ou="11.11.1",Vo=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},jo=Da,_a=nt,Ia=Symbol("nomatch"),Du=7,Va=function(e){let t=Object.create(null),n=Object.create(null),r=[],o=!0,c="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Uo};function s(p){return a.noHighlightRe.test(p)}function l(p){let v=p.className+" ";v+=p.parentNode?p.parentNode.className:"";let k=a.languageDetectRe.exec(v);if(k){let P=he(k[1]);return P||(Ra(c.replace("{}",k[1])),Ra("Falling back to no-highlight mode for this block.",p)),P?k[1]:"no-highlight"}return v.split(/\s+/).find(P=>s(P)||he(P))}function b(p,v,k){let P="",W="";typeof v=="object"?(P=p,k=v.ignoreIllegals,W=v.language):(Vt("10.7.0","highlight(lang, code, ...args) has been deprecated."),Vt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),W=p,P=v),k===void 0&&(k=!0);let ie={code:P,language:W};C("before:highlight",ie);let ye=ie.result?ie.result:A(ie.language,ie.code,k);return ye.code=ie.code,C("after:highlight",ye),ye}function A(p,v,k,P){let W=Object.create(null);function ie(w,M){return w.keywords[M]}function ye(){if(!O.keywords){re.addText(Y);return}let w=0;O.keywordPatternRe.lastIndex=0;let M=O.keywordPatternRe.exec(Y),D="";for(;M;){D+=Y.substring(w,M.index);let V=Ae.case_insensitive?M[0].toLowerCase():M[0],ae=ie(O,V);if(ae){let[Pe,cs]=ae;if(re.addText(D),D="",W[V]=(W[V]||0)+1,W[V]<=Du&&(Pn+=cs),Pe.startsWith("_"))D+=M[0];else{let ls=Ae.classNameAliases[Pe]||Pe;Ce(M[0],ls)}}else D+=M[0];w=O.keywordPatternRe.lastIndex,M=O.keywordPatternRe.exec(Y)}D+=Y.substring(w),re.addText(D)}function it(){if(Y==="")return;let w=null;if(typeof O.subLanguage=="string"){if(!t[O.subLanguage]){re.addText(Y);return}w=A(O.subLanguage,Y,!0,Qo[O.subLanguage]),Qo[O.subLanguage]=w._top}else w=F(Y,O.subLanguage.length?O.subLanguage:null);O.relevance>0&&(Pn+=w.relevance),re.__addSublanguage(w._emitter,w.language)}function xe(){O.subLanguage!=null?it():ye(),Y=""}function Ce(w,M){w!==""&&(re.startScope(M),re.addText(w),re.endScope())}function qo(w,M){let D=1,V=M.length-1;for(;D<=V;){if(!w._emit[D]){D++;continue}let ae=Ae.classNameAliases[w[D]]||w[D],Pe=M[D];ae?Ce(Pe,ae):(Y=Pe,ye(),Y=""),D++}}function Zo(w,M){return w.scope&&typeof w.scope=="string"&&re.openNode(Ae.classNameAliases[w.scope]||w.scope),w.beginScope&&(w.beginScope._wrap?(Ce(Y,Ae.classNameAliases[w.beginScope._wrap]||w.beginScope._wrap),Y=""):w.beginScope._multi&&(qo(w.beginScope,M),Y="")),O=Object.create(w,{parent:{value:O}}),O}function Xo(w,M,D){let V=Jl(w.endRe,D);if(V){if(w["on:end"]){let ae=new Sr(w);w["on:end"](M,ae),ae.isMatchIgnored&&(V=!1)}if(V){for(;w.endsParent&&w.parent;)w=w.parent;return w}}if(w.endsWithParent)return Xo(w.parent,M,D)}function rs(w){return O.matcher.regexIndex===0?(Y+=w[0],1):(Rr=!0,0)}function os(w){let M=w[0],D=w.rule,V=new Sr(D),ae=[D.__beforeBegin,D["on:begin"]];for(let Pe of ae)if(Pe&&(Pe(w,V),V.isMatchIgnored))return rs(M);return D.skip?Y+=M:(D.excludeBegin&&(Y+=M),xe(),!D.returnBegin&&!D.excludeBegin&&(Y=M)),Zo(D,w),D.returnBegin?0:M.length}function is(w){let M=w[0],D=v.substring(w.index),V=Xo(O,w,D);if(!V)return Ia;let ae=O;O.endScope&&O.endScope._wrap?(xe(),Ce(M,O.endScope._wrap)):O.endScope&&O.endScope._multi?(xe(),qo(O.endScope,w)):ae.skip?Y+=M:(ae.returnEnd||ae.excludeEnd||(Y+=M),xe(),ae.excludeEnd&&(Y=M));do O.scope&&re.closeNode(),!O.skip&&!O.subLanguage&&(Pn+=O.relevance),O=O.parent;while(O!==V.parent);return V.starts&&Zo(V.starts,w),ae.returnEnd?0:M.length}function as(){let w=[];for(let M=O;M!==Ae;M=M.parent)M.scope&&w.unshift(M.scope);w.forEach(M=>re.openNode(M))}let Fn={};function Jo(w,M){let D=M&&M[0];if(Y+=w,D==null)return xe(),0;if(Fn.type==="begin"&&M.type==="end"&&Fn.index===M.index&&D===""){if(Y+=v.slice(M.index,M.index+1),!o){let V=new Error(`0 width match regex (${p})`);throw V.languageName=p,V.badRule=Fn.rule,V}return 1}if(Fn=M,M.type==="begin")return os(M);if(M.type==="illegal"&&!k){let V=new Error('Illegal lexeme "'+D+'" for mode "'+(O.scope||"<unnamed>")+'"');throw V.mode=O,V}else if(M.type==="end"){let V=is(M);if(V!==Ia)return V}if(M.type==="illegal"&&D==="")return Y+=`
`,1;if(Tr>1e5&&Tr>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=D,D.length}let Ae=he(p);if(!Ae)throw wt(c.replace("{}",p)),new Error('Unknown language: "'+p+'"');let ss=_u(Ae),Mr="",O=P||ss,Qo={},re=new a.__emitter(a);as();let Y="",Pn=0,at=0,Tr=0,Rr=!1;try{if(Ae.__emitTokens)Ae.__emitTokens(v,re);else{for(O.matcher.considerAll();;){Tr++,Rr?Rr=!1:O.matcher.considerAll(),O.matcher.lastIndex=at;let w=O.matcher.exec(v);if(!w)break;let M=v.substring(at,w.index),D=Jo(M,w);at=w.index+D}Jo(v.substring(at))}return re.finalize(),Mr=re.toHTML(),{language:p,value:Mr,relevance:Pn,illegal:!1,_emitter:re,_top:O}}catch(w){if(w.message&&w.message.includes("Illegal"))return{language:p,value:jo(v),illegal:!0,relevance:0,_illegalBy:{message:w.message,index:at,context:v.slice(at-100,at+100),mode:w.mode,resultSoFar:Mr},_emitter:re};if(o)return{language:p,value:jo(v),illegal:!1,relevance:0,errorRaised:w,_emitter:re,_top:O};throw w}}function T(p){let v={value:jo(p),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return v._emitter.addText(p),v}function F(p,v){v=v||a.languages||Object.keys(t);let k=T(p),P=v.filter(he).filter(St).map(xe=>A(xe,p,!1));P.unshift(k);let W=P.sort((xe,Ce)=>{if(xe.relevance!==Ce.relevance)return Ce.relevance-xe.relevance;if(xe.language&&Ce.language){if(he(xe.language).supersetOf===Ce.language)return 1;if(he(Ce.language).supersetOf===xe.language)return-1}return 0}),[ie,ye]=W,it=ie;return it.secondBest=ye,it}function U(p,v,k){let P=v&&n[v]||k;p.classList.add("hljs"),p.classList.add(`language-${P}`)}function $(p){let v=null,k=l(p);if(s(k))return;if(C("before:highlightElement",{el:p,language:k}),p.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",p);return}if(p.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),a.throwUnescapedHTML))throw new Vo("One of your code blocks includes unescaped HTML.",p.innerHTML);v=p;let P=v.textContent,W=k?b(P,{language:k,ignoreIllegals:!0}):F(P);p.innerHTML=W.value,p.dataset.highlighted="yes",U(p,k,W.language),p.result={language:W.language,re:W.relevance,relevance:W.relevance},W.secondBest&&(p.secondBest={language:W.secondBest.language,relevance:W.secondBest.relevance}),C("after:highlightElement",{el:p,result:W,text:P})}function ee(p){a=_a(a,p)}let J=()=>{Se(),Vt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function ge(){Se(),Vt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let Le=!1;function Se(){function p(){Se()}if(document.readyState==="loading"){Le||window.addEventListener("DOMContentLoaded",p,!1),Le=!0;return}document.querySelectorAll(a.cssSelector).forEach($)}function rt(p,v){let k=null;try{k=v(e)}catch(P){if(wt("Language definition for '{}' could not be registered.".replace("{}",p)),o)wt(P);else throw P;k=i}k.name||(k.name=p),t[p]=k,k.rawDefinition=v.bind(null,e),k.aliases&&ot(k.aliases,{languageName:p})}function Fe(p){delete t[p];for(let v of Object.keys(n))n[v]===p&&delete n[v]}function Yt(){return Object.keys(t)}function he(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function ot(p,{languageName:v}){typeof p=="string"&&(p=[p]),p.forEach(k=>{n[k.toLowerCase()]=v})}function St(p){let v=he(p);return v&&!v.disableAutodetect}function Ct(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=v=>{p["before:highlightBlock"](Object.assign({block:v.el},v))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=v=>{p["after:highlightBlock"](Object.assign({block:v.el},v))})}function At(p){Ct(p),r.push(p)}function E(p){let v=r.indexOf(p);v!==-1&&r.splice(v,1)}function C(p,v){let k=p;r.forEach(function(P){P[k]&&P[k](v)})}function B(p){return Vt("10.7.0","highlightBlock will be removed entirely in v12.0"),Vt("10.7.0","Please use highlightElement now."),$(p)}Object.assign(e,{highlight:b,highlightAuto:F,highlightAll:Se,highlightElement:$,highlightBlock:B,configure:ee,initHighlighting:J,initHighlightingOnLoad:ge,registerLanguage:rt,unregisterLanguage:Fe,listLanguages:Yt,getLanguage:he,registerAliases:ot,autoDetection:St,inherit:_a,addPlugin:At,removePlugin:E}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=Ou,e.regex={concat:Et,lookahead:La,either:Go,optional:Zl,anyNumberOfTimes:ql};for(let p in Er)typeof Er[p]=="object"&&Oa(Er[p]);return Object.assign(e,Er),e},Gt=Va({});Gt.newInstance=()=>Va({});Ga.exports=Gt;Gt.HighlightJS=Gt;Gt.default=Gt});var Ye={},Pu=Symbol("terminator");function vs(e,t){let n=!1,r={error:o,unsubscribe:c,get closed(){return n},signal:new Ne,next(i){if(!n)try{e.next?.(i)}catch(a){o(a)}},complete(){if(!n)try{e.complete?.()}finally{c()}}};e.signal?.subscribe(c);function o(i){if(n)throw i;if(!e.error)throw c(),i;try{e.error(i)}finally{c()}}function c(){n||(n=!0,r.signal.next())}try{t?.(r)}catch(i){o(i)}return r}var I=class{__subscribe;constructor(t){this.__subscribe=t}then(t,n){return Es(this).then(t,n)}pipe(...t){return t.reduce((n,r)=>r(n),this)}subscribe(t){return vs(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},ke=class extends I{closed=!1;signal=new Ne;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let n of Array.from(this.observers))n.closed||n.next(t)}error(t){if(!this.closed){this.closed=!0;let n=!1,r;for(let o of Array.from(this.observers))try{o.error(t)}catch(c){n=!0,r=c}if(n)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},Ne=class extends I{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},zn=class extends ke{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},Wt=class extends ke{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let n=super.onSubscribe(t);return this.closed||t.next(this.currentValue),n}},Ir=class extends ke{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(n=>t.next(n)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},kt=class extends ke{$value=Ye;get hasValue(){return this.$value!==Ye}get value(){if(this.$value===Ye)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Ye&&t.next(this.$value),super.onSubscribe(t)}},Or=class extends Error{message="No elements in sequence"};function ze(...e){return new I(t=>{let n=0,r;function o(){let c=e[n++];c&&!t.closed?(r?.next(),c.subscribe({next:t.next,error:t.error,complete:o,signal:r=new Ne})):t.complete()}t.signal.subscribe(()=>r?.next()),o()})}function ne(e){return new I(t=>{e().subscribe(t)})}function ei(e){return new I(t=>{e.then(n=>{t.closed||t.next(n),t.complete()}).catch(n=>t.error(n))})}function qt(e){return ne(()=>ei(e()))}function ti(e){return new I(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function We(e){return e instanceof I?e:e instanceof Promise?ei(e):ti(e)}function z(...e){return ti(e)}function ws(e){return new Promise((t,n)=>{let r=Ye;e.subscribe({next:o=>r=o,error:o=>n(o),complete:()=>t(r)})})}function Es(e){return ws(e).then(t=>t===Ye?void 0:t)}function st(e,t){return Me(n=>({next:e(n),unsubscribe:t}))}function Me(e){return t=>new I(n=>{let r=e(n,t);r.unsubscribe&&n.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=n.error),r.complete||(r.complete=n.complete),r.signal=n.signal,t.subscribe(r)})}function Dr(e){return st(t=>n=>t.next(e(n)))}function Ss(e){let t=Ye;return st(n=>r=>{let o=e(r);o!==t&&(t=o,n.next(o))})}function Cs(e,t){return Me(n=>{let r=t,o=0;return{next(c){r=e(r,c,o++)},complete(){n.next(r),n.complete()}}})}function As(e){return Me(t=>{let n=!0,r;return{next(o){n&&(n=!1,t.next(o),r=setTimeout(()=>n=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function ct(e){return new I(t=>{let n=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(n))})}function ks(e,t=ct){return ni(n=>t(e).map(()=>n))}function ni(e){return t=>oe(n=>{let r=!1,o=!1,c,i=()=>{c?.next(),r=!1,o&&n.complete()},a=new Ne;n.signal.subscribe(()=>{i(),a.next()}),t.subscribe({next(s){i(),c=new Ne,r=!0,We(e(s)).subscribe({next:n.next,error:n.error,complete:i,signal:c})},error:n.error,complete(){o=!0,r||n.complete()},signal:a})})}function Ns(e){return t=>oe(n=>{let r=n.signal,o=0,c=0,i=!1;t.subscribe({next:a=>{o++,We(e(a)).subscribe({next:n.next,error:n.error,complete:()=>{c++,i&&c===o&&n.complete()},signal:r})},error:n.error,complete(){i=!0,c===o&&n.complete()},signal:r})})}function Ms(e){return Me(t=>{let n=new Ne,r,o,c=[],i=!1,a=!1,s=()=>{r?.next(),r=void 0,o=void 0,a=!1,c.length&&!t.closed?l(c.shift()):i&&t.complete()},l=b=>{a=!0,r=new Ne,o=We(e(b)).subscribe({next:t.next,error:t.error,complete:s,signal:r})};return t.signal.subscribe(()=>{r?.next(),n.next()}),{next(b){a?c.push(b):l(b)},error:t.error,complete(){i=!0,!a&&c.length===0&&t.complete()},signal:n,unsubscribe:()=>o?.unsubscribe()}})}function Ts(e){return Me(t=>{let n=!0;return{next(r){n&&(n=!1,We(e(r)).subscribe({next:t.next,error:t.error,complete:()=>n=!0,signal:t.signal}))}}})}function Bn(e){return st(t=>n=>{e(n)&&t.next(n)})}function Rs(e){return st(t=>n=>{e-- >0&&!t.closed&&t.next(n),(e<=0||t.closed)&&t.complete()})}function _s(e){return st(t=>n=>{!t.closed&&e(n)?t.next(n):t.complete()})}function Is(){let e=!1;return Me(t=>({next(n){e||(e=!0,t.next(n),t.complete())},complete(){t.closed||t.error(new Or)}}))}function Zt(e){return st(t=>n=>{e(n),t.next(n)})}function Os(e){return Me((t,n)=>{let r,o={next:t.next,error(c){try{if(t.closed)return;let i=e(c,n);r?.next(),r=new Ne,i.subscribe({...o,signal:r})}catch(i){t.error(i)}},unsubscribe:()=>r?.next()};return o})}function Ds(){return st(e=>{let t=Ye;return n=>{n!==t&&(t=n,e.next(n))}})}function Ls(){return e=>{let t=new Ir(1),n=!1;return oe(r=>{t.subscribe(r),n||(n=!0,e.subscribe(t))})}}function Fs(){return e=>{let t,n=0;function r(){--n===0&&t.signal.next()}return oe(o=>{o.signal.subscribe(r),n++===0?(t=lt(),t.subscribe(o),e.subscribe(t)):t.subscribe(o)})}}function Ps(){return e=>{let t=new ke,n,r,o=!1,c=!1;return oe(i=>{c?(i.next(r),i.complete()):t.subscribe(i),n??=e.subscribe({next:a=>{o=!0,r=a},error:i.error,complete(){c=!0,o&&t.next(r),t.complete()},signal:i.signal})})}}function m(...e){return e.length===1?e[0]:new I(t=>{let n=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){n--===1&&t.complete()},signal:t.signal})})}function le(...e){return e.length===0?R:new I(t=>{let n=e.length,r=n,o=0,c=!1,i=new Array(n),a=new Array(n);e.forEach((s,l)=>s.subscribe({next(b){a[l]=b,i[l]||(i[l]=!0,++o>=r&&(c=!0)),c&&t.next(a.slice(0))},error:t.error,complete(){--n<=0&&t.complete()},signal:t.signal}))})}function zs(e){return Me(t=>({next:t.next,unsubscribe:e}))}function Bs(){return Bn(()=>!1)}var R=new I(e=>e.complete());function ue(e){return new Wt(e)}function oe(e){return new I(e)}function ri(){return new ke}function lt(){return new kt}var Ko={catchError:Os,concatMap:Ms,debounceTime:ks,distinctUntilChanged:Ds,exhaustMap:Ts,filter:Bn,finalize:zs,first:Is,ignoreElements:Bs,map:Dr,mergeMap:Ns,publishLast:Ps,reduce:Cs,select:Ss,share:Fs,shareLatest:Ls,switchMap:ni,take:Rs,takeWhile:_s,tap:Zt,throttleTime:As};for(let e in Ko)I.prototype[e]=function(...t){return this.pipe(Ko[e](...t))};function S(e,t,n){return new I(r=>{let o=r.next.bind(r);e.addEventListener(t,o,n),r.signal.subscribe(()=>e.removeEventListener(t,o,n))})}function jn(e){return Lr(e,{childList:!0})}function $n(e,t){return Lr(e,{attributes:!0,attributeFilter:t})}function Lr(e,t={attributes:!0,childList:!0}){return new I(n=>{let r=new MutationObserver(o=>o.forEach(c=>{for(let i of c.addedNodes)n.next({type:"added",target:e,value:i});for(let i of c.removedNodes)n.next({type:"removed",target:e,value:i});c.type==="characterData"?n.next({type:"characterData",target:e}):c.attributeName&&n.next({type:"attribute",target:e,value:c.attributeName})}));r.observe(e,t),n.signal.subscribe(()=>r.disconnect())})}function Hn(e){return S(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function te(e){return S(e,"click")}function Un(e,t){return new I(n=>{let r=new IntersectionObserver(o=>{for(let c of o)n.next(c)},t);r.observe(e),n.signal.subscribe(()=>r.disconnect())})}function oi(e){return Un(e).map(t=>t.isIntersecting)}function Te(e){return Un(e).filter(t=>t.isIntersecting).first()}function js(e){let t;return function(...n){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,n),t=0})}}function ii(e){return Me(t=>{let n=js(o=>{t.closed||(e&&e(o),t.next(o),r&&t.complete())}),r=!1;return{next:n,complete:()=>r=!0}})}function ai(){return ne(()=>document.readyState!=="loading"?z(!0):S(window,"DOMContentLoaded").first().map(()=>!0))}function Nt(e,t,n){let r=new CustomEvent(t,n);e.dispatchEvent(r)}function Vn(e,t){let n;return m(ne(()=>(n=e.childNodes,n?z(void 0):R)),Be().switchMap(()=>e.childNodes!==n?z(void 0):R),Lr(e,{childList:!0,...t}).map(()=>{}))}function Be(){return ne(()=>document.readyState==="complete"?z(!0):S(window,"load").first().map(()=>!0))}function Gn(...e){return new I(t=>{let n=new ResizeObserver(r=>r.forEach(o=>t.next(o)));for(let r of e)n.observe(r);t.signal.subscribe(()=>n.disconnect())})}function Xt(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function Fr(e,t,n){return r=>ze(z(e?r.matches(e):!1),S(r,t).switchMap(()=>m(z(!0),S(r,n).map(()=>e?r.matches(e):!1))))}var ju=Fr("","animationstart","animationend"),Pr=Fr("","mouseenter","mouseleave"),$s=Fr(":focus,:focus-within","focusin","focusout"),zr=e=>le(Pr(e),$s(e)).map(([t,n])=>t||n);function si(e,t,n){return t=t?.toLowerCase(),S(e,"keydown",n).filter(r=>!t||r.key?.toLowerCase()===t)}function Jt(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function ut(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var Hs=Zt(e=>console.trace(e));I.prototype.log=function(){return this.pipe(Hs)};I.prototype.raf=function(e){return this.pipe(ii(e))};var se=Symbol("bindings"),Us={},Mt=Symbol("augments"),pt=Symbol("parser"),jr=class{bindings;messageHandlers;internals;attributes$=new zn;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,n){let r=!1;if(this.messageHandlers)for(let o of this.messageHandlers)o.type===t&&(o.next(n),r||=o.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let n of this.bindings)t.push(n.subscribe());if(this.prebind)for(let n of this.prebind)t.push(n.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},Wn=Symbol("css"),g=class extends HTMLElement{static observedAttributes;static[Mt];static[pt];[se]=new jr;[Wn];connectedCallback(){this[se].wasInitialized=!0,this[se].wasConnected||this.constructor[Mt]?.forEach(t=>t(this)),this[se].connect()}disconnectedCallback(){this[se].disconnect()}attributeChangedCallback(t,n,r){let o=this.constructor[pt]?.[t]??Vs;n!==r&&(this[t]=o(r,this[t]))}};function Vs(e,t){let n=t===!1||t===!0;return e===""?n?!0:"":e===null?n?!1:void 0:e}function ci(e,t){e.hasOwnProperty(Mt)||(e[Mt]=e[Mt]?.slice(0)??[]),e[Mt]?.push(t)}var Gs={mode:"open"};function j(e){return e.shadowRoot??e.attachShadow(Gs)}function li(e,t){t instanceof Node?j(e).appendChild(t):e[se].add(t)}function Ys(e,t){t.length&&ci(e,n=>{for(let r of t){let o=r.call(e,n);o&&o!==n&&li(n,o)}})}function Ws(e,t){Us[e]=t,customElements.define(e,t)}function Re(e){return e[se].internals??=e.attachInternals()}function u(e,{init:t,augment:n,tagName:r}){if(t)for(let o of t)o(e);n&&Ys(e,n),r&&Ws(r,e)}function qe(e){return ze(z(e),e[se].attributes$.map(()=>e))}function G(e,t){return e[se].attributes$.pipe(Bn(n=>n.attribute===t),Dr(()=>e[t]))}function h(e,t){return m(G(e,t),ne(()=>z(e[t])))}function qs(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function Qt(e,t,n){return n===!1||n===null||n===void 0?n=null:n===!0&&(n=""),n===null?e.removeAttribute(t):e.setAttribute(t,String(n)),n}function Zs(e,t,n){e.hasOwnProperty(pt)||(e[pt]={...e[pt]}),e[pt]&&(e[pt][t]=n)}function x(e,t){return n=>{t?.observe!==!1&&qs(n).push(e),t?.parse&&Zs(n,e,t.parse);let r=`$$${e}`,o=n.prototype,c=Object.getOwnPropertyDescriptor(o,e);c&&Object.defineProperty(o,r,c);let i=t?.persist,a={enumerable:!0,configurable:!1,get(){return this[r]},set(s){this[r]!==s?(this[r]=s,i?.(this,e,s),this[se].attributes$.next({target:this,attribute:e,value:s})):c?.set&&(i?.(this,e,s),this[r]=s)}};ci(n,s=>{if(c||(s[r]=s[e]),Object.defineProperty(s,e,a),i?.(s,e,s[e]),t?.render){let l=t.render(s);l&&li(s,l)}})}}function y(e){return x(e,{persist:Qt,observe:!0})}function qn(e){let t=`on${e}`;return x(t,{render(n){return h(n,t).switchMap(r=>r?new I(o=>{let c=i=>{i.target===n&&n[t]?.call(n,i)};n.addEventListener(e,c),o.signal.subscribe(()=>n.removeEventListener(e,c))}):R)},parse(n){return n?new Function("event",n):void 0}})}function Z(e){return x(e,{observe:!1})}function _(){return document.createElement("slot")}function ui(e){return t=>{let[n,r]=e();return t[se].add(n),r}}function Xs(e,t){let n=document.createTextNode("");return e[se].add(t.tap(r=>n.textContent=r)),n}var Br=document.createDocumentFragment();function Yn(e,t,n=e){if(t!=null)if(Array.isArray(t)){for(let r of t)Yn(e,r,Br);n!==Br&&n.appendChild(Br)}else e instanceof g&&t instanceof I?n.appendChild(Xs(e,t)):t instanceof Node?n.appendChild(t):e instanceof g&&typeof t=="function"?Yn(e,t(e),n):n.appendChild(document.createTextNode(t))}function pi(e,t){for(let n in t){let r=t[n];e instanceof g?r instanceof I?e[se].add(n==="$"?r:r.tap(o=>e[n]=o)):n==="$"&&typeof r=="function"?e[se].add(r(e)):e[n]=r:e[n]=r}}function Js(e,t){return e.constructor.observedAttributes?.includes(t)}function di(e,t){let n=e instanceof g&&Js(e,t)?G(e,t):$n(e,[t]).map(()=>e[t]);return m(n,ne(()=>z(e[t])))}function Zn(e,t,n){return x(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let o=r===null?void 0:Number(r);return t!==void 0&&(o===void 0||o<t||isNaN(o))&&(o=t),n!==void 0&&o!==void 0&&o>n&&(o=n),o}})}function pe(e,t,n){for(let r=e.parentElement;r;r=r.parentElement)if(r[se]?.message(t,n))return}function de(e,t,n=!0){let r,o=0,c=new ke,i={type:t,next(a){o?c.next(a):(r??=[]).push(a)},stopPropagation:n};return e[se].addMessageHandler(i),new I(a=>{o===0&&r?.length&&(r.forEach(l=>a.next(l)),r.length=0),o++;let s=c.subscribe(a);a.signal.subscribe(()=>{o--,s.unsubscribe()})})}function N(e,t,...n){let r=typeof e=="string"?document.createElement(e):new e;return t&&pi(r,t),n.length&&Yn(r,n),r}function f(e,t,...n){if(e!==f&&typeof e=="function"&&!(e.prototype instanceof g))return n.length&&((t??={}).children=n),e(t);let r=e===f?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&pi(r,t),n.length&&Yn(r,n),r}function Qs(e,t){return n=>new I(()=>{n.hasAttribute(e)||n.setAttribute(e,t)})}function fi(e,t){return Zt(n=>e.setAttribute("aria-"+t,n===!0?"true":n===!1?"false":n.toString()))}function H(e){return Qs("role",e)}var mi=0;function je(e){return e.id||=`cxl__${mi++}`}function gi(e){return di(e,"id").map(t=>(t||(e.id=`cxl__${mi++}`),e.id))}var _e=d(":host{display:contents}"),tc=[-2,-1,0,1,2,3,4,5],Si=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],Tt=lt(),Xn=ue(""),ve=d(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),Ci=`
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${L("body-medium")}
`,nc=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),Ai={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",scrim:"rgb(29 27 32 / 0.5)","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function ki(e=""){return`
:host ${e} {
	${K("surface-container")}
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
		`}function Ni(e=Ai){return Object.entries(e).map(([t,n])=>`--cxl-color--${t}:${n};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var q={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:Ai,imports:nc?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function Kt(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var Rt=d(Kt()),Mi={"./theme-dark.js":()=>Promise.resolve().then(()=>(bi(),xi))},dt=[0,4,8,"12",16,24,32,48,64],Ze,yi,rc;function X(e,t){return e==="xsmall"?`@media(max-width:${q.breakpoints.small}px){${t}}`:`@media(min-width:${q.breakpoints[e]}px){${t}}`}function _t(e){return m(qt(async()=>e.getBoundingClientRect().width),Gn(e).map(t=>t.contentRect.width)).map(t=>{let n=q.breakpoints,r="xsmall";for(let o in n){if(n[o]>t)return r;r=o}return r}).distinctUntilChanged()}function oc(e=""){return Object.entries(Di).map(([t,n])=>`:host([color=${t}]) ${e}{ ${n} }`).join("")}function It(e,t,n=""){return Ti(e,`
		${t?`:host ${n} { ${Di[t]} }`:""}
		:host${t?"":"([color])"} ${n} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${n}{
			color: inherit;
			background-color: transparent;
		}
		${oc(n)}
	`)}function Ti(e,t){let n=d(t);return x(e,{persist:Qt,render:r=>n(r)})}function fe(e,t){return Ti(e,tc.map(n=>{let r=t(n);return n===0?`:host{--cxl-size:${n}}:host ${r}`:`:host([size="${n}"]){--cxl-size:${n}}:host([size="${n}"]) ${r}`}).join(""))}function Ri(){let e=Ze?document.adoptedStyleSheets.indexOf(Ze):-1;e!==-1&&document.adoptedStyleSheets.splice(e,1)}function ic(e){Ze&&Ri();let t=e.globalCss??"";e.colors&&(t+=`:root{${Ni(e.colors)}}`),t?(Ze=Xe(t),document.adoptedStyleSheets.push(Ze)):Ze=void 0,Tt.next({theme:e,stylesheet:Ze,css:t}),Xn.next(e.name)}var vi="";function _i(e){e?e!==vi&&(typeof e=="string"?import(e):e()).then(t=>ic(t.default),t=>console.error(t)):Ze&&(Ri(),Tt.next(void 0),Xn.next("")),vi=e}function ac(e){let t;return Tt.tap(n=>{let r=n?.theme.override?.[e.tagName];r?t?t.replace(r).catch(o=>console.error(o)):e.shadowRoot?.adoptedStyleSheets.push(t??=Xe(r)):t&&t.replaceSync("")})}function Xe(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function Ii(e,t=""){let n=Xe(t);return j(e).adoptedStyleSheets.push(n),n}function d(e){let t;return n=>{let r=j(n);if(r.adoptedStyleSheets.push(t??=Xe(e)),!n[Wn])return q.css&&r.adoptedStyleSheets.unshift(rc??=Xe(q.css)),n[Wn]=!0,ac(n)}}var Oi=["background","primary","primary-container","primary-fixed-dim","primary-fixed","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],Ju=[...Oi,"inherit"];function $r(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function K(e){return`${$r(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var Di=Oi.reduce((e,t)=>(e[t]=`
${$r(t)}
${t==="inverse-surface"?$r("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function Ot(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function L(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var sc=requestAnimationFrame(()=>fc()),cc={},wi=document.createElement("template"),Ei={};function lc(e){return function(t){let n=e(t),r=Ei[n];if(r)return r.cloneNode(!0);let o=document.createElementNS("http://www.w3.org/2000/svg","svg"),c=()=>(o.dispatchEvent(new ErrorEvent("error")),"");return fetch(n).then(i=>i.ok?i.text():c(),c).then(i=>{if(!i)return;wi.innerHTML=i;let a=wi.content.children[0];if(!a)return;let s=a.getAttribute("viewBox");s?o.setAttribute("viewBox",s):a.hasAttribute("width")&&a.hasAttribute("height")&&o.setAttribute("viewBox",`0 0 ${a.getAttribute("width")} ${a.getAttribute("height")}`);for(let l of a.childNodes)o.append(l);Ei[t.name]=o}).catch(i=>console.error(i)),o.setAttribute("fill","currentColor"),o}}var uc=lc(({name:e,width:t,fill:n})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${n?"fill1_":""}${t}px.svg`)),pc=uc;function Li(e,t={}){let{width:n,height:r}=t;n===void 0&&r===void 0&&(n=r=24);let o=cc[e]?.icon()??pc({name:e,width:n,fill:t.fill});return t.className&&o.setAttribute("class",t.className),n&&(o.setAttribute("width",`${n}`),r===void 0&&o.setAttribute("height",`${n}`)),r&&(o.setAttribute("height",`${r}`),n===void 0&&o.setAttribute("width",`${r}`)),t.alt&&o.setAttribute("alt",t.alt),o}var Hr,dc=new Promise(e=>{Hr=()=>{Tt.next(void 0),e()}});function fc(e){cancelAnimationFrame(sc),yi||(e&&(e.colors&&(q.colors=e.colors),e.globalCss&&(q.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(yi=Xe(`html{${Ni(q.colors)}}${q.globalCss}`)),q.imports?Promise.allSettled(q.imports.map(t=>{let n=document.createElement("link");return n.rel="stylesheet",n.href=t,document.head.append(n),new Promise((r,o)=>(n.onload=r,n.onerror=o))})).then(Hr,t=>console.error(t)):Hr())}function Jn(){return qt(async()=>{await dc,await document.fonts.ready})}function Je(e,t,n){return new I(r=>{let o={id:e,controller:n,target:t};Be().subscribe({next:()=>pe(t,`registable.${e}`,o),signal:r.signal}),r.signal.subscribe(()=>o.unsubscribe?.())})}function Qn(e,t,n,r){return new I(o=>{function c(a){let s=a.target;a.unsubscribe=()=>{let T=n.indexOf(s);T!==-1&&n.splice(T,1),r?.({type:"disconnect",target:s,elements:n}),o.next()};let l=n.indexOf(s);l!==-1&&n.splice(l,1);let b=0,A=n.length;for(;b<A;){let T=b+A>>1;n[T].compareDocumentPosition(s)&Node.DOCUMENT_POSITION_FOLLOWING?b=T+1:A=T}n.splice(b,0,s),r?.({type:"connect",target:s,elements:n}),o.next()}let i=de(t,`registable.${e}`).subscribe(c);o.signal.subscribe(i.unsubscribe)})}function Fi(e,t,n=new Set){let r=ri();return m(de(t,`registable.${e}`).map(o=>{let c=o.target,i=o.controller||o.target;return o.unsubscribe=()=>{n.delete(i),r.next({type:"disconnect",target:i,element:c,elements:n})},n.add(i),{type:"connect",target:i,element:c,elements:n}}),r)}var we=class extends g{name="";width;height;alt;fill=!1};u(we,{tagName:"c-icon",init:[x("name"),x("width"),x("height"),x("fill"),x("alt")],augment:[H("none"),d(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,n;return e.shadowRoot?.adoptedStyleSheets.push(t),Te(e).switchMap(()=>qe(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,o=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${o===void 0?"":`height:${o}px`}}`).catch(c=>{}),n?.remove(),n=e.name?Li(e.name,{className:"icon",width:r,height:o,fill:e.fill,alt:e.alt}):void 0,n&&(n.onerror=()=>{n&&e.alt&&n.replaceWith(e.alt)},j(e).append(n))})}]});function mc(e){return h(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function gc(e,t=e,n=0){let r=t.hasAttribute("tabindex")?t.tabIndex:n;return mc(e).tap(o=>{o?t.removeAttribute("tabindex"):t.tabIndex=r})}function hc(e,t=e){return m(S(t,"focusout").tap(()=>e.touched=!0),m(G(e,"disabled"),G(e,"touched")).tap(()=>pe(e,"focusable.change")))}function Ie(e,t=e,n=0){return m(gc(e,t,n),hc(e,t))}function Pi(e){return e in q.animation}function $e({target:e,animation:t,options:n}){if(q.disableAnimations)return e.animate(null);if(typeof t=="string"&&!(t in q.animation))throw new Error(`Animation "${t}" not defined`);let r=typeof t=="string"?q.animation[t]:t,o=typeof r.kf=="function"?r.kf(e):r.kf,c={duration:250,easing:q.easing.emphasized,...r.options,...n,...q.prefersReducedMotion?{duration:0}:void 0};return e.animate(o,c)}function zi(e){let{trigger:t,stagger:n,commit:r,keep:o}=e;function c(a){return new I(s=>{let l=$e(a);l.ready.then(()=>s.next({type:"start",animation:l}),b=>{console.error(b)}),l.addEventListener("finish",()=>{s.next({type:"end",animation:l}),r&&l.commitStyles(),!(o||o!==!1&&a.options?.fill&&(a.options.fill==="both"||a.options.fill==="forwards"))&&s.complete()}),s.signal.subscribe(()=>{try{l.cancel()}catch{}})})}let i=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return m(...i.map((a,s)=>{let l={...e.options,delay:n!==void 0?(e.options?.delay??0)+s*n:e.options?.delay};return(t==="visible"?oi(a).filter(A=>A):t==="hover"?Pr(a):z(!0)).switchMap(A=>A?c({...e,options:l,target:a}):R)}))}function Bi(e,t,n=e.getBoundingClientRect()){let r=n.width>n.height?n.width:n.height,o=new Kn,c=e.shadowRoot||e,{x:i,y:a}=t??{x:1/0,y:1/0},s=!t||Jt(t),l=i>n.right||i<n.left||a>n.bottom||a<n.top;return o.x=s||l?n.width/2:i-n.left,o.y=s||l?n.height/2:a-n.top,o.radius=r,t||(o.duration=0),c.prepend(o),o}function ji(e,t=e){let n,r,o,c=()=>{n=Bi(t,r instanceof Event?r:void 0,o),n.duration=600,r=void 0};return m(S(e,"click").tap(i=>{r=i,o=t.getBoundingClientRect()}),h(e,"selected").raf().switchMap(()=>{if(e.selected){if(!n?.parentNode){if(Xt(e))return r=void 0,Te(e).tap(c);c()}}else n&&$i(n).catch(i=>console.error(i));return R})).ignoreElements()}function $i(e){return new Promise(t=>{$e({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function Oe(e,t=e){let n=!1,r=0;return m(S(t,"pointerdown"),S(t,"click")).tap(o=>o.cxlRipple??=e).raf().mergeMap(o=>{if(o.cxlRipple===e&&!n&&!e.disabled&&e.parentNode){r=Date.now(),n=!0,e.style.setProperty("--cxl-mask-hover","none");let c=Bi(e,o),i=c.duration,a=()=>{e.style.removeProperty("--cxl-mask-hover"),$i(c).catch(()=>{}).finally(()=>{n=!1})};return o.type==="click"?ct(i).tap(a):m(S(document,"pointerup"),S(document,"pointercancel")).first().map(()=>{let s=Date.now()-r;setTimeout(()=>a(),s>i?32:i-s)})}return R})}var Kn=class extends g{x=0;y=0;radius=0;duration=500};u(Kn,{tagName:"c-ripple",init:[x("x"),x("y"),x("radius")],augment:[d(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",oe(()=>{let n=t.style;n.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,n.width=n.height=e.radius*2+"px",t.parentNode||j(e).append(t),$e({target:t,animation:"expand",options:{duration:e.duration}}),$e({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var tn=[ve,Rt,d(`
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
}`)],xc=d(`
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
`);function Ur(e){return h(e,"disabled").switchMap(t=>t?R:Hn(e).tap(n=>{n.stopPropagation(),e.click()}))}function Vr(e){return m(Ur(e),Ie(e))}var er=class extends g{disabled=!1;touched=!1};u(er,{init:[y("disabled"),y("touched")],augment:[H("button"),Vr]});var en=class extends er{size;color;variant};u(en,{tagName:"c-button",init:[fe("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),It("color","primary"),y("variant")],augment:[...tn,xc,Oe,_]});var Qe;function Hi(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function bc(e){return e==="infinite"?1/0:+e}function yc(e){if(Pi(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let n={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(a,s,l)=>(s&&(r=+s),l&&(n.composite=l),"")),Qe??=document.createElement("style").style,Qe.animation=e,n.fill=Qe.animationFillMode;let o=n.fill==="forwards"||n.fill==="both",c=t?void 0:Hi(Qe.animationDuration);c!==void 0&&(n.duration=c);let i=Hi(Qe.animationDelay);return i!==void 0&&(n.delay=i),Qe.animationIterationCount&&(n.iterations=bc(Qe.animationIterationCount)),{animation:Qe.animationName,keep:o,stagger:r,options:n}}function vc(e){return typeof e=="string"&&(e=e.split(",").map(t=>yc(t.trim()))),e}function Gr(e,t,n,r){let o=r?`motion-${r}-on`:"motion-on",c=vc(n);return e.setAttribute(o,""),m(...c.map(i=>zi({target:t,...i}))).finalize(()=>e.removeAttribute(o))}var Ui=d(":host(:not([open],[motion-out-on])){display:none}");function Yr(e,t=()=>e,n=!1){let r=ne(()=>z(t("in"))),o=ne(()=>z(t("out"))),c=ne(()=>e.duration!==void 0&&e.duration!==1/0?ct(e.duration).map(()=>e.open=!1):R).log();return m(de(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),le(h(e,"motion-in").map(i=>(i?r.mergeMap(a=>Gr(e,a,i,"in")):r).mergeMap(()=>c)),h(e,"motion-out").map(i=>(i?o.switchMap(a=>Gr(e,a,i,"out")):o).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([i,a])=>G(e,"open").switchMap(s=>{if(e.popover!=="auto"){let l=s?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:s?"closed":"open",newState:l}))}return s?n?ze(a,i):i:n?ze(a,i):a})))}var Dt=class extends g{open=!1;duration;"motion-in";"motion-out"};u(Dt,{init:[x("motion-in"),x("motion-out"),Zn("duration"),y("open")]});var nn=class extends Dt{};u(nn,{tagName:"c-toggle-target",augment:[d(`
:host{display:contents}
`),e=>{let t=N("slot"),n=N("slot",{name:"off"});return(e.open?n:t).style.display="none",j(e).append(t,n),Yr(e,r=>{t.style.display=n.style.display="none";let o=e.open?r==="in"?t:n:r==="in"?n:t;return o.style.display="",o.assignedElements()},!0)}]});var Wr={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(n){console.error(n)}}};function Vi(e){return(t,n)=>t[e]>n[e]?1:t[e]<n[e]?-1:0}function Lt(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let n,r=e.getRootNode();return r instanceof ShadowRoot&&(n=r.getElementById(t),n)?n:e.ownerDocument.getElementById(t)??void 0}var qr=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},Ke=new qr;var Yi=(e,t,n=e)=>te(e).tap(()=>pe(n,"toggle.close",t));function Gi(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(n=>{let r=Lt(e,n);return r?[r]:[]}):Array.isArray(t)?t:[t]}function wc(e,t,n,r,o=S(e,"click").map(()=>!n())){return m(r,o).switchMap(c=>{let i=t();return i?We(i.map(a=>({target:a,open:c}))):R})}function on(e,t=e){function n(c,i){return[h(e,"open").switchMap(a=>(c.parentNode||Ke.popupContainer.append(c),c.open=a,a&&c instanceof g?G(c,"open").map(s=>{e.open&&s===!1&&(e.open=!1)}):R)),gi(c).tap(a=>{let s=c.getAttribute("role");(s==="menu"||s==="listbox"||s==="tree"||s==="grid"||s==="dialog")&&(i.ariaHasPopup=s),i.getRootNode()===c.getRootNode()&&i.setAttribute("aria-controls",a)})]}let r=le(h(e,"trigger"),h(e,"target")).switchMap(([c])=>{let i=Gi(e),a=i?m(...i.flatMap(s=>n(s,e))).ignoreElements():R;return m(c==="hover"?le(zr(t),i?m(...i.map(s=>zr(s))):R).map(s=>!!s.find(l=>!!l)).debounceTime(250):c==="checked"?S(t,"change").map(s=>s.target&&"checked"in s.target?!!s.target.checked:!1):S(t,"click").map(()=>!e.open),a)}),o;return ai().switchMap(()=>wc(t,()=>Gi(e),()=>e.open,h(e,"open"),r).filter(c=>{let{open:i,target:a}=c;if(e.open!==i){if(i)o=ut(e)?.activeElement,a.trigger=e;else if(a.trigger&&a.trigger!==e)return c.open=!0,a.trigger=e,!0;return e.open=i,!1}if(!i&&a.trigger===e){let s=document.activeElement;(s===document.body||s===document.documentElement)&&o?.focus()}return!0}))}var tr=class extends g{open=!1;target;trigger};u(tr,{init:[x("target"),x("trigger"),y("open")],augment:[e=>on(e).raf(({target:t,open:n})=>t.open=n)]});var rn=class extends tr{};u(rn,{tagName:"c-toggle",augment:[_e,_]});var Zr=[d(`
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
}`),_,()=>N("slot",{name:"title"})];function Ec(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var an=class extends g{size;sticky=!1;contextual};u(an,{tagName:"c-appbar",init:[y("size"),y("sticky"),y("contextual")],augment:[d(`
:host { z-index: 2; width:100%; }
:host([sticky]) { position: sticky; top: -1px; }
:host([scroll]) {
 	transition: background-color var(--cxl-speed);
	border-top: 1px solid var(--cxl-color-surface-container); background-color: var(--cxl-color-surface-container)
}
:host([contextual]) { padding: 0; }
:host([contextual]) slot:not([name=contextual]) { display:none; }
		`),...Zr,()=>N("slot",{name:"contextual"}),e=>h(e,"sticky").switchMap(t=>t?Un(e,{threshold:[1]}).tap(n=>e.toggleAttribute("scroll",n.intersectionRatio<1)):R),e=>{let t;return m(jn(e),h(e,"contextual")).raf().switchMap(()=>{for(let n of e.children)if(Ec(n)&&(n.slot="contextual",n.open=n.name===e.contextual,n.open))return t=n,S(n,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,R})}]});var sn=class extends en{};u(sn,{tagName:"c-button-round",augment:[d(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var be=class extends sn{icon="";width;height;fill=!1;variant="text";alt};u(be,{tagName:"c-icon-button",init:[x("icon"),x("width"),x("height"),x("alt"),x("fill")],augment:[e=>N(we,{className:"icon",width:h(e,"width"),height:h(e,"height"),name:h(e,"icon"),fill:h(e,"fill"),alt:h(e,"alt")})]});var cd=1440*60*1e3;function Wi(e,t,n){if(t==="relative"){let r=new Date;return e.getFullYear()===r.getFullYear()?e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()?e.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(n,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(n,{month:"2-digit",day:"2-digit",year:"2-digit"})}return e.toLocaleString(n,{dateStyle:t,timeStyle:t})}function qi(e,t,n){return typeof n=="string"?Wi(t,n,e):t.toLocaleString(e,n)}var Xr={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function Sc(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var cn={content:Xr,name:"default",localeName:Sc(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>qi(cn.localeName,e,t)},Cc={content:Xr,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>qi("en-US",e,t)};function Ac(){let e=ue(cn),t={default:cn,en:Cc},n={},r=e.map(i=>i.content);async function o(i){let a=i.split("-")[0];if(!a)return cn;if(!(t[i]??t[a])){let l=n[i]??n[a];l&&await l()}return t[a]||cn}async function c(i){e.next(await o(i))}return navigator.language&&c(navigator.language).catch(i=>console.error(i)),{content:r,registeredLocales:t,locale:e,setLocale:c,getLocale(i){return i?qt(()=>o(i)):e},get(i,a){return r.map(s=>s[i])},register(i){t[i.name]=i}}}var Ft=Ac();function Zi(e){return Object.assign(Xr,e),Ft.get}var nr=class e extends g{name;size;open=!1;backIcon=N(be,{icon:"arrow_back",className:"icon",ariaLabel:Ft.get("core.close"),$:t=>te(t).tap(()=>this.open=!1)});static{u(e,{tagName:"c-appbar-contextual",init:[x("name"),y("open"),y("size")],augment:[t=>t.backIcon,...Zr,d(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),t=>G(t,"open").tap(n=>{n||t.dispatchEvent(new Event("close"))})]})}};function Xi(e=document){document.documentElement.lang="en";let t=[N("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),N("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),N("meta",{name:"mobile-web-app-capable",content:"yes"}),N("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${L("body-large")}}
			:link{color:var(--cxl-color-primary)}
			:visited{color:var(--cxl-color-secondary)}
			`)];return e.head.append(...t),t}function Ji(e=2e3){return m(ct(e),Jn()).first()}function Qi(e){return Ji().raf(()=>e.setAttribute("ready",""))}function rr(e){return m(oe(t=>{let n=Xi(e.ownerDocument);t.signal.subscribe(()=>n.forEach(r=>r.remove()))}),Be().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),Ji().switchMap(()=>_t(e).raf(t=>e.setAttribute("breakpoint",t))),Qi(e),Xn.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Jr=class extends g{connectedCallback(){requestAnimationFrame(()=>Xi(this.ownerDocument)),super.connectedCallback()}};u(Jr,{tagName:"c-meta",augment:[()=>Qi(document.body)]});function Ki(e,t,n){n==="in"&&(e.style.display="");let r=e.offsetWidth,o=$e({target:e,animation:{kf:{[t]:n==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});n==="out"&&(o.onfinish=()=>e.style.display="none")}var ft=class extends g{sheetstart=!1;sheetend=!1};u(ft,{tagName:"c-application",init:[y("sheetstart"),y("sheetend")],augment:[d(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${K("surface")}
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
${Ot()}
	`),rr,e=>de(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>de(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=N("slot",{name:"start"}),n=N("slot",{id:"body"}),r=N("slot",{name:"end"}),o=Xe("html { overflow: hidden }");return j(e).append(t,n,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),Ke.popupContainer=e,m(oe(c=>{let i=e.ownerDocument.adoptedStyleSheets;i.push(o),c.signal.subscribe(()=>{let a=i.indexOf(o);a!==-1&&i.splice(a,1)})}),G(e,"sheetstart").tap(c=>Ki(t,"marginLeft",c?"in":"out")),G(e,"sheetend").tap(c=>Ki(r,"marginRight",c?"in":"out")))}]});var kc=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,Nc=/^\d{5}(?:[-\s]\d{4})?$/,Mc={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},ea={required:Lc,email:Fc,json:Bc,zipcode:Pc,nonZero:Oc,nonEmpty:Ic},Tc={pattern:Dc,equalToElement:Qr(oa),greaterThan:na,lessThan:ra,greaterThanElement:Qr(na),lessThanElement:Qr(ra),min:$c,max:Hc,equalTo:oa,maxlength:Uc,minlength:Vc},Rc=Zi(Mc);function Qr(e){return(t,n)=>{let r=typeof t=="string"?Lt(n,t):t;if(!r)throw"Invalid element";return e(r)}}function De(e,t){return{key:e,valid:t,message:Rc(`validation.${e}`,"validation.invalid")}}function _c(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function Ic(e){return De("nonEmpty",!_c(e))}function Oc(e){return De("nonZero",e===""||Number(e)!==0)}function Dc(e){let t=typeof e=="string"?e=new RegExp(e):e;return n=>De("pattern",typeof n=="string"&&(n===""||t.test(n)))}function Kr(e){return e!=null&&e!==""}function Lc(e,t){let n=t&&"checked"in t?!!t.checked:!0;return De("required",n&&Kr(e))}function Fc(e){return De("email",typeof e=="string"&&(e===""||kc.test(e)))}function Pc(e){return De("zipcode",typeof e=="string"&&(e===""||Nc.test(e)))}function zc(e){try{return JSON.parse(e),!0}catch{return!1}}function Bc(e){return De("json",zc(e))}function jc(e){return e instanceof HTMLElement&&"value"in e}function ln(e,t,n){let r=jc(t)?h(t,"value"):t instanceof I?t:z(t);return o=>r.map(c=>De(e,!Kr(o)||!Kr(c)||n(o,c)))}function ta(e,t){let n=/(\w+)(?:\(([^)]+?)\))?/g,r=[],o;for(;o=n.exec(e);)if(o[2]){let c=Tc[o[1]];if(!c)throw`Invalid rule "${o[1]}"`;r.push(c(o[2],t))}else if(o[1]&&o[1]in ea)r.push(ea[o[1]]);else throw`Invalid rule "${o[1]}"`;return r}function ia(e,t){let n=(typeof e=="string"?ta(e,t):e).flatMap(r=>typeof r=="string"?ta(r,t):r);return(r,o)=>n.map(c=>{let i=c(r,o);return i instanceof I?i:i instanceof Promise?We(i):z(i)})}function $c(e){return ln("min",e,(t,n)=>Number(t)>=Number(n))}function na(e){return ln("greaterThan",e,(t,n)=>Number(t)>Number(n))}function Hc(e){return ln("max",e,(t,n)=>Number(t)<=Number(n))}function ra(e){return ln("lessThan",e,(t,n)=>Number(t)<Number(n))}function oa(e){return ln("equalTo",e,(t,n)=>t==n)}function Uc(e){return t=>De("maxlength",!t||t.length<=+e)}function Vc(e){return t=>De("minlength",!t||t.length>=+e)}function Gc(e){return sa(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function aa(e){return G(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||Nt(e,"change",{bubbles:!0})})}function sa(e){return m(h(e,"value"),h(e,"checked")).map(()=>{})}var Pt=class e extends g{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{u(e,{init:[y("autofocus"),y("invalid"),y("disabled"),y("touched"),x("rules"),y("name"),Z("validationResult"),qn("update")],augment:[t=>(t.defaultValue=t.value,m(Je("form",t),G(t,"invalid").tap(()=>Nt(t,"invalid")),h(t,"invalid").switchMap(n=>{if(n){if(t.setAria("invalid","true"),!t.validationMessage)return Ft.get("validation.invalid").tap(r=>t.setCustomValidity(r))}else t.setAria("invalid",null);return R}),oe(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),h(t,"rules").switchMap(n=>{if(!n)return R;let r=ia(n,t);return sa(t).switchMap(()=>m(...r(t.value,t)).tap(o=>t.setValidity(o))).finalize(()=>t.resetValidity())}),h(t,"value").tap(n=>t.setFormValue(n)),h(t,"validationResult").switchMap(n=>!n||n.valid?R:n.message instanceof I?n.message:n.message===void 0?Ft.get("validation.invalid"):z(n.message)).tap(n=>{t.setCustomValidity(n)}))),Gc]})}get labels(){return Re(this).labels}get validity(){return Re(this).validity}get validationMessage(){return Re(this).validationMessage}reportValidity(){return Re(this).reportValidity()}checkValidity(){return Re(this).checkValidity()}setCustomValidity(t){let n=!!t,r=t!==this.validationMessage;this.applyValidity(n,t),this.invalid!==n?this.invalid=n:r&&Nt(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,n){n?this.setAttribute(`aria-${t}`,n):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let n in this.validMap){let r=this.validMap[n];if(r&&!r.valid)return this.validationResult=r}this.resetInvalid()}applyValidity(t,n){Re(this).setValidity({customError:t},n)}formDisabledCallback(t){this.disabled=t}setFormValue(t){Re(this).setFormValue(t)}};function Yc(e,t){let n,r=t.key;if(r==="ArrowDown"&&e.goDown)n=e.goDown();else if(r==="ArrowRight"&&e.goRight)n=e.goRight();else if(r==="ArrowUp"&&e.goUp)n=e.goUp();else if(r==="ArrowLeft"&&e.goLeft)n=e.goLeft();else if(r==="Home")n=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(r==="End")n=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)n=e.other(t);else return null;return t.stopPropagation(),n&&t.preventDefault(),n}function un(e){return S(e.host,"keydown").map(t=>Yc(e,t)).filter(t=>!!t)}function Wc(e){return new I(t=>{let n=e.focus;e.focus=()=>{n.call(e),t.next()},t.signal.subscribe(()=>e.focus=n)})}function ca({host:e,observe:t,getFocusable:n,getSelected:r,getActive:o=()=>eo(e)}){let c=[];function i(){let a=c.find(s=>!s.disabled&&!s.hidden&&!Xt(s));a&&(a.tabIndex=0)}return m(S(e,"focusin").tap(()=>{let a=o(),s=!1;for(let l of c)l.tabIndex=l===a?(s=!0,0):-1;s||i()}),(t??z(!0)).tap(()=>{if(c=n(),c.find(l=>l.tabIndex===0))return;let s=r?.();s?s.tabIndex=0:i()}),e instanceof HTMLElement?Wc(e).tap(()=>{let a=n();(a.find(l=>l.tabIndex===0)??a[0])?.focus()}):R).ignoreElements()}function eo(e){return ut(e)?.activeElement??document.activeElement??void 0}function la({getFocusable:e,getActive:t}){return(n=1,r,o=Xt)=>{let c=t(),i=e(),a=r??(c?i.indexOf(c):-1),s;do s=i[a+=n];while(s&&o(s));return s}}function or({host:e,input:t,handleOther:n=!1,axis:r}){let o=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function c(A=1){if(e.open===!1){e.open=!0;let T=o();requestAnimationFrame(()=>{T?.focused&&l(T)})}else return i(A)}function i(A=1,T){let F=o(),U=T??(F?e.options.indexOf(F):-1),$;do $=e.options[U+=A];while($?.hidden);return $}function a(A){let T=A.key;if(/^\w$/.test(T)){let F=o(),U=F?e.options.indexOf(F):-1;if(U===-1)return;let $=U;$+1>=e.options.length&&(U=0);let ee=new RegExp(`^\\s*${T}`,"i"),J;for(;J=e.options[++U];)if(!J.hidden&&J.textContent.match(ee))return J;if($===0)return;for(U=0;U<$&&(J=e.options[U++]);)if(!J.hidden&&J.textContent.match(ee))return J}}let s=()=>e.options.find(A=>A.focused);function l(A){for(let T of e.options)T.focused=!1;A?(A.focused=!0,t?.setAria("activedescendant",je(A)),A.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let b=A=>pe(A,"selectable.action",A);return m(un({host:t??e,...r==="x"?{goLeft:()=>c(-1),goRight:()=>c(1)}:{goDown:()=>c(1),goUp:()=>c(-1)},goFirst:()=>e.open!==!1?i(1,-1):void 0,goLast:()=>e.open!==!1?i(-1,e.options.length):void 0,other:n?a:void 0}).tap(A=>{e.open===!1?b(A):l(A)}),S(t??e,"focus").tap(()=>l(o())),si(t??e,"Enter").tap(A=>{let T=s();e.open!==!1&&T?(A.stopPropagation(),b(T)):e.open===!1&&(e.open=!0)}))}function to(e){return new I(t=>{m(Qn("selectable",e,e.options,n=>{if(n.type==="connect"&&(n.target.view=e.optionView,n.target.selected))return e.defaultValue===void 0&&(e.defaultValue=n.target.value),t.next(n.target);let r;for(let o of e.options)o.hidden||!o.parentNode||o.selected&&(r?o.selected=!1:r=o);t.next(r)}),de(e,"selectable.action").tap(n=>{if(!e.disabled&&e.options.includes(n)){let r=e.value!==n.value;t.next(n),r&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var mt={},zt=class e extends Pt{options=[];_value;_selected=mt;static{u(e,{init:[x("value"),Z("selected")],augment:[t=>to(t).tap(n=>{(!n||n!==t.selected)&&t.setSelected(n)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===mt?this.options[0]?.value:this._value}get selected(){return this._selected===mt&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==mt&&this._selected.value===t){this._value=t;return}else for(let n of this.options)if(n.value===t){this._value=t,this.setSelected(n);return}this._selected!==mt?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let n of this.options)n.focused=n.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==mt&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=mt)}};function ua(e,t,...n){let r=document.createElementNS("http://www.w3.org/2000/svg",e);for(let o in t){if(o==="children")continue;let c=t[o];r.setAttribute(o==="className"?"class":o,c??"")}return n.length&&r.append(...n),r}function ir(e){return ua("svg",e,ua("path",{d:e.d}))}function qc({host:e,target:t,position:n,onToggle:r,whenClosed:o=R}){return c=>(t.popover??="auto",t.togglePopover(c),r?.(c),c?m(Gn(e),S(window,"resize"),S(window,"scroll",{capture:!0,passive:!0})).tap(n):o)}function pa(e){let{host:t,beforeToggle:n,target:r}=e,o=qc({...e,whenClosed:te(t).tap(()=>{t.open=!0})});return m(S(r,"toggle").tap(c=>{let i=c.newState==="open";t.open=i}),h(t,"open").raf().switchMap(c=>(n?.(c),t.ariaExpanded=c?"true":"false",o(c))))}var pn=class extends g{invalid=!1};u(pn,{tagName:"c-field-help",init:[x("invalid")],augment:[d(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${L("body-small")}
}
	`),_,e=>(e.slot||="help",h(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var ro=d(`
:host {
  display: block;
  position: relative;
  text-align: start;
  ${L("body-large")}
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
	${L("body-small")}
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
`),Zc=d(`
:host(:focus-within) slot[name=label] { color: var(--cxl-color-primary); }
slot[name=label] {
	${L("body-small")}
	height: 16px;
}
:host([floating]) slot[name=label] {
	display:none;
	transition: font var(--cxl-speed), height var(--cxl-speed), top var(--cxl-speed), left var(--cxl-speed);
}
:host([floating]) slot[name=label].novalue, :host([floating]) slot[name=label].value { display:block; }
`),Xc=d(`
:host {
	border-radius: var(--cxl-shape-corner-xsmall) var(--cxl-shape-corner-xsmall) 0 0;
}
:host([floating]:not(:focus-within)) slot[name=label].novalue {
	${L("body-large")}
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

${Kt(".content")}
	`);function Jc(e){return m(de(e,"registable.form",!1).tap(t=>{t.id==="form"&&(e.input=t.target)}),Fi("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var Qc=()=>N("div",{className:"content"},N("slot",{name:"leading"}),N("div",{className:"body"},N("slot",{name:"label"}),N("slot",{id:"bodyslot"})),N("slot",{name:"trailing"}),N("div",{className:"indicator"}));function Kc(e){function t(l){o.next(l.touched&&l.invalid),e.toggleAttribute("invalid",o.value);let b=0,A=[];for(let F of i.assignedNodes())!(F instanceof HTMLElement)||F===s||("invalid"in F&&F.invalid?o.value&&(F.invalid===!0||F.invalid===l.validationResult?.key)?(b++,F.style.display="",A.push(je(F))):F.style.display="none":A.push(je(F)));let T=!o.value||b>0;s.textContent=T?"":l.validationMessage,T?s.remove():(s.parentElement||e.append(s),A.push(je(s))),A.length?l.setAria("describedby",A.join(" ")):l.setAria("describedby",null)}function n(l){let b=e.input;if(b){if(e.toggleAttribute("inputdisabled",b.disabled),t(b),!l)return;l.type==="focus"?c.next(!0):l.type==="blur"&&c.next(!1)}}function r(){let l=e.input?.value,b=!e.input?.hasAttribute("autofilled")&&(!l||l.length===0);a?.classList.toggle("novalue",b),a?.classList.toggle("value",!b)}let o=ue(!1),c=ue(!1),i=N("slot",{name:"help"}),a=e.contentElement.children[1]?.children[0],s=N(pn,{ariaLive:"polite"});return j(e).append(N("div",{className:"help"},i)),m(h(e,"input").switchMap(l=>l?m(z(void 0).tap(()=>{n(),queueMicrotask(r)}),S(l,"focusable.change").tap(n).tap(r),S(l,"focus").tap(n),S(l,"invalid").tap(n),S(l,"update").tap(r),G(l,"touched").tap(()=>n()),m(S(l,"blur"),S(i,"slotchange")).raf(n),S(e.contentElement,"click").tap(()=>{document.activeElement!==l&&!e.matches(":focus-within")&&!c.value&&l.focus()})):R),Jc(e))}var gt=class e extends g{floating=!1;input;size;contentElement=Qc();static{u(e,{init:[y("floating"),Z("input"),fe("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,Kc]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},no=class extends gt{};u(no,{tagName:"c-field",augment:[ro,Zc,Xc]});var el=d(`
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
`),da=d(`
${ki("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function tl(e,t){return()=>{let n=e.parentElement instanceof gt?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.x}px`,t.style.minWidth=`${n.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-n.bottom-16,280)}px`}}function io({host:e,target:t,input:n,position:r,beforeToggle:o,onToggle:c,handleOther:i,axis:a}){return m(or({host:e,input:n,handleOther:i,axis:a}),S(n??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),pa({host:e,target:t,position:r??tl(e,t),beforeToggle:o,onToggle:c}))}function nl(e){let{host:t}=e;return m(el(t)??R,ve(t)??R,Ie(t),io(e))}var Bt=class extends g{};u(Bt,{tagName:"c-select-option",augment:[d(`
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
		`),_]});var oo=class extends zt{open=!1;optionView=Bt;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let n of this.options)n!==t&&(n.slot="");t&&(t.slot="selected")}}};u(oo,{tagName:"c-select",init:[y("open")],augment:[H("listbox"),d(`
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
	${K("surface-container")}
	border: 0;
	transform-origin: top;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-2);
	visibility:visible;
}
		`),e=>{let t=N("div",{className:"menu"},N("slot")),n=N("slot",{name:"selected"}),r=t.style,o=Ii(e),c=0,i=0;j(e).append(t,n,ir({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function a(){if(e.open)i=e.selected?.rendered?.offsetHeight??0;else{r.cssText="";let s=e.options.reduce((l,b)=>Math.max(l,b.rendered?.offsetWidth??0),0);o.replaceSync(`:host{width:min(100%,${s}px)}`)}}return m(m(Te(e),Jn()).raf(a),nl({host:e,target:t,handleOther:!0,beforeToggle(s){a();let l=e.selected;l&&(l.slot=s?"":"selected"),t.classList.toggle("open",s)},onToggle(s){let l=e.selected;!s&&l&&(c=l.rendered?.offsetHeight??0)},position(){let s=e.parentElement??e,l=Math.round((i-c)/2),b=e.selected?.rendered,A=s.getBoundingClientRect(),T=e.getBoundingClientRect(),F=T.top-14,U,$=b?b.offsetTop:0;$>F&&($=F),U=t.scrollHeight;let ee=window.innerHeight-T.top+8+$,J=T.top-l-$;U>ee?U=ee:U<T.height&&(U=T.height),r.top=J+"px",r.left=A.left+"px",r.maxHeight=U+"px",r.minWidth=A.width+"px",r.transformOrigin=`${$}px`}}))}]});function rl(e){let t=lt();return m(Je("field",e,n=>t.next(n)),t)}function fa(e){return rl(e).switchMap(t=>h(e,"input").switchMap(n=>n?z(n):h(t,"input").switchMap(r=>r?z(r):R)))}function dn(e,t,n){return h(e,n).tap(r=>Qt(t,n,r))}var ol="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function sr({host:e,input:t,toText:n,toValue:r,update:o}){t.className="cxl-native-input",t.setAttribute("style",ol),t.setAttribute("form","__cxl_ignore__");function c(s){e.value=r?r(t.value||""):t.value,s.stopPropagation(),e.dispatchEvent(new Event(s.type,{bubbles:!0}))}function i(){let s=e.value,l=n?n(s,t.value):s||"";t.value!==l&&e.setInputValue(l)}function a(){t.ariaLabel=e.ariaLabel;let s=e.getAttribute("aria-labelledby");s?t.setAttribute("aria-labelledby",s):t.removeAttribute("aria-labelledby")}return m(Ie(e,t),ne(()=>(a(),t.form?S(t.form,"reset").tap(c):R)),h(e,"value").tap(()=>{n&&t.matches(":focus")||i()}),S(t,"blur").tap(i),S(t,"input").tap(c),S(t,"change").tap(c),dn(e,t,"disabled"),dn(e,t,"name"),dn(e,t,"autocomplete"),dn(e,t,"spellcheck"),dn(e,t,"autofocus"),$n(e,["aria-label","aria-labelledby"]).tap(a),o?o.tap(i):R,S(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),S(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var ar=class e extends Pt{inputValue="";static{u(e,{init:[Z("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,S(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,n){n?this.inputEl.setAttribute(`aria-${t}`,n):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,n){Re(this).setValidity({customError:t},n,this.inputEl),this.inputEl.setCustomValidity(t?n||"Invalid Field":"")}};var il=[d(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),ve],so=[...il,_],fn=class e extends ar{autofilled=!1;autocomplete;static{u(e,{init:[y("autofilled"),x("autocomplete")],augment:[t=>S(t.inputEl,"animationstart").tap(n=>{(n.animationName==="cxl-onautofillstart"||n.animationName==="cxl-onautofillend")&&(t.autofilled=n.animationName==="cxl-onautofillstart",pe(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,n){this.inputEl.setSelectionRange(t,n)}getWindowSelection(){return this.shadowRoot?.getSelection?.()??getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},ao=class extends fn{value="";inputEl=N("input",{className:"input"})};u(ao,{tagName:"c-input-text",init:[x("value")],augment:[...so,e=>e.append(e.inputEl),e=>sr({host:e,input:e.inputEl})]});function al(e){getComputedStyle(e).direction==="rtl"?e.scrollLeft=1e6:e.scrollLeft=e.scrollWidth}var jt=class e extends fn{selected;value;inputEl=N("input",{className:"input"});static{u(e,{tagName:"c-input-option",init:[x("value"),Z("selected")],augment:[...so,t=>t.append(t.inputEl),t=>sr({host:t,input:t.inputEl,toText:()=>t.selected?.textContent??"",toValue:n=>n!==""?t.selected?.value:void 0}),t=>G(t,"selected").tap(n=>{let r=t.selected?.textContent;t.value=n?.value,t.setInputValue(r??""),al(t.inputEl)})]})}};function sl(e){return co(e,"^")}function co(e,t=""){if(e==="")return()=>!0;let n=lo(e,t);return r=>r.textContent?n.test(r.textContent):!1}function lo(e,t="",n="i"){return new RegExp(t+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n)}var cr=class e extends g{optionView=Bt;open=!1;debounce=100;options=[];matcher=co;static{u(e,{tagName:"c-autocomplete",init:[y("open"),Zn("debounce")],augment:[H("listbox"),da,_e,t=>{let n=N("slot",{name:"empty"}),r=N("div",{id:"menu",tabIndex:-1},N("slot"),n),o=ir({viewBox:"0 0 24 24",id:"caret",d:"M7 10l5 5 5-5z",width:20,height:20,fill:"currentColor"});o.style.cursor="pointer",n.style.display="none";function c(s){t.open=!0,a(s)}function i(s,l){s.setAria("activedescendant",je(l)),l.rendered?.scrollIntoView({block:"nearest"})}function a(s){let l=s.inputValue??s.value,b=t.doSearch(l);n.style.display=b?"none":"",b&&i(s,b)}return j(t).append(r,o),m(fa(t).switchMap(s=>(s.setAria("autocomplete","list"),s.role="combobox",s.setAria("controls",je(t)),s.setAria("haspopup",t.role),s.setAttribute("autocomplete","off"),m(h(t,"open").tap(l=>{if(l)o.tabIndex=-1,c(s);else{for(let b of t.options)b.focused=!1;o.tabIndex=0,s.setAria("activedescendant",null)}s.setAria("expanded",String(l))}),m(Hn(o),S(o,"mousedown")).tap(l=>{l.preventDefault(),l.stopPropagation(),s.focus()}).debounceTime(100).tap(()=>{t.open=!0}),h(t,"debounce").switchMap(l=>S(s,"input").debounceTime(l).tap(()=>t.open?a(s):c(s))),S(t,"change").tap(l=>{l.target===t&&s.dispatchEvent(new Event("change",{bubbles:!0}))}),io({host:t,target:r,input:s}),m(to(t),G(s,"value").map(l=>{for(let b of t.options)if(b.value===l)return b})).tap(l=>{for(let b of t.options)b.focused=b.selected=!1;l&&(l.selected=!0),s instanceof jt?s.selected=l:s.value=l?.value,l&&(t.open=!1)})))))}]})}doSearch(t){let n=0,r,o=this.matcher==="substring"?co:this.matcher==="prefix"?sl:this.matcher,c=t?o(String(t)):void 0;for(let i of this.options){let a=!c?.(i);i.hidden=a,i.focused=!(a||n++>0),i.focused&&(r=i)}return r}};var mn=class extends cr{onsearch;doSearch(t){return Nt(this,"search",{detail:t}),this.options[0]}};u(mn,{tagName:"c-autocomplete-dynamic",init:[qn("search")]});var lr=class extends g{};u(lr,{tagName:"c-body",augment:[d(`
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

${X("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),_]});var ur=class extends g{};u(ur,{tagName:"c-button-segmented-view",augment:[d(`
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
		`),Rt,Oe,()=>N(we,{id:"check",name:"check"}),_]});var gn=class extends zt{optionView=ur;size};u(gn,{tagName:"c-button-segmented",init:[fe("size",e=>`{
			font-size: ${14+e*1}px;
			min-height: ${40+e*8}px;
		}`)],augment:[H("listbox"),d(`
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
	${L("label-large")}
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
		`),ve,_,Ie,e=>or({host:e,axis:"x"})]});function uo(e="block"){let t=(n=>{for(let r=12;r>0;r--)n.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,n.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,n.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,n.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,n.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return n})({xl:"",lg:"",md:"",sm:"",xs:""});return d(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${X("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${X("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${X("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${X("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var po=d(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${Ot()}
${dt.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${dt.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),$t=class extends g{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};u($t,{init:[y("sm"),y("xs"),y("md"),y("lg"),y("xl"),y("vpad"),y("pad"),y("center"),y("fill"),y("grow"),y("elevation"),It("color")]});var He=class extends $t{};u(He,{tagName:"c-c",augment:[po,uo(),d(":host([center]) { text-align: center}"),_]});var cl=d(`
:host {
	${K("surface-container")}
	${L("body-medium")}
	border-radius: var(--cxl-shape-corner-medium);
	overflow: hidden;
}
:host([variant=elevated]:not([color])) {
	--cxl-color-surface: var(--cxl-color-surface-container-low);
	z-index: 1;
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=outlined]:not([color])) {
	${K("surface")}
}
:host([variant=outlined]) {
	border: 1px solid var(--cxl-color-outline-variant);
}
${Ot()}
`),Ue=class extends He{variant};u(Ue,{tagName:"c-card",init:[y("variant")],augment:[cl]});var ll=d(`
:host { ${Ci} }
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function ul(e){return m(Je("list",e),h(e,"selected").tap(t=>e.ariaSelected=String(t)))}function mo(e){return m(Ur(e),Ie(e,e,-1),ul(e))}var et=class extends g{disabled=!1;touched=!1;selected=!1};u(et,{init:[y("disabled"),y("touched"),y("selected")],augment:[mo]});var fo=class extends et{size};u(fo,{tagName:"c-item",init:[fe("size",e=>`{min-height:${56+e*8}px}`)],augment:[ll,ve,Rt,H("option"),_,Oe]});var pr=class extends Ue{disabled=!1;touched=!1;selected=!1};u(pr,{tagName:"c-card-item",init:[y("disabled"),y("touched"),y("selected")],augment:[H("option"),...tn,d(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),mo,Oe]});var ht=class extends g{color;size=0};u(ht,{tagName:"c-pill",init:[It("color","surface-container-low"),fe("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[d(`
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
	flex-wrap: nowrap;
	align-self: center;
}
slot[name] { display: inline-block; }
		`),()=>N("slot",{name:"leading"}),_,()=>N("slot",{name:"trailing"})]});var xt=class extends ht{disabled=!1;touched=!1;selected=!1};u(xt,{tagName:"c-chip",init:[y("disabled"),y("touched"),y("selected")],augment:[H("button"),Vr,...tn,d(`
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
	${K("secondary-container")}
}
:host(:hover) { box-shadow: none; }
		`),Oe]});var hn=class extends g{};u(hn,{tagName:"c-span"});var xn=class extends g{center=!1};u(xn,{tagName:"c-backdrop",init:[y("center")],augment:[d(`
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

	`),e=>S(e,"keydown").tap(t=>t.stopPropagation()),_]});var bn=class extends Dt{};u(bn,{tagName:"c-toggle-panel",augment:[_,Ui,Yr]});var pl=d(`
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
${X("small","#drawer { width: 360px }")}

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
`),Ht=class extends g{open=!1;position;responsive;permanent=!1};u(Ht,{tagName:"c-drawer",init:[y("open"),y("position"),x("responsive"),x("permanent")],augment:[pl,d(`
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
`),e=>{let t=ue(!1),n=m(h(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",o=N(bn,{id:"drawer","motion-in":n.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":n.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},_),c=new xn;c.id="backdrop";let i=N("dialog",{id:"dialog"},c,o);return j(e).append(i),m(S(o,"close").tap(()=>i.close()),S(i,"close").tap(()=>e.open=!1),de(e,"drawer.close").tap(()=>e.open=!1).ignoreElements(),G(o,"open").tap(a=>e.open=a),G(e,"open").raf(a=>{a||o.scrollTo(0,0)}),S(c,"click").tap(()=>e.open=!1),S(i,"cancel").tap(a=>{a.preventDefault(),e.open=!1}),h(e,"open").tap(a=>{if(t.value&&e.permanent)return o.open=!0;a?t.value||(Ke.openModal({element:i,close:()=>e.open=!1}),i.getBoundingClientRect()):Ke.currentModal?.element===i&&Ke.modalClosed()}).raf(a=>{o.open=a}),h(e,"responsive").switchMap(a=>a!==void 0?_t(document.body):z("xsmall")).switchMap(a=>{let s=q.breakpoints[e.responsive||"large"],l=q.breakpoints[a]>=s;return t.next(l),l&&o.className!=="permanent"?i.close():!l&&o.className==="permanent"&&(e.open=!1),l&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",l),o.className=l?"permanent":"drawer",G(e,"open").tap(b=>{e.hasAttribute("responsiveon")||$e({target:c,animation:b?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var dr=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,n=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,n)):r.insertBefore(t,n))}empty(){let t=this.end.parentNode;if(!t||this.start.parentNode!==t)return;let n=document.createRange();n.setStartAfter(this.start),n.setEndBefore(this.end),n.deleteContents()}};function ga({source:e,render:t,empty:n,append:r,loading:o}){let c=[],i=document.createDocumentFragment(),a,s;function l(b){if(s?.parentNode?.removeChild(s),!b)return;let A=0;for(let F of b){let U=c[A]?.item;if(U)U.value!==F&&U.next(F);else{let $=ue(F),ee=t($,A,b),J=ee instanceof DocumentFragment?Array.from(ee.childNodes):[ee];c.push({elements:J,item:$}),i.append(ee)}A++}i.childNodes.length&&r(i),a?.remove(),A===0&&n&&r(a=n());let T=c.length;for(;T-- >A;)c.pop()?.elements.forEach(F=>F.remove())}return ne(()=>(s=o?.(),s&&r(s),e.raf(l)))}function fr(e){return ui(()=>{let t=new dr;return[ga({...e,append:n=>t.insert(n)}),t.end]})}function dl(e){if(e instanceof HTMLTemplateElement)return e;throw"Element must be a <template>"}function fl(e,t){let n=e.getRootNode();if(n instanceof Document)return dl(n.getElementById(t));throw new Error("Invalid root node")}function ma(e,t){if(t){if(typeof t=="function")return t;if(typeof t=="string"&&(t=fl(e,t)),t instanceof HTMLTemplateElement)return()=>t.content.cloneNode(!0);throw new Error("Invalid template")}}function ml(e){return h(e,"template").switchMap(t=>t?z(ma(e,t)):Be().map(()=>ma(e,e.children[0])))}function gl(e,t,n){return ml(e).switchMap(r=>{let o=e.target?Lt(e,e.target)??e:e;return r?ga({source:t,render:n?(c,i,a)=>n(r(c,i,a)):r,append:c=>o.append(c)}):R})}var go=class extends g{source;template};u(go,{tagName:"c-each",init:[Z("source"),Z("template")],augment:[_e,_,e=>gl(e,h(e,"source"))]});var yn=class extends gt{};u(yn,{tagName:"c-field-bar",augment:[ro,d(`
:host {
	box-sizing: border-box;
	${K("surface-container-high")}
	${L("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 8px 12px; }
		`)]});var ce=class extends $t{vflex=!1;gap;middle=!1};u(ce,{tagName:"c-flex",init:[y("vflex"),y("gap"),y("middle")],augment:[uo("flex"),po,d(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${dt.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),_]});function hl(e){return Qn("list",e,e.items)}function ha(e){return ca({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:hl(e)})}function xa(e){return la({getFocusable:()=>e.items,getActive:()=>eo(e)})}function xl(e){let t=xa(e);function n(r){return Math.round(r.getBoundingClientRect().left)}return m(ha(e),un({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let r=ut(e)?.activeElement,o=r&&n(r);return t(-1,void 0,o!==void 0?c=>n(c)!==o:void 0)},goDown:()=>{let r=ut(e)?.activeElement,o=r&&n(r);return t(1,void 0,o!==void 0?c=>n(c)!==o:void 0)}}).tap(r=>r.focus()))}var mr=class extends g{items=[]};u(mr,{tagName:"c-grid-list",augment:[H("grid"),d(":host{display:grid;box-sizing:border-box;}"),_,xl]});var Ve=class extends g{pad;vertical=!1};u(Ve,{tagName:"c-hr",init:[y("pad"),y("vertical")],augment:[H("separator"),d(`
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
${dt.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function xo(e){let t=document.createElement("style");return m(oe(n=>{let r=e.persistkey&&Wr.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia("(prefers-color-scheme: dark)").matches),n.signal.subscribe(()=>t.remove())}),qe(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let n=e.open?e.themeon:e.themeoff;e.persistkey&&Wr.set(e.persistkey,n),_i(Mi[n]||n)}),te(e).tap(()=>e.open=!e.open))}var ho=class extends g{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};u(ho,{tagName:"c-toggle-theme",init:[x("persistkey"),x("usepreferred"),x("open"),x("themeon"),x("themeoff")],augment:[H("group"),xo]});var vn=class extends be{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};u(vn,{tagName:"c-icon-toggle-theme",init:[x("persistkey"),x("usepreferred"),x("open"),x("themeon"),x("themeoff")],augment:[xo,e=>le(h(e,"iconon"),h(e,"iconoff"),h(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var bl=()=>{let e;function t(){let n=document.adoptedStyleSheets.indexOf(e);n!==-1&&document.adoptedStyleSheets.splice(n,1)}addEventListener("message",n=>{let{theme:r}=n.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r).catch(o=>console.error(o)),document.adoptedStyleSheets.push(e))})},yl=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(()=>{document.fonts.ready.then(()=>{new ResizeObserver(t).observe(document.documentElement)},n=>console.error(n))})};document.readyState==="complete"?e():addEventListener("load",e)},wn=class extends g{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0;iframe=f("iframe",{loading:"lazy"})};u(wn,{tagName:"c-iframe",init:[x("src"),x("srcdoc"),x("sandbox"),x("handletheme")],augment:[d(`
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
	`),e=>{let t=e.iframe,n=f("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),n.style.display="none";function o(a){r.replaceSync(":host{height:"+a+"px}"),t.style.height="100%",t.style.opacity="1",n.style.display="none"}function c(a){if(a){let s=`<script type="module">
(${yl.toString()})();
(${bl.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${a}${s}`,n.style.display=""}}async function i(a){let s=new URL(a);return`${s.search||s.hash?`<script>history.replaceState(0,0,'about:srcdoc${s.search}${s.hash}');<\/script>`:""}<base href="${a}" />`+await fetch(a).then(l=>l.text())}return j(e).append(t,n),m(le(h(e,"srcdoc"),h(e,"src")).raf(([a,s])=>{(async()=>{c(s?await i(s):a)})().catch(()=>{})}),S(window,"message").tap(a=>{let{height:s}=a.data;a.source===t.contentWindow&&s!==void 0&&o(s)}),h(e,"handletheme").switchMap(a=>a?S(t,"load").switchMap(()=>Tt.raf(s=>{let l=s?.css??"";t.contentWindow?.postMessage({theme:l},"*")})):R),h(e,"sandbox").tap(a=>a===void 0?t.removeAttribute("sandbox"):t.sandbox.value=a))}]});var bo=[d(`
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
${Kt("slot::after")}
	`),ve,ji,_],bt=class extends et{size};u(bt,{tagName:"c-nav-item",init:[fe("size",e=>`{min-height:${56+e*8}px}`)],augment:[H("option"),...bo]});var gr=class extends et{icon="arrow_drop_down";open=!1;target;size};u(gr,{tagName:"c-nav-dropdown",init:[x("icon"),x("target"),y("open"),fe("size",e=>`{min-height:${56+e*8}px}`)],augment:[H("treeitem"),...bo,d(`
:host { padding-inline: 16px 36px; }
.icon { position: absolute; inset-inline-end: 8px; transition: rotate var(--cxl-speed); height:24px;width:24px; }
:host([open]) .icon { rotate: 180deg; }
		`),e=>on(e).raf(({target:t,open:n})=>t.open=n),e=>{let t=N(we,{className:"icon"});return j(e).append(t),m(h(e,"icon").tap(n=>t.name=n))}]});var hr=class extends nn{};u(hr,{tagName:"c-nav-target",augment:[H("group"),d(":host{display:block;padding-inline-start:12px;}")]});var xr=class extends g{};u(xr,{tagName:"c-nav-headline",augment:[d(`
:host{
	color:var(--cxl-color-on-surface-variant);
	font:var(--cxl-font-title-small);
	letter-spacing:var(--cxl-letter-spacing-title-small);
	min-height:48px;
	display:flex;
	align-items: center;
	padding: 0 16px;
}
`),_]});var En=class extends be{open=!1;target;icon="menu"};u(En,{tagName:"c-navbar-toggle",init:[x("target"),Z("open")],augment:[e=>on(e).tap(({target:t,open:n})=>t.open=n)]});function ba(e){return m(h(e,"selected").pipe(fi(e,"selected")),Je("selectable",e),te(e).tap(()=>pe(e,"selectable.action",e)))}var tt=class extends g{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};u(tt,{tagName:"c-option",init:[x("value"),Z("view"),y("selected"),y("hidden"),y("focused")],augment:[H("option"),d(":host{display:contents} :host([hidden]){display:none;}"),aa,ba,e=>{let t;return m(h(e,"view").switchMap(n=>n?(t?.remove(),e.rendered=t=new n,t.appendChild(N("slot")),j(e).append(t),m(h(e,"selected").tap(r=>t?.toggleAttribute("selected",r)),h(e,"focused").tap(r=>t?.toggleAttribute("focused",r)))):(e.rendered=t=void 0,R)))}]});var br=class extends g{};u(br,{tagName:"c-page",augment:[rr,d(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${K("background")}
}`),_]});var yr=class extends g{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};u(yr,{tagName:"c-r",init:[y("xl"),y("lg"),y("md"),y("sm"),y("xs")],augment:[d(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${X("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${X("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${X("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${X("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),_]});var vl=/([^&=]+)=?([^&]*)/g,wl=/:([\w_$@]+)/g,El=/\/\((.*?)\)/g,Sl=/(\(\?)?:\w+/g,Cl=/\*\w+/g,Al=/[-{}[\]+?.,\\^$|#\s]/g,ko="@@cxlRoute",Ee={location:window.location,history:window.history};function kl(e){let t=[];return[new RegExp("^/?"+e.replace(Al,"\\$&").replace(El,"\\/?(?:$1)?").replace(Sl,function(r,o){return t.push(r.substr(1)),o?r:"([^/?]*)"}).replace(Cl,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function Nl(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function yo(e,t){return t?e.replace(wl,(n,r)=>t[r]||""):e}function Ml(e){let t={},n;for(;n=vl.exec(e);)n[1]!==void 0&&(t[n[1]]=decodeURIComponent(n[2]??""));return t}var vo=class{path;regex;parameters;constructor(t){this.path=t=Nl(t),[this.regex,this.parameters]=kl(t)}_extractQuery(t){let n=t.indexOf("?");return n===-1?{}:Ml(t.slice(n+1))}getArguments(t){let r=this.regex.exec(t)?.slice(1);if(!r)return;let o=this._extractQuery(t);return r.forEach((c,i)=>{let a=i===r.length-1?c||"":c?decodeURIComponent(c):"",s=this.parameters[i];s&&(o[s]=a)}),o}test(t){return this.regex.test(t)}toString(){return this.path}},wo=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new vo(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let n=this.definition.render();n[ko]=this;for(let r in t)t[r]!==void 0&&(n[r]=t[r]);return n}},Eo=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(n=>n.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(n=>n.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function Tl(e){return e[ko]}function So(e,t){let n=new URL(e,`http://localhost/${t}`);return{path:n.pathname.slice(1),hash:n.hash.slice(1)}}var Rl={getHref(e){return`${Ee.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Sn()?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&Ee.history.pushState({url:e},"",n)}},deserialize(){return{path:Ee.location.search.slice(1),hash:Ee.location.hash.slice(1)}}};function Sn(){return Ee.history.state}var _l={getHref(e){return`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Sn()?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&Ee.history.pushState({url:e},"",n||"/")}},deserialize(){return{path:Ee.location.pathname,hash:Ee.location.hash.slice(1)}}},ya={getHref(e){return`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ya.getHref(e);Ee.location.hash!==t&&(Ee.location.hash=t)},deserialize(){return So(Ee.location.hash.slice(1),"")}},va={hash:ya,path:_l,query:Rl},Co=class{callbackFn;state;routes=new Eo;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let n=new wo(t);return this.routes.register(n),n}go(t){this.lastGo=t;let n=this.state?.url,r=typeof t=="string"?So(t,n?.path??""):t,o=r.path;if(o!==n?.path){let c=this.routes.findRoute(o);if(!c)throw new Error(`Path: "${o}" not found`);let i=c.path?.getArguments(o);if(c.redirectTo)return this.go(yo(c.redirectTo,i));let a=this.execute(c,i);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${o}" could not be created`);this.updateState({url:r,arguments:i,route:c,current:a,root:this.root})}else this.state&&r.hash!=n.hash&&this.updateState({...this.state,url:r})}getPath(t,n){let o=this.routes.get(t)?.path;return o&&yo(o.toString(),n)}isActiveUrl(t){let n=this.state?.url;if(!n)return!1;let r=So(t,n.path);return!!Object.values(this.instances).find(o=>{let c=o[ko],i=this.state?.arguments;if(c?.path?.test(r.path)&&(!r.hash||r.hash===n.hash)){if(i){let a=c.path.getArguments(r.path);for(let s in a)if(i[s]!=a[s])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,n){let r=this.instances[t],o;if(r)for(o in n){let c=n[o];c!==void 0&&(r[o]=c)}return r}executeRoute(t,n,r){let o=t.parent,c=o&&this.routes.get(o),i=t.id,a=c&&this.executeRoute(c,n,r),s=this.findRoute(i,n)||t.create(n);return a?s.parentNode!==a&&a.appendChild(s):this.root=s,r[i]=s,s}discardOldRoutes(t){let n=this.instances;for(let r in n){let o=n[r];o&&t[r]!==o&&(o.parentNode?.removeChild(o),delete n[r])}}execute(t,n){let r={},o=this.executeRoute(t,n||{},r);return this.discardOldRoutes(r),this.instances=r,o}},Ut=new kt,wa=new kt,me=new Co(()=>Ut.next());function Il(e){let t=e;for(;t;){let n=t.scrollHeight>t.clientHeight?t:null;if(n&&n.scrollTop!==0){n.scrollTo(0,0);return}if(t.assignedSlot){t=t.assignedSlot;continue}if(t.parentElement){t=t.parentElement;continue}let r=t.getRootNode();t=r instanceof ShadowRoot?r.host:null}}function Ea(e){let t;return Ut.tap(()=>{let{root:n}=me.getState();n.parentNode!==e?e.appendChild(n):t&&t!==n&&t.parentNode&&e.removeChild(t),t=n}).raf(()=>{let n=me.getState().url;if(n.hash)e.querySelector(`#${n.hash},a[name="${n.hash}"]`)?.scrollIntoView();else{let r=Sn()?.lastAction;e.parentElement&&r&&r!=="pop"&&Il(e)}})}function Ol(e,t=va.query){return m(oe(()=>wa.next(t)),e.tap(()=>me.go(t.deserialize())),Ut.tap(()=>t.serialize(me.getState().url))).catchError(n=>{if(n?.name==="SecurityError")return R;throw n})}function Dl(){return ze(z(location.hash.slice(1)),S(window,"hashchange").map(()=>location.hash.slice(1)))}var vr;function Ll(){if(!vr){vr=new Wt(history.state);let e=history.pushState;history.pushState=function(...t){let n=e.apply(this,t),r=Sn();return r&&(r.lastAction="push",vr?.next(r)),n}}return m(S(window,"popstate").map(()=>{let e=Sn();return e&&(e.lastAction="pop"),e}),vr)}function Fl(){let e;return m(Dl(),Ll()).map(()=>window.location).filter(t=>{let n=t.href!==e;return e=t.href,n})}var cx=Ut.raf().map(()=>{let e=[],t=me.getState(),n=t.current;do n.routeTitle&&e.unshift({title:n.routeTitle,first:n===t.current,path:Pl(n)});while(n=n.parentNode);return e});function Pl(e){let t=Tl(e);return t&&yo(t.path?.toString()||"",me.state?.arguments||{})}function wr(e,t,n=t){return m(le(wa,qe(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),te(t).tap(r=>{e.target||r.preventDefault()}),te(n).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):me.go(e.href))}))}function zl(e,t){let n=document.createElement("div");return n.style.display="contents",n.routeTitle=t,n.appendChild(e.content.cloneNode(!0)),n}var Ao=class extends g{strategy="query";get state(){return me.state}go(t){return me.go(t)}};u(Ao,{tagName:"c-router",init:[x("strategy")],augment:[e=>{function t(n){let r=n.dataset;if(r.registered)return;r.registered="true";let o=r.title||void 0;me.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:n.hasAttribute("data-default"),redirectTo:r.redirectto,render:zl.bind(null,n,o)})}return Be().switchMap(()=>{for(let n of Array.from(e.children))n instanceof HTMLTemplateElement&&t(n);return m(jn(e).tap(n=>{n.type==="added"&&n.value instanceof HTMLTemplateElement&&t(n.value)}),h(e,"strategy").switchMap(n=>{let r=va[n];return Ol(Fl(),r).catchError((o,c)=>(console.error(o),c))}))})}]});function Mo(e,t=e){return m(Bl(e,t).ignoreElements(),Ut.map(()=>e.href!==void 0&&me.isActiveUrl(e.href)))}function Bl(e,t=e){let n=N("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return n.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,j(e).append(n),m(wr(e,n),S(n,"click").tap(r=>{r.stopPropagation(),Jt(r)||e.dispatchEvent(new PointerEvent(r.type,r)),pe(e,"drawer.close",void 0)}),te(t).tap(r=>{Jt(r)&&n.click()}))}var No=class extends g{href};u(No,{tagName:"c-router-selectable",init:[x("href")],augment:[_e,()=>N("slot"),e=>ne(()=>{let t=e.parentElement;return Mo(e,t).raf(n=>{t.selected=n})})]});var Cn=class extends bt{href;external=!1;target};u(Cn,{tagName:"c-router-item",init:[x("href"),x("external"),x("target")],augment:[e=>Mo(e).tap(t=>{e.selected=t})]});var yt=class extends g{href;focusable=!1;external=!1;dismiss=!1;target};u(yt,{tagName:"c-router-link",init:[x("href"),x("focusable"),x("external"),x("target"),x("dismiss")],augment:[d(`
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
	`),e=>{let t=N("a",{className:"link"},N("slot"));return j(e).append(t),m(h(e,"focusable").tap(n=>t.tabIndex=n?0:-1),Yi(e),wr(e,t))}]});var An=class extends yt{focusable=!0};u(An,{tagName:"c-router-a",augment:[d(`
:host{text-decoration:underline;}
.link { display:inline-block; }
:host(:focus-within) .link { outline:var(--cxl-color-primary) auto 1px; }
`)]});var kn=class extends g{};u(kn,{tagName:"c-router-outlet",init:[],augment:[H("main"),_e,Ea,_]});var Q=class extends g{font};u(Q,{tagName:"c-t",init:[y("font")],augment:[d(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${Si.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${L("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${L("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${L("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${L("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${L("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${L("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),_,e=>h(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var To=class extends An{};u(To,{tagName:"doc-a"});var vt=class extends yn{};u(vt,{tagName:"doc-search-input",augment:[e=>{let t=ue([]),n=f(mn,{$:r=>S(r,"search").tap(o=>{let c=o.detail,i=[],a=1e3;if(c){let s=lo(c);for(let l of CONFIG.symbols)if(s.test(l.name)&&(i.push(l),a--<0))break}t.next(i)})},fr({source:t,render:r=>f(tt,{value:r.map(o=>o.href)},r.map(o=>o.name)),empty:()=>f(He,{slot:"empty",pad:16},"No Results Found")}));n.style.maxHeight="50%",e.size=-2,e.append(f(we,{name:"search"}),f(jt,{$:r=>h(r,"selected").tap(o=>{let c=o?.value;c&&(CONFIG.spa?me.go(c):location.href=c,r.value="")})}),n)}]});var Nn=class extends g{};u(Nn,{tagName:"doc-search",augment:[d(`
:host { display: block; }
c-appbar-contextual {
	position: absolute;
	inset: 0;
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	z-index: 1;
}
		`),e=>{let t=f(nr),n=f(rn,{target:t},f(be,{icon:"search"})),r=f(vt);return e.shadowRoot?.append(t,n),_t(document.body).tap(o=>{o==="xsmall"?(t.style.display="",n.style.display="",t.append(r)):(t.open=!1,t.style.display="none",n.style.display="none",r.parentNode!==e.shadowRoot&&e.shadowRoot?.append(r))})}]});var Mn=class extends an{sticky=!0};u(Mn,{tagName:"doc-appbar",augment:[d(X("large",":host{display:none}")),e=>{e.append(f(En,{target:"navbar"}),f(ce,{grow:!0},CONFIG.packageName),f(Nn))}]});var jl=["Property","Method","Function","Event","Class","Namespace","Interface","Enum","TypeAlias","Attribute","Component","Constant"],Sa=jl.map(e=>`:host([kind=${e}]){--cxl-color-surface:var(--3doc-chip-${e}-bg);--cxl-color-on-surface:var(--3doc-chip-${e}-fg)}`).join(""),Ge=class extends ht{kind;size=-1};u(Ge,{tagName:"doc-pill",init:[y("kind")],augment:[d(`
:host { ${L("code")}; border: 0; }
${Sa}`)]});var Tn=class extends xt{kind;size=-1};u(Tn,{tagName:"doc-chip",init:[y("kind")],augment:[d(`
:host { ${L("code")} }
${Sa}`)]});var Ro=class extends g{name;kind};u(Ro,{tagName:"doc-card",init:[x("kind"),x("name")],augment:[d(`
:host{
	display:block;
	margin: 24px 0;
	scroll-margin-top: 80px;
}
:host(:target) {
	outline: 2px dashed var(--cxl-color-primary);
}
c-accordion-panel{ border: 0; }
#header { 
	padding: 12px 16px;
	display: flex;
	align-items: center;
	gap: 8px;
	border-bottom: 1px solid var(--cxl-color-outline-variant);
	${K("surface-container-high")}	
}
#body { padding: 16px; }
#title { margin-inline-end: auto; }
${X("medium",":host{}")}
		`),e=>{e.shadowRoot?.append(f(Ue,{color:"surface",variant:"outlined"},f("div",{id:"header"},f(Ge,{kind:h(e,"kind")},h(e,"kind")),f(Q,{id:"title",font:"title-medium"},h(e,"name")),f("slot",{name:"tags"})),f("div",{id:"body"},f("slot"))))}]});var Rn=class extends g{language="html";formatter=t=>{let n;try{n=hljs.highlight(t,{language:this.language}).value}catch{n=t}return`<code>${n}</code>`}};u(Rn,{tagName:"doc-hl",init:[x("language")],augment:[d(`
:host {
	display: block;
	padding:16px; border-radius: 8px;
	${K("surface-container")}
}
.hljs {
	white-space: pre-wrap; font: var(--cxl-font-code);
}
.hljs-comment,
.hljs-quote {
	color: var(--hljs-comment);
	font-style: italic;
}
.hljs-operator,
.hljs-punctuation,
.hljs-subst,
.hljs-name,
.hljs-section,
.hljs-selector-tag,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-selector-id,
.hljs-variable,
.hljs-template-variable {
	color: var(--hljs-structure);
}
.hljs-attribute,
.hljs-attr,
.hljs-meta-string {
	color: var(--hljs-attr);
}
.hljs-keyword,
.hljs-literal,
.hljs-built_in,
.hljs-doctag,
.hljs-formula {
	color: var(--hljs-keyword);
}
.hljs-function .hljs-title,
.hljs-title.function_ {
	color: var(--hljs-fn-title);
}
.hljs-function,
.hljs-params {
	color: var(--hljs-structure);
}
.hljs-type,
.hljs-class .hljs-title,
.hljs-title.class_ {
	color: var(--hljs-type);
}
.hljs-interface .hljs-title {
	color: var(--hljs-interface-title);
}
.hljs-string,
.hljs-regexp {
	color: var(--hljs-string);
	opacity: 0.85;
}
.dark .hljs-string,
.dark .hljs-regexp {
	opacity: 0.88;
}
.hljs-number {
	color: var(--hljs-number);
}
.hljs-meta,
.hljs-tag {
	color: var(--hljs-meta);
}
.hljs-tag .hljs-name {
	color: var(--hljs-attr);
}
.hljs-emphasis {
	font-style: italic;
}
.hljs-strong {
	font-weight: 700;
}
.hljs-link {
	text-decoration: underline;
}

	`),e=>{let t=f("div",{className:"hljs"});return t.style.tabSize="4",j(e).append(t),Te(e).switchMap(()=>Vn(e).raf(()=>{let n=Array.from(e.childNodes).map(r=>r.textContent).join("");t.innerHTML=n&&e.formatter?e.formatter(n):n}))}]});var _o=class extends g{};u(_o,{tagName:"doc-grd",augment:[d(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${X("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${X("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${X("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),_]});var _n=class extends g{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};u(_n,{tagName:"doc-demo-bare",init:[x("view"),x("libraries"),x("header")],augment:[d(`
  :host {
    display: flex;
    flex-direction: column;
	gap: 8px; 
	margin: 32px 0;
  }
  #body {
    position: relative;
    border: 1px solid var(--cxl-color-outline-variant);
    border-radius: 8px;
	overflow: hidden;
	min-height:138px;
  }
  #view { margin-left: auto; }
  
  .parent {
    visibility: hidden; 
    flex-grow: 1;
  }
  .container {
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    max-height: 740px;
    overflow: hidden;
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
    min-height: 64px;
	position: absolute;
	inset: 0;
	padding: 16px;
	text-align: initial;
	white-space: pre-wrap;
  }
  
  .visible { display: block; visibility: visible; }
  .hide { display: none; }
  .tabs { flex-grow: 1; }
  
  #toolbar {
	gap: 16px;
	align-items: end;
	display: flex;
  }
	`),e=>{let t=h(e,"view"),n=ue("container"),r=f(wn,{className:n}),o=f(Rn,{className:t.map(l=>l==="source"?"source visible":"source")}),c=f("div",{id:"toolbar"},f("slot",{name:"toolbar"}),f(be,{$:l=>te(l).mergeMap(async()=>{await navigator.clipboard.writeText(i),l.icon="done",setTimeout(()=>l.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(l=>l==="source"?"icon":"icon hide")}),f(gn,{$:l=>h(l,"value").tap(b=>{e.view=b}),id:"view",size:-2},f(tt,{value:"desktop"},"Preview"),f(tt,{value:"source"},"Code"))),i;function a(l){let b=l==="desktop";n.next(b?"container":"container cmobile")}function s(){let l=e.childNodes[0]?.textContent?.trim()||"";if(!l)return;let b=e.libraries?e.libraries.split(",").map(A=>`<script type="module" src="${e.getLibraryUrl(A)}"><\/script>`).join(""):"";r.srcdoc=`${e.header}${b}${l}`,i=l,o.replaceChildren(new Text(l))}return j(e).append(c,f("div",{id:"body"},f(hn,{className:t.map(l=>l==="source"?"parent":`parent visible ${l}`)},r),o)),m(h(e,"view").tap(a),Te(e).switchMap(()=>Vn(e).raf(s)))}]});var In=class extends _n{header=this.getHeader();getHeader(){let t="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";return typeof CONFIG<"u"?t+`${CONFIG.demoStyles?`<style>${CONFIG.demoStyles}</style>`:""}${CONFIG.demoScripts?.map(n=>`<script type="module" src="${n}"><\/script>`).join("")??""}`:t}};u(In,{tagName:"doc-demo"});function Ca(e){let t=e.index;function n(a){if(!(!a||typeof a=="string")&&typeof a=="number")return t.find(s=>s.id===a)}function r(a){if(!(!a||typeof a=="string")){if(typeof a=="number"){let s=t.find(l=>l.id===a);return s&&(s.kind===4||s.kind===8)?s:s?r(s.resolvedType??s.type):void 0}return a.kind===6?n(a.type):a.resolvedType&&typeof a.resolvedType!="string"?a.resolvedType:a}}function o(a,s){if(a.children){for(let l of a.children)!l.name||l.flags&&l.flags&128||(s[l.name]??=l);return s}}function c(a,s={}){o(a,s);let l=r(a.type);if(l?.children)for(let b of l.children){let A=r(b);if(!A||A.kind!==35||A.name==="Component")break;c(A,s)}return s}function i(a){return a.kind===17||a.kind===16||a.kind===11||a.kind===13}return{getNodeProperties:c,getTypeSummary:r,isFunction:i,getRef:n,json:e}}var Ul={31:"Constants",1:"Variables",4:"Interfaces",8:"Classes",10:"Properties",11:"Methods",12:"Getters",13:"Setters",14:"Constructor",16:"Functions",22:"Enums",35:"Components",36:"Attributes",2:"Type Alias",38:"Call Signature",39:"Construct Signature",44:"Events",24:"Index Signature",25:"Exports",37:"Namespaces"};function Aa(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function Vl(e){return e.name?`docs/ui-${e.name}`:void 0}function Gl(e){let t=Vl(e),n=e.name??"?";return t?f("a",{href:t},n):n}function ka({summary:e,summaryJson:t,link:n=Gl,uiCdn:r,importmap:o}){let{getTypeSummary:c,getRef:i,isFunction:a}=Ca(t),s=t.index;function l(E){if(E)return typeof E=="string"?E:c(E)??(typeof E=="number"?void 0:E.name)}function b(E){return E?"&lt;"+E.map(C=>T(C)+(C.kind!==6&&C.type?` extends ${T(C.type)}`:"")).join(", ")+"&gt;":""}function A(E){return["{ ",...E.children?.map(ge).flatMap(J("; "))??[]," }"]}function T(E){let C=l(E);if(!C||typeof C=="string")return[C||"?"];switch(C.kind){case 5:return C.children?.map(T).flatMap(J(" | "))??[];case 23:case 32:return[C.name??"?"];case 34:return A(C);case 15:return[...T(C.type),"[]"];case 4:case 8:case 35:{let B=C.typeP?b(C.typeP):void 0;return[n(C),B]}case 17:return ge(C);case 33:{let B=i(E);return[B?n(B):C.name??"?"]}case 21:return[...T(C.children?.[0]),"[",...T(C.children?.[1]),"]"];default:console.log(C)}return[]}function F(E){let C=E.flags??0;return[`${`${C&4?"public ":C&8?"private":C&16?"protected ":""}${C&262144?"...":""}${E.name}${C&524288?"?":""}`}: `,...T(E.type)]}function U(E){return["(",...E?.map(F).flatMap(J(", "))??[],")"]}function $(E){let C=E.flags??0,B=E.kind===12?"get ":E.kind===13?"set ":void 0;return[C&32?"static ":"",C&64?"readonly ":"",C&128?"abstract ":"",B]}function ee(E){return["[",...E.parameters?.flatMap(ge)??[],"]: ",...E.type?T(E.type):["?"]]}function J(E){return(C,B)=>B!==0?[...E,...C]:C}function ge(E){if(E.kind===24)return ee(E);if(E.kind===45&&E.children?.[0])return["...",...T(E.children[0])];let C=E.flags&&E.flags&524288,B=a(E)?U(E.parameters):[],p=E.kind===17;return[...$(E),E.name,C?"?":"",...B,p?" => ":": ",...T(E.resolvedType??E.type)]}function Le(E){return[f("h3",{},f(Q,{font:"title-large"},...ge(E))),...ot(E)]}function Se(E,C){if(!E.children)return[];let B={};for(let p of E.children)p.kind!==14&&p.kind!==0&&(p.flags||0)&4&&!C?.(p)&&(B[p.kind]??={name:Ul[p.kind]??"",nodes:[]}).nodes.push(p);return Object.values(B).sort(Vi("name")).flatMap(p=>[f("h2",{},p.name),...p.nodes.flatMap(Le)])}function rt(E){let C="";E=E.replace(/<caption>(.+?)<\/caption>/,(k,P)=>(C=P,""));let B=`<style>html{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,p=(o??"")+`<script type="module" src="${r}"><\/script>`,v=f(In,{header:B+p},E);return[C?f(Q,{font:"title-medium"},C):void 0,v]}function Fe(E){return s.find(C=>C.name===E)}function Yt(E){let C=E.flatMap(B=>{let p=B.value,v=Aa(p);if(typeof p=="string"){let k=Fe(p);v=k?n(k):p}return[v,", "]});return C.pop(),f("p",{},"Related: ",C)}function he({src:E}){let C=f("div");return C.textContent=E,C}function ot(E){let C=E.docs;if(!C?.content)return[];let B=[],p=C.content.flatMap(v=>{let k=Aa(v.value);return v.tag==="icon"||v.tag==="title"?[]:v.tag==="example"||v.tag==="demo"||v.tag==="demoonly"?rt(k):v.tag==="see"?(B.push(v),[]):v.tag==="return"?[f(Q,{font:"headline-small"},"Returns"),f("p",void 0,k)]:v.tag==="param"?[f("p",void 0,k)]:[v.tag?f("p",void 0,`${v.tag}: `,k):he({src:k})]});return B.length&&p.push(Yt(B)),p}function St(E){let C=[],B=c(E);if(!(!B||B.kind!==33))return B.children?.forEach(p=>{if(typeof p!="object")return;let v=c(p);v&&v.name!=="Component"&&C.push(n(v))}),f(Q,{font:"headline-small"}," ",...C.length?["extends ",C]:[])}function Ct(E){let C=c(E.type),B=[];if(!C?.children)return[];for(let p of C.children){let v=c(p);if(!v||v.kind!==35||v.name==="Component")break;let k=Se(v,P=>!!((P.flags??0)&128));k.length&&B.push(f("br"),f(Q,{font:"h6"},"Inherited from ",n(v)),...k),B.push(...Ct(v))}return B}let At=e.kind===35&&e.docs?.tagName;return f("div",{},f("h1",{},e.name," ",e.type&&St(e.type)," ",At?f(Q,{font:"title-medium"},`<${At}>`):""),...ot(e),...Se(e),...Ct(e))}var On=class extends g{name;summary;uicdn;importmap=""};u(On,{tagName:"doc-page",init:[Z("name"),Z("summary"),Z("uicdn")],augment:[e=>qe(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,n=e.summary.index.find(r=>r.name===t);n&&e.append(ka({summary:n,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});q.colors["outline-variant"]="rgb(219, 221, 225)";var Io=class extends ft{summary;sheetstart=!0};u(Io,{tagName:"doc-root",augment:[e=>{let t=lt();fetch("summary.json").then(n=>n.json()).then(n=>t.next(n)).catch(n=>console.error(n)),e.append(f(On,{summary:t}))}]});var Oo=class extends g{summary;selected};u(Oo,{tagName:"doc-nav-list",init:[Z("summary"),Z("selected")],augment:[e=>fr({source:h(e,"summary").map(t=>t?.index),render:t=>f(bt,{$:n=>te(n).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?f(xt,{size:-2},"beta"):void 0)})(e)]});var Do=class extends Cn{};u(Do,{tagName:"doc-item"});q.globalCss+=`
doc-ct { gap:8px;margin-bottom:24px;white-space:wrap;font:var(--cxl-font-code);font-size:18px;display:flex;align-items:center; }
doc-card dl { display: flex; flex-direction: column; }
doc-card dt { border-inline-start: 2px solid var(--cxl-color-outline-variant); padding-inline-start: 16px; }
doc-card dd { border-inline-start: 2px solid var(--cxl-color-outline-variant); margin-inline-start: 0; padding-inline-start: 16px; margin-bottom:16px; }
:last-child{margin-bottom:0}
code{border-radius:4px;background-color:var(--cxl-color-surface-container);color:var(--cxl-color-on-surface);padding:2px 4px;${L("code")}}
`;var Lo=class extends g{};u(Lo,{tagName:"doc-app",augment:[d(`
:host {
	display:contents;
	--hljs-comment: rgba(51, 65, 85, 0.55);
	--hljs-structure: rgba(15, 23, 42, 0.78);
	--hljs-attr: rgb(18, 152, 186);
	--hljs-keyword: rgb(184, 90, 0);
	--hljs-fn-title: rgb(36, 143, 71);
	--hljs-type: rgb(67, 56, 202);
	--hljs-interface-title: rgb(190, 18, 60);
	--hljs-string: rgb(184, 90, 0);
	--hljs-number: rgba(15, 23, 42, 0.86);
	--hljs-meta: rgba(15, 23, 42, 0.65);
	  --3doc-chip-Property-bg: rgb(227, 247, 252);
  --3doc-chip-Property-fg: rgb(18, 152, 186);

  --3doc-chip-Method-bg: rgb(231, 249, 237);
  --3doc-chip-Method-fg: rgb(36, 143, 71);

  --3doc-chip-Function-bg: rgb(231, 249, 237);
  --3doc-chip-Function-fg: rgb(36, 143, 71);

  --3doc-chip-Event-bg: rgb(247, 242, 255);
  --3doc-chip-Event-fg: rgb(117, 55, 199);

  --3doc-chip-Class-bg: rgb(255, 244, 229);
  --3doc-chip-Class-fg: rgb(184, 90, 0);

  --3doc-chip-Namespace-bg: rgb(238, 242, 255);
  --3doc-chip-Namespace-fg: rgb(67, 56, 202);

  --3doc-chip-Interface-bg: rgb(255, 241, 242);
  --3doc-chip-Interface-fg: rgb(190, 18, 60);

  --3doc-chip-Enum-bg: rgb(240, 253, 250);
  --3doc-chip-Enum-fg: rgb(13, 148, 136);

  --3doc-chip-TypeAlias-bg: rgb(254, 249, 195);
  --3doc-chip-TypeAlias-fg: rgb(161, 98, 7);

  --3doc-chip-Attribute-bg: rgb(240, 249, 255);
  --3doc-chip-Attribute-fg: rgb(3, 105, 161);

  --3doc-chip-Component-bg: rgb(243, 232, 255);
  --3doc-chip-Component-fg: rgb(126, 34, 206);
    --3doc-chip-Constant-bg: rgb(241, 245, 249);
  --3doc-chip-Constant-fg: rgb(51, 65, 85);
}
c-application[theme=dark] {
	--hljs-comment: rgba(148, 163, 184, 0.58);
	--hljs-structure: rgba(226, 232, 240, 0.82);
	--hljs-attr: rgb(56, 189, 248);
	--hljs-keyword: rgb(251, 146, 60);
	--hljs-fn-title: rgb(74, 222, 128);
	--hljs-type: rgb(129, 140, 248);
	--hljs-interface-title: rgb(251, 113, 133);
	--hljs-string: rgb(251, 146, 60);
	--hljs-number: rgba(226, 232, 240, 0.88);
	--hljs-meta: rgba(226, 232, 240, 0.62);
	--3doc-chip-Property-bg: rgb(8, 47, 73);
  --3doc-chip-Property-fg: rgb(103, 232, 249);

  --3doc-chip-Method-bg: rgb(20, 83, 45);
  --3doc-chip-Method-fg: rgb(134, 239, 172);

  --3doc-chip-Function-bg: rgb(20, 83, 45);
  --3doc-chip-Function-fg: rgb(134, 239, 172);

  --3doc-chip-Event-bg: rgb(59, 7, 100);
  --3doc-chip-Event-fg: rgb(216, 180, 254);

  --3doc-chip-Class-bg: rgb(124, 45, 18);
  --3doc-chip-Class-fg: rgb(253, 186, 116);

  --3doc-chip-Namespace-bg: rgb(30, 27, 75);
  --3doc-chip-Namespace-fg: rgb(165, 180, 252);

  --3doc-chip-Interface-bg: rgb(76, 5, 25);
  --3doc-chip-Interface-fg: rgb(253, 164, 175);

  --3doc-chip-Enum-bg: rgb(19, 78, 74);
  --3doc-chip-Enum-fg: rgb(94, 234, 212);

  --3doc-chip-TypeAlias-bg: rgb(120, 53, 15);
  --3doc-chip-TypeAlias-fg: rgb(253, 230, 138);

  --3doc-chip-Attribute-bg: rgb(12, 74, 110);
  --3doc-chip-Attribute-fg: rgb(125, 211, 252);

  --3doc-chip-Component-bg: rgb(76, 29, 149);
  --3doc-chip-Component-fg: rgb(221, 214, 254);
    --3doc-chip-Constant-bg: rgb(30, 41, 59);
  --3doc-chip-Constant-fg: rgb(226, 232, 240);
}
#body{overflow:hidden; flex-grow: 1;}
#page { padding: 16px; flex-grow: 1; ${L("body-large")}; overflow-y: auto; }
#pagebody { margin: 0 auto; max-width:1200px; }
#navbar[responsiveon] {
	overflow:hidden; width:320px;
	box-sizing: border-box;
	flex-grow: 1;
}
::slotted([slot=navbar]) { padding: 8px; }
c-application { opacity: 0; }
c-application[ready] { opacity: 1; }
#version{margin-left:auto;}
#navbar-container {
	max-width:320px;
	width: 0;
	visibility: hidden;
	${K("surface-container-low")}}
${X("large",`
#navbar-container { width: auto; visibility: visible; }
#page { padding: 48px 32px; }
`)}
		`),e=>{e.style.opacity="1";let t=f(Ht,{id:"navbar",responsive:"large"},f("slot",{name:"navbar"})),n=f(ft,void 0,f(Mn),f(ce,{id:"body"},f(ce,{vflex:!0,id:"navbar-container"},f(ce,{pad:16,vpad:24,middle:!0},f(Q,{font:"title-medium"},CONFIG.packageName),f(Q,{id:"version",font:"title-small"},CONFIG.activeVersion)),f(Ve),f(He,{pad:16},f(vt)),t,f(Ve),f(ce,{pad:16},f(ce,{grow:!0}),f(vn,{persistkey:"3doc.theme"}))),f("div",{id:"page"},f("div",{id:"pagebody"},f("slot")))));e.shadowRoot?.append(n),e.append(new kn)}]});var Fo=class extends g{module;kind;tags};u(Fo,{tagName:"doc-page-header",init:[x("kind"),x("tags"),x("module")],augment:[d(`
:host { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
#title { margin-inline-end: auto; }
		`),e=>{e.shadowRoot?.append(f(Q,{font:"title-small"},h(e,"module")),f(ce,{gap:16,middle:!0},f(Ge,{kind:h(e,"kind")},h(e,"kind")),f(Q,{font:"headline-small",id:"title"},f("slot")),f("slot",{name:"tags"})),f(Ve))}]});var Po=class extends Ue{};u(Po,{tagName:"doc-members",augment:[d(`
:host { display: flex; flex-direction: column; gap: 16px; margin: 32px 0; }
		`),e=>{e.variant="outlined",e.color="surface-container-low",e.pad=16,e.shadowRoot?.prepend(f(Q,{font:"title-small"},"Members"))}]});var zo=class extends g{href};u(zo,{tagName:"doc-member",init:[x("href")],augment:[d(`
		`),e=>{e.shadowRoot?.append(f(yt,{href:h(e,"href")},f(Tn,void 0,f("slot"))))}]});var Bo=class extends g{kind};u(Bo,{tagName:"doc-group",init:[x("kind")],augment:[d(`
:host { display: flex; flex-direction: column; gap: 8px; }
c-flex { flex-wrap: wrap; }
		`),e=>{e.shadowRoot?.append(f(ce,{gap:16,middle:!0},f(Ge,{kind:h(e,"kind")},h(e,"kind")),f(Q,{font:"title-small"},"")),f(ce,{gap:8,middle:!0},f("slot")))}]});var Wa=ys(Ya(),1);var kr=Wa.default;function qa(e){let t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r=/[\p{L}0-9._:-]+/u,o={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},c={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},i=e.inherit(c,{begin:/\(/,end:/\)/}),a=e.inherit(e.APOS_STRING_MODE,{className:"string"}),s=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:r,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[o]},{begin:/'/,end:/'/,contains:[o]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[c,s,a,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[c,i,s,a]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},o,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[s]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}var Nr="[A-Za-z$_][0-9A-Za-z$_]*",Za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Xa=["true","false","null","undefined","NaN","Infinity"],Ja=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Qa=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ka=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],es=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ts=[].concat(Ka,Ja,Qa);function Lu(e){let t=e.regex,n=(k,{after:P})=>{let W="</"+k[0].slice(1);return k.input.indexOf(W,P)!==-1},r=Nr,o={begin:"<>",end:"</>"},c=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(k,P)=>{let W=k[0].length+k.index,ie=k.input[W];if(ie==="<"||ie===","){P.ignoreMatch();return}ie===">"&&(n(k,{after:W})||P.ignoreMatch());let ye,it=k.input.substring(W);if(ye=it.match(/^\s*=/)){P.ignoreMatch();return}if((ye=it.match(/^\s+extends\s+/))&&ye.index===0){P.ignoreMatch();return}}},a={$pattern:Nr,keyword:Za,literal:Xa,built_in:ts,"variable.language":es},s="[0-9](_?[0-9])*",l=`\\.(${s})`,b="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",A={className:"number",variants:[{begin:`(\\b(${b})((${l})|\\.)?|(${l}))[eE][+-]?(${s})\\b`},{begin:`\\b(${b})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},T={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},F={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,T],subLanguage:"xml"}},U={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,T],subLanguage:"css"}},$={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,T],subLanguage:"graphql"}},ee={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,T]},ge={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:r+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},Le=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,F,U,$,ee,{match:/\$\d+/},A];T.contains=Le.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(Le)});let Se=[].concat(ge,T.contains),rt=Se.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(Se)}]),Fe={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:rt},Yt={variants:[{match:[/class/,/\s+/,r,/\s+/,/extends/,/\s+/,t.concat(r,"(",t.concat(/\./,r),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,r],scope:{1:"keyword",3:"title.class"}}]},he={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ja,...Qa]}},ot={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},St={variants:[{match:[/function/,/\s+/,r,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[Fe],illegal:/%/},Ct={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function At(k){return t.concat("(?!",k.join("|"),")")}let E={match:t.concat(/\b/,At([...Ka,"super","import"].map(k=>`${k}\\s*\\(`)),r,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},C={begin:t.concat(/\./,t.lookahead(t.concat(r,/(?![0-9A-Za-z$_(])/))),end:r,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},B={match:[/get|set/,/\s+/,r,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},Fe]},p="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",v={match:[/const|var|let/,/\s+/,r,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(p)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[Fe]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:rt,CLASS_REFERENCE:he},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),ot,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,F,U,$,ee,ge,{match:/\$\d+/},A,he,{scope:"attr",match:r+t.lookahead(":"),relevance:0},v,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[ge,e.REGEXP_MODE,{className:"function",begin:p,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:rt}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:o.begin,end:o.end},{match:c},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},St,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[Fe,e.inherit(e.TITLE_MODE,{begin:r,className:"title.function"})]},{match:/\.\.\./,relevance:0},C,{match:"\\$"+r,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[Fe]},E,Ct,Yt,B,{match:/\$[(.]/}]}}function ns(e){let t=e.regex,n=Lu(e),r=Nr,o=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],c={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},i={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:o},contains:[n.exports.CLASS_REFERENCE]},a={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},s=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],l={$pattern:Nr,keyword:Za.concat(s),literal:Xa,built_in:ts.concat(o),"variable.language":es},b={className:"meta",begin:"@"+r},A=($,ee,J)=>{let ge=$.contains.findIndex(Le=>Le.label===ee);if(ge===-1)throw new Error("can not find mode to replace");$.contains.splice(ge,1,J)};Object.assign(n.keywords,l),n.exports.PARAMS_CONTAINS.push(b);let T=n.contains.find($=>$.scope==="attr"),F=Object.assign({},T,{match:t.concat(r,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,T,F]),n.contains=n.contains.concat([b,c,i,F]),A(n,"shebang",e.SHEBANG()),A(n,"use_strict",a);let U=n.contains.find($=>$.label==="func.def");return U.relevance=0,Object.assign(n,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),n}kr.registerLanguage("html",qa);kr.registerLanguage("typescript",ns);window.hljs=kr;export{lr as Body,pr as CardItem,Io as ComponentList,To as DocA,Lo as DocApp,Mn as DocAppbar,Ro as DocCard,Rn as DocCode,In as DocDemo,_o as DocGrid,Bo as DocGroup,Do as DocItem,zo as DocMember,Po as DocMembers,Ht as Drawer,mr as GridList,Ve as Hr,we as Icon,gr as NavDropdown,xr as NavHeadline,Oo as NavList,hr as NavTarget,On as Page,Fo as PageHeader,yr as R,br as UiPage};
