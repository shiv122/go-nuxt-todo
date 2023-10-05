<template>
    <div v-if="todoStore.isLoading">
        <div v-for="n in 5" class="h-10">
            <div class="flex animate-pulse flex-row items-center h-full space-x-5 px-2 hover:bg-gray-100 rounded">
                <div class="w-5 bg-gray-300 h-5 rounded-full ">
                </div>
                <div class="flex flex-col space-y-3">
                    <div class="w-36 bg-gray-300 h-4 rounded-md ">
                    </div>
                </div>
            </div>
        </div>


    </div>
    <div>


        <div v-for="(todo, key, index) in todos" :key="`tdl-${key}`" class="relative group">
            <input @change.prevent="updateStatus(todo.ID, $event)" class="hidden" type="checkbox" :id="`tdi-${key}`"
                :checked="todo.Status === 'completed'">
            <label style="min-height: 2.5rem;"
                class="flex items-center  px-2 rounded cursor-pointer group-hover:bg-gray-100 " :for="`tdi-${key}`">
                <span
                    class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                    <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="ml-4 text-sm overflow-hidden text-ellipsis">{{ todo.Name }}</span>

            </label>
            <button @click="deleteTodo(todo.ID)"
                class=" absolute text-rose-500 hover:bg-rose-500  hover:text-gray-50 inset-y-0 m-auto right-2 h-7 px-2 rounded transition ease-in-out duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7Zm5-7.1l1.9 1.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7l-1.9-1.9l1.9-1.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 11.1l-1.9-1.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l1.9-1.9Z" />
                </svg>
            </button>
        </div>

    </div>
    <form @submit.prevent="addTodo" class="flex mt-5">
        <input v-model="todoText" class="flex-grow ml-4 bg-transparent focus:outline-none font-medium" type="text"
            placeholder="Add a new task">
        <button type="submit" class="flex items-center  h-8 px-2 w-8 bg-slate-100 text-sm font-medium rounded">
            <svg class="w-5 h-5 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>

    </form>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { useTodoStore } from '~/stores/todo'
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);
const Loading = ref(true)
const todoText = ref("")
onMounted(async () => {
    await todoStore.fetchTodos()
})

const updateStatus = async (id, e) => {
    const status = (e.target.checked) ? "completed" : "pending"
    const errored = await todoStore.updateStatus(id, status)
    if (errored) {
        e.target.checked = !e.target.checked;
    }
}

const addTodo = () => {
    todoStore.addTodo(todoText.value)
    todoText.value = ""

}

const deleteTodo = (id) => {
    todoStore.deleteTodo(id)
}
</script>
  

<style scoped>
input[type=checkbox]:checked+label span:first-of-type {
    background-color: #10B981;
    border-color: #10B981;
    color: #fff;
}

input[type=checkbox]:checked+label span:nth-of-type(2) {
    text-decoration: line-through;
    color: #9CA3AF;
}
</style>
  