<div class="home">
  <aside>
    <p
      v-for="subscription in subscriptions"
      :id="subscription.id"
      @click="onClickSubscription(subscription)"
    >
      <img class="icon" :src="subscription.iconUrl" alt="">
      <span class="title">{{ subscription.title }}</span>
    </p>
  </aside>
  <div class="content">
  </div>
</div>
