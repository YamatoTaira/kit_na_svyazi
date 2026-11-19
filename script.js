/* ===== Навигация по страницам (#home, #about, #team, #portfolio, #contacts) ===== */
const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('nav a')];

function route() {
  let h = (location.hash || '#home').slice(1);
  if (!pages.some(p => p.id === h)) h = 'home';
  pages.forEach(p => p.classList.toggle('on', p.id === h));
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + h));
  scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();

/* ===== Фото команды =====
   Все фото лежат в папке team_photo.
   Чтобы добавить фото в карточку, впиши только имя файла в data-team-photo:
   <div class="team-photo-wrap" data-team-photo="ivanov.jpg">
   Если файла нет или поле пустое, остаётся синий квадрат с буквой. */
const TEAM_PHOTO_DIR = 'team_photo/';

document.querySelectorAll('.team-photo-wrap').forEach(wrap => {
  const name = (wrap.dataset.teamPhoto || '').trim();
  if (!name) return;
  const img = wrap.querySelector('.team-photo');
  if (!img) return;
  img.loading = 'eager'; // lazy не грузит картинки в скрытой вкладке
  img.onload = () => wrap.classList.add('has-photo');
  img.onerror = () => wrap.classList.remove('has-photo');
  img.src = name.includes('/') ? name : TEAM_PHOTO_DIR + encodeURIComponent(name);
});
