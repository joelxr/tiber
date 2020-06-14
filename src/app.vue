<template>
  <div class="w-screen h-full flex">
    <div class="flex flex-col h-full min-w-full">
      <ListSelector
        :lists="state.lists"
        :selected-list="state.selectedList"
        @select="state.selectedList = $event"
        @new="state.lists.push({ id: uuidv4(), name: $event, tasks: [] })"
        @remove="removeList"
      />
      <TaskList
        v-if="state.selectedList"
        :tasks="state.selectedList.tasks"
        @remove="removeTask"
        @done="doneTask"
        @edit="editTask"
      />
      <TaskForm @new="addTask" />
    </div>
    <TaskDetail
      v-if="state.selectedTask"
      :task="state.selectedTask"
      @close="state.selectedTask = null"
      @removeItem="removeTaskItem"
    />
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import ListSelector from './components/ListSelector.vue'
import TaskList from './views/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetail.vue'

export default {
  components: {
    ListSelector,
    TaskList,
    TaskDetail,
    TaskForm,
  },
  setup() {
    const state = reactive({
      lists: [
        {
          id: uuidv4(),
          name: 'Para hoje',
          tasks: [],
        },
      ],
      selectedTask: null,
      selectedList: { name: '' },
    })

    function addTask(task) {
      task.id = uuidv4()
      task.createdDate = new Date()
      task.doneDate = null
      task.isDone = false
      task.items = []
      task.note = ''
      state.selectedList.tasks.push({ ...task })
    }

    function removeTask(task) {
      const index = state.tasks.findIndex((t) => t.id === task.id)
      state.selectedList.tasks.splice(index, 1)
    }

    function editTask(task) {
      state.selectedTask = task
    }

    function doneTask(task) {
      task.isDone = !task.isDone
      task.doneDate = task.isDone ? new Date() : null
    }

    function removeTaskItem(event) {
      const index = event.task.items.findIndex(
        (i) => event.removedItem.id === i.id
      )
      event.task.items.splice(index, 1)
    }

    function removeList(event) {
      if (state.selectedList.id === event.id) return
      const index = state.lists.findIndex((i) => event.id === i.id)
      state.lists.splice(index, 1)
    }

    onMounted(() => {
      state.selectedList = state.lists[0]
    })

    return {
      state,
      addTask,
      removeTask,
      editTask,
      doneTask,
      removeTaskItem,
      removeList,
      uuidv4,
    }
  },
}
</script>
