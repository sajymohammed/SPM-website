import {db,collection,getDocs,getDoc,doc,query,where,writeBatch,serverTimestamp} from "/firebase.js";
import * as I from "/i18n.js";
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PG=document.body.dataset.page,t=I.t;
Object.assign(I.T.ar,{home:"الرئيسية",welcome:"أهلًا بك في SPM",help:"كيف يمكننا مساعدتك؟",services_h:"الخدمات",pricing_h:"الأسعار",promos_h:"العروض",about_h:"عن SPM",faq_h:"الأسئلة الشائعة",track_h:"تتبّع طلبك",loading:"جارٍ التحميل…",
d_request:"ابدأ مشروعك الآن",d_services:"ما الذي نبنيه لك",d_pricing:"أقل الأسعار والباقات",d_projects:"شاهد مشاريعنا",d_offers:"خصومات وعروض حالية",d_track:"تابع حالة طلبك",d_about:"تعرّف علينا",d_faq:"إجابات سريعة",d_contact:"نحن بانتظارك",
mission:"رسالتنا",values:"قيمنا",workflow:"طريقة العمل",skills:"المهارات والتقنيات",price_note:"السعر المعروض هو أقل سعر، والسعر النهائي يعتمد على متطلبات المشروع وتعقيده ووقت التسليم.",custom_quote:"حسب عرض سعر مخصص",from:"يبدأ من",delivery:"مدة التسليم",revisions:"عدد التعديلات",off:"خصم",coupon:"كوبون",until:"ينتهي في",terms:"الشروط",order_now:"اطلب الآن",email:"البريد",phone:"الهاتف",whatsapp:"واتساب",address:"العنوان",
feat_h:"مشاريع مميزة",offers_now:"عروض حالية",view_all:"عرض الكل",no_services:"سيتم إضافة الخدمات قريبًا.",no_pk:"سيتم إضافة الأسعار قريبًا.",no_offers:"لا توجد عروض حالية.",no_faq:"سيتم إضافة الأسئلة قريبًا.",no_about:"سيتم إضافة المعلومات قريبًا.",
f_links:"روابط مرجعية (اختياري)",f_notes:"ملاحظات إضافية (اختياري)",track_p:"اكتب رقم الطلب الذي ظهر لك بعد الإرسال.",track_ph:"رقم الطلب",track_btn:"تتبّع",track_nf:"لم نجد طلبًا بهذا الرقم. تأكد من الرقم وأعد المحاولة.",track_link:"تتبّع حالة طلبك",
st_new:"تم الاستلام",st_reviewing:"قيد المراجعة",st_inprogress:"قيد التنفيذ",st_completed:"مكتمل",st_rejected:"مرفوض",
st_new_d:"استلمنا طلبك وسنراجعه قريبًا.",st_reviewing_d:"نراجع طلبك الآن.",st_inprogress_d:"بدأنا العمل على مشروعك.",st_completed_d:"تم إنجاز مشروعك.",st_rejected_d:"للأسف لا نستطيع تنفيذ هذا الطلب. تواصل معنا لأي استفسار."});
Object.assign(I.T.en,{home:"Home",welcome:"Welcome to SPM",help:"How can we help you?",services_h:"Services",pricing_h:"Pricing",promos_h:"Offers",about_h:"About SPM",faq_h:"FAQ",track_h:"Track your request",loading:"Loading…",
d_request:"Start your project now",d_services:"What we build for you",d_pricing:"Starting prices and packages",d_projects:"See our work",d_offers:"Current discounts and offers",d_track:"Follow your request status",d_about:"Get to know us",d_faq:"Quick answers",d_contact:"We are here for you",
mission:"Our mission",values:"Our values",workflow:"How we work",skills:"Skills and technologies",price_note:"The price shown is a starting price. The final price depends on project requirements, complexity and delivery time.",custom_quote:"Custom quote",from:"Starting from",delivery:"Delivery",revisions:"Revisions",off:"off",coupon:"Coupon",until:"Ends",terms:"Terms",order_now:"Order now",email:"Email",phone:"Phone",whatsapp:"WhatsApp",address:"Address",
feat_h:"Featured projects",offers_now:"Current offers",view_all:"View all",no_services:"Services will be added soon.",no_pk:"Pricing will be added soon.",no_offers:"No current offers.",no_faq:"Questions will be added soon.",no_about:"Information will be added soon.",
f_links:"Reference links (optional)",f_notes:"Extra notes (optional)",track_p:"Enter the request ID you received after submitting.",track_ph:"Request ID",track_btn:"Track",track_nf:"No request found with this ID. Check it and try again.",track_link:"Track your request",
st_new:"Received",st_reviewing:"Under review",st_inprogress:"In progress",st_completed:"Completed",st_rejected:"Rejected",
st_new_d:"We received your request and will review it soon.",st_reviewing_d:"We are reviewing your request now.",st_inprogress_d:"We have started working on your project.",st_completed_d:"Your project is complete.",st_rejected_d:"Unfortunately we cannot take this request. Contact us with any questions."});
let SI={},D={},ready=false,IMG={};
const ls=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch{return null}};
const loc=(p,k)=>(I.lang==='ar'?p[k+'Ar']||p[k+'En']:p[k+'En']||p[k+'Ar'])||'';
const LN=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean),ul=a=>a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
const isN=v=>/^\d+(\.\d+)?$/.test(String(v??'').trim().replace(/,/g,'')),blank=v=>v==null||String(v).trim()==='',isD=v=>/^\d{4}-\d{2}-\d{2}$/.test(String(v||'').trim());
const money=(n,c)=>isN(n)?new Intl.NumberFormat(I.lang==='ar'?'ar-EG':'en-US').format(+String(n).replace(/,/g,''))+' '+esc(c||'EGP'):esc(n);
const im=p=>{const s=IMG[p.image];return s?`<img class="th" loading="lazy" src="${esc(s)}" alt="">`:''};
const dl=p=>loc(p,'delivery')?`<p>${t('delivery')}: ${esc(loc(p,'delivery'))}</p>`:'';
const pub=async c=>{try{const s=await getDocs(query(collection(db,c),where('published','==',true)));return s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.order||0)-(b.order||0))}catch{return[]}};
async function img(id){if(!id)return'';if(id in IMG)return IMG[id];try{const s=await getDoc(doc(db,'images',id));IMG[id]=s.exists()?s.data().data:''}catch{IMG[id]=''}return IMG[id]}
const act=a=>{const td=new Date().toISOString().slice(0,10);return a.filter(p=>(!isD(p.start)||p.start<=td)&&(!isD(p.end)||p.end>=td))};
const head=(h,s)=>`<section class="ph"><h1>${h}</h1>${s?`<p class="note">${s}</p>`:''}</section>`,empty=k=>`<p class="empty">${t(k)}</p>`;
const pc=p=>{return `<article class="card">${im(p)}<h3>${esc(p.name)}</h3><p>${esc(loc(p,'short'))}</p>${(p.tech||'').split(',').filter(x=>x.trim()).map(x=>`<span class="tag">${esc(x.trim())}</span>`).join('')}${/^https?:\/\//.test(p.demoUrl||'')?`<p><a href="${esc(p.demoUrl)}" target="_blank" rel="noopener">${t('demo')}</a></p>`:''}</article>`};
const sc=p=>`<article class="card">${im(p)}<div style="font-size:2rem">${esc(p.icon||'')}</div><h3>${esc(loc(p,'title'))}</h3><p>${esc(loc(p,'desc'))}</p>${ul(LN(loc(p,'features')))}${p.startPrice?`<p>${t('from')} <b>${esc(p.startPrice)}</b></p>`:''}${dl(p)}<p><a class="btn s" href="/request">${t('order_now')}</a></p></article>`;
const pk=p=>`<article class="card">${im(p)}${loc(p,'badge')?`<span class="tag">${esc(loc(p,'badge'))}</span>`:''}<h3>${esc(loc(p,'name'))}</h3><p>${esc(loc(p,'desc'))}</p><p class="price">${p.customQuote||blank(p.price)?t('custom_quote'):`<small class="old">${t('from')}</small> ${money(p.price,p.currency)}${p.oldPrice?` <s class="old">${money(p.oldPrice,p.currency)}</s>`:''}`}</p>${ul(LN(loc(p,'features')))}${dl(p)}${!blank(p.revisions)?`<p>${t('revisions')}: ${esc(p.revisions)}</p>`:''}<p><a class="btn s" href="/request">${t('order_now')}</a></p></article>`;
const pm=p=>`<article class="card">${im(p)}<h3>${esc(loc(p,'title'))}</h3><p>${esc(loc(p,'desc'))}</p>${!blank(p.percent)?`<p class="price">${isN(String(p.percent).replace(/%$/,''))?esc(String(p.percent).trim().replace(/%$/,''))+'% '+t('off'):esc(p.percent)}</p>`:!blank(p.fixed)?`<p class="price">${isN(p.fixed)?money(p.fixed,'EGP')+' '+t('off'):esc(p.fixed)}</p>`:''}${p.coupon?`<p>${t('coupon')}: <b dir="ltr">${esc(p.coupon)}</b></p>`:''}${p.end?`<p>${isD(p.end)?t('until')+' ':''}${esc(p.end)}</p>`:''}${loc(p,'terms')?`<p>${t('terms')}: ${esc(loc(p,'terms'))}</p>`:''}</article>`;
const grid=(a,f,k)=>a.length?`<div class="grid">${a.map(f).join('')}</div>`:empty(k);
const TL=[['request','🚀','nav_request',1],['services','🛠️','services_h'],['pricing','💰','pricing_h'],['projects','🖼️','projects_h'],['offers','🎁','promos_h'],['track','🔎','track_h'],['about','ℹ️','about_h'],['faq','❓','faq_h'],['contact','✉️','contact_h']];
const sorted=()=>(D.projects||[]).slice().sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||(a.order||0)-(b.order||0));
const TY=['web','biz','pwa','soft','game','other'];
const P={
index:()=>{const ft=sorted().filter(p=>p.featured).slice(0,3),hp=act(D.promotions||[]).filter(p=>p.onHome);
return `<div class="hero"><img src="/logo-circle.png" alt="Shadow Projects Making"><h1>${t('welcome')}</h1><p class="q">${t('help')}</p><p style="color:var(--cyan);font-weight:700">${esc(loc(SI,'tagline')||t('hero_tag'))}</p><p>${esc(loc(SI,'heroP')||t('hero_p'))}</p></div>
<section><div class="tiles">${TL.map(([p,ic,k,pr])=>`<a class="tile${pr?' pri':''}" href="/${p}"><span class="ic">${ic}</span><b>${t(k)}</b><small>${t('d_'+(p==='request'?'request':p))}</small></a>`).join('')}</div></section>
${hp.length?`<section><h2>${t('offers_now')}</h2><div class="grid">${hp.map(pm).join('')}</div></section>`:''}
${ft.length?`<section><h2>${t('feat_h')}</h2><div class="grid">${ft.map(pc).join('')}</div><p style="margin-top:14px"><a class="btn o s" href="/projects">${t('view_all')}</a></p></section>`:''}`},
projects:()=>head(t('projects_h'),t('d_projects'))+grid(sorted(),pc,'empty'),
services:()=>head(t('services_h'),t('d_services'))+grid(D.services||[],sc,'no_services'),
pricing:()=>head(t('pricing_h'),t('price_note'))+grid(D.packages||[],pk,'no_pk'),
offers:()=>head(t('promos_h'),t('d_offers'))+grid(act(D.promotions||[]),pm,'no_offers'),
faq:()=>head(t('faq_h'),t('d_faq'))+((D.faqs||[]).length?`<div style="max-width:720px">${D.faqs.map(p=>`<details><summary>${esc(loc(p,'q'))}</summary>${im(p)}<p>${esc(loc(p,'a'))}</p></details>`).join('')}</div>`:empty('no_faq')),
about:()=>{const a=[IMG[SI.aboutImage]&&`<img class="th" style="max-width:420px" src="${esc(IMG[SI.aboutImage])}" alt="">`,loc(SI,'about')&&`<p>${esc(loc(SI,'about'))}</p>`,loc(SI,'mission')&&`<h3>${t('mission')}</h3><p>${esc(loc(SI,'mission'))}</p>`,LN(loc(SI,'values')).length&&`<h3>${t('values')}</h3>${ul(LN(loc(SI,'values')))}`,LN(loc(SI,'workflow')).length&&`<h3>${t('workflow')}</h3><ol>${LN(loc(SI,'workflow')).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`,SI.skills&&`<h3>${t('skills')}</h3>${SI.skills.split(',').filter(x=>x.trim()).map(x=>`<span class="tag">${esc(x.trim())}</span>`).join('')}`].filter(Boolean).join('');
return head(t('about_h'),t('d_about'))+(a?`<div id="ab">${a}</div>`:empty('no_about'))},
contact:()=>{const wa=(SI.whatsapp||'').replace(/\D/g,''),ad=loc(SI,'address');
return head(t('contact_h'),t('d_contact'))+`<div id="ct">${[SI.email&&SI.email.includes('@')?`<p>${t('email')}: <a href="mailto:${esc(SI.email)}">${esc(SI.email)}</a></p>`:'',SI.phone?`<p>${t('phone')}: <a dir="ltr" href="tel:${esc(SI.phone.replace(/[^\d+]/g,''))}">${esc(SI.phone)}</a></p>`:'',wa?`<p>${t('whatsapp')}: <a dir="ltr" href="https://wa.me/${wa}" target="_blank" rel="noopener">${esc(SI.whatsapp)}</a></p>`:'',ad?`<p>${t('address')}: ${esc(ad)}</p>`:''].join('')}<div class="row2">${soc()}</div></div>`},
request:()=>head(t('req_h'),t('req_p'))+`<form id="rf" novalidate>
<label>${t('f_name')}<input name="name" maxlength="100" autocomplete="name"></label>
<label>${t('f_contact')}<input name="contact" maxlength="200" autocomplete="email"></label>
<label>${t('f_phone')}<input name="phone" maxlength="30" type="tel" autocomplete="tel"></label>
<label>${t('f_type')}<select name="type">${TY.map(k=>`<option value="${k}">${t('t_'+k)}</option>`).join('')}</select></label>
<label>${t('f_title')}<input name="title" maxlength="150"></label>
<label>${t('f_budget')}<input name="budget" maxlength="60"></label>
<label>${t('f_desc')}<textarea name="description" maxlength="3000"></textarea></label>
<label>${t('f_deadline')}<input name="deadline" maxlength="60"></label>
<label>${t('f_links')}<input name="links" maxlength="1000" dir="ltr"></label>
<label>${t('f_notes')}<textarea name="notes" maxlength="1500"></textarea></label>
<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<label class="ck"><input type="checkbox" name="consent">${t('f_consent')}</label>
<div id="fm" role="status"></div><button class="btn">${t('send')}</button></form>`,
track:()=>head(t('track_h'),t('track_p'))+`<form id="tf"><label>${t('track_ph')}<input id="tid" dir="ltr" maxlength="40" autocomplete="off"></label><button class="btn">${t('track_btn')}</button></form><div id="tr" role="status" style="margin-top:16px"></div>`};
const soc=()=>[['Instagram',SI.instagram||'https://www.instagram.com/shadowprojectsmaking'],['Facebook',SI.facebook],['X',SI.x],['YouTube',SI.youtube],['TikTok',SI.tiktok],['LinkedIn',SI.linkedin]].filter(([,u])=>/^https?:\/\//.test(u||'')).map(([n,u])=>`<a class="btn o s" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join('');
const NV=[['services','services_h'],['pricing','pricing_h'],['projects','projects_h'],['offers','promos_h'],['request','nav_request'],['track','track_h'],['about','about_h'],['faq','faq_h'],['contact','contact_h']];
function bindRequest(keep){const f=$('#rf');if(keep)for(const[k,v]of Object.entries(keep)){const e=f.elements[k];if(e&&k!=='website'){if(e.type==='checkbox')e.checked=true;else e.value=v}}
f.addEventListener('submit',async e=>{e.preventDefault();const m=$('#fm'),b=f.querySelector('button'),v=n=>f.elements[n].value.trim();m.className='';m.textContent='';
if(f.elements.website.value)return;
const er=v('name').length<2?'v_name':v('contact').length<3?'v_contact':v('title').length<3?'v_title':v('description').length<10?'v_desc':!f.elements.consent.checked?'v_consent':'';
if(er){m.className='msg er';m.textContent=t(er);return}
if(Date.now()-(+ls('lr')||0)<60000){m.className='msg er';m.textContent=t('wait');return}
b.disabled=true;b.textContent=t('sending');
const d={name:v('name'),contact:v('contact'),type:f.elements.type.value,title:v('title'),description:v('description'),consent:true,status:'new',lang:I.lang,createdAt:serverTimestamp()};
for(const k of['phone','budget','deadline','links','notes'])if(v(k))d[k]=v(k);
try{const ref=doc(collection(db,'projectRequests')),bt=writeBatch(db);bt.set(ref,d);bt.set(doc(db,'requestStatus',ref.id),{status:'new',title:d.title,createdAt:serverTimestamp()});await bt.commit();
ls('lr',Date.now());ls('lastReq',ref.id);f.reset();m.className='msg ok';m.innerHTML=`${esc(t('ok_msg'))} <b dir="ltr">${ref.id}</b> <a href="/track?id=${ref.id}">${esc(t('track_link'))}</a>`}catch{m.className='msg er';m.textContent=t('err_msg')}
b.disabled=false;b.textContent=t('send')})}
function bindTrack(){const o=$('#tr'),inp=$('#tid');
const go=async id=>{id=id.trim();if(!/^[A-Za-z0-9]{10,40}$/.test(id)){o.innerHTML=`<p class="msg er">${t('track_nf')}</p>`;return}
try{const s=await getDoc(doc(db,'requestStatus',id));if(!s.exists()){o.innerHTML=`<p class="msg er">${t('track_nf')}</p>`;return}
const d=s.data(),st=['new','reviewing','inprogress','completed','rejected'].includes(d.status)?d.status:'new';
o.innerHTML=`<div class="card"><h3>${esc(d.title||'')}</h3><span class="st s-${st}">${t('st_'+st)}</span><p style="margin-top:8px">${t('st_'+st+'_d')}</p></div>`}catch{o.innerHTML=`<p class="msg er">${t('err_msg')}</p>`}};
$('#tf').addEventListener('submit',e=>{e.preventDefault();go(inp.value)});
const q=new URLSearchParams(location.search).get('id')||ls('lastReq')||'';inp.value=q;if(q)go(q)}
const TK={projects:'projects_h',services:'services_h',pricing:'pricing_h',offers:'promos_h',request:'nav_request',track:'track_h',about:'about_h',faq:'faq_h',contact:'contact_h'};
function render(){const keep=PG==='request'&&$('#rf')?Object.fromEntries(new FormData($('#rf'))):null;I.apply();
$('#hd').innerHTML=`<header><div class="wrap"><nav aria-label="main"><a class="brand" href="/"><img src="/favicon.png" alt="SPM"><span>SPM</span></a><div class="links">${NV.map(([p,k])=>`<a class="l" href="/${p}"${p===PG?' aria-current="page"':''}>${t(k)}</a>`).join('')}</div><button id="lb" class="btn o s" type="button" aria-label="Language">${I.lang==='ar'?'EN':'عربي'}</button></nav></div></header>`;
$('#mn').innerHTML=ready?P[PG]():`<p class="empty">${t('loading')}</p>`;
$('#ft').innerHTML=`<footer><div class="wrap"><div class="row2" style="justify-content:center;margin:0 0 12px">${soc()}</div><p>${esc(loc(SI,'footer')||t('rights'))}</p></div></footer>`;
$('#lb').onclick=()=>{I.setLang(I.lang==='ar'?'en':'ar');render()};
document.title=TK[PG]?t(TK[PG])+' | SPM':(SI.seoTitle||'Shadow Projects Making (SPM)');
if(SI.seoDesc)document.querySelector('meta[name=description]').content=SI.seoDesc;
if(ready&&PG==='request')bindRequest(keep);if(ready&&PG==='track')bindTrack()}
async function load(){try{const s=await getDoc(doc(db,'site','main'));SI=s.exists()?s.data():{}}catch{SI={}}
const need={index:['projects','promotions'],projects:['projects'],services:['services'],pricing:['packages'],offers:['promotions'],faq:['faqs']}[PG]||[];
await Promise.all(need.map(async c=>{D[c]=await pub(c)}));
await Promise.all([...Object.values(D).flat().map(p=>img(p.image)),img(SI.aboutImage)]);
if(!ls('lang')&&SI.defaultLang==='en')I.setLang('en');ready=true;render()}
render();load();
