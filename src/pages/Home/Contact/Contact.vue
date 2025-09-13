<template>
  <div class="page-content">
    <h4>تواصل معنا</h4>
    <form action="" @submit.prevent="handleSubmit">
      <label for="name">إسم مقدم الخدمة</label>
      <div class="input">
        <input 
          type="text" 
          id="name" 
          placeholder="أدخل إسم مقدم الخدمة"
          v-model="contactDetails.name"  
        >
      </div>
      <label for="title">عنوان الرسالة</label>
      <div class="input">
        <input 
          type="text" 
          id="title" 
          placeholder="أدخل عنوان الخدمة"
          v-model="contactDetails.title"
        >
      </div>
      <label for="photo">صورة</label>
      <div class="input">
        <input 
          type="file" 
          id="photo" 
          placeholder="إرفق صورة"
          @change="handleFileChange" 
          accept="image/*"
        >
        <i class="pi pi-upload"></i>
      </div>
      <label for="message-text">نص الرسالة</label>
      <div class="input">
        <textarea 
          id="message-text" 
          placeholder="أدخل نص الرسالة"
          v-model="contactDetails.message"
        ></textarea>
      </div>
      <button class="main-btn">
        إرسال
      </button>
    </form>
  </div>
  <!--------------------------- Progress Popup For Order ------------------------------->
  <ProgressPopup 
    v-if="showProgressPopup"  
    :progressText="progressText"
  />
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  
  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading === true"/>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Loading from '../../../components/Loading.vue'
  import Toast from 'primevue/toast';
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue'

  
  const contactDetails = ref({
    name : '',
    title : '',
    image:null,
    message:''
  })


  // to handle upload image
  const handleFileChange = (event) => {
    contactDetails.value.image = event.target.files[0];
  };

  // to import Methods for Api Methods File
  const {postMethod , resultPost , loading , toast , progressText , showProgressPopup} = useApiMethods()


  // to handle Submit Form
  const handleSubmit = () =>{
    let body = new FormData();
    body.append('name' , contactDetails.value.name)
    body.append('title' , contactDetails.value.title)
    body.append('image' , contactDetails.value.image)
    body.append('message' , contactDetails.value.message)
    body.append('type' , 'contact')

    postMethod('/api/merchant/contact-us' , body , true , '/home/last-orders' , 'progressPopup')
  }
</script>

<style lang="scss" scoped>
form{
  max-width: unset;
  .input{
    textarea{
      height: 130px;
      min-height: 60px;
      max-height: 130px;
    }
    input[type ='file']{
      padding-top: 3px;
      font-size: 16px;
      &::file-selector-button{
        display: none;
      }
    }
  }
}
</style>