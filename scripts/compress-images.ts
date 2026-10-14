import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

interface OptimizationResult {
  file: string;
  originalBytes: number;
  compressedBytes: number;
  width?: number;
  height?: number;
  format: string;
  success: boolean;
  error?: string;
}

async function optimizeImages() {
  console.log('=== Batch Image Optimization ===\n');

  const root = process.cwd();
  const searchDirs = [
    path.join(root, 'public', 'images'),
    path.join(root, 'public', 'assets', 'images'),
    path.join(root, 'public', 'src', 'assets', 'images'),
    path.join(root, 'src', 'assets', 'images'),
  ];

  const imageFiles: string[] = [];

  function collectFiles(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        collectFiles(full);
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(ent.name)) {
        imageFiles.push(full);
      }
    }
  }

  searchDirs.forEach(collectFiles);

  console.log(`Found ${imageFiles.length} local image files to optimize in batches.\n`);

  const results: OptimizationResult[] = [];
  let totalOriginalBytes = 0;
  let totalCompressedBytes = 0;

  for (const filePath of imageFiles) {
    const relPath = path.relative(root, filePath);
    const origStat = fs.statSync(filePath);
    const origBytes = origStat.size;
    totalOriginalBytes += origBytes;

    try {
      const meta = await sharp(filePath).metadata();
      const ext = path.extname(filePath).toLowerCase();
      const baseNoExt = filePath.slice(0, -ext.length);

      let compressedBuffer: Buffer;
      let targetFormat = 'jpeg';

      if (ext === '.webp') {
        targetFormat = 'webp';
        compressedBuffer = await sharp(filePath)
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
      } else {
        // Optimize JPEG in place with mozjpeg progressive encoding
        compressedBuffer = await sharp(filePath)
          .jpeg({ quality: 82, mozjpeg: true, progressive: true })
          .toBuffer();

        // Also generate matching .webp companion
        const webpCompanionPath = `${baseNoExt}.webp`;
        const webpBuffer = await sharp(filePath)
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
        fs.writeFileSync(webpCompanionPath, webpBuffer);
      }

      // Overwrite original file only if compressed buffer is smaller or equal
      if (compressedBuffer.length < origBytes) {
        fs.writeFileSync(filePath, compressedBuffer);
        totalCompressedBytes += compressedBuffer.length;
        results.push({
          file: relPath,
          originalBytes: origBytes,
          compressedBytes: compressedBuffer.length,
          width: meta.width,
          height: meta.height,
          format: targetFormat,
          success: true,
        });
      } else {
        totalCompressedBytes += origBytes;
        results.push({
          file: relPath,
          originalBytes: origBytes,
          compressedBytes: origBytes,
          width: meta.width,
          height: meta.height,
          format: targetFormat,
          success: true,
        });
      }

      const percent = (((origBytes - (results[results.length - 1].compressedBytes)) / origBytes) * 100).toFixed(1);
      console.log(`✓ ${relPath}: ${(origBytes / 1024).toFixed(1)} KB -> ${(results[results.length - 1].compressedBytes / 1024).toFixed(1)} KB (-${percent}%)`);
    } catch (err: any) {
      console.error(`✗ Error processing ${relPath}:`, err.message);
      results.push({
        file: relPath,
        originalBytes: origBytes,
        compressedBytes: origBytes,
        format: 'unknown',
        success: false,
        error: err.message,
      });
      totalCompressedBytes += origBytes;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Images processed: ${results.length}`);
  console.log(`Total size before: ${(totalOriginalBytes / 1024).toFixed(1)} KB (${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`Total size after:  ${(totalCompressedBytes / 1024).toFixed(1)} KB (${(totalCompressedBytes / (1024 * 1024)).toFixed(2)} MB)`);
  const totalSaved = totalOriginalBytes - totalCompressedBytes;
  console.log(`Saved: ${(totalSaved / 1024).toFixed(1)} KB (${(totalSaved / (1024 * 1024)).toFixed(2)} MB, -${((totalSaved / totalOriginalBytes) * 100).toFixed(1)}%)`);

  // Write summary json for verification
  fs.writeFileSync(
    path.join(root, 'scripts', 'compression-report.json'),
    JSON.stringify({ totalOriginalBytes, totalCompressedBytes, totalSaved, results }, null, 2),
    'utf8'
  );
}

optimizeImages().catch((err) => {
  console.error('Fatal batch optimization error:', err);
  process.exit(1);
});
