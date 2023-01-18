import VideoPoster from "./VideoPoster.component";

export default class AjaxCollection {
    constructor(element, options) {
        this.el = element;
        this.options = options;

        this.onInit();
    }

    onInit() {
        this.el.addEventListener('ajax-paging-added', () => {
            const posters = this.el.querySelectorAll(this.options.posters);

            posters.forEach(poster => {
                new VideoPoster(poster, {
                    vimeoClass: this.options.vimeoClass,
                    dailymotionClass: this.options.dailymotionClass,
                    posterLinkElement: this.options.posterLinkElement
                })
            })

            this.el.querySelectorAll('img[data-src]').forEach((img) => {
                this.lazyImageLoad(img)
            })
        }, false)
    }

    lazyImageLoad(image) {
        if (image.hasAttribute('data-src')) image.setAttribute('src', image.getAttribute('data-src'));
        if (image.hasAttribute('data-srcset')) {
            image.setAttribute('srcset', image.getAttribute('data-srcset'));
        }

        image.onload = () => {
            image.removeAttribute('data-src');
            image.removeAttribute('data-srcset');
        };
    }
}
