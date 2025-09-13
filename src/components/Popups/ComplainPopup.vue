<template>
  <div class="popup">
    <div class="content">
      <h1>أدخل المشكلة الموجودة في المنتج</h1>
      <div class="input">
        <textarea placeholder="ادخل المشكلة" v-model="complain.text"></textarea>
      </div>
      <div class="input">
        <input 
          type="file" 
          id="upload-imgs" 
          hidden 
          accept="image/*"
          @change="handleImageUpload" 
          multiple
        >
        <label for="upload-imgs" class="placeholder-text">
          <p>هل تريد ادخال صور ؟</p>
          <i class="pi pi-plus"></i>
        </label>
        <div class="images">
          <div v-for="(image, index) in complain.images" :key="index" class="image-wrapper">
            <img :src="image.url" alt="uploaded image" loading="lazy">
            <button @click="removeImage(index)"><i class="pi pi-trash"></i></button>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="handleSendComplain">نعم</button>
        <button @click="$emit('handleshowComplainPopup')">رجوع</button>
      </div>
    </div>
  </div>
  {{ variant_id }}
  {{ props.quantity }}
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import { useRoute } from 'vue-router';

// define Emits
const emit = defineEmits(['handleshowComplainPopup', 'handleSubmitComplain']);

// define Props
const props = defineProps({
  quantity: {
    type: Number,
    default: 1
  },
  variant_id: {
    type: Number,
    default: 3
  }
});


// to handle complain
const complain = ref({
  text: '',
  images: []
});

const route = useRoute();

const handleImageUpload = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      complain.value.images.push({
        file: file,
        url: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }
};

const handleSendComplain = () => {
  console.log(props.variant_id)
  const formData = new FormData();
  formData.append('order_variant_id', props.variant_id);
  formData.append('quantity', props.quantity);
  formData.append('problem', complain.value.text);

  complain.value.images.forEach((image, index) => {
    formData.append(`images[${index}]`, image.file);
  });

  emit('handleSubmitComplain', formData);
};


const removeImage = (index) => {
  complain.value.images.splice(index, 1);
};

</script>

<style lang="scss" scoped>
.popup {
  .input {
    width: 100%;
    padding: 10px;
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
    textarea {
      min-height: 200px;
    }
    .placeholder-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      p {
        font-size: 18px;
      }
      i {
        font-size: 14px;
        margin-bottom: 0;
        background: #293e79;
        color: #fff;
        padding: 5px;
      }
    }
    .images {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      gap: 8px;
      .image-wrapper {
        position: relative;
        margin-right: 10px;
        margin-bottom: 10px;
        img {
          width: 120px;
          height: 90px;
          object-fit: cover;
          border-radius: 5px;
        }
        button {
          position: absolute;
          top: -5px;
          left: -5px;
          background: #DB3740;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          width: 25px;
          height: 25px;
          padding: 2px;
          i{
            font-size: 15px;
            color: #FFFFFF;
          }
        }
      }
    }
  }
}
</style>
