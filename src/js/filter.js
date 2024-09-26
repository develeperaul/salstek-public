import { initSelect } from '../components/select/index.js';
import { initSelect2 } from '../components/select/index2.js';
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.querySelector('#filterForm');
  if (filterForm) {
    {
      let d = location.href.split('#')[0].split('?');
      let base = d[0];
      let query = d[1];
      if (query) {
        const querySplit = query.split('&');
        querySplit.forEach((q) => {
          const paramrSplit = q.split('=');
          const paramKey = paramrSplit[0];
          const paramValue = paramrSplit[1];
          const input = filterForm.querySelector(`[name='${paramKey}']`);
          if (input) {
            const select = input.closest('.select,.select2');
            if (select) {
              const opt = select.querySelector(`[data-val='${paramValue}']`);
              if (opt) opt.setAttribute('data-init', '');
              if (select.classList.contains('select')) initSelect(select);
              if (select.classList.contains('select2')) initSelect2(select);
            }
          }
        });
      }

      const clearBtn = filterForm.querySelector('button[type="button"]');
      if (clearBtn) {
        clearBtn.onclick = () => {
          window.location.href = base;
        };
      }
    }
    filterForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const fields = this.querySelectorAll('input');

      let d = location.href.split('#')[0].split('?');
      let base = d[0];
      let query = d[1];
      let res = '';
      [...fields].forEach((field) => {
        if (field.value && field.value.length > 0) {
          if (res.length > 0) {
            res += '&' + field.name + '=' + field.value;
          } else res += field.name + '=' + field.value;
        }
      });
      query = `?${res}`;
      // if (query) {
      //   query = `&${res}`;
      // } else {
      // }
      window.location.href = base + query;
      console.log(base + query);

      //  const query = window.location.search.split('?')[1];
      //  if (query) {
      //    let params = query.split('&');
      //    for (let i = 0; i < params.length; i++) {
      //      const keyval = params[i].split('=');

      //      setValSelect(
      //        document.querySelector(`[data-selection='${keyval[0]}']`),
      //        keyval[1]
      //      );
      //    }
      //  }
    });
  }
});
