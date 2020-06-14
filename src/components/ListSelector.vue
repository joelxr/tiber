<template>
  <div
    class="flex px-2 sm:mx-10 md:mx-12 lg:mx-16 xl:mx-32"
    @click="toggleDropdown"
  >
    <input
      ref="inputRef"
      class="bg-gray-900 text-gray-600 text-3xl font-black mx-4 py-2 hover:text-blue-600 cursor-pointer"
      :value="selectedList.name"
      @input="selectedList.name = $event.target.value"
      @click="isDropdownVisible = !isDropdownVisible"
    />
  </div>
  <div
    ref="dropdownRef"
    class="m-4 w-48 bg-gray-900 shadow-md rounded"
    v-show="isDropdownVisible"
  >
    <div
      v-for="(list, index) in lists"
      :key="index"
      class="flex justify-between p-2"
    >
      <div class="text-lg mx-2">
        <div
          class="cursor-pointer hover:text-blue-500"
          @click="selectList(list)"
        >
          {{ list.name }}
        </div>

        <div class="text-sm text-gray-600">
          {{
            `${list.tasks.filter((t) => t.isDone).length}/${list.tasks.length}`
          }}
        </div>
      </div>
      <button
        class="flex cursor-pointer hover:text-red-500"
        @click="$emit('remove', list)"
      >
        <Icon name="trash" size="sm"></Icon>
      </button>
    </div>
    <AddItemInput
      class="mt-2 p-2 border-t border-gray-800"
      @new="$emit('new', $event)"
      placeholder="Nova lista"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createPopper } from '@popperjs/core'
import useDropdown from '../composables/useDropdown'
import Icon from './Icon.vue'
import AddItemInput from './AddItemInput.vue'

export default {
  components: {
    AddItemInput,
    Icon,
  },
  props: {
    selectedList: {
      type: Object,
      default: () => ({
        name: '',
      }),
    },
    lists: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const dropdown = useDropdown()
    const inputRef = ref(null)
    const dropdownRef = ref(null)
    let popperInstance = null

    onMounted(() => {
      popperInstance = createPopper(inputRef.value, dropdownRef.value, {})
    })

    return {
      inputRef,
      dropdownRef,
      isDropdownVisible: dropdown.isVisible,
      toggleDropdown: () => {
        dropdown.toggle()
        popperInstance.update()
      },
      selectList: (list) => {
        context.emit('select', list)
        dropdown.toggle()
        popperInstance.update()
      },
    }
  },
}
</script>

<style></style>
