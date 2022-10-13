import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class car {
  id?: number;
  brand: string;
  model: string;
  price: string;
  filename: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  endPoint = "http://localhost:8080/api/cars";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<car[]> {
    return this.httpClient.get<car[]>(this.endPoint)
      .pipe(
        tap(users => console.log('Cars retrieved!')),
        catchError(this.handleError<car[]>('Get car', []))
      );
  }

  createCar(car, blob) {
    let formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("price", car.price);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  getCar(id): Observable<car[]> {
    return this.httpClient.get<car[]>(this.endPoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Car fetched: ${id}`)),
        catchError(this.handleError<car[]>(`Get car id=${id}`))
      );
  }

  updateCar(id, car,blob): Observable<any> {
    let formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("price", car.price);
    formData.append("file", blob);
    return this.httpClient.put(this.endPoint + '/' + id,formData)
  }

  deleteCar(id): Observable<car[]> {
    return this.httpClient.delete<car[]>(this.endPoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Car deleted: ${id}`)),
        catchError(this.handleError<car[]>('Delete car'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

