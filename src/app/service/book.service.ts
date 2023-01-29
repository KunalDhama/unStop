import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Seats } from '../model/seat';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  seats:Seats
  constructor(private http:HttpClient){
    this.seats= new Seats()
  }

  fetchDataFromServer():Observable<any>{
    return this.http.get('http://localhost:3000/seats')
  }

  saveData(seats:Seats):Observable<Seats>{
    return this.http.post<Seats>('http://localhost:3000/seats',seats)
  }
  updateData(seats:Seats):Observable<any>{    
    return this.http.put(`http://localhost:3000/seats/${seats.id}`,seats)  
   }  

}
