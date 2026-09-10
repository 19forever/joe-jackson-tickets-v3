/**
 * ImageCompressor - Klientská komprese obrázků pro Joe Jackson Archive
 */
const ImageCompressor = {
  /**
   * Zmenší a zkompruje obrázek z HTML File inputu
   * @param {File} file - Původní soubor z inputu (e.g. e.target.files[0])
   * @param {Object} options - Konfigurace komprese
   * @returns {Promise<{blob: Blob, file: File, dataUrl: string, width: number, height: number}>}
   */
  async compress(file, options = {}) {
    const config = {
      maxWidth: options.maxWidth || 1400,
      maxHeight: options.maxHeight || 1400,
      quality: options.quality || 0.82, // 80–85 %
      mimeType: options.mimeType || 'image/webp', // Preferuje WebP
      fallbackMimeType: 'image/jpeg'
    };

    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Vybraný soubor není platný obrázek.'));
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          // 1. Výpočet nových rozměrů při zachování poměru stran
          let { width, height } = img;

          if (width > config.maxWidth || height > config.maxHeight) {
            if (width > height) {
              height = Math.round((height * config.maxWidth) / width);
              width = config.maxWidth;
            } else {
              width = Math.round((width * config.maxHeight) / height);
              height = config.maxHeight;
            }
          }

          // 2. Vykreslení na HTML5 Canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          
          // Zajištění čistého vykreslení při zmenšování
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // 3. Export z Canvasu do Blobu / Souboru
          const processCanvas = (targetMime) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  // Fallback na JPEG, pokud prohlížeč nepodporuje WebP export
                  if (targetMime !== config.fallbackMimeType) {
                    return processCanvas(config.fallbackMimeType);
                  }
                  return reject(new Error('Komprese obrázku na canvasu selhala.'));
                }

                // Vytvoření souborového názvu s novou příponou
                const extension = targetMime === 'image/webp' ? '.webp' : '.jpg';
                const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                const newFileName = `${originalName}${extension}`;

                const compressedFile = new File([blob], newFileName, {
                  type: targetMime,
                  lastModified: Date.now()
                });

                const dataUrl = canvas.toDataURL(targetMime, config.quality);

                resolve({
                  blob: blob,
                  file: compressedFile,
                  dataUrl: dataUrl,
                  width: width,
                  height: height,
                  originalSize: file.size,
                  compressedSize: blob.size
                });
              },
              targetMime,
              config.quality
            );
          };

          processCanvas(config.mimeType);
        };

        img.onerror = () => reject(new Error('Chyba při načítání obrázku.'));
      };

      reader.onerror = () => reject(new Error('Chyba při čtení souboru.'));
    });
  }
};

// Exponování pro použití v běžných skriptech bez ES6 importů
window.ImageCompressor = ImageCompressor;
