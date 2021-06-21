<template>
    <div>
        <ul class="new-list">
            <li v-for="item in listItems" class="post">
                <!-- 포인트 영역 -->
                <div class="points">
                    {{ item.points || 0 }}
                </div>
                <!-- 기타 정보 영역 -->
                <div>
                    <!-- 타이틀 영역 -->
                    <p class="news-title">
                        <template v-if="item.domain">
                            <a v-bind:href="item.url">
                                {{ item.title }}
                            </a>
                        </template>
                        <template v-else>
                            <router-link v-bind:to="`item/${item.id}`">
                                {{ item.title }}
                            </router-link>
                        </template>
                    </p>
                     <small class="link-text">
                        {{ item.time_ago }} by
                        <template v-if="item.user"> 
                            <router-link v-bind:to="`/user/${item.user}`">
                                {{ item.user }}
                            </router-link>
                        </template>
                        <template v-else>
                            <router-link v-bind:to="`/user/${item.domain}`">
                                {{ item.domain }}
                            </router-link>
                        </template>
                    </small>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        listItems(){
            return this.$store.state.list;
        }
    },
    created(){
        const name = this.$route.name;
    },
}
</script>

<style scoped>
    .news-list{
        margin: 0;
        padding: 0;
    }

    .post{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        list-style: none;
    }

    .points{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 60px;
        color: #42b883;
    }

    .news-title{
        margin: 0;
    }

    .link-text{
        color: #828282;
    }
</style>