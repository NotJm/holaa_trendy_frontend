export interface AuthResponse {
    status: number;
    message: string;
    MFA: string;
    fromTo: string
}

export interface SignUpResponse {
    status: number;
    message: string;
    account_activation: string;
}