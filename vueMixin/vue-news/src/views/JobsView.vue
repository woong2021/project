<template>
    <div>
        <list-item></list-item>  
    </div>
</template>

<script>
import ListItem from '../components/ListItem.vue';
import ListMixin from '../Mixins/ListMixin.js'; 

export default {
    components: {
        ListItem,
    },
    mixins: [ListMixin],
}
</script>
