import axios from "axios";
import { USER_SERVICE_URL } from "./constant";

const getProfile = async (): Promise<Number> => {
    const url = `${USER_SERVICE_URL}/getProfile`

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') 
        }
    }
    const userId = await axios
        .get(url, config)
        .then((res) => {
            return res.data.id
        })
    return userId
}

const getPenaltyStatus = async (callback: (data: any) => void) => {
    const url = `${USER_SERVICE_URL}/getPenaltyStatus`;

    // left authorize
    let config = {
        headers: {
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoicGFsbSIsImlhdCI6MTY5OTU5OTg5OCwiZXhwIjoxNzAyMTkxODk4fQ.4phefP4G-Bgl_-7rMgVCCAxe7v4959GivHDVe3Z6zxE' 
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