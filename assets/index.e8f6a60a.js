import{d as h,o as u,c as p,a as r,p as g,b,e as y,r as k,f as L,g as x,h as B,i as l,j as d,k as S,l as C}from"./vendor.9eae1bfd.js";const I=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}};I();var q="/assets/icon.838fc2a6.png";var v=(o,e)=>{for(const[i,a]of e)o[i]=a;return o};const A=h({name:"AppBar",methods:{closeWindow(){window.current.close("web-app")},minimizeWindow(){window.current.minimize("web-app")},maximizeWindow(){window.current.maximize("web-app")}}}),w=o=>(g("data-v-0ae73ba8"),o=o(),b(),o),G={id:"appbar",class:"w-full bg-true-gray-900 flex select-none"},W=w(()=>r("div",{class:"flex h-8 items-center text-light-100"},[r("img",{src:q,class:"w-4 ml-2",alt:"App Logo"}),r("div",{class:"font-normal text-sm ml-2"},[y("Simple"),r("span",{class:"font-semibold"},"MMO")])],-1)),z={class:"ml-auto flex items-center"},F=w(()=>r("svg",{xmlns:"http://www.w3.org/2000/svg",class:"bi bi-dash-lg w-5 h-5 fill-current",viewBox:"0 0 16 16"},[r("path",{"fill-rule":"evenodd",d:"M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"})],-1)),$=[F],E=w(()=>r("svg",{xmlns:"http://www.w3.org/2000/svg",class:"bi bi-square w-3 h-3 fill-current",viewBox:"0 0 16 16"},[r("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"})],-1)),M=[E],N=w(()=>r("svg",{xmlns:"http://www.w3.org/2000/svg",class:"bi bi-x w-6 h-6 fill-current",viewBox:"0 0 16 16"},[r("path",{d:"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"})],-1)),H=[N];function R(o,e,i,a,t,n){return u(),p("div",G,[W,r("div",z,[r("button",{onClick:e[0]||(e[0]=(...s)=>o.minimizeWindow&&o.minimizeWindow(...s))},$),r("button",{onClick:e[1]||(e[1]=(...s)=>o.maximizeWindow&&o.maximizeWindow(...s))},M),r("button",{onClick:e[2]||(e[2]=(...s)=>o.closeWindow&&o.closeWindow(...s)),id:"closeBtn"},H)])])}var V=v(A,[["render",R],["__scopeId","data-v-0ae73ba8"]]);const O={components:{ChevronLeftIcon:k,ChevronRightIcon:L,RefreshIcon:x,XIcon:B},data(){return{webview:void 0,isLoading:!1,canGoForward:!1,canGoBack:!1}},props:{url:{type:String,default:"https://web.simple-mmo.com/"}},methods:{goBack(){document.querySelector("webview").canGoBack()&&document.querySelector("webview").goBack()},goForward(){document.querySelector("webview").canGoForward()&&document.querySelector("webview").goForward()},refresh(){document.querySelector("webview").reload()},stop(){document.querySelector("webview").stop()},checkArrows(){this.canGoBack=!1,this.canGoForward=!1,document.querySelector("webview").canGoBack()&&(this.canGoBack=!0),document.querySelector("webview").canGoForward()&&(this.canGoForward=!0)}},mounted(){var o=this;document.querySelector("webview").addEventListener("did-start-loading",function(e){o.checkArrows(),o.isLoading=!0},!1),document.querySelector("webview").addEventListener("will-navigate",function(e){o.checkArrows()},!1),document.querySelector("webview").addEventListener("did-stop-loading",function(e){o.isLoading=!1,o.checkArrows()},!1)}},T={class:"header relative"},j=["disabled"],K=["disabled"],P=["value"],X={class:"ml-a flex items-center justify-center absolute right-2.4 top-2.4"},D={key:0,class:"loader"};function Y(o,e,i,a,t,n){const s=l("ChevronLeftIcon"),m=l("ChevronRightIcon"),f=l("XIcon"),_=l("RefreshIcon");return u(),p("div",T,[r("button",{disabled:!t.canGoBack,onClick:e[0]||(e[0]=(...c)=>n.goBack&&n.goBack(...c))},[d(s,{class:"w-5 h-5"})],8,j),r("button",{disabled:!t.canGoForward,onClick:e[1]||(e[1]=(...c)=>n.goForward&&n.goForward(...c))},[d(m,{class:"w-5 h-5"})],8,K),t.isLoading?(u(),p("button",{key:0,onClick:e[2]||(e[2]=(...c)=>n.stop&&n.stop(...c))},[d(f,{class:"w-5 h-5"})])):(u(),p("button",{key:1,onClick:e[3]||(e[3]=(...c)=>n.refresh&&n.refresh(...c))},[d(_,{class:"w-5 h-5"})])),r("input",{value:i.url,type:"text",readonly:""},null,8,P),r("div",X,[t.isLoading?(u(),p("div",D)):S("",!0)])])}var Z=v(O,[["render",Y],["__scopeId","data-v-30131e19"]]);const J={components:{AppBar:V,Header:Z},data(){return{url:"https://web.simple-mmo.com/"}},watch:{url(o,e){console.log(o)}},created(){document.addEventListener("auxclick",function(o){o.preventDefault()},!1)},mounted(){var o=this;document.querySelector("webview").addEventListener("did-start-loading",function(e){},!1),document.querySelector("webview").addEventListener("will-navigate",function(e){o.url=e.url},!1),document.querySelector("webview").addEventListener("did-stop-loading",function(e){o.url=e.currentTarget.src},!1)}},Q={class:"w-sreen h-screen overflow-hidden"};function U(o,e,i,a,t,n){const s=l("AppBar"),m=l("Header"),f=l("webview");return u(),p("div",Q,[d(s),d(m,{url:t.url},null,8,["url"]),d(f,{class:"h-[calc(100vh-4.5rem)] w-screen",useragent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 OPR/80.0.4170.91 | Web Client by Y0mu",src:t.url},null,8,["src"])])}var ee=v(J,[["render",U]]);const oe=C(ee);oe.mount("#app");
