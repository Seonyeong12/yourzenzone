// background.js

// API 키 저장
function saveApiKey(apiKey) {
    chrome.storage.local.set({ 'apiKey': apiKey }, function () {
        console.log('API key saved:', apiKey);
    });
}

// API 키 가져오기
function getApiKey(callback) {
    chrome.storage.local.get('apiKey', function (result) {
        const apiKey = result.apiKey;
        if (apiKey) {
            callback(apiKey);
        } else {
            console.error('API key not found');
        }
    });
}

// 예시: API 키가 저장되어 있지 않으면 저장
getApiKey(function (apiKey) {
    if (!apiKey) {
        const newApiKey = 'YOUR_API_KEYAIzaSyD8IuWHaEfNF34gukcV_theuMotAWoD6gE'; // 실제 API 키로 교체
        saveApiKey(newApiKey);
    }
});
