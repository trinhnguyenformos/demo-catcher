package dorg.catcher

import grails.rest.Resource

class CatcherEmailHistory {
    String type;
    String companyName
    String senderName
    Long userId
    String receivedDate
    String sentToDomain
    String fromAddress
    String platformUser
    String grade
    

    static constraints = {
        id blank:false
    }


}