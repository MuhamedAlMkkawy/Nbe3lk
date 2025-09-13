<template>
  <div class="page-content">
    <div class="upper-bar">
      <h4>قيمه التوصيل</h4>
      <div class="bar">
        <button @click="handleShowAddDeliveryPopup">
          <i class="pi pi-plus"></i>
          <span>إضافه مدينة</span>
        </button>
        <div class="input">
          <input type="text" placeholder="إبحث عن مدينة معين">
          <i class="pi pi-search"></i>
        </div>
      </div>
    </div>
    <DeliveryTable @handleProgressPopup = "handleProgressPopup" />
  </div>


  <!-------------------------- Add Delivery Value Popup -------------------------------->
  <AddDeliveryPopup 
    v-if="showAddDeliveryPopup === true"
    @handleProgressPopup = "handleProgressPopup"
    @handleShowAddDeliveryPopup="handleShowAddDeliveryPopup"
  />


  <!--------------------------------- Progress Popup ----------------------------------->
  <ProgressPopup
    v-if="showProgressPopup === true"
    :progressText="progressText"
  />

</template>

<script>
  import { ref } from 'vue';
  import AddDeliveryPopup from '../../../components/AddDeliveryPopup.vue'
  import ProgressPopup from '../../../components/ProgressPopup.vue'
  import DeliveryTable from '../../../components/DeliveryTable.vue'
  import useProgressPopup from '../../../mixins/ProgressPopupMixin';

  export default {
    name:'Delivery',
    components:{
      AddDeliveryPopup,
      ProgressPopup,
      DeliveryTable,
    },
    setup(){
      // to handle manage delivery value popup -------------------------
      const showAddDeliveryPopup = ref(false)
      const handleShowAddDeliveryPopup = () =>{
        showAddDeliveryPopup.value = !showAddDeliveryPopup.value
      }

      // to handle progress popup ---------------------------------------
      const { showProgressPopup, progressText, handleProgressPopup } = useProgressPopup();


      return{
        showAddDeliveryPopup,
        handleShowAddDeliveryPopup,
        showProgressPopup,
        progressText,
        handleProgressPopup,
      }
    },

  }
</script>

<style lang="scss" scoped>
.page-content{
  min-height: 80vh;
}
</style>