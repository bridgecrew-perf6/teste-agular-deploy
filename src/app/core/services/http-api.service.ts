import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import * as queryString from 'query-string';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageResult } from '../interfaces/page-result.model';
import { MessageSnackBarComponent } from '../layout/components/message-snack-bar/message-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(
    private http: HttpClient,
    private snackBar: MessageSnackBarComponent
  ) {}

  getBlob<payloadT, T>(
    endPointUrl: string,
    payload: payloadT
  ): Observable<any> {
    const params = payload
      ? new HttpParams({
          fromString: queryString.stringify(payload, { skipNull: true }),
        })
      : {};
    return new Observable((observer) => {
      this.http
        .get<any>(`${environment.baseUrl}${endPointUrl}`, {
          params,
          observe: 'response' as 'body',
          responseType: 'blob' as 'json',
        })
        .pipe(catchError((error) => this.handleError(error)))
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  get<payloadT>(endPointUrl: string, payload: payloadT): Observable<payloadT> {
    const params = payload
      ? new HttpParams({
          fromString: queryString.stringify(payload, { skipNull: true }),
        })
      : {};

    return new Observable((observer) => {
      this.http
        .get<payloadT>(`${environment.baseUrl}/${endPointUrl}`, {
          params,
        })
        .pipe(catchError((error) => this.handleError(error)))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }

  getWithUrl<payloadT>(
    endPointUrl: string,
    payload: string
  ): Observable<payloadT> {
    return new Observable((observer) => {
      this.http
        .get<payloadT>(`${environment.baseUrl}/${endPointUrl}/${payload}`)
        .pipe(catchError((error) => this.handleError(error)))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }

  post<payloadT>(endPointUrl: string, payload: payloadT): Observable<any> {
    const httpOptions = this.header();
    return new Observable((observer) => {
      this.http
        .post<payloadT>(
          `${environment.baseUrl}/${endPointUrl}`,
          payload,
          httpOptions
        )
        .pipe(catchError((error) => this.handleError(error)))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }

  put<payloadT>(endPointUrl: string, payload: any): Observable<any> {
    const httpOptions = this.header();

    //  `${environment.baseUrl}/${endPointUrl}/${payload.id}`,
    return new Observable((observer) => {
      this.http
        .put<payloadT>(
          `${environment.baseUrl}/${endPointUrl}`,
          payload,
          httpOptions
        )
        .pipe(catchError((error) => this.handleError(error)))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }

  delete<payloadT>(endPointUrl: string, payload: payloadT): Observable<any> {
    return new Observable((observer) => {
      this.http
        .delete<any>(`${environment.baseUrl}/${endPointUrl}/${payload}`)
        .pipe(catchError((error) => this.handleError(error)))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }

  private handleError(error: string) {
    this.snackBar.openSnackBar(error, 'Close', 'red-snackbar');
    return of({
      error,
    });
  }

  private header() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
