import { setCount, initialEl, destroyEl } from '../components/quantity';
/*
window.ordering_samples = 
[
  {
    id: string
    name: string,
    el: HtmlElement
    count: string | number
  } |
  {
    id: string
    name: string,
    el: HtmlElement
    children: [
      {
        id: string // 1_1
        name: string,
        el: HtmlElement
        count: string | number
      }
    ]
  }
]
*/
window.ordering_samples = createProxy([]);
const initial = () => {
  const items = document.querySelectorAll('.ordering-samples__list .item');
  [...items].forEach((item) => {
    //ищем чекбоксы у которых есть дочерние чекбоксы
    const itemHead = item.querySelector('.item__head');
    // если есть дочерние чекбоксы
    if (itemHead) {
      const checkbox = itemHead.querySelector('input[type="checkbox"]');
      const checkboxContainer = itemHead.querySelector('.checkbox');
      const checkboxLabel = itemHead.querySelector('.checkbox__label');
      const obj = {};
      if (checkboxContainer) obj.id = checkboxContainer.dataset.id;
      if (checkboxLabel) obj.name = checkboxLabel.textContent;
      if (checkbox)
        checkbox.onchange = toggleList.bind(
          checkbox,
          item,
          createProxy({
            ...obj,
            el: checkboxContainer,
            children: createProxy([]),
          })
        );
    }
    // если нет дочерних
    else {
      const checkboxContainer = item.querySelector('.checkbox');
      if (checkboxContainer) {
        const checkbox = checkboxContainer.querySelector(
          'input[type="checkbox"]'
        );
        if (checkbox)
          checkbox.onchange = toggleChange.bind(
            checkbox,
            checkboxContainer,
            null
          );
      }
    }
  });
};

function toggleList(item, obj = null, e) {
  //если активный чекбокс то открываем список дочерних
  if (this.checked) {
    //проверяем есть ли данный объект с id в массиве
    const isObj = window.ordering_samples.some((o) => {
      return o.id === obj.id;
    });
    if (!isObj) {
      window.ordering_samples.push(obj);
    }
    if (!item.classList.contains('active')) {
      item.classList.add('active');
      const checkboxChilds = item.querySelectorAll('.item__body .checkbox');

      [...checkboxChilds].forEach((checkboxChild) => {
        if (checkboxChild) {
          const checkbox = checkboxChild.querySelector(
            'input[type="checkbox"]'
          );
          if (checkbox)
            checkbox.onchange = toggleChange.bind(checkbox, checkboxChild, {
              index: window.ordering_samples.length - 1,
              parentObj: obj,
            });
        }
      });
    }
  } else {
    window.ordering_samples.forEach((o, index) => {
      if (o.id == obj.id) delete window.ordering_samples[index];
    });
    item.classList.remove('active');
  }
}

function toggleChange(checkboxEl, obj = null, e) {
  //если активный чекбокс то показываем счетчик
  const quantity = checkboxEl.querySelector('.quantity');
  const name = checkboxEl.querySelector('.checkbox__label').textContent;
  const id = checkboxEl.dataset.id;
  if (this.checked) {
    if (!checkboxEl.classList.contains('active')) {
      if (quantity) setCount(quantity, 1);
    }
    checkboxEl.classList.add('active');
    //если это дочерний чекбокс
    if (obj) {
      //проверяем есть ли данный объект с id в массиве
      const isObj = window.ordering_samples[obj.index].children.some((o) => {
        return o.id === id;
      });
      if (!isObj) {
        window.ordering_samples[obj.index].children.push(
          createProxy({
            id,
            name,
            el: checkboxEl,
            count: quantity.querySelector('.quantity__count').textContent,
          })
        );
      }
    } else {
      //проверяем есть ли данный объект с id в массиве
      const isObj = window.ordering_samples.some((o) => {
        return o.id === id;
      });
      if (!isObj) {
        window.ordering_samples.push(
          createProxy({
            id,
            name,
            el: checkboxEl,
            count: quantity.querySelector('.quantity__count').textContent,
          })
        );

        // setTimeout(() => {
        //   window.ordering_samples[
        //     window.ordering_samples.length - 1
        //   ].count = 100;
        // }, 7000);
      }
    }
  } else {
    checkboxEl.classList.remove('active');
    if (quantity) setCount(quantity, 0);
    //если это дочерний чекбокс
    if (obj) {
      // const updateData = window.ordering_samples[obj.index].children.filter(
      //   (o) => {
      //     return o.id !== id;
      //   }
      // );
      // window.ordering_samples[obj.index].children = updateData;

      window.ordering_samples[obj.index].children.forEach((o, idx) => {
        if (o.id == id) delete window.ordering_samples[obj.index].children[idx];
      });
    } else {
      window.ordering_samples.forEach((o, index) => {
        if (o.id == id) delete window.ordering_samples[index];
      });
    }
  }
}

