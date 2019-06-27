package dorg.catcher

import grails.rest.Resource

class Phone {

    String phoneName
    String producer
    String release

    static constraints = {
        phoneName blank:false
    }
}
