<template>
  <div class="product-gallery">
    <div class="bar">
      <h4>صور المنتج</h4>
      <div class="input">
        <div :class="['circle', availabilityStatus === 'available' ? 'active' : '']"></div>
        <select v-model="availabilityStatus" @change="handleProductAvailability">
          <option value="available">متوفر</option>
          <option value="not-available">غير متوفر</option>
        </select>
      </div>
    </div>
    
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="true"
      :autoplay="1500"
      v-model="currentSlide"
    >
      <Slide v-for="slide in combinedImages" :key="slide.id">
        <div class="carousel__item image Big-Image">
          <template v-if="isImage(slide)">
            <img :src="slide.image" alt="image" loading="lazy">
          </template>
          <template v-else-if="isVideo(slide)">
            <button @click="handleVideoPopup(slide.image)">
              <i class="pi pi-play"></i>
            </button>
            <div class="overlay"></div>
            <video :src="slide.image" loading="lazy"></video>
          </template>
        </div>
      </Slide>
    </Carousel>
    
    <Carousel
      id="thumbnails"
      :items-to-show="combinedImages.length < 4 ? combinedImages.length : 4"
      v-model="currentSlide"
      ref="carousel"
      v-if="combinedImages.length > 1"
    >
      <Slide v-for="slide in combinedImages" :key="slide.id">
        <div class="carousel__item image Small-Image">
          <template v-if="isImage(slide)">
            <img :src="slide.image" alt="image" loading="lazy">
          </template>
          <template v-else-if="isVideo(slide)">
            <video :src="slide.image" loading="lazy"></video>
          </template>
        </div>
      </Slide>
    </Carousel>
    
  </div>
  <Toast ref="toast" position="bottom-right" />
  <div class="popup" v-if="videoPopup">
    <div class="content">
      <button class="close-icon" @click="videoPopup = false">
        <i class="pi pi-times"></i>
      </button>
      <div class="image">
        <video :src="videoSrc" controls autoplay loading="lazy"></video>
      </div>
    </div>
  </div>
</template>


<script setup>
  import { ref, watch , computed } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
  import useApiMethods from '../../mixins/ApiMethods';
  import Toast from 'primevue/toast';

  const { postMethod, toast } = useApiMethods();

  const props = defineProps({
    availablility: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: () => [],
    },
    id: {
      type: Number,
      default: null
    },
    variantImage: {
      type: String,
      default: null
    }
  });

  // to handle video popup
  const videoPopup = ref(false)
  const videoSrc = ref('')

  const handleVideoPopup = (src)=>{
    videoPopup.value = true
    videoSrc.value = src
  }

  // to handle the availability of the product
  const availabilityStatus = ref(props.availablility ? 'available' : 'not-available');

  const handleProductAvailability = () => {
    const isAvailable = availabilityStatus.value === 'available';
    postMethod(`/api/merchant/products/is_available/${props.id}`, availabilityStatus, true, '', 'toast');
  };

  watch(() => props.availablility, (newValue) => {
    availabilityStatus.value = newValue ? 'available' : 'not-available';
  });

  const currentSlide = ref(0);

  // Check if the source is an image
  const isImage = (slide) => {
    return slide.image && slide.image.match(/\.(jpeg|jpg|gif|png)$/i);
  };

  // Check if the source is a video
  const isVideo = (slide) => {
    return slide.image && slide.image.match(/\.(mp4|webm|ogg)$/i);
  };


  const combinedImages = computed(() => {
    const variantImages = props.variantImage ? [{ id: 'variant', image: props.variantImage }] : [];
    return [...props.images, ...variantImages];
  });

</script>




<style lang="scss" scoped>
  .product-gallery{
    background: #F8F8FF;
    padding: 20px 10px;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    .bar{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 10px;
      .input{
        border-radius: 9px;
        border: 1px solid #B26FAC;
        padding: 10px 15px;
        position: relative;
        display: flex;
        align-items: baseline;
        .circle{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #DB3740;
          margin-inline-end: 8px;
          flex-shrink: 0;
          &.active{
            background: #73AF00;
          }
        }
        select{
          background: transparent;
          font-size: 18px;
          font-weight: 400;
          padding-inline: 4px;
          position: relative;
          &::after{
            content: '';
            position: absolute;
            inset-inline-start: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #B26FAC;
            z-index: 9;
          }
        }
      }
    }
    #gallery{
      max-width: 700px;
      width: 100%;
      margin: 0 auto 25px;
      background: #fff;
      padding-bottom: 0;
      .Big-Image{
        background: #fff;
        height: 350px;
        width: 100%;
        position: relative;
        z-index: 3;
        border-radius: 8px;
        overflow: hidden;
        button{
          position: absolute;
          left: 50%;
          top: 50%;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          cursor: pointer;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          .pi{
            font-size: 22px;
            font-weight: 900;
          }
        }
        .overlay{
          position: absolute;
          inset-inline-start: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgb(#000 , 0.4);
          z-index: -1;
        }
        img , video{
          border-radius: 10px;
          overflow: hidden;
          // object-fit: contain;
        }
      }
    }
    .Small-Image{
      height: 100px !important;
      width: 100%;
      margin-inline-start: 10px;
      background: #fff !important;
      img , video{
        border-radius: 10px;
        overflow: hidden;
        object-fit: cover !important;
      }
    }
    @media (max-width : 600px){
      padding-bottom: 0; 
      #gallery {
        margin-bottom: 0;
      }
      .Small-Image{
        display: none;
      }
    }
  }

  .popup{
    .image{
      width: 100%;
    }
  }
</style>