<template>
  <div class="page-content">
    <h4>تفاصيل المنتج</h4>
    <div class="product">
      <ProductSlider 
        :images="resultGet?.data?.images"
        :variantImage = "resultGet?.data?.variants[0]?.image" 
        :availablility="resultGet?.data?.is_available"
        :id="resultGet?.data?.id"
        />
      <div class="product-details">
        <div class="info-tab">
          <h3>{{resultGet?.data?.name_ar}}</h3>
          <h3>{{resultGet?.data?.name_en}}</h3>
        </div>
        <div class="info-tab" v-if="resultGet?.data?.classification || resultGet?.data?.category">
          <h5>القسم الرئيسي : <span>{{resultGet?.data?.classification}}</span></h5>
          <h5>القسم الفرعي : <span>{{resultGet?.data?.category}}</span></h5>
        </div>
        <div class="info-tab variant_tab" v-for="variant in resultGet?.data?.variants" :key="variant.id">
          <div class="control_variant" v-if="resultGet?.data?.type === 'features'">
            <button class="edit_variant" @click="handleEditVariant">
              <i class="pi pi-pen-to-square"></i>
            </button>
            <button class="delete_variant" v-if="variant.can_edit" @click="handleDeleteVariant(variant.id)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
          <div class="tab" v-for="feature in variant.features" :key="feature.option">
            <div class="text">{{ feature.feature }}</div>
            <ul v-if="feature.feature === 'اللون'">
              <li :style="{ background: feature.value }" :key="feature.option"></li>
            </ul>
            <ol v-else>
              <li>{{ feature.option }}</li>
            </ol>
          </div>
          <div class="tab">
            <h5 >العدد المتوفر : <span>{{variant.quantity}}</span></h5>
          </div>
          <div class="tab"  v-if="variant.insurance_amount !== '0.00'">
            <h5>سعر التأمين : <span>{{variant.insurance_amount}}</span></h5>
          </div>
          <div class="tab"  v-if="variant.price !== '0.00'">
            <h5>السعر : <span>{{variant.price}}</span></h5>
          </div>
          <div class="tab"  v-if="variant.discount !== '0.00'">
            <h5>الخصم : <span>{{variant.discount}}</span></h5>
          </div>
          <!-- <div class="tab"  v-if="variant.is_active">
            <h5>هل متاح ؟ : <span>{{variant.is_active === 1 ? 'متاح' : 'غير متاح' }}</span></h5>
          </div> -->
          <div class="tab"  v-if="variant.price_after_discount !== '0.00'">
            <h5>الإجمالي : <span>{{variant.price_after_discount}}</span></h5>
          </div>
        </div>
        <div class="info-tab add_variant"  v-if="resultGet?.data?.type === 'features'">
          <button class="main-btn reversed" @click="handleAddVariant">
            <i class="pi pi-plus-circle"></i>
          </button>
        </div>
        <!-- <div class="info-tab" v-if="resultGet?.data?.category_type === 'rent'">
        </div> -->
        <!-- <div class="info-tab" v-if="resultGet?.data?.price">
          <h5 v-if="resultGet?.data?.category_type === 'buy'">السعر : <span>{{ resultGet?.data?.variants[0]?.price }} ر.س</span></h5>
          <h5 v-else>سعر الإيجار : <span>{{ resultGet?.data?.variants[0]?.price }} ر.س</span></h5>
        </div> -->
        <!-- <div class="info-tab" v-if="resultGet?.data?.variants[0]?.price_after_discount">
          <h5>الإجمالي : <span>{{ resultGet?.data?.variants[0]?.price_after_discount }} ر.س</span></h5>
        </div> -->
        <!-- <div class="info-tab">
          <h5>الأيام المتاحه للايجار</h5>
          <button class="calender-btn" @click="handleShowRentDays">
            <i class="pi pi-calendar"></i>
          </button>
          <RentDays 
            v-if="showRentDays === true"
            @handleShowRentDays ="handleShowRentDays"
          />
        </div> -->
      </div>
    </div>
    <div class="product-overview">
      <div class="upper-tabs">
        <div 
            :class="['tab ' , activeTab === 'ProductDescription' ? 'active' : '']" 
            @click="handleActiveTab('ProductDescription')"
        >
          <h3>وصف المنتج</h3>
        </div>
        <div 
            :class="['tab ' , activeTab === 'ProductStructure' ? 'active' : '']" 
            @click="handleActiveTab('ProductStructure')"
        >
          <h3>الإرشادات للحفاظ علي المنتج</h3>
        </div>
        <div 
            :class="['tab ' , activeTab === 'ProductRatings' ? 'active' : '']" 
            @click="handleActiveTab('ProductRatings')"
            v-if="resultGet?.data?.rates.length !== 0"
        >
          <h3>تقييمات المنتج</h3>
        </div>
      </div>
      <div class="tab-details">
        <ProductDescription 
          v-if="activeTab === 'ProductDescription'" 
          :description_ar="resultGet?.data?.description_ar"
          :description_en="resultGet?.data?.description_en"
          />
        <ProductStructure 
          v-if="activeTab === 'ProductStructure'" 
          :product_protection_instruction_ar="resultGet?.data?.product_protection_instruction_ar"
          :product_protection_instruction_en="resultGet?.data?.description_en"
        />
        <ProductRatings 
          v-if="activeTab === 'ProductRatings'" 
          :rates="resultGet?.data?.rates"
        />
      </div>
    </div>
    <div class="control_themes page-content"  v-if="resultGet?.data?.type === 'features' && resultGet?.data?.can_edit">
      <button class="main-btn" @click="handleEditThemes">
        تعديل السمات
      </button>
    </div>
    <div class="product-settings page-content">
      <button 
        @click="handleEditProduct"
        class="main-btn edit-product"
        v-if="resultGet?.data?.can_edit"
      >
        تعديل المنتج
      </button>
      <RouterLink 
        v-else 
        class="buttonLink" 
        :to="!resultGet?.data?.can_edit && resultGet?.data?.type === 'features' ? `/home/show-product-variants/${route.params.id}` : `/home/edit-variants/${route.params.id}`"
      >
        <button class="main-btn edit-product">
          تعديل المنتج
        </button>
      </RouterLink>
      <button 
        class="main-btn delete-product" 
        @click="handleShowDeleteProductPopup"
      >
        حذف المنتج
      </button>
    </div>
  </div>
  <!---------------------------- handle delete produst popup ---------------------------->
  <DeleteProductPopup 
    v-if="showDeleteProductPopup"
    @handleShowDeleteProductPopup="handleShowDeleteProductPopup"
    @handleDeleteProduct="handleDeleteProduct"
  />
  <!--------------------------------- to handle Loading --------------------------------->
  <Loading v-if="loading" />
  <!--------------------------------------- Toast --------------------------------------->
  <Toast 
    ref="toast"
    position="bottom-right"
  />
