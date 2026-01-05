from django.http import JsonResponse
from .services.steam_services import SteamService

def user_stats_view(request, steam_id):
    user_info = SteamService.get_user_info(steam_id)
    all_games = SteamService.get_all_owned_games(steam_id)

    if not user_info:
        return JsonResponse({"error": "User not found"}, status=404)

    # 1. 플레이 시간 기준 내림차순 정렬 후 상위 10개 추출
    top_10_games = sorted(
        all_games, 
        key=lambda x: x.get('playtime_forever', 0), 
        reverse=True
    )[:10]

    top_10_with_details = []
    total_spent = 0

    # 2. 각 게임별로 가격 정보를 가져와서 가성비 계산
    for game in top_10_games:
        price = SteamService.get_game_price(game['appid']) 
        total_spent += price
        
        playtime_hrs = round(game['playtime_forever'] / 60, 1)
        
        cost_per_hour = 0
        if playtime_hrs > 0:
            cost_per_hour = round(price / playtime_hrs)

        top_10_with_details.append({
            "appid": game['appid'], # 배경 이미지를 불러오기 위한 핵심 데이터
            "name": game['name'],
            "playtime_total": playtime_hrs,
            "image": f"https://cdn.akamai.steamstatic.com/steam/apps/{game['appid']}/header.jpg",
            "price": price,
            "cost_per_hour": cost_per_hour
        })

    data = {
        "user": {
            "name": user_info.get('personaname'),
            "avatar": user_info.get('avatarfull'),
        },
        "top_10": top_10_with_details,
        "total_spent": total_spent 
    }
    
    return JsonResponse(data)