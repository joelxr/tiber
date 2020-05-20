<template>
  <div class="flex w-full hover:bg-gray-900 px-4 py-2">
    <input type="checkbox" class="mr-2" v-model="item.isDone" />
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
