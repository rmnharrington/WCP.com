# Wendi Coffman Porter Author Website

A stunning, artistic author website showcasing the works of Wendi Coffman Porter, a prolific writer of science fiction, fantasy, romance, crime thrillers, and historical fiction.

**Website:** wendicoffmanporter.com

## Features

- **Animated Floating Quotes**: Dynamic, moving quotes throughout the site to engage visitors
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Elements**: Smooth scrolling, hover effects, and engaging animations
- **Genre Showcase**: Dedicated sections for each writing genre
- **Writing Samples**: Preview excerpts from various works
- **Audio Integration**: Ready for YouTube audio chapter integration
- **Contact Form**: Functional contact form with validation
- **Modern UI**: Beautiful typography and artistic design elements

## File Structure

```
wendicoffmanporter.com/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

1. **Upload Files**: Upload all files to your web server
2. **Configure Audio**: Replace placeholder audio players with actual YouTube embeds
3. **Add Images**: Replace placeholder author photo and character images
4. **Update Content**: Customize quotes, book titles, and author information
5. **Test**: Verify all functionality works across different devices

## Customization

### Adding Your Audio Chapters
Replace the audio player sections in `index.html` with YouTube embeds:

```html
<iframe width="100%" height="200" 
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
        frameborder="0" 
        allowfullscreen>
</iframe>
```

### Adding Character Images
1. Create an `images/` folder
2. Add your character images
3. Update the image placeholders in the HTML

### Updating Quotes
Modify the quotes array in `script.js` to include your own writing snippets:

```javascript
const quotes = [
    "Your quote here...",
    "Another beautiful quote...",
    // Add more quotes
];
```

## Technical Details

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with flexbox and grid
- **Vanilla JavaScript**: No external dependencies
- **Responsive**: Mobile-first design approach
- **Performance**: Optimized animations and smooth scrolling

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment Notes

1. Ensure all files are uploaded to the web root
2. Test the contact form functionality
3. Verify all animations work smoothly
4. Check mobile responsiveness
5. Validate HTML and CSS

## Contact

For technical support or customization requests, contact the development team.

---

**Note**: This website is designed to showcase the author's work with a focus on visual appeal and user engagement. The floating quotes and animations create an immersive reading experience that reflects the author's creative storytelling.
