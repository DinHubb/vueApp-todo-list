<template>
  <section class="flex justify-center pb-10">
    <form class="flex justify-center gap-4 w-3/5 h-20 p-3" @submit="creatTask">
      <input
        v-model="task.content"
        @input="task.content = $event.target.value"
        placeholder="write your todo..."
        class="w-full p-4 bg-input-color rounded-lg text-ellipsis text-white focus:outline-none focus:border-blue-500 focus:border"
      />
      <button class="text-center bg-sky-700 px-4 rounded-lg text-white text-nowrap">
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
    creatTask(event) {
      event.preventDefault()
      if (this.task.content.length < 1) return null
      this.task.id = Date.now()
      this.task.completed = false
      this.$emit('creat', this.task)
      this.task = {
        content: ''
      }
    }
  }
}
</script>
