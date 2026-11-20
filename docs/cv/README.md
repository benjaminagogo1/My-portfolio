# Updating Benjamin's CV

The editable source is [otete-benjamin-agogo-cv.docx](otete-benjamin-agogo-cv.docx). The portfolio serves the PDF at [public/cv/otete-benjamin-agogo-cv.pdf](../../public/cv/otete-benjamin-agogo-cv.pdf).

1. Open the DOCX in Word or LibreOffice Writer and make your changes.
2. Export it as a PDF with hyperlinks and document tags enabled. Keep project headings with their bullets and date ranges on one line.
3. Replace `public/cv/otete-benjamin-agogo-cv.pdf`, keeping that filename.
4. Rebuild and publish the portfolio. All View CV links use the updated PDF; the content-based version in their URL changes automatically.

The editable DOCX is an authoring file. The public website links only to the PDF.

The current CV uses the confirmed AI-Native Engineer title, Benue State University and 2025 graduation year, Project Initiator & Lead Developer role for Nurse.ng and HMSI-API, Agro-Shield's Frontend Lead role, and Igede Language SI's Project Lead & Data Collection Platform Co-Developer role. The fellowship title is AI Engineering Fellow at Talent Nation Fellowship (formerly Learn2Earn), retaining the existing 2025–Present dates. Nurse.ng is labeled MVP Completed, Agro-Shield is a completed collaborative project, and HMSI-API and Igede Language SI are in development. HMSI-API testing uses synthetic data, and the Igede chatbot and translation system remain planned. Private repositories offer an email action to request access.

Blank URL spaces are provided for Nurse.ng, HMSI-API, and Igede Language SI. Replace those spaces with the actual deployment URLs in the DOCX when ready, enable hyperlinks, and export the updated PDF. The website's separate deployment URL fields remain blank in `projectLiveUrls` in `src/lib/content.ts` until you fill them in.

The finance project points to its verified directory within `software-engineering-laboratory`. No public portfolio URL has been supplied, so the CV does not include an invented website address. Once published, add the actual portfolio address to the DOCX before exporting the next PDF.

See [the portfolio's CV update guide](../LINKS.md#updating-the-cv) for publishing details.
