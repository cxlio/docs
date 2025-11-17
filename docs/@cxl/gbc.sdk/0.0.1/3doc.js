var As=Object.create;var gr=Object.defineProperty;var Ns=Object.getOwnPropertyDescriptor;var Ms=Object.getOwnPropertyNames;var $s=Object.getPrototypeOf,Ts=Object.prototype.hasOwnProperty;var Rs=(e,t)=>()=>(e&&(t=e(e=0)),t);var _s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ds=(e,t)=>{for(var r in t)gr(e,r,{get:t[r],enumerable:!0})},Os=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ms(t))!Ts.call(e,n)&&n!==r&&gr(e,n,{get:()=>t[n],enumerable:!(a=Ns(t,n))||a.enumerable});return e};var Is=(e,t,r)=>(r=e!=null?As($s(e)):{},Os(t||!e||!e.__esModule?gr(r,"default",{value:e,enumerable:!0}):r,e));var sn={};Ds(sn,{default:()=>Vs,theme:()=>nn});var Ws,nn,Vs,on=Rs(()=>{"use strict";Ws={primary:"#8ECFF2","on-primary":"#003548","primary-container":"#004D67","on-primary-container":"#C1E8FF",secondary:"#B5C9D7","on-secondary":"#1F333D","secondary-container":"#364954","on-secondary-container":"#D1E6F3",tertiary:"#C9C2EA","on-tertiary":"#312C4C","tertiary-container":"#474364","on-tertiary-container":"#E5DEFF",error:"#FFB4AB","on-error":"#690005","error-container":"#93000A","on-error-container":"#FFDAD6",background:"#0F1417","on-background":"#DFE3E7",surface:"#0F1417","on-surface":"#DFE3E7","surface-variant":"#40484D","on-surface-variant":"#C0C7CD",outline:"#8A9297","outline-variant":"#40484D",shadow:"#000000",scrim:"#000000","inverse-surface":"#DFE3E7","on-inverse-surface":"#2C3134","inverse-primary":"#186584","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#0F1417","surface-bright":"#353A3D","surface-container-lowest":"#0A0F12","surface-container-low":"#171C1F","surface-container":"#1B2023","surface-container-high":"#262B2E","surface-container-highest":"#313539",warning:"#FFC107","on-warning":"#212121","warning-container":"#4E3400","on-warning-container":"#FFF3CF",success:"#81C784","on-success":"#000","success-container":"#2E7D32","on-success-container":"#fff"},nn={name:"dark",colors:Ws},Vs=nn});var fs=_s((Cf,ds)=>{"use strict";function es(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],a=typeof r;(a==="object"||a==="function")&&!Object.isFrozen(r)&&es(r)}),e}var ir=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function ts(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function $e(e,...t){let r=Object.create(null);for(let a in e)r[a]=e[a];return t.forEach(function(a){for(let n in a)r[n]=a[n]}),r}var Qo="</span>",Vn=e=>!!e.scope,Ko=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((a,n)=>`${a}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},ha=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=ts(t)}openNode(t){if(!Vn(t))return;let r=Ko(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Vn(t)&&(this.buffer+=Qo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Jn=(e={})=>{let t={children:[]};return Object.assign(t,e),t},ga=class e{constructor(){this.rootNode=Jn(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Jn({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(a=>this._walk(t,a)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},ba=class extends ga{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let a=t.root;r&&(a.scope=`language:${r}`),this.add(a)}toHTML(){return new ha(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function wt(e){return e?typeof e=="string"?e:e.source:null}function rs(e){return He("(?=",e,")")}function ei(e){return He("(?:",e,")*")}function ti(e){return He("(?:",e,")?")}function He(...e){return e.map(r=>wt(r)).join("")}function ri(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ya(...e){return"("+(ri(e).capture?"":"?:")+e.map(a=>wt(a)).join("|")+")"}function as(e){return new RegExp(e.toString()+"|").exec("").length-1}function ai(e,t){let r=e&&e.exec(t);return r&&r.index===0}var ni=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function va(e,{joinWith:t}){let r=0;return e.map(a=>{r+=1;let n=r,i=wt(a),s="";for(;i.length>0;){let o=ni.exec(i);if(!o){s+=i;break}s+=i.substring(0,o.index),i=i.substring(o.index+o[0].length),o[0][0]==="\\"&&o[1]?s+="\\"+String(Number(o[1])+n):(s+=o[0],o[0]==="("&&r++)}return s}).map(a=>`(${a})`).join(t)}var si=/\b\B/,ns="[a-zA-Z]\\w*",wa="[a-zA-Z_]\\w*",ss="\\b\\d+(\\.\\d+)?",os="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",is="\\b(0b[01]+)",oi="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ii=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=He(t,/.*\b/,e.binary,/\b.*/)),$e({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,a)=>{r.index!==0&&a.ignoreMatch()}},e)},Et={begin:"\\\\[\\s\\S]",relevance:0},ci={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Et]},li={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Et]},ui={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},lr=function(e,t,r={}){let a=$e({scope:"comment",begin:e,end:t,contains:[]},r);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=ya("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:He(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},pi=lr("//","$"),di=lr("/\\*","\\*/"),fi=lr("#","$"),mi={scope:"number",begin:ss,relevance:0},hi={scope:"number",begin:os,relevance:0},gi={scope:"number",begin:is,relevance:0},bi={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Et,{begin:/\[/,end:/\]/,relevance:0,contains:[Et]}]},xi={scope:"title",begin:ns,relevance:0},yi={scope:"title",begin:wa,relevance:0},vi={begin:"\\.\\s*"+wa,relevance:0},wi=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},or=Object.freeze({__proto__:null,APOS_STRING_MODE:ci,BACKSLASH_ESCAPE:Et,BINARY_NUMBER_MODE:gi,BINARY_NUMBER_RE:is,COMMENT:lr,C_BLOCK_COMMENT_MODE:di,C_LINE_COMMENT_MODE:pi,C_NUMBER_MODE:hi,C_NUMBER_RE:os,END_SAME_AS_BEGIN:wi,HASH_COMMENT_MODE:fi,IDENT_RE:ns,MATCH_NOTHING_RE:si,METHOD_GUARD:vi,NUMBER_MODE:mi,NUMBER_RE:ss,PHRASAL_WORDS_MODE:ui,QUOTE_STRING_MODE:li,REGEXP_MODE:bi,RE_STARTERS_RE:oi,SHEBANG:ii,TITLE_MODE:xi,UNDERSCORE_IDENT_RE:wa,UNDERSCORE_TITLE_MODE:yi});function Ei(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Si(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ki(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Ei,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Ci(e,t){Array.isArray(e.illegal)&&(e.illegal=ya(...e.illegal))}function Ai(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Ni(e,t){e.relevance===void 0&&(e.relevance=1)}var Mi=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(a=>{delete e[a]}),e.keywords=r.keywords,e.begin=He(r.beforeMatch,rs(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},$i=["of","and","for","in","not","or","if","then","parent","list","value"],Ti="keyword";function cs(e,t,r=Ti){let a=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(i){Object.assign(a,cs(e[i],t,i))}),a;function n(i,s){t&&(s=s.map(o=>o.toLowerCase())),s.forEach(function(o){let c=o.split("|");a[c[0]]=[i,Ri(c[0],c[1])]})}}function Ri(e,t){return t?Number(t):_i(e)?0:1}function _i(e){return $i.includes(e.toLowerCase())}var Yn={},je=e=>{console.error(e)},Zn=(e,...t)=>{console.log(`WARN: ${e}`,...t)},et=(e,t)=>{Yn[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Yn[`${e}/${t}`]=!0)},cr=new Error;function ls(e,t,{key:r}){let a=0,n=e[r],i={},s={};for(let o=1;o<=t.length;o++)s[o+a]=n[o],i[o+a]=!0,a+=as(t[o-1]);e[r]=s,e[r]._emit=i,e[r]._multi=!0}function Di(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw je("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),cr;if(typeof e.beginScope!="object"||e.beginScope===null)throw je("beginScope must be object"),cr;ls(e,e.begin,{key:"beginScope"}),e.begin=va(e.begin,{joinWith:""})}}function Oi(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw je("skip, excludeEnd, returnEnd not compatible with endScope: {}"),cr;if(typeof e.endScope!="object"||e.endScope===null)throw je("endScope must be object"),cr;ls(e,e.end,{key:"endScope"}),e.end=va(e.end,{joinWith:""})}}function Ii(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Bi(e){Ii(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Di(e),Oi(e)}function Fi(e){function t(s,o){return new RegExp(wt(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(o?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(o,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,o]),this.matchAt+=as(o)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let o=this.regexes.map(c=>c[1]);this.matcherRe=t(va(o,{joinWith:"|"}),!0),this.lastIndex=0}exec(o){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(o);if(!c)return null;let f=c.findIndex((k,te)=>te>0&&k!==void 0),$=this.matchIndexes[f];return c.splice(0,f),Object.assign(c,$)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(o){if(this.multiRegexes[o])return this.multiRegexes[o];let c=new r;return this.rules.slice(o).forEach(([f,$])=>c.addRule(f,$)),c.compile(),this.multiRegexes[o]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(o,c){this.rules.push([o,c]),c.type==="begin"&&this.count++}exec(o){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let f=c.exec(o);if(this.resumingScanAtSamePosition()&&!(f&&f.index===this.lastIndex)){let $=this.getMatcher(0);$.lastIndex=this.lastIndex+1,f=$.exec(o)}return f&&(this.regexIndex+=f.position+1,this.regexIndex===this.count&&this.considerAll()),f}}function n(s){let o=new a;return s.contains.forEach(c=>o.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&o.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&o.addRule(s.illegal,{type:"illegal"}),o}function i(s,o){let c=s;if(s.isCompiled)return c;[Si,Ai,Bi,Mi].forEach($=>$(s,o)),e.compilerExtensions.forEach($=>$(s,o)),s.__beforeBegin=null,[ki,Ci,Ni].forEach($=>$(s,o)),s.isCompiled=!0;let f=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),f=s.keywords.$pattern,delete s.keywords.$pattern),f=f||/\w+/,s.keywords&&(s.keywords=cs(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(f,!0),o&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=wt(c.end)||"",s.endsWithParent&&o.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+o.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function($){return Li($==="self"?s:$)})),s.contains.forEach(function($){i($,c)}),s.starts&&i(s.starts,o),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=$e(e.classNameAliases||{}),i(e)}function us(e){return e?e.endsWithParent||us(e.starts):!1}function Li(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return $e(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:us(e)?$e(e,{starts:e.starts?$e(e.starts):null}):Object.isFrozen(e)?$e(e):e}var Pi="11.11.1",xa=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},ma=ts,Qn=$e,Kn=Symbol("nomatch"),zi=7,ps=function(e){let t=Object.create(null),r=Object.create(null),a=[],n=!0,i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]},o={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:ba};function c(l){return o.noHighlightRe.test(l)}function f(l){let p=l.className+" ";p+=l.parentNode?l.parentNode.className:"";let g=o.languageDetectRe.exec(p);if(g){let N=ae(g[1]);return N||(Zn(i.replace("{}",g[1])),Zn("Falling back to no-highlight mode for this block.",l)),N?g[1]:"no-highlight"}return p.split(/\s+/).find(N=>c(N)||ae(N))}function $(l,p,g){let N="",L="";typeof p=="object"?(N=l,g=p.ignoreIllegals,L=p.language):(et("10.7.0","highlight(lang, code, ...args) has been deprecated."),et("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),L=l,N=p),g===void 0&&(g=!0);let re={code:N,language:L};m("before:highlight",re);let ve=re.result?re.result:k(re.language,re.code,g);return ve.code=re.code,m("after:highlight",ve),ve}function k(l,p,g,N){let L=Object.create(null);function re(d,v){return d.keywords[v]}function ve(){if(!A.keywords){G.addText(B);return}let d=0;A.keywordPatternRe.lastIndex=0;let v=A.keywordPatternRe.exec(B),M="";for(;v;){M+=B.substring(d,v.index);let D=se.case_insensitive?v[0].toLowerCase():v[0],W=re(A,D);if(W){let[ue,ks]=W;if(G.addText(M),M="",L[D]=(L[D]||0)+1,L[D]<=zi&&(Ot+=ks),ue.startsWith("_"))M+=v[0];else{let Cs=se.classNameAliases[ue]||ue;ne(v[0],Cs)}}else M+=v[0];d=A.keywordPatternRe.lastIndex,v=A.keywordPatternRe.exec(B)}M+=B.substring(d),G.addText(M)}function _t(){if(B==="")return;let d=null;if(typeof A.subLanguage=="string"){if(!t[A.subLanguage]){G.addText(B);return}d=k(A.subLanguage,B,!0,Ta[A.subLanguage]),Ta[A.subLanguage]=d._top}else d=P(B,A.subLanguage.length?A.subLanguage:null);A.relevance>0&&(Ot+=d.relevance),G.__addSublanguage(d._emitter,d.language)}function Q(){A.subLanguage!=null?_t():ve(),B=""}function ne(d,v){d!==""&&(G.startScope(v),G.addText(d),G.endScope())}function Aa(d,v){let M=1,D=v.length-1;for(;M<=D;){if(!d._emit[M]){M++;continue}let W=se.classNameAliases[d[M]]||d[M],ue=v[M];W?ne(ue,W):(B=ue,ve(),B=""),M++}}function Na(d,v){return d.scope&&typeof d.scope=="string"&&G.openNode(se.classNameAliases[d.scope]||d.scope),d.beginScope&&(d.beginScope._wrap?(ne(B,se.classNameAliases[d.beginScope._wrap]||d.beginScope._wrap),B=""):d.beginScope._multi&&(Aa(d.beginScope,v),B="")),A=Object.create(d,{parent:{value:A}}),A}function Ma(d,v,M){let D=ai(d.endRe,M);if(D){if(d["on:end"]){let W=new ir(d);d["on:end"](v,W),W.isMatchIgnored&&(D=!1)}if(D){for(;d.endsParent&&d.parent;)d=d.parent;return d}}if(d.endsWithParent)return Ma(d.parent,v,M)}function ys(d){return A.matcher.regexIndex===0?(B+=d[0],1):(hr=!0,0)}function vs(d){let v=d[0],M=d.rule,D=new ir(M),W=[M.__beforeBegin,M["on:begin"]];for(let ue of W)if(ue&&(ue(d,D),D.isMatchIgnored))return ys(v);return M.skip?B+=v:(M.excludeBegin&&(B+=v),Q(),!M.returnBegin&&!M.excludeBegin&&(B=v)),Na(M,d),M.returnBegin?0:v.length}function ws(d){let v=d[0],M=p.substring(d.index),D=Ma(A,d,M);if(!D)return Kn;let W=A;A.endScope&&A.endScope._wrap?(Q(),ne(v,A.endScope._wrap)):A.endScope&&A.endScope._multi?(Q(),Aa(A.endScope,d)):W.skip?B+=v:(W.returnEnd||W.excludeEnd||(B+=v),Q(),W.excludeEnd&&(B=v));do A.scope&&G.closeNode(),!A.skip&&!A.subLanguage&&(Ot+=A.relevance),A=A.parent;while(A!==D.parent);return D.starts&&Na(D.starts,d),W.returnEnd?0:v.length}function Es(){let d=[];for(let v=A;v!==se;v=v.parent)v.scope&&d.unshift(v.scope);d.forEach(v=>G.openNode(v))}let Dt={};function $a(d,v){let M=v&&v[0];if(B+=d,M==null)return Q(),0;if(Dt.type==="begin"&&v.type==="end"&&Dt.index===v.index&&M===""){if(B+=p.slice(v.index,v.index+1),!n){let D=new Error(`0 width match regex (${l})`);throw D.languageName=l,D.badRule=Dt.rule,D}return 1}if(Dt=v,v.type==="begin")return vs(v);if(v.type==="illegal"&&!g){let D=new Error('Illegal lexeme "'+M+'" for mode "'+(A.scope||"<unnamed>")+'"');throw D.mode=A,D}else if(v.type==="end"){let D=ws(v);if(D!==Kn)return D}if(v.type==="illegal"&&M==="")return B+=`
`,1;if(mr>1e5&&mr>v.index*3)throw new Error("potential infinite loop, way more iterations than matches");return B+=M,M.length}let se=ae(l);if(!se)throw je(i.replace("{}",l)),new Error('Unknown language: "'+l+'"');let Ss=Fi(se),fr="",A=N||Ss,Ta={},G=new o.__emitter(o);Es();let B="",Ot=0,_e=0,mr=0,hr=!1;try{if(se.__emitTokens)se.__emitTokens(p,G);else{for(A.matcher.considerAll();;){mr++,hr?hr=!1:A.matcher.considerAll(),A.matcher.lastIndex=_e;let d=A.matcher.exec(p);if(!d)break;let v=p.substring(_e,d.index),M=$a(v,d);_e=d.index+M}$a(p.substring(_e))}return G.finalize(),fr=G.toHTML(),{language:l,value:fr,relevance:Ot,illegal:!1,_emitter:G,_top:A}}catch(d){if(d.message&&d.message.includes("Illegal"))return{language:l,value:ma(p),illegal:!0,relevance:0,_illegalBy:{message:d.message,index:_e,context:p.slice(_e-100,_e+100),mode:d.mode,resultSoFar:fr},_emitter:G};if(n)return{language:l,value:ma(p),illegal:!1,relevance:0,errorRaised:d,_emitter:G,_top:A};throw d}}function te(l){let p={value:ma(l),illegal:!1,relevance:0,_top:s,_emitter:new o.__emitter(o)};return p._emitter.addText(l),p}function P(l,p){p=p||o.languages||Object.keys(t);let g=te(l),N=p.filter(ae).filter(nt).map(Q=>k(Q,l,!1));N.unshift(g);let L=N.sort((Q,ne)=>{if(Q.relevance!==ne.relevance)return ne.relevance-Q.relevance;if(Q.language&&ne.language){if(ae(Q.language).supersetOf===ne.language)return 1;if(ae(ne.language).supersetOf===Q.language)return-1}return 0}),[re,ve]=L,_t=re;return _t.secondBest=ve,_t}function Te(l,p,g){let N=p&&r[p]||g;l.classList.add("hljs"),l.classList.add(`language-${N}`)}function xe(l){let p=null,g=f(l);if(c(g))return;if(m("before:highlightElement",{el:l,language:g}),l.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",l);return}if(l.children.length>0&&(o.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(l)),o.throwUnescapedHTML))throw new xa("One of your code blocks includes unescaped HTML.",l.innerHTML);p=l;let N=p.textContent,L=g?$(N,{language:g,ignoreIllegals:!0}):P(N);l.innerHTML=L.value,l.dataset.highlighted="yes",Te(l,g,L.language),l.result={language:L.language,re:L.relevance,relevance:L.relevance},L.secondBest&&(l.secondBest={language:L.secondBest.language,relevance:L.secondBest.relevance}),m("after:highlightElement",{el:l,result:L,text:N})}function ye(l){o=Qn(o,l)}let rt=()=>{Ue(),et("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function at(){Ue(),et("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let Re=!1;function Ue(){function l(){Ue()}if(document.readyState==="loading"){Re||window.addEventListener("DOMContentLoaded",l,!1),Re=!0;return}document.querySelectorAll(o.cssSelector).forEach(xe)}function Mt(l,p){let g=null;try{g=p(e)}catch(N){if(je("Language definition for '{}' could not be registered.".replace("{}",l)),n)je(N);else throw N;g=s}g.name||(g.name=l),t[l]=g,g.rawDefinition=p.bind(null,e),g.aliases&&$t(g.aliases,{languageName:l})}function ur(l){delete t[l];for(let p of Object.keys(r))r[p]===l&&delete r[p]}function pr(){return Object.keys(t)}function ae(l){return l=(l||"").toLowerCase(),t[l]||t[r[l]]}function $t(l,{languageName:p}){typeof l=="string"&&(l=[l]),l.forEach(g=>{r[g.toLowerCase()]=p})}function nt(l){let p=ae(l);return p&&!p.disableAutodetect}function dr(l){l["before:highlightBlock"]&&!l["before:highlightElement"]&&(l["before:highlightElement"]=p=>{l["before:highlightBlock"](Object.assign({block:p.el},p))}),l["after:highlightBlock"]&&!l["after:highlightElement"]&&(l["after:highlightElement"]=p=>{l["after:highlightBlock"](Object.assign({block:p.el},p))})}function Tt(l){dr(l),a.push(l)}function Rt(l){let p=a.indexOf(l);p!==-1&&a.splice(p,1)}function m(l,p){let g=l;a.forEach(function(N){N[g]&&N[g](p)})}function h(l){return et("10.7.0","highlightBlock will be removed entirely in v12.0"),et("10.7.0","Please use highlightElement now."),xe(l)}Object.assign(e,{highlight:$,highlightAuto:P,highlightAll:Ue,highlightElement:xe,highlightBlock:h,configure:ye,initHighlighting:rt,initHighlightingOnLoad:at,registerLanguage:Mt,unregisterLanguage:ur,listLanguages:pr,getLanguage:ae,registerAliases:$t,autoDetection:nt,inherit:Qn,addPlugin:Tt,removePlugin:Rt}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=Pi,e.regex={concat:He,lookahead:rs,either:ya,optional:ti,anyNumberOfTimes:ei};for(let l in or)typeof or[l]=="object"&&es(or[l]);return Object.assign(e,or),e},tt=ps({});tt.newInstance=()=>ps({});ds.exports=tt;tt.HighlightJS=tt;tt.default=tt});var De={},Wi=Symbol("terminator");function Ra(e,t){let r=!1,a={error:n,unsubscribe:i,get closed(){return r},signal:new Oe,next(s){if(!r)try{e.next?.(s)}catch(o){n(o)}},complete(){if(!r)try{e.complete?.()}finally{i()}}};e.signal?.subscribe(i);function n(s){if(r)throw s;if(!e.error)throw i(),s;try{e.error(s)}finally{i()}}function i(){r||(r=!0,a.signal.next())}try{if(t?.(a))throw new Error("Unsubscribe function result is deprectaed")}catch(s){n(s)}return a}var R=class{__subscribe;constructor(e){this.__subscribe=e}then(e,t){return Ia(this).then(e,t)}pipe(...e){return e.reduce((t,r)=>r(t),this)}subscribe(e){return Ra(!e||typeof e=="function"?{next:e}:e,this.__subscribe)}},Ge=class extends R{closed=!1;signal=new Oe;observers=new Set;constructor(){super(e=>this.onSubscribe(e))}next(e){if(!this.closed)for(let t of Array.from(this.observers))t.closed||t.next(e)}error(e){if(!this.closed){this.closed=!0;let t=!1,r;for(let a of Array.from(this.observers))try{a.error(e)}catch(n){t=!0,r=n}if(t)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(e=>e.complete()),this.observers.clear())}onSubscribe(e){this.closed?e.complete():(this.observers.add(e),e.signal.subscribe(()=>this.observers.delete(e)))}},Oe=class extends R{closed=!1;observers=new Set;constructor(){super(e=>{this.closed?(e.next(),e.complete()):this.observers.add(e)})}next(){if(!this.closed){this.closed=!0;for(let e of Array.from(this.observers))e.closed||(e.next(),e.complete());this.observers.clear()}}},xr=class extends Ge{queue=[];emitting=!1;next(e){if(!this.closed)if(this.emitting)this.queue.push(e);else{for(this.emitting=!0,super.next(e);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},It=class extends Ge{currentValue;constructor(e){super(),this.currentValue=e}get value(){return this.currentValue}next(e){this.currentValue=e,super.next(e)}onSubscribe(e){let t=super.onSubscribe(e);return this.closed||e.next(this.currentValue),t}},_a=class extends Ge{bufferSize;buffer=[];hasError=!1;lastError;constructor(e=1/0){super(),this.bufferSize=e}error(e){this.hasError=!0,this.lastError=e,super.error(e)}next(e){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(e),super.next(e)}onSubscribe(e){this.observers.add(e),this.buffer.forEach(t=>e.next(t)),this.hasError?e.error(this.lastError):this.closed&&e.complete(),e.signal.subscribe(()=>this.observers.delete(e))}},st=class extends Ge{$value=De;get hasValue(){return this.$value!==De}get value(){if(this.$value===De)throw new Error("Reference not initialized");return this.$value}next(e){return this.$value=e,super.next(e)}onSubscribe(e){!this.closed&&this.$value!==De&&e.next(this.$value),super.onSubscribe(e)}},Da=class extends Error{message="No elements in sequence"};function oe(...e){return new R(t=>{let r=0,a;function n(){let i=e[r++];i&&!t.closed?(a?.next(),i.subscribe({next:t.next,error:t.error,complete:n,signal:a=new Oe})):t.complete()}t.signal.subscribe(()=>a?.next()),n()})}function V(e){return new R(t=>{e().subscribe(t)})}function yr(e){return new R(t=>{for(let r of e)t.closed||t.next(r);t.complete()})}function vr(e){return new R(t=>{e.then(r=>{t.closed||t.next(r),t.complete()}).catch(r=>t.error(r))})}function wr(e){return V(()=>vr(e()))}function Oa(e){return new R(t=>{for(let r of e)t.closed||t.next(r);t.complete()})}function Er(e){return e instanceof R?e:Array.isArray(e)?yr(e):e instanceof Promise?vr(e):Oa(e)}function z(...e){return yr(e)}function Bs(e){return new Promise((t,r)=>{let a=De;e.subscribe({next:n=>a=n,error:n=>r(n),complete:()=>t(a)})})}function Ia(e){return Bs(e).then(t=>t===De?void 0:t)}function Ie(e,t){return ie(r=>({next:e(r),unsubscribe:t}))}function ie(e){return t=>new R(r=>{let a=e(r,t);r.signal.subscribe(()=>a.unsubscribe?.()),a.error||(a.error=r.error),a.complete||(a.complete=r.complete),a.signal=r.signal,t.subscribe(a)})}function Bt(e){return Ie(t=>r=>t.next(e(r)))}function Ba(e,t){return ie(r=>{let a=t,n=0;return{next(i){a=e(a,i,n++)},complete(){r.next(a),r.complete()}}})}function Fa(e){return ie(t=>{let r=!0,a;return{next(n){r&&(r=!1,t.next(n),a=setTimeout(()=>r=!0,e))},unsubscribe:()=>clearTimeout(a)}})}function we(e){return new R(t=>{let r=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(r))})}function La(e,t=we){return Sr(r=>t(e).map(()=>r))}function Sr(e){return t=>J(r=>{let a=!1,n=!1,i,s=()=>{i?.next(),a=!1,n&&r.complete()},o=new Oe;r.signal.subscribe(()=>{s(),o.next()}),t.subscribe({next(c){s(),i=new Oe,a=!0,e(c).subscribe({next:r.next,error:r.error,complete:s,signal:i})},error:r.error,complete(){n=!0,a||r.complete()},signal:o})})}function Pa(e){return t=>J(r=>{let a=r.signal,n=0,i=0,s=!1;t.subscribe({next:o=>{n++,e(o).subscribe({next:r.next,error:r.error,complete:()=>{i++,s&&i===n&&r.complete()},signal:a})},error:r.error,complete(){s=!0,i===n&&r.complete()},signal:a})})}function za(e){return ie(t=>{let r=!0;return{next(a){r&&(r=!1,e(a).subscribe({next:t.next,error:t.error,complete:()=>r=!0,signal:t.signal}))}}})}function ot(e){return Ie(t=>r=>{e(r)&&t.next(r)})}function ja(e){return Ie(t=>r=>{e-- >0&&!t.closed&&t.next(r),(e<=0||t.closed)&&t.complete()})}function Ha(e){return Ie(t=>r=>{!t.closed&&e(r)?t.next(r):t.complete()})}function Ua(){let e=!1;return ie(t=>({next(r){e||(e=!0,t.next(r),t.complete())},complete(){t.closed||t.error(new Da)}}))}function it(e){return Ie(t=>r=>{e(r),t.next(r)})}function Ga(e){return ie((t,r)=>{let a,n={next:t.next,error(i){try{if(t.closed)return;let s=e(i,r);s&&(a?.next(),a=new Oe,s.subscribe({...n,signal:a}))}catch(s){t.error(s)}},unsubscribe:()=>a?.next()};return n})}function Xa(){return Ie(e=>{let t=De;return r=>{r!==t&&(t=r,e.next(r))}})}function qa(){return e=>{let t=new _a(1),r=!1;return J(a=>{t.subscribe(a),r||(r=!0,e.subscribe(t))})}}function Wa(){return e=>{let t,r=0;function a(){--r===0&&t?.signal.next()}return J(n=>{n.signal.subscribe(a),r++===0?(t=Xe(),t.subscribe(n),e.subscribe(t)):t.subscribe(n)})}}function Va(){return e=>{let t=new Ge,r,a,n=!1,i=!1;return J(s=>{i?(s.next(a),s.complete()):t.subscribe(s),r??=e.subscribe({next:o=>{n=!0,a=o},error:s.error,complete(){i=!0,n&&t.next(a),t.complete()},signal:s.signal})})}}function w(...e){return e.length===1?e[0]:new R(t=>{let r=e.length;for(let a of e)t.closed||a.subscribe({next:t.next,error:t.error,complete(){r--===1&&t.complete()},signal:t.signal})})}function Y(...e){return e.length===0?O:new R(t=>{let r=e.length,a=r,n=0,i=!1,s=new Array(r),o=new Array(r);e.forEach((c,f)=>c.subscribe({next($){o[f]=$,s[f]||(s[f]=!0,++n>=a&&(i=!0)),i&&t.next(o.slice(0))},error:t.error,complete(){--r<=0&&t.complete()},signal:t.signal}))})}function Ja(e){return ie(t=>({next:t.next,unsubscribe:e}))}function Ya(){return ot(()=>!1)}var O=new R(e=>e.complete());function pe(e){return new It(e)}function J(e){return new R(e)}function Xe(){return new st}var br={catchError:Ga,debounceTime:La,distinctUntilChanged:Xa,exhaustMap:za,filter:ot,finalize:Ja,first:Ua,ignoreElements:Ya,map:Bt,mergeMap:Pa,publishLast:Va,reduce:Ba,share:Wa,shareLatest:qa,switchMap:Sr,take:ja,takeWhile:Ha,tap:it,throttleTime:Fa};for(let e in br)R.prototype[e]=function(...t){return this.pipe(br[e](...t))};function T(e,t,r){return new R(a=>{let n=a.next.bind(a);e.addEventListener(t,n,r),a.signal.subscribe(()=>e.removeEventListener(t,n,r))})}function ct(e){return Ft(e,{childList:!0})}function kr(e,t){return Ft(e,{attributes:!0,attributeFilter:t})}function Ft(e,t={attributes:!0,childList:!0}){return new R(r=>{let a=new MutationObserver(n=>n.forEach(i=>{for(let s of i.addedNodes)r.next({type:"added",target:e,value:s});for(let s of i.removedNodes)r.next({type:"removed",target:e,value:s});i.type==="characterData"?r.next({type:"characterData",target:e}):i.attributeName&&r.next({type:"attribute",target:e,value:i.attributeName})}));a.observe(e,t),r.signal.subscribe(()=>a.disconnect())})}function Cr(e){return T(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function Z(e){return T(e,"click")}function lt(e,t){return new R(r=>{let a=new IntersectionObserver(n=>{for(let i of n)r.next(i)},t);a.observe(e),r.signal.subscribe(()=>a.disconnect())})}function Ar(e){return lt(e).map(t=>t.isIntersecting)}function Ee(e){return lt(e).filter(t=>t.isIntersecting).first()}function Za(e){let t;return function(...r){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,r),t=0})}}function Nr(e){return ie(t=>{let r=Za(n=>{t.closed||(e&&e(n),t.next(n),a&&t.complete())}),a=!1;return{next:r,complete:()=>a=!0}})}function Mr(){return V(()=>document.readyState!=="loading"?z(!0):T(window,"DOMContentLoaded").first().map(()=>!0))}function ut(e,t){let r;return w(V(()=>(r=e.childNodes,r?z(r):O)),Ft(e,{childList:!0,...t}),Se().switchMap(()=>e.childNodes!==r?(r=e.childNodes,z(r)):O))}function Se(){return V(()=>document.readyState==="complete"?z(!0):T(window,"load").first().map(()=>!0))}function $r(...e){return new R(t=>{let r=new ResizeObserver(a=>a.forEach(n=>t.next(n)));for(let a of e)r.observe(a);t.signal.subscribe(()=>r.disconnect())})}function Tr(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function Lt(e,t,r){return a=>oe(z(e?a.matches(e):!1),T(a,t).switchMap(()=>w(z(!0),T(a,r).map(()=>e?a.matches(e):!1))))}var Fs=Lt("","animationstart","animationend"),Pt=Lt("","mouseenter","mouseleave"),Qa=Lt(":focus,:focus-within","focusin","focusout"),zt=e=>Y(Pt(e),Qa(e)).map(([t,r])=>t||r);function qe(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function Rr(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var Ls=it(e=>console.log(e));R.prototype.log=function(){return this.pipe(Ls)};R.prototype.raf=function(e){return this.pipe(Nr(e))};var X=Symbol("bindings"),Ps={},We=Symbol("augments"),Be=Symbol("parser"),Ka=class{bindings;messageHandlers;internals;attributes$=new xr;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(e){(this.messageHandlers??=new Set).add(e)}removeMessageHandler(e){this.messageHandlers?.delete(e)}message(e,t){let r=!1;if(this.messageHandlers)for(let a of this.messageHandlers)a.type===e&&(a.next(t),r||=a.stopPropagation);return r}add(e){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(e):(this.prebind??=[]).push(e)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let e=this.subscriptions=[];if(this.bindings)for(let t of this.bindings)e.push(t.subscribe());if(this.prebind)for(let t of this.prebind)e.push(t.subscribe())}}disconnect(){this.subscriptions?.forEach(e=>e.unsubscribe()),this.subscriptions=void 0}},dt=Symbol("css"),x=class extends HTMLElement{static observedAttributes;static[We];static[Be];[X]=new Ka;[dt];connectedCallback(){this[X].wasInitialized=!0,this[X].wasConnected||this.constructor[We]?.forEach(e=>e(this)),this[X].connect()}disconnectedCallback(){this[X].disconnect()}attributeChangedCallback(e,t,r){let a=this.constructor[Be]?.[e]??zs;t!==r&&(this[e]=a(r,this[e]))}};function zs(e,t){let r=t===!1||t===!0;return e===""?r?!0:"":e===null?r?!1:void 0:e}function en(e,t){e.hasOwnProperty(We)||(e[We]=e[We]?.slice(0)??[]),e[We]?.push(t)}var js={mode:"open"};function j(e){return e.shadowRoot??e.attachShadow(js)}function tn(e,t){t instanceof Node?j(e).appendChild(t):e[X].add(t)}function Hs(e,t){t.length&&en(e,r=>{for(let a of t){let n=a.call(e,r);n&&n!==r&&tn(r,n)}})}function Us(e,t){Ps[e]=t,customElements.define(e,t)}function u(e,{init:t,augment:r,tagName:a}){if(t)for(let n of t)n(e);r&&Hs(e,r),a&&Us(a,e)}function de(e){return oe(z(e),e[X].attributes$.map(()=>e))}function q(e,t){return e[X].attributes$.pipe(ot(r=>r.attribute===t),Bt(()=>e[t]))}function E(e,t){return w(q(e,t),V(()=>z(e[t])))}function Gs(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function jt(e,t,r){return r===!1||r===null||r===void 0?r=null:r===!0&&(r=""),r===null?e.removeAttribute(t):e.setAttribute(t,String(r)),r}function Xs(e,t,r){e.hasOwnProperty(Be)||(e[Be]={...e[Be]}),e[Be]&&(e[Be][t]=r)}function b(e,t){return r=>{t?.observe!==!1&&Gs(r).push(e),t?.parse&&Xs(r,e,t.parse);let a=`$$${e}`,n=r.prototype,i=Object.getOwnPropertyDescriptor(n,e);i&&Object.defineProperty(n,a,i);let s=t?.persist,o={enumerable:!0,configurable:!1,get(){return this[a]},set(c){this[a]!==c?(this[a]=c,s?.(this,e,c),this[X].attributes$.next({target:this,attribute:e,value:c})):i?.set&&(s?.(this,e,c),this[a]=c)}};en(r,c=>{if(i||(c[a]=c[e]),Object.defineProperty(c,e,o),s?.(c,e,c[e]),t?.render){let f=t.render(c);f&&tn(c,f)}})}}function C(e){return b(e,{persist:jt,observe:!0})}function ce(e){return b(e,{observe:!1})}function _(){return document.createElement("slot")}function Dr(e){return t=>{let[r,a]=e();return t[X].add(r),a}}var ft=class extends x{};u(ft,{tagName:"c-span"});function rn(e,t){let r=document.createTextNode("");return e[X].add(t.tap(a=>r.textContent=a)),r}var _r=document.createDocumentFragment();function pt(e,t,r=e){if(t!=null)if(Array.isArray(t)){for(let a of t)pt(e,a,_r);r!==_r&&r.appendChild(_r)}else e instanceof x&&t instanceof R?r.appendChild(rn(e,t)):t instanceof Node?r.appendChild(t):e instanceof x&&typeof t=="function"?pt(e,t(e),r):r.appendChild(document.createTextNode(t))}function an(e,t){for(let r in t){let a=t[r];e instanceof x?a instanceof R?e[X].add(r==="$"?a:a.tap(n=>e[r]=n)):r==="$"&&typeof a=="function"?e[X].add(a(e)):e[r]=a:e[r]=a}}function qs(e,t){return e.constructor.observedAttributes?.includes(t)}function Or(e,t){let r=e instanceof x&&qs(e,t)?q(e,t):kr(e,[t]).map(()=>e[t]);return w(r,V(()=>z(e[t])))}function Ir(e,t,r){return b(e,{parse(a){if(a==="Infinity"||a==="infinity")return 1/0;let n=a===void 0?void 0:Number(a);return t!==void 0&&(n===void 0||n<t||isNaN(n))&&(n=t),r!==void 0&&n!==void 0&&n>r&&(n=r),n}})}function ke(e,t,r){for(let a=e.parentElement;a;a=a.parentElement)if(a[X]?.message(t,r))return}function Fe(e,t,r=!0){return new R(a=>{let n={type:t,next:a.next,stopPropagation:r};e[X].addMessageHandler(n),a.signal.subscribe(()=>e[X].removeMessageHandler(n))})}function I(e,t,...r){let a=typeof e=="string"?document.createElement(e):new e;return t&&an(a,t),r&&pt(a,r),a}function S(e,t,...r){if(e!==S&&typeof e=="function"&&!(e.prototype instanceof x))return r.length&&((t??={}).children=r),e(t);let a=e===S?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&an(a,t),r&&pt(a,r),a}var mt=y(":host{display:contents}"),dn=[-2,-1,0,1,2,3,4,5],Lr=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],Je=Xe(),ht=pe(""),Le=y(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),Js=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),fn={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function mn(e=fn){return Object.entries(e).map(([t,r])=>`--cxl-color--${t}:${r};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var H={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:fn,imports:Js?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function Ht(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var gt=y(Ht()),Pr={"./theme-dark.js":()=>Promise.resolve().then(()=>(on(),sn))},Ye=[0,4,8,16,24,32,48,64],Ve,cn,Ys;function U(e,t){return e==="xsmall"?`@media(max-width:${H.breakpoints.small}px){${t}}`:`@media(min-width:${H.breakpoints[e]}px){${t}}`}function bt(e){return $r(e).map(t=>{let r=H.breakpoints,a=t.contentRect.width,n="xsmall";for(let i in r){if(r[i]>a)return n;n=i}return n})}function Zs(e=""){return Object.entries(Hr).map(([t,r])=>`:host([color=${t}]) ${e}{ ${r} }`).join("")}function Pe(e,t,r=""){return zr(e,`
		${t?`:host ${r} { ${Hr[t]} }`:""}
		:host${t?"":"([color])"} ${r} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${r}{
			color: inherit;
			background-color: transparent;
		}
		${Zs(r)}
	`)}function zr(e,t){let r=y(t);return b(e,{persist:jt,render:a=>r(a)})}function fe(e,t){return zr(e,dn.map(r=>{let a=t(r);return r===0?`:host ${a}`:`:host([size="${r}"]) ${a}`}).join(""))}function hn(){let e=document.adoptedStyleSheets.indexOf(Ve);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function gn(e){Ve&&hn();let t=e.globalCss??"";e.colors&&(t+=`:root{${mn(e.colors)}}`),t&&(Ve=Ce(t),document.adoptedStyleSheets.push(Ve)),Je.next({theme:e,stylesheet:Ve,css:t}),ht.next(e.name)}var ln="";function jr(e){e?e!==ln&&(typeof e=="string"?import(e):e()).then(t=>gn(t.default)):Ve&&(hn(),Je.next(void 0),ht.next("")),ln=e}function bn(e){let t;return Je.tap(r=>{let a=r?.theme.override?.[e.tagName];a?t?t.replace(a):e.shadowRoot?.adoptedStyleSheets.push(t??=Ce(a)):t&&t.replace("")})}function Ce(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function y(e){let t;return r=>{let a=j(r);if(a.adoptedStyleSheets.push(t??=Ce(e)),!r[dt])return H.css&&a.adoptedStyleSheets.unshift(Ys??=Ce(H.css)),r[dt]=!0,bn(r)}}var xn=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],Qs=[...xn,"inherit"];function Br(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function me(e){return`${Br(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var Hr=xn.reduce((e,t)=>(e[t]=`
${Br(t)}
${t==="inverse-surface"?Br("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function xt(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function F(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var Ks=requestAnimationFrame(()=>wn()),eo={},un=document.createElement("template"),pn={};function yn(e){return function(t){let r=e(t),a=pn[r];if(a)return a.cloneNode(!0);let n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=()=>(n.dispatchEvent(new ErrorEvent("error")),"");return fetch(r).then(s=>s.ok?s.text():i(),i).then(s=>{if(!s)return;un.innerHTML=s;let o=un.content.children[0];if(!o)return;let c=o.getAttribute("viewBox");c?n.setAttribute("viewBox",c):o.hasAttribute("width")&&o.hasAttribute("height")&&n.setAttribute("viewBox",`0 0 ${o.getAttribute("width")} ${o.getAttribute("height")}`);for(let f of o.childNodes)n.append(f);pn[t.name]=n}),n.setAttribute("fill","currentColor"),n}}var to=yn(({name:e,width:t,fill:r})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${r?"fill1_":""}${t}px.svg`)),ro=to;function Ur(e,t={}){let{width:r,height:a}=t;r===void 0&&a===void 0&&(r=a=24);let n=eo[e]?.icon()||ro({name:e,width:r,fill:t.fill});return t.className&&n.setAttribute("class",t.className),r&&(n.setAttribute("width",`${r}`),a===void 0&&n.setAttribute("height",`${r}`)),a&&(n.setAttribute("height",`${a}`),r===void 0&&n.setAttribute("width",`${a}`)),t.alt&&n.setAttribute("alt",t.alt),n}var Fr,vn=new Promise(e=>{Fr=e});function wn(e){cancelAnimationFrame(Ks),cn||(e&&(e.colors&&(H.colors=e.colors),e.globalCss&&(H.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(cn=Ce(`:root { ${mn(H.colors)} }`+H.globalCss)),H.imports?Promise.allSettled(H.imports.map(t=>{let r=document.createElement("link");return r.rel="stylesheet",r.href=t,document.head.append(r),new Promise((a,n)=>(r.onload=a,r.onerror=n))})).then(Fr):Fr())}function Gr(){return wr(async()=>{await vn,await document.fonts.ready})}function Xr(e="block"){let t=(r=>{for(let a=12;a>0;a--)r.xl+=`:host([xl="${a}"]){display:${e};grid-column-end:span ${a};}`,r.lg+=`:host([lg="${a}"]){display:${e};grid-column-end:span ${a};}`,r.md+=`:host([md="${a}"]){display:${e};grid-column-end:span ${a};}`,r.sm+=`:host([sm="${a}"]){display:${e};grid-column-end:span ${a};}`,r.xs+=`:host([xs="${a}"]){display:${e};grid-column-end:span ${a};}`;return r})({xl:"",lg:"",md:"",sm:"",xs:""});return y(`
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
`)}var qr=y(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${xt()}
${Ye.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${Ye.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),Ut=class extends x{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};u(Ut,{init:[C("sm"),C("xs"),C("md"),C("lg"),C("xl"),C("vpad"),C("pad"),C("center"),C("fill"),C("grow"),C("elevation"),Pe("color")]});var ao=class extends Ut{};u(ao,{tagName:"c-c",augment:[qr,Xr(),y(":host([center]) { text-align: center}"),_]});var Ze=class extends Ut{vflex=!1;gap;middle=!1};u(Ze,{tagName:"c-flex",init:[C("vflex"),C("gap"),C("middle")],augment:[Xr("flex"),qr,y(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${Ye.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),_]});var Gt=class extends Ze{};u(Gt,{tagName:"c-toolbar",augment:[y(`
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
		`)]});function no(e,t){return r=>new R(()=>{r.hasAttribute(e)||r.setAttribute(e,t)})}function K(e){return no("role",e)}var so=0;function En(e){return Or(e,"id").map(t=>(t||(e.id=`cxl__${so++}`),e.id))}var Xt={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(r){console.error(r)}}};function Wr(e){return(t,r)=>t[e]>r[e]?1:t[e]<r[e]?-1:0}function Vr(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let r,a=e.getRootNode();return a instanceof ShadowRoot&&(r=a.getElementById(t),r)?r:e.ownerDocument.getElementById(t)??void 0}function Sn(e,t,r){return new R(a=>{let n={id:e,controller:r,target:t};ke(t,`registable.${e}`,n),a.signal.subscribe(()=>n.unsubscribe?.())})}function oo(e){return E(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function io(e,t=e,r=0){let a=t.hasAttribute("tabindex")?t.tabIndex:r;return oo(e).tap(n=>{n?t.removeAttribute("tabindex"):t.tabIndex=a})}function co(e,t=e){return w(T(t,"focusout").tap(()=>e.touched=!0),w(q(e,"disabled"),q(e,"touched")).tap(()=>ke(e,"focusable.change")))}function qt(e,t=e,r=0){return w(io(e,t,r),co(e,t))}var lo=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(e){e.element.parentElement!==this.popupContainer?this.popupOpened(e):e.close()}popupOpened(e){this.currentPopup&&e.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=e}openModal(e){this.currentModal&&e.element!==this.currentModal.element&&this.currentModal.close(),e.element.parentNode||this.popupContainer?.append(e.element),e.element.open||e.element.showModal(),this.currentModal=e}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(e){this.currentTooltip&&this.currentTooltip!==e&&this.currentTooltip.remove(),this.currentTooltip=e}close(){this.currentPopup?.close()}},Ae=new lo;function kn(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(r=>{let a=Vr(e,r);return a?[a]:[]}):Array.isArray(t)?t:[t]}function uo(e,t,r,a,n=T(e,"click").map(()=>!r())){return w(a,n).switchMap(i=>{let s=t();return s?Er(s.map(o=>({target:o,open:i}))):O})}function Jr(e,t=e){function r(i,s){return[E(e,"open").switchMap(o=>(i.parentNode||Ae.popupContainer.append(i),o&&i instanceof x?q(i,"open").map(c=>{e.open&&c===!1&&(e.open=!1)}):O)),En(i).tap(o=>{let c=i.getAttribute("role");(c==="menu"||c==="listbox"||c==="tree"||c==="grid"||c==="dialog")&&(s.ariaHasPopup=c),s.getRootNode()===i.getRootNode()&&s.setAttribute("aria-controls",o)})]}let a=Y(E(e,"trigger"),E(e,"target")).switchMap(([i])=>{let s=kn(e),o=s?w(...s.flatMap(c=>r(c,e))).ignoreElements():O;return w(i==="hover"?Y(zt(t),s?w(...s.map(c=>zt(c))):O).map(c=>!!c.find(f=>!!f)).debounceTime(250):i==="checked"?T(t,"change").map(c=>c.target&&"checked"in c.target?!!c.target.checked:!1):T(t,"click").map(()=>!e.open),o)}),n;return Mr().switchMap(()=>uo(t,()=>kn(e),()=>e.open,E(e,"open"),a).filter(i=>{let{open:s,target:o}=i;if(e.open!==s){if(s)n=Rr(e)?.activeElement,o.trigger=e;else if(o.trigger&&o.trigger!==e)return i.open=!0,o.trigger=e,!0;return e.open=s,!1}if(!s&&o.trigger===e){let c=document.activeElement;(c===document.body||c===document.documentElement)&&n?.focus()}return!0}))}var Cn=class extends x{open=!1;target;trigger};u(Cn,{init:[b("target"),b("trigger"),C("open")],augment:[e=>Jr(e).raf(({target:t,open:r})=>t.open=r)]});var po=class extends Cn{};u(po,{tagName:"c-toggle",augment:[mt,_]});function An(e){return e in H.animation}function he({target:e,animation:t,options:r}){if(H.disableAnimations)return e.animate(null);let a=typeof t=="string"?H.animation[t]:t;if(!a)throw new Error(`Animation "${t}" not defined`);let n=typeof a.kf=="function"?a.kf(e):a.kf,i={duration:250,easing:H.easing.emphasized,...a.options,...r,...H.prefersReducedMotion?{duration:0}:void 0};return e.animate(n,i)}function Nn(e){let{trigger:t,stagger:r,commit:a,keep:n}=e;function i(o){return new R(c=>{let f=he(o);f.ready.then(()=>c.next({type:"start",animation:f}),()=>{}),f.addEventListener("finish",()=>{c.next({type:"end",animation:f}),a&&f.commitStyles(),!(n||n!==!1&&o.options?.fill&&(o.options.fill==="both"||o.options.fill==="forwards"))&&c.complete()}),c.signal.subscribe(()=>{try{f.cancel()}catch{}})})}let s=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return w(...s.map((o,c)=>{let f={...e.options,delay:r!==void 0?(e.options?.delay??0)+c*r:e.options?.delay};return(t==="visible"?Ar(o).filter($=>$):t==="hover"?Pt(o):z(!0)).switchMap($=>$?i({...e,options:f,target:o}):O)}))}function Mn(e,t,r=e.getBoundingClientRect()){let a=r.width>r.height?r.width:r.height,n=new Rn,i=e.shadowRoot||e,{x:s,y:o}=t??{},c=s===void 0||!t||qe(t),f=s>r.right||s<r.left||o>r.bottom||o<r.top;return n.x=c||f?r.width/2:s-r.left,n.y=c||f?r.height/2:o-r.top,n.radius=a,t||(n.duration=0),i.prepend(n),n}function $n(e,t=e){let r,a,n,i=()=>{r=Mn(t,a instanceof Event?a:void 0,n),r.duration=600,a=void 0};return w(T(e,"click").tap(s=>{a=s,n=t.getBoundingClientRect()}),E(e,"selected").raf().switchMap(()=>{if(e.selected){if(!r?.parentNode){if(Tr(e))return a=void 0,Ee(e).tap(i);i()}}else r&&Tn(r);return O})).ignoreElements()}function Tn(e){return new Promise(t=>{he({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function Ne(e,t=e){let r=!1,a=0;return w(T(t,"pointerdown"),T(t,"click")).tap(n=>n.cxlRipple??=e).raf().mergeMap(n=>{if(n.cxlRipple===e&&!r&&!e.disabled&&e.parentNode){a=Date.now(),r=!0,e.style.setProperty("--cxl-mask-hover","none");let i=Mn(e,n),s=i.duration,o=()=>{e.style.removeProperty("--cxl-mask-hover"),Tn(i).then(()=>{r=!1})};return n.type==="click"?we(s).tap(o):w(T(document,"pointerup"),T(document,"pointercancel")).first().map(()=>{let c=Date.now()-a;setTimeout(()=>o(),c>s?32:s-c)})}return O})}var Rn=class extends x{x=0;y=0;radius=0;duration=500};u(Rn,{tagName:"c-ripple",init:[b("x"),b("y"),b("radius")],augment:[y(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",J(()=>{let r=t.style;r.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,r.width=r.height=e.radius*2+"px",t.parentNode||j(e).append(t),he({target:t,animation:"expand",options:{duration:e.duration}}),he({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var yt=[Le,gt,y(`
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
}`)],fo=y(`
:host {
	${F("label-large")}
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
`);function Yr(e){return E(e,"disabled").switchMap(t=>t?O:Cr(e).tap(r=>{r.stopPropagation(),e.click()}))}function Zr(e){return w(Yr(e),qt(e))}var Wt=class extends x{disabled=!1;touched=!1};u(Wt,{init:[C("disabled"),C("touched")],augment:[K("button"),Zr]});var Qr=class extends Wt{size;color;variant};u(Qr,{tagName:"c-button",init:[fe("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),Pe("color","primary"),C("variant")],augment:[...yt,fo,Ne,_]});var ge=class extends x{font};u(ge,{tagName:"c-t",init:[C("font")],augment:[y(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${Lr.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${F("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${F("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${F("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${F("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${F("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${F("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),_,e=>E(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var mo=/([^&=]+)=?([^&]*)/g,ho=/:([\w_$@]+)/g,go=/\/\((.*?)\)/g,bo=/(\(\?)?:\w+/g,xo=/\*\w+/g,yo=/[-{}[\]+?.,\\^$|#\s]/g,vo=/([^#]*)(?:#(.+))?/,ea="@@cxlRoute",ee={location:window.location,history:window.history};function wo(e){let t=[];return[new RegExp("^/?"+e.replace(yo,"\\$&").replace(go,"\\/?(?:$1)?").replace(bo,function(r,a){return t.push(r.substr(1)),a?r:"([^/?]*)"}).replace(xo,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function _n(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function Kr(e,t){return t?e.replace(ho,(r,a)=>t[a]||""):e}function Eo(e){let t={},r;for(;r=mo.exec(e);)t[r[1]]=decodeURIComponent(r[2]);return t}var So=class{path;regex;parameters;constructor(e){this.path=e=_n(e),[this.regex,this.parameters]=wo(e)}_extractQuery(e){let t=e.indexOf("?");return t===-1?{}:Eo(e.slice(t+1))}getArguments(e){let t=this.regex.exec(e),r=t&&t.slice(1);if(!r)return;let a=this._extractQuery(e);return r.forEach((n,i)=>{let s=i===r.length-1?n||"":n?decodeURIComponent(n):"";a[this.parameters[i]]=s}),a}test(e){return this.regex.test(e)}toString(){return this.path}},ko=class{id;path;parent;redirectTo;definition;isDefault;constructor(e){if(e.path!==void 0)this.path=new So(e.path);else if(!e.id)throw console.log(e),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=e.id||(e.path??`route${Math.random().toString()}`),this.isDefault=e.isDefault||!1,this.parent=e.parent,this.redirectTo=e.redirectTo,this.definition=e}create(e){let t=this.definition.render();t[ea]=this;for(let r in e)e[r]!==void 0&&(t[r]=e[r]);return t}},Co=class{routes=[];defaultRoute;findRoute(e){return this.routes.find(t=>t.path?.test(e))??this.defaultRoute}get(e){return this.routes.find(t=>t.id===e)}register(e){if(e.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=e}this.routes.unshift(e)}};function Ao(e){return e[ea]}function Qe(e){let t=vo.exec(e);return{path:_n(t?.[1]||""),hash:t?.[2]||""}}var No={getHref(e){return e=typeof e=="string"?Qe(e):e,`${ee.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ee.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let r=this.getHref(e);r!==`${location.pathname}${location.search}${location.hash}`&&ee.history.pushState({url:e},"",r)}},deserialize(){return{path:ee.location.search.slice(1),hash:ee.location.hash.slice(1)}}},Mo={getHref(e){return e=typeof e=="string"?Qe(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=ee.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let r=this.getHref(e);r!==`${location.pathname}${location.search}${location.hash}`&&ee.history.pushState({url:e},"",r||"/")}},deserialize(){return{path:ee.location.pathname,hash:ee.location.hash.slice(1)}}},Dn={getHref(e){return e=typeof e=="string"?Qe(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Dn.getHref(e);ee.location.hash!==t&&(ee.location.hash=t)},deserialize(){return Qe(ee.location.hash.slice(1))}},On={hash:Dn,path:Mo,query:No},$o=class{callbackFn;state;routes=new Co;instances={};root;lastGo;constructor(e){this.callbackFn=e}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(e){let t=new ko(e);return this.routes.register(t),t}go(e){this.lastGo=e;let t=typeof e=="string"?Qe(e):e,r=t.path,a=this.state?.url;if(r!==a?.path){let n=this.routes.findRoute(r);if(!n)throw new Error(`Path: "${r}" not found`);let i=n.path?.getArguments(r);if(n.redirectTo)return this.go(Kr(n.redirectTo,i));let s=this.execute(n,i);if(this.lastGo!==e)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:t,arguments:i,route:n,current:s,root:this.root})}else this.state&&t.hash!=a?.hash&&this.updateState({...this.state,url:t})}getPath(e,t){let r=this.routes.get(e),a=r&&r.path;return a&&Kr(a.toString(),t)}isActiveUrl(e){let t=Qe(e);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(a=>{let n=a[ea],i=this.state?.arguments;if(n?.path?.test(t.path)&&(!t.hash||t.hash===r.hash)){if(i){let s=n.path.getArguments(t.path);for(let o in s)if(i[o]!=s[o])return!1}return!0}return!1})}updateState(e){this.state=e,this.callbackFn?.(e)}findRoute(e,t){let r=this.instances[e],a;if(r)for(a in t){let n=t[a];n!==void 0&&(r[a]=n)}return r}executeRoute(e,t,r){let a=e.parent,n=a&&this.routes.get(a),i=e.id,s=n&&this.executeRoute(n,t,r),o=this.findRoute(i,t)||e.create(t);return s?o&&o.parentNode!==s&&s.appendChild(o):this.root=o,r[i]=o,o}discardOldRoutes(e){let t=this.instances;for(let r in t){let a=t[r];e[r]!==a&&(a.parentNode?.removeChild(a),delete t[r])}}execute(e,t){let r={},a=this.executeRoute(e,t||{},r);return this.discardOldRoutes(r),this.instances=r,a}},vt=new st,In=new st,le=new $o(()=>vt.next());function To(e,t=On.query){return w(J(()=>In.next(t)),e.tap(()=>le.go(t.deserialize())),vt.tap(()=>t.serialize(le.getState().url))).catchError(r=>{if(r?.name==="SecurityError")return O;throw r})}function Ro(){return oe(z(location.hash.slice(1)),T(window,"hashchange").map(()=>location.hash.slice(1)))}var Vt;function _o(){if(!Vt){Vt=new It(history.state);let e=history.pushState;history.pushState=function(...t){let r=e.apply(this,t);return history.state&&(history.state.lastAction="push"),Vt.next(history.state),r}}return w(T(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),Vt)}function Do(){let e;return w(Ro(),_o()).map(()=>window.location).filter(t=>{let r=t.href!==e;return e=t.href,r})}var Nl=vt.raf().map(()=>{let e=[],t=le.getState(),r=t.current;do r.routeTitle&&e.unshift({title:r.routeTitle,first:r===t.current,path:Oo(r)});while(r=r.parentNode);return e});function Oo(e){let t=Ao(e);return t&&Kr(t.path?.toString()||"",le.state?.arguments||{})}function Bn(e,t,r=t){return w(Y(In,de(e)).tap(([a])=>{e.href!==void 0&&(t.href=e.external?e.href:a.getHref(e.href)),t.target=e.target||""}),Z(t).tap(a=>{e.target||a.preventDefault()}),Z(r).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):le.go(e.href))}))}function Io(e,t){let r=document.createElement("div");return r.style.display="contents",r.routeTitle=t,r.appendChild(e.content.cloneNode(!0)),r}var Bo=class extends x{strategy="query";get state(){return le.state}go(e){return le.go(e)}};u(Bo,{tagName:"c-router",init:[b("strategy")],augment:[e=>{function t(r){let a=r.dataset;if(a.registered)return;a.registered="true";let n=a.title||void 0;le.route({path:a.path,id:a.id||void 0,parent:a.parent||void 0,isDefault:r.hasAttribute("data-default"),redirectTo:a.redirectto,render:Io.bind(null,r,n)})}return Se().switchMap(()=>{for(let r of Array.from(e.children))r instanceof HTMLTemplateElement&&t(r);return w(ct(e).tap(r=>{r.type==="added"&&r.value instanceof HTMLTemplateElement&&t(r.value)}),E(e,"strategy").switchMap(r=>{let a=On[r];return To(Do(),a).catchError((n,i)=>(console.error(n),i))}))})}]});function ta(e,t=e){return w(Fo(e,t).ignoreElements(),vt.map(()=>e.href!==void 0&&le.isActiveUrl(e.href)))}function Fo(e,t=e){let r=I("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return r.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,j(e).append(r),w(Bn(e,r),T(r,"click").tap(a=>{a.stopPropagation(),qe(a)||e.dispatchEvent(new PointerEvent(a.type,a)),ke(e,"toggle.close",void 0)}),Z(t).tap(a=>{qe(a)&&r.click()}))}var Lo=class extends x{href};u(Lo,{tagName:"c-router-selectable",init:[b("href")],augment:[mt,()=>I("slot"),e=>V(()=>{let t=e.parentElement;return ta(e,t).raf(r=>{t.selected=r})})]});var Po=y(`
:host {
	box-sizing: border-box;
	position: relative;
	display: flex;
	padding: 4px 16px;
	min-height: 56px;
	align-items: center;
	column-gap: 16px;
	${F("body-medium")}
}
:host([disabled]) { color: color-mix(in srgb, var(--cxl-color-on-surface) 38%, transparent); }
:host([selected]) {
	background-color: var(--cxl-color-secondary-container);
	color: var(--cxl-color-on-secondary-container);
}
`);function zo(e){return w(Sn("list",e),E(e,"selected").tap(t=>e.ariaSelected=String(t)))}function jo(e){return w(Yr(e),qt(e,e,-1),zo(e))}var Jt=class extends x{disabled=!1;touched=!1;selected=!1};u(Jt,{init:[C("disabled"),C("touched"),C("selected")],augment:[jo]});var Ho=class extends Jt{size};u(Ho,{tagName:"c-item",init:[fe("size",e=>`{min-height:${56+e*8}px}`)],augment:[Po,Le,gt,K("option"),_,Ne]});var Fn=[y(`
:host {
	--cxl-color-on-surface: var(--cxl-color-on-surface-variant);
	--cxl-color-ripple: var(--cxl-color-secondary-container);
	background-color: var(--cxl-color-surface);
	color: var(--cxl-color-on-surface);
	${F("label-large")}
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
${Ht("c-ripple")}
	`),Le,$n,_],Ke=class extends Jt{size};u(Ke,{tagName:"c-nav-item",init:[fe("size",e=>`{min-height:${56+e*8}px}`)],augment:[K("option"),...Fn]});var Yt=class extends Ke{href;external=!1;target};u(Yt,{tagName:"c-router-item",init:[b("href"),b("external"),b("target")],augment:[e=>ta(e).tap(t=>{e.selected=t})]});function Ln(e=document){document.documentElement.lang="en";let t=[I("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),I("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),I("meta",{name:"mobile-web-app-capable",content:"yes"}),I("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${F("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function Pn(e=2e3){return w(we(e),Gr()).first()}function zn(e){return Pn().raf(()=>e.setAttribute("ready",""))}function Zt(e){return w(J(t=>{let r=Ln(e.ownerDocument??document);t.signal.subscribe(()=>r.forEach(a=>a.remove()))}),Se().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),Pn().switchMap(()=>bt(e).raf(t=>e.setAttribute("breakpoint",t))),zn(e),ht.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Uo=class extends x{connectedCallback(){requestAnimationFrame(()=>Ln(this.ownerDocument||document)),super.connectedCallback()}};u(Uo,{tagName:"c-meta",augment:[()=>zn(document.body)]});var ra=class extends x{};u(ra,{tagName:"c-page",augment:[Zt,y(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${me("background")}
}`),_]});var ze=class extends x{name="";width;height;alt;fill=!1};u(ze,{tagName:"c-icon",init:[b("name"),b("width"),b("height"),b("fill"),b("alt")],augment:[K("none"),y(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,r;return e.shadowRoot?.adoptedStyleSheets.push(t),Ee(e).switchMap(()=>de(e)).debounceTime(0).tap(()=>{let a=e.width??e.height,n=e.height??e.width;t.replace(`:host{${a===void 0?"":`width:${a}px;`}${n===void 0?"":`height:${n}px`}}`),r?.remove(),r=e.name?Ur(e.name,{className:"icon",width:a,height:n,fill:e.fill,alt:e.alt}):void 0,r&&(r.onerror=()=>{r&&e.alt&&r.replaceWith(e.alt)},j(e).append(r))})}]});var aa=class extends Qr{};u(aa,{tagName:"c-button-round",augment:[y(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var be=class extends aa{icon="";width;height;fill=!1;variant="text";alt};u(be,{tagName:"c-icon-button",init:[b("icon"),b("width"),b("height"),b("alt"),b("fill")],augment:[e=>I(ze,{className:"icon",width:E(e,"width"),height:E(e,"height"),name:E(e,"icon"),fill:E(e,"fill"),alt:E(e,"alt")})]});var Qt=class extends be{open=!1;target;icon="menu"};u(Qt,{tagName:"c-navbar-toggle",init:[b("target"),ce("open")],augment:[e=>Jr(e).tap(({target:t,open:r})=>t.open=r)]});var Me;function jn(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Go(e){return e==="infinite"?1/0:+e}function Xo(e){if(An(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let r={},a;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(o,c,f)=>(c&&(a=+c),f&&(r.composite=f),"")),Me??=document.createElement("style").style,Me.animation=e,r.fill=Me.animationFillMode;let n=r.fill==="forwards"||r.fill==="both",i=t?void 0:jn(Me.animationDuration);i!==void 0&&(r.duration=i);let s=jn(Me.animationDelay);return s!==void 0&&(r.delay=s),Me.animationIterationCount&&(r.iterations=Go(Me.animationIterationCount)),{animation:Me.animationName,keep:n,stagger:a,options:r}}function qo(e){return typeof e=="string"&&(e=e.split(",").map(t=>Xo(t.trim()))),e}function na(e,t,r,a){let n=a?`motion-${a}-on`:"motion-on",i=qo(r);return e.setAttribute(n,""),w(...i.map(s=>Nn({target:t,...s}))).finalize(()=>e.removeAttribute(n))}var Hn=y(":host(:not([open],[motion-out-on])){display:none}");function sa(e,t=()=>e,r=!1){let a=V(()=>z(t("in"))),n=V(()=>z(t("out")));return w(Fe(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),Y(E(e,"motion-in").map(i=>i?a.switchMap(s=>na(e,s,i,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?we(e.duration).map(()=>e.open=!1):O):a),E(e,"motion-out").map(i=>(i?n.switchMap(s=>na(e,s,i,"out").ignoreElements()):n).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([i,s])=>q(e,"open").switchMap(o=>{if(e.popover!=="auto"){let c=o?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:o?"closed":"open",newState:c}))}return o?r?oe(s,i):i:r?oe(s,i):s})))}var Kt=class extends x{open=!1;duration;"motion-in";"motion-out"};u(Kt,{init:[b("motion-in"),b("motion-out"),Ir("duration"),C("open")]});var Wo=class extends Kt{};u(Wo,{tagName:"c-toggle-target",augment:[y(`
:host{display:contents}
`),e=>{let t=I("slot"),r=I("slot",{name:"off"});return(e.open?r:t).style.display="none",j(e).append(t,r),sa(e,a=>{t.style.display=r.style.display="none";let n=e.open?a==="in"?t:r:a==="in"?r:t;return n.style.display="",n.assignedElements()},!0)}]});var Vo=()=>{let e;function t(){let r=document.adoptedStyleSheets.indexOf(e);r!==-1&&document.adoptedStyleSheets.splice(r,1)}addEventListener("message",r=>{let{theme:a}=r.data;t(),a!==void 0&&(e=new CSSStyleSheet,e.replace(a),document.adoptedStyleSheets.push(e))})},Jo=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},er=class extends x{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};u(er,{tagName:"c-iframe",init:[b("src"),b("srcdoc"),b("sandbox"),b("handletheme")],augment:[y(`
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
	`),e=>{let t=S("iframe",{loading:"lazy"}),r=S("slot",{name:"loading"}),a=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(a),r.style.display="none";function n(s){a.replaceSync(":host{height:"+s+"px}"),t.style.height="100%",t.style.opacity="1",r.style.display="none"}function i(s){if(s){let o=`<script type="module">
(${Jo.toString()})();
(${Vo.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${s}${o}`,r.style.display=""}}return j(e).append(t,r),w(Y(E(e,"srcdoc"),E(e,"src")).raf(async([s,o])=>{i(o?`<base href="${o}" />`+await fetch(o).then(c=>c.text()):s)}),T(window,"message").tap(s=>{let{height:o}=s.data;s.source===t.contentWindow&&o!==void 0&&n(o)}),E(e,"handletheme").switchMap(s=>s?T(t,"load").switchMap(()=>Je.raf(o=>{let c=o?.css??"";t.contentWindow?.postMessage({theme:c},"*")})):O),E(e,"sandbox").tap(s=>s===void 0?t.removeAttribute("sandbox"):t.sandbox.value=s))}]});function oa(e){let t=document.createElement("style");return w(J(r=>{let a=e.persistkey&&Xt.get(e.persistkey);a!==void 0?e.open=a===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),r.signal.subscribe(()=>t.remove())}),de(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let r=e.open?e.themeon:e.themeoff;e.persistkey&&Xt.set(e.persistkey,r),jr(Pr[r]||r)}),Z(e).tap(()=>e.open=!e.open))}var Yo=class extends x{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};u(Yo,{tagName:"c-toggle-theme",init:[b("persistkey"),b("usepreferred"),b("open"),b("themeon"),b("themeoff")],augment:[K("group"),oa]});var tr=class extends be{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};u(tr,{tagName:"c-icon-toggle-theme",init:[b("persistkey"),b("usepreferred"),b("open"),b("themeon"),b("themeoff")],augment:[oa,e=>Y(E(e,"iconon"),E(e,"iconoff"),E(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var Un=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(e,t=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(e)?(this.frag.append(...e),r.insertBefore(this.frag,t)):r.insertBefore(e,t))}empty(){let e=this.start.nextSibling;for(;e&&e!==this.end;){let t=e.nextSibling;e.remove(),e=t}}};function Gn({source:e,render:t,empty:r,append:a,loading:n}){let i=[],s=document.createDocumentFragment(),o,c;function f($){if(c?.parentNode?.removeChild(c),!$)return;let k=0;for(let P of $){let Te=i[k]?.item;if(Te)Te.value!==P&&Te.next(P);else{let xe=pe(P),ye=t(xe,k,$),rt=ye instanceof DocumentFragment?Array.from(ye.childNodes):[ye];i.push({elements:rt,item:xe}),s.append(ye)}k++}s.childNodes.length&&a(s),o?.remove(),k===0&&r&&a(o=r());let te=i.length;for(;te-- >k;)i.pop()?.elements.forEach(P=>P.remove())}return V(()=>(c=n?.(),c&&a(c),e.raf(f)))}function ia(e){return Dr(()=>{let t=new Un;return[Gn({...e,append:t.insert.bind(t)}),t.end]})}var ca=class extends Kt{};u(ca,{tagName:"c-toggle-panel",augment:[_,Hn,sa]});var la=class extends x{center=!1};u(la,{tagName:"c-backdrop",init:[C("center")],augment:[y(`
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

	`),e=>T(e,"keydown").tap(t=>t.stopPropagation()),_]});var Xn=y(`
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
`),ua=class extends x{open=!1;position;responsive;permanent=!1};u(ua,{tagName:"c-drawer",init:[C("open"),C("position"),b("responsive"),b("permanent")],augment:[Xn,y(`
:host { max-width: 360px; }
#drawer.permanent {
	${me("surface")}
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
`),e=>{let t=pe(!1),r=w(E(e,"position"),t).raf(),a=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",n=I(ca,{id:"drawer","motion-in":r.map(()=>e.permanent&&t.value?void 0:a()?"slideInRight":"slideInLeft"),"motion-out":r.map(()=>e.permanent&&t.value?void 0:a()?"slideOutRight":"slideOutLeft")},_),i=new la;i.id="backdrop";let s=I("dialog",{id:"dialog"},i,n);return j(e).append(s),w(T(n,"close").tap(()=>s.close()),T(s,"close").tap(()=>e.open=!1),q(n,"open").tap(o=>e.open=o),q(e,"open").raf(o=>{o||n.scrollTo(0,0)}),T(i,"click").tap(()=>e.open=!1),T(s,"cancel").tap(o=>{o.preventDefault(),e.open=!1}),E(e,"open").tap(o=>{if(t.value&&e.permanent)return n.open=!0;o?t.value||(Ae.openModal({element:s,close:()=>e.open=!1}),s.getBoundingClientRect()):Ae.currentModal?.element===s&&Ae.modalClosed()}).raf(o=>{n.open=o}),E(e,"responsive").switchMap(o=>o!==void 0?bt(document.body):z("xsmall")).switchMap(o=>{let c=H.breakpoints[e.responsive||"large"],f=H.breakpoints[o]>=c;return t.next(f),f&&n.className!=="permanent"?s.close():!f&&n.className==="permanent"&&(e.open=!1),f&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",f),n.className=f?"permanent":"drawer",q(e,"open").tap($=>{e.hasAttribute("responsiveon")||he({target:i,animation:$?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var rr=class extends x{disabled=!1;touched=!1;selected=!1;color;size=0};u(rr,{tagName:"c-chip",init:[C("disabled"),C("touched"),C("selected"),Pe("color","surface-container-low"),fe("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[K("button"),Zr,...yt,y(`
:host {
	box-sizing: border-box;
	border: 1px solid var(--cxl-color-outline-variant);
	border-radius: var(--cxl-shape-corner-small);
	${F("label-large")}
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
	${me("secondary-container")}
}
:host(:hover) { box-shadow: none; }
slot[name] { display: inline-block; }
		`),Ne,()=>I("slot",{name:"leading"}),_,()=>I("slot",{name:"trailing"})]});var pa=class extends x{};u(pa,{tagName:"c-body",augment:[y(`
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
		`),_]});var ar=class extends Wt{};u(ar,{tagName:"c-button-text",augment:[...yt,y(`
:host {
	${F("label-large")}
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
		`),Ne,_]});var qn=[y(`
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
	${F("title-large")}
}
:host([size=medium]) {
	height: 112px;
	padding: 20px 16px 24px 16px;
	${F("headline-small")}
	flex-wrap: wrap;
}
:host([size=medium]) slot[name=title],:host([size=large]) slot[name=title]  { width: 100%; display: block; margin-top:auto; }
:host([size=large]) {
	height: 152px; padding: 20px 16px 28px 16px;
	${F("headline-medium")}
	flex-wrap: wrap;
}`),_,()=>I("slot",{name:"title"})];function Zo(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var nr=class extends x{size;sticky=!1;contextual};u(nr,{tagName:"c-appbar",init:[C("size"),C("sticky"),C("contextual")],augment:[y(`
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
		`),...qn,()=>I("slot",{name:"contextual"}),e=>E(e,"sticky").switchMap(t=>t?lt(e,{threshold:[1]}).tap(r=>e.toggleAttribute("scroll",r.intersectionRatio<1)):O),e=>{let t;return w(ct(e),E(e,"contextual")).raf().switchMap(()=>{for(let r of e.children)if(Zo(r)&&(r.slot="contextual",r.open=r.name===e.contextual,r.open))return t=r,T(r,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,O})}]});function Wn(e,t,r){r==="in"&&(e.style.display="");let a=e.offsetWidth,n=he({target:e,animation:{kf:{[t]:r==="in"?[`-${a}px`,"0"]:["0",`-${a}px`]}}});r==="out"&&(n.onfinish=()=>e.style.display="none")}var sr=class extends x{sheetstart=!1;sheetend=!1};u(sr,{tagName:"c-application",init:[C("sheetstart"),C("sheetend")],augment:[y(`
:host {
	display: flex;
	position: absolute;
	inset: 0;
	${me("background")}
	overflow: hidden;
}
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
}
slot[name=end],slot[name=start] { display:block; flex-shrink: 0; }
${xt()}
	`),Zt,e=>Fe(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>Fe(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=I("slot",{name:"start"}),r=I("slot",{id:"body"}),a=I("slot",{name:"end"}),n=Ce("html { overflow: hidden }");return j(e).append(t,r,a),e.sheetstart||(t.style.display="none"),e.sheetend||(a.style.display="none"),Ae.popupContainer=e,w(J(i=>{let s=(e.ownerDocument??document).adoptedStyleSheets;s.push(n),i.signal.subscribe(()=>{let o=s.indexOf(n);o!==-1&&s.splice(o,1)})}),q(e,"sheetstart").tap(i=>Wn(t,"marginLeft",i?"in":"out")),q(e,"sheetend").tap(i=>Wn(a,"marginRight",i?"in":"out")))}]});var da=class extends nr{sticky=!0};u(da,{tagName:"doc-appbar",augment:[e=>{e.append(S(Gt,{id:"appbar-toolbar"},S(Qt,{target:"navbar"}),S(Ze,{grow:!0},CONFIG.packageName),S(tr,{persistkey:"3doc.theme"})))}]});var fa=class extends x{};u(fa,{tagName:"doc-card",augment:[y(`
:host{margin-top: 16px; display:block; elevation:1; }
${U("medium",":host{padding:16px}")}
		`),()=>S("slot")]});var ms=Is(fs(),1);var St=ms.default;function hs(e){let t=e.regex,r=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),a=/[\p{L}0-9._:-]+/u,n={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},s=e.inherit(i,{begin:/\(/,end:/\)/}),o=e.inherit(e.APOS_STRING_MODE,{className:"string"}),c=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),f={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:a,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,c,o,s,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,s,c,o]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},n,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[c]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[f],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[f],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(r,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:r,relevance:0,starts:f}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(r,/>/))),contains:[{className:"name",begin:r,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}St.registerLanguage("html",hs);var Ea=class extends x{formatter=t=>'<link rel="stylesheet" href="hljs.css" /><code style="white-space:pre;min-height:100%;font:var(--cxl-font-code);tab-size:2;">'+St.highlight(t,{language:"html"}).value+"</code>"};u(Ea,{tagName:"doc-hl",augment:[y(`
:host { display: block; }
.hljs { white-space: pre-wrap; font: var(--cxl-font-code); padding:16px; }
	`),e=>{let t=S("div",{className:"hljs"});return t.style.tabSize="4",j(e).append(t),Se().switchMap(()=>ut(e).raf(()=>{let r=e.childNodes[0]?.textContent?.trim()||"";r&&e.formatter&&(r=e.formatter(r)),t.innerHTML=r}))}]});var Sa=class extends x{};u(Sa,{tagName:"doc-grd",augment:[y(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${U("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${U("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${U("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),_]});var kt=class extends x{summary;selected};u(kt,{tagName:"doc-nav-list",init:[ce("summary"),ce("selected")],augment:[e=>ia({source:E(e,"summary").map(t=>t?.index),render:t=>S(Ke,{$:r=>Z(r).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?S(rr,{size:-2},"beta"):void 0)})(e)]});var Ct=class extends x{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;formatter;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};u(Ct,{tagName:"doc-demo-bare",init:[b("view"),b("libraries"),b("header")],augment:[y(`
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
	`),e=>{let t=E(e,"view"),r=pe("container"),a=S(er,{className:r}),n=S(ft,{$:k=>Ee(k).tap(()=>{e.formatter?k.innerHTML=e.formatter(c):k.innerText=c}),className:t.map(k=>k==="source"?"source visible hljs":"source")}),i=S(ar,{$:k=>Z(k).tap(()=>e.view="source"),className:E(e,"view").map(k=>k==="source"?"hide":""),title:"See source"},S(ze,{name:"code"}),"Code"),s=S(be,{$:k=>Z(k).tap(()=>e.view="mobile"),height:20,className:E(e,"view").map(k=>k==="source"?"":"hide"),icon:"close",title:"Close source"}),o=S("div",{id:"toolbar"},S("slot",{name:"toolbar"}),S(be,{$:k=>Z(k).tap(async()=>{await navigator.clipboard.writeText(c),k.icon="done",setTimeout(()=>k.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(k=>k==="source"?"icon":"icon hide")}),i,s),c;function f(k){let te=k==="desktop";r.next(te?"container":"container cmobile")}function $(){let k=e.childNodes[0]?.textContent?.trim()||"";if(!k)return;let te=e.libraries?e.libraries.split(",").map(P=>`<script type="module" src="${e.getLibraryUrl(P)}"><\/script>`).join(""):"";a.srcdoc=`${e.header}${te}${k}`,c=k}return j(e).append(o,S(ft,{className:t.map(k=>k==="source"?"parent":`parent visible ${k}`)},a),n),w(E(e,"view").tap(f),Ee(e).switchMap(()=>ut(e).raf($)))}]});var At=class extends Ct{header=`<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>${CONFIG.demoStyles?`<style>${CONFIG.demoStyles}</style>`:""}${CONFIG.demoScripts?.map(t=>`<script type="module" src="${t}"><\/script>`).join("")??""}`;formatter=t=>'<link rel="stylesheet" href="hljs.css" />'+St.highlight(t,{language:"html"}).value};u(At,{tagName:"doc-demo"});function gs(e){let t=e.index;function r(o){if(!(!o||typeof o=="string")&&typeof o=="number")return t.find(c=>c.id===o)}function a(o){if(!(!o||typeof o=="string")){if(typeof o=="number"){let c=t.find(f=>f.id===o);return c&&(c.kind===4||c.kind===8)?c:c?a(c.resolvedType??c.type):void 0}return o.kind===6?r(o.type):o.resolvedType&&typeof o.resolvedType!="string"?o.resolvedType:o}}function n(o,c){if(o.children){for(let f of o.children)!f.name||f.flags&&f.flags&128||(c[f.name]??=f);return c}}function i(o,c={}){n(o,c);let f=a(o.type);if(f?.children)for(let $ of f.children){let k=a($);if(!k||k.kind!==35||k.name==="Component")break;i(k,c)}return c}function s(o){return o.kind===17||o.kind===16||o.kind===11||o.kind===13}return{getNodeProperties:i,getTypeSummary:a,isFunction:s,getRef:r,json:e}}var Ui={31:"Constants",1:"Variables",4:"Interfaces",8:"Classes",10:"Properties",11:"Methods",12:"Getters",13:"Setters",14:"Constructor",16:"Functions",22:"Enums",35:"Components",36:"Attributes",2:"Type Alias",38:"Call Signature",39:"Construct Signature",44:"Events",24:"Index Signature",25:"Exports",37:"Namespaces"};function bs(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function Gi(e){return e.name?`docs/ui-${e.name}`:void 0}function Xi(e){let t=Gi(e),r=e.name??"?";return t?S("a",{href:t},r):r}function xs({summary:e,summaryJson:t,link:r=Xi,uiCdn:a,importmap:n,codeHighlight:i}){let{getTypeSummary:s,getRef:o,isFunction:c}=gs(t),f=t.index;function $(m){if(m)return typeof m=="string"?m:s(m)??(typeof m=="number"?void 0:m.name)}function k(m){return m?"&lt;"+m.map(h=>P(h)+(h.kind!==6&&h.type?` extends ${P(h.type)}`:"")).join(", ")+"&gt;":""}function te(m){return["{ ",...m.children?.map(Re).flatMap(at("; "))??[]," }"]}function P(m){let h=$(m);if(!h||typeof h=="string")return[h||"?"];switch(h.kind){case 5:return h.children?.map(P).flatMap(at(" | "))??[];case 23:case 32:return[h.name??"?"];case 34:return te(h)??["?"];case 15:return[...P(h.type),"[]"];case 4:case 8:case 35:{let l=h.typeP?k(h.typeP):void 0;return[r(h),l]}case 17:return Re(h);case 33:{let l=o(m);return[l?r(l):h.name??"?"]}case 21:return[...P(h.children?.[0]),"[",...P(h.children?.[1]),"]"];default:console.log(h)}return[]}function Te(m){let h=m.flags??0;return[`${`${h&4?"public ":h&8?"private":h&16?"protected ":""}${h&262144?"...":""}${m.name}${h&524288?"?":""}`}: `,...P(m.type)]}function xe(m){return["(",...m?.map(Te).flatMap(at(", "))??[],")"]}function ye(m){let h=m.flags??0,l=m.kind===12?"get ":m.kind===13?"set ":void 0;return[h&32?"static ":"",h&64?"readonly ":"",h&128?"abstract ":"",l]}function rt(m){return["[",...m.parameters?.flatMap(Re)??[]??[],"]: ",...m.type?P(m.type)??[]:["?"]]}function at(m){return(h,l)=>l!==0?[...m,...h]:h}function Re(m){if(m.kind===24)return rt(m);if(m.kind===45&&m.children?.[0])return["...",...P(m.children[0])];let h=m.flags&&m.flags&524288,l=c(m)?xe(m.parameters):[],p=m.kind===17;return[...ye(m),m.name,h?"?":"",...l,p?" => ":": ",...P(m.resolvedType??m.type)]}function Ue(m){return[S("h3",{},S(ge,{font:"title-large"},...Re(m))),...nt(m)]}function Mt(m,h){if(!m.children)return[];let l={};for(let p of m.children)p.kind!==14&&p.kind!==0&&(p.flags||0)&4&&!h?.(p)&&(l[p.kind]??={name:Ui[p.kind],nodes:[]}).nodes.push(p);return Object.values(l).sort(Wr("name")).flatMap(p=>[S("h2",{},p.name),...p.nodes.flatMap(Ue)])}function ur(m){let h;m=m.replace(/<caption>(.+?)<\/caption>/,(N,L)=>(h=L,""));let l=`<style>body{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:0 24px 24px 24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,p=(n??"")+`<script type="module" src="${a}"><\/script>`,g=S(At,{header:l+p,formatter:i},m);return[h?S(ge,{font:"title-medium"},h):void 0,g]}function pr(m){return f.find(h=>h.name===m)}function ae(m){let h=m.flatMap(l=>{let p=l.value,g=bs(p);if(typeof p=="string"){let N=pr(p);g=N?r(N):p}return[g,", "]});return h.pop(),S("p",{},"Related: ",h)}function $t({src:m}){let h=S("div");return h.textContent=m,h}function nt(m){let h=m.docs;if(!h||!h.content)return[];let l=[],p=h.content.flatMap(g=>{let N=bs(g.value);return g.tag==="icon"||g.tag==="title"?[]:g.tag==="example"||g.tag==="demo"||g.tag==="demoonly"?ur(N):g.tag==="see"?(l.push(g),[]):g.tag==="return"?[S(ge,{font:"headline-small"},"Returns"),S("p",void 0,N)]:g.tag==="param"?[S("p",void 0,N)]:[g.tag?S("p",void 0,`${g.tag}: `,N):$t({src:N})]});return l.length&&p.push(ae(l)),p}function dr(m){let h=[],l=s(m);if(!(!l||l.kind!==33))return l.children?.forEach(p=>{if(typeof p!="object")return;let g=s(p);g&&g.name!=="Component"&&h.push(r(g))}),S(ge,{font:"headline-small"}," ",...h.length?["extends ",h]:[])}function Tt(m){let h=s(m.type),l=[];if(!h?.children)return[];for(let p of h.children){let g=s(p);if(!g||g.kind!==35||g.name==="Component")break;let N=Mt(g,L=>!!((L.flags??0)&128));N.length&&l.push(S("br"),S(ge,{font:"h6"},"Inherited from ",r(g)),...N),l.push(...Tt(g))}return l}let Rt=e.kind===35&&e.docs?.tagName;return S("div",{},S("h1",{},e.name," ",e.type&&dr(e.type)," ",Rt?S(ge,{font:"title-medium"},`<${Rt}>`):""),...nt(e),...Mt(e),...Tt(e))}var Nt=class extends x{name;summary;uicdn;importmap=""};u(Nt,{tagName:"doc-page",init:[ce("name"),ce("summary"),ce("uicdn")],augment:[e=>de(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,r=e.summary.index.find(a=>a.name===t);r&&e.append(xs({summary:r,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});var ka=class extends sr{summary;sheetstart=!0};u(ka,{tagName:"doc-root",augment:[e=>{let t=Xe();fetch("summary.json").then(a=>a.json()).then(a=>t.next(a));let r=S(kt,{slot:"start",summary:t});e.append(r,S(Nt,{summary:t,name:E(r,"selected")}))}]});var Ca=class extends Yt{};u(Ca,{tagName:"doc-item"});export{Ea as BlogCode,pa as Body,ka as ComponentList,da as DocAppbar,fa as DocCard,Sa as DocGrid,Ca as DocItem,ua as Drawer,ze as Icon,kt as NavList,Nt as Page,ra as UiPage};
