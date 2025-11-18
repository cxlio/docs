var Ta=Object.create;var dr=Object.defineProperty;var Ra=Object.getOwnPropertyDescriptor;var _a=Object.getOwnPropertyNames;var Da=Object.getPrototypeOf,Ia=Object.prototype.hasOwnProperty;var Oa=(e,t)=>()=>(e&&(t=e(e=0)),t);var La=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Fa=(e,t)=>{for(var n in t)dr(e,n,{get:t[n],enumerable:!0})},Pa=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of _a(t))!Ia.call(e,o)&&o!==n&&dr(e,o,{get:()=>t[o],enumerable:!(r=Ra(t,o))||r.enumerable});return e};var Ba=(e,t,n)=>(n=e!=null?Ta(Da(e)):{},Pa(t||!e||!e.__esModule?dr(n,"default",{value:e,enumerable:!0}):n,e));var Yo={};Fa(Yo,{default:()=>bs,theme:()=>Go});var xs,Go,bs,Wo=Oa(()=>{"use strict";xs={primary:"#8ECFF2","on-primary":"#003548","primary-container":"#004D67","on-primary-container":"#C1E8FF",secondary:"#B5C9D7","on-secondary":"#1F333D","secondary-container":"#364954","on-secondary-container":"#D1E6F3",tertiary:"#C9C2EA","on-tertiary":"#312C4C","tertiary-container":"#474364","on-tertiary-container":"#E5DEFF",error:"#FFB4AB","on-error":"#690005","error-container":"#93000A","on-error-container":"#FFDAD6",background:"#0F1417","on-background":"#DFE3E7",surface:"#0F1417","on-surface":"#DFE3E7","surface-variant":"#40484D","on-surface-variant":"#C0C7CD",outline:"#8A9297","outline-variant":"#40484D",shadow:"#000000",scrim:"#000000","inverse-surface":"#DFE3E7","on-inverse-surface":"#2C3134","inverse-primary":"#186584","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#0F1417","surface-bright":"#353A3D","surface-container-lowest":"#0A0F12","surface-container-low":"#171C1F","surface-container":"#1B2023","surface-container-high":"#262B2E","surface-container-highest":"#313539",warning:"#FFC107","on-warning":"#212121","warning-container":"#4E3400","on-warning-container":"#FFF3CF",success:"#81C784","on-success":"#000","success-container":"#2E7D32","on-success-container":"#fff"},Go={name:"dark",colors:xs},bs=Go});var ga=La((uh,ma)=>{"use strict";function na(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let n=e[t],r=typeof n;(r==="object"||r==="function")&&!Object.isFrozen(n)&&na(n)}),e}var or=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function ra(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function He(e,...t){let n=Object.create(null);for(let r in e)n[r]=e[r];return t.forEach(function(r){for(let o in r)n[o]=r[o]}),n}var rl="</span>",Ji=e=>!!e.scope,ol=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,o)=>`${r}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`},uo=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=ra(t)}openNode(t){if(!Ji(t))return;let n=ol(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Ji(t)&&(this.buffer+=rl)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Zi=(e={})=>{let t={children:[]};return Object.assign(t,e),t},po=class e{constructor(){this.rootNode=Zi(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=Zi({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{e._collapse(n)}))}},fo=class extends po{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){let r=t.root;n&&(r.scope=`language:${n}`),this.add(r)}toHTML(){return new uo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function an(e){return e?typeof e=="string"?e:e.source:null}function oa(e){return ot("(?=",e,")")}function il(e){return ot("(?:",e,")*")}function al(e){return ot("(?:",e,")?")}function ot(...e){return e.map(n=>an(n)).join("")}function sl(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function go(...e){return"("+(sl(e).capture?"":"?:")+e.map(r=>an(r)).join("|")+")"}function ia(e){return new RegExp(e.toString()+"|").exec("").length-1}function cl(e,t){let n=e&&e.exec(t);return n&&n.index===0}var ll=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ho(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;let o=n,s=an(r),i="";for(;s.length>0;){let c=ll.exec(s);if(!c){i+=s;break}i+=s.substring(0,c.index),s=s.substring(c.index+c[0].length),c[0][0]==="\\"&&c[1]?i+="\\"+String(Number(c[1])+o):(i+=c[0],c[0]==="("&&n++)}return i}).map(r=>`(${r})`).join(t)}var ul=/\b\B/,aa="[a-zA-Z]\\w*",xo="[a-zA-Z_]\\w*",sa="\\b\\d+(\\.\\d+)?",ca="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",la="\\b(0b[01]+)",pl="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",fl=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=ot(t,/.*\b/,e.binary,/\b.*/)),He({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},sn={begin:"\\\\[\\s\\S]",relevance:0},dl={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[sn]},ml={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[sn]},gl={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ar=function(e,t,n={}){let r=He({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let o=go("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:ot(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},hl=ar("//","$"),xl=ar("/\\*","\\*/"),bl=ar("#","$"),yl={scope:"number",begin:sa,relevance:0},vl={scope:"number",begin:ca,relevance:0},wl={scope:"number",begin:la,relevance:0},El={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[sn,{begin:/\[/,end:/\]/,relevance:0,contains:[sn]}]},Sl={scope:"title",begin:aa,relevance:0},Cl={scope:"title",begin:xo,relevance:0},kl={begin:"\\.\\s*"+xo,relevance:0},Al=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},rr=Object.freeze({__proto__:null,APOS_STRING_MODE:dl,BACKSLASH_ESCAPE:sn,BINARY_NUMBER_MODE:wl,BINARY_NUMBER_RE:la,COMMENT:ar,C_BLOCK_COMMENT_MODE:xl,C_LINE_COMMENT_MODE:hl,C_NUMBER_MODE:vl,C_NUMBER_RE:ca,END_SAME_AS_BEGIN:Al,HASH_COMMENT_MODE:bl,IDENT_RE:aa,MATCH_NOTHING_RE:ul,METHOD_GUARD:kl,NUMBER_MODE:yl,NUMBER_RE:sa,PHRASAL_WORDS_MODE:gl,QUOTE_STRING_MODE:ml,REGEXP_MODE:El,RE_STARTERS_RE:pl,SHEBANG:fl,TITLE_MODE:Sl,UNDERSCORE_IDENT_RE:xo,UNDERSCORE_TITLE_MODE:Cl});function Ml(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Nl(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Tl(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Ml,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Rl(e,t){Array.isArray(e.illegal)&&(e.illegal=go(...e.illegal))}function _l(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Dl(e,t){e.relevance===void 0&&(e.relevance=1)}var Il=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=ot(n.beforeMatch,oa(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ol=["of","and","for","in","not","or","if","then","parent","list","value"],Ll="keyword";function ua(e,t,n=Ll){let r=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(s){Object.assign(r,ua(e[s],t,s))}),r;function o(s,i){t&&(i=i.map(c=>c.toLowerCase())),i.forEach(function(c){let a=c.split("|");r[a[0]]=[s,Fl(a[0],a[1])]})}}function Fl(e,t){return t?Number(t):Pl(e)?0:1}function Pl(e){return Ol.includes(e.toLowerCase())}var Qi={},rt=e=>{console.error(e)},Ki=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Et=(e,t)=>{Qi[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Qi[`${e}/${t}`]=!0)},ir=new Error;function pa(e,t,{key:n}){let r=0,o=e[n],s={},i={};for(let c=1;c<=t.length;c++)i[c+r]=o[c],s[c+r]=!0,r+=ia(t[c-1]);e[n]=i,e[n]._emit=s,e[n]._multi=!0}function Bl(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw rt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ir;if(typeof e.beginScope!="object"||e.beginScope===null)throw rt("beginScope must be object"),ir;pa(e,e.begin,{key:"beginScope"}),e.begin=ho(e.begin,{joinWith:""})}}function zl(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw rt("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ir;if(typeof e.endScope!="object"||e.endScope===null)throw rt("endScope must be object"),ir;pa(e,e.end,{key:"endScope"}),e.end=ho(e.end,{joinWith:""})}}function Hl(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function $l(e){Hl(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Bl(e),zl(e)}function jl(e){function t(i,c){return new RegExp(an(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(c?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(c,a){a.position=this.position++,this.matchIndexes[this.matchAt]=a,this.regexes.push([a,c]),this.matchAt+=ia(c)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let c=this.regexes.map(a=>a[1]);this.matcherRe=t(ho(c,{joinWith:"|"}),!0),this.lastIndex=0}exec(c){this.matcherRe.lastIndex=this.lastIndex;let a=this.matcherRe.exec(c);if(!a)return null;let l=a.findIndex((m,P)=>P>0&&m!==void 0),S=this.matchIndexes[l];return a.splice(0,l),Object.assign(a,S)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(c){if(this.multiRegexes[c])return this.multiRegexes[c];let a=new n;return this.rules.slice(c).forEach(([l,S])=>a.addRule(l,S)),a.compile(),this.multiRegexes[c]=a,a}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(c,a){this.rules.push([c,a]),a.type==="begin"&&this.count++}exec(c){let a=this.getMatcher(this.regexIndex);a.lastIndex=this.lastIndex;let l=a.exec(c);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let S=this.getMatcher(0);S.lastIndex=this.lastIndex+1,l=S.exec(c)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function o(i){let c=new r;return i.contains.forEach(a=>c.addRule(a.begin,{rule:a,type:"begin"})),i.terminatorEnd&&c.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&c.addRule(i.illegal,{type:"illegal"}),c}function s(i,c){let a=i;if(i.isCompiled)return a;[Nl,_l,$l,Il].forEach(S=>S(i,c)),e.compilerExtensions.forEach(S=>S(i,c)),i.__beforeBegin=null,[Tl,Rl,Dl].forEach(S=>S(i,c)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=ua(i.keywords,e.case_insensitive)),a.keywordPatternRe=t(l,!0),c&&(i.begin||(i.begin=/\B|\b/),a.beginRe=t(a.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(a.endRe=t(a.end)),a.terminatorEnd=an(a.end)||"",i.endsWithParent&&c.terminatorEnd&&(a.terminatorEnd+=(i.end?"|":"")+c.terminatorEnd)),i.illegal&&(a.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(S){return Vl(S==="self"?i:S)})),i.contains.forEach(function(S){s(S,a)}),i.starts&&s(i.starts,c),a.matcher=o(a),a}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=He(e.classNameAliases||{}),s(e)}function fa(e){return e?e.endsWithParent||fa(e.starts):!1}function Vl(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return He(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:fa(e)?He(e,{starts:e.starts?He(e.starts):null}):Object.isFrozen(e)?He(e):e}var Ul="11.11.1",mo=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},lo=ra,ea=He,ta=Symbol("nomatch"),Gl=7,da=function(e){let t=Object.create(null),n=Object.create(null),r=[],o=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},c={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:fo};function a(p){return c.noHighlightRe.test(p)}function l(p){let x=p.className+" ";x+=p.parentNode?p.parentNode.className:"";let A=c.languageDetectRe.exec(x);if(A){let O=de(A[1]);return O||(Ki(s.replace("{}",A[1])),Ki("Falling back to no-highlight mode for this block.",p)),O?A[1]:"no-highlight"}return x.split(/\s+/).find(O=>a(O)||de(O))}function S(p,x,A){let O="",G="";typeof x=="object"?(O=p,A=x.ignoreIllegals,G=x.language):(Et("10.7.0","highlight(lang, code, ...args) has been deprecated."),Et("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),G=p,O=x),A===void 0&&(A=!0);let fe={code:O,language:G};w("before:highlight",fe);let De=fe.result?fe.result:m(fe.language,fe.code,A);return De.code=fe.code,w("after:highlight",De),De}function m(p,x,A,O){let G=Object.create(null);function fe(v,M){return v.keywords[M]}function De(){if(!I.keywords){Z.addText(j);return}let v=0;I.keywordPatternRe.lastIndex=0;let M=I.keywordPatternRe.exec(j),L="";for(;M;){L+=j.substring(v,M.index);let H=ge.case_insensitive?M[0].toLowerCase():M[0],ne=fe(I,H);if(ne){let[Ce,Ma]=ne;if(Z.addText(L),L="",G[H]=(G[H]||0)+1,G[H]<=Gl&&(yn+=Ma),Ce.startsWith("_"))L+=M[0];else{let Na=ge.classNameAliases[Ce]||Ce;me(M[0],Na)}}else L+=M[0];v=I.keywordPatternRe.lastIndex,M=I.keywordPatternRe.exec(j)}L+=j.substring(v),Z.addText(L)}function xn(){if(j==="")return;let v=null;if(typeof I.subLanguage=="string"){if(!t[I.subLanguage]){Z.addText(j);return}v=m(I.subLanguage,j,!0,Mo[I.subLanguage]),Mo[I.subLanguage]=v._top}else v=R(j,I.subLanguage.length?I.subLanguage:null);I.relevance>0&&(yn+=v.relevance),Z.__addSublanguage(v._emitter,v.language)}function se(){I.subLanguage!=null?xn():De(),j=""}function me(v,M){v!==""&&(Z.startScope(M),Z.addText(v),Z.endScope())}function So(v,M){let L=1,H=M.length-1;for(;L<=H;){if(!v._emit[L]){L++;continue}let ne=ge.classNameAliases[v[L]]||v[L],Ce=M[L];ne?me(Ce,ne):(j=Ce,De(),j=""),L++}}function Co(v,M){return v.scope&&typeof v.scope=="string"&&Z.openNode(ge.classNameAliases[v.scope]||v.scope),v.beginScope&&(v.beginScope._wrap?(me(j,ge.classNameAliases[v.beginScope._wrap]||v.beginScope._wrap),j=""):v.beginScope._multi&&(So(v.beginScope,M),j="")),I=Object.create(v,{parent:{value:I}}),I}function ko(v,M,L){let H=cl(v.endRe,L);if(H){if(v["on:end"]){let ne=new or(v);v["on:end"](M,ne),ne.isMatchIgnored&&(H=!1)}if(H){for(;v.endsParent&&v.parent;)v=v.parent;return v}}if(v.endsWithParent)return ko(v.parent,M,L)}function Ea(v){return I.matcher.regexIndex===0?(j+=v[0],1):(fr=!0,0)}function Sa(v){let M=v[0],L=v.rule,H=new or(L),ne=[L.__beforeBegin,L["on:begin"]];for(let Ce of ne)if(Ce&&(Ce(v,H),H.isMatchIgnored))return Ea(M);return L.skip?j+=M:(L.excludeBegin&&(j+=M),se(),!L.returnBegin&&!L.excludeBegin&&(j=M)),Co(L,v),L.returnBegin?0:M.length}function Ca(v){let M=v[0],L=x.substring(v.index),H=ko(I,v,L);if(!H)return ta;let ne=I;I.endScope&&I.endScope._wrap?(se(),me(M,I.endScope._wrap)):I.endScope&&I.endScope._multi?(se(),So(I.endScope,v)):ne.skip?j+=M:(ne.returnEnd||ne.excludeEnd||(j+=M),se(),ne.excludeEnd&&(j=M));do I.scope&&Z.closeNode(),!I.skip&&!I.subLanguage&&(yn+=I.relevance),I=I.parent;while(I!==H.parent);return H.starts&&Co(H.starts,v),ne.returnEnd?0:M.length}function ka(){let v=[];for(let M=I;M!==ge;M=M.parent)M.scope&&v.unshift(M.scope);v.forEach(M=>Z.openNode(M))}let bn={};function Ao(v,M){let L=M&&M[0];if(j+=v,L==null)return se(),0;if(bn.type==="begin"&&M.type==="end"&&bn.index===M.index&&L===""){if(j+=x.slice(M.index,M.index+1),!o){let H=new Error(`0 width match regex (${p})`);throw H.languageName=p,H.badRule=bn.rule,H}return 1}if(bn=M,M.type==="begin")return Sa(M);if(M.type==="illegal"&&!A){let H=new Error('Illegal lexeme "'+L+'" for mode "'+(I.scope||"<unnamed>")+'"');throw H.mode=I,H}else if(M.type==="end"){let H=Ca(M);if(H!==ta)return H}if(M.type==="illegal"&&L==="")return j+=`
`,1;if(pr>1e5&&pr>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return j+=L,L.length}let ge=de(p);if(!ge)throw rt(s.replace("{}",p)),new Error('Unknown language: "'+p+'"');let Aa=jl(ge),ur="",I=O||Aa,Mo={},Z=new c.__emitter(c);ka();let j="",yn=0,je=0,pr=0,fr=!1;try{if(ge.__emitTokens)ge.__emitTokens(x,Z);else{for(I.matcher.considerAll();;){pr++,fr?fr=!1:I.matcher.considerAll(),I.matcher.lastIndex=je;let v=I.matcher.exec(x);if(!v)break;let M=x.substring(je,v.index),L=Ao(M,v);je=v.index+L}Ao(x.substring(je))}return Z.finalize(),ur=Z.toHTML(),{language:p,value:ur,relevance:yn,illegal:!1,_emitter:Z,_top:I}}catch(v){if(v.message&&v.message.includes("Illegal"))return{language:p,value:lo(x),illegal:!0,relevance:0,_illegalBy:{message:v.message,index:je,context:x.slice(je-100,je+100),mode:v.mode,resultSoFar:ur},_emitter:Z};if(o)return{language:p,value:lo(x),illegal:!1,relevance:0,errorRaised:v,_emitter:Z,_top:I};throw v}}function P(p){let x={value:lo(p),illegal:!1,relevance:0,_top:i,_emitter:new c.__emitter(c)};return x._emitter.addText(p),x}function R(p,x){x=x||c.languages||Object.keys(t);let A=P(p),O=x.filter(de).filter(kt).map(se=>m(se,p,!1));O.unshift(A);let G=O.sort((se,me)=>{if(se.relevance!==me.relevance)return me.relevance-se.relevance;if(se.language&&me.language){if(de(se.language).supersetOf===me.language)return 1;if(de(me.language).supersetOf===se.language)return-1}return 0}),[fe,De]=G,xn=fe;return xn.secondBest=De,xn}function $(p,x,A){let O=x&&n[x]||A;p.classList.add("hljs"),p.classList.add(`language-${O}`)}function W(p){let x=null,A=l(p);if(a(A))return;if(w("before:highlightElement",{el:p,language:A}),p.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",p);return}if(p.children.length>0&&(c.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),c.throwUnescapedHTML))throw new mo("One of your code blocks includes unescaped HTML.",p.innerHTML);x=p;let O=x.textContent,G=A?S(O,{language:A,ignoreIllegals:!0}):R(O);p.innerHTML=G.value,p.dataset.highlighted="yes",$(p,A,G.language),p.result={language:G.language,re:G.relevance,relevance:G.relevance},G.secondBest&&(p.secondBest={language:G.secondBest.language,relevance:G.secondBest.relevance}),w("after:highlightElement",{el:p,result:G,text:O})}function ae(p){c=ea(c,p)}let te=()=>{it(),Et("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function Ct(){it(),Et("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let $e=!1;function it(){function p(){it()}if(document.readyState==="loading"){$e||window.addEventListener("DOMContentLoaded",p,!1),$e=!0;return}document.querySelectorAll(c.cssSelector).forEach(W)}function dn(p,x){let A=null;try{A=x(e)}catch(O){if(rt("Language definition for '{}' could not be registered.".replace("{}",p)),o)rt(O);else throw O;A=i}A.name||(A.name=p),t[p]=A,A.rawDefinition=x.bind(null,e),A.aliases&&mn(A.aliases,{languageName:p})}function sr(p){delete t[p];for(let x of Object.keys(n))n[x]===p&&delete n[x]}function cr(){return Object.keys(t)}function de(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function mn(p,{languageName:x}){typeof p=="string"&&(p=[p]),p.forEach(A=>{n[A.toLowerCase()]=x})}function kt(p){let x=de(p);return x&&!x.disableAutodetect}function lr(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=x=>{p["before:highlightBlock"](Object.assign({block:x.el},x))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=x=>{p["after:highlightBlock"](Object.assign({block:x.el},x))})}function gn(p){lr(p),r.push(p)}function hn(p){let x=r.indexOf(p);x!==-1&&r.splice(x,1)}function w(p,x){let A=p;r.forEach(function(O){O[A]&&O[A](x)})}function k(p){return Et("10.7.0","highlightBlock will be removed entirely in v12.0"),Et("10.7.0","Please use highlightElement now."),W(p)}Object.assign(e,{highlight:S,highlightAuto:R,highlightAll:it,highlightElement:W,highlightBlock:k,configure:ae,initHighlighting:te,initHighlightingOnLoad:Ct,registerLanguage:dn,unregisterLanguage:sr,listLanguages:cr,getLanguage:de,registerAliases:mn,autoDetection:kt,inherit:ea,addPlugin:gn,removePlugin:hn}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=Ul,e.regex={concat:ot,lookahead:oa,either:go,optional:al,anyNumberOfTimes:il};for(let p in rr)typeof rr[p]=="object"&&na(rr[p]);return Object.assign(e,rr),e},St=da({});St.newInstance=()=>da({});ma.exports=St;St.HighlightJS=St;St.default=St});var Ve={},Zl=Symbol("terminator");function za(e,t){let n=!1,r={error:o,unsubscribe:s,get closed(){return n},signal:new Ie,next(i){if(!n)try{e.next?.(i)}catch(c){o(c)}},complete(){if(!n)try{e.complete?.()}finally{s()}}};e.signal?.subscribe(s);function o(i){if(n)throw i;if(!e.error)throw s(),i;try{e.error(i)}finally{s()}}function s(){n||(n=!0,r.signal.next())}try{if(t?.(r))throw new Error("Unsubscribe function result is deprectaed")}catch(i){o(i)}return r}var _=class{__subscribe;constructor(t){this.__subscribe=t}then(t,n){return ja(this).then(t,n)}pipe(...t){return t.reduce((n,r)=>r(n),this)}subscribe(t){return za(!t||typeof t=="function"?{next:t}:t,this.__subscribe)}},Ue=class extends _{closed=!1;signal=new Ie;observers=new Set;constructor(){super(t=>this.onSubscribe(t))}next(t){if(!this.closed)for(let n of Array.from(this.observers))n.closed||n.next(t)}error(t){if(!this.closed){this.closed=!0;let n=!1,r;for(let o of Array.from(this.observers))try{o.error(t)}catch(s){n=!0,r=s}if(n)throw r}}complete(){this.closed||(this.closed=!0,Array.from(this.observers).forEach(t=>t.complete()),this.observers.clear())}onSubscribe(t){this.closed?t.complete():(this.observers.add(t),t.signal.subscribe(()=>this.observers.delete(t)))}},Ie=class extends _{closed=!1;observers=new Set;constructor(){super(t=>{this.closed?(t.next(),t.complete()):this.observers.add(t)})}next(){if(!this.closed){this.closed=!0;for(let t of Array.from(this.observers))t.closed||(t.next(),t.complete());this.observers.clear()}}},vn=class extends Ue{queue=[];emitting=!1;next(t){if(!this.closed)if(this.emitting)this.queue.push(t);else{for(this.emitting=!0,super.next(t);this.queue.length;)super.next(this.queue.shift());this.emitting=!1}}},At=class extends Ue{currentValue;constructor(t){super(),this.currentValue=t}get value(){return this.currentValue}next(t){this.currentValue=t,super.next(t)}onSubscribe(t){let n=super.onSubscribe(t);return this.closed||t.next(this.currentValue),n}},mr=class extends Ue{bufferSize;buffer=[];hasError=!1;lastError;constructor(t=1/0){super(),this.bufferSize=t}error(t){this.hasError=!0,this.lastError=t,super.error(t)}next(t){return this.buffer.length===this.bufferSize&&this.buffer.shift(),this.buffer.push(t),super.next(t)}onSubscribe(t){this.observers.add(t),this.buffer.forEach(n=>t.next(n)),this.hasError?t.error(this.lastError):this.closed&&t.complete(),t.signal.subscribe(()=>this.observers.delete(t))}},at=class extends Ue{$value=Ve;get hasValue(){return this.$value!==Ve}get value(){if(this.$value===Ve)throw new Error("Reference not initialized");return this.$value}next(t){return this.$value=t,super.next(t)}onSubscribe(t){!this.closed&&this.$value!==Ve&&t.next(this.$value),super.onSubscribe(t)}},gr=class extends Error{message="No elements in sequence"};function ke(...e){return new _(t=>{let n=0,r;function o(){let s=e[n++];s&&!t.closed?(r?.next(),s.subscribe({next:t.next,error:t.error,complete:o,signal:r=new Ie})):t.complete()}t.signal.subscribe(()=>r?.next()),o()})}function Q(e){return new _(t=>{e().subscribe(t)})}function To(e){return new _(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function Ro(e){return new _(t=>{e.then(n=>{t.closed||t.next(n),t.complete()}).catch(n=>t.error(n))})}function wn(e){return Q(()=>Ro(e()))}function Ha(e){return new _(t=>{for(let n of e)t.closed||t.next(n);t.complete()})}function En(e){return e instanceof _?e:Array.isArray(e)?To(e):e instanceof Promise?Ro(e):Ha(e)}function F(...e){return To(e)}function $a(e){return new Promise((t,n)=>{let r=Ve;e.subscribe({next:o=>r=o,error:o=>n(o),complete:()=>t(r)})})}function ja(e){return $a(e).then(t=>t===Ve?void 0:t)}function st(e,t){return Ae(n=>({next:e(n),unsubscribe:t}))}function Ae(e){return t=>new _(n=>{let r=e(n,t);n.signal.subscribe(()=>r.unsubscribe?.()),r.error||(r.error=n.error),r.complete||(r.complete=n.complete),r.signal=n.signal,t.subscribe(r)})}function hr(e){return st(t=>n=>t.next(e(n)))}function Va(e,t){return Ae(n=>{let r=t,o=0;return{next(s){r=e(r,s,o++)},complete(){n.next(r),n.complete()}}})}function Ua(e){return Ae(t=>{let n=!0,r;return{next(o){n&&(n=!1,t.next(o),r=setTimeout(()=>n=!0,e))},unsubscribe:()=>clearTimeout(r)}})}function Ge(e){return new _(t=>{let n=setTimeout(()=>{t.next(),t.complete()},e);t.signal.subscribe(()=>clearTimeout(n))})}function Ga(e,t=Ge){return _o(n=>t(e).map(()=>n))}function _o(e){return t=>K(n=>{let r=!1,o=!1,s,i=()=>{s?.next(),r=!1,o&&n.complete()},c=new Ie;n.signal.subscribe(()=>{i(),c.next()}),t.subscribe({next(a){i(),s=new Ie,r=!0,e(a).subscribe({next:n.next,error:n.error,complete:i,signal:s})},error:n.error,complete(){o=!0,r||n.complete()},signal:c})})}function Ya(e){return t=>K(n=>{let r=n.signal,o=0,s=0,i=!1;t.subscribe({next:c=>{o++,e(c).subscribe({next:n.next,error:n.error,complete:()=>{s++,i&&s===o&&n.complete()},signal:r})},error:n.error,complete(){i=!0,s===o&&n.complete()},signal:r})})}function Wa(e){return Ae(t=>{let n=!0;return{next(r){n&&(n=!1,e(r).subscribe({next:t.next,error:t.error,complete:()=>n=!0,signal:t.signal}))}}})}function Sn(e){return st(t=>n=>{e(n)&&t.next(n)})}function qa(e){return st(t=>n=>{e-- >0&&!t.closed&&t.next(n),(e<=0||t.closed)&&t.complete()})}function Xa(e){return st(t=>n=>{!t.closed&&e(n)?t.next(n):t.complete()})}function Ja(){let e=!1;return Ae(t=>({next(n){e||(e=!0,t.next(n),t.complete())},complete(){t.closed||t.error(new gr)}}))}function Mt(e){return st(t=>n=>{e(n),t.next(n)})}function Za(e){return Ae((t,n)=>{let r,o={next:t.next,error(s){try{if(t.closed)return;let i=e(s,n);i&&(r?.next(),r=new Ie,i.subscribe({...o,signal:r}))}catch(i){t.error(i)}},unsubscribe:()=>r?.next()};return o})}function Qa(){return st(e=>{let t=Ve;return n=>{n!==t&&(t=n,e.next(n))}})}function Ka(){return e=>{let t=new mr(1),n=!1;return K(r=>{t.subscribe(r),n||(n=!0,e.subscribe(t))})}}function es(){return e=>{let t,n=0;function r(){--n===0&&t?.signal.next()}return K(o=>{o.signal.subscribe(r),n++===0?(t=Ye(),t.subscribe(o),e.subscribe(t)):t.subscribe(o)})}}function ts(){return e=>{let t=new Ue,n,r,o=!1,s=!1;return K(i=>{s?(i.next(r),i.complete()):t.subscribe(i),n??=e.subscribe({next:c=>{o=!0,r=c},error:i.error,complete(){s=!0,o&&t.next(r),t.complete()},signal:i.signal})})}}function f(...e){return e.length===1?e[0]:new _(t=>{let n=e.length;for(let r of e)t.closed||r.subscribe({next:t.next,error:t.error,complete(){n--===1&&t.complete()},signal:t.signal})})}function oe(...e){return e.length===0?T:new _(t=>{let n=e.length,r=n,o=0,s=!1,i=new Array(n),c=new Array(n);e.forEach((a,l)=>a.subscribe({next(S){c[l]=S,i[l]||(i[l]=!0,++o>=r&&(s=!0)),s&&t.next(c.slice(0))},error:t.error,complete(){--n<=0&&t.complete()},signal:t.signal}))})}function ns(e){return Ae(t=>({next:t.next,unsubscribe:e}))}function rs(){return Sn(()=>!1)}var T=new _(e=>e.complete());function ie(e){return new At(e)}function K(e){return new _(e)}function Ye(){return new at}var No={catchError:Za,debounceTime:Ga,distinctUntilChanged:Qa,exhaustMap:Wa,filter:Sn,finalize:ns,first:Ja,ignoreElements:rs,map:hr,mergeMap:Ya,publishLast:ts,reduce:Va,share:es,shareLatest:Ka,switchMap:_o,take:qa,takeWhile:Xa,tap:Mt,throttleTime:Ua};for(let e in No)_.prototype[e]=function(...t){return this.pipe(No[e](...t))};function E(e,t,n){return new _(r=>{let o=r.next.bind(r);e.addEventListener(t,o,n),r.signal.subscribe(()=>e.removeEventListener(t,o,n))})}function Cn(e){return xr(e,{childList:!0})}function kn(e,t){return xr(e,{attributes:!0,attributeFilter:t})}function xr(e,t={attributes:!0,childList:!0}){return new _(n=>{let r=new MutationObserver(o=>o.forEach(s=>{for(let i of s.addedNodes)n.next({type:"added",target:e,value:i});for(let i of s.removedNodes)n.next({type:"removed",target:e,value:i});s.type==="characterData"?n.next({type:"characterData",target:e}):s.attributeName&&n.next({type:"attribute",target:e,value:s.attributeName})}));r.observe(e,t),n.signal.subscribe(()=>r.disconnect())})}function An(e){return E(e,"keydown").filter(t=>t.key===" "||t.key==="Enter"?(t.preventDefault(),!0):!1)}function X(e){return E(e,"click")}function Mn(e,t){return new _(n=>{let r=new IntersectionObserver(o=>{for(let s of o)n.next(s)},t);r.observe(e),n.signal.subscribe(()=>r.disconnect())})}function Do(e){return Mn(e).map(t=>t.isIntersecting)}function Me(e){return Mn(e).filter(t=>t.isIntersecting).first()}function os(e){let t;return function(...n){t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{e.apply(this,n),t=0})}}function Io(e){return Ae(t=>{let n=os(o=>{t.closed||(e&&e(o),t.next(o),r&&t.complete())}),r=!1;return{next:n,complete:()=>r=!0}})}function Oo(){return Q(()=>document.readyState!=="loading"?F(!0):E(window,"DOMContentLoaded").first().map(()=>!0))}function Nn(e,t,n){let r=new CustomEvent(t,n);e.dispatchEvent(r)}function Tn(e,t){let n;return f(Q(()=>(n=e.childNodes,n?F(n):T)),xr(e,{childList:!0,...t}),Ne().switchMap(()=>e.childNodes!==n?(n=e.childNodes,F(n)):T))}function Ne(){return Q(()=>document.readyState==="complete"?F(!0):E(window,"load").first().map(()=>!0))}function Rn(...e){return new _(t=>{let n=new ResizeObserver(r=>r.forEach(o=>t.next(o)));for(let r of e)n.observe(r);t.signal.subscribe(()=>n.disconnect())})}function Nt(e){return e.offsetParent===null&&!(e.offsetWidth&&e.offsetHeight)}function br(e,t,n){return r=>ke(F(e?r.matches(e):!1),E(r,t).switchMap(()=>f(F(!0),E(r,n).map(()=>e?r.matches(e):!1))))}var eu=br("","animationstart","animationend"),yr=br("","mouseenter","mouseleave"),is=br(":focus,:focus-within","focusin","focusout"),vr=e=>oe(yr(e),is(e)).map(([t,n])=>t||n);function Lo(e,t,n){return t=t?.toLowerCase(),E(e,"keydown",n).filter(r=>!t||r.key?.toLowerCase()===t)}function Tt(e){return e instanceof PointerEvent&&e.pointerType===""||e instanceof MouseEvent&&e.type==="click"&&e.detail===0}function We(e){let t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:void 0}var as=Mt(e=>console.log(e));_.prototype.log=function(){return this.pipe(as)};_.prototype.raf=function(e){return this.pipe(Io(e))};var ee=Symbol("bindings"),ss={},ct=Symbol("augments"),qe=Symbol("parser"),Er=class{bindings;messageHandlers;internals;attributes$=new vn;wasConnected=!1;wasInitialized=!1;subscriptions;prebind;addMessageHandler(t){(this.messageHandlers??=new Set).add(t)}removeMessageHandler(t){this.messageHandlers?.delete(t)}message(t,n){let r=!1;if(this.messageHandlers)for(let o of this.messageHandlers)o.type===t&&(o.next(n),r||=o.stopPropagation);return r}add(t){if(this.wasConnected)throw new Error("Cannot bind connected component.");this.wasInitialized?(this.bindings??=[]).push(t):(this.prebind??=[]).push(t)}connect(){if(this.wasConnected=!0,!this.subscriptions&&(this.prebind||this.bindings)){let t=this.subscriptions=[];if(this.bindings)for(let n of this.bindings)t.push(n.subscribe());if(this.prebind)for(let n of this.prebind)t.push(n.subscribe())}}disconnect(){this.subscriptions?.forEach(t=>t.unsubscribe()),this.subscriptions=void 0}},Dn=Symbol("css"),h=class extends HTMLElement{static observedAttributes;static[ct];static[qe];[ee]=new Er;[Dn];connectedCallback(){this[ee].wasInitialized=!0,this[ee].wasConnected||this.constructor[ct]?.forEach(t=>t(this)),this[ee].connect()}disconnectedCallback(){this[ee].disconnect()}attributeChangedCallback(t,n,r){let o=this.constructor[qe]?.[t]??cs;n!==r&&(this[t]=o(r,this[t]))}};function cs(e,t){let n=t===!1||t===!0;return e===""?n?!0:"":e===null?n?!1:void 0:e}function Fo(e,t){e.hasOwnProperty(ct)||(e[ct]=e[ct]?.slice(0)??[]),e[ct]?.push(t)}var ls={mode:"open"};function z(e){return e.shadowRoot??e.attachShadow(ls)}function Po(e,t){t instanceof Node?z(e).appendChild(t):e[ee].add(t)}function us(e,t){t.length&&Fo(e,n=>{for(let r of t){let o=r.call(e,n);o&&o!==n&&Po(n,o)}})}function ps(e,t){ss[e]=t,customElements.define(e,t)}function he(e){return e[ee].internals??=e.attachInternals()}function u(e,{init:t,augment:n,tagName:r}){if(t)for(let o of t)o(e);n&&us(e,n),r&&ps(r,e)}function Oe(e){return ke(F(e),e[ee].attributes$.map(()=>e))}function Y(e,t){return e[ee].attributes$.pipe(Sn(n=>n.attribute===t),hr(()=>e[t]))}function g(e,t){return f(Y(e,t),Q(()=>F(e[t])))}function fs(e){let t=e.observedAttributes;return t&&!e.hasOwnProperty("observedAttributes")&&(t=e.observedAttributes?.slice(0)),e.observedAttributes=t||[]}function Rt(e,t,n){return n===!1||n===null||n===void 0?n=null:n===!0&&(n=""),n===null?e.removeAttribute(t):e.setAttribute(t,String(n)),n}function ds(e,t,n){e.hasOwnProperty(qe)||(e[qe]={...e[qe]}),e[qe]&&(e[qe][t]=n)}function y(e,t){return n=>{t?.observe!==!1&&fs(n).push(e),t?.parse&&ds(n,e,t.parse);let r=`$$${e}`,o=n.prototype,s=Object.getOwnPropertyDescriptor(o,e);s&&Object.defineProperty(o,r,s);let i=t?.persist,c={enumerable:!0,configurable:!1,get(){return this[r]},set(a){this[r]!==a?(this[r]=a,i?.(this,e,a),this[ee].attributes$.next({target:this,attribute:e,value:a})):s?.set&&(i?.(this,e,a),this[r]=a)}};Fo(n,a=>{if(s||(a[r]=a[e]),Object.defineProperty(a,e,c),i?.(a,e,a[e]),t?.render){let l=t.render(a);l&&Po(a,l)}})}}function b(e){return y(e,{persist:Rt,observe:!0})}function Bo(e){let t=`on${e}`;return y(t,{render(n){return g(n,t).switchMap(r=>r?new _(o=>{let s=i=>{i.target===n&&n[t]?.call(n,i)};n.addEventListener(e,s),o.signal.subscribe(()=>n.removeEventListener(e,s))}):T)},parse(n){return n?new Function("event",n):void 0}})}function q(e){return y(e,{observe:!1})}function D(){return document.createElement("slot")}function zo(e){return t=>{let[n,r]=e();return t[ee].add(n),r}}var lt=class extends h{};u(lt,{tagName:"c-span"});function ms(e,t){let n=document.createTextNode("");return e[ee].add(t.tap(r=>n.textContent=r)),n}var wr=document.createDocumentFragment();function _n(e,t,n=e){if(t!=null)if(Array.isArray(t)){for(let r of t)_n(e,r,wr);n!==wr&&n.appendChild(wr)}else e instanceof h&&t instanceof _?n.appendChild(ms(e,t)):t instanceof Node?n.appendChild(t):e instanceof h&&typeof t=="function"?_n(e,t(e),n):n.appendChild(document.createTextNode(t))}function Ho(e,t){for(let n in t){let r=t[n];e instanceof h?r instanceof _?e[ee].add(n==="$"?r:r.tap(o=>e[n]=o)):n==="$"&&typeof r=="function"?e[ee].add(r(e)):e[n]=r:e[n]=r}}function gs(e,t){return e.constructor.observedAttributes?.includes(t)}function $o(e,t){let n=e instanceof h&&gs(e,t)?Y(e,t):kn(e,[t]).map(()=>e[t]);return f(n,Q(()=>F(e[t])))}function In(e,t,n){return y(e,{parse(r){if(r==="Infinity"||r==="infinity")return 1/0;let o=r===void 0?void 0:Number(r);return t!==void 0&&(o===void 0||o<t||isNaN(o))&&(o=t),n!==void 0&&o!==void 0&&o>n&&(o=n),o}})}function ce(e,t,n){for(let r=e.parentElement;r;r=r.parentElement)if(r[ee]?.message(t,n))return}function ue(e,t,n=!0){return new _(r=>{let o={type:t,next:r.next,stopPropagation:n};e[ee].addMessageHandler(o),r.signal.subscribe(()=>e[ee].removeMessageHandler(o))})}function N(e,t,...n){let r=typeof e=="string"?document.createElement(e):new e;return t&&Ho(r,t),n&&_n(r,n),r}function C(e,t,...n){if(e!==C&&typeof e=="function"&&!(e.prototype instanceof h))return n.length&&((t??={}).children=n),e(t);let r=e===C?document.createDocumentFragment():typeof e=="string"?document.createElement(e):new e;return t&&Ho(r,t),n&&_n(r,n),r}function hs(e,t){return n=>new _(()=>{n.hasAttribute(e)||n.setAttribute(e,t)})}function jo(e,t){return Mt(n=>e.setAttribute("aria-"+t,n===!0?"true":n===!1?"false":n.toString()))}function U(e){return hs("role",e)}var Vo=0;function Te(e){return e.id||=`cxl__${Vo++}`}function Uo(e){return $o(e,"id").map(t=>(t||(e.id=`cxl__${Vo++}`),e.id))}var pt=d(":host{display:contents}"),ys=[-2,-1,0,1,2,3,4,5],Qo=["display-large","display-medium","display-small","body-large","body-medium","body-small","label-large","label-medium","label-small","headline-large","headline-medium","headline-small","title-large","title-medium","title-small","code"],_t=Ye(),On=ie(""),xe=d(`:host([disabled]) {
	cursor: default;
	pointer-events: var(--cxl-override-pointer-events, none);
}`),vs=(()=>{for(let e of Array.from(document.fonts.keys()))if(e.family==="Roboto")return!0;return!1})(),Ko={primary:"#186584","on-primary":"#FFFFFF","primary-container":"#C1E8FF","on-primary-container":"#004D67",secondary:"#4E616C","on-secondary":"#FFFFFF","secondary-container":"#D1E6F3","on-secondary-container":"#364954",tertiary:"#5F5A7D","on-tertiary":"#FFFFFF","tertiary-container":"#E5DEFF","on-tertiary-container":"#474364",error:"#BA1A1A","on-error":"#FFFFFF","error-container":"#FFDAD6","on-error-container":"#93000A",background:"#F6FAFE","on-background":"#171C1F",surface:"#F6FAFE","on-surface":"#171C1F","surface-variant":"#DCE3E9","on-surface-variant":"#40484D",outline:"#71787D","outline-variant":"#C0C7CD",shadow:"#000000",scrim:"#000000","inverse-surface":"#2C3134","on-inverse-surface":"#EDF1F5","inverse-primary":"#8ECFF2","primary-fixed":"#C1E8FF","on-primary-fixed":"#001E2B","primary-fixed-dim":"#8ECFF2","on-primary-fixed-variant":"#004D67","secondary-fixed":"#D1E6F3","on-secondary-fixed":"#091E28","secondary-fixed-dim":"#B5C9D7","on-secondary-fixed-variant":"#364954","tertiary-fixed":"#E5DEFF","on-tertiary-fixed":"#1B1736","tertiary-fixed-dim":"#C9C2EA","on-tertiary-fixed-variant":"#474364","surface-dim":"#D6DADE","surface-bright":"#F6FAFE","surface-container-lowest":"#FFFFFF","surface-container-low":"#F0F4F8","surface-container":"#EAEEF2","surface-container-high":"#E5E9ED","surface-container-highest":"#DFE3E7",warning:"#DD2C00","on-warning":"#FFFFFF","warning-container":"#FFF4E5","on-warning-container":"#8C1D18",success:"#2E7D32","on-success":"#FFFFFF","success-container":"#81C784","on-success-container":"#000000"};function ei(e=""){return`
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
		`}function ti(e=Ko){return Object.entries(e).map(([t,n])=>`--cxl-color--${t}:${n};--cxl-color-${t}:var(--cxl-color--${t});`).join("")}var J={name:"",animation:{flash:{kf:{opacity:[1,0,1,0,1]},options:{easing:"ease-in"}},spin:{kf:{rotate:["0deg","360deg"]}},pulse:{kf:{rotate:["0deg","360deg"]},options:{easing:"steps(8)"}},openY:{kf:e=>({height:["0",`${e.scrollHeight}px`]})},closeY:{kf:e=>({height:[`${e.scrollHeight}px`,"0"]})},expand:{kf:{scale:[0,1]}},expandX:{kf:{scale:["0 1","1 1"]}},expandY:{kf:{scale:["1 0","1 1"]}},zoomIn:{kf:{scale:[.3,1]}},zoomOut:{kf:{scale:[1,.3]}},scaleUp:{kf:{scale:[1,1.25]}},fadeIn:{kf:[{opacity:0},{opacity:1}]},fadeOut:{kf:[{opacity:1},{opacity:0}]},shakeX:{kf:{translate:["0","-10px","10px","-10px","10px","-10px","10px","-10px","10px","0"]}},shakeY:{kf:{translate:["0","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0 -10px","0 10px","0"]}},slideOutLeft:{kf:{translate:["0","-100% 0"]}},slideInLeft:{kf:{translate:["-100% 0","0"]}},slideOutRight:{kf:{translate:["0","100% 0"]}},slideInRight:{kf:{translate:["100% 0","0"]}},slideInUp:{kf:{translate:["0 100%","0"]}},slideInDown:{kf:{translate:["0 -100%","0"]}},slideOutUp:{kf:{translate:["0","0 -100%"]}},slideOutDown:{kf:{translate:["0","0 100%"]}},focus:{kf:[{offset:.1,filter:"brightness(150%)"},{filter:"brightness(100%)"}],options:{duration:500}}},easing:{emphasized:"cubic-bezier(0.2, 0.0, 0, 1.0)",emphasized_accelerate:"cubic-bezier(0.05, 0.7, 0.1, 1.0)",emphasized_decelerate:"cubic-bezier(0.3, 0.0, 0.8, 0.15)",standard:"cubic-bezier(0.2, 0.0, 0, 1.0)",standard_accelerate:"cubic-bezier(0, 0, 0, 1)",standard_decelerate:"cubic-bezier(0.3, 0, 1, 1)"},breakpoints:{xsmall:0,small:600,medium:905,large:1240,xlarge:1920,xxlarge:2560},disableAnimations:!1,prefersReducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches,colors:Ko,imports:vs?void 0:["https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&family=Roboto:wght@300;400;500;700&display=swap"],globalCss:`:root{
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
	`,css:""};function Dt(e=""){return`:host ${e} {
--cxl-mask-hover: color-mix(in srgb, var(--cxl-color-on-surface) 8%, transparent);
--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
--cxl-mask-active: linear-gradient(0, var(--cxl-color-surface-container),var(--cxl-color-surface-container));
}
:host(:hover) ${e} { background-image: linear-gradient(0, var(--cxl-mask-hover),var(--cxl-mask-hover)); }
:host(:focus-visible) ${e} { background-image: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus)) }
:host{-webkit-tap-highlight-color: transparent}
`}var Ln=d(Dt()),ni={"./theme-dark.js":()=>Promise.resolve().then(()=>(Wo(),Yo))},Xe=[0,4,8,16,24,32,48,64],ut,qo,ws;function V(e,t){return e==="xsmall"?`@media(max-width:${J.breakpoints.small}px){${t}}`:`@media(min-width:${J.breakpoints[e]}px){${t}}`}function Fn(e){return Rn(e).map(t=>{let n=J.breakpoints,r=t.contentRect.width,o="xsmall";for(let s in n){if(n[s]>r)return o;o=s}return o})}function Es(e=""){return Object.entries(ci).map(([t,n])=>`:host([color=${t}]) ${e}{ ${n} }`).join("")}function ft(e,t,n=""){return ri(e,`
		${t?`:host ${n} { ${ci[t]} }`:""}
		:host${t?"":"([color])"} ${n} {
			color: var(--cxl-color-on-surface);
			background-color: var(--cxl-color-surface);
		}
		:host([color=transparent]) ${n}{
			color: inherit;
			background-color: transparent;
		}
		${Es(n)}
	`)}function ri(e,t){let n=d(t);return y(e,{persist:Rt,render:r=>n(r)})}function be(e,t){return ri(e,ys.map(n=>{let r=t(n);return n===0?`:host ${r}`:`:host([size="${n}"]) ${r}`}).join(""))}function oi(){let e=document.adoptedStyleSheets.indexOf(ut);e!==-1&&document.adoptedStyleSheets.splice(e,1)}function Ss(e){ut&&oi();let t=e.globalCss??"";e.colors&&(t+=`:root{${ti(e.colors)}}`),t&&(ut=Le(t),document.adoptedStyleSheets.push(ut)),_t.next({theme:e,stylesheet:ut,css:t}),On.next(e.name)}var Xo="";function ii(e){e?e!==Xo&&(typeof e=="string"?import(e):e()).then(t=>Ss(t.default)):ut&&(oi(),_t.next(void 0),On.next("")),Xo=e}function Cs(e){let t;return _t.tap(n=>{let r=n?.theme.override?.[e.tagName];r?t?t.replace(r):e.shadowRoot?.adoptedStyleSheets.push(t??=Le(r)):t&&t.replace("")})}function Le(e){let t=new CSSStyleSheet;return e&&t.replaceSync(e),t}function ai(e,t=""){let n=Le(t);return z(e).adoptedStyleSheets.push(n),n}function d(e){let t;return n=>{let r=z(n);if(r.adoptedStyleSheets.push(t??=Le(e)),!n[Dn])return J.css&&r.adoptedStyleSheets.unshift(ws??=Le(J.css)),n[Dn]=!0,Cs(n)}}var si=["background","primary","primary-container","secondary","secondary-container","tertiary","tertiary-container","surface","surface-container","surface-container-low","surface-container-lowest","surface-container-highest","surface-container-high","error","error-container","success","success-container","warning","warning-container","inverse-surface","inverse-primary"],pu=[...si,"inherit"];function Sr(e,t="surface"){return`--cxl-color-${t}: var(--cxl-color--${e});
--cxl-color-on-${t}: var(--cxl-color--on-${e}, var(--cxl-color--on-surface));
--cxl-color-surface-variant: var(--cxl-color--${e==="surface"?"surface-variant":e});
--cxl-color-on-surface-variant: ${e.includes("surface")?"var(--cxl-color--on-surface-variant)":`color-mix(in srgb, var(--cxl-color--on-${e}) 80%, transparent)`};
`}function re(e){return`${Sr(e)};background-color:var(--cxl-color-surface);color:var(--cxl-color-on-surface);`}var ci=si.reduce((e,t)=>(e[t]=`
${Sr(t)}
${t==="inverse-surface"?Sr("inverse-primary","primary"):""}
`,e),{inherit:"color:inherit;background-color:inherit;"});function dt(e=":host"){return`
		${e} {
			scrollbar-color: var(--cxl-color-outline-variant) var(--cxl-color-surface, transparent);
		}
		${e}::-webkit-scrollbar-track {
			background-color: var(--cxl-color-surface, transparent);
		}
	`}function B(e){return`font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e});`}var ks=requestAnimationFrame(()=>_s()),As={},Jo=document.createElement("template"),Zo={};function Ms(e){return function(t){let n=e(t),r=Zo[n];if(r)return r.cloneNode(!0);let o=document.createElementNS("http://www.w3.org/2000/svg","svg"),s=()=>(o.dispatchEvent(new ErrorEvent("error")),"");return fetch(n).then(i=>i.ok?i.text():s(),s).then(i=>{if(!i)return;Jo.innerHTML=i;let c=Jo.content.children[0];if(!c)return;let a=c.getAttribute("viewBox");a?o.setAttribute("viewBox",a):c.hasAttribute("width")&&c.hasAttribute("height")&&o.setAttribute("viewBox",`0 0 ${c.getAttribute("width")} ${c.getAttribute("height")}`);for(let l of c.childNodes)o.append(l);Zo[t.name]=o}),o.setAttribute("fill","currentColor"),o}}var Ns=Ms(({name:e,width:t,fill:n})=>(t!==20&&t!==24&&t!==40&&t!==48&&(t=48),`https://cdn.jsdelivr.net/gh/google/material-design-icons@941fa95/symbols/web/${e}/materialsymbolsoutlined/${e}_${n?"fill1_":""}${t}px.svg`)),Ts=Ns;function li(e,t={}){let{width:n,height:r}=t;n===void 0&&r===void 0&&(n=r=24);let o=As[e]?.icon()||Ts({name:e,width:n,fill:t.fill});return t.className&&o.setAttribute("class",t.className),n&&(o.setAttribute("width",`${n}`),r===void 0&&o.setAttribute("height",`${n}`)),r&&(o.setAttribute("height",`${r}`),n===void 0&&o.setAttribute("width",`${r}`)),t.alt&&o.setAttribute("alt",t.alt),o}var Cr,Rs=new Promise(e=>{Cr=e});function _s(e){cancelAnimationFrame(ks),qo||(e&&(e.colors&&(J.colors=e.colors),e.globalCss&&(J.globalCss+=e.globalCss)),document.adoptedStyleSheets.push(qo=Le(`:root { ${ti(J.colors)} }`+J.globalCss)),J.imports?Promise.allSettled(J.imports.map(t=>{let n=document.createElement("link");return n.rel="stylesheet",n.href=t,document.head.append(n),new Promise((r,o)=>(n.onload=r,n.onerror=o))})).then(Cr):Cr())}function Pn(){return wn(async()=>{await Rs,await document.fonts.ready})}var Ds=[d(`
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
}`),D,()=>N("slot",{name:"title"})];function Is(e){return e.tagName==="C-APPBAR-CONTEXTUAL"}var It=class extends h{size;sticky=!1;contextual};u(It,{tagName:"c-appbar",init:[b("size"),b("sticky"),b("contextual")],augment:[d(`
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
		`),...Ds,()=>N("slot",{name:"contextual"}),e=>g(e,"sticky").switchMap(t=>t?Mn(e,{threshold:[1]}).tap(n=>e.toggleAttribute("scroll",n.intersectionRatio<1)):T),e=>{let t;return f(Cn(e),g(e,"contextual")).raf().switchMap(()=>{for(let n of e.children)if(Is(n)&&(n.slot="contextual",n.open=n.name===e.contextual,n.open))return t=n,E(n,"close").tap(()=>e.contextual=void 0);return t&&(t.open=!1),t=void 0,T})}]});function Os(e){return g(e,"disabled").tap(t=>t?e.setAttribute("aria-disabled","true"):e.removeAttribute("aria-disabled"))}function Ls(e,t=e,n=0){let r=t.hasAttribute("tabindex")?t.tabIndex:n;return Os(e).tap(o=>{o?t.removeAttribute("tabindex"):t.tabIndex=r})}function Fs(e,t=e){return f(E(t,"focusout").tap(()=>e.touched=!0),f(Y(e,"disabled"),Y(e,"touched")).tap(()=>ce(e,"focusable.change")))}function Fe(e,t=e,n=0){return f(Ls(e,t,n),Fs(e,t))}function ui(e){return e in J.animation}function Re({target:e,animation:t,options:n}){if(J.disableAnimations)return e.animate(null);let r=typeof t=="string"?J.animation[t]:t;if(!r)throw new Error(`Animation "${t}" not defined`);let o=typeof r.kf=="function"?r.kf(e):r.kf,s={duration:250,easing:J.easing.emphasized,...r.options,...n,...J.prefersReducedMotion?{duration:0}:void 0};return e.animate(o,s)}function pi(e){let{trigger:t,stagger:n,commit:r,keep:o}=e;function s(c){return new _(a=>{let l=Re(c);l.ready.then(()=>a.next({type:"start",animation:l}),()=>{}),l.addEventListener("finish",()=>{a.next({type:"end",animation:l}),r&&l.commitStyles(),!(o||o!==!1&&c.options?.fill&&(c.options.fill==="both"||c.options.fill==="forwards"))&&a.complete()}),a.signal.subscribe(()=>{try{l.cancel()}catch{}})})}let i=Array.isArray(e.target)?e.target:e.target instanceof Element?[e.target]:Array.from(e.target);return f(...i.map((c,a)=>{let l={...e.options,delay:n!==void 0?(e.options?.delay??0)+a*n:e.options?.delay};return(t==="visible"?Do(c).filter(m=>m):t==="hover"?yr(c):F(!0)).switchMap(m=>m?s({...e,options:l,target:c}):T)}))}function fi(e,t,n=e.getBoundingClientRect()){let r=n.width>n.height?n.width:n.height,o=new Bn,s=e.shadowRoot||e,{x:i,y:c}=t??{},a=i===void 0||!t||Tt(t),l=i>n.right||i<n.left||c>n.bottom||c<n.top;return o.x=a||l?n.width/2:i-n.left,o.y=a||l?n.height/2:c-n.top,o.radius=r,t||(o.duration=0),s.prepend(o),o}function di(e,t=e){let n,r,o,s=()=>{n=fi(t,r instanceof Event?r:void 0,o),n.duration=600,r=void 0};return f(E(e,"click").tap(i=>{r=i,o=t.getBoundingClientRect()}),g(e,"selected").raf().switchMap(()=>{if(e.selected){if(!n?.parentNode){if(Nt(e))return r=void 0,Me(e).tap(s);s()}}else n&&mi(n);return T})).ignoreElements()}function mi(e){return new Promise(t=>{Re({target:e,animation:"fadeOut"}).addEventListener("finish",()=>{e.remove(),t()})})}function ye(e,t=e){let n=!1,r=0;return f(E(t,"pointerdown"),E(t,"click")).tap(o=>o.cxlRipple??=e).raf().mergeMap(o=>{if(o.cxlRipple===e&&!n&&!e.disabled&&e.parentNode){r=Date.now(),n=!0,e.style.setProperty("--cxl-mask-hover","none");let s=fi(e,o),i=s.duration,c=()=>{e.style.removeProperty("--cxl-mask-hover"),mi(s).then(()=>{n=!1})};return o.type==="click"?Ge(i).tap(c):f(E(document,"pointerup"),E(document,"pointercancel")).first().map(()=>{let a=Date.now()-r;setTimeout(()=>c(),a>i?32:i-a)})}return T})}var Bn=class extends h{x=0;y=0;radius=0;duration=500};u(Bn,{tagName:"c-ripple",init:[y("x"),y("y"),y("radius")],augment:[d(`
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
}`),e=>{let t=document.createElement("div");return t.className="ripple",K(()=>{let n=t.style;n.translate=`${e.x-e.radius}px ${e.y-e.radius}px`,n.width=n.height=e.radius*2+"px",t.parentNode||z(e).append(t),Re({target:t,animation:"expand",options:{duration:e.duration}}),Re({target:t,animation:"fadeIn",options:{duration:e.duration/2}})})}]});var Je=[xe,Ln,d(`
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
}`)],Ps=d(`
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
`);function kr(e){return g(e,"disabled").switchMap(t=>t?T:An(e).tap(n=>{n.stopPropagation(),e.click()}))}function Ar(e){return f(kr(e),Fe(e))}var mt=class extends h{disabled=!1;touched=!1};u(mt,{init:[b("disabled"),b("touched")],augment:[U("button"),Ar]});var Ot=class extends mt{size;color;variant};u(Ot,{tagName:"c-button",init:[be("size",e=>`{
			font-size: ${14+e*4}px;
			min-height: ${40+e*8}px;
			padding-right: ${16+e*4}px;
			padding-left: ${16+e*4}px;
		}`),ft("color","primary"),b("variant")],augment:[...Je,Ps,ye,D]});var Lt=class extends Ot{};u(Lt,{tagName:"c-button-round",augment:[d(`
:host { min-width:40px; min-height: 40px; padding: 4px; border-radius: 100%; flex-shrink: 0; }
:host([variant=text]) { margin: -8px; }
:host([variant=text]:not([disabled])) { color: inherit; }
:host(:hover) { box-shadow:none; }
		`)]});var le=class extends h{name="";width;height;alt;fill=!1};u(le,{tagName:"c-icon",init:[y("name"),y("width"),y("height"),y("fill"),y("alt")],augment:[U("none"),d(`
		:host {
			display: inline-block;
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			vertical-align: middle;
		}
		.icon { width: 100%; height: 100% }
		`),e=>{let t=new CSSStyleSheet,n;return e.shadowRoot?.adoptedStyleSheets.push(t),Me(e).switchMap(()=>Oe(e)).debounceTime(0).tap(()=>{let r=e.width??e.height,o=e.height??e.width;t.replace(`:host{${r===void 0?"":`width:${r}px;`}${o===void 0?"":`height:${o}px`}}`),n?.remove(),n=e.name?li(e.name,{className:"icon",width:r,height:o,fill:e.fill,alt:e.alt}):void 0,n&&(n.onerror=()=>{n&&e.alt&&n.replaceWith(e.alt)},z(e).append(n))})}]});var ve=class extends Lt{icon="";width;height;fill=!1;variant="text";alt};u(ve,{tagName:"c-icon-button",init:[y("icon"),y("width"),y("height"),y("alt"),y("fill")],augment:[e=>N(le,{className:"icon",width:g(e,"width"),height:g(e,"height"),name:g(e,"icon"),fill:g(e,"fill"),alt:g(e,"alt")})]});var ep=1440*60*1e3;function gi(e,t,n){if(t==="relative"){let r=new Date;return e.getFullYear()===r.getFullYear()?e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()?e.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit",hourCycle:"h24"}):e.toLocaleDateString(n,{month:"2-digit",day:"2-digit"}):e.toLocaleDateString(n,{month:"2-digit",day:"2-digit",year:"2-digit"})}return t==="medium"||t==="long"||t==="short"||t==="full"?e.toLocaleString(n,{dateStyle:t,timeStyle:t}):e.toLocaleString()}function hi(e,t,n){return t?typeof n=="string"?gi(t,n,e):t.toLocaleString(e,n):""}var Mr={"core.enable":"Enable","core.disable":"Disable","core.cancel":"Cancel","core.ok":"Ok","core.open":"Open","core.close":"Close","core.of":"of"};function Bs(){try{return new Intl.NumberFormat(navigator.language),navigator.language}catch{return"en-US"}}var zn={content:Mr,name:"default",localeName:Bs(),currencyCode:"USD",decimalSeparator:1.1.toLocaleString().substring(1,2),weekStart:0,formatDate:(e,t)=>hi(zn.localeName,e,t)},zs={content:Mr,name:"en",localeName:"en-US",currencyCode:"USD",decimalSeparator:".",weekStart:0,formatDate:(e,t)=>hi("en-US",e,t)};function Hs(){let e=ie(zn),t={default:zn,en:zs},n={},r=e.map(i=>i.content);async function o(i){let c=i.split("-")[0];if(!(t[i]??t[c])){let l=n[i]??n[c];l&&await l()}return t[c]||zn}async function s(i){e.next(await o(i))}return navigator?.language&&s(navigator.language),{content:r,registeredLocales:t,locale:e,setLocale:s,getLocale(i){return i?wn(()=>o(i)):e},get(i,c){return r.map(a=>a[i]??(c&&a[c])??"")},register(i){t[i.name]=i}}}var Hn=Hs();function xi(e){return Object.assign(Mr,e),Hn.get}var Nr=class{currentPopupContainer;currentPopup;currentModal;currentTooltip;popupContainer=document.body;toggle(t){t.element.parentElement!==this.popupContainer?this.popupOpened(t):t.close()}popupOpened(t){this.currentPopup&&t.element!==this.currentPopup.element&&this.currentPopup.close(),this.currentPopup=t}openModal(t){this.currentModal&&t.element!==this.currentModal.element&&this.currentModal.close(),t.element.parentNode||this.popupContainer?.append(t.element),t.element.open||t.element.showModal(),this.currentModal=t}closeModal(){this.currentModal?.close(),this.modalClosed()}modalClosed(){this.currentModal=void 0}tooltipOpened(t){this.currentTooltip&&this.currentTooltip!==t&&this.currentTooltip.remove(),this.currentTooltip=t}close(){this.currentPopup?.close()}},Pe=new Nr;function bi(e=document){document.documentElement.lang="en";let t=[N("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),N("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),N("meta",{name:"mobile-web-app-capable",content:"yes"}),N("style",void 0,`html{height:100%;}html,body{padding:0;margin:0;min-height:100%;${B("body-large")}}
			a{color:var(--cxl-color-on-surface)}
			`)];return e.head.append(...t),t}function yi(e=2e3){return f(Ge(e),Pn()).first()}function vi(e){return yi().raf(()=>e.setAttribute("ready",""))}function $n(e){return f(K(t=>{let n=bi(e.ownerDocument??document);t.signal.subscribe(()=>n.forEach(r=>r.remove()))}),Ne().raf(()=>{let t=e.firstElementChild;t instanceof HTMLTemplateElement&&(e.append(t.content),t.remove())}),yi().switchMap(()=>Fn(e).raf(t=>e.setAttribute("breakpoint",t))),vi(e),On.raf(t=>t?e.setAttribute("theme",t):e.removeAttribute("theme")))}var Tr=class extends h{connectedCallback(){requestAnimationFrame(()=>bi(this.ownerDocument||document)),super.connectedCallback()}};u(Tr,{tagName:"c-meta",augment:[()=>vi(document.body)]});function wi(e,t,n){n==="in"&&(e.style.display="");let r=e.offsetWidth,o=Re({target:e,animation:{kf:{[t]:n==="in"?[`-${r}px`,"0"]:["0",`-${r}px`]}}});n==="out"&&(o.onfinish=()=>e.style.display="none")}var Ft=class extends h{sheetstart=!1;sheetend=!1};u(Ft,{tagName:"c-application",init:[b("sheetstart"),b("sheetend")],augment:[d(`
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
${dt()}
	`),$n,e=>ue(e,"toggle.open").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!0)}),e=>ue(e,"toggle.close").tap(t=>{(t==="sheetend"||t==="sheetstart")&&(e[t]=!1)}),e=>{let t=N("slot",{name:"start"}),n=N("slot",{id:"body"}),r=N("slot",{name:"end"}),o=Le("html { overflow: hidden }");return z(e).append(t,n,r),e.sheetstart||(t.style.display="none"),e.sheetend||(r.style.display="none"),Pe.popupContainer=e,f(K(s=>{let i=(e.ownerDocument??document).adoptedStyleSheets;i.push(o),s.signal.subscribe(()=>{let c=i.indexOf(o);c!==-1&&i.splice(c,1)})}),Y(e,"sheetstart").tap(s=>wi(t,"marginLeft",s?"in":"out")),Y(e,"sheetend").tap(s=>wi(r,"marginRight",s?"in":"out")))}]});function Be(e,t,n){return new _(r=>{let o={id:e,controller:n,target:t};ce(t,`registable.${e}`,o),r.signal.subscribe(()=>o.unsubscribe?.())})}function jn(e,t,n,r){return new _(o=>{function s(c){let a=c.target;c.unsubscribe=()=>{let m=n.indexOf(a);m!==-1&&n.splice(m,1),r?.({type:"disconnect",target:a,elements:n}),o.next()};let l=n.indexOf(a);l!==-1&&n.splice(l,1);let S=n.findIndex(m=>m.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING);S===-1?n.push(a):n.splice(S,0,a),r?.({type:"connect",target:a,elements:n}),o.next()}let i=ue(t,`registable.${e}`).subscribe(s);o.signal.subscribe(i.unsubscribe)})}function Ei(e,t,n=new Set){return new _(r=>{function o(i){let c=i.target,a=i.controller||i.target;i.unsubscribe=()=>{n.delete(a),r.next({type:"disconnect",target:a,element:c,elements:n})},n.add(a),r.next({type:"connect",target:a,element:c,elements:n})}let s=ue(t,`registable.${e}`).subscribe(o);r.signal.subscribe(s.unsubscribe)})}var Rr={get(e){try{return localStorage.getItem(e)??void 0}catch(t){console.error(t)}return""},set(e,t){try{localStorage.setItem(e,t)}catch(n){console.error(n)}}};function Si(e){return(t,n)=>t[e]>n[e]?1:t[e]<n[e]?-1:0}function Vn(e,t){if(t==="_parent")return e.parentElement||void 0;if(t==="_next")return e.nextElementSibling||void 0;if(typeof t!="string")return t??void 0;let n,r=e.getRootNode();return r instanceof ShadowRoot&&(n=r.getElementById(t),n)?n:e.ownerDocument.getElementById(t)??void 0}var $s=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,js=/^\d{5}(?:[-\s]\d{4})?$/,Vs={"validation.invalid":"Invalid value","validation.json":"Invalid JSON value","validation.zipcode":"Please enter a valid zip code","validation.equalTo":"Values do not match","validation.equalToElement":"Values do not match","validation.greaterThanElement":"Values do not match","validation.lessThanElement":"Values do not match","validation.required":"This field is required","validation.nonZero":"Value cannot be zero","validation.email":"Please enter a valid email address","validation.pattern":"Invalid pattern","validation.min":"Invalid value","validation.max":"Invalid value","validation.minlength":"Invalid value","validation.maxlength":"Invalid value","validation.greaterThan":"Invalid value","validation.lessThan":"Invalid value","validation.nonEmpty":"Value must not be empty"},Ci={required:Js,email:Zs,json:ec,zipcode:Qs,nonZero:qs,nonEmpty:Ws},Us={pattern:Xs,equalToElement:_r(Ni),greaterThan:Ai,lessThan:Mi,greaterThanElement:_r(Ai),lessThanElement:_r(Mi),min:nc,max:rc,equalTo:Ni,maxlength:oc,minlength:ic},Gs=xi(Vs);function _r(e){return(t,n)=>{let r=typeof t=="string"?Vn(n,t):t;if(!r)throw"Invalid element";return e(r)}}function we(e,t){return{key:e,valid:t,message:Gs(`validation.${e}`,"validation.invalid")}}function Ys(e){return e==null||e===""||Array.isArray(e)&&e.length===0}function Ws(e){return we("nonEmpty",!Ys(e))}function qs(e){return we("nonZero",e===""||Number(e)!==0)}function Xs(e){let t=typeof e=="string"?e=new RegExp(e):e;return n=>we("pattern",typeof n=="string"&&(n===""||t.test(n)))}function Dr(e){return e!=null&&e!==""}function Js(e,t){let n=t&&"checked"in t?!!t.checked:!0;return we("required",n&&Dr(e))}function Zs(e){return we("email",typeof e=="string"&&(e===""||$s.test(e)))}function Qs(e){return we("zipcode",typeof e=="string"&&(e===""||js.test(e)))}function Ks(e){try{return JSON.parse(e),!0}catch{return!1}}function ec(e){return we("json",Ks(e))}function tc(e){return e instanceof HTMLElement&&"value"in e}function Pt(e,t,n){let r=tc(t)?g(t,"value"):t instanceof _?t:F(t);return o=>r.map(s=>we(e,!Dr(o)||!Dr(s)||n(o,s)))}function ki(e,t){let n=/(\w+)(?:\(([^)]+?)\))?/g,r=[],o;for(;o=n.exec(e);)if(o[2]){let s=Us[o[1]];if(!s)throw`Invalid rule "${o[1]}"`;r.push(s(o[2],t))}else if(o[1]in Ci)r.push(Ci[o[1]]);else throw`Invalid rule "${o[1]}"`;return r}function Ti(e,t){let n=(typeof e=="string"?ki(e,t):e).flatMap(r=>typeof r=="string"?ki(r,t):r);return(r,o)=>n.map(s=>{let i=s(r,o);return i instanceof _?i:i instanceof Promise?En(i):F(i)})}function nc(e){return Pt("min",e,(t,n)=>Number(t)>=Number(n))}function Ai(e){return Pt("greaterThan",e,(t,n)=>Number(t)>Number(n))}function rc(e){return Pt("max",e,(t,n)=>Number(t)<=Number(n))}function Mi(e){return Pt("lessThan",e,(t,n)=>Number(t)<Number(n))}function Ni(e){return Pt("equalTo",e,(t,n)=>t==n)}function oc(e){return t=>we("maxlength",!t||t.length<=+e)}function ic(e){return t=>we("minlength",!t||t.length>=+e)}function ac(e){return _i(e).tap(()=>e.dispatchEvent(new Event("update",{bubbles:!0})))}function Ri(e){return Y(e,"value").tap(()=>{e.shadowRoot?.delegatesFocus||Nn(e,"change",{bubbles:!0})})}function _i(e){return f(g(e,"value"),g(e,"checked")).map(()=>{})}var gt=class e extends h{static formAssociated=!0;autofocus=!1;invalid=!1;disabled=!1;touched=!1;rules;validationResult;name;validMap={};onupdate;defaultValue;static{u(e,{init:[b("autofocus"),b("invalid"),b("disabled"),b("touched"),y("rules"),b("name"),q("validationResult"),Bo("update")],augment:[t=>(t.defaultValue=t.value,f(Be("form",t),Y(t,"invalid").tap(()=>Nn(t,"invalid")),g(t,"invalid").switchMap(n=>{if(n){if(t.setAria("invalid","true"),!t.validationMessage)return Hn.get("validation.invalid").tap(r=>t.setCustomValidity(r))}else t.setAria("invalid",null);return T}),K(()=>{t.autofocus&&setTimeout(()=>t.focus(),250)}),g(t,"rules").switchMap(n=>{if(!n)return T;let r=Ti(n,t);return _i(t).switchMap(()=>f(...r(t.value,t)).tap(o=>t.setValidity(o))).finalize(()=>t.resetValidity())}),g(t,"value").tap(n=>t.setFormValue(n)),g(t,"validationResult").switchMap(n=>!n||n.valid?T:n.message instanceof _?n.message:n.message===void 0?Hn.get("validation.invalid"):F(n.message)).tap(n=>{t.setCustomValidity(n)}))),ac]})}get labels(){return he(this).labels}get validity(){return he(this)?.validity||null}get validationMessage(){return he(this)?.validationMessage||""}reportValidity(){return he(this)?.reportValidity()??!0}checkValidity(){return he(this)?.checkValidity()??!0}setCustomValidity(t){let n=!!t,r=t!==this.validationMessage;this.applyValidity(n,t),this.invalid!==n?this.invalid=n:r&&Nn(this,"invalid")}formResetCallback(){this.value=this.defaultValue,this.touched=!1}setAria(t,n){n?this.setAttribute(`aria-${t}`,n):this.removeAttribute(`aria-${t}`)}resetValidity(){for(let t in this.validMap)this.validMap[t]={valid:!0};this.resetInvalid()}resetInvalid(){this.validationResult=void 0,this.applyValidity(!1),this.invalid=!1}setValidity(t){this.validMap[t.key||"invalid"]=t;for(let n in this.validMap){let r=this.validMap[n];if(!r.valid)return this.validationResult=r}this.resetInvalid()}applyValidity(t,n){he(this)?.setValidity({customError:t},n)}formDisabledCallback(t){this.disabled=t}setFormValue(t){he(this)?.setFormValue?.(t)}};function sc(e,t){let n,r=t.key;if(r==="ArrowDown"&&e.goDown)n=e.goDown();else if(r==="ArrowRight"&&e.goRight)n=e.goRight();else if(r==="ArrowUp"&&e.goUp)n=e.goUp();else if(r==="ArrowLeft"&&e.goLeft)n=e.goLeft();else if(r==="Home")n=t.ctrlKey&&e.goFirstColumn?e.goFirstColumn():e.goFirst();else if(r==="End")n=t.ctrlKey&&e.goLastColumn?e.goLastColumn():e.goLast();else if(e.other)n=e.other(t);else return null;return t.stopPropagation(),n&&t.preventDefault(),n}function Bt(e){return E(e.host,"keydown").map(t=>sc(e,t)).filter(t=>!!t)}function cc(e){return new _(t=>{let n=e.focus;e.focus=()=>{n.call(e),t.next()},t.signal.subscribe(()=>e.focus=n)})}function Di({host:e,observe:t,getFocusable:n,getSelected:r,getActive:o=()=>Ir(e)}){let s=[];function i(){let c=s.find(a=>!a.disabled&&!a.hidden&&!Nt(a));c&&(c.tabIndex=0)}return f(E(e,"focusin").tap(()=>{let c=o(),a=!1;for(let l of s)l.tabIndex=l===c?(a=!0,0):-1;a||i()}),(t??F(!0)).tap(()=>{if(s=n(),s.find(l=>l.tabIndex===0))return;let a=r?.();a?a.tabIndex=0:i()}),e instanceof HTMLElement?cc(e).tap(()=>{let c=n();(c?.find(l=>l.tabIndex===0)??c?.[0])?.focus()}):T).ignoreElements()}function Ir(e){return We(e)?.activeElement??document.activeElement??void 0}function Ii({getFocusable:e,getActive:t}){return(n=1,r,o=Nt)=>{let s=t(),i=e(),c=r??(s?i.indexOf(s):-1),a;do a=i[c+=n];while(a&&o(a));return a}}function Oi({host:e,input:t,handleOther:n=!1,axis:r}){let o=()=>e.querySelector("[focused]")??e.querySelector("[selected]");function s(m=1){if(e.open===!1){e.open=!0;let P=o();requestAnimationFrame(()=>{P?.focused&&l(P)})}else return i(m)}function i(m=1,P){let R=o(),$=P??(R?e.options.indexOf(R):-1),W;do W=e.options[$+=m];while(W?.hidden);return W}function c(m){let P=m.key;if(/^\w$/.test(P)){let R=o(),$=R?e.options.indexOf(R):-1;if($===-1)return;let W=$;W+1>=e.options.length&&($=0);let ae=new RegExp(`^\\s*${P}`,"i"),te;for(;te=e.options[++$];)if(!te.hidden&&te.textContent?.match(ae))return te;if(W===0)return;for($=0;$<W&&(te=e.options[$++]);)if(!te.hidden&&te.textContent?.match(ae))return te}}let a=()=>e.options.find(m=>m.focused);function l(m){for(let P of e.options)P.focused=!1;m?(m.focused=!0,t?.setAria("activedescendant",Te(m)),m.rendered?.scrollIntoView({block:"nearest"})):t?.setAria("activedescendant",null)}let S=m=>ce(m,"selectable.action",m);return f(Bt({host:t??e,...r==="x"?{goLeft:()=>s(-1),goRight:()=>s(1)}:{goDown:()=>s(1),goUp:()=>s(-1)},goFirst:()=>e.open!==!1?i(1,-1):void 0,goLast:()=>e.open!==!1?i(-1,e.options.length):void 0,other:n?c:void 0}).tap(m=>{e.open===!1&&m?S(m):l(m)}),E(t??e,"focus").tap(()=>l(o())),Lo(t??e,"Enter").tap(m=>{let P=a();e.open!==!1&&P?(m.stopPropagation(),S(P)):e.open===!1&&(e.open=!0)}))}function Or(e){return new _(t=>{f(jn("selectable",e,e.options,n=>{if(n.type==="connect"&&(n.target.view=e.optionView,n.target.selected))return e.defaultValue===void 0&&(e.defaultValue=n.target.value),t.next(n.target);let r;for(let o of e.options)o.hidden||!o.parentNode||o.selected&&(r?o.selected=!1:r=o);t.next(r)}),ue(e,"selectable.action").tap(n=>{if(!e.disabled&&n&&e.options?.includes(n)){let r=e.value!==n.value;t.next(n),r&&(e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})))}})).subscribe({signal:t.signal})})}var Ze={},Un=class e extends gt{options=[];_value;_selected=Ze;static{u(e,{init:[y("value"),q("selected")],augment:[t=>Or(t).tap(n=>{(!n||n!==t.selected)&&t.setSelected(n)}).raf(()=>{t.selected?.selected===!1&&t.setSelected(t.selected)})]})}get value(){return this._selected===Ze?this.options[0]?.value:this._value}get selected(){return this._selected===Ze&&this.options[0]?this.options[0]:this._selected}set value(t){if(this._selected&&this._selected!==Ze&&this._selected.value===t){this._value=t;return}else for(let n of this.options)if(n.value===t){this._value=t,this.setSelected(n);return}this._selected!==Ze?(this._value=void 0,this._selected=void 0):this._value=t}formResetCallback(){super.formResetCallback(),!this.selected&&this.options.length&&this.setSelected(this.options[0])}setSelected(t){for(let n of this.options)n.focused=n.selected=!1;t?(t.selected=!0,this._selected=t,this.value=t.value):this._selected!==Ze&&(!this._selected||this.options.includes(this._selected)?this._selected=void 0:this._selected=Ze)}};function Li(e,t,...n){let r=document.createElementNS("http://www.w3.org/2000/svg",e);for(let o in t){if(o==="children")continue;let s=t[o];r.setAttribute(o==="className"?"class":o,s)}return n&&r.append(...n),r}function Gn(e){return Li("svg",e,Li("path",{d:e.d}))}function lc({host:e,target:t,position:n,onToggle:r,whenClosed:o=T}){return s=>(t.popover??="auto",t.togglePopover(s),r?.(s),s?f(Rn(e),E(window,"resize"),E(window,"scroll",{capture:!0,passive:!0})).tap(n):o)}function Fi(e){let{host:t,beforeToggle:n,target:r}=e,o=lc({...e,whenClosed:X(t).tap(()=>{t.open=!0})});return f(E(r,"toggle").tap(s=>{let i=s.newState==="open";t.open=i}),g(t,"open").raf().switchMap(s=>(n?.(s),t.ariaExpanded=s?"true":"false",o(s))))}var zt=class extends h{invalid=!1};u(zt,{tagName:"c-field-help",init:[y("invalid")],augment:[d(`
:host {
	display: flex;
	align-items: center;
	column-gap: 8px;
	${B("body-small")}
}
	`),D,e=>(e.slot||="help",g(e,"invalid").tap(t=>{e.ariaLive??=t?"assertive":"polite"}))]});var Fr=d(`
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
`),uc=d(`
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
`),pc=d(`
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

${Dt(".content")}
	`);function fc(e){return f(ue(e,"registable.form",!1).tap(t=>{t.id==="form"&&t.target&&(e.input=t.target)}),Ei("field",e).tap(t=>{t.type==="connect"&&t.target(e)}))}var dc=()=>N("div",{className:"content"},N("slot",{name:"leading"}),N("div",{className:"body"},N("slot",{name:"label"}),N("slot",{id:"bodyslot"})),N("slot",{name:"trailing"}),N("div",{className:"indicator"}));function mc(e){function t(l){o.next(l.touched&&l.invalid),e.toggleAttribute("invalid",o.value);let S=0,m=[];for(let R of i.assignedNodes())!(R instanceof HTMLElement)||R===a||("invalid"in R&&R.invalid?o.value&&(R.invalid===!0||R.invalid===l.validationResult?.key)?(S++,R.style.display="",m.push(Te(R))):R.style.display="none":m.push(Te(R)));let P=!o.value||S>0;a.textContent=P?"":l.validationMessage,P?a.remove():(a.parentElement||e.append(a),m.push(Te(a))),m.length?l.setAria("describedby",m.join(" ")):l.setAria("describedby",null)}function n(l){let S=e.input;if(S){if(e.toggleAttribute("inputdisabled",S.disabled),t(S),!l)return;l.type==="focus"?s.next(!0):l.type==="blur"&&s.next(!1)}}function r(){let l=e.input?.value,S=!e.input?.hasAttribute("autofilled")&&(!l||l.length===0);c.classList.toggle("novalue",S),c.classList.toggle("value",!S)}let o=ie(!1),s=ie(!1),i=N("slot",{name:"help"}),c=e.contentElement.children[1].children[0],a=N(zt,{ariaLive:"polite"});return z(e).append(N("div",{className:"help"},i)),f(g(e,"input").switchMap(l=>l?f(F(void 0).tap(()=>{n(),queueMicrotask(r)}),E(l,"focusable.change").tap(n).tap(r),E(l,"focus").tap(n),E(l,"invalid").tap(n),E(l,"update").tap(r),f(E(l,"blur"),E(i,"slotchange")).raf(n),E(e.contentElement,"click").tap(()=>{l&&document.activeElement!==l&&!e.matches(":focus-within")&&!s.value&&l.focus()})):T),fc(e))}var Qe=class e extends h{floating=!1;input;size;contentElement=dc();static{u(e,{init:[b("floating"),q("input"),be("size",t=>` .content{min-height: ${56+t*8}px;}`)],augment:[t=>t.contentElement,mc]})}getContentRect(){return this.contentElement.getBoundingClientRect()}},Lr=class extends Qe{};u(Lr,{tagName:"c-field",augment:[Fr,uc,pc]});var gc=d(`
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
`),Pi=d(`
${ei("#menu")}
#menu { margin: 0; border: 0; box-sizing: border-box; }
:host {
	--cxl-mask-focus: color-mix(in srgb, var(--cxl-color-on-surface) 10%, transparent);
	--cxl-select-focused: linear-gradient(0, var(--cxl-mask-focus),var(--cxl-mask-focus));
}
`);function hc(e,t){return()=>{let n=e.parentElement instanceof Qe?e.parentElement.getContentRect():e.getBoundingClientRect();t.style.top=`${n.bottom}px`,t.style.left=`${n.x}px`,t.style.minWidth=`${n.width}px`,t.style.maxHeight=`${Math.min(window.innerHeight-n.bottom-16,280)}px`}}function Br({host:e,target:t,input:n,position:r,beforeToggle:o,onToggle:s,handleOther:i,axis:c}){return f(Oi({host:e,input:n,handleOther:i,axis:c}),E(n??e,"blur").debounceTime(100).tap(()=>{e.open=!1}),Fi({host:e,target:t,position:r??hc(e,t),beforeToggle:o,onToggle:s}))}function xc(e){let{host:t}=e;return f(gc(t)??T,xe(t)??T,Fe(t),Br(e))}var ht=class extends h{};u(ht,{tagName:"c-select-option",augment:[d(`
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
		`),D]});var Pr=class extends Un{open=!1;optionView=ht;setSelected(t){if(super.setSelected(t),this.open)this.open=!1;else{for(let n of this.options)n!==t&&(n.slot="");t&&(t.slot="selected")}}};u(Pr,{tagName:"c-select",init:[b("open")],augment:[U("listbox"),d(`
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
		`),e=>{let t=N("div",{className:"menu"},N("slot")),n=N("slot",{name:"selected"}),r=t.style,o=ai(e),s=0,i=0;z(e).append(t,n,Gn({viewBox:"0 0 24 24",className:"caret",d:"M7 10l5 5 5-5z"}));function c(){if(e.open)i=e.selected?.rendered?.offsetHeight??0;else{r.cssText="";let a=e.options.reduce((l,S)=>Math.max(l,S?.rendered?.offsetWidth??0),0);o.replaceSync(`:host{width:${a}px}`)}}return f(f(Me(e),Pn()).raf(c),xc({host:e,target:t,handleOther:!0,beforeToggle(a){c();let l=e.selected;l&&(l.slot=a?"":"selected"),t.classList.toggle("open",a)},onToggle(a){let l=e.selected;!a&&l&&(s=l.rendered?.offsetHeight??0)},position(){let a=e.parentElement??e,l=Math.round((i-s)/2),S=e.selected?.rendered,m=a.getBoundingClientRect(),P=e.getBoundingClientRect(),R=P.top-14,$,W=S?S.offsetTop:0;W>R&&(W=R),$=t.scrollHeight;let ae=window.innerHeight-P.top+8+W,te=P.top-l-W;$>ae?$=ae:$<P.height&&($=P.height),r.top=te+"px",r.left=m.left+"px",r.maxHeight=$+"px",r.minWidth=m.width+"px",r.transformOrigin=`${W}px`}}))}]});function bc(e){let t=Ye();return f(Be("field",e,n=>t.next(n)),t)}function Bi(e){let t;return bc(e).switchMap(n=>g(e,"input").switchMap(r=>r?F(r):n?g(n,"input").switchMap(o=>o?F(t=o):T):t?F(t):T))}function Ht(e,t,n){return g(e,n).tap(r=>Rt(t,n,r))}var yc="display:block;border:0;padding:0;font:inherit;color:inherit;outline:0;width:100%;min-height:20px;background-color:transparent;text-align:start;white-space:pre-wrap;max-height:100%;resize:inherit;";function Wn({host:e,input:t,toText:n,toValue:r,update:o}){t.className="cxl-native-input",t.setAttribute("style",yc),t.setAttribute("form","__cxl_ignore__");function s(a){e.value=r?r(t.value||""):t.value,a.stopPropagation(),e.dispatchEvent(new Event(a.type,{bubbles:!0}))}function i(){let a=e.value,l=n?n(a,t.value):a||"";t.value!==l&&e.setInputValue(l)}function c(){t.ariaLabel=e.ariaLabel;let a=e.getAttribute("aria-labelledby");a?t.setAttribute("aria-labelledby",a):t.removeAttribute("aria-labelledby")}return f(Fe(e,t),Q(()=>(c(),t.form?E(t.form,"reset").tap(s):T)),g(e,"value").tap(()=>{n&&t.matches(":focus")||i()}),E(t,"blur").tap(i),E(t,"input").tap(s),E(t,"change").tap(s),Ht(e,t,"disabled"),Ht(e,t,"name"),Ht(e,t,"autocomplete"),Ht(e,t,"spellcheck"),Ht(e,t,"autofocus"),kn(e,["aria-label","aria-labelledby"]).tap(c),o?o.tap(i):T,E(t,"blur").tap(()=>e.dispatchEvent(new Event("blur"))),E(t,"focus").tap(()=>e.dispatchEvent(new Event("focus"))))}var Yn=class e extends gt{inputValue="";static{u(e,{init:[q("inputValue")],augment:[t=>(t.inputValue=t.inputEl.value,E(t.inputEl,"input").tap(()=>{t.inputValue=t.inputEl.value}))]})}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}get role(){return this.inputEl.role}get validationMessage(){return this.inputEl.validationMessage||""}get validity(){return this.inputEl.validity||null}set role(t){this.inputEl.role=t}focus(){this.inputEl.focus()}setAria(t,n){n?this.inputEl.setAttribute(`aria-${t}`,n):this.inputEl.removeAttribute(`aria-${t}`)}setInputValue(t){this.inputEl.value=t,this.inputValue=this.inputEl.value}applyValidity(t,n){he(this).setValidity({customError:t},n,this.inputEl),this.inputEl.setCustomValidity(t?n||"Invalid Field":"")}};var vc=[d(`
:host{display: block; flex-grow: 1; /*color: var(--cxl-color-on-surface);*/ position:relative;}
`),xe],zr=[...vc,D],$t=class e extends Yn{autofilled=!1;autocomplete;static{u(e,{init:[b("autofilled"),y("autocomplete")],augment:[t=>E(t.inputEl,"animationstart").tap(n=>{(n.animationName==="cxl-onautofillstart"||n.animationName==="cxl-onautofillend")&&(t.autofilled=n.animationName==="cxl-onautofillstart",ce(t,"focusable.change"),t.inputValue=t.inputEl.value)})]})}get selectionStart(){return this.inputEl.selectionStart}get selectionEnd(){return this.inputEl.selectionEnd}set selectionStart(t){this.inputEl.selectionStart=t}set selectionEnd(t){this.inputEl.selectionEnd=t}setSelectionRange(t,n){this.inputEl.setSelectionRange(t,n)}getWindowSelection(){return this.shadowRoot?.getSelection?.()||getSelection()}getOwnSelection(){let t=this.getWindowSelection();return!t||t.focusNode!==this.inputEl&&!this.inputEl.contains(t.focusNode)?void 0:t}},jt=class extends $t{value="";inputEl=N("input",{className:"input"})};u(jt,{tagName:"c-input-text",init:[y("value")],augment:[...zr,e=>e.append(e.inputEl),e=>Wn({host:e,input:e.inputEl})]});function wc(e){getComputedStyle(e).direction==="rtl"?e.scrollLeft=1e6:e.scrollLeft=e.scrollWidth}var xt=class e extends $t{selected;value;inputEl=N("input",{className:"input"});static{u(e,{tagName:"c-input-option",init:[y("value"),q("selected")],augment:[...zr,t=>t.append(t.inputEl),t=>Wn({host:t,input:t.inputEl,toText:()=>t.selected?.textContent??"",toValue:n=>n!==""?t.selected?.value:void 0}),t=>Y(t,"selected").tap(n=>{let r=t.selected?.textContent;t.value=n?.value,t.setInputValue(r??""),wc(t.inputEl)})]})}};function Ec(e){return Hr(e,"^")}function Hr(e,t=""){if(e==="")return()=>!0;let n=Sc(e,t);return r=>r.textContent?n.test(r.textContent):!1}function Sc(e,t="",n="i"){return new RegExp(t+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n)}var qn=class e extends h{optionView=ht;open=!1;debounce=100;options=[];matcher=Hr;static{u(e,{tagName:"c-autocomplete",init:[b("open"),In("debounce")],augment:[U("listbox"),Pi,pt,t=>{let n=N("slot",{name:"empty"}),r=N("div",{id:"menu",tabIndex:-1},N("slot"),n),o=Gn({viewBox:"0 0 24 24",id:"caret",d:"M7 10l5 5 5-5z",width:20,height:20,fill:"currentColor"});o.style.cursor="pointer",n.style.display="none";function s(a){t.open=!0,c(a)}function i(a,l){a?.setAria("activedescendant",Te(l)),l.rendered?.scrollIntoView({block:"nearest"})}function c(a){let l=a.inputValue??a.value,S=t.matcher==="substring"?Hr:t.matcher==="prefix"?Ec:t.matcher,m=l?S(String(l)):void 0,P=0;for(let R of t.options){let $=m?!m(R):!1;R.hidden=$,R.focused=!($||P++>0),R.focused&&i(a,R)}n.style.display=P?"none":""}return z(t).append(r,o),f(Bi(t).switchMap(a=>(a.setAria("autocomplete","list"),a.role="combobox",a.setAria("controls",Te(t)),a.setAria("haspopup",t.role),a.setAttribute("autocomplete","off"),f(g(t,"open").tap(l=>{if(l)o.tabIndex=-1,s(a);else{for(let S of t.options)S.focused=!1;o.tabIndex=0,a?.setAria("activedescendant",null)}a.setAria("expanded",String(l))}),f(An(o),E(o,"mousedown")).tap(l=>{l.preventDefault(),l.stopPropagation(),a.focus()}).debounceTime(100).tap(()=>{t.open=!0}),g(t,"debounce").switchMap(l=>E(a,"input").debounceTime(l).tap(()=>t.open?c(a):s(a))),E(t,"change").tap(l=>{l.target===t&&a.dispatchEvent(new Event("change",{bubbles:!0}))}),Br({host:t,target:r,input:a}),f(Or(t),Y(a,"value").map(l=>{for(let S of t.options)if(S.value===l)return S})).tap(l=>{for(let S of t.options)S.focused=S.selected=!1;l&&(l.selected=!0),a instanceof xt?a.selected=l:a&&(a.value=l?.value),t.open=!1})))))}]})}};var Xn=class extends h{};u(Xn,{tagName:"c-body",augment:[d(`
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
		`),D]});var Vt=class extends mt{};u(Vt,{tagName:"c-button-text",augment:[...Je,d(`
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
		`),ye,D]});function $r(e="block"){let t=(n=>{for(let r=12;r>0;r--)n.xl+=`:host([xl="${r}"]){display:${e};grid-column-end:span ${r};}`,n.lg+=`:host([lg="${r}"]){display:${e};grid-column-end:span ${r};}`,n.md+=`:host([md="${r}"]){display:${e};grid-column-end:span ${r};}`,n.sm+=`:host([sm="${r}"]){display:${e};grid-column-end:span ${r};}`,n.xs+=`:host([xs="${r}"]){display:${e};grid-column-end:span ${r};}`;return n})({xl:"",lg:"",md:"",sm:"",xs:""});return d(`
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
`)}var jr=d(`
:host([grow]) { flex-grow:1; flex-shrink: 1 }
:host([color]) { background-color: var(--cxl-color-surface); color: var(--cxl-color-on-surface); }
:host([fill]) { position: absolute; inset:0 }
:host([elevation]) { --cxl-color-on-surface: var(--cxl-color--on-surface); }
:host([elevation="0"]) { --cxl-color-surface: var(--cxl-color-surface-container-lowest); }
:host([elevation="1"]) { --cxl-color-surface: var(--cxl-color-surface-container-low); }
:host([elevation="2"]) { --cxl-color-surface: var(--cxl-color-surface-container); }
:host([elevation="3"]) { --cxl-color-surface: var(--cxl-color-surface-container-high); }
:host([elevation="4"]) { --cxl-color-surface: var(--cxl-color-surface-container-highest); }
${dt()}
${Xe.map(e=>`:host([pad="${e}"]){padding:${e}px}`).join("")}
${Xe.map(e=>`:host([vpad="${e}"]){padding-top:${e}px;padding-bottom:${e}px}`).join("")}`),bt=class extends h{grow=!1;fill=!1;xs;sm;md;lg;xl;pad;vpad;color;center=!1;elevation};u(bt,{init:[b("sm"),b("xs"),b("md"),b("lg"),b("xl"),b("vpad"),b("pad"),b("center"),b("fill"),b("grow"),b("elevation"),ft("color")]});var _e=class extends bt{};u(_e,{tagName:"c-c",augment:[jr,$r(),d(":host([center]) { text-align: center}"),D]});var Cc=d(`
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
${dt()}
`),Ut=class extends _e{variant};u(Ut,{tagName:"c-card",init:[b("variant")],augment:[Cc]});var kc=d(`
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
`);function Ac(e){return f(Be("list",e),g(e,"selected").tap(t=>e.ariaSelected=String(t)))}function Ur(e){return f(kr(e),Fe(e,e,-1),Ac(e))}var yt=class extends h{disabled=!1;touched=!1;selected=!1};u(yt,{init:[b("disabled"),b("touched"),b("selected")],augment:[Ur]});var Vr=class extends yt{size};u(Vr,{tagName:"c-item",init:[be("size",e=>`{min-height:${56+e*8}px}`)],augment:[kc,xe,Ln,U("option"),D,ye]});var Gt=class extends Ut{disabled=!1;touched=!1;selected=!1};u(Gt,{tagName:"c-card-item",init:[b("disabled"),b("touched"),b("selected")],augment:[U("option"),...Je,d(`
:host([variant=outlined]:hover) { box-shadow: var(--cxl-elevation-1) }
:host([variant=elevated]) { color: var(--cxl-color-on-surface); }
		`),Ur,ye]});var Yt=class extends h{disabled=!1;touched=!1;selected=!1;color;size=0};u(Yt,{tagName:"c-chip",init:[b("disabled"),b("touched"),b("selected"),ft("color","surface-container-low"),be("size",e=>`{
			padding: 2px ${e<0?2:8}px;
			font-size: ${14+e*2}px;
			height: ${32+e*6}px;
		}`)],augment:[U("button"),Ar,...Je,d(`
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
		`),ye,()=>N("slot",{name:"leading"}),D,()=>N("slot",{name:"trailing"})]});function zi(e){let t=e.target;if(t)return typeof t=="string"?t.split(" ").flatMap(n=>{let r=Vn(e,n);return r?[r]:[]}):Array.isArray(t)?t:[t]}function Mc(e,t,n,r,o=E(e,"click").map(()=>!n())){return f(r,o).switchMap(s=>{let i=t();return i?En(i.map(c=>({target:c,open:s}))):T})}function Yr(e,t=e){function n(s,i){return[g(e,"open").switchMap(c=>(s.parentNode||Pe.popupContainer.append(s),c&&s instanceof h?Y(s,"open").map(a=>{e.open&&a===!1&&(e.open=!1)}):T)),Uo(s).tap(c=>{let a=s.getAttribute("role");(a==="menu"||a==="listbox"||a==="tree"||a==="grid"||a==="dialog")&&(i.ariaHasPopup=a),i.getRootNode()===s.getRootNode()&&i.setAttribute("aria-controls",c)})]}let r=oe(g(e,"trigger"),g(e,"target")).switchMap(([s])=>{let i=zi(e),c=i?f(...i.flatMap(a=>n(a,e))).ignoreElements():T;return f(s==="hover"?oe(vr(t),i?f(...i.map(a=>vr(a))):T).map(a=>!!a.find(l=>!!l)).debounceTime(250):s==="checked"?E(t,"change").map(a=>a.target&&"checked"in a.target?!!a.target.checked:!1):E(t,"click").map(()=>!e.open),c)}),o;return Oo().switchMap(()=>Mc(t,()=>zi(e),()=>e.open,g(e,"open"),r).filter(s=>{let{open:i,target:c}=s;if(e.open!==i){if(i)o=We(e)?.activeElement,c.trigger=e;else if(c.trigger&&c.trigger!==e)return s.open=!0,c.trigger=e,!0;return e.open=i,!1}if(!i&&c.trigger===e){let a=document.activeElement;(a===document.body||a===document.documentElement)&&o?.focus()}return!0}))}var Jn=class extends h{open=!1;target;trigger};u(Jn,{init:[y("target"),y("trigger"),b("open")],augment:[e=>Yr(e).raf(({target:t,open:n})=>t.open=n)]});var Gr=class extends Jn{};u(Gr,{tagName:"c-toggle",augment:[pt,D]});var ze;function Hi(e){if(e==="0s"||e==="auto")return;let t=e.endsWith("ms")?1:1e3;return parseFloat(e)*t}function Nc(e){return e==="infinite"?1/0:+e}function Tc(e){if(ui(e))return{animation:e};let t=e.startsWith("auto ");t&&(e="0s "+e.slice(5));let n={},r;e=e.replace(/stagger:(\d+)|composition:(\w+)/g,(c,a,l)=>(a&&(r=+a),l&&(n.composite=l),"")),ze??=document.createElement("style").style,ze.animation=e,n.fill=ze.animationFillMode;let o=n.fill==="forwards"||n.fill==="both",s=t?void 0:Hi(ze.animationDuration);s!==void 0&&(n.duration=s);let i=Hi(ze.animationDelay);return i!==void 0&&(n.delay=i),ze.animationIterationCount&&(n.iterations=Nc(ze.animationIterationCount)),{animation:ze.animationName,keep:o,stagger:r,options:n}}function Rc(e){return typeof e=="string"&&(e=e.split(",").map(t=>Tc(t.trim()))),e}function Wr(e,t,n,r){let o=r?`motion-${r}-on`:"motion-on",s=Rc(n);return e.setAttribute(o,""),f(...s.map(i=>pi({target:t,...i}))).finalize(()=>e.removeAttribute(o))}var Wt=class extends h{center=!1};u(Wt,{tagName:"c-backdrop",init:[b("center")],augment:[d(`
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

	`),e=>E(e,"keydown").tap(t=>t.stopPropagation()),D]});var $i=d(":host(:not([open],[motion-out-on])){display:none}");function Xr(e,t=()=>e,n=!1){let r=Q(()=>F(t("in"))),o=Q(()=>F(t("out")));return f(ue(e,"toggle.close").tap(()=>e.open=!1).ignoreElements(),oe(g(e,"motion-in").map(s=>s?r.switchMap(i=>Wr(e,i,s,"in")).switchMap(()=>e.duration!==void 0&&e.duration!==1/0?Ge(e.duration).map(()=>e.open=!1):T):r),g(e,"motion-out").map(s=>(s?o.switchMap(i=>Wr(e,i,s,"out").ignoreElements()):o).finalize(()=>{e.open||e.dispatchEvent(new Event("close"))}))).switchMap(([s,i])=>Y(e,"open").switchMap(c=>{if(e.popover!=="auto"){let a=c?"open":"closed";e.dispatchEvent(new ToggleEvent("toggle",{oldState:c?"closed":"open",newState:a}))}return c?n?ke(i,s):s:n?ke(i,s):i})))}var vt=class extends h{open=!1;duration;"motion-in";"motion-out"};u(vt,{init:[y("motion-in"),y("motion-out"),In("duration"),b("open")]});var qr=class extends vt{};u(qr,{tagName:"c-toggle-target",augment:[d(`
:host{display:contents}
`),e=>{let t=N("slot"),n=N("slot",{name:"off"});return(e.open?n:t).style.display="none",z(e).append(t,n),Xr(e,r=>{t.style.display=n.style.display="none";let o=e.open?r==="in"?t:n:r==="in"?n:t;return o.style.display="",o.assignedElements()},!0)}]});var qt=class extends vt{};u(qt,{tagName:"c-toggle-panel",augment:[D,$i,Xr]});var _c=d(`
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
`),Zn=class extends h{open=!1;position;responsive;permanent=!1};u(Zn,{tagName:"c-drawer",init:[b("open"),b("position"),y("responsive"),y("permanent")],augment:[_c,d(`
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
`),e=>{let t=ie(!1),n=f(g(e,"position"),t).raf(),r=()=>e.position==="right"||getComputedStyle(e).direction==="rtl",o=N(qt,{id:"drawer","motion-in":n.map(()=>e.permanent&&t.value?void 0:r()?"slideInRight":"slideInLeft"),"motion-out":n.map(()=>e.permanent&&t.value?void 0:r()?"slideOutRight":"slideOutLeft")},D),s=new Wt;s.id="backdrop";let i=N("dialog",{id:"dialog"},s,o);return z(e).append(i),f(E(o,"close").tap(()=>i.close()),E(i,"close").tap(()=>e.open=!1),Y(o,"open").tap(c=>e.open=c),Y(e,"open").raf(c=>{c||o.scrollTo(0,0)}),E(s,"click").tap(()=>e.open=!1),E(i,"cancel").tap(c=>{c.preventDefault(),e.open=!1}),g(e,"open").tap(c=>{if(t.value&&e.permanent)return o.open=!0;c?t.value||(Pe.openModal({element:i,close:()=>e.open=!1}),i.getBoundingClientRect()):Pe.currentModal?.element===i&&Pe.modalClosed()}).raf(c=>{o.open=c}),g(e,"responsive").switchMap(c=>c!==void 0?Fn(document.body):F("xsmall")).switchMap(c=>{let a=J.breakpoints[e.responsive||"large"],l=J.breakpoints[c]>=a;return t.next(l),l&&o.className!=="permanent"?i.close():!l&&o.className==="permanent"&&(e.open=!1),l&&e.open===!1&&(e.open=e.permanent),e.toggleAttribute("responsiveon",l),o.className=l?"permanent":"drawer",Y(e,"open").tap(S=>{e.hasAttribute("responsiveon")||Re({target:s,animation:S?"fadeIn":"fadeOut",options:{fill:"forwards"}})})}))}]});var Qn=class{start=new Comment("marker-start");end=new Comment("marker-end");frag=document.createDocumentFragment();insert(t,n=this.end){let r=this.end.parentNode;r&&(this.start.parentNode||r.insertBefore(this.start,this.end),Array.isArray(t)?(this.frag.append(...t),r.insertBefore(this.frag,n)):r.insertBefore(t,n))}empty(){let t=this.start.nextSibling;for(;t&&t!==this.end;){let n=t.nextSibling;t.remove(),t=n}}};function Dc({source:e,render:t,empty:n,append:r,loading:o}){let s=[],i=document.createDocumentFragment(),c,a;function l(S){if(a?.parentNode?.removeChild(a),!S)return;let m=0;for(let R of S){let $=s[m]?.item;if($)$.value!==R&&$.next(R);else{let W=ie(R),ae=t(W,m,S),te=ae instanceof DocumentFragment?Array.from(ae.childNodes):[ae];s.push({elements:te,item:W}),i.append(ae)}m++}i.childNodes.length&&r(i),c?.remove(),m===0&&n&&r(c=n());let P=s.length;for(;P-- >m;)s.pop()?.elements.forEach(R=>R.remove())}return Q(()=>(a=o?.(),a&&r(a),e.raf(l)))}function Ke(e){return zo(()=>{let t=new Qn;return[Dc({...e,append:t.insert.bind(t)}),t.end]})}var et=class extends Qe{};u(et,{tagName:"c-field-bar",augment:[Fr,d(`
:host {
	box-sizing: border-box;
	${re("surface-container-high")}
	${B("body-large")}
	border-radius: var(--cxl-shape-corner-xlarge);
}
.content { padding: 4px 12px; }
		`)]});var tt=class extends bt{vflex=!1;gap;middle=!1};u(tt,{tagName:"c-flex",init:[b("vflex"),b("gap"),b("middle")],augment:[$r("flex"),jr,d(`
:host([middle]) { align-items: center; }
:host([center]) { justify-content: center; }
:host([vflex]) { flex-direction: column; }
:host([vflex][middle]) { justify-content: center; align-items: normal }
:host([vflex][center]) { align-items: center; }
${Xe.map(e=>`:host([gap="${e}"]){gap:${e}px}`).join("")}
	`),D]});function Ic(e){return jn("list",e,e.items)}function ji(e){return Di({host:e,getFocusable:()=>e.items,getSelected:()=>e.items.find(t=>t.selected),getActive:()=>e.items.find(t=>t.matches(":focus,:focus-within")),observe:Ic(e)})}function Vi(e){return Ii({getFocusable:()=>e.items,getActive:()=>Ir(e)})}function Oc(e){let t=Vi(e);function n(r){return Math.round(r.getBoundingClientRect().left)}return f(ji(e),Bt({host:e,goRight:()=>t(1),goLeft:()=>t(-1),goFirst:()=>t(1,-1),goLast:()=>t(-1,e.items.length),goUp:()=>{let r=We(e)?.activeElement,o=r&&n(r);return t(-1,void 0,o!==void 0?s=>n(s)!==o:void 0)},goDown:()=>{let r=We(e)?.activeElement,o=r&&n(r);return t(1,void 0,o!==void 0?s=>n(s)!==o:void 0)}}).tap(r=>r.focus()))}var Xt=class extends h{items=[]};u(Xt,{tagName:"c-grid-list",augment:[U("grid"),d(":host{display:grid;box-sizing:border-box;}"),D,Oc]});var Kn=class extends h{pad;vertical=!1};u(Kn,{tagName:"c-hr",init:[b("pad"),b("vertical")],augment:[U("separator"),d(`
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
${Xe.map(e=>`:host([pad="${e}"]){margin:${e}px 0;}`).join("")}`)]});function Zr(e){let t=document.createElement("style");return f(K(n=>{let r=e.persistkey&&Rr.get(e.persistkey);r!==void 0?e.open=r===e.themeon:e.usepreferred&&(e.open=matchMedia?.("(prefers-color-scheme: dark)").matches),n.signal.subscribe(()=>t.remove())}),Oe(e).raf(()=>{e.setAttribute("aria-pressed",String(e.open));let n=e.open?e.themeon:e.themeoff;e.persistkey&&Rr.set(e.persistkey,n),ii(ni[n]||n)}),X(e).tap(()=>e.open=!e.open))}var Jr=class extends h{open=!1;usepreferred=!1;persistkey="";themeoff="";themeon="./theme-dark.js"};u(Jr,{tagName:"c-toggle-theme",init:[y("persistkey"),y("usepreferred"),y("open"),y("themeon"),y("themeoff")],augment:[U("group"),Zr]});var Jt=class extends ve{open=!1;usepreferred=!1;persistkey="";iconon="wb_sunny";iconoff="dark_mode";themeoff="";themeon="./theme-dark.js"};u(Jt,{tagName:"c-icon-toggle-theme",init:[y("persistkey"),y("usepreferred"),y("open"),y("themeon"),y("themeoff")],augment:[Zr,e=>oe(g(e,"iconon"),g(e,"iconoff"),g(e,"open")).tap(()=>e.icon=e.open?e.iconon:e.iconoff)]});var Lc=()=>{let e;function t(){let n=document.adoptedStyleSheets.indexOf(e);n!==-1&&document.adoptedStyleSheets.splice(n,1)}addEventListener("message",n=>{let{theme:r}=n.data;t(),r!==void 0&&(e=new CSSStyleSheet,e.replace(r),document.adoptedStyleSheets.push(e))})},Fc=()=>{let e=()=>{let t=()=>{parent.postMessage({height:document.documentElement.scrollHeight},"*")};requestAnimationFrame(async()=>{await document.fonts.ready,new ResizeObserver(t).observe(document.documentElement)})};document.readyState==="complete"?e():addEventListener("load",e)},Zt=class extends h{src="";srcdoc="";sandbox="allow-forms allow-scripts";reset="<!DOCTYPE html><style>html{display:flex;flex-direction:column;font:var(--cxl-font-default);}body{padding:0;margin:0;translate:0;overflow:auto;}</style>";handletheme=!0};u(Zt,{tagName:"c-iframe",init:[y("src"),y("srcdoc"),y("sandbox"),y("handletheme")],augment:[d(`
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
	`),e=>{let t=C("iframe",{loading:"lazy"}),n=C("slot",{name:"loading"}),r=new CSSStyleSheet;e.shadowRoot?.adoptedStyleSheets.push(r),n.style.display="none";function o(i){r.replaceSync(":host{height:"+i+"px}"),t.style.height="100%",t.style.opacity="1",n.style.display="none"}function s(i){if(i){let c=`<script type="module">
(${Fc.toString()})();
(${Lc.toString()})();
<\/script>`;t.srcdoc=`${e.reset}${i}${c}`,n.style.display=""}}return z(e).append(t,n),f(oe(g(e,"srcdoc"),g(e,"src")).raf(async([i,c])=>{s(c?`<base href="${c}" />`+await fetch(c).then(a=>a.text()):i)}),E(window,"message").tap(i=>{let{height:c}=i.data;i.source===t.contentWindow&&c!==void 0&&o(c)}),g(e,"handletheme").switchMap(i=>i?E(t,"load").switchMap(()=>_t.raf(c=>{let a=c?.css??"";t.contentWindow?.postMessage({theme:a},"*")})):T),g(e,"sandbox").tap(i=>i===void 0?t.removeAttribute("sandbox"):t.sandbox.value=i))}]});var er=class extends h{};u(er,{tagName:"c-nav-headline",augment:[d(`
:host{
	color:var(--cxl-color-on-surface-variant);
	font:var(--cxl-font-title-small);
	letter-spacing:var(--cxl-letter-spacing-title-small);
	min-height:48px;
	display:flex;
	align-items: center;
	padding: 0 16px;
}
`),D]});var Pc=[d(`
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
${Dt("c-ripple")}
	`),xe,di,D],nt=class extends yt{size};u(nt,{tagName:"c-nav-item",init:[be("size",e=>`{min-height:${56+e*8}px}`)],augment:[U("option"),...Pc]});var Qt=class extends ve{open=!1;target;icon="menu"};u(Qt,{tagName:"c-navbar-toggle",init:[y("target"),q("open")],augment:[e=>Yr(e).tap(({target:t,open:n})=>t.open=n)]});function Ui(e){return f(g(e,"selected").pipe(jo(e,"selected")),Be("selectable",e),X(e).tap(()=>ce(e,"selectable.action",e)))}var Kt=class extends h{value;view;selected=!1;hidden=!1;focused=!1;rendered;focus(){this.rendered?.focus()}};u(Kt,{tagName:"c-option",init:[y("value"),q("view"),b("selected"),b("hidden"),b("focused")],augment:[U("option"),d(":host{display:contents} :host([hidden]){display:none;}"),Ri,Ui,e=>{let t;return f(g(e,"view").switchMap(n=>n?(t?.remove(),e.rendered=t=new n,t.appendChild(N("slot")),z(e).append(t),f(g(e,"selected").tap(r=>t?.toggleAttribute("selected",r)),g(e,"focused").tap(r=>t?.toggleAttribute("focused",r)))):(e.rendered=t=void 0,T)))}]});var tr=class extends h{};u(tr,{tagName:"c-page",augment:[$n,d(`
:host {
	box-sizing:border-box;
	display: flex;
	flex-direction: column;
	/* height:100% affects sticky appbar positioning */
	min-height: 100vh;
	padding-top: 0; padding-bottom: 0;
	${re("background")}
}`),D]});var en=class extends h{xs=!1;sm=!1;md=!1;lg=!1;xl=!1};u(en,{tagName:"c-r",init:[b("xl"),b("lg"),b("md"),b("sm"),b("xs")],augment:[d(`
:host([xs]),:host { display:contents }
:host([xs="0"]) { display:none }
${V("small",':host([sm]){display:contents}:host([sm="0"]){display:none}')}
${V("medium",':host([md]){display:contents}:host([md="0"]){display:none}')}
${V("large",':host([lg]){display:contents}:host([lg="0"]){display:none}')}
${V("xlarge",':host([xl]){display:contents}:host([xl="0"]){display:none}')}
	`),D]});var Bc=/([^&=]+)=?([^&]*)/g,zc=/:([\w_$@]+)/g,Hc=/\/\((.*?)\)/g,$c=/(\(\?)?:\w+/g,jc=/\*\w+/g,Vc=/[-{}[\]+?.,\\^$|#\s]/g,Uc=/([^#]*)(?:#(.+))?/,oo="@@cxlRoute",pe={location:window.location,history:window.history};function Gc(e){let t=[];return[new RegExp("^/?"+e.replace(Vc,"\\$&").replace(Hc,"\\/?(?:$1)?").replace($c,function(r,o){return t.push(r.substr(1)),o?r:"([^/?]*)"}).replace(jc,"([^?]*?)")+"(?:/$|\\?|$)"),t]}function Gi(e){return e[0]==="/"&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e}function Qr(e,t){return t?e.replace(zc,(n,r)=>t[r]||""):e}function Yc(e){let t={},n;for(;n=Bc.exec(e);)t[n[1]]=decodeURIComponent(n[2]);return t}var Kr=class{path;regex;parameters;constructor(t){this.path=t=Gi(t),[this.regex,this.parameters]=Gc(t)}_extractQuery(t){let n=t.indexOf("?");return n===-1?{}:Yc(t.slice(n+1))}getArguments(t){let n=this.regex.exec(t),r=n&&n.slice(1);if(!r)return;let o=this._extractQuery(t);return r.forEach((s,i)=>{let c=i===r.length-1?s||"":s?decodeURIComponent(s):"";o[this.parameters[i]]=c}),o}test(t){return this.regex.test(t)}toString(){return this.path}},eo=class{id;path;parent;redirectTo;definition;isDefault;constructor(t){if(t.path!==void 0)this.path=new Kr(t.path);else if(!t.id)throw console.log(t),new Error("An id or path is mandatory. You need at least one to define a valid route.");this.id=t.id||(t.path??`route${Math.random().toString()}`),this.isDefault=t.isDefault||!1,this.parent=t.parent,this.redirectTo=t.redirectTo,this.definition=t}create(t){let n=this.definition.render();n[oo]=this;for(let r in t)t[r]!==void 0&&(n[r]=t[r]);return n}},to=class{routes=[];defaultRoute;findRoute(t){return this.routes.find(n=>n.path?.test(t))??this.defaultRoute}get(t){return this.routes.find(n=>n.id===t)}register(t){if(t.isDefault){if(this.defaultRoute)throw new Error("Default route already defined");this.defaultRoute=t}this.routes.unshift(t)}};function Wc(e){return e[oo]}function wt(e){let t=Uc.exec(e);return{path:Gi(t?.[1]||""),hash:t?.[2]||""}}var qc={getHref(e){return e=typeof e=="string"?wt(e):e,`${pe.location.pathname}${e.path?`?${e.path}`:""}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=pe.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&pe.history.pushState({url:e},"",n)}},deserialize(){return{path:pe.location.search.slice(1),hash:pe.location.hash.slice(1)}}},Xc={getHref(e){return e=typeof e=="string"?wt(e):e,`${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=pe.history.state?.url;if(!t||e.hash!==t.hash||e.path!==t.path){let n=this.getHref(e);n!==`${location.pathname}${location.search}${location.hash}`&&pe.history.pushState({url:e},"",n||"/")}},deserialize(){return{path:pe.location.pathname,hash:pe.location.hash.slice(1)}}},Yi={getHref(e){return e=typeof e=="string"?wt(e):e,`#${e.path}${e.hash?`#${e.hash}`:""}`},serialize(e){let t=Yi.getHref(e);pe.location.hash!==t&&(pe.location.hash=t)},deserialize(){return wt(pe.location.hash.slice(1))}},Wi={hash:Yi,path:Xc,query:qc},no=class{callbackFn;state;routes=new to;instances={};root;lastGo;constructor(t){this.callbackFn=t}getState(){if(!this.state)throw new Error("Invalid router state");return this.state}route(t){let n=new eo(t);return this.routes.register(n),n}go(t){this.lastGo=t;let n=typeof t=="string"?wt(t):t,r=n.path,o=this.state?.url;if(r!==o?.path){let s=this.routes.findRoute(r);if(!s)throw new Error(`Path: "${r}" not found`);let i=s.path?.getArguments(r);if(s.redirectTo)return this.go(Qr(s.redirectTo,i));let c=this.execute(s,i);if(this.lastGo!==t)return;if(!this.root)throw new Error(`Route: "${r}" could not be created`);this.updateState({url:n,arguments:i,route:s,current:c,root:this.root})}else this.state&&n.hash!=o?.hash&&this.updateState({...this.state,url:n})}getPath(t,n){let r=this.routes.get(t),o=r&&r.path;return o&&Qr(o.toString(),n)}isActiveUrl(t){let n=wt(t);if(!this.state?.url)return!1;let r=this.state.url;return!!Object.values(this.instances).find(o=>{let s=o[oo],i=this.state?.arguments;if(s?.path?.test(n.path)&&(!n.hash||n.hash===r.hash)){if(i){let c=s.path.getArguments(n.path);for(let a in c)if(i[a]!=c[a])return!1}return!0}return!1})}updateState(t){this.state=t,this.callbackFn?.(t)}findRoute(t,n){let r=this.instances[t],o;if(r)for(o in n){let s=n[o];s!==void 0&&(r[o]=s)}return r}executeRoute(t,n,r){let o=t.parent,s=o&&this.routes.get(o),i=t.id,c=s&&this.executeRoute(s,n,r),a=this.findRoute(i,n)||t.create(n);return c?a&&a.parentNode!==c&&c.appendChild(a):this.root=a,r[i]=a,a}discardOldRoutes(t){let n=this.instances;for(let r in n){let o=n[r];t[r]!==o&&(o.parentNode?.removeChild(o),delete n[r])}}execute(t,n){let r={},o=this.executeRoute(t,n||{},r);return this.discardOldRoutes(r),this.instances=r,o}},tn=new at,qi=new at,Ee=new no(()=>tn.next());function Jc(e,t=Wi.query){return f(K(()=>qi.next(t)),e.tap(()=>Ee.go(t.deserialize())),tn.tap(()=>t.serialize(Ee.getState().url))).catchError(n=>{if(n?.name==="SecurityError")return T;throw n})}function Zc(){return ke(F(location.hash.slice(1)),E(window,"hashchange").map(()=>location.hash.slice(1)))}var nr;function Qc(){if(!nr){nr=new At(history.state);let e=history.pushState;history.pushState=function(...t){let n=e.apply(this,t);return history.state&&(history.state.lastAction="push"),nr.next(history.state),n}}return f(E(window,"popstate").map(()=>(history.state&&(history.state.lastAction="pop"),history.state)),nr)}function Kc(){let e;return f(Zc(),Qc()).map(()=>window.location).filter(t=>{let n=t.href!==e;return e=t.href,n})}var Bg=tn.raf().map(()=>{let e=[],t=Ee.getState(),n=t.current;do n.routeTitle&&e.unshift({title:n.routeTitle,first:n===t.current,path:el(n)});while(n=n.parentNode);return e});function el(e){let t=Wc(e);return t&&Qr(t.path?.toString()||"",Ee.state?.arguments||{})}function Xi(e,t,n=t){return f(oe(qi,Oe(e)).tap(([r])=>{e.href!==void 0&&(t.href=e.external?e.href:r.getHref(e.href)),t.target=e.target||""}),X(t).tap(r=>{e.target||r.preventDefault()}),X(n).tap(()=>{e.href!==void 0&&!e.target&&(e.external?location.assign(e.href):Ee.go(e.href))}))}function tl(e,t){let n=document.createElement("div");return n.style.display="contents",n.routeTitle=t,n.appendChild(e.content.cloneNode(!0)),n}var ro=class extends h{strategy="query";get state(){return Ee.state}go(t){return Ee.go(t)}};u(ro,{tagName:"c-router",init:[y("strategy")],augment:[e=>{function t(n){let r=n.dataset;if(r.registered)return;r.registered="true";let o=r.title||void 0;Ee.route({path:r.path,id:r.id||void 0,parent:r.parent||void 0,isDefault:n.hasAttribute("data-default"),redirectTo:r.redirectto,render:tl.bind(null,n,o)})}return Ne().switchMap(()=>{for(let n of Array.from(e.children))n instanceof HTMLTemplateElement&&t(n);return f(Cn(e).tap(n=>{n.type==="added"&&n.value instanceof HTMLTemplateElement&&t(n.value)}),g(e,"strategy").switchMap(n=>{let r=Wi[n];return Jc(Kc(),r).catchError((o,s)=>(console.error(o),s))}))})}]});function ao(e,t=e){return f(nl(e,t).ignoreElements(),tn.map(()=>e.href!==void 0&&Ee.isActiveUrl(e.href)))}function nl(e,t=e){let n=N("a",{tabIndex:-1,className:"link",ariaLabel:"link"});return n.style.cssText=`
text-decoration: none;
outline: 0;
display: block;
position: absolute;
left: 0;
right: 0;
bottom: 0;
top: 0;
	`,z(e).append(n),f(Xi(e,n),E(n,"click").tap(r=>{r.stopPropagation(),Tt(r)||e.dispatchEvent(new PointerEvent(r.type,r)),ce(e,"toggle.close",void 0)}),X(t).tap(r=>{Tt(r)&&n.click()}))}var io=class extends h{href};u(io,{tagName:"c-router-selectable",init:[y("href")],augment:[pt,()=>N("slot"),e=>Q(()=>{let t=e.parentElement;return ao(e,t).raf(n=>{t.selected=n})})]});var nn=class extends nt{href;external=!1;target};u(nn,{tagName:"c-router-item",init:[y("href"),y("external"),y("target")],augment:[e=>ao(e).tap(t=>{e.selected=t})]});var Se=class extends h{font};u(Se,{tagName:"c-t",init:[b("font")],augment:[d(`:host{display:inline-block;font:var(--cxl-font-body-medium);}${Qo.map(e=>`:host([font="${e}"]){font:var(--cxl-font-${e});letter-spacing:var(--cxl-letter-spacing-${e})}`).join("")}
:host([font=h1]) { ${B("display-large")} display:block;margin-top: 64px; margin-bottom: 24px; }
:host([font=h2]) { ${B("display-medium")} display:block;margin-top: 56px; margin-bottom: 24px; }
:host([font=h3]) { ${B("display-small")} display:block; margin-top: 48px; margin-bottom: 16px; }
:host([font=h4]) { ${B("headline-medium")} display:block; margin-top: 40px; margin-bottom: 16px; }
:host([font=h5]) { ${B("title-large")} display:block;margin-top: 32px; margin-bottom: 12px; }
:host([font=h6]) { ${B("title-medium")} display:block;margin-top: 24px; margin-bottom: 8px; }
:host([font=h1]:first-child),:host([font=h2]:first-child),:host([font=h3]:first-child),:host([font=h4]:first-child),:host([font=h5]:first-child),:host([font=h6]:first-child){margin-top:0}
			`),D,e=>g(e,"font").tap(t=>{switch(t){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":e.role="heading",e.ariaLevel=t.slice(1);break;default:e.role=e.ariaLevel=null}})]});var rn=class extends tt{};u(rn,{tagName:"c-toolbar",augment:[d(`
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
		`)]});var on=class extends h{};u(on,{tagName:"doc-search",augment:[d(""),e=>{let t=ie([]),n=C(qn,{},Ke({source:t,render:s=>C(Kt,{value:s.value.href},s.value.name),empty:()=>C(_e,{slot:"empty",pad:16},"No Results Found")}));n.style.maxHeight="50%";let r=C(et,{size:-2},C(le,{name:"search"}),C(xt,{$:s=>g(s,"selected").tap(i=>{!CONFIG.spa&&i?.value&&(location.href=i.value)})}),n);function o(){t.next(CONFIG.symbols)}return e.shadowRoot?.append(r),Ne().tap(o)}]});var so=class extends It{sticky=!0};u(so,{tagName:"doc-appbar",augment:[e=>{e.append(C(rn,{id:"appbar-toolbar"},C(Qt,{target:"navbar"}),C(tt,{grow:!0},CONFIG.packageName),C(on),C(Jt,{persistkey:"3doc.theme"})))}]});var co=class extends h{};u(co,{tagName:"doc-card",augment:[d(`
:host{
	margin-top: 16px;
	display:block;
	elevation:1;
	scroll-margin-top: 80px;
}
:host(:target) {
	outline: 2px dashed var(--cxl-color-primary);
}
${V("medium",":host{padding:16px}")}
		`),()=>C("slot")]});var ha=Ba(ga(),1);var cn=ha.default;function xa(e){let t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r=/[\p{L}0-9._:-]+/u,o={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},s={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},i=e.inherit(s,{begin:/\(/,end:/\)/}),c=e.inherit(e.APOS_STRING_MODE,{className:"string"}),a=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:r,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[o]},{begin:/'/,end:/'/,contains:[o]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[s,a,c,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[s,i,a,c]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},o,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[a]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}cn.registerLanguage("html",xa);var bo=class extends h{formatter=t=>'<link rel="stylesheet" href="hljs.css" /><code style="white-space:pre;min-height:100%;font:var(--cxl-font-code);tab-size:2;">'+cn.highlight(t,{language:"html"}).value+"</code>"};u(bo,{tagName:"doc-hl",augment:[d(`
:host { display: block; }
.hljs { white-space: pre-wrap; font: var(--cxl-font-code); padding:16px; }
	`),e=>{let t=C("div",{className:"hljs"});return t.style.tabSize="4",z(e).append(t),Ne().switchMap(()=>Tn(e).raf(()=>{let n=e.childNodes[0]?.textContent?.trim()||"";n&&e.formatter&&(n=e.formatter(n)),t.innerHTML=n}))}]});var yo=class extends h{};u(yo,{tagName:"doc-grd",augment:[d(`:host {
	padding: 8px 16px;
	display: grid;
	gap: 16px 12px;
}
${V("small",":host{grid-template-columns:repeat(2, minmax(0px,1fr))}")}
${V("medium",":host{grid-template-columns:repeat(3, minmax(0px,1fr))}")}
${V("large",":host{grid-template-columns:repeat(4, minmax(0px,1fr))}")}
`),D]});var ln=class extends h{summary;selected};u(ln,{tagName:"doc-nav-list",init:[q("summary"),q("selected")],augment:[e=>Ke({source:g(e,"summary").map(t=>t?.index),render:t=>C(nt,{$:n=>X(n).tap(()=>e.selected=t.value.name),size:-2},t.value.name,t.value.docs?.beta?C(Yt,{size:-2},"beta"):void 0)})(e)]});var un=class extends h{view="mobile";header="<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>";libraries;formatter;getLibraryUrl(t){return`https://cdn.jsdelivr.net/npm/${t}`}};u(un,{tagName:"doc-demo-bare",init:[y("view"),y("libraries"),y("header")],augment:[d(`
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
	`),e=>{let t=g(e,"view"),n=ie("container"),r=C(Zt,{className:n}),o=C(lt,{$:m=>Me(m).tap(()=>{e.formatter?m.innerHTML=e.formatter(a):m.innerText=a}),className:t.map(m=>m==="source"?"source visible hljs":"source")}),s=C(Vt,{$:m=>X(m).tap(()=>e.view="source"),className:g(e,"view").map(m=>m==="source"?"hide":""),title:"See source"},C(le,{name:"code"}),"Code"),i=C(ve,{$:m=>X(m).tap(()=>e.view="mobile"),height:20,className:g(e,"view").map(m=>m==="source"?"":"hide"),icon:"close",title:"Close source"}),c=C("div",{id:"toolbar"},C("slot",{name:"toolbar"}),C(ve,{$:m=>X(m).tap(async()=>{await navigator.clipboard.writeText(a),m.icon="done",setTimeout(()=>m.icon="content_copy",2e3)}),height:20,icon:"content_copy",title:"Copy source to clipboard",className:t.map(m=>m==="source"?"icon":"icon hide")}),s,i),a;function l(m){let P=m==="desktop";n.next(P?"container":"container cmobile")}function S(){let m=e.childNodes[0]?.textContent?.trim()||"";if(!m)return;let P=e.libraries?e.libraries.split(",").map(R=>`<script type="module" src="${e.getLibraryUrl(R)}"><\/script>`).join(""):"";r.srcdoc=`${e.header}${P}${m}`,a=m}return z(e).append(c,C(lt,{className:t.map(m=>m==="source"?"parent":`parent visible ${m}`)},r),o),f(g(e,"view").tap(l),Me(e).switchMap(()=>Tn(e).raf(S)))}]});var pn=class extends un{header=`<style>html{overflow:hidden;color: var(--cxl-color-on-background);background-color:var(--cxl-color-background)}</style>${CONFIG.demoStyles?`<style>${CONFIG.demoStyles}</style>`:""}${CONFIG.demoScripts?.map(t=>`<script type="module" src="${t}"><\/script>`).join("")??""}`;formatter=t=>'<link rel="stylesheet" href="hljs.css" />'+cn.highlight(t,{language:"html"}).value};u(pn,{tagName:"doc-demo"});function ya(e){let t=e.index;function n(c){if(!(!c||typeof c=="string")&&typeof c=="number")return t.find(a=>a.id===c)}function r(c){if(!(!c||typeof c=="string")){if(typeof c=="number"){let a=t.find(l=>l.id===c);return a&&(a.kind===4||a.kind===8)?a:a?r(a.resolvedType??a.type):void 0}return c.kind===6?n(c.type):c.resolvedType&&typeof c.resolvedType!="string"?c.resolvedType:c}}function o(c,a){if(c.children){for(let l of c.children)!l.name||l.flags&&l.flags&128||(a[l.name]??=l);return a}}function s(c,a={}){o(c,a);let l=r(c.type);if(l?.children)for(let S of l.children){let m=r(S);if(!m||m.kind!==35||m.name==="Component")break;s(m,a)}return a}function i(c){return c.kind===17||c.kind===16||c.kind===11||c.kind===13}return{getNodeProperties:s,getTypeSummary:r,isFunction:i,getRef:n,json:e}}var Wl={31:"Constants",1:"Variables",4:"Interfaces",8:"Classes",10:"Properties",11:"Methods",12:"Getters",13:"Setters",14:"Constructor",16:"Functions",22:"Enums",35:"Components",36:"Attributes",2:"Type Alias",38:"Call Signature",39:"Construct Signature",44:"Events",24:"Index Signature",25:"Exports",37:"Namespaces"};function va(e){return typeof e=="string"?e:e.map(t=>t.value).join(" ")}function ql(e){return e.name?`docs/ui-${e.name}`:void 0}function Xl(e){let t=ql(e),n=e.name??"?";return t?C("a",{href:t},n):n}function wa({summary:e,summaryJson:t,link:n=Xl,uiCdn:r,importmap:o,codeHighlight:s}){let{getTypeSummary:i,getRef:c,isFunction:a}=ya(t),l=t.index;function S(w){if(w)return typeof w=="string"?w:i(w)??(typeof w=="number"?void 0:w.name)}function m(w){return w?"&lt;"+w.map(k=>R(k)+(k.kind!==6&&k.type?` extends ${R(k.type)}`:"")).join(", ")+"&gt;":""}function P(w){return["{ ",...w.children?.map($e).flatMap(Ct("; "))??[]," }"]}function R(w){let k=S(w);if(!k||typeof k=="string")return[k||"?"];switch(k.kind){case 5:return k.children?.map(R).flatMap(Ct(" | "))??[];case 23:case 32:return[k.name??"?"];case 34:return P(k)??["?"];case 15:return[...R(k.type),"[]"];case 4:case 8:case 35:{let p=k.typeP?m(k.typeP):void 0;return[n(k),p]}case 17:return $e(k);case 33:{let p=c(w);return[p?n(p):k.name??"?"]}case 21:return[...R(k.children?.[0]),"[",...R(k.children?.[1]),"]"];default:console.log(k)}return[]}function $(w){let k=w.flags??0;return[`${`${k&4?"public ":k&8?"private":k&16?"protected ":""}${k&262144?"...":""}${w.name}${k&524288?"?":""}`}: `,...R(w.type)]}function W(w){return["(",...w?.map($).flatMap(Ct(", "))??[],")"]}function ae(w){let k=w.flags??0,p=w.kind===12?"get ":w.kind===13?"set ":void 0;return[k&32?"static ":"",k&64?"readonly ":"",k&128?"abstract ":"",p]}function te(w){return["[",...w.parameters?.flatMap($e)??[]??[],"]: ",...w.type?R(w.type)??[]:["?"]]}function Ct(w){return(k,p)=>p!==0?[...w,...k]:k}function $e(w){if(w.kind===24)return te(w);if(w.kind===45&&w.children?.[0])return["...",...R(w.children[0])];let k=w.flags&&w.flags&524288,p=a(w)?W(w.parameters):[],x=w.kind===17;return[...ae(w),w.name,k?"?":"",...p,x?" => ":": ",...R(w.resolvedType??w.type)]}function it(w){return[C("h3",{},C(Se,{font:"title-large"},...$e(w))),...kt(w)]}function dn(w,k){if(!w.children)return[];let p={};for(let x of w.children)x.kind!==14&&x.kind!==0&&(x.flags||0)&4&&!k?.(x)&&(p[x.kind]??={name:Wl[x.kind],nodes:[]}).nodes.push(x);return Object.values(p).sort(Si("name")).flatMap(x=>[C("h2",{},x.name),...x.nodes.flatMap(it)])}function sr(w){let k;w=w.replace(/<caption>(.+?)<\/caption>/,(O,G)=>(k=G,""));let p=`<style>body{display:flex;align-items:center;flex-wrap:wrap;justify-content:center;overflow-x:hidden;overflow-y:auto;padding:0 24px 24px 24px;gap:32px;min-height:96px;color:var(--cxl-color-on-background);
background-color:var(--cxl-color-background)}</style>`,x=(o??"")+`<script type="module" src="${r}"><\/script>`,A=C(pn,{header:p+x,formatter:s},w);return[k?C(Se,{font:"title-medium"},k):void 0,A]}function cr(w){return l.find(k=>k.name===w)}function de(w){let k=w.flatMap(p=>{let x=p.value,A=va(x);if(typeof x=="string"){let O=cr(x);A=O?n(O):x}return[A,", "]});return k.pop(),C("p",{},"Related: ",k)}function mn({src:w}){let k=C("div");return k.textContent=w,k}function kt(w){let k=w.docs;if(!k||!k.content)return[];let p=[],x=k.content.flatMap(A=>{let O=va(A.value);return A.tag==="icon"||A.tag==="title"?[]:A.tag==="example"||A.tag==="demo"||A.tag==="demoonly"?sr(O):A.tag==="see"?(p.push(A),[]):A.tag==="return"?[C(Se,{font:"headline-small"},"Returns"),C("p",void 0,O)]:A.tag==="param"?[C("p",void 0,O)]:[A.tag?C("p",void 0,`${A.tag}: `,O):mn({src:O})]});return p.length&&x.push(de(p)),x}function lr(w){let k=[],p=i(w);if(!(!p||p.kind!==33))return p.children?.forEach(x=>{if(typeof x!="object")return;let A=i(x);A&&A.name!=="Component"&&k.push(n(A))}),C(Se,{font:"headline-small"}," ",...k.length?["extends ",k]:[])}function gn(w){let k=i(w.type),p=[];if(!k?.children)return[];for(let x of k.children){let A=i(x);if(!A||A.kind!==35||A.name==="Component")break;let O=dn(A,G=>!!((G.flags??0)&128));O.length&&p.push(C("br"),C(Se,{font:"h6"},"Inherited from ",n(A)),...O),p.push(...gn(A))}return p}let hn=e.kind===35&&e.docs?.tagName;return C("div",{},C("h1",{},e.name," ",e.type&&lr(e.type)," ",hn?C(Se,{font:"title-medium"},`<${hn}>`):""),...kt(e),...dn(e),...gn(e))}var fn=class extends h{name;summary;uicdn;importmap=""};u(fn,{tagName:"doc-page",init:[q("name"),q("summary"),q("uicdn")],augment:[e=>Oe(e).raf(()=>{if(e.replaceChildren(),!e.name||!e.summary)return;let t=e.name,n=e.summary.index.find(r=>r.name===t);n&&e.append(wa({summary:n,summaryJson:e.summary,uiCdn:e.uicdn??"",importmap:e.importmap}))})]});var vo=class extends Ft{summary;sheetstart=!0};u(vo,{tagName:"doc-root",augment:[e=>{let t=Ye();fetch("summary.json").then(r=>r.json()).then(r=>t.next(r));let n=C(ln,{slot:"start",summary:t});e.append(n,C(fn,{summary:t,name:g(n,"selected")}))}]});var wo=class extends nn{};u(wo,{tagName:"doc-item"});var Eo=class extends h{};u(Eo,{tagName:"doc-search-page",augment:[d(`
:host { display: block; margin: 64px 0 }
#searchbar { margin: 0 auto 32px auto; max-width: 600px; min-width: min(480px, 100%); }
#grid { grid-template-columns: 1fr; row-gap: 8px; }
c-card-item { display: flex; gap: 16px; align-items:center; }
.title { ${B("body-medium")}}

${V("small",`
	#grid { grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 8px; }
`)}
${V("medium",`
	#grid { grid-template-columns: 1fr 1fr 1fr; gap: 16px; padding: 0 8px; }
`)}
		`),()=>{let t=C(Xt,{id:"grid"},Ke({source:F(["components"]),render:r=>C(en,void 0,C(_e,{className:"title",xs:1,sm:2,md:3},r.value.toUpperCase()),Ke({source:F(CONFIG.symbols).map(o=>o.filter(s=>s.kind===35&&s.tagName)),render:o=>C(Gt,{$:s=>X(s).tap(()=>{!CONFIG.spa&&o.value?.href&&(location.href=o.value.href)}),pad:16},C(le,{name:o.value.icon})," ",o.map(s=>s.name))}))})),n=r=>g(r,"value").raf(o=>{o=o.toLowerCase();for(let s of t.children)for(let i of s.children)i.style.display=!o||i.textContent?.toLowerCase().includes(o)?"":"none"});return C("div",void 0,C(et,{id:"searchbar"},C(le,{name:"search"}),C(jt,{$:n})),t)}]});export{bo as BlogCode,Xn as Body,vo as ComponentList,so as DocAppbar,co as DocCard,yo as DocGrid,wo as DocItem,Zn as Drawer,Kn as Hr,le as Icon,er as NavHeadline,ln as NavList,fn as Page,tr as UiPage};
