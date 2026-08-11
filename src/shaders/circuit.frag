#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_animate;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centered = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  float aspect = u_resolution.x / u_resolution.y;
  vec2 warp = u_mouse * 0.035;

  float cells = 24.0;
  vec2 gridUv = (uv + warp) * vec2(cells * aspect, cells);
  vec2 cellId = floor(gridUv);
  vec2 cellUv = fract(gridUv) - 0.5;

  float h = hash(cellId);
  bool flipped = h > 0.5;
  if (flipped) cellUv.x = -cellUv.x;

  vec2 cornerA = vec2(-0.5, -0.5);
  vec2 cornerB = vec2(0.5, 0.5);

  float d1 = abs(length(cellUv - cornerA) - 0.5);
  float d2 = abs(length(cellUv - cornerB) - 0.5);
  float d = min(d1, d2);

  float lineWidth = 0.035;
  float aa = fwidth(d) * 1.5;
  float line = 1.0 - smoothstep(lineWidth - aa, lineWidth + aa, d);

  vec2 nearCorner = d1 < d2 ? cornerA : cornerB;
  float angle = atan(cellUv.y - nearCorner.y, cellUv.x - nearCorner.x);
  float phase = hash(cellId + 11.0) * 6.2831;
  float speed = 1.1 + hash(cellId + 3.0) * 0.6;
  float flow = sin(angle * 2.0 - u_time * u_animate * speed + phase) * 0.5 + 0.5;
  flow = pow(flow, 5.0);

  vec3 bg = vec3(0.043, 0.062, 0.055);
  vec3 traceColor = vec3(0.11, 0.13, 0.115);
  vec3 signalColor = vec3(0.902, 0.710, 0.404);

  vec3 col = bg;
  col = mix(col, traceColor, line * 0.85);
  col = mix(col, signalColor, line * flow * 0.85);

  float vig = 1.0 - smoothstep(0.35, 1.2, length(centered) / max(aspect * 0.55, 0.55));
  col = mix(bg, col, clamp(vig, 0.0, 1.0));

  fragColor = vec4(col, 1.0);
}
