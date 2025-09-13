<template>
  <div class="sign-page page">
    <div class="content">
      <div class="image">
        <img src="../../assets/images/logo.png" alt="logo image" loading="lazy">
      </div>
      <h1>كود التفعيل</h1>
      <p>أدخل الرمز المرسل الي جوالك</p>
      <form @submit.prevent="handleSubmit">
        <div class="inputs">
          <input type="number" v-model="codeInputs.digit1" @input="onInput($event, 1)" @focus="clearInput(1)" @keydown="handleKeydown($event, 1)" maxlength="1">
          <input type="number" v-model="codeInputs.digit2" @input="onInput($event, 2)" @focus="clearInput(2)" @keydown="handleKeydown($event, 2)" maxlength="1">
          <input type="number" v-model="codeInputs.digit3" @input="onInput($event, 3)" @focus="clearInput(3)" @keydown="handleKeydown($event, 3)" maxlength="1">
          <input type="number" v-model="codeInputs.digit4" @input="onInput($event, 4)" @focus="clearInput(4)" @keydown="handleKeydown($event, 4)" maxlength="1">
        </div>
        <button type="submit" class="main-btn">التأكيد</button>
        <h4>
          لم يصلك كود التفعيل؟ 
          <button type="button" @click="handleResendCode" :disabled="isResendDisabled">إعادة إرسال</button>
          <span v-if="countdown > 0">{{ countdown }} ثواني</span>
        </h4>
      </form>
    </div>
  </div>
  <Toast ref="toast" position="bottom-right" />
  <Loading v-if="loading === true"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import getDeviceInfo from '../../deviceInfo';
import Toast from 'primevue/toast';
import Loading from '../../components/Loading.vue';
import useApiMethods from '../../mixins/ApiMethods';

const deviceInfo = ref(null);

onMounted(async () => {
  deviceInfo.value = await getDeviceInfo();
});

const codeInputs = ref({
  digit1: '',
  digit2: '',
  digit3: '',
  digit4: '',
  country_code: '966',
  type: 'merchant',
});

const { postMethod, putMethod, loading, toast } = useApiMethods();

const countdown = ref(0);
const isResendDisabled = ref(false);

const handleSubmit = () => {
  const body = {
    country_code: codeInputs.value.country_code,
    phone: window.sessionStorage.getItem('customer_phone'),
    code: `${codeInputs.value.digit1}${codeInputs.value.digit2}${codeInputs.value.digit3}${codeInputs.value.digit4}`,
    device_id: deviceInfo.value.deviceId,
    device_type: 'web',
    lang: 'en',
  };

  putMethod('/api/merchant/verify', body, false, '', 'toast');
};

const handleResendCode = () => {
  if (countdown.value > 0) return; // Prevent sending if countdown is active

  const body = {
    country_code: codeInputs.value.country_code,
    phone: window.sessionStorage.getItem('customer_phone'),
    type: codeInputs.value.type,
  };

  postMethod('/api/merchant/resend-code', body, false, '', 'toast');

  // Start the countdown
  countdown.value = 60;
  isResendDisabled.value = true;

  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(interval);
      isResendDisabled.value = false;
    }
  }, 1000);
};

const onInput = (event, index) => {
  const value = event.target.value;

  // Allow only one digit to be entered
  if (value.length > 1) {
    event.target.value = value.charAt(0); // Keep only the first digit
  }

  codeInputs.value[`digit${index}`] = event.target.value; // Update model

  // Move to next input if a single digit is entered
  if (event.target.value.length === 1 && index < 4) {
    const nextInput = document.querySelector(`input:nth-of-type(${index + 1})`);
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const clearInput = (index) => {
  // Clear input when focused
  codeInputs.value[`digit${index}`] = ''; // Clear input
};

const handleKeydown = (event, index) => {
  if (event.key === 'Backspace') {
    // Move to previous input if the current input is empty
    if (codeInputs.value[`digit${index}`] === '') {
      const prevInput = document.querySelector(`input:nth-of-type(${index - 1})`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 6px !important;
}
p {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #979797;
}
.inputs {
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0;
  input {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    text-align: center;
    caret-color: #3368b1;
    color: #3368b1;
    &::-webkit-inner-spin-button {
      display: none !important;
    }
  }
}
.main-btn {
  margin-top: 20px;
}
</style>
