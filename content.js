const body = document.querySelector('body');

const emoticons = ["😃", "😊", "😄", "😁", "😆", "😅"];
function getRandomEmoticon() {
  const randomIndex = Math.floor(Math.random() * emoticons.length);
  return emoticons[randomIndex];
}

function preprocess(txt) {
  var t = txt.replaceAll(/\s{2,}/g, ' ');
  t = t.replaceAll('\n', '');
  t = t.replaceAll('\t', '');
  return t;
}

const TagList = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'BODY', 'FORM'];
const pattern = /^[^ㄱ-ㅎ가-힣a-zA-Z]*$/;
let nodeList = [];
let contentList = [];

function getNodeList(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    if (!TagList.includes(element.parentElement.tagName)) {
      var t = preprocess(element.textContent);
      if (!t.match(pattern)) {
        nodeList.push(element); // element를 직접 저장
        contentList.push(t);
      }
    }
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    for (const child of element.childNodes) {
      getNodeList(child);
    }
  }
}

function ChangeTo(keyword) {
  nodeList.forEach(element => {
    const originalText = element.textContent;
    const regex = new RegExp(keyword, "gi");
    const newText = originalText.replace(regex, getRandomEmoticon());
    element.textContent = newText;
  });
}

function processPage() {
  chrome.storage.sync.get(["keywords"], function(result) {
    if (result.keywords && result.keywords.length > 0) {
      getNodeList(body);
      result.keywords.forEach(keyword => {
        ChangeTo(keyword);
      });
    }
  });
}

// 페이지 로드 및 스토리지 변경 시 실행
processPage();

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'keywords') {
      processPage(); // 키워드가 변경되면 페이지를 다시 처리합니다.
    }
  }
});
