import {
  Card,
  Loading,
  Page,
  ResourceItem,
  ResourceList,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import TodoApis from "../../../common/commonApis/todoListApi";
import ModalTodoMarkup from "./ModalTodoMarkup";
import TodoResourceItem from "./TodoResourceItem";

const ActualPageMarkup = () => {
  const [loading, setLoading] = useState(false);
  const [modalTodoActive, setToggleModalTodoActive] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  const checkComplete = () => {
    const newArr = todos.filter((todo) => selectedTodos.includes(todo.id));
    const isChecked = newArr.every((item) => item.isCompleted === true);
    return isChecked;
  };

  useEffect(() => {
    setLoading(true);
    TodoApis.getTodos()
      .then((res) => {
        const { data } = res.data;
        setTodos([...data] || []);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCompleteTodosSelected = async () => {
    try {
      const isCompleteEqualTrue = checkComplete();
      if (isCompleteEqualTrue) return;
      const res = await TodoApis.updateTodosSelected({
        ids: selectedTodos,
      });
      const { data } = res.data;
      setTodos([...data] || []);
      setSelectedTodos([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodosSelected = async () => {
    try {
      const res = await TodoApis.deleteTodosSelected({
        ids: selectedTodos,
      });
      const { data } = res.data;
      setTodos([...data] || []);
      setSelectedTodos([]);
    } catch (error) {
      console.log(error);
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
              disabled: checkComplete() ? true : false,
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
