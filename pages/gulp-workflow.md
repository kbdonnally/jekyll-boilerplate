---
layout: page
title: Gulp Workflow
permalink: /gulp-workflow/
nav: true
---

*NB: also appears in `docs` folder.*

- Link to the docs I made on the SLab site for more details, but wanted to cover some stuff about initial setup.

## Prerequisites

- See Gulp docs on SLab site re. Node.js & npm

- Will need to have a `package.json` file, where all of your info on JS libraries lives. The [documentation](https://docs.npmjs.com/getting-started/using-a-package.json) on this process is very good.

## Installation & Writing Gulpfile

- Again, mostly covered in SLab docs

## Task structure

{:.language-yaml}
```
C:\my-projects\jekyll-boilerplate>gulp --tasks
[17:33:22] Tasks for C:\my-projects\jekyll-boilerplate\gulpfile.js
[17:33:22] ├── js_main_format
[17:33:22] ├── js_lib_format
[17:33:22] ├─┬ js_format
[17:33:22] │ └─┬ <parallel>
[17:33:22] │   ├── js_main_format
[17:33:22] │   └── js_lib_format
[17:33:22] ├── js_main_clean
[17:33:22] ├── js_site_clean
[17:33:22] ├─┬ js_clean
[17:33:22] │ └─┬ <parallel>
[17:33:22] │   ├── js_main_clean
[17:33:22] │   └── js_site_clean
[17:33:22] ├── js_main_watch
[17:33:22] ├─┬ js
[17:33:22] │ └─┬ <series>
[17:33:22] │   ├─┬ js_clean
[17:33:22] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── js_main_clean
[17:33:23] │   │   └── js_site_clean
[17:33:23] │   ├─┬ js_format
[17:33:23] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── js_main_format
[17:33:23] │   │   └── js_lib_format
[17:33:23] │   └── js_main_watch
[17:33:23] ├── css_main_format
[17:33:23] ├── css_lib_format
[17:33:23] ├─┬ css_format
[17:33:23] │ └─┬ <parallel>
[17:33:23] │   ├── css_main_format
[17:33:23] │   └── css_lib_format
[17:33:23] ├── css_main_clean
[17:33:23] ├── css_site_clean
[17:33:23] ├─┬ css_clean
[17:33:23] │ └─┬ <parallel>
[17:33:23] │   ├── css_main_clean
[17:33:23] │   └── css_site_clean
[17:33:23] ├── css_main_watch
[17:33:23] ├─┬ css
[17:33:23] │ └─┬ <series>
[17:33:23] │   ├─┬ css_clean
[17:33:23] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── css_main_clean
[17:33:23] │   │   └── css_site_clean
[17:33:23] │   ├─┬ css_format
[17:33:23] │   │ └─┬ <parallel>
[17:33:23] │   │   ├── css_main_format
[17:33:23] │   │   └── css_lib_format
[17:33:23] │   └── css_main_watch
[17:33:23] ├── img_format
[17:33:23] ├── img_watch
[17:33:23] ├── img_clean
[17:33:23] ├─┬ img
[17:33:23] │ └─┬ <series>
[17:33:23] │   ├── img_clean
[17:33:23] │   ├── img_format
[17:33:23] │   └── img_watch
[17:33:23] └─┬ assets
[17:33:23]   └─┬ <parallel>
[17:33:23]     ├─┬ js
[17:33:23]     │ └─┬ <series>
[17:33:23]     │   ├─┬ js_clean
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── js_main_clean
[17:33:23]     │   │   └── js_site_clean
[17:33:23]     │   ├─┬ js_format
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── js_main_format
[17:33:23]     │   │   └── js_lib_format
[17:33:23]     │   └── js_main_watch
[17:33:23]     ├─┬ css
[17:33:23]     │ └─┬ <series>
[17:33:23]     │   ├─┬ css_clean
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── css_main_clean
[17:33:23]     │   │   └── css_site_clean
[17:33:23]     │   ├─┬ css_format
[17:33:23]     │   │ └─┬ <parallel>
[17:33:23]     │   │   ├── css_main_format
[17:33:23]     │   │   └── css_lib_format
[17:33:23]     │   └── css_main_watch
[17:33:23]     └─┬ img
[17:33:23]       └─┬ <series>
[17:33:23]         ├── img_clean
[17:33:23]         ├── img_format
[17:33:24]         └── img_watch
```

## Changes to Jekyll workflow

### Goal

{:.language-markup}
- Have Jekyll only worry about what it's best at: processing HTML templates and Markdown files.
- This means we'll handle all the rest of processing through Gulp:
	- SCSS to CSS
	- Concatenate and minify JavaScripts
	- Pass images through to Jekyll, so they can live in the same place where we keep our uncompiled styles and scripts. (That way, people don't need to worry about whether they're putting something in the correct folder.)
		- Eventual goal is to create `srcsets` for images, and minify where possible. Right now, though, we're just copying over files.

### Assets

{:.language-markup}
`assets` &rarr; `_assets`

{:.language-markup}
- **What it is:** a directory that holds all the static files we edit directly
	- In our case: images, JavaScripts, and stylesheets
- **Change:** add underscore in front of name
- **Why:** Jekyll doesn't write the contents of directories starting with an underscore into the `_site` folder. We'll be *writing* all of our changes to static files here, but we'll use Gulp to output a compiled version of those changes to a folder we actually want Jekyll to read: the `assets` folder, no underscore.
	- Note: this means a folder named `assets` still exists; we're just not having Jekyll process the SCSS to CSS, etc., anymore. This will make the build a lot faster, since any files that don't have front matter are just copied *directly* to the `_site` folder with no changes.

### _config.yml

{:.language-markup}
1. Exclude `_assets` from Jekyll, since we're using `assets` in the site:
2. Remove `sass` processing, since we'll be sending Jekyll a regular CSS file:

{:.language-yaml}
```
# add this
exclude:
  - _assets

# delete this
sass:
  sass_dir: assets/css
  style: compressed
```

## Files: before and after

- An overview of what "processing" actually does to our files, before we zoom in and explain.

*NB: for a detailed look at what Gulp tasks are and how they work, please see [the documentation](https://github.com/scholarslab/scholarslab.org/blob/master/docs/gulp-setup.md) on the Scholars' Lab site repo.*

### Unprocessed:

{:.lang-markup}
```
_assets/
+---css/
|   |   style.scss
|   |
|   +---lib/
|   |       prism.css
|   |       prism.min.css
|   |
|   \---_sass/
|       |   _footer.scss
|       |   _home.scss
|       |   _navbar.scss
|       |   _page.scss
|       |   _universal-styles.scss
|       |
|       +---_colors/
|               _patterns-palette.scss
|               _slab-palette.scss
|
+---gulp_config/
|       gulpfile-old.js
|       paths.js
|
+---img/
|   +---decorative/
|   |       color-splatter-purple.jpg
|   |
|   \---svg/
|           asterisk-white.svg
|           calendar-icon.svg
|
+---js/
|   +---lib/
|   |       hammer.min.js
|   |       prism.js
|   |       prism.min.js
|   |
|   \---_partials/
|           _blog-post.js
|           _flexible-nav.js
|           _hours-and-spaces.js
|           _progress-tracker.js
|           _research.js
|
\---python/
        html-to-css.py
```

\*
~\*~\*~*gulpifyyyyy*~\*~\*~
\*

### Output:

{:.lang-markup}
```
assets/
+---css/
|   |   style.css
|   |
|   \---lib/
|           prism.css
|           prism.min.css
|
+---img/
|   +---decorative/
|   |       color-splatter-purple.jpg
|   |
|   \---svg/
|           asterisk-white.svg
|           calendar-icon.svg
|
\---js/
    |   main.js
    |
    \---lib/
            hammer.min.js
            prism.min.js
```

\*
~\*~\*~*thanks for gettin' through the giant file treeeeees*~\*~\*~
\*

## What happened

### Quick observations

1. There are some folders that we had in our _assets directory that didn't transfer to the assets Jekyll reads.
2. There are fewer files overall.
3. The file structure is mostly the same, and the contents of the image directory didn't change at all.

### Diagram:

An export from Adobe Draw, marking up a simplified version of our starting `_assets` folder:

<div class="gulp-wf__screenshot">
	<img src="{{ 'assets/img/gulp-markup-cropped.png' | relative_url }}" alt="Screenshot of how Gulp tasks transform files">
</div>

## How files are processed:

### 1. Styles

This includes both SCSS files and any plain CSS files you might have from external libraries (e.g. syntax highlighting&mdash;in this project, we're using Prism).

#### Remove YAML

{:.lang-markup}
- Jekyll knows to process a file if it starts with YAML frontmatter.
- We only want this on our main stylesheet, `style.scss`, since we're importing all remaining stylesheets into this document.

Setup if we *weren't* Gulp-ifying the process:

{:.lang-scss}
```
---
# YAML front matter strings! (Nothing required inside.)
---

/* General Styles: */

* {
  box-sizing: border-box;
}

// ... and so on ...
```

So, now that we *are* using Gulp, we'll take the mind-blowing step of... *removing the front matter!* Or, if you're me, just commenting it out until you're sure we're using this workflow. Result:

{:.lang-scss}
```
// ---
// ---

/* General Styles: */

* {
  box-sizing: border-box;
}

// ... and so on ...
```

Boom. Done. Now Gulp will process the SCSS file for you, but you won't forget that Jekyll needs the YAML front matter and wonder why you're getting an error, should you decide against this method.

### 2. JavaScripts:

*coming soon...*