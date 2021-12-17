<template>
  <div id="calibration">
    <div id="targetId_container">
      <p style="background: black">キャリブレーション</p>
      <input v-model="targetId" placeholder="IDを入力" />
      <button @click="calibration">実行</button>
      <slot/>
    </div>
    <div id="params">
      <div id="name">Tag ID: {{ targetId }}</div>
      <div id="view" class="param">
        <label for="display">View</label>
        <input
          type="checkbox"
          id="checkbox_view"
          checked
          style="margin-left: 10px"
        />
      </div>
<!--      <p class="param">{{ computedTransform }}</p>-->
      <div id="translate_x" class="param">
        <div>
          <label for="translate_x">Translate X: </label>
          <span id="val_translate_x">{{ translateX }}</span
          ><span>px</span>
          <span><input type="text" v-model="setTranslateX" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_translate_x"
          min="-1500"
          max="1500"
          step="1"
          v-model="translateX"
        />
      </div>
      <div id="translate_y" class="param">
        <div>
          <label for="translate_y">Translate Y: </label>
          <span id="val_translate_y">{{ translateY }}</span
          ><span>px</span>
          <span><input type="text" v-model="setTranslateY" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_translate_y"
          min="-500"
          max="500"
          step="1"
          v-model="translateY"
        />
      </div>
      <div id="rotate_x" class="param">
        <div>
          <label for="rotate_x">Rotate X: </label>
          <span id="val_rotate_x">{{ rotateX }}</span
          ><span>deg</span>
          <span><input type="text" v-model="setRotateX" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_rotate_x"
          min="-180"
          max="180"
          step="0.1"
          v-model="rotateX"
        />
      </div>
      <div id="rotate_y" class="param">
        <div>
          <label for="rotate_y">Rotate Y: </label>
          <span id="val_rotate_y">{{ rotateY }}</span
          ><span>deg</span>
          <span><input type="text" v-model="setRotateY" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_rotate_y"
          min="-180"
          max="180"
          step="0.1"
          v-model="rotateY"
        />
      </div>
      <div id="rotate_z" class="param">
        <div>
          <label for="rotate_y">Rotate Z: </label>
          <span id="val_rotate_z">{{ rotateZ }}</span
          ><span>deg</span>
          <span><input type="text" v-model="setRotateZ" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_rotate_z"
          min="-180"
          max="180"
          step="0.1"
          v-model="rotateZ"
        />
      </div>
      <div id="scale_x" class="param">
        <div>
          <label for="scale_x">Scale X: </label>
          <span id="val_scale_x">{{ scaleX }}</span>
          <span><input type="text" v-model="setScaleX" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_scale_x"
          min="0"
          max="10"
          step="0.001"
          v-model="scaleX"
        />
      </div>
      <div id="scale_y" class="param">
        <div>
          <label for="scale_y">Scale Y: </label>
          <span id="val_scale_y">{{ scaleY }}</span>
          <span><input type="text" v-model="setScaleY" class="set_param"/></span>
        </div>
        <input
          type="range"
          id="range_scale_y"
          min="0"
          max="10"
          step="0.001"
          v-model="scaleY"
        />
      </div>
      <button @click="exportJson">jsonに書き出す</button>
    </div>
  </div>
</template>

<script>

function getTransformJson(id) {
  try {
    return require(`@/assets/calibration-data/${id}.json`);
  } catch {
    return;
  }
}

export default {
  data() {
    return {
      targetId: "",
      targetElement: null,
      params: {},
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scaleX: 1,
      scaleY: 1,
      ws: new WebSocket("ws://localhost:42330"),
    };
  },
  computed: {
    computedTransform() {
      let transformString = '';
      transformString += `translate3d(${this.translateX}px, ${this.translateY}px, ${this.translateZ}px) `;
      transformString += `rotate3d(1, 0, 0,${this.rotateX}deg) `;
      transformString += `rotate3d(0, 1, 0,${this.rotateY}deg) `;
      transformString += `rotate3d(0, 0, 1,${this.rotateZ}deg) `;
      transformString += `scale3d(${this.scaleX}, ${this.scaleY}, 1 ) `;
      return transformString;
    },
    setTranslateX: {
      get() {
        return this.translateX
      },
      set(value) {
        this.translateX = value
      }
    },
    setTranslateY: {
      get() {
        return this.translateY
      },
      set(value) {
        this.translateY = value
      }
    },
    setTranslateZ: {
      get() {
        return this.translateZ
      },
      set(value) {
        this.translateZ = value
      }
    },
    setRotateX: {
      get() {
        return this.rotateX
      },
      set(value) {
        this.rotateX = value
      }
    },
    setRotateY: {
      get() {
        return this.rotateY
      },
      set(value) {
        this.rotateY = value
      }
    },
    setRotateZ: {
      get() {
        return this.rotateZ
      },
      set(value) {
        this.rotateZ = value
      }
    },
    setScaleX: {
      get() {
        return this.scaleX
      },
      set(value) {
        this.scaleX = value
      }
    },
    setScaleY: {
      get() {
        return this.scaleY
      },
      set(value) {
        this.scaleY = value
      }
    }
  },
  watch: {
    computedTransform(value) {
      if (this.targetElement === null) return;
      this.targetElement.style.transform = value;
    },
  },
  methods: {
    calibration() {

      let transformJson = getTransformJson(this.targetId);

      if (transformJson) {
        this.translateX = transformJson.translateX;
        this.translateY = transformJson.translateY;
        this.translateZ = transformJson.translateZ;
        this.rotateX = transformJson.rotateX;
        this.rotateY = transformJson.rotateY;
        this.rotateZ = transformJson.rotateZ;
        this.scaleX = transformJson.scaleX;
        this.scaleY = transformJson.scaleY;
      }

      // キャリブレーションするエレメント
      let targetElement = document.getElementById(this.targetId);

      if (targetElement) {
        document.getElementById("params").style.visibility = "visible";
      } else {
        alert("IDが存在しません");
        return;
      }
      targetElement.style.opacity = "0.8";

      this.targetElement = targetElement;

      // ターゲットのvisibilityを扱うためのエレメント
      let view = document.getElementById("checkbox_view");

      view.addEventListener("change", function () {
        if (this.checked) {
          targetElement.style.visibility = "visible";
        } else {
          targetElement.style.visibility = "hidden";
        }
      });
    },
    async exportJson() {
      if (this.ws.readyState !== 1) {
        console.error(
          "websocket connection error. status: ",
          ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState]
        );
        this.ws = new WebSocket("ws://localhost:42330");
        console.log("reconnecting...");
        await new Promise((resolve) => {
          this.ws.onopen = resolve;
          console.log("reconnected");
        });
      }

      console.log("sending...");

      const data = {
        transformString: this.computedTransform,
        translateX: this.translateX,
        translateY: this.translateY,
        translateZ: this.translateZ,
        rotateX: this.rotateX,
        rotateY: this.rotateY,
        rotateZ: this.rotateZ,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
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
  },
};
</script>

<style scoped lang="scss">
#calibration {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
}
#targetId_container {
  margin-top: 10px;
  position: fixed;
  right: 10px;
}
#params {
  // ここは適当
  padding: 2% 2%;
  width: 400px;
  position: fixed;
  top: -80px;
  right: 0;

  background-color: rgba(20, 20, 20, 0.1);
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
