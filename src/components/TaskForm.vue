<script setup>
import { ref, computed } from 'vue'

const newContent = ref('')
const lengthContent = ref(0)

const lengthInput = computed(() => {
  return lengthContent.value > 150 ? { color: '#e41212' } : {}
})

const emit = defineEmits(['saveTask'])

const saveTask = () => {
  if (newContent.value.trim().length > 0 && newContent.value.length <= 150) {
    emit('saveTask', {
      id: Date.now(),
      content: newContent.value,
      completed: false,
      isEdited: false
    })
    newContent.value = ''
    lengthContent.value = 0
  }
}

const createTaskChange = (evt) => {
  const { value } = evt.target
  lengthContent.value = value.trim().length
}
</script>

<template>
  <section
    class="flex flex-col items-center justify-center pb-6 sm:pb-12 md:pb-16 lg:text-2xl 2xl:pb-20"
  >
    <form
      class="relative flex gap-4 w-full h-20 py-4 sm:p-4 sm:w-3/4 md:p-3 lg:w-3/5 2xl:w-9/12 2xl:p-1"
      @submit.prevent="saveTask"
    >
      <input
        v-model.trim="newContent"
        @input="createTaskChange"
        placeholder="write your todo..."
        id="createTaskInput"
        class="w-full px-4 bg-input-color rounded-lg text-ellipsis text-white focus:outline-none focus:border-blue-500 focus:border"
      />
      <label
        for="createTaskInput"
        class="absolute ml-4 -bottom-3 text-white text-base 2xl:-bottom-8"
        :style="lengthContent > 150 ? lengthInput : ''"
        >{{ lengthContent }}/150</label
      >
      <button
        class="text-center bg-sky-700 pl-2 pr-8 rounded-lg text-white hover:shadow-md hover:shadow-cyan-950 active:shadow-inner active:shadow-cyan-950 text-nowrap bg-add-plus bg-no-repeat bg-custom-right sm:pr-7"
      >
        add
      </button>
    </form>
  </section>
</template>

<!-- export default {
  data() {
    return {
      task: {
        content: ''
      },
      lengthContent: 0,
      lengthInput: {
        color: '#e41212'
      },
      id: 1
    }
  },
  methods: {
    saveTask(event) {
      event.preventDefault()
      if (this.task.content.trim().length > 0 && this.task.content.length <= 150) {
        this.$emit('save', { ...this.task, id: Date.now(), completed: false, isEdited: false })
        this.task.content = ''
        this.lengthContent = 0
      }
    },
    createTaskChange(evt) {
      const { value } = evt.target
      this.lengthContent = value.trim().length
      this.task.content = value.trim()
    }
  }
} -->
