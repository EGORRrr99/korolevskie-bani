const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".object-card");
const modal = document.querySelector("[data-modal]");
const modalClose = document.querySelector("[data-modal-close]");
const form = document.querySelector("[data-form]");
const formNote = document.querySelector("[data-form-note]");

const details = {
  large: {
    title: "Большая двухэтажная баня",
    tag: "Баня на дровах",
    img: "./assets/images/real-10.jpg",
    text: "Формат для компаний и праздников: просторная зона отдыха, деревянная отделка, парная и развлекательные сценарии. Точную вместимость и комплектацию нужно подтвердить у владельца.",
    items: ["Ориентир цены: 2 000 ₽/час", "Комната отдыха", "Караоке и аудиозона", "Данные по площади уточнить"],
  },
  vip: {
    title: "VIP-баня с бассейном",
    tag: "VIP-формат",
    img: "./assets/images/real-12.jpg",
    text: "Карточка для самого дорогого продукта в каталоге: акцент на приватность, бассейн, купель и визуально насыщенный интерьер.",
    items: ["Ориентир цены: 2 500 ₽/час", "Бассейн", "Купель", "Состав услуг уточнить"],
  },
  medium: {
    title: "Средняя одноэтажная баня",
    tag: "Камерный формат",
    img: "./assets/images/real-14.jpg",
    text: "Более компактный вариант для спокойного отдыха. В карточке оставлены только безопасные формулировки, без выдуманных характеристик.",
    items: ["Ориентир цены: 1 000 ₽/час", "Парная", "Душ", "Вместимость уточнить"],
  },
  veranda: {
    title: "Веранда и мангальная зона",
    tag: "Зона отдыха",
    img: "./assets/images/real-16.jpg",
    text: "Дополнительное пространство для застолий и отдыха на территории. Стоимость и условия аренды нужно подтвердить перед публикацией.",
    items: ["Мангал", "Посадочные места уточнить", "Условия аренды уточнить", "Подходит для компаний"],
  },
};

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;
    cards.forEach((card) => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  });
});

document.querySelectorAll("[data-details]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = details[button.dataset.details];
    modal.querySelector("[data-modal-img]").src = item.img;
    modal.querySelector("[data-modal-img]").alt = item.title;
    modal.querySelector("[data-modal-tag]").textContent = item.tag;
    modal.querySelector("[data-modal-title]").textContent = item.title;
    modal.querySelector("[data-modal-text]").textContent = item.text;
    modal.querySelector("[data-modal-list]").innerHTML = item.items.map((value) => `<li>${value}</li>`).join("");
    modal.querySelector("[data-modal-book]").dataset.book = item.title;
    modal.showModal();
  });
});

modalClose.addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

document.querySelectorAll("[data-book]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = form.elements.object;
    select.value = link.dataset.book;
    if (modal.open) modal.close();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Заявка собрана. Для боевого запуска подключите обработчик формы: Telegram, CRM, почту или внешний form-endpoint.";
  formNote.classList.add("success");
});
