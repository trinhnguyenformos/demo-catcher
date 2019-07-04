package dorg.catcher

import grails.util.Environment

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        //tag::defaultPage[]
        if ( Environment.current == Environment.PRODUCTION ) {
            '/'(uri: '/index.html')
        } else {
            '/'(controller: 'application', action:'index')
        }
		//end::defaultPage[]

        "500"(view: '/error')
        "404"(view: '/notFound')
        
        get "/persons"(controller:"person", action:"index")
        post "/persons"(controller:"person", action:"save")
        get "/persons/$id"(controller:"person", action:"show")
        put "/persons/$id"(controller:"person", action:"update")
        delete "/persons/$id"(controller:"person", action:"delete")
        
        "/cars"(resources:"car") {
            "/render"(controller:"homePage", method:"GET")
            "/brand"(controller:"brand", method:"GET")
        }
        
        get "/phones"(controller:"phone", action:"index")
        post "/phones"(controller:"phone", action:"save")
        get "/phones/$id"(controller:"phone", action:"show")
        put "/phones/$id"(controller:"phone", action:"update")
        delete "/phones/$id"(controller:"phone", action:"delete")
        
        post "/catcher"(controller:"catcher", action:"getDomainHits")

        post "/email-sources"(controller:"catcher", action:"getEmailSources")

        post "/catcher-email-history"(controller:"catcher", action:"getCatcherEmailHistories")
        get "/catcher-email-history/$id"(controller:"catcher", action:"findById")

        post "/eui-export-history"(controller:"catcher", action:"getEuiExportHistories")
        get "/eui-export-history/$id"(controller:"catcher", action:"findEuiExportHistoryById")

        post "/usage-track"(controller:"catcher", action:"getUsageTrackDownloadJob")
        get "/usage-track/$id"(controller:"catcher", action:"findUsageTrackDownloadJobDetails")
    }
}
