
import { useState, useRef, useEffect } from "react";
import "./App.css";

const songs = [
  { id: 1, title: "Dreams", artist: "Luna", mood: "Chill", emoji: "🌙", color: "pink", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Golden Hour", artist: "Sofia", mood: "Happy", emoji: "☀️", color: "orange", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Midnight", artist: "Alex", mood: "Sad", emoji: "🌌", color: "purple", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 4, title: "Sweet Love", artist: "Mia", mood: "Romantic", emoji: "💗", color: "rose", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 5, title: "Sunshine", artist: "Lily", mood: "Happy", emoji: "🌸", color: "yellow", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: 6, title: "Afterglow", artist: "Noah", mood: "Chill", emoji: "🦋", color: "blue", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
];

const reviews = [
  { name: "Аружан", text: "Сайттың дизайны өте әдемі! Музыка тыңдауға ыңғайлы." },
  { name: "Мадина", text: "Маған әндерді көңіл күйге қарай таңдаған ұнайды!" },
  { name: "Айша", text: "Өте керемет музыкалық атмосфера! 💜" }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("Барлығы");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const song = songs[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, current]);

  const nextSong = () => {
    setCurrent(prev => (prev + 1) % songs.length);
    setPlaying(true);
    setProgress(0);
  };

  const previousSong = () => {
    setCurrent(prev => (prev - 1 + songs.length) % songs.length);
    setPlaying(true);
    setProgress(0);
  };

  const selectSong = index => {
    setCurrent(index);
    setPlaying(true);
    setProgress(0);
  };

  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredSongs = songs.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.artist.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && (mood === "Барлығы" || item.mood === mood);
  });

  const formatTime = time => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const sendMessage = e => {
    e.preventDefault();
    alert("Хабарламаңызға рақмет! 💜");
    e.target.reset();
  };

  return (
    <div className="app">
      <audio
        ref={audioRef}
        src={song.src}
        onTimeUpdate={e => setProgress(e.target.currentTime)}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onEnded={nextSong}
      />

      <header className="navbar">
        <a href="#home" className="logo">♫ <span>music</span>mood</a>

        <nav>
          <a href="#home">Басты бет</a>
          <a href="#discover">Музыка</a>
          <a href="#about">Біз туралы</a>
          <a href="#reviews">Пікірлер</a>
          <a href="#contact">Байланыс</a>
        </nav>

        <a href="#favorites" className="profile">♡ Таңдаулылар</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">✦ СЕНІҢ МУЗЫКАЛЫҚ ӘЛЕМІҢ ✦</span>
            <h1>Әр сәтіңе<br /><span>әуен сыйла.</span></h1>
            <p>
              Әр көңіл күйге арналған музыка.
              Өзіңе ұнайтын әндерді тап және ерекше
              сәттеріңді әуенмен толықтыр.
            </p>
            <a href="#discover" className="explore-btn">
              Музыканы тыңдау <span>→</span>
            </a>
            <div className="hero-note">♡ Музыка — жанның үні</div>
          </div>

          <div className="hero-art">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="hero-disc">♫</div>
            <span className="star star-one">✦</span>
            <span className="star star-two">✧</span>
            <span className="hero-heart">♡</span>
            <div className="floating-note">♪</div>
          </div>
        </section>

        <section className="discover" id="discover">
          <div className="section-title">
            <div>
              <span className="eyebrow">ӨЗ ӘУЕНІҢДІ ТАП</span>
              <h2>Музыка <span>әлемі</span></h2>
            </div>
            <p>Әр әннің өз тарихы бар. ♡</p>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              placeholder="Ән немесе орындаушыны іздеу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="mood-filters">
            {["Барлығы", "Chill", "Happy", "Sad", "Romantic"].map(item => (
              <button
                key={item}
                className={mood === item ? "selected" : ""}
                onClick={() => setMood(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="song-grid">
            {filteredSongs.map(item => {
              const index = songs.findIndex(s => s.id === item.id);

              return (
                <div className="song-card" key={item.id}>
                  <div className={`cover ${item.color}`}>
                    <span>{item.emoji}</span>
                    <button className="card-play" onClick={() => selectSong(index)}>
                      ▶
                    </button>
                  </div>

                  <div className="song-info">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.artist} · {item.mood}</p>
                    </div>
                    <button
                      className={`favorite ${favorites.includes(item.id) ? "liked" : ""}`}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      {favorites.includes(item.id) ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSongs.length === 0 && (
            <p className="empty">Ән табылмады. Басқа сөзбен іздеп көр ♡</p>
          )}
        </section>

        <section className="favorites-section" id="favorites">
          <span className="eyebrow">СЕНІҢ ЖИНАҒЫҢ</span>
          <h2>Таңдаулы <span>әндерің</span> ♡</h2>
          <p>
            {favorites.length === 0
              ? "Ұнаған әндеріңді жүрек белгісін басып, осы жерге сақтай аласың."
              : `Сенің таңдаулы әндерің: ${favorites.length}`}
          </p>

          <div className="favorite-list">
            {songs.filter(item => favorites.includes(item.id)).map(item => (
              <button
                key={item.id}
                className="favorite-song"
                onClick={() => selectSong(songs.findIndex(s => s.id === item.id))}
              >
                <span>{item.emoji} {item.title}</span>
                <span>▶</span>
              </button>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">БІЗ ТУРАЛЫ</span>
          <h2>Music Mood — <span>сенің музыкалық әлемің</span> ♡</h2>
          <p className="about-description">
            Music Mood — музыка тыңдауды жақсы көретін адамдарға
            арналған жеке веб-жоба. Біздің мақсатымыз — әр адамның
            көңіл күйіне сай әуен табуына көмектесу және музыка
            арқылы жағымды атмосфера сыйлау.
          </p>

          <div className="about-cards">
            <div>
              <span>🎧</span>
              <h3>Музыка әлемі</h3>
              <p>Әр көңіл күйге арналған әндер.</p>
            </div>
            <div>
              <span>💜</span>
              <h3>Ерекше атмосфера</h3>
              <p>Өзіңе ұнайтын музыкалық кеңістік.</p>
            </div>
            <div>
              <span>✨</span>
              <h3>Жақсы көңіл күй</h3>
              <p>Музыкамен әр күніңді әсемде.</p>
            </div>
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <span className="eyebrow">ҚОЛДАНУШЫЛАР ПІКІРІ</span>
          <h2>Олар не <span>дейді?</span></h2>

          <div className="review-grid">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="stars">★★★★★</div>
                <p>«{review.text}»</p>
                <h4>{review.name}</h4>
              </div>
            ))}
          </div>
          <p className="review-note">Бұл — сайтты көрсетуге арналған үлгі пікірлер.</p>
        </section>

        <section className="contact-section" id="contact">
          <span className="eyebrow">БІЗБЕН БАЙЛАНЫС</span>
          <h2>Байланыста <span>болайық!</span> 💌</h2>
          <p className="contact-intro">
            Сұрақтарың немесе ұсыныстарың болса, бізге хабарлама жібер!
          </p>

          <div className="contact-layout">
            <div className="contact-details">
              <div>📍 <strong>Мекенжай:</strong><br />Қазақстан, Алматы қаласы</div>
              <div>📞 <strong>Телефон:</strong><br />+7 (700) 000-00-00</div>
              <div>✉️ <strong>Email:</strong><br />musicmood@gmail.com</div>
              <div>📷 <strong>Instagram:</strong><br />@musicmood</div>
            </div>

            <form className="contact-form" onSubmit={sendMessage}>
              <h3>Бізге хабарлама жібер 💜</h3>

              <label>Атыңыз</label>
              <input type="text" placeholder="Атыңызды жазыңыз" required />

              <label>Email</label>
              <input type="email" placeholder="Email мекенжайыңыз" required />

              <label>Хабарлама</label>
              <textarea
                placeholder="Хабарламаңызды жазыңыз..."
                rows="5"
                required
              />

              <button type="submit">Жіберу →</button>
            </form>
          </div>
        </section>
      </main>

      <div className="music-player">
        <div className="now-playing">
          <div className={`mini-cover ${song.color}`}>{song.emoji}</div>
          <div>
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
          <button
            className={`player-heart ${favorites.includes(song.id) ? "liked" : ""}`}
            onClick={() => toggleFavorite(song.id)}
          >
            {favorites.includes(song.id) ? "♥" : "♡"}
          </button>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button onClick={previousSong}>↶</button>
            <button className="play-main" onClick={() => setPlaying(!playing)}>
              {playing ? "Ⅱ" : "▶"}
            </button>
            <button onClick={nextSong}>↷</button>
          </div>

          <div className="progress-area">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={Math.min(progress, duration || 100)}
              onChange={e => {
                const value = Number(e.target.value);
                if (audioRef.current) audioRef.current.currentTime = value;
                setProgress(value);
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-label">♫ <span>Тек жақсы әуендер</span></div>
      </div>

      <footer>
        <a href="#home" className="logo">♫ <span>music</span>mood</a>
        <p>Музыка — жүректің тілі. ♡</p>
        <p>Жоба авторы: Өз атыңды жаз</p>
        <span>© 2026 Music Mood. Барлық құқықтар қорғалған.</span>
      </footer>
    </div>
  );
}

export default App;

