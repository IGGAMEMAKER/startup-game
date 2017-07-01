function saveInStorage(field, data){
  var item = data;
  if (typeof(data)=='object') {
    //console.log('object');
    item = JSON.stringify(data);
  }
  localStorage.setItem(field, item);
  //storage[field] = item;
}
function getFromStorage(field){
  //return storage[field];
  return localStorage.getItem(field);
}

function getObject(arrName){
  return JSON.parse( getFromStorage(arrName) );
}

function setInObject(arrName, id , value){
  var array = getObject(arrName);
  //prt(arrName, id, value);
  array[id] = value;
  saveInStorage(arrName, array);
}

function unsetFromObject(arrName, id){
  var array = getObject(arrName);

  // console.log('was', array);

  delete array[id];

  // console.log('became', array);
  saveInStorage(arrName, array);
}

function clearStorage(){
  localStorage.clear();

  // saveInStorage('tournaments', []);
  // saveInStorage('addresses', {});
  // saveInStorage('money', 0);
}

//clearStorage();

// cookies
// возвращает cookie если есть или undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

// уcтанавливает cookie
function setCookie(name, value, props) {
  props = props || {}
  var exp = props.expires
  if (typeof exp == "number" && exp) {
    var d = new Date()
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d
  }
  if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in props){
    updatedCookie += "; " + propName
    var propValue = props[propName]
    if(propValue !== true){ updatedCookie += "=" + propValue }
  }
  document.cookie = updatedCookie

}

// удаляет cookie
function deleteCookie(name) {
  setCookie(name, null, { expires: -1 })
}

export default {
  deleteCookie,
  saveInStorage,
  getFromStorage,
  getObject,
  setInObject,
  unsetFromObject,
  clearStorage,
  getCookie,
  setCookie
};
