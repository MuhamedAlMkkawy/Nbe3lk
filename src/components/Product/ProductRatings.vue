<template>
  <div class="rating-tab" v-for="item in props?.rates" :key="item.id">
    <div class="info">
      <h3>{{item.user}}</h3>
      <h5>{{ item.comment }}</h5>
      <Rating 
        v-model="item.rate" 
        readonly 
        :cancel="false" 
      />
    </div>
  </div>
</template>

<script setup>
  import Rating from 'primevue/rating';


  // to define props
  const props = defineProps({
    rates:{
      type:Object,
      default:''
    }
  })

  
</script>

<style lang="scss" scoped>
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
  background: #fff;
  .p-rating.p-readonly{
    gap: 0;
    margin-bottom: 0;
  }
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

</style>