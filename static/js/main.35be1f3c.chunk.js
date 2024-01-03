(this["webpackJsonpgv-targeterfassung"]=this["webpackJsonpgv-targeterfassung"]||[]).push([[0],{101:function(e,t,a){e.exports=a(117)},107:function(e,t,a){},116:function(e,t,a){},117:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),o=a.n(c),l=a(84),s=a(18),i=a(46),m=a.n(i),u=a(67),g=a(154),d=a(76),p=a.n(d);a(107);function b(){return new Promise((function(e,t){var a=indexedDB.open("Au\xdfendienstDB",1);a.onupgradeneeded=function(e){e.target.result.createObjectStore("submissions",{keyPath:"id",autoIncrement:!0})},a.onsuccess=function(t){var a=t.target.result;e(a)},a.onerror=function(e){t(e.target.error)}}))}function f(e,t){return new Promise((function(a,n){var r=e.transaction(["submissions"],"readwrite").objectStore("submissions").add(t);r.onsuccess=function(){a()},r.onerror=function(){n(r.error)}}))}function h(e){return new Promise((function(t,a){var n=e.transaction(["submissions"],"readonly").objectStore("submissions").getAll();n.onsuccess=function(){t(n.result)},n.onerror=function(){a(n.error)}}))}var v=a(77),E=a.n(v),k=a(173),S=a(120),w=a(119),j=a(157),x=a(161),y=a(165),O=a(166),D=a(177),C=a(159),V=a(178),I=a(162),_=a(176),L=a(183),A=a(164),N=a(179),R=Object(g.a)((function(e){return{title:{fontWeight:"bold",fontSize:"1.2rem",marginBottom:"5px"}}})),W=function(e){var t=e.value,a=e.setValue,n=e.name,c=e.disabled,o=R();return r.a.createElement(r.a.Fragment,null,r.a.createElement(w.a,{variant:"h5",className:o.title},n),r.a.createElement(N.a,{required:!0,disabled:c,fullWidth:!0,name:n,value:t,onChange:function(e){var t=e.target.value;"Streckennummer"===n&&(t=Math.max(0,parseInt(t,10)).toString().slice(0,4)),a(t)},margin:"normal",inputProps:{style:{textAlign:"center"}}}),r.a.createElement("br",null))},P=a(82),B=a.n(P),F=a(45),z=a.n(F),T=Object(g.a)((function(e){return{button:{margin:e.spacing(1),padding:"10px 20px",fontSize:"1rem",textTransform:"none"},buttonsContainer:{display:"flex",flexDirection:"row",alignItems:"center"},buttonContainer:{textAlign:"center",marginTop:e.spacing(2)}}})),U=function(e){var t=e.handleSubmit,a=e.downloadCombinedTodayData,n=e.downloadCombinedData,c=T();return r.a.createElement(k.a,{className:c.buttonContainer},r.a.createElement(x.a,{variant:"contained",color:"primary",className:c.button,endIcon:r.a.createElement(B.a,null),onClick:t},"Abspeichern"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(k.a,{className:c.buttonsContainer},r.a.createElement(x.a,{variant:"contained",color:"primary",className:c.button,startIcon:r.a.createElement(z.a,null),onClick:function(){return a()}},"Daten von heute herunterladen"),r.a.createElement(x.a,{variant:"contained",color:"primary",className:c.button,startIcon:r.a.createElement(z.a,null),onClick:function(){return n()}},"Alle Daten herunterladen")))},M=a(39),K=a.n(M),G=a(182),q=a(174),H=a(181),J=a(60),$=a.n(J);const Q=Object(g.a)(e=>({title:{fontWeight:"bold",fontSize:"1.2rem",marginBottom:"5px",textAlign:"center"},textField:{marginBottom:"1px"}})),X=(e,t)=>{const a=Q(),[c,o]=Object(n.useState)(""),[l,s]=Object(n.useState)(""),[i,m]=Object(n.useState)(""),[u,g]=Object(n.useState)(!1),[d,p]=Object(n.useState)(""),[v,E]=Object(n.useState)(""),[S,j]=Object(n.useState)(null),[x,y]=Object(n.useState)(""),[O,R]=Object(n.useState)(""),[P,B]=Object(n.useState)(null),{onClose:F,selectedValue:z,open:T}=e,[M,J]=Object(n.useState)(""),[X,Y]=Object(n.useState)(""),[Z,ee]=Object(n.useState)([]),[te,ae]=Object(n.useState)(!1),[ne,re]=Object(n.useState)(""),ce=Object(n.useRef)(null);Object(n.useEffect)(()=>{re((new Date).toISOString().slice(0,10))},[ne,re]);const oe=[{value:10,label:"Keiner"},{value:20,label:"Laterne"},{value:30,label:"Wand"},{value:40,label:"Fundament"},{value:50,label:"L\xe4rmschutzwand"},{value:60,label:"Widerlager"},{value:70,label:"Sonstiges"}];return r.a.createElement(D.a,{open:e.open,onClose:e.onClose},r.a.createElement(k.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",maxWidth:"400px",margin:"0 auto",padding:"20px",marginTop:"10px",border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 0 5px rgba(0, 0, 0, 0.2)"},r.a.createElement(W,{name:"Streckennummer",value:c,setValue:o}),r.a.createElement(w.a,{variant:"h6",className:a.title},"Kilometrierung"),r.a.createElement(k.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(N.a,{required:!0,value:l,style:{marginRight:"5px"},id:"km",name:"km",placeholder:"z.B. 145",onChange:e=>s(e.target.value),inputProps:{style:{textAlign:"center"}}}),r.a.createElement(w.a,null,", "),r.a.createElement(N.a,{required:!0,value:i,style:{marginLeft:"5px"},id:"met",name:"met",placeholder:"02",onChange:e=>m(e.target.value),inputProps:{style:{textAlign:"center"}}})),r.a.createElement("br",null),r.a.createElement(w.a,{variant:"h6",className:a.title},"Seite"),r.a.createElement(k.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(C.a,{component:"fieldset"},r.a.createElement(V.a,{row:!0,required:!0,id:"seite",name:"seite",value:u,onChange:e=>g(e.target.value)},r.a.createElement(I.a,{value:"L",control:r.a.createElement(_.a,null),label:"L"}),r.a.createElement(I.a,{value:"R",control:r.a.createElement(_.a,null),label:"R"}))),r.a.createElement(N.a,{fullWidth:!0,value:d,onChange:e=>p(e.target.value),label:"Sonstiges",id:"sonstiges",name:"sonstiges",InputLabelProps:{style:{textAlign:"center",width:"100%",marginLeft:"0"}},inputProps:{style:{textAlign:"center"}}})),r.a.createElement("br",null),r.a.createElement(W,{name:"Mastnummer",value:v,setValue:E,disabled:null!==S&&10!==S}),r.a.createElement(w.a,{variant:"h6",className:a.title},"Wenn keine Mastnummer vorhanden ist, dann Vermarkungstr\xe4ger ausw\xe4hlen:"),r.a.createElement(C.a,{fullWidth:!0},r.a.createElement(H.a,{id:"demo-simple-select-label"},"Vermarkungstr\xe4ger"),r.a.createElement(q.a,{labelId:"vermarkungstraeger",id:"vermarkungstraeger",value:S,label:"Vermarkung",onChange:e=>(e=>{j(e.target.value),e.target.value&&E("")})(e),disabled:!!v},oe.map(e=>r.a.createElement(G.a,{key:e.value,value:e.value},e.label)))),r.a.createElement(W,{name:"Sonstiges",value:x,setValue:y,disabled:70!==S}),r.a.createElement("br",null),r.a.createElement(W,{name:"GVP L\xe4nge, mm",value:O,setValue:R}),r.a.createElement("br",null),r.a.createElement(w.a,{variant:"h6",className:a.title},"Datum"),r.a.createElement("br",null),r.a.createElement(N.a,{required:!0,fullWidth:!0,name:"currentDate",placeholder:"z.B. 2023-10-20",value:ne,onChange:e=>{re(e.target.value)},margin:"normal",inputProps:{style:{textAlign:"center"}}}),r.a.createElement("br",null),r.a.createElement(w.a,{variant:"h6",className:a.title},"Foto hochladen"),r.a.createElement($.a,{audio:!1,videoConstraints:{width:440,height:280,facingMode:{exact:"environment"}},ref:ce}),r.a.createElement("button",{onClick:()=>{const e=ce.current.getScreenshot();B(e)}},"Foto aufnehmen"),P&&r.a.createElement("img",{src:P,alt:"Captured"})),r.a.createElement(U,{handleSubmit:()=>{if(!P)return Y("Bitte w\xe4hlen Sie ein Foto aus, bevor Sie fortfahren."),void J("");Y(""),J("Erfolgreich hinzugef\xfcgt"),o(""),s(""),m(""),g(!1),p(""),E(""),j(null),R(""),y(""),B(null),re((new Date).toISOString().slice(0,10));const e=ce.current.getScreenshot();B(e);const t=function(e){const t=atob(e.split(",")[1]),a=new ArrayBuffer(t.length),n=new Uint8Array(a);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return new Blob([a],{type:"image/jpeg"})}(P),a=new FileReader;a.onload=e=>{const t=e.target.result;let a=.9;const n=new Image;n.src=t,n.onload=()=>{const e=document.createElement("canvas"),t=e.getContext("2d");e.width=n.width,e.height=n.height,t.drawImage(n,0,0,n.width,n.height);let r=e.toDataURL("image/jpeg",a);for(;r.length>524288&&a>=.1;)a-=.1,r=e.toDataURL("image/jpeg",a);if(r.length<=524288){var o;const e=S?null===(o=oe.find(e=>e.value===S))||void 0===o?void 0:o.label:"",t={streckennummer:c,km:l,met:i,seite:u,sonstiges:d,mastnummer:v,selectedVermarkungstrager:e,sonstiges2:x,gvp:O,currentDate:ne,photo:r};b().then(e=>{f(e,t).then(()=>{h(e).then(e=>{ee(e),J("Erfolgreich hinzugef\xfcgt"),ae(!0)}).catch(e=>console.error("Error fetching submissions: ",e))}).catch(e=>console.error("Error adding submission: ",e))}).catch(e=>console.error("Error opening database: ",e))}else console.error("Compressed photo size is still too large.")}},ce.current&&(ce.current.value=""),a.readAsDataURL(t),ce.current.value=""},downloadCombinedData:()=>{const e=new K.a,t="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge; Datum\n"+Z.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(e.currentDate)}).join("\n");e.file("alle_daten.csv",t),Z.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo.split(",")[1];e.file(r,c,{base64:!0})}),e.generateAsync({type:"blob"}).then(e=>{const t=window.URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="combined_data.zip",setTimeout(()=>{a.click()},100)})},downloadCombinedTodayData:()=>{const e=new K.a,t=Z.filter(e=>e.currentDate===ne),a="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge; Datum\n"+t.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(ne)}).join("\n");e.file("".concat(ne,".csv"),a),t.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=P.split(",")[1];e.file(r,c,{base64:!0})}),e.generateAsync({type:"blob"}).then(e=>{const t=(new Date).toISOString().slice(0,10),a=window.URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download="".concat(t,".zip"),setTimeout(()=>{n.click()},100)})}}),r.a.createElement(L.a,{open:!!M,autoHideDuration:6e3,onClose:(e,t)=>{"clickaway"!==t&&J("")}},r.a.createElement(A.a,{message:M})),r.a.createElement(L.a,{open:!!X,autoHideDuration:6e3,onClose:(e,t)=>{"clickaway"!==t&&Y("")}},r.a.createElement(A.a,{message:X})))};var Y=Object(g.a)((function(e){return{header:{padding:e.spacing(2),backgroundColor:e.palette.primary.main,color:e.palette.common.white},content:{padding:e.spacing(3),backgroundColor:e.palette.background.paper},buttonContainer:{marginTop:e.spacing(2),textAlign:"center"},button:{display:"block",margin:"10px auto",padding:"10px 20px",fontSize:"1rem",textTransform:"none",backgroundColor:"#6a8dbb",color:e.palette.common.white,"&:hover":{backgroundColor:"#3c5a7d"}},input:{display:"none"}}})),Z=function(e){var t=e.setShowTable,a=e.setImportData,c=e.setColNames,o=Y(),l=Object(n.useState)(!1),i=Object(s.a)(l,2),m=i[0],u=i[1],g=Object(n.useState)(!1),d=Object(s.a)(g,2),p=(d[0],d[1]),b=Object(n.useState)(!1),f=Object(s.a)(b,2),h=f[0],v=f[1];return r.a.createElement(k.a,null,r.a.createElement(S.a,{className:o.header,elevation:3},r.a.createElement(w.a,{variant:"h4"},"GV-Targeterfassung")),r.a.createElement(S.a,{className:o.content,elevation:3},r.a.createElement(k.a,{className:o.buttonContainer},r.a.createElement("label",{htmlFor:"csv-input"},r.a.createElement(j.a,{accept:".csv",className:o.input,id:"csv-input",type:"file",onChange:function(e){var n=e.target.files[0];n?"text/csv"===n.type||n.name.endsWith(".csv")?(!function(e,t,a){E.a.parse(e,{complete:function(n){var r=e.name?e.name.split(".").at(0):"";if(n.data&&n.data.length>0){Object.keys(n.data[0]);var c=n.data.slice(0,-1),o=["PktNr","Km-Station Ist"],l=c.map((function(e,t){var a={id:t,Streckennummer:r,Mastnummer:"","GVP L\xe4nge":""};return o.forEach((function(t){a[t]=e[t]})),a}));t(l),a([].concat(o,["Streckennummer","Mastnummer","GVP L\xe4nge"]))}else console.error("CSV file is empty or missing data.")},header:!0,encoding:"ISO-8859-1"})}(n,a,c),t(!0),p(!0),v(!1)):(v(!0),p(!1)):(p(!1),v(!1))}}),r.a.createElement(x.a,{variant:"contained",startIcon:r.a.createElement(y.a,null),color:"secondary",className:o.button,component:"span"},"Koordinatendatei hochladen")),h&&r.a.createElement(w.a,{variant:"body2",color:"error"},"W\xe4hlen Sie eine CSV Datei")),r.a.createElement(k.a,null,r.a.createElement(x.a,{variant:"contained",startIcon:r.a.createElement(O.a,null),color:"secondary",className:o.button,component:"span",onClick:function(){u(!0)}},"Formular \xf6ffnen"),r.a.createElement(X,{selectedValue:"",open:m,onClose:function(e){u(!1)}}))))},ee=a(168),te=a(172),ae=a(171),ne=a(167),re=a(169),ce=a(170);const oe=Object(g.a)(e=>({title:{fontWeight:"bold",fontSize:"1.2rem",marginBottom:"5px"},textField:{marginBottom:"1px"}}));var le=e=>{let{reff:t,row:a,setImportData:c}=e;const[o,l]=Object(n.useState)({seite:!1,sonstiges:"",gvp:"",photo:null}),[s,i]=Object(n.useState)(a.Streckennummer?a.Streckennummer:""),[m,u]=Object(n.useState)(a["Km-Station Ist"]?a["Km-Station Ist"]:""),[g,d]=Object(n.useState)(a.Met?a.Met:""),[p,v]=Object(n.useState)(""),[E,S]=Object(n.useState)(""),[j,x]=Object(n.useState)(""),[y,O]=Object(n.useState)(null),[D,R]=Object(n.useState)(""),[P,B]=Object(n.useState)(""),[F,z]=Object(n.useState)(""),[T,M]=Object(n.useState)(""),[J,Q]=Object(n.useState)(""),[X,Y]=Object(n.useState)([]),Z=Object(n.useRef)(null);Object(n.useEffect)(()=>{c(e=>e.map(e=>e.id===a.id?{...e,"GVP L\xe4nge":P}:e.id===a.id?{...e,Mastnummer:j}:e))},[P,j,a.id,c]);const[ee,te]=Object(n.useState)(!1),[ae,ne]=Object(n.useState)("");Object(n.useEffect)(()=>{if(ne((new Date).toISOString().slice(0,10)),a){if(a["Km-Station Ist"]){const[e,t]=a["Km-Station Ist"].split(",");u(e),d(t)}a.Seite&&v(a.Seite)}},[a,ne]);const re=oe(),ce=[{value:10,label:"Keiner"},{value:20,label:"Laterne"},{value:30,label:"Wand"},{value:40,label:"Fundament"},{value:50,label:"L\xe4rmschutzwand"},{value:60,label:"Widerlager"},{value:70,label:"Sonstiges"}];const le=e=>{const{name:t,value:a}=e.target;l({...o,[t]:a})};return Object(n.useEffect)(()=>{b().then(e=>{h(e).then(e=>Y(e))}).catch(e=>console.error("Error opening database: ",e))},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",maxWidth:"400px",margin:"0 auto",padding:"20px",border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 0 5px rgba(0, 0, 0, 0.2)"},r.a.createElement(W,{value:s,setValue:i,name:"Streckennummer"}),r.a.createElement(w.a,{variant:"h6",className:re.title},"Kilometrierung"),r.a.createElement(k.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(N.a,{required:!0,style:{marginRight:"5px"},id:"km",name:"km",placeholder:"z.B. 145",value:m,onChange:le,inputProps:{style:{textAlign:"center"}}}),r.a.createElement(w.a,null,", "),r.a.createElement(N.a,{required:!0,style:{marginLeft:"5px"},id:"met",name:"met",placeholder:"02",value:g,onChange:le,inputProps:{style:{textAlign:"center"}}})),r.a.createElement("br",null),r.a.createElement(w.a,{variant:"h6",className:re.title},"Seite"),r.a.createElement(k.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(C.a,{component:"fieldset"},r.a.createElement(V.a,{row:!0,required:!0,id:"seite",name:"seite",value:p,onChange:e=>v(e.target.value)},r.a.createElement(I.a,{value:"L",control:r.a.createElement(_.a,null),label:"L"}),r.a.createElement(I.a,{value:"R",control:r.a.createElement(_.a,null),label:"R"}))),r.a.createElement(N.a,{fullWidth:!0,label:"Sonstiges",id:"sonstiges",name:"sonstiges",value:E,onChange:e=>S(e.target.value),inputProps:{style:{textAlign:"center"}},InputLabelProps:{style:{textAlign:"center",width:"100%",marginLeft:"0"}}})),r.a.createElement("br",null),r.a.createElement(W,{name:"Mastnummer",value:j,setValue:x,disabled:null!==y&&10!==y}),r.a.createElement(w.a,{variant:"h6",className:re.title},"Wenn keine Mastnummer vorhanden ist, dann Vermarkungstr\xe4ger ausw\xe4hlen:"),r.a.createElement(C.a,{fullWidth:!0},r.a.createElement(H.a,{id:"demo-simple-select-label"},"Vermarkungstr\xe4ger"),r.a.createElement(q.a,{labelId:"vermarkungstraeger",id:"vermarkungstraeger",value:y,label:"Vermarkung",onChange:e=>(e=>{O(e.target.value),e.target.value&&x("")})(e),disabled:!!j},ce.map(e=>r.a.createElement(G.a,{key:e.value,value:e.value},e.label)))),r.a.createElement(W,{name:"Sonstiges",value:D,setValue:R,disabled:70!==y}),r.a.createElement("br",null),r.a.createElement(W,{value:P,setValue:B,name:"GVP L\xe4nge, mm"}),r.a.createElement("br",null),r.a.createElement(w.a,{variant:"h6",className:re.title},"Datum"),r.a.createElement("br",null),r.a.createElement(N.a,{required:!0,fullWidth:!0,name:"currentDate",placeholder:"z.B. 2023-10-20",value:ae,onChange:e=>{ne(e.target.value)},margin:"normal",inputProps:{style:{textAlign:"center"}}}),r.a.createElement("br",null),r.a.createElement(w.a,{variant:"h6",className:re.title},"Foto hochladen"),r.a.createElement($.a,{audio:!1,videoConstraints:{width:440,height:280,facingMode:{exact:"environment"}},ref:Z}),r.a.createElement("button",{onClick:()=>{const e=Z.current.getScreenshot();z(e)}},"Foto aufnehmen"),F&&r.a.createElement("img",{src:F,alt:"Captured"})),r.a.createElement(U,{handleSubmit:()=>{if(!F)return Q("Bitte w\xe4hlen Sie ein Foto aus, bevor Sie fortfahren."),void M("");Q(""),M("Erfolgreich hinzugef\xfcgt");const e=Z.current.getScreenshot();z(e);const t=function(e){const t=atob(e.split(",")[1]),a=new ArrayBuffer(t.length),n=new Uint8Array(a);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return new Blob([a],{type:"image/jpeg"})}(F),a=new FileReader;a.onload=e=>{const t=e.target.result;let a=.9;const n=new Image;n.src=t,n.onload=()=>{const e=document.createElement("canvas"),t=e.getContext("2d");e.width=n.width,e.height=n.height,t.drawImage(n,0,0,n.width,n.height);let r=e.toDataURL("image/jpeg",a);for(;r.length>524288&&a>=.1;)a-=.1,r=e.toDataURL("image/jpeg",a);if(r.length<=524288){var c;const e=y?null===(c=ce.find(e=>e.value===y))||void 0===c?void 0:c.label:"",t={streckennummer:s,km:m,met:g,seite:p,sonstiges:E,mastnummer:j,selectedVermarkungstrager:e,sonstiges2:D,gvp:P,currentDate:ae,photo:r};b().then(e=>{f(e,t).then(()=>{h(e).then(e=>{Y(e),M("Erfolgreich hinzugef\xfcgt"),te(!0)}).catch(e=>console.error("Error fetching submissions: ",e))}).catch(e=>console.error("Error adding submission: ",e))})}else console.error("Compressed photo size is still too large.")}},a.readAsDataURL(t)},downloadCombinedData:()=>{const e=new K.a,t="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge; Datum\n"+X.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(e.currentDate)}).join("\n");e.file("alle_daten.csv",t),X.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo.split(",")[1];e.file(r,c,{base64:!0})}),e.generateAsync({type:"blob"}).then(e=>{const t=window.URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="combined_data.zip",setTimeout(()=>{a.click()},100)})},downloadCombinedTodayData:()=>{const e=new K.a,t=X.filter(e=>e.currentDate===ae),a="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge; Datum\n"+t.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(ae)}).join("\n");e.file("".concat(ae,".csv"),a),t.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo.split(",")[1];e.file(r,c,{base64:!0})}),e.generateAsync({type:"blob"}).then(e=>{const t=(new Date).toISOString().slice(0,10),a=window.URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download="".concat(t,".zip"),setTimeout(()=>{n.click()},100)})}}),r.a.createElement(L.a,{open:!!T,autoHideDuration:6e3,onClose:(e,t)=>{"clickaway"!==t&&M("")}},r.a.createElement(A.a,{message:T})),r.a.createElement(L.a,{open:!!J,autoHideDuration:6e3,onClose:(e,t)=>{"clickaway"!==t&&Q("")}},r.a.createElement(A.a,{message:J})))},se=a(163),ie=a(83),me=a.n(ie),ue=Object(g.a)((function(e){return{paper:{padding:e.spacing(3)},successSnackbar:{backgroundColor:"#92b493"},errorSnackbar:{backgroundColor:"#FF5722"},buttonContainer:{textAlign:"center",marginTop:e.spacing(2)},button:{margin:e.spacing(1),padding:"10px 20px",fontSize:"1rem",textTransform:"none"}}}));function ge(e){var t=e.row,a=e.onClose,n=e.selectedValue,c=e.open,o=e.reff,l=e.setImportData,s=ue();return r.a.createElement(D.a,{onClose:function(){a(n)},"aria-labelledby":"simple-dialog-title",open:c},r.a.createElement(S.a,{elevation:3,className:s.paper},r.a.createElement(le,{row:t,reff:o,setImportData:l})))}var de=function(e){var t=e.row,a=e.reff,n=e.selectedRowData,c=e.setImportData,o=ue(),l=r.a.useState(!1),i=Object(s.a)(l,2),m=i[0],u=i[1],g=r.a.useState([]),d=Object(s.a)(g,2),p=d[0],b=d[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:o.buttonContainer},r.a.createElement(se.a,{"aria-label":"edit",onClick:function(){u(!0)},className:o.button},"Bearbeiten",r.a.createElement(me.a,null)),r.a.createElement(ge,{row:t,selectedValue:p,open:m,onClose:function(e){u(!1),b(n)},reff:a,selectedRowData:n,setImportData:c})))},pe=Object(g.a)((function(e){return{table:{minWidth:650},tableHead:{backgroundColor:"#6a8dbb",color:e.palette.common.white},editButton:{color:e.palette.secondary.main}}})),be=function(e){var t=e.importData,a=e.reff,n=e.setImportData,c=e.colNames;console.log(c);var o=pe();return r.a.createElement(ne.a,{component:S.a},r.a.createElement(ee.a,{className:o.table,"aria-label":"enhanced table"},r.a.createElement(re.a,null,r.a.createElement(ce.a,{className:o.tableHead},c.map((function(e,t){return r.a.createElement(ae.a,{key:"keys-".concat(t),align:"right"},e)})),r.a.createElement(ae.a,{key:"keys-edit",align:"right"}))),r.a.createElement(te.a,null,t.map((function(e,t){return r.a.createElement(ce.a,{key:t},c.map((function(t,a){return r.a.createElement(ae.a,{key:"values-".concat(a),align:"right"},e[t])})),r.a.createElement(ae.a,{key:"values-edit",align:"right"},r.a.createElement(de,{row:e,reff:a,setImportData:n})))})))))},fe=Object(g.a)((function(e){return{root:{flexWrap:"wrap",width:"100%",height:"100%",backgroundColor:"#f4f4f4",display:"flex",justifyContent:"center","& > *":{padding:"10px",display:"flex",flexDirection:"column"}}}})),he=function(){var e=Object(u.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){var n=t.transaction(["submissions"],"readwrite").objectStore("submissions").clear();n.onsuccess=function(){e()},n.onerror=function(e){a(e.target.error)}})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ve=function(){var e=fe(),t=Object(n.useRef)(null),a=Object(n.useState)(!1),c=Object(s.a)(a,2),o=c[0],i=c[1],g=Object(n.useState)([]),d=Object(s.a)(g,2),f=d[0],h=d[1],v=Object(n.useState)([]),E=Object(s.a)(v,2),k=E[0],S=E[1],w=Object(n.useState)(!1),j=Object(s.a)(w,2),y=j[0],O=j[1];Object(n.useEffect)((function(){var e=function(){var e=Object(u.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b();case 3:return t=e.sent,e.next=6,he(t);case 6:console.log("IndexedDB cleared."),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error("Error clearing IndexedDB: ",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),t=new Date,a=new Date(t);a.setHours(24,0,0,0);var n=12096e5+(a-t),r=setInterval(e,n);return console.log(n),function(){clearInterval(r)}}),[]);return r.a.createElement("div",{className:p()(e.root,"appWrapper")},r.a.createElement(Z,{setShowTable:function(e){O(e),i(e)},setImportData:h,setColNames:S}),y&&r.a.createElement(r.a.Fragment,null,r.a.createElement(be,{importData:f,reff:t,setImportData:h,colNames:k}),o&&r.a.createElement(x.a,{variant:"contained",color:"primary",style:{height:"50px",marginTop:"10px"},className:e.button,startIcon:r.a.createElement(z.a,null),onClick:function(){var e=function(e){if(!e||0===e.length)return"";var t=Object.keys(e[0]),a=t.join(";"),n=e.map((function(e){return t.map((function(t){return e[t]})).join(";")}));return[a].concat(Object(l.a)(n)).join("\n")}(f),t=new Blob([e],{type:"text/csv"}),a=document.createElement("a");a.href=URL.createObjectURL(t),a.download="table_data.csv",a.click()}},"Tabelle herunterladen")))},Ee=(a(116),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function ke(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ve,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/gv-targeterfassung-test",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/gv-targeterfassung-test","/service-worker.js");Ee?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ke(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ke(t,e)}))}}()}},[[101,1,2]]]);
//# sourceMappingURL=main.35be1f3c.chunk.js.map