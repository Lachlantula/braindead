<template>
  <div class="notification" :class="this.$store.getters.checkIfNotificationPinged">
    <div class="emoji-container">{{ emoji }}</div>
    <article class="notification-content">
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    emoji: String,
    title: String,
    description: String
  }
};
</script>

<style scoped lang="scss">
.notification {
  position: relative;
  padding: 25px;
  background: hsl(180, 25%, 77%);
  border-radius: 100px 50px 10px 100px;
  box-shadow: 1px 5px 20px hsl(190, 70%, 50%);
  display: flex;
  margin-bottom: 3vh;
  transition: right 0.5s ease-in-out;
}
.emoji-container {
  font-size: 3rem;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}
.notification-content {
  width: 60%;
  padding-left: 5%;
  padding-right: 10%;
}
.title {
  color: hsl(190, 91%, 15%);
  font-size: 1.5rem;
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 0;
}
.description {
  color: hsl(190, 70%, 30%);
  font-size: 1.2rem;
  line-height: 1.3;
  text-align: left;
  font-weight: bold;
  margin-top: 0.3vh;
  overflow: hidden;
  max-width: 25ch;
}
</style>
