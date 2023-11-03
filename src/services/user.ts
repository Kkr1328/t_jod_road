import axios from "axios";

const getPenaltyStatus = async (callback: (data: any) => void) => {
    const url = 'http://localhost:9001/getPenaltyStatus';

    // left authorize
    let config = {
        headers: {
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiamFyIiwiaWF0IjoxNjk5MDIxNjE2LCJleHAiOjE3MDE2MTM2MTZ9.AY8LLq7dLdcwibm8otqAHzODe3RxfYl7IDzILiFDNyE' 
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
    getPenaltyStatus
}