<template>
  <div class="relative">
    <div
      class="flex items-center h-full text-gray-500 hover:text-blue-500 m-auto cursor-pointer"
    >
      <div @click="toggleDropdown">
        {{ state.formatedValue }}
      </div>
      <button type="button" @click="toggleDropdown">
        <Icon name="calendar" />
      </button>
    </div>
    <div
      v-if="state.showDropdown"
      class="absolute bottom-0 right-0 mr-2 mb-16 py-2 w-48 bg-gray-800 shadow rounded"
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
            'border-red-700 placeholder-red-700': state.customDateHasError,
          }"
          v-model="state.customDate"
          @blur="updateValue"
          @keypress="maskDate"
          placeholder="DD/MM/AAAA"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { format, addDays, parse, isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Icon from './Icon.vue'

export default {
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
    const state = reactive({
      showDropdown: false,
      dropdownOption: 'today',
      customDate: '',
      customDateHasError: false,
      formatedValue: computed(() =>
        format(props.value, 'dd/MM/yyyy', { locale: ptBR })
      ),
    })

    function toggleDropdown() {
      state.showDropdown = !state.showDropdown
    }

    function maskDate(event) {
      const len = event.target.value.length

      if (len > 9 || !/\d/.test(event.key)) {
        return event.preventDefault()
      } else {
        if (len === 2 || len === 5) event.target.value += '/'
        if (len === 9) {
          const val = event.target.value + event.key

          const d = parse(val, 'dd/MM/yyyy', new Date(), {
            locale: ptBR,
          })

          if (isValid(d)) {
            state.customDateHasError = false
          } else {
            state.customDateHasError = true
            return event.preventDefault()
          }
        }
      }
    }

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
        if (!event.target.value || state.customDateHasError) return
        const d = parse(event.target.value, 'dd/MM/yyyy', new Date(), {
          locale: ptBR,
        })
        context.emit('update', d)
      }

      state.customDate = ''
      toggleDropdown()
    }

    return { state, toggleDropdown, updateValue, maskDate }
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
