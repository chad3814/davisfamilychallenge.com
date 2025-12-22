# Tech Stack

## Core Technologies

### Frontend
- **Pure HTML** - Static HTML files with no templating engine, build process, or framework dependencies
  - *Rationale:* Maximum longevity and accessibility; HTML files from 2006 still work perfectly in 2024 browsers with zero maintenance
  - *Trade-offs:* Manual updates required for each year, some duplication across files, but eliminates all build/dependency risks

- **Inline CSS** - All styling embedded within `<style>` tags in each HTML file
  - *Rationale:* Self-contained pages that don't rely on external stylesheets, ensuring styles never break due to missing files
  - *Trade-offs:* Style duplication across files, but guarantees each page works independently and survives file moves or hosting changes

- **No JavaScript** - Zero client-side scripting, pure HTML/CSS only
  - *Rationale:* Works on all devices including minimal browsers, accessibility tools, and archive readers; no security vulnerabilities from script injection
  - *Trade-offs:* No interactive features like search or filtering, but ensures universal compatibility and eliminates entire class of maintenance issues

### Deployment

- **nginx** - Lightweight web server for serving static files
  - *Rationale:* Industry-standard static file server with minimal resource usage, proven reliability, and simple configuration
  - *Trade-offs:* Requires server/container knowledge, but provides professional-grade hosting with excellent performance

- **Docker** - Container-based deployment using official nginx image
  - *Rationale:* Portable deployment that works identically across development, staging, and production; simple Dockerfile copying HTML files to nginx html directory
  - *Trade-offs:* Requires Docker knowledge, but provides consistency and easy deployment to any hosting environment

### Hosting

- **GitHub Pages** - Static site hosting via CNAME configuration (davisfamilychallenge.com)
  - *Rationale:* Free, reliable hosting with automatic HTTPS, excellent uptime, and zero maintenance overhead
  - *Trade-offs:* Public repository required, but content is intentionally public family archive

## Media Assets

- **Direct File References** - Images (`.jpg`) and videos (`.mp4`) stored at repository root or in `videos/` directory
  - *Rationale:* Simple relative paths from HTML files, no CDN or asset pipeline complexity
  - *Trade-offs:* All media assets committed to git repository increasing repo size, but ensures all assets travel with the site and never break

## Development Workflow

- **No Build Process** - HTML files edited directly, changes immediately visible
  - *Rationale:* Zero-friction updates; anyone can edit HTML in a text editor without installing tools or running build commands
  - *Trade-offs:* No preprocessing, minification, or optimization, but file sizes remain small and performance is excellent for this content

- **Direct Browser Testing** - Open HTML files directly in browser, no local server required
  - *Rationale:* Simplest possible development workflow; edit HTML, refresh browser, done
  - *Trade-offs:* Cannot test features requiring HTTP server, but site doesn't use any such features

## Version Control

- **Git** - Repository hosted at GitHub with standard branching workflow
  - *Rationale:* Full history of all changes, easy rollback if needed, collaboration support for multiple family members
  - *Trade-offs:* None; git is standard practice and provides significant value for historical archive

## Why This Stack?

### Longevity First
HTML files created in 2006 still work perfectly in 2024 browsers. By avoiding frameworks, build tools, and JavaScript dependencies, this archive will remain accessible for decades regardless of technology trends. Future family members will be able to open these files in whatever browsers exist 50+ years from now.

### Maintenance-Free
No dependencies mean no security updates, no breaking changes, no framework migrations, no npm audit warnings. The site requires zero maintenance beyond adding new annual content. Family members can add new years by simply copying an existing HTML file and updating the content.

### Universal Accessibility
Works on any device with a browser - modern smartphones, old desktop computers, accessibility tools, archive readers, and future devices we can't predict. No account required, no app to install, no platform lock-in.

### Simple Deployment
The entire site is just HTML files. It can be hosted on GitHub Pages, Netlify, AWS S3, or simply copied to any web server. The Docker configuration provides professional deployment but isn't required - you could host these files on any HTTP server.

### Future-Proof
By choosing the most fundamental web technologies (HTML and CSS) and avoiding abstractions, the site is protected against the software industry's constant churn. There's no framework that will be deprecated, no build tool that will stop being maintained, no JavaScript library that will have security vulnerabilities.

This is an intentional decision to prioritize permanence and accessibility over modern development conveniences. For a family archive meant to last generations, these trade-offs strongly favor simplicity.
