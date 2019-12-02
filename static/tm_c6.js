//------------------------------------------------------------------------------
// Template-Manager
// - Laden und Bereitstellen von Template-Quellen
//------------------------------------------------------------------------------
// depends-on:
//    te
//------------------------------------------------------------------------------

'use strict'

if (APPETT == undefined) {
   var APPETT = {};
}

APPETT.TemplateManager_cl = class {
   constructor () {
      this.templates_o = {};
      this.compiled_o  = {};
      this.teCompiler_o = new APPETT.TemplateCompiler_cl();
      // Templates als Ressource anfordern und speichern
      var path_s = "/templates/";
      APPETT.xhr_o.request_px(path_s, 
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            this.templates_o = data_o['templates'];
            APPETT.es_o.publish_px("templates.loaded", null);
         }.bind(this),
         function (responseText_spl) {
            APPETT.es_o.publish_px("templates.failed", responseText_spl);
         }
      );
   }
   get_px (name_spl) {
      if (name_spl in this.templates_o) {
         return this.templates_o[name_spl];
      } else {
         return null;
      }
   }
   execute_px (name_spl, data_opl) {
      var compiled_o = null;
      if (name_spl in this.compiled_o) {
         compiled_o = this.compiled_o[name_spl];
      } else {
         // Übersetzen und ausführen
         if (name_spl in this.templates_o) {
            this.teCompiler_o.reset_px();
            compiled_o = this.teCompiler_o.compile_px(this.templates_o[name_spl]);
            this.compiled_o[name_spl] = compiled_o;
         }
      }
      if (compiled_o != null) {
         return compiled_o(data_opl);
      } else {
         return null;
      }
   }
}
// EOF