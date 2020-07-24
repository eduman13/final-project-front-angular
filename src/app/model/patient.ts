export class Patient {
    id: number;
    photo: string;
    name: string;
    surnames: string;
    socialSecurityNumber: string;
    birthday: string;
    number: number;
    portal: number;
    street: string;
    doctorId: number;
    completeName: string;

    constructor(photo: string, name: string, surnames: string, socialSecurityNumber: string,
                birthday: string, street: string, piso: number, portal: number, doctorId: number) {
        this.photo = photo;
        this.name = name;
        this.surnames = surnames;
        this.socialSecurityNumber = socialSecurityNumber;
        this.birthday = birthday;
        this.number = piso;
        this.portal = portal;
        this.street = street;
        this.doctorId = doctorId;
    }

}