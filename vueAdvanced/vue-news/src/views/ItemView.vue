<template>
    <div>
        <!-- {{ this.$store.state.item}} -->
        <p>
            {{ itemInfo.title }}
        </p>
        <div>
            {{ itemInfo.content }}
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        itemInfo(){
            return this.$store.state.item;
        }
    },

    created(){
        const itemId = this.$route.params.id;
        console.log(itemId);
        this.$store.dispatch('FETCH_ITEM', itemId);
    }
}
</script>

<style>

</style>