<template>
  <div class="w-full bg-main-color overflow-hidden">
    <header class="bg-header-color flex justify-center p-14">
      <img src="@/assets/logo.svg" class="mb-4" width="126px" height="48px" alt="logo" />
    </header>
    <main class="relative -top-11 flex flex-col justify-center px-4">
      <task-form @creat="creatTask" />
      <task-list
        :tasks="tasks"
        :countCompleted="countCompleted"
        @remove="removeTask"
        @checked="checkedTask"
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
          completed: false
        },
        {
          id: 2,
          content: 'hey its second our tasks about tailwind! lets learn this',
          completed: false
        },
        {
          id: 3,
          content: 'hey its third our tasks about vite! lets learn this',
          completed: false
        }
      ],
      countCompleted: 0
    }
  },
  methods: {
    creatTask(task) {
      this.tasks.push(task)
    },
    removeTask(task) {
      this.tasks = this.tasks.filter((o) => o.id !== task.id)
    },
    checkedTask(task) {
      this.tasks = this.tasks.map((o) => {
        if (o.id !== task.id) {
          return o
        }

        const complet = !o.completed
        let completed = complet ? complet : complet
        return { ...o, completed }
      })
      this.countCompleted = this.tasks.filter((o) => o.completed === true).length
    }
  }
}
</script>
