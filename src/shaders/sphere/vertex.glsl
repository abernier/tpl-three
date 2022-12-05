void main() {
  //
  // gl_Position
  //
  //   0. The local position of the vertex (origin being the center of the object)
  //   vec4 localPosition = vec4(position, 1.0);
  //   1. Transform the local coordinates to world coordinates
  //   vec4 worldPosition = modelMatrix * localPosition;
  //   2. Transform world coordinates to view-space coordinates (origin being the "eye"/camera position)
  //   vec4 viewPosition = viewMatrix * worldPosition;
  //   3. Transform view coordinates to NDC coordinates
  //   gl_Position = projectionMatrix * viewPosition; 
  //
  // see: https://www.youtube.com/watch?v=Sukvxf7FfYM&t=961s
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
