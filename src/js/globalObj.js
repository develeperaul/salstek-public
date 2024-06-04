import ObjectLive from 'object-live';
import constraintsObj from '../assets/validate.json';
document.addEventListener('DOMContentLoaded', () => {
  window.constraints = new ObjectLive({});

  const obj = new ObjectLive({});
  for (let key in constraintsObj) {
    window.constraints[key] = new ObjectLive(constraintsObj[key]);
  }
});
