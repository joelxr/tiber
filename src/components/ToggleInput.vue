<template>
  <div class="mb-2">
    <div class="toggle inline-block align-middle">
      <input
        type="checkbox"
        name="1"
        id="1"
        class="toggle-checkbox"
        :checked="value"
        @input="$emit('update', $event)"
      />
      <label class="toggle-label" for="1"></label>
    </div>
    <label class="text-xs text-grey-dark" for="1">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle {
  @apply relative select-none w-12 mr-2 leading-normal;
}

.toggle-checkbox {
  @apply hidden;
}

.toggle-label {
  @apply block overflow-hidden cursor-pointer bg-gray-800 border border-gray-800 rounded-full h-6 shadow-inner;

  transition: background-color 0.2s ease-in;

  &:before {
    @apply absolute block bg-gray-900 inset-y-0 w-6 border border-gray-800 rounded-full -ml-1;

    right: 50%;
    content: '';
    transition: all 0.2s ease-in;
  }
}

.toggle-checkbox:checked + .toggle-label {
  @apply bg-green-600 shadow-none;
}

.toggle-checkbox:checked + .toggle-label:before {
  @apply right-0 bg-green-400;
}
</style>
