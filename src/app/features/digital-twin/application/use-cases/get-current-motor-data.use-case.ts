import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Motor } from '../../domain/models/motor.model';
import { MotorRepository } from '../../domain/repositories/motor.repository';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentMotorDataUseCase {
  constructor(private readonly motorRepository: MotorRepository) {}

  execute(): Observable<Motor> {
    return this.motorRepository.getCurrentMotorData();
  }
}
