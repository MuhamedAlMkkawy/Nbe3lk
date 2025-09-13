<template>
  <div class="popup">
    <div class="content">
      <button class="close-icon" @click="$emit('handleShowEditDeliveryPopup')">
        <i class="pi pi-times"></i>
      </button>
      <h1>تعديل قيمة توصيل</h1>
      <form action="">
        <label for="city">إسم المدينه</label>
        <div class="input">
          <select id="city">
            <option value="الرياض">الرياض</option>
            <option value="القاهره">القاهره</option>
          </select>
        </div>
        <label for="price">السعر</label>
        <div class="input">
          <input type="text" placeholder="أدخل السعر">
          <span>ر.س</span>
        </div>
        <button class="main-btn" @click="handleEditDeliveryValue">حفظ</button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditDeliveryPopup',
  emits: ['handleShowEditDeliveryPopup', 'handleProgressPopup'],
  setup(props, { emit }) {
    const handleEditDeliveryValue = (item) => {
      emit('handleShowEditDeliveryPopup')
      emit('handleProgressPopup');
    };

    return {
      handleEditDeliveryValue,
    };
  },
});
</script>


<style lang="scss" scoped>
.popup{
  .content{
    align-items: flex-start;
    h1{
      text-align: center;
      width: 100%;
    }
    label{
      font-size: 16px;
      font-weight: 400;
      color: #1F2327;
      margin-bottom: 10px;
      width: 100%;
      text-align: start;
    }
    button.main-btn{
      margin-bottom: 0;
    }
  }
}
</style>