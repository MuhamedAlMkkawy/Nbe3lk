<template>
  <div class="page-content">
    <h4>إضافة منتج - متعدد السمات</h4>
    <form @submit.prevent="handleSubmit">
      <!-- to choose multi themes -->
      <MultiSelectThemes 
        @handleThemes="handleThemes" 
      />
      <!-- to choose multi options for each theme -->
      <div class="inputs" v-if="themes.length > 0">
        <div class="input-wrap" v-for="theme in themes" :key="theme.id">
          <label :for="theme.id">{{ theme.feature }}</label>
          <div class="input">
            <div class="multiselect-demo">
              <MultiSelect
                v-model="selectedOptions[theme.id]"
                :options="theme?.options"
                optionLabel="name"
              />
              <div class="selected-items" v-if="selectedOptions[theme.id] && selectedOptions[theme.id].length">
                <span
                  class="selected-valid"
                  v-for="valid in selectedOptions[theme.id]"
                  :key="valid.id"
                >
                  {{ valid.name }}
                  <i class="pi pi-times close-multiselect-icon" @click="deselectValid(theme.id, valid)"></i>
                </span>
              </div>
              <h6 class="placeholder-text" v-else>إختر {{ theme.feature }}</h6>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="page-content">
    <button class="main-btn" @click="handleSubmit">
      حفظ
    </button>
  </div>
  <!--------------------------------- Progress Popup ----------------------------------->
  <ProgressPopup 
    v-if="showProgressPopup" 
    :progressText="progressText" 
  />
  <!----------------------------------- handle Toast ----------------------------------->
  <Toast 
    ref="toast" 
    position="bottom-right" 
  />
  <!------------------------------------ Loading --------------------------------------->
  <Loading 
    v-if="loading" 
  />
</template>

<script setup>
  import { ref } from 'vue';
  import ProgressPopup from '../../../../components/Popups/ProgressPopup.vue';
  import useApiMethods from '../../../../mixins/ApiMethods';
  import MultiSelectThemes from '../../../../components/SelectInputs/MultiSelectThemes.vue';
  import Toast from 'primevue/toast';
  import Loading from '../../../../components/Loading.vue';
  import MultiSelect from 'primevue/multiselect';

  // API methods and state
  const { 
    postMethod, 
    loading, 
    toast, 
    progressText, 
    showProgressPopup 
  } = useApiMethods();

  // Themes and selected options
  const themes = ref([]);
  const selectedOptions = ref({});

  // Handle selected themes
  const handleThemes = (selectedThemes) => {
    themes.value = selectedThemes.value || [];
    selectedOptions.value = themes.value.reduce((acc, theme) => {
      acc[theme.id] = [];
      return acc;
    }, {});
  };

  // Deselect an option
  const deselectValid = (themeId, valid) => {
    selectedOptions.value[themeId] = selectedOptions.value[themeId].filter(
      (option) => option.id !== valid.id
    );
  };

  // to get the product_id 
  const productId = window.sessionStorage.getItem('product_id')

  // Handle submit
  const handleSubmit = () => {
    const features = themes.value.map((theme) => ({
      feature_id: theme.id,
      options: selectedOptions.value[theme.id].map((option) => option.id),
    }));

    const body = {
      features,
    };

    postMethod(`/api/merchant/products/${Number(productId)}/features`, body, true, '/home/select-product-variants/', 'progress');
  };
</script>

<style lang="scss" scoped>
.page-content {
  &:not(:first-of-type) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 20px;
  }
  form {
    max-width: unset;
    .inputs {
      flex-wrap: wrap;
      margin-block-start: 15px
    }
    .input-wrap {
      margin-block-end: 10px;
    }
    .input {
      i.pi{
        color: #fff !important;
      }
      textarea {
        min-height: 40px;
      }
      h5 {
        font-size: 14px;
        font-weight: 400;
      }
    }
    button.calender-btn i {
      color: #b26fac;
      font-size: 25px;
    }
  }
  button.main-btn {
    max-width: 420px;
    width: 100%;
  }
  &:first-of-type {
    margin-bottom: 20px;
  }
  &:nth-of-type(2) {
    text-align: center;
  }
}
</style>
