import { Badge, Button, Stack } from "@shopify/polaris";
import { useState } from "react";
import TodoApis from "../../../common/commonApis/todoListApi";

const TodoResourceItem = ({ todo, setTodos }) => {
  const { isCompleted, text, id } = todo;

  const [isCompletedLoading, setIsCompletedLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleCompleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      if (isCompleted === true) return;
      setIsCompletedLoading(true);
      const res = await TodoApis.updateComplete(id);
      const { data } = res.data;
      setTodos([...data] || []);
      setIsCompletedLoading(false);
    } catch (error) {
      console.log(error);
      setIsCompletedLoading(false);
    }
  };
  const handleDeleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      setIsDeleteLoading(true);
      const res = await TodoApis.removeTodo(id);
      const { data } = res.data;
      setTodos([...data]);
      setIsDeleteLoading(false);
    } catch (error) {
      console.log(error);
      setIsDeleteLoading(false);
    }
  };

  return (
    <Stack alignment="center" distribution="fillEvenly">
      <Stack.Item fill>
        <span>{text}</span>
      </Stack.Item>
      <Stack.Item>
        <Stack alignment="center" distribution="trailing">
          <Badge status={isCompleted ? "success" : ""}>
            {isCompleted ? "done" : "pending"}
          </Badge>
          <Button
            loading={isCompletedLoading ? true : false}
            disabled={isCompleted ? true : false}
            onClick={(e) => handleCompleteTodo(e, id)}
          >
            Complete
          </Button>
          <Button
            loading={isDeleteLoading ? true : false}
            onClick={(e) => handleDeleteTodo(e, id)}
            destructive
          >
            Delete
          </Button>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default TodoResourceItem;
