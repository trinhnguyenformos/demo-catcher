package dorg.catcher

import dorg.catcher.types.ApplicationOriginType

class Email {

    String fromAddress
    String toAddress
    String subject
    String folder
    Date sentDate
    Date receivedDate
	String senderName
	Integer emailSourceId
    static constraints = {
    }

    static mapping = {
        version false
    }
}
