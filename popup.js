document.getElementById("convertButton").addEventListener("click", function () {
    chrome.scripting.executeScript({
      target: { tabId: 1 },
      function: convertToEmoticon
    });
  });
  #hello를 이모티콘으로 변환하는 코드
  function convertToEmoticon() {
    let text = document.body.textContent;
    text = text.replace(/Hello/g, "😀");
    document.body.textContent = text;
  }
  
