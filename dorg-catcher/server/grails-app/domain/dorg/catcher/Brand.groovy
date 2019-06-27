package dorg.catcher

import grails.rest.Resource

@Resource
class Brand {
    String brandName
    
    static constraints = {
        brandName blank:false
    }
}
