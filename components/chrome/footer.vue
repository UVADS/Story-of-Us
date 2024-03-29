<template>
  <footer class="footer">
    <div> © {{ new Date().getFullYear() }} by the Rector and Visitors of the University of Virginia </div>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style>
.footer
{
  text-align: center;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom:0;
  height:60px !important;
  width: 100%;
  clear: both;
  background: #1a2835;
  z-index: 15;
}
</style>