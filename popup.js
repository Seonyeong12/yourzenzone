// popup.js

document.getElementById("convertButton").addEventListener("click", function () {
  classifyAndReplace(); // content.js에서의 기존 로직을 트리거합니다
});

// updateHtml 액션을 처리하기 위한 리스너를 추가합니다
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateHtml") {
    updateHtmlOnPage(request.htmlInfo);
  }
});

function updateHtmlOnPage(htmlInfo) {
  // 웹 페이지의 HTML을 업데이트하기 위한 플레이스홀더
  // 받은 HTML 정보로 웹 페이지를 업데이트하는 실제 코드로 대체하세요 
  console.log("웹 페이지의 HTML을 업데이트 중:", htmlInfo);
  document.body.innerHTML = htmlInfo;
    //이는 웹 페이지를 간단히 업데이트하는 방법 중 하나이지만, 모든 시나리오에 적합하지 않을 수 있습니다.
}

// 필요한 경우 추가적인 함수 또는 로직을 추가하세요
//content.js에서 문장 단위로 parse하기 위한 버튼
//후에 버튼 이름을 수정하거나, 필터링 버튼을 눌렀을 때 자동으로 같이 진행되도록 변경 필요해보임.
// content.js에서의 HTML 파싱 기능을 트리거합니다
document.getElementById('parseButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'parseHTML' });
  });
});
