import { MotorResponseDto } from './motor-response.dto';

function getRandomNumber(min: number, max: number, decimals = 1): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function calculateHealth(temp: number, vib: number): number {
  let penaltyT = 0;
  let penaltyV = 0;

  if (temp > 80) {
    penaltyT = ((temp - 80) / (120 - 80)) * 50;
  }

  if (vib > 3.0) {
    penaltyV = ((vib - 3.0) / (5.0 - 3.0)) * 50;
  }

  const score = 100 - (penaltyT + penaltyV);

  return Math.max(0, Math.round(score));
}

export function generateMockMotorResponse(): MotorResponseDto {
  const temp = getRandomNumber(0, 120);
  const vib = getRandomNumber(0, 5, 2);
  const curr = getRandomNumber(0, 30);
  const rpm = getRandomNumber(0, 3600);

  const isWarning = temp > 80 || vib > 3.0;
  const healthScore = calculateHealth(temp, vib);

  let message = 'Sistemas Nominales';

  if (temp > 80 && vib > 3.0) {
    message = 'Critico: Temp y Vib Elevadas';
  } else if (temp > 80) {
    message = 'Alerta: Sobrecalentamiento';
  } else if (vib > 3.0) {
    message = 'Alerta: Vibracion Anormal';
  }

  return {
    device_id: 'MOTOR-IND-01',
    timestamp: new Date().toISOString(),
    sensors: {
      temp_c: temp,
      vib_g: vib,
      current_a: curr,
      speed_rpm: rpm,
    },
    twin_state: {
      status: isWarning ? 'Warning' : 'OK',
      health_score: healthScore,
      message,
    },
  };
}
