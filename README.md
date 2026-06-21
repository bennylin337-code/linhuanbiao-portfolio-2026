# Lin Huanbiao Creative Portfolio

Project name: Lin Huanbiao Creative Portfolio  
Tech stack: Vite + React + CSS

After Photography: AI Moving Image Experiments  
摄影之后：AI影像实验计划

This is an independent Vite + React + CSS portfolio website for course presentation, portfolio review and future graduate application use. All current project entries are clearly marked as Work in progress / Prototype in progress.

## Local Run

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment: Vercel

1. Push this independent project to GitHub.
2. Import the repository in Vercel.
3. Use the Vite defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy only after reviewing project status labels, images and contact information.

## Course Presentation Usage

1. Open the website link.
2. Click `Presentation Mode` in the header.
3. Present the sections in this order:
   - Profile
   - Projects
   - Process
   - Contact
4. Click any project card to open its case file modal.
5. Use the Process cards to show what is prepared, pending or still in progress.

## QR Code Usage After Deployment

After Vercel deployment, copy the public Vercel URL and generate a QR code from that URL for course presentation slides, printed handouts or classroom review. Test the QR code on a phone before presentation day.

## Replace Project Images

Project covers currently use generated "Case File Cover" panels when real media files are not present.

When real stills, screenshots or documentation images are ready:

1. Add images to `public/assets/projects/`.
2. Update the existing `coverImage` fields in `src/data/projects.js` if the filenames change.
3. Keep `coverAlt`, `visualStatus`, `evidenceItems` and `nextStep` accurate.

The expected asset paths are documented in `public/assets/projects/README.md`.

Video should only be added after compression. The homepage does not load gameplay video; `p3-gameplay-demo.mp4` is checked and loaded only when the P3 modal is opened.

Keep in-progress work clearly labeled as Work in progress or Prototype in progress.

## Update Email and Project Text

Edit static content in:

- `src/components/Contact.jsx` for the email address and contact buttons.
- `src/data/projects.js` for project cards, modal details, process modules and skills.
- `src/components/Hero.jsx` for the hero introduction and archive panel.
- `src/components/Profile.jsx` for profile text and stats.

Do not add awards, internships, language scores, exhibitions or unsupported achievement claims unless they are true and ready to be shown.
