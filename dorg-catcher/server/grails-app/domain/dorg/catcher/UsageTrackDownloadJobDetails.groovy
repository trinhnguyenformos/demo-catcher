package dorg.catcher

class UsageTrackDownloadJobDetails {
    String timestamp
    String ipAddress
    String action
    String entityType
    static constraints = {
        id blank:false
    }
}
