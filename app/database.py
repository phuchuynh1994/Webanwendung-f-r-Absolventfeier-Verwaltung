# coding: utf-8
import os
import os.path
import codecs
import json
#----------------------------------------------------------
class Database_cl(object):
#----------------------------------------------------------

   #-------------------------------------------------------
    def __init__(self):
        self.data_a = [
            {
                "id": "0",
                "Anrede": "0",
                "Name": "0",
                "Vorname": "0",
                "Titel": "0",
                "Geburtdatum": "0",
                "strasse": "0",
                "Hausnummer": "0",
                "Postleitzahl": "0",
                "Ort": "0",

            },
            {
                 "id": "1",
                "Anrede": "Herr",
                "Name": "Huu Phuc",
                "Vorname": "Huynh",
                "Titel": "student",
                "Geburtdatum": "1998-12-12",
                "strasse": "westwall",
                "Hausnummer": "15",
                "Postleitzahl": "47798",
                "Ort": "krefeld"
            },
            {
                 "id": "2",
                "Anrede": "Frau",
                "Name": "trang thu",
                "Vorname": "nguyen",
                "Titel": "studentin",
                "Geburtdatum": "1910-10-12",
                "strasse": "westwall",
                "Hausnummer": "15",
                "Postleitzahl": "47798",
                "Ort": "krefeld"
            },
            {
                "id": "3",
                "Anrede": "Frau",
                "Name": "trang thu",
                "Vorname": "nguyen",
                "Titel": "studentin",
                "Geburtdatum": "1938-11-01",
                "strasse": "westwall",
                "Hausnummer": "15",
                "Postleitzahl": "47798",
                "Ort": "krefeld"
            }
        ]
        self.data = {}
        self.readData()
        self.anzahl = len(self.data)

    def create(self, data_opl):

        self.data.append(data_opl)
        self.anzahl = len(self.data)
        self.saveData()
        return self.anzahl


    def read(self, id=None):
        data = None
        if id == None:
            data = self.data
        else:
            id_s = int(id)
            if id_s > 0 and id_s < len(self.data) :
                data = self.data[id_s]
            else:

                data = self.data[0]
        return data


    def update(self, data_opl, id_opl):
        status = False

        for i in range(1,len(self.data)):
            print self.data[i]["id"]
            print id_opl
            if (str(self.data[i]["id"]) == str(id_opl)  ):
                self.data[i] = data_opl
                print self.data[i]

                self.saveData()
                status = True
        return status


    def delete(self, id_spl):
        status = False
        id = int(id_spl)
        print 2
        if id > 0 and id < len(self.data):
            print self.data[id]
            self.data.pop(id)
            for i in range(0,self.anzahl-1):
                self.data[i]['id'] = str(i);
            self.saveData()
            self.anzahl -= 1
        return status

    def getDataById(self,id_s):
        id = int(id_s)

        for id in range(0,len(self.data)):
            if (self.data[id]['id'] == id_s):
                return self.data[id]


    def readData(self):
        pass


    def saveData(self):
        pass
#--------------------------------------------------------------------------
class clDatabase_person(Database_cl):
# --------------------------------------------------------------------------
    def __init__(self):
        Database_cl.__init__(self)

    def saveData(self):
        data = {'data':None}
        data['data'] =self.data
        with codecs.open(os.path.join('/home/huynh/Downloads/demonstrator/data', 'person.json'), 'w',
                             'utf-8') as fp_o:
            json.dump(data, fp_o)

    def readData(self):
        try:
            fp_o = codecs.open(os.path.join('/home/huynh/Downloads/demonstrator/data', 'person.json'), 'r',
                                'utf-8')
        except:
            self.data = []
            self.saveData()
        else:
            with fp_o:
                data = json.load(fp_o)
                self.data = data['data']
# --------------------------------------------------------------------------
class clDatabase_gratulation(object):
# --------------------------------------------------------------------------
    def __init__(self):
        self.data =[
            {
              'id' : '0',
                'verwendung': '0',
                'path' : '0'
            },
            {
                'id' : '1',
                'verwendung' : 'geburt1.html',
                'path' : 'geburt1.html'
            }
        ]
        self.readData()
        self.anzahl = len(self.data)


    def create(self,data_opl): #import
        self.data.append(data_opl)
        self.anzahl = len(self.data)
        print self.anzahl
        self.saveData()
        return self.anzahl

    def read(self, id=None):
        data = None
        if id == None:
            data = self.data
        else:
            id_s = int(id)
            print id_s
            print id
            data = self.data[id_s]



        return data


    def update(self, data_opl, id_opl):
        status = False

        for i in range(1,len(self.data)):
            print self.data[i]["id"]
            print id_opl
            if (str(self.data[i]["id"]) == str(id_opl)  ):
                self.data[i] = data_opl
                print self.data[i]

                self.saveData()
                status = True
        return status


    def delete(self, id_spl):
        status = False
        id = int(id_spl)
        print 2
        if id > 0 and id < len(self.data):
            print self.data[id]
            self.data.pop(id)
            for i in range(0,self.anzahl-1):
                self.data[i]['id'] = str(i);
            self.saveData()
            self.anzahl = len(self.data)
        return status

    def getDataById(self,id_s):
        id = int(id_s)

        for id in range(0,len(self.data)):
            if (self.data[id]['id'] == id_s):
                return self.data[id]


    def saveData(self):
        data = {'data': None}
        data['data'] = self.data
        with codecs.open(os.path.join('/home/huynh/Downloads/demonstrator/data', 'gratulation.json'), 'w',
                         'utf-8') as fp_o:
            json.dump(data, fp_o)


    def readData(self):
        try:
            fp_o = codecs.open(os.path.join('/home/huynh/Downloads/demonstrator/data', 'gratulation.json'), 'r',
                               'utf-8')
        except:
            self.data = []
            self.saveData()
        else:
            with fp_o:
                data = json.load(fp_o)
                self.data = data['data']

    def geth_path(self,path):
        path_s = '/home/huynh/Downloads/demonstrator/congratstempl/'
        path_s += path
        return path

    def readPath(self):
        file_a = os.listdir('/home/huynh/Downloads/demonstrator/congratstempl/')
        data_o = []

        i = 1
        for file_name in file_a:
            data = {}
            data['id'] = str(i)
            data['path'] = file_name
            data_o.append(data)
            i = i+1
        return data_o

    def searchPathById(self,id):
        data = self.readPath()
        for i in range(0,len(data)):
            if (str(id) == data[i]['id']):
                return data[i]['path']




# EOF