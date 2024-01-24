export const api_path = "wi0821";
export const baseURL = 'https://ec-course-api.hexschool.io/v2';

export function checkLogin() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",); //取得token

  axios.defaults.headers.common['Authorization'] = token;

  axios.post(`${baseURL}/api/user/check`)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) =>{
    console.log(err)
    if(window.location.href.includes("product.html")) {
      window.location = 'index.html';
    }
  })

}

import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
  //資料(函式)
  data() {
    return {
      loginMail: "",
      loginPwd: "",
      loginResult: "",
    }
  },
  //方法 (物件)
  methods: {
    adminLogin() {
      axios.post(`${baseURL}/admin/signin`,
        {
          "username": this.loginMail,
          "password": this.loginPwd
        }
      )
      .then((response) => {
        console.log(response.data);
        this.loginResult = response.data.success;
        const {token, expired} = response.data //取token 跟expire的值
        document.cookie = `loginToken=${token}; expires=${new Date(expired)}`; //儲存到cookie，並把expires做資料轉型
        window.location="product.html"; //如果目前為登入狀態，直接redirect to product page
        checkLogin();
      })
      .catch((error) => {
        this.loginResult = error.response.data.success
        alert(error.response.data.message)
      })

    },

  },

  created() {
    checkLogin();
  },

}
createApp(app).mount("#app");



