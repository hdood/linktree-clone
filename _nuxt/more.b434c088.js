import{k as c,B as d,m,E as p,o as _,c as f,I as w,p as s,q as i,u as n,s as x,V as h,W as g,w as v}from"./entry.6d44186c.js";import b from"./AdminLayout.1e9315a8.js";import"./nuxt-link.c4b32e73.js";const k={class:"rounded-md bg-white w-full"},W={__name:"more",setup(y){const e=c(),a=g();let o=d(window.innerWidth);m(()=>{window.addEventListener("resize",function(){o.value=window.innerWidth})});const l=async()=>{let r=confirm("Are you sure you want to sign out?");try{r&&(await e.logout(),a.push("/"))}catch(t){console.log(t)}};return p(()=>o.value,()=>{o.value>=767&&a.push("/admin")}),(r,t)=>{const u=v;return _(),f(b,null,{default:w(()=>[s("div",{id:"MorePage",class:i(["flex",n(e).isMobile?"pt-24":"pt-32"])},[s("div",k,[s("button",{onClick:t[0]||(t[0]=M=>l()),class:i(["w-full flex items-center text-gray-600 p-3 hover:text-black",n(e).isMobile?"text-[20px]":"text-[15px]"])},[x(u,{name:"circum:logout",class:"mr-6",size:n(e).isMobile?"22":"15"},null,8,["size"]),h(" Sign out ")],2)])],2)]),_:1})}}};export{W as default};
