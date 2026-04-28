import { Injectable } from '@angular/core';

import { MotorSensors } from '../../domain/models/motor-sensors.model';
import { MotorStatus } from '../../domain/models/motor-status.model';

@Injectable({
  providedIn: 'root',
})
export class GenerateMotorAlertMessageUseCase {
  execute(sensors: MotorSensors, status: MotorStatus): string {
    if (status === 'Normal') {
      return 'El motor opera dentro de parámetros normales.';
    }

    if (sensors.tempC > 85) {
      return 'Temperatura crítica detectada. Detener el motor y revisar el sistema de enfriamiento.';
    }

    if (sensors.vibG > 1.0) {
      return 'Vibración crítica detectada. Revisar rodamientos, alineación y anclajes.';
    }

    if (sensors.currentA > 18) {
      return 'Sobrecarga eléctrica detectada. Revisar carga mecánica y consumo del motor.';
    }

    if (sensors.speedRpm < 1600) {
      return 'Pérdida significativa de RPM. Revisar eficiencia, carga y posible deslizamiento.';
    }

    if (sensors.inputVoltageV < 200 || sensors.inputVoltageV > 240) {
      return 'Voltaje fuera de rango crítico. Revisar alimentación eléctrica.';
    }

    if (sensors.operationHours > 1800) {
      return 'Horas de operación elevadas. Realizar mantenimiento preventivo inmediato.';
    }

    if (sensors.tempC > 70) {
      return 'Temperatura elevada. Monitorear enfriamiento del motor.';
    }

    if (sensors.vibG > 0.7) {
      return 'Alta vibración detectada. Revisar anclajes y alineación.';
    }

    if (sensors.currentA > 14) {
      return 'Aumento de corriente detectado. Posible sobrecarga del motor.';
    }

    if (sensors.speedRpm < 1700) {
      return 'RPM por debajo del valor esperado. Revisar carga mecánica.';
    }

    if (sensors.inputVoltageV < 210 || sensors.inputVoltageV > 230) {
      return 'Variación de voltaje detectada. Monitorear alimentación eléctrica.';
    }

    if (sensors.operationHours >= 1500) {
      return 'El motor se aproxima a mantenimiento preventivo por horas de operación.';
    }

    return 'Se detectó una condición de advertencia. Revisar el motor.';
  }
}
