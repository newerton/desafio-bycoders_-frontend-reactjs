export const calculateWindAngle = (angle: number) => {
  let result = 0;
  if (angle > 180) {
    result = angle - 180;
  } else {
    let oppositeAngle = angle + 180;

    if (oppositeAngle > 360) {
      oppositeAngle -= 360;
    }

    result = oppositeAngle;
  }

  return result.toFixed(0);
};
