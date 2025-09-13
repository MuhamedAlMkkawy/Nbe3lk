<template>
  <div class="not-found">
    <div class="image">
      <img src="../../assets/images/not-found.png" alt="img" loading="lazy">
    </div>
    <p>عذرًا هذه الصفحة غير موجودة برجاء مراجعة رابط الصفحة والمحاولة مرة أخرى ..</p>
    <RouterLink to="/home/last-orders">
      <button class="main-btn">
        الرئيسية
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';


</script>

<style lang="scss" scoped>
.not-found{
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .image{
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    height: 350px;
  }
  p{
    text-align: center;
    font-size: clamp(18px , 4vw , 24px);
    font-weight: 500;
    color: #293E79;
    margin: 20px 0;
  }
  a{
    display: block;
    width: 100%;

  }
}
</style>