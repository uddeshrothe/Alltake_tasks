<?php

require 'CacheSystem.php';

$cache = new CacheSystem();

// Example: Fetch API data (dummy URL here)
function fetchApiData($url, $cache) {
  $cacheKey = 'api_' . md5($url);
  $cachedData = $cache->get($cacheKey);

  if ($cachedData) {
    echo "Using Cached Data:<br>";
    return $cachedData;
  }

  // Simulate API call
  $apiResponse = file_get_contents($url);
  if ($apiResponse === false) {
    return "Failed to fetch API data.";
  }

  $cache->set($cacheKey, $apiResponse);
  echo "Fetched Fresh Data:<br>";
  return $apiResponse;
}

// Example call
$url = 'https://jsonplaceholder.typicode.com/posts/1';
$response = fetchApiData($url, $cache);

echo "<pre>$response</pre>";

// Clean up expired cache files (optional)
$cache->clearExpired();
