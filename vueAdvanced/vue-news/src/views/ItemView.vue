<template>
    <div>
        <!-- {{ this.$store.state.item}} -->
        <section>
            <!-- 사용자 상세 정보 -->
            <user-profile :info="itemInfo">
                <!-- <div slot="username">{{ itemInfo.user }}</div> -->
                <router-link slot="username" :to="`/user/${itemInfo.user}`">
                    {{ itemInfo.user }}
                </router-link>
                <template slot="time">{{ 'Posted ' + itemInfo.time_ago }}</template>
            </user-profile>
        </section>
        <section>
            <h2>{{ itemInfo.title }}</h2>
        </section>
        <section>
            <!-- 질문 댓글 -->
            <div v-html="itemInfo.content"></div>
        </section>
    </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue';

export default {
    components: {
        UserProfile
    },
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