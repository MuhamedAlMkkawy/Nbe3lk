<template>
  <div class="page-content">
    <h4>عرض السمات</h4>
    <div class="content">
      <div class="theme_item" v-for="theme in resultGet?.data">
        <button class="main-btn addOption" @click="handleAddPopup(theme.id)">
          <i class="pi pi-plus-circle"></i>
        </button>
        <h3>{{ theme.feature }}</h3>
        <p>وحدة القياس : {{ theme.measure_unit }}</p>
        <h5>الخيارات المتاحة</h5>
        <ul>
          <li v-for="option in theme.options" :key="option.id">
            <button class="delete_option" @click="handleDeleteoption(option.id)">
              <i class="pi pi-trash"></i>
            </button>
            {{ option.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- to handle popup for add option -->
  <AddOptionPopup 
    :themeId="themeId"
    @handleShowAddOptionPopup="handleShowAddOptionPopup"
    v-if="showAddOptionPopup"
  />
  <!-- to handle Toast Msg -->
  <Toast
    ref="toast"
    position="bottom-right"
  />
</template>

<script setup>
  import { ref , onMounted } from 'vue';
  import useApiMethods from '../../../../mixins/ApiMethods';
  import { useRoute } from 'vue-router';
  import AddOptionPopup from '../../../../components/Popups/AddOptionPopup.vue';
  import Toast from 'primevue/toast';



  const route = useRoute()
  
  const {
    getMethod,
    deleteMethod,
    resultGet,
    toast
  } = useApiMethods()

  // to handle showAddOptionPopup
  const showAddOptionPopup = ref(false)
  const themeId = ref('')

  const handleShowAddOptionPopup = () =>{
    showAddOptionPopup.value = !showAddOptionPopup.value
  }

  const handleAddPopup = (targetTheme) =>{
    handleShowAddOptionPopup()
    themeId.value = targetTheme
  }


  // to handle delete option
  const handleDeleteoption = (optionId) => {
    deleteMethod(`/api/merchant/products/${route.params.id}/options/${optionId}` , true , 'toast' , `/api/merchant/products/${route.params.id}/features` , '')
  }

  onMounted(()=>{
    getMethod(`/api/merchant/products/${route.params.id}/features` , true )
  })

</script>

<style lang="scss" scoped>
.page-content{
  .content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    align-items: stretch;
    justify-content: center;
    .theme_item{
      flex-grow: 1;
      width: 48%;
      background: #f8f8ff;
      padding: 10px 8px;
      position: relative;
      h3{
        font-size: clamp(14px , 2.5vw , 20px);
        text-align: center;
        margin: 10px 0 20px;
      }
      h5{
        font-size: clamp(14px , 2.5vw , 16px);
        text-align: center;
        margin-block: 15px 8px;
      }
      ul{
        padding-inline: 23px 0;
        list-style-type: disclosure-closed;
        display: flex;
        flex-direction: column;
        gap: 10px;
        li{
          position: relative;
          padding-block: 5px;
          .delete_option{
            position: absolute;
            inset-inline-end: 10px;
            color: #e40d0d;
            cursor: pointer;
            &:hover{
              border-color: #e40d0d !important;
              color: #e40d0d;
            }
          }
        }
      }
      .addOption{
        position: absolute;
        inset-inline-end: -5px;
        top: -5px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation-name: alertBtn;
        animation-iteration-count: infinite;
        animation-duration: 1s;
        animation-direction: alternate-reverse;
        i.pi{
          font-size: 20px;
        }
      }
    }
  }
}

@keyframes alertBtn{
  0%{
    transform: scale(0.9);
  }
  100%{
    transform:scale(1);
  }
}
</style>