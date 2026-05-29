---
layout: default
title: Book Reviews
permalink: /book-reviews/
---

<a href="javascript:history.back()" class="back-button" aria-label="Go back">&#8592;</a>
<h1>Book Reviews</h1>

<ul class="post-list">
{% for post in site.categories.book-reviews %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
{% endfor %}
</ul>
