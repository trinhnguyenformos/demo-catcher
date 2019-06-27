package dorg.catcher

import grails.rest.Resource

@Resource
class Car {
   
    String carName
    String carType
    String color
    Brand brand

    static constraints = {
        carName blank:false
        brand blank:true, nullable: true
    }
}
