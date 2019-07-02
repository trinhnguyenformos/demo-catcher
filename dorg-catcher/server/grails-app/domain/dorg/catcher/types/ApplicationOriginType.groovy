package dorg.catcher.types

enum ApplicationOriginType {

    DO(1, "DO", "DiscoverOrg"),
    ZI(2, "ZI", "ZoomInfo")

    int numericValue
    String displayName
    String description


    ApplicationOriginType(int numericValue, String displayName, String description) {
        this.numericValue = numericValue
        this.displayName = displayName
        this.description = description
    }
}