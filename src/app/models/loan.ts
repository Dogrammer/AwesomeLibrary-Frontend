import { ILoanStatus } from './loan-status';
import { IUser } from './user';

export interface ILoan {
    id: number;
    userId: number;
    user: IUser;
    dateLoaned: Date;
    dateDue: Date;
    dateReturned: Date;
    loanStatusId: number;
    loanStatus: ILoanStatus;
}