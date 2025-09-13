<template>
  <!-- ----------------------------Order Details------------------------------------ -->
  <div class="page-content">
    <h4>تفاصيل الطلب</h4>
    <ul>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.order_num">
        <h3>{{resultGet?.data?._order_type === 'buy' ? 'رقم الشراء' : 'رقم الإستئجار'}}</h3>
        <h4>{{ resultGet?.data.order_num }}</h4>
      </li>
      <li  v-if="resultGet?.key !== 'success' && resultGet?.data.order_num">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.status">
        <h3>حالة الطلب</h3>
        <h4>{{ resultGet?.data.status }}</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.status">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.creation_date">
        <h3>تاريخ الإستئجار</h3>
        <h4>{{ resultGet?.data.creation_date }}</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.creation_date">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.number_of_products">
        <h3>عدد المنتجات</h3>
        <h4>{{ resultGet?.data.number_of_products }}</h4>
      </li>
      <li  v-if="resultGet?.key !== 'success' && resultGet?.data.number_of_products">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.from">
        <h3>تاريخ بداية الإيجار</h3>
        <h4>{{ resultGet?.data.from }}</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.from">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.to">
        <h3>تاريخ نهاية الإيجار</h3>
        <h4>{{ resultGet?.data.to }}</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.to">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.basic">
        <h3>سعر الطلب</h3>
        <h4>{{ resultGet?.data.summary.basic }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.summary.basic">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.to">
          <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.app_commission_ratio">
          <h3>نسبة عمولة التطبيق</h3>
          <h4>{{ resultGet?.data.summary.app_commission_ratio }} %</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.app_commission">
          <h3>عمولة التطبيق</h3>
          <h4>{{ resultGet?.data.summary.app_commission }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.discount">
          <h3>الخصم</h3>
          <h4>{{ resultGet?.data.summary.discount }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.merchant_deserved_amount">
          <h3>المبلغ المستحق للتاجر</h3>
          <h4>{{ resultGet?.data.summary.merchant_deserved_amount }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.shipping_cost">
          <h3>تكلفة الشحن</h3>
          <h4>{{ resultGet?.data.summary.shipping_cost }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.tax_ratio">
          <h3>نسبة الضريبة</h3>
          <h4>{{ resultGet?.data.summary.tax_ratio }} %</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.tax_cost">
          <h3>تكلفة الضريبة</h3>
          <h4>{{ resultGet?.data.summary.tax_cost }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.payment_method">
        <h3>طريقة الدفع</h3>
        <h4>{{ resultGet?.data.payment_method }}</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.payment_method">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.summary.total">
        <h3>الإجمالي</h3>
        <h4>{{ resultGet?.data.summary.total }} ر.س</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.summary.total">
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success' && resultGet?.data.notes">
        <h3>ملاحظات</h3>
        <h4>{{ resultGet?.data.notes }}</h4>
      </li>
      <li v-if="resultGet?.key !== 'success' && resultGet?.data.notes">
        <Skeleton width="100%" height="1.5em" />
      </li>
    </ul>
  </div>

  <!-- ---------------------------Client Details------------------------------------- -->
  <div class="page-content client-details">
    <h4>تفاصيل العميل</h4>
    <ul>
      <li v-if="resultGet?.key === 'success'">
        <h3>اسم العميل</h3>
        <h4>{{ resultGet?.data.user.name }}</h4>
      </li>
      <li v-else>
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success'">
        <h3>رقم العميل</h3>
        <h4>
          <i class="pi pi-phone"></i>
          <span>{{ resultGet?.data.user.phone }}</span>
        </h4>
      </li>
      <li v-else>
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success'">
        <h3>بريد العميل</h3>
        <h4>
          <i class="pi pi-envelope"></i>
          <span>{{ resultGet?.data.user.email }}</span>
        </h4>
      </li>
      <li v-else>
        <Skeleton width="100%" height="1.5em" />
      </li>
      <li v-if="resultGet?.key === 'success'">
        <h3>عنوان العميل</h3>
        <h4>
          <i class="pi pi-map-marker"></i>
          <span>{{ resultGet?.data.address.map_desc }}</span>
        </h4>
      </li>
      <li v-else>
        <Skeleton width="100%" height="1.5em" />
      </li>
    </ul>
  </div>
  <!-- ----------------------------Client Rating------------------------------------- -->
  <div 
    class="page-content client-rating" 
    v-if="resultGet?.data.status === 'completed'">
    <h4>تقييم العميل</h4>
    <Rating 
      v-model="numericRating" 
      readonly 
      :cancel="false" 
    />
    <div class="text" v-if="resultGet?.data.rate?.comment">
      <p>{{resultGet?.data.rate?.comment}}</p>
    </div>
  </div>

  <!-- ----------------------------Products Details --------------------------------- -->
  <div class="page-content products-details">
    <h4>المنتجات المطلوبه</h4>
    <ul>
      <li v-for="item in resultGet?.data.variants" :key="item.id">
        <div class="image">
          <!-- <img :src="item.image" alt="img" loading="lazy"> -->
          <template v-if="isImage(item.image)">
            <img :src="item.image" alt="image" loading="lazy" />
          </template>
          <template v-else-if="isVideo(item.image)">
            <video :src="item.image" autoplay muted loop loading="lazy" />
          </template>
        </div>
        <div class="product-info">
          <h1>{{ item.name }}</h1>
          <div class="details">
            <ol>
              <li v-for="subItem in item.options" :key="subItem.value">
                <h5>{{ subItem.feature }} : </h5>
                <h6>{{ subItem.value }}</h6>
              </li>
            </ol>
            <div class="price">
              {{ item.price }} ر.س
            </div>
          </div>
        </div>
      </li>
      <li v-if="resultGet?.key !== 'success'">
        <Skeleton width="100%" height="5em" />
      </li>
    </ul>
  </div>

  <!-- ---------------------------Order Progress Buttons ---------------------------- -->
  <div class="page-content order-progress" 
    v-if="resultGet?.data._status &&
    resultGet?.data._status !== 'await_payment' &&
    resultGet?.data._status !== 'completed' &&
    resultGet?.data._status !== 'refused' &&
    resultGet?.data._status !== 'canceled' 
  ">
    <div class="buttons">
        <!--  -->
      <button 
        class="main-btn" 
        @click="handleAcceptOrder"
        v-if="resultGet?.data.is_ready_for_returning && resultGet?.data._status === 'returning'"
      >
        {{getNextStatusText(resultGet?.data._status)}}
      </button>
      <button 
        class="main-btn" 
        @click="handleAcceptOrder"
        v-else
      >
        {{getNextStatusText(resultGet?.data._status)}}
      </button>
      <button 
        class="main-btn reversed" 
        @click="handleShowRefusePopUp"
        v-if="resultGet?.data._status === 'pending'">
        رفض الطلب
      </button>
    </div>
  </div>

  <!-- ---------------------------returning Order Buttons ---------------------------- -->
  <div class="page-content order-progress" 
    v-if="resultGet?.data._status &&
    resultGet?.data._status === 'returning'">
    <div class="buttons">
      <button class="main-btn" @click="handleAcceptOrder">
        {{getNextStatusText(resultGet?.data._status)}}
      </button>
      <button 
        class="main-btn reversed" 
        @click="handleshowComplainPopup">
        يوجد مشكله
      </button>
    </div>
  </div>

  <!--------------------------- Progress Popup For Order ------------------------------->
  <ProgressPopup 
    v-if="showProgressPopup"  
    :progressText="progressText"
  />

  <!--------------------------- Confirm Cancel Popup For Order ------------------------->
  <RefuseOrderPopup 
    v-if="showRefusePopUp === true"
    @handleProgressPopup="handleProgressPopup" 
    @handleShowRefusePopUp="handleShowRefusePopUp"
    @handleRefuseOrder="handleRefuseOrder"
  />
  
  <!---------------------------------- Complain Popup  ---------------------------------->
  <ComplainPopup 
    v-if="showComplainPopup"
    :quantity="resultGet?.data.number_of_products"
    :variant_id="resultGet?.data.variants[0].item_id"
    @handleshowComplainPopup="handleshowComplainPopup"
    @handleSubmitComplain="handleSubmitComplain"
  />
  <!-------------------------- to handle Prime Vue Toast Error -------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
  <!-------------------------------------- Loading -------------------------------------->
  <Loading 
    v-if="loading"
  />
</template>

<script setup>
  import { ref, onMounted , computed } from 'vue';
  import ProgressPopup from '../../../components/Popups/ProgressPopup.vue';
  import RefuseOrderPopup from '../../../components/Popups/RefuseOrderPopup.vue';
  import ComplainPopup from '../../../components/Popups/ComplainPopup.vue'
  import Rating from 'primevue/rating';
  import useApiMethods from '../../../mixins/ApiMethods';
  import { useRoute } from 'vue-router';
  import Toast from 'primevue/toast';
  import Skeleton from 'primevue/skeleton';
  import Loading from '../../../components/Loading.vue'


  // to handle methods with endpoints
  const { 
    getMethod, 
    postMethod ,
    resultGet, 
    toast , 
    loading,
    showProgressPopup, 
    progressText,
    handleProgressPopup
  } = useApiMethods();

  const route = useRoute();
  
  
  // to show the confirm of refused Popup
  const showRefusePopUp = ref(false);
  const handleShowRefusePopUp = () => {
    showRefusePopUp.value = !showRefusePopUp.value;
  };


  // to handle complain popup 
  const showComplainPopup = ref(false)
  const handleshowComplainPopup = () =>{
    showComplainPopup.value = !showComplainPopup.value
  }


  // to handle submit complain 
  const handleSubmitComplain = (body) => {
    postMethod('/api/merchant/rent-order-problems' , body , true , '/home/orders' , 'toast')
  };


  // to handle accept order
  const handleAcceptOrder = () => {
    const body = {
      status : resultGet.value.data._status === 'pending' ? 'await_payment' :
      resultGet.value.data._status === 'await_payment' ? 'payed' :
      resultGet.value.data._status === 'payed' ? 'preparing' :
      resultGet.value.data._status === 'preparing' ? 'shipping_delivered' : 
      resultGet.value.data._status === 'shipping_delivered' &&
      resultGet.value.data._order_type === 'buy'
      ? 'completed' :  resultGet.value.data._status === 'shipping_delivered' &&
      resultGet.value.data._order_type === 'rent' ? 'user_delivered' :
      resultGet.value.data._status === 'user_delivered' ? 'returning' : 'completed'
      // resultGet.value.data.status === 'returning' ?  : 
      // resultGet.value.data.status === 'refused' ? 'refused' : 'canceled'
    }
    postMethod(`/api/merchant/orders/${route.params.id}/change-status` , body , true , 'reload_page' , 'progressPopup')
  };


  // to handle refuse order
  const handleRefuseOrder = () => {
    const body = {
      status : 'refused'
    }
    postMethod(`/api/merchant/orders/${route.params.id}/change-status` , body , true , '/home/orders' , 'progressPopup')
  }



  // to handle rating value from string to number
  const numericRating = computed({
    get() {
      return parseFloat(resultGet.value?.data.rate?.rate) || 0;
    },
    set(value) {
      resultGet.value.data.rate.rate = value.toString();
    }
  });

  // to handle text of accept order btn
  const getNextStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'قبول الطلب';
      case 'payed':
        return 'تحت الإجراء';
      case 'preparing':
        return 'تم التسليم للشحن';
      case 'shipping_delivered':
        return 'تم التسليم للعميل';
      case 'user_delivered':
        return 'جاري الإعاده';
      case 'returning':
        return 'تم الإكتمال';
      case 'refused':
        return 'تم الرفض';
      case 'canceled':
        return 'تم الإلغاء';
    }
  };

  // Check if the source is an image
  const isImage = (media) => {
    return media && media.match(/\.(jpeg|jpg|gif|png)$/i);
  };

  // Check if the source is a video
  const isVideo = (media) => {
    return media && media.match(/\.(mp4|webm|ogg)$/i);
  };

  // to handle fetching data
  onMounted(() => {
    getMethod(`/api/merchant/orders/${route.params.id}`, true);
  });
</script>


<style lang="scss" scoped>
.page-content{
  border-radius: 15px;
  margin-bottom: 16px;
  ul{
    margin-top: 8px;
    li{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      position: relative;
      color:#434343;
      padding-bottom: 12px;
      padding-inline-start: 50px;
      &:not(:last-of-type){
        margin-bottom: 15px;
        border-bottom: 1px solid #EFEFEF;
      }
      &::before{
        content: "";
        position: absolute;
        inset-inline-start: 30px;
        top: 38%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #434343;
      }
      h3 , h4{
        font-size: clamp(14px , 4vw , 18px);
        font-weight: 300;
      }
      h4{
        font-weight: 500;
        padding-bottom: 0;
        color: #000000;
      }
      &:first-of-type{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        h4{
          color: #3368B1;
        }
      }
      &:nth-last-of-type(2){
        h4{
          color: #3368B1;
        }
      }
      &:nth-of-type(2){
        h4{
          color: #B26FAC;
        }
      }
      &:last-of-type{
        padding-bottom: 18px;
      }
      @media (max-width : 567px){
        flex-wrap: wrap;
        padding-inline-start: 14px;
        &::before{
          inset-inline-start: 0;
        }
      }
    }
  }
  &:first-of-type{
    ul li:last-of-type{
      flex-direction: column;
      align-items: flex-start;
      gap:8px;
      &::before{
        top: 12px;
      }
    }
  }
  &.client-details{
    ul{
      li{
        &:first-of-type{
          h4{
            color:#000000;
          }
        }
        h4{
          display: flex;
          flex-direction: row;
          gap: 5px;
          align-items: center;
          i{
            color: #B26FAC;
          }
          span{
            color:#000000;
          }
        }
      }
    }
  }
  &.client-rating{
    padding-bottom: 20px;
    .text{
      max-width: 817px;
      margin: 0 auto;
      border: 1px solid #D9D9D9;
      padding: 13px;
      border-radius: 6px;
      P{
        color:#979797;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
      }
    }
  }
  &.products-details{
    ul{
      li{
        justify-content: flex-start;
        gap: 20px;
        .image{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0px 2px 5px 0px #00000008;
          flex-shrink: 0;
        }
        .product-info{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          width: 100%;
          h1{
            font-size: clamp(18px , 4vw , 24px);
            font-weight: 500;
            color: #000000;
          }
          .details{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            width: 100%;
            ol{
              display: flex;
              flex-direction: row;
              gap: clamp(15px , 4vw , 60px);
              width: 100%;
              li{
                padding: 0;
                gap: 5px;
                margin-bottom: 0;
                border-bottom: 0;
                h5 , h6{
                  font-size: 16px;
                  font-weight: 400;
                }
                h5{
                  color: #434343;
                }
                h6{
                  color: #979797;
                }
                &::before{
                  display: none;
                }
              }
            }
            .price{
              flex-shrink: 0;
              font-size: 20px;
              font-weight: 600;
              color:#B26FAC;
            }
          }
        }
      }
    }
  }
  &.order-progress{
    .buttons{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 30px;
      max-width: 990px;
      width: 100%;
      margin: 0 auto;
      button{
        max-width: 450px;
      }
    }
  }
  &:last-of-type{
    // padding: 0 !important;
    // margin-bottom: 0 !important;
    button{
      margin: 20px auto;
    }
  }
}

</style>