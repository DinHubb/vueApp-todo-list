<template>
  <section class="text-lg">
    <div class="m-auto w-2/3">
      <div class="flex justify-between pb-6 gap-4">
        <div class="text-blue-400 font-medium">
          Sort by:
          <select
            v-model="selectedOption"
            @change="$emit('sort', selectedOption)"
            class="ml-2 focus:outline-none focus:border-blue-500 focus:border bg-zinc-800 text-white pl-1"
          >
            <option value="date">date</option>
            <option value="none">none</option>
          </select>
        </div>
        <div class="text-blue-400 flex flex-row gap-1 ml-auto">
          Tasks
          <span class="bg-zinc-800 text-white rounded-full px-2 text-center">{{
            tasks.length
          }}</span>
        </div>
        <div class="text-blue-600 flex flex-row gap-1">
          Completed
          <span class="bg-zinc-800 text-white rounded-full px-2 text-center">{{
            countCompleted
          }}</span>
        </div>
      </div>
      <div class="rounded-xl border-t-2 border-t-slate-600 py-4">
        <div v-if="tasks.length < 1" class="flex flex-col items-center pt-14">
          <img
            src="@/assets/clipboard.svg"
            class="pb-4"
            width="56px"
            height="56px"
            alt="clipboard"
          />
          <h2 class="text-center text-gray-500 font-medium">
            You don't have any registered tasks yet <br />
            <span class="font-light">Create tasks and organize your affairs</span>
          </h2>
        </div>
        <ul
          class="flex flex-col text-white max-h-424-h scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-zinc-600 overflow-y-auto"
        >
          <task-item
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @remove="$emit('remove', task)"
            @checked="$emit('checked', task)"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: {
    TaskItem
  },
  data() {
    return {
      selectedOption: 'none'
    }
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    countCompleted: {
      type: Number
    }
  }
}
</script>
