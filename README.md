# sixtoespe.github.io

Basic portfolio website, to share with the world.

## Overview

A first-run personal portfolio built with core **HTML, CSS and JavaScript** (no frameworks). It introduces me, Sixto Espejo: industrial engineer, quality assurance specialist, ISO 9001:2015 auditor and Microsoft Access / VBA developer who is learning Java, Javascript, web and mobile app development, and AI as a key focus to create amazing results.

This is a course assignment (a first run at a portfolio site).

Status: first version, live on GitHub Pages.

## Features

- **Animated header scene** – twinkling stars, slowly turning gears, floating code symbols and rising sparks around an animated gear-and-code logo (`js/HeaderScene.js`).
- **Slide-out navigation** – a hamburger button opens a circular-wipe side menu that works with mouse, keyboard (Esc closes it) and screen readers (`js/app.js`).
- **Multi-page site** – Home, About, Skills and Contact pages that share one stylesheet.
- **Responsive layout** – CSS Grid and Flexbox adapt the layout from desktop to phone.
- **Contact form** – client-side validation with clear, per-field error messages (`js/contact.js`).
- **Social links** – GitHub and LinkedIn icons in the menu and footer.

## Built With

- **Languages:** HTML, CSS, JavaScript
- **Frameworks and libraries:** none. [Font Awesome](https://fontawesome.com) (icons) and [Google Fonts](https://fonts.google.com) (Inter, JetBrains Mono) load from a CDN.
- **Development tools:** VS Code, Git, GitHub, GitHub Pages

## Getting Started

### Requirements

- A modern web browser.
- Git, to clone the repository.

### Download the Project

Run these commands in your macOS terminal using zsh:

```zsh
git clone https://github.com/sixtoespe/sixtoespe.github.io.git
cd sixtoespe.github.io
```

### Run Locally

1. Open the `sixtoespe.github.io` folder in VS Code (or any editor).
2. There is nothing to install: the site has no build step or dependencies.
3. Open `index.html` in your browser (double-click it, or run `open index.html` in zsh).

## Usage

Use the round menu button in the top-right corner to move between **Home**, **About**, **Skills** and **Contact**. On the Contact page, fill in your name, email and message and press **Send message**.

### Contact form

GitHub Pages hosts static files only, so the form needs a small form service to deliver messages to an inbox. To connect it:

1. Create a free form at a service such as [Formspree](https://formspree.io) and copy its endpoint URL.
2. In `contact.html`, put that URL in the form's `data-endpoint` attribute: `<form id="contactForm" novalidate data-endpoint="https://formspree.io/f/YOUR_FORM_ID">`.

Until an endpoint is set, the form still validates and shows a message explaining that it is not connected to an inbox yet.

## Testing

Manual checks used to verify the site:

- Every page loads without console errors and every link in the menu and footer works.
- The menu opens and closes with the button, with a link click and with the Esc key.
- The layout has no horizontal scrolling and stays readable at phone (about 390px), tablet and desktop widths.
- The contact form shows an error for each empty or invalid field, and a success message when all fields are valid.
- The page can be used with the keyboard alone (Tab, Enter, Esc), and animations stop when the system's "reduce motion" setting is on.

## Roadmap

- [ ] Add my real projects with screenshots and links to their repositories.
- [ ] Connect the contact form to an inbox.
- [ ] Add a mobile app project once I start building them.

## Contributing

Have an idea or found a bug? Open an issue with the details. To propose a change, fork the repository, create a branch, and submit a pull request explaining what you changed and how you tested it.

## Author

**Sixto Espejo** — [GitHub](https://github.com/sixtoespe)

## Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com); fonts by [Google Fonts](https://fonts.google.com).
- The logo and animated gear are my own design with some help of AI.

## License

Released under the [MIT License](LICENSE).
