import {
  Card,
  Loading,
  Page,
  ResourceItem,
  ResourceList,
} from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import useFetchAPI from "../../hooks/useFetchAPI";
import useUpdateAPI from "../../hooks/useUpdateAPI";
import ModalTodoMarkup from "./ModalTodoMarkup";
import TodoResourceItem from "./TodoResourceItem";

const ActualPageMarkup = () => {
  const [modalTodoActive, setToggleModalTodoActive] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [isCheckComplete, setIsCheckComplete] = useState(false);

  const { loading, setData: setTodos, data: todos } = useFetchAPI("/todos");
  const { updateData: updateTodos } = useUpdateAPI();
  const { updateData: deleteDatas } = useUpdateAPI();

  useMemo(() => {
    const checkComplete = () => {
      const newArr = todos.filter((todo) => selectedTodos.includes(todo.id));
      const isChecked = newArr.every((item) => item.isCompleted === true);
      setIsCheckComplete(isChecked);
    };
    checkComplete();
  }, [selectedTodos, todos]);

  const handleCompleteTodosSelected = async () => {
    try {
      if (isCheckComplete) return;
      const res = await updateTodos({
        endpoint: "/todos",
        data: { ids: selectedTodos },
      });
      const { success, data } = res.data;
      if (success) {
        setTodos(data);
      }
      setSelectedTodos([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodosSelected = async () => {
    try {
      const res = await deleteDatas({
        endpoint: "/todos/delete-all",
        data: { ids: selectedTodos },
      });
      const { success, data } = res.data;
      if (success) {
        setTodos(data);
      }
      setSelectedTodos([]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModalTodoActive = useCallback(
    () => setToggleModalTodoActive((modalActive) => !modalActive),
    [setToggleModalTodoActive]
  );

  return (
    <Page
      title="Todoes"
      primaryAction={{
        content: "Create Todo",
        onAction: toggleModalTodoActive,
      }}
    >
      <Card sectioned>
        {
          <ModalTodoMarkup
            toggleModalTodoActive={toggleModalTodoActive}
            modalTodoActive={modalTodoActive}
            setTodos={setTodos}
          />
        }
        <ResourceList
          resourceName={{
            singular: "todo",
            plural: "todos",
          }}
          items={todos}
          renderItem={(todo) => (
            <ResourceItem
              id={todo.id}
              accessibilityLabel={`View details for ${todo.text}`}
            >
              {loading ? (
                <Loading />
              ) : (
                <TodoResourceItem todo={todo} setTodos={setTodos} />
              )}
            </ResourceItem>
          )}
          selectedItems={selectedTodos}
          onSelectionChange={setSelectedTodos}
          selectable
          promotedBulkActions={[
            {
              content: "Complete",
              onAction: handleCompleteTodosSelected,
              disabled: isCheckComplete ? true : false,
            },
            {
              content: "Delete",
              onAction: handleDeleteTodosSelected,
            },
          ]}
        />
      </Card>
    </Page>
  );
};

export default ActualPageMarkup;
