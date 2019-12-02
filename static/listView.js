'use strict'
if (APP == undefined) {
   var APP = {};
}

APP.ListView_cl = class {

   constructor (el_spl, template_spl,action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
      this.configHandleEvent_p();

   }
   render_px () {
      // Daten anfordern
      let path_s = "/app/" + this.action + "/";
      APPETT.xhr_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            //alert(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         }
      );
   }

   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p,false);
      }
   }

   handleEvent_p (event_opl) {


      if (event_opl.target.tagName.toUpperCase() == "TD") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o != null) {
            elx_o.classList.remove("clSelected");
         }
         event_opl.target.parentNode.classList.add("clSelected");
         event_opl.preventDefault();
      } else if (event_opl.target.id == "idShowListEntry") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            APPETT.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            event_opl.stopPropagation();
            event_opl.preventDefault();
         }
      } else if (event_opl.target.id == "idDelete"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            let id = elx_o.id;
            let path_s = "/app/person/" + id;
            APPETT.xhr_o.deleteRequest_px(path_s,
                function (responseText_spl) {
                    let data_o = JSON.parse(responseText_spl);
                    let listView_o = new APP.ListView_cl("main", "list.tpl.html","person");
                    listView_o.render_px();
                }.bind(this),
                function (responseText_spl) {
                    alert("List - render failed");
                });
            event_opl.stopPropagation();
            event_opl.preventDefault();
         }

      } else if(event_opl.target.id == "import"){
        let elx_o = document.querySelector(".clSelected");
        APPETT.es_o.publish_px("app.cmd", ["list_template", null] );
        event_opl.stopPropagation();
        event_opl.preventDefault();
      }
        else if(event_opl.target.id == "import_vorlage"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
         alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            let id = elx_o.id;
            let path = elx_o.path;
            let data ={};
            data.id = id;
            data.path = elx_o.path;
            var form = document.getElementsByTagName("form");
            var inputs = form[0].getElementsByTagName("input");
            for (var i = 0; i< inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
            let json = JSON.stringify(data);


            let path_s ="/app/gratulation/";
            APPETT.xhr_o.insertRequest_px(path_s,
             function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                let listView_o = new APP.ListView_cl("main", "listGratulation.tpl.html","gratulation");
                listView_o.render_px();
             }.bind(this),
             function (responseText_spl) {
                alert("Detail - render failed");
             }, json);
            event_opl.stopPropagation();
            event_opl.preventDefault();

         }

      }


      else if (event_opl.target.id == "idDelete_vorlage"){
       let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            let id = elx_o.id;
            let path_s = "/app/gratulation/" + id;
            APPETT.xhr_o.deleteRequest_px(path_s,
                function (responseText_spl) {
                    let data_o = JSON.parse(responseText_spl);
                    let listView_gratulation = new APP.ListView_cl("main","listGratulation.tpl.html","gratulation");
                    listView_gratulation.render_px();
                }.bind(this),
                function (responseText_spl) {
                    alert("List - render failed");
                });
            event_opl.stopPropagation();
            event_opl.preventDefault();
      }
      }
      else if (event_opl.target.id == "idInsert"){
        APPETT.es_o.publish_px("app.cmd", ["detail", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

        // APPETT.es_o.publish_px("app.cmd", ["detail", "0"] );
         //event_opl.preventDefault();
      //}
      else if(event_opl.target.id == "show_content"){
      let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            let id = elx_o.id;
            let path_s = "/app/vorlage/" + id;
             APPETT.xhr_o.request_px(path_s,
                function (responseText_spl) {
                    let data_o = responseText_spl;
                    //alert(data_o);
                    let markup_s = APPETT.tm_o.execute_px("vorlage.html", null);
            let el_o = document.querySelector("#content");
            if (el_o != null) {
               el_o.innerHTML = markup_s;
               document.getElementById("content").innerHTML = data_o;
            }
                }.bind(this),
                function (responseText_spl) {
                    alert("List - render failed");
                });
            event_opl.stopPropagation();
            event_opl.preventDefault();

            }

      }
      else if (event_opl.target.id == "getPath"){
       let elx_o = document.querySelector(".clSelected");
       if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            let id = elx_o.id;
            let path_s = "/app/vorlage/" + id+"path";
             APPETT.xhr_o.request_px(path_s,
                function (responseText_spl) {
                    let data_o = responseText_spl;
                    alert(data_o);
                }.bind(this),
                function (responseText_spl) {
                    alert("List - render failed");
                });
            event_opl.stopPropagation();
            event_opl.preventDefault();

            }
      }

      else {
      event_opl.stopPropagation();
         event_opl.preventDefault();
      }

   }

   doRender_p (data_opl) {
      let markup_s = APPETT.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }
}
//////////////////////////////////////////////////////////////////
APP.listViewGeburtag = class {
   constructor (el_spl, template_spl,action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
      this.configHandleEvent_p();

   }
   render_px () {
      // Daten anfordern
      let path_s = "/app/" + this.action + "/";
      APPETT.xhr_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         }
      );
   }

    doRender_p (data_opl) {
      let markup_s = APPETT.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }

   configHandleEvent_p () {

      }

   handleEvent_p(){

   }
}

