<template>
  <div class="flex">
    <button type="button" class="text-green-500">
      <Icon name="plus-circle"></Icon>
    </button>
    <input
      type="text"
      class="block appearance-none leading-tight p-2 bg-transparent text-green-500 placeholder-green-500 focus:outline-none"
      :placeholder="placeholder"
      @keypress.enter="newItem"
    />
  </div>
</template>

<script lang="ts">
import Icon from './Icon.vue'

export default {
  components: { Icon },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    return {
      newItem: (event) => {
        emit('new', event.target.value)
        event.target.value = ''
      },
    }
  },
}
</script>
