(this["webpackJsonpgv-targeterfassung"]=this["webpackJsonpgv-targeterfassung"]||[]).push([[0],{101:function(e,t,a){},111:function(e,t,a){},112:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),o=a.n(c),l=a(149),s=a(72),i=a.n(s);a(101);function m(){return new Promise((function(e,t){var a=indexedDB.open("Au\xdfendienstDB",1);a.onupgradeneeded=function(e){e.target.result.createObjectStore("submissions",{keyPath:"id",autoIncrement:!0})},a.onsuccess=function(t){var a=t.target.result;e(a)},a.onerror=function(e){t(e.target.error)}}))}function u(e,t){return new Promise((function(a,n){var r=e.transaction(["submissions"],"readwrite").objectStore("submissions").add(t);r.onsuccess=function(){a()},r.onerror=function(){n(r.error)}}))}function g(e){return new Promise((function(t,a){var n=e.transaction(["submissions"],"readonly").objectStore("submissions").getAll();n.onsuccess=function(){t(n.result)},n.onerror=function(){a(n.error)}}))}var d=a(73),p=a.n(d),b=a(168),f=a(115),h=a(114),v=a(152),E=a(156),k=a(160),S=a(161),w=a(172),y=a(154),j=a(173),x=a(157),D=a(171),O=a(178),C=a(159),V=a(174),I=Object(l.a)((function(e){return{title:{fontWeight:"bold",fontSize:"1.2rem",marginBottom:"5px"}}})),_=function(e){var t=e.value,a=e.setValue,n=e.name,c=e.disabled,o=I();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"h5",className:o.title},n),r.a.createElement(V.a,{required:!0,disabled:c,fullWidth:!0,name:n,value:t,onChange:function(e){var t=e.target.value;"Streckennummer"===n&&(t=Math.max(0,parseInt(t,10)).toString().slice(0,4)),a(t)},margin:"normal",inputProps:{style:{textAlign:"center"}}}),r.a.createElement("br",null))},L=a(78),N=a.n(L),W=a(55),A=a.n(W),P=Object(l.a)((function(e){return{button:{margin:e.spacing(1),padding:"10px 20px",fontSize:"1rem",textTransform:"none"},buttonsContainer:{display:"flex",flexDirection:"row",alignItems:"center"},buttonContainer:{textAlign:"center",marginTop:e.spacing(2)}}})),B=function(e){var t=e.handleSubmit,a=e.downloadCombinedTodayData,n=e.downloadCombinedData,c=P();return r.a.createElement(b.a,{className:c.buttonContainer},r.a.createElement(E.a,{variant:"contained",color:"primary",className:c.button,endIcon:r.a.createElement(N.a,null),onClick:t},"Abspeichern"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(b.a,{className:c.buttonsContainer},r.a.createElement(E.a,{variant:"contained",color:"primary",className:c.button,startIcon:r.a.createElement(A.a,null),onClick:function(){return a()}},"Daten von heute herunterladen"),r.a.createElement(E.a,{variant:"contained",color:"primary",className:c.button,startIcon:r.a.createElement(A.a,null),onClick:function(){return n()}},"Alle Daten herunterladen")))},R=a(38),z=a.n(R),F=a(177),T=a(169),M=a(176),K=a(56);const U=Object(l.a)(e=>({title:{fontWeight:"bold",fontSize:"1.2rem",marginBottom:"5px",textAlign:"center"},textField:{marginBottom:"1px"},successSnackbar:{backgroundColor:e.palette.success.main,color:e.palette.success.contrastText},errorSnackbar:{backgroundColor:e.palette.error.main,color:e.palette.error.contrastText}})),q=(e,t)=>{const a=U(),[c,o]=Object(n.useState)(""),[l,s]=Object(n.useState)(""),[i,d]=Object(n.useState)(""),[p,f]=Object(n.useState)(!1),[v,E]=Object(n.useState)(""),[k,S]=Object(n.useState)(""),[I,L]=Object(n.useState)(null),[N,W]=Object(n.useState)(""),[A,P]=Object(n.useState)(""),[R,q]=Object(n.useState)(null),{onClose:G,selectedValue:H,open:J}=e,[$,Q]=Object(n.useState)(""),[X,Y]=Object(n.useState)(""),[Z,ee]=Object(n.useState)([]),[te,ae]=Object(n.useState)(!1),[ne,re]=Object(n.useState)("");Object(n.useEffect)(()=>{re((new Date).toISOString().slice(0,10))},[ne,re]);const ce=Object(n.useRef)(null),oe=[{value:10,label:"Keiner"},{value:20,label:"Laterne"},{value:30,label:"Wand"},{value:40,label:"Fundament"},{value:50,label:"L\xe4rmschutzwand"},{value:60,label:"Widerlager"},{value:70,label:"Sonstiges"}];return r.a.createElement(w.a,{open:e.open,onClose:e.onClose},r.a.createElement(b.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",maxWidth:"400px",margin:"0 auto",padding:"20px",marginTop:"10px",border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 0 5px rgba(0, 0, 0, 0.2)"},r.a.createElement(_,{name:"Streckennummer",value:c,setValue:o}),r.a.createElement(h.a,{variant:"h6",className:a.title},"Kilometrierung"),r.a.createElement(b.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(V.a,{required:!0,value:l,style:{marginRight:"5px"},id:"km",name:"km",placeholder:"z.B. 145",onChange:e=>s(e.target.value),inputProps:{style:{textAlign:"center"}}}),r.a.createElement(h.a,null,", "),r.a.createElement(V.a,{required:!0,value:i,style:{marginLeft:"5px"},id:"met",name:"met",placeholder:"02",onChange:e=>d(e.target.value),inputProps:{style:{textAlign:"center"}}})),r.a.createElement("br",null),r.a.createElement(h.a,{variant:"h6",className:a.title},"Seite"),r.a.createElement(b.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(y.a,{component:"fieldset"},r.a.createElement(j.a,{row:!0,required:!0,id:"seite",name:"seite",value:p,onChange:e=>f(e.target.value)},r.a.createElement(x.a,{value:"L",control:r.a.createElement(D.a,null),label:"L"}),r.a.createElement(x.a,{value:"R",control:r.a.createElement(D.a,null),label:"R"}))),r.a.createElement(V.a,{fullWidth:!0,value:v,onChange:e=>E(e.target.value),label:"Sonstiges",id:"sonstiges",name:"sonstiges",InputLabelProps:{style:{textAlign:"center",width:"100%",marginLeft:"0"}},inputProps:{style:{textAlign:"center"}}})),r.a.createElement("br",null),r.a.createElement(_,{name:"Mastnummer",value:k,setValue:S,disabled:null!==I&&10!==I}),r.a.createElement(h.a,{variant:"h6",className:a.title},"Wenn keine Mastnummer vorhanden ist, dann Vermarkungstr\xe4ger ausw\xe4hlen:"),r.a.createElement(y.a,{fullWidth:!0},r.a.createElement(M.a,{id:"demo-simple-select-label"},"Vermarkungstr\xe4ger"),r.a.createElement(T.a,{labelId:"vermarkungstraeger",id:"vermarkungstraeger",value:I,label:"Vermarkung",onChange:e=>(e=>{L(e.target.value),e.target.value&&S("")})(e),disabled:!!k},oe.map(e=>r.a.createElement(F.a,{key:e.value,value:e.value},e.label)))),r.a.createElement(_,{name:"Sonstiges",value:N,setValue:W,disabled:70!==I}),r.a.createElement("br",null),r.a.createElement(_,{name:"GVP L\xe4nge, mm",value:A,setValue:P}),r.a.createElement("br",null),r.a.createElement(h.a,{variant:"h6",className:a.title},"Datum"),r.a.createElement("br",null),r.a.createElement(V.a,{required:!0,fullWidth:!0,name:"currentDate",placeholder:"z.B. 2023-10-20",value:ne,onChange:e=>{re(e.target.value)},margin:"normal",inputProps:{style:{textAlign:"center"}}}),r.a.createElement("br",null),r.a.createElement(h.a,{variant:"h6",className:a.title},"Foto hochladen"),r.a.createElement("input",{ref:e=>ce.current=e,required:!0,type:"file",name:"photo",accept:"image/*;capture=camera",onChange:e=>(e=>{const t=e.target.files[0];q(t)})(e)})),r.a.createElement(B,{handleSubmit:()=>{if(!R)return Y("Bitte w\xe4hlen Sie ein Foto aus, bevor Sie fortfahren."),void Q("");o(""),s(""),d(""),f(!1),E(""),S(""),L(null),P(""),W(""),q(null),re((new Date).toISOString().slice(0,10));const e=new FileReader;e.onload=async e=>{const t=e.target.result;const a=new Image;a.src=t,a.onload=async()=>{if(e.total<=524288){var n;const e=I?null===(n=oe.find(e=>e.value===I))||void 0===n?void 0:n.label:"",a={streckennummer:c,km:l,met:i,seite:p,sonstiges:v,mastnummer:k,selectedVermarkungstrager:e,sonstiges2:N,gvp:A,currentDate:ne,photo:t};try{const e=await m();await u(e,a);const t=await g(e);ee(t),Q("Erfolgreich hinzugef\xfcgt"),ae(!0)}catch(o){console.error("Error adding or fetching submission: ",o)}}else{const e=document.createElement("canvas"),t=e.getContext("2d");e.width=a.width,e.height=a.height,t.drawImage(a,0,0,a.width,a.height);try{var r;const t=await new Promise(t=>{e.toBlob(t,"image/jpeg",1)}),a=await Object(K.a)(t,{maxSizeMB:.5,maxWidthOrHeight:1920,useWebWorker:!0});console.log("compressedFile instanceof Blob",a instanceof Blob),console.log("compressedFile size ".concat(a.size/1024/1024," MB"));const n=I?null===(r=oe.find(e=>e.value===I))||void 0===r?void 0:r.label:"",s={streckennummer:c,km:l,met:i,seite:p,sonstiges:v,mastnummer:k,selectedVermarkungstrager:n,sonstiges2:N,gvp:A,currentDate:ne,photo:a};try{const e=await m();await u(e,s);const t=await g(e);ee(t),Q("Erfolgreich hinzugef\xfcgt"),ae(!0)}catch(o){console.error("Error adding or fetching submission: ",o)}}catch(o){console.error("Error compressing photo: ",o)}}}},e.readAsDataURL(R),ce.current.value=""},downloadCombinedData:()=>{const e=new z.a,t="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge (m); Datum\n"+Z.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(e.currentDate)}).join("\n");e.file("alle_daten.csv",t),Z.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo;e.file(r,c)}),e.generateAsync({type:"blob"}).then(e=>{const t=window.URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="combined_data.zip",setTimeout(()=>{a.click()},100)})},downloadCombinedTodayData:()=>{const e=new z.a,t=Z.filter(e=>e.currentDate===ne),a="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge (m); Datum\n"+t.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(ne)}).join("\n");e.file("".concat(ne,".csv"),a),t.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo;e.file(r,c)}),e.generateAsync({type:"blob"}).then(e=>{const t=(new Date).toISOString().slice(0,10),a=window.URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download="".concat(t,".zip"),setTimeout(()=>{n.click()},100)})}}),r.a.createElement(O.a,{open:!!$,autoHideDuration:7e3,onClose:(e,t)=>{"clickaway"!==t&&(Q(""),ae(!1))}},r.a.createElement(C.a,{message:$,className:a.successSnackbar})),r.a.createElement(O.a,{open:!!X,autoHideDuration:12e3,onClose:(e,t)=>{"clickaway"!==t&&Y("")}},r.a.createElement(C.a,{message:X,className:a.errorSnackbar})))};const G=Object(l.a)(e=>({header:{padding:e.spacing(2),backgroundColor:e.palette.primary.main,color:e.palette.common.white},content:{padding:e.spacing(3),backgroundColor:e.palette.background.paper},buttonContainer:{marginTop:e.spacing(2),textAlign:"center"},button:{display:"block",margin:"10px auto",padding:"10px 20px",fontSize:"1rem",textTransform:"none",backgroundColor:"#6a8dbb",color:e.palette.common.white,"&:hover":{backgroundColor:"#3c5a7d"}},input:{display:"none"}}));var H=e=>{let{setShowTable:t,setImportData:a,setColNames:c}=e;const o=G(),[l,s]=Object(n.useState)(!1),[i,m]=Object(n.useState)(!1),[u,g]=Object(n.useState)(!1);return r.a.createElement(b.a,null,r.a.createElement(f.a,{className:o.header,elevation:3},r.a.createElement(h.a,{variant:"h4"},"GV-Targeterfassung")),r.a.createElement(f.a,{className:o.content,elevation:3},r.a.createElement(b.a,{className:o.buttonContainer},r.a.createElement("label",{htmlFor:"csv-input"},r.a.createElement(v.a,{accept:".csv",className:o.input,id:"csv-input",type:"file",onChange:e=>{const n=e.target.files[0];n?"text/csv"===n.type||n.name.endsWith(".csv")?(((e,t,a)=>{p.a.parse(e,{complete:n=>{const r=e.name?e.name.split(".").at(0):"";if(n.data&&n.data.length>0){Object.keys(n.data[0]);const e=n.data.slice(0,-1),c=["PktNr","Km-Station Ist"],o=e.map((e,t)=>{const a={id:t,Streckennummer:r,"GVP L\xe4nge":""};return c.forEach(t=>{a[t]=e[t]}),a});t(o),a([...c,"Streckennummer","GVP L\xe4nge"])}else console.error("CSV file is empty or missing data.")},header:!0,encoding:"ISO-8859-1"})})(n,a,c),t(!0),m(!0),g(!1)):(g(!0),m(!1)):(m(!1),g(!1))}}),r.a.createElement(E.a,{variant:"contained",startIcon:r.a.createElement(k.a,null),color:"secondary",className:o.button,component:"span"},"Koordinatendatei hochladen")),u&&r.a.createElement(h.a,{variant:"body2",color:"error"},"W\xe4hlen Sie eine CSV Datei")),r.a.createElement(b.a,null,r.a.createElement(E.a,{variant:"contained",startIcon:r.a.createElement(S.a,null),color:"secondary",className:o.button,component:"span",onClick:()=>{s(!0)}},"Formular \xf6ffnen"),r.a.createElement(q,{selectedValue:"",open:l,onClose:e=>{s(!1)}}))))},J=a(163),$=a(167),Q=a(166),X=a(162),Y=a(164),Z=a(165),ee=a(63);a(110);const te=Object(l.a)(e=>({title:{fontWeight:"bold",fontSize:"1.2rem",marginBottom:"5px"},textField:{marginBottom:"1px"},successSnackbar:{backgroundColor:e.palette.success.main,color:e.palette.success.contrastText},errorSnackbar:{backgroundColor:e.palette.error.main,color:e.palette.error.contrastText}}));var ae=e=>{let{reff:t,row:a,setImportData:c}=e;const[o,l]=Object(n.useState)({seite:!1,sonstiges:"",gvp:"",photo:null}),[s,i]=Object(n.useState)(a.Streckennummer?a.Streckennummer:""),[d,p]=Object(n.useState)(a["Km-Station Ist"]?a["Km-Station Ist"]:""),[f,v]=Object(n.useState)(a.Met?a.Met:""),[E,k]=Object(n.useState)(""),[S,w]=Object(n.useState)(""),[I,L]=Object(n.useState)(""),[N,W]=Object(n.useState)(null),[A,P]=Object(n.useState)(""),[R,U]=Object(n.useState)(""),[q,G]=Object(n.useState)(""),[H,J]=Object(n.useState)(""),[$,Q]=Object(n.useState)(""),[X,Y]=Object(n.useState)([]);Object(n.useEffect)(()=>{c(e=>e.map(e=>e.id===a.id?{...e,"GVP L\xe4nge":R}:e.id===a.id?{...e,Mastnummer:I}:e))},[R,I,a.id,c]);const[Z,ee]=Object(n.useState)(!1),[ae,ne]=Object(n.useState)("");Object(n.useEffect)(()=>{if(ne((new Date).toISOString().slice(0,10)),a){if(a["Km-Station Ist"]){const[e,t]=a["Km-Station Ist"].split(",");p(e),v(t)}a.Seite&&k(a.Seite)}},[a,ne]);const re=te(),ce=[{value:10,label:"Keiner"},{value:20,label:"Laterne"},{value:30,label:"Wand"},{value:40,label:"Fundament"},{value:50,label:"L\xe4rmschutzwand"},{value:60,label:"Widerlager"},{value:70,label:"Sonstiges"}],oe=e=>{const{name:t,value:a}=e.target;l({...o,[t]:a})};return Object(n.useEffect)(()=>{m().then(e=>{g(e).then(e=>Y(e))}).catch(e=>console.error("Error opening database: ",e))},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",maxWidth:"400px",margin:"0 auto",padding:"20px",border:"1px solid #ccc",borderRadius:"8px",boxShadow:"0 0 5px rgba(0, 0, 0, 0.2)"},r.a.createElement(_,{value:s,setValue:i,name:"Streckennummer"}),r.a.createElement(h.a,{variant:"h6",className:re.title},"Kilometrierung"),r.a.createElement(b.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(V.a,{required:!0,style:{marginRight:"5px"},id:"km",name:"km",placeholder:"z.B. 145",value:d,onChange:oe,inputProps:{style:{textAlign:"center"}}}),r.a.createElement(h.a,null,", "),r.a.createElement(V.a,{required:!0,style:{marginLeft:"5px"},id:"met",name:"met",placeholder:"02",value:f,onChange:oe,inputProps:{style:{textAlign:"center"}}})),r.a.createElement("br",null),r.a.createElement(h.a,{variant:"h6",className:re.title},"Seite"),r.a.createElement(b.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(y.a,{component:"fieldset"},r.a.createElement(j.a,{row:!0,required:!0,id:"seite",name:"seite",value:E,onChange:e=>k(e.target.value)},r.a.createElement(x.a,{value:"L",control:r.a.createElement(D.a,null),label:"L"}),r.a.createElement(x.a,{value:"R",control:r.a.createElement(D.a,null),label:"R"}))),r.a.createElement(V.a,{fullWidth:!0,label:"Sonstiges",id:"sonstiges",name:"sonstiges",value:S,onChange:e=>w(e.target.value),inputProps:{style:{textAlign:"center"}},InputLabelProps:{style:{textAlign:"center",width:"100%",marginLeft:"0"}}})),r.a.createElement("br",null),r.a.createElement(_,{name:"Mastnummer",value:I,setValue:L,disabled:null!==N&&10!==N}),r.a.createElement(h.a,{variant:"h6",className:re.title},"Wenn keine Mastnummer vorhanden ist, dann Vermarkungstr\xe4ger ausw\xe4hlen:"),r.a.createElement(y.a,{fullWidth:!0},r.a.createElement(M.a,{id:"demo-simple-select-label"},"Vermarkungstr\xe4ger"),r.a.createElement(T.a,{labelId:"vermarkungstraeger",id:"vermarkungstraeger",value:N,label:"Vermarkung",onChange:e=>(e=>{W(e.target.value),e.target.value&&L("")})(e),disabled:!!I},ce.map(e=>r.a.createElement(F.a,{key:e.value,value:e.value},e.label)))),r.a.createElement(_,{name:"Sonstiges",value:A,setValue:P,disabled:70!==N}),r.a.createElement("br",null),r.a.createElement(_,{value:R,setValue:U,name:"GVP L\xe4nge, mm"}),r.a.createElement("br",null),r.a.createElement(h.a,{variant:"h6",className:re.title},"Datum"),r.a.createElement("br",null),r.a.createElement(V.a,{required:!0,fullWidth:!0,name:"currentDate",placeholder:"z.B. 2023-10-20",value:ae,onChange:e=>{ne(e.target.value)},margin:"normal",inputProps:{style:{textAlign:"center"}}}),r.a.createElement("br",null),r.a.createElement(h.a,{variant:"h6",className:re.title},"Foto hochladen"),r.a.createElement("input",{ref:e=>t.current=e,required:!0,type:"file",name:"photo",accept:"image/*;capture=camera",onChange:e=>(e=>{const t=e.target.files[0];G(t)})(e)})),r.a.createElement(B,{handleSubmit:()=>{if(!q)return Q("Bitte w\xe4hlen Sie ein Foto aus, bevor Sie fortfahren."),void J("");const e=new FileReader;e.onload=async e=>{const t=e.target.result;const a=new Image;a.src=t,a.onload=async()=>{if(e.total<=524288){var n;const e=N?null===(n=ce.find(e=>e.value===N))||void 0===n?void 0:n.label:"",a={streckennummer:s,km:d,met:f,seite:E,sonstiges:S,mastnummer:I,selectedVermarkungstrager:e,sonstiges2:A,gvp:R,currentDate:ae,photo:t};try{const e=await m();await u(e,a);const t=await g(e);Y(t),J("Erfolgreich hinzugef\xfcgt"),ee(!0)}catch(c){console.error("Error adding or fetching submission: ",c)}}else{const e=document.createElement("canvas"),t=e.getContext("2d");e.width=a.width,e.height=a.height,t.drawImage(a,0,0,a.width,a.height);try{var r;const t=await new Promise(t=>{e.toBlob(t,"image/jpeg",1)}),a=await Object(K.a)(t,{maxSizeMB:.5,maxWidthOrHeight:1920,useWebWorker:!0});console.log("compressedFile instanceof Blob",a instanceof Blob),console.log("compressedFile size ".concat(a.size/1024/1024," MB"));const n=N?null===(r=ce.find(e=>e.value===N))||void 0===r?void 0:r.label:"",o={streckennummer:s,km:d,met:f,seite:E,sonstiges:S,mastnummer:I,selectedVermarkungstrager:n,sonstiges2:A,gvp:R,currentDate:ae,photo:a};try{const e=await m();await u(e,o);const t=await g(e);Y(t),J("Erfolgreich hinzugef\xfcgt"),ee(!0)}catch(c){console.error("Error adding or fetching submission: ",c)}}catch(c){console.error("Error compressing photo: ",c)}}}},e.readAsDataURL(q),t.current.value=""},downloadCombinedData:()=>{const e=new z.a,t="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge (m); Datum\n"+X.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(e.currentDate)}).join("\n");e.file("alle_daten.csv",t),X.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo;e.file(r,c)}),e.generateAsync({type:"blob"}).then(e=>{const t=window.URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="combined_data.zip",setTimeout(()=>{a.click()},100)})},downloadCombinedTodayData:()=>{const e=new z.a,t=X.filter(e=>e.currentDate===ae),a="Streckennummer;Kilometrierung; Seite; Sonstiges; Mastnummer; Vermarkung; Sonstiges Vermarkung; GVP L\xe4nge (m); Datum\n"+t.map(e=>{const t=(e.gvp/1e3).toLocaleString("de-DE",{minimumFractionDigits:2});return"".concat(e.streckennummer,";").concat(e.km,",").concat(e.met,";").concat(e.seite,";").concat(e.sonstiges,";").concat(e.mastnummer,";").concat(e.selectedVermarkungstrager,";").concat(e.sonstiges2,";").concat(t,";").concat(ae)}).join("\n");e.file("".concat(ae,".csv"),a),t.forEach((t,a)=>{const n=t.currentDate.replace(/-/g,"");let r;if(t.mastnummer)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.mastnummer,"_").concat(n,".jpg");else if(t.selectedVermarkungstrager&&"Sonstiges"!==t.selectedVermarkungstrager)r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.selectedVermarkungstrager,"_").concat(n,".jpg");else{if(!t.sonstiges2)return void console.error("Invalid submission data");r="".concat(t.streckennummer,"_").concat(t.km,",").concat(t.met,"_").concat(t.seite,"_").concat(t.sonstiges2,"_").concat(n,".jpg")}const c=t.photo;e.file(r,c)}),e.generateAsync({type:"blob"}).then(e=>{const t=(new Date).toISOString().slice(0,10),a=window.URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download="".concat(t,".zip"),setTimeout(()=>{n.click()},100)})}}),r.a.createElement(O.a,{open:!!H,autoHideDuration:7e3,onClose:(e,t)=>{"clickaway"!==t&&J("")}},r.a.createElement(C.a,{message:H,className:re.successSnackbar})),r.a.createElement(O.a,{open:!!$,autoHideDuration:12e3,onClose:(e,t)=>{"clickaway"!==t&&Q("")}},r.a.createElement(C.a,{message:$,className:re.errorSnackbar})))},ne=a(158),re=a(79),ce=a.n(re),oe=Object(l.a)((function(e){return{paper:{padding:e.spacing(3)},successSnackbar:{backgroundColor:"#92b493"},errorSnackbar:{backgroundColor:"#FF5722"},buttonContainer:{textAlign:"center",marginTop:e.spacing(2)},button:{margin:e.spacing(1),padding:"10px 20px",fontSize:"1rem",textTransform:"none"}}}));function le(e){var t=e.row,a=e.onClose,n=e.selectedValue,c=e.open,o=e.reff,l=e.setImportData,s=oe();return r.a.createElement(w.a,{onClose:function(){a(n)},"aria-labelledby":"simple-dialog-title",open:c},r.a.createElement(f.a,{elevation:3,className:s.paper},r.a.createElement(ae,{row:t,reff:o,setImportData:l})))}var se=function(e){var t=e.row,a=e.reff,n=e.selectedRowData,c=e.setImportData,o=oe(),l=r.a.useState(!1),s=Object(ee.a)(l,2),i=s[0],m=s[1],u=r.a.useState([]),g=Object(ee.a)(u,2),d=g[0],p=g[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:o.buttonContainer},r.a.createElement(ne.a,{"aria-label":"edit",onClick:function(){m(!0)},className:o.button},"Bearbeiten",r.a.createElement(ce.a,null)),r.a.createElement(le,{row:t,selectedValue:d,open:i,onClose:function(e){m(!1),p(n)},reff:a,selectedRowData:n,setImportData:c})))},ie=Object(l.a)((function(e){return{table:{minWidth:650},tableHead:{backgroundColor:"#6a8dbb",color:e.palette.common.white},editButton:{color:e.palette.secondary.main}}})),me=function(e){var t=e.importData,a=e.reff,n=e.setImportData,c=e.colNames;console.log(c);var o=ie();return r.a.createElement(X.a,{component:f.a},r.a.createElement(J.a,{className:o.table,"aria-label":"enhanced table"},r.a.createElement(Y.a,null,r.a.createElement(Z.a,{className:o.tableHead},c.map((function(e,t){return r.a.createElement(Q.a,{key:"keys-".concat(t),align:"right"},e)})),r.a.createElement(Q.a,{key:"keys-edit",align:"right"}))),r.a.createElement($.a,null,t.map((function(e,t){return r.a.createElement(Z.a,{key:t},c.map((function(t,a){return r.a.createElement(Q.a,{key:"values-".concat(a),align:"right"},e[t])})),r.a.createElement(Q.a,{key:"values-edit",align:"right"},r.a.createElement(se,{row:e,reff:a,setImportData:n})))})))))};const ue=Object(l.a)(e=>({root:{flexWrap:"wrap",width:"100%",height:"100%",backgroundColor:"#f4f4f4",display:"flex",justifyContent:"center","& > *":{padding:"10px",display:"flex",flexDirection:"column"}}}));var ge=()=>{const e=ue(),t=Object(n.useRef)(null),[a,c]=Object(n.useState)(!1),[o,l]=Object(n.useState)([]),[s,u]=Object(n.useState)([]),[g,d]=Object(n.useState)(!1);Object(n.useEffect)(()=>{const e=new Date,t=new Date(e);t.setHours(24,0,0,0);const a=12096e5+(t-e),n=setInterval(async()=>{try{const e=await m();await(async e=>new Promise((t,a)=>{const n=e.transaction(["submissions"],"readwrite").objectStore("submissions").clear();n.onsuccess=()=>{t()},n.onerror=e=>{a(e.target.error)}}))(e),console.log("IndexedDB cleared.")}catch(e){console.error("Error clearing IndexedDB: ",e)}},a);return console.log(a),()=>{clearInterval(n)}},[]);return r.a.createElement("div",{className:i()(e.root,"appWrapper")},r.a.createElement(H,{setShowTable:e=>{d(e),c(e)},setImportData:l,setColNames:u}),g&&r.a.createElement(r.a.Fragment,null,r.a.createElement(me,{importData:o,reff:t,setImportData:l,colNames:s})))},de=(a(111),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function pe(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ge,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/gv-targeterfassung-test",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/gv-targeterfassung-test","/service-worker.js");de?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):pe(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):pe(t,e)}))}}()},96:function(e,t,a){e.exports=a(112)}},[[96,1,2]]]);
//# sourceMappingURL=main.fe2ca0a4.chunk.js.map