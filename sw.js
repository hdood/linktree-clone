if(!self.define){let n,e={};const r=(r,i)=>(r=new URL(r+".js",i).href,e[r]||new Promise((e=>{if("document"in self){const n=document.createElement("script");n.src=r,n.onload=e,document.head.appendChild(n)}else n=r,importScripts(r),e()})).then((()=>{let n=e[r];if(!n)throw new Error(`Module ${r} didn’t register its module`);return n})));self.define=(i,u)=>{const l=n||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let s={};const d=n=>r(n,l),o={module:{uri:l},exports:s,require:d};e[l]=Promise.all(i.map((n=>o[n]||d(n)))).then((n=>(u(...n),s)))}}define(["./workbox-7369c0e1"],(function(n){"use strict";self.addEventListener("message",(n=>{n.data&&"SKIP_WAITING"===n.data.type&&self.skipWaiting()})),n.precacheAndRoute([{url:"_nuxt/_name_.88168adc.js",revision:null},{url:"_nuxt/AdminLayout.1e9315a8.js",revision:null},{url:"_nuxt/apperance.49e650ad.js",revision:null},{url:"_nuxt/AuthLayout.115c4054.js",revision:null},{url:"_nuxt/entry.03357976.css",revision:null},{url:"_nuxt/entry.6d44186c.js",revision:null},{url:"_nuxt/error-404.23f2309d.css",revision:null},{url:"_nuxt/error-404.7089372d.js",revision:null},{url:"_nuxt/error-500.aa16ed4d.css",revision:null},{url:"_nuxt/error-500.aef64a91.js",revision:null},{url:"_nuxt/error-component.9aecc4ed.js",revision:null},{url:"_nuxt/IconCSS.05fd33c5.css",revision:null},{url:"_nuxt/IconCSS.9c647410.js",revision:null},{url:"_nuxt/index.237b119a.js",revision:null},{url:"_nuxt/index.59b644eb.js",revision:null},{url:"_nuxt/isLoggedIn.60e56577.js",revision:null},{url:"_nuxt/isLoggedOut.ea4cf13a.js",revision:null},{url:"_nuxt/MobileSectionDisplay.ed83324c.js",revision:null},{url:"_nuxt/more.b434c088.js",revision:null},{url:"_nuxt/nuxt-link.c4b32e73.js",revision:null},{url:"_nuxt/preview.32f4aca7.js",revision:null},{url:"_nuxt/register.3e177d42.js",revision:null},{url:"_nuxt/workbox-window.prod.es5.dc90f814.js",revision:null},{url:"200",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"404",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"admin/apperance",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"admin",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"admin/more",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"admin/preview",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"/",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"register",revision:"0d7375a71d9f69366dcfdc47d3cc8660"},{url:"manifest.webmanifest",revision:"bd5dcee9d97addc9de4f1977977b691b"}],{}),n.cleanupOutdatedCaches(),n.registerRoute(new n.NavigationRoute(n.createHandlerBoundToURL("index.html")))}));
