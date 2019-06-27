package dorg.catcher.rest

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import static org.springframework.http.HttpMethod.*

class DepartmentController {

    def getDept() {
        if (request.method == "POST") {
            render Person.findAll() as JSON
        } else {
            def personEdit = Person.get(params.id)
            render personEdit as JSON
        }
    }
}
