export const MODEL = {
  details: {
    emailInformation: {
      received: '6/10/2019 7:45 AM',
      plantEmail: 'ohn.davis@diocia.com',
      senderDomain: 'adventtech.com',
      platform: 'DiscoverOrg',
      sourceIps: ['68.178.213.9', '185.196.22.44']
    },
    userMatching: {
      sender: {
        userId: 108625,
        emailUser: 'jeff.cochran@adventtech.com',
        name: 'Jefferey D.Cochran',
        userStatus: 'Inactive',
        activeFrom: '10/30/2015',
        activeTo: '10/30/2018',
        exportLimit: 15000
      },
      downloadUser: {
        userId: 2564,
        emailUser: 'josef.carlton@psssclabs.com',
        name: 'Josef Carlton',
        activeFrom: '4/17/2019',
        activeTo: '',
        exportLimit: 15000
      }
    },
    accountMatching: {
      sender: {
        accountId: 806,
        name: 'Advantage Technical Systems',
        accountStatus: 'Current (Active since 6/11/2017)',
        maxSeats: 161,
        activeSeats: 151,
        exportLimit: 500000
      },
      downloadUser: {
        accountId: 6041,
        name: 'PSSC Labs.inc',
        accountStatus: 'Current (Active since 4/3/2019)',
        maxSeats: 250,
        activeSeats: 176,
        exportLimit: 500000
      }
    }
  },
  emailContent: {
    name: 'Jeffey Cochran',
    address: '20432 North Sea Circle',
    city: 'Lake Forest',
    stateRegion: 'CA',
    Country: 'USA',
    postalCode: 92630,
    phone1: '949-380-7228',
    phone2: '949-801-0154'
  },
  ipScan: {
    downloadJob: {
      matchFound: 'True',
      recordsFound: 566,
      mostRecent: '6/1/2019'
    },
    usageTrack: {
      matchFound: 'True',
      recordsFound: 4512,
      mostRecent: '6/11/2019'
    },
    catcher: {
      matchFound: 'True',
      recordsFound: 21,
      mostRecent: '6/11/2019'
    },
    senderAccount: {
      matchFound: 'False',
      recordsFound: 'True'
    },
    platformUser: {
      matchFound: 'True',
      recordsFound: 'True'
    }
  }
}
