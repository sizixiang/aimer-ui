<template>
  <div class="aimer-ui">
    <aimer-form class="aaaa" label-width="90">
      <aimer-col col="24" linkLabel="a1" >
        <aimer-form-item label="11411" type="text" label-width="50px">
          <aimer-input prefixIcon="eye" value="123123"/>
        </aimer-form-item>
        <aimer-form-item label="1111" type="text" label-width="120">
          <aimer-input value="123123444"/>
        </aimer-form-item>
      </aimer-col>
    </aimer-form>
  </div>
</template>

<script>
export default {
  name: 'AimerFormDemo'
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
