<template>
  <div
    ref="inputRef"
    class="flex px-2 sm:mx-10 md:mx-12 lg:mx-16 xl:mx-32 text-gray-600 hover:text-blue-600 cursor-pointer"
    @click="toggleDropdown"
  >
    <Icon name="notes" />
    <input
      class="flex-grow-1 bg-gray-900 text-gray-600 hover:text-blue-600 text-3xl font-black mx-4 py-2 outline-none"
      :value="selectedList.name"
      @input="updateList"
      @click="isDropdownVisible = !isDropdownVisible"
    />
  </div>
  <div
    ref="dropdownRef"
    class="m-4 bg-gray-800 shadow-md rounded"
    style="max-width: 36rem;"
    v-show="isDropdownVisible"
  >
    <div style="max-height: 400px; overflow: auto;">
      <div
        v-for="(list, index) in lists"
        :key="index"
        class="flex justify-between px-4 py-2 border-b border-gray-700"
      >
        <div class="text-lg mx-2">
          <div
            class="cursor-pointer hover:text-blue-500"
            :class="{ 'text-green-500': selectedList.id === list.id }"
            @click="selectList(list)"
          >
            {{ list.name }}
          </div>

          <div v-if="list.tasks" class="text-sm text-gray-600">
            {{
              `${list.tasks.filter((t) => t.isDone).length}/${
                list.tasks.length
              }`
            }}
          </div>
        </div>
        <button
          class="flex cursor-pointer hover:text-red-500 outline-none"
          @click="$emit('remove', list)"
        >
          <Icon name="trash" size="sm"></Icon>
        </button>
      </div>
    </div>
    <AddItemInput
      class="px-4 py-2"
      @new="$emit('new', $event)"
      placeholder="Nova lista"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createPopper } from '@popperjs/core'
import useDropdown from '../composables/useDropdown'
import Icon from './Icon'
import AddItemInput from './AddItemInput'

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
      popperInstance = createPopper(inputRef.value, dropdownRef.value, {
        placement: 'auto-start',
      })
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
      updateList: (event) => {
        context.emit('update', {
          ...props.selectedList,
          name: event.target.value,
        })
      },
    }
  },
}
</script>
