// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {

  // Animal Data
  const animals = {
    whale: {
      found: 0,
      total: 1,
      messageDiv: null,
      imageIds: ['whale-img']
    },
    turtle: {
      found: 0,
      total: 2,
      messageDiv: null,
      imageIds: ['turtle1-img', 'turtle2-img']
    },
    jellyfish: {
      found: 0,
      total: 2,
      messageDiv: null,
      imageIds: ['jellyfish1-img', 'jellyfish2-img']
    }
  };

  // Setup initial "0 found" messages 
  animals.whale.messageDiv = createMessageDiv('whale', animals.whale.found, animals.whale.total);
  animals.turtle.messageDiv = createMessageDiv('turtle', animals.turtle.found, animals.turtle.total);
  animals.jellyfish.messageDiv = createMessageDiv('jellyfish', animals.jellyfish.found, animals.jellyfish.total);

  // Helper function to create and insert initial messages
  function createMessageDiv(animal, found, total) {
    const parent = document.querySelector(`#${animal}-emoji`).closest('.creature-col');
    const div = document.createElement('div');
    div.className = 'found-message';
    div.textContent = `${found} ${animal}s have been found so far!`;
    parent.appendChild(div);
    return div;
  }

  // event listeners for animal images
  for (const animalKey in animals) {
    animals[animalKey].imageIds.forEach(imgId => {
      const imgElement = document.getElementById(imgId);
      imgElement.addEventListener('click', () => handleAnimalClick(animalKey, imgElement));
    });
  }

  //Logic for handling clicks
  function handleAnimalClick(animalKey, imgElement) {
    const animal = animals[animalKey];

    // no repeated clicks on the same image
    if (imgElement.dataset.found) {
      return;
    }

    imgElement.dataset.found = 'true'; // mark image as clicked
    animal.found += 1; // increment found cnt

    // Update found based on animal count
    updateAnimalMessage(animalKey);
  }

  // Updating the count message
  function updateAnimalMessage(animalKey) {
    const animal = animals[animalKey];

    if (animal.found === 1) {
      animal.messageDiv.textContent = `1/${animal.total} have been found so far!`;
    } else {
      animal.messageDiv.textContent = `${animal.found} have been found so far!`;
    }

    // Congrats message if all found
    if (animal.found === animal.total) {
      const congrats = document.createElement('div');
      congrats.className = 'congrats-message';
      congrats.textContent = `🎉 Congrats! You found every ${animalKey}!`;
      animal.messageDiv.parentElement.appendChild(congrats);
    }
  }

  // Light/Dark mode
  const modeToggle = document.getElementById('mode-toggle');

  modeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');

    if (isLight) {
      // Switch to light mode
      if (window.innerWidth <= 768) {
        document.body.style.background = "url('assets/mobile/light-bg.png') no-repeat center center fixed";
      } else {
        document.body.style.background = "url('assets/desktop/light-bg.png') no-repeat center center fixed";
      }
    } else {
      // Switch back to dark mode
      if (window.innerWidth <= 768) {
        document.body.style.background = "url('assets/mobile/dark-bg.png') no-repeat center center fixed";
      } else {
        document.body.style.background = "url('assets/desktop/dark-bg.png') no-repeat center center fixed";
      }
    }
    document.body.style.backgroundSize = "cover";
  });

  adjustBackgroundForScreenSize();

  window.addEventListener('resize', adjustBackgroundForScreenSize);
  // Adjust background based on screen size + responsive design (only 2 selectors either desktop or mobile)

  function adjustBackgroundForScreenSize() {
    if (window.innerWidth <= 768) {
      if (document.body.classList.contains('light-mode')) {
        document.body.style.background = "url('assets/mobile/light-bg.png') no-repeat center center fixed";
      } else {
        document.body.style.background = "url('assets/mobile/dark-bg.png') no-repeat center center fixed";
      }
    } else {
      if (document.body.classList.contains('light-mode')) {
        document.body.style.background = "url('assets/desktop/light-bg.png') no-repeat center center fixed";
      } else {
        document.body.style.background = "url('assets/desktop/dark-bg.png') no-repeat center center fixed";
      }
    }

    document.body.style.backgroundSize = "cover";
  }
});