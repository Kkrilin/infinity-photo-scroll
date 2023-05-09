const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];
// Unspalsh API
const count = 30;
const apiKey = "fg0oFIZWRHe8i47G4P_6UFtQ4y283KnI11UBcOh70j0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if  all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to Attribute on Dom Elemnts
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Element for Links & Photos, Add to Dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photoArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unplash
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then pu bot inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unplash Api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error
  }
}

// Check to see of scrolling near bottom if page, load More Photos
window.addEventListener("scroll", () => {
  console.log(window.innerHeight);
  console.log(window.scrollY);
  console.log(document.body.offsetHeight);
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// on load
getPhotos();
