<template>
  <section class="md:pb-10 flex justify-center pb-4">
    <form
      class="flex justify-center gap-4 w-full h-20 py-5 sm:p-4 sm:w-3/4 md:p-3 lg:w-3/5"
      @submit="saveTask"
    >
      <input
        v-model.trim="task.content"
        @input="task.content = $event.target.value"
        placeholder="write your todo..."
        class="w-full p-4 bg-input-color rounded-lg text-ellipsis text-white focus:outline-none focus:border-blue-500 focus:border"
      />
      <button class="text-center bg-sky-700 px-2 sm:px-4 rounded-lg text-white text-nowrap">
        add <span class="font-bold ml-1">+</span>
      </button>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      task: {
        content: ''
      }
    }
  },
  methods: {
    saveTask(event) {
      event.preventDefault()
      if (this.task.content.trim().length > 0) {
        this.$emit('save', { ...this.task, id: Date.now(), completed: false, isEdited: false })
        this.task.content = ''
      }
    }
  }
}
</script>
