import { defineStore } from "pinia";
export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [],
    isLoading: true,
  }),
  actions: {
    async fetchTodos() {
      const { $toast, $api } = useNuxtApp();

      try {
        const response = await $api.get("users/todos");
        this.todos = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async addTodo(newTodo) {
      const { $toast, $api } = useNuxtApp();

      if (!newTodo) {
        $toast.error("Error", {
          description: "Todo Name Required",
        });
        return;
      }
      const storeThis = this;
      await $api
        .post("/users/todos/create", {
          Name: newTodo,
        })
        .then(function (response) {
          storeThis.todos.push(response.data.todo);
        })
        .catch(function (error) {
          console.log(error);
          $toast.error("Error", {
            description: "Something Went Wrong",
          });
        });
    },
    async updateStatus(id, status) {
      const { $toast, $api } = useNuxtApp();

      var errored = false;
      await $api
        .post("users/todos/update-status", {
          Status: status,
          Id: id,
        })
        .then(
          (this.todos = this.todos.map((todo) =>
            todo.ID === id ? { ...todo, Status: status } : todo
          ))
        )
        .catch(function (err) {
          errored = true;
          $toast.error("Something went wrong");
        });

      return errored;
    },
    async deleteTodo(id) {
      const { $toast, $api } = useNuxtApp();

      const storeThis = this;

      await $api
        .delete(`users/todos/${id}/delete`)
        .then(function () {
          storeThis.todos = storeThis.todos.filter((todo) => todo.ID !== id);
        })
        .catch(function (err) {
          $toast.error("Something went wrong");
        });
    },
  },
});
