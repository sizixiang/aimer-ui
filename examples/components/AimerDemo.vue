<template>
  <div class="lsp-ui">
    <aimer-button type="primary" :loading="loading" icon="phone">
      Primary
    </aimer-button>
  </div>
</template>

<script>
export default {
  name: 'Lsp',
  data(){
    return{
      loading: true
    }
  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    },2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
