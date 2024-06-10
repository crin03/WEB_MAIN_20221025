var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = {
    center: new kakao.maps.LatLng(37.380467536921365, 126.92634042072459), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

 // 일반 지도와 스카이뷰로지도타입을전환할수있는지도타입컨트롤을생성
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을추가해야지도위에표시
// kakao.maps.ControlPosition은 컨트롤이 표시 위치 TOPRIGHT는 오른쪽 위를 의미
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를제어할수있는 줌컨트롤을생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);