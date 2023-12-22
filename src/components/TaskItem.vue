<template>
  <li
    class="relative bg-input-color pl-16 p-4 m-4 flex items-center justify-between gap-4 rounded-md"
  >
    <button
      class="absolute left-3 border-4 border-blue-400 rounded-max-br w-10 h-9 font-bold"
      :style="task.completed ? taskComplet : ''"
      @click="$emit('checked', task)"
    >
      <span v-if="task.completed">✓</span>
    </button>
    <div :style="task.completed ? taskContent : ''">
      {{ task.content }}
    </div>
    <div class="flex gap-4">
      <button class="text-3xl text-zinc-600">✃</button>
      <button class="text-3xl text-zinc-600" @click="$emit('remove', task)">⛒</button>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      taskContent: {
        textDecoration: 'line-through',
        color: '#808080'
      },
      taskComplet: {
        background: '#5E60CE',
        border: 'none'
      }
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>
