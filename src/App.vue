<template>
  <div class="w-full bg-main-color overflow-hidden">
    <header class="bg-header-color flex flex-col items-center justify-center pt-8 p-14 text-white">
      <img src="@/assets/logo.svg" width="126px" height="48px" class="pb-2" alt="logo" />
    </header>
    <main class="relative -top-11 flex flex-col justify-center px-4">
      <task-form @save="saveTask" />
      <task-list
        :tasks="tasks"
        :countCompleted="countCompleted"
        @remove="removeTask"
        @checked="checkedTask"
        @sort="sortTask"
        @edit="edit"
      />
    </main>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

export default {
  components: {
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          content: 'hey its first our tasks about vue! lets learn this lorem ispum',
          completed: false,
          isEdited: false
        },
        {
          id: 2,
          content: 'hey its second our tasks about tailwind! lets learn this',
          completed: false,
          isEdited: false
        },
        {
          id: 3,
          content: 'hey its third our tasks about vite! lets learn this',
          completed: false,
          isEdited: false
        },
        {
          id: 4,
          content: 'hey its third our tasks about vite! lets learn this',
          completed: false,
          isEdited: false
        }
      ],
      countCompleted: 0,
      valueSelected: ''
    }
  },
  methods: {
    saveTask(task) {
      this.valueSelected === 'date' ? this.tasks.unshift(task) : this.tasks.push(task)
    },
    removeTask(task) {
      return (this.tasks = this.tasks.filter((o) => o.id !== task.id))
    },
    checkedTask(task) {
      this.tasks = this.tasks.map((o) => {
        if (o.id !== task.id) return o

        const complet = !o.completed
        let completed = complet ? complet : complet
        return { ...o, completed }
      })
      return (this.countCompleted = this.tasks.filter((o) => o.completed === true).length)
    },
    sortTask(value) {
      this.valueSelected = value
      if (value === 'date') {
        this.tasks = this.tasks.sort((a, b) => b.id - a.id)
        return
      }
      return (this.tasks = this.tasks.sort((a, b) => a.id - b.id)) // так как у меня id это дата их создание то сортировка c none будет сортировкой по id
    },
    edit(task) {
      this.tasks = this.tasks.map((o) => {
        if (o.id !== task.id) return o
        const edited = !o.isEdited
        let isEdited = edited ? edited : edited
        return { ...o, isEdited }
      })
    }
  }
}
</script>
