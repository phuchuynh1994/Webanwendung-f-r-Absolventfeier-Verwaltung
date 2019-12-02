'use strict'
if (APP == undefined) {
   var APP = {};
}

APP.DetailView_cl = class {

   constructor (el_spl, template_spl,action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
   }
   render_px (id_spl) {
      // Daten anfordern
      let path_s = "/app/" + this.action +"/" + id_spl;
      APPETT.xhr_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }
      );
   }
   doRender_p (data_opl) {
      let markup_s = APPETT.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
         this.configHandleEvent_p();
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector("form");
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }
   handleEvent_p (event_opl) {
      if (event_opl.target.id == "idBack") {
         APPETT.es_o.publish_px("app.cmd", ["idBack", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }
      else if(event_opl.target.id == "idSave") {

         let data = {};

         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i< inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }

         //data.id = document.getElementById('id').value;
        // data.Anrede = document.getElementById('Anrede').value;

         //data.Name = document.getElementById('Name').value;
        // data.Vorname = document.getElementById('Vorname').value;
        // data.Titel = document.getElementById('Titel').value;
        // data.Geburtdatum = document.getElementById('Geburtdatum').value;
        // data.strasse = document.getElementById('strasse').value;
        // data.Hausnummer = document.getElementById('Hausnummer').value;
        // data.Postleitzahl = document.getElementById('Postleitzahl').value;
        // data.Ort = document.getElementById('Ort').value;
         let json = JSON.stringify(data);
         let path_s = "/app/person/";
         if (data['id'] ==0){
             APPETT.xhr_o.insertRequest_px(path_s,
             function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                let listView_o = new APP.ListView_cl("main", "list.tpl.html","person");
                listView_o.render_px();
             }.bind(this),
             function (responseText_spl) {
                alert("Detail - render failed");
             }, json);
            event_opl.stopPropagation();
            event_opl.preventDefault();
        }
        else {
         APPETT.xhr_o.updateRequest_px(path_s,
             function (responseText_spl) {
                //let data_o = JSON.parse(responseText_spl);
                let listView_o = new APP.ListView_cl("main", "list.tpl.html","person");
                listView_o.render_px();
             }.bind(this),
             function (responseText_spl) {
                alert("Detail - render failed");
             }, json);
            event_opl.stopPropagation();
            event_opl.preventDefault();
        }
      }
      else if (event_opl.target.id == "idBack_G"){
      alert("back");
         APPETT.es_o.publish_px("app.cmd", ["template", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();

       }
       else if (event_opl.target.id == "idSave_G"){
        let data ={};
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i< inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
        let json = JSON.stringify(data);
         let path_s = "/app/gratulation/";
         if (data['id'] == 0){
             APPETT.xhr_o.insertRequest_px(path_s,
             function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                let listView_gratulation = new APP.ListView_cl("main","listGratulation.tpl.html","gratulation");
                listView_gratulation.render_px();
             }.bind(this),
             function (responseText_spl) {
                alert("Detail - render failed");
             }, json);
             event_opl.stopPropagation();
             event_opl.preventDefault();
         }
         else{
          APPETT.xhr_o.updateRequest_px(path_s,
             function (responseText_spl) {
                //let data_o = JSON.parse(responseText_spl);
                let listView_gratulation = new APP.ListView_cl("main","listGratulation.tpl.html","gratulation");
                listView_gratulation.render_px();
             }.bind(this),
             function (responseText_spl) {
                alert("Detail - render failed");
             }, json);
             event_opl.stopPropagation();
             event_opl.preventDefault();
         }
        }
   }
}
// EOF
