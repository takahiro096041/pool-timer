var vm = new Vue({
  el: ".main",
  data: {
    time: 0,
    timer: null,
    isWorking: false,
    sounds_last10: new Audio("sounds/10byoumae.wav"),
    sounds_last30: new Audio("sounds/30byoumae.wav"),
    sounds_last60: new Audio("sounds/timer_1punmae_01.wav"),
    sounds_last1: new Audio("sounds/num001_01.wav"),
    sounds_last2: new Audio("sounds/num002_01.wav"),
    sounds_last3: new Audio("sounds/num003_01.wav"),
    sounds_last4: new Audio("sounds/num004_01.wav"),
    sounds_last5: new Audio("sounds/num005_01.wav"),
    sounds_jikandesu: new Audio("sounds/jikandeesu_01.wav"),
    // TODO そこまでを採用するのか？？
    sounds_sokomade: new Audio("sounds/sokomade_01.wav"),
  },
  created() {
    // 設定値の取得
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
        let seconds = this.time - 60;
        return (
          (seconds >= 10 ? "1:" : "1:0") +
          (Math.floor(seconds * Math.pow(10, 1)) / Math.pow(10, 1)).toFixed(1)
        );
      } else {
        return (
          Math.floor(this.time * Math.pow(10, 1)) / Math.pow(10, 1)
        ).toFixed(1);
      }
    },
  },
  methods: {
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.isWorking = false;
      } else {
        this.startTimer();
      }
    },
    start30() {
      this.time = 30;
      this.startTimer();
    },
    start1Minute() {
      this.time = 60;
      this.startTimer();
    },
    start1_5Minute() {
      this.time = 90;
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
    startTimer() {
      if (!this.timer) {
        this.timer = setInterval(this.countdown, 100, 0.1);
      } else {
        clearInterval(this.timer);
        this.timer = setInterval(this.countdown, 100, 0.1);
      }
      this.isWorking = true;
    },
    sound() {
      if (!this.isWorking) return;
      let roundOffTime =
        Math.floor(this.time * Math.pow(10, 1)) / Math.pow(10, 1);
      if (roundOffTime == 60.0) {
        console.log("60秒前");
        this.sounds_last60.currentTime = 0;
        this.sounds_last60.play();
      } else if (roundOffTime == 30.0) {
        console.log("30秒前");
        this.sounds_last30.currentTime = 0;
        this.sounds_last30.play();
      } else if (roundOffTime == 10.0) {
        console.log("10秒前");
        this.sounds_last10.currentTime = 0;
        this.sounds_last10.play();
      } else if (roundOffTime == 5.0) {
        console.log("5秒前");
        this.sounds_last5.currentTime = 0;
        this.sounds_last5.play();
      } else if (roundOffTime == 4.0) {
        console.log("4秒前");
        this.sounds_last4.currentTime = 0;
        this.sounds_last4.play();
      } else if (roundOffTime == 3.0) {
        console.log("3秒前");
        this.sounds_last3.currentTime = 0;
        this.sounds_last3.play();
      } else if (roundOffTime == 2.0) {
        console.log("2秒前");
        this.sounds_last2.currentTime = 0;
        this.sounds_last2.play();
      } else if (roundOffTime == 1.0) {
        console.log("1秒前");
        this.sounds_last1.currentTime = 0;
        this.sounds_last1.play();
      } else if (roundOffTime == 0.0) {
        console.log("そこまで！");
        this.sounds_jikandesu.currentTime = 0;
        this.sounds_jikandesu.play();
      }
    },
  },
});
