export interface Iplayer {
    "currentTeam": string,
    "dob": string,
    "email": string,
    "experience": string,
    "fullName": string,
    "licenceNumber": string,
    "password": string,
    "position": string,
    "preferredFoot": string,
    "usertype": string
}

export interface ILoginPayload {
    username: string;
    password: string;
}

export interface IResetPasswordPayload {
    newpassword: string;
    confirmpassword: string;
}

export interface IEmailPayload {
    email: string
}
