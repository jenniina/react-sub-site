import{a as r}from"./axios-CCb-kr4I.js";const o="http://localhost:4000",a=`${o}/api/cart`,c=async(s,e)=>(await r.post(`${a}/${s}`,e)).data,p=async(s,e)=>(await r.get(`${a}/${s}/${e}`)).data,$=async(s,e)=>(await r.get(`${a}/${s}?userID=${e}`)).data,d=async(s,e,t)=>(await r.delete(`${a}/${s}/${e}?userID=${t}`)).data,u=async(s,e,t)=>(await r.put(`${a}/${s}/${e.orderID}?userID=${t}`,e)).data,l={newOrder:c,getOrderByOrderID:p,getAllOrders:$,deleteOrder:d,updateOrder:u};export{l as c};