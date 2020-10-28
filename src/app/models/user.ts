import { IContact } from './contact';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    dateOfBirth: Date;
    totalOverdue: number;
    contacts: Array<IContact>
}