import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchId] = useState("76561198365687138"); 
  const [inputValue, setInputValue] = useState("");
  const [activeAppId, setActiveAppId] = useState(null);

  const fetchData = (id) => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/stats/${id}/`)
      .then(res => {
        setData(res.data);
        if (res.data.top_10.length > 0) {
          setActiveAppId(res.data.top_10[0].appid);
        }
        setLoading(false);
      })
      .catch(err => {
        alert("ID를 찾을 수 없거나 프로필이 비공개입니다.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(searchId);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.length === 17) {
      fetchData(inputValue);
    } else {
      alert("17자리 숫자를 입력해주세요!");
    }
  };

  // 🔗 링크 이동 함수들
  const goToStore = (appid) => {
    window.open(`https://store.steampowered.com/app/${appid}`, '_blank');
  };

  const goToProfile = (steamId) => {
    window.open(`https://steamcommunity.com/profiles/${steamId}`, '_blank');
  };

  const bgImage = activeAppId 
  ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${activeAppId}/library_hero.jpg` 
  : '';

  return (
    <div 
      className="dashboard-wrapper" 
      style={{ 
        backgroundImage: bgImage ? `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url('${bgImage}')` : 'none',
        backgroundColor: '#0f172a',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
        <div className="dashboard-container">
          <div className="search-section">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="스팀 ID 입력..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">검색</button>
            </form>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">데이터를 불러오는 중...</p>
            </div>
          ) : data && (
            <>
              {/* 👤 유저 이름 클릭 시 프로필 이동 */}
              <h1 
                className="dashboard-title clickable" 
                onClick={() => goToProfile(searchId)}
              >
                🏆 {data.user.name}'s TOP 10
              </h1>
              
              <div className="game-grid">
                {data.top_10.map((game, index) => (
                  <div 
                    key={index} 
                    className={`game-card ${activeAppId === game.appid ? 'active' : ''}`}
                    onClick={() => setActiveAppId(game.appid)}
                  >
                    <div className="game-image-container">
                      <img src={game.image} alt={game.name} />
                      {/* 🛒 상점 바로가기 아이콘 버튼 */}
                      <div 
                        className="store-icon" 
                        onClick={(e) => {
                          e.stopPropagation(); // 배경 바뀌는 클릭 이벤트 방지
                          goToStore(game.appid);
                        }}
                        title="스팀 상점으로 이동"
                      >
                        🔗
                      </div>
                    </div>
                    <div className="game-info">
                      <h3 className="game-name">{game.name}</h3>
                      <p className="playtime-text">
                        <span className="playtime-number">{game.playtime_total}</span> Hours Played
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
    </div>
  );
}

export default App;