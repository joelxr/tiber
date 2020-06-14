<template>
  <LeftSidePanel @close="$emit('close')">
    <template #header>
      <input
        type="text"
        class="block appearance-none leading-tight bg-gray-900 text-3xl font-semibold focus:outline-none w-full m-0 px-4 py-2"
        v-model="task.description"
      />
    </template>

    <template #content>
      <div class="ml-auto mr-4 mb-2">
        <DateInput :value="task.dueDate" @update="task.dueDate = $event" />
      </div>

      <div class="my-2 inline-flex flex-row">
        <button
          v-for="(tab, index) in state.tabs"
          :key="index"
          class="tab"
          :class="{ active: state.activeTab === tab }"
          @click="state.activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="h-full mx-2">
        <div v-if="state.activeTab === 'Etapas'">
          <div v-for="(item, index) in task.items" :key="index" class="flex">
            <TaskDetailItem :item="item" @remove="removeItem" />
          </div>

          <TaskDetailAddItemInput class="mt-1 ml-3" @new="newItem" />
        </div>

        <div
          class="flex flex-col h-full"
          v-else-if="state.activeTab === 'Anotações'"
        >
          <TaskNotes :task="task" />
        </div>
      </div>
    </template>
  </LeftSidePanel>
</template>

<script>
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import LeftSidePanel from './LeftSidePanel.vue'
import TaskDetailItem from './TaskDetailItem.vue'
import TaskDetailAddItemInput from './TaskDetailAddItemInput.vue'
import TaskNotes from './TaskNotes.vue'
import DateInput from './DateInput.vue'

export default {
  components: {
    DateInput,
    LeftSidePanel,
    TaskDetailItem,
    TaskDetailAddItemInput,
    TaskNotes,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props, context, a) {
    const state = reactive({
      activeTab: 'Etapas',
      tabs: ['Etapas', 'Anotações'],
    })

    function newItem(event) {
      props.task.items.push({ id: uuidv4(), description: event, isDone: false })
    }

    function removeItem(event) {
      context.emit('removeItem', { task: props.task, removedItem: event })
    }

    return {
      state,
      newItem,
      removeItem,
    }
  },
}
</script>

<style lang="scss" scoped>
.tab {
  @apply flex-auto px-4 py-2 text-gray-500 text-left text-base uppercase bg-gray-900 border-b border-gray-800;

  transition: border 0.2s ease-in;

  &.active,
  &:hover {
    @apply text-blue-500;
  }

  &:hover {
    @apply border-blue-500;
  }
}
</style>
