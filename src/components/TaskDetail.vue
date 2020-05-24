<template>
  <LeftSidePanel>
    <template #header>
      <input
        type="text"
        class="block appearance-none leading-tight bg-gray-900 text-3xl font-semibold focus:outline-none w-full m-0 px-4 py-2"
        v-model="task.description"
      />
    </template>

    <template #content>
      <div class="my-2">
        <DateInput :value="task.dueDate" @update="task.dueDate = $event" />
      </div>

      <div class="my-2 mx-2">
        <p class="text-xl">Etapas</p>
        <div v-for="(item, index) in task.items" :key="index" class="flex">
          <TaskDetailItem :item="item" @remove="removeItem" />
        </div>

        <TaskDetailAddItemInput class="mt-1 ml-3" @new="newItem" />
      </div>
    </template>
  </LeftSidePanel>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import LeftSidePanel from './LeftSidePanel.vue'
import TaskDetailItem from './TaskDetailItem.vue'
import TaskDetailAddItemInput from './TaskDetailAddItemInput.vue'
import DateInput from './DateInput.vue'

export default {
  components: {
    DateInput,
    LeftSidePanel,
    TaskDetailItem,
    TaskDetailAddItemInput,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props, context, a) {
    function newItem(event) {
      props.task.items.push({ id: uuidv4(), description: event, isDone: false })
    }

    function removeItem(event) {
      context.emit('removeItem', { task: props.task, removedItem: event })
    }

    return {
      newItem,
      removeItem,
    }
  },
}
</script>

<style></style>