</template>


<script setup>
  import { onMounted, ref } from 'vue';
  import ProductDescription from '../../../components/Product/ProductDescription.vue';
  import ProductStructure from '../../../components/Product/ProductStructure.vue';
  import ProductRatings from '../../../components/Product/ProductRatings.vue';
  import ProductSlider from '../../../components/Product/ProductSlider.vue';
  // import RentDays from '../../../components/RentDays.vue';
  import useApiMethods from '../../../mixins/ApiMethods';
  import Loading from '../../../components/Loading.vue'
  import { RouterLink, useRoute, useRouter } from 'vue-router';
  import Toast from 'primevue/toast';
  import DeleteProductPopup from '../../../components/Popups/DeleteProductPopup.vue';
  
  
  const route = useRoute()
  const productId = route.params.id

  // to handle api methods
  const{
    getMethod,
    resultGet,
    deleteMethod,
    loading,
    toast
  } = useApiMethods()

  // to handle active tab in product overview
  const activeTab = ref('ProductDescription')
  const handleActiveTab = (targetTab) =>{
    activeTab.value = targetTab
  }
  // to handle show rent days popup
  const showRentDays = ref(false)
  const handleShowRentDays = () =>{
    showRentDays.value = !showRentDays.value
  }

  // to handle delete product popup
  const showDeleteProductPopup = ref(false)
  const handleShowDeleteProductPopup = () =>{
    showDeleteProductPopup.value = !showDeleteProductPopup.value
  }
  
  const handleDeleteProduct = () =>{
    handleShowDeleteProductPopup()    
    deleteMethod(`/api/merchant/products/${productId}` , true , 'toast' , '' , '/home/products')
  }

  const router = useRouter()

  // to handle edit product
  const handleEditProduct = () =>{
    window.sessionStorage.setItem('category_type' , resultGet?.value?.data?.category_type)
    window.sessionStorage.setItem('product_type' , resultGet?.value?.data?.type)
    window.sessionStorage.setItem('category_id' , resultGet?.value?.data?.category_id)
    router.push('/home/edit-product/' + productId)
  }


  // to handle edit variant
  const handleEditVariant = () => {
    window.sessionStorage.setItem('category_type' , resultGet?.value?.data?.category_type)
    window.sessionStorage.setItem('product_type' , resultGet?.value?.data?.type)
    window.sessionStorage.setItem('category_id' , resultGet?.value?.data?.category_id)
    router.push(`/home/edit-variants/${route.params.id}`)
  }

  // to handle delete variant
  const handleDeleteVariant = (variant_id) => {
    deleteMethod(`/api/merchant/variants/${variant_id}` , true , 'toast' , `/api/merchant/products/${productId}` , '')
  }

  // to handle add variant 
  const handleAddVariant = () =>{
    window.sessionStorage.setItem('category_type' , resultGet?.value?.data?.category_type)
    window.sessionStorage.setItem('product_id' , resultGet?.value?.data?.id)
    router.push('/home/select-product-variants/')
  }
  
  // to handle edit themes
  const handleEditThemes = () =>{
    window.sessionStorage.setItem('category_type' , resultGet?.value?.data?.category_type)
    window.sessionStorage.setItem('product_id' , resultGet?.value?.data?.id)
    router.push(`/home/show-themes/${productId}`)
  }



  onMounted(()=>{
    getMethod(`/api/merchant/products/${productId}` , true)
  })
