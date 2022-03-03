<template>
  <div class="text-grey-5 text-h6">
    开发中！

  </div>
</template>
<script>
import {ref} from "vue";

export default {
  setup() {
    const status1 = ref([]);
    const status2 = ref([]);

    return {
      status1,
      status2,

      // store the id of the draggable element
      onDragStart(e) {
        console.log("onDragStart", e);
        e.dataTransfer.setData("text", {a: 1, b: 2});
        e.dataTransfer.dropEffect = "move";
      },

      onDragEnter(e) {
        console.log("onDragEnter", e);
        // don't drop on other draggables
        if (e.target.draggable !== true) {
          e.target.classList.add("drag-enter");
        }
      },

      onDragLeave(e) {
        console.log("onDragLeave", e);

        e.target.classList.remove("drag-enter");
      },

      onDragOver(e) {
        e.preventDefault();
      },

      onDrop(e) {
        console.log("onDrop", e);
        e.preventDefault();

        // don't drop on other draggables
        if (e.target.draggable === true) {
          console.log(111111);
          return;
        }

        const draggedId = e.dataTransfer.getData("text");
        console.log("draggedId", draggedId);
        // const draggedEl = document.getElementById(draggedId);

        // // check if original parent node
        // if (draggedEl.parentNode === e.target) {
        //   console.log(222222);
        //   e.target.classList.remove("drag-enter");
        //   return;
        // }

        // // make the exchange
        // draggedEl.parentNode.removeChild(draggedEl);
        // e.target.appendChild(draggedEl);
        // e.target.classList.remove("drag-enter");
      },
    };
  },
};
</script>
<style scoped lang="sass">
.drop-target
  height: 400px
  width: 200px
  min-width: 200px
// background-color: gainsboro

.drag-enter
  outline-style: dashed

.box
  width: 100px
  height: 100px
  float: left
  cursor: pointer

@media only screen and (max-width: 500px)
  .drop-target
    height: 200px
    width: 100px
    min-width: 100px
    background-color: gainsboro

  .box
    width: 50px
    height: 50px

.box:nth-child(3)
  clear: both

.navy
  background-color: navy

.red
  background-color: firebrick

.green
  background-color: darkgreen

.orange
  background-color: orange
</style>
