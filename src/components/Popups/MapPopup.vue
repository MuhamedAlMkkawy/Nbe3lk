<template>
  <div class="popup">
    <div class="content">
      <!-- Close Button -->
      <button class="close-popup" @click="$emit('handleShowMap')">
        <i class="pi pi-times"></i>
      </button>

      <!-- Location Button -->
      <button class="location-btn" @click="getCurrentLocation">
        <i class="pi pi-map-marker"></i>
      </button>

      <!-- Google Map -->
      <GMapMap
        ref="mapRef"
        :center="{ lat: parseFloat(props.lat || 24.68773), lng: parseFloat(props.lng || 46.72185) }"
        :zoom="10"
        style="width: 100%; height: 400px"
        @click="handleMapClick"
      >
        <GMapMarker
          v-if="selectedPosition"
          :position="selectedPosition"
        />
      </GMapMap>
      <div class="bottom-field">
        <div class="input" v-if="cityName !== ''">
          <i class="pi pi-map-marker"></i>
          <span>{{ cityName || selectedPosition?.map_desc }}</span>
        </div>        
        <!-- Save Button -->
        <button class="save-btn" @click="confirmLocation">
          حفظ
        </button>
      </div>
    </div>
  </div>
  {{ console.log(props?.selectedPosition) }}
</template>

<script setup>
  import { ref } from 'vue';

  const cityName = ref(''); 

  const props = defineProps({
    selectedPosition: {
      type: Object,
      default: null,
    },
    lat: {
      type: Number,
      default: null,
    },
    lng: {
      type: Number,
      default: null,
    },
  });

  const emit = defineEmits(['handleMapClick', 'handleShowMap']);
  const mapRef = ref(null);
  const selectedPosition = ref(null);

  async function handleMapClick(event) {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const city = await getCityName(clickedPosition.lat, clickedPosition.lng);
    const map = mapRef.value.$mapObject;
    const mapDesc = {
      city,
      zoom: map.getZoom(),
      center: map.getCenter().toJSON(),
    };

    selectedPosition.value = clickedPosition;
    cityName.value = city; // Update cityName with the fetched city
    emit('handleMapClick', clickedPosition, mapDesc);
    mapLocation.value = mapDesc.city;
  }
  
  const confirmLocation = () => {
    emit('handleShowMap');
  }

  // Function to get city name using reverse geocoding with language option
  async function getCityName(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng }, language: 'ar' }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;

          const cityComponent = addressComponents.find(component =>
            component.types.includes('locality') || component.types.includes('administrative_area_level_2')
          );

          resolve(cityComponent ? cityComponent.long_name : 'مدينة غير معروفة');
        } else {
          reject('فشل الحصول على الموقع بسبب: ' + status);
        }
      });
    });
  }

  // Function to get the user's current location
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const clickedPosition = { lat: latitude, lng: longitude };
        
        selectedPosition.value = clickedPosition;
        const city = await getCityName(latitude, longitude);
        cityName.value = city; // Update cityName with the fetched city
        const map = mapRef.value.$mapObject;
        const mapDesc = {
          city,
          zoom: map.getZoom(),
          center: map.getCenter().toJSON(),
        };

        emit('handleMapClick', clickedPosition, mapDesc);
        map.panTo(clickedPosition);
      });
    } else {
      alert('الموقع الجغرافي غير مدعوم بواسطة هذا المتصفح.');
    }
  }
</script>


<style lang="scss" scoped>
.popup {
  overflow: hidden;
  .close-popup {
    position: absolute;
    left: 10px;
    top: -65px;
    z-index: 9999;
    background: #fff;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: 1px solid #fff;
    transition: 0.3s;
    i {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 0;
    }
    &:hover {
      background: transparent;
    }
  }

  .location-btn {
    margin: 10px 0;
    z-index: 999;
    position: absolute;
    inset-inline-start: 10px;
    top: 45%;
    transform: translateY(-50%);
    padding: 9px 10px 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    border: 1px solid transparent;
    cursor: pointer;
    .pi {
      font-size: 20px;
      margin: 0;
      color: #fff;
    }
    &:hover {
      border: 1px solid red;
      background: #fff;
      .pi {
        color: red;
      }
    }
  }
  .bottom-field{
    position: absolute;
    bottom: -100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .input{
      height: 40px;
      background: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-inline-start: 10px;
      .pi{
        margin-bottom: 0;
        font-size: 18px;
        font-weight: 800;
        color: #293E79;
        animation-name: unset;
      }
      span{
        color: #000;
      }
    }
    .save-btn {
      z-index: 999;
      padding: 10px 20px;
      background-color: #293E79;
      color: white;
      border-radius: 5px;
      border: 1px solid transparent;
      cursor: pointer;
      width: 100%;
      &:hover {
        background-color: #fff;
        color: #293E79;
        border: 1px solid #293E79;
      }
    }
  }
}
</style>
