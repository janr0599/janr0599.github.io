#!/usr/bin/env python3
"""build/classic.html -> index.html, plus an inlined artifact copy"""
import pathlib, base64, re
root = pathlib.Path(__file__).resolve().parent.parent
HEAD = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="description" content="Javier Noguera Rodríguez, automation and AI engineer. Workflows and AI agents that keep running: n8n, Claude, OpenAI, Airtable.">\n'
        '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%}</style>\n')
TITLE = '<title>Javier Noguera Rodríguez · Automation &amp; AI Engineer</title>'

def build(src, out, cv_href, split_at):
    s = (root / src).read_text()
    head, body = s.split(split_at, 1)
    doc = HEAD + head.replace('<title>Javier Noguera</title>', TITLE, 1) + '</head>\n<body>\n' + split_at + body + '\n</body>\n</html>\n'
    doc = doc.replace('href="Javier-Noguera-CV.pdf"', 'href="%s"' % cv_href)
    (root / out).parent.mkdir(exist_ok=True)
    (root / out).write_text(doc)
    # artifact copy: inline images, no downloads
    a = s
    for m in set(re.findall(r'src="(\.\./)?assets/([^"]+)"', s)):
        f = m[1]
        a = a.replace('src="%sassets/%s"' % (m[0], f), 'src="data:image/jpeg;base64,%s"' % base64.b64encode((root / "assets" / f).read_bytes()).decode())
    a = a.replace('href="Javier-Noguera-CV.pdf"', 'href="https://www.linkedin.com/in/javier-noguera-rodriguez"').replace('href="../">', 'href="https://janr0599.github.io/">')
    (root / "build" / ("artifact-" + pathlib.Path(out).parent.name + ".html" if "/" in out else "artifact.html")).write_text(a)
    print(out, len(doc)//1024, "KB")

build("build/classic.html", "index.html", "Javier-Noguera-CV.pdf", '<div class="wrap">')
