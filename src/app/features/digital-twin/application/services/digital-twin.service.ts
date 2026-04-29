import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Motor } from '../../domain/models/motor.model';
import { GetCurrentMotorDataUseCase } from '../use-cases/get-current-motor-data.use-case';

@Injectable({
  providedIn: 'root',
})
export class DigitalTwinService {
  constructor(private readonly getCurrentMotorDataUseCase: GetCurrentMotorDataUseCase) {}

  getCurrentMotor(): Observable<Motor> {
    return this.getCurrentMotorDataUseCase.execute();
  }
}
