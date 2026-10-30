---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% comment %}
  Para atualizar o CV, substitua o arquivo files/CV_Luciano_Costa.pdf (mesmo nome).
{% endcomment %}
{% assign cv_file = "/files/CV_Luciano_Costa.pdf" | prepend: site.baseurl %}

<p><a class="btn btn--primary" href="{{ cv_file }}" target="_blank">Download CV (PDF)</a></p>

<object data="{{ cv_file }}" type="application/pdf" width="100%" style="height: 85vh; min-height: 600px;">
  <p>Your browser cannot display the PDF here. <a href="{{ cv_file }}">Click to open the CV.</a></p>
</object>
