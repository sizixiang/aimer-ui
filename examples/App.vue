<template>
  <div>
    <AimerDemo />
    <AimerDemo2 />
  </div>
</template>

<script>
import AimerDemo from '@/components/AimerDemo'
import AimerDemo2 from '@/components/AimerFormDemo'
export default {
  name: 'App',
  components: {
    AimerDemo,
    AimerDemo2
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
