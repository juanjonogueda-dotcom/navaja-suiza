#!/usr/bin/env python3
"""Small dependency-free structural checks for the repository's HTML pages."""

from html.parser import HTMLParser
from pathlib import Path


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids: list[str] = []

    def handle_starttag(self, _tag: str, attrs: list[tuple[str, str | None]]) -> None:
        element_id = dict(attrs).get("id")
        if element_id:
            self.ids.append(element_id)


root = Path(__file__).resolve().parent.parent
pages = sorted(root.glob("*.html"))

for page in pages:
    source = page.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(source)
    duplicates = sorted({value for value in parser.ids if parser.ids.count(value) > 1})
    if duplicates:
        raise SystemExit(f"{page.name}: duplicate IDs: {', '.join(duplicates)}")
    if source.rstrip().lower().endswith("</html>") is False:
        raise SystemExit(f"{page.name}: content found after the HTML document")

print(f"Checked structure and IDs in {len(pages)} HTML files.")
