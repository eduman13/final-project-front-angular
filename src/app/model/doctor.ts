export class Doctor {
    id: number;
    name: string;
    surnames: string;
    schoolNumber: string;
    birthday: string;
    street: string;
    portal: number;
    number: number;
    completeName: string;

    constructor(name: string, surnames: string, schoolNumber: string, birthday: string,
        street: string, portal: number, piso: number) {
            this.name = name;
            this.surnames = surnames;
            this.schoolNumber = schoolNumber;
            this.birthday = birthday;
            this.street = street;
            this.portal = portal;
            this.number = piso;
    }
}