package dorg.catcher

import grails.rest.Resource

class DomainHit {

    String companyName
    String companyDomain
    String firstEmailDate
    String lastEmailDate
    Number sendCount
    String lastAction
    String clientStatus
    String grade
    

    static constraints = {
        id blank:false
    }

    static mapping = {
        version false
    }
}