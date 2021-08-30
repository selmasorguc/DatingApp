import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl: string = "https://localhost:5001/api";
  members: Member[];
  constructor(private http: HttpClient) { }

  getMembers(){
    console.log("get members service");
    return this.http.get<Member[]>(this.baseUrl + '/users');
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + '/users/' + username);

  }
}
