function find(array, condition) {
    for (let i = 0; i < array.length; i++) {
        if (condition(array[i])) {
            return array[i];
        }
    }
}

function isFullscreen() {
    return document.fullscreen || document.webkitIsFullScreen;
}

/**
 * Allows a component to set to fullscreen.
 */
class Fullscreenable {
    constructor(node) {
        this.node = node;

        node.addEventListener('keyup', this.handleKeyEvent.bind(this));

        const fullscreenHandler = this.syncFullscreenClass.bind(this);
        document.addEventListener('webkitfullscreenchange', fullscreenHandler);
        document.addEventListener('fullscreenchange', fullscreenHandler);
    }

    syncFullscreenClass(event) {
        if (isFullscreen())
            // We are using a class because :fullscreen is buggy in chrome
            this.node.classList.add('fullscreen');
        else
            this.node.classList.remove('fullscreen');
    }

    handleKeyEvent(event) {
        if (event.key === 'f') {
            this.toggleFullscreen();
        }
    }

    toggleFullscreen() {
        this.enterFullscreen();
    }

    enterFullscreen() {
        const {node} = this;
        (node.requestFullscreen || node.webkitRequestFullscreen).call(node);
    }
}
Fullscreenable.selector = '.fullscreenable';

/**
 * Slideshows consists of partials with next and prev links.
 */
class Slideshow {
    constructor(node) {
        this.node = node;
        this.currentSlide = 0;

        node.classList.add('with-javascript');
        node.addEventListener('keyup', this.handleKeyEvent.bind(this));
        node.addEventListener('wheel', this.handleWheelEvent.bind(this));

        //TODO: This is extremely nasty
        const hash = window.location.hash;
        if (hash) {
            (
                find(
                    this.node.children,
                    child => child.id === hash.substring(1)
                ) || this.node.children[0]
            ).classList.add('visible');
        } else {
            this.node.children[0].classList.add('visible');
        }
    }

    checkSlides() {
        if (this.node.children.length === 0)
            throw new Error('No slides in slideshow :(');
    }

    handleKeyEvent(event) {
        switch (event.key) {
            case ' ':
            case 'ArrowRight':
                return this.next();
            case 'Backspace':
            case 'ArrowLeft':
                return this.previous();
        }
    }

    handleWheelEvent(event) {
        if (document.fullscreenElement !== this.node) {
            return;
        }

        if (event.deltaY > 0) {
            this.next();
        } else {
            this.previous();
        }
    }

    findVisible() {
        const {children} = this.node;

        return find(
            children,
            child => child.classList.contains('visible')
        ) || children[0];
    }

    next() {
        return this.moveToRelative(
            current => current.nextElementSibling
        );
    }

    previous() {
        return this.moveToRelative(
            current => current.previousElementSibling
        );
    }

    moveToRelative(findRelative) {
        const current = this.findVisible();
        const next = findRelative(current);

        if (next) {
            current.classList.remove('visible');
            next.classList.add('visible');

            window.location.hash = next.id || '';
        }
    }
}
Slideshow.selector = '.slideshow';

function mountComponent(node, Component) {
    const nodes = node.querySelectorAll(Component.selector);

    Array.prototype.forEach.call(nodes, n => {
        new Component(n);
    });
}

function mountComponents(node, components) {
    components.forEach(mountComponent.bind(null, node));
}

window.addEventListener('load', event => {
    mountComponents(document, [Slideshow, Fullscreenable]);
});
