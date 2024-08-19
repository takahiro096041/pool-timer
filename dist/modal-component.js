Vue.component("modal-component", {
  props: ["show"],
  template: `
      <div class="modal" v-if="show">
        <div class="modal-content">
          <span class="close" @click="close">&times;</span>
          <slot></slot>
        </div>
      </div>
    `,
  methods: {
    close() {
      this.$emit("close");
    },
  },
});
