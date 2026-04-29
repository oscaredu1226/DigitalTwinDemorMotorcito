import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MotorResponseDto } from '../dtos/motor-response.dto';
import { generateMockMotorResponse } from '../dtos/mock-motor-response';

@Injectable({
  providedIn: 'root',
})
export class MotorApiService {
  private readonly endpoint = 'https://hayfabito.free.beeceptor.com/prueba';

  constructor(private readonly http: HttpClient) {}

  getCurrentMotorData(): Observable<MotorResponseDto[]> {
    return this.http.get<MotorResponseDto[]>(this.endpoint);
  }

  getMockMotorData(): Observable<MotorResponseDto> {
    return of(generateMockMotorResponse());
  }
}
