// storage.js

// 存储 token
export function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  // 获取 token
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  // 清除 Token
export function clearToken() {
    localStorage.removeItem('token');
  }

  // 存储 图片
export function setImg(img) {
  localStorage.setItem('img', img);
}

// 获取 token
export function getImg() {
  return localStorage.getItem('img');
}

// 清除 Token
export function clearImg() {
  localStorage.removeItem('img');
}

// 存储支付跳转URL
export function setUrl(url) {
  localStorage.setItem('url', url);
}

// 获取图片支付跳转URL
export function getUrl() {
  return localStorage.getItem('url');
}

// 清除图片支付跳转URL
export function clearUrl() {
  localStorage.removeItem('url');
}