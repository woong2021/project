<template>
  <div>
    <ul>
      <item> 아이템1 </item>
      <item>
        아이템2
        <button>Click me</button>
      </item>
      <item>
        <div>아이템3</div>
        <img src="" alt="이미지 없음" />
      </item>
      <item>
        <div style="color: blue; font-size: 20px">아이템4</div>
      </item>
    </ul>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  Components: {
    Item,
  },
};
</script>

<style>
</style>