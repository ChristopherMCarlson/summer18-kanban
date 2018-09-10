<template>
  <div class="quick-modal">
    <!-- Button trigger modal -->
    <button :id="buttonId || '' " :style="{ display: isHidden ? 'none' : ''}" type="button" class="btn btn-themed mt-2" data-toggle="modal"
      :data-target="'#'+modalId">
      +
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="header"></slot>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modalId: 'm' + Math.floor(Math.random() * (1000) + 1)
      }
    },
    mounted() {
      this.$emit('modalOpen', this.modalId)
    },
    props: ['buttonId', 'isHidden'],
    name: "QuickModal"
  }
</script>

<style>
  .btn-themed {
    background-color: #30e3ca;
    transition: 300ms background-color
  }

  .btn-themed:hover {
    background-color: #11999e;
  }
</style>