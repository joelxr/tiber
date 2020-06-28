<template>
  <div
    class="flex flex-col flex-auto shadow-xl bg-gray-900 fixed top-0 right-0 h-full px-2"
  >
    <div class="flex items-center mb-4 border-b border-gray-800">
      <div class="flex-auto">
        <slot name="header" />
      </div>

      <slot name="actions" />

      <button
        type="button"
        class="text-gray-500 hover:text-red-500"
        @click="$emit('close')"
      >
        <Icon size="sm" name="times" />
      </button>
    </div>
    <slot name="content" />
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  components: { Icon },
}
</script>
