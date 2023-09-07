import { methods } from "../../constants/method.js";
import requestApi from "../../helper/httpclient.js";

class TodoApi {
  async getTodos() {
    return await requestApi({
      endpoint: "/todos",
      method: methods.GET,
    });
  }

  async addNewTodo(body) {
    return await requestApi({
      endpoint: "/todos/createTodo",
      method: methods.POST,
      body: body,
    });
  }

  async updateComplete(id) {
    return await requestApi({
      endpoint: "/todos/updateComplete",
      method: methods.PUT,
      query: id,
    });
  }

  async undoComplete(id) {
    return await requestApi({
      endpoint: "/todos/undoComplete",
      method: methods.PUT,
      query: id,
    });
  }

  async removeTodo(id) {
    return await requestApi({
      endpoint: "/todos/deleteTodo",
      method: methods.DELETE,
      query: id,
    });
  }

  async updateTodosSelected(body) {
    return await requestApi({
      endpoint: "/todos/updateCompleteTodos",
      method: methods.PUT,
      body,
    });
  }

  async deleteTodosSelected(body) {
    return await requestApi({
      endpoint: "/todos/deleteTodos",
      method: methods.POST,
      body,
    });
  }
}

const TodoApis = new TodoApi();
export default TodoApis;
