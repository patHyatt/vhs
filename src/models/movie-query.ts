import { Paging } from './paging';

export type MovieQuery = Paging & {
    search: string,
    genre: string
}