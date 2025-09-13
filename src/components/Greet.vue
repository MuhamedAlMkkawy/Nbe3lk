<template>
  <div class="greet">
    <div class="content">
      <h3>أهلا بعودتك <span>{{userInfo.name }}</span></h3>
      <button  class="image notification" @click="handleNotificationBtn">
        <div class="badge bg-error">{{resultGet?.data?.count}}</div>
        <img src="../assets/images/ring.png" alt="ring image" loading="lazy">
      </button>
    </div>
  </div>
</template>

<script setup>
  import {ref , onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  import useApiMethods from '../mixins/ApiMethods';
  

  const {
    getMethod,
    resultGet
  } = useApiMethods()
  

  const router = useRouter()
  const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
  const handleNotificationBtn = () =>{
    window.sessionStorage.setItem('activeTab' , 'notification')
    router.push('/home/notifications')
  }

  onMounted(()=>{
    getMethod('/api/merchant/count-notifications' , true)
  })
</script>

<style lang="scss" scoped>
  .greet{
    padding: 24px 0 3px;
    .content{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      gap: 20px;
      h3{
        font-size: clamp(16px , 4vw  , 28px);
        font-weight: 500;
        span{
          color: #B26FAC;
        }
      }
      .notification{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #B26FAC;
        padding: 8px;
        position: relative;
        .badge{
          position: absolute;
          inset-inline-end: -5px;
          inset-block-start: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3368b1;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

        }
        img{
          object-fit: contain;
        }
      }
    }
  }
</style>