import { ref, computed } from 'vue'
import { parse, isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function useDateInput() {
  const _value = ref('')
  const _hasError = ref(false)

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
          _hasError.value = false
        } else {
          _hasError.value = true
          return event.preventDefault()
        }
      }
    }
  }

  return {
    maskDate,
    hasError: computed(() => _hasError.value),
    value: computed(() => _value.value),
    set: (val) => (_value.value = val),
  }
}
