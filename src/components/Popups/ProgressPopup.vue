<template>
  <div class="popup">
    <div class="content">
      <i class="pi pi-check"></i>
      <h1>{{ progressText }}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'ProgressPopup',
    props:['progressText']
  }
</script>

<style lang="scss" scoped>
.popup{
  .content {
    i{
      color: #293E79;
      width: 150px;
      height: 150px;
      border: 10px solid #B26FAC;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 80px;
      font-weight: 900;
      margin: 0 auto 20px;
    }
  }
}
</style>