export type UseSearchResults = {
    searchQuery: string;
    currentPage: number;
    shouldFetchSearchResults: boolean;
    setShowNoResultsMessage: (value: boolean) => void;
    setSearchError: (value: boolean) => void;
}