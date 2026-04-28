import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MotorTwinState } from '../../../domain/models/motor-twin-state.model';

@Component({
  selector: 'app-motor-alert-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motor-alert-card.component.html',
  styleUrl: './motor-alert-card.component.css',
})
export class MotorAlertCardComponent {
  @Input({ required: true }) twinState!: MotorTwinState;

  get statusClass(): string {
    return this.twinState.status.toLowerCase();
  }

  get statusLabel(): string {
    if (this.twinState.status === 'Critical') {
      return 'Crítico';
    }

    if (this.twinState.status === 'Warning') {
      return 'Advertencia';
    }

    return 'Normal';
  }

  get title(): string {
    if (this.twinState.status === 'Critical') {
      return 'Riesgo de falla detectado';
    }

    if (this.twinState.status === 'Warning') {
      return 'Condición anómala detectada';
    }

    return 'Operación estable';
  }
}
