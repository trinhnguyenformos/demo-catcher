package dorg.catcher

import grails.rest.Resource

class EuiExportHistory {
    String type;
    String platformUser
    Long userId
    String exportDate
    Long count
    String plantEmailSM
    String plantEmailMed
    String plantEmailLG
    String clientIP
    String companyName

    static constraints = {
        id blank:false
        plantEmailSM nullable:true
        plantEmailMed nullable:true
        plantEmailLG nullable:true
    }


}