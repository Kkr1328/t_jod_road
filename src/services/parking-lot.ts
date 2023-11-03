import axios from "axios";

const getParkingSpaceByID = async (id: string, callback: (data: any) => void) => {
    await axios
        .get(`http://localhost:4000/getParkingSpace/${id}`)
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