<script setup>
import { ref, computed, watchEffect } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

const tasks = ref(
  JSON.parse(
    localStorage.getItem(STORAGE_KEY) || [
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
    ]
  )
)

const STORAGE_KEY = 'tasks'
let valueSelected = ''
let sortedNameJson = localStorage.getItem('sorted')
sortedNameJson ? (valueSelected = JSON.parse(sortedNameJson)) : null

const filters = {
  completed: (tasks) => tasks.filter((task) => task.completed),
  sortedDefault: (tasks) => tasks.sort((a, b) => a.id - b.id),
  sortedByDate: (tasks) => tasks.sort((a, b) => b.id - a.id)
}

const countCompleted = computed(() => filters.completed(tasks.value).length)

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
})

const saveTask = (task) => {
  if (!task) return null

  valueSelected === 'date' ? tasks.value.unshift(task) : tasks.value.push(task)
}

const handleChecked = (task) => {
  if (!task) return null

  tasks.value = tasks.value.map((o) => {
    if (o.id !== task.id) return o

    let completed = !task.completed
    return { ...o, completed }
  })
}

const handleRemove = (id) => {
  if (!id) return null
  tasks.value = tasks.value.filter((o) => o.id !== id)
}

let beforeEditCache = ''
const edit = (task) => {
  if (!task) return null

  beforeEditCache = task.content
  tasks.value = tasks.value.map((o) => {
    if (o.id !== task.id || task.content.trim().length > 150) return o

    let isEdited = !o.isEdited
    return { ...o, isEdited }
  })
}

const cancelEdit = (task) => {
  if (task.isEdited) {
    task.content = beforeEditCache
    task.isEdited = false
  }

  return null
}

const sortTask = ({ value }) => {
  if (!value) return null
  valueSelected = value

  if (value === 'date') {
    return (tasks.value = filters.sortedByDate(tasks.value))
  }
  return (tasks.value = filters.sortedDefault(tasks.value)) // так как id у меня это дата их создание то сортировка по дефолту подрозумевает сортировку по id
}
</script>

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
      <TaskForm @saveTask="saveTask" />
      <TaskList
        :data="tasks"
        :countCompleted="countCompleted"
        @handleChecked="handleChecked"
        @handleRemove="handleRemove"
        @editTask="edit"
        @cancelEdit="cancelEdit"
        @sortedTask="sortTask"
      />
    </main>
  </div>
</template>

<!-- export default {
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
  } -->
