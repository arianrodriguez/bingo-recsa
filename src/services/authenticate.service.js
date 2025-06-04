import axios from "axios";

class AuthenticateService {
    constructor() {
        this.http = axios.create({
            baseURL: import.meta.env.VITE_URL,
            headers: {
                accept: "application/json",
            }
        });
    }

    async signIn(user) {
        return await this.http.post("app_bingo_od/sign-in", {
            username: user.username,
            password: user.password
        })
    }
}

export default AuthenticateService;