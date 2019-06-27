package dorg.catcher

import grails.rest.Resource


class Person {

    String personName
    int age
    String gender

    static constraints = {
        personName blank:false
    }
}
