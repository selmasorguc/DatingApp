import {Photo} from './photo';

export interface Member {
    id: number;
    userName: string;
    dateOfBirth: Date;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photoUrl: string;
    photos: Photo[];
    age: number;
}


