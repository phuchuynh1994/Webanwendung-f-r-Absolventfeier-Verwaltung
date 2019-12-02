//------------------------------------------------------------------------------
//Demonstrator es/te/tm - Variante mit ES6-Classes
//------------------------------------------------------------------------------
// hier zur Vereinfachung (!) die Klassen in einer Datei

'use strict'
class SideBar_cl {

   constructor (el_spl, template_spl) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.configHandleEvent_p();
   }
   render_px (data_opl) {
      let markup_s = APPETT.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }
   handleEvent_p (event_opl) {
      let cmd_s = event_opl.target.dataset.action;
      APPETT.es_o.publish_px("app.cmd", [cmd_s, null]);
   }
}

class Application_cl {

   constructor () {
      // Registrieren zum Empfang von Nachrichten
      APPETT.es_o.subscribe_px(this, "templates.loaded");
      APPETT.es_o.subscribe_px(this, "templates.failed");
      APPETT.es_o.subscribe_px(this, "app.cmd");
      this.sideBar_o = new SideBar_cl("aside", "sidebar.tpl.html");
      this.listView_o = new APP.ListView_cl("main", "list.tpl.html","person");
      this.detailView_o = new APP.DetailView_cl ("main", "detail.tpl.html","person");
      this.listView_gratulation = new APP.ListView_cl("main","listGratulation.tpl.html","gratulation");
      this.detailView_gratulation = new APP.DetailView_cl ("main", "detailGratulation.tpl.html","gratulation");
      this.listAnnuallist_o = new APP.listViewGeburtag("main","annuallist.tpl.html","annuallist");
      this.significantbirthdays_List_o = new APP.significantbirthdays_List ("main","signficant.tpl.html","significantbirthdays");
      this.vorlage_o = new APP.ListView_cl("main","detailGratulation.tpl.html","vorlage");
      this.erstellen_o = new APP.listView_erstellen("main","erstellen.html","congratulation");
   }
   notify_px (self, message_spl, data_opl) {
      switch (message_spl) {
      case "templates.failed":
         alert("Vorlagen konnten nicht geladen werden.");
         break;
      case "templates.loaded":
          //Templates stehen zur Verfügung, Bereiche mit Inhalten füllen
         // hier zur Vereinfachung direkt
         let markup_s;
         let el_o;
         markup_s = APPETT.tm_o.execute_px("header.tpl.html", null);
         el_o = document.querySelector("header");
         if (el_o != null) {
           el_o.innerHTML = markup_s;
         }
         markup_s = APPETT.tm_o.execute_px("version.tpl.html", null);
         el_o = document.querySelector("#version");
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
         markup_s = APPETT.tm_o.execute_px("footer.tpl.html", null);
         el_o = document.querySelector("footer");
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }

         let nav_a = [
            ["home", "Startseite"],
            ["list", "Liste"],
            ["template","Vorlagen"],
            ["annual","annuallist"],
            ["significantbirthdays","significantbirthdays"],
            ["erstellen","erstellen"]
         ];
         self.sideBar_o.render_px(nav_a);
         markup_s = APPETT.tm_o.execute_px("home.tpl.html", null);
         el_o = document.querySelector("main");
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
         break;
      
      case "app.cmd":
         // hier müsste man überprüfen, ob der Inhalt gewechselt werden darf
         switch (data_opl[0]) {
         case "home":
            let markup_s = APPETT.tm_o.execute_px("home.tpl.html", null);
            let el_o = document.querySelector("main");
            if (el_o != null) {
               el_o.innerHTML = markup_s;
            }
            break;
         case "list":
            // Daten anfordern und darstellen
            this.listView_o.render_px();
            break;
         case "detail":
            this.detailView_o.render_px(data_opl[1]);
            break;
         case "idBack":
            APPETT.es_o.publish_px("app.cmd", ["list", null]);
            break;
         case "deletedPerson":
            this.detailView_o.delete_px()
            break;
         case "template":
            this.listView_gratulation.render_px();
            break;
         case "detail_G":
            this.detailView_gratulation.render_px(data_opl[1]);
            break;
         case "annual":
            this.listAnnuallist_o.render_px();
            break;
         case "significantbirthdays":
            this.significantbirthdays_List_o.render_px();
            break;
         case "list_template":
            this.vorlage_o.render_px();
            break;
         case "erstellen":
            this.erstellen_o.render_px();
            break;
         }
         break;
      }
   }
}

window.onload = function () {
   APPETT.xhr_o = new APPETT.XHR_cl();
   APPETT.es_o = new APPETT.EventService_cl();
   var app_o = new Application_cl();
   APPETT.tm_o = new APPETT.TemplateManager_cl();
}