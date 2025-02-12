import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  public quizzArray : any[] = []
  constructor() { }
}
