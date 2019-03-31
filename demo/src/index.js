import skaler from './../../src/index.js';

const picker = document.querySelector('.file');
const result = document.querySelector('.result');

picker.addEventListener('change', async () => {
  let file = picker.files[0];

  const img = (label, file, opts) => {
    return new Promise(async res => {
    	const img = await skaler(file, opts);
      const image = new Image();
      image.onload = () => res({image, label});
      image.src = URL.createObjectURL(img);
    });
  }

  const images = await Promise.all([
    img('Scale down to 200px width', file, {width: 200}),
    img('Scale up to 900px width', file, {width: 900}),
    img('Scale to 0.5 percent', file, {scale: 0.5}),
    img('Stretch to 150x150px', file, {width: 150, height: 150})
  ]);

  images.forEach(({image, label}) => {
		const labelEl = document.createElement('h3');
		labelEl.textContent = label;
		result.appendChild(labelEl);
		result.appendChild(image);
	});
});
