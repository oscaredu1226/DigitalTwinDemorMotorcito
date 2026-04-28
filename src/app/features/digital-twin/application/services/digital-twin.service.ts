import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Motor } from '../../domain/models/motor.model';
import { GetCurrentMotorDataUseCase } from '../use-cases/get-current-motor-data.use-case';
import { EvaluateMotorStatusUseCase } from '../use-cases/evaluate-motor-status.use-case';
import { CalculateMotorHealthUseCase } from '../use-cases/calculate-motor-health.use-case';
import { GenerateMotorAlertMessageUseCase } from '../use-cases/generate-motor-alert-message.use-case';

@Injectable({
  providedIn: 'root',
})
export class DigitalTwinService {
  constructor(
    private readonly getCurrentMotorDataUseCase: GetCurrentMotorDataUseCase,
    private readonly evaluateMotorStatusUseCase: EvaluateMotorStatusUseCase,
    private readonly calculateMotorHealthUseCase: CalculateMotorHealthUseCase,
    private readonly generateMotorAlertMessageUseCase: GenerateMotorAlertMessageUseCase,
  ) {}

  getCurrentMotor(): Observable<Motor> {
    return this.getCurrentMotorDataUseCase.execute().pipe(
      map((motor) => {
        const calculatedStatus = this.evaluateMotorStatusUseCase.execute(motor.sensors);
        const calculatedHealthScore = this.calculateMotorHealthUseCase.execute(motor.sensors);
        const calculatedMessage = this.generateMotorAlertMessageUseCase.execute(
          motor.sensors,
          calculatedStatus,
        );

        return {
          ...motor,
          twinState: {
            status: calculatedStatus,
            healthScore: calculatedHealthScore,
            message: calculatedMessage,
          },
        };
      }),
    );
  }
}
