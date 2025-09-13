import { ref } from 'vue';

export default function useProgressPopup() {
  const showProgressPopup = ref(false);
  const progressText = ref(null);

  const handleProgressPopup = (progressTargetText) => {
    showProgressPopup.value = true;
    progressText.value = progressTargetText;
    setTimeout(() => {
      handlePopupTimer();
    }, 2000);
  };

  const handlePopupTimer = () => {
    showProgressPopup.value = false;
  };

  return {
    showProgressPopup,
    progressText,
    handleProgressPopup
  };
};
