<template>
  <div class="notifications">
    <transition-group name="slide">
      <Notification
        v-for="(notification, i) in this.$store.getters.getNotifications"
        :emoji="notification.emoji"
        :title="notification.title"
        :description="notification.description"
        :key="i"
      />
    </transition-group>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";

export default {
  name: "NotificationContainer",
  components: {
    Notification
  }
};
</script>

<style scoped lang="scss">
.notifications {
  position: absolute;
  top: 10vh;
  width: 25vw;
  height: 10vh;
  right: 2vw;
}
.slide-enter-active {
  right: 0vw;
}
.slide-leave-active {
  right: -40vw;
}
.slide-enter-active,
.slide-leave-active {
  transition: right 0.5s linear;
}
.slide-enter,
.slider-leave-to {
  right: -40vw;
}
</style>
