export type User = {
    name: string;
    email: string;
    password: string;
};

export type LoginCredentials = {
    email: string;
    password: string;
}

const API_REGISTER_URL = 'http://localhost:3000/api/auth/register';
const API_LOGIN_URL = 'http://localhost:3000/api/auth/login';
const SAC_ACCOUNT_URL = 'http://localhost:3000/api/nsac/accounts';
const SAC_GRADES_URL = 'http://localhost:3000/api/nsac/grades?ano=';

export async function authRegister(register: User) {
    const response = await fetch(API_REGISTER_URL, {
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(register)
    });
    if (!response.ok)
        throw new Error(await response.text());
}

export async function authLogin(login: LoginCredentials) {
    const response = await fetch(API_LOGIN_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
    });
    if (!response.ok)
        throw new Error(await response.text());
    const jwtToken = response.headers.get('authorization');
    console.log(jwtToken);
    return jwtToken;
}

export async function nSACLogin(jwtToken: string, login: LoginCredentials) {
    const response = await fetch(SAC_ACCOUNT_URL, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwtToken
        },
        body: JSON.stringify(login)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response;
}

export async function getSACGrades(jwtToken: string, apiToken: string, ano: number) {
    const response = await fetch(SAC_GRADES_URL + ano, {
        mode: 'cors',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwtToken,
            "x-api-token": apiToken,
        },
    });
    const gradesJSON = await response.json();
    return gradesJSON;
}