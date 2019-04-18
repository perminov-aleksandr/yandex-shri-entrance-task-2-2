export default {
    init() {
        this.initFilters();
    },

    get filtersList() {
        return document.querySelector(".favourite-devices__filters");
    },

    get filterItems() {
        return document.querySelectorAll(".favourite-devices__filters__item");
    },

    initFilters() {    
        document.querySelector(".favourite-devices__filters__active")
                .addEventListener('click', () => {this.toggleFiltersList()});
        this.filterItems.forEach((filterItem) => {
            filterItem.addEventListener('click', (ev) => {
                this.deactivateFilterItems();
                this.activateFilterItem(ev.target);
                this.toggleFiltersList(false);
            });
        });
    },
    
    activateFilterItem(filterItem) {    
        filterItem.classList.add("favourite-devices__filters__item_active");
        document.querySelector(".favourite-devices__filters__active__name").innerText = filterItem.innerText;
    },
    
    deactivateFilterItems() {        
        this.filterItems.forEach((filterItem) => {
            filterItem.classList.remove("favourite-devices__filters__item_active");
        });
    },
    
    toggleFiltersList(force) {
        this.filtersList.classList.toggle("favourite-devices__filters_shown", force);
    },
    
    activateFilterItem(filterItem) {    
        filterItem.classList.add("favourite-devices__filters__item_active");
        document.querySelector(".favourite-devices__filters__active__name").innerText = filterItem.innerText;
    },
    
    deactivateFilterItems() {        
        this.filterItems.forEach((lFilterItem) => {
            lFilterItem.classList.remove("favourite-devices__filters__item_active");
        });
    }
}

