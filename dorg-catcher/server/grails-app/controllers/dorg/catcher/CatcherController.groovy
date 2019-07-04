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

    def findCatcherEmailHistoryById( @PathVariable long id) {
        if (request.method == "GET" && id) {
            render CatcherEmailHistory.load(id) as JSON
        }
    }

    def getEuiExportHistories() {
        if (request.method == "POST") {
            render EuiExportHistory.findAll() as JSON
        }
    }

    def findEuiExportHistoryById( @PathVariable long id) {
        if (request.method == "GET" && id) {
            render EuiExportHistory.load(id) as JSON
        }
    }

    def getUsageTrackDownloadJob() {
        if (request.method == "POST") {
            render UsageTrackDownloadJob.findAll() as JSON
        }
    }

    def findUsageTrackDownloadJobDetails( @PathVariable long id) {
        if (request.method == "GET" && id) {
            render UsageTrackDownloadJobDetails.findAll() as JSON
        }
    }
}
