export default function skaler(file, { scale, width, height, name = file.name, type = file.type } = {}) {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = e => {
			const img = new Image();
			img.src = e.target.result;
			img.onload = () => {
				const el = document.createElement('canvas');
				const dir = (width < img.width || height < img.height) ? 'min' : 'max';
				const stretch = width && height;
				const ratio = scale ? scale : Math[dir](
					(width / img.width) || 1,
					(height / img.height) || 1
				);
				let w = el.width = stretch ? width : img.width * ratio;
				let h = el.height = stretch ? height : img.height * ratio;
				const ctx = el.getContext('2d');
				ctx.drawImage(img, 0, 0, w, h);
				el.toBlob(blob => res(new File([blob], name, { type, lastModified: Date.now() })));
				reader.onerror = rej;
			}
		}
	});
}
