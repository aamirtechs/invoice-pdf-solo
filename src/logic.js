"use strict";
function round2(n){return Math.round((Number(n)||0)*100)/100;}
function lineTotal(item){var q=Number(item&&item.qty)||0;var p=Number(item&&item.unitPrice)||0;return round2(q*p);}
function computeTotals(items,opts){opts=opts||{};var list=items||[];var subtotal=round2(list.reduce(function(s,i){return s+lineTotal(i);},0));
var dType=opts.discountType||"none";var dVal=Number(opts.discountValue)||0;var discount=0;
if(dType==="percent")discount=round2(subtotal*dVal/100);else if(dType==="fixed")discount=round2(Math.min(dVal,subtotal));
var taxable=round2(subtotal-discount);var rate=Number(opts.taxRate)||0;var taxAmount=0;var total=0;var net=taxable;
if(opts.taxInclusive){taxAmount=rate>0?round2(taxable*rate/(100+rate)):0;net=round2(taxable-taxAmount);total=taxable;}
else{taxAmount=round2(taxable*rate/100);total=round2(taxable+taxAmount);}
return{subtotal:subtotal,discount:discount,taxable:taxable,taxRate:rate,taxInclusive:!!opts.taxInclusive,taxAmount:taxAmount,net:net,total:total};}
function formatCurrency(amount,currency){var c=(currency||"USD").toUpperCase();try{return new Intl.NumberFormat("en-US",{style:"currency",currency:c}).format(Number(amount)||0);}catch(e){return c+" "+(Number(amount)||0).toFixed(2);}}
var PREFIX={invoice:"INV",quote:"QUO",receipt:"REC"};
function docPrefix(docType){return PREFIX[docType]||"INV";}
function nextNumber(existingNumbers,docType,startAt){var p=docPrefix(docType);var max=Number(startAt)||0;var list=existingNumbers||[];
list.forEach(function(n){var m=String(n).match(new RegExp("^"+p+"-(\\d+)$"));if(m)max=Math.max(max,parseInt(m[1],10));});
return p+"-"+String(max+1).padStart(4,"0");}
function validateInvoice(inv){var errs=[];if(!inv||!inv.seller)errs.push("Seller name is required");if(!inv||!inv.client)errs.push("Client name is required");
if(!inv||!inv.items||!inv.items.length)errs.push("At least one line item is required");
(inv&&inv.items||[]).forEach(function(it,i){if(!(Number(it.qty)>0))errs.push("Item "+(i+1)+" qty must be positive");if(it.unitPrice===""||it.unitPrice===null||typeof it.unitPrice==="undefined")errs.push("Item "+(i+1)+" needs a unit price");});
if(!["invoice","quote","receipt"].includes(inv&&inv.docType))errs.push("Document type must be invoice, quote or receipt");return errs;}
function pdfPlan(inv){var t=computeTotals(inv.items,inv);var lines=(inv.items||[]).map(function(it){return{description:it.description||"",qty:Number(it.qty)||0,unitPrice:Number(it.unitPrice)||0,total:lineTotal(it)};});
return{docType:inv.docType,number:inv.number||"",title:(inv.docType||"invoice").toUpperCase(),seller:inv.seller||"",client:inv.client||"",currency:inv.currency||"USD",lines:lines,totals:t,page:{width:595,height:842,margin:50}};}
const api={round2:round2,lineTotal:lineTotal,computeTotals:computeTotals,formatCurrency:formatCurrency,docPrefix:docPrefix,nextNumber:nextNumber,validateInvoice:validateInvoice,pdfPlan:pdfPlan};
if(typeof module!=="undefined"&&module.exports){module.exports=api;}
if(typeof window!=="undefined"){window.InvoicePdfSolo=api;}
