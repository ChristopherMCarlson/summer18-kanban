<template>
  <div class="login-modal">
    <!-- Button trigger modal -->
    <button type="button" class="openForm-btn" data-toggle="modal" data-target="#exampleModalCenter">
      LOGIN/REGISTER
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Login/Register</h5>
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
    name: "LoginModal",
    data() {
      return {
        modalId: 'm' + Math.floor(Math.random() * (1000) + 1)
      }
    },
    // mounted() {
    //   this.$emit('modalOpen', this.modalId)
    // },
    // props: ['buttonId', 'isHidden'],
  }
</script>