# Good first issues

## Add a second tax rate per line item
Scope: extend the line item model with an optional tax rate override.
Keep the single-rate path as the default and add tests for mixed rates.

## Add due-date overdue highlighting in history
Scope: store a due date on each document and flag overdue invoices in the history list.
No server work, localStorage only.

## Add a printable HTML fallback when pdf-lib fails to load
Scope: detect a missing PDFLib global and offer a print-friendly window instead.
Keep the PDF path unchanged when the library loads.

