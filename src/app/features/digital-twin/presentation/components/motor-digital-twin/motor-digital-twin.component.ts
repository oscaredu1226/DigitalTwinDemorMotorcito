import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Motor } from '../../../domain/models/motor.model';
import { Motor3dViewerComponent } from '../motor-3d-viewer/motor-3d-viewer.component';

@Component({
  selector: 'app-motor-digital-twin',
  standalone: true,
  imports: [CommonModule, Motor3dViewerComponent],
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
}
