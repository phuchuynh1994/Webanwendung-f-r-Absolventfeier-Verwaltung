# coding: utf-8

from datetime import datetime
from database import clDatabase_person

class Geburtstag_veraibeitung(object):

    def __init__(self):
        self.db_o = clDatabase_person()
        self.datum=[]
        for i in range(1,len(self.db_o.data)):
            data = {
                'id' :None,
                'datum':None
            }
            data['id'] = self.db_o.data[i]['id'];
            data['datum'] = self.db_o.data[i]['Geburtdatum']
            self.datum.append(data)


    def getYear(self,date):
        string_Date = date
        year =int(string_Date[0:4])
        return year

    def getMonth(self,date):
        stringDate = date
        month = int(stringDate[5:7])
        return month

    def getDay(self,date):
        stringDate = date
        day = int(stringDate[8:10])
        return day

    def Geburtstag_Vergleich(self,date):
        now = datetime.now()
        status = False
        if (now.month < self.getMonth(date)) or (now.month == self.getMonth(date) and now.day <= self.getDay(date)):
            status = True
            return status
        return status

    def significantbirthdays(self,date):
         if (self.Geburtstag_Vergleich(date) == True):
            now = datetime.now()
            yearIntervall =now.year - self.getYear(date)
            if yearIntervall % 5 == 0 and yearIntervall >=70 and yearIntervall <= 100:
                return True
         else:
             return False

    def significantbirthdaysList(self):
        data =[]
        for i in range(0,len(self.datum)):
            print self.datum[i]['datum']
            if (self.Geburtstag_Vergleich(self.datum[i]['datum']) == True):
                if(self.significantbirthdays(self.datum[i]['datum']) == True):
                    data_o = {
                        'id' : self.datum[i]['id'],
                        'datum': self.datum[i]['datum'],
                        'sign': 'signficant'
                    }
                    data.append(data_o)
                else:
                    data_o = {
                        'id': self.datum[i]['id'],
                        'datum': self.datum[i]['datum'],
                        'sign': 'nonesign'
                    }
                    data.append(data_o)
        return data
    def significantbirthdaysList_2(self):
        data = []
        for i in range(0, len(self.datum)):
            if (self.significantbirthdays(self.datum[i]['datum']) == True):
                data_o = {
                    'id': self.datum[i]['id'],
                    'datum': self.datum[i]['datum'],
                }
                data.append(data_o)
        return data

    def nextSignficantBirthdaysList(self,startzeitpunkt,month):
        data =[]
        now = datetime.now()
        for i in range(0,len(self.datum)):
            yearInterval = now.year - self.getYear(self.datum[i]['datum']) + startzeitpunkt
            if (yearInterval %5 == 0 and yearInterval >= 70 and yearInterval <=100):
                if self.getMonth(self.datum[i]['datum']) == month:
                    data.append(self.datum[i])
        return data

    def month_convert(self, moth_name):
        print moth_name
        if moth_name == 'Januar':
            return 1
        elif moth_name == 'Februar':
            return 2
        elif moth_name == 'Maerz':
            return 3
        elif moth_name == 'April':
            return 4
        elif moth_name == 'Mai':
            return 5
        elif moth_name == 'Juni':
            return 6
        elif moth_name == 'Juli':
            return 7
        elif moth_name == 'August':
            return 8
        elif moth_name == 'September':
            return 9
        elif moth_name == 'Oktober':
            return 10
        elif moth_name == 'November':
            return 11
        elif moth_name == 'Dezember':
            return 12
        else:
            return 0
