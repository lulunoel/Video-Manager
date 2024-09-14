// Fonction pour mettre à jour le statut et la vitesse dans l'extension
function updateVideoInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript(
          {
            target: { tabId: currentTab.id },
            function: getVideoInfo,
          },
          (results) => {
            const videoFound = results && results[0] && results[0].result;
            const videoInfo = videoFound ? results[0].result : null;
            
            if (videoFound) {
              document.getElementById('videoStatus').textContent = 'Statut : Média Trouvé';
              document.getElementById('playbackRate').textContent = 'Vitesse : ' + videoInfo.playbackRate.toFixed(2) + 'x';
              enableButtons();
            } else {
              document.getElementById('videoStatus').textContent = 'Statut : Aucun média trouvé';
              document.getElementById('playbackRate').textContent = 'Vitesse : N/A';
              disableButtons();
            }
          }
        );
      } else {
        document.getElementById('videoStatus').textContent = 'Statut : Impossible d\'accéder à cette page';
        document.getElementById('playbackRate').textContent = 'Vitesse : N/A';
        disableButtons();
      }
    });
  }
  
  function enableButtons() {
    document.getElementById('playPause').disabled = false;
    document.getElementById('speedUp').disabled = false;
    document.getElementById('slowDown').disabled = false;
    document.getElementById('invertVideo').disabled = false;
    document.getElementById('flipVideo').disabled = false;
  }
  
  function disableButtons() {
    document.getElementById('playPause').disabled = true;
    document.getElementById('speedUp').disabled = true;
    document.getElementById('slowDown').disabled = true;
    document.getElementById('invertVideo').disabled = true;
    document.getElementById('flipVideo').disabled = true;
  }  
  
  // Fonction pour obtenir les informations de la vidéo
  function getVideoInfo() {
    const video = document.querySelector('video');
    if (video) {
      return { paused: video.paused, playbackRate: video.playbackRate };
    } else {
      return null;
    }
  }
  
  // Fonction pour gérer le statut de la vidéo et écouter les changements
  function handleVideoStatus() {
    const video = document.querySelector('video');
    if (video) {
      // Initialisation du statut
      updateStatusAndPlaybackRate();
  
      // Ajout d'événements pour mettre à jour le statut
      video.addEventListener('play', updateStatusAndPlaybackRate);
      video.addEventListener('pause', updateStatusAndPlaybackRate);
      video.addEventListener('ratechange', updateStatusAndPlaybackRate);
    }
  
    function updateStatusAndPlaybackRate() {
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript(
          {
            target: { tabId: currentTab.id },
            function: getVideoInfo,
          },
          (results) => {
            if (results && results[0] && results[0].result) {
              const videoInfo = results[0].result;
              document.getElementById('videoStatus').textContent = 'Statut : Média Trouvé';
              document.getElementById('playbackRate').textContent = 'Vitesse : ' + videoInfo.playbackRate.toFixed(2) + 'x';
            } else {
              document.getElementById('videoStatus').textContent = 'Statut : Aucun média trouvé';
              document.getElementById('playbackRate').textContent = 'Vitesse : N/A';
            }
          }
        );
      } else {
        document.getElementById('videoStatus').textContent = 'Statut : Impossible d\'accéder à cette page';
        document.getElementById('playbackRate').textContent = 'Vitesse : N/A';
      }
    }
  }
  
  // Appelée au chargement de la page ou lors d'un changement
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (isValidUrl(currentTab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: handleVideoStatus,
      });
    }
  });
  // Ajouter les événements pour les boutons Play/Pause
document.getElementById('playPause').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: playPauseVideo,
        });
        updateVideoInfo(); // Mettre à jour le statut et la vitesse après l'action
      }
    });
  });
  
  // Ajouter les événements pour les boutons Accélérer et Ralentir
  document.getElementById('speedUp').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: speedUpVideo,
        });
        updateVideoInfo(); // Mettre à jour après accélération
      }
    });
  });
  
  document.getElementById('slowDown').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: slowDownVideo,
        });
        updateVideoInfo(); // Mettre à jour après ralentissement
      }
    });
  });
  
  // Ajouter les événements pour le bouton Inverser
  document.getElementById('invertVideo').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: invertVideo,
        });
      }
    });
  });
  
  // Ajouter les événements pour le bouton Retourner
  document.getElementById('flipVideo').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (isValidUrl(currentTab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: flipVideo,
        });
      }
    });
  });  
  
  // Fonction pour lire ou mettre en pause la vidéo
  function playPauseVideo() {
    const video = document.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
  
  // Fonction pour accélérer la vidéo
  function speedUpVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate += 0.25;
    }
  }
  
  // Fonction pour ralentir la vidéo
  function slowDownVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate -= 0.25;
    }
  }
  
  // Fonction pour inverser les couleurs de la vidéo
  function invertVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.style.filter = video.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
    }
  }
  
  // Fonction pour vérifier si l'URL est valide (comme avant)
  function isValidUrl(url) {
    return !url.startsWith('chrome://') && !url.startsWith('about:') && !url.startsWith('opera://');
  }
  
  // Fonction pour retourner la vidéo horizontalement
  function flipVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.style.transform = video.style.transform === 'scaleX(-1)' ? 'none' : 'scaleX(-1)';
    } else {
      console.log('Élément vidéo introuvable.');
    }
  }
  
  // Appel pour mettre à jour les informations dès que la popup est ouverte
  updateVideoInfo();
  