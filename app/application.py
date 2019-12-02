# coding: utf-8

# Demonstrator / keine Fehlerbehandlung

import cherrypy
import json
import ast
from .database import Database_cl, clDatabase_person,clDatabase_gratulation
from .view import View_cl
from verabeitung import Geburtstag_veraibeitung

# Method-Dispatching!

# Übersicht Anforderungen / Methoden

"""

Anforderung       GET          POST         PUT           DELETE
----------------------------------------------------------------



"""

class Person_cl(object):

   def __init__(self):
      self.db_o = clDatabase_person()
      self.view_o = View_cl()
      self.datum_o = Geburtstag_veraibeitung()

   def GET(self,id =None):
      relVal_s =''
      if id == None :
         relVal_s = self.getList_p()
      else:
         relVal_s = self.getDetail_p(id)
      return relVal_s

   def DELETE(self, id):
      relVal_s = ''
      self.db_o.delete(id)

      relVal_s = self.getList_p()
      print relVal_s
      return relVal_s

   def POST(self,data):
      relval_s = ''
      data['id'] = str(self.db_o.anzahl)
      self.db_o.create(data)
      relval_s = self.getList_p()
      return relval_s

   def PUT(self,data):
      relval_s = ''
      id = data['id']

      self.db_o.update(data,id)
      relval_s = self.getList_p()
      print relval_s
      return relval_s

   def getList_p(self):
      data_a = self.db_o.read()
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)

   def getDetail_p(self, id):
      data_o = self.db_o.read(id)
      return self.view_o.createDetail_px(data_o)

#----------------------------------------------------------
class clTemplate_Gratulation(object):
#----------------------------------------------------------
   def __init__(self):
      self.db_o = clDatabase_gratulation()
      self.view_o = View_cl()
      self.datum_o = Geburtstag_veraibeitung()
   def GET(self,id = None):
      self.db_o.readPath()
      relVal_s =''
      if id == None :
         relVal_s = self.getList_p()
         print relVal_s
      else:
         relVal_s = self.getDetail_p(id)
      return relVal_s


   def DELETE(self, id):
      relVal_s = ''
      self.db_o.delete(id)

      relVal_s = self.getList_p()
      return relVal_s


   def POST(self,data):
      relval_s = ''
      id = data['id']
      path = self.db_o.searchPathById(id)
      print str(self.db_o.anzahl)
      data_o ={
         'id': str(self.db_o.anzahl),
         'verwendung':data['verwendung'],
         'path': path
      }
      self.db_o.create(data_o)
      relval_s = self.getList_p()
      return relval_s

   def PUT(self,data):
      relval_s = ''
      id = data['id']
      self.db_o.update(data,id)
      relval_s = self.getList_p()
      return relval_s


   def getList_p(self):
      data_a = self.db_o.read()
         # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)

   def getDetail_p(self, id):
      data_o = self.db_o.read(id)
      return self.view_o.createDetail_px(data_o)

#----------------------------------------------------------
class Vorlage_cl(object):
#----------------------------------------------------------
   def __init__(self):
      self.db_o = clDatabase_gratulation()
      self.view_o = View_cl()


   def GET(self, id =None):
      if id == None:
         relVal_s = self.getList_p()
         return relVal_s
      elif len(id) >=2:
         i = int(id[0])
         data_a = self.db_o.read(str(i))
         print data_a
         pfad = '/home/huynh/Downloads/demonstrator/congratstempl/' + data_a['path']
         return pfad
      else:
         print id
         data_a = self.db_o.read(id)
         print data_a
         file = open('/home/huynh/Downloads/demonstrator/congratstempl/'+data_a['path'],'r')
         str =  file.read()
         print str
         return str

   def getList_p(self):
      data_a = self.db_o.readPath()
      return self.view_o.createList_px(data_a)

class Annuallist(object):
#----------------------------------------------------------
   def __init__(self):
      self.view_o = View_cl()

   def GET(self,id =None):
      relVal_s = ''
      relVal_s = self.getList_p()
      return relVal_s

   def getList_p(self):
      db_o = Geburtstag_veraibeitung()
      data = db_o.significantbirthdaysList()
      return self.view_o.createDetail_px(data)

