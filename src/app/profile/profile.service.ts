import { Injectable } from "@angular/core"; 

export interface IProfile {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    age: number;
}

@Injectable({providedIn: 'root'})
export class ProfileService {
    public user: IProfile;
    constructor() {
        this.user = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            age: -1,
        }
    }

    getProfileUser(): Promise<IProfile> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.round(Math.random())) {
                    this.user = {
                        firstName: 'Michael',
                        lastName: 'Collins',
                        username: 'michael.collins',
                        email: 'michael.collins@blueface.com',
                        age: 30,
                    };
                    resolve(this.user);
                } else {
                    reject({error: 'Profile not found'});
                }
            }, Math.random() * 5000)
        })
    }

    setName(firstName: string, lastName: string): Promise<IProfile> {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                if (Math.round(Math.random())) {
                    this.setUserEmail(firstName, lastName).then((result) => {
                        this.user.firstName = firstName;
                        this.user.lastName = lastName;
                        this.user.email = result;
                        resolve(this.user);
                    }, (error) => {
                        reject(error);
                    })
                } else {
                    reject({error: 'Invalid name'})
                }
            }, Math.random() * 5000)
        })
    }

    setUserEmail(firstName: string, lastName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.round(Math.random())) {
                    resolve(firstName.replace(/\s/g, "").toLowerCase().concat(".",lastName.toLowerCase().replace(/\s/g, ""), "@blueface.com"));
                } else {
                    reject({error: 'Error on email generation'});
                }
            })
        })
    }
}
