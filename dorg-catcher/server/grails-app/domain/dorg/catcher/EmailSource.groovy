package dorg.catcher

import dorg.catcher.types.ApplicationOriginType

class EmailSource {

    String mailHost
    String mailPort
    String accountUsername
    String accountPassword
    ApplicationOriginType applicationOriginType
    Boolean active
    Date createTime

    static constraints = {
    }

    static mapping = {
        version false
    }
}
