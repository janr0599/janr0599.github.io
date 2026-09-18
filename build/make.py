#!/usr/bin/env python3
"""build/body.html -> index.html (GitHub Pages) + build/artifact.html (inlined preview)"""
import pathlib, base64
root = pathlib.Path(__file__).resolve().parent.parent
s = (root / "build/body.html").read_text()
head, body = s.split('<header class="bar">', 1)
doc = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
       '<meta name="description" content="Javier Noguera Rodríguez, automation and AI engineer. Workflows and AI agents that keep running: n8n, Claude, OpenAI, Airtable.">\n'
       '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%}</style>\n'
       + head.replace('<title>Javier Noguera</title>', '<title>Javier Noguera Rodríguez · Automation &amp; AI Engineer</title>', 1)
       + '</head>\n<body>\n<header class="bar">' + body + '\n</body>\n</html>\n')
(root / "index.html").write_text(doc)
a = s
for f in ["video-thumb.jpg", "photo-sm.jpg", "grafana.jpg", "agent-canvas.jpg"]:
    if ("assets/%s" % f) not in a: continue
    a = a.replace('src="assets/%s"' % f, 'src="data:image/jpeg;base64,%s"' % base64.b64encode((root / "assets" / f).read_bytes()).decode())
a = a.replace('href="Javier-Noguera-CV.pdf"', 'href="https://www.linkedin.com/in/javier-noguera-rodriguez"')
(root / "build/artifact.html").write_text(a)
print("index.html %d KB, artifact %d KB" % (len(doc)//1024, len(a)//1024))
