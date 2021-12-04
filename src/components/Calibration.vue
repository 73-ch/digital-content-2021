<template>
  <div id="calibration">
    <div id="targetId_container">
      <p>キャリブレーション</p>
      <input v-model="targetId" placeholder="IDを入力" />
      <button @click="calibration">実行</button>
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
      <div id="perspective" class="param">
        <div>
          <label for="perspective">Perspective: </label>
          <span id="val_perspective">600</span><span>px</span>
        </div>
        <input
          type="range"
          id="range_perspective"
          min="0"
          max="1500"
          step="1"
          value="600"
        />
      </div>
      <div id="translate_x" class="param">
        <div>
          <label for="translate_x">Translate X: </label>
          <span id="val_translate_x">0</span><span>px</span>
        </div>
        <input
          type="range"
          id="range_translate_x"
          min="-1000"
          max="1000"
          step="1"
          value="0"
        />
      </div>
      <div id="translate_y" class="param">
        <div>
          <label for="translate_y">Translate Y: </label>
          <span id="val_translate_y">0</span><span>px</span>
        </div>
        <input
          type="range"
          id="range_translate_y"
          min="-1000"
          max="1000"
          step="1"
          value="0"
        />
      </div>
      <div id="rotate_x" class="param">
        <div>
          <label for="rotate_x">Rotate X: </label>
          <span id="val_rotate_x">0</span><span>deg</span>
        </div>
        <input
          type="range"
          id="range_rotate_x"
          min="-180"
          max="180"
          step="1"
          value="0"
        />
      </div>
      <div id="rotate_y" class="param">
        <div>
          <label for="rotate_y">Rotate Y: </label>
          <span id="val_rotate_y">0</span><span>deg</span>
        </div>
        <input
          type="range"
          id="range_rotate_y"
          min="-180"
          max="180"
          step="0.1"
          value="0"
        />
      </div>
      <div id="rotate_z" class="param">
        <div>
          <label for="rotate_y">Rotate Z: </label>
          <span id="val_rotate_z">0</span><span>deg</span>
        </div>
        <input
          type="range"
          id="range_rotate_z"
          min="-180"
          max="180"
          step="0.1"
          value="0"
        />
      </div>
      <div id="scale_x" class="param">
        <div>
          <label for="scale_x">Scale X: </label>
          <span id="val_scale_x">1</span>
        </div>
        <input
          type="range"
          id="range_scale_x"
          min="0"
          max="1"
          step="0.001"
          value="1.0"
        />
      </div>
      <div id="scale_y" class="param">
        <div>
          <label for="scale_y">Scale Y: </label>
          <span id="val_scale_y">1</span>
        </div>
        <input
          type="range"
          id="range_scale_y"
          min="0"
          max="1"
          step="0.001"
          value="1.0"
        />
      </div>
      <div id="scale_z" class="param">
        <div>
          <label for="scale_y">Scale Z: </label>
          <span id="val_scale_z">1</span>
        </div>
        <input
          type="range"
          id="range_scale_z"
          min="0"
          max="1"
          step="0.001"
          value="1.0"
        />
      </div>
      <button @click="exportJson">jsonに書き出す</button>
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
      ws: new WebSocket("ws://localhost:42330")
    };
  },
  methods: {
    calibration() {
      // キャリブレーションするエレメント
      let targetElement = document.getElementById(this.targetId);

      if (targetElement) {
        document.getElementById("params").style.visibility = "visible";
      } else {
        alert("IDが存在しません");
        return;
      }
      targetElement.style.opacity = "0.5";

      // ターゲットのvisibilityを扱うためのエレメント
      let view = document.getElementById("checkbox_view");

      // 全体を覆うコンテナを取得
      let container = document.getElementById("calibration");

      // キャリブレーションのパラメータ
      let params = {
        perspective: {
          eRange: document.getElementById("range_perspective"),
          eVal: document.getElementById("val_perspective"),
        },
        translateX: {
          eRange: document.getElementById("range_translate_x"),
          eVal: document.getElementById("val_translate_x"),
        },
        translateY: {
          eRange: document.getElementById("range_translate_y"),
          eVal: document.getElementById("val_translate_y"),
        },
        rotateX: {
          eRange: document.getElementById("range_rotate_x"),
          eVal: document.getElementById("val_rotate_x"),
        },
        rotateY: {
          eRange: document.getElementById("range_rotate_y"),
          eVal: document.getElementById("val_rotate_y"),
        },
        rotateZ: {
          eRange: document.getElementById("range_rotate_z"),
          eVal: document.getElementById("val_rotate_z"),
        },
        scaleX: {
          eRange: document.getElementById("range_scale_x"),
          eVal: document.getElementById("val_scale_x"),
        },
        scaleY: {
          eRange: document.getElementById("range_scale_y"),
          eVal: document.getElementById("val_scale_y"),
        },
        scaleZ: {
          eRange: document.getElementById("range_scale_z"),
          eVal: document.getElementById("val_scale_z"),
        },
      };

      // transformの値
      let string =
        "translate3d(" +
        params.translateX.eRange.value +
        "px," +
        params.translateY.eRange.value +
        "px, 0px) rotate3d(1, 0, 0," +
        params.rotateX.eRange.value +
        "deg) rotate3d(0, 1, 0," +
        params.rotateY.eRange.value +
        "deg) rotate3d(0, 0, 1, " +
        params.rotateZ.eRange.value +
        "deg) scale3d(" +
        params.scaleX.eRange.value +
        "," +
        params.scaleY.eRange.value +
        "," +
        params.scaleZ.eRange.value +
        ")";

      // 値の更新
      let updateValueAndView = function (elem, target) {
        target.innerHTML = elem.value;

        container.style.perspective = params.perspective.eRange.value + "px";

        string =
          "translate3d(" +
          params.translateX.eRange.value +
          "px," +
          params.translateY.eRange.value +
          "px, 0px) rotate3d(1, 0, 0," +
          params.rotateX.eRange.value +
          "deg) rotate3d(0, 1, 0," +
          params.rotateY.eRange.value +
          "deg) rotate3d(0, 0, 1, " +
          params.rotateZ.eRange.value +
          "deg) scale3d(" +
          params.scaleX.eRange.value +
          "," +
          params.scaleY.eRange.value +
          "," +
          params.scaleZ.eRange.value +
          ")";

        targetElement.style.transform = string;
      };

      // イベント追加
      for (let key in params) {
        params[key].eRange.addEventListener("input", function () {
          updateValueAndView(this, params[key].eVal);
        });

        updateValueAndView(params[key].eRange, params[key].eVal);
      }

      view.addEventListener("change", function () {
        if (this.checked) {
          targetElement.style.visibility = "visible";
        } else {
          targetElement.style.visibility = "hidden";
        }
      });
    },
    exportJson() {

      let targetElement = document.getElementById(this.targetId);
      targetElement.style.border = "none";
      targetElement.style.opacity = "1.0";

      document.getElementById("params").style.visibility = "hidden";
      
      this.ws.onopen = () => {
        const data = {
          perspective: JSON.stringify(this.params.perspective.eRange.value),
          translateX: JSON.stringify(this.params.translateX.eRange.value),
          translateY: JSON.stringify(this.params.translateY.eRange.value),
          rotateX: JSON.stringify(this.params.rotateX.eRange.value),
          rotateY: JSON.stringify(this.params.rotateY.eRange.value),
          rotateZ: JSON.stringify(this.params.rotateZ.eRange.value),
          scaleX: JSON.stringify(this.params.scaleX.eRange.value),
          scaleY: JSON.stringify(this.params.scaleY.eRange.value),
          scaleZ: JSON.stringify(this.params.scaleZ.eRange.value),
        };

        this.ws.send(JSON.stringify({
          command: "save",
          data,
          path: "tests.json"
        }));

        alert("送信しました");
      };

    }
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

  transform-style: preserve-3d;
  perspective: 600px;

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
  width: 300px;
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 1000;

  background-color: rgba(20, 20, 20, 0.95);
  border-radius: 1%;
  color: white;

  font-size: calc(15px + 10%);

  visibility: hidden;
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
