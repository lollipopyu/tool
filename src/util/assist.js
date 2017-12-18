export function stringify(obj) {
  return JSON.stringify(obj, function (key, val) {
    if (typeof val === 'function') {
      return val.toString();
    }
    return val;
  });
}

// deepCopy
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export {deepCopy};

export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

//非负整数
export function isNumber(obj) {
  const reg = /^-?\d+$/
  return reg.test(obj)
}

export function isPlain(obj) {
  return JSON.stringify(obj) === "{}"
}

export function getCookie(name){
  var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if(cookieStart > -1){
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if(cookieEnd == -1){
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }

    return cookieValue;
}

export function set(name, value, expires, path, domain, secure){
  var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  if(expires instanceof Date){
    cookieText += "; expires=" + expires.toGMTString();
  }

  if(path){
    cookieText += "; path=" + path;
  }

  if(domain){
    cookieText += "; domain=" + domain;
  }

  if(secure){
    cookieText += "; secure";
  }

  document.cookie = cookieText;
}

export function unset(name, path, domain,secure){
  set(name, "", new Date(0), path, domain, secure);
}