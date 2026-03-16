import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useVisible(breakpoints = { mobile: 640, tablet: 900 }) {
  const visible = ref(3)

  function update() {
    if (window.innerWidth <= breakpoints.mobile) visible.value = 1
    else if (window.innerWidth <= breakpoints.tablet) visible.value = 2
    else visible.value = 3
  }

  onMounted(() => { update(); window.addEventListener('resize', update) })
  onBeforeUnmount(() => window.removeEventListener('resize', update))

  return visible
}
