import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class ParkingSpace extends jspb.Message {
  getId(): string;
  setId(value: string): ParkingSpace;

  getName(): string;
  setName(value: string): ParkingSpace;

  getLat(): number;
  setLat(value: number): ParkingSpace;

  getLng(): number;
  setLng(value: number): ParkingSpace;

  getAvailable(): number;
  setAvailable(value: number): ParkingSpace;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParkingSpace.AsObject;
  static toObject(includeInstance: boolean, msg: ParkingSpace): ParkingSpace.AsObject;
  static serializeBinaryToWriter(message: ParkingSpace, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParkingSpace;
  static deserializeBinaryFromReader(message: ParkingSpace, reader: jspb.BinaryReader): ParkingSpace;
}

export namespace ParkingSpace {
  export type AsObject = {
    id: string,
    name: string,
    lat: number,
    lng: number,
    available: number,
  }
}

export class ParkingSpaceList extends jspb.Message {
  getParkingspacelistList(): Array<ParkingSpace>;
  setParkingspacelistList(value: Array<ParkingSpace>): ParkingSpaceList;
  clearParkingspacelistList(): ParkingSpaceList;
  addParkingspacelist(value?: ParkingSpace, index?: number): ParkingSpace;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParkingSpaceList.AsObject;
  static toObject(includeInstance: boolean, msg: ParkingSpaceList): ParkingSpaceList.AsObject;
  static serializeBinaryToWriter(message: ParkingSpaceList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParkingSpaceList;
  static deserializeBinaryFromReader(message: ParkingSpaceList, reader: jspb.BinaryReader): ParkingSpaceList;
}

export namespace ParkingSpaceList {
  export type AsObject = {
    parkingspacelistList: Array<ParkingSpace.AsObject>,
  }
}

