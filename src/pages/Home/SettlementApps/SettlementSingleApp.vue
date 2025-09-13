<template>
  <div class="page-content">
    <div class="upper-bar">
      <h4>التقارير المالية</h4>
    </div>
    <div 
      :class="['settlement-status ' + resultGet?.data?.data[0]?._status]" 
    >
      <h6>
        {{  resultGet?.data?.data[0]?._status &&
            resultGet?.data?.data[0]?._status === 'pending' ? 'تم إرسال طلبك بنجاح , بإنتظار الموافقه' :
            resultGet?.data?.data[0]?._status === 'accepted' ? 'تم قبول طلبك بنجاح' :
            'عفوا , قد تم رفض طلبك'
        }}
      </h6>
    </div>
    <div class="total-value">
      <h1>القيم الإجمالية</h1>
      <ul>
        <li>
          <h3>إجمالي الطلبات</h3>
          <h3>{{resultGet?.data?.data[0]?.total}} إشتراك</h3>
        </li>
        <li>
          <h3>إجمالي العمولة</h3>
          <h3>{{resultGet?.data?.data[0]?.app_commission}} ر.س</h3>
        </li>
        <li>
          <h3>إجمالي القيمة المضافة</h3>
          <h3>{{resultGet?.data?.data[0]?.tax}} ر.س</h3>
        </li>
        <li>
          <h3>المستحق</h3>
          <h3>{{resultGet?.data?.data[0]?.provider_total}} ر.س</h3>
        </li>
      </ul>
    </div>
  </div>
  <div class="page-content">
    <h4>الطلبات التي سيتم تسويتها</h4>
    <FinanicialTransictionTable 
      :loading="loading"  
      singlePageUrl="/home/settlement-single-app/"
      :transictionalData="resultGet?.data?.data[0]?.orders"
    />
  </div>
  <Pagination />
</template>

<script setup>
  import FinanicialTransictionTable from '../../../components/Tables/FinanicialTransictionTable.vue'
  import Pagination from '../../../components/Pagination.vue';
  import { onMounted } from 'vue'
  import useApiMethods from '../../../mixins/ApiMethods'; 

  const {
    getMethod , 
    resultGet , 
    loading
  } = useApiMethods()

  onMounted(()=>{
    getMethod('/api/merchant/settlement-request?type=pending' , true)
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
    h6{
      font-size: 20px;
      font-weight: 500;
    }
    &.pending{
      background: rgba(#293E79 , 0.2);
      h6{
        color:#293E79;
      }
    }
    &.accepted{
      background: rgba(#207542 , 0.2);
      h6{
        color:#207542;
      }
    }
    &.refused{
      background: rgba(#DB3740 , 0.2);
      h6{
        color:#DB3740;
      }
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
</style>