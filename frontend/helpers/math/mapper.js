import logger from '../logger/logger';

export default function (value, inputMin, inputMax, outputMin, outputMax) {
  const percent = (value - inputMin) / (inputMax - inputMin);

  const result = outputMin + percent * (outputMax - outputMin);

  // logger.debug('mapper.js', `${percent * 100}%`, value, inputMin,
  //   inputMax, outputMin, outputMax, 'result is ', result);

  return result
}
