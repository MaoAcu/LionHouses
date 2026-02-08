
const i18n = {
    lang: localStorage.getItem("lang") || "es",
    modules: ["general", "home", "about", "features", "contact", "footer", "marquee", "map", "calendar", "policy"],
    data: {},

    async load() {
        this.data = {};

        for (const module of this.modules) {
            try {
                const res = await fetch(`/static/lang/${this.lang}/${module}.json`);
                if (!res.ok) throw new Error("No encontrado");

                const json = await res.json();
                this.data[module] = json;
            } catch (e) {
                console.error(`Error cargando módulo ${module}`, e);
            }
        }

        this.applyTranslations();
        this.updateSelectedFlag();
    },

    applyTranslations() {
        document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const segments = key.split(".");
        let value = this.data;

        for (const segment of segments) {
            if (value && value[segment] !== undefined) {
                value = value[segment];
            } else {
                value = null;
                break;
            }
        }

        if (typeof value === "string") {
            el.textContent = value;
        }
        });
    },

    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem("lang", lang);
        this.load();
        
        setTimeout(() => {
        document.dispatchEvent(new Event("reloadWeather"));
    }, 50);
    },

    updateSelectedFlag() {
        const flagPath = {
            es: ES,
            en: EN
        };

        const code = this.lang.toUpperCase();
        selected.innerHTML = `<img src="${flagPath[this.lang]}"> <span>${code}</span>`;
    }
    // Traduce placeholders

};
document.addEventListener("DOMContentLoaded", () => i18n.load());


// Selector de idioma
const langSelector = document.getElementById("langSelector");
const selected = document.createElement("div");
selected.classList.add("lang-selected");

// Iniciar según idioma guardado
selected.innerHTML = `
    <img src="${ES}">
    <span>${i18n.lang.toUpperCase()}</span>
`;
langSelector.prepend(selected);

// Abrir/cerrar dropdown
selected.addEventListener("click", () => {
    langSelector.classList.toggle("open");
});

// Cambiar idioma
document.querySelectorAll(".lang-option").forEach(opt => {
    opt.addEventListener("click", () => {
        const selectedLang = opt.dataset.lang;

        i18n.setLanguage(selectedLang);

        langSelector.classList.remove("open");
    });
});
