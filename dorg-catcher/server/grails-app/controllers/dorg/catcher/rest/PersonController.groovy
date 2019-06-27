package dorg.catcher.rest

import dorg.catcher.Person
import grails.rest.RestfulController

class PersonController extends RestfulController<Person> {

    static responseFormats = ['json', 'xml']
    
    def companyService
    
    PersonController() {
        super(Person)
    }
    
    def show() {
        println "show"
        def person = Person.get(params.id)
        respond person
    }
    
    def save(Person person) {
        println "save Person"
        person.save()
    }
    
    def update(Person person) {
        println "update Person"
        def personEdit = Person.get(params.id)
        personEdit.properties = person
        personEdit.save();
        respond Person.get(params.id)
    }

}
