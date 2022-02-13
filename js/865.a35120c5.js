"use strict";(self["webpackChunkdevice_management"]=self["webpackChunkdevice_management"]||[]).push([[865],{8865:(e,t,a)=>{a.r(t),a.d(t,{default:()=>M});var n=a(3673);const o={class:"my-box column no-wrap"},l={class:"bg-white q-pl-md q-pb-md q-mt-md"},s={class:"row items-center justify-end"},i={class:"row items-center justify-end"},m={class:"bg-white q-pa-md",style:{height:"220px"}},r={class:"flex1 overflow-hidden"},c={class:"q-gutter-sm"};function p(e,t,a,p,d,u){const y=(0,n.up)("q-btn"),f=(0,n.up)("q-date"),w=(0,n.up)("q-popup-proxy"),g=(0,n.up)("q-icon"),h=(0,n.up)("q-time"),b=(0,n.up)("q-input"),q=(0,n.up)("q-select"),_=(0,n.up)("q-form"),v=(0,n.up)("my-echarts"),W=(0,n.up)("q-separator"),S=(0,n.up)("q-badge"),x=(0,n.up)("my-table"),Z=(0,n.Q2)("close-popup");return(0,n.wg)(),(0,n.iD)("div",o,[(0,n._)("div",l,[(0,n.Wm)(_,{class:"q-gutter-sm row items-center"},{default:(0,n.w5)((()=>[(0,n.Wm)(b,{outlined:"",dense:"",placeholder:"时间"},{prepend:(0,n.w5)((()=>[(0,n.Wm)(g,{name:"event",class:"cursor-pointer"},{default:(0,n.w5)((()=>[(0,n.Wm)(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,n.w5)((()=>[(0,n.Wm)(f,{modelValue:e.date,"onUpdate:modelValue":t[0]||(t[0]=t=>e.date=t),mask:"YYYY-MM-DD HH:mm"},{default:(0,n.w5)((()=>[(0,n._)("div",s,[(0,n.wy)((0,n.Wm)(y,{label:"Close",color:"primary",flat:""},null,512),[[Z]])])])),_:1},8,["modelValue"])])),_:1})])),_:1})])),append:(0,n.w5)((()=>[(0,n.Wm)(g,{name:"access_time",class:"cursor-pointer"},{default:(0,n.w5)((()=>[(0,n.Wm)(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,n.w5)((()=>[(0,n.Wm)(h,{mask:"YYYY-MM-DD HH:mm",format24h:""},{default:(0,n.w5)((()=>[(0,n._)("div",i,[(0,n.wy)((0,n.Wm)(y,{label:"Close",color:"primary",flat:""},null,512),[[Z]])])])),_:1})])),_:1})])),_:1})])),_:1}),(0,n.Wm)(b,{outlined:"",dense:"",placeholder:"设备IMEI号"}),(0,n.Wm)(q,{dense:"",outlined:"",label:"设备类型",placeholder:"设备类型",style:{width:"180px"},"dropdown-icon":"mdi-chevron-down",options:["手环","打卡点","摄像头","其他设备"]}),(0,n.Wm)(y,{icon:"search",color:"primary",dense:""}),(0,n.Wm)(y,{icon:"add",color:"primary",dense:""}),(0,n.Wm)(y,{icon:"file_download",color:"primary",dense:""})])),_:1})]),(0,n._)("div",m,[(0,n.Wm)(v,{cid:"c1",options:p.options},null,8,["options"])]),(0,n.Wm)(W),(0,n._)("div",r,[(0,n.Wm)(x,{rows:p.rows,columns:p.columns,total:20,page:1},{"custom-type":(0,n.w5)((({val:e})=>[(0,n.Wm)(S,{class:"q-pa-xs",color:p.typeColorObj[e],label:p.typeTextObj[e]},null,8,["color","label"])])),op:(0,n.w5)((()=>[(0,n._)("div",c,[(0,n.Wm)(y,{title:"查看",color:"primary",flat:"",dense:"",size:"11px",round:"",icon:"remove_red_eye"}),(0,n.Wm)(y,{title:"导出",color:"red-5",flat:"",dense:"",size:"11px",round:"",icon:"get_app"})])])),_:1},8,["rows","columns"])])])}var d=a(3740),u=a(3514),y=a(1959);const f={components:{MyEcharts:d.Z,MyTable:u.Z},setup(){const e=[{name:"username",field:"username",label:"IMEI",align:"left"},{name:"type",field:"type",label:"设备类型",align:"left",type:"custom"},{name:"time",field:"time",label:"操作时间",align:"left"},{name:"content",field:"content",label:"操作内容",align:"left"},{name:"op",label:"操作",field:"op",align:"center"}],t=[{username:"shg54h45he",type:"1",time:"2021-06-05 13:05:05",content:"****************"},{username:"tq43t3gt3",type:"2",time:"2021-06-05 13:05:05",content:"****************"},{username:"3q4g43t",type:"3",time:"2021-06-05 13:05:05",content:"****************"},{username:"34ttqt",type:"4",time:"2021-06-05 13:05:05",content:"****************"},{username:"rgaerga34re",type:"5",time:"2021-06-05 13:05:05",content:"****************"},{username:"3q4g43t",type:"3",time:"2021-06-05 13:05:05",content:"****************"},{username:"34ttqt",type:"4",time:"2021-06-05 13:05:05",content:"****************"},{username:"3q4g43t",type:"3",time:"2021-06-05 13:05:05",content:"****************"},{username:"34ttqt",type:"4",time:"2021-06-05 13:05:05",content:"****************"},{username:"3q4g43t",type:"3",time:"2021-06-05 13:05:05",content:"****************"},{username:"34ttqt",type:"4",time:"2021-06-05 13:05:05",content:"****************"},{username:"3q4g43t",type:"3",time:"2021-06-05 13:05:05",content:"****************"},{username:"34ttqt",type:"4",time:"2021-06-05 13:05:05",content:"****************"}],a=(0,y.Um)({tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},confine:!0,legend:{data:["类1","类2","类3","类4","类5"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["00:00-04:00","04:00-08:00","09:00-12:00","12:00-16:00","16:00-20:00","20:00-24:00"]}],yAxis:[{type:"value"}],series:[{name:"类1",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"none",lineStyle:{width:2},itemStyle:{opacity:.7}},data:[120,132,101,134,90,230,210]},{name:"类2",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"none",scale:!1,lineStyle:{width:2},itemStyle:{opacity:.7}},data:[220,182,191,234,290,330,310]},{name:"类3",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"none",scale:!1,lineStyle:{width:2},itemStyle:{opacity:.7}},data:[150,232,201,154,190,330,410]},{name:"类4",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"none",scale:!1,lineStyle:{width:2},itemStyle:{opacity:.7}},data:[320,332,301,334,390,330,320]},{name:"类5",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"none",scale:!1,lineStyle:{width:2},itemStyle:{opacity:.7}},data:[820,932,901,934,1290,1330,1320]}]}),n={1:"primary",2:"green",3:"orange",4:"secondary",5:"red"},o={1:"手环设备",2:"监控设备",3:"充电设备",4:"打卡设备",5:"其他设备"};return{columns:e,rows:t,options:a,typeColorObj:n,typeTextObj:o}}};var w=a(4260),g=a(5269),h=a(4842),b=a(4554),q=a(3944),_=a(2651),v=a(2165),W=a(5990),S=a(8516),x=a(5869),Z=a(9721),k=a(677),Q=a(7518),T=a.n(Q);const C=(0,w.Z)(f,[["render",p]]),M=C;T()(f,"components",{QForm:g.Z,QInput:h.Z,QIcon:b.Z,QPopupProxy:q.Z,QDate:_.Z,QBtn:v.Z,QTime:W.Z,QSelect:S.Z,QSeparator:x.Z,QBadge:Z.Z}),T()(f,"directives",{ClosePopup:k.Z})}}]);