var vm = new Vue({
  el: ".main",
  data: {
    time: 0,
    timer: null,
    isWorking: false,
    soundList: {},
    ext1: false,
    ext2: false,
  },
  created() {
    // 設定値の取得する？？
  },
  computed: {
    pause() {
      if (!this.timer && this.time > 0) {
        return "再開！";
      } else {
        return "一時停止";
      }
    },
    realTime() {
      if (this.time > 60) {
        let seconds = (this.time - 60).toFixed(0);
        return (
          (seconds >= 10 ? "1:" : "1:0") +
          // (Math.floor(seconds * Math.pow(10, 1)) / Math.pow(10, 1)).toFixed(1)
          seconds
        );
      } else {
        // return (
        //   Math.floor(this.time * Math.pow(10, 1)) / Math.pow(10, 1)
        // ).toFixed(1);
        return this.time.toFixed(0);
      }
    },
  },
  methods: {
    stopTimer() {
      this.loadSound();
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.isWorking = false;
        if (this.time < 10.5) {
          this.soundList["sounds_last10"].pause();
        }
        this.play("sounds_stop");
      } else {
        this.startTimer();
        if (this.time < 10.5) {
          // 流れ続けるバグを回避するため
          if (
            this.soundList["sounds_last10"].duration >
            this.soundList["sounds_last10"].currentTime
          ) {
            this.soundList["sounds_last10"].play();
          }
        }
      }
    },
    start30() {
      this.loadSound();
      this.time = 30;
      this.startTimer();
      this.play("sounds_pipipi");
    },
    start1Minute() {
      this.loadSound();
      this.time = 60;
      this.startTimer();
      this.play("sounds_pipipi");
    },
    extension1() {
      this.ext1 = true;
      if (this.time < 10.5) {
        this.soundList["sounds_last10"].pause();
      }
      this.time += 30;
      this.startTimer();
    },
    extension2() {
      this.ext2 = true;
      if (this.time < 10.5) {
        this.soundList["sounds_last10"].pause();
      }
      this.time += 30;
      this.startTimer();
    },
    countdown(diff) {
      if (this.time > 0.1) {
        this.time -= diff;
      } else {
        // 終了処理
        this.time = 0;
        this.isWorking = false;
        clearInterval(this.timer);
        this.timer = null;
      }
      this.sound();
    },
    loadSound() {
      if (!this.soundList || !this.soundList.sounds_last10) {
        // クリックをキーにしてロードしないと再生できない
        this.soundList.sounds_last10 = new Audio("sounds/10-01.mp3");
        this.soundList.sounds_last30 = new Audio("sounds/30byoumae.mp3");
        this.soundList.sounds_last60 = new Audio("sounds/timer_1punmae_01.mp3");
        // this.soundList.sounds_last1 = new Audio("sounds/num001_01.mp3");
        // this.soundList.sounds_last2 = new Audio("sounds/num002_01.mp3");
        // this.soundList.sounds_last3 = new Audio("sounds/num003_01.mp3");
        // this.soundList.sounds_last4 = new Audio("sounds/num004_01.mp3");
        // this.soundList.sounds_last5 = new Audio("sounds/num005_01.mp3");
        this.soundList.sounds_jikandesu = new Audio("sounds/jikandeesu_01.mp3");
        this.soundList.sounds_sokomade = new Audio("sounds/sokomade_01.mp3");
        this.soundList.sounds_stop = new Audio("sounds/stop.mp3");
        this.soundList.sounds_pipipi = new Audio("sounds/pipipi.mp3");
      }
    },
    startTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.countdown, 100, 0.1);
        // this.timer = setInterval(this.countdown, 1000, 1);
      } else {
        clearInterval(this.timer);
        this.timer = setInterval(this.countdown, 100, 0.1);
        // this.timer = setInterval(this.countdown, 1000, 1);
      }
      this.isWorking = true;
    },
    sound() {
      if (!this.isWorking) return;
      let roundOffTime =
        Math.floor(this.time * Math.pow(10, 1)) / Math.pow(10, 1);
      if (roundOffTime == 60.0) {
        console.log("60秒前");
        this.play("sounds_last60");
      } else if (roundOffTime == 30.0) {
        console.log("30秒前");
        this.play("sounds_last30");
      } else if (roundOffTime == 10.5) {
        // 言い始めるのが遅いので
        console.log("10秒前");
        this.play("sounds_last10");
      } else if (roundOffTime == 0.0) {
        console.log("時間でーす");
        this.play("sounds_jikandesu");
      }
    },
    play(name) {
      this.soundList[name].currentTime = 0;
      this.soundList[name].play();
    },
    // エクステンションをリセットする
    reset() {
      this.ext1 = false;
      this.ext2 = false;
    },
  },
});
