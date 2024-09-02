import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient
  ) { }
}
