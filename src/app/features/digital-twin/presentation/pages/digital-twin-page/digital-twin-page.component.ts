import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, catchError, interval, of, startWith, switchMap, takeUntil } from 'rxjs';

import { Motor } from '../../../domain/models/motor.model';
import { DigitalTwinService } from '../../../application/services/digital-twin.service';
import { MotorDigitalTwinComponent } from '../../components/motor-digital-twin/motor-digital-twin.component';
import { MotorSensorsPanelComponent } from '../../components/motor-sensors-panel/motor-sensors-panel.component';
import { MotorHealthCardComponent } from '../../components/motor-health-card/motor-health-card.component';
import { MotorAlertCardComponent } from '../../components/motor-alert-card/motor-alert-card.component';

@Component({
  selector: 'app-digital-twin-page',
  standalone: true,
  imports: [
    CommonModule,
    MotorDigitalTwinComponent,
    MotorSensorsPanelComponent,
    MotorHealthCardComponent,
    MotorAlertCardComponent,
  ],
  templateUrl: './digital-twin-page.component.html',
  styleUrl: './digital-twin-page.component.css',
})
export class DigitalTwinPageComponent implements OnInit, OnDestroy {
  motor: Motor | null = null;
  isLoading = true;
  errorMessage = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly digitalTwinService: DigitalTwinService) {}

  ngOnInit(): void {
    this.loadMotorData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMotorData(): void {
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.digitalTwinService.getCurrentMotor().pipe(
            catchError(() => {
              this.errorMessage = 'No se pudo obtener la información del motor.';
              this.isLoading = false;
              return of(null);
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((motor) => {
        if (!motor) {
          return;
        }

        this.motor = motor;
        this.isLoading = false;
        this.errorMessage = '';
      });
  }

  refreshData(): void {
    this.isLoading = true;

    this.digitalTwinService
      .getCurrentMotor()
      .pipe(
        catchError(() => {
          this.errorMessage = 'No se pudo actualizar la información del motor.';
          this.isLoading = false;
          return of(null);
        }),
      )
      .subscribe((motor) => {
        if (!motor) {
          return;
        }

        this.motor = motor;
        this.isLoading = false;
        this.errorMessage = '';
      });
  }
}
