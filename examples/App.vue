<template>
  <div class="aimer-ui">
    <p class="title">按钮组件</p>
    <AimerButtonDemo />
    <p class="title">选择组件</p>
    <AimerSelectDemo />
    <p class="title">表单组件</p>
    <AimerFormDemo />
  </div>
</template>

<script>
import AimerButtonDemo from '@/components/AimerButtonDemo'
import AimerSelectDemo from '@/components/AimerSelectDemo'
import AimerFormDemo from '@/components/AimerFormDemo'
export default {
  name: 'App',
  components: {
    AimerButtonDemo,
    AimerSelectDemo,
    AimerFormDemo
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 0 24px;
  .title{
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
