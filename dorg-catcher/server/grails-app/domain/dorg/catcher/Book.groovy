package dorg.catcher

import grails.rest.Resource

@Resource(uri='/books')
class Book {

    String title
    String author
    String bookType

    static constraints = {
        title blank:false
    }


}