const CACHE_NAME = 'bookmark-clipboard-v2';
const urlsToCache = [
  '/BOOKMARK_CLIPBOARD/',
  '/BOOKMARK_CLIPBOARD/index.html',
  '/BOOKMARK_CLIPBOARD/manifest.json',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js'
];

// 설치 이벤트 - 캐시에 파일들을 저장
self.addEventListener('install', event => {
  console.log('Service Worker: 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: 파일 캐싱 중...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: 설치 완료');
        return self.skipWaiting();
      })
  );
});

// 활성화 이벤트 - 오래된 캐시 정리
self.addEventListener('activate', event => {
  console.log('Service Worker: 활성화 중...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 오래된 캐시 삭제 -', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: 활성화 완료');
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 가로채기 - 네트워크 우선 전략 (HTML 파일에 대해)
self.addEventListener('fetch', event => {
  // Firebase API 요청은 항상 네트워크를 통해 처리
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('firebase.googleapis.com')) {
    return;
  }

  // HTML 파일에 대해서는 네트워크 우선 전략 사용
  if (event.request.destination === 'document' || event.request.url.includes('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          console.log('Service Worker: 네트워크에서 가져오기 -', event.request.url);
          // 네트워크에서 성공적으로 가져온 경우 캐시 업데이트
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패시 캐시에서 반환
          console.log('Service Worker: 네트워크 실패, 캐시에서 반환 -', event.request.url);
          return caches.match(event.request);
        })
    );
  } else {
    // 다른 리소스는 캐시 우선 전략
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Service Worker: 캐시에서 반환 -', event.request.url);
            return response;
          }

          console.log('Service Worker: 네트워크에서 가져오기 -', event.request.url);
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            });
        })
    );
  }
});

// 백그라운드 동기화 (PWA 기능)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: 백그라운드 동기화 실행');
    event.waitUntil(
      // Firebase와 동기화 작업 수행
      syncWithFirebase()
    );
  }
});

// Firebase와의 백그라운드 동기화 함수
async function syncWithFirebase() {
  try {
    // 클라이언트에게 동기화 메시지 전송
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC',
        payload: 'Firebase 동기화 중...'
      });
    });
  } catch (error) {
    console.error('Service Worker: 백그라운드 동기화 실패', error);
  }
}

// 푸시 알림 처리 (향후 확장)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/BOOKMARK_CLIPBOARD/icon-192x192.png',
      badge: '/BOOKMARK_CLIPBOARD/icon-192x192.png',
      vibrate: [200, 100, 200],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});