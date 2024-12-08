import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');  // Get query parameter from URL

    if (query) {
      axios.get(`/api/search?query=${query}`)
        .then(response => {
          setResults(response.data.products);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching search results", error);
          setLoading(false);
        });
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.length > 0 ? (
          results.map(product => (
            <li key={product._id}>{product.name}</li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchResults
