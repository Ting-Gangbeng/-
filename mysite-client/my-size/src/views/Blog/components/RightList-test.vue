<template>
  <RightList :list="list" @select="handleSelect"/>
</template>

<script>
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: false },
        { name: "b", isSelect: false },
        { name: "c", isSelect: false },
        {
          name: "d",
          isSelect: true,
          children: [
            { name: "d-1", isSelect: false },
            {
              name: "d-2",
              isSelect: false,
              children: [
                { name: "c-2-1", isSelect: false },
                { name: "c-2-2", isSelect: false },
                { name: "c-2-3", isSelect: false },
              ],
            },
            { name: "d-3", isSelect: false },
            { name: "d-4", isSelect: false },
          ],
        },
        { name: "e", isSelect: false },
      ],
    };
  },
  methods:{
    handleSelect(item){
      console.log(item);
    }
  }
};
</script>

<style></style>
