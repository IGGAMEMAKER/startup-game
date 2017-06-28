import logger from '../logger/logger';

export default function (value, inputMin, inputMax, outputMin, outputMax) {
  const percent = (value - inputMin) / (inputMax - inputMin);

  logger.debug('mapper.js', value, inputMin, inputMax, outputMin, outputMax);
  logger.debug('percent is', percent);

  const result = outputMin + percent * (outputMax - outputMin);

  logger.debug('result is ', result);

  return result
}
