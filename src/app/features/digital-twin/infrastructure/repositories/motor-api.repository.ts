import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { MotorRepository } from '../../domain/repositories/motor.repository';
import { Motor } from '../../domain/models/motor.model';
import { MotorApiService } from '../http/motor-api.service';
import { MotorMapper } from '../mappers/motor.mapper';

@Injectable({
  providedIn: 'root',
})
export class MotorApiRepository extends MotorRepository {
  constructor(private readonly motorApiService: MotorApiService) {
    super();
  }

  override getCurrentMotorData(): Observable<Motor> {
    return this.motorApiService.getCurrentMotorData().pipe(
      map((response) => MotorMapper.fromDto(response, 'api')),
      catchError(() =>
        this.motorApiService
          .getMockMotorData()
          .pipe(map((response) => MotorMapper.fromDto(response, 'mock'))),
      ),
    );
  }
}
