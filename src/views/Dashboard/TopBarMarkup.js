import { ActionList, TopBar } from "@shopify/polaris";
import { useCallback, useState } from "react";

const TopBarMarkup = ({ storeName, setMobileNavigationActive }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);

  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    [setMobileNavigationActive]
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [{ content: "Community forums" }],
            },
          ]}
          name="Dharma"
          detail={storeName}
          initials="D"
          open={userMenuActive}
          onToggle={toggleUserMenuActive}
        />
      }
      searchResultsVisible={searchActive}
      searchField={
        <TopBar.SearchField
          onChange={handleSearchFieldChange}
          value={searchValue}
          placeholder="Search"
        />
      }
      searchResults={
        <ActionList
          items={[
            { content: "Shopify help center" },
            { content: "Community forums" },
          ]}
        />
      }
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
};

export default TopBarMarkup;
