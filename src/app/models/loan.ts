import { IBook } from './book';
import { ILoanBookRequest } from './loan-book-request';
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
    bookLoans: Array<ILoanBookRequest>;
}