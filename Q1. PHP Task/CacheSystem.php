<?php

class CacheSystem {
  private $cacheDir;
  private $defaultExpiration;

  public function __construct($cacheDir = 'cache/', $defaultExpiration = 300) {
    $this->cacheDir = $cacheDir;
    $this->defaultExpiration = $defaultExpiration;

    if (!file_exists($this->cacheDir)) {
      mkdir($this->cacheDir, 0777, true);
    }
  }

  public function set($key, $data, $expiration = null) {
    $expiration = $expiration ?? $this->defaultExpiration;
    $cacheFile = $this->getCacheFile($key);

    $cacheData = [
      'expires' => time() + $expiration,
      'data' => $data
    ];

    file_put_contents($cacheFile, serialize($cacheData));
  }

  public function get($key) {
    $cacheFile = $this->getCacheFile($key);

    if (!file_exists($cacheFile)) {
      return null;
    }

    $cacheData = unserialize(file_get_contents($cacheFile));

    if (time() > $cacheData['expires']) {
      unlink($cacheFile);
      return null;
    }

    return $cacheData['data'];
  }

  public function clearExpired() {
    $files = glob($this->cacheDir . '*.cache');

    foreach ($files as $file) {
      $cacheData = unserialize(file_get_contents($file));
      if (time() > $cacheData['expires']) {
        unlink($file);
      }
    }
  }

  private function getCacheFile($key) {
    return $this->cacheDir . md5($key) . '.cache';
  }
}
