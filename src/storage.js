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