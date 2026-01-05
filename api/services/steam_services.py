import requests
import os
from dotenv import load_dotenv

load_dotenv()

class SteamService:
    BASE_URL = "http://api.steampowered.com"
    API_KEY = os.getenv("STEAM_API_KEY")

    @classmethod
    def get_user_info(cls, steam_id):
        """유저 프로필 정보 가져오기"""
        url = f"{cls.BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/"
        params = {"key": cls.API_KEY, "steamids": steam_id}
        res = requests.get(url, params=params)
        return res.json().get('response', {}).get('players', [None])[0]

    @classmethod
    def get_recently_played(cls, steam_id):
        """최근 2주간 플레이 기록"""
        url = f"{cls.BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/"
        params = {"key": cls.API_KEY, "steamid": steam_id}
        res = requests.get(url, params=params)
        return res.json().get('response', {}).get('games', [])
    
    @classmethod
    def get_all_owned_games(cls, steam_id):
        """보유한 모든 게임 목록 및 총 플레이 시간 가져오기"""
        url = f"{cls.BASE_URL}/IPlayerService/GetOwnedGames/v0001/"
        # include_appinfo: 게임 이름과 아이콘을 포함
        # include_played_free_games: 무료 게임 플레이 기록도 포함
        params = {
            "key": cls.API_KEY, 
            "steamid": steam_id, 
            "format": "json",
            "include_appinfo": True,
            "include_played_free_games": True
        }
        res = requests.get(url, params=params)
        return res.json().get('response', {}).get('games', [])
    
    @classmethod
    def get_game_price(cls, appid):
        """게임의 현재 가격 정보를 가져옵니다."""
        url = f"https://store.steampowered.com/api/appdetails?appids={appid}&cc=kr&l=korean"
        res = requests.get(url)
        data = res.json()
        
        if data and str(appid) in data and data[str(appid)]['success']:
            game_data = data[str(appid)]['data']
            if 'price_overview' in game_data:
                # 가격 정보를 '원' 단위로 반환
                return game_data['price_overview'].get('final', 0) // 100
        return 0