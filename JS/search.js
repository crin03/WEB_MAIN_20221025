document.getElementById("search_button_msg").addEventListener('click', search_message);

let m = "검색을 수행합니다!"

function search_message(){
    alert(m);
}

/*

function search_message(){
    alert("검색을 수행합니다!2222");
} 
// 같은 이름의 함수를 중첩하면 에러가 아닌 더 나중에 선언된 함수가 실행된다

*/

