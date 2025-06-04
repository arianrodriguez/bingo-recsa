import axios from "axios";

class WinnerService{
    constructor(){
        this.http = axios.create({
            baseURL: import.meta.env.VITE_URL,
            headers: {
                accept: "application/json",
            }
        });
    }

    async insertWinner(token, dni) {
        try {
            return await this.http.post(`app_bingo_od/winners/${dni}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            if (error.response) {
                return error.response;
            } else {
                throw error;
            }
        }
    }
}

export default WinnerService