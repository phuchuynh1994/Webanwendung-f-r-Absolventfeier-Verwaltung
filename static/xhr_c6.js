//------------------------------------------------------------------------------
// Anforderungen per XMLHTTPRequest
//------------------------------------------------------------------------------

'use strict'

if (APPETT == undefined) {
   var APPETT = {};
}

APPETT.XHR_cl = class {
   constructor () {
      this.xhttp_o = new XMLHttpRequest();
      this.xhttp_o.onreadystatechange = this.onreadystatechange_p.bind(this);
   }
   onreadystatechange_p () {
      if (this.xhttp_o.readyState == 4 && this.xhttp_o.status == 200) {
         this.success_p(this.xhttp_o.responseText);
      } else if (this.xhttp_o.readyState == 4 && this.xhttp_o.status != 200) {
         this.fail_p(this.xhttp_o.responseText);
      }
   }
   deleteRequest_px(path_spl,success_ppl, fail_ppl){
      this.success_p = success_ppl;
      this.fail_p = fail_ppl;
      this.xhttp_o.open("DELETE", path_spl, true);
      this.xhttp_o.send();

   }
   request_px (path_spl, success_ppl, fail_ppl) {
      this.success_p = success_ppl;
      this.fail_p = fail_ppl;
      this.xhttp_o.open("GET", path_spl, true);
      this.xhttp_o.send();
   }
   insertRequest_px(path_spl,success_ppl,fail_ppl,data){
      this.success_p = success_ppl;
      this.fail_p = fail_ppl;
      //this.xhttp_o.setRequestHeader('Content-type','application/json; charset=utf-8');
      this.xhttp_o.open("POST", path_spl, true);
      this.xhttp_o.setRequestHeader('Content-type','application/json; charset=utf-8');
      this.xhttp_o.send(data);
   }
   updateRequest_px(path_spl,success_ppl,fail_ppl,data){
      this.success_p = success_ppl;
      this.fail_p = fail_ppl;
      this.xhttp_o.open("PUT", path_spl, true);
      this.xhttp_o.setRequestHeader('Content-type','application/json; charset=utf-8');
      this.xhttp_o.send(data);
   }



}
// EOF