#----------------------------------------------------------
class significantbirthdays(object):
#----------------------------------------------------------
   def __init__(self):
      self.view_o = View_cl()

   def GET(self,id =None):
      if id ==None:
         relVal_s = self.getList_p()
         return relVal_s


   def POST(self,data):
      start = data['start']
      month = data['specificMonth']
      db_o = Geburtstag_veraibeitung()
      relVal_s =self.view_o.createList_px(db_o.nextSignficantBirthdaysList(int(start),int(month)))
      print relVal_s
      return relVal_s


   def getList_p(self):
      db_o = Geburtstag_veraibeitung()
      data = db_o.significantbirthdaysList_2()
      return self.view_o.createList_px(data)
#---------------------------------------------------------------
class congratulation(object):
#-------------------------------------------------------------

   def __init__(self):
      self.view_o = View_cl()

   def GET(self,id =None):
      print self.get_erstellung()
      return self.get_erstellung()

   def get_erstellung(self):
      db_o = Geburtstag_veraibeitung()
      data_tmp= db_o.significantbirthdaysList()
      data_person =[]
      for i in range(0,len(data_tmp)):
         if (data_tmp[i]['sign'] == 'signficant'):
            data_person.append(data_tmp[i])
      db_vorlage = clDatabase_gratulation()
      data_vorlage_tmp = db_vorlage.read()
      data_vorlage = data_vorlage_tmp[1:]
      data = {
         'person': data_person,
         'vorlage':data_vorlage
      }
      return self.view_o.createList_px(data)

   def POST(self,data):
      id_person = data['person']
      id_vorlage = data['vorlage']
      data =self.getDaten_vorlage(id_person,id_vorlage)
      return self.view_o.createList_px(data)

   def getDaten_vorlage(self,id_person,id_vorlage):
      db_person = clDatabase_person()
      data_person = db_person.read(id_person)
      db_vorlage = clDatabase_gratulation()
      data_vorlage = db_vorlage.read(id_vorlage)
      file = open('/home/huynh/Downloads/demonstrator/congratstempl/' + data_vorlage['path'], 'r')
      str = file.read()
      data_o ={
         'name' : data_person['Name']+" "+data_person['Vorname'],
         'Anrede':data_person['Anrede'],
         'adress':data_person['strasse']+" " + data_person['Hausnummer']+" " + data_person['Postleitzahl']+" " +data_person['Ort'],
         'string':str
      }
      print data_o
      return data_o

#----------------------------------------------------------
class Application_cl(object):
#----------------------------------------------------------

   exposed = True # gilt für alle Methoden
   @cherrypy.tools.accept(media='application/json')
   #-------------------------------------------------------
   def __init__(self):
   #-------------------------------------------------------
      # spezielle Initialisierung können hier eingetragen werden
      self.handler_o = {
         'person' : Person_cl(),
         'gratulation': clTemplate_Gratulation(),
         'annuallist': Annuallist(),
         'significantbirthdays':significantbirthdays(),
         'vorlage': Vorlage_cl(),
         'congratulation': congratulation()
      }

   #-------------------------------------------------------
   def GET(self,path_spl, id=None):
   #-------------------------------------------------------
      retVal_s = ''

      if path_spl in self.handler_o:
         retVal_s = self.handler_o[path_spl].GET(id)
      else:
         cherrypy.expose.status = 404
      return retVal_s

   def DELETE(self,path_spl, id):
      retVal_s =''
      if path_spl in self.handler_o:
         retVal_s = self.handler_o[path_spl].DELETE(id)
      else:
         cherrypy.expose.status = 404
      return retVal_s

   def POST(self, path_spl):
       data = cherrypy.request.body.read()
       print data
       data_dict = ast.literal_eval(data)
       relVal_s = ''
       if path_spl in self.handler_o:
          relVal_s = self.handler_o[path_spl].POST(data_dict)

       else:
          cherrypy.expose.status = 404
       return relVal_s

   def PUT(self, path_spl):
      data = cherrypy.request.body.read()
      data_dict = ast.literal_eval(data)
      relVal_s = ''
      print data
      if path_spl in self.handler_o:
         relVal_s = self.handler_o[path_spl].PUT(data_dict)
      return relVal_s


   #-------------------------------------------------------

# EOF