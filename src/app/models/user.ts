import { IContact } from './contact';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    contacts: Array<IContact>
}