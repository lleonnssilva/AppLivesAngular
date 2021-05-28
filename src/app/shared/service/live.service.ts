import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Live } from '../model/live.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({ providedIn: 'root' })
export class LiveService {

    apiUrl = 'http://localhost:22287/lives';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    constructor(
        private httpClient: HttpClient
    ) {}

    public getLives(): Observable<ResponsePageable> {
        return this.httpClient.get<ResponsePageable>(this.apiUrl);
    }

    public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
        return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
    }

    public postLives(live: any): Observable<Live> {
        return this.httpClient.post<any>(this.apiUrl, live, this.httpOptions);
    }
    public putEditLive(live: any): Observable<Live> {
        console.log('put',live);
        return this.httpClient.put<any>(this.apiUrl, live, this.httpOptions);
    }

    public getLive(id:any): Observable<Live> {
        console.log("this.apiUrl",this.apiUrl);
        return this.httpClient.get<Live>(this.apiUrl+ '/' + id);
    }
    public deleteLive(id:any): Observable<Live> {
        console.log("this.apiUrl",this.apiUrl);
        return this.httpClient.delete<Live>(this.apiUrl+ '/' + id);
    }
}
