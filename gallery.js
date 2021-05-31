import galleryItems from './gallery-items.js';

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
            return `
            <li class="gallery__item">
                <a class="gallery__link"
                    href="${original}">
                    <img class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
            `;
        }).join('');
}

const galleryMarkup = createGalleryCardsMarkup(galleryItems);

const galleryContainer = document.querySelector('.js-gallery');
const closeModalBtn = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const modalEl = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryCardClick);
closeModalBtn.addEventListener('click', onCloseModalBtnClick);

function onGalleryCardClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    openModal(event.target.dataset.source);
}

function openModal(imageOriginalSize) {
    modalEl.classList.add('is-open');
    modalImage.attributes.src.value = imageOriginalSize;
}

function onCloseModalBtnClick(event) {
        modalEl.classList.remove('is-open');
        modalImage.attributes.src.value = '';
}