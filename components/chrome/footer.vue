<template>
  <footer class="footer">
    <div>
      © {{ new Date().getFullYear() }} by the Rector and Visitors of the
      University of Virginia
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style>
.footer {
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  height: 60px !important;
  width: 100%;
  background: #1a2835;
  z-index: 1;
  text-align: center;
  text-wrap: pretty;
  position: balance;
}
</style>