APP.significantbirthdays_List = class {
   constructor (el_spl, template_spl,action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
      this.configHandleEvent_p();

   }
   render_px () {
      // Daten anfordern
      let path_s = "/app/" + this.action + "/";
      APPETT.xhr_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         }
      );
   }
   doRender_p (data_opl) {
      let markup_s = APPETT.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p,false);
      }
   }

   handleEvent_p(event_opl){
    if (event_opl.target.id == "submit") {
        let data = {};
        var form = document.getElementsByTagName("form");
        var inputs = form[0].getElementsByTagName("input");
        for (var i = 0; i< inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
        var selects = form[0].getElementsByTagName("select");
        for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }

        let json = JSON.stringify(data);
        let path_s = "/app/significantbirthdays/";
        APPETT.xhr_o.insertRequest_px(path_s,
        function (responseText_spl) {
        let data_o = JSON.parse(responseText_spl);
        let markup_s = APPETT.tm_o.execute_px("signficant.tpl.html", data_o);
        let el_o = document.querySelector("main");
        if (el_o != null) {
            el_o.innerHTML = markup_s;
        }
             }.bind(this),
        function (responseText_spl) {
            alert("Detail - render failed");
             }, json);
            event_opl.stopPropagation();
            event_opl.preventDefault();
        }
   }
}
////////////////////////////////////
APP.listView_erstellen = class {
   constructor (el_spl, template_spl,action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
      this.configHandleEvent_p();

   }
   render_px () {
      // Daten anfordern
      let path_s = "/app/" + this.action + "/";
      APPETT.xhr_o.request_px(path_s,
         function (responseText_spl) {

            let data_o = JSON.parse(responseText_spl);
            //document.write(data_o['person'][0]['datum']);
            //let abc = data_o['person'];
            //document.write(abc.toString());
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         }
      );
   }

    doRender_p (data_opl) {
      let markup_s = APPETT.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }

   configHandleEvent_p () {
        let el_o = document.querySelector(this.el_s);
        if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p,false);
      }
    }
   handleEvent_p(event_opl){
    if (event_opl.target.id == "erstellung"){
    let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
         let data = {};
         data.person = elx_o.id;
         var form = document.getElementsByTagName("form");
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data.vorlage = selects[i].value;
         }
         let json = JSON.stringify(data);
         let path_s = "/app/congratulation/";

             APPETT.xhr_o.insertRequest_px(path_s,
             function (responseText_spl) {
             //document.write(responseText_spl);
                let data_o = JSON.parse(responseText_spl);
                let markup_s = APPETT.tm_o.execute_px("gratulationsschreiben", data_o);
                let el_o = document.querySelector("main");
                if (el_o != null) {
                    el_o.innerHTML = markup_s;
                }
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
