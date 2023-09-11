import ActualPageMarkup from "../Todo/ActualPageMarkup";
import { Frame, Toast } from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import TopBarMarkup from "../Dashboard/TopBarMarkup";
import NavigationMarkup from "../Dashboard/Navigation/NavigationMarkup";
import ContextualSaveBarMarkup from "../Dashboard/Navigation/ContextualSaveBarMarkup";
import { Loading } from "@shopify/polaris";
import LoadingPageMarkup from "../common/LoadingPageMarkup";
import ModalMarkup from "../common/ModalMarkup";
import { logo } from "../../asset/logos/logo";

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
