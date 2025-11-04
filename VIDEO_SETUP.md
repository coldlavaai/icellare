# DNA Video Setup Instructions

## Video File Status: ✅ COMPRESSED AND INCLUDED

The DNA background video has been **successfully compressed** and is now included in the repository!

### Compression Details:
- **Original:** `~/Downloads/dna_20s.mov` (414MB, ProRes HQ)
- **Compressed:** `public/dna-bg.mp4` (1.1MB, H.264)
- **Compression ratio:** 99.7% reduction
- **Resolution:** 1280x720 (from 1920x1080)
- **Format:** MP4 with H.264 codec for maximum browser compatibility

The compressed video maintains excellent quality while being small enough for GitHub and fast to load on the web.

## Original Setup Options (NO LONGER NEEDED)

<details>
<summary>Click to see original compression options (for reference only)</summary>

### For Production Deployment (if compression was needed):

The original video was too large for GitHub/Vercel. Options:

1. **Compress the video** (recommended):
   ```bash
   # Requires ffmpeg
   ffmpeg -i ~/Downloads/dna_20s.mov \
     -vcodec libx264 \
     -pix_fmt yuv420p \
     -crf 28 \
     -preset medium \
     -movflags +faststart \
     -vf "scale=1280:-2" \
     -an \
     public/dna-bg.mp4
   ```
   Then update VideoBackground.tsx to use `/dna-bg.mp4`

2. **Use CDN hosting**:
   - Upload to Cloudflare R2, AWS S3, or similar
   - Update `src="/dna-bg.mov"` to CDN URL

3. **Use Vercel Blob Storage**:
   ```bash
   npm install @vercel/blob
   ```
   Upload video and use blob URL

</details>

## Current Implementation

The VideoBackground component features:
- ✅ Scroll-controlled video scrubbing
- ✅ 360° rotation tied to scroll progress
- ✅ Dynamic scaling (1.0x → 1.4x → 1.2x)
- ✅ Parallax vertical movement
- ✅ Opacity transitions
- ✅ Centered fixed positioning
- ✅ Content scrolls OVER the DNA

Based on the instructions in `CLAUDE_CODE_INSTRUCTIONS.md`.
