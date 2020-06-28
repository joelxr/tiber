<template>
  <LeftSidePanel @close="$emit('close')">
    <template #header>
      <input
        type="text"
        class="block appearance-none leading-tight bg-gray-900 text-3xl font-semibold focus:outline-none w-full m-0 px-4 py-2"
        :value="task.description"
        @input="update({ description: $event.target.value })"
      />
    </template>

    <template #content>
      <div class="flex justify-between mx-4 mb-2">
        <DateInput
          :value="task.dueDate"
          @update="update({ dueDate: $event })"
        />
        <button
          type="button"
          class="flex text-gray-500 hover:text-red-500 mr-2"
          @click="$emit('remove', task)"
        >
          <Icon name="trash" class="mr-2" /> EXCLUIR
        </button>
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
            <TaskDetailItem
              :item="item"
              @update="updateItem"
              @remove="removeItem"
            />
          </div>

          <AddItemInput
            class="mt-1 ml-3"
            @new="newItem"
            placeholder="Próxima etapa"
          />
        </div>

        <div
          class="flex flex-col h-full"
          v-else-if="state.activeTab === 'Anotações'"
        >
          <TaskNotes :task="task" @update="update" />
        </div>
      </div>
    </template>
  </LeftSidePanel>
</template>

<script>
import { reactive } from 'vue'
import * as taskItemService from '../service/idb/taskItem.service'
import LeftSidePanel from './LeftSidePanel'
import TaskDetailItem from './TaskDetailItem'
import AddItemInput from './AddItemInput'
import TaskNotes from './TaskNotes'
import DateInput from './DateInput'
import Icon from './Icon'

export default {
  components: {
    AddItemInput,
    DateInput,
    Icon,
    LeftSidePanel,
    TaskDetailItem,
    TaskNotes,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    console.log(props.task)

    const state = reactive({
      activeTab: 'Etapas',
      tabs: ['Etapas', 'Anotações'],
    })

    function update(task) {
      context.emit('update', { ...task })
    }

    function newItem(event) {
      const item = { description: event, isDone: false, taskId: props.task.id }

      return new Promise((resolve, reject) => {
        return taskItemService.put(item).then((id) => {
          item.id = id
          update({
            items: [...props.task.items, item],
          })

          resolve(id)
        })
      })
    }

    function updateItem(item) {
      return taskItemService.put(item).then((id) => {
        update({
          items: [...props.task.items],
        })
      })
    }

    function removeItem(event) {
      const index = props.task.items.findIndex((i) => event.id === i.id)

      if (~index) {
        taskItemService.remove(event.id).then(() => {
          update({
            items: [...props.task.items.filter((i) => event.id === i.id)],
          })
        })
      }
    }

    return {
      state,
      update,
      newItem,
      updateItem,
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
