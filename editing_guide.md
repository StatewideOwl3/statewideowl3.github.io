# Editing Guide

This document explains how to add and manage content on this site. The site is built with **Jekyll**, a static site generator that runs natively on GitHub Pages. No build tools or CI/CD are required — just push Markdown files to the repository.

---

## Table of Contents

- [Overview](#overview)
- [Adding a Blog Post](#adding-a-blog-post)
- [Creating a New Page](#creating-a-new-page)
- [Categorizing Posts](#categorizing-posts)
- [Markdown Best Practices](#markdown-best-practices)
- [Updating Your Name and Links](#updating-your-name-and-links)
- [Running Locally](#running-locally)

---

## Overview

All content is written in **Markdown** with YAML front matter (the block between `---` lines at the top of each file). The site's visual appearance is controlled entirely by `assets/css/style.css` — you should rarely need to touch it unless you want to change the design.

---

## Adding a Blog Post

Create a new file in `_posts/` following this naming convention:

```
_posts/YYYY-MM-DD-your-slug-here.md
```

The date in the filename determines the publication date and the URL.

Each post must begin with front matter:

```yaml
---
layout: post
title: "Your Post Title"
categories: rust
---
```

### Front matter fields

| Field        | Required | Description |
|-------------|----------|-------------|
| `layout`    | Yes      | Must be `post` |
| `title`     | Yes      | The post title, in quotes |
| `categories` | Yes     | One or more category tags, space-separated: `rust python compilers` |
| `date`      | No       | Override the date from the filename (rarely needed) |
| `description` | No     | Short summary for meta tags |

### Example post header

```yaml
---
layout: post
title: "Getting Started with Rust's Type System"
categories: rust
---
```

Write the body in standard Markdown below the front matter.

---

## Creating a New Page

Create a `.md` file in the root directory. The filename becomes the URL slug.

Example: `about.md` becomes `yoursite.github.io/about/`.

Front matter for a page:

```yaml
---
layout: page
title: About
permalink: /about/
---
```

The `permalink` field controls the URL. Omitting it will use the filename.

### Adding a new category page

If you want to add a new category (sidebar navigation item):

1. Create a `.md` file, e.g., `database.md`
2. Add it to `_includes/sidebar.html` as a new `<li>` item
3. Use the same `categories` tag in your posts

Category page template:

```markdown
---
layout: default
title: Databases
permalink: /databases/
---

<a href="javascript:history.back()" class="back-button" aria-label="Go back">&#8592;</a>
<h1>Databases</h1>

<ul class="post-list">
{% for post in site.categories.databases %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
{% endfor %}
</ul>
```

---

## Categorizing Posts

Use the `categories` field in front matter to tag posts. A post can belong to multiple categories:

```yaml
categories: rust compilers formal-methods
```

Category names must match the sidebar links and the category page filenames exactly. Use lowercase with hyphens for multi-word categories (e.g., `machine-learning`, `functional-programming`).

Existing categories:

- `humor`
- `book-reviews`
- `python`
- `rust`
- `mathematics`
- `machine-learning`
- `functional-programming`
- `compilers`
- `formal-methods`
- `markets`
- `public-policy`

---

## Markdown Best Practices

### Headings

Use `##` for H2 and `###` for H3. There is only one H1 per page (the title from front matter).

```markdown
## Section Heading

### Subsection Heading
```

### Links

```markdown
[visible text](https://example.com)
```

### Code

Inline code uses single backticks:

```markdown
Use the `String::from` function.
```

Code blocks use triple backticks with a language hint:

````markdown
```rust
fn main() {
    println!("Hello, world!");
}
```
````

Supported language hints: `rust`, `python`, `haskell`, `ocaml`, `c`, `cpp`, `javascript`, `typescript`, `bash`, `plaintext`.

### Blockquotes

```markdown
> This is a blockquote. It will appear as indented italic text.
```

### Images

```markdown
![Alt text](/assets/images/filename.png)
```

Place images in `assets/images/`. Keep them small and use appropriate formats.

### Lists

Unordered:

```markdown
- Item one
- Item two
- Item three
```

Ordered:

```markdown
1. First
2. Second
3. Third
```

### Horizontal rules

```markdown
---
```

---

## Updating Your Name and Links

Edit `_config.yml`:

```yaml
title: Your Name
description: Personal site and technical blog
url: https://yourusername.github.io
```

Then update the following files with your details:

- **`index.md`** — your bio and greeting
- **`contact.md`** — your email, GitHub, Twitter/X, LinkedIn URLs

---

## Running Locally

To preview the site before pushing to GitHub:

```bash
# Install Jekyll and Bundler
gem install jekyll bundler

# Start the dev server
bundle exec jekyll serve

# Or, if you don't want to install Jekyll:
# Install the GitHub Pages gem
gem install github-pages
jekyll serve
```

The site will be available at `http://localhost:4000`.

GitHub Pages will build and serve the site automatically when you push to the `main` branch. No manual build step is needed.
