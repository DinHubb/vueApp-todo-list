<template>
  <section class="text-xs sm:text-lg">
    <div class="m-auto w-full sm:w-10/12 lg:w-2/3">
      <div class="flex justify-between pb-6 gap-2 sm:gap-4">
        <div class="text-blue-400 font-medium">
          <label for="select">Sort by:</label>
          <select
            id="select"
            v-model="selectedOption"
            @change="$emit('sort', selectedOption)"
            class="sm:ml-2 ml-1 cursor-pointer focus:outline-none focus:border-blue-500 focus:border bg-zinc-800 text-white px-1"
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
      <div class="rounded-xl border-t-2 border-t-slate-600 pt-6">
        <div v-if="tasks.length < 1" class="flex flex-col items-center sm:pt-14 pt-6">
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
          class="flex flex-col text-white max-h-300-h scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-zinc-600 overflow-y-auto"
        >
          <li
            v-for="task in tasks"
            :key="task.id"
            task="task"
            class="md:pl-16 md:p-4 ms:gap-4 relative bg-input-color pl-12 p-2 m-2 md:m-4 flex items-center justify-between gap-2 rounded-md"
          >
            <button
              class="md:w-8 md:h-7 w-6 h-6 absolute left-3 border-4 border-blue-400 rounded-max-br font-bold"
              :style="task.completed ? taskComplet : ''"
              @click="$emit('checked', task)"
            >
              <span v-if="task.completed">✓</span>
            </button>
            <div v-if="task.isEdited" class="flex flex-1">
              <input
                v-model.trim="task.content"
                @input="task.content = $event.target.value"
                @keyup.enter="$emit('edit', task)"
                id="editInput"
                class="bg-input-color w-full focus:outline-none focus:border-zinc-700 focus:border"
              />
            </div>
            <div v-else :style="task.completed ? taskContent : ''" class="tracking-wide">
              {{ task.content }}
            </div>
            <div class="flex ms:gap-4 gap-2">
              <button
                class="md:text-3xl text-2xl text-zinc-600"
                @click="$emit('edit', task), editFoucus"
              >
                <label for="editInput" class="cursor-pointer">✃</label>
              </button>
              <button
                class="md:text-3xl text-2xl cursor-pointer text-zinc-600"
                @click="$emit('remove', task)"
              >
                ⛒
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: 'none',
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
