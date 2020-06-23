<template>
  <div>
    <div
      class="flex items-center h-full cursor-pointer"
      @click="toggleDropdown"
    >
      <div
        ref="inputRef"
        class="flex text-gray-500 hover:text-blue-500 select-none"
      >
        <Icon name="calendar" class="mr-2" />
        {{ state.formatedValue }}
      </div>
    </div>

    <div
      ref="dropdownRef"
      v-show="isDropdownVisible"
      class="py-2 w-48 bg-gray-800 shadow rounded"
      style="z-index: 1000;"
    >
      <div
        class="dropDownItem"
        :class="{ selected: state.dropdownOption === 'today' }"
        @click="updateValue('today')"
      >
        Hoje
      </div>
      <div
        class="dropDownItem"
        :class="{ selected: state.dropdownOption === 'tomorrow' }"
        @click="updateValue('tomorrow')"
      >
        Amanhã
      </div>
      <div
        class="dropDownItem"
        :class="{ selected: state.dropdownOption === 'nextWeek' }"
        @click="updateValue('nextWeek')"
      >
        Próxima semana
      </div>
      <div
        class="dropDownItem"
        :class="{
          selected: state.dropdownOption === 'custom',
        }"
        @click="state.dropdownOption = 'custom'"
      >
        Especificar
        <input
          v-if="state.dropdownOption === 'custom'"
          type="text"
          class="appearance-none block w-full bg-gray-800 text-gray-500 rounded border border-gray-700 py-2 px-4 mt-2 leading-tight focus:outline-none focus:bg-gray-900"
          :class="{
            'border-red-700 placeholder-red-700': hasError,
          }"
          :value="customDate"
          @blur="updateValue"
          @keypress="maskDate"
          placeholder="DD/MM/AAAA"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, ref } from 'vue'
import { format, addDays, parse, differenceInCalendarDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { createPopper } from '@popperjs/core'

import Icon from './Icon.vue'
import useDropdown from '../composables/useDropdown'
import useDateInput from '../composables/useDateInput'

export default {
  model: {
    prop: 'value',
    event: 'update',
  },
  components: {
    Icon,
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  setup(props, context) {
    const dropdown = useDropdown()
    const dateInput = useDateInput()
    const inputRef = ref(null)
    const dropdownRef = ref(null)
    const state = reactive({
      dropdownOption: 'today',
      formatedValue: computed(() =>
        format(props.value, 'dd/MM/yyyy', { locale: ptBR })
      ),
    })

    let popperInstance = null

    function updateValue(event) {
      if (event === 'today') {
        state.dropdownOption = event
        context.emit('update', new Date())
      } else if (event === 'tomorrow') {
        state.dropdownOption = event
        context.emit('update', addDays(new Date(), 1))
      } else if (event === 'nextWeek') {
        state.dropdownOption = event
        context.emit('update', addDays(new Date(), 7))
      } else {
        if (!event.target.value || dateInput.hasError.value) return
        const d = parse(event.target.value, 'dd/MM/yyyy', new Date(), {
          locale: ptBR,
        })
        context.emit('update', d)
      }

      dateInput.set('')
      dropdown.toggle()
    }

    onMounted(() => {
      popperInstance = createPopper(inputRef.value, dropdownRef.value, {})

      if (props.value.getDate()) {
        const diffInDays = differenceInCalendarDays(props.value, new Date())

        if (diffInDays === 0) {
          state.dropdownOption = 'today'
        } else if (diffInDays === 1) {
          state.dropdownOption = 'tomorrow'
        } else if (diffInDays === 7) {
          state.dropdownOption = 'nextWeek'
        } else if (diffInDays > 7 || diffInDays < 0) {
          state.dropdownOption = 'custom'
          dateInput.set(state.formatedValue)
        }
      }
    })

    return {
      state,
      updateValue,
      toggleDropdown: () => {
        dropdown.toggle()
        popperInstance.update()
      },
      isDropdownVisible: dropdown.isVisible,
      customDate: dateInput.value,
      maskDate: dateInput.maskDate,
      hasError: dateInput.hasError,
      inputRef,
      dropdownRef,
      popperInstance,
    }
  },
}
</script>

<style lang="scss" scoped>
.dropDownItem {
  @apply block px-4 py-2 text-gray-500 cursor-pointer;

  &:hover {
    @apply text-blue-500;
  }

  &.selected {
    @apply text-green-500;
  }
}
</style>
