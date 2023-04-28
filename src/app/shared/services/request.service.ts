import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResponse, RequestUpdateResponse } from '../interfaces/request.interface';
import { Observable, tap, catchError, of, Subject, switchMap, map } from 'rxjs';
import { environments } from 'src/environments/environments';
import { RequestTypeCreate, RequestTypeResponse, ResquestInsertResponse } from '../interfaces/request-type.interface';
import { StatusResponse } from '../interfaces/status.interface';
import { ClientInsertResponse, ClientResponse } from '../interfaces/client.interface';

@Injectable({ providedIn: 'root' })
export class RequestService {

  private baseUrl: string = environments.baseUrl;
  private refreshRequest = new Subject<void>();

  constructor(private http: HttpClient) { }

  getRequests(): Observable<RequestResponse[]> {
    return this.http.get<RequestResponse[]>(`${this.baseUrl}/request`);
  }

  onRefreshRequest() {
    return this.refreshRequest;
  }
  getRequestTypes(): Observable<RequestTypeResponse[]> {
    return this.http.get<RequestTypeResponse[]>(`${this.baseUrl}/request/type`)
  }

  getStatus(): Observable<StatusResponse[]> {
    return this.http.get<StatusResponse[]>(`${this.baseUrl}/request/status`);
  }

  getRequestTypeById(id: number): Observable<RequestTypeResponse | undefined> {
    return this.http.get<RequestTypeResponse>(`${this.baseUrl}/request/type/${id}`).pipe(
      tap(() => {
        this.refreshRequest.next()
      }),
      tap(request => request),
      catchError(error => of(undefined))
    );
  }

  getClientByDocument(id: string): Observable<ClientResponse | undefined> {
    return this.http.get<ClientResponse>(`${this.baseUrl}/client/${id}`).pipe(
      tap(() => {
        this.refreshRequest.next()
      }),
      tap(request => request),
      catchError(error => of(undefined))
    );
  }


  updateStatusRequest(id: string, idStatus: string): Observable<RequestUpdateResponse | undefined> {
    return this.http.put<RequestUpdateResponse>(`${this.baseUrl}/request/${id}?idStatus=${idStatus}`, null).pipe(
      tap(() => {
        this.refreshRequest.next()
      }),
      tap(request => request),
      catchError(error => of(undefined))
    );
  }


  insertClient(client: ClientInsertResponse): Observable<ClientResponse | undefined> {

    return this.http.post<ClientResponse>(`${this.baseUrl}/client`, client).pipe(
      tap(request => request),
      catchError(error => of(undefined))
    )
  }

  insertType(type: RequestTypeCreate): Observable<RequestTypeCreate | undefined> {

    return this.http.post<RequestTypeCreate>(`${this.baseUrl}/request/type`, type).pipe(
      tap(request => request),
      catchError(error => of(undefined))
    )
  }

  insertRequest(request: ResquestInsertResponse): Observable<ResquestInsertResponse | undefined> {
    return this.http.post<ResquestInsertResponse>(`${this.baseUrl}/request`, request).pipe(
      tap(request => request),
      catchError(error => of(undefined))
    )

  }

}
