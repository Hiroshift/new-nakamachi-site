// 詳細ページ用のシンプルなJavaScript

// フルスクリーン防止の設定
document.addEventListener('DOMContentLoaded', function() {
    // フルスクリーン要求を防止
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
    
    // webkit系ブラウザ用
    document.addEventListener('webkitfullscreenchange', function() {
        if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        }
    });
    
    // moz系ブラウザ用
    document.addEventListener('mozfullscreenchange', function() {
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        }
    });
    
    // ms系ブラウザ用
    document.addEventListener('MSFullscreenChange', function() {
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
        }
    });
    
    // キーボードショートカットでのフルスクリーン防止
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F11' || (e.ctrlKey && e.key === 'f') || (e.metaKey && e.key === 'f')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);
    
    // 右クリックメニューでのフルスクリーン防止
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    // フルスクリーンAPIの完全無効化
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // webkit系ブラウザ用
    if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // moz系ブラウザ用
    if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
    
    // ms系ブラウザ用
    if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen = function() {
            return Promise.reject(new Error('Fullscreen is disabled'));
        };
    }
});

// フッターの年を自動更新
function updateFooterYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    updateFooterYear();
}); 