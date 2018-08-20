
export default {
    init() {
        document.querySelector(".header__menu-icon").addEventListener("click", (ev) => {
            this.toggleMenu();
        });

        document.querySelectorAll(".header__menu__item").forEach((menuItem) => {
            menuItem.addEventListener("click", () => {
                this.toggleMenu(false);
            });
        });
    },

    toggleMenu(force) {
        document.querySelector(".header__menu").classList.toggle("header__menu_shown", force);
    }
}