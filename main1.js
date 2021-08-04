const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const PlAYER_STORAGE_KEY = "MUSIC_PLAYER";

const headings = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playlist = $(".playlist");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const player = $(".player");
const progress = $("#progress");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

  songs: [
    {
      name: "Muộn rồi mà sao còn",
      singer: "Sơn Tùng M-TP",
      path: "https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624",
      image: "https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg",
    },
    {
      name: "Tự tình",
      singer: "Quang Huy",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui986/TuTinh-QuangHuy-6026204.mp3?st=j0_iz1ts1DFi7XgXpukHig&e=1626620369&download=true",
      image: "https://avatar-ex-swe.nixcdn.com/song/2019/07/16/8/2/6/1/1563253517624.jpg",
    },
    {
      name: "Giữ riêng anh",
      singer: "Thanh Bình",
      path: "https://data3.chiasenhac.com/downloads/2115/5/2114276-5127e53f/128/Giu%20Rieng%20Anh%20-%20Thanh%20Binh.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/0/1/8/c018910035078e0da32aab5242783f86.jpg",
    },
    {
      name: "Em hãy yêu một người",
      singer: "Thanh Bình",
      path: "https://f9-stream.nixcdn.com/NhacCuaTui1017/EmHayYeuMotNguoi-ThanhBinhTre-7036064.mp3?st=yCrX5u8oNwErv-74HMtTRQ&e=1627094983&download=true",
      image:
        "https://i.scdn.co/image/ab67616d0000b273cef4caa3efbb2b6a7213868d",
    },
    {
      name: "Shape of You",
      singer: "Ed Sheeran",
      path: "https://aredir.nixcdn.com/NhacCuaTui945/ShapeOfYou-AlexGootAndieCase-5076956.mp3?st=9I9Z2TBGWNOnQRfIJDomDA&e=1623138210",
      image:
        "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/09/a0/64/09a0641c-e5fa-407e-9829-47702358ec72/190295819972.jpg/1200x1200bf-60.jpg",
    },
    {
      name: "Symphony",
      singer: "Clean Bandit",
      path: "https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426",
      image: "https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg",
    },
    {
      name: "Waiting For Love",
      singer: "Avicii",
      path: "https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462",
      image: "https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg",
    },
    {
      name: "Alone",
      singer: "Marshmello",
      path: "https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502",
      image: "https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg",
    },
    {
      name: "Something Just Like This",
      singer: "The Chainsmokers & Coldplay",
      path: "https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg",
    },{
      name: "Nevada",
      singer: "Vicetone",
      path: "https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773",
      image:
        "https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg",
    },
    {
      name: "Light It Up",
      singer: "Robin Hustin x TobiMorrow",
      path: "https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg",
    },
    {
      name: "Yoru ni kakeru",
      singer: "YOASOBI",
      path: "https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179",
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0",
    },

  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.getItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const html = this.songs.map((song, index) => {
      return `        
             
              <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
              <div class="thumb" style="background-image: 
              url('${song.image}')">
              </div>
              <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
            `;
    });
    playlist.innerHTML = html.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this; // Đe chọn được this ben ngoài để vào trong xử lí
    const cdWidth = cd.offsetWidth;

    //Xu li phong to thu nho cd
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      // console.log(scroll);
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //xu li  CD quay/dung
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], { //doi so truyen vao de dieu khien 
      duration: 10000, // 10s
      iterations: Infinity, // thiet lap vong lap
    });
    cdThumbAnimate.pause();

    // xu li khi click play
    playBtn.onclick = function () {
      // if(_this.isPlaying){
      //     _this.isPlaying=false;
      //     audio.play();
      //     player.classList.remove("playing");

      // }else{
      //     _this.isPlaying=true;
      //     audio.pause();
      //     player.classList.add("playing");
      // }
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //khi song duoc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    //khi song pause play
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    //khi tien do bai hat thay doi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //xu li khi tua song

  //   progress.oninput = function(e) {
  //     audio.currentTime = (audio.duration / 100) * e.target.value
  //     audio.currentTime = seekTime;

  // }
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    
    // khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }

      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //khi play random songs
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    //Xu li phat lai bai hat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);

      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //xu li khi het bai hat
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Lắng nghe sự kiện click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      const optionNode = e.target.closest(".option");
      //xu li khi click vao song
      if (songNode || optionNode) {
        // console.log(songNode.getAttribute('data-index'))
        console.log(songNode.dataset.index);
        if (optionNode) {
          console.log("Xử lý sự kiện khi click vào option");
        } else {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      }
    };
  },
  scrollToActiveSong() {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    // console.log(headings,cdThumb,audio);
    headings.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
      this.isRandom= this.config.isRandom
      this.isRepeat= this.config.isRepeat
      //Object.assign(this,this.config) ko an toan khi nhhieu du lieu
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    //gan cau hinh tu config vao ung dung
    this.loadConfig();
    // this ở ngoài tương đương app.defineProperties();
    //Định nghĩa các thuộc tính cho object
    this.defineProperties();

    //Lắng nghe/ xử ý sự kiện (DOM EVENT)
    this.handleEvent();

    //Tải thông tin bài hát đầu tiên vào UI khi chạy app
    this.loadCurrentSong();
    //render playlist
    this.render();
    // hien thi trang thai ban dau cua button repeat va ran dom
    randomBtn.classList.toggle("active", _this.isRandom);

    repeatBtn.classList.toggle("active", _this.isRepeat);
  },
};
app.start();
