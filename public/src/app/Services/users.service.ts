import { Injectable } from '@angular/core';
// 5. IMPORT HTTP
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // 6. Fill Constructor
  constructor(private _http: HttpClient) {

  }

  // 4. Create End Points
  createNewUser(newUser:any){
    return this._http.post("http://localhost:8080/company/register", newUser)
  }

}
