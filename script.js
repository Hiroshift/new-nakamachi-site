// script.js - EmailJS 実装版

document.addEventListener('DOMContentLoaded', function() {

  // --- EmailJSの初期化 ---
  // 【重要】下の YOUR_PUBLIC_KEY を、メモしたあなたの Public Key に書き換えてください！
  (function(){
      emailjs.init({
        publicKey: "s4S3eXmjINRoqVZRV", // ★★★ あなたの Public Key に書き換える ★★★
      });
  })();

  // --- フッターの年を自動更新 ---
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
  }

  // --- お問い合わせフォームの処理 ---
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const submitButton = document.getElementById('submit-button');

  if (contactForm && submitButton && formMessage) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault(); // デフォルトの送信を止める

          submitButton.disabled = true;
          submitButton.textContent = '送信中...';
          formMessage.textContent = '';
          formMessage.className = 'form-message'; // スタイルリセット

          // --- EmailJS でメール送信 ---
          // 【重要】下の YOUR_SERVICE_ID と YOUR_TEMPLATE_ID を、
          //         メモしたあなたの Service ID と Template ID に書き換えてください！
          const serviceID = 'service_dbj6fl4';   // ★★★ あなたの Service ID に書き換える ★★★
          const templateID = 'template_ncw20ag'; // ★★★ あなたの Template ID に書き換える ★★★

          emailjs.sendForm(serviceID, templateID, this) // 'this' はフォーム要素自身
              .then(() => {
                  // --- 送信成功 ---
                  formMessage.textContent = 'お問い合わせありがとうございます。メッセージは正常に送信されました。';
                  formMessage.classList.add('success'); // style.css で定義予定の成功色クラス
                  contactForm.reset(); // フォームリセット
              }, (err) => {
                  // --- 送信失敗 ---
                  formMessage.textContent = 'メッセージの送信に失敗しました。お手数ですが、時間をおいて再度お試しください。';
                  formMessage.classList.add('error'); // style.css で定義予定の失敗色クラス
                  console.error('EmailJS Error:', err); // コンソールにエラー詳細表示
                  alert('メール送信に失敗しました: ' + JSON.stringify(err)); // アラートでも表示
              })
              .finally(() => {
                  // --- 常に実行 ---
                  submitButton.disabled = false; // ボタン有効化
                  submitButton.textContent = '送信する';
              });
      });
  }

  // --- モバイルメニューの簡単なトグル ---
  // (省略 - 必要なら後で追加)

});