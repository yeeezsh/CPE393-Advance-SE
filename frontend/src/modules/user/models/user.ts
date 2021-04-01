export type User = {
    displayName: string;
    username: string;
    password: string;
    email: string;
    createAt: Date;
    deactivate?: boolean;
}