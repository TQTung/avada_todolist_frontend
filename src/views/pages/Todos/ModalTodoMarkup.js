import { FormLayout, Modal, TextField } from "@shopify/polaris";
import React, { useState } from "react";
import TodoApis from "../../../common/commonApis/todoListApi";

const ModalTodoMarkup = ({
  modalTodoActive,
  toggleModalTodoActive,
  setTodos,
}) => {
  const [todoValue, setTodoValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddNewTodo = async () => {
    try {
      setLoading(true);
      const res = await TodoApis.addNewTodo({
        text: todoValue,
        isCompleted: false,
      });
      const { data } = res.data;
      setTodos([...data]);
      toggleModalTodoActive();
      setTodoValue("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        loading: loading ? true : false,
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
