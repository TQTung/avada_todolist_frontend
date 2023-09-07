import { ContextualSaveBar } from "@shopify/polaris";

const ContextualSaveBarMarkup = ({ handleSave, handleDiscard }) => {
  return (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  );
};

export default ContextualSaveBarMarkup;
