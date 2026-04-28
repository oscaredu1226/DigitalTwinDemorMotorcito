import { MotorResponseDto } from './motor-response.dto';

function getRandomNumber(min: number, max: number, decimals = 1): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function getMotorStatus(sensors: MotorResponseDto['sensors']): 'Normal' | 'Warning' | 'Critical' {
  if (
    sensors.temp_c > 85 ||
    sensors.vib_g > 1.0 ||
    sensors.current_a > 18 ||
    sensors.speed_rpm < 1600 ||
    sensors.input_voltage_v < 200 ||
    sensors.input_voltage_v > 240 ||
    sensors.operation_hours > 1800
  ) {
    return 'Critical';
  }

  if (
    sensors.temp_c > 70 ||
    sensors.vib_g > 0.7 ||
    sensors.current_a > 14 ||
    sensors.speed_rpm < 1700 ||
    sensors.input_voltage_v < 210 ||
    sensors.input_voltage_v > 230 ||
    sensors.operation_hours >= 1500
  ) {
    return 'Warning';
  }

  return 'Normal';
}

function getHealthScore(sensors: MotorResponseDto['sensors']): number {
  let healthScore = 100;

  if (sensors.temp_c > 70) healthScore -= 15;
  if (sensors.temp_c > 85) healthScore -= 15;

  if (sensors.vib_g > 0.7) healthScore -= 15;
  if (sensors.vib_g > 1.0) healthScore -= 15;

  if (sensors.current_a > 14) healthScore -= 10;
  if (sensors.current_a > 18) healthScore -= 15;

  if (sensors.speed_rpm < 1700) healthScore -= 10;
  if (sensors.speed_rpm < 1600) healthScore -= 15;

  if (sensors.input_voltage_v < 210 || sensors.input_voltage_v > 230) healthScore -= 10;
  if (sensors.input_voltage_v < 200 || sensors.input_voltage_v > 240) healthScore -= 15;

  if (sensors.operation_hours >= 1500) healthScore -= 10;
  if (sensors.operation_hours > 1800) healthScore -= 15;

  return Math.max(0, healthScore);
}

function getMessage(
  sensors: MotorResponseDto['sensors'],
  status: 'Normal' | 'Warning' | 'Critical',
): string {
  if (status === 'Normal') {
    return 'El motor opera dentro de parámetros normales.';
  }

  if (sensors.temp_c > 85) {
    return 'Temperatura crítica detectada. Detener el motor y revisar el sistema de enfriamiento.';
  }

  if (sensors.vib_g > 1.0) {
    return 'Vibración crítica detectada. Revisar rodamientos, alineación y anclajes.';
  }

  if (sensors.current_a > 18) {
    return 'Sobrecarga eléctrica detectada. Revisar carga mecánica y consumo del motor.';
  }

  if (sensors.speed_rpm < 1600) {
    return 'Pérdida significativa de RPM. Revisar eficiencia, carga y posible deslizamiento.';
  }

  if (sensors.input_voltage_v < 200 || sensors.input_voltage_v > 240) {
    return 'Voltaje fuera de rango crítico. Revisar alimentación eléctrica.';
  }

  if (sensors.operation_hours > 1800) {
    return 'Horas de operación elevadas. Realizar mantenimiento preventivo inmediato.';
  }

  if (sensors.temp_c > 70) {
    return 'Temperatura elevada. Monitorear enfriamiento del motor.';
  }

  if (sensors.vib_g > 0.7) {
    return 'Alta vibración detectada. Revisar anclajes y alineación.';
  }

  if (sensors.current_a > 14) {
    return 'Aumento de corriente detectado. Posible sobrecarga del motor.';
  }

  if (sensors.speed_rpm < 1700) {
    return 'RPM por debajo del valor esperado. Revisar carga mecánica.';
  }

  if (sensors.input_voltage_v < 210 || sensors.input_voltage_v > 230) {
    return 'Variación de voltaje detectada. Monitorear alimentación eléctrica.';
  }

  if (sensors.operation_hours >= 1500) {
    return 'El motor se aproxima a mantenimiento preventivo por horas de operación.';
  }

  return 'Se detectó una condición de advertencia. Revisar el motor.';
}

export function generateMockMotorResponse(): MotorResponseDto {
  const sensors: MotorResponseDto['sensors'] = {
    temp_c: getRandomNumber(45, 95),
    vib_g: getRandomNumber(0.2, 1.3, 2),
    current_a: getRandomNumber(9, 22),
    speed_rpm: Math.round(getRandomNumber(1500, 1800, 0)),
    operation_hours: Math.round(getRandomNumber(1100, 1900, 0)),
    input_voltage_v: Math.round(getRandomNumber(195, 245, 0)),
  };

  const status = getMotorStatus(sensors);
  const healthScore = getHealthScore(sensors);
  const message = getMessage(sensors, status);

  return {
    device_id: 'MOTOR-IND-01',
    timestamp: new Date().toISOString(),
    sensors,
    twin_state: {
      status,
      health_score: healthScore,
      message,
    },
  };
}
