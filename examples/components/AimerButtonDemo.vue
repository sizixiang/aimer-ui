<template>
  <div class="lsp-ui">
    <aimer-button type="default" loading>
      Default
    </aimer-button>
    <aimer-button type="primary" icon="phone">
      Primary
    </aimer-button>
    <aimer-button type="danger" icon="upload">
      Danger
    </aimer-button>
    <aimer-button type="dashed" icon="stop">
      Dashed
    </aimer-button>
    <aimer-button type="default" disabled>
      Disabled
    </aimer-button>
    <aimer-button type="default" @click="handleClick">
      Click
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
  methods:{
    handleClick(e){
      console.log(e)
    }
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
