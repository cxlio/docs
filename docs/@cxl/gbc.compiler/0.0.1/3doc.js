var _a=Object.create;var gr=Object.defineProperty;var Ia=Object.getOwnPropertyDescriptor;var Da=Object.getOwnPropertyNames;var Oa=Object.getPrototypeOf,La=Object.prototype.hasOwnProperty;var Fa=(e,t)=>()=>(e&&(t=e(e=0)),t);var Pa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ba=(e,t)=>{for(var n in t)gr(e,n,{get:t[n],enumerable:!0})},za=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Da(t))!La.call(e,o)&&o!==n&&gr(e,o,{get:()=>t[o],enumerable:!(r=Ia(t,o))||r.enumerable});return e};var Ha=(e,t,n)=>(n=e!=null?_a(Oa(e)):{},za(t||!e||!e.__esModule?gr(n,"default",{value:e,enumerable:!0}):n,e));var qo={};Ba(qo,{default:()=>vs,theme:()=>Wo});var ys,Wo,vs,Xo=Fa(()=>{"use strict";ys={primary:"#8ECFF2","on-primary":"#003548","primary-container":"#004D67","on-primary-container":"#C1E8FF",secondary:"#B5C9D7","on-secondary":"#1F333D","secondary-container":"#364954","on-secondary-container":"#D1E6F3",tertiary:"#C9C2EA","on-tertiary":"#312C4C","tertiary-container":"#474364","on-tertiary-container":"#E5DEFF",error:"#FFB4AB","on-error":"#690005","error-container":"#93000A","on-error-container":"#FFDAD6",background:"#0F1417","on-background":"#DFE3E7",surface:"#0F1417","on-surface":"#DFE3E7","surface-variant":"#40484D","on-surface-variant":"#C0C7CD",outline:"#8A9297","outline-variant":"#40484D",shadow:"#000000",scrim:"#000000","inverse-surface":"#DFE3E7","on-inverse-surface":"#2C3134","inverse-primary":"#186584","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#0F1417","surface-bright":"#353A3D","surface-container-lowest":"#0A0F12","surface-container-low":"#171C1F","surface-container":"#1B2023","surface-container-high":"#262B2E","surface-container-highest":"#313539",warning:"#FFC107","on-warning":"#212121","warning-container":"#4E3400","on-warning-container":"#FFF3CF",success:"#81C784","on-success":"#000","success-container":"#2E7D32","on-success-container":"#fff"},Wo={name:"dark",colors:ys},vs=Wo});var xa=Pa((bh,ha)=>{"use strict";function oa(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let n=e[t],r=typeof n;(r==="object"||r==="function")&&!Object.isFrozen(n)&&oa(n)}),e}var ar=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function ia(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function He(e,...t){let n=Object.create(null);for(let r in e)n[r]=e[r];return t.forEach(function(r){for(let o in r)n[o]=r[o]}),n}var ol="</span>",Qi=e=>!!e.scope,il=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,o)=>`${r}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`},fo=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=ia(t)}openNode(t){if(!Qi(t))return;let n=il(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Qi(t)&&(this.buffer+=ol)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Ki=(e={})=>{let t={children:[]};return Object.assign(t,e),t},mo=class e{constructor(){this.rootNode=Ki(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=Ki({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{e._collapse(n)}))}},go=class extends mo{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){let r=t.root;n&&(r.scope=`language:${n}`),this.add(r)}toHTML(){return new fo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ln(e){return e?typeof e=="string"?e:e.source:null}function aa(e){return ot("(?=",e,")")}function al(e){return ot("(?:",e,")*")}function sl(e){return ot("(?:",e,")?")}function ot(...e){return e.map(n=>ln(n)).join("")}function cl(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function xo(...e){return"("+(cl(e).capture?"":"?:")+e.map(r=>ln(r)).join("|")+")"}function sa(e){return new RegExp(e.toString()+"|").exec("").length-1}function ll(e,t){let n=e&&e.exec(t);return n&&n.index===0}var ul=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function bo(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;let o=n,c=ln(r),i="";for(;c.length>0;){let s=ul.exec(c);if(!s){i+=c;break}i+=c.substring(0,s.index),c=c.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+o):(i+=s[0],s[0]==="("&&n++)}return i}).map(r=>`(${r})`).join(t)}var pl=/\b\B/,ca="[a-zA-Z]\\w*",yo="[a-zA-Z_]\\w*",la="\\b\\d+(\\.\\d+)?",ua="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",pa="\\b(0b[01]+)",fl="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",dl=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=ot(t,/.*\b/,e.binary,/\b.*/)),He({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},un={begin:"\\\\[\\s\\S]",relevance:0},ml={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[un]},gl={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[un]},hl={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},cr=function(e,t,n={}){let r=He({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let o=xo("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:ot(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},xl=cr("//","$"),bl=cr("/\\*","\\*/"),yl=cr("#","$"),vl={scope:"number",begin:la,relevance:0},wl={scope:"number",begin:ua,relevance:0},El={scope:"number",begin:pa,relevance:0},Sl={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[un,{begin:/\[/,end:/\]/,relevance:0,contains:[un]}]},Cl={scope:"title",begin:ca,relevance:0},kl={scope:"title",begin:yo,relevance:0},Al={begin:"\\.\\s*"+yo,relevance:0},Ml=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},ir=Object.freeze({__proto__:null,APOS_STRING_MODE:ml,BACKSLASH_ESCAPE:un,BINARY_NUMBER_MODE:El,BINARY_NUMBER_RE:pa,COMMENT:cr,C_BLOCK_COMMENT_MODE:bl,C_LINE_COMMENT_MODE:xl,C_NUMBER_MODE:wl,C_NUMBER_RE:ua,END_SAME_AS_BEGIN:Ml,HASH_COMMENT_MODE:yl,IDENT_RE:ca,MATCH_NOTHING_RE:pl,METHOD_GUARD:Al,NUMBER_MODE:vl,NUMBER_RE:la,PHRASAL_WORDS_MODE:hl,QUOTE_STRING_MODE:gl,REGEXP_MODE:Sl,RE_STARTERS_RE:fl,SHEBANG:dl,TITLE_MODE:Cl,UNDERSCORE_IDENT_RE:yo,UNDERSCORE_TITLE_MODE:kl});function Nl(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Tl(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Rl(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Nl,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function _l(e,t){Array.isArray(e.illegal)&&(e.illegal=xo(...e.illegal))}function Il(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Dl(e,t){e.relevance===void 0&&(e.relevance=1)}var Ol=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=ot(n.beforeMatch,aa(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ll=["of","and","for","in","not","or","if","then","parent","list","value"],Fl="keyword";function fa(e,t,n=Fl){let r=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(c){Object.assign(r,fa(e[c],t,c))}),r;function o(c,i){t&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){let a=s.split("|");r[a[0]]=[c,Pl(a[0],a[1])]})}}function Pl(e,t){return t?Number(t):Bl(e)?0:1}function Bl(e){return Ll.includes(e.toLowerCase())}var ea={},rt=e=>{console.error(e)},ta=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Ct=(e,t)=>{ea[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ea[`${e}/${t}`]=!0)},sr=new Error;function da(e,t,{key:n}){let r=0,o=e[n],c={},i={};for(let s=1;s<=t.length;s++)i[s+r]=o[s],c[s+r]=!0,r+=sa(t[s-1]);e[n]=i,e[n]._emit=c,e[n]._multi=!0}function zl(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw rt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),sr;if(typeof e.beginScope!="object"||e.beginScope===null)throw rt("beginScope must be object"),sr;da(e,e.begin,{key:"beginScope"}),e.begin=bo(e.begin,{joinWith:""})}}function Hl(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw rt("skip, excludeEnd, returnEnd not compatible with endScope: {}"),sr;if(typeof e.endScope!="object"||e.endScope===null)throw rt("endScope must be object"),sr;da(e,e.end,{key:"endScope"}),e.end=bo(e.end,{joinWith:""})}}function $l(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function jl(e){$l(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),zl(e),Hl(e)}function Vl(e){function t(i,s){return new RegExp(ln(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,a){a.position=this.position++,this.matchIndexes[this.matchAt]=a,this.regexes.push([a,s]),this.matchAt+=sa(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let s=this.regexes.map(a=>a[1]);this.matcherRe=t(bo(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;let a=this.matcherRe.exec(s);if(!a)return null;let l=a.findIndex((m,P)=>P>0&&m!==void 0),C=this.matchIndexes[l];return a.splice(0,l),Object.assign(a,C)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];let a=new n;return this.rules.slice(s).forEach(([l,C])=>a.addRule(l,C)),a.compile(),this.multiRegexes[s]=a,a}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,a){this.rules.push([s,a]),a.type==="begin"&&this.count++}exec(s){let a=this.getMatcher(this.regexIndex);a.lastIndex=this.lastIndex;let l=a.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let C=this.getMatcher(0);C.lastIndex=this.lastIndex+1,l=C.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function o(i){let s=new r;return i.contains.forEach(a=>s.addRule(a.begin,{rule:a,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function c(i,s){let a=i;if(i.isCompiled)return a;[Tl,Il,jl,Ol].forEach(C=>C(i,s)),e.compilerExtensions.forEach(C=>C(i,s)),i.__beforeBegin=null,[Rl,_l,Dl].forEach(C=>C(i,s)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=fa(i.keywords,e.case_insensitive)),a.keywordPatternRe=t(l,!0),s&&(i.begin||(i.begin=/\B|\b/),a.beginRe=t(a.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(a.endRe=t(a.end)),a.terminatorEnd=ln(a.end)||"",i.endsWithParent&&s.terminatorEnd&&(a.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(a.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(C){return Ul(C==="self"?i:C)})),i.contains.forEach(function(C){c(C,a)}),i.starts&&c(i.starts,s),a.matcher=o(a),a}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=He(e.classNameAliases||{}),c(e)}function ma(e){return e?e.endsWithParent||ma(e.starts):!1}function Ul(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return He(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:ma(e)?He(e,{starts:e.starts?He(e.starts):null}):Object.isFrozen(e)?He(e):e}var Gl="11.11.1",ho=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},po=ia,na=He,ra=Symbol("nomatch"),Yl=7,ga=function(e){let t=Object.create(null),n=Object.create(null),r=[],o=!0,c="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:go};function a(p){return s.noHighlightRe.test(p)}function l(p){let x=p.className+" ";x+=p.parentNode?p.parentNode.className:"";let A=s.languageDetectRe.exec(x);if(A){let O=me(A[1]);return O||(ta(c.replace("{}",A[1])),ta("Falling back to no-highlight mode for this block.",p)),O?A[1]:"no-highlight"}return x.split(/\s+/).find(O=>a(O)||me(O))}function C(p,x,A){let O="",Y="";typeof x=="object"?(O=p,A=x.ignoreIllegals,Y=x.language):(Ct("10.7.0","highlight(lang, code, ...args) has been deprecated."),Ct("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),Y=p,O=x),A===void 0&&(A=!0);let de={code:O,language:Y};w("before:highlight",de);let Ie=de.result?de.result:m(de.language,de.code,A);return Ie.code=de.code,w("after:highlight",Ie),Ie}function m(p,x,A,O){let Y=Object.create(null);function de(v,M){return v.keywords[M]}function Ie(){if(!D.keywords){Z.addText(j);return}let v=0;D.keywordPatternRe.lastIndex=0;let M=D.keywordPatternRe.exec(j),L="";for(;M;){L+=j.substring(v,M.index);let H=he.case_insensitive?M[0].toLowerCase():M[0],ne=de(D,H);if(ne){let[Ce,Ta]=ne;if(Z.addText(L),L="",Y[H]=(Y[H]||0)+1,Y[H]<=Yl&&(En+=Ta),Ce.startsWith("_"))L+=M[0];else{let Ra=he.classNameAliases[Ce]||Ce;ge(M[0],Ra)}}else L+=M[0];v=D.keywordPatternRe.lastIndex,M=D.keywordPatternRe.exec(j)}L+=j.substring(v),Z.addText(L)}function vn(){if(j==="")return;let v=null;if(typeof D.subLanguage=="string"){if(!t[D.subLanguage]){Z.addText(j);return}v=m(D.subLanguage,j,!0,To[D.subLanguage]),To[D.subLanguage]=v._top}else v=R(j,D.subLanguage.length?D.subLanguage:null);D.relevance>0&&(En+=v.relevance),Z.__addSublanguage(v._emitter,v.language)}function ce(){D.subLanguage!=null?vn():Ie(),j=""}function ge(v,M){v!==""&&(Z.startScope(M),Z.addText(v),Z.endScope())}function ko(v,M){let L=1,H=M.length-1;for(;L<=H;){if(!v._emit[L]){L++;continue}let ne=he.classNameAliases[v[L]]||v[L],Ce=M[L];ne?ge(Ce,ne):(j=Ce,Ie(),j=""),L++}}function Ao(v,M){return v.scope&&typeof v.scope=="string"&&Z.openNode(he.classNameAliases[v.scope]||v.scope),v.beginScope&&(v.beginScope._wrap?(ge(j,he.classNameAliases[v.beginScope._wrap]||v.beginScope._wrap),j=""):v.beginScope._multi&&(ko(v.beginScope,M),j="")),D=Object.create(v,{parent:{value:D}}),D}function Mo(v,M,L){let H=ll(v.endRe,L);if(H){if(v["on:end"]){let ne=new ar(v);v["on:end"](M,ne),ne.isMatchIgnored&&(H=!1)}if(H){for(;v.endsParent&&v.parent;)v=v.parent;return v}}if(v.endsWithParent)return Mo(v.parent,M,L)}function Ca(v){return D.matcher.regexIndex===0?(j+=v[0],1):(mr=!0,0)}function ka(v){let M=v[0],L=v.rule,H=new ar(L),ne=[L.__beforeBegin,L["on:begin"]];for(let Ce of ne)if(Ce&&(Ce(v,H),H.isMatchIgnored))return Ca(M);return L.skip?j+=M:(L.excludeBegin&&(j+=M),ce(),!L.returnBegin&&!L.excludeBegin&&(j=M)),Ao(L,v),L.returnBegin?0:M.length}function Aa(v){let M=v[0],L=x.substring(v.index),H=Mo(D,v,L);if(!H)return ra;let ne=D;D.endScope&&D.endScope._wrap?(ce(),ge(M,D.endScope._wrap)):D.endScope&&D.endScope._multi?(ce(),ko(D.endScope,v)):ne.skip?j+=M:(ne.returnEnd||ne.excludeEnd||(j+=M),ce(),ne.excludeEnd&&(j=M));do D.scope&&Z.closeNode(),!D.skip&&!D.subLanguage&&(En+=D.relevance),D=D.parent;while(D!==H.parent);return H.starts&&Ao(H.starts,v),ne.returnEnd?0:M.length}function Ma(){let v=[];for(let M=D;M!==he;M=M.parent)M.scope&&v.unshift(M.scope);v.forEach(M=>Z.openNode(M))}let wn={};function No(v,M){let L=M&&M[0];if(j+=v,L==null)return ce(),0;if(wn.type==="begin"&&M.type==="end"&&wn.index===M.index&&L===""){if(j+=x.slice(M.index,M.index+1),!o){let H=new Error(`0 width match regex (${p})`);throw H.languageName=p,H.badRule=wn.rule,H}return 1}if(wn=M,M.type==="begin")return ka(M);if(M.type==="illegal"&&!A){let H=new Error('Illegal lexeme "'+L+'" for mode "'+(D.scope||"<unnamed>")+'"');throw H.mode=D,H}else if(M.type==="end"){let H=Aa(M);if(H!==ra)return H}if(M.type==="illegal"&&L==="")return j+=`
`,1;if(dr>1e5&&dr>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return j+=L,L.length}let he=me(p);if(!he)throw rt(c.replace("{}",p)),new Error('Unknown language: "'+p+'"');let Na=Vl(he),fr="",D=O||Na,To={},Z=new s.__emitter(s);Ma();let j="",En=0,je=0,dr=0,mr=!1;try{if(he.__emitTokens)he.__emitTokens(x,Z);else{for(D.matcher.considerAll();;){dr++,mr?mr=!1:D.matcher.considerAll(),D.matcher.lastIndex=je;let v=D.matcher.exec(x);if(!v)break;let M=x.substring(je,v.index),L=No(M,v);je=v.index+L}No(x.substring(je))}return Z.finalize(),fr=Z.toHTML(),{language:p,value:fr,relevance:En,illegal:!1,_emitter:Z,_top:D}}catch(v){if(v.message&&v.message.includes("Illegal"))return{language:p,value:po(x),illegal:!0,relevance:0,_illegalBy:{message:v.message,index:je,context:x.slice(je-100,je+100),mode:v.mode,resultSoFar:fr},_emitter:Z};if(o)return{language:p,value:po(x),illegal:!1,relevance:0,errorRaised:v,_emitter:Z,_top:D};throw v}}function P(p){let x={value:po(p),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return x._emitter.addText(p),x}function R(p,x){x=x||s.languages||Object.keys(t);let A=P(p),O=x.filter(me).filter(Mt).map(ce=>m(ce,p,!1));O.unshift(A);let Y=O.sort((ce,ge)=>{if(ce.relevance!==ge.relevance)return ge.relevance-ce.relevance;if(ce.language&&ge.language){if(me(ce.language).supersetOf===ge.language)return 1;if(me(ge.language).supersetOf===ce.language)return-1}return 0}),[de,Ie]=Y,vn=de;return vn.secondBest=Ie,vn}function $(p,x,A){let O=x&&n[x]||A;p.classList.add("hljs"),p.classList.add(`language-${O}`)}function W(p){let x=null,A=l(p);if(a(A))return;if(w("before:highlightElement",{el:p,language:A}),p.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",p);return}if(p.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),s.throwUnescapedHTML))throw new ho("One of your code blocks includes unescaped HTML.",p.innerHTML);x=p;let O=x.textContent,Y=A?C(O,{language:A,ignoreIllegals:!0}):R(O);p.innerHTML=Y.value,p.dataset.highlighted="yes",$(p,A,Y.language),p.result={language:Y.language,re:Y.relevance,relevance:Y.relevance},Y.secondBest&&(p.secondBest={language:Y.secondBest.language,relevance:Y.secondBest.relevance}),w("after:highlightElement",{el:p,result:Y,text:O})}function ae(p){s=na(s,p)}let te=()=>{it(),Ct("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function At(){it(),Ct("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let $e=!1;function it(){function p(){it()}if(document.readyState==="loading"){$e||window.addEventListener("DOMContentLoaded",p,!1),$e=!0;return}document.querySelectorAll(s.cssSelector).forEach(W)}function hn(p,x){let A=null;try{A=x(e)}catch(O){if(rt("Language definition for '{}' could not be registered.".replace("{}",p)),o)rt(O);else throw O;A=i}A.name||(A.name=p),t[p]=A,A.rawDefinition=x.bind(null,e),A.aliases&&xn(A.aliases,{languageName:p})}function lr(p){delete t[p];for(let x of Object.keys(n))n[x]===p&&delete n[x]}function ur(){return Object.keys(t)}function me(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function xn(p,{languageName:x}){typeof p=="string"&&(p=[p]),p.forEach(A=>{n[A.toLowerCase()]=x})}function Mt(p){let x=me(p);return x&&!x.disableAutodetect}function pr(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=x=>{p["before:highlightBlock"](Object.assign({block:x.el},x))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=x=>{p["after:highlightBlock"](Object.assign({block:x.el},x))})}function bn(p){pr(p),r.push(p)}function yn(p){let x=r.indexOf(p);x!==-1&&r.splice(x,1)}function w(p,x){let A=p;r.forEach(function(O){O[A]&&O[A](x)})}function k(p){return Ct("10.7.0","highlightBlock will be removed entirely in v12.0"),Ct("10.7.0","Please use highlightElement now."),W(p)}Object.assign(e,{highlight:C,highlightAuto:R,highlightAll:it,highlightElement:W,highlightBlock:k,configure:ae,initHighlighting:te,initHighlightingOnLoad:At,registerLanguage:hn,unregisterLanguage:lr,listLanguages:ur,getLanguage:me,registerAliases:xn,autoDetection:Mt,inherit:na,addPlugin:bn,removePlugin:yn}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=Gl,e.regex={concat:ot,lookahead:aa,either:xo,optional:sl,anyNumberOfTimes:al};for(let p in ir)typeof ir[p]=="object"&&oa(ir[p]);return Object.assign(e,ir),e},kt=ga({});kt.newInstance=()=>ga({});ha.exports=kt;kt.HighlightJS=kt;kt.default=kt});var Ve={},Ql=Symbol("terminator");function $a(e,t){let n=!1,r={error:o,unsubscribe:c,get closed(){return n},signal:new De,next(i){if(!n)try{e.next?.(i)}catch(s){o(s)}},complete(){if(!n)try{e.complete?.()}finally{c()}}};e.signal?.subscribe(c);function o(i){if(n)throw i;if(!e.error)throw c(),i;try{e.error(i)}finally{c()}}function c(){n||(n=!0,r.signal.next())}try{if(t?.(r))throw new Error("Unsubscribe function result is deprectaed")}catch(i){o(i)}return r}var _=class{__subscribe;constructor(t){this.__subscribe=t}then(t,n){return Ua(this).then(t,n)}pipe(...t){return t.reduce((n,r)=>r(n),this)}subscribe(t){return $a(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},Ue=class extends _{closed=!1;signal=new De;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let n of Array.from(this.observers))n.closed||n.next(t)}error(t){if(!this.closed){this.closed=!0;let n=!1,r;for(let o of Array.from(this.observers))try{o.error(t)}catch(c){n=!0,r=c}if(n)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},De=class extends _{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},Sn=class extends Ue{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},Nt=class extends Ue{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let n=super.onSubscribe(t);return this.closed||t.next(this.currentValue),n}},hr=class extends Ue{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(n=>t.next(n)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},at=class extends Ue{$value=Ve;get hasValue(){return this.$value!==Ve}get value(){if(this.$value===Ve)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Ve&&t.next(this.$value),super.onSubscribe(t)}},xr=class extends Error{message="No elements in sequence"};function ke(...e){return new _(t=>{let n=0,r;function o(){let c=e[n++];c&&!t.closed?(r?.next(),c.subscribe({next:t.next,error:t.error,complete:o,signal:r=new De})):t.complete()}t.signal.subscribe(()=>r?.next()),o()})}function Q(e){return new _(t=>{e().subscribe(t)})}function _o(e){return new _(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function Io(e){return new _(t=>{e.then(n=>{t.closed||t.next(n),t.complete()}).catch(n=>t.error(n))})}function Cn(e){return Q(()=>Io(e()))}function ja(e){return new _(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function kn(e){return e instanceof _?e:Array.isArray(e)?_o(e):e instanceof Promise?Io(e):ja(e)}function F(...e){return _o(e)}function Va(e){return new Promise((t,n)=>{let r=Ve;e.subscribe({next:o=>r=o,error:o=>n(o),complete:()=>t(r)})})}function Ua(e){return Va(e).then(t=>t===Ve?void 0:t)}function st(e,t){return Ae(n=>({next:e(n),unsubscribe:t}))}function Ae(e){return t=>new _(n=>{let r=e(n,t);n.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=n.error),r.complete||(r.complete=n.complete),r.signal=n.signal,t.subscribe(r)})}function br(e){return st(t=>n=>t.next(e(n)))}function Ga(e,t){return Ae(n=>{let r=t,o=0;return{next(c){r=e(r,c,o++)},complete(){n.next(r),n.complete()}}})}function Ya(e){return Ae(t=>{let n=!0,r;return{next(o){n&&(n=!1,t.next(o),r=setTimeout(()=>n=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function Ge(e){return new _(t=>{let n=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(n))})}function Wa(e,t=Ge){return Do(n=>t(e).map(()=>n))}function Do(e){return t=>K(n=>{let r=!1,o=!1,c,i=()=>{c?.next(),r=!1,o&&n.complete()},s=new De;n.signal.subscribe(()=>{i(),s.next()}),t.subscribe({next(a){i(),c=new De,r=!0,e(a).subscribe({next:n.next,error:n.error,complete:i,signal:c})},error:n.error,complete(){o=!0,r||n.complete()},signal:s})})}function qa(e){return t=>K(n=>{let r=n.signal,o=0,c=0,i=!1;t.subscribe({next:s=>{o++,e(s).subscribe({next:n.next,error:n.error,complete:()=>{c++,i&&c===o&&n.complete()},signal:r})},error:n.error,complete(){i=!0,c===o&&n.complete()},signal:r})})}function Xa(e){return Ae(t=>{let n=!0;return{next(r){n&&(n=!1,e(r).subscribe({next:t.next,error:t.error,complete:()=>n=!0,signal:t.signal}))}}})}function An(e){return st(t=>n=>{e(n)&&t.next(n)})}function Ja(e){return st(t=>n=>{e-- >0&&!t.closed&&t.next(n),(e<=0||t.closed)&&t.complete()})}function Za(e){return st(t=>n=>{!t.closed&&e(n)?t.next(n):t.complete()})}function Qa(){let e=!1;return Ae(t=>({next(n){e||(e=!0,t.next(n),t.complete())},complete(){t.closed||t.error(new xr)}}))}function Tt(e){return st(t=>n=>{e(n),t.next(n)})}function Ka(e){return Ae((t,n)=>{let r,o={next:t.next,error(c){try{if(t.closed)return;let i=e(c,n);i&&(r?.next(),r=new De,i.subscribe({...o,signal:r}))}catch(i){t.error(i)}},unsubscribe:()=>r?.next()};return o})}function es(){return st(e=>{let t=Ve;return n=>{n!==t&&(t=n,e.next(n))}})}function ts(){return e=>{let t=new hr(1),n=!1;return K(r=>{t.subscribe(r),n||(n=!0,e.subscribe(t))})}}function ns(){return e=>{let t,n=0;function r(){--n===0&&t?.signal.next()}return K(o=>{o.signal.subscribe(r),n++===0?(t=Ye(),t.subscribe(o),e.subscribe(t)):t.subscribe(o)})}}function rs(){return e=>{let t=new Ue,n,r,o=!1,c=!1;return K(i=>{c?(i.next(r),i.complete()):t.subscribe(i),n??=e.subscribe({next:s=>{o=!0,r=s},error:i.error,complete(){c=!0,o&&t.next(r),t.complete()},signal:i.signal})})}}function f(...e){return e.length===1?e[0]:new _(t=>{let n=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){n--===1&&t.complete()},signal:t.signal})})}function oe(...e){return e.length===0?T:new _(t=>{let n=e.length,r=n,o=0,c=!1,i=new Array(n),s=new Array(n);e.forEach((a,l)=>a.subscribe({next(C){s[l]=C,i[l]||(i[l]=!0,++o>=r&&(c=!0)),c&&t.next(s.slice(0))},error:t.error,complete(){--n<=0&&t.complete()},signal:t.signal}))})}function os(e){return Ae(t=>({next:t.next,unsubscribe:e}))}function is(){return An(()=>!1)}var T=new _(e=>e.complete());function ie(e){return new Nt(e)}function K(e){return new _(e)}function Ye(){return new at}var Ro={catchError:Ka,debounceTime:Wa,distinctUntilChanged:es,exhaustMap:Xa,filter:An,finalize:os,first:Qa,ignoreElements:is,map:br,mergeMap:qa,publishLast:rs,reduce:Ga,share:ns,shareLatest:ts,switchMap:Do,take:Ja,takeWhile:Za,tap:Tt,throttleTime:Ya};for(let e in Ro)_.prototype[e]=function(...t){return this.pipe(Ro[e](...t))};function S(e,t,n){return new _(r=>{let o=r.next.bind(r);e.addEventListener(t,o,n),r.signal.subscribe(()=>e.removeEventListener(t,o,n))})}function Mn(e){return yr(e,{childList:!0})}function Nn(e,t){return yr(e,{attributes:!0,attributeFilter:t})}function yr(e,t={attributes:!0,childList:!0}){return new _(n=>{let r=new MutationObserver(o=>o.forEach(c=>{for(let i of c.addedNodes)n.next({type:"added",target:e,value:i});for(let i of c.removedNodes)n.next({type:"removed",target:e,value:i});c.type==="characterData"?n.next({type:"characterData",target:e}):c.attributeName&&n.next({type:"attribute",target:e,value:c.attributeName})}));r.observe(e,t),n.signal.subscribe(()=>r.disconnect())})}function Tn(e){return S(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function q(e){return S(e,"click")}function Rn(e,t){return new _(n=>{let r=new IntersectionObserver(o=>{for(let c of o)n.next(c)},t);r.observe(e),n.signal.subscribe(()=>r.disconnect())})}function Oo(e){return Rn(e).map(t=>t.isIntersecting)}function Me(e){return Rn(e).filter(t=>t.isIntersecting).first()}function as(e){let t;return function(...n){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,n),t=0})}}function Lo(e){return Ae(t=>{let n=as(o=>{t.closed||(e&&e(o),t.next(o),r&&t.complete())}),r=!1;return{next:n,complete:()=>r=!0}})}function Fo(){return Q(()=>document.readyState!=="loading"?F(!0):S(window,"DOMContentLoaded").first().map(()=>!0))}function _n(e,t,n){let r=new CustomEvent(t,n);e.dispatchEvent(r)}function In(e,t){let n;return f(Q(()=>(n=e.childNodes,n?F(n):T)),yr(e,{childList:!0,...t}),Ne().switchMap(()=>e.childNodes!==n?(n=e.childNodes,F(n)):T))}function Ne(){return Q(()=>document.readyState==="complete"?F(!0):S(window,"load").first().map(()=>!0))}function Dn(...e){return new _(t=>{let n=new ResizeObserver(r=>r.forEach(o=>t.next(o)));for(let r of e)n.observe(r);t.signal.subscribe(()=>n.disconnect())})}function Rt(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function vr(e,t,n){return r=>ke(F(e?r.matches(e):!1),S(r,t).switchMap(()=>f(F(!0),S(r,n).map(()=>e?r.matches(e):!1))))}var tu=vr("","animationstart","animationend"),wr=vr("","mouseenter","mouseleave"),ss=vr(":focus,:focus-within","focusin","focusout"),Er=e=>oe(wr(e),ss(e)).map(([t,n])=>t||n);function Po(e,t,n){return t=t?.toLowerCase(),S(e,"keydown",n).filter(r=>!t||r.key?.toLowerCase()===t)}function _t(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function We(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var cs=Tt(e=>console.log(e));_.prototype.log=function(){return this.pipe(cs)};_.prototype.raf=function(e){return this.pipe(Lo(e))};var ee=Symbol("bindings"),ls={},ct=Symbol("augments"),qe=Symbol("parser"),Cr=class{bindings;messageHandlers;internals;attributes$=new Sn;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,n){let r=!1;if(this.messageHandlers)for(let o of this.messageHandlers)o.type===t&&(o.next(n),r||=o.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let n of this.bindings)t.push(n.subscribe());if(this.prebind)for(let n of this.prebind)t.push(n.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},Ln=Symbol("css"),g=class extends HTMLElement{static observedAttributes;static[ct];static[qe];[ee]=new Cr;[Ln];connectedCallback(){this[ee].wasInitialized=!0,this[ee].wasConnected||this.constructor[ct]?.forEach(t=>t(this)),this[ee].connect()}disconnectedCallback(){this[ee].disconnect()}attributeChangedCallback(t,n,r){let o=this.constructor[qe]?.[t]??us;n!==r&&(this[t]=o(r,this[t]))}};function us(e,t){let n=t===!1||t===!0;return e===""?n?!0:"":e===null?n?!1:void 0:e}function Bo(e,t){e.hasOwnProperty(ct)||(e[ct]=e[ct]?.slice(0)??[]),e[ct]?.push(t)}var ps={mode:"open"};function z(e){return e.shadowRoot??e.attachShadow(ps)}function zo(e,t){t instanceof Node?z(e).appendChild(t):e[ee].add(t)}function fs(e,t){t.length&&Bo(e,n=>{for(let r of t){let o=r.call(e,n);o&&o!==n&&zo(n,o)}})}function ds(e,t){ls[e]=t,customElements.define(e,t)}function xe(e){return e[ee].internals??=e.attachInternals()}function u(e,{init:t,augment:n,tagName:r}){if(t)for(let o of t)o(e);n&&fs(e,n),r&&ds(r,e)}function Oe(e){return ke(F(e),e[ee].attributes$.map(()=>e))}function V(e,t){return e[ee].attributes$.pipe(An(n=>n.attribute===t),br(()=>e[t]))}function h(e,t){return f(V(e,t),Q(()=>F(e[t])))}function ms(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function It(e,t,n){return n===!1||n===null||n===void 0?n=null:n===!0&&(n=""),n===null?e.removeAttribute(t):e.setAttribute(t,String(n)),n}function gs(e,t,n){e.hasOwnProperty(qe)||(e[qe]={...e[qe]}),e[qe]&&(e[qe][t]=n)}function y(e,t){return n=>{t?.observe!==!1&&ms(n).push(e),t?.parse&&gs(n,e,t.parse);let r=`$$${e}`,o=n.prototype,c=Object.getOwnPropertyDescriptor(o,e);c&&Object.defineProperty(o,r,c);let i=t?.persist,s={enumerable:!0,configurable:!1,get(){return this[r]},set(a){this[r]!==a?(this[r]=a,i?.(this,e,a),this[ee].attributes$.next({target:this,attribute:e,value:a})):c?.set&&(i?.(this,e,a),this[r]=a)}};Bo(n,a=>{if(c||(a[r]=a[e]),Object.defineProperty(a,e,s),i?.(a,e,a[e]),t?.render){let l=t.render(a);l&&zo(a,l)}})}}function b(e){return y(e,{persist:It,observe:!0})}function Ho(e){let t=`on${e}`;return y(t,{render(n){return h(n,t).switchMap(r=>r?new _(o=>{let c=i=>{i.target===n&&n[t]?.call(n,i)};n.addEventListener(e,c),o.signal.subscribe(()=>n.removeEventListener(e,c))}):T)},parse(n){return n?new Function("event",n):void 0}})}function X(e){return y(e,{observe:!1})}function I(){return document.createElement("slot")}function $o(e){return t=>{let[n,r]=e();return t[ee].add(n),r}}var lt=class extends g{};u(lt,{tagName:"c-span"});function hs(e,t){let n=document.createTextNode("");return e[ee].add(t.tap(r=>n.textContent=r)),n}var Sr=document.createDocumentFragment();function On(e,t,n=e){if(t!=null)if(Array.isArray(t)){for(let r of t)On(e,r,Sr);n!==Sr&&n.appendChild(Sr)}else e instanceof g&&t instanceof _?n.appendChild(hs(e,t)):t instanceof Node?n.appendChild(t):e instanceof g&&typeof t=="function"?On(e,t(e),n):n.appendChild(document.createTextNode(t))}function jo(e,t){for(let n in t){let r=t[n];e instanceof g?r instanceof _?e[ee].add(n==="$"?r:r.tap(o=>e[n]=o)):n==="$"&&typeof r=="function"?e[ee].add(r(e)):e[n]=r:e[n]=r}}function xs(e,t){return e.constructor.observedAttributes?.includes(t)}function Vo(e,t){let n=e instanceof g&&xs(e,t)?V(e,t):Nn(e,[t]).map(()=>e[t]);return f(n,Q(()=>F(e[t])))}function Fn(e,t,n){return y(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let o=r===void 0?void 0:Number(r);return t!==void 0&&(o===void 0||o<t||isNaN(o))&&(o=t),n!==void 0&&o!==void 0&&o>n&&(o=n),o}})}function le(e,t,n){for(let r=e.parentElement;r;r=r.parentElement)if(r[ee]?.message(t,n))return}function pe(e,t,n=!0){return new _(r=>{let o={type:t,next:r.next,stopPropagation:n};e[ee].addMessageHandler(o),r.signal.subscribe(()=>e[ee].removeMessageHandler(o))})}function N(e,t,...n){let r=typeof e=="string"?document.createElement(e):new e;return t&&jo(r,t),n&&On(r,n),r}function E(e,t,...n){if(e!==E&&typeof e=="function"&&!(e.prototype instanceof g))return n.length&&((t??={}).children=n),e(t);let r=e===E?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&jo(r,t),n&&On(r,n),r}function bs(e,t){return n=>new _(()=>{n.hasAttribute(e)||n.setAttribute(e,t)})}function Uo(e,t){return Tt(n=>e.setAttribute("aria-"+t,n===!0?"true":n===!1?"false":n.toString()))}function G(e){return bs("role",e)}var Go=0;function Te(e){return e.id||=`cxl__${Go++}`}function Yo(e){return Vo(e,"id").map(t=>(t||(e.id=`cxl__${Go++}`),e.id))}var pt=d(":host{display:contents}"),ws=[-2,-1,0,1,2,3,4,5],ei=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],Dt=Ye(),Pn=ie(""),be=d(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),Es=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),ti={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function ni(e=""){return`
:host ${e} {
	${re("surface-container")}
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
		`}function ri(e=ti){return Object.entries(e).map(([t,n])=>`--cxl-color--${t}:${n};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var J={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:ti,imports:Es?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function Ot(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var Bn=d(Ot()),oi={"./theme-dark.js":()=>Promise.resolve().then(()=>(Xo(),qo))},Xe=[0,4,8,16,24,32,48,64],ut,Jo,Ss;function U(e,t){return e==="xsmall"?`@media(max-width:${J.breakpoints.small}px){${t}}`:`@media(min-width:${J.breakpoints[e]}px){${t}}`}function ft(e){return Dn(e).map(t=>{let n=J.breakpoints,r=t.contentRect.width,o="xsmall";for(let c in n){if(n[c]>r)return o;o=c}return o})}function Cs(e=""){return Object.entries(ui).map(([t,n])=>`:host([color=${t}]) ${e}{ ${n} }`).join("")}function dt(e,t,n=""){return ii(e,`
		${t?`:host ${n} { ${ui[t]} }`:""}
		:host${t?"":"([color])"} ${n} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${n}{
			color: inherit;
			background-color: transparent;
		}
		${Cs(n)}
	`)}function ii(e,t){let n=d(t);return y(e,{persist:It,render:r=>n(r)})}function ye(e,t){return ii(e,ws.map(n=>{let r=t(n);return n===0?`:host ${r}`:`:host([size="${n}"]) ${r}`}).join(""))}function ai(){let e=document.adoptedStyleSheets.indexOf(ut);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function ks(e){ut&&ai();let t=e.globalCss??"";e.colors&&(t+=`:root{${ri(e.colors)}}`),t&&(ut=Le(t),document.adoptedStyleSheets.push(ut)),Dt.next({theme:e,stylesheet:ut,css:t}),Pn.next(e.name)}var Zo="";function si(e){e?e!==Zo&&(typeof e=="string"?import(e):e()).then(t=>ks(t.default)):ut&&(ai(),Dt.next(void 0),Pn.next("")),Zo=e}function As(e){let t;return Dt.tap(n=>{let r=n?.theme.override?.[e.tagName];r?t?t.replace(r):e.shadowRoot?.adoptedStyleSheets.push(t??=Le(r)):t&&t.replace("")})}function Le(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function ci(e,t=""){let n=Le(t);return z(e).adoptedStyleSheets.push(n),n}function d(e){let t;return n=>{let r=z(n);if(r.adoptedStyleSheets.push(t??=Le(e)),!n[Ln])return J.css&&r.adoptedStyleSheets.unshift(Ss??=Le(J.css)),n[Ln]=!0,As(n)}}var li=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],fu=[...li,"inherit"];function kr(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function re(e){return`${kr(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var ui=li.reduce((e,t)=>(e[t]=`
${kr(t)}
${t==="inverse-surface"?kr("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function mt(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function B(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var Ms=requestAnimationFrame(()=>Ds()),Ns={},Qo=document.createElement("template"),Ko={};function Ts(e){return function(t){let n=e(t),r=Ko[n];if(r)return r.cloneNode(!0);let o=document.createElementNS("http://www.w3.org/2000/svg","svg"),c=()=>(o.dispatchEvent(new ErrorEvent("error")),"");return fetch(n).then(i=>i.ok?i.text():c(),c).then(i=>{if(!i)return;Qo.innerHTML=i;let s=Qo.content.children[0];if(!s)return;let a=s.getAttribute("viewBox");a?o.setAttribute("viewBox",a):s.hasAttribute("width")&&s.hasAttribute("height")&&o.setAttribute("viewBox",`0 0 ${s.getAttribute("width")} ${s.getAttribute("height")}`);for(let l of s.childNodes)o.append(l);Ko[t.name]=o}),o.setAttribute("fill","currentColor"),o}}var Rs=Ts(({name:e,width:t,fill:n})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${n?"fill1_":""}${t}px.svg`)),_s=Rs;function pi(e,t={}){let{width:n,height:r}=t;n===void 0&&r===void 0&&(n=r=24);let o=Ns[e]?.icon()||_s({name:e,width:n,fill:t.fill});return t.className&&o.setAttribute("class",t.className),n&&(o.setAttribute("width",`${n}`),r===void 0&&o.setAttribute("height",`${n}`)),r&&(o.setAttribute("height",`${r}`),n===void 0&&o.setAttribute("width",`${r}`)),t.alt&&o.setAttribute("alt",t.alt),o}var Ar,Is=new Promise(e=>{Ar=e});function Ds(e){cancelAnimationFrame(Ms),Jo||(e&&(e.colors&&(J.colors=e.colors),e.globalCss&&(J.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(Jo=Le(`:root { ${ri(J.colors)} }`+J.globalCss)),J.imports?Promise.allSettled(J.imports.map(t=>{let n=document.createElement("link");return n.rel="stylesheet",n.href=t,document.head.append(n),new Promise((r,o)=>(n.onload=r,n.onerror=o))})).then(Ar):Ar())}function zn(){return Cn(async()=>{await Is,await document.fonts.ready})}var Mr=[d(`
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
	${B("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${B("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${B("headline-medium")}
	flex-wrap: wrap;
}`),I,()=>N("slot",{name:"title"})];function Os(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var Lt=class extends g{size;sticky=!1;contextual};u(Lt,{tagName:"c-appbar",init:[b("size"),b("sticky"),b("contextual")],augment:[d(`
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
		`),...Mr,()=>N("slot",{name:"contextual"}),e=>h(e,"sticky").switchMap(t=>t?Rn(e,{threshold:[1]}).tap(n=>e.toggleAttribute("scroll",n.intersectionRatio<1)):T),e=>{let t;return f(Mn(e),h(e,"contextual")).raf().switchMap(()=>{for(let n of e.children)if(Os(n)&&(n.slot="contextual",n.open=n.name===e.contextual,n.open))return t=n,S(n,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,T})}]});function Ls(e){return h(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function Fs(e,t=e,n=0){let r=t.hasAttribute("tabindex")?t.tabIndex:n;return Ls(e).tap(o=>{o?t.removeAttribute("tabindex"):t.tabIndex=r})}function Ps(e,t=e){return f(S(t,"focusout").tap(()=>e.touched=!0),f(V(e,"disabled"),V(e,"touched")).tap(()=>le(e,"focusable.change")))}function Fe(e,t=e,n=0){return f(Fs(e,t,n),Ps(e,t))}function fi(e){return e in J.animation}function Re({target:e,animation:t,options:n}){if(J.disableAnimations)return e.animate(null);let r=typeof t=="string"?J.animation[t]:t;if(!r)throw new Error(`Animation "${t}" not defined`);let o=typeof r.kf=="function"?r.kf(e):r.kf,c={duration:250,easing:J.easing.emphasized,...r.options,...n,...J.prefersReducedMotion?{duration:0}:void 0};return e.animate(o,c)}function di(e){let{trigger:t,stagger:n,commit:r,keep:o}=e;function c(s){return new _(a=>{let l=Re(s);l.ready.then(()=>a.next({type:"start",animation:l}),()=>{}),l.addEventListener("finish",()=>{a.next({type:"end",animation:l}),r&&l.commitStyles(),!(o||o!==!1&&s.options?.fill&&(s.options.fill==="both"||s.options.fill==="forwards"))&&a.complete()}),a.signal.subscribe(()=>{try{l.cancel()}catch{}})})}let i=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return f(...i.map((s,a)=>{let l={...e.options,delay:n!==void 0?(e.options?.delay??0)+a*n:e.options?.delay};return(t==="visible"?Oo(s).filter(m=>m):t==="hover"?wr(s):F(!0)).switchMap(m=>m?c({...e,options:l,target:s}):T)}))}function mi(e,t,n=e.getBoundingClientRect()){let r=n.width>n.height?n.width:n.height,o=new Hn,c=e.shadowRoot||e,{x:i,y:s}=t??{},a=i===void 0||!t||_t(t),l=i>n.right||i<n.left||s>n.bottom||s<n.top;return o.x=a||l?n.width/2:i-n.left,o.y=a||l?n.height/2:s-n.top,o.radius=r,t||(o.duration=0),c.prepend(o),o}function gi(e,t=e){let n,r,o,c=()=>{n=mi(t,r instanceof Event?r:void 0,o),n.duration=600,r=void 0};return f(S(e,"click").tap(i=>{r=i,o=t.getBoundingClientRect()}),h(e,"selected").raf().switchMap(()=>{if(e.selected){if(!n?.parentNode){if(Rt(e))return r=void 0,Me(e).tap(c);c()}}else n&&hi(n);return T})).ignoreElements()}function hi(e){return new Promise(t=>{Re({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function ve(e,t=e){let n=!1,r=0;return f(S(t,"pointerdown"),S(t,"click")).tap(o=>o.cxlRipple??=e).raf().mergeMap(o=>{if(o.cxlRipple===e&&!n&&!e.disabled&&e.parentNode){r=Date.now(),n=!0,e.style.setProperty("--cxl-mask-hover","none");let c=mi(e,o),i=c.duration,s=()=>{e.style.removeProperty("--cxl-mask-hover"),hi(c).then(()=>{n=!1})};return o.type==="click"?Ge(i).tap(s):f(S(document,"pointerup"),S(document,"pointercancel")).first().map(()=>{let a=Date.now()-r;setTimeout(()=>s(),a>i?32:i-a)})}return T})}var Hn=class extends g{x=0;y=0;radius=0;duration=500};u(Hn,{tagName:"c-ripple",init:[y("x"),y("y"),y("radius")],augment:[d(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",K(()=>{let n=t.style;n.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,n.width=n.height=e.radius*2+"px",t.parentNode||z(e).append(t),Re({target:t,animation:"expand",options:{duration:e.duration}}),Re({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var Je=[be,Bn,d(`
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
}`)],Bs=d(`
:host {
	${B("label-large")}
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
`);function Nr(e){return h(e,"disabled").switchMap(t=>t?T:Tn(e).tap(n=>{n.stopPropagation(),e.click()}))}function Tr(e){return f(Nr(e),Fe(e))}var gt=class extends g{disabled=!1;touched=!1};u(gt,{init:[b("disabled"),b("touched")],augment:[G("button"),Tr]});var Ft=class extends gt{size;color;variant};u(Ft,{tagName:"c-button",init:[ye("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),dt("color","primary"),b("variant")],augment:[...Je,Bs,ve,I]});var Pt=class extends Ft{};u(Pt,{tagName:"c-button-round",augment:[d(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var ue=class extends g{name="";width;height;alt;fill=!1};u(ue,{tagName:"c-icon",init:[y("name"),y("width"),y("height"),y("fill"),y("alt")],augment:[G("none"),d(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,n;return e.shadowRoot?.adoptedStyleSheets.push(t),Me(e).switchMap(()=>Oe(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,o=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${o===void 0?"":`height:${o}px`}}`),n?.remove(),n=e.name?pi(e.name,{className:"icon",width:r,height:o,fill:e.fill,alt:e.alt}):void 0,n&&(n.onerror=()=>{n&&e.alt&&n.replaceWith(e.alt)},z(e).append(n))})}]});var se=class extends Pt{icon="";width;height;fill=!1;variant="text";alt};u(se,{tagName:"c-icon-button",init:[y("icon"),y("width"),y("height"),y("alt"),y("fill")],augment:[e=>N(ue,{className:"icon",width:h(e,"width"),height:h(e,"height"),name:h(e,"icon"),fill:h(e,"fill"),alt:h(e,"alt")})]});var tp=1440*60*1e3;function xi(e,t,n){if(t==="relative"){let r=new Date;return e.getFullYear()===r.getFullYear()?e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()?e.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(n,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(n,{month:"2-digit",day:"2-digit",year:"2-digit"})}return t==="medium"||t==="long"||t==="short"||t==="full"?e.toLocaleString(n,{dateStyle:t,timeStyle:t}):e.toLocaleString()}function bi(e,t,n){return t?typeof n=="string"?xi(t,n,e):t.toLocaleString(e,n):""}var Rr={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function zs(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var $n={content:Rr,name:"default",localeName:zs(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>bi($n.localeName,e,t)},Hs={content:Rr,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>bi("en-US",e,t)};function $s(){let e=ie($n),t={default:$n,en:Hs},n={},r=e.map(i=>i.content);async function o(i){let s=i.split("-")[0];if(!(t[i]??t[s])){let l=n[i]??n[s];l&&await l()}return t[s]||$n}async function c(i){e.next(await o(i))}return navigator?.language&&c(navigator.language),{content:r,registeredLocales:t,locale:e,setLocale:c,getLocale(i){return i?Cn(()=>o(i)):e},get(i,s){return r.map(a=>a[i]??(s&&a[s])??"")},register(i){t[i.name]=i}}}var ht=$s();function yi(e){return Object.assign(Rr,e),ht.get}var jn=class e extends g{name;size;open=!1;backIcon=N(se,{icon:"arrow_back",className:"icon",ariaLabel:ht.get("core.close"),$:t=>q(t).tap(()=>this.open=!1)});static{u(e,{tagName:"c-appbar-contextual",init:[y("name"),b("open"),b("size")],augment:[t=>t.backIcon,...Mr,d(`		
:host {
	display: none;
	flex-grow: 1;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:host([open]) { display: flex }
:host(:dir(rtl)) .icon { scale: -1 1; }
`),t=>V(t,"open").tap(n=>{n||t.dispatchEvent(new Event("close"))})]})}};var _r=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer?.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},Pe=new _r;function vi(e=document){document.documentElement.lang="en";let t=[N("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),N("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),N("meta",{name:"mobile-web-app-capable",content:"yes"}),N("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${B("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function wi(e=2e3){return f(Ge(e),zn()).first()}function Ei(e){return wi().raf(()=>e.setAttribute("ready",""))}function Vn(e){return f(K(t=>{let n=vi(e.ownerDocument??document);t.signal.subscribe(()=>n.forEach(r=>r.remove()))}),Ne().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),wi().switchMap(()=>ft(e).raf(t=>e.setAttribute("breakpoint",t))),Ei(e),Pn.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Ir=class extends g{connectedCallback(){requestAnimationFrame(()=>vi(this.ownerDocument||document)),super.connectedCallback()}};u(Ir,{tagName:"c-meta",augment:[()=>Ei(document.body)]});function Si(e,t,n){n==="in"&&(e.style.display="");let r=e.offsetWidth,o=Re({target:e,animation:{kf:{[t]:n==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});n==="out"&&(o.onfinish=()=>e.style.display="none")}var Bt=class extends g{sheetstart=!1;sheetend=!1};u(Bt,{tagName:"c-application",init:[b("sheetstart"),b("sheetend")],augment:[d(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${re("background")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${mt()}
	`),Vn,e=>pe(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>pe(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=N("slot",{name:"start"}),n=N("slot",{id:"body"}),r=N("slot",{name:"end"}),o=Le("html { overflow: hidden }");return z(e).append(t,n,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),Pe.popupContainer=e,f(K(c=>{let i=(e.ownerDocument??document).adoptedStyleSheets;i.push(o),c.signal.subscribe(()=>{let s=i.indexOf(o);s!==-1&&i.splice(s,1)})}),V(e,"sheetstart").tap(c=>Si(t,"marginLeft",c?"in":"out")),V(e,"sheetend").tap(c=>Si(r,"marginRight",c?"in":"out")))}]});function Be(e,t,n){return new _(r=>{let o={id:e,controller:n,target:t};le(t,`registable.${e}`,o),r.signal.subscribe(()=>o.unsubscribe?.())})}function Un(e,t,n,r){return new _(o=>{function c(s){let a=s.target;s.unsubscribe=()=>{let m=n.indexOf(a);m!==-1&&n.splice(m,1),r?.({type:"disconnect",target:a,elements:n}),o.next()};let l=n.indexOf(a);l!==-1&&n.splice(l,1);let C=n.findIndex(m=>m.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING);C===-1?n.push(a):n.splice(C,0,a),r?.({type:"connect",target:a,elements:n}),o.next()}let i=pe(t,`registable.${e}`).subscribe(c);o.signal.subscribe(i.unsubscribe)})}function Ci(e,t,n=new Set){return new _(r=>{function o(i){let s=i.target,a=i.controller||i.target;i.unsubscribe=()=>{n.delete(a),r.next({type:"disconnect",target:a,element:s,elements:n})},n.add(a),r.next({type:"connect",target:a,element:s,elements:n})}let c=pe(t,`registable.${e}`).subscribe(o);r.signal.subscribe(c.unsubscribe)})}var Dr={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(n){console.error(n)}}};function ki(e){return(t,n)=>t[e]>n[e]?1:t[e]<n[e]?-1:0}function Gn(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let n,r=e.getRootNode();return r instanceof ShadowRoot&&(n=r.getElementById(t),n)?n:e.ownerDocument.getElementById(t)??void 0}var js=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,Vs=/^\d{5}(?:[-\s]\d{4})?$/,Us={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},Ai={required:Zs,email:Qs,json:tc,zipcode:Ks,nonZero:Xs,nonEmpty:qs},Gs={pattern:Js,equalToElement:Or(Ri),greaterThan:Ni,lessThan:Ti,greaterThanElement:Or(Ni),lessThanElement:Or(Ti),min:rc,max:oc,equalTo:Ri,maxlength:ic,minlength:ac},Ys=yi(Us);function Or(e){return(t,n)=>{let r=typeof t=="string"?Gn(n,t):t;if(!r)throw"Invalid element";return e(r)}}function we(e,t){return{key:e,valid:t,message:Ys(`validation.${e}`,"validation.invalid")}}function Ws(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function qs(e){return we("nonEmpty",!Ws(e))}function Xs(e){return we("nonZero",e===""||Number(e)!==0)}function Js(e){let t=typeof e=="string"?e=new RegExp(e):e;return n=>we("pattern",typeof n=="string"&&(n===""||t.test(n)))}function Lr(e){return e!=null&&e!==""}function Zs(e,t){let n=t&&"checked"in t?!!t.checked:!0;return we("required",n&&Lr(e))}function Qs(e){return we("email",typeof e=="string"&&(e===""||js.test(e)))}function Ks(e){return we("zipcode",typeof e=="string"&&(e===""||Vs.test(e)))}function ec(e){try{return JSON.parse(e),!0}catch{return!1}}function tc(e){return we("json",ec(e))}function nc(e){return e instanceof HTMLElement&&"value"in e}function zt(e,t,n){let r=nc(t)?h(t,"value"):t instanceof _?t:F(t);return o=>r.map(c=>we(e,!Lr(o)||!Lr(c)||n(o,c)))}function Mi(e,t){let n=/(\w+)(?:\(([^)]+?)\))?/g,r=[],o;for(;o=n.exec(e);)if(o[2]){let c=Gs[o[1]];if(!c)throw`Invalid rule "${o[1]}"`;r.push(c(o[2],t))}else if(o[1]in Ai)r.push(Ai[o[1]]);else throw`Invalid rule "${o[1]}"`;return r}function _i(e,t){let n=(typeof e=="string"?Mi(e,t):e).flatMap(r=>typeof r=="string"?Mi(r,t):r);return(r,o)=>n.map(c=>{let i=c(r,o);return i instanceof _?i:i instanceof Promise?kn(i):F(i)})}function rc(e){return zt("min",e,(t,n)=>Number(t)>=Number(n))}function Ni(e){return zt("greaterThan",e,(t,n)=>Number(t)>Number(n))}function oc(e){return zt("max",e,(t,n)=>Number(t)<=Number(n))}function Ti(e){return zt("lessThan",e,(t,n)=>Number(t)<Number(n))}function Ri(e){return zt("equalTo",e,(t,n)=>t==n)}function ic(e){return t=>we("maxlength",!t||t.length<=+e)}function ac(e){return t=>we("minlength",!t||t.length>=+e)}function sc(e){return Di(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function Ii(e){return V(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||_n(e,"change",{bubbles:!0})})}function Di(e){return f(h(e,"value"),h(e,"checked")).map(()=>{})}var xt=class e extends g{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{u(e,{init:[b("autofocus"),b("invalid"),b("disabled"),b("touched"),y("rules"),b("name"),X("validationResult"),Ho("update")],augment:[t=>(t.defaultValue=t.value,f(Be("form",t),V(t,"invalid").tap(()=>_n(t,"invalid")),h(t,"invalid").switchMap(n=>{if(n){if(t.setAria("invalid","true"),!t.validationMessage)return ht.get("validation.invalid").tap(r=>t.setCustomValidity(r))}else t.setAria("invalid",null);return T}),K(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),h(t,"rules").switchMap(n=>{if(!n)return T;let r=_i(n,t);return Di(t).switchMap(()=>f(...r(t.value,t)).tap(o=>t.setValidity(o))).finalize(()=>t.resetValidity())}),h(t,"value").tap(n=>t.setFormValue(n)),h(t,"validationResult").switchMap(n=>!n||n.valid?T:n.message instanceof _?n.message:n.message===void 0?ht.get("validation.invalid"):F(n.message)).tap(n=>{t.setCustomValidity(n)}))),sc]})}get labels(){return xe(this).labels}get validity(){return xe(this)?.validity||null}get validationMessage(){return xe(this)?.validationMessage||""}reportValidity(){return xe(this)?.reportValidity()??!0}checkValidity(){return xe(this)?.checkValidity()??!0}setCustomValidity(t){let n=!!t,r=t!==this.validationMessage;this.applyValidity(n,t),this.invalid!==n?this.invalid=n:r&&_n(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,n){n?this.setAttribute(`aria-${t}`,n):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let n in this.validMap){let r=this.validMap[n];if(!r.valid)return this.validationResult=r}this.resetInvalid()}applyValidity(t,n){xe(this)?.setValidity({customError:t},n)}formDisabledCallback(t){this.disabled=t}setFormValue(t){xe(this)?.setFormValue?.(t)}};function cc(e,t){let n,r=t.key;if(r==="ArrowDown"&&e.goDown)n=e.goDown();else if(r==="ArrowRight"&&e.goRight)n=e.goRight();else if(r==="ArrowUp"&&e.goUp)n=e.goUp();else if(r==="ArrowLeft"&&e.goLeft)n=e.goLeft();else if(r==="Home")n=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(r==="End")n=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)n=e.other(t);else return null;return t.stopPropagation(),n&&t.preventDefault(),n}function Ht(e){return S(e.host,"keydown").map(t=>cc(e,t)).filter(t=>!!t)}function lc(e){return new _(t=>{let n=e.focus;e.focus=()=>{n.call(e),t.next()},t.signal.subscribe(()=>e.focus=n)})}function Oi({host:e,observe:t,getFocusable:n,getSelected:r,getActive:o=()=>Fr(e)}){let c=[];function i(){let s=c.find(a=>!a.disabled&&!a.hidden&&!Rt(a));s&&(s.tabIndex=0)}return f(S(e,"focusin").tap(()=>{let s=o(),a=!1;for(let l of c)l.tabIndex=l===s?(a=!0,0):-1;a||i()}),(t??F(!0)).tap(()=>{if(c=n(),c.find(l=>l.tabIndex===0))return;let a=r?.();a?a.tabIndex=0:i()}),e instanceof HTMLElement?lc(e).tap(()=>{let s=n();(s?.find(l=>l.tabIndex===0)??s?.[0])?.focus()}):T).ignoreElements()}function Fr(e){return We(e)?.activeElement??document.activeElement??void 0}function Li({getFocusable:e,getActive:t}){return(n=1,r,o=Rt)=>{let c=t(),i=e(),s=r??(c?i.indexOf(c):-1),a;do a=i[s+=n];while(a&&o(a));return a}}function Fi({host:e,input:t,handleOther:n=!1,axis:r}){let o=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function c(m=1){if(e.open===!1){e.open=!0;let P=o();requestAnimationFrame(()=>{P?.focused&&l(P)})}else return i(m)}function i(m=1,P){let R=o(),$=P??(R?e.options.indexOf(R):-1),W;do W=e.options[$+=m];while(W?.hidden);return W}function s(m){let P=m.key;if(/^\w$/.test(P)){let R=o(),$=R?e.options.indexOf(R):-1;if($===-1)return;let W=$;W+1>=e.options.length&&($=0);let ae=new RegExp(`^\\s*${P}`,"i"),te;for(;te=e.options[++$];)if(!te.hidden&&te.textContent?.match(ae))return te;if(W===0)return;for($=0;$<W&&(te=e.options[$++]);)if(!te.hidden&&te.textContent?.match(ae))return te}}let a=()=>e.options.find(m=>m.focused);function l(m){for(let P of e.options)P.focused=!1;m?(m.focused=!0,t?.setAria("activedescendant",Te(m)),m.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let C=m=>le(m,"selectable.action",m);return f(Ht({host:t??e,...r==="x"?{goLeft:()=>c(-1),goRight:()=>c(1)}:{goDown:()=>c(1),goUp:()=>c(-1)},goFirst:()=>e.open!==!1?i(1,-1):void 0,goLast:()=>e.open!==!1?i(-1,e.options.length):void 0,other:n?s:void 0}).tap(m=>{e.open===!1&&m?C(m):l(m)}),S(t??e,"focus").tap(()=>l(o())),Po(t??e,"Enter").tap(m=>{let P=a();e.open!==!1&&P?(m.stopPropagation(),C(P)):e.open===!1&&(e.open=!0)}))}function Pr(e){return new _(t=>{f(Un("selectable",e,e.options,n=>{if(n.type==="connect"&&(n.target.view=e.optionView,n.target.selected))return e.defaultValue===void 0&&(e.defaultValue=n.target.value),t.next(n.target);let r;for(let o of e.options)o.hidden||!o.parentNode||o.selected&&(r?o.selected=!1:r=o);t.next(r)}),pe(e,"selectable.action").tap(n=>{if(!e.disabled&&n&&e.options?.includes(n)){let r=e.value!==n.value;t.next(n),r&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var Ze={},Yn=class e extends xt{options=[];_value;_selected=Ze;static{u(e,{init:[y("value"),X("selected")],augment:[t=>Pr(t).tap(n=>{(!n||n!==t.selected)&&t.setSelected(n)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===Ze?this.options[0]?.value:this._value}get selected(){return this._selected===Ze&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==Ze&&this._selected.value===t){this._value=t;return}else for(let n of this.options)if(n.value===t){this._value=t,this.setSelected(n);return}this._selected!==Ze?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let n of this.options)n.focused=n.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==Ze&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=Ze)}};function Pi(e,t,...n){let r=document.createElementNS("http://www.w3.org/2000/svg",e);for(let o in t){if(o==="children")continue;let c=t[o];r.setAttribute(o==="className"?"class":o,c)}return n&&r.append(...n),r}function Wn(e){return Pi("svg",e,Pi("path",{d:e.d}))}function uc({host:e,target:t,position:n,onToggle:r,whenClosed:o=T}){return c=>(t.popover??="auto",t.togglePopover(c),r?.(c),c?f(Dn(e),S(window,"resize"),S(window,"scroll",{capture:!0,passive:!0})).tap(n):o)}function Bi(e){let{host:t,beforeToggle:n,target:r}=e,o=uc({...e,whenClosed:q(t).tap(()=>{t.open=!0})});return f(S(r,"toggle").tap(c=>{let i=c.newState==="open";t.open=i}),h(t,"open").raf().switchMap(c=>(n?.(c),t.ariaExpanded=c?"true":"false",o(c))))}var $t=class extends g{invalid=!1};u($t,{tagName:"c-field-help",init:[y("invalid")],augment:[d(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${B("body-small")}
}
	`),I,e=>(e.slot||="help",h(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var zr=d(`
:host {
  display: block;
  position: relative;
  text-align: start;
  ${B("body-large")}
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
	${B("body-small")}
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
`),pc=d(`
:host(:focus-within) slot[name=label] { color: var(--cxl-color-primary); }
slot[name=label] {
	${B("body-small")}
	height: 16px;
}
:host([floating]) slot[name=label] {
	display:none;
	transition: font var(--cxl-speed), height var(--cxl-speed), top var(--cxl-speed), left var(--cxl-speed);
}
:host([floating]) slot[name=label].novalue, :host([floating]) slot[name=label].value { display:block; }
`),fc=d(`
:host {
	border-radius: var(--cxl-shape-corner-xsmall) var(--cxl-shape-corner-xsmall) 0 0;
}
:host([floating]:not(:focus-within)) slot[name=label].novalue {
	${B("body-large")}
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

${Ot(".content")}
	`);function dc(e){return f(pe(e,"registable.form",!1).tap(t=>{t.id==="form"&&t.target&&(e.input=t.target)}),Ci("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var mc=()=>N("div",{className:"content"},N("slot",{name:"leading"}),N("div",{className:"body"},N("slot",{name:"label"}),N("slot",{id:"bodyslot"})),N("slot",{name:"trailing"}),N("div",{className:"indicator"}));function gc(e){function t(l){o.next(l.touched&&l.invalid),e.toggleAttribute("invalid",o.value);let C=0,m=[];for(let R of i.assignedNodes())!(R instanceof HTMLElement)||R===a||("invalid"in R&&R.invalid?o.value&&(R.invalid===!0||R.invalid===l.validationResult?.key)?(C++,R.style.display="",m.push(Te(R))):R.style.display="none":m.push(Te(R)));let P=!o.value||C>0;a.textContent=P?"":l.validationMessage,P?a.remove():(a.parentElement||e.append(a),m.push(Te(a))),m.length?l.setAria("describedby",m.join(" ")):l.setAria("describedby",null)}function n(l){let C=e.input;if(C){if(e.toggleAttribute("inputdisabled",C.disabled),t(C),!l)return;l.type==="focus"?c.next(!0):l.type==="blur"&&c.next(!1)}}function r(){let l=e.input?.value,C=!e.input?.hasAttribute("autofilled")&&(!l||l.length===0);s.classList.toggle("novalue",C),s.classList.toggle("value",!C)}let o=ie(!1),c=ie(!1),i=N("slot",{name:"help"}),s=e.contentElement.children[1].children[0],a=N($t,{ariaLive:"polite"});return z(e).append(N("div",{className:"help"},i)),f(h(e,"input").switchMap(l=>l?f(F(void 0).tap(()=>{n(),queueMicrotask(r)}),S(l,"focusable.change").tap(n).tap(r),S(l,"focus").tap(n),S(l,"invalid").tap(n),S(l,"update").tap(r),f(S(l,"blur"),S(i,"slotchange")).raf(n),S(e.contentElement,"click").tap(()=>{l&&document.activeElement!==l&&!e.matches(":focus-within")&&!c.value&&l.focus()})):T),dc(e))}var Qe=class e extends g{floating=!1;input;size;contentElement=mc();static{u(e,{init:[b("floating"),X("input"),ye("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,gc]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},Br=class extends Qe{};u(Br,{tagName:"c-field",augment:[zr,pc,fc]});var hc=d(`
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
`),zi=d(`
${ni("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function xc(e,t){return()=>{let n=e.parentElement instanceof Qe?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.x}px`,t.style.minWidth=`${n.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-n.bottom-16,280)}px`}}function $r({host:e,target:t,input:n,position:r,beforeToggle:o,onToggle:c,handleOther:i,axis:s}){return f(Fi({host:e,input:n,handleOther:i,axis:s}),S(n??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),Bi({host:e,target:t,position:r??xc(e,t),beforeToggle:o,onToggle:c}))}function bc(e){let{host:t}=e;return f(hc(t)??T,be(t)??T,Fe(t),$r(e))}var bt=class extends g{};u(bt,{tagName:"c-select-option",augment:[d(`
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
		`),I]});var Hr=class extends Yn{open=!1;optionView=bt;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let n of this.options)n!==t&&(n.slot="");t&&(t.slot="selected")}}};u(Hr,{tagName:"c-select",init:[b("open")],augment:[G("listbox"),d(`
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
	${re("surface-container")}
	border: 0;
	transform-origin: top;
	overflow-y: auto;
	box-shadow: var(--cxl-elevation-2);
	visibility:visible;
}
		`),e=>{let t=N("div",{className:"menu"},N("slot")),n=N("slot",{name:"selected"}),r=t.style,o=ci(e),c=0,i=0;z(e).append(t,n,Wn({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function s(){if(e.open)i=e.selected?.rendered?.offsetHeight??0;else{r.cssText="";let a=e.options.reduce((l,C)=>Math.max(l,C?.rendered?.offsetWidth??0),0);o.replaceSync(`:host{width:${a}px}`)}}return f(f(Me(e),zn()).raf(s),bc({host:e,target:t,handleOther:!0,beforeToggle(a){s();let l=e.selected;l&&(l.slot=a?"":"selected"),t.classList.toggle("open",a)},onToggle(a){let l=e.selected;!a&&l&&(c=l.rendered?.offsetHeight??0)},position(){let a=e.parentElement??e,l=Math.round((i-c)/2),C=e.selected?.rendered,m=a.getBoundingClientRect(),P=e.getBoundingClientRect(),R=P.top-14,$,W=C?C.offsetTop:0;W>R&&(W=R),$=t.scrollHeight;let ae=window.innerHeight-P.top+8+W,te=P.top-l-W;$>ae?$=ae:$<P.height&&($=P.height),r.top=te+"px",r.left=m.left+"px",r.maxHeight=$+"px",r.minWidth=m.width+"px",r.transformOrigin=`${W}px`}}))}]});function yc(e){let t=Ye();return f(Be("field",e,n=>t.next(n)),t)}function Hi(e){let t;return yc(e).switchMap(n=>h(e,"input").switchMap(r=>r?F(r):n?h(n,"input").switchMap(o=>o?F(t=o):T):t?F(t):T))}function jt(e,t,n){return h(e,n).tap(r=>It(t,n,r))}var vc="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function Xn({host:e,input:t,toText:n,toValue:r,update:o}){t.className="cxl-native-input",t.setAttribute("style",vc),t.setAttribute("form","__cxl_ignore__");function c(a){e.value=r?r(t.value||""):t.value,a.stopPropagation(),e.dispatchEvent(new Event(a.type,{bubbles:!0}))}function i(){let a=e.value,l=n?n(a,t.value):a||"";t.value!==l&&e.setInputValue(l)}function s(){t.ariaLabel=e.ariaLabel;let a=e.getAttribute("aria-labelledby");a?t.setAttribute("aria-labelledby",a):t.removeAttribute("aria-labelledby")}return f(Fe(e,t),Q(()=>(s(),t.form?S(t.form,"reset").tap(c):T)),h(e,"value").tap(()=>{n&&t.matches(":focus")||i()}),S(t,"blur").tap(i),S(t,"input").tap(c),S(t,"change").tap(c),jt(e,t,"disabled"),jt(e,t,"name"),jt(e,t,"autocomplete"),jt(e,t,"spellcheck"),jt(e,t,"autofocus"),Nn(e,["aria-label","aria-labelledby"]).tap(s),o?o.tap(i):T,S(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),S(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var qn=class e extends xt{inputValue="";static{u(e,{init:[X("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,S(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity||null}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,n){n?this.inputEl.setAttribute(`aria-${t}`,n):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,n){xe(this).setValidity({customError:t},n,this.inputEl),this.inputEl.setCustomValidity(t?n||"Invalid Field":"")}};var wc=[d(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),be],jr=[...wc,I],Vt=class e extends qn{autofilled=!1;autocomplete;static{u(e,{init:[b("autofilled"),y("autocomplete")],augment:[t=>S(t.inputEl,"animationstart").tap(n=>{(n.animationName==="cxl-onautofillstart"||n.animationName==="cxl-onautofillend")&&(t.autofilled=n.animationName==="cxl-onautofillstart",le(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,n){this.inputEl.setSelectionRange(t,n)}getWindowSelection(){return this.shadowRoot?.getSelection?.()||getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},Ut=class extends Vt{value="";inputEl=N("input",{className:"input"})};u(Ut,{tagName:"c-input-text",init:[y("value")],augment:[...jr,e=>e.append(e.inputEl),e=>Xn({host:e,input:e.inputEl})]});function Ec(e){getComputedStyle(e).direction==="rtl"?e.scrollLeft=1e6:e.scrollLeft=e.scrollWidth}var yt=class e extends Vt{selected;value;inputEl=N("input",{className:"input"});static{u(e,{tagName:"c-input-option",init:[y("value"),X("selected")],augment:[...jr,t=>t.append(t.inputEl),t=>Xn({host:t,input:t.inputEl,toText:()=>t.selected?.textContent??"",toValue:n=>n!==""?t.selected?.value:void 0}),t=>V(t,"selected").tap(n=>{let r=t.selected?.textContent;t.value=n?.value,t.setInputValue(r??""),Ec(t.inputEl)})]})}};function Sc(e){return Vr(e,"^")}function Vr(e,t=""){if(e==="")return()=>!0;let n=Cc(e,t);return r=>r.textContent?n.test(r.textContent):!1}function Cc(e,t="",n="i"){return new RegExp(t+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n)}var Jn=class e extends g{optionView=bt;open=!1;debounce=100;options=[];matcher=Vr;static{u(e,{tagName:"c-autocomplete",init:[b("open"),Fn("debounce")],augment:[G("listbox"),zi,pt,t=>{let n=N("slot",{name:"empty"}),r=N("div",{id:"menu",tabIndex:-1},N("slot"),n),o=Wn({viewBox:"0 0 24 24",id:"caret",d:"M7 10l5 5 5-5z",width:20,height:20,fill:"currentColor"});o.style.cursor="pointer",n.style.display="none";function c(a){t.open=!0,s(a)}function i(a,l){a?.setAria("activedescendant",Te(l)),l.rendered?.scrollIntoView({block:"nearest"})}function s(a){let l=a.inputValue??a.value,C=t.matcher==="substring"?Vr:t.matcher==="prefix"?Sc:t.matcher,m=l?C(String(l)):void 0,P=0;for(let R of t.options){let $=m?!m(R):!1;R.hidden=$,R.focused=!($||P++>0),R.focused&&i(a,R)}n.style.display=P?"none":""}return z(t).append(r,o),f(Hi(t).switchMap(a=>(a.setAria("autocomplete","list"),a.role="combobox",a.setAria("controls",Te(t)),a.setAria("haspopup",t.role),a.setAttribute("autocomplete","off"),f(h(t,"open").tap(l=>{if(l)o.tabIndex=-1,c(a);else{for(let C of t.options)C.focused=!1;o.tabIndex=0,a?.setAria("activedescendant",null)}a.setAria("expanded",String(l))}),f(Tn(o),S(o,"mousedown")).tap(l=>{l.preventDefault(),l.stopPropagation(),a.focus()}).debounceTime(100).tap(()=>{t.open=!0}),h(t,"debounce").switchMap(l=>S(a,"input").debounceTime(l).tap(()=>t.open?s(a):c(a))),S(t,"change").tap(l=>{l.target===t&&a.dispatchEvent(new Event("change",{bubbles:!0}))}),$r({host:t,target:r,input:a}),f(Pr(t),V(a,"value").map(l=>{for(let C of t.options)if(C.value===l)return C})).tap(l=>{for(let C of t.options)C.focused=C.selected=!1;l&&(l.selected=!0),a instanceof yt?a.selected=l:a&&(a.value=l?.value),t.open=!1})))))}]})}};var Zn=class extends g{};u(Zn,{tagName:"c-body",augment:[d(`
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

${U("medium",`
	:host{padding:32px;}
	slot { margin: 0 auto; width:100%; }
`)}
		`),I]});var Gt=class extends gt{};u(Gt,{tagName:"c-button-text",augment:[...Je,d(`
:host {
	${B("label-large")}
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
		`),ve,I]});function Ur(e="block"){let t=(n=>{for(let r=12;r>0;r--)n.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,n.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,n.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,n.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,n.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return n})({xl:"",lg:"",md:"",sm:"",xs:""});return d(`
:host { box-sizing:border-box; display:${e}; }
${t.xs}
:host([xs="0"]) { display:none }
:host([xsmall]) { display:${e} }
${U("small",`
:host { grid-column-end: auto; }
:host([small]) { display:${e} }
${t.sm}
:host([sm="0"]) { display:none }
`)}
${U("medium",`
${t.md}
:host([md="0"]) { display:none }
:host([medium]) { display:${e} }
`)}
${U("large",`
${t.lg}
:host([lg="0"]) { display:none }
:host([large]) { display:${e} }
`)}
${U("xlarge",`
${t.xl}
:host([xl="0"]) { display:none }
:host([xlarge]) { display:${e} }
`)}
`)}var Gr=d(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${mt()}
${Xe.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${Xe.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),vt=class extends g{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};u(vt,{init:[b("sm"),b("xs"),b("md"),b("lg"),b("xl"),b("vpad"),b("pad"),b("center"),b("fill"),b("grow"),b("elevation"),dt("color")]});var _e=class extends vt{};u(_e,{tagName:"c-c",augment:[Gr,Ur(),d(":host([center]) { text-align: center}"),I]});var kc=d(`
:host {
	${re("surface-container")}
	${B("body-medium")}
	border-radius: var(--cxl-shape-corner-medium);
	overflow: hidden;
}
:host([variant=elevated]:not([color])) {
	--cxl-color-surface: var(--cxl-color-surface-container-low);
	z-index: 1;
	box-shadow: var(--cxl-elevation-1);
}
:host([variant=outlined]) {
	${re("surface")}
	border: 1px solid var(--cxl-color-outline-variant);
}
${mt()}
`),Yt=class extends _e{variant};u(Yt,{tagName:"c-card",init:[b("variant")],augment:[kc]});var Ac=d(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${B("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function Mc(e){return f(Be("list",e),h(e,"selected").tap(t=>e.ariaSelected=String(t)))}function Wr(e){return f(Nr(e),Fe(e,e,-1),Mc(e))}var wt=class extends g{disabled=!1;touched=!1;selected=!1};u(wt,{init:[b("disabled"),b("touched"),b("selected")],augment:[Wr]});var Yr=class extends wt{size};u(Yr,{tagName:"c-item",init:[ye("size",e=>`{min-height:${56+e*8}px}`)],augment:[Ac,be,Bn,G("option"),I,ve]});var Wt=class extends Yt{disabled=!1;touched=!1;selected=!1};u(Wt,{tagName:"c-card-item",init:[b("disabled"),b("touched"),b("selected")],augment:[G("option"),...Je,d(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),Wr,ve]});var qt=class extends g{disabled=!1;touched=!1;selected=!1;color;size=0};u(qt,{tagName:"c-chip",init:[b("disabled"),b("touched"),b("selected"),dt("color","surface-container-low"),ye("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[G("button"),Tr,...Je,d(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${B("label-large")}
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
	${re("secondary-container")}
}
:host(:hover) { box-shadow: none; }
slot[name] { display: inline-block; }
		`),ve,()=>N("slot",{name:"leading"}),I,()=>N("slot",{name:"trailing"})]});function $i(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(n=>{let r=Gn(e,n);return r?[r]:[]}):Array.isArray(t)?t:[t]}function Nc(e,t,n,r,o=S(e,"click").map(()=>!n())){return f(r,o).switchMap(c=>{let i=t();return i?kn(i.map(s=>({target:s,open:c}))):T})}function qr(e,t=e){function n(c,i){return[h(e,"open").switchMap(s=>(c.parentNode||Pe.popupContainer.append(c),s&&c instanceof g?V(c,"open").map(a=>{e.open&&a===!1&&(e.open=!1)}):T)),Yo(c).tap(s=>{let a=c.getAttribute("role");(a==="menu"||a==="listbox"||a==="tree"||a==="grid"||a==="dialog")&&(i.ariaHasPopup=a),i.getRootNode()===c.getRootNode()&&i.setAttribute("aria-controls",s)})]}let r=oe(h(e,"trigger"),h(e,"target")).switchMap(([c])=>{let i=$i(e),s=i?f(...i.flatMap(a=>n(a,e))).ignoreElements():T;return f(c==="hover"?oe(Er(t),i?f(...i.map(a=>Er(a))):T).map(a=>!!a.find(l=>!!l)).debounceTime(250):c==="checked"?S(t,"change").map(a=>a.target&&"checked"in a.target?!!a.target.checked:!1):S(t,"click").map(()=>!e.open),s)}),o;return Fo().switchMap(()=>Nc(t,()=>$i(e),()=>e.open,h(e,"open"),r).filter(c=>{let{open:i,target:s}=c;if(e.open!==i){if(i)o=We(e)?.activeElement,s.trigger=e;else if(s.trigger&&s.trigger!==e)return c.open=!0,s.trigger=e,!0;return e.open=i,!1}if(!i&&s.trigger===e){let a=document.activeElement;(a===document.body||a===document.documentElement)&&o?.focus()}return!0}))}var Qn=class extends g{open=!1;target;trigger};u(Qn,{init:[y("target"),y("trigger"),b("open")],augment:[e=>qr(e).raf(({target:t,open:n})=>t.open=n)]});var Xt=class extends Qn{};u(Xt,{tagName:"c-toggle",augment:[pt,I]});var ze;function ji(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Tc(e){return e==="infinite"?1/0:+e}function Rc(e){if(fi(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let n={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(s,a,l)=>(a&&(r=+a),l&&(n.composite=l),"")),ze??=document.createElement("style").style,ze.animation=e,n.fill=ze.animationFillMode;let o=n.fill==="forwards"||n.fill==="both",c=t?void 0:ji(ze.animationDuration);c!==void 0&&(n.duration=c);let i=ji(ze.animationDelay);return i!==void 0&&(n.delay=i),ze.animationIterationCount&&(n.iterations=Tc(ze.animationIterationCount)),{animation:ze.animationName,keep:o,stagger:r,options:n}}function _c(e){return typeof e=="string"&&(e=e.split(",").map(t=>Rc(t.trim()))),e}function Xr(e,t,n,r){let o=r?`motion-${r}-on`:"motion-on",c=_c(n);return e.setAttribute(o,""),f(...c.map(i=>di({target:t,...i}))).finalize(()=>e.removeAttribute(o))}var Jt=class extends g{center=!1};u(Jt,{tagName:"c-backdrop",init:[b("center")],augment:[d(`
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

	`),e=>S(e,"keydown").tap(t=>t.stopPropagation()),I]});var Vi=d(":host(:not([open],[motion-out-on])){display:none}");function Zr(e,t=()=>e,n=!1){let r=Q(()=>F(t("in"))),o=Q(()=>F(t("out")));return f(pe(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),oe(h(e,"motion-in").map(c=>c?r.switchMap(i=>Xr(e,i,c,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?Ge(e.duration).map(()=>e.open=!1):T):r),h(e,"motion-out").map(c=>(c?o.switchMap(i=>Xr(e,i,c,"out").ignoreElements()):o).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([c,i])=>V(e,"open").switchMap(s=>{if(e.popover!=="auto"){let a=s?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:s?"closed":"open",newState:a}))}return s?n?ke(i,c):c:n?ke(i,c):i})))}var Et=class extends g{open=!1;duration;"motion-in";"motion-out"};u(Et,{init:[y("motion-in"),y("motion-out"),Fn("duration"),b("open")]});var Jr=class extends Et{};u(Jr,{tagName:"c-toggle-target",augment:[d(`
:host{display:contents}
`),e=>{let t=N("slot"),n=N("slot",{name:"off"});return(e.open?n:t).style.display="none",z(e).append(t,n),Zr(e,r=>{t.style.display=n.style.display="none";let o=e.open?r==="in"?t:n:r==="in"?n:t;return o.style.display="",o.assignedElements()},!0)}]});var Zt=class extends Et{};u(Zt,{tagName:"c-toggle-panel",augment:[I,Vi,Zr]});var Ic=d(`
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
${U("small","#drawer { width: 360px }")}

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
`),Kn=class extends g{open=!1;position;responsive;permanent=!1};u(Kn,{tagName:"c-drawer",init:[b("open"),b("position"),y("responsive"),y("permanent")],augment:[Ic,d(`
:host { max-width: 360px; }
#drawer.permanent {
	${re("surface")}
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
`),e=>{let t=ie(!1),n=f(h(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",o=N(Zt,{id:"drawer","motion-in":n.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":n.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},I),c=new Jt;c.id="backdrop";let i=N("dialog",{id:"dialog"},c,o);return z(e).append(i),f(S(o,"close").tap(()=>i.close()),S(i,"close").tap(()=>e.open=!1),V(o,"open").tap(s=>e.open=s),V(e,"open").raf(s=>{s||o.scrollTo(0,0)}),S(c,"click").tap(()=>e.open=!1),S(i,"cancel").tap(s=>{s.preventDefault(),e.open=!1}),h(e,"open").tap(s=>{if(t.value&&e.permanent)return o.open=!0;s?t.value||(Pe.openModal({element:i,close:()=>e.open=!1}),i.getBoundingClientRect()):Pe.currentModal?.element===i&&Pe.modalClosed()}).raf(s=>{o.open=s}),h(e,"responsive").switchMap(s=>s!==void 0?ft(document.body):F("xsmall")).switchMap(s=>{let a=J.breakpoints[e.responsive||"large"],l=J.breakpoints[s]>=a;return t.next(l),l&&o.className!=="permanent"?i.close():!l&&o.className==="permanent"&&(e.open=!1),l&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",l),o.className=l?"permanent":"drawer",V(e,"open").tap(C=>{e.hasAttribute("responsiveon")||Re({target:c,animation:C?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var er=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,n=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,n)):r.insertBefore(t,n))}empty(){let t=this.start.nextSibling;for(;t&&t!==this.end;){let n=t.nextSibling;t.remove(),t=n}}};function Dc({source:e,render:t,empty:n,append:r,loading:o}){let c=[],i=document.createDocumentFragment(),s,a;function l(C){if(a?.parentNode?.removeChild(a),!C)return;let m=0;for(let R of C){let $=c[m]?.item;if($)$.value!==R&&$.next(R);else{let W=ie(R),ae=t(W,m,C),te=ae instanceof DocumentFragment?Array.from(ae.childNodes):[ae];c.push({elements:te,item:W}),i.append(ae)}m++}i.childNodes.length&&r(i),s?.remove(),m===0&&n&&r(s=n());let P=c.length;for(;P-- >m;)c.pop()?.elements.forEach(R=>R.remove())}return Q(()=>(a=o?.(),a&&r(a),e.raf(l)))}function Ke(e){return $o(()=>{let t=new er;return[Dc({...e,append:t.insert.bind(t)}),t.end]})}var et=class extends Qe{};u(et,{tagName:"c-field-bar",augment:[zr,d(`
:host {
	box-sizing: border-box;
	${re("surface-container-high")}
	${B("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 4px 12px; }
		`)]});var tt=class extends vt{vflex=!1;gap;middle=!1};u(tt,{tagName:"c-flex",init:[b("vflex"),b("gap"),b("middle")],augment:[Ur("flex"),Gr,d(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${Xe.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),I]});function Oc(e){return Un("list",e,e.items)}function Ui(e){return Oi({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:Oc(e)})}function Gi(e){return Li({getFocusable:()=>e.items,getActive:()=>Fr(e)})}function Lc(e){let t=Gi(e);function n(r){return Math.round(r.getBoundingClientRect().left)}return f(Ui(e),Ht({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let r=We(e)?.activeElement,o=r&&n(r);return t(-1,void 0,o!==void 0?c=>n(c)!==o:void 0)},goDown:()=>{let r=We(e)?.activeElement,o=r&&n(r);return t(1,void 0,o!==void 0?c=>n(c)!==o:void 0)}}).tap(r=>r.focus()))}var Qt=class extends g{items=[]};u(Qt,{tagName:"c-grid-list",augment:[G("grid"),d(":host{display:grid;box-sizing:border-box;}"),I,Lc]});var tr=class extends g{pad;vertical=!1};u(tr,{tagName:"c-hr",init:[b("pad"),b("vertical")],augment:[G("separator"),d(`
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
${Xe.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function Kr(e){let t=document.createElement("style");return f(K(n=>{let r=e.persistkey&&Dr.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),n.signal.subscribe(()=>t.remove())}),Oe(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let n=e.open?e.themeon:e.themeoff;e.persistkey&&Dr.set(e.persistkey,n),si(oi[n]||n)}),q(e).tap(()=>e.open=!e.open))}var Qr=class extends g{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};u(Qr,{tagName:"c-toggle-theme",init:[y("persistkey"),y("usepreferred"),y("open"),y("themeon"),y("themeoff")],augment:[G("group"),Kr]});var Kt=class extends se{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};u(Kt,{tagName:"c-icon-toggle-theme",init:[y("persistkey"),y("usepreferred"),y("open"),y("themeon"),y("themeoff")],augment:[Kr,e=>oe(h(e,"iconon"),h(e,"iconoff"),h(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var Fc=()=>{let e;function t(){let n=document.adoptedStyleSheets.indexOf(e);n!==-1&&document.adoptedStyleSheets.splice(n,1)}addEventListener("message",n=>{let{theme:r}=n.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r),document.adoptedStyleSheets.push(e))})},Pc=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},en=class extends g{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};u(en,{tagName:"c-iframe",init:[y("src"),y("srcdoc"),y("sandbox"),y("handletheme")],augment:[d(`
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
	`),e=>{let t=E("iframe",{loading:"lazy"}),n=E("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),n.style.display="none";function o(i){r.replaceSync(":host{height:"+i+"px}"),t.style.height="100%",t.style.opacity="1",n.style.display="none"}function c(i){if(i){let s=`<script type="module">
(${Pc.toString()})();
(${Fc.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${i}${s}`,n.style.display=""}}return z(e).append(t,n),f(oe(h(e,"srcdoc"),h(e,"src")).raf(async([i,s])=>{c(s?`<base href="${s}" />`+await fetch(s).then(a=>a.text()):i)}),S(window,"message").tap(i=>{let{height:s}=i.data;i.source===t.contentWindow&&s!==void 0&&o(s)}),h(e,"handletheme").switchMap(i=>i?S(t,"load").switchMap(()=>Dt.raf(s=>{let a=s?.css??"";t.contentWindow?.postMessage({theme:a},"*")})):T),h(e,"sandbox").tap(i=>i===void 0?t.removeAttribute("sandbox"):t.sandbox.value=i))}]});var nr=class extends g{};u(nr,{tagName:"c-nav-headline",augment:[d(`
:host{
	color:var(--cxl-color-on-surface-variant);
	font:var(--cxl-font-title-small);
	letter-spacing:var(--cxl-letter-spacing-title-small);
	min-height:48px;
	display:flex;
	align-items: center;
	padding: 0 16px;
}
`),I]});var Bc=[d(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${B("label-large")}
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
${Ot("c-ripple")}
	`),be,gi,I],nt=class extends wt{size};u(nt,{tagName:"c-nav-item",init:[ye("size",e=>`{min-height:${56+e*8}px}`)],augment:[G("option"),...Bc]});var tn=class extends se{open=!1;target;icon="menu"};u(tn,{tagName:"c-navbar-toggle",init:[y("target"),X("open")],augment:[e=>qr(e).tap(({target:t,open:n})=>t.open=n)]});function Yi(e){return f(h(e,"selected").pipe(Uo(e,"selected")),Be("selectable",e),q(e).tap(()=>le(e,"selectable.action",e)))}var nn=class extends g{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};u(nn,{tagName:"c-option",init:[y("value"),X("view"),b("selected"),b("hidden"),b("focused")],augment:[G("option"),d(":host{display:contents} :host([hidden]){display:none;}"),Ii,Yi,e=>{let t;return f(h(e,"view").switchMap(n=>n?(t?.remove(),e.rendered=t=new n,t.appendChild(N("slot")),z(e).append(t),f(h(e,"selected").tap(r=>t?.toggleAttribute("selected",r)),h(e,"focused").tap(r=>t?.toggleAttribute("focused",r)))):(e.rendered=t=void 0,T)))}]});var rr=class extends g{};u(rr,{tagName:"c-page",augment:[Vn,d(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${re("background")}
}`),I]});var rn=class extends g{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};u(rn,{tagName:"c-r",init:[b("xl"),b("lg"),b("md"),b("sm"),b("xs")],augment:[d(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${U("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${U("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${U("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${U("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),I]});var zc=/([^&=]+)=?([^&]*)/g,Hc=/:([\w_$@]+)/g,$c=/\/\((.*?)\)/g,jc=/(\(\?)?:\w+/g,Vc=/\*\w+/g,Uc=/[-{}[\]+?.,\\^$|#\s]/g,Gc=/([^#]*)(?:#(.+))?/,ao="@@cxlRoute",fe={location:window.location,history:window.history};function Yc(e){let t=[];return[new RegExp("^/?"+e.replace(Uc,"\\$&").replace($c,"\\/?(?:$1)?").replace(jc,function(r,o){return t.push(r.substr(1)),o?r:"([^/?]*)"}).replace(Vc,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function Wi(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function eo(e,t){return t?e.replace(Hc,(n,r)=>t[r]||""):e}function Wc(e){let t={},n;for(;n=zc.exec(e);)t[n[1]]=decodeURIComponent(n[2]);return t}var to=class{path;regex;parameters;constructor(t){this.path=t=Wi(t),[this.regex,this.parameters]=Yc(t)}_extractQuery(t){let n=t.indexOf("?");return n===-1?{}:Wc(t.slice(n+1))}getArguments(t){let n=this.regex.exec(t),r=n&&n.slice(1);if(!r)return;let o=this._extractQuery(t);return r.forEach((c,i)=>{let s=i===r.length-1?c||"":c?decodeURIComponent(c):"";o[this.parameters[i]]=s}),o}test(t){return this.regex.test(t)}toString(){return this.path}},no=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new to(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let n=this.definition.render();n[ao]=this;for(let r in t)t[r]!==void 0&&(n[r]=t[r]);return n}},ro=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(n=>n.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(n=>n.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function qc(e){return e[ao]}function St(e){let t=Gc.exec(e);return{path:Wi(t?.[1]||""),hash:t?.[2]||""}}var Xc={getHref(e){return e=typeof e=="string"?St(e):e,`${fe.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=fe.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&fe.history.pushState({url:e},"",n)}},deserialize(){return{path:fe.location.search.slice(1),hash:fe.location.hash.slice(1)}}},Jc={getHref(e){return e=typeof e=="string"?St(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=fe.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&fe.history.pushState({url:e},"",n||"/")}},deserialize(){return{path:fe.location.pathname,hash:fe.location.hash.slice(1)}}},qi={getHref(e){return e=typeof e=="string"?St(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=qi.getHref(e);fe.location.hash!==t&&(fe.location.hash=t)},deserialize(){return St(fe.location.hash.slice(1))}},Xi={hash:qi,path:Jc,query:Xc},oo=class{callbackFn;state;routes=new ro;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let n=new no(t);return this.routes.register(n),n}go(t){this.lastGo=t;let n=typeof t=="string"?St(t):t,r=n.path,o=this.state?.url;if(r!==o?.path){let c=this.routes.findRoute(r);if(!c)throw new Error(`Path: "${r}" not found`);let i=c.path?.getArguments(r);if(c.redirectTo)return this.go(eo(c.redirectTo,i));let s=this.execute(c,i);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:n,arguments:i,route:c,current:s,root:this.root})}else this.state&&n.hash!=o?.hash&&this.updateState({...this.state,url:n})}getPath(t,n){let r=this.routes.get(t),o=r&&r.path;return o&&eo(o.toString(),n)}isActiveUrl(t){let n=St(t);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(o=>{let c=o[ao],i=this.state?.arguments;if(c?.path?.test(n.path)&&(!n.hash||n.hash===r.hash)){if(i){let s=c.path.getArguments(n.path);for(let a in s)if(i[a]!=s[a])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,n){let r=this.instances[t],o;if(r)for(o in n){let c=n[o];c!==void 0&&(r[o]=c)}return r}executeRoute(t,n,r){let o=t.parent,c=o&&this.routes.get(o),i=t.id,s=c&&this.executeRoute(c,n,r),a=this.findRoute(i,n)||t.create(n);return s?a&&a.parentNode!==s&&s.appendChild(a):this.root=a,r[i]=a,a}discardOldRoutes(t){let n=this.instances;for(let r in n){let o=n[r];t[r]!==o&&(o.parentNode?.removeChild(o),delete n[r])}}execute(t,n){let r={},o=this.executeRoute(t,n||{},r);return this.discardOldRoutes(r),this.instances=r,o}},on=new at,Ji=new at,Ee=new oo(()=>on.next());function Zc(e,t=Xi.query){return f(K(()=>Ji.next(t)),e.tap(()=>Ee.go(t.deserialize())),on.tap(()=>t.serialize(Ee.getState().url))).catchError(n=>{if(n?.name==="SecurityError")return T;throw n})}function Qc(){return ke(F(location.hash.slice(1)),S(window,"hashchange").map(()=>location.hash.slice(1)))}var or;function Kc(){if(!or){or=new Nt(history.state);let e=history.pushState;history.pushState=function(...t){let n=e.apply(this,t);return history.state&&(history.state.lastAction="push"),or.next(history.state),n}}return f(S(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),or)}function el(){let e;return f(Qc(),Kc()).map(()=>window.location).filter(t=>{let n=t.href!==e;return e=t.href,n})}var Yg=on.raf().map(()=>{let e=[],t=Ee.getState(),n=t.current;do n.routeTitle&&e.unshift({title:n.routeTitle,first:n===t.current,path:tl(n)});while(n=n.parentNode);return e});function tl(e){let t=qc(e);return t&&eo(t.path?.toString()||"",Ee.state?.arguments||{})}function Zi(e,t,n=t){return f(oe(Ji,Oe(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),q(t).tap(r=>{e.target||r.preventDefault()}),q(n).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):Ee.go(e.href))}))}function nl(e,t){let n=document.createElement("div");return n.style.display="contents",n.routeTitle=t,n.appendChild(e.content.cloneNode(!0)),n}var io=class extends g{strategy="query";get state(){return Ee.state}go(t){return Ee.go(t)}};u(io,{tagName:"c-router",init:[y("strategy")],augment:[e=>{function t(n){let r=n.dataset;if(r.registered)return;r.registered="true";let o=r.title||void 0;Ee.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:n.hasAttribute("data-default"),redirectTo:r.redirectto,render:nl.bind(null,n,o)})}return Ne().switchMap(()=>{for(let n of Array.from(e.children))n instanceof HTMLTemplateElement&&t(n);return f(Mn(e).tap(n=>{n.type==="added"&&n.value instanceof HTMLTemplateElement&&t(n.value)}),h(e,"strategy").switchMap(n=>{let r=Xi[n];return Zc(el(),r).catchError((o,c)=>(console.error(o),c))}))})}]});function co(e,t=e){return f(rl(e,t).ignoreElements(),on.map(()=>e.href!==void 0&&Ee.isActiveUrl(e.href)))}function rl(e,t=e){let n=N("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return n.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,z(e).append(n),f(Zi(e,n),S(n,"click").tap(r=>{r.stopPropagation(),_t(r)||e.dispatchEvent(new PointerEvent(r.type,r)),le(e,"toggle.close",void 0)}),q(t).tap(r=>{_t(r)&&n.click()}))}var so=class extends g{href};u(so,{tagName:"c-router-selectable",init:[y("href")],augment:[pt,()=>N("slot"),e=>Q(()=>{let t=e.parentElement;return co(e,t).raf(n=>{t.selected=n})})]});var an=class extends nt{href;external=!1;target};u(an,{tagName:"c-router-item",init:[y("href"),y("external"),y("target")],augment:[e=>co(e).tap(t=>{e.selected=t})]});var Se=class extends g{font};u(Se,{tagName:"c-t",init:[b("font")],augment:[d(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${ei.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${B("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${B("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${B("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${B("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${B("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${B("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),I,e=>h(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var sn=class extends tt{};u(sn,{tagName:"c-toolbar",augment:[d(`
:host {
	grid-column-end: span 12;
	column-gap: 24px;
	row-gap: 8px;
	align-items: center;
	min-height: 48px;
	flex-wrap: wrap;
	flex-shrink: 0;
}
${U("small",":host{column-gap:24px}")}
		`)]});var cn=class extends g{};u(cn,{tagName:"doc-search",augment:[d(`
:host { display: contents; }
c-appbar-contextual {
	position: absolute;
	inset: 0;
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	z-index: 1;
}
		`),e=>{let t=ie([]),n=E(Jn,{},Ke({source:t,render:s=>E(nn,{value:s.value.href},s.value.name),empty:()=>E(_e,{slot:"empty",pad:16},"No Results Found")}));n.style.maxHeight="50%";let r=E(jn),o=E(Xt,{target:r},E(se,{icon:"search"})),c=E(et,{size:-2},E(ue,{name:"search"}),E(yt,{$:s=>h(s,"selected").tap(a=>{!CONFIG.spa&&a?.value&&(location.href=a.value)})}),n);function i(){t.next(CONFIG.symbols)}return e.shadowRoot?.append(r,o),f(Ne().tap(i),ft(e.parentElement??e).tap(s=>{s==="xsmall"?(r.style.display="",o.style.display="",r.append(c)):(r.open=!1,r.style.display="none",o.style.display="none",e.shadowRoot?.append(c))}))}]});var lo=class extends Lt{sticky=!0};u(lo,{tagName:"doc-appbar",augment:[e=>{e.append(E(sn,{id:"appbar-toolbar"},E(tn,{target:"navbar"}),E(tt,{grow:!0},CONFIG.packageName),E(cn),E(Kt,{persistkey:"3doc.theme"})))}]});var uo=class extends g{};u(uo,{tagName:"doc-card",augment:[d(`
:host{
	margin-top: 16px;
	display:block;
	elevation:1;
	scroll-margin-top: 80px;
}
:host(:target) {
	outline: 2px dashed var(--cxl-color-primary);
}
${U("medium",":host{padding:16px}")}
		`),()=>E("slot")]});var ba=Ha(xa(),1);var pn=ba.default;function ya(e){let t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r=/[\p{L}0-9._:-]+/u,o={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},c={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},i=e.inherit(c,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),a=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:r,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[o]},{begin:/'/,end:/'/,contains:[o]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[c,a,s,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[c,i,a,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},o,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[a]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}pn.registerLanguage("html",ya);var vo=class extends g{formatter=t=>'<link rel="stylesheet" href="hljs.css" /><code style="white-space:pre;min-height:100%;font:var(--cxl-font-code);tab-size:2;">'+pn.highlight(t,{language:"html"}).value+"</code>"};u(vo,{tagName:"doc-hl",augment:[d(`
:host { display: block; }
.hljs { white-space: pre-wrap; font: var(--cxl-font-code); padding:16px; }
	`),e=>{let t=E("div",{className:"hljs"});return t.style.tabSize="4",z(e).append(t),Ne().switchMap(()=>In(e).raf(()=>{let n=e.childNodes[0]?.textContent?.trim()||"";n&&e.formatter&&(n=e.formatter(n)),t.innerHTML=n}))}]});var wo=class extends g{};u(wo,{tagName:"doc-grd",augment:[d(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${U("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${U("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${U("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),I]});var fn=class extends g{summary;selected};u(fn,{tagName:"doc-nav-list",init:[X("summary"),X("selected")],augment:[e=>Ke({source:h(e,"summary").map(t=>t?.index),render:t=>E(nt,{$:n=>q(n).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?E(qt,{size:-2},"beta"):void 0)})(e)]});var dn=class extends g{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;formatter;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};u(dn,{tagName:"doc-demo-bare",init:[y("view"),y("libraries"),y("header")],augment:[d(`
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
	`),e=>{let t=h(e,"view"),n=ie("container"),r=E(en,{className:n}),o=E(lt,{$:m=>Me(m).tap(()=>{e.formatter?m.innerHTML=e.formatter(a):m.innerText=a}),className:t.map(m=>m==="source"?"source visible hljs":"source")}),c=E(Gt,{$:m=>q(m).tap(()=>e.view="source"),className:h(e,"view").map(m=>m==="source"?"hide":""),title:"See source"},E(ue,{name:"code"}),"Code"),i=E(se,{$:m=>q(m).tap(()=>e.view="mobile"),height:20,className:h(e,"view").map(m=>m==="source"?"":"hide"),icon:"close",title:"Close source"}),s=E("div",{id:"toolbar"},E("slot",{name:"toolbar"}),E(se,{$:m=>q(m).tap(async()=>{await navigator.clipboard.writeText(a),m.icon="done",setTimeout(()=>m.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(m=>m==="source"?"icon":"icon hide")}),c,i),a;function l(m){let P=m==="desktop";n.next(P?"container":"container cmobile")}function C(){let m=e.childNodes[0]?.textContent?.trim()||"";if(!m)return;let P=e.libraries?e.libraries.split(",").map(R=>`<script type="module" src="${e.getLibraryUrl(R)}"><\/script>`).join(""):"";r.srcdoc=`${e.header}${P}${m}`,a=m}return z(e).append(s,E(lt,{className:t.map(m=>m==="source"?"parent":`parent visible ${m}`)},r),o),f(h(e,"view").tap(l),Me(e).switchMap(()=>In(e).raf(C)))}]});var mn=class extends dn{header=`<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>${CONFIG.demoStyles?`<style>${CONFIG.demoStyles}</style>`:""}${CONFIG.demoScripts?.map(t=>`<script type="module" src="${t}"><\/script>`).join("")??""}`;formatter=t=>'<link rel="stylesheet" href="hljs.css" />'+pn.highlight(t,{language:"html"}).value};u(mn,{tagName:"doc-demo"});function wa(e){let t=e.index;function n(s){if(!(!s||typeof s=="string")&&typeof s=="number")return t.find(a=>a.id===s)}function r(s){if(!(!s||typeof s=="string")){if(typeof s=="number"){let a=t.find(l=>l.id===s);return a&&(a.kind===4||a.kind===8)?a:a?r(a.resolvedType??a.type):void 0}return s.kind===6?n(s.type):s.resolvedType&&typeof s.resolvedType!="string"?s.resolvedType:s}}function o(s,a){if(s.children){for(let l of s.children)!l.name||l.flags&&l.flags&128||(a[l.name]??=l);return a}}function c(s,a={}){o(s,a);let l=r(s.type);if(l?.children)for(let C of l.children){let m=r(C);if(!m||m.kind!==35||m.name==="Component")break;c(m,a)}return a}function i(s){return s.kind===17||s.kind===16||s.kind===11||s.kind===13}return{getNodeProperties:c,getTypeSummary:r,isFunction:i,getRef:n,json:e}}var ql={31:"Constants",1:"Variables",4:"Interfaces",8:"Classes",10:"Properties",11:"Methods",12:"Getters",13:"Setters",14:"Constructor",16:"Functions",22:"Enums",35:"Components",36:"Attributes",2:"Type Alias",38:"Call Signature",39:"Construct Signature",44:"Events",24:"Index Signature",25:"Exports",37:"Namespaces"};function Ea(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function Xl(e){return e.name?`docs/ui-${e.name}`:void 0}function Jl(e){let t=Xl(e),n=e.name??"?";return t?E("a",{href:t},n):n}function Sa({summary:e,summaryJson:t,link:n=Jl,uiCdn:r,importmap:o,codeHighlight:c}){let{getTypeSummary:i,getRef:s,isFunction:a}=wa(t),l=t.index;function C(w){if(w)return typeof w=="string"?w:i(w)??(typeof w=="number"?void 0:w.name)}function m(w){return w?"&lt;"+w.map(k=>R(k)+(k.kind!==6&&k.type?` extends ${R(k.type)}`:"")).join(", ")+"&gt;":""}function P(w){return["{ ",...w.children?.map($e).flatMap(At("; "))??[]," }"]}function R(w){let k=C(w);if(!k||typeof k=="string")return[k||"?"];switch(k.kind){case 5:return k.children?.map(R).flatMap(At(" | "))??[];case 23:case 32:return[k.name??"?"];case 34:return P(k)??["?"];case 15:return[...R(k.type),"[]"];case 4:case 8:case 35:{let p=k.typeP?m(k.typeP):void 0;return[n(k),p]}case 17:return $e(k);case 33:{let p=s(w);return[p?n(p):k.name??"?"]}case 21:return[...R(k.children?.[0]),"[",...R(k.children?.[1]),"]"];default:console.log(k)}return[]}function $(w){let k=w.flags??0;return[`${`${k&4?"public ":k&8?"private":k&16?"protected ":""}${k&262144?"...":""}${w.name}${k&524288?"?":""}`}: `,...R(w.type)]}function W(w){return["(",...w?.map($).flatMap(At(", "))??[],")"]}function ae(w){let k=w.flags??0,p=w.kind===12?"get ":w.kind===13?"set ":void 0;return[k&32?"static ":"",k&64?"readonly ":"",k&128?"abstract ":"",p]}function te(w){return["[",...w.parameters?.flatMap($e)??[]??[],"]: ",...w.type?R(w.type)??[]:["?"]]}function At(w){return(k,p)=>p!==0?[...w,...k]:k}function $e(w){if(w.kind===24)return te(w);if(w.kind===45&&w.children?.[0])return["...",...R(w.children[0])];let k=w.flags&&w.flags&524288,p=a(w)?W(w.parameters):[],x=w.kind===17;return[...ae(w),w.name,k?"?":"",...p,x?" => ":": ",...R(w.resolvedType??w.type)]}function it(w){return[E("h3",{},E(Se,{font:"title-large"},...$e(w))),...Mt(w)]}function hn(w,k){if(!w.children)return[];let p={};for(let x of w.children)x.kind!==14&&x.kind!==0&&(x.flags||0)&4&&!k?.(x)&&(p[x.kind]??={name:ql[x.kind],nodes:[]}).nodes.push(x);return Object.values(p).sort(ki("name")).flatMap(x=>[E("h2",{},x.name),...x.nodes.flatMap(it)])}function lr(w){let k;w=w.replace(/<caption>(.+?)<\/caption>/,(O,Y)=>(k=Y,""));let p=`<style>body{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:0 24px 24px 24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,x=(o??"")+`<script type="module" src="${r}"><\/script>`,A=E(mn,{header:p+x,formatter:c},w);return[k?E(Se,{font:"title-medium"},k):void 0,A]}function ur(w){return l.find(k=>k.name===w)}function me(w){let k=w.flatMap(p=>{let x=p.value,A=Ea(x);if(typeof x=="string"){let O=ur(x);A=O?n(O):x}return[A,", "]});return k.pop(),E("p",{},"Related: ",k)}function xn({src:w}){let k=E("div");return k.textContent=w,k}function Mt(w){let k=w.docs;if(!k||!k.content)return[];let p=[],x=k.content.flatMap(A=>{let O=Ea(A.value);return A.tag==="icon"||A.tag==="title"?[]:A.tag==="example"||A.tag==="demo"||A.tag==="demoonly"?lr(O):A.tag==="see"?(p.push(A),[]):A.tag==="return"?[E(Se,{font:"headline-small"},"Returns"),E("p",void 0,O)]:A.tag==="param"?[E("p",void 0,O)]:[A.tag?E("p",void 0,`${A.tag}: `,O):xn({src:O})]});return p.length&&x.push(me(p)),x}function pr(w){let k=[],p=i(w);if(!(!p||p.kind!==33))return p.children?.forEach(x=>{if(typeof x!="object")return;let A=i(x);A&&A.name!=="Component"&&k.push(n(A))}),E(Se,{font:"headline-small"}," ",...k.length?["extends ",k]:[])}function bn(w){let k=i(w.type),p=[];if(!k?.children)return[];for(let x of k.children){let A=i(x);if(!A||A.kind!==35||A.name==="Component")break;let O=hn(A,Y=>!!((Y.flags??0)&128));O.length&&p.push(E("br"),E(Se,{font:"h6"},"Inherited from ",n(A)),...O),p.push(...bn(A))}return p}let yn=e.kind===35&&e.docs?.tagName;return E("div",{},E("h1",{},e.name," ",e.type&&pr(e.type)," ",yn?E(Se,{font:"title-medium"},`<${yn}>`):""),...Mt(e),...hn(e),...bn(e))}var gn=class extends g{name;summary;uicdn;importmap=""};u(gn,{tagName:"doc-page",init:[X("name"),X("summary"),X("uicdn")],augment:[e=>Oe(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,n=e.summary.index.find(r=>r.name===t);n&&e.append(Sa({summary:n,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});var Eo=class extends Bt{summary;sheetstart=!0};u(Eo,{tagName:"doc-root",augment:[e=>{let t=Ye();fetch("summary.json").then(r=>r.json()).then(r=>t.next(r));let n=E(fn,{slot:"start",summary:t});e.append(n,E(gn,{summary:t,name:h(n,"selected")}))}]});var So=class extends an{};u(So,{tagName:"doc-item"});var Co=class extends g{};u(Co,{tagName:"doc-search-page",augment:[d(`
:host { display: block; margin: 64px 0 }
#searchbar { margin: 0 auto 32px auto; max-width: 600px; min-width: min(480px, 100%); }
#grid { grid-template-columns: 1fr; row-gap: 8px; }
c-card-item { display: flex; gap: 16px; align-items:center; }
.title { ${B("body-medium")}}

${U("small",`
	#grid { grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 8px; }
`)}
${U("medium",`
	#grid { grid-template-columns: 1fr 1fr 1fr; gap: 16px; padding: 0 8px; }
`)}
		`),()=>{let t=E(Qt,{id:"grid"},Ke({source:F(["components"]),render:r=>E(rn,void 0,E(_e,{className:"title",xs:1,sm:2,md:3},r.value.toUpperCase()),Ke({source:F(CONFIG.symbols).map(o=>o.filter(c=>c.kind===35&&c.tagName)),render:o=>E(Wt,{$:c=>q(c).tap(()=>{!CONFIG.spa&&o.value?.href&&(location.href=o.value.href)}),pad:16},E(ue,{name:o.value.icon})," ",o.map(c=>c.name))}))})),n=r=>h(r,"value").raf(o=>{o=o.toLowerCase();for(let c of t.children)for(let i of c.children)i.style.display=!o||i.textContent?.toLowerCase().includes(o)?"":"none"});return E("div",void 0,E(et,{id:"searchbar"},E(ue,{name:"search"}),E(Ut,{$:n})),t)}]});export{vo as BlogCode,Zn as Body,Eo as ComponentList,lo as DocAppbar,uo as DocCard,wo as DocGrid,So as DocItem,Kn as Drawer,tr as Hr,ue as Icon,nr as NavHeadline,fn as NavList,gn as Page,rr as UiPage};
