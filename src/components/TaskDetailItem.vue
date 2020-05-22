<template>
  <div class="flex items-center w-full px-4 py-2 my-1">
    <input type="checkbox" class="mr-4" v-model="item.isDone" />
    <input
      type="text"
      class="block appearance-none leading-tight bg-gray-800 focus:outline-none w-full"
      v-model="item.description"
    />
    <button
      type="button"
      class="text-gray-500 hover:text-red-500"
      @click="$emit('remove', item)"
    >
      <Icon name="trash" size="sm" />
    </button>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  components: { Icon },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
