const body = document.querySelector('body');
''
const emoticons = ["😃", "😊", "😄", "😁", "😆", "😅","😸","🐶", "🐺", "🦊", "🐻‍❄️", "🐭", "🐋", "❤️", "🧡", '💛', '💚', '💙', "💜"];
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
const pattern = /^[^ㄱ-ㅎ가-힣]*$/;
let nodeList = [];
let contentList = [];
function getNodeList(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    if (!TagList.includes(element.parentElement.tagName)) {
      var t = preprocess(element.textContent);
      if (!t.match(pattern) && t.length > 5) {
        nodeList.push(element); // element를 직접 저장
        contentList.push(t);
        //console.log(typeof(t));
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
    const regex = new RegExp(keyword);
    const newText = originalText.replace(regex, getRandomEmoticon());
    element.textContent = newText;
    //element.textContent = getRandomEmoticon();
  });
}

function processPage() {
  chrome.storage.sync.get(["keywords"], function(result) {
    if (result.keywords && result.keywords.length > 0) {
      getNodeList(body);
      console.log(contentList);
      chrome.storage.local.set({content : contentList});
      //console.log(nodeList);
      console.log(result.keywords)
      result.keywords.forEach(keyword => {
        ChangeTo(keyword);
      });
    }
  });
}

processPage();
chrome.runtime.sendMessage('savedContent', (response) => {
  console.log('sent msg', labels);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'keywords') {
      processPage(); // 키워드가 변경되면 페이지를 다시 처리합니다.
    }
  }
});

window.addEventListener('scroll', () => {
  //processPage();
});
