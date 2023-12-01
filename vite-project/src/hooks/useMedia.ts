import { ref, watchEffect } from 'vue';

export default () => {
  const isMobile = ref(window.matchMedia('(max-width: 767px)').matches);
  watchEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    isMobile.value = mediaQuery.matches;

    const updateScreenSize = () => {
      isMobile.value = mediaQuery.matches;
    };

    mediaQuery.addEventListener('change', updateScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', updateScreenSize);
    };
  });

  return isMobile
};
