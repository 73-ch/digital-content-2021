<template>
  <div class="modal">
    <div class="modal-board">
      <div class="modal-board__message">
        <p>ディジコン制作展2021 -Beyond Internet- は、2月23日18時を持ちまして終了致しました。</p>
        <p>アーカイブの公開を予定しております。</p>
        <p>しばらくお待ちください。</p>
      </div>
    </div>
    <div class="modal-background" />
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 110;
  &-board {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1100px;
    height: 600px;
    background-color: #cccccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &__message {
      width: 80%;
      font-size: 32px;
    }
  }
  &-background {
    width: 100%;
    height: 100%;
    background-color: #00000044;
  }
}
</style>
