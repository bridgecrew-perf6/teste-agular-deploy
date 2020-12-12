import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(environment.apiConfig.timeLimit()),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error

          errorMessage = `Error: ${error?.error?.message}`;
        } else {
          // server-side error
          errorMessage = `Erro: ${error?.error?.title}`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
