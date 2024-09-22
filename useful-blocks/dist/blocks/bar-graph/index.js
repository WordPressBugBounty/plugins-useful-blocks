(()=>{var e={184:(e,t)=>{var a;!function(){"use strict";var l={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var n=typeof a;if("string"===n||"number"===n)e.push(a);else if(Array.isArray(a)){if(a.length){var o=r.apply(null,a);o&&e.push(o)}}else if("object"===n){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){e.push(a.toString());continue}for(var s in a)l.call(a,s)&&a[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()}},t={};function a(l){var r=t[l];if(void 0!==r)return r.exports;var n=t[l]={exports:{}};return e[l](n,n.exports,a),n.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var l in t)a.o(t,l)&&!a.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.element,t=window.wp.i18n,l=window.wp.blocks,r=window.wp.blockEditor,n=(0,e.createElement)("svg",{viewBox:"0 0 56 56"},(0,e.createElement)("path",{d:"M6.53,50.98c-0.55,0-1-0.45-1-1V6.02c0-0.55,0.45-1,1-1s1,0.45,1,1v43.97C7.53,50.54,7.08,50.98,6.53,50.98z"}),(0,e.createElement)("g",null,(0,e.createElement)("path",{d:"M11.53,11.81v7.13c0,0.55,0.45,1,1,1h10.95c0.55,0,1-0.45,1-1v-7.13c0-0.55-0.45-1-1-1H12.53 C11.97,10.81,11.53,11.26,11.53,11.81z"}),(0,e.createElement)("path",{d:"M11.53,24.44v7.12c0,0.55,0.45,1,1,1h23.95c0.55,0,1-0.45,1-1v-7.12c0-0.55-0.45-1-1-1H12.53 C11.97,23.44,11.53,23.89,11.53,24.44z"}),(0,e.createElement)("path",{d:"M11.53,37.06v7.13c0,0.55,0.45,1,1,1h35.95c0.55,0,1-0.45,1-1v-7.13c0-0.55-0.45-1-1-1H12.53 C11.97,36.06,11.53,36.51,11.53,37.06z"}))),o=window.wp.components,s=window.wp.hooks,c="useful-blocks",i=(0,s.applyFilters)("pb-hook.isPro",!1);function p(a){let{description:l,children:r}=a;return(0,e.createElement)(e.Fragment,null,i?r:(0,e.createElement)("div",{className:"pb-free-noticeBox"},(0,e.createElement)("a",{href:"https://ponhiro.com/useful-blocks/#download-link",target:"_blank",rel:"noreferrer noopener"},(0,t.__)("In the Pro version,",c)),l||"",(0,e.createElement)("div",{className:"pb-free-ctrlPreview"},r)))}const b=t=>{let{colset:a}=t;return(0,e.createElement)("span",{className:"pb-bar-graph","data-colset":a,"data-bg":"1"},(0,e.createElement)("span",{className:"pb-bar-graph__dl","data-bg":"1"},(0,e.createElement)("span",{className:"pb-bar-graph__item"},(0,e.createElement)("span",{className:"pb-bar-graph__dt"},(0,e.createElement)("span",{className:"pb-bar-graph__fill"})),(0,e.createElement)("span",{className:"pb-bar-graph__dd"})),(0,e.createElement)("span",{className:"pb-bar-graph__item"},(0,e.createElement)("span",{className:"pb-bar-graph__dt"},(0,e.createElement)("span",{className:"pb-bar-graph__fill"})),(0,e.createElement)("span",{className:"pb-bar-graph__dd"}))))},m=["y","p","g","b","1"],u={left:(0,t.__)("Left justified",c),right:(0,t.__)("Right justified",c)},d={top:(0,t.__)("Top",c),inner:(0,t.__)("Inner",c)},g=a=>{let{attributes:l,setAttributes:r}=a;const{colSet:n,hideTtl:s,ttlData:i,bg:g,barBg:h,valuePos:_,labelPos:E}=l;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(o.PanelBody,{title:(0,t.__)("Color set",c),initialOpen:!0},(0,e.createElement)(o.BaseControl,null,(0,e.createElement)(o.ButtonGroup,{className:"pb-panel--colorSet -bar-graph"},m.map((t=>{const a=n===t,l="pb-iconbox-colset-"+t;return(0,e.createElement)("div",{className:"__btnBox",key:`key_style_${t}`},(0,e.createElement)("button",{type:"button",id:l,className:"__btn",onClick:()=>{r({colSet:t})}}),(0,e.createElement)("label",{htmlFor:l,className:"__label","data-selected":a||null},(0,e.createElement)(b,{colset:t})))}))))),(0,e.createElement)(o.PanelBody,{title:(0,t.__)("Title settings",c),initialOpen:!0},(0,e.createElement)(o.ToggleControl,{label:(0,t.__)("Don't show",c),checked:s,onChange:e=>{r({hideTtl:e})}}),(0,e.createElement)(o.ToggleControl,{label:(0,t.__)("Add a border below",c),checked:"border"===i,onChange:e=>{r(e?{ttlData:"border"}:{ttlData:"normal"})}})),(0,e.createElement)(o.PanelBody,{title:(0,t.__)("Graph settings",c),initialOpen:!0},(0,e.createElement)(o.ToggleControl,{label:(0,t.__)("Add background color",c),checked:g,onChange:e=>{r({bg:e})}}),(0,e.createElement)(p,{description:(0,t.__)("you can make more detailed settings.",c)},(0,e.createElement)(o.ToggleControl,{label:(0,t.__)("Color the right side of the graph",c),checked:h,onChange:e=>{r({barBg:e})}}),(0,e.createElement)(o.BaseControl,null,(0,e.createElement)(o.BaseControl.VisualLabel,null,(0,t.__)("The position of the label on the left",c)),(0,e.createElement)(o.ButtonGroup,{className:"pb-btn-group"},Object.keys(d).map((t=>(0,e.createElement)(o.Button,{key:`key_${t}`,isPrimary:t===E,onClick:()=>{r({labelPos:t})}},d[t]))))),(0,e.createElement)(o.BaseControl,null,(0,e.createElement)(o.BaseControl.VisualLabel,null,(0,t.__)("The position of the label on the right",c)),(0,e.createElement)(o.ButtonGroup,{className:"pb-btn-group"},Object.keys(u).map((t=>(0,e.createElement)(o.Button,{key:`key_${t}`,isPrimary:t===_,onClick:()=>{r({valuePos:t})}},u[t]))))))))};var h=a(184),_=a.n(h);const E=JSON.parse('{"name":"ponhiro-blocks/bar-graph","title":"Bar Graph","category":"useful-blocks","keywords":["useful"],"supports":{"className":false},"attributes":{"colSet":{"type":"string","default":"1"},"title":{"type":"string","source":"html","selector":".pb-bar-graph__title"},"hideTtl":{"type":"boolean","default":false},"ttlData":{"type":"string","default":"border"},"bg":{"type":"boolean","default":true},"barBg":{"type":"boolean","default":true},"valuePos":{"type":"string","default":"right"},"labelPos":{"type":"string","default":"top"}}}'),{name:f,keywords:v,supports:y,category:k}=E,B="pb-bar-graph";(0,l.registerBlockType)(f,{title:(0,t.__)("Bar Graph",c),icon:{foreground:"#f6a068",src:n},keywords:v,category:k,supports:y,attributes:E.attributes,edit:a=>{const{className:l,attributes:n,setAttributes:o}=a,{colSet:s,title:i,bg:p,barBg:b,valuePos:m,labelPos:u,hideTtl:d,ttlData:h}=n,E=_()(B,l);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(r.InspectorControls,null,(0,e.createElement)(g,{attributes:n,setAttributes:o})),(0,e.createElement)("div",{className:E,"data-colset":s,"data-bg":p?"1":null},!d&&(0,e.createElement)(r.RichText,{tagName:"div",className:`${B}__title -${h}`,placeholder:(0,t.__)("Text…",c),value:i,onChange:e=>o({title:e})}),(0,e.createElement)("div",{className:`${B}__dl`,"data-bg":b?"1":null,"data-label":u,"data-value":m},(0,e.createElement)(r.InnerBlocks,{allowedBlocks:["ponhiro-blocks/bar-graph-item"],templateLock:!1,template:[["ponhiro-blocks/bar-graph-item",{},[]],["ponhiro-blocks/bar-graph-item",{isThin:!0,ratio:40},[]],["ponhiro-blocks/bar-graph-item",{isThin:!0,ratio:30},[]]],renderAppender:r.InnerBlocks.ButtonBlockAppender}))))},save:t=>{let{attributes:a}=t;const{colSet:l,title:n,bg:o,barBg:s,hideTtl:c,ttlData:i,labelPos:p,valuePos:b}=a;return(0,e.createElement)("div",{className:B,"data-colset":l,"data-bg":o?"1":null},!c&&(0,e.createElement)(r.RichText.Content,{tagName:"div",className:`${B}__title -${i}`,"data-ttl":i,value:n}),(0,e.createElement)("dl",{className:`${B}__dl`,"data-bg":s?"1":null,"data-label":p,"data-value":b},(0,e.createElement)(r.InnerBlocks.Content,null)))}})})()})();