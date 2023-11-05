export interface SpaceParking {
    id: string,
    lat: number,
    lng: number,
    name: string,
    available: number | null
}

export const MockedDriveIn: SpaceParking[] = [
    {
        id: '1',
        lat: 13.748329190226818,
        lng: 100.52718982270956,
        name: "animal",
        // totalParking: 100,
        available: 12
    },
    {
        id: '2',
        lat: 13.738329190226818,
        lng: 100.52718982270956,
        name: "animal",
        // totalParking: 100,
        available: 21
    },
    {
        id: '6545bb587f320b6cd7cfe7c2',
        lat: 13.738329190226818,
        lng: 100.53318982270956,
        name: "animal",
        // totalParking: 100,
        available: 55
    },
]

export interface PenaltyStatus {
    status: 'NORMAL' | 'PENALTY',
    unBannedDate: string | null,
    leftQuota: number
}

export const MockedPenalty: PenaltyStatus[] = [
    {
        status: 'NORMAL',
        unBannedDate: null,
        leftQuota: 3
    },
    {
        status: 'PENALTY',
        unBannedDate: new Date("2023-12-15").toDateString(),
        leftQuota: 0
    }
]