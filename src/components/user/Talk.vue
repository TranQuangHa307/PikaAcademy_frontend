<template>
  <div class="app_talk">
    <div id="talkjs-container" style="width: 350px; height: 500px">
      <i>Loading chat...</i>
    </div>
  </div>
</template>

<script>
import Talk from 'talkjs'
export default {
  mounted: function() {
    Talk.ready.then(function() {
      var me = new Talk.User({
        id: parseInt(Math.random() * 500000).toString(),
        name: 'Alice',
        email: 'demo@talkjs.com',
        photoUrl: 'https://demo.talkjs.com/img/alice.jpg',
        welcomeMessage: 'Hey there! How are you? :-)',
        role: 'booker'
      })
      var talkSession = new Talk.Session({
        appId: 't92Ea7gd',
        me: me
      })
      var other = new Talk.User({
        id: parseInt(Math.random() * 500000).toString(),
        name: 'PikaAcademy',
        email: 'work.time.anhnh@gmail.com',
        photoUrl: 'https://i.pinimg.com/originals/9a/5f/ac/9a5faca1071eed2426e178838514caf2.jpg',
        welcomeMessage: 'Hey, how can I help?',
        role: 'booker'
      })
      var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
      conversation.setParticipant(me)
      conversation.setParticipant(other)
      var inbox = talkSession.createInbox({ selected: conversation })
      inbox.mount(document.getElementById('talkjs-container'))
    })
  }
}
</script>

<style lang="scss">
.app_talk {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
