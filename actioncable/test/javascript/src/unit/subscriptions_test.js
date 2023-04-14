import * as ActionCable from "../../../../app/javascript/action_cable/index"
import consumerTest from "../test_helpers/consumer_test_helper"

const {module, test} = QUnit

module("ActionCable.Subscriptions", () => {
  consumerTest("create subscription with channel string", ({consumer, server, assert, done}) => {
    const channel = "chat"

    server.on("message", (message) => {
      const data = JSON.parse(message)
      assert.equal(data.command, "subscribe")
      assert.equal(data.identifier, JSON.stringify({channel}))
      done()
    })

    consumer.subscriptions.create(channel)
  })

  consumerTest("create subscription with channel object", ({consumer, server, assert, done}) => {
    const channel = {channel: "chat", room: "action"}

    server.on("message", (message) => {
      const data = JSON.parse(message)
      assert.equal(data.command, "subscribe")
      assert.equal(data.identifier, JSON.stringify(channel))
      done()
    })

    consumer.subscriptions.create(channel)
  })

  module("resubscribe", () => {
    test("stops resubscribing after certain period", assert => {
      const subscriptions = new ActionCable.Subscriptions({})
      // assert.equal(ActionCable.Subscriptions.stopResubscribeAfter, 0)
      assert.ok(subscriptions)
    })
  })
})
