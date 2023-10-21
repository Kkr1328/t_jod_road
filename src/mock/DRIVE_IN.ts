export interface SpaceParking {
    // lat,lng), จำนวนที่ว่าง, id}
    id: string,
    available: number,
    position: Location
}

interface Location {
    lat: number,
    lng: number
}

export const MockedDriveIn: SpaceParking[] = [
    {
        id: '1',
        available: 1,
        position: { lat: 13.738329190226818, lng: 100.52718982270956 }
    },
    {
        id: '2',
        available: 12,
        position: { lat: 13.748329190226818, lng: 100.52718982270956 }
    },
    {
        id: '3',
        available: 3,
        position: { lat: 13.728329190226818, lng: 100.52718982270956 }
    },
]