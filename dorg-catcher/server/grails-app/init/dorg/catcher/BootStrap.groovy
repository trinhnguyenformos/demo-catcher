package dorg.catcher

class BootStrap {

    def init = { servletContext ->
        new dorg.catcher.Book(title:"Game of thrones", author:"Unknow", bookType:"None").save()
        new dorg.catcher.Book(title:"Clean Code", author:"Robert C. Martin", bookType:"Tech").save()
        new dorg.catcher.Person(personName:"Donald Trump", age:72, gender:"Male").save()
        new dorg.catcher.Person(personName:"Angela Merkel", age:65, gender:"Female").save()
        def brand = new dorg.catcher.Brand(brandName:"Toyota")
        new dorg.catcher.Car(carName:"Camry", carType:"Unknow", color:"Red", brand: brand).save()
        new dorg.catcher.Car(carName:"Lexus", carType:"Luxury", color:"Black").save()
        new dorg.catcher.Phone(phoneName:"Galaxy S10+", producer:"SamSung", release:"2019").save()
        new dorg.catcher.Phone(phoneName:"IphoneX", producer:"Apple", release:"2018").save()
        
        
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
    }
    def destroy = {
    }
}
