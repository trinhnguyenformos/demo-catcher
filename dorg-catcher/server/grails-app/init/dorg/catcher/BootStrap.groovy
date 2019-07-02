package dorg.catcher

class BootStrap {

    def init = { servletContext ->
        new dorg.catcher.DomainHit(companyDomain: "atpi.com", companyName: "Advanced Travel Partners", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 125, lastAction: "04/12/19", clientStatus: "Neither", grade: "B").save()
        new dorg.catcher.DomainHit(companyName: "Advanced EPM Consulting", companyDomain: "advancedepm.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 148, lastAction: "04/12/19", clientStatus: "Neither", grade: "D").save()
        new dorg.catcher.DomainHit(companyName: "Advantage Business Media", companyDomain: "advantagemedia.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 129, lastAction: "04/12/19", clientStatus: "Current", grade: "B").save()
        new dorg.catcher.DomainHit(companyName: "Advantage Technologies", companyDomain: "atechnologies.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 137, lastAction: "04/12/19", clientStatus: "Former", grade: "C").save()
        new dorg.catcher.DomainHit(companyName: "Advanticom advanticom.com", companyDomain: "atpi.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 110, lastAction: "04/12/19", clientStatus: "Neither", grade: "F").save()
        new dorg.catcher.DomainHit(companyName: "Advent Global Solutions", companyDomain: " advocateinsiders.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 148, lastAction: "04/12/19", clientStatus: "Neither", grade: "D").save()
        new dorg.catcher.DomainHit(companyName: "Advocate", companyDomain: "adventglobal.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 153, lastAction: "04/12/19", clientStatus: "Former", grade: "B").save()
        new dorg.catcher.DomainHit(companyName: "AeroFS", companyDomain: "atpi.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 207, lastAction: "04/12/19", clientStatus: "Neither", grade: "C").save()
        new dorg.catcher.DomainHit(companyName: "Aerobyte", companyDomain: "aerobyte.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 107, lastAction: "04/12/19", clientStatus: "Former", grade: "A").save()
        new dorg.catcher.DomainHit(companyName: "Aerohive Networks", companyDomain: "aerohive.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 400, lastAction: "04/12/19", clientStatus: "Neither", grade: "D").save()
        new dorg.catcher.DomainHit(companyName: "Affiliated Communications", companyDomain: "affiliatedcom.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 150, lastAction: "04/12/19", clientStatus: "Neither", grade: "A").save()
        new dorg.catcher.DomainHit(companyName: "Agari", companyDomain: "agari.com", firstEmailDate: "05/02/18", lastEmailDate:"01/06/19", sendCount: 102, lastAction: "04/12/19", clientStatus: "Former", grade: "A").save()

        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Chris Hackett",  userId: 33231,  receivedDate:"01/06/19 4:15 AM",  sentToDomain: "webnet.-it.com",  fromAddress: "chris.hackett@advantech.com",  platformUser: "chris.hackett@advantech.com",  grade: "A").save()
        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Jeff Cochran",  userId: 108625,  receivedDate:"02/25/19 6:45 PM",  sentToDomain: "diocia.com",  fromAddress: "jeff.cochran@advantech.com",  platformUser: "jplanner@advantage-tech.com",  grade: "A").save()
        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Jeff Cochran",  userId: 108625,  receivedDate:"02/06/19 10:30 AM",  sentToDomain: "diocia.com",  fromAddress: "sales@advantech.com",  platformUser: "jeff.cochran@advantech.com",  grade: "B").save()
        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Jeff Cochran",  userId: 108625,  receivedDate:"05/09/19 11:30 PM",  sentToDomain: "caltora.net",  fromAddress: "jeff.cochran@advantech.com",  platformUser: "jeff.cochran@advantech.com",  grade: "A").save()
        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Jenna Plummer",  userId: 38681,  receivedDate:"07/04/19 4:15 AM",  sentToDomain: "diocia.com",  fromAddress: "jplanner@advantage-tech.com",  platformUser: "jplanner@advantage-tech.com",  grade: "A").save()
        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Jenna Plummer",  userId: 38681,  receivedDate:"03/18/19 8:01 AM",  sentToDomain: "caltora.net",  fromAddress: "info@advantage-tech.com",  platformUser: "jplanner@advantech.com",  grade: "C").save()
        new dorg.catcher.CatcherEmailHistory(  type: "A",  companyName: "Advantage Technologies",  senderName: "Carissa Chiu",  userId: 4257,  receivedDate:"10/17/18 10:30 AM",  sentToDomain: "webnet.-it.com",  fromAddress: "info@advantage-tech.com",  platformUser: "carissa.chui@advantage-tech.com",  grade: "C").save()
        new dorg.catcher.CatcherEmailHistory(  type: "I",  companyName: "Advent Global",  senderName: "Raj Chappidi",  userId: 18217,  receivedDate:"03/10/19 11:30 PM",  sentToDomain: "webnet.-it.com",  fromAddress: "raj.chappidi@advglobal.net",  platformUser: "raj.chappidi@advglobal.net",  grade: "A").save()
        new dorg.catcher.CatcherEmailHistory(  type: "I",  companyName: "Advent Global",  senderName: "Raj Chappidi",  userId: 18217,  receivedDate:"12/16/18 11:30 PM",  sentToDomain: "caltora.net",  fromAddress: "liz.meyer@gmail.com",  platformUser: "raj.chappidi@advglobal.net",  grade: "D").save()
        new dorg.catcher.CatcherEmailHistory(  type: "I",  companyName: "Advent Global",  senderName: "Don Nelsen",  userId: 258118,  receivedDate:"05/27/19 10:30 AM",  sentToDomain: "diocia.com",  fromAddress: "don.nelsen@advent-global.com",  platformUser: "don.nelsen@advent-global.com",  grade: "A").save()
        new dorg.catcher.CatcherEmailHistory( type: "N", companyName: "Advantage Business Media", senderName: "Erica Summer", userId: 20655, receivedDate:"03/21/19 11:30 PM", sentToDomain: "caltora.net", fromAddress: "summer@advglobal.net", platformUser: "summer@advglobal.net", grade: "F").save()
        new dorg.catcher.CatcherEmailHistory( type: "N", companyName: "Advantage Business Media", senderName: "Erica Summer", userId: 20655, receivedDate:"06/29/19 4:15 AM", sentToDomain: "diocia.com", fromAddress: "summer@advglobal.net", platformUser: "summer@advglobal.net", grade: "F").save()
    }
    def destroy = {
    }
}
