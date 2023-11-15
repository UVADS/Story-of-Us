type useFetchType = typeof useFetch

// wrap useFetch with configuration needed to talk to our API
export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()

  // modify options as needed
  options.baseURL = config.public.apiHost
  options.method = 'get'
  return useFetch(path, options)
}
