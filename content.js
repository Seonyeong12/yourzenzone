// 예를 들어, "hate speech"와 "offensive term"을 감지하는 코드
const offensiveWords = ["hate speech", "offensive term"];
const regex = new RegExp(offensiveWords.join("|"), "gi"); // 대소문자 무시, 전체 매치

const text = document.body.textContent;
if (regex.test(text)) {
  // 혐오 표현을 발견하면 대체 작업을 수행
}

const emoticons = ["😃", "😊", "😄", "😁", "😆", "😅"];
function getRandomEmoticon() {
  const randomIndex = Math.floor(Math.random() * emoticons.length);
  return emoticons[randomIndex];
}

if (regex.test(text)) {
    const replacedText = text.replace(regex, getRandomEmoticon());
    document.body.textContent = replacedText;
  }

//문장단위 parsing
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'parseHTML') {
    const htmlContent = document.body.innerHTML; // 전체 HTML 내용을 가져옵니다.
    
    // HTML을 파싱하기 위해 가상의 div 요소를 생성합니다.
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // 원하는 요소를 선택하거나 전체 body 내용을 가져옵니다.
    const targetElement = doc.body || doc.documentElement;

    // 텍스트를 추출하고 문장으로 나눕니다. 여기서는 마침표를 기준으로 간단히 나누었습니다.
    const sentences = targetElement.innerText.split('.');

    // 모델 불러오기
    const model = loadModel();

     // 문장 레이블링
    const labeledSentences = labelSentences(sentences, model);

    //최종 필터링된 결과 전송
    //filteredSentences에 최종 결과 저장하여 사용
    chrome.runtime.sendMessage({ action: 'displaySentences', sentences: filteredSentences });
    //  혐오 표현을 랜덤 이모티콘으로 대체
    replaceHateSentencesWithEmoticons(labeledSentences);
    
    //  변경된 HTML 정보를 다시 웹 페이지로 전송
    sendUpdatedHtmlToWebPage();
  }
});

// 모델 불러오는 함수 선언
async function loadModel() {
  const model = await tf.loadLayersModel('모델_파일_경로'); 
  // 모델 파일 경로를 지정하거나, 모델 객체를 직접 전달할 수 있습니다.
  //이 경로는 모델의 json 파일과 binary 파일이 있는 경로를 나타냄.
  
  //이 함수는 TensorFlow.js를 지원함. safetensors도 잘 불러와지는지 확인 필요
  //지원하지 않는다면, python 코드를 수정하여 tf.saved_model.save함수 사용하거나
  //모델을 tensorflow hub 형식으로 변환하여 이를 불러오도록 해야함.
  return model;
}

// 문장 레이블링 함수
async function labelSentences(sentences, model) {
  const labels = [];

  for (const sentence of sentences) {
    // 문장을 모델에 입력으로 전달하여 예측
    const prediction = await model.predict(tf.tensor2d([sentence])); // 예시로 간단하게 텍스트를 텐서로 변환

    // 예측 결과에서 가장 높은 확률을 가진 클래스(레이블) 선택
    const predictedLabel = getLabelFromIndex(prediction);
    console.log(predictedLabel); // 여성/가족 (또는 실제 데이터에 따라 다른 레이블)

    labels.push({ sentence, label: predictedLabel });
  }

  return labels;
}

// 클래스 인덱스를 레이블로 변환하는 함수 (실제로는 모델에 따라 정의되어야 함)
function getLabelFromIndex(output) {
  // output은 모델의 출력 배열로 가정
  const highestScoreLabel = output.reduce((max, current) => (current.score > max.score) ? current : max);
  return highestScoreLabel.label;
}


// 최종 결과에서 혐오 표현을 랜덤 이모티콘으로 대체하는 함수
function replaceHateSentencesWithEmoticons(labeledSentences) {
  for (const labeledSentence of labeledSentences) {
    const { sentence, label } = labeledSentence;
    if (label === 'hate speech' || label === 'offensive term') {
      const replacedSentence = sentence.replace(regex, getRandomEmoticon());
      document.body.innerHTML = document.body.innerHTML.replace(sentence, replacedSentence);
    }
  }
}


// 변경된 HTML 정보를 다시 웹 페이지로 전송하는 함수
function sendUpdatedHtmlToWebPage() {
  const updatedHtml = document.documentElement.outerHTML;
  chrome.runtime.sendMessage({ action: "updateHtml", htmlInfo: updatedHtml });
}
