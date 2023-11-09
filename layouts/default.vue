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
/*
.outer {
  position: relative;
  background: rgba(16, 24, 31, 0.5);
  padding: 60px 60px;
}
.outer:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  width: 100%;
  height: 100%;
  /*background: url('/bg.jpg') no-repeat center center;
  background-size: cover;
  opacity: 0.15;
  z-index: -1;
}*/
</style>
