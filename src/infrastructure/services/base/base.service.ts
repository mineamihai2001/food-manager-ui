import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class BaseService {
    private url: string;
    private timeout: number;

    public constructor() {
        this.url = process.env.API_URL ?? "http://192.168.1.105:3000/v1"; // TODO: add zod validation
        this.timeout = parseInt(process.env.API_TIMEOUT ?? "5000");
    }

    protected request<T = any, D = any>(
        path: string = "",
        options: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T, D>> {
        return axios(`${this.url}${path[0] === "/" ? path : "/" + path}`, {
            ...options,
            timeout: this.timeout,
        });
    }
}
