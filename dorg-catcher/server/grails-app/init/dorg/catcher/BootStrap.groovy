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
    }
    def destroy = {
    }
}
