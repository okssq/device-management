"use strict";(self["webpackChunkdevice_management"]=self["webpackChunkdevice_management"]||[]).push([[982],{4982:(e,l,t)=>{t.r(l),t.d(l,{default:()=>we});var o=t(3673),n=t(2323),a=t(8880);const i={class:"my-box column no-wrap"},s={class:"bg-white q-pl-md q-pb-md q-mt-md"},m={class:"row items-center justify-end"},r={class:"flex1 overflow-hidden"},d=(0,o.Uk)(" 展开详情和表头字段等你发过来再改，没有我在自己去找 "),c={class:"text-primary q-pa-sm cursor-pointer",style:{"text-decoration":"underline"}},u={class:"q-gutter-sm"},p=(0,o.Uk)("功能1"),f=(0,o.Uk)("功能2"),w=(0,o.Uk)("功能3");function y(e,l,t,y,v,b){const _=(0,o.up)("q-input"),x=(0,o.up)("q-btn"),W=(0,o.up)("q-date"),g=(0,o.up)("q-popup-proxy"),h=(0,o.up)("q-icon"),k=(0,o.up)("q-form"),C=(0,o.up)("q-separator"),q=(0,o.up)("q-badge"),Z=(0,o.up)("q-item-label"),Q=(0,o.up)("q-item-section"),D=(0,o.up)("q-item"),z=(0,o.up)("q-list"),I=(0,o.up)("q-menu"),j=(0,o.up)("my-table"),S=(0,o.up)("del-confirm"),E=(0,o.up)("q-dialog"),H=(0,o.up)("edit-form"),M=(0,o.Q2)("close-popup");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",s,[(0,o.Wm)(k,{class:"q-gutter-sm row items-center"},{default:(0,o.w5)((()=>[(0,o.Wm)(_,{outlined:"",dense:"",placeholder:"终端ID"}),(0,o.Wm)(_,{outlined:"",dense:"",placeholder:"设备IMEI"}),(0,o.Wm)(_,{outlined:"",dense:"",placeholder:"版本号"}),(0,o.Wm)(_,{outlined:"",dense:"",placeholder:"ROM"}),(0,o.Wm)(_,{outlined:"",dense:"",placeholder:"创建日期"},{prepend:(0,o.w5)((()=>[(0,o.Wm)(h,{name:"event",class:"cursor-pointer"},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,o.w5)((()=>[(0,o.Wm)(W,{mask:"YYYY-MM-DD HH:mm"},{default:(0,o.w5)((()=>[(0,o._)("div",m,[(0,o.wy)((0,o.Wm)(x,{label:"Close",color:"primary",flat:""},null,512),[[M]])])])),_:1})])),_:1})])),_:1})])),_:1}),(0,o.Wm)(x,{icon:"search",color:"primary",dense:""}),(0,o.Wm)(x,{icon:"add",color:"primary",dense:""}),(0,o.Wm)(x,{icon:"file_download",color:"primary",dense:""})])),_:1})]),(0,o.Wm)(C),(0,o._)("div",r,[(0,o.Wm)(j,{expand:"","row-key":"id",rows:y.rows,columns:y.columns,total:100,page:1},{expand:(0,o.w5)((()=>[d])),"custom-active":(0,o.w5)((({val:e})=>[(0,o.Wm)(q,{class:"q-pa-xs",label:1==e?"启用":"关闭",color:1==e?"green":"red"},null,8,["label","color"])])),"custom-location":(0,o.w5)((({val:e})=>[(0,o._)("div",c,[(0,o._)("div",null,"经度: "+(0,n.zw)(e[0]),1),(0,o._)("div",null,"纬度: "+(0,n.zw)(e[1]),1)])])),"custom-type":(0,o.w5)((({val:e})=>[(0,o.Wm)(q,{class:"q-pa-xs",color:1==e?"blue-grey":"brown"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,n.zw)(1==e?"SGB-FG123":"SVH-HJ332"),1)])),_:2},1032,["color"])])),op:(0,o.w5)((()=>[(0,o._)("div",u,[(0,o.Wm)(x,{title:"编辑",flat:"",dense:"",size:"11px",round:"",color:"primary",icon:"edit",onClick:l[0]||(l[0]=(0,a.iM)((l=>y.onEdit(e.row)),["stop"]))}),(0,o.Wm)(x,{title:"删除",flat:"",dense:"",size:"11px",round:"",color:"red-5",icon:"clear",onClick:l[1]||(l[1]=(0,a.iM)((l=>y.onDel(e.row)),["stop"]))}),(0,o.Wm)(x,{flat:"",dense:"",size:"11px",color:"grey-7",icon:"more_vert"},{default:(0,o.w5)((()=>[(0,o.Wm)(I,null,{default:(0,o.w5)((()=>[(0,o.Wm)(z,null,{default:(0,o.w5)((()=>[(0,o.wy)(((0,o.wg)(),(0,o.j4)(D,{clickable:"",onClick:e.onItemClick},{default:(0,o.w5)((()=>[(0,o.Wm)(Q,null,{default:(0,o.w5)((()=>[(0,o.Wm)(Z,null,{default:(0,o.w5)((()=>[p])),_:1})])),_:1})])),_:1},8,["onClick"])),[[M]]),(0,o.wy)(((0,o.wg)(),(0,o.j4)(D,{clickable:"",onClick:e.onItemClick},{default:(0,o.w5)((()=>[(0,o.Wm)(Q,null,{default:(0,o.w5)((()=>[(0,o.Wm)(Z,null,{default:(0,o.w5)((()=>[f])),_:1})])),_:1})])),_:1},8,["onClick"])),[[M]]),(0,o.wy)(((0,o.wg)(),(0,o.j4)(D,{clickable:"",onClick:e.onItemClick},{default:(0,o.w5)((()=>[(0,o.Wm)(Q,null,{default:(0,o.w5)((()=>[(0,o.Wm)(Z,null,{default:(0,o.w5)((()=>[w])),_:1})])),_:1})])),_:1},8,["onClick"])),[[M]])])),_:1})])),_:1})])),_:1})])])),_:1},8,["rows","columns"])]),(0,o.Wm)(E,{modelValue:y.isDelConfirm,"onUpdate:modelValue":l[4]||(l[4]=e=>y.isDelConfirm=e),persistent:""},{default:(0,o.w5)((()=>[(0,o.Wm)(S,{onCancel:l[2]||(l[2]=e=>y.isDelConfirm=!1),onOk:l[3]||(l[3]=e=>y.isDelConfirm=!1)})])),_:1},8,["modelValue"]),(0,o.Wm)(E,{modelValue:y.isEdit,"onUpdate:modelValue":l[7]||(l[7]=e=>y.isEdit=e),persistent:"",style:{width:"600px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(H,{onCancel:l[5]||(l[5]=e=>y.isEdit=!1),onOk:l[6]||(l[6]=e=>y.isEdit=!1)})])),_:1},8,["modelValue"])])}var v=t(3514),b=t(8996);const _=e=>((0,o.dD)("data-v-c9ae5e1e"),e=e(),(0,o.Cn)(),e),x={class:"row q-px-md q-py-xs items-center justify-between"},W=_((()=>(0,o._)("div",{class:"text-body1"},"设备信息",-1))),g={class:"row no-wrap items-center my-form-item"},h=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),k={class:"row no-wrap items-center my-form-item"},C=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),q={class:"row no-wrap items-center my-form-item"},Z=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),Q={class:"row no-wrap items-center my-form-item"},D=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),z={class:"row no-wrap items-center my-form-item"},I=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),j={class:"row no-wrap items-center my-form-item"},S=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),E={class:"row no-wrap items-center my-form-item"},H=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),M={class:"row no-wrap items-center my-form-item"},U=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1))),V={class:"row no-wrap items-center my-form-item"},O=_((()=>(0,o._)("div",{class:"text-body2 my-form-label"},"label：",-1)));function R(e,l,t,n,a,i){const s=(0,o.up)("q-btn"),m=(0,o.up)("q-separator"),r=(0,o.up)("q-input"),d=(0,o.up)("q-form"),c=(0,o.up)("q-card-section"),u=(0,o.up)("q-card-actions"),p=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(p,{style:{width:"590px","max-width":"80vw"}},{default:(0,o.w5)((()=>[(0,o._)("div",x,[W,(0,o.Wm)(s,{flat:"",round:"",size:"12px",icon:"clear",onClick:l[0]||(l[0]=l=>e.$emit("cancel"))})]),(0,o.Wm)(m),(0,o.Wm)(c,{style:{"max-height":"50vh"},class:"scroll"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{onSubmit:n.onSubmit,onReset:n.onReset,class:"row q-gutter-md items-center"},{default:(0,o.w5)((()=>[(0,o._)("div",g,[h,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",k,[C,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",q,[Z,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",Q,[D,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",z,[I,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",j,[S,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",E,[H,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",M,[U,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})]),(0,o._)("div",V,[O,(0,o.Wm)(r,{dense:"",outlined:"","lazy-rules":"",class:"flex1 overflow-hidden"})])])),_:1},8,["onSubmit","onReset"])])),_:1}),(0,o.Wm)(m),(0,o.Wm)(u,{align:"right"},{default:(0,o.w5)((()=>[(0,o.Wm)(s,{flat:"",label:"取消",color:"primary",onClick:l[1]||(l[1]=l=>e.$emit("cancel"))}),(0,o.Wm)(s,{label:"确定",color:"primary",onClick:n.onOk},null,8,["onClick"])])),_:1})])),_:1})}var Y=t(8825),B=t(1959);const F={emits:["cancel","ok"],setup(e,{emit:l}){const t=(0,Y.Z)(),o=(0,B.iH)(null),n=(0,B.iH)(null),a=()=>{l("ok")};return{name:o,age:n,onOk:a,onSubmit(){!0!==accept.value?t.notify({color:"red-5",textColor:"white",icon:"warning",message:"You need to accept the license and terms first"}):t.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Submitted"})},onReset(){o.value=null,n.value=null,accept.value=!1}}}};var P=t(4260),G=t(151),L=t(5589),$=t(2165),A=t(5869),J=t(5269),T=t(4842),K=t(9367),N=t(7518),X=t.n(N);const ee=(0,P.Z)(F,[["render",R],["__scopeId","data-v-c9ae5e1e"]]),le=ee;X()(F,"components",{QCard:G.Z,QCardSection:L.Z,QBtn:$.Z,QSeparator:A.Z,QForm:J.Z,QInput:T.Z,QCardActions:K.Z});const te={components:{MyTable:v.Z,DelConfirm:b.Z,EditForm:le},setup(){const e=[{name:"no",field:"no",label:"设备ID",align:"left",sortable:!0},{name:"name",field:"name",label:"ICCID",align:"left"},{name:"active",field:"active",label:"状态",align:"left",type:"custom",sortable:!0},{name:"location",field:"location",label:"位置",align:"left",type:"custom"},{name:"sex",field:"sex",label:"硬件版本",align:"left",sortable:!0},{name:"type",field:"type",label:"终端型号",align:"left",type:"custom",sortable:!0},{name:"time",field:"time",label:"创建时间",align:"left",sortable:!0},{name:"op",label:"操作",field:"op",align:"center"}],l=[{id:"0",active:1,location:[131.224,12.384],no:"14210388",name:"sdgshnhjyxf",sex:"ver1.0.1",type:"1",time:"2021-06-04 13:05:05"},{id:"1",active:0,location:[131.224,12.384],no:"14210328",name:"gstewtet",sex:"ver1.0.4",type:"2",time:"2021-06-06 13:05:05"},{id:"2",active:0,location:[131.224,12.384],no:"14210388",name:"sdgshnhjyxf",sex:"ver1.0.1",type:"1",time:"2021-06-04 13:05:05"},{active:1,id:"3",location:[131.224,12.384],no:"14210328",name:"gstewtet",sex:"ver1.0.4",type:"1",time:"2021-06-06 13:05:05"},{active:0,id:"4",location:[131.224,12.384],no:"14210388",name:"sdgshnhjyxf",sex:"ver1.0.1",type:"2",time:"2021-06-04 13:05:05"},{active:1,id:"5",location:[131.224,12.384],no:"14210328",name:"gstewtet",sex:"ver1.0.4",type:"2",time:"2021-06-06 13:05:05"},{active:0,id:"6",location:[131.224,12.384],no:"14210388",name:"sdgshnhjyxf",sex:"ver1.0.1",type:"1",time:"2021-06-04 13:05:05"},{active:1,id:"7",location:[131.224,12.384],no:"14210328",name:"gstewtet",sex:"ver1.0.4",type:"1",time:"2021-06-06 13:05:05"},{active:1,id:"8",location:[131.224,12.384],no:"14210388",name:"sdgshnhjyxf",sex:"ver1.0.1",type:"2",time:"2021-06-04 13:05:05"},{active:0,id:"9",location:[131.224,12.384],no:"14210328",name:"gstewtet",sex:"ver1.0.4",type:"1",time:"2021-06-06 13:05:05"}],t=(0,B.iH)(!1),o=e=>{t.value=!0,console.log("onEdit",e)},n=(0,B.iH)(!1),a=e=>{n.value=!0,console.log("onDel",e)};return{columns:e,rows:l,isEdit:t,onEdit:o,isDelConfirm:n,onDel:a}}};var oe=t(4554),ne=t(3944),ae=t(2651),ie=t(9721),se=t(811),me=t(7011),re=t(3414),de=t(2035),ce=t(2350),ue=t(5926),pe=t(677);const fe=(0,P.Z)(te,[["render",y]]),we=fe;X()(te,"components",{QForm:J.Z,QInput:T.Z,QIcon:oe.Z,QPopupProxy:ne.Z,QDate:ae.Z,QBtn:$.Z,QSeparator:A.Z,QBadge:ie.Z,QMenu:se.Z,QList:me.Z,QItem:re.Z,QItemSection:de.Z,QItemLabel:ce.Z,QDialog:ue.Z}),X()(te,"directives",{ClosePopup:pe.Z})}}]);