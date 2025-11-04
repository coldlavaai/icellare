# DNA Video Setup Instructions

## Video File Location

The DNA background video is **NOT included in git** due to its large size (414MB).

**Required:** Place the video file at `public/dna-bg.mov`

### Where to get the video:
- Source: `~/Downloads/dna_20s.mov`
- Copy command: `cp ~/Downloads/dna_20s.mov public/dna-bg.mov`

### For Production Deployment:

The video is too large for GitHub/Vercel. Options:

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
