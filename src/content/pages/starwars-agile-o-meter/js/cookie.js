function Get_Cookie(name) { 
   var start = document.cookie.indexOf(name+"="); 
   var len = start+name.length+1; 
   if ((!start) && (name != document.cookie.substring(0,name.length))) return null; 
   if (start == -1) return null; 
   var end = document.cookie.indexOf(";",len); 
   if (end == -1) end = document.cookie.length; 
   return unescape(document.cookie.substring(len,end)); 
} 

function Set_Cookie(name,value,expires,path,domain,secure) { 
    var cookieString = name + "=" +escape(value) + 
       ( (expires) ? ";expires=" + expires.toGMTString() : "") + 
       ( (path) ? ";path=" + path : "") + 
       ( (domain) ? ";domain=" + domain : "") + 
       ( (secure) ? ";secure" : ""); 
    document.cookie = cookieString; 
} 

function Delete_Cookie(name,path,domain) { 
   if (Get_Cookie(name)) document.cookie = name + "=" + 
      ( (path) ? ";path=" + path : "") + 
      ( (domain) ? ";domain=" + domain : "") + 
      ";expires=Thu, 01-Jan-70 00:00:01 GMT"; 
} 

var today = new Date(); 
var zero_date = new Date(0,0,0); 
today.setTime(today.getTime() - zero_date.getTime()); 
var cookie_expire_date = new Date(today.getTime() + (8 * 7 * 86400000)); 

function setVisitorID() { 
   if (Get_Cookie('VisitorID')) { 
       var VisitorID = Get_Cookie('VisitorID'); 
   }else{ 
       Set_Cookie('VisitorID',Math.random(),cookie_expire_date); 
   } 
} 

function setSessionID() { 
   if (!Get_Cookie('SessionID')) 
       Set_Cookie('SessionID',Math.random()); 
} 

var loaded_script = true; 