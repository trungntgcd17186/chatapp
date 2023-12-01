import { ref, watchEffect } from 'vue';

export default (maxWidth?: 767) => {
  const isMobile = ref(window.matchMedia(`(max-width: ${maxWidth}px)`).matches);
  watchEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
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
