/* 
* 1. Render playlist
* 2. Scroll top 
* 3. Play / Pause / Seek
* 4. CD rotate
* 5. Next / Prev
* 6. Random
* 7. Next / Repeat when end
* 8. Acitive Song
* 9. Scroll song when in to view
* 10. Play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "MUSIC_PLAYER";

const player = $('.player');
const cd = $('.cd');
const playList = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex : 0,
    currentTime: 0,
    isPlaying : false,
    isRandom: false,
    isRepeat: false,
    listRandomSongs: [],
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    setConfig (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY,JSON.stringify(this.config));
    },
    loadConfig () {
        this.isRandom = this.config.isRandom || this.isRandom;
        this.isRepeat = this.config.isRepeat || this.isRepeat;
        this.currentIndex = this.config.currentIndex || this.currentIndex;
        this.currentTime = this.config.currentTime || this.currentTime;
        // Hiển thị trạng thái ban đầu của buttom random và repeat
        repeatBtn.classList.toggle('active',this.isRepeat);
        randomBtn.classList.toggle('active',this.isRandom);


    },
    songs: [
      {
        name: "Muộn rồi mà sao còn",
        singer: "Sơn Tùng M-TP",
        path: "https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624",
        image: "https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg",
      },
      {
        name: "Sugar",
        singer: "Maroon 5",
        path: "https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644",
        image: "https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg",
      },
      {
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
    
      {
        name: "See You Again",
        singer: "Charlie Puth ft Wiz Khalifa",
        path: "https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094",
        image:
          "https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg",
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
      },
    ],

    render() {
       var htmls = this.songs.map((song, index) => {
            return `
                    <div data-index = ${index} class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="thumb" style="background-image: url('${song.image}')">
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
        })
        playList.innerHTML = htmls.join('');
    },

    defineProperties() {
        Object.defineProperty(this,'currentSong', {
            get:function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    // Lắng nghe sự kiện scroll và xử lý sự kiện
    handlerEvents() {
        const _this = this;

        // Xử lý CD thumb quay tròn
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations:Infinity,
        })
        cdThumbAnimate.pause();

        // Xử lý phóng to thu nhỏ CD
        const CdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = CdWidth - scroll;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 ;
        }

        // Xử lý khi click vào play
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi bài hát được Play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // Khi bài hát được Pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        let checkOnmouseAndTouch = true;
        progress.onmousedown = function() {
            checkOnmouseAndTouch = false;
        }

        progress.ontouchstart = function() {
            checkOnmouseAndTouch = false;
        }

        // Khi bài hát được tua
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;

            checkOnmouseAndTouch = true;
        }
        
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration && checkOnmouseAndTouch) {
                const progressPercent = audio.currentTime/audio.duration*100;
                progress.value = progressPercent;

                _this.setConfig("currentTime", audio.currentTime)
            }
            
        }

        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else{
                _this.nextSong()
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else{
                _this.prevSong()
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Xử lý bật/tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom",_this.isRandom);
            randomBtn.classList.toggle('active',_this.isRandom);
        }

        // Xử lý bật/tắt repeat song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat",_this.isRepeat);
            repeatBtn.classList.toggle('active',_this.isRepeat);
        }

        // Xử lý audio khi kết thúc
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // Lắng nghe sự kiện click vào playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            const optionNode = e.target.closest('.option');
            if(songNode || optionNode) {

                if(optionNode) {
                    console.log('Xử lý sự kiện khi click vào option')
                }
                //  xử lý sự kiện chuyển bài khi click vào bài hát trong playlist
                else
                {
                   _this.currentIndex = Number(songNode.dataset.index);
                   _this.loadCurrentSong();
                   _this.render();
                   audio.play();
                }
            }
        }
    },

    // load bài hát hiện tại
    loadCurrentSong () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        if(this.currentIndex == this.config.currentIndex) {
            audio.currentTime = this.config.currentTime;
        }else {
            audio.currentTime = 0;
        }
        
        this.setConfig("currentIndex", this.currentIndex)

    },

    nextSong () {
        this.currentIndex ++;
        
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong () {
        this.currentIndex --;
        
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong () {
        let songsIndex = [];
        if(this.listRandomSongs.length === 0) {
            for(let i = this.songs.length -1; i >= 0; i--) {
                songsIndex.push(i);
            }
            this.listRandomSongs = songsIndex.sort(() => { return 0.5 - Math.random()})
        }
        console.log(this.listRandomSongs);

        if(this.listRandomSongs.length > 0) {
            this.currentIndex = this.listRandomSongs.shift();
        }

        this.loadCurrentSong();
    },

    scrollToActiveSong () {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            })
        }, 300)
    },

    start() {
        // Load config
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // lắng nghe và xử lý các sự kiện
        this.handlerEvents();

        // tải thông tin bài hát đầu tiên khi chạy ứng dụng
        this.loadCurrentSong();

        // Tải Render playlist
        this.render();

    }
};


app.start();