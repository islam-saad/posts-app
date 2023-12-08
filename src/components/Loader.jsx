function Loader({ children, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <>{children}</>;
}

export default Loader;
