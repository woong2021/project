<template>
    <div>
        <div v-for="contents in this.$store.state.news">{{ contents.title }}</div>
    </div>
</template>

<script>

export default {
    created(){
       this.$store.dispatch('FETCH_NEWS'); 
    }
}
</script>

<style>

</style>