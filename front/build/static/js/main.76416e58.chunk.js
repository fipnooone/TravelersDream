(this.webpackJsonpdream=this.webpackJsonpdream||[]).push([[0],{65:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(20),s=n(2),c=n(1),i=n.n(c),r=n(33),o=n.n(r),l=n(23),d=n(35),u=n(9),p=n.n(u),h=n(0),m=["component"],j=function(e){var t=e.component,n=Object(d.a)(e,m),a=p.a.get(),c=!!a.data&&!!JSON.parse(a.data).token;return Object(h.jsx)(s.b,Object(l.a)(Object(l.a)({},n),{},{render:function(e){switch(e.location.pathname){case!1===c&&"/auth":return Object(h.jsx)(t,{props:e});case!0===c&&"/auth":return Object(h.jsx)(s.a,{to:"/lk"});case!0===c&&"/lk":return Object(h.jsx)(t,{props:e});default:return Object(h.jsx)(s.a,{to:"/auth"})}}}))},g=n(8),b=n.n(g),y=n(12),x=n(14),O=n(15),f=n(17),v=n(16),w=n(11),N=n.n(w);function I(e,t){return k.apply(this,arguments)}function k(){return(k=Object(y.a)(b.a.mark((function e(t,n){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("method",t),a.append("data",JSON.stringify(n)),e.next=5,N.a.post("http://dream",a).then((function(e){return e.data.success?{success:!0,data:e.data}:{success:!1,data:e.data}})).catch((function(e){return{success:!1,error:!0,err:e}}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(e,t,n){return C.apply(this,arguments)}function C(){return(C=Object(y.a)(b.a.mark((function e(t,n,a){var s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(s=new FormData).append("method",t),s.append("data",JSON.stringify(n)),a.map((function(e){return s.append("files[]",e)})),e.next=6,N.a.post("http://dream",s,{cache:!1,contentType:!1,processData:!1}).then((function(e){return e.data.success?{success:!0,data:e.data.data}:{success:!1,data:e.data.data}})).catch((function(e){return{success:!1,error:!0,err:e}}));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){return JSON.parse(p.a.get("data")).token}var L=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(x.a)(this,n),(a=t.call(this,e)).changeText=function(e){a.setState({loginText:e})},a.setAuth=function(e){a.setState({auth:e})},a.handleSubmit=function(){var e=Object(y.a)(b.a.mark((function e(t){var n,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),""!==(n={login:document.getElementById("LoginInput").value,password:document.getElementById("PasswordInput").value}).login&&""!==n.password&&n.login.length<=255&&n.password.length<=255&&((s=new FormData).append("method","login"),s.append("data",JSON.stringify({login:n.login,password:n.password})),N.a.post("http://dream",s).then((function(e){e.data.success?(a.changeText(""),a.setAuth(!0),p.a.set("data",JSON.stringify({token:e.data.token}),{expires:new Date((new Date).getTime()+15778476e3)}),(a.props.history||a.props.props.history).push({pathname:"/lk",state:{auth:a.state.auth}})):a.changeText(e.data.message)})).catch((function(e){a.changeText("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0438 \u043a \u0441\u0435\u0440\u0432\u0435\u0440\u0443")})));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.handleRegister=function(){var e=Object(y.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),""==(n={fio:document.getElementById("Name").value,login:document.getElementById("Login").value,password:document.getElementById("Password").value}).fio||""!=n.login&&""!=n.password?""!==n.login&&""!==n.password&&I("register",{fio:a.state.regData.name,login:n.login,password:n.password}).then((function(e){e.success?(a.setAuth(!0),p.a.set("data",JSON.stringify({token:e.data.token}),{expires:new Date((new Date).getTime()+15778476e3)}),(a.props.history||a.props.props.history).push({pathname:"/lk",state:{auth:a.state.auth}})):(a.changeText(e.data.message),document.getElementById("Name").style.display="block",document.getElementById("Login").style.display="none",document.getElementById("Password").style.display="none")})):(a.setState({regData:{name:n.fio}}),I("isNewUserByFio",{fio:n.fio}).then((function(e){e.success&&(document.getElementById("Name").style.display="none",document.getElementById("Login").style.display="block",document.getElementById("Password").style.display="block")})));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={auth:!1,loginText:"",currAction:!0,regData:{name:""}},a}return Object(O.a)(n,[{key:"render",value:function(){var e,t=this;return e=this.state.currAction?Object(h.jsxs)("div",{className:"login-data",children:[Object(h.jsx)("input",{id:"LoginInput",type:"email",placeholder:"\u041b\u043e\u0433\u0438\u043d",onChange:this.handleAdd,maxLength:"255"}),Object(h.jsx)("input",{id:"PasswordInput",type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",onChange:this.handleAdd,maxLength:"255"}),Object(h.jsx)("button",{id:"Submit",onClick:this.handleSubmit,children:"\u0412\u043e\u0439\u0442\u0438"})]}):Object(h.jsxs)("div",{id:"regBlock",className:"login-data",children:[Object(h.jsx)("input",{id:"Name",type:"text",placeholder:"\u0424\u0418\u041e",maxLength:"255"}),Object(h.jsx)("input",{id:"Login",type:"email",placeholder:"\u041b\u043e\u0433\u0438\u043d",maxLength:"255"}),Object(h.jsx)("input",{id:"Password",type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",maxLength:"255"}),Object(h.jsx)("button",{onClick:this.handleRegister,children:"\u0414\u0430\u043b\u0435\u0435"})]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("header",{className:"auth-header",children:Object(h.jsxs)("ul",{className:"main-ul",children:[Object(h.jsx)("li",{id:"Logo",children:Object(h.jsx)("img",{src:"Sources/images/logo.png",alt:""})}),Object(h.jsxs)("li",{id:"Auth",children:[Object(h.jsx)("a",{className:"button button-login",onClick:function(){return t.setState({currAction:!0})},children:"\u0412\u043e\u0439\u0442\u0438"}),Object(h.jsx)("a",{className:"button button-register",onClick:function(){return t.setState({currAction:!1})},children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"}),Object(h.jsx)("div",{className:"selection-shadow"})]})]})}),Object(h.jsx)("div",{id:"Authorization",children:Object(h.jsxs)("div",{className:"Form",children:[Object(h.jsxs)("svg",{width:"64",height:"78",viewBox:"0 0 64 78",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(h.jsx)("path",{d:"M32 0H52C58.6274 0 64 5.37258 64 12V51.76C64 55.9458 61.8189 59.8291 58.2444 62.0073L38.2444 74.1948C34.4095 76.5317 29.5905 76.5317 25.7556 74.1948L5.75557 62.0073C2.18114 59.8291 0 55.9458 0 51.76V12C0 5.37258 5.37258 0 12 0H32Z",fill:"#0e1118"}),Object(h.jsx)("path",{d:"M31.9963 37.7037C26.9645 37.7037 22.6665 38.4971 22.6665 41.6704C22.6665 44.8449 26.9377 45.6662 31.9963 45.6662C37.0282 45.6662 41.3262 44.8741 41.3262 41.6996C41.3262 38.5251 37.0562 37.7037 31.9963 37.7037Z",fill:"#FAFAFA"}),Object(h.jsx)("path",{opacity:"0.4",d:"M31.9963 34.681C35.4239 34.681 38.1703 31.9335 38.1703 28.507C38.1703 25.0805 35.4239 22.333 31.9963 22.333C28.5698 22.333 25.8223 25.0805 25.8223 28.507C25.8223 31.9335 28.5698 34.681 31.9963 34.681Z",fill:"#FAFAFA"})]}),Object(h.jsx)("p",{id:"TextLogin",children:this.state.loginText}),e]})})]})}}]),n}(c.Component),U=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(x.a)(this,n),(a=t.call(this,e)).handleOutsideClick=function(e){a.box&&null!==a.box.current&&!a.box.current.contains(e.target)&&"visible"===window.getComputedStyle(document.getElementById("UserHeaderMore")).getPropertyValue("visibility")&&(document.getElementById("UserHeaderMore").style.visibility="hidden")},a.state={username:"",type:"",picture:"",blocks:[],types:[],currentUser:{action:"",id:0,originalData:{}}},a.box=i.a.createRef(),a.getUserInfo(),a.getEmployees(),a.getTypes(),a}return Object(O.a)(n,[{key:"getUserInfo",value:function(){var e=this;I("getUserInfo",{token:E(),keys:["name","type","photo"]}).then((function(t){t.success&&!t.error?e.setState({username:t.data.data.name,type:t.data.data.type,picture:t.data.data.photo}):e.logOut()}))}},{key:"getEmployees",value:function(){var e=this;I("getEmployees",{token:E()}).then((function(t){if(t.success&&!t.error){var n=[];t.data.data.users.map((function(t){n.push(Object(h.jsxs)("div",{className:"not-enought",onClick:function(){e.showCreatePanel("update",t.id,t.name,t.fio,t.bdate,t.typeid-1,t.photo),e.state.currentUser.action="update"},children:[Object(h.jsx)("img",{className:"user-picture",src:t.photo,alt:""}),Object(h.jsxs)("div",{className:"user-info-nt",children:[Object(h.jsx)("p",{className:"user-name user-text",children:t.name}),Object(h.jsx)("p",{className:"user-type user-text",children:t.type})]})]}))})),e.setState({blocks:n})}}))}},{key:"getTypes",value:function(){var e=this;I("getTypes",{token:E()}).then((function(t){if(t.success&&!t.error){var n=[],a=0;t.data.data.types.map((function(e){n.push(Object(h.jsx)("option",{value:a,children:e})),a+=1})),e.setState({types:n})}}))}},{key:"componentDidMount",value:function(){document.addEventListener("click",this.handleOutsideClick)}},{key:"showMore",value:function(){"hidden"===window.getComputedStyle(document.getElementById("UserHeaderMore")).getPropertyValue("visibility")?document.getElementById("UserHeaderMore").style.visibility="visible":document.getElementById("UserHeaderMore").style.visibility="hidden"}},{key:"logOut",value:function(){p.a.remove("data",{path:"",domain:"localhost"}),this.props.props.history.push({pathname:"/auth"})}},{key:"mib",value:function(){document.getElementById("LKMIB").style.visibility="hidden",document.getElementById("LKMIB-CNew").style.animation="hideToDown 0.3s",document.getElementById("LKMIB-CNew").style.visibility="hidden",document.getElementById("LKMIB-CNew").style.opacity="0"}},{key:"showCreatePanel",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"http://dream/profilepictures/0.png";this.setState({currentUser:{action:e,id:t,originalData:{name:n,fio:a,bdate:s,type:c,photo:i}}}),document.getElementById("CNewTitle").textContent="create"===e?"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435":n,document.getElementById("inputName").value=n,document.getElementById("inputFIO").value=a,document.getElementById("inputBDate").value=s,document.getElementById("selectType").value=c,document.getElementById("imageInput").src=i,document.getElementById("LKMIB").style.visibility="visible",document.getElementById("LKMIB").style.opacity="1",document.getElementById("LKMIB-CNew").style.animation="showFromUp 0.3s",document.getElementById("LKMIB-CNew").style.visibility="visible",document.getElementById("LKMIB-CNew").style.opacity="1"}},{key:"render",value:function(){var e=this;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("header",{children:Object(h.jsxs)("ul",{className:"main-ul",children:[Object(h.jsx)("li",{id:"Logo",children:Object(h.jsx)("img",{src:"Sources/images/logo.png",alt:""})}),Object(h.jsxs)("li",{id:"UserHeader",children:[Object(h.jsxs)("div",{className:"user-header-main",id:"UserHeaderMain",ref:this.box,onClick:function(){return e.showMore()},children:[Object(h.jsx)("p",{className:"user-name",children:this.state.username}),Object(h.jsx)("img",{className:"user-picture",src:this.state.picture,alt:""})]}),Object(h.jsxs)("div",{className:"user-header-more",id:"UserHeaderMore",children:[Object(h.jsx)("a",{className:"button-profile",children:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"}),Object(h.jsx)("a",{className:"button-logout",onClick:function(){return e.logOut()},children:"\u0412\u044b\u0439\u0442\u0438"})]}),Object(h.jsx)("div",{className:"selection-shadow"})]})]})}),Object(h.jsxs)("div",{id:"LK",children:[Object(h.jsxs)("div",{className:"control-panel",children:[Object(h.jsxs)("div",{className:"gr-list",children:[Object(h.jsx)("p",{children:"\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438"}),Object(h.jsx)("p",{children:"\u041a\u043b\u0438\u0435\u043d\u0442\u044b"}),Object(h.jsx)("p",{children:"\u0410\u0433\u0435\u043d\u0442\u044b"})]}),Object(h.jsxs)("div",{className:"list-of",children:[Object(h.jsx)("p",{className:"button-create",onClick:function(){e.showCreatePanel("create"),e.state.currentUser.action="create"},children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"}),this.state.blocks]})]}),Object(h.jsx)("div",{id:"LKMIB",className:"mib",onClick:function(){return e.mib()}}),Object(h.jsxs)("div",{id:"LKMIB-CNew",className:"create-new",children:[Object(h.jsxs)("div",{className:"title-block",children:[Object(h.jsx)("p",{id:"CNewTitle",className:"title-name"}),Object(h.jsx)("svg",{className:"title-close",viewBox:"0 0 20 20",onClick:function(){return e.mib()},children:Object(h.jsx)("path",{fill:"white",d:"M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"})})]}),Object(h.jsxs)("div",{className:"input-block",children:[Object(h.jsxs)("div",{className:"text-input",children:[Object(h.jsxs)("div",{className:"input-name input-row",children:[Object(h.jsx)("p",{children:"\u0418\u043c\u044f"}),Object(h.jsx)("input",{id:"inputName",type:"text"})]}),Object(h.jsxs)("div",{className:"input-fio input-row",children:[Object(h.jsx)("p",{children:"\u0424\u0418\u041e"}),Object(h.jsx)("input",{id:"inputFIO",type:"text",onChange:function(e){var t=e.target.value.split(" ");document.getElementById("inputName").value=(t[0]?t[0]:"")+(t[1]?" ".concat(t[1][0],"."):"")+(t[2]?" ".concat(t[2][0],"."):"")}})]}),Object(h.jsxs)("div",{className:"input-date input-row",children:[Object(h.jsx)("p",{children:"\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f"}),Object(h.jsx)("input",{id:"inputBDate",type:"date"})]}),Object(h.jsxs)("div",{className:"input-type input-row",children:[Object(h.jsx)("p",{children:"\u0422\u0438\u043f"}),Object(h.jsx)("select",{id:"selectType",children:this.state.types})]}),Object(h.jsx)("button",{className:"button-save",onClick:function(){var t={},n={name:document.getElementById("inputName").value,fio:document.getElementById("inputFIO").value,bdate:document.getElementById("inputBDate").value,type:+document.getElementById("selectType").value+1,photo:e.state.currentUser.photo};if(console.log(e.state.currentUser.action),"update"==e.state.currentUser.action){var a=e.state.currentUser.originalData;Object.keys(a).map((function(e){n[e]!=a[e]&&"photo"!==e&&(t[e]=n[e])})),B("updateUserInfo",{token:E(),id:e.state.currentUser.id,keys:t},[n.photo?n.photo:void 0]).then((function(t){e.getUserInfo(),e.getEmployees(),e.getTypes(),e.showCreatePanel(n.name,n.id,n.name,n.fio,n.bdate,n.type-1,e.state.currentUser.photo?window.URL.createObjectURL(n.photo):a.photo)}))}else if("create"==e.state.currentUser.action){var s=e.state.currentUser.originalData;Object.keys(s).map((function(e){n[e]!=s[e]&&"photo"!==e&&(t[e]=n[e])})),B("createUser",{token:E(),keys:t},[n.photo?n.photo:void 0]).then((function(t){e.getUserInfo(),e.getEmployees(),e.getTypes(),e.showCreatePanel(n.name,n.id,n.name,n.fio,n.bdate,n.type-1,e.state.currentUser.photo?window.URL.createObjectURL(n.photo):s.photo)}))}},children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]}),Object(h.jsxs)("div",{className:"image-input-block",children:[Object(h.jsx)("p",{className:"image-title",children:"\u0424\u043e\u0442\u043e"}),Object(h.jsx)("input",{id:"imageInput",className:"image-input",type:"image",onClick:function(){return document.getElementById("fileInput").click()}}),Object(h.jsx)("input",{id:"fileInput",type:"file",accept:"image/*",onChange:function(t){e.state.currentUser.photo=t.target.files[0],document.getElementById("imageInput").src=window.URL.createObjectURL(t.target.files[0])}})]})]})]})]})]})}}]),n}(c.Component),S=(n(65),function(){return Object(h.jsx)(a.a,{children:Object(h.jsxs)(s.d,{children:[Object(h.jsx)(s.a,{exact:!0,from:"/",to:"/auth"}),Object(h.jsx)(j,{exact:!0,path:"/auth",component:L}),Object(h.jsx)(j,{exact:!0,path:"/lk",component:U}),Object(h.jsx)(s.a,{from:"/",to:"/auth"})]})})});o.a.render(Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("noscript",{children:"\u0412\u0438\u0434\u0438\u043c\u043e, \u0432\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 JavaScript, \u043b\u0438\u0431\u043e \u043e\u043d \u0432\u044b\u043a\u043b\u044e\u0447\u0435\u043d. \u0412\u043a\u043b\u044e\u0447\u0438\u0442\u0435 \u0435\u0433\u043e \u0434\u043b\u044f \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u0441\u0430\u0439\u0442\u0430."}),Object(h.jsx)(S,{}),Object(h.jsx)("footer",{children:Object(h.jsxs)("div",{className:"footer-block",children:[Object(h.jsx)("p",{className:"Org-Name text",children:'\u041e\u041e\u041e "\u041c\u0435\u0447\u0442\u0430 \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u0430"'}),Object(h.jsx)("img",{id:"LogoFooter",src:"Sources/images/logo-ru.png",alt:""}),Object(h.jsx)("a",{className:"Sign text",href:"http://fipnoo.one",target:"_blank",rel:"noopener noreferrer",children:"developed by fipnooone"})]})})]}),document.getElementsByTagName("body")[0])}},[[66,1,2]]]);
//# sourceMappingURL=main.76416e58.chunk.js.map