import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Motor } from '../../../domain/models/motor.model';

@Component({
  selector: 'app-motor-digital-twin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motor-digital-twin.component.html',
  styleUrl: './motor-digital-twin.component.css',
})
export class MotorDigitalTwinComponent {
  @Input({ required: true }) motor!: Motor;

  get statusClass(): string {
    return this.motor.twinState.status.toLowerCase();
  }

  get statusLabel(): string {
    if (this.motor.twinState.status === 'Critical') {
      return 'Crítico';
    }

    if (this.motor.twinState.status === 'Warning') {
      return 'Advertencia';
    }

    return 'Normal';
  }

  get rotationClass(): string {
    if (this.motor.twinState.status === 'Critical') {
      return 'slow';
    }

    if (this.motor.twinState.status === 'Warning') {
      return 'unstable';
    }

    return 'stable';
  }
}
