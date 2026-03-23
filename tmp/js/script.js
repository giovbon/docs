try {
  import('./module.js')
    .then(() => console.log('Import succ'))
    .catch(e => console.log('Import failed:', e.message));
} catch(e) {
  console.log('Sync err', e);
}
