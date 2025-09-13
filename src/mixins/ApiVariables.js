import { ref } from 'vue';

export default function useApiVariables() {
  const merchant_email = ref('');
  const base_url = ref('https://sellforyou.org');
  const local_url = ref('');
  const token = ref('');
  const merchant_token = ref('');
  const phone = ref('');
  const country_code = ref('');

  return {
    merchant_email,
    base_url,
    local_url,
    token,
    merchant_token,
    phone,
    country_code,
  };
};
