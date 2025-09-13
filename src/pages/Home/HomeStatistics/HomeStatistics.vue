<template>
  <div class="home-statistics">
    <div class="statistics">
      <div class="top-bar">
        <h4>إحصائيات الربح</h4>
        <div class="filter-btns">
          <button 
            @click="changeActiveStatus('buy')" 
            :class="activeStatus === 'buy' ? 'active' : ''">
            شراء
          </button>
          <button
            @click="changeActiveStatus('rent')" 
            :class="activeStatus === 'rent' ? 'active' : ''">
            إيجار
          </button>
        </div>
      </div>
      <div class="statistics-tabs">
        <div class="statistics-tab successed">
          <div class="text">
            <h4>نسبه الطلبات الناجحه</h4>
            <h5>{{activeStatus === 'buy' ? resultGet?.data.buy.completed : resultGet?.data.rent.completed}}%</h5>
          </div>
          <div class="image">
            <img src="../../../assets/images/successed.png" alt="img" loading="lazy">
          </div>
        </div>
        <div class="statistics-tab failed">
          <div class="text">
            <h4>نسبه الطلبات الغير الناجحه</h4>
            <h5>{{activeStatus === 'buy' ? resultGet?.data.buy.canceled : resultGet?.data.rent.canceled}}%</h5>
          </div>
          <div class="image">
            <img src="../../../assets/images/failed.png" alt="img" loading="lazy">
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <h4>اخر الطلبات</h4>
      <OrdersTable  />
    </div>
  </div>
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!-------------------------------------- Loading -------------------------------------->
  <Loading v-if="loading === true"/>
</template>

<script setup>
  import {ref , onMounted} from 'vue';
  import OrdersTable from '../../../components/Tables/OrdersTable.vue'
  import useApiMethods from '../../../mixins/ApiMethods'
  import Toast from 'primevue/toast';
  import Loading from '../../../components/Loading.vue';




  // to handle methods with endpoints
  const {getMethod , resultGet  , loading , toast} = useApiMethods()


  // ------------------ Change Orders Status ----------------------
  const activeStatus = ref('buy');
  const changeActiveStatus = (status) =>{
    activeStatus.value = status
  }
  // ------------------- handle Fetch Data -------------------------
  onMounted(()=>{
    getMethod('/api/merchant/statistics' , true)
  })
</script>

<style lang="scss" scoped>
.statistics{
  background-color: #fff;
  border-radius: 15px;
  padding: 20px 15px;
  margin-bottom:20px;
  .top-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h4{
      font-size: clamp(16px , 4vw ,24px);
      font-weight: 500;
      color: #434343;
    }
    .filter-btns{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 1px solid #B26FAC;
      border-radius: 3px;
      button{
        padding: 10px 30px;
        &.active{
          background: #B26FAC;
          color: #fff;
        }
      }
    }
  }
  .statistics-tabs{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;
    .statistics-tab{
      border: 1px dashed #293E7966;
      padding:15px 20px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      border-radius: 25px;
      width: 100%;
      .text{
        h4{
          font-size: 20px;
          font-weight: 500;
          color: #434343;
          margin-bottom: 10px;
        }
        h5{
          font-size: clamp(40px , 4vw , 90px);
          font-weight: 500;
          color: #293E79;
        }
      }
      .image{
        width: 60px;
        height: 60px;
        background: #293E79;
        padding: 15px;
        border-radius: 12px;
      }
      &:last-child{
        .text{
          h5{
            color:#434343;
          }
        }
        .image{
          background:#434343;
        }
      }
    }
    @media (max-width:767px){
      flex-wrap: wrap;
    }
  }
}
</style>