---
layout: default
title: Public Policy
permalink: /public-policy/
---

<a href="javascript:history.back()" class="back-button" aria-label="Go back">&#8592;</a>
<h1>Public Policy</h1>

<ul class="post-list">
{% for post in site.categories.public-policy %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
{% endfor %}
</ul>
