window.__keyconfBoot = new Promise((resolve) => { window.__keyconfBooted = resolve; });
window.addEventListener('hf-seek', (event) => {
  const complete = window.__keyconfBoot.then(() => window.__keyconfRenderAt(event.detail.time));
  event.detail.waitUntil(complete);
});
