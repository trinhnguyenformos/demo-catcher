package dorg.catcher.rest

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import static org.springframework.http.HttpStatus.*

import dorg.catcher.Phone

import static org.springframework.http.HttpMethod.*


class PhoneController {

    
    def index() {
       def phones = [phones: Phone.findAll()]
        render phones as JSON
       
    }
    
    def show() {
        println "show"
        def phone = Phone.get(params.id)
        respond phone
    }
    
    def save(Phone phone) {
        println "save phone"
        phone.save flush: true
        new dorg.catcher.Phone(phoneName:"Galaxy S10+", producer:"SamSung", release:"2019").save()
    }
    
    def update(Phone phone) {
        println "update phone"
        def phoneEdit = Phone.get(params.id)
        phoneEdit.properties = phone
        phoneEdit.save flush: true
        respond Phone.get(params.id)
    }
    
    def delete() {
        println "delete"
        println params.id
        def phone = Phone.get(params.id)
        phone.delete flush: true
    }
}
