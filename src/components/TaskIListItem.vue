<template>
  <div
    class="flex bg-gray-800 rounded shadow mx-4 my-2 p-2 border border-transparent hover:border-gray-700"
  >
    <input class="mx-2" type="checkbox" />
    <div class="mx-2 flex-grow">
      <p class="text-lg font-bold">{{ task.description }}</p>
      <div class="flex">
        <p class="px-1 text-sm text-blue-600">
          {{ state.remaining }}, {{ state.createdAt }}
        </p>
      </div>
    </div>
    <TaskListItemRemoveButton @click="$emit('remove')" />
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import {
  format,
  formatDistanceStrict,
  differenceInCalendarDays,
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import TaskListItemRemoveButton from './TaskListItemRemoveButton.vue'

export default {
  components: { TaskListItemRemoveButton },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      createdAt: computed(
        () =>
          `criado em ${format(props.task.createdDate, 'dd/MM', {
            locale: ptBR,
          })}`
      ),
      remaining: computed(() => {
        const diff = differenceInCalendarDays(props.task.dueDate, new Date())
        let remainigDays = ''

        if (diff === 0) remainigDays = 'hoje'
        else if (diff === 1) remainigDays = 'amanhã'
        else if (diff === -1) remainigDays = 'ontem'
        else
          remainigDays = formatDistanceStrict(props.task.dueDate, new Date(), {
            addSuffix: true,
            unit: 'day',
            roundingMethod: 'floor',
            locale: ptBR,
          })

        return `${diff < 0 ? 'expirou' : 'expira'} ${remainigDays}`
      }),
    })

    return {
      state,
    }
  },
}
</script>
