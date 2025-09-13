<template>
  <div>
    <DataTable :value="deliveryCost" tableStyle="width:100%;overflow-x:scroll;" class="table delivery-table">
      <Column field="city" header="المدينه" :style="{minWidth: '120px'}"></Column>
      <Column field="price" header="السعر" :style="{minWidth: '120px'}"></Column>
      <Column>
        <template #body="slotProps">
          <div class="buttons">
            <button @click="handleShowEditDeliveryPopup('Mkkawy')" class="edit">
              <i class="pi pi-pen-to-square"></i>
            </button>
            <button @click="handleshowDeleteDeliveryPopup" class="delete">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>


  <!-------------------------- edit Delivery Value Popup -------------------------------->
  <EditDeliveryPopup 
    v-if="showEditDeliveryPopup === true"
    @handleShowEditDeliveryPopup="handleShowEditDeliveryPopup"
    @handleProgressPopup="$emit('handleProgressPopup' , 'تم تعديل قيمه التوصيل بنجاح')"
  />


  <!-- -------------------Confirm Delete Delivery Popup ------------------------------- -->
  <DeleteDeliveryPopup 
    v-if="showDeleteDeliveryPopup === true"
    @handleshowDeleteDeliveryPopup = "handleshowDeleteDeliveryPopup"
    @handleDeleteDelivery = "handleDeleteDelivery"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import EditDeliveryPopup from './EditDeliveryPopup.vue'
import DeleteDeliveryPopup from './DeleteDeliveryPopup.vue'

export default defineComponent({
  name: 'DeliveryTable',
  components: {
    DataTable,
    Column,
    EditDeliveryPopup,
    DeleteDeliveryPopup,
  },
  emits:['handleProgressPopup'],
  setup(props , {emit}) {
    const deliveryCost = ref([
      { city: 'الرياض', price: '550 ر.س'},
      { city: 'شربين', price: '100 ر.س'},
    ]);


    // to handle edit popup----------------------------------------------
    const showEditDeliveryPopup = ref(false)
    const handleShowEditDeliveryPopup = ( ) =>{
      showEditDeliveryPopup.value = !showEditDeliveryPopup.value
    }


    // to handle delete delivery popup ------------------------------------
    const showDeleteDeliveryPopup = ref(false)
    const handleshowDeleteDeliveryPopup = () => {
      showDeleteDeliveryPopup.value = !showDeleteDeliveryPopup.value
    }
    const handleDeleteDelivery = () =>{
      handleshowDeleteDeliveryPopup()
      emit('handleProgressPopup' , 'تم حذف قيمة التوصيل بنجاح')
    }



    return {
      deliveryCost,
      showEditDeliveryPopup,
      handleShowEditDeliveryPopup,
      showDeleteDeliveryPopup ,
      handleshowDeleteDeliveryPopup,
      handleDeleteDelivery,
    };
  }
});
</script>

<style lang="scss" scoped>
  .buttons{
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-end;
    button{
      width: 35px;
      height: 35px;
      border-radius: 8px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.6s;
      &:first-of-type{
        background: #3368B1;
        &:hover{
          color: #3368B1;
          border: 1px solid #3368B1;
          background: #fff;
        }
      }
      &:last-of-type{
        background: #DB3740;
        &:hover{
          color: #DB3740;
          border: 1px solid #DB3740;
          background: #fff;
        }
      }
    }
  }
</style>