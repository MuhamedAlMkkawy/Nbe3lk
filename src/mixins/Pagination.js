import useApiMethods from "./ApiMethods";

export default function usePagination() {
  const { getMethod, loading, resultGet } = useApiMethods();

  const handlePagination = (pageUrl, event) => {
    const newPage = event || 1;
    getMethod(`${pageUrl}${newPage}`, true);
  };

  // to handle pagination for orders type.
  const handleFilteredPagination = (pageUrl, event , status) => {
    const newPage = event || 1;
    if(status === 'all-orders'){
      getMethod(`${pageUrl}${newPage}`, true);
    }else{
      getMethod(`${pageUrl}${newPage}&status=${status}`, true);
    }
    
  };

  return {
    handlePagination,
    handleFilteredPagination,
    loading,
    resultGet,
  };
}
