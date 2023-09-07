import { Navigation } from "@shopify/polaris";
import {
  ArrowLeftMinor,
  ConversationMinor,
  HomeMajor,
  OrdersMajor,
  ThemeEditMajor,
} from "@shopify/polaris-icons";
import { useCallback } from "react";

const NavigationMarkup = ({ setIsLoading, setModalActive }) => {
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [setIsLoading]
  );

  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    [setModalActive]
  );

  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Back to Shopify",
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Jaded Pixel App"
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: toggleIsLoading,
          },
          {
            label: "Jaded Pixel Orders",
            icon: OrdersMajor,
            onClick: toggleIsLoading,
          },
          {
            label: "Test",
            icon: ThemeEditMajor,
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: "Contact support",
          onClick: toggleModalActive,
        }}
      />
    </Navigation>
  );
};

export default NavigationMarkup;
