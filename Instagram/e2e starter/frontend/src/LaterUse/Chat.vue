<template>
  <h1>chat</h1>
</template>

<script>
// import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export default {
  data() {
    return {
      msg: { from: 'Guest', txt: '' },
      msgs: [],
      topic: 'Love',
    }
  },
  created() {
    // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    // socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  destroyed() {
    // socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      console.log('Sending', { ...this.msg })
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      const user = userService.getLoggedinUser()
      const from = (user && user.fullname) || 'Guest'
      // this.msg.from = from
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      this.msg = { from, txt: '' }
    },
    changeTopic() {
      // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    }
  }
}
</script>
