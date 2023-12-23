<template>
  <div class="w-full bg-main-color overflow-hidden">
    <header
      class="bg-header-color flex flex-col items-center justify-center pt-4 p-10 text-white md:pt-8 md:p-14 2xl:pt-16 2xl:p-20"
    >
      <img
        src="@/assets/logo.svg"
        width="126px"
        height="48px"
        class="pb-3 xl:w-40 2xl:w-52"
        alt="logo"
      />
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
          content: 'Complete a task from the MegaFon',
          completed: true,
          isEdited: false
        },
        {
          id: 2,
          content: 'Go through the following stages: interview',
          completed: false,
          isEdited: false
        }
      ],
      countCompleted: 0,
      valueSelected: ''
    }
  },
  async mounted() {
    const data = await localStorage.getItem('tasks')
    data ? (this.tasks = JSON.parse(data)) : null
    this.countCompleted = this.tasks.filter((o) => o.completed === true).length
  },
  methods: {
    saveTask(task) {
      this.valueSelected === 'date' ? this.tasks.unshift(task) : this.tasks.push(task)
      this.localStorage(this.tasks)
    },
    removeTask(task) {
      this.tasks = this.tasks.filter((o) => o.id !== task.id)
      this.checkedTask(this.tasks)
      this.localStorage(this.tasks)
    },
    checkedTask(task) {
      this.tasks = this.tasks.map((o) => {
        if (o.id !== task.id) return o

        const complet = !o.completed
        let completed = complet ? complet : complet
        return { ...o, completed }
      })
      this.countCompleted = this.tasks.filter((o) => o.completed === true).length
      this.localStorage(this.tasks)
    },
    sortTask(value) {
      this.valueSelected = value
      if (value === 'date') {
        this.tasks = this.tasks.sort((a, b) => b.id - a.id)
        return
      }

      return (this.tasks = this.tasks.sort((a, b) => a.id - b.id)) // так как id у меня это дата их создание то сортировка по дефолту подрозумевает сортировку по id
    },
    edit(task) {
      this.tasks = this.tasks.map((o) => {
        if (o.id !== task.id || task.content.trim().length > 150) return o
        const edited = !o.isEdited
        let isEdited = edited ? edited : edited
        console.log(isEdited)
        return { ...o, isEdited }
      })
      this.localStorage(this.tasks)
    },
    localStorage(data) {
      localStorage.setItem('tasks', JSON.stringify(data))
    }
  }
}
</script>