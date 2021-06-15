<template>
    <div>
        <!--
            <div v-for="contents in this.$store.state.news">
            {{ contents.title }}
        </div>
         -->
        <p v-for="item in fetchedNews">
            <a v-bind:href="item.url">
                {{ item.title }}
            </a>
            <small>
                {{ item.time_ago }} by 
                <router-link v-bind:to="`/user/${item.user}`">
                {{ item.user }}
                </router-link>
            </small>
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'fetchedNews'
        ]),
    },
    created(){
       this.$store.dispatch('FETCH_NEWS'); 
    },
}
</script>

<style>

</style>