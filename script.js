// script.js

// DOM（HTML要素）の読み込みが完了したら実行される処理
document.addEventListener('DOMContentLoaded', function() {

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
          event.preventDefault(); // ページ遷移するデフォルトの送信を止める

          // 送信ボタンを一時的に無効化し、表示を変更
          submitButton.disabled = true;
          submitButton.textContent = '送信中...';
          formMessage.textContent = ''; // 前回のメッセージを消す
          formMessage.className = 'mt-4 text-sm font-medium'; // メッセージの色をリセット

          // --- ここにメール送信処理（例: EmailJS）が入ります ---
          // 今回は EmailJS の設定がまだなので、送信処理の代わりに
          // ダミーの動作（送信成功したように見せる）を入れます。
          // 実際にメールを送るには、後でEmailJSの設定が必要です。

          console.log('Form submitted (Processing simulation...)');

          // 1.5秒後にダミーの成功メッセージを表示する例
          setTimeout(() => {
              formMessage.textContent = 'お問い合わせありがとうございます。メッセージは送信されました。（※これはテスト表示です）';
              formMessage.classList.add('text-green-600'); // 緑色の文字に
              contactForm.reset(); // フォームの入力内容を空にする

              // ボタンを元に戻す
              submitButton.disabled = false;
              submitButton.textContent = '送信する';
          }, 1500); // 1500ミリ秒 = 1.5秒

          /* --- もし送信失敗した場合のダミー動作（参考）---
          setTimeout(() => {
              formMessage.textContent = '送信に失敗しました。時間をおいて再度お試しください。（※これはテスト表示です）';
              formMessage.classList.add('text-red-600'); // 赤色の文字に
              // ボタンを元に戻す
              submitButton.disabled = false;
              submitButton.textContent = '送信する';
          }, 1500);
          */
          // --- ダミー処理ここまで ---
      });
  }

}); // DOMContentLoaded の終わり