import axios, { AxiosResponse } from "axios";

export type RegisterResponse = string;

export interface RegisterRequest {
    iddocumento: string;
    idtipousuario: number;
    idtipocontextura: number;
    idpais: number;
    idespecialidad: number;
    idescuadra: number;
    tipodocumentousuario: string;
    nombreusuario: string;
    apellidousuario: string;
    generousuario: string;
    correousuario: string;
    contrasenausuario: string; 
    pesousuario: number;
    potenciausuario: number;
    acelaracionusuario: number;
    velocidadpromediousuario: number;
    velocidadmaximausuario: number;
    tiempociclista: number;
    anosexperiencia: number;
    gradorampa: number;
}

export async function register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
        const response: AxiosResponse<RegisterResponse> = await axios.post("https://isuci-back.onrender.com/registro", request);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios errors (e.g., network error, timeout)
            throw new Error(`Error al registrar: ${error.message}`);
        } else {
            // Handle other types of errors (e.g., unexpected response format)
            throw new Error(`Error al registrar: ${error}`);
        }
    }
}