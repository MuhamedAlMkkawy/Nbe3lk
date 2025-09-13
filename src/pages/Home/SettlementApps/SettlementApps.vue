<template>
  <div class="page-content">
    <h4>طلبات التسويه</h4>
    <div class="filter-btns">
      <div class="buttons">
        <button @click="handleActiveTab('pending')" :class="['pending' , activeTab === 'pending' ? 'active' : '']">
          بإنتظار الموافقة
        </button>
        <button @click="handleActiveTab('finished')" :class="['finished' , activeTab === 'finished' ? 'active' : '']">
          تسوية منتهية
        </button>
      </div>
    </div>
    <WaitingSettlementsTable
        v-if="activeTab === 'pending'"
      />
    <FinishedSettlementsTable 
        v-else 
      />
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import WaitingSettlementsTable from '../../../components/Tables/WaitingSettlementsTable.vue'
  import FinishedSettlementsTable from '../../../components/Tables/FinishedSettlementsTable.vue'




  // to handle active Table based on active Tab as finished / pending
  const activeTab = ref('pending')
  const handleActiveTab = (targetTab) =>{
    activeTab.value = targetTab
    // getMethod(`/api/merchant/settlement-request?type=${targetTab}` , true)
  }

</script>

<style lang="scss" scoped>
  .page-content{
    .filter-btns{
      background: #FCF9F7;
      padding: 13px;
      margin-bottom: 16px;
      .buttons{
        display: flex;
        flex-direction: row;
        justify-content: center;
        button{
          padding: 15px clamp(15px , 4vw , 32px);
          font-size: clamp(14px , 4vw , 18px);
          font-weight: 400;
          color: #434343;
          border: 1px solid #B26FAC;
          background: #fff;
          &.active{
            background: #B26FAC;
            color: #fff;
          }
          &:first-of-type{
            border-radius: 0 3px 3px 0;
          }
          &:last-of-type{
            border-radius:  3px 0 0 3px;
          }
        }
      }
    }
  }
</style>