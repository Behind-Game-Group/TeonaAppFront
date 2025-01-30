 class Adress {
    id: number;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNameOptional?: string;
    postCode: string;
    city: string;
    countryCode: string;
    country: string;

    constructor(id: number, firstName: string, lastName: string, streetName: string, streetNameOptional: string,
        postCode: string, city: string, countryCode: string, country: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetName = streetName;
        this.streetNameOptional = streetNameOptional;
        this.postCode = postCode;
        this.city = city;
        this.countryCode = countryCode;
        this.country = country;
    }
}

export default Adress;
