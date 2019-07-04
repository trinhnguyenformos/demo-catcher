package dorg.catcher

class UsageTrackDownloadJob {
    String platformUser
    Long userId
    String eventDate
    String updateTime
    String clientIp
    String companyName
    Long eventCount
    static constraints = {
        id blank:false
    }
}
