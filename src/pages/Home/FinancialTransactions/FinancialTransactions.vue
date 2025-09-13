<template>
  <div v-if="resultGet?.data.data.length !== 0">
    <div class="page-content">
      <div class="upper-bar">
        <h4>التقارير المالية</h4>
        <button @click="handleSendSettlementRequest" v-if="resultPost?.data.key !== 'success'">
          <i class="pi pi-dollar"></i>
          <span>طلب تسوية</span>
        </button>
      </div>
      <div class="settlement-status" v-if="resultPost?.data.key === 'success'">
        <h6>تم إرسال طلبك بنجاح , بإنتظار الموافقه</h6>
      </div>
      <div class="total-value">
        <h1>القيم الإجمالية</h1>
        <ul>
          <li>
            <h3>إجمالي الطلبات</h3>
            <h3 v-if="!loading">{{ resultGet?.data.totals.count }} إشتراك</h3>
            <Skeleton v-else width="100px" height="20px"/>
          </li>
          <li>
            <h3>إجمالي العمولة</h3>
            <h3 v-if="!loading">{{ resultGet?.data.totals.app_commission }} ر.س</h3>
            <Skeleton v-else width="100px" height="20px"/>
          </li>
          <li>
            <h3>إجمالي القيمة المضافة</h3>
            <h3 v-if="!loading">{{ resultGet?.data.totals.tax }} ر.س</h3>
            <Skeleton v-else width="100px" height="20px"/>
          </li>
          <li>
            <h3>المستحق</h3>
            <h3 v-if="!loading">{{ resultGet?.data.totals.provider_total }} ر.س</h3>
            <Skeleton v-else width="100px" height="20px"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-content">
      <h4>الطلبات التي سيتم تسويتها</h4>
      <FinanicialTransictionTable 
        :transictionalData="resultGet?.data.data" 
        :loading="loading"
        singlePageUrl="/home/orders-details/"
      />
    </div>
  </div>
  <!----------------------------- to handle Empty Content ----------------------------->
  <Empty v-else empty-text="تقارير ماليه" />
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading"/>

</template>

<script setup>
  import { onMounted } from 'vue'
  import FinanicialTransictionTable from '../../../components/Tables/FinanicialTransictionTable.vue'
  import useApiMethods from '../../../mixins/ApiMethods'
  import Toast from 'primevue/toast'
  import Loading from '../../../components/Loading.vue'
  import Skeleton from 'primevue/skeleton'
  import Empty from '../../../components/Empty.vue'



  // to import  from api methods
  const {
    postMethod,
    getMethod,
    resultPost,
    resultGet,
    toast,
    loading
  } = useApiMethods()

  // to handle send settlement request
  const handleSendSettlementRequest = () =>{
    postMethod('/api/merchant/settlement-request' , {} , true , 'reload_page' ,'toast')
  }

  onMounted(()=>{
    getMethod('/api/merchant/pending-settlements' , true)
  })
</script>

<style lang="scss" scoped>
.page-content{
  padding-bottom: 20px;
  &:not(:last-of-type){
    margin-bottom: 20px;
  }
  .settlement-status{
    padding: 15px 0;
    text-align: center;
    margin-bottom: 20px;
    background: rgba(#293E79 , 0.2);
    h6{
      font-size: 20px;
      font-weight: 500;
      color:#293E79;
    }
  }
}
.total-value{
  border: 1px solid #D9D9D9;
  border-radius: 7px;
  overflow: hidden;
  h1{
    font-size: clamp(16px , 4vw , 20px);
    font-weight: 700;
    color: #1E1E1E;
    border-bottom: 1px solid #DBD9D9DD;
    padding: 20px;
  }
  ul{
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    li{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      padding-inline: clamp(8px , 1vw , 20px);
      h3{
        font-size: clamp(15px , 4vw , 18px);
        font-weight: 500;
        color: #434343;
        &:last-of-type{
          color: #8D8D8D;
        }
      }
      &:last-of-type{
        background: rgb(#B26FAC , 0.15);
        padding: 20px ;
        h3{
          color: #B26FAC;
          font-size: clamp(17px , 4vw , 20px);
          font-weight: 600;
        }
      }
      
    }
  }
}
.empty{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>