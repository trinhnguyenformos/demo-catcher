package dorg.catcher


import grails.rest.*
import grails.converters.*
import static org.springframework.http.HttpStatus.*
import static org.springframework.http.HttpMethod.*

class CatcherController {
    static responseFormats = ['json', 'xml']
    
    def getDomainHits() {
        if (request.method == "POST") {
            render DomainHit.findAll() as JSON
        }
    }
}
