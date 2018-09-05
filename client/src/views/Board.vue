<template>
  <div class="board">
    <list />
  </div>
</template>

<script>
  import List from "@/components/List"

  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    components: {
      List
    },
    props: ["boardId"]
  };
</script>