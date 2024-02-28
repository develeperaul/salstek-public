import { initSelect } from '../components/select';
import { initInput } from '../components/inputFile';

const rezumeList = document.querySelectorAll('.rezume__content__list');
[...rezumeList].forEach((list) => {
  const observerInRezumeList = new MutationObserver(function (mutations) {
    const addEl = mutations[0].addedNodes.item(0);
    const removeEL = mutations[0].removedNodes.item(0);
    // const removeEL = mutations[0]
    let index;
    console.log(addEl);
    if (addEl) {
      [...list.childNodes].forEach((el, indx) => {
        if (el === addEl) index = indx;
      });
      //select

      const inputs = addEl.querySelectorAll('input, textaerea');
      [...inputs].forEach((input) => {
        for (let key in window.constraints.rezume.data) {
          if (input.name === key) {
            input.name = input.name + '_' + index;
            console.log(input);

            const newKey = input.name;

            window.constraints.rezume.data[newKey] =
              window.constraints.rezume.data[key];
          }
        }
        console.log(Object.keys(window.constraints.rezume.data));
      });
      const selects = addEl.querySelectorAll('.select');
      [...selects].forEach((select) => {
        initSelect(select);
      });

      //inputfile
      const fileInputs = document.querySelectorAll(
        ".field-file input[type='file']"
      );
      [...fileInputs].forEach((input) => {
        initInput(input);
      });
    }
    if (removeEL) {
      console.log(...list.childNodes);
      const inputs = removeEL.querySelectorAll('input,textaerea');
      [...inputs].forEach((input) => {
        if (window.constraints.rezume.data[input.name]) {
          delete window.constraints.rezume.data[input.name];
        }
      });
    }
  });
  observerInRezumeList.observe(list, {
    childList: true,
  });
});
