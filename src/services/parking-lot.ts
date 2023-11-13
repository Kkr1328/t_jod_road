import axios from "axios";
import { PARKING_SERVICE_URL } from "./constant";

const getParkingSpaceByID = async (id: string, callback: (data: any) => void) => {
    await axios
        .get(`${PARKING_SERVICE_URL}/getParkingSpace/${id}`)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            console.error('Error fetching parking spaces:', error);
        });
};

export {
    getParkingSpaceByID
}