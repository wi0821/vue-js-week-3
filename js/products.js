import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { api_path,baseURL,checkLogin} from "./login.js";

//初始化Modal 並放入Vue.mounted中
let deleteModal = "";
let productModal = "";

const productsAPP = {
  data() {
    return {
      currentID:"",
      productsList:[],
      temp: {is_enabled:0},
      isFieldError: false,
    }
  },

  methods: {
    getProductsList() {
      axios.get(`${baseURL}/api/${api_path}/admin/products`)
      .then((res) => {
        this.productsList = res.data.products;
      })
      .catch((err) =>{
        alert(err.response.data.message);
      })
    },

    getProductID(product) {
      this.temp = {...product};
      this.currentID = this.temp.id;
      this.isFieldError = false;
    },

    //初始化imagesUrl為陣列
    createImages() {
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push('');
    },

    addProduct() {
      // this.temp = {};

      axios.post(`${baseURL}/api/${api_path}/admin/product/`,{data:this.temp})
      .then((res) => {
        console.log(res);
        this.getProductsList();
        productModal.hide();
      })
      .catch((err) =>{
        console.log(err)
        this.isFieldError = true;
        // alert("請確認所有欄位都已填寫");
      })
    },

    editProduct() {
      axios.put(`${baseURL}/api/${api_path}/admin/product/${this.currentID}`,{data:this.temp})
      .then((res) => {
        console.log(res);
        this.getProductsList();
        productModal.hide();
      })
      .catch((err) =>{
        console.log(err)
        alert(err.response.data.message);
      })
    },

    deleteProduct() {
      axios.delete(`${baseURL}/api/${api_path}/admin/product/${this.currentID}`)
      .then((res) => {
        console.log(res);
        this.getProductsList();
        alert("刪除成功");
        deleteModal.hide();
        this.temp = {};
      })
      .catch((err) =>{
        console.log(err)
        alert(err.response.data.message);
      })
    }
  },

  mounted() {
    deleteModal = new bootstrap.Modal(document.querySelector("#delProductModal"));
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));
    this.getProductsList();

  },
  created() {
    checkLogin();
  },
}

createApp(productsAPP).mount("#products");