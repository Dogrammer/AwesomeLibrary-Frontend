import { IUser } from './user';

export interface IContact {
    id: number;
    phoneNumber: string;
    mobileNumber: string;
    emailAddress: string;
    userId : number;
    user: IUser;
}