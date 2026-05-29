---
layout: default
title: Humor
permalink: /humor/
---

<a href="javascript:history.back()" class="back-button" aria-label="Go back">&#8592;</a>
<h1>Humor</h1>

<ul class="post-list">
{% for post in site.categories.humor %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
{% endfor %}
</ul>
