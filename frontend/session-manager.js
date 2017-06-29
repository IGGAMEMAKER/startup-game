import sessionStorage from './sessionStorage';
import flux from './flux';

function getPlayerStorageData() {
  return sessionStorage.getFromStorage('player');
}

function getProductStorageData() {
  return sessionStorage.getFromStorage('products');
}

function getScheduleStorageData() {
  return sessionStorage.getFromStorage('schedule');
}

function getMessageStorageData() {
  return sessionStorage.getFromStorage('messages');
}

export function initialize() {
  const playerData = getPlayerStorageData();
  const productsData = getProductStorageData();
  const scheduleData = getScheduleStorageData();
  const messageData = getMessageStorageData();

  flux.scheduleStore.initialize(scheduleData);
  flux.productStore.initialize(productsData);
  flux.playerStore.initialize(playerData);
  // flux.playerStore.initialize(playerData);
}

// export default function () {
//
// }
