import { STATUS } from '../config';


export function getStatus(labels, state) {
  let status = null;
  labels.forEach((element) => {
    if (STATUS.includes(element)) status = element;
  });
  return status || state;
}
