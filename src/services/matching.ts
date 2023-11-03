import axios from "axios";

interface Response {
    success: boolean;
    data: any;
}

const createReservation = async (parkingLotId: string): Promise<Response> => {
    try {
        const response = await axios.post(`http://localhost:9000/createReservation`, {
            userId: '',
            parkingLotId: '6544f991d38dea00faa140f3'
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, data: error };
    }
};

export {
    createReservation
}