---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog-index">
  <a href="javascript:history.back()" class="back-button" aria-label="Go back">&#8592;</a>
  <h1>Blog</h1>

  {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in posts_by_year %}
  <h2 class="year-heading">{{ year.name }}</h2>
  <ul class="post-list">
    {% for post in year.items %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
    {% endfor %}
  </ul>
  {% endfor %}
</div>
