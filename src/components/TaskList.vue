<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: Array,
  countCompleted: Number
})

const selectedOption = ref('none')
const taskContent = ref({
  textDecoration: 'line-through',
  color: '#808080'
})
const taskComplet = ref({
  background: '#5E60CE',
  border: 'none'
})

const emit = defineEmits(['handleChecked', 'handleRemove', 'editTask', 'cancelEdit', 'sortedTask'])

const checkedTask = (task) => {
  emit('handleChecked', task)
}

const handleRemove = (id) => {
  emit('handleRemove', id)
}

const editTask = (task) => {
  emit('editTask', task)
}

const cancelEdit = (task) => {
  emit('cancelEdit', task)
}

const sortedTask = () => {
  emit('sortedTask', selectedOption)
}
</script>

<template>
  <section class="text-base sm:text-lg 2xl:text-2xl">
    <div class="m-auto w-full sm:w-10/12 lg:w-2/3 2xl:w-10/12">
      <div class="flex justify-between items-center flex-nowrap pb-6">
        <div class="text-blue-400 font-medium">
          <label for="select">Sort by:</label>
          <select
            id="select"
            v-model="selectedOption"
            @change="sortedTask()"
            class="ml-1 cursor-pointer focus:outline-none focus:border-blue-500 focus:border bg-zinc-800 text-white p-1 sm:ml-2"
          >
            <option value="date">date</option>
            <option value="none">none</option>
          </select>
        </div>
        <div class="gap-4 sm:flex">
          <div class="text-blue-400 flex flex-row gap-1">
            Tasks
            <span class="bg-zinc-800 text-white rounded-full px-2 text-center">{{
              data.length
            }}</span>
          </div>
          <div class="text-blue-600 flex flex-row gap-1">
            Completed
            <span class="bg-zinc-800 text-white rounded-full px-2 text-center">{{
              countCompleted
            }}</span>
          </div>
        </div>
      </div>
      <div class="rounded-xl border-t-2 border-t-slate-600 pt-6">
        <div v-if="data.length < 1" class="flex flex-col items-center sm:pt-14 pt-6">
          <img
            src="@/assets/icons/clipboard.svg"
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
          class="flex flex-col text-white max-h-320-h scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-zinc-600 overflow-y-auto"
        >
          <li
            v-for="task in data"
            :key="task.id"
            task="task"
            class="relative flex gap-2 items-center justify-between m-2 p-2 pl-12 bg-input-color rounded-md break-words md:pl-14 md:p-4 2xl:p-6 2xl:pl-16"
          >
            <button
              @click="checkedTask(task)"
              class="w-6 h-6 absolute left-3 border-4 border-blue-400 rounded-max-br font-bold md:w-8 md:h-7 2xl:left-4"
              :style="task.completed ? taskComplet : ''"
            >
              <span v-if="task.completed">✓</span>
            </button>
            <div v-if="task.isEdited" class="flex flex-1">
              <input
                v-model.trim="task.content"
                @input="task.content = $event.target.value"
                @keyup.enter="editTask(task)"
                @keyup.escape="cancelEdit(task)"
                id="editInput"
                class="bg-input-color w-full focus:outline-none focus:border-zinc-700 focus:border"
              />
            </div>
            <span v-else :style="task.completed ? taskContent : ''" class="tracking-wide">
              {{ task.content }}
            </span>
            <div class="flex gap-2 sm:gap-4 2xl:gap-6">
              <button
                @click="editTask(task)"
                class="text-custom-28 cursor-pointer text-zinc-600 sm:text-3xl md:text-3xl 2xl:text-4xl"
              >
                <label for="editInput" class="cursor-pointer">✃</label>
              </button>
              <button
                @click="handleRemove(task.id)"
                class="text-custom-28 cursor-pointer text-zinc-600 sm:text-3xl md:text-3xl 2xl:text-4xl"
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

<!-- 
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
  },
  }
 -->
<!-- @click="$emit('edit', task), editFoucus" -->
<!-- @click="$emit('checked', task)" -->
