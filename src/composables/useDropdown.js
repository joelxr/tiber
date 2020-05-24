import { computed, ref } from 'vue'

export default function useDropdown() {
  const visible = ref(false)

  return {
    isVisible: computed(() => visible.value),
    toggle: () => (visible.value = !visible.value),
  }
}
