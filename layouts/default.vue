<template>
  <div>
    <ChromeHeader></ChromeHeader>
    <div class="outer">
      <div class="container gridline">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style>
body {
  background: rgb(16, 24, 31);
  color: #fff;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 60px;
}

.gridline {
  background-image: repeating-linear-gradient(
    90deg,
    #cccccc25 0 1px,
    transparent 1px 100%
  );
  background-size: 120px 1px;
}
</style>
