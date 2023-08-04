import React, { useState } from "react";
import axios from "axios";

function SearchVolume() {
  const [keyword, setKeyword] = useState("");
  const [searchVolume, setSearchVolume] = useState(null);
  const [searched, setSearched] = useState(false); // Track whether Search button is clicked

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setSearched(false); // Reset searched status when keyword is changed
  };

  const handleSearch = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          q: keyword,
          part: "id",
          type: "video"
        },
      })
      .then((response) => {
        const searchResults = response.data;
        const totalResults = searchResults.pageInfo.totalResults;
        setSearchVolume(totalResults);
        setSearched(true); // Set searched status to true after successful search
      })
      .catch((error) => {
        console.error("Error:", error);
        setSearchVolume(null);
      });
  };

  return (
    <div className="container">
      <h1>YouTube Keyword Search Volume</h1>
      <div className="search-container">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Enter keyword..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searched && searchVolume !== null && ( // Show search volume only if the Search button is clicked
        <p className="result">
          Search volume for "{keyword}": {searchVolume}
        </p>
      )}
    </div>
  );
}

export default SearchVolume;
