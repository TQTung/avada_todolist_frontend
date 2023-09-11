import { FormLayout, Modal, TextField } from "@shopify/polaris";
import React, { useState } from "react";
import useCreateAPI from "../../hooks/useCreateAPI";

const ModalTodoMarkup = ({
  modalTodoActive,
  toggleModalTodoActive,
  setTodos,
}) => {
  const [todoValue, setTodoValue] = useState("");
  const { createData, loading: loadingCreate } = useCreateAPI();

  const handleAddNewTodo = async () => {
    try {
      const res = await createData("/todos", {
        text: todoValue,
        isCompleted: false,
      });
      const { success, data } = res.data;
      if (success) {
        setTodos(data);
      }
      toggleModalTodoActive();
      setTodoValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModalAddTodo = () => {
    toggleModalTodoActive();
    setTodoValue("");
  };

  return (
    <Modal
      open={modalTodoActive}
      onClose={handleCloseModalAddTodo}
      title="Create a new Todo"
      primaryAction={{
        content: "Create",
        onAction: handleAddNewTodo,
        loading: loadingCreate ? true : false,
        disabled: todoValue ? false : true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleCloseModalAddTodo,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            value={todoValue}
            onChange={(value) => setTodoValue(value)}
            error={!todoValue ? "Please enter a todo" : ""}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default ModalTodoMarkup;
