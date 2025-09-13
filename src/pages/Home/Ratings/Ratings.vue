<template>
  <div class="page-content">
    <h4>تقييماتي</h4>
    <div v-if="loading && resultGet?.data.length === 0">
      <div class="rating-tab">
        <div class="info">
          <Skeleton width="100px" height="40px" />
          <br>
          <Skeleton width="100px" height="15px" />
        </div>
        <Skeleton width="100px" height="40px" />
      </div>
    </div>
    <div v-else-if="!loading && resultGet?.data.length !== 0">
      <div class="rating-tab" v-for="item in resultGet?.data" :key="item.id">
        <div class="info">
          <h3>{{ item.user }}</h3>
          <h5>{{ item.comment }}</h5>
        </div>
        <Rating v-model="item.rate" readonly :cancel="false" />
      </div>
    </div>
    <Empty v-else emptyText="تقييمات" />
  </div>
  <!------------------- to handle Prime Vue Toast Error ------------------>
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
  import { onMounted } from 'vue';
  import Rating from 'primevue/rating';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Skeleton from 'primevue/skeleton';
  import Empty from '../../../components/Empty.vue';
  import Toast from 'primevue/toast';
  // to import get methods from get api methods 
  const { getMethod , resultGet , loading , toast } = useApiMethods()

  onMounted(()=>{
    getMethod('/api/merchant/order-rates' , true)
  })
</script>

<style lang="scss" scoped>
.page-content{
  padding-bottom: 20px;
  .rating-tab{
    border: 1px solid #DBD9D9DD;
    border-radius: 10px;
    padding: 10px clamp(10px , 4vw , 25px);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
    position: relative;
    .info{
      h3{
        font-size: 20px;
        font-weight: 500;
        color: #1E1E1E;
        margin-bottom: 10px;
      }
      h5{
        font-size: 16px;
        font-weight: 300;
        color: #434343;
        line-height: 1.6;
      }
    }
  }
}
</style>