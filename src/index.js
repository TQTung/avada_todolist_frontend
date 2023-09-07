import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            showing: "Showing {itemsCount} {resource}",
            selected: "{selectedItemsCount} selected",
          },
          Avatar: {
            label: "Avatar",
            labelWithInitials: "Avatar with initials {initials}",
          },
          ContextualSaveBar: {
            save: "Save",
            discard: "Discard",
          },
          TextField: {
            characterCount: "{count} characters",
          },
          TopBar: {
            toggleMenuLabel: "Toggle menu",

            SearchField: {
              clearButtonLabel: "Clear",
              search: "Search",
            },
          },
          Modal: {
            iFrameTitle: "body markup",
          },
          Frame: {
            skipToContent: "Skip to content",
            navigationLabel: "Navigation",
            Navigation: {
              closeMobileNavigationLabel: "Close navigation",
            },
          },
        },
      }}
    >
      <App />
    </AppProvider>
  </React.StrictMode>
);
