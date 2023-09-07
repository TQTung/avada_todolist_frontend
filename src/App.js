import { Frame, Loading, Toast } from "@shopify/polaris";
import { useState, useCallback, useRef } from "react";
import { logo } from "./asset/logos/logo";
import ContextualSaveBarMarkup from "./views/Dashboard/Navigation/ContextualSaveBarMarkup";
import NavigationMarkup from "./views/Dashboard/Navigation/NavigationMarkup";
import TopBarMarkup from "./views/Dashboard/TopBarMarkup";
import ActualPageMarkup from "./views/pages/Todos/ActualPageMarkup";
import LoadingPageMarkup from "./views/components/LoadingPageMarkup";
import ModalMarkup from "./views/components/ModalMarkup";

function FrameExample() {
  const defaultState = useRef({
    emailFieldValue: "dharma@jadedpixel.com",
    nameFieldValue: "Jaded Pixel",
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue
  );
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  return (
    <div style={{ height: "500px" }}>
      <Frame
        logo={logo}
        topBar={
          <TopBarMarkup
            storeName={storeName}
            setMobileNavigationActive={setMobileNavigationActive}
          />
        }
        navigation={
          <NavigationMarkup
            setIsLoading={setIsLoading}
            setModalActive={setModalActive}
          />
        }
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        skipToContentTarget={skipToContentRef}
      >
        {isDirty && (
          <ContextualSaveBarMarkup
            handleDiscard={handleDiscard}
            handleSave={handleSave}
          />
        )}
        {isLoading && <Loading />}
        {isLoading ? <LoadingPageMarkup /> : <ActualPageMarkup />}
        {toastActive && (
          <Toast onDismiss={toggleToastActive} content="Changes saved" />
        )}
        {
          <ModalMarkup
            modalActive={modalActive}
            setModalActive={setModalActive}
          />
        }
      </Frame>
    </div>
  );
}

export default FrameExample;
