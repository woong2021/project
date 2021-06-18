<template>
    <div class="user-container">
        <div>
            <i class="fas fa-user"></i>
        </div>
        <div class="uset-description">
            <!-- <div>username : {{ userInfo.id }}</div> -->
            <slot name="username">
                <!-- 상위 컴포넌트에서 정의할 영역 -->
            </slot>
            <div class="time">
                <!-- time: {{ userInfo.created }} -->
                <slot name="time">
                    <!-- 상위 컴포넌트에서 정의할 영역 -->
                </slot>
            </div>
            <slot name="karma"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.user-container{
    display: flex;
    align-items: center;
    padding: .5rem;
}

.fa-user {
    font-size: 2.5rem;
}
.uset-description{
    padding-left: 8px;
}

.time{
    font-size: .7rem;
}
</style>