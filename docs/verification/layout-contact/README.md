# Layout and contact verification

Verified on 18 November 2026 against the current production export.

The home page and navigation now follow Home, About, Projects, Expertise, Journey, and Contact. About is shorter, and Journey presents three brief entries grounded in the existing healthcare background, HMSI-API foundation, and Agro-Shield hackathon project. At a 390px viewport, the project section starts at approximately 1,699px, compared with approximately 2,905px before the change. About is 494px tall and Journey is 636px tall, compared with 626px and 784px previously.

The primary Contact action and footer Email link both use `mailto:josephbenjamin046@gmail.com`. The address is also visible as selectable text. The CV link will be added when the owner’s finished PDF is available.

Production build, lint, standalone type checking, and whitespace checks passed. The 33 relevant existing browser checks passed across desktop, tablet, and phone in separate runs. Coverage included automated WCAG A/AA scans on the home page, all three case studies, and the custom 404; dark and larger-text home appearances; project navigation; working assets; reduced motion and narrow layouts; and essential content without JavaScript.

The separate [browser inspection](browser-inspection.json) records the section and navigation order, email destinations, and layout measurements at 1440px, 768px, 390px, and 320px. Each inspected home page returned HTTP 200 and reported no horizontal overflow or browser errors.

- [Desktop home](home-1440-light.png)
- [Phone home](home-390-light.png)
- [Narrow dark home](home-320-dark.png)
- [Phone About](about-390-light.png)
- [Phone Journey](journey-390-light.png)
- [Phone Contact](contact-390-light.png)
