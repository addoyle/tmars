const gaugeHeight = 269;

export function gauge(max, value, offset = 0, inv = false) {
  return Math.abs((value * gaugeHeight / max) + offset - (inv ? gaugeHeight : 0));
}

export  default {
  gauge
};