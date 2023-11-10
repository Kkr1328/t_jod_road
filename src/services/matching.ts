import axios from "axios";
import { RESERVATION_SERVICE_URL } from "./constant";
import { getProfile } from "./user";

interface Response {
    success: boolean;
    data: any;
}

const createReservation = async (parkingLotId: string): Promise<Response> => {
    try {
        const userId = await getProfile()
        const response = await axios.post(`${RESERVATION_SERVICE_URL}/createReservation`, { 
            userId,
            parkingLotId
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, data: error };
    }
};

const getActiveReservationsByUser = async () => {
    const url= `${RESERVATION_SERVICE_URL}/getActiveReservationsByUser`
    try {
        const userId = await getProfile()
        const response = await axios.get(url + `/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, data: error };
    }
}

export {
    createReservation,
    getActiveReservationsByUser
}