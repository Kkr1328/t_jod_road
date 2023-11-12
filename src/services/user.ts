import axios from "axios";
import { USER_SERVICE_URL } from "./constant";

const getProfile = async () => {
    const url = `${USER_SERVICE_URL}/getProfile`

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') 
        }
    }
    return await axios.get(url, config)
                .then((res) => {
                    return res.data
                })
}

const getPenaltyStatus = async (callback: (data: any) => void) => {
    const url = `${USER_SERVICE_URL}/getPenaltyStatus`;

    // left authorize
    let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    await axios
        .get(url, config)
        .then((response) => {
            callback(response.data)
        })
        .catch((error) => {
            console.error('Error', error);
        });
};

export {
    getProfile,
    getPenaltyStatus
}