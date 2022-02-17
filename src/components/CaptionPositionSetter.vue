<template>
  <div id="caption-position-setter">
    <div id="targetId_container">
      <p style="background: black">Caption Position</p>
      <input v-model="targetId" placeholder="IDを入力" />
      <button @click="setPosition">実行</button>
      <slot/>
    </div>
    <div id="caption-params">
      <div id="name">Tag ID: {{ targetId }}</div>
      <div id="top" class="param">
        <div>
          <label for="top">Top: </label>
          <span id="val_top">{{ top }}</span
          ><span>px</span>
          <span><input type="text" v-model="setTop" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_top"
          min="0"
          max="1000"
          step="1"
          v-model="top"
        />
      </div>
      <div id="left" class="param">
        <div>
          <label for="left">Left: </label>
          <span id="val_left">{{ left }}</span
          ><span>px</span>
          <span><input type="text" v-model="setLeft" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_left"
          min="0"
          max="1500"
          step="1"
          v-model="left"
        />
      </div>
      <button @click="exportJson">jsonに書き出す</button>
      <button @click="close">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      targetId: "",
      targetElement: null,
      params: {},
      top: 0,
      left: 0,
      ws: new WebSocket("ws://localhost:42331"),
    };
  },
  watch: {
    setTop(value) {
      if (this.targetElement === null) return;
      this.targetElement.style.top = `${value}px`;
    },
    setLeft(value) {
      if (this.targetElement === null) return;
      this.targetElement.style.left = `${value}px`;
    }
  },
  computed: {
    setTop: {
      get() {
        return this.top;
      },
      set(value) {
        this.top = value;
      }
    },
    setLeft: {
      get() {
        return this.left;
      },
      set(value) {
        this.left = value;
      }
    },
  },
  methods: {
    setPosition() {

      const captionPosJson = getCaptionPosJson(this.targetId);

      if (captionPosJson) {
        this.top = captionPosJson.top;
        this.left = captionPosJson.left;
      }

      const targetElement = document.getElementById("caption-" + this.targetId); 

      if (targetElement) {
        document.getElementById("caption-params").style.visibility = "visible";
      } else {
        alert("IDが存在しません");
        return;
      }
      targetElement.style.opacity = "0.8";

      this.targetElement = targetElement;
    },
    async exportJson() {
      if (this.ws.readyState !== 1) {
        console.error(
          "websocket connection error. status: ",
          ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState]
        );
        this.ws = new WebSocket("ws://localhost:42331");
        console.log("reconnecting...");
        await new Promise((resolve) => {
          this.ws.onopen = resolve;
          console.log("reconnected");
        });
      }

      console.log("sending...");

      const data = {
        top: this.top,
        left: this.left,
      };

      this.ws.send(
        JSON.stringify({
          command: "save",
          data,
          path: `${this.targetId}.json`,
        })
      )

      alert("送信しました");
    },
    close() {
      document.getElementById("caption-params").style.visibility = "hidden";
    }
  },
};

function getCaptionPosJson(id) {
  try {
    return require(`@/assets/caption-position-data/${id}.json`);
  } catch {
    return;
  }
}
</script>

<style scoped lang="scss">
#caption-position-setter {
  width: 50%;
  height: 10%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
}
#targetId_container {
  position: fixed;
  top: 0;
  left: 0;
}
#caption-params {
  // ここは適当
  padding: 2% 2%;
  width: 400px;
  position: fixed;
  top: 80px;
  left: 0;

  background-color: rgba(20, 20, 20, 0.5);
  border-radius: 1%;
  color: white;

  font-size: calc(15px + 10%);

  visibility: hidden;
}
.set_param {
  float: right;
  width: 50px;
}
#name {
  margin-bottom: 20px;
}
.param {
  margin-bottom: 15px;
}
input[type="range"] {
  width: 100%;
}
</style>
