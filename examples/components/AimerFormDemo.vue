<template>
  <div class="aimer-ui">
    <aimer-form class="aaaa" label-width="90">
      <aimer-col col="24" linkLabel="a1" >
        <aimer-form-item label="11411" type="text" label-width="50px">
          <aimer-input prefixIcon="eye" v-model="model.a"/>
        </aimer-form-item>
      </aimer-col>
      <aimer-col col="24">
        <aimer-form-item label="111dsfasdf1" type="text" label-width="120">
          <aimer-input v-model="model.b"/>
        </aimer-form-item>
      </aimer-col>
    </aimer-form>
  </div>
</template>

<script>
export default {
  name: 'AimerFormDemo',
  data:() => (
    {
      model: {
        a: 1,
        b: 'asdfasdfsdfsdf'
      }
    }
  )
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
