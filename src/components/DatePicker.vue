<template>
  <div class="popup">
    <div class="content">
      <h2>الأيام المتاحة للإيجار</h2>
      <button class="close-icon" @click = "$emit('handleShowDatePicker')">
        <i class="pi pi-times"></i>
      </button>
      <div class="card flex justify-content-center bookRentDays p-datepicker-group-container">
        <Calendar 
          inline 
          showWeek 
          inputId="birth_date"
          v-model="dates" 
          selectionMode="multiple" 
          :manualInput="false" 
          :showIcon="true" 
          @update:model-value="emitDateChange" 
        />
        <button class="main-btn" @click="handleSaveDates">
          حفظ الأيام
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineEmits } from 'vue';
import Calendar from 'primevue/calendar';

const dates = ref([]);
const calendarVisible = ref(false);
const emit = defineEmits(['handleDatePicker' , 'handleShowDatePicker']);

const emitDateChange = (value) => {
  dates.value = value
};

const handleSaveDates = () =>{
  emit('handleShowDatePicker')
  emit('handleDatePicker', dates.value);
}

</script>

<style lang="scss" scoped>
.popup{
  overflow-y: scroll;
  .content{
    width: fit-content;
    max-width: unset;
    padding: 20px;
    @media (max-width:560px){
      width: 100%;
      padding: 20px 8px;
    }
    h2{
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    
    h3{
      background: rgb(178, 111, 172);
      color: rgb(255, 255, 255);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px !important;
    }
  }
  .close-popup-icon{
    position: absolute;
    left: 20px;
    top: 20px;
    background: #293E79;
    z-index: 9999;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 1s;
    cursor: pointer;
    i{
      font-size: 12px !important;
      font-weight: 500;
      color: #fff !important;
      margin-bottom: 0;
    }
    &:hover{
      background: #fff;
      i{
        color: #293E79 !important;
      }
    }
  }
}
</style>