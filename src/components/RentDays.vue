<template>
  <div class="popup">
    <div class="content">
      <h2>الأيام المتاحة للإيجار</h2>
      <button class="close-popup-icon" @click = "$emit('handleShowRentDays')">
        <i class="pi pi-times"></i>
      </button>
      <div class="card flex justify-content-center showRentDays">
        <Calendar v-model="dates" variant="filled" inline showWeek >
          <template #date="slotProps">
            <h3 v-if="slotProps.date.day > 10 && slotProps.date.day < 15" style="background: #B26FAC;color: #fff;">{{ slotProps.date.day }}</h3>
            <template v-else>{{ slotProps.date.day }}</template>
          </template>
        </Calendar>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref , defineEmits } from "vue";
import Calendar from 'primevue/calendar';

const emit = defineEmits(['handleShowRentDays'])

const dates = ref();
</script>

<style lang="scss" scoped>
.popup{
  overflow-y: scroll;
  .content{
    width: fit-content;
    max-width: unset;
    padding: 20px;
    h2{
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 30px;
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
    @media (max-width:700px){
      width: 100%;
      padding: 20px 8px;
      h2{
        margin-bottom: 0;
        padding: 60px 0 10px;
      }
    }
  }
  .close-popup-icon{
    position: absolute;
    left: 20px;
    top: 20px;
    background: #293E79;
    z-index: 9999;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 1s;
    cursor: pointer;
    i{
      font-size: 15px !important;
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
    @media (max-width:700px){
      top: 64px;
    }
  }
}
</style>