</script>


<style lang="scss">
.page-content{
  padding-bottom: 20px;
  .product{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: clamp(14px , 4vw , 20px);
    .product-details{
      width: 50%;
      flex-shrink: 0;
      padding: clamp(15px , 4vw , 70px) 15px 0;
      border: 1px solid #F8F8FF;
      background: #F8F8FF;
      border-radius: 10px;
      .info-tab{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px 10px;
        width: 100%;
        padding: 15px 0;
        border-bottom: 1px solid #DCDCDC;
        h3{
          font-size: clamp(18px , 4vw , 24px);
          font-weight: 500;
          color: #293E79;
        }
        h5{
          font-size:16px;
          font-weight: 400;
          color: #1F2327;
          span{
            font-weight: 500;
            color: #B26FAC;
          }
        }
        .tab{
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          .text{
            font-size: clamp(14px , 4vw , 16px);
            font-weight: 400;
            color: #1E1E1E;
          }
          ul , ol{
            display: flex;
            flex-direction: row;
            gap: 5px;
            align-items: center;
            justify-content: flex-start;
            li{
              width: 35px;
              height: 35px;
            }
          }
          ul li{
            border-radius: 50%;
          }
          ol li{
            border-radius: 6px;
            border: 1px solid #DBD9D9DD;
            font-size: 12px;
            font-weight: 300;
            color: #979797;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        i{
          font-size: 25px;
          font-weight: 500;
          color:#B26FAC;
        }
        &.variant_tab{
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          .control_variant{
            position: absolute;
            inset-inline-end: 10px;
            top: 24px;
            display: flex;
            gap: 4px;
            button{
              width: 35px;
              height: 35px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: 0.6s;
              i.pi{
                color: #fff;
                font-size: 14px;
              }
              &:first-of-type{
                background: #3368B1;
                &:hover{
                  border: 1px solid #3368B1;
                  background: #fff;
                  i.pi{
                    color: #3368B1;
                  }
                }
              }
              &:last-of-type{
                background: #DB3740;
                &:hover{
                  border: 1px solid #DB3740;
                  background: #fff;
                  i.pi{
                    color: #DB3740;
                  }
                }
              }
            }
          }
        }
        &.add_variant{
          button{
            width: fit-content;
            height: fit-content;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            margin-inline-start: auto;
            i.pi{
              color: #293E79;
              transition: 1s;
              margin-bottom: 0;
            }
            &:hover{
              i.pi{
                color: #fff;
              }
            }
          }
        }
        &:last-of-type{
          border-bottom: unset;
        }
      }
    }
    @media (max-width:800px) {
      flex-wrap: wrap;
      .product-details{
        width: 100%;
      }
    }
  }
  .product-overview{
    margin: 30px 0;
    background: #F8F8FF;
    padding: 24px 16px;
    .upper-tabs{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid #DCDCDC;
      .tab{
        padding: 10px 16px;
        border-radius: 5px;
        cursor: pointer;
        h3{
          font-size: clamp(16px , 4vw , 20px);
          font-weight: 500;
          color: #434343;
        }
        &.active{
          background: #293E79;
          h3{
            color: #fff;
          }
        }
      }
    }
    .tab-details{
      padding-block-start: 20px;
      height: 220px;
      overflow-y: scroll;
      h5{
        font-size: 16px;
        font-weight: 400;
        color: #434343;
        margin-block-end: 10px;
        span{
          font-weight: 500;
          color: #B26FAC;
        }
      }
    }
  }
  .product-settings{
    display: flex;
    flex-direction: row;
    gap: 10px 20px;
    align-items: center;
    justify-content: center;
    background: #f8f8ff;
    a{
      display: flex;
      flex-shrink: 0;
      width:48%;
      justify-content:center;
    }
    .main-btn{
      max-width: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.delete-product{
        background: #e40d0d;
        &:hover{
          border-color: #e40d0d !important;
          color: #e40d0d;
        }
      }
    }
  }
  &.control_themes{
    text-align: center;
    button.main-btn{
      max-width: 400px ;
      margin: 0 auto;
    }
  }
}
</style>