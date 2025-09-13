import { ref } from "vue";

export default function useFawmiMap(){
  // to handle Show of fawmi map
  const showMap = ref(false)
  const handleShowMap = () =>{
    showMap.value = !showMap.value
  }


  // to handle select location on map
  const selectedPosition = ref(null);
  function handleMapClick(event, map_desc) {
    // Validate that event.lat and event.lng are numbers
    if (typeof event.lat === 'number' && typeof event.lng === 'number') {
      // Update selectedPosition and body with validated coordinates
      selectedPosition.value = {
        lat: event.lat,
        lng: event.lng,
        map_desc : map_desc
      };

      // body.value.lat = event.lat;
      // body.value.lng = event.lng;
      // body.value.map_desc = map_desc.city;
    } else {
      console.error('Invalid coordinates: lat or lng is not a number');
    }
  }


  return{
    showMap,
    handleShowMap,
    selectedPosition,
    handleMapClick
  }
}