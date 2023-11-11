document.getElementById("convertButton").addEventListener("click", function () {
    chrome.scripting.executeScript({
      target: { tabId: 1 },
      function: convertToEmoticon
    });
  });

//content.js에서 문장 단위로 parse하기 위한 버튼
//후에 버튼 이름을 수정하거나, 필터링 버튼을 눌렀을 때 자동으로 같이 진행되도록 변경 필요해보임.
document.getElementById('parseButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'parseHTML' });
  });
});

  //hello를 이모티콘으로 변환하는 코드
  function convertToEmoticon() {
    let text = document.body.textContent;
    text = text.replace(/Hello/g, "😀");
    document.body.textContent = text;
  }
  