let windowTargetBind;
function openEdit(parent, e) {
  const editContainer = parent.querySelector('.item-edit');
  if (editContainer) {
    windowTargetBind = windowTarget.bind(this, editContainer);
    window.addEventListener('click', windowTargetBind);
    editContainer.classList.add('active');
    const editBtn = editContainer.querySelector('.btn-edit');
    const deleteBtn = editContainer.querySelector('.btn-delete');
    if (editBtn) editBtn.onclick = editItem.bind(null, parent, editContainer);
    if (deleteBtn)
      deleteBtn.onclick = deleteItem.bind(null, parent, editContainer);
  }
}
function windowTarget(editContainer, e) {
  console.log('windos');
  if (!e.composedPath().includes(this)) {
    if (!e.composedPath().includes(editContainer)) {
      editContainer.classList.remove('active');
      window.removeEventListener('click', windowTargetBind);
      // window.removeEventListener('click', windowTarget);
    }
  }
}
function editItem(parent, editContainer, e) {
  const itemQuantity = parent.querySelector('.item-quantity');
  if (itemQuantity) {
    itemQuantity.classList.add('active');
  }
  editContainer.classList.remove('active');
  window.removeEventListener('click', windowTargetBind);
}
function deleteItem(parent, editContainer, e) {
  const id = parent.dataset.id;
  if (id.split('_').length > 1) {
    window.ordering_samples.forEach((o, index) => {
      const idList = id.split('_');
      if (o.id === idList[0]) {
        o.children.forEach((childObj, idx) => {
          if (childObj.id == id)
            delete window.ordering_samples[index].children[idx];
        });
      }
    });
  } else {
    window.ordering_samples.forEach((o, index) => {
      if (o.id == id) delete window.ordering_samples[index];
    });
  }
  // window.ordering_samples[obj.index].children.forEach((o, idx) => {
  //   if (o.id == id) delete window.ordering_samples[obj.index].children[idx];
  // });
  // const
  // console.log(parent);
  editContainer.classList.remove('active');
  window.removeEventListener('click', windowTargetBind);
}

