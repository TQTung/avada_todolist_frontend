import { Badge, Button, Stack } from "@shopify/polaris";
import useDeleteAPI from "../../hooks/useDeleteAPI";
import useUpdateAPI from "../../hooks/useUpdateAPI";

const TodoResourceItem = ({ todo, setTodos }) => {
  const { isCompleted, text, id } = todo;

  const { loading: isDeleteLoading, deleteData } = useDeleteAPI();
  const { loading: isCompletedLoading, updateData } = useUpdateAPI();

  const handleCompleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      const res = await updateData({ endpoint: "/todo", id });
      const { success, data } = res.data;
      if (success) {
        setTodos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      const res = await deleteData("/todo", id);
      const { success, data } = res.data;
      if (success) {
        setTodos(data);
      }
    } catch (error) {
      console.error(error);
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
