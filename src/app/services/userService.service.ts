import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserArray } from '../interfaces/user/IUserArray';
import { IRoleArray } from '../interfaces/user/IRoleArray';
import { IUser } from '../interfaces/user/Iuser';
import { IStringGeneralResponse } from '../interfaces/general/IStringGeneralResponse';
import { IChangeRoleRequest } from '../interfaces/user/IChangeRoleRequest';
import { IChangeProfileRequest } from '../interfaces/user/IChangeProfileRequest';
import { IChangeProfilePicRequest } from '../interfaces/user/IChangeProfilePicRequest';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = environment.apiBaseUrl;
  private jsonHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<IUserArray> {
    return this.httpClient.get<IUserArray>(`${this.apiUrl}/Users/AllUsers`);
  }

  getAllRoles(): Observable<IRoleArray> {
    return this.httpClient.get<IRoleArray>(`${this.apiUrl}/Users/AllRoles`);
  }

  getUserRole(userId: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiUrl}/Users/${userId}/GetUserRole`);
  }

  blockUser(userId: string): Observable<IStringGeneralResponse> {
    return this.httpClient.get<IStringGeneralResponse>(`${this.apiUrl}/Users/${userId}/blockUser`);
  }

  unblockUser(userId: string): Observable<IStringGeneralResponse> {
    return this.httpClient.get<IStringGeneralResponse>(
      `${this.apiUrl}/Users/${userId}/UnBlockUser`
    );
  }

  changeUserRole(body: IChangeRoleRequest): Observable<IStringGeneralResponse> {
    return this.httpClient.post<IStringGeneralResponse>(
      `${this.apiUrl}/Users/ChangeUserRole`,
      body,
      {
        headers: this.jsonHeader,
      }
    );
  }

  updateProfile(body: IChangeProfileRequest): Observable<IStringGeneralResponse> {
    return this.httpClient.post<IStringGeneralResponse>(
      `${this.apiUrl}/Users/UpdateProfile`,
      body,
      {
        headers: this.jsonHeader,
      }
    );
  }

  changeProfilePic(body: IChangeProfilePicRequest): Observable<IStringGeneralResponse> {
    return this.httpClient.post<IStringGeneralResponse>(
      `${this.apiUrl}/Users/ChangeProfileImg`,
      body,
      {
        headers: this.jsonHeader,
      }
    );
  }
}