function createProxy(target) {
  return new Proxy(target, {
    set(target, prop, val) {
      //получаю фрагмент
      const t = document.querySelector('#ordering-elements');

      const orderingContent = document.querySelector('#ordering');

      target[prop] = val;

      if (target[prop]?.el) {
        //если это один из дочерних элементов
        if (target[prop].id.split('_').length > 1) {
          const idList = target[prop].id.split('_');
          const parentObj = window.ordering_samples.find(
            (o) => o.id === idList[0]
          );

          // дубликат узла
          const itemChild = t.content
            .querySelector('.item-child')
            .cloneNode(true);
          const itemLabel = t.content
            .querySelector('.item-label')
            .cloneNode(true);
          //родительский

          const parentId = parentObj.el.dataset.id;
          if (!orderingContent.querySelector(`[data-id='${parentId}']`)) {
            const parentlabel = parentObj.el
              .querySelector('.checkbox__label')
              .cloneNode(true);

            itemLabel.setAttribute('data-id', parentId);
            itemLabel.querySelector('.item-label__head').append(parentlabel);
            orderingContent.append(itemLabel);
          }

          //дочерний

          {
            const orderingContentParentNode = orderingContent.querySelector(
              `[data-id='${idList[0]}'] .item-label__body`
            );
            const label = target[prop].el
              .querySelector('.checkbox__label')
              .cloneNode(true);
            itemChild.setAttribute('data-id', target[prop].id);
            itemChild.querySelector('.item-child__label').append(label);
            itemChild.querySelector('.item-child__count').textContent =
              target[prop].count;
            itemChild.querySelector(
              '.item-quantity .quantity__count'
            ).textContent = target[prop].count;
            const action = itemChild.querySelector('.item-action');
            if (action) {
              action.onclick = openEdit.bind(action, itemChild);
            }
            const quantity = itemChild.querySelector('.quantity');
            initialEl(quantity);

            orderingContentParentNode.append(itemChild);

            //отслеживаем изменение в контейнере с чекбоксом
            const observerInCheckbox = new MutationObserver(function (
              mutations
            ) {
              mutations.forEach(function (mutation) {
                target[prop].count = mutation.target.textContent;
                orderingContentParentNode.querySelector(
                  `[data-id='${target[prop].id}'] .item-child__btns .item-child__count`
                ).textContent = target[prop].count;
                orderingContentParentNode.querySelector(
                  `[data-id='${target[prop].id}'] .item-child__btns .item-quantity .quantity__count`
                ).textContent = target[prop].count;
              });
            });
            observerInCheckbox.observe(
              target[prop].el.querySelector('.quantity__count'),
              { childList: true }
            );

            //отслеживаем изменение в форме
            const observerInItem = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                const quantityCountEl = target[prop].el.querySelector(
                  '.quantity .quantity__count'
                );
                if (
                  quantityCountEl.textContent !== mutation.target.textContent
                ) {
                  target[prop].count = mutation.target.textContent;
                  quantityCountEl.textContent = mutation.target.textContent;
                }
              });
            });
            observerInItem.observe(quantity.querySelector('.quantity__count'), {
              childList: true,
            });
          }
        }
        if (
          target[prop].id.split('_').length === 1 &&
          target[prop].hasOwnProperty('count')
        ) {
          // дубликат узла
          const itemParent = t.content
            .querySelector('.item-parent')
            .cloneNode(true);
          const label = target[prop].el
            .querySelector('.checkbox__label')
            .cloneNode(true);

          itemParent.setAttribute('data-id', target[prop].id);
          itemParent.querySelector('.item-parent__label').append(label);
          itemParent.querySelector(' .item-parent__count').textContent =
            target[prop].count;
          itemParent.querySelector(
            '.item-quantity .quantity__count'
          ).textContent = target[prop].count;

          const action = itemParent.querySelector('.item-action');
          if (action) {
            action.onclick = openEdit.bind(action, itemParent);
          }
          const quantity = itemParent.querySelector('.quantity');
          initialEl(quantity);
          orderingContent.append(itemParent);

          //отслеживаем изменение в контейнере с чекбоксом
          const observerInCheckbox = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              target[prop].count = mutation.target.textContent;
              orderingContent.querySelector(
                `[data-id='${target[prop].id}'] .item-parent__btns .item-parent__count`
              ).textContent = target[prop].count;
              orderingContent.querySelector(
                `[data-id='${target[prop].id}'] .item-parent__btns .item-quantity .quantity__count`
              ).textContent = target[prop].count;
            });
          });
          observerInCheckbox.observe(
            target[prop].el.querySelector('.quantity__count'),
            { childList: true }
          );

          //отслеживаем изменение в форме
          const observerInItem = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              const quantityCountEl = target[prop].el.querySelector(
                '.quantity .quantity__count'
              );
              if (quantityCountEl.textContent !== mutation.target.textContent) {
                target[prop].count = mutation.target.textContent;
                quantityCountEl.textContent = mutation.target.textContent;
              }
            });
          });
          observerInItem.observe(quantity.querySelector('.quantity__count'), {
            childList: true,
          });
        }
      }
      return true;
    },
    deleteProperty(target, prop) {
      const orderingContent = document.querySelector('#ordering');

      console.log('delete');
      console.log(
        target[prop].id.split('_').length === 1,
        target[prop].children
      );
      const el = target[prop].el;
      el.classList.remove('active');
      if (
        target[prop].id.split('_').length === 1 &&
        target[prop].children &&
        target[prop].children.length > 0
      ) {
        target[prop].children.forEach((o) => {
          const checkbox = o.el.querySelector('input[type="checkbox"]');
          checkbox.checked = false;
        });
      }
      orderingContent.querySelector(`[data-id='${target[prop].id}']`).remove();

      const checkbox = el.querySelector('input[type="checkbox"]');
      if (checkbox) checkbox.checked = false;

      delete target[prop];
      return true;
    },
    // ownKeys(target) { // перехватываем попытку итерации
    //   return Object.keys(target).filter(key => !key.startsWith('_'));
    // }
  });
}

initial();
