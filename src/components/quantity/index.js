import './index.scss';

//инициализация счетчиков
export const initital = () => {
  const quantityList = document.querySelectorAll('.quantity');
  if (quantityList.length > 0) {
    [...quantityList].forEach((el) => {
      const countEl = el.querySelector('.quantity__count');
      const incBtn = el.querySelector('.quantity__inc');
      const decBtn = el.querySelector('.quantity__dec');
      if (incBtn) incBtn.onclick = inc.bind(null, countEl);
      if (decBtn) decBtn.onclick = dec.bind(null, countEl);
    });
  }
};
export const initialEl = (el) => {
  const countEl = el.querySelector('.quantity__count');
  const incBtn = el.querySelector('.quantity__inc');
  const decBtn = el.querySelector('.quantity__dec');
  if (incBtn) incBtn.onclick = inc.bind(null, countEl);
  if (decBtn) decBtn.onclick = dec.bind(null, countEl);
};
export const destroyEl = (el) => {
  const incBtn = el.querySelector('.quantity__inc');
  const decBtn = el.querySelector('.quantity__dec');
  if (incBtn) incBtn.removeEventListener('click', inc);
  if (decBtn) decBtn.removeEventListener('click', dec);
};
// устанавливаем значение в счетчик
export const setCount = (el, count) => {
  const countEl = el.querySelector('.quantity__count');
  if (countEl) countEl.textContent = count;
};
// добавляем
export function inc(countEl, e) {
  ++countEl.textContent;
}
// убавляем
export function dec(countEl, e) {
  if (countEl.textContent > 0) {
    --countEl.textContent;
  }
}

initital();
