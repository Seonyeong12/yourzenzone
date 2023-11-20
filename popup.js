//카테고리 체크박스 내용 저장 및 전송
const checkboxes = document.querySelectorAll('.category_check');

function getCheckedOptions() {
  // 체크된 체크박스 요소들을 선택
  const checkboxStatus = [];
  // 각 체크박스의 값을 배열에 추가
  checkboxes.forEach(checkbox => {
    checkboxStatus.push(checkbox.checked);
  });
  // 배열 출력
  console.log('Checkbox Status:', checkboxStatus);
  chrome.storage.sync.set({checkboxStatus : checkboxStatus});
  return checkboxStatus
}

chrome.storage.sync.get(['checkboxStatus'], function(result) {
  for (let i = 0; i < Math.min(checkboxes.length); i++) {
    checkboxes[i].checked = result.checkboxStatus[i];
  };
});



checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    window.localStorage.setItem(checkbox.id, checkbox.checked);
    getCheckedOptions(); 
  });
});


//필터링 키워드 적용
var keywordInput = document.getElementsByClassName('form__input');
const keyword_btn = document.getElementById('addKeyword');
const del_btn = document.getElementById('delKeyword');
var keywords = JSON.parse(window.localStorage.getItem('keywords'));
//document.getElementById("keywords").innerText = keywords;

if (keywords) {
  var keywords = JSON.parse(window.localStorage.getItem('keywords'));
} 
else {
  var keywords = []
}
keywordInput[0].value = keywords;

function saveKeywords(keywords){
  window.localStorage.setItem('keywords', JSON.stringify(keywords));
  chrome.storage.sync.set({keywords : keywords});
  console.log(keywords);
  document.getElementById("keywords").innerText = keywords;
}

keyword_btn.addEventListener('click', function(){
  //console.log(keywordInput);
  var keyword = keywordInput[0].value;
  keywords = keyword.split(',');
  saveKeywords(keywords);
});

// del_btn.addEventListener('click', function(){
//   var keyword = keywordInput[0].value;
//   keywords = keywords.filter(item => item !== keyword);
//   saveKeywords(keywords);
//   keywordInput[0].value = '';
// });