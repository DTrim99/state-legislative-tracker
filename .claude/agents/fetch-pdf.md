# Fetch PDF Agent

Download and extract text from a PDF URL. Use this when bill text or fiscal notes are only available as PDFs.

## When to Use

- Bill page links to a PDF instead of HTML text
- Fiscal notes (almost always PDFs)
- State tax instruction booklets for audit verification

## Process

### Step 1: Download the PDF

```bash
curl -L -o /tmp/{descriptive-name}.pdf "URL"
```

Use a descriptive filename like `/tmp/ga-sb168-bill.pdf` or `/tmp/ut-sb60-fiscal-note.pdf`.

### Step 2: Extract Text

**Primary method** (fast, good for most legislative PDFs):
```bash
pdftotext /tmp/{name}.pdf /tmp/{name}.txt
```

**Fallback** (better for complex layouts, tables):
```bash
python3 -c "
import pdfplumber
pdf = pdfplumber.open('/tmp/{name}.pdf')
text = '\n\n'.join([page.extract_text() or '' for page in pdf.pages])
print(text)
"
```

### Step 3: Read the Extracted Text

Use the Read tool on `/tmp/{name}.txt` to get the content.

## Tips

- Always use `curl -L` (follow redirects — state legislature sites redirect frequently)
- Use `pdftotext` first — it's faster and handles most bill PDFs well
- Use `pdfplumber` when `pdftotext` output has mangled tables or columns
- For visual verification (e.g., tax tables), render pages as images:
  ```bash
  pdftoppm -png -r 300 /tmp/{name}.pdf /tmp/{name}-page
  ```
  Then read the page images with the Read tool.

## Prerequisites

- `poppler` (provides `pdftotext` and `pdftoppm`): `brew install poppler` (macOS) or `apt-get install poppler-utils` (Linux)
- `pdfplumber` (optional fallback): `pip install pdfplumber`
