package dorg.catcher

import grails.converters.JSON
import org.springframework.web.bind.annotation.PathVariable

class CatcherController {
    static responseFormats = ['json', 'xml']
    
    def getDomainHits() {
        if (request.method == "POST") {
            render DomainHit.findAll() as JSON
        }
    }

    def getEmailSources() {
        if (request.method == "POST") {
            render EmailSource.findAll() as JSON
        }
    }

    def getCatcherEmailHistories() {
        if (request.method == "POST") {
            render CatcherEmailHistory.findAll() as JSON
        }
    }

    def findById( @PathVariable long id) {
        if (request.method == "GET" && id) {
            render CatcherEmailHistory.load(id) as JSON
        }
    }
}
