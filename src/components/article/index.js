import './index.scss';

const article = document.querySelector('.article');

window.addEventListener('scroll', () => {
  if (article) {
    if (window.scrollY > 300) {
      if (!article.classList.contains('article-fixed'))
        article.classList.add('article-fixed');
    } else article.classList.remove('article-fixed');
    if (window.scrollY > 315) {
      if (!article.classList.contains('article-fixed-active')) {
        article.addEventListener('click', scrollTop);
        article.classList.add('article-fixed-active');
      }
    } else {
      article.removeEventListener('click', scrollTop);
      article.classList.remove('article-fixed-active');
    }
  }
});

const scrollTop = () => window.scrollTo(scrollY, 0);
