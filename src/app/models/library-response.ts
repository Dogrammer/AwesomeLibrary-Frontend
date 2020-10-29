import { LibraryErrorInformation } from './library-error-information';

export interface LibraryResponse<T> {
    code: number;
    errors: Array<LibraryErrorInformation>;
    response: T;
}