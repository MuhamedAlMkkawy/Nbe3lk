import axios from 'axios';
import useApiVariables from './ApiVariables';
import { ref } from 'vue';
import { deleteCookie, getCookie , setCookie } from './Cookies';
import { useRouter } from 'vue-router';
import useProgressPopup from './ProgressPopupMixin';

import {isProfileCompleted } from '../auth';


export default function useApiMethods() {

  // to handle get base url for server
  const { base_url } = useApiVariables();

  // to handle get token from cookie
  const  token  = getCookie('token')

  // to use Prime Vue Toast
  const toast = ref(null);

  // to handle get data from endpoint
  const resultGet = ref(null)
  
  // to handle result after post to db
  const resultPost = ref(null)

  // to handle result after put to db
  const resultPut = ref(null) 

  // to handle result after patch to db
  const resultPatch = ref(null) 

  // to handle the progress popup
  const { 
    showProgressPopup, 
    progressText, 
    handleProgressPopup 
  } = useProgressPopup();

  // to handle loading variable 
  const loading = ref(false)

  // to handle token config for post method
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // to handle route after successed post method
  const router = useRouter()

  // to handle toast notification 
  const handleToast = (toastStatus ,toastMsg) => {
    toast.value.add({
      severity: toastStatus === 'success' ? 'success' : 'error',
      summary: toastStatus === 'success' ? 'تم بنجاح' : 'خطأ',
      detail: toastMsg === 'Network Error' ? 'يرجي التأكد من اتصالك بالانترنت  وإعادة المحاولة' : toastMsg,
      life: 1500
    });
  };

  // to handle next route after successed function
  const handleNextRoute = (nextRoute) =>{
    setTimeout(()=>{
      router.push(nextRoute)
    } , 800)
  }

  // to handle catch error 
  const handleCatchError = (error) =>{
    loading.value=false;
    if(error.message === 'Request failed with status code 403'){
      if(error.response.data.message === 'Your account is not accepted yet'){
        router.push('/store-details')
      }else{
        handleToast('error' ,error?.response?.data?.message)
        setTimeout(()=>{
          router.push('/home/last-orders')
        }, 500)
      }
    }else if(error.response.status === 401){
      deleteCookie('token')
      location.reload()
    }else{
      handleToast('error' ,error.message)
    }
  }

  // to handle popUp Type as Toast / ProgressPopup
  const handlePopupType = (type , response) =>{
    if(type === 'toast'){
      handleToast('success' ,response.data.msg)
    }else{
      handleProgressPopup(response.data.msg)
    }
  }

  // to handle get method
  const getMethod = (targetApi , requireConfig) => {
    axios.get(base_url.value + targetApi , requireConfig === true && config)
    .then((response)=>{
      loading.value = false;         
      if(response.data.key === 'success'){
        resultGet.value = response.data
      }else{
        handleToast('error' ,response.data.msg)
      }
    })
    .catch((error)=>{
      handleCatchError(error)
    })
  };

  // to handle post method
  const postMethod = (targetApi , body , requireConfig , nextRoute , popupType) => {
    loading.value= true
    axios.post(base_url.value + targetApi , body , requireConfig === true && config)
    .then((response)=>{
      loading.value=false;  
      if(response.data.key === 'success'){
        resultPost.value = response    

        // store token if the user logged in / just registered
        if(targetApi === '/api/merchant/register' || targetApi === '/api/merchant/login'){
          setCookie(response.data.data.token)
          window.sessionStorage.setItem('activeTab' , 'last-orders')
          window.sessionStorage.setItem('activeSecTab' , 'all-orders')
        }
        
        // store product id as  we needs it in the whole process
        if (nextRoute === '/home/select-product-themes/'){
          window.sessionStorage.setItem('product_id' , response?.data?.data?.id)
        }else if (nextRoute === 'reload_page'){
          location.reload()
        }
        handlePopupType(popupType , response)
        handleNextRoute(nextRoute)
      }else if(response.data.key === 'needActive'){
        router.push('/activation-code')
      }else{
        handleToast('error' , response.data.msg)
      }
    })
    .catch((error)=>{
      handleCatchError(error)
    })
  };

  // to handle put  method 
  const putMethod = (targetApi , body , requireConfig ,nextRoute) => {
    loading.value= true
    axios.put(base_url.value + targetApi , body , requireConfig === true && config)
    .then((response)=>{
      loading.value=false;      
      if(response.data.key === 'success'){
        handleToast('success' ,response.data.msg)
        handleNextRoute(nextRoute)
        if(targetApi === '/api/merchant/update-password'){
          deleteCookie('token')
          // location.reload()
        }else if(targetApi === '/api/merchant/verify' && isProfileCompleted()){
          deleteCookie('token')
          router.push('/login')
        }else if(targetApi === '/api/merchant/verify' && !isProfileCompleted()){
          router.push('/store-details')
        }
      }else{
        handleToast('error' ,response.data.msg)
      }
    })
    .catch((error)=>{
      handleCatchError(error)
    })
  };

  // to handle patch method
  const patchMethod = (targetApi , requireConfig) =>{
    loading.value= true
    axios.patch(base_url.value + targetApi , '' ,requireConfig === true && config)
    .then((response)=>{
      loading.value=false;  
      if(response.data.key === 'success'){
        resultPatch.value = response    
      }else{
        handleToast('error' , response.data.msg)
      }
    })
    .catch((error)=>{
      handleCatchError(error)
    })
  }

  // to handle delete method
  const deleteMethod = (targetApi , requireConfig , popupType , reFetchApi , nextRoute) =>{
    loading.value= true
    axios.delete(base_url.value + targetApi , requireConfig === true && config)
    .then((response)=>{
      loading.value=false;      
      if(response.data.key === 'success'){
        handlePopupType(popupType , response)
        getMethod(reFetchApi , true)
        router.push(nextRoute || '')
      }else{
        handleToast('error' ,response.data.msg)
      }
    })
    .catch((error)=>{
      handleCatchError(error)
    })
  }

  return {
    getMethod,
    postMethod,
    putMethod,
    patchMethod,
    deleteMethod,
    resultGet,
    resultPost,
    resultPut,
    resultPatch,
    toast,
    handleToast,
    loading,
    progressText,
    showProgressPopup
  };
}
