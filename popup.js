// popup.js

document.getElementById("convertButton").addEventListener("click", function () {
  // content.js에 웹 페이지 분석을 요청
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'parseHTML' });
  });
});

// updateHtml 액션을 처리하기 위한 리스너를 추가합니다 인데 아래 updateHtml 이 request.action일 경우가 나뉜 부분이 있음. 뭐가 맞는지 모르겠어서 둘 다 남겨둠...
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
// content.js에서 최종 결과를 받아와 혐오 표현을 랜덤 이모티콘으로 대체하고 웹 페이지를 업데이트하는 함수

// updateHtml 액션을 처리하기 위한 리스너를 추가합니다
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateHtml") {
    updateHtmlOnPage(request.htmlInfo);
  } else if (request.action === 'displaySentences') {
    const labeledSentences = request.sentences;
    // 수정된 부분: 혐오 표현을 랜덤 이모티콘으로 대체하고 웹 페이지를 업데이트하는 함수 호출
    replaceHateSentencesWithEmoticons(labeledSentences);
    sendUpdatedHtmlToWebPage();
  }
});


// 최종 결과에서 혐오 표현을 랜덤 이모티콘으로 대체하는 함수
function replaceHateSentencesWithEmoticons(labeledSentences) {
  let updatedHtml = document.documentElement.outerHTML;

  for (const labeledSentence of labeledSentences) {
    const { sentence, label } = labeledSentence;
    if (label === 'hate speech' || label === 'offensive term') {
      const replacedSentence = sentence.replace(regex, getRandomEmoticon());
      updatedHtml = updatedHtml.replace(sentence, replacedSentence);
    }
  }

  // HTML을 한 번에 업데이트
  document.body.innerHTML = updatedHtml;
}
// 변경된 HTML 정보를 다시 웹 페이지로 전송하는 함수
function sendUpdatedHtmlToWebPage() {
  const updatedHtml = document.documentElement.outerHTML;
  chrome.runtime.sendMessage({ action: "updateHtml", htmlInfo: updatedHtml });
}


  //hello를 이모티콘으로 변환하는 코드
  function convertToEmoticon() {
    let text = document.body.textContent;
    text = text.replace(/Hello/g, "😀");
    document.body.textContent = text;
  }
  


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

  return checkboxStatus
}

getCheckedOptions()
  
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    getCheckedOptions()
  